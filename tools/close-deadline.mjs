export function closeDeadlineMillis(value) {
  if(value===null)return null;
  const time=value instanceof Date?value.getTime():value;
  if(typeof time!=='number'||!Number.isSafeInteger(time)||Math.abs(time)>8640000000000000)throw TypeError('Close deadline must be a valid Date, integer Unix milliseconds, or null');
  return time;
}
export const closeDeadlineError = () => Object.assign(Error('AMQP close deadline exceeded'),{code:'AMQP_CLOSE_DEADLINE',timeout:true});
export const connectionClosedError = () => Object.assign(Error('AMQP connection is closing or closed'),{code:'AMQP_CONNECTION_CLOSED'});
export function armCloseDeadline(time,expire) {
  let timer,stopped=false;
  const tick=()=>{if(stopped||time===null)return;const remaining=time-Date.now();if(remaining<=0){stopped=true;expire();}else timer=setTimeout(tick,Math.min(remaining,2147483647));};
  tick();return ()=>{stopped=true;clearTimeout(timer);};
}
