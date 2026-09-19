import {EventEmitter} from 'node:events';

export function notice(target, name, ...args) {
  for(const listener of target.rawListeners(name)) {
    try { listener.apply(target,args); }
    catch(error) { if(name!=='callbackError')queueMicrotask(()=>notice(target,'callbackError',error)); }
  }
}
export class Lifecycle extends EventEmitter {
  state = 'connecting';
  get closed() { return this.state === 'closed'; }
  _state(next, error) {
    if (this.state === next || this.closed || this.state === 'closing' && next !== 'closed') return;
    const from = this.state; this.state = next;
    notice(this, 'stateChange', {from, to: next, error});
    if (next === 'open' && this.state === next) notice(this, 'ready');
    if (next === 'closed') notice(this, 'close', error);
  }
  waitForReady({signal, timeout = 30000} = {}) {
    if (signal?.aborted) return Promise.reject(signal.reason ?? Error('Aborted'));
    if (this.state === 'open') return Promise.resolve(this);
    if (this.closed || this.state === 'closing') return Promise.reject(Error('Closed'));
    if (!Number.isInteger(timeout) || timeout < 1 || timeout > 2147483647) return Promise.reject(TypeError('Invalid wait timeout'));
    return new Promise((resolve, reject) => {
      const cleanup = () => { clearTimeout(timer); this.off('ready', ready); this.off('close', closed); signal?.removeEventListener('abort', abort); };
      const ready = () => { cleanup(); resolve(this); };
      const closed = error => { cleanup(); reject(error ?? Error('Closed')); };
      const abort = () => closed(signal.reason ?? Error('Aborted'));
      const timer = setTimeout(() => closed(Error('Recovery wait timeout')), timeout);
      this.once('ready', ready); this.once('close', closed); signal?.addEventListener('abort', abort, {once:true});
    });
  }
}
export function delay(ms, signal) {
  if (signal.aborted) return Promise.reject(signal.reason ?? Error('Aborted'));
  return new Promise((resolve, reject) => {
    const stop = () => { clearTimeout(timer); signal.removeEventListener('abort', stop); reject(signal.reason ?? Error('Aborted')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', stop); resolve(); }, ms);
    signal.addEventListener('abort', stop, {once:true});
  });
}
export const snapshot = value => structuredClone(value);
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k,canonical(value[k])]));
  return value;
}
export const identity = value => JSON.stringify(canonical(value));

// Successful declarations form a desired topology, not a replay log. Explicit
// deletions and cancellations remove entries instead of resurrecting them later.
export class Topology {
  exchanges = new Map(); queues = new Map(); bindings = new Map(); exchangeBindings = new Map();
  #pending = 0;
  constructor(limit) { this.limit = limit; }
  reserve(extra = 1) {
    if (this.exchanges.size + this.queues.size + this.bindings.size + this.exchangeBindings.size + this.#pending + extra > this.limit) throw Error('Recovery topology limit reached');
    this.#pending+=extra; let released = false;
    return () => { if (!released) { released = true; this.#pending-=extra; } };
  }
  queue(name) {
    return this.queues.get(name) ?? [...this.queues.values()].find(q => q.current === name);
  }
  key(name) { return this.queue(name)?.key ?? name; }
  resolve(name) { return this.queue(name)?.current ?? name; }
  removeQueue(name) {
    const key = this.key(name); this.queues.delete(key);
    for (const [id,b] of this.bindings) if (b.queue === key) this.bindings.delete(id);
    return key;
  }
  removeExchange(name) {
    this.exchanges.delete(name);
    for (const [id,b] of this.bindings) if (b.exchange === name) this.bindings.delete(id);
    for (const [id,b] of this.exchangeBindings) if (b.source === name || b.destination === name) this.exchangeBindings.delete(id);
  }
  wanted(entity, mode) { return mode === 'all' || (mode === 'transient' && (entity.options.exclusive || entity.options.autoDelete)); }
  clear() { this.exchanges.clear(); this.queues.clear(); this.bindings.clear(); this.exchangeBindings.clear(); }
}
