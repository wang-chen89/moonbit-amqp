import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {connect}=await import(process.env.AMQP_PERFORMANCE_CLIENT?pathToFileURL(process.env.AMQP_PERFORMANCE_CLIENT).href:'./client.mjs');
let input='';for await(const chunk of process.stdin)input+=chunk;
const r=JSON.parse(input);
for(const [key,min,max] of [['Bytes',1,1048576],['Window',1,128],['Count',1,8192],['Warmup',1,8192]])assert(Number.isInteger(r[key])&&r[key]>=min&&r[key]<=max,key);
assert(['get','consume'].includes(r.Receive));
const c=await connect(r.URI,{allowInsecureAuth:true,heartbeat:0,frameMax:131072,channelMax:64,timeout:20000,...(r.Certificate?{tls:{ca:r.Certificate,servername:'localhost'}}:{})});
try {
 const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true,arguments:{'x-queue-type':'classic'}});
 await ch.confirmSelect();
 const payload=Buffer.alloc(r.Bytes);for(let i=0;i<payload.length;i++)payload[i]=(i*31+17)%256;
 async function sample(count){
  const out={Count:count,Verified:0,BatchMS:[]};let start=performance.now();
  for(let offset=0;offset<count;offset+=r.Window){
   const begin=performance.now(),pending=[];
   for(let i=offset;i<count&&i<offset+r.Window;i++)pending.push(ch.publish('',queue,payload,{properties:{'message-id':String(i)}}));
   await Promise.all(pending);out.BatchMS.push(performance.now()-begin);
  }
  out.PublishMS=performance.now()-start;
  const verify=m=>{assert(m,'missing message');assert(m.body.equals(payload),'body mismatch');assert.equal(m.properties['message-id'],String(out.Verified));out.Verified++;};
  start=performance.now();
  if(r.Receive==='get'){
   for(let i=0;i<count;i++)verify(await ch.get(queue,{noAck:true}));
   out.ReceiveMS=performance.now()-start;
  } else {
   let resolve,reject;const received=new Promise((a,b)=>{resolve=a;reject=b;});received.catch(()=>{});
   const timer=setTimeout(()=>reject(Error('consumer timeout')),20000);
   try{const tag=await ch.consume(queue,m=>{try{verify(m);if(out.Verified===count){out.ReceiveMS=performance.now()-start;resolve();}}catch(e){reject(e);}},{noAck:true});await received;await ch.cancel(tag);}finally{clearTimeout(timer);}
  }
  assert.equal(await ch.get(queue,{noAck:true}),null,'extra message');return out;
 }
 const warmup=await sample(r.Warmup),measured=await sample(r.Count);
 const limits=c.limits;await c.close();
 console.log(JSON.stringify({runtime:process.version,limits,warmup,measured}));
}finally{c.destroy();}
