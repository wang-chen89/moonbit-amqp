import fs from 'node:fs';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {fixture,noWaitFlag,sequence,method,ack,cat,u16,u32,short,delay,deliver} from './nowait-peer.mjs';
import {sendBody,deliver as streamDeliver} from './receive-peer.mjs';
import {gate,until} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/receive-peer.mjs','tools/stream-peer.mjs','tools/test-nowait.mjs','web/engine.mjs']);
const tests=[],wire=[];async function test(name,fn){await fn();tests.push(name);console.log('PASS '+name);}
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(4000)});
const recovery={recovery:{maxRetries:3,retryDelay:5,retryJitter:0},timeout:700};
const cut=async(c,state)=>{const ready=event(c,'recovered');[...state.sockets].at(-1).destroy();await ready;};
await test('all no-wait operations send proper flags without reply slots or timers',()=>fixture({},async({open,state})=>{
 const c=await open({timeout:100}),ch=await c.openChannel(),result=await sequence(ch);await delay(150);assert.equal(c.closed,false);
 assert.deepEqual(result,[{},{},{},{queue:'queue','message-count':0,'consumer-count':0},{queue:'queue','message-count':0,'consumer-count':0},{},{},'consumer',{'message-count':0},{},{'message-count':0},{},{}]);
 const rows=state.methods.filter(e=>noWaitFlag(e)!==undefined);assert.equal(rows.length,15);for(const row of rows)assert.equal(noWaitFlag(row),true);wire.push(...rows.map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')})));await c.close();
}));
await test('default operations still wait for their normal responses',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.declareExchange('e');await ch.declareQueue('q');await ch.bindQueue('q','e');await ch.bindExchange('d','e');await ch.unbindExchange('d','e');await ch.consume('q',()=>{},{consumerTag:'c'});await ch.cancel('c');await ch.purgeQueue('q');await ch.deleteQueue('q');await ch.deleteExchange('e');await ch.confirmSelect();assert(state.methods.filter(e=>noWaitFlag(e)!==undefined).every(e=>noWaitFlag(e)===false));await c.close();
}));
await test('no-wait request preserves an unrelated pending RPC reply slot',()=>{
 let held;return fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===10){held={e,s};return true;}}},async({open})=>{
  const c=await open(),ch=await c.openChannel(),rpc=ch.qos(1);await until(()=>held);await ch.declareExchange('e','direct',{noWait:true});await assert.rejects(ch.get('q'),/One RPC/);held.s.write(method(held.e.ch,60,11));await rpc;await c.close();
 });
});
await test('later broker rejection closes only the offending no-wait channel',()=>{
 let target;return fixture({onMethod:(e,s)=>{if(e.cls===40&&e.id===10&&noWaitFlag(e)){target={e,s};return true;}}},async({open})=>{
  const c=await open(),ch=await c.openChannel(),sibling=await c.openChannel();await ch.declareExchange('missing','direct',{passive:true,noWait:true});await until(()=>target);const closed=event(ch,'close');target.s.write(method(ch.id,20,40,u16(404),short('missing'),u16(40),u16(10)));const [error]=await closed;assert.equal(error.code,404);assert.equal(c.closed,false);await sibling.qos(0);await c.close();
 });
});
await test('no-wait request remains behind the complete same-channel body',()=>{
 const held=gate();return fixture({onMessage:(m,s)=>s.write(ack(m.ch,1))},async({open,state})=>{
  const c=await open(),ch=await c.openChannel();await ch.confirmSelect({noWait:true});async function* source(){yield Buffer.from('a');await held.promise;yield Buffer.from('b');}
  const published=ch.publishStream('','q',source(),2),declared=ch.declareQueue('q',{noWait:true});await delay(40);assert(!state.methods.some(e=>e.cls===50&&e.id===10));held.resolve();await published;await declared;await ch.qos(0);assert.equal(state.messages[0].body.toString(),'ab');await c.close();
 });
});
for(const streamBodies of [false,true])await test(`no-wait consumer accepts immediate delivery in ${streamBodies?'stream':'buffer'} mode`,()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===20){deliver(s,e.ch,1,'consumer','nowait');return true;}}},async({open})=>{
 const c=await open({streamBodies}),ch=await c.openChannel(),got=gate();assert.equal(await ch.consume('q',m=>got.resolve(m),{consumerTag:'consumer',noWait:true}),'consumer');const m=await got.promise;
 if(streamBodies){let body='';for await(const b of m.body)body+=b;await m.completed;assert.equal(body,'nowait');}else assert.equal(m.body.toString(),'nowait');await ch.ack(m.args['delivery-tag']);await c.close();
}));
for(const streamBodies of [false,true])await test(`cancel no-wait drops late ${streamBodies?'large streamed':'buffered'} delivery without ack`,()=>fixture({onMethod:(e,s,state)=>{if(e.cls===60&&e.id===30){if(streamBodies){state.late=sendBody(s,e.ch,2*1048576,{kind:streamDeliver});state.late.catch(()=>{});}else deliver(s,e.ch,1,'consumer','late');return true;}if(e.cls===60&&e.id===10&&state.late){state.late.then(()=>s.write(method(e.ch,60,11))).catch(()=>{});return true;}}},async({open,state})=>{
 const c=await open({streamBodies,timeout:2000}),ch=await c.openChannel(),messages=[];await ch.consume('q',m=>messages.push(m),{consumerTag:'consumer',noWait:true});await ch.cancel('consumer',{noWait:true});await ch.qos(0);assert.equal(c.closed,false);assert.deepEqual(messages,[]);assert(!state.methods.some(e=>e.cls===60&&[80,90,120].includes(e.id)));await c.close();
}));
await test('invalid noWait is rejected locally by every option-bearing method',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel(),bad={noWait:'true'},before=state.methods.length;
 for(const call of [()=>ch.declareQueue('q',bad),()=>ch.deleteQueue('q',bad),()=>ch.purgeQueue('q',bad),()=>ch.bindQueue('q','e','',{},bad),()=>ch.declareExchange('e','direct',bad),()=>ch.deleteExchange('e',bad),()=>ch.bindExchange('d','s','',{},bad),()=>ch.unbindExchange('d','s','',{},bad),()=>ch.consume('q',()=>{},{...bad,consumerTag:'consumer'}),()=>ch.cancel('consumer',bad),()=>ch.confirmSelect(bad)])await assert.rejects(call(),/Invalid noWait/);
 await delay(20);assert.equal(state.methods.length,before);await ch.consume('q',()=>{},{consumerTag:'consumer',noWait:true});await c.close();
}));
await test('local encoding failure leaves no false consumer registration or dead connection',()=>fixture({},async({open})=>{
 const c=await open(),ch=await c.openChannel();await assert.rejects(ch.consume('q',()=>{},{consumerTag:'consumer',noWait:true,arguments:{['x'.repeat(256)]:true}}));await ch.consume('q',()=>{},{consumerTag:'consumer',noWait:true});await assert.rejects(ch.consume('q',()=>{},{consumerTag:'consumer',noWait:true}),/duplicate/);await ch.qos(0);await c.close();
}));
await test('consumer cap bounds no-wait registrations and cancellation releases capacity',()=>fixture({},async({open})=>{
 const c=await open({timeout:3000}),ch=await c.openChannel();for(let i=0;i<1024;i++)await ch.consume('q',()=>{},{consumerTag:'c'+i,noWait:true});await assert.rejects(ch.consume('q',()=>{},{consumerTag:'overflow',noWait:true}),/Consumer limit/);await ch.cancel('c0',{noWait:true});await ch.consume('q',()=>{},{consumerTag:'c0',noWait:true});await c.close();
}));
await test('anonymous no-wait queue exposes no invented name or counts',()=>fixture({},async({open})=>{
 const c=await open(),ch=await c.openChannel();assert.deepEqual(await ch.declareQueue('',{exclusive:true,noWait:true}),{queue:'','message-count':0,'consumer-count':0});await ch.qos(0);await c.close();
}));
await test('named recovery retains no-wait topology and consumer flags',()=>fixture({},async({open,state})=>{
 const c=await open(recovery),ch=await c.openChannel();await ch.declareExchange('s','direct',{noWait:true});await ch.declareExchange('d','direct',{noWait:true});await ch.declareQueue('q',{noWait:true});await ch.bindExchange('d','s','k',{}, {noWait:true});await ch.bindQueue('q','d','k',{}, {noWait:true});await ch.consume('q',()=>{},{consumerTag:'consumer',noWait:true});await ch.confirmSelect({noWait:true});await ch.qos(0);await cut(c,state);
 await ch.qos(0);const rows=state.methods.filter(e=>e.peer===2&&noWaitFlag(e)!==undefined);assert.equal(rows.length,7);for(const e of rows)assert.equal(noWaitFlag(e),e.cls!==85);await c.close();
}));
await test('binding removal identity is independent of wait policy during recovery',()=>fixture({},async({open,state})=>{
 const c=await open(recovery),ch=await c.openChannel();await ch.declareExchange('s');await ch.declareExchange('d');await ch.declareQueue('q');await ch.bindExchange('d','s','one',{}, {noWait:true});await ch.unbindExchange('d','s','one');await ch.bindExchange('d','s','two');await ch.unbindExchange('d','s','two',{}, {noWait:true});await ch.bindQueue('q','d','k',{}, {noWait:true});await ch.unbindQueue('q','d','k');assert.equal(c.topology.exchangeBindings.size,0);assert.equal(c.topology.bindings.size,0);await cut(c,state);await ch.qos(0);assert(!state.methods.some(e=>e.peer===2&&((e.cls===40&&e.id===30)||(e.cls===50&&e.id===20))));await c.close();
}));
await test('no-wait cancel and deletes remove recovery intent and auto-delete dependents',()=>fixture({},async({open,state})=>{
 const c=await open(recovery),ch=await c.openChannel();await ch.declareExchange('e','direct',{autoDelete:true,noWait:true});await ch.declareQueue('q',{autoDelete:true,noWait:true});await ch.bindQueue('q','e','',{}, {noWait:true});await ch.consume('q',()=>{},{consumerTag:'consumer',noWait:true});await ch.cancel('consumer',{noWait:true});assert.equal(c.topology.queues.size,0);assert.equal(c.topology.exchanges.size,0);await ch.declareQueue('gone',{noWait:true});await ch.deleteQueue('gone',{noWait:true});await ch.declareExchange('gone','direct',{noWait:true});await ch.deleteExchange('gone',{noWait:true});await cut(c,state);await ch.qos(0);assert(!state.methods.some(e=>e.peer===2&&[40,50].includes(e.cls)));await c.close();
}));
await test('failed no-wait metadata does not enter recovery topology',()=>fixture({},async({open})=>{
 const c=await open(recovery),ch=await c.openChannel();await assert.rejects(ch.declareQueue('q',{noWait:true,arguments:{['x'.repeat(256)]:true}}));assert.equal(c.topology.queues.size,0);await ch.declareQueue('q',{noWait:true});await c.close();
}));
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/nowait-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,wire,sources,scope:'Independent peer with no replies for no-wait methods. Exact bit/argument capture, pending RPC isolation, content ordering, immediate/late delivery, resource limits, delayed rejection and recovery registration; not full upstream API parity.'},null,2)+'\n');
console.log(`${tests.length} no-wait fixture groups passed`);
