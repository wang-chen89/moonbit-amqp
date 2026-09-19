import net from 'node:net';
import tls from 'node:tls';
import {EventEmitter} from 'node:events';
import {randomUUID} from 'node:crypto';
import * as core from '../web/engine.mjs';
import {snapshotAuthentication,authenticationPlan,responseBytes} from './authentication.mjs';

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
  const {bodyHex, ...rest} = event;
  return {...rest, body: Buffer.from(bodyHex, 'hex')};
}

/** Node transport for the MoonBit AMQP 0-9-1 Session. No third-party runtime dependency. */
export class Connection extends EventEmitter {
  #key = randomUUID(); #socket; #timer; #abort; #signal; #ready = deferred();
  #connectTimer; #closed = false; #closing = false; #lastRead = performance.now(); #lastWrite = 0;
  #channels = new Map(); #closeWait; #limits; #maxBuffered; #timeout;
  #authProviders=[]; #authAbort=new AbortController(); #authenticationMechanism='';
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
    if (signal?.aborted) throw signal.reason ?? Error('Aborted');
    const auth=authenticationPlan(options.sasl);this.#authProviders=auth.providers;
    const initial = JSON.parse(checked(core.session_open_auth(this.#key, JSON.stringify(auth.descriptors), vhost, options.locale??'en_US', channelMax, frameMax, heartbeat)));
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
        // MoonBit bridge accepts bounded chunks, independent of socket chunk sizing.
        for (let i = 0; i < bytes.length; i += 65536) this.#process(core.session_feed(this.#key, bytes.subarray(i, i + 65536).toString('hex')));
      } catch (e) { this._fail(e); }
    });
    this.#socket.on('error', e => this._fail(e));
    this.#socket.on('end', () => {
      if (!this.#closed) {
        try { checked(core.session_finish(this.#key)); this._fail(Error('Unexpected EOF')); }
        catch (e) { this._fail(e); }
      }
    });
    this.#socket.on('close', () => { if (!this.#closed) this._fail(Error('Socket closed')); });
    this.#connectTimer = setTimeout(() => this._fail(Error('AMQP handshake timeout')), timeout);
    if (signal) {
      this.#signal = signal;
      this.#abort = () => this._fail(signal.reason instanceof Error ? signal.reason : Error('Aborted'));
      signal.addEventListener('abort', this.#abort, {once: true});
    }
  }
  get closed() { return this.#closed; }
  get limits() { const {channelMax, frameMax, heartbeat} = this.#limits; return {channelMax, frameMax, heartbeat}; }
  get timeout() { return this.#timeout; }
  get authenticationMechanism() { return this.#authenticationMechanism; }
  #write(hexFrames) {
    if (this.#closed) throw Error('Connection closed');
    const bytes = hexFrames.reduce((n, x) => n + x.length / 2, 0);
    if (this.#socket.writableLength + bytes > this.#maxBuffered) {
      const e = Error('Outgoing buffer limit exceeded'); this._fail(e); throw e;
    }
    if (bytes) {
      this.#socket.write(Buffer.concat(hexFrames.map(hex => Buffer.from(hex, 'hex'))));
      this.#lastWrite = performance.now();
    }
  }
  #process(text) {
    const result = JSON.parse(checked(text));
    this.#authenticationMechanism=result.authenticationMechanism;
    this.#limits = {channelMax: result.channelMax, frameMax: result.frameMax, heartbeat: result.heartbeat};
    this.#write(result.output);
    for (const e of result.events) {
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
              if (now - this.#lastRead > ms) throw Error('AMQP heartbeat timeout');
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
        this.emit(e.name === 'connection.blocked' ? 'blocked' : 'unblocked', e.args);
      } else {
        const channel = this.#channels.get(e.channel);
        if (!channel) throw Error('Response for unallocated channel');
        channel._receive(e);
        if (e.type === 'channelClosed') this.#channels.delete(e.channel);
      }
    }
  }
  _send(channel, name, args) {
    if (this.#closed) throw Error('Connection closed');
    this.#process(core.session_send(this.#key, channel, name, JSON.stringify(args)));
  }
  _publish(channel, exchange, key, body, properties, mandatory) {
    if (this.#closed) throw Error('Connection closed');
    this.#process(core.session_publish(this.#key, channel, exchange, key, body.toString('hex'), JSON.stringify(properties), mandatory));
  }
  _fail(error) { this.#terminate(error, false); }
  #terminate(error, graceful) {
    if (this.#closed) return;
    this.#closed = true;
    this.#authAbort.abort(error);this.#authProviders=[];
    clearTimeout(this.#connectTimer); clearInterval(this.#timer);
    this.#signal?.removeEventListener('abort', this.#abort);
    this.#ready.reject(error); this.#closeWait?.reject(error);
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
  async close() {
    if (this.#closed) return;
    if (this.#closing) return this.#closeWait.promise;
    this.#closing = true; this.#closeWait = deferred();
    const timer = setTimeout(() => this._fail(Error('Close timeout')), this.#timeout);
    try { this._send(0, 'connection.close', [200, 'normal close', 0, 0]); await this.#closeWait.promise; }
    catch (error) { this.#closeWait.promise.catch(() => {}); this._fail(error); throw error; }
    finally { clearTimeout(timer); }
  }
  destroy(reason = Error('Connection destroyed')) { this._fail(reason); }
}

export class Channel extends EventEmitter {
  #connection; #pending; #closed = false; #consumers = new Map(); #id;
  #mode = 'normal'; #nextConfirm = 1n; #confirms = new Map();
  constructor(connection, id) { super(); this.#connection = connection; this.#id = id; }
  get id() { return this.#id; }
  get closed() { return this.#closed; }
  _rpc(name, args, expected, apply = e => e.args) {
    if (this.#closed) return Promise.reject(Error('Channel closed'));
    if (this.#pending) return Promise.reject(Error('One RPC may be outstanding per channel; await it or use another channel'));
    const p = deferred();
    const timer = setTimeout(() => this.#connection._fail(Error(`RPC timeout: ${name}`)), this.#connection.timeout);
    this.#pending = {...p, expected, apply, timer};
    try { this.#connection._send(this.id, name, args); }
    catch (e) { clearTimeout(timer); this.#pending = undefined; p.reject(e); }
    return p.promise;
  }
  #notify(callback, message) {
    // User callback failures do not corrupt framing or leave a rejected Promise unobserved.
    Promise.resolve().then(() => callback(message)).catch(e => this.emit('callbackError', e));
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
      this.emit('return', delivery(e));
    } else if (e.name === 'basic.deliver') {
      const callback = this.#consumers.get(e.args['consumer-tag']);
      if (!callback) throw Error('Delivery for unknown consumer');
      this.#notify(callback, delivery(e));
    } else if (e.name === 'basic.cancel') {
      const tag = e.args['consumer-tag'];
      if (!e.args['no-wait']) this.#connection._send(this.id, 'basic.cancel-ok', [tag]);
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
    if (this.#pending) { clearTimeout(this.#pending.timer); this.#pending.reject(error); this.#pending = undefined; }
    for (const p of this.#confirms.values()) { clearTimeout(p.timer); p.reject(error); }
    this.#confirms.clear(); this.#consumers.clear(); this.emit('close', error);
  }
  declareQueue(queue = '', {passive = false, durable = false, exclusive = false, autoDelete = false, arguments: args = {}} = {}) {
    return this._rpc('queue.declare', [0, queue, passive, durable, exclusive, autoDelete, false, args], ['queue.declare-ok']);
  }
  deleteQueue(queue, {ifUnused = false, ifEmpty = false} = {}) { return this._rpc('queue.delete', [0, queue, ifUnused, ifEmpty, false], ['queue.delete-ok']); }
  purgeQueue(queue) { return this._rpc('queue.purge', [0, queue, false], ['queue.purge-ok']); }
  bindQueue(queue, exchange, routingKey = '', args = {}) { return this._rpc('queue.bind', [0, queue, exchange, routingKey, false, args], ['queue.bind-ok']); }
  unbindQueue(queue, exchange, routingKey = '', args = {}) { return this._rpc('queue.unbind', [0, queue, exchange, routingKey, args], ['queue.unbind-ok']); }
  declareExchange(exchange, type = 'direct', {passive = false, durable = false, autoDelete = false, internal = false, arguments: args = {}} = {}) {
    return this._rpc('exchange.declare', [0, exchange, type, passive, durable, autoDelete, internal, false, args], ['exchange.declare-ok']);
  }
  deleteExchange(exchange, {ifUnused = false} = {}) { return this._rpc('exchange.delete', [0, exchange, ifUnused, false], ['exchange.delete-ok']); }
  bindExchange(destination, source, routingKey = '', args = {}) { return this._rpc('exchange.bind', [0, destination, source, routingKey, false, args], ['exchange.bind-ok']); }
  unbindExchange(destination, source, routingKey = '', args = {}) { return this._rpc('exchange.unbind', [0, destination, source, routingKey, false, args], ['exchange.unbind-ok']); }
  qos(prefetchCount, global = false) { return this._rpc('basic.qos', [0, prefetchCount, global], ['basic.qos-ok']); }
  get(queue, {noAck = false} = {}) { return this._rpc('basic.get', [0, queue, noAck], ['basic.get-ok', 'basic.get-empty'], e => e.name === 'basic.get-empty' ? null : delivery(e)); }
  consume(queue, callback, {consumerTag = randomUUID(), noAck = false, exclusive = false, arguments: args = {}} = {}) {
    if (typeof callback !== 'function' || !consumerTag || this.#consumers.has(consumerTag)) return Promise.reject(TypeError('Invalid callback or duplicate/empty consumer tag'));
    return this._rpc('basic.consume', [0, queue, consumerTag, false, noAck, exclusive, false, args], ['basic.consume-ok'], e => {
      const tag = e.args['consumer-tag']; this.#consumers.set(tag, callback); return tag;
    });
  }
  cancel(consumerTag) { return this._rpc('basic.cancel', [consumerTag, false], ['basic.cancel-ok'], e => { this.#consumers.delete(e.args['consumer-tag']); }); }
  ack(deliveryTag, multiple = false) { if (this.#closed) throw Error('Channel closed'); this.#connection._send(this.id, 'basic.ack', [String(deliveryTag), multiple]); }
  nack(deliveryTag, {multiple = false, requeue = true} = {}) { if (this.#closed) throw Error('Channel closed'); this.#connection._send(this.id, 'basic.nack', [String(deliveryTag), multiple, requeue]); }
  reject(deliveryTag, requeue = true) { if (this.#closed) throw Error('Channel closed'); this.#connection._send(this.id, 'basic.reject', [String(deliveryTag), requeue]); }
  recover(requeue = true) { return this._rpc('basic.recover', [requeue], ['basic.recover-ok']); }
  async confirmSelect() {
    if (this.#mode === 'confirm') return;
    if (this.#mode !== 'normal') throw Error('Confirm and transaction modes are exclusive');
    this.#mode = 'selecting';
    try { await this._rpc('confirm.select', [false], ['confirm.select-ok'], () => { this.#mode = 'confirm'; }); }
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
  publish(exchange, routingKey, body, {properties = {}, mandatory = false} = {}) {
    if (this.#closed || this.#mode === 'selecting') return Promise.reject(Error('Channel unavailable'));
    if (!(typeof body === 'string' || body instanceof Uint8Array)) return Promise.reject(TypeError('Body must be string or bytes'));
    const bytes = Buffer.from(body);
    if (bytes.length > 1048576) return Promise.reject(Error('Message body limit: 1 MiB'));
    if (this.#confirms.size >= 1024) return Promise.reject(Error('Unconfirmed publish limit: 1024'));
    const p = this.#mode === 'confirm' ? deferred() : undefined;
    const seq = this.#nextConfirm;
    if (p) {
      p.timer = setTimeout(() => this.#connection._fail(Error(`Publisher confirm timeout: ${seq}`)), this.#connection.timeout);
      this.#confirms.set(seq, p);
    }
    try {
      this.#connection._publish(this.id, exchange, routingKey, bytes, properties, mandatory);
      if (p) this.#nextConfirm++;
    } catch (e) {
      if (p) { clearTimeout(p.timer); this.#confirms.delete(seq); p.reject(e); return p.promise; }
      return Promise.reject(e);
    }
    return p?.promise ?? Promise.resolve();
  }
  close() { return this._rpc('channel.close', [200, 'normal close', 0, 0], ['channelClosed']); }
}

export const connect = async options => {
  options=snapshotAuthentication(options);
  if (options?.recovery) {
    const {RecoveringConnection} = await import('./recovery.mjs');
    return RecoveringConnection.connect(options, opts => Connection.connect(opts));
  }
  return Connection.connect(options);
};
