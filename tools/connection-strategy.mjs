import {waitFor} from './outbound.mjs';
import {notice} from './recovery-state.mjs';

export class DefaultConnectionRecovery {
  onConnectionClose(connection,error,context) { return context.reconnect(); }
  onChannelClose(channel,error,context) { return context.reconnect(); }
}
export function connectionStrategy(value) {
  if(value===undefined)return undefined;
  if(!value||typeof value!=='object'||typeof value.onConnectionClose!=='function'||typeof value.onChannelClose!=='function')throw TypeError('connectionRecovery must provide onConnectionClose and onChannelClose');
  return Object.freeze({onConnectionClose:value.onConnectionClose.bind(value),onChannelClose:value.onChannelClose.bind(value)});
}
export const expiredDecision=()=>Object.assign(Error('Recovery decision context has expired'),{code:'AMQP_RECOVERY_CONTEXT_EXPIRED'});

// Runs user policy separately from the recovery task so awaiting reconnect in
// the callback cannot end up awaiting the callback itself.
export function dispatchDecision({callback,target,connection,error,signal,current,reconnect,onDone}) {
  const controller=new AbortController();let active=true;
  const stop=()=>controller.abort(signal.reason??expiredDecision());
  signal.addEventListener('abort',stop,{once:true});if(signal.aborted)stop();
  const check=()=>{if(!active||controller.signal.aborted||!current())throw expiredDecision();};
  const context=Object.freeze({connection,signal:controller.signal,
    reconnect:async()=>{check();return reconnect();},
    close:async()=>{check();return target.close();}
  });
  const task=waitFor(Promise.resolve().then(()=>{check();return callback(target,error,context);}),null,[controller.signal])
    .catch(failure=>{if(!controller.signal.aborted&&current())notice(target,'callbackError',failure);})
    .finally(()=>{active=false;controller.abort(expiredDecision());signal.removeEventListener('abort',stop);onDone();});
  return {abort:()=>controller.abort(expiredDecision()),task,source:undefined};
}
