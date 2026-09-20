import {Lifecycle, Topology, notice, delay} from './recovery-state.mjs';
import {RecoveringChannel} from './recovery-channel.mjs';
import {emptyTopologyConfiguration} from './topology-query.mjs';
import {recoveryClosed} from './recovery-control.mjs';
import {closeDeadlineMillis,connectionClosedError} from './close-deadline.mjs';
import {topologyStrategy,runTopologyStrategy,recoveryOperationAllowed} from './topology-strategy.mjs';
export {DefaultTopologyRecovery} from './topology-strategy.mjs';
import {connectionStrategy,dispatchDecision} from './connection-strategy.mjs';
export {DefaultConnectionRecovery} from './connection-strategy.mjs';

function number(value,min,max,name) {
  if(!Number.isInteger(value)||value<min||value>max)throw TypeError(`Invalid recovery ${name}`);
  return value;
}
export class RecoveringConnection extends Lifecycle {
  #options; #dial; #physical; #channels=new Map(); #nextId=1;
  #lifetime=new AbortController(); #external; #abort; #task; #closing;
  #channelTasks=new Map(); #channelSerial=Promise.resolve(); #skipped=[];
  #cancelledQueues=new Map();
  #generation=0;
  #recovery; #closeIntent=false; #topologyStrategy; #connectionStrategy;
  #decisions=new Map(); #lossCause;
  static async connect(options,dial) {
    const connection=new RecoveringConnection(options,dial);
    try { connection.#install(await dial(connection.#options));connection._state('open');return connection; }
    catch(error) { connection.destroy(error);throw error; }
  }
  constructor(options,dial) {
    super();
    const config=options.recovery===true?{}:options.recovery;
    if(!config||typeof config!=='object')throw TypeError('Invalid recovery configuration');
    this.#recovery=Object.freeze({maxRetries:number(config.maxRetries??5,1,1000000,'maxRetries'),
      retryDelay:number(config.retryDelay??5000,0,2147483647,'retryDelay'),
      retryJitter:number(config.retryJitter??500,0,60000,'retryJitter'),
      topology:config.topology??'all',onTopologyError:config.onTopologyError});
    if(!['all','transient','none'].includes(this.recovery.topology))throw TypeError('Invalid recovery topology mode');
    if(config.onTopologyError!==undefined&&typeof config.onTopologyError!=='function')throw TypeError('Invalid onTopologyError callback');
    this.#topologyStrategy=topologyStrategy(config.topologyRecovery);
    this.#connectionStrategy=connectionStrategy(config.connectionRecovery);
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
  get recovery() { return this.#recovery; }
  get recoveryEnabled() { return !this.#closeIntent; }
  get connectionRecoveryEnabled() { return this.recoveryEnabled; }
  get topologyRecoveryEnabled() { return this.recoveryEnabled&&this.#recovery.topology!=='none'; }
  get maxRetryCount() { return this.recoveryEnabled?this.#recovery.maxRetries:0; }
  get retryInterval() { return this.recoveryEnabled?this.#recovery.retryDelay:0; }
  get reconnectionConfig() { return {maxRetryCount:this.#recovery.maxRetries,retryInterval:this.#recovery.retryDelay}; }
  get recoveryConfig() { const {onTopologyError,...config}=this.#recovery;return {...config,maxTopologyEntries:this.topology.limit,hasTopologyErrorHandler:Boolean(onTopologyError),hasCustomTopologyRecovery:Boolean(this.#topologyStrategy),hasCustomConnectionRecovery:Boolean(this.#connectionStrategy)}; }
  _topologyConfiguration(owner,global) {
    if(typeof global!=='boolean')throw TypeError('Invalid topology scope');
    return this.#recovery.topology==='none'?emptyTopologyConfiguration():this.topology.configuration(owner,global);
  }
  topologyConfiguration() { return this._topologyConfiguration(undefined,true); }
  get limits() { return this.#physical?.limits; }
  get timeout() { return this.#physical?.timeout??this.#options.timeout??10000; }
  get authenticationMechanism() { return this.#physical?.authenticationMechanism; }
  get readStats() { return this.#physical?.readStats; }
  get writeStats() { return this.#physical?.writeStats; }
  get clientProperties() { return this.#physical?.clientProperties; }
  get serverProperties() { return this.#physical?.serverProperties; }
  get serverLocales() { return this.#physical?.serverLocales; }
  get serverVersion() { return this.#physical?.serverVersion; }
  get localAddress() { return this.#physical?.localAddress; }
  get remoteAddress() { return this.#physical?.remoteAddress; }
  get tlsState() { return this.#physical?.tlsState; }
  get config() { return this.#physical?.config; }
  get connectionInfo() { const info=this.#physical?.connectionInfo;return info?{...info,state:this.state,generation:this.#generation}:undefined; }
  resolveQueue(name) { return this.topology.resolve(name); }
  async reconnect() {
    // Finish synchronous teardown/close callbacks before permitting a new lifetime.
    await Promise.resolve();
    if(!this.recoveryEnabled||this.#external?.aborted)throw recoveryClosed();
    if(this.closed) {
      this.#lifetime=new AbortController();this.#options.signal=this.#lifetime.signal;
      return this.#startConnectionRecovery(Error('Explicit recovery after exhaustion'),true);
    }
    if(this.state==='reconnecting')return this.#task;
    if(this.state==='disconnected')return this.#startConnectionRecovery(this.#lossCause);
    if(this.state!=='open')throw recoveryClosed();
  }
  #startConnectionRecovery(error,restart=false) {
    const task=Promise.resolve().then(()=>this.#restoreConnection(error)).catch(e=>{this.#stop(e);throw e;});
    this.#task=task;task.catch(()=>{});
    if(restart)this._restartRecovery();else this._state('reconnecting',error);
    for(const channel of this.#channels.values())channel._lost(error);
    this.#channelTasks.clear();this.#channelSerial=Promise.resolve();
    return task;
  }
  async updateSecret(secret,reason='Credential refreshed') {
    if(this.state!=='open'||this.#physical?.closed)throw Error('Connection recovery in progress or closed');
    const raw=this.#physical;
    await raw.updateSecret(secret,reason);
    if(this.state!=='open'||raw!==this.#physical)throw Error('Credential update interrupted by recovery; outcome may be unknown');
  }
  _active(channel,topology=false) {
    if(recoveryOperationAllowed(this,channel)&&!this.#physical?.closed&&!channel?._raw?.closed&&!channel?.closed)return;
    if(this.state!=='open'||this.#physical?.closed||channel?.state!=='open'||channel?._raw?.closed)throw Error('Recovery in progress or connection/channel closed');
    if(topology&&this.#channelTasks.size)throw Error('Topology recovery in progress');
  }
  #install(raw) {
    if(this.closed||this.state==='closing') { raw.destroy();throw Error('Connection closed during recovery'); }
    this.#physical=raw;this.#generation++;
    for(const [target,decision] of this.#decisions){decision.abort();this.#decisions.delete(target);}
    for(const name of ['blocked','unblocked'])raw.on(name,event=>{if(raw===this.#physical)notice(this,name,event);});
    raw.on('close',error=>{
      if(raw!==this.#physical||this.closed||this.state==='closing'||this.state==='reconnecting')return;
      if(!this.#connectionStrategy){this.#startConnectionRecovery(error);return;}
      for(const [target,decision] of this.#decisions)if(target!==this&&!decision.connectionLost){decision.abort();this.#decisions.delete(target);}
      this.#lossCause=error;this._state('disconnected',error);
      this.#decision(this,error,raw);
    });
  }
  #decision(target,error,source) {
    const old=this.#decisions.get(target);old?.abort();
    const current=()=>!this.closed&&this.state!=='closing'&&!target.closed&&this.recoveryEnabled&&(target===this?this.#physical:target._raw)===source;
    let decision;
    decision=dispatchDecision({callback:target===this?this.#connectionStrategy.onConnectionClose:this.#connectionStrategy.onChannelClose,
      target,connection:this,error,signal:this.#lifetime.signal,current,
      reconnect:()=>{
        if(target===this)return this.reconnect();
        // Whole-connection recovery owns its channels. Do not compete with it.
        if(this.#physical.closed||this.state!=='open')return;
        const task=this.#channelTasks.get(target);if(task)return task.promise;
        target._lost(error);return this.#startChannelRecovery(target,error);
      },
      onDone:()=>{if(this.#decisions.get(target)===decision)this.#decisions.delete(target);}
    });
    decision.source=source;decision.connectionLost=this.#physical.closed;this.#decisions.set(target,decision);
  }
  _channelOpened(channel) { const decision=this.#decisions.get(channel);if(decision&&decision.source!==channel._raw){decision.abort();this.#decisions.delete(channel);} }
  async openChannel() {
    if(this.state!=='open'||this.#physical.closed||this.#channelTasks.size)throw Error('Connection recovery in progress or closed');
    const channel=new RecoveringChannel(this,this.#nextId++);
    this.#channels.set(channel.id,channel);
    try { await channel._open(this.#physical);channel._restored();return channel; }
    catch(error) { this.#channels.delete(channel.id);channel._stop(error);throw error; }
  }
  _removeChannel(channel) { this.#decisions.get(channel)?.abort();this.#decisions.delete(channel);this.#channels.delete(channel.id);this.topology.forgetOwner(channel.id); }
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
    const awaitingPolicy=Boolean(this.#connectionStrategy)&&(this.state==='open'||this.state==='disconnected')&&!this.#channelTasks.has(channel);
    channel._lost(error,awaitingPolicy);
    if(awaitingPolicy){this.#decision(channel,error,channel._raw);return;}
    // The raw Connection marks itself closed before notifying its channels.
    if(this.#physical.closed||this.state!=='open'||this.#channelTasks.has(channel))return;
    this.#startChannelRecovery(channel,error);
  }
  async _reconnectChannel(channel) {
    await Promise.resolve();
    if(!this.recoveryEnabled||channel.closed||this.closed)throw recoveryClosed();
    if(this.state==='reconnecting'||this.state==='disconnected')await this.reconnect();
    if(!this.recoveryEnabled||channel.closed||this.state!=='open')throw recoveryClosed();
    const current=this.#channelTasks.get(channel);
    if(current)return current.promise;
    channel._lost(Error('Explicit channel topology recovery'));
    return this.#startChannelRecovery(channel,Error('Explicit channel recovery'),true);
  }
  #startChannelRecovery(channel,error,reuse=false) {
    const token={},session=this.#physical;this.#channelTasks.set(channel,token);
    const task=this.#channelSerial.then(()=>this.#restoreChannel(channel,error,token,session,reuse));
    this.#channelSerial=task.catch(()=>{});
    token.promise=task.catch(e=>{if(this.#channelTasks.get(channel)===token){channel._stop(e);this._removeChannel(channel);}throw e;})
      .then(async()=>{if(this.state==='reconnecting')await this.reconnect();if(channel.closed||this.state!=='open')throw recoveryClosed();})
      .finally(()=>{if(this.#channelTasks.get(channel)===token)this.#channelTasks.delete(channel);});
    token.promise.catch(()=>{});return token.promise;
  }
  async #restoreConnection(cause) {
    let error=cause;
    for(let attempt=1;attempt<=this.recovery.maxRetries;attempt++) {
      if(this.closed||this.state==='closing')throw recoveryClosed();
      notice(this,'recovering',{attempt,error});
      await delay(this.#retryDelay(attempt),this.#lifetime.signal);
      let raw;
      try {
        raw=await this.#dial(this.#options);this.#install(raw);this.#skipped=[];
        for(const ch of this.#channels.values())if(!ch.closed) {
          try { await ch._open(raw); } catch(error) { if(!ch.closed)throw error; }
        }
        await this.#recoverTopology(undefined,true);
        if(raw.closed||this.state!=='reconnecting')throw Error('Connection closed while restoring topology');
        for(const ch of this.#channels.values())ch._restored();
        if(this.state!=='reconnecting')throw recoveryClosed();
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
  async #restoreChannel(channel,cause,token,session,reuse=false) {
    const current=()=>!channel.closed&&this.state==='open'&&session===this.#physical&&this.#channelTasks.get(channel)===token;
    if(!current())return;
    let error=cause;this.#skipped=[];
    for(let attempt=1;attempt<=this.recovery.maxRetries;attempt++) {
      if(!current())return;
      notice(channel,'recovering',{attempt,error});
      await delay(this.#retryDelay(attempt),this.#lifetime.signal);
      if(!current())return;
      let restoringTopology=false;
      try {
        if(!reuse||attempt>1||channel._raw.closed)await channel._open(this.#physical);
        restoringTopology=true;
        await this.#recoverTopology(channel,false,reuse&&attempt===1);
        if(!current())return;
        if(channel._raw.closed)throw Error('Channel closed during recovery');
        this.#channelTasks.delete(channel);
        channel._restored();if(channel.state==='open')notice(channel,'recovered',{attempt,skipped:[...this.#skipped]});return;
      } catch(e) {
        error=e;
        if(!current())return;
        // Go retries reopening a channel, but a fatal topology strategy error
        // escapes that pass. Explicit callers retain the opened channel;
        // the automatic recovery owner performs terminal cleanup on failure.
        if(restoringTopology){
          if(reuse){this.#channelTasks.delete(channel);if(!channel._raw.closed)channel._restored();}
          throw e;
        }
        if(!channel._raw?.closed)try{await channel._raw.close();}catch{}
      }
    }
    if(current())throw Error(`Channel recovery exhausted: ${error.message}`,{cause:error});
  }
  #retryDelay(attempt) { return attempt===1?0:Math.min(2147483647,this.recovery.retryDelay+Math.floor(Math.random()*this.recovery.retryJitter)); }
  async _entityError(entity,skipped=this.#skipped) {
    if(this.#physical.closed||this.closed||this.state==='closing')throw entity.error;
    notice(this,'topologyError',entity);skipped.push(entity);
    if(this.recovery.onTopologyError&&!(await this.recovery.onTopologyError(entity)))throw entity.error;
  }
  async #recoverTopology(only,newConnection,keepActive=false) {
    if(this.recovery.topology==='none')return;
    const raw=this.#physical,channels=only?[only]:[...this.#channels.values()].filter(ch=>!ch.closed);
    const current=()=>raw===this.#physical&&!this.closed&&this.state!=='closing'&&(!only||!only.closed&&this.state==='open');
    this.#skipped=await runTopologyStrategy({strategy:this.#topologyStrategy,connection:this,channels,raw,signal:this.#lifetime.signal,current,keepActive,scopeChannel:only,
      restoreDefault:async check=>{
        const skipped=[],entityError=async entity=>{check();await this._entityError(entity,skipped);check();};
        await this.#restoreTopology(only,newConnection,check,entityError);
        for(const ch of channels)if(!ch.closed){check();if(ch._raw.closed)await ch._open(raw);check();await ch._restoreConsumers(keepActive,check,entityError);}
        check();return skipped;
      }});
  }
  async #restoreTopology(only,newConnection,check,entityError) {
    const mode=this.recovery.topology;if(mode==='none')return;
    const channels=[...this.#channels.values()].filter(ch=>!ch.closed);
    let spare;
    const owner=entry=>only??channels.find(ch=>!ch.closed&&ch.id===entry.owner)??channels.find(ch=>!ch.closed);
    const rawFor=async entry=>{
      check();
      const ch=owner(entry);
      if(ch) { if(ch._raw.closed)await ch._open(this.#physical);check();return ch._raw; }
      if(!spare||spare.closed)spare=await this.#physical.openChannel();check();return spare;
    };
    const component=only?this.topology.recoveryComponent(only.id,[...only._consumers.values()].map(c=>c.queue)):undefined;
    const selected=entry=>(!component||component.has(entry));
    const run=async(type,name,entry,action)=>{
      if(!selected(entry))return;
      check();
      try { await action(await rawFor(entry));check(); }
      catch(error) { check();await entityError({type,name,channel:owner(entry)?.id??0,error}); }
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
          await run('exchange-binding',b.destination,b,ch=>ch.bindExchange(b.destination,b.source,b.routingKey,b.args,b.options));
      }
      for(const b of this.topology.bindings.values()) {
        const q=this.topology.queue(b.queue),e=this.topology.exchanges.get(b.exchange);
        if(mode==='all'||q&&this.topology.wanted(q,mode)||e?.options.autoDelete)
          await run('queue-binding',b.queue,b,ch=>ch.bindQueue(this.resolveQueue(b.queue),b.exchange,b.routingKey,b.args,b.options));
      }
    } finally { if(spare&&!spare.closed)await spare.close(); }
  }
  #stop(error) {
    if(this.closed)return;
    for(const decision of this.#decisions.values())decision.abort();this.#decisions.clear();
    if(this.#closeIntent)this.#external?.removeEventListener('abort',this.#abort);
    // State first prevents close callbacks from scheduling another recovery.
    this._state('closed',error);this.#lifetime.abort(error);this.#physical?.destroy(error);
    for(const ch of this.#channels.values())ch._stop(error);
    this.#channels.clear();this.#cancelledQueues.clear();this.topology.clear();this.#channelTasks.clear();this.#channelSerial=Promise.resolve();
  }
  destroy(error=Error('Connection destroyed by application')) { this.#closeIntent=true;this.#external?.removeEventListener('abort',this.#abort);this.#stop(error); }
  async closeDeadline(deadline) {
    const time=closeDeadlineMillis(deadline);
    this.#closeIntent=true;this.#external?.removeEventListener('abort',this.#abort);
    if(this.#closing||this.closed)throw connectionClosedError();
    const graceful=this.state==='open'&&!this.#physical?.closed;
    this._state('closing');
    for(const decision of this.#decisions.values())decision.abort();this.#decisions.clear();
    if(!graceful)this.#lifetime.abort(connectionClosedError());
    this.#closing=(async()=>{
      let failure;
      try{if(!graceful)throw connectionClosedError();await this.#physical.closeDeadline(time);}
      catch(error){failure=error;throw error;}
      finally{this.#stop(failure??Error('Connection closed by application'));}
    })();
    return this.#closing;
  }
  close() {
    this.#closeIntent=true;this.#external?.removeEventListener('abort',this.#abort);
    if(this.#closing)return this.#closing;
    if(this.closed)return Promise.resolve();
    const graceful=this.state==='open'&&!this.#physical?.closed;
    this._state('closing');
    for(const decision of this.#decisions.values())decision.abort();this.#decisions.clear();
    if(!graceful)this.#lifetime.abort(Error('Recovery cancelled by close'));
    this.#closing=(async()=>{try{if(graceful)await this.#physical.close();}finally{this.#stop(Error('Connection closed by application'));}})();
    return this.#closing;
  }
}
