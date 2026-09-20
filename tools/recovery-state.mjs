import {EventEmitter} from 'node:events';
import {topologyConfiguration,emptyTopologyConfiguration} from './topology-query.mjs';
import {RecoveryCancellation} from './recovery-control.mjs';

export function notice(target, name, ...args) {
  for(const listener of target.rawListeners(name)) {
    try { listener.apply(target,args); }
    catch(error) { if(name!=='callbackError')queueMicrotask(()=>notice(target,'callbackError',error)); }
  }
}
export class Lifecycle extends EventEmitter {
  #recoveryCancellation=new RecoveryCancellation();
  state = 'connecting';
  get closed() { return this.state === 'closed'; }
  notifyRecoveryCancel() { return this.#recoveryCancellation.wait(); }
  _restartRecovery() {
    if(!this.closed)throw Error('Only a terminated lifecycle can be restarted');
    this.#recoveryCancellation.reset();this.state='reconnecting';
    notice(this,'stateChange',{from:'closed',to:'reconnecting'});
  }
  _state(next, error) {
    if (this.state === next || this.closed || this.state === 'closing' && next !== 'closed') return;
    if(next==='closing'||next==='closed')this.#recoveryCancellation.cancel();
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
  #owners = new Map(); #recordCount = 0;
  constructor(limit) { this.limit = limit; }
  #owned(owner) {
    if(!this.#owners.has(owner))this.#owners.set(owner,{qos:null,exchanges:new Map(),queues:new Map(),bindings:new Map(),exchangeBindings:new Map()});
    return this.#owners.get(owner);
  }
  hasRecord(kind,key,owner) { return this.#owners.get(owner)?.[kind].has(key)??false; }
  record(kind,key,entry) {
    const records=this.#owned(entry.owner)[kind];
    if(!records.has(key))this.#recordCount++;
    records.set(key,entry);this[kind].set(key,entry);
  }
  recordQos(owner,qos) { this.#owned(owner).qos=qos; }
  #deleteRecord(kind,key) {
    this[kind].delete(key);
    for(const records of this.#owners.values())if(records[kind].delete(key))this.#recordCount--;
  }
  forgetOwner(owner) {
    const removed=this.#owners.get(owner);if(!removed)return;
    this.#owners.delete(owner);
    for(const kind of ['exchanges','queues','bindings','exchangeBindings'])for(const [key] of removed[kind]) {
      this.#recordCount--;
      const current=this[kind].get(key);
      if(current?.owner!==owner)continue;
      const replacement=[...this.#owners.values()].map(v=>v[kind].get(key)).filter(Boolean).at(-1);
      if(replacement){if(kind==='queues')replacement.current=current.current;this[kind].set(key,replacement);}
      else this[kind].delete(key);
    }
  }
  configuration(owner,global=false) {
    if(typeof global!=='boolean')throw TypeError('Invalid topology scope');
    const local=this.#owners.get(owner);
    if(!global&&!local)return emptyTopologyConfiguration();
    return topologyConfiguration(global?{...this,qos:local?.qos}:local,name=>this.resolve(name));
  }
  reserve(extra = 1) {
    if (this.#recordCount + this.#pending + extra > this.limit) throw Error('Recovery topology limit reached');
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
    const edge=(entry,left,right,owned)=>{
      for(const key of [left,right]){if(!edges.has(key))edges.set(key,[]);edges.get(key).push({entry,left,right});}
      if(owned){include(left);include(right);}
    };
    for(const [key,b] of this.bindings)edge(b,vertex('q',b.queue),vertex('e',b.exchange),this.hasRecord('bindings',key,owner));
    for(const [key,b] of this.exchangeBindings)edge(b,vertex('e',b.source),vertex('e',b.destination),this.hasRecord('exchangeBindings',key,owner));
    for(const e of this.#owners.get(owner)?.exchanges.values()??[])include(vertex('e',e.name));
    for(const q of this.#owners.get(owner)?.queues.values()??[])include(vertex('q',q.key));
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
    this.#deleteRecord(exchangeBinding?'exchangeBindings':'bindings',key);this.#cascade([exchangeBinding?entry.source:entry.exchange]);
  }
  removeQueue(name) {
    const key = this.key(name); this.#deleteRecord('queues',key);
    const sources=[];
    for (const [id,b] of this.bindings) if (b.queue === key) {this.#deleteRecord('bindings',id);sources.push(b.exchange);}
    this.#cascade(sources);
    return key;
  }
  #eraseExchange(name) {
    this.#deleteRecord('exchanges',name);
    for (const [id,b] of this.bindings) if (b.exchange === name) this.#deleteRecord('bindings',id);
    const sources=[];
    for (const [id,b] of this.exchangeBindings) if (b.source === name || b.destination === name) {
      this.#deleteRecord('exchangeBindings',id);if(b.destination===name)sources.push(b.source);
    }
    return sources;
  }
  removeExchange(name) { this.#cascade(this.#eraseExchange(name)); }
  wanted(entity, mode) { return mode === 'all' || (mode === 'transient' && (entity.options.exclusive || entity.options.autoDelete)); }
  clear() { this.exchanges.clear(); this.queues.clear(); this.bindings.clear(); this.exchangeBindings.clear(); this.#cascadeCandidates.clear();this.#owners.clear();this.#recordCount=0; }
}
