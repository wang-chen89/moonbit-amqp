export function aborted(signal) { return signal?.reason instanceof Error ? signal.reason : Error('Publication aborted'); }
export function waitFor(promise, timeout, signals=[]) {
  return new Promise((resolve,reject)=>{
    let timer,settled=false;
    const handlers=signals.filter(Boolean).map(signal=>({signal,fn:()=>finish(aborted(signal))}));
    const finish=(error,value)=>{if(settled)return;settled=true;clearTimeout(timer);for(const {signal,fn} of handlers)signal.removeEventListener('abort',fn);error?reject(error):resolve(value);};
    Promise.resolve(promise).then(value=>finish(undefined,value),error=>finish(error));
    for(const {signal,fn} of handlers){if(signal.aborted){finish(aborted(signal));return;}signal.addEventListener('abort',fn,{once:true});}
    if(timeout!==null)timer=setTimeout(()=>finish(Error('Publication progress timeout')),timeout);
  });
}

// Serializes wire operations without waiting for their broker confirmations.
// Queued buffers and jobs are bounded, and discarded immediately on shutdown.
export class SendQueue {
  #jobs=[]; #active; #bytes=0; #closed; #idle=[];
  constructor(maxBytes,maxJobs=1024){this.maxBytes=maxBytes;this.maxJobs=maxJobs;}
  get bufferedBytes(){return this.#bytes;}
  idle(){if(this.#closed)return Promise.reject(this.#closed);if(!this.#active&&!this.#jobs.length)return Promise.resolve();return new Promise((resolve,reject)=>this.#idle.push({resolve,reject}));}
  run(action,{bytes=0,signal}={}) {
    if(this.#closed)return Promise.reject(this.#closed);
    if(signal?.aborted)return Promise.reject(aborted(signal));
    if(this.#jobs.length+(this.#active?1:0)>=this.maxJobs||bytes>this.maxBytes-this.#bytes)return Promise.reject(Error('Outgoing operation queue limit exceeded'));
    let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});promise.catch(()=>{});
    const job={action,bytes,resolve,reject,signal};this.#bytes+=bytes;
    job.abort=()=>{
      reject(aborted(signal));
      const i=this.#jobs.indexOf(job);if(i>=0){this.#jobs.splice(i,1);this.#release(job);}
    };
    signal?.addEventListener('abort',job.abort,{once:true});this.#jobs.push(job);this.#pump();return promise;
  }
  #release(job){this.#bytes-=job.bytes;job.signal?.removeEventListener('abort',job.abort);job.action=undefined;}
  #pump(){
    if(this.#active||this.#closed)return;
    if(!this.#jobs.length){for(const waiter of this.#idle)waiter.resolve();this.#idle=[];return;}
    const job=this.#jobs.shift();this.#active=job;
    Promise.resolve().then(()=>{if(this.#closed)throw this.#closed;if(job.signal?.aborted)throw aborted(job.signal);return job.action();}).then(job.resolve,job.reject).finally(()=>{this.#release(job);this.#active=undefined;this.#pump();});
  }
  close(error){
    if(this.#closed)return;this.#closed=error;
    for(const waiter of this.#idle)waiter.reject(error);this.#idle=[];
    for(const job of this.#jobs){job.reject(error);this.#release(job);}this.#jobs=[];
    this.#active?.reject(error);
  }
}
