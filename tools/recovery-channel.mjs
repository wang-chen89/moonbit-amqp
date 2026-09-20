import {randomUUID} from 'node:crypto';
import {Lifecycle, notice, snapshot, identity} from './recovery-state.mjs';
import {checkConsumerSignal,observeConsumerSignal} from './consumer-signal.mjs';
import {confirmationView,emitConfirmation} from './confirmations.mjs';

export class RecoveringChannel extends Lifecycle {
  #connection; #physical; #generation = 0; #offset = 0n; #lastTag = 0n;
  #opening = 0;
  #lastQueue = ''; #mode = 'normal'; #qos = new Map(); #consumers = new Map();
  #pendingConsumers = new Map();
  #deliveries = []; #deliveryBytes = 0;
  constructor(connection, id) { super(); this.#connection = connection; this.id = id; }
  get _raw() { return this.#physical; }
  get _consumers() { return this.#consumers; }
  get _generation() { return this.#generation; }
  get nextPublishSeqNo() { return this._active().nextPublishSeqNo; }
  topologyConfiguration(global=false) { return this.#connection._topologyConfiguration(this.id,global); }
  reconnect() { return this.#connection._reconnectChannel(this); }
  _active(topology = false) { this.#connection._active(this,topology); return this.#physical; }
  async _open(connection) {
    const claim=++this.#opening;
    const raw = await connection.openChannel();
    if (claim!==this.#opening || this.closed || this.#connection.closed) { if(!raw.closed)await raw.close(); throw Error('Closed or superseded during channel recovery'); }
    this.#physical = raw; this.#generation++; this.#offset = this.#lastTag;
    this.#deliveries=[];this.#deliveryBytes=0;
    raw.on('return', message => { if (this.#physical === raw) {if(message.type==='messageStart'&&!this.listenerCount('return'))message.body.discard().catch(()=>{});notice(this,'return',message);} });
    raw.on('callbackError', error => notice(this,'callbackError',error));
    raw.on('flow', active => { if(this.#physical===raw)notice(this,'flow',active); });
    raw.on('confirm', value => { if(this.#physical===raw)emitConfirmation(this,Object.freeze({...value,generation:this.#generation})); });
    raw.on('cancel', (tag,details) => {
      if (this.#physical !== raw) return;
      const entry=this.#consumers.get(tag)??this.#pendingConsumers.get(tag);this.#consumers.delete(tag);
      if(entry){entry.cancelled=true;entry.dispose?.();}
      if(entry)this.#connection._consumerGone(entry.queue);
      notice(this,'cancel',tag,details);
    });
    raw.on('close', error => {
      if (this.#physical === raw && !this.closed) this.#connection._channelLost(this,error);
    });
    for (const [global,{count,options}] of this.#qos) await raw.qos(count,global,options);
    if (this.#mode === 'confirm') await raw.confirmSelect();
    if (this.#mode === 'transaction') await raw.txSelect();
    if(raw.closed||claim!==this.#opening||this.closed||this.#connection.closed)throw Error('Channel closed or superseded while opening');
    return raw;
  }
  _lost(error) {
    this.#opening++;this.#deliveries=[];this.#deliveryBytes=0;
    for(const entry of [...this.#consumers.values(),...this.#pendingConsumers.values()])if(entry.cancelRequested)this.#cancelOffline(entry);
    if (!this.closed) this._state('reconnecting',error);
  }
  _restored() { if (!this.closed) {this._state('open');this._drain();} }
  _stop(error) { this.#opening++;this.#generation++;this.#deliveries=[];this.#deliveryBytes=0;for(const entry of [...this.#consumers.values(),...this.#pendingConsumers.values()])entry.dispose?.();this.#consumers.clear();this.#pendingConsumers.clear();this._state('closed',error); }
  _drain() {
    if(this.state!=='open'||this.#connection.state!=='open')return;
    const deliveries=this.#deliveries;this.#deliveries=[];this.#deliveryBytes=0;
    for(const {callback,message,generation} of deliveries) {
      if(this.closed||generation!==this.#generation)continue;
      Promise.resolve().then(()=>{if(!this.closed&&generation===this.#generation)return callback(message);}).catch(error=>notice(this,'callbackError',error));
    }
  }
  #notify(callback,message,raw,generation) {
    const value=this.#delivery(message,raw,generation);if(value===undefined)return;
    // A stream must be drained while restore RPCs are still behind its body on TCP.
    // Only streaming callbacks run early; acknowledgements wait for recoveryReady.
    if(value?.type==='messageStart'){
      value.recoveryReady=Promise.all([this.waitForReady({timeout:this.#connection.timeout}),this.#connection.waitForReady({timeout:this.#connection.timeout})]).then(()=>{});
      value.recoveryReady.catch(()=>{});return callback(value);
    }
    if(this.state==='open'&&this.#connection.state==='open')return callback(value);
    this.#deliveryBytes+=value?.body.length??0;
    if(this.#deliveries.length>=1024||this.#deliveryBytes>8388608) {
      this.#connection._raw.destroy(Error('Recovery delivery buffer limit reached'));return;
    }
    this.#deliveries.push({callback,message:value,generation});
  }
  _removeQueue(key) {
    for(const [tag,c] of this.#consumers) if(c.queue===key){c.dispose?.();this.#consumers.delete(tag);}
    for(const c of this.#pendingConsumers.values())if(c.queue===key){c.cancelled=true;c.dispose?.();}
  }
  _hasConsumer(key) { return [...this.#consumers.values(),...this.#pendingConsumers.values()].some(c=>c.queue===key); }
  _queue(name) { return this.#connection.topology.key(name || this.#lastQueue); }
  _resolved(name) { return this.#connection.topology.resolve(this._queue(name)); }
  async #call(method, args, after, topology = false) {
    const raw = this._active(topology), generation = this.#generation;
    const value = await raw[method](...args);
    if (this.#physical !== raw || this.#generation !== generation || this.state !== 'open') throw Error('Operation interrupted by recovery; outcome may be unknown');
    return after ? after(value) : value;
  }
  async #record(method,args,after,extra=1) {
    this._active(true); const release = this.#connection.topology.reserve(extra);
    try { return await this.#call(method,args,after,true); } finally { release(); }
  }
  declareExchange(exchange,type='direct',options={}) {
    options=snapshot(options);
    return this.#record('declareExchange',[exchange,type,options],value=>{
      if(!options.passive)this.#connection.topology.record('exchanges',exchange,{name:exchange,type,options,owner:this.id}); return value;
    },options.passive||this.#connection.topology.hasRecord('exchanges',exchange,this.id)?0:1);
  }
  deleteExchange(exchange,options={}) {
    return this.#call('deleteExchange',[exchange,snapshot(options)],value=>{this.#connection.topology.removeExchange(exchange);return value;},true);
  }
  declareQueue(queue='',options={}) {
    options=snapshot(options);
    const previous=this.#connection.topology.queue(queue);
    return this.#record('declareQueue',[previous?.current??queue,options],value=>{
      const key=this.#connection.topology.key(value.queue);
      if(!options.passive)this.#connection.topology.record('queues',key,{key,current:value.queue,requested:previous?.requested??queue,declared:previous?.current??queue,options,owner:this.id});
      this.#lastQueue=key; return value;
    },options.passive||this.#connection.topology.hasRecord('queues',previous?.key??queue,this.id)?0:1);
  }
  deleteQueue(queue,options={}) {
    const key=this._queue(queue);
    return this.#call('deleteQueue',[this._resolved(queue),snapshot(options)],value=>{this.#connection._removeQueue(key);return value;},true);
  }
  purgeQueue(queue,options={}) { return this.#call('purgeQueue',[this._resolved(queue),snapshot(options)]); }
  async bindQueue(queue,exchange,routingKey='',args={},options={}) {
    const entry={queue:this._queue(queue),exchange,routingKey,args:snapshot(args),owner:this.id};
    const key=identity({...entry,owner:0});
    entry.options=snapshot(options);
    this._active(true);const release=this.#connection.topology.pendingBinding(exchange);
    try {return await this.#record('bindQueue',[this._resolved(queue),exchange,routingKey,entry.args,entry.options],value=>{this.#connection.topology.record('bindings',key,entry);return value;},this.#connection.topology.hasRecord('bindings',key,this.id)?0:1);}finally{release();}
  }
  unbindQueue(queue,exchange,routingKey='',args={}) {
    const entry={queue:this._queue(queue),exchange,routingKey,args:snapshot(args),owner:0};
    return this.#call('unbindQueue',[this._resolved(queue),exchange,routingKey,entry.args],value=>{this.#connection.topology.removeBinding(identity(entry));return value;},true);
  }
  async bindExchange(destination,source,routingKey='',args={},options={}) {
    const entry={destination,source,routingKey,args:snapshot(args),owner:this.id};
    const key=identity({...entry,owner:0});
    entry.options=snapshot(options);
    this._active(true);const release=this.#connection.topology.pendingBinding(source);
    try {return await this.#record('bindExchange',[destination,source,routingKey,entry.args,entry.options],value=>{this.#connection.topology.record('exchangeBindings',key,entry);return value;},this.#connection.topology.hasRecord('exchangeBindings',key,this.id)?0:1);}finally{release();}
  }
  unbindExchange(destination,source,routingKey='',args={},options={}) {
    const entry={destination,source,routingKey,args:snapshot(args),owner:0};
    return this.#call('unbindExchange',[destination,source,routingKey,entry.args,snapshot(options)],value=>{this.#connection.topology.removeBinding(identity(entry),true);return value;},true);
  }
  qos(count,global=false,options={}) { const saved=snapshot(options);return this.#call('qos',[count,global,saved],value=>{this.#qos.set(global,{count,options:saved});this.#connection.topology.recordQos(this.id,{prefetchCount:count,prefetchSize:saved.prefetchSize??0,global});return value;},true); }
  flow(active) { return this.#call('flow',[active]); }
  async confirmSelect(options={}) { await this.#call('confirmSelect',[snapshot(options)],()=>{this.#mode='confirm';},true); }
  async txSelect() { await this.#call('txSelect',[],()=>{this.#mode='transaction';},true); }
  txCommit() { return this.#call('txCommit',[]); }
  txRollback() { return this.#call('txRollback',[]); }
  publish(exchange,key,body,options={}) {
    try { return this._active().publish(exchange,exchange===''?this.#connection.resolveQueue(key):key,body,options); }
    catch(error) { return Promise.reject(error); }
  }
  publishStream(exchange,key,source,bodySize,options={}) {
    try{return this._active().publishStream(exchange,exchange===''?this.#connection.resolveQueue(key):key,source,bodySize,options);}
    catch(error){return Promise.reject(error);}
  }
  publishWithDeferredConfirm(exchange,key,body,options={}) {
    return this.#deferredPublish('publishWithDeferredConfirm',exchange,key,[body,options]);
  }
  publishStreamWithDeferredConfirm(exchange,key,source,bodySize,options={}) {
    return this.#deferredPublish('publishStreamWithDeferredConfirm',exchange,key,[source,bodySize,options]);
  }
  #deferredPublish(method,exchange,key,args) {
    try {
      const raw=this._active(),generation=this.#generation;
      return raw[method](exchange,exchange===''?this.#connection.resolveQueue(key):key,...args).then(handle=>confirmationView(handle,generation));
    }catch(error){return Promise.reject(error);}
  }
  #delivery(message,raw,generation) {
    if (raw !== this.#physical || raw.closed || generation !== this.#generation || this.closed) return undefined;
    if (!message) return null;
    const original=BigInt(message.args['delivery-tag']), logical=this.#offset+original;
    if(logical>this.#lastTag)this.#lastTag=logical;
    return {...message,args:{...message.args,'delivery-tag':String(logical)}};
  }
  async get(queue,options={}) {
    const raw=this._active(), generation=this.#generation;
    return this.#call('get',[this._resolved(queue),snapshot(options)],m=>this.#delivery(m,raw,generation));
  }
  async consume(queue,callback,options={}) {
    if(typeof callback !== 'function')return Promise.reject(TypeError('Invalid consumer callback'));
    const {signal,...wireOptions}=options;checkConsumerSignal(signal);
    options={...snapshot(wireOptions),consumerTag:options.consumerTag??randomUUID()};
    if(!options.consumerTag || this.#consumers.has(options.consumerTag)||this.#pendingConsumers.has(options.consumerTag))return Promise.reject(TypeError('Duplicate or empty consumer tag'));
    if(this.#consumers.size+this.#pendingConsumers.size>=1024)return Promise.reject(Error('Recovery consumer limit reached'));
    const raw=this._active(true),generation=this.#generation;
    const entry={queue:this._queue(queue),options,raw};
    entry.callback=message=>{if(message===null){if(entry.cancelNotified)return;entry.cancelNotified=true;}return callback(message);};
    entry.dispose=observeConsumerSignal(signal,reason=>this.#abortSubscription(entry,reason));
    const requestedTag=options.consumerTag;this.#pendingConsumers.set(requestedTag,entry);
    try {return await this.#call('consume',[this._resolved(queue),m=>this.#notify(entry.callback,m,raw,generation),options],tag=>{entry.options.consumerTag=tag;if(!entry.cancelled)this.#consumers.set(tag,entry);return tag;},true);}
    catch(error){entry.dispose();throw error;}
    finally {this.#pendingConsumers.delete(requestedTag);this.#connection._consumerSettled(entry.queue);}
  }
  #abortSubscription(entry,reason) {
    if(entry.cancelled)return;
    entry.cancelRequested=true;entry.reason=reason;entry.dispose?.();
    if(!entry.raw||entry.raw.closed){this.#cancelOffline(entry);return;}
    entry.raw._abortConsumer(entry.options.consumerTag,reason).catch(error=>{
      if(entry.raw.closed)this.#cancelOffline(entry);
      else notice(this,'callbackError',error);
    });
  }
  #cancelOffline(entry) {
    if(entry.cancelled)return;
    entry.cancelled=true;entry.dispose?.();
    if(this.#consumers.get(entry.options.consumerTag)===entry)this.#consumers.delete(entry.options.consumerTag);
    // No broker acknowledgement exists here. Retain topology rather than
    // infer that an auto-delete queue recreated during recovery was deleted.
    Promise.resolve().then(()=>entry.callback(null)).catch(error=>notice(this,'callbackError',error));
    notice(this,'cancel',entry.options.consumerTag,{origin:'signal',reason:entry.reason,offline:true});
  }
  cancel(tag,options={}) { return this.#call('cancel',[tag,snapshot(options)],value=>{const entry=this.#consumers.get(tag);this.#consumers.delete(tag);entry?.dispose?.();if(entry)this.#connection._consumerGone(entry.queue);return value;},true); }
  async _restoreConsumers(keepActive=false) {
    const skipped=new Set();
    while(true) {
      const raw=this.#physical,generation=this.#generation; let restart=false;
      for(const [tag,entry] of this.#consumers) {
        if(skipped.has(tag)||entry.cancelRequested||entry.cancelled)continue;
        if(keepActive&&entry.raw===raw&&!raw.closed)continue;
        try {
          entry.raw=raw;
          await raw.consume(this.#connection.resolveQueue(entry.queue),m=>this.#notify(entry.callback,m,raw,generation),entry.options);
        } catch(error) {
          await this.#connection._entityError({type:'consumer',name:tag,channel:this.id,error});
          skipped.add(tag);
          if(raw.closed) { await this._open(this.#connection._raw);restart=true;break; }
        }
      }
      if(!restart)return;
    }
  }
  #tag(value,multiple=false) {
    this._active(); const tag=BigInt(value);
    if(tag===0n&&multiple)return '0';
    if(tag<=this.#offset||tag>this.#lastTag)throw Error('Stale or unknown delivery tag');
    return String(tag-this.#offset);
  }
  ack(tag,multiple=false) { return this.#physical.ack(this.#tag(tag,multiple),multiple); }
  nack(tag,{multiple=false,requeue=true}={}) { return this.#physical.nack(this.#tag(tag,multiple),{multiple,requeue}); }
  reject(tag,requeue=true) { return this.#physical.reject(this.#tag(tag),requeue); }
  recover(requeue=true) { return this.#call('recover',[requeue]); }
  async close() {
    if(this.closed)return;
    const raw=this.#physical,queues=new Set([...this.#consumers.values()].map(c=>c.queue));
    this._stop(Error('Channel closed by application'));
    for(const key of queues)this.#connection._consumerGone(key);
    this.#connection._removeChannel(this);
    if(raw&&!raw.closed) {
      try { await raw.close(); }
      catch(error) { if(!raw.closed)this.#connection._raw.destroy(Error('Channel close interrupted an outstanding recovery RPC',{cause:error})); }
    }
  }
}
