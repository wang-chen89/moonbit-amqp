export function consumerAbortReason(signal) {
  return signal.reason instanceof Error ? signal.reason : Error('Consumer aborted', {cause:signal.reason});
}
export function checkConsumerSignal(signal) {
  if(signal===undefined)return;
  if(!(signal instanceof AbortSignal))throw TypeError('Invalid consumer signal');
  if(signal.aborted)throw consumerAbortReason(signal);
}
export function observeConsumerSignal(signal,abort) {
  if(!signal)return ()=>{};
  const listener=()=>abort(consumerAbortReason(signal));
  signal.addEventListener('abort',listener,{once:true});
  return ()=>signal.removeEventListener('abort',listener);
}
