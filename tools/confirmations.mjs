// A confirmation's result belongs to the publication, not to an individual wait.
const states = new WeakMap();
const reason = signal => signal.reason instanceof Error ? signal.reason : Error('Confirmation wait aborted', {cause:signal.reason});

class DeferredConfirmation {
  #state; #tag; #generation;
  constructor(state, tag, generation=0) {
    this.#state=state;this.#tag=tag;this.#generation=generation;
    states.set(this,state);Object.freeze(this);
  }
  get deliveryTag() { return this.#tag; }
  get generation() { return this.#generation; }
  get done() { return this.#state.done; }
  get completed() { return this.#state.completed; }
  get acked() { return this.#state.ack; }
  get error() { return this.#state.error; }
  wait({signal,timeout}={}) {
    try {
      if(signal!==undefined && !(signal instanceof AbortSignal))throw TypeError('Invalid confirmation wait signal');
      if(timeout!==undefined && (!Number.isInteger(timeout)||timeout<1||timeout>2147483647))throw TypeError('Invalid confirmation wait timeout');
      if(signal?.aborted)throw reason(signal);
      if(this.#state.completed)return Promise.resolve(this.#state.ack);
      if(this.#state.waiters.size>=1024)throw Error('Confirmation waiter limit: 1024');
      return new Promise((resolve,reject)=>{
        let timer;
        const finish=error=>{
          clearTimeout(timer);signal?.removeEventListener('abort',abort);this.#state.waiters.delete(complete);
          if(error)reject(error);else resolve(this.#state.ack);
        };
        const abort=()=>finish(reason(signal)),complete=()=>finish();
        this.#state.waiters.add(complete);signal?.addEventListener('abort',abort,{once:true});
        if(timeout!==undefined)timer=setTimeout(()=>finish(Error('Confirmation wait timeout')),timeout);
      });
    } catch(error) { return Promise.reject(error); }
  }
}

export function createConfirmation(tag) {
  let resolve;
  const state={ack:false,completed:false,error:undefined,waiters:new Set(),done:new Promise(done=>resolve=done)};
  return {handle:new DeferredConfirmation(state,tag),settle(ack,error){
    if(state.completed)return;
    state.ack=ack;state.completed=true;state.error=error;resolve();
    for(const waiter of [...state.waiters])waiter();
  }};
}
export function confirmationView(handle,generation) {
  return handle===null?null:new DeferredConfirmation(states.get(handle),handle.deliveryTag,generation);
}

// Observer failures must not break protocol decoding or another observer.
export function emitConfirmation(target,value) {
  const report=error=>queueMicrotask(()=>{
    for(const listener of target.rawListeners('callbackError')) {
      try { Promise.resolve(listener.call(target,error)).catch(()=>{}); } catch {}
    }
  });
  for(const [name,args] of [['confirm',[value]],[value.ack?'ack':'nack',[value.deliveryTag,value.generation]]]) {
    for(const listener of target.rawListeners(name)) {
      try { Promise.resolve(listener.apply(target,args)).catch(report); } catch(error) { report(error); }
    }
  }
}
