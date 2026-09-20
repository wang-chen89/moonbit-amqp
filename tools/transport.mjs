import net from 'node:net';
import tls from 'node:tls';
import {Duplex} from 'node:stream';

const supplied = Symbol('supplied AMQP transport');
const deadlines = new WeakMap();
const claimed = new WeakSet();
const ignoredError = () => {};
const abortError = signal => signal.reason instanceof Error ? signal.reason : Error('Connection aborted');
function dispose(stream) {
  if (stream instanceof Duplex) { stream.on('error', ignoredError); stream.destroy(); }
}
function validateStream(stream, established = false) {
  if (!(stream instanceof Duplex) || stream.destroyed || !stream.readable || !stream.writable ||
      stream.readableObjectMode || stream.writableObjectMode || stream.readableEncoding ||
      stream.readableFlowing === true || stream.listenerCount('data') || stream.listenerCount('readable'))
    throw TypeError('Transport must be an unused binary Duplex');
  if (stream.encrypted && !(stream instanceof tls.TLSSocket)) throw TypeError('TLS transport must be a TLSSocket');
  if (stream instanceof net.Socket && stream.pending && (!stream.connecting || established))
    throw TypeError('Transport socket is not connected');
  if (stream instanceof tls.TLSSocket && !stream.getFinished())
    throw TypeError('Supplied TLS transport handshake is incomplete');
}
export function openOptions(stream, options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw TypeError('Invalid open options');
  if (options.uri !== undefined || options.dial !== undefined || options.tls !== undefined || options.recovery)
    throw TypeError('Open takes an established stream; use connect with dial for TLS wrapping or recovery');
  validateStream(stream, true);
  return {...options, [supplied]:stream};
}
export function validateTransportOptions(options) {
  if (options.dial !== undefined && typeof options.dial !== 'function') throw TypeError('Invalid dial function');
  if (options[supplied]) {
    if (claimed.has(options[supplied])) throw TypeError('Transport is already owned');
    validateStream(options[supplied], true);
  }
}
export const suppliedTLS = options => options[supplied] instanceof tls.TLSSocket;
export function finishTransportHandshake(stream) { deadlines.get(stream)?.(); }

function waitEvent(stream, event, signal) {
  return new Promise((resolve, reject) => {
    const cleanup = () => { stream.off(event, ready); stream.off('error', fail); stream.off('close', closed); signal?.removeEventListener('abort', cancelled); };
    const ready = () => { cleanup(); resolve(); };
    const fail = error => { cleanup(); reject(error); };
    const closed = () => fail(Error('Transport closed before handshake'));
    const cancelled = () => { dispose(stream); fail(abortError(signal)); };
    stream.once(event, ready); stream.once('error', fail); stream.once('close', closed);
    if (signal?.aborted) cancelled(); else signal?.addEventListener('abort', cancelled, {once:true});
  });
}

/** Go-shaped factory: the returned dialer accepts (network, address, {signal}). */
export function defaultDial(timeout = 30000) {
  if (!Number.isInteger(timeout) || timeout < 1 || timeout > 2147483647) throw TypeError('Invalid dial timeout');
  return async (network, address, {signal} = {}) => {
    if (signal?.aborted) throw abortError(signal);
    if (typeof address !== 'string') throw TypeError('Invalid dial address');
    let options;
    if (network === 'unix') options = {path:address};
    else {
      if (!['tcp','tcp4','tcp6'].includes(network)) throw TypeError('Unsupported dial network');
      const match = /^(?:\[([^\]]+)\]|([^:]+)):(\d+)$/.exec(address);
      if (!match || +match[3] < 1 || +match[3] > 65535) throw TypeError('Invalid dial address');
      options = {host:match[1] ?? match[2], port:+match[3], ...(network === 'tcp' ? {} : {family:network === 'tcp4' ? 4 : 6})};
    }
    const stream = net.connect(options);
    stream.on('error', ignoredError);
    const timer = setTimeout(() => stream.destroy(Error('Connection dial timeout')), timeout);
    try { await waitEvent(stream, 'connect', signal); }
    catch (error) { dispose(stream); throw error; }
    finally { clearTimeout(timer); }
    const deadline = setTimeout(() => stream.destroy(Error('AMQP handshake timeout')), timeout);
    deadline.unref();
    const clear = () => { clearTimeout(deadline); deadlines.delete(stream); stream.off('close', clear); };
    deadlines.set(stream, clear); stream.once('close', clear);
    return stream;
  };
}

/** Own streams only after validation; late factory results are always disposed. */
export async function startTransport(options, signal, adopt, ready) {
  const {host = 'localhost', port = options.tls ? 5671 : 5672, timeout = 10000} = options;
  const address = (host.includes(':') ? `[${host}]` : host) + ':' + port;
  let stream;
  try {
    if (signal.aborted) throw abortError(signal);
    stream = options[supplied] ?? await (options.dial ?? defaultDial(timeout))('tcp', address,
      Object.freeze({host, port, timeout, signal}));
    // A buggy factory must not close a stream already owned by another connection,
    // including when this request was cancelled before the factory resolved.
    if (claimed.has(stream)) { stream=undefined; throw TypeError('Transport is already owned'); }
    if (signal.aborted) throw abortError(signal);
    validateStream(stream, Boolean(options[supplied]));
    claimed.add(stream);
    stream.pause(); adopt(stream);
    if (stream instanceof net.Socket && stream.connecting) await waitEvent(stream, 'connect', signal);
    if (options.tls && !options[supplied]) {
      const raw = stream;
      stream = tls.connect({...options.tls, socket:raw, host, port});
      claimed.add(stream);
      deadlines.set(stream, () => { finishTransportHandshake(raw); deadlines.delete(stream); });
      stream.pause(); adopt(stream);
      await waitEvent(stream, 'secureConnect', signal);
    }
    if (signal.aborted) throw abortError(signal);
    ready(stream);
  } catch (error) { dispose(stream); throw error; }
}
