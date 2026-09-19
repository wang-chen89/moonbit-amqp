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
  #pendingSources = new Map(); #cascadeCandidates = new Map();
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
  recoveryComponent(owner,consumerQueues) {
    // Recorded ownership selects roots, not the boundary of AMQP dependencies.
    // Walk both ends of routing edges: recreating an exchange loses all its
    // outgoing routes, including those registered by a healthy sibling channel.
    const selected=new Set(),seen=new Set(),pending=[],edges=new Map();
    const vertex=(kind,name)=>kind+':'+name;
    const include=key=>{if(!seen.has(key)){seen.add(key);pending.push(key);}};
    const edge=(entry,left,right)=>{
      for(const key of [left,right]){if(!edges.has(key))edges.set(key,[]);edges.get(key).push({entry,left,right});}
      if(entry.owner===owner){include(left);include(right);}
    };
    for(const b of this.bindings.values())edge(b,vertex('q',b.queue),vertex('e',b.exchange));
    for(const b of this.exchangeBindings.values())edge(b,vertex('e',b.source),vertex('e',b.destination));
    for(const e of this.exchanges.values())if(e.owner===owner)include(vertex('e',e.name));
    for(const q of this.queues.values())if(q.owner===owner)include(vertex('q',q.key));
    for(const name of consumerQueues)include(vertex('q',this.key(name)));
    for(let index=0;index<pending.length;index++) {
      const key=pending[index],name=key.slice(2),entity=key.startsWith('q:')?this.queues.get(name):this.exchanges.get(name);
      if(entity)selected.add(entity);
      for(const e of edges.get(key)??[]){selected.add(e.entry);include(e.left);include(e.right);}
    }
    return selected;
  }
  pendingBinding(source) {
    this.#pendingSources.set(source,(this.#pendingSources.get(source)??0)+1);
    let released=false;
    return () => {
      if(released)return;released=true;
      const remaining=this.#pendingSources.get(source)-1;
      if(remaining)this.#pendingSources.set(source,remaining);else this.#pendingSources.delete(source);
      this.#cascade([]);
    };
  }
  #cascade(sources) {
    const remember=name=>{const e=this.exchanges.get(name);if(e?.options.autoDelete)this.#cascadeCandidates.set(name,e);};
    sources.forEach(remember);
    for(const [name,entry] of this.#cascadeCandidates) {
      if(this.exchanges.get(name)!==entry) {this.#cascadeCandidates.delete(name);continue;}
      if([...this.bindings.values()].some(b=>b.exchange===name)||[...this.exchangeBindings.values()].some(b=>b.source===name)) {
        this.#cascadeCandidates.delete(name);continue;
      }
      if(this.#pendingSources.has(name))continue;
      this.#cascadeCandidates.delete(name);
      // Iterative worklist handles long chains and cycles without recursive stack growth.
      this.#eraseExchange(name).forEach(remember);
    }
  }
  removeBinding(key,exchangeBinding=false) {
    const bindings=exchangeBinding?this.exchangeBindings:this.bindings,entry=bindings.get(key);
    if(!entry)return;
    bindings.delete(key);this.#cascade([exchangeBinding?entry.source:entry.exchange]);
  }
  removeQueue(name) {
    const key = this.key(name); this.queues.delete(key);
    const sources=[];
    for (const [id,b] of this.bindings) if (b.queue === key) {this.bindings.delete(id);sources.push(b.exchange);}
    this.#cascade(sources);
    return key;
  }
  #eraseExchange(name) {
    this.exchanges.delete(name);
    for (const [id,b] of this.bindings) if (b.exchange === name) this.bindings.delete(id);
    const sources=[];
    for (const [id,b] of this.exchangeBindings) if (b.source === name || b.destination === name) {
      this.exchangeBindings.delete(id);if(b.destination===name)sources.push(b.source);
    }
    return sources;
  }
  removeExchange(name) { this.#cascade(this.#eraseExchange(name)); }
  wanted(entity, mode) { return mode === 'all' || (mode === 'transient' && (entity.options.exclusive || entity.options.autoDelete)); }
  clear() { this.exchanges.clear(); this.queues.clear(); this.bindings.clear(); this.exchangeBindings.clear(); this.#cascadeCandidates.clear(); }
}
