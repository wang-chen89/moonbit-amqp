import net from 'node:net';
import tls from 'node:tls';
import {EventEmitter} from 'node:events';
import {randomUUID} from 'node:crypto';
import * as core from '../web/engine.mjs';
import {snapshotAuthentication,authenticationPlan,responseBytes} from './authentication.mjs';
import {SendQueue,waitFor,aborted} from './outbound.mjs';
import {IncomingBodies} from './inbound.mjs';

function checked(text) {
  if (text.startsWith('ERROR:')) throw Error(text.slice(7));
  return text;
}
function integer(value, min, max, name) {
  if (!Number.isInteger(value) || value < min || value > max) throw TypeError(`Invalid ${name}`);
  return value;
}
function deferred() {
  let resolve, reject;
  const promise = new Promise((a, b) => { resolve = a; reject = b; });
  return {promise, resolve, reject};
}
function delivery(event) {
  if(event.type==='messageStart')return event;
  const {bodyHex, ...rest} = event;
  return {...rest, body: Buffer.from(bodyHex, 'hex')};
}

/** Node transport for the MoonBit AMQP 0-9-1 Session. No third-party runtime dependency. */
export class Connection extends EventEmitter {
  #key = randomUUID(); #socket; #timer; #abort; #signal; #ready = deferred();
  #connectTimer; #closed = false; #closing = false; #lastRead = performance.now(); #lastWrite = 0;
  #channels = new Map(); #closeWait; #limits; #maxBuffered; #timeout;
  #authProviders=[]; #authAbort=new AbortController(); #authenticationMechanism='';
  #secretUpdate;
  #publishWrites; #streaming=new Map(); #deferredBytes=0;
  #maxWritten=0; #drainWaits=0;
  #receiving; #pendingInput=Buffer.alloc(0); #readScheduled=false; #readPumping=false; #readEnded=false; #readBackpressured=false;
  static async connect(options = {}) {
    const connection = new Connection(options);
    await connection.#ready.promise;
    return connection;
  }
  constructor(options = {}) {
    super();
    options=snapshotAuthentication(options);
    const {host = 'localhost', port = options.tls ? 5671 : 5672, username = 'guest', password = 'guest', vhost = '/', heartbeat = 60, frameMax = 131072, channelMax = 64, timeout = 10000, signal, allowInsecureAuth = false} = options;
    if (!options.tls && !allowInsecureAuth) throw Error('SASL over TCP requires allowInsecureAuth: true; use TLS for protected credentials');
    if (typeof host !== 'string' || typeof username !== 'string' || typeof password !== 'string' || typeof vhost !== 'string') throw TypeError('Expected string connection options');
    if(options.locale!==undefined&&(typeof options.locale!=='string'||!options.locale.isWellFormed()||!options.locale.length||Buffer.byteLength(options.locale)>255||options.locale.includes(' ')))throw TypeError('Invalid authentication locale');
    integer(port, 1, 65535, 'port'); integer(heartbeat, 0, 65535, 'heartbeat');
    integer(frameMax, 4096, 16777216, 'frameMax'); integer(channelMax, 1, 65535, 'channelMax');
    this.#timeout = integer(timeout, 1, 2147483647, 'timeout');
    this.#maxBuffered = integer(options.maxBufferedBytes ?? 33554432, 1048576, 134217728, 'maxBufferedBytes');
    this.#publishWrites=new SendQueue(this.#maxBuffered,4096);
    if(options.streamBodies!==undefined&&typeof options.streamBodies!=='boolean')throw TypeError('Invalid streamBodies');
    const receiveHighWaterMark=integer(options.receiveHighWaterMark??262144,4096,134217728,'receiveHighWaterMark');
    if(options.streamBodies)this.#receiving=new IncomingBodies({highWaterMark:receiveHighWaterMark,frameMax,timeout:this.#timeout,changed:()=>this.#resumeRead(),fail:error=>this._fail(error)});
    if (signal?.aborted) throw signal.reason ?? Error('Aborted');
    const auth=authenticationPlan(options.sasl);this.#authProviders=auth.providers;
    const initial = JSON.parse(checked((options.streamBodies?core.session_open_stream_auth:core.session_open_auth)(this.#key, JSON.stringify(auth.descriptors), vhost, options.locale??'en_US', channelMax, frameMax, heartbeat)));
    this.#limits = initial;
    try {
      this.#socket = options.tls ? tls.connect({...options.tls, host, port}) : net.connect({host, port});
    } catch (e) { core.session_drop(this.#key); throw e; }
    this.#socket.setNoDelay(true);
    this.#socket.on(options.tls ? 'secureConnect' : 'connect', () => {
      try { this.#write(initial.output); } catch (e) { this._fail(e); }
    });
    this.#socket.on('data', bytes => {
      try {
        this.#lastRead = performance.now();
        if(this.#receiving){
          if(this.#pendingInput.length)throw Error('Overlapping paused socket input');
          if(bytes.length>1048576)throw Error('Socket input chunk limit exceeded');
          this.#socket.pause();this.#pendingInput=bytes;this.#pumpRead();return;
        }
        // MoonBit bridge accepts bounded chunks, independent of socket chunk sizing.
        for (let i = 0; i < bytes.length; i += 65536) this.#process(core.session_feed(this.#key, bytes.subarray(i, i + 65536).toString('hex')));
      } catch (e) { this._fail(e); }
    });
    this.#socket.on('error', e => this._fail(e));
    this.#socket.on('end', () => {
      this.#readEnded=true;if(!this.#pendingInput.length)this.#finishRead();
    });
    this.#socket.on('close', () => { if (!this.#closed&&!(this.#readEnded&&this.#pendingInput.length)) this._fail(Error('Socket closed')); });
    this.#connectTimer = setTimeout(() => this._fail(Error('AMQP handshake timeout')), timeout);
    if (signal) {
      this.#signal = signal;
      this.#abort = () => this._fail(signal.reason instanceof Error ? signal.reason : Error('Aborted'));
      signal.addEventListener('abort', this.#abort, {once: true});
    }
  }
  get closed() { return this.#closed; }
  get closing() { return this.#closing; }
  get limits() { const {channelMax, frameMax, heartbeat} = this.#limits; return {channelMax, frameMax, heartbeat}; }
  get timeout() { return this.#timeout; }
  get maxBufferedBytes() { return this.#maxBuffered; }
  get writeStats() { return {socketBufferedBytes:this.#socket.writableLength,maxObservedSocketBytes:this.#maxWritten,drainWaits:this.#drainWaits,streamingChannels:this.#streaming.size,deferredProtocolBytes:this.#deferredBytes}; }
  get readStats() { return this.#receiving?{...this.#receiving.stats,pendingInputBytes:this.#pendingInput.length}:undefined; }
  #finishRead(){if(this.#closed)return;try{checked(core.session_finish(this.#key));this._fail(Error('Unexpected EOF'));}catch(error){this._fail(error);}}
  #resumeRead(){
    if(this.#closed||this.#readScheduled||this.#receiving.paused)return;
    // Yield between decode batches so a hot connection cannot starve other sockets or timers.
    this.#readScheduled=true;setImmediate(()=>{this.#readScheduled=false;if(this.#closed||this.#receiving.paused)return;if(this.#readBackpressured){this.#readBackpressured=false;this.#lastRead=performance.now();}if(this.#pendingInput.length)this.#pumpRead();else if(this.#readEnded)this.#finishRead();else this.#socket.resume();});
  }
  #pumpRead(){
    if(this.#closed||this.#readPumping)return;this.#readPumping=true;
    try{
      if(this.#pendingInput.length&&!this.#receiving.paused&&!this.#closed){
        const bytes=this.#pendingInput.subarray(0,65536);this.#pendingInput=this.#pendingInput.subarray(bytes.length);
        this.#process(core.session_feed(this.#key,bytes.toString('hex')));
      }
      if(this.#receiving.paused)this.#readBackpressured=true;
      if(!this.#closed){if(!this.#pendingInput.length&&this.#readEnded)this.#finishRead();else if(!this.#receiving.paused)this.#resumeRead();}
    }catch(error){this._fail(error);}finally{this.#readPumping=false;}
  }
  _assertIncomingComplete(channel,tag,multiple=false){this.#receiving?.assertComplete(channel,tag,multiple);}
  _closeIncomingChannel(channel,error){this.#receiving?.closeChannel(channel,error);}
  _discardIncomingChannel(channel){this.#receiving?.discardChannel(channel);}
  get authenticationMechanism() { return this.#authenticationMechanism; }
  #write(hexFrames,owner=0) {
    if (this.#closed) throw Error('Connection closed');
    const writable=[];
    for(const hex of hexFrames){
      const channel=parseInt(hex.slice(2,6),16),closeOk=hex.startsWith('01')&&hex.slice(14,22)==='00140029';
      if(channel!==owner&&this.#streaming.has(channel)&&!closeOk){
        const size=hex.length/2;
        if(size>this.#maxBuffered-this.#deferredBytes)throw Error('Deferred protocol output limit exceeded');
        const active=this.#streaming.get(channel);active.frames.push(hex);active.bytes+=size;this.#deferredBytes+=size;
      }else writable.push(hex);
    }
    hexFrames=writable;
    const bytes = hexFrames.reduce((n, x) => n + x.length / 2, 0);
    if (this.#socket.writableLength + bytes > this.#maxBuffered) {
      const e = Error('Outgoing buffer limit exceeded'); this._fail(e); throw e;
    }
    if (bytes) {
      this.#socket.write(Buffer.concat(hexFrames.map(hex => Buffer.from(hex, 'hex'))));
      this.#maxWritten=Math.max(this.#maxWritten,this.#socket.writableLength);
      this.#lastWrite = performance.now();
    }
  }
  #process(text,owner=0) {
    const result = typeof text==='string'?JSON.parse(checked(text)):text;
    this.#authenticationMechanism=result.authenticationMechanism;
    this.#limits = {channelMax: result.channelMax, frameMax: result.frameMax, heartbeat: result.heartbeat};
    if(this.#receiving)this.#receiving.frameMax=result.frameMax;
    this.#write(result.output,owner);
    for (const e of result.events) {
      if(e.type==='messageData'){this.#receiving.push(e);continue;}
      if(e.type==='messageEnd'){this.#receiving.end(e.channel);continue;}
      if(e.type==='messageStart'){e.body=this.#receiving.start(e);e.completed=e.body.completed;}
      if(e.type==='authenticate') {
        const provider=this.#authProviders[e.index];
        if(!provider)throw Error('Missing selected authentication provider');
        Promise.resolve().then(()=>{
          if(this.#closed)throw Error('Connection closed during authentication');
          return provider({mechanism:e.mechanism,signal:this.#authAbort.signal});
        }).then(value=>{
          if(!this.#closed)this.#process(core.session_auth_response(this.#key,responseBytes(value).toString('hex')));
        }).catch(error=>{if(!this.#closed)this._fail(error);});
      } else if (e.type === 'ready') {
        this.#authProviders=[];
        clearTimeout(this.#connectTimer);
        if (result.heartbeat) {
          this.#timer = setInterval(() => {
            try {
              const now = performance.now(), ms = result.heartbeat * 1000;
              if (!this.#receiving?.paused&&now - this.#lastRead > ms) throw Error('AMQP heartbeat timeout');
              if (now - this.#lastWrite >= ms / 2) this.#write([checked(core.session_heartbeat(this.#key))]);
            } catch (error) { this._fail(error); }
          }, Math.max(100, result.heartbeat * 250));
          this.#timer.unref();
        }
        this.#ready.resolve(this);
      } else if (e.type === 'closed') {
        const error = Error(`AMQP connection closed ${e.code}: ${e.reason}`);
        error.code = e.code;
        if (this.#closing && e.code === 200) this.#closeWait.resolve();
        else this.#closeWait?.reject(error);
        this.#terminate(error, true);
      } else if (e.channel === 0) {
        if(e.name==='connection.update-secret-ok') {
          if(!this.#secretUpdate)throw Error('Unexpected credential update reply');
          const pending=this.#secretUpdate;this.#secretUpdate=undefined;
          clearTimeout(pending.timer);pending.resolve();
        } else if(e.name==='connection.blocked'||e.name==='connection.unblocked') {
          this.emit(e.name === 'connection.blocked' ? 'blocked' : 'unblocked', e.args);
        } else throw Error('Unexpected connection method');
      } else {
        const channel = this.#channels.get(e.channel);
        if (!channel) throw Error('Response for unallocated channel');
        channel._receive(e);
        if (e.type === 'channelClosed') {
          this.#channels.delete(e.channel);
          const active=this.#streaming.get(e.channel);
          if(active){this.#streaming.delete(e.channel);this.#deferredBytes-=active.bytes;active.bytes=0;active.frames=[];}
        }
      }
    }
  }
  _send(channel, name, args) {
    if (this.#closed) throw Error('Connection closed');
    this.#process(core.session_send(this.#key, channel, name, typeof args==='string'?args:JSON.stringify(args)));
  }
  async #writable(signals) {
    while(this.#socket.writableNeedDrain){
      this.#drainWaits++;
      let listener;const drained=new Promise(resolve=>{listener=resolve;this.#socket.once('drain',listener);});
      try{await waitFor(drained,this.#timeout,[this.#authAbort.signal,...signals]);}finally{this.#socket.off('drain',listener);}
    }
    if(this.#closed)throw Error('Connection closed');
    for(const signal of signals)if(signal?.aborted)throw aborted(signal);
  }
  _sendQueued(channel,name,args,beforeSend,signals=[]) {
    return this.#publishWrites.run(async()=>{await this.#writable(signals);beforeSend?.();this._send(channel,name,args);},{signal:signals[0]});
  }
  async _publishStream(channel,exchange,key,source,size,properties,mandatory,signals,onStart) {
    let iterator,started=false,completed=false,remaining=size;
    const physical=this.#channels.get(channel);
    const active={physical,frames:[],bytes:0};
    const activeSignals=[this.#authAbort.signal,...signals];
    const write=action=>this.#publishWrites.run(async()=>{await this.#writable(activeSignals);action();});
    try {
      for(const signal of activeSignals)if(signal?.aborted)throw aborted(signal);
      iterator=source[Symbol.asyncIterator]?.()??source[Symbol.iterator]?.();
      if(!iterator||typeof iterator.next!=='function')throw TypeError('Source must be an iterable of byte chunks');
      await write(()=>{
        const result=JSON.parse(checked(core.session_publish_start(this.#key,channel,exchange,key,String(size),properties,mandatory)));
        onStart();started=true;this.#streaming.set(channel,active);this.#process(result,channel);
      });
      let empty=0,pieces=0;
      while(true){
        const part=await waitFor(Promise.resolve().then(()=>iterator.next()),this.#timeout,activeSignals);
        if(!part||typeof part!=='object')throw TypeError('Invalid iterator result');
        if(part.done){if(remaining!==0n)throw Error('Body source ended before declared size');break;}
        if(!(part.value instanceof Uint8Array))throw TypeError('Body source must yield byte chunks');
        const chunk=part.value;
        if(chunk.length===0){if(++empty>1024)throw Error('Too many empty body chunks');continue;}
        empty=0;
        if(BigInt(chunk.length)>remaining)throw Error('Body source exceeds declared size');
        for(let offset=0;offset<chunk.length;){
          const count=Math.min(65536,this.#limits.frameMax-8,chunk.length-offset);
          const hex=Buffer.from(chunk.buffer,chunk.byteOffset+offset,count).toString('hex');
          await write(()=>this.#process(core.session_publish_body(this.#key,channel,hex),channel));
          remaining-=BigInt(count);offset+=count;
          // A writable kernel buffer must not starve incoming confirms/heartbeats.
          if(++pieces%16===0)await waitFor(new Promise(resolve=>setImmediate(resolve)),this.#timeout,activeSignals);
        }
      }
      await write(()=>{});completed=true;
    }catch(error){if(started&&!physical.closed)this._fail(error);throw error;}
    finally{
      if(this.#streaming.get(channel)===active){this.#streaming.delete(channel);this.#deferredBytes-=active.bytes;}
      if(!this.#closed&&this.#channels.get(channel)===physical&&!physical.closed&&active.frames.length){try{this.#write(active.frames);}catch(error){this._fail(error);throw error;}}
      if(!completed&&iterator?.return)Promise.resolve().then(()=>iterator.return()).catch(()=>{});
      if(!completed&&started&&typeof source.destroy==='function'){source.once?.('error',()=>{});source.destroy();}
    }
  }
  _fail(error) { this.#terminate(error, false); }
  #terminate(error, graceful) {
    if (this.#closed) return;
    this.#closed = true;
    this.#receiving?.close(error);this.#pendingInput=Buffer.alloc(0);
    this.#publishWrites.close(error);this.#streaming.clear();this.#deferredBytes=0;
    this.#authAbort.abort(error);this.#authProviders=[];
    clearTimeout(this.#connectTimer); clearInterval(this.#timer);
    this.#signal?.removeEventListener('abort', this.#abort);
    this.#ready.reject(error); this.#closeWait?.reject(error);
    if(this.#secretUpdate){clearTimeout(this.#secretUpdate.timer);this.#secretUpdate.reject(error);this.#secretUpdate=undefined;}
    for (const ch of this.#channels.values()) ch._terminate(error);
    this.#channels.clear(); core.session_drop(this.#key);
    if (graceful) this.#socket.end(); else this.#socket.destroy();
    this.emit('close', error);
  }
  async openChannel() {
    if (this.#closed || this.#closing) throw Error('Connection is closing or closed');
    let id = 1;
    while (this.#channels.has(id) && id <= this.#limits.channelMax) id++;
    if (id > this.#limits.channelMax) throw Error('Channel limit reached');
    const ch = new Channel(this, id); this.#channels.set(id, ch);
    try { await ch._rpc('channel.open', [''], ['channel.open-ok']); return ch; }
    catch (e) { this.#channels.delete(id); throw e; }
  }
  updateSecret(secret,reason='Credential refreshed') {
    try {
      if(this.#closed||this.#closing)throw Error('Connection is closing or closed');
      if(this.#secretUpdate)throw Error('One credential update may be outstanding; await it first');
      const bytes=responseBytes(secret);
      if(typeof reason!=='string'||!reason.isWellFormed()||Buffer.byteLength(reason)>255)throw TypeError('Invalid credential update reason');
      const pending=deferred();
      pending.timer=setTimeout(()=>this._fail(Error('Credential update timeout; outcome may be unknown')),this.#timeout);
      this.#secretUpdate=pending;
      try {this._send(0,'connection.update-secret',[bytes.toString('hex'),reason]);}
      catch(error){clearTimeout(pending.timer);this.#secretUpdate=undefined;pending.reject(error);}
      return pending.promise;
    } catch(error) {return Promise.reject(error);}
  }
  async close() {
    if (this.#closed) return;
    if (this.#closing) return this.#closeWait.promise;
    this.#closing = true; this.#closeWait = deferred();
    this.#receiving?.discardAll();
    this.#closeWait.promise.catch(()=>{});
    const timer = setTimeout(() => this._fail(Error('Close timeout')), this.#timeout);
    try { await Promise.all([...this.#channels.values()].map(ch=>ch._flushOutput()));await this._sendQueued(0, 'connection.close', [200, 'normal close', 0, 0]); await this.#closeWait.promise; }
    catch (error) { this.#closeWait.promise.catch(() => {}); this._fail(error); throw error; }
    finally { clearTimeout(timer); }
  }
  destroy(reason = Error('Connection destroyed')) { this._fail(reason); }
}

export class Channel extends EventEmitter {
  #connection; #pending; #closed = false; #consumers = new Map(); #id;
  #mode = 'normal'; #nextConfirm = 1n; #confirms = new Map();
  #sends; #sendAbort=new AbortController(); #publications=0;
  constructor(connection, id) { super(); this.#connection = connection; this.#id = id; this.#sends=new SendQueue(connection.maxBufferedBytes); }
  get id() { return this.#id; }
  get closed() { return this.#closed; }
  async _flushOutput() { if(this.#closed)return;await this.#sends.idle();await Promise.allSettled([...this.#confirms.values()].map(p=>p.promise)); }
  _rpc(name, args, expected, apply = e => e.args) {
    if (this.#closed) return Promise.reject(Error('Channel closed'));
    if (this.#connection.closing) return Promise.reject(Error('Connection closing'));
    if (this.#pending) return Promise.reject(Error('One RPC may be outstanding per channel; await it or use another channel'));
    const p = deferred();
    const pending={...p,expected,apply};this.#pending=pending;
    try {
      const encoded=JSON.stringify(args);
      this.#sends.run(()=>this.#connection._sendQueued(this.id,name,encoded,()=>{pending.timer=setTimeout(()=>this.#connection._fail(Error(`RPC timeout: ${name}`)),this.#connection.timeout);},[this.#sendAbort.signal])).catch(e=>{
        clearTimeout(pending.timer);if(this.#pending===pending)this.#pending=undefined;p.reject(e);
      });
    }catch(e){this.#pending=undefined;p.reject(e);}
    return p.promise;
  }
  #request(name,args,expected,noWait,local,apply){
    if(typeof noWait!=='boolean')return Promise.reject(TypeError('Invalid noWait'));
    if(!noWait)return this._rpc(name,args,expected,apply);
    try{
      if(this.#closed||this.#connection.closing)throw Error('Channel unavailable');
      const encoded=JSON.stringify(args);
      // No reply slot or RPC timer: a later broker rejection is a channel close.
      return this.#sends.run(()=>this.#connection._sendQueued(this.id,name,encoded,undefined,[this.#sendAbort.signal])).then(()=>local());
    }catch(error){return Promise.reject(error);}
  }
  #notify(callback, message) {
    // User callback failures do not corrupt framing or leave a rejected Promise unobserved.
    Promise.resolve().then(() => callback(message)).catch(e => {if(message?.type==='messageStart')message.body.discard().catch(()=>{});this.emit('callbackError', e);});
  }
  _receive(e) {
    if (e.type === 'channelClosed') {
      const error = Error(`AMQP channel closed ${e.code}: ${e.reason}`); error.code = e.code;
      if (e.code === 200 && this.#pending?.expected.includes('channelClosed')) {
        clearTimeout(this.#pending.timer); this.#pending.resolve(); this.#pending = undefined;
      }
      this._terminate(error); return;
    }
    if (e.name === 'basic.ack' || e.name === 'basic.nack') {
      const tag = BigInt(e.args['delivery-tag']), multiple = e.args.multiple;
      if (this.#mode !== 'confirm' || (tag >= this.#nextConfirm) || (!multiple && !this.#confirms.has(tag))) throw Error('Invalid publisher confirmation');
      for (const [seq, p] of this.#confirms) {
        if (seq === tag || (multiple && (tag === 0n || seq <= tag))) {
          clearTimeout(p.timer); this.#confirms.delete(seq);
          if (e.name === 'basic.ack') p.resolve({deliveryTag: seq});
          else p.reject(Error(`Publisher nack: ${seq}`));
        }
      }
    } else if (e.name === 'basic.return') {
      if(!this.emit('return', delivery(e))&&e.type==='messageStart')e.body.discard().catch(()=>{});
    } else if (e.name === 'basic.deliver') {
      const callback = this.#consumers.get(e.args['consumer-tag']);
      if(callback)this.#notify(callback, delivery(e));
      // Like the reference client, discard deliveries for a removed consumer.
      // A no-wait cancel can leave frames already in flight; never ack them.
      else if(e.type==='messageStart')e.body.discard().catch(()=>{});
    } else if (e.name === 'basic.cancel') {
      const tag = e.args['consumer-tag'];
      if (!e.args['no-wait']) this.#oneWay('basic.cancel-ok', [tag],true);
      const callback = this.#consumers.get(tag); this.#consumers.delete(tag);
      if (callback) this.#notify(callback, null);
      this.emit('cancel', tag);
    } else if (this.#pending?.expected.includes(e.name)) {
      const p = this.#pending; this.#pending = undefined; clearTimeout(p.timer);
      try { p.resolve(p.apply(e)); } catch (error) { p.reject(error); throw error; }
    } else if (e.name !== 'channel.flow') throw Error(`Unexpected method ${e.name}`);
  }
  _terminate(error) {
    if (this.#closed) return;
    this.#closed = true;
    this.#connection._closeIncomingChannel(this.id,error);
    this.#sendAbort.abort(error);this.#sends.close(error);
    if (this.#pending) { clearTimeout(this.#pending.timer); this.#pending.reject(error); this.#pending = undefined; }
    for (const p of this.#confirms.values()) { clearTimeout(p.timer); p.reject(error); }
    this.#confirms.clear(); this.#consumers.clear(); this.emit('close', error);
  }
  declareQueue(queue = '', {passive = false, durable = false, exclusive = false, autoDelete = false, noWait = false, arguments: args = {}} = {}) {
    return this.#request('queue.declare', [0, queue, passive, durable, exclusive, autoDelete, noWait, args], ['queue.declare-ok'],noWait,()=>({queue,'message-count':0,'consumer-count':0}));
  }
  deleteQueue(queue, {ifUnused = false, ifEmpty = false, noWait = false} = {}) { return this.#request('queue.delete', [0, queue, ifUnused, ifEmpty, noWait], ['queue.delete-ok'],noWait,()=>({'message-count':0})); }
  purgeQueue(queue,{noWait=false}={}) { return this.#request('queue.purge', [0, queue, noWait], ['queue.purge-ok'],noWait,()=>({'message-count':0})); }
  bindQueue(queue, exchange, routingKey = '', args = {},{noWait=false}={}) { return this.#request('queue.bind', [0, queue, exchange, routingKey, noWait, args], ['queue.bind-ok'],noWait,()=>({})); }
  unbindQueue(queue, exchange, routingKey = '', args = {}) { return this._rpc('queue.unbind', [0, queue, exchange, routingKey, args], ['queue.unbind-ok']); }
  declareExchange(exchange, type = 'direct', {passive = false, durable = false, autoDelete = false, internal = false, noWait = false, arguments: args = {}} = {}) {
    return this.#request('exchange.declare', [0, exchange, type, passive, durable, autoDelete, internal, noWait, args], ['exchange.declare-ok'],noWait,()=>({}));
  }
  deleteExchange(exchange, {ifUnused = false,noWait=false} = {}) { return this.#request('exchange.delete', [0, exchange, ifUnused, noWait], ['exchange.delete-ok'],noWait,()=>({})); }
  bindExchange(destination, source, routingKey = '', args = {},{noWait=false}={}) { return this.#request('exchange.bind', [0, destination, source, routingKey, noWait, args], ['exchange.bind-ok'],noWait,()=>({})); }
  unbindExchange(destination, source, routingKey = '', args = {},{noWait=false}={}) { return this.#request('exchange.unbind', [0, destination, source, routingKey, noWait, args], ['exchange.unbind-ok'],noWait,()=>({})); }
  qos(prefetchCount, global = false) { return this._rpc('basic.qos', [0, prefetchCount, global], ['basic.qos-ok']); }
  get(queue, {noAck = false} = {}) { return this._rpc('basic.get', [0, queue, noAck], ['basic.get-ok', 'basic.get-empty'], e => e.name === 'basic.get-empty' ? null : delivery(e)); }
  consume(queue, callback, {consumerTag = randomUUID(), noAck = false, exclusive = false, noWait=false, arguments: args = {}} = {}) {
    if (typeof callback !== 'function' || !consumerTag || this.#consumers.has(consumerTag)) return Promise.reject(TypeError('Invalid callback or duplicate/empty consumer tag'));
    if(this.#consumers.size>=1024)return Promise.reject(Error('Consumer limit: 1024'));
    if(typeof noWait!=='boolean')return Promise.reject(TypeError('Invalid noWait'));
    if(noWait)this.#consumers.set(consumerTag,callback);
    return this.#request('basic.consume', [0, queue, consumerTag, false, noAck, exclusive, noWait, args], ['basic.consume-ok'],noWait,()=>consumerTag, e => {
      const tag = e.args['consumer-tag']; this.#consumers.set(tag, callback); return tag;
    }).catch(error=>{if(noWait&&this.#consumers.get(consumerTag)===callback)this.#consumers.delete(consumerTag);throw error;});
  }
  cancel(consumerTag,{noWait=false}={}) { return this.#request('basic.cancel', [consumerTag, noWait], ['basic.cancel-ok'],noWait,()=>{this.#consumers.delete(consumerTag);}, e => { this.#consumers.delete(e.args['consumer-tag']); }); }
  #oneWay(name,args,internal=false){if(this.#closed)throw Error('Channel closed');if(!internal&&this.#connection.closing)throw Error('Connection closing');const encoded=JSON.stringify(args);const sent=this.#sends.run(()=>this.#connection._sendQueued(this.id,name,encoded,undefined,[this.#sendAbort.signal]));sent.catch(error=>{if(!this.#closed)this.#connection._fail(error);});return sent;}
  ack(deliveryTag, multiple = false) { this.#connection._assertIncomingComplete(this.id,deliveryTag,multiple);return this.#oneWay('basic.ack', [String(deliveryTag), multiple]); }
  nack(deliveryTag, {multiple = false, requeue = true} = {}) { this.#connection._assertIncomingComplete(this.id,deliveryTag,multiple);return this.#oneWay('basic.nack', [String(deliveryTag), multiple, requeue]); }
  reject(deliveryTag, requeue = true) { this.#connection._assertIncomingComplete(this.id,deliveryTag);return this.#oneWay('basic.reject', [String(deliveryTag), requeue]); }
  recover(requeue = true) { return this._rpc('basic.recover', [requeue], ['basic.recover-ok']); }
  async confirmSelect({noWait=false}={}) {
    if(typeof noWait!=='boolean')throw TypeError('Invalid noWait');
    if (this.#mode === 'confirm') return;
    if (this.#mode !== 'normal') throw Error('Confirm and transaction modes are exclusive');
    this.#mode = 'selecting';
    try { await this.#request('confirm.select', [noWait], ['confirm.select-ok'],noWait,()=>{this.#mode='confirm';}, () => { this.#mode = 'confirm'; }); }
    catch (e) { this.#mode = 'normal'; throw e; }
  }
  async txSelect() {
    if (this.#mode === 'transaction') return;
    if (this.#mode !== 'normal') throw Error('Confirm and transaction modes are exclusive');
    this.#mode = 'selecting';
    try { await this._rpc('tx.select', [], ['tx.select-ok'], () => { this.#mode = 'transaction'; }); }
    catch (e) { this.#mode = 'normal'; throw e; }
  }
  txCommit() { if (this.#mode !== 'transaction') return Promise.reject(Error('Not in transaction mode')); return this._rpc('tx.commit', [], ['tx.commit-ok']); }
  txRollback() { if (this.#mode !== 'transaction') return Promise.reject(Error('Not in transaction mode')); return this._rpc('tx.rollback', [], ['tx.rollback-ok']); }
  publish(exchange,routingKey,body,options={}) {
    try{
      if(!(typeof body==='string'||body instanceof Uint8Array))throw TypeError('Body must be string or bytes');
      const length=typeof body==='string'?Buffer.byteLength(body):body.byteLength;
      if(length>this.#connection.maxBufferedBytes)throw Error('Buffered body limit; use publishStream');
      const bytes=Buffer.from(body);
      return this.#publication(exchange,routingKey,[bytes],BigInt(bytes.length),options,bytes.length);
    }catch(error){return Promise.reject(error);}
  }
  publishStream(exchange,routingKey,source,bodySize,options={}) {
    try{
      if(typeof bodySize!=='bigint'&&(!Number.isSafeInteger(bodySize)||bodySize<0))throw TypeError('Invalid declared body size');
      const size=BigInt(bodySize);if(size<0n||size>0xffffffffffffffffn)throw TypeError('Invalid declared body size');
      if(!source||!(typeof source[Symbol.asyncIterator]==='function'||typeof source[Symbol.iterator]==='function'))throw TypeError('Source must be an iterable of byte chunks');
      return this.#publication(exchange,routingKey,source,size,options,0);
    }catch(error){return Promise.reject(error);}
  }
  #publication(exchange,key,source,size,{properties={},mandatory=false,signal}={},bytes) {
    if(this.#closed||this.#connection.closing||this.#mode==='selecting')return Promise.reject(Error('Channel unavailable'));
    if(this.#publications>=1024)return Promise.reject(Error('Unconfirmed or queued publish limit: 1024'));
    const encoded=JSON.stringify(properties),confirm=this.#mode==='confirm';let pending,seq;
    this.#publications++;
    const sending=this.#sends.run(async()=>{
      await this.#connection._publishStream(this.id,exchange,key,source,size,encoded,mandatory,[this.#sendAbort.signal,signal],()=>{
        if(confirm){seq=this.#nextConfirm++;pending=deferred();pending.promise.catch(()=>{});this.#confirms.set(seq,pending);}
      });
      if(pending&&this.#confirms.has(seq))pending.timer=setTimeout(()=>this.#connection._fail(Error(`Publisher confirm timeout: ${seq}`)),this.#connection.timeout);
    },{bytes,signal});
    return sending.then(()=>pending?.promise).catch(error=>{
      if(pending){clearTimeout(pending.timer);this.#confirms.delete(seq);pending.reject(error);}throw error;
    }).finally(()=>{this.#publications--;});
  }
  close() { this.#connection._discardIncomingChannel(this.id);return this._rpc('channel.close', [200, 'normal close', 0, 0], ['channelClosed']); }
}

export const connect = async options => {
  options=snapshotAuthentication(options);
  if (options?.recovery) {
    const {RecoveringConnection} = await import('./recovery.mjs');
    return RecoveringConnection.connect(options, opts => Connection.connect(opts));
  }
  return Connection.connect(options);
};
