import {fixture as base,method} from './nowait-peer.mjs';
export {method,frame,ack,cat,u16,u32,u64,short,delay,deliver} from './nowait-peer.mjs';
// Replies are independently constructed; production codec is never called.
export const fixture=(options,action)=>base({...options,onMethod:(e,s,state)=>{
 if(options.onMethod?.(e,s,state)===true)return true;
 if(e.cls===20&&e.id===20){s.write(method(e.ch,20,21,e.args));return true;}
}},action);
export const selected=e=>(e.cls===60&&[10,20,40].includes(e.id))||(e.cls===20&&e.id===20);
export async function sequence(ch){
 await ch.qos(7,false,{prefetchSize:65536});
 await ch.qos(65535,true,{prefetchSize:4294967295});
 await ch.qos(0);
 for(let i=0;i<4;i++){const tag='c'+i;await ch.consume('q',()=>{},{consumerTag:tag,noLocal:Boolean(i&1),noWait:Boolean(i&2),noAck:true,exclusive:true});await ch.cancel(tag);}
 await ch.flow(false);await ch.flow(true);
 for(let i=0;i<8;i++){
  const options={mandatory:Boolean(i&1),immediate:Boolean(i&2)};
  if(i<4)await ch.publish('','q','data',options);
  else await ch.publishStream('','q',[Buffer.from('da'),Buffer.from('ta')],4,options);
 }
 await ch.qos(2);
}
