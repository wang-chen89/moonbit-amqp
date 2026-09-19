import {Lifecycle, Topology, notice, delay} from './recovery-state.mjs';
import {RecoveringChannel} from './recovery-channel.mjs';

function number(value,min,max,name) {
  if(!Number.isInteger(value)||value<min||value>max)throw TypeError(`Invalid recovery ${name}`);
  return value;
}
export class RecoveringConnection extends Lifecycle {
  #options; #dial; #physical; #channels=new Map(); #nextId=1;
  #lifetime=new AbortController(); #external; #abort; #task; #closing;
  #channelTasks=new Map(); #channelSerial=Promise.resolve(); #skipped=[];
  #cancelledQueues=new Map();
  static async connect(options,dial) {
    const connection=new RecoveringConnection(options,dial);
    try { connection.#install(await dial(connection.#options));connection._state('open');return connection; }
    catch(error) { connection.#stop(error);throw error; }
  }
  constructor(options,dial) {
    super();
    const config=options.recovery===true?{}:options.recovery;
    if(!config||typeof config!=='object')throw TypeError('Invalid recovery configuration');
    this.recovery=Object.freeze({maxRetries:number(config.maxRetries??5,1,1000000,'maxRetries'),
      retryDelay:number(config.retryDelay??5000,0,2147483647,'retryDelay'),
      retryJitter:number(config.retryJitter??500,0,60000,'retryJitter'),
      topology:config.topology??'all',onTopologyError:config.onTopologyError});
    if(!['all','transient','none'].includes(this.recovery.topology))throw TypeError('Invalid recovery topology mode');
    if(config.onTopologyError!==undefined&&typeof config.onTopologyError!=='function')throw TypeError('Invalid onTopologyError callback');
    this.topology=new Topology(number(config.maxTopologyEntries??4096,1,1000000,'maxTopologyEntries'));
    this.#dial=dial;this.#options={...options,recovery:undefined,signal:this.#lifetime.signal};
    this.#external=options.signal;
    if(options.signal?.aborted)throw options.signal.reason??Error('Aborted');
    if(options.signal) {
      this.#abort=()=>this.destroy(options.signal.reason??Error('Aborted'));
      options.signal.addEventListener('abort',this.#abort,{once:true});
    }
  }
  get _raw() { return this.#physical; }
  get limits() { return this.#physical?.limits; }
  get timeout() { return this.#physical?.timeout??this.#options.timeout??10000; }
  get authenticationMechanism() { return this.#physical?.authenticationMechanism; }
  get readStats() { return this.#physical?.readStats; }
  get writeStats() { return this.#physical?.writeStats; }
  resolveQueue(name) { return this.topology.resolve(name); }
  async updateSecret(secret,reason='Credential refreshed') {
    if(this.state!=='open'||this.#physical?.closed)throw Error('Connection recovery in progress or closed');
    const raw=this.#physical;
    await raw.updateSecret(secret,reason);
    if(this.state!=='open'||raw!==this.#physical)throw Error('Credential update interrupted by recovery; outcome may be unknown');
  }
  _active(channel,topology=false) {
    if(this.state!=='open'||this.#physical?.closed||channel?.state!=='open'||channel?._raw?.closed)throw Error('Recovery in progress or connection/channel closed');
    if(topology&&this.#channelTasks.size)throw Error('Topology recovery in progress');
  }
  #install(raw) {
    if(this.closed||this.state==='closing') { raw.destroy();throw Error('Connection closed during recovery'); }
    this.#physical=raw;
    for(const name of ['blocked','unblocked'])raw.on(name,event=>{if(raw===this.#physical)notice(this,name,event);});
    raw.on('close',error=>{
      if(raw!==this.#physical||this.closed||this.state==='closing'||this.state==='reconnecting')return;
      this._state('reconnecting',error);
      for(const channel of this.#channels.values())channel._lost(error);
      this.#channelTasks.clear();this.#channelSerial=Promise.resolve();
      this.#task=this.#restoreConnection(error).catch(e=>this.#stop(e));
    });
  }
  async openChannel() {
    if(this.state!=='open'||this.#physical.closed||this.#channelTasks.size)throw Error('Connection recovery in progress or closed');
    const channel=new RecoveringChannel(this,this.#nextId++);
    this.#channels.set(channel.id,channel);
    try { await channel._open(this.#physical);channel._restored();return channel; }
    catch(error) { this.#channels.delete(channel.id);channel._stop(error);throw error; }
  }
  _removeChannel(channel) { this.#channels.delete(channel.id); }
  _removeQueue(name) { const key=this.topology.removeQueue(name);this.#cancelledQueues.delete(key);for(const ch of this.#channels.values())ch._removeQueue(key); }
  _consumerGone(key) {
    const queue=this.topology.queue(key);
    if(!queue?.options.autoDelete)return;
    this.#cancelledQueues.set(queue.key,queue);this._consumerSettled(queue.key);
  }
  _consumerSettled(key) {
    const queue=this.#cancelledQueues.get(key);if(!queue)return;
    if(this.topology.queue(key)!==queue){this.#cancelledQueues.delete(key);return;}
    if([...this.#channels.values()].some(ch=>ch._hasConsumer(key)))return;
    this._removeQueue(key);
  }
  _channelLost(channel,error) {
    if(channel.closed||this.closed||this.state==='closing')return;
    if(channel.state==='connecting')return;
    channel._lost(error);
    // The raw Connection marks itself closed before notifying its channels.
    if(this.#physical.closed||this.state!=='open'||this.#channelTasks.has(channel))return;
    const token={},session=this.#physical;this.#channelTasks.set(channel,token);
    const task=this.#channelSerial.then(()=>this.#restoreChannel(channel,error,token,session));
    this.#channelSerial=task.catch(()=>{});
    task.catch(e=>{channel._stop(e);this.#channels.delete(channel.id);})
      .finally(()=>{if(this.#channelTasks.get(channel)===token)this.#channelTasks.delete(channel);});
  }
  async #restoreConnection(cause) {
    let error=cause;
    for(let attempt=1;attempt<=this.recovery.maxRetries;attempt++) {
      if(this.closed||this.state==='closing')return;
      notice(this,'recovering',{attempt,error});
      await delay(this.#retryDelay(attempt),this.#lifetime.signal);
      let raw;
      try {
        raw=await this.#dial(this.#options);this.#install(raw);this.#skipped=[];
        for(const ch of this.#channels.values())if(!ch.closed) {
          try { await ch._open(raw); } catch(error) { if(!ch.closed)throw error; }
        }
        await this.#restoreTopology(undefined,true);
        for(const ch of this.#channels.values())if(!ch.closed&&ch._raw.closed)await ch._open(raw);
        if(this.recovery.topology!=='none')for(const ch of this.#channels.values())if(!ch.closed)await ch._restoreConsumers();
        if(raw.closed||this.state!=='reconnecting')throw Error('Connection closed while restoring topology');
        for(const ch of this.#channels.values())ch._restored();
        if(this.state!=='reconnecting')return;
        this._state('open');
        for(const ch of this.#channels.values())ch._drain();
        if(this.state==='open')notice(this,'recovered',{attempt,skipped:[...this.#skipped]});return;
      } catch(e) {
        error=e;raw?.destroy(e);
        for(const ch of this.#channels.values())ch._lost(e);
      }
    }
    throw Error(`Recovery exhausted after ${this.recovery.maxRetries} attempts: ${error.message}`,{cause:error});
  }
  async #restoreChannel(channel,cause,token,session) {
    const current=()=>!channel.closed&&this.state==='open'&&session===this.#physical&&this.#channelTasks.get(channel)===token;
    if(!current())return;
    let error=cause;this.#skipped=[];
    for(let attempt=1;attempt<=this.recovery.maxRetries;attempt++) {
      if(!current())return;
      notice(channel,'recovering',{attempt,error});
      await delay(this.#retryDelay(attempt),this.#lifetime.signal);
      if(!current())return;
      try {
        await channel._open(this.#physical);
        await this.#restoreTopology(channel,false);
        if(channel._raw.closed)await channel._open(this.#physical);
        if(this.recovery.topology!=='none')await channel._restoreConsumers();
        if(!current())return;
        if(channel._raw.closed)throw Error('Channel closed during recovery');
        this.#channelTasks.delete(channel);
        channel._restored();if(channel.state==='open')notice(channel,'recovered',{attempt});return;
      } catch(e) {
        error=e;
        if(!current())return;
        if(!channel._raw?.closed)try{await channel._raw.close();}catch{}
      }
    }
    if(current())throw Error(`Channel recovery exhausted: ${error.message}`,{cause:error});
  }
  #retryDelay(attempt) { return attempt===1?0:Math.min(2147483647,this.recovery.retryDelay+Math.floor(Math.random()*this.recovery.retryJitter)); }
  async _entityError(entity) {
    if(this.#physical.closed||this.closed||this.state==='closing')throw entity.error;
    notice(this,'topologyError',entity);this.#skipped.push(entity);
    if(this.recovery.onTopologyError&&!(await this.recovery.onTopologyError(entity)))throw entity.error;
  }
  async #restoreTopology(only,newConnection) {
    const mode=this.recovery.topology;if(mode==='none')return;
    const channels=[...this.#channels.values()].filter(ch=>!ch.closed);
    let spare;
    const owner=entry=>only??channels.find(ch=>!ch.closed&&ch.id===entry.owner)??channels.find(ch=>!ch.closed);
    const rawFor=async entry=>{
      const ch=owner(entry);
      if(ch) { if(ch._raw.closed)await ch._open(this.#physical);return ch._raw; }
      if(!spare||spare.closed)spare=await this.#physical.openChannel();return spare;
    };
    const component=only?this.topology.recoveryComponent(only.id,[...only._consumers.values()].map(c=>c.queue)):undefined;
    const selected=entry=>(!component||component.has(entry));
    const run=async(type,name,entry,action)=>{
      if(!selected(entry))return;
      try { await action(await rawFor(entry)); }
      catch(error) { await this._entityError({type,name,channel:owner(entry)?.id??0,error}); }
    };
    try {
      for(const e of this.topology.exchanges.values())if(this.topology.wanted(e,mode))
        await run('exchange',e.name,e,ch=>ch.declareExchange(e.name,e.type,e.options));
      for(const q of this.topology.queues.values())if(this.topology.wanted(q,mode))
        await run('queue',q.key,q,async ch=>{
          // A channel loss leaves connection-owned server-named queues alive.
          // Probe before generating a replacement, so other channels keep theirs.
          if(!newConnection&&!q.requested) {
            try { await ch.declareQueue(q.current,{passive:true});return; }
            catch(error) { if(error.code!==404)throw error;ch=await rawFor(q); }
          }
          const result=await ch.declareQueue(q.requested,q.options),previous=q.current;
          q.current=result.queue;
          if(previous!==q.current)notice(this,'queueNameChanged',{queue:q.key,previous,current:q.current});
        });
      for(const b of this.topology.exchangeBindings.values()) {
        if(mode==='all'||[b.source,b.destination].some(n=>this.topology.exchanges.get(n)?.options.autoDelete))
          await run('exchange-binding',b.destination,b,ch=>ch.bindExchange(b.destination,b.source,b.routingKey,b.args));
      }
      for(const b of this.topology.bindings.values()) {
        const q=this.topology.queue(b.queue),e=this.topology.exchanges.get(b.exchange);
        if(mode==='all'||q&&this.topology.wanted(q,mode)||e?.options.autoDelete)
          await run('queue-binding',b.queue,b,ch=>ch.bindQueue(this.resolveQueue(b.queue),b.exchange,b.routingKey,b.args));
      }
    } finally { if(spare&&!spare.closed)await spare.close(); }
  }
  #stop(error) {
    if(this.closed)return;
    this.#external?.removeEventListener('abort',this.#abort);
    // State first prevents close callbacks from scheduling another recovery.
    this._state('closed',error);this.#lifetime.abort(error);this.#physical?.destroy(error);
    for(const ch of this.#channels.values())ch._stop(error);
    this.#channels.clear();this.#cancelledQueues.clear();this.topology.clear();
  }
  destroy(error=Error('Connection destroyed by application')) { this.#stop(error); }
  close() {
    if(this.#closing)return this.#closing;
    if(this.closed)return Promise.resolve();
    const graceful=this.state==='open'&&!this.#physical?.closed;
    this._state('closing');
    if(!graceful)this.#lifetime.abort(Error('Recovery cancelled by close'));
    this.#closing=(async()=>{try{if(graceful)await this.#physical.close();}finally{this.#stop(Error('Connection closed by application'));}})();
    return this.#closing;
  }
}
