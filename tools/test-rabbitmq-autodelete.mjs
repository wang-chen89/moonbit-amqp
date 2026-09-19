import assert from 'node:assert/strict';
import {once} from 'node:events';
import {randomUUID} from 'node:crypto';
import fs from 'node:fs';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/test-rabbitmq-autodelete.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','web/engine.mjs']);
const tests=[],observations=[],options=port=>({host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,timeout:3000,heartbeat:2});
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(10000)});
await withRabbit(async info=>{
 async function run(name,mode){
  const proxy=await proxyTo(info.port),c=await connect({...options(proxy.port),recovery:{retryDelay:40,retryJitter:0,maxRetries:5,onTopologyError:()=>false}}),admin=await connect(options(info.port));
  const prefix=randomUUID()+'-',q=prefix+'q',e=prefix+'e',idle=prefix+'idle';
  try {
   const a=await c.openChannel(),b=await c.openChannel();await a.declareExchange(e,'direct',{autoDelete:true});await a.declareQueue(q,{autoDelete:true});await a.bindQueue(q,e);await a.declareQueue(idle,{autoDelete:true});await a.consume(q,()=>{},{consumerTag:'only'});
   if(mode==='close')await a.close();
   else {const cancelled=event(a,'cancel'),ch=await admin.openChannel();await ch.deleteQueue(q);await cancelled;await ch.close();}
   assert(!c.topology.queue(q));assert(!c.topology.exchanges.has(e));assert(c.topology.queue(idle));
   const recovered=event(c,'recovered');proxy.cut();await recovered;
   const codes=[];
   for(const [kind,n] of [['queue',q],['exchange',e],['queue',idle]]){
    const ch=await admin.openChannel();let code=0;
    try{if(kind==='queue')await ch.declareQueue(n,{passive:true});else await ch.declareExchange(n,'direct',{passive:true});}catch(error){code=error.code;assert.equal(code,404);}finally{if(!ch.closed)await ch.close();}codes.push(code);
   }
   assert.deepEqual(codes,[404,404,0]);await b.confirmSelect();await b.publish('',idle,'still-open');assert.equal((await b.get(idle,{noAck:true})).body.toString(),'still-open');
   tests.push(name);observations.push({mode,queueCode:codes[0],exchangeCode:codes[1],unusedQueueCode:codes[2],confirmedRoundtrip:true});console.log('PASS '+name);
  }finally{c.destroy();admin.destroy();await proxy.close();}
 }
 await run('explicit consumer channel close removes its auto-delete chain while unused topology survives reconnect','close');
 await run('external queue deletion sends broker cancellation and removes the chain from recovery','server-cancel');
 assertSourceUnchanged(sources);
 fs.writeFileSync(new URL('../evidence/rabbitmq-autodelete.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passed:tests.length,tests,observations,packages:info.packages,sources,scope:'Additional real-broker lifecycle tests; post-recovery passive 404 checks and confirmed roundtrip. These are not native differential cases.'},null,2)+'\n');
});
console.log(`${tests.length} real RabbitMQ auto-delete lifecycle groups passed`);
