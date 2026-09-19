import {fixture as base} from './recovery-peer.mjs';
export {method,frame,ack,cat,u16,u32,u64,short,delay,deliver} from './recovery-peer.mjs';

// Independent bit positions from the wire schema; no production codec.
export function noWaitFlag({cls,id,args}){
  let pos=2,short=()=>{pos+=1+args[pos];};
  if(cls===85&&id===10)return Boolean(args[0]&1);
  if(cls===60&&id===30){pos=0;short();return Boolean(args[pos]&1);}
  if(cls===50&&[10,20,30,40].includes(id)){
    short();if(id===20){short();short();}return Boolean(args[pos]&(id===10?16:id===40?4:1));
  }
  if(cls===40&&[10,20,30,40].includes(id)){
    short();if(id!==20)short();if(id===30||id===40)short();return Boolean(args[pos]&(id===10?16:id===20?2:1));
  }
  if(cls===60&&id===20){short();short();return Boolean(args[pos]&8);}
  return undefined;
}
export const fixture=(options,action)=>base({...options,onMethod:(e,s,state)=>options.onMethod?.(e,s,state)===true||noWaitFlag(e)===true},action);
export async function sequence(ch){
  const result=[];
  result.push(await ch.declareExchange('source','direct',{noWait:true}));
  result.push(await ch.declareExchange('source','direct',{passive:true,noWait:true}));
  result.push(await ch.declareExchange('destination','direct',{noWait:true}));
  result.push(await ch.declareQueue('queue',{noWait:true}));
  result.push(await ch.declareQueue('queue',{passive:true,noWait:true}));
  result.push(await ch.bindExchange('destination','source','key',{}, {noWait:true}));
  result.push(await ch.bindQueue('queue','destination','key',{}, {noWait:true}));
  result.push(await ch.consume('queue',()=>{}, {consumerTag:'consumer',noWait:true}));
  await ch.cancel('consumer',{noWait:true});
  result.push(await ch.purgeQueue('queue',{noWait:true}));
  result.push(await ch.unbindExchange('destination','source','key',{}, {noWait:true}));
  result.push(await ch.deleteQueue('queue',{noWait:true}));
  result.push(await ch.deleteExchange('destination',{noWait:true}));
  result.push(await ch.deleteExchange('source',{noWait:true}));
  await ch.confirmSelect({noWait:true});await ch.qos(0);
  return result;
}
