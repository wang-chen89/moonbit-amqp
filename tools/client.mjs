import {EventEmitter} from 'node:events';
import {randomUUID} from 'node:crypto';
import * as core from '../web/engine.mjs';
import {snapshotAuthentication,authenticationPlan,responseBytes} from './authentication.mjs';
import {connectionOptions} from './uri.mjs';
export {parseURI} from './uri.mjs';
import {snapshotProperties,propertiesJSON,cloneMetadata,socketAddresses,tlsSnapshot} from './connection-metadata.mjs';
export {newConnectionProperties} from './connection-metadata.mjs';
import {SendQueue,waitFor,aborted} from './outbound.mjs';
import {IncomingBodies} from './inbound.mjs';
import {checkConsumerSignal,observeConsumerSignal} from './consumer-signal.mjs';
import {createConfirmation,emitConfirmation} from './confirmations.mjs';
import {openOptions,validateTransportOptions,suppliedTLS,startTransport,finishTransportHandshake} from './transport.mjs';
export {defaultDial} from './transport.mjs';
import {emptyTopologyConfiguration} from './topology-query.mjs';
import {RecoveryCancellation,recoveryClosed} from './recovery-control.mjs';
import {closeDeadlineMillis,closeDeadlineError,connectionClosedError,armCloseDeadline} from './close-deadline.mjs';

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
  #recoveryCancellation=new RecoveryCancellation();
  #key = randomUUID(); #socket; #timer; #abort; #signal; #ready = deferred();
  #connectTimer; #closed = false; #closing = false; #lastRead = performance.now(); #lastWrite = 0;
  #deadlineClosing=false;
  #channels = new Map(); #closeWait; #limits; #maxBuffered; #timeout;
  #authProviders=[]; #authAbort=new AbortController(); #authenticationMechanism='';
  #secretUpdate;
  #metadata; #addresses={localAddress:null,remoteAddress:null}; #tlsInfo; #tlsName; #transportReady=false;
  #publishWrites; #streaming=new Map(); #deferredBytes=0;
  #maxWritten=0; #drainWaits=0;
  #receiving; #pendingInput=Buffer.alloc(0); #readScheduled=false; #readPumping=false; #readEnded=false; #readBackpressured=false;
  static async connect(options = {}, overrides) {
    const connection = new Connection(connectionOptions(options,overrides));
    await connection.#ready.promise;
    return connection;
  }
  static async open(stream, options = {}) {
    const connection = new Connection(openOptions(stream, options));
    await connection.#ready.promise;
    return connection;
  }
  constructor(options = {}) {
    super();
    options=snapshotProperties(snapshotAuthentication(connectionOptions(options)));
    validateTransportOptions(options);
    const {host = 'localhost', port = options.tls ? 5671 : 5672, username = 'guest', password = 'guest', vhost = '/', heartbeat = 60, frameMax = 131072, channelMax = 64, timeout = 10000, signal, allowInsecureAuth = false} = options;
    if (!options.tls && !suppliedTLS(options) && !allowInsecureAuth) throw Error('SASL over TCP requires allowInsecureAuth: true; use TLS for protected credentials');
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
    const initial = JSON.parse(checked(core.session_open_auth_properties(this.#key, JSON.stringify(auth.descriptors), vhost, options.locale??'en_US', channelMax, frameMax, heartbeat, options.streamBodies??false, propertiesJSON(options))));
    this.#limits = initial;
    this.#metadata=JSON.parse(checked(core.session_metadata(this.#key)));
    this.#tlsName=options.tls?(options.tls.servername||host):'';
    this.#tlsInfo=tlsSnapshot({},this.#tlsName);
    this.#ready.promise.catch(()=>{});
    this.#connectTimer = setTimeout(() => this._fail(Error('AMQP handshake timeout')), timeout);
    if (signal) {
      this.#signal = signal;
      this.#abort = () => this._fail(signal.reason instanceof Error ? signal.reason : Error('Aborted'));
      signal.addEventListener('abort', this.#abort, {once: true});
    }
    startTransport(options,this.#authAbort.signal,stream=>{
      this.#socket=stream;
      stream.on('error',error=>{if(stream===this.#socket)this._fail(error);});
      stream.once('close',()=>{if(stream===this.#socket&&!this.#closed&&!(this.#readEnded&&this.#pendingInput.length))this._fail(Error('Socket closed'));});
    },stream=>this.#attachTransport(stream,initial.output)).catch(error=>this._fail(error));
  }
  #attachTransport(stream,output) {
    if(this.#closed){stream.destroy();return;}
    this.#socket=stream;stream.setNoDelay?.(true);
    this.#transportReady=true;this.#addresses=socketAddresses(stream);
    if(!this.#tlsName)this.#tlsName=stream.servername||'';
    this.#tlsInfo=tlsSnapshot(stream,this.#tlsName,true);
    this.#socket.on('data', bytes => {
      try {
        if(!(bytes instanceof Uint8Array))throw TypeError('Transport must yield bytes');
        if(!Buffer.isBuffer(bytes))bytes=Buffer.from(bytes.buffer,bytes.byteOffset,bytes.byteLength);
        this.#lastRead = performance.now();
        if(this.#pendingInput.length)throw Error('Overlapping paused socket input');
        if(this.#receiving&&bytes.length>1048576)throw Error('Socket input chunk limit exceeded');
        // A Duplex may push replies synchronously inside write(). Pause first and
        // decode on the next turn so replies cannot re-enter an active send.
        this.#socket.pause();this.#pendingInput=bytes;this.#resumeRead();
      } catch (e) { this._fail(e); }
    });
    this.#socket.on('end', () => {
      this.#readEnded=true;if(!this.#pendingInput.length)this.#finishRead();
    });
    this.#write(output);stream.resume();
  }
  get closed() { return this.#closed; }
  reconnect() { return Promise.reject(recoveryClosed()); }
  notifyRecoveryCancel() { return this.#recoveryCancellation.wait(); }
  get recoveryEnabled() { return false; }
  get connectionRecoveryEnabled() { return false; }
  get topologyRecoveryEnabled() { return false; }
  get maxRetryCount() { return 0; }
  get retryInterval() { return 0; }
  get reconnectionConfig() { return null; }
  get recoveryConfig() { return null; }
  topologyConfiguration() { return emptyTopologyConfiguration(); }
  get closing() { return this.#closing; }
  get clientProperties() { return cloneMetadata(this.#metadata.clientProperties); }
  get serverProperties() { return cloneMetadata(this.#metadata.serverProperties); }
  get serverLocales() { return [...this.#metadata.serverLocales]; }
  get serverVersion() { return cloneMetadata(this.#metadata.serverVersion); }
  get localAddress() { return cloneMetadata(this.#addresses.localAddress); }
  get remoteAddress() { return cloneMetadata(this.#addresses.remoteAddress); }
  get tlsState() {
    if(!this.#closed&&this.#transportReady)this.#tlsInfo=tlsSnapshot(this.#socket,this.#tlsName,true);
    return cloneMetadata(this.#tlsInfo);
  }
  get config() { return {vhost:this.#metadata.vhost,locale:this.#metadata.locale,...this.limits,authenticationMechanism:this.#authenticationMechanism,properties:this.clientProperties}; }
  get connectionInfo() { return {...cloneMetadata(this.#metadata),...cloneMetadata(this.#addresses),tlsState:this.tlsState,limits:this.limits,authenticationMechanism:this.#authenticationMechanism,closed:this.#closed}; }
  get limits() { const {channelMax, frameMax, heartbeat} = this.#limits; return {channelMax, frameMax, heartbeat}; }
  get timeout() { return this.#timeout; }
  get maxBufferedBytes() { return this.#maxBuffered; }
  get writeStats() { return {socketBufferedBytes:this.#socket?.writableLength??0,maxObservedSocketBytes:this.#maxWritten,drainWaits:this.#drainWaits,streamingChannels:this.#streaming.size,deferredProtocolBytes:this.#deferredBytes}; }
  get readStats() { return this.#receiving?{...this.#receiving.stats,pendingInputBytes:this.#pendingInput.length}:undefined; }
  #finishRead(){if(this.#closed)return;try{checked(core.session_finish(this.#key));this._fail(Error('Unexpected EOF'));}catch(error){this._fail(error);}}
  #resumeRead(){
    if(this.#closed||this.#readScheduled||this.#receiving?.paused)return;
    // Yield between decode batches so a hot connection cannot starve other sockets or timers.
    this.#readScheduled=true;setImmediate(()=>{this.#readScheduled=false;if(this.#closed||this.#receiving?.paused)return;if(this.#readBackpressured){this.#readBackpressured=false;this.#lastRead=performance.now();}if(this.#pendingInput.length)this.#pumpRead();else if(this.#readEnded)this.#finishRead();else this.#socket.resume();});
  }
  #pumpRead(){
    if(this.#closed||this.#readPumping)return;this.#readPumping=true;
    try{
      if(this.#pendingInput.length&&!this.#receiving?.paused&&!this.#closed){
        const bytes=this.#pendingInput.subarray(0,65536);this.#pendingInput=this.#pendingInput.subarray(bytes.length);
        this.#process(core.session_feed(this.#key,bytes.toString('hex')));
      }
      if(this.#receiving?.paused)this.#readBackpressured=true;
      if(!this.#closed){if(!this.#pendingInput.length&&this.#readEnded)this.#finishRead();else if(!this.#receiving?.paused)this.#resumeRead();}
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
    if(!this.#metadata.serverVersion&&result.state!=='start')this.#metadata=JSON.parse(checked(core.session_metadata(this.#key)));
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
        finishTransportHandshake(this.#socket);
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
  async #writable(signals,timeout=this.#timeout) {
    while(this.#socket.writableNeedDrain){
      this.#drainWaits++;
      let listener;const drained=new Promise(resolve=>{listener=resolve;this.#socket.once('drain',listener);});
      try{await waitFor(drained,timeout,[this.#authAbort.signal,...signals]);}finally{this.#socket.off('drain',listener);}
    }
    if(this.#closed)throw Error('Connection closed');
    for(const signal of signals)if(signal?.aborted)throw aborted(signal);
  }
  _sendQueued(channel,name,args,beforeSend,signals=[]) {
    return this.#publishWrites.run(async()=>{await this.#writable(signals);beforeSend?.();this._send(channel,name,args);},{signal:signals[0]});
  }
  async _publishStream(channel,exchange,key,source,size,properties,mandatory,immediate,signals,onStart) {
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
        const result=JSON.parse(checked(core.session_publish_start_flags(this.#key,channel,exchange,key,String(size),properties,mandatory,immediate)));
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
    this.#closed = true;this.#recoveryCancellation.cancel();
    this.#receiving?.close(error);this.#pendingInput=Buffer.alloc(0);
    this.#publishWrites.close(error);this.#streaming.clear();this.#deferredBytes=0;
    this.#authAbort.abort(error);this.#authProviders=[];
    clearTimeout(this.#connectTimer); clearInterval(this.#timer);
    this.#signal?.removeEventListener('abort', this.#abort);
    this.#ready.reject(error); this.#closeWait?.reject(error);
    if(this.#secretUpdate){clearTimeout(this.#secretUpdate.timer);this.#secretUpdate.reject(error);this.#secretUpdate=undefined;}
    for (const ch of this.#channels.values()) ch._terminate(error);
    this.#channels.clear(); core.session_drop(this.#key);
    if (graceful&&!this.#deadlineClosing) this.#socket?.end(()=>this.#socket.destroy()); else this.#socket?.destroy();
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
  close() { return this.#closeWithDeadline(Date.now()+this.#timeout,false); }
  async closeDeadline(deadline) {
    const time=closeDeadlineMillis(deadline);
    if(this.#closed||this.#closing){this.#recoveryCancellation.cancel();throw connectionClosedError();}
    return this.#closeWithDeadline(time,true);
  }
  async #closeWithDeadline(deadline,explicit) {
    this.#recoveryCancellation.cancel();
    if (this.#closed) return;
    if (this.#closing) return this.#closeWait.promise;
    this.#closing = true;this.#deadlineClosing=explicit; this.#closeWait = deferred();
    this.#receiving?.discardAll();
    this.#closeWait.promise.catch(()=>{});
    const stopTimer=armCloseDeadline(deadline,()=>this._fail(explicit?closeDeadlineError():Error('Close timeout')));
    try {
      await Promise.all([...this.#channels.values()].map(ch=>ch._flushOutput(!explicit)));
      await this.#publishWrites.run(async()=>{await this.#writable([],explicit?null:this.#timeout);this._send(0,'connection.close',[200,'normal close',0,0]);});
      await this.#closeWait.promise;
    }
    catch (error) { this.#closeWait.promise.catch(() => {}); this._fail(error); throw error; }
    finally { stopTimer(); }
  }
  destroy(reason = Error('Connection destroyed')) { this._fail(reason); }
}

export class Channel extends EventEmitter {
  #recoveryCancellation=new RecoveryCancellation();
  #connection; #pending; #closed = false; #consumers = new Map(); #id;
  #mode = 'normal'; #nextConfirm = 1n; #confirms = new Map();
  #nextNotice=1n; #confirmationEvents=new Map();
  #sends; #sendAbort=new AbortController(); #publications=0;
  #subscriptions=new Map(); #consumerCancels=new Set(); #waitingRPC;
  constructor(connection, id) { super(); this.#connection = connection; this.#id = id; this.#sends=new SendQueue(connection.maxBufferedBytes); }
  get id() { return this.#id; }
  reconnect() { return Promise.reject(recoveryClosed()); }
  notifyRecoveryCancel() { return this.#recoveryCancellation.wait(); }
  topologyConfiguration(global=false) { if(typeof global!=='boolean')throw TypeError('Invalid topology scope');return emptyTopologyConfiguration(); }
  get closed() { return this.#closed; }
  get nextPublishSeqNo() { return this.#nextConfirm; }
  async _flushOutput(confirmations=true) { if(this.#closed)return;await this.#sends.idle();if(confirmations)await Promise.allSettled([...this.#confirms.values()].map(p=>p.promise)); }
  _rpc(name, args, expected, apply = e => e.args, automatic = false) {
    if (this.#closed) return Promise.reject(Error('Channel closed'));
    if (this.#connection.closing) return Promise.reject(Error('Connection closing'));
    if (this.#pending && (!this.#pending.automatic || this.#waitingRPC)) return Promise.reject(Error('One RPC may be outstanding per channel; await it or use another channel'));
    try {
      const pending={...deferred(),name,encoded:JSON.stringify(args),expected,apply,automatic};
      // One user RPC may wait behind an automatic consumer cancel. Ordinary
      // concurrent user RPCs retain their existing one-outstanding contract.
      if(this.#pending)this.#waitingRPC=pending;else this.#startRPC(pending);
      return pending.promise;
    }catch(error){return Promise.reject(error);}
  }
  #startRPC(pending) {
    this.#pending=pending;
    this.#sends.run(()=>this.#connection._sendQueued(this.id,pending.name,pending.encoded,()=>{pending.timer=setTimeout(()=>this.#connection._fail(Error(`RPC timeout: ${pending.name}`)),this.#connection.timeout);},[this.#sendAbort.signal])).catch(error=>{
      clearTimeout(pending.timer);if(this.#pending===pending)this.#pending=undefined;pending.reject(error);this.#nextRPC();
    });
  }
  #nextRPC() {
    if(this.#pending||this.#closed)return;
    if(this.#waitingRPC){const next=this.#waitingRPC;this.#waitingRPC=undefined;this.#startRPC(next);return;}
    if(this.#connection.closing)return;
    for(const entry of this.#consumerCancels){
      if(entry.finished||entry.cancelPromise){this.#consumerCancels.delete(entry);continue;}
      if(!entry.ready)continue;
      this.#consumerCancels.delete(entry);
      this.#cancelConsumer(entry.tag,false,true).catch(error=>{if(!this.#closed)this.#connection._fail(Error('Consumer cancellation failed',{cause:error}));});
      break;
    }
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
      const ack=e.name==='basic.ack',last=multiple&&tag===0n?this.#nextConfirm-1n:tag;
      for (const [seq, p] of this.#confirms) {
        if (seq === last || (multiple && seq <= last)) {
          clearTimeout(p.timer); this.#confirms.delete(seq);
          p.settle(ack);
          if (ack) p.resolve({deliveryTag: seq});
          else p.reject(Error(`Publisher nack: ${seq}`));
        }
      }
      if(multiple){for(let seq=this.#nextNotice;seq<=last;seq++)this.#confirmationEvents.set(seq,ack);}
      else this.#confirmationEvents.set(tag,ack);
      while(!this.#closed && this.#confirmationEvents.has(this.#nextNotice)) {
        const seq=this.#nextNotice++,ack=this.#confirmationEvents.get(seq);this.#confirmationEvents.delete(seq);
        emitConfirmation(this,Object.freeze({deliveryTag:seq,ack,generation:0}));
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
      const callback = this.#consumers.get(tag);this.#forgetConsumer(this.#subscriptions.get(tag));
      if (callback) this.#notify(callback, null);
      this.emit('cancel', tag, {origin:'server'});
    } else if(e.name==='channel.flow') {
      this.emit('flow',e.args.active);
    } else if (this.#pending?.expected.includes(e.name)) {
      const p = this.#pending; this.#pending = undefined; clearTimeout(p.timer);
      try { p.resolve(p.apply(e)); } catch (error) { p.reject(error); throw error; }
      this.#nextRPC();
    } else throw Error(`Unexpected method ${e.name}`);
  }
  _terminate(error) {
    if (this.#closed) return;
    this.#closed = true;this.#recoveryCancellation.cancel();
    this.#connection._closeIncomingChannel(this.id,error);
    this.#sendAbort.abort(error);this.#sends.close(error);
    if (this.#pending) { clearTimeout(this.#pending.timer); this.#pending.reject(error); this.#pending = undefined; }
    this.#waitingRPC?.reject(error);this.#waitingRPC=undefined;
    for(const entry of this.#subscriptions.values())this.#forgetConsumer(entry,error);
    this.#consumerCancels.clear();
    for (const p of this.#confirms.values()) { clearTimeout(p.timer); p.settle(false,error);p.reject(error); }
    this.#confirms.clear();this.#confirmationEvents.clear(); this.#consumers.clear(); this.emit('close', error);
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
  qos(prefetchCount, global = false, {prefetchSize=0}={}) {
    try {
      integer(prefetchCount,0,65535,'prefetchCount');integer(prefetchSize,0,4294967295,'prefetchSize');
      if(typeof global!=='boolean')throw TypeError('Invalid global');
      return this._rpc('basic.qos', [prefetchSize, prefetchCount, global], ['basic.qos-ok']);
    }catch(error){return Promise.reject(error);}
  }
  flow(active) {
    if(typeof active!=='boolean')return Promise.reject(TypeError('Invalid active'));
    return this._rpc('channel.flow',[active],['channel.flow-ok'],e=>e.args.active);
  }
  get(queue, {noAck = false} = {}) { return this._rpc('basic.get', [0, queue, noAck], ['basic.get-ok', 'basic.get-empty'], e => e.name === 'basic.get-empty' ? null : delivery(e)); }
  consume(queue, callback, {consumerTag = randomUUID(), noAck = false, exclusive = false, noWait=false, noLocal=false, signal, arguments: args = {}} = {}) {
    try{checkConsumerSignal(signal);}catch(error){return Promise.reject(error);}
    if (typeof callback !== 'function' || !consumerTag || this.#subscriptions.has(consumerTag)) return Promise.reject(TypeError('Invalid callback or duplicate/empty consumer tag'));
    if(this.#subscriptions.size>=1024)return Promise.reject(Error('Consumer limit: 1024'));
    if(typeof noWait!=='boolean')return Promise.reject(TypeError('Invalid noWait'));
    if(typeof noLocal!=='boolean')return Promise.reject(TypeError('Invalid noLocal'));
    const entry={tag:consumerTag,callback,ready:false};this.#subscriptions.set(consumerTag,entry);
    entry.dispose=observeConsumerSignal(signal,reason=>{this._abortConsumer(entry.tag,reason).catch(()=>{});});
    if(noWait)this.#consumers.set(consumerTag,callback);
    const ready=tag=>{
      if(entry.finished)return tag;
      if(tag!==entry.tag){if(this.#subscriptions.has(tag))throw Error('Duplicate broker consumer tag');this.#subscriptions.delete(entry.tag);entry.tag=tag;this.#subscriptions.set(tag,entry);}
      entry.ready=true;this.#consumers.set(tag,callback);this.#nextRPC();return tag;
    };
    return this.#request('basic.consume', [0, queue, consumerTag, noLocal, noAck, exclusive, noWait, args], ['basic.consume-ok'],noWait,()=>ready(consumerTag),e=>ready(e.args['consumer-tag']))
      .catch(error=>{this.#forgetConsumer(entry,error);throw error;});
  }
  #forgetConsumer(entry,error) {
    if(!entry||entry.finished)return;
    entry.finished=true;entry.dispose?.();this.#consumerCancels.delete(entry);
    if(this.#subscriptions.get(entry.tag)===entry){this.#subscriptions.delete(entry.tag);this.#consumers.delete(entry.tag);}
    if(error)entry.aborted?.reject(error);else entry.aborted?.resolve();
  }
  _abortConsumer(tag,reason=Error('Consumer aborted')) {
    const entry=this.#subscriptions.get(tag);if(!entry||entry.finished)return Promise.resolve();
    if(!entry.aborted){entry.aborted=deferred();entry.aborted.promise.catch(()=>{});entry.reason=reason;entry.dispose?.();this.#consumerCancels.add(entry);this.#nextRPC();}
    return entry.aborted.promise;
  }
  #cancelConsumer(tag,noWait,automatic=false) {
    const entry=this.#subscriptions.get(tag);
    if(entry?.cancelPromise)return entry.cancelPromise;
    const finish=()=>{
      if(entry?.finished)return;
      const signalled=Boolean(entry?.aborted);this.#forgetConsumer(entry);
      if(signalled){this.#notify(entry.callback,null);this.emit('cancel',tag,{origin:'signal',reason:entry.reason});}
    };
    const apply=e=>{if(e.args['consumer-tag']!==tag)throw Error('Unexpected cancel consumer tag');finish();};
    const operation=noWait?this.#request('basic.cancel',[tag,noWait],['basic.cancel-ok'],noWait,finish,apply):this._rpc('basic.cancel',[tag,noWait],['basic.cancel-ok'],apply,automatic);
    if(entry){
      entry.cancelPromise=operation;
      operation.catch(error=>{entry.cancelPromise=undefined;if(entry.aborted&&!entry.finished){if(automatic)this.#forgetConsumer(entry,error);else{this.#consumerCancels.add(entry);this.#nextRPC();}}});
    }
    return operation;
  }
  cancel(consumerTag,{noWait=false}={}) { if(typeof noWait!=='boolean')return Promise.reject(TypeError('Invalid noWait'));return this.#cancelConsumer(consumerTag,noWait); }
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
    return this.#publishBuffer(exchange,routingKey,body,options,false);
  }
  publishWithDeferredConfirm(exchange,routingKey,body,options={}) {
    return this.#publishBuffer(exchange,routingKey,body,options,true);
  }
  #publishBuffer(exchange,routingKey,body,options,deferredConfirm) {
    try{
      if(!(typeof body==='string'||body instanceof Uint8Array))throw TypeError('Body must be string or bytes');
      const length=typeof body==='string'?Buffer.byteLength(body):body.byteLength;
      if(length>this.#connection.maxBufferedBytes)throw Error('Buffered body limit; use publishStream');
      const bytes=Buffer.from(body);
      return this.#publication(exchange,routingKey,[bytes],BigInt(bytes.length),options,bytes.length,deferredConfirm);
    }catch(error){return Promise.reject(error);}
  }
  publishStream(exchange,routingKey,source,bodySize,options={}) {
    return this.#publishStream(exchange,routingKey,source,bodySize,options,false);
  }
  publishStreamWithDeferredConfirm(exchange,routingKey,source,bodySize,options={}) {
    return this.#publishStream(exchange,routingKey,source,bodySize,options,true);
  }
  #publishStream(exchange,routingKey,source,bodySize,options,deferredConfirm) {
    try{
      if(typeof bodySize!=='bigint'&&(!Number.isSafeInteger(bodySize)||bodySize<0))throw TypeError('Invalid declared body size');
      const size=BigInt(bodySize);if(size<0n||size>0xffffffffffffffffn)throw TypeError('Invalid declared body size');
      if(!source||!(typeof source[Symbol.asyncIterator]==='function'||typeof source[Symbol.iterator]==='function'))throw TypeError('Source must be an iterable of byte chunks');
      return this.#publication(exchange,routingKey,source,size,options,0,deferredConfirm);
    }catch(error){return Promise.reject(error);}
  }
  #publication(exchange,key,source,size,{properties={},mandatory=false,immediate=false,signal}={},bytes,deferredConfirm) {
    if(typeof mandatory!=='boolean'||typeof immediate!=='boolean')return Promise.reject(TypeError('Invalid publish flags'));
    if(signal!==undefined && !(signal instanceof AbortSignal))return Promise.reject(TypeError('Invalid publication signal'));
    if(this.#closed||this.#connection.closing||this.#mode==='selecting')return Promise.reject(Error('Channel unavailable'));
    if(this.#publications+this.#confirmationEvents.size>=1024)return Promise.reject(Error('Unconfirmed, unsequenced or queued publish limit: 1024'));
    const encoded=JSON.stringify(properties),confirm=this.#mode==='confirm';let pending,seq;
    this.#publications++;
    const sending=this.#sends.run(async()=>{
      await this.#connection._publishStream(this.id,exchange,key,source,size,encoded,mandatory,immediate,[this.#sendAbort.signal,signal],()=>{
        if(confirm){seq=this.#nextConfirm++;pending={...deferred(),...createConfirmation(seq)};pending.promise.catch(()=>{});this.#confirms.set(seq,pending);}
      });
      if(pending&&this.#confirms.has(seq))pending.timer=setTimeout(()=>this.#connection._fail(Error(`Publisher confirm timeout: ${seq}`)),this.#connection.timeout);
    },{bytes,signal});
    const sent=sending.catch(error=>{
      if(pending){clearTimeout(pending.timer);this.#confirms.delete(seq);pending.settle(false,error);pending.reject(error);}throw error;
    });
    const confirmed=sent.then(()=>pending?.promise).finally(()=>{this.#publications--;});
    confirmed.catch(()=>{});
    return deferredConfirm?sent.then(()=>pending?.handle??null):confirmed;
  }
  close() { this.#recoveryCancellation.cancel();this.#connection._discardIncomingChannel(this.id);return this._rpc('channel.close', [200, 'normal close', 0, 0], ['channelClosed']); }
}

export const connect = async (options, overrides) => {
  options=snapshotProperties(snapshotAuthentication(connectionOptions(options,overrides)));
  if (options?.recovery) {
    const {RecoveringConnection} = await import('./recovery.mjs');
    return RecoveringConnection.connect(options, opts => Connection.connect(opts));
  }
  return Connection.connect(options);
};

export const open = (stream, options) => Connection.open(stream, options);
