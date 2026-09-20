import {waitFor} from './outbound.mjs';
import {AsyncLocalStorage} from 'node:async_hooks';
const operations=new AsyncLocalStorage();
export function recoveryOperationAllowed(connection,channel) {
  const scope=operations.getStore();
  if(scope?.connection!==connection||scope.channel!==channel)return false;
  scope.check();return true;
}

export class DefaultTopologyRecovery {
  recoverTopology(context) { return context.restoreDefault(); }
}
export function topologyStrategy(value) {
  if(value===undefined)return undefined;
  if(!value||typeof value!=='object'||typeof value.recoverTopology!=='function')throw TypeError('topologyRecovery must provide recoverTopology(context)');
  return value.recoverTopology.bind(value);
}
const expired=()=>Object.assign(Error('Topology recovery context has expired'),{code:'AMQP_RECOVERY_CONTEXT_EXPIRED'});
const methods=['declareExchange','deleteExchange','declareQueue','deleteQueue','purgeQueue','bindQueue','unbindQueue','bindExchange','unbindExchange','qos','confirmSelect','consume','cancel','publish','publishStream','publishWithDeferredConfirm','publishStreamWithDeferredConfirm','get','ack','nack','reject','recover','txSelect','txCommit','txRollback','flow','close'];
const entityTypes=new Set(['exchange','queue','queue-binding','exchange-binding','consumer']);
// Promise subclasses are assimilated through then by await, allowing a scope
// to distinguish a task the callback handled from one it simply abandoned.
class StrategyTask extends Promise {
  #observe;
  static get [Symbol.species]() { return Promise; }
  constructor(promise,observe) {
    super((resolve,reject)=>promise.then(resolve,reject));this.#observe=observe;
    Promise.prototype.then.call(this,undefined,()=>{});
  }
  then(...args) { this.#observe();return super.then(...args); }
}
function result(value) {
  if(value===undefined)return [];
  if(!Array.isArray(value))throw TypeError('Topology strategy must return an array of skipped entities or undefined');
  return value.map(e=>{
    if(!e||!entityTypes.has(e.type)||typeof e.name!=='string'||!Number.isInteger(e.channel)||e.channel<0||!(e.error instanceof Error))throw TypeError('Invalid skipped topology entity');
    return Object.freeze({...e});
  });
}

// Every invocation owns a revocable context; late callbacks cannot operate on
// the next recovery generation. Custom JavaScript itself must observe signal.
export async function runTopologyStrategy({strategy,connection,channels,raw,signal,current,restoreDefault,keepActive,scopeChannel}) {
  const lifetime=new AbortController(),pending=[];let active=true,defaultTask;
  const abort=()=>lifetime.abort(signal.reason??expired());
  const lost=()=>lifetime.abort(expired());
  signal.addEventListener('abort',abort,{once:true});raw.once('close',lost);
  const closedChannels=scopeChannel?[scopeChannel]:[];
  for(const ch of closedChannels)ch.once('close',lost);
  if(signal.aborted)abort();
  const check=()=>{if(!active||lifetime.signal.aborted||!current()||raw.closed)throw expired();};
  const track=promise=>{const task={promise,observed:false};pending.push(task);return new StrategyTask(promise,()=>{task.observed=true;});};
  const channelView=(resolve,logical)=>{
    const view={id:resolve().id,logicalId:logical?.id};
    for(const name of methods)view[name]=(...args)=>{
      check();const value=logical?operations.run({connection,channel:logical,check},()=>logical[name](...args)):resolve()[name](...args);
      return value&&typeof value.then==='function'?track(value):value;
    };
    Object.defineProperty(view,'closed',{enumerable:true,get:()=>resolve().closed});
    if(logical)view.topologyConfiguration=(global=false)=>{check();return logical.topologyConfiguration(global);};
    return Object.freeze(view);
  };
  const context=Object.freeze({connection,signal:lifetime.signal,keepActive,
    channels:Object.freeze(channels.map(ch=>channelView(()=>ch._raw,ch))),
    resolveQueue:name=>{check();return connection.resolveQueue(name);},
    restoreDefault:()=>{
      try{check();}catch(error){return Promise.reject(error);}
      return defaultTask??=track(Promise.resolve().then(()=>{check();return restoreDefault(check);}));
    },
    withChannel:fn=>track((async()=>{
      check();if(typeof fn!=='function')throw TypeError('withChannel requires a callback');
      const ch=await raw.openChannel();
      try{check();return await waitFor(Promise.resolve().then(()=>{check();return fn(channelView(()=>ch));}),null,[lifetime.signal]);}
      finally{if(!ch.closed)await ch.close();}
    })())
  });
  try {
    check();
    const value=await waitFor(Promise.resolve().then(()=>{check();return strategy?strategy(context):context.restoreDefault();}),null,[lifetime.signal]);
    // A callback may start default restoration or a temporary channel without
    // returning its promise. Readiness still waits for the work it initiated.
    for(let joined=0;joined<pending.length;){
      const batch=pending.slice(joined);joined=pending.length;
      const outcomes=await waitFor(Promise.allSettled(batch.map(task=>task.promise)),null,[lifetime.signal]);
      for(let i=0;i<outcomes.length;i++)if(outcomes[i].status==='rejected'&&!batch[i].observed)throw outcomes[i].reason;
    }
    check();return result(value);
  } finally {
    active=false;lifetime.abort(expired());signal.removeEventListener('abort',abort);raw.off('close',lost);
    for(const ch of closedChannels)ch.off('close',lost);
  }
}
