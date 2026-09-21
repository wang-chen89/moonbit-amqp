import assert from 'node:assert/strict';
import {once} from 'node:events';
import fs from 'node:fs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import {connect} from './client.mjs';
import {fixture,method,ack,cat,u16,u32,short,delay,deliver,until} from './recovery-peer.mjs';
const tests=[];
const sources=sourceSnapshot(['authentication.mbt','cmd/web/authentication.mbt','tools/authentication.mjs','tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/recovery-peer.mjs','tools/test-recovery.mjs','web/engine.mjs']);
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(5000)});
const config={recovery:{retryDelay:5,retryJitter:0,maxRetries:3},timeout:500};
async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
const connectionSocket=state=>[...state.sockets].at(-1);
async function reconnect(c,state) { const recovered=event(c,'recovered');connectionSocket(state).destroy();await recovered;assert.equal(c.state,'open'); }

await test('recovery configuration validation precedes connection creation',async()=>{
 for(const recovery of [{maxRetries:0},{retryDelay:-1},{topology:'invalid'},{maxTopologyEntries:0},{onTopologyError:true}])
  await assert.rejects(connect({allowInsecureAuth:true,recovery}),/Invalid/);
});
await test('ordered cross-channel topology and server-named queue aliases survive repeated disconnects',()=>fixture({},async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();
 await a.declareExchange('source');await a.declareExchange('destination');await a.bindExchange('destination','source','key');
 const q=await b.declareQueue('',{exclusive:true,autoDelete:true});await b.bindQueue(q.queue,'destination','key');
 await b.qos(2);await b.consume(q.queue,()=>{},{consumerTag:'stable'});await a.confirmSelect();
 const names=[];c.on('queueNameChanged',x=>names.push(x));
 for(let i=0;i<2;i++) {
  await reconnect(c,state);
  const current=state.methods.filter(m=>m.peer===state.accepted),index=(cls,id)=>current.findIndex(m=>m.cls===cls&&m.id===id);
  assert(index(40,10)<index(50,10));assert(index(50,10)<index(40,30));assert(index(40,30)<index(50,20));assert(index(50,20)<index(60,20));
  assert(current.some(m=>m.cls===60&&m.id===10));assert(current.some(m=>m.cls===85&&m.id===10));
  assert.equal(a.state,'open');assert.equal(b.state,'open');assert.notEqual(c.resolveQueue(q.queue),q.queue);
 }
 assert.equal(names.length,2);assert.equal(c.resolveQueue(q.queue),'generated-3');await c.close();
}));
await test('deliveries received during recovery wait for readiness and stale tags never reach new channel',()=>fixture({onMethod:(e,s)=>{
 if(e.cls===60&&e.id===20) {s.write(method(e.ch,60,21,short('consumer')));deliver(s,e.ch,1,'consumer',`epoch-${s.peerId}`);return true;}
}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),values=[];
 await ch.declareQueue('q');await ch.qos(1);
 await ch.consume('q',m=>{if(m){assert.equal(c.state,'open');assert.equal(ch.state,'open');values.push(m);ch.ack(m.args['delivery-tag']);}},{consumerTag:'consumer'});
 await until(()=>values.length===1);const oldTag=values[0].args['delivery-tag'];
 await reconnect(c,state);await until(()=>values.length===2);
 assert(BigInt(values[1].args['delivery-tag'])>BigInt(oldTag));
 assert.throws(()=>ch.ack(oldTag),/Stale/);assert.throws(()=>ch.nack(oldTag),/Stale/);assert.throws(()=>ch.reject(oldTag),/Stale/);
 await until(()=>state.methods.some(m=>m.peer===2&&m.cls===60&&m.id===80));const sent=state.methods.filter(m=>m.peer===2&&m.cls===60&&m.id===80);assert.equal(sent.length,1);assert.equal(sent[0].args.readBigUInt64BE(0),1n);
}));
await test('unconfirmed publications reject and are not silently republished after recovery',()=>fixture({onMessage:(m,s,state)=>{if(s.peerId>1)s.write(ack(m.ch,1));}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.confirmSelect();
 const pending=ch.publish('','q','unconfirmed');const rejected=assert.rejects(pending);
 await until(()=>state.messages.length===1);await reconnect(c,state);await rejected;assert.equal(state.messages.length,1);
 await ch.publish('','q','new');assert.equal(state.messages.length,2);
}));
await test('soft channel error recovers that channel without disconnecting a healthy sibling',()=>fixture({onMethod:(e,s,state)=>{
 if(e.cls===60&&e.id===70&&!state.failed){state.failed=true;s.write(method(e.ch,20,40,u16(404),short('missing queue'),u16(60),u16(70)));return true;}
}},async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareQueue('owned');
 const recovered=event(a,'recovered');await assert.rejects(a.get('missing'),/404/);
 assert.equal(await b.get('existing'),null);await recovered;
 assert.equal(state.accepted,1);assert.equal(c.state,'open');assert.equal(a.state,'open');assert.equal(await a.get('owned'),null);
}));
await test('deleted topology, unbound routes and cancelled consumers are not resurrected',()=>fixture({},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();
 await ch.declareExchange('deleted');await ch.deleteExchange('deleted');await ch.declareExchange('keep');
 await ch.declareExchange('other');await ch.bindExchange('other','keep','x');await ch.unbindExchange('other','keep','x');
 await ch.declareQueue('gone');await ch.deleteQueue('gone');await ch.declareQueue('keep-q');
 await ch.bindQueue('keep-q','keep','x');await ch.unbindQueue('keep-q','keep','x');
 await ch.consume('keep-q',()=>{},{consumerTag:'cancelled'});await ch.cancel('cancelled');
 await reconnect(c,state);const methods=state.methods.filter(m=>m.peer===2);
 assert.equal(methods.filter(m=>m.cls===40&&m.id===10).length,2);assert.equal(methods.filter(m=>m.cls===50&&m.id===10).length,1);
 for(const [cls,id] of [[40,30],[50,20],[60,20]])assert(!methods.some(m=>m.cls===cls&&m.id===id));
}));
await test('transient mode preserves subscriptions but skips durable declarations',()=>fixture({},async({open,state})=>{
 const c=await open({...config,recovery:{...config.recovery,topology:'transient'}}),ch=await c.openChannel();
 await ch.declareExchange('durable','direct',{durable:true});await ch.declareExchange('temporary','direct',{autoDelete:true});
 await ch.declareQueue('durable-q',{durable:true});await ch.declareQueue('transient-q',{exclusive:true});
 await ch.bindQueue('durable-q','durable');await ch.bindQueue('transient-q','durable');await ch.consume('durable-q',()=>{},{consumerTag:'kept'});
 await reconnect(c,state);const m=state.methods.filter(m=>m.peer===2);
 assert.equal(m.filter(x=>x.cls===40&&x.id===10).length,1);assert.equal(m.filter(x=>x.cls===50&&x.id===10).length,1);
 assert.equal(m.filter(x=>x.cls===50&&x.id===20).length,1);assert.equal(m.filter(x=>x.cls===60&&x.id===20).length,1);
}));
await test('disabled topology still restores channel QoS and transaction mode',()=>fixture({},async({open,state})=>{
 const c=await open({...config,recovery:{...config.recovery,topology:'none'}}),ch=await c.openChannel();
 await ch.declareQueue('q');await ch.qos(3);await ch.txSelect();await ch.consume('q',()=>{},{consumerTag:'not-restored'});
 await reconnect(c,state);const m=state.methods.filter(m=>m.peer===2);
 assert(!m.some(x=>x.cls===50));assert(!m.some(x=>x.cls===60&&x.id===20));
 assert(m.some(x=>x.cls===60&&x.id===10));assert(m.some(x=>x.cls===90&&x.id===10));await ch.txRollback();
}));
await test('skippable topology failure reopens channel before restoring remaining entities',()=>fixture({onMethod:(e,s,state)=>{
 if(s.peerId>1&&e.cls===40&&e.id===10&&!state.failed){state.failed=true;s.write(method(e.ch,20,40,u16(406),short('conflict'),u16(40),u16(10)));return true;}
}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareExchange('conflict');await ch.declareQueue('survivor');
 const errors=[];c.on('topologyError',e=>errors.push(e));await reconnect(c,state);
 assert.equal(errors.length,1);assert.equal(errors[0].type,'exchange');assert.equal(await ch.get('survivor'),null);
}));
await test('topology error callback can refuse skipping and exhaust retry budget',()=>fixture({onMethod:(e,s)=>{
 if(s.peerId>1&&e.cls===40&&e.id===10){s.write(method(e.ch,20,40,u16(406),short('conflict'),u16(40),u16(10)));return true;}
}},async({open,state})=>{
 const c=await open({...config,recovery:{maxRetries:2,retryDelay:5,onTopologyError:()=>false}}),ch=await c.openChannel();await ch.declareExchange('conflict');
 const closed=event(c,'close');connectionSocket(state).destroy();const [error]=await closed;
 assert.match(error.message,/exhausted/);assert.equal(state.accepted,3);assert.equal(ch.closed,true);
}));
await test('connection failure during topology replay retries the complete recovery sequence',()=>fixture({onMethod:(e,s,state)=>{
 if(s.peerId===2&&e.cls===50&&e.id===10){s.destroy();return true;}
}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareQueue('q');await reconnect(c,state);
 assert.equal(state.accepted,3);assert.equal(ch.state,'open');assert.equal(await ch.get('q'),null);
}));
await test('explicit close cancels retry delay without creating another socket',()=>fixture({},async({open,state})=>{
 const c=await open({...config,recovery:{maxRetries:5,retryDelay:150}});await c.openChannel();
 const reconnecting=event(c,'recovering');connectionSocket(state).destroy();await reconnecting;
 const ready=c.waitForReady().catch(e=>e);await c.close();await delay(200);
 assert.equal(state.accepted,1);assert.equal(c.closed,true);assert((await ready) instanceof Error);
}));
await test('AbortSignal cancels a reconnect handshake and releases the wait',()=>fixture({onMethod:(e,s)=>s.peerId>1&&e.cls===10&&e.id===11},async({open,state})=>{
 const abort=new AbortController(),c=await open({...config,signal:abort.signal,timeout:2000});
 connectionSocket(state).destroy();await until(()=>state.methods.some(m=>m.peer===2&&m.cls===10&&m.id===11));assert.equal(state.accepted,2);
 const closed=event(c,'close');abort.abort(Error('cancel recovery'));await closed;assert.equal(c.closed,true);
}));
await test('ready wait cancellation is local and callback errors do not stop recovery listeners',()=>fixture({onMethod:(e,s)=>{
 if(s.peerId===2&&e.cls===10&&e.id===11){setTimeout(()=>{if(!s.destroyed)s.write(method(0,10,30,u16(8),u32(8192),u16(0)));},80);return true;}
}},async({open,state})=>{
 const c=await open({...config,recovery:{retryDelay:80,maxRetries:2}});await c.openChannel();
 c.on('recovered',()=>{throw Error('listener failure');});const callbackError=event(c,'callbackError');
 const recovered=event(c,'recovered'),recovering=event(c,'recovering');connectionSocket(state).destroy();await recovering;
 const abort=new AbortController(),waiting=c.waitForReady({signal:abort.signal});abort.abort();await assert.rejects(waiting);
 await recovered;assert.match((await callbackError)[0].message,/listener failure/);assert.equal(c.closed,false);
}));
await test('topology stores an independent argument snapshot and enforces a bounded registry',()=>fixture({},async({open,state})=>{
 const c=await open({...config,recovery:{retryDelay:5,maxRetries:2,maxTopologyEntries:2}}),ch=await c.openChannel();
 const options={arguments:{key:'original'}};await ch.declareQueue('q',options);options.arguments.key='changed';await ch.declareExchange('e');
 await assert.rejects(ch.declareQueue('excess'),/topology limit/);await reconnect(c,state);
 await ch.declareQueue('q',{passive:true});await ch.declareExchange('e');
 const q=state.methods.find(m=>m.peer===2&&m.cls===50&&m.id===10);assert(q.args.includes(Buffer.from('original')));assert(!q.args.includes(Buffer.from('changed')));
}));
await test('pending non-idempotent RPC rejects instead of being replayed after reconnect',()=>fixture({onMethod:(e,s)=>{
 if(e.cls===50&&e.id===30){s.destroy();return true;}
}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareQueue('q');const recovered=event(c,'recovered');
 await assert.rejects(ch.purgeQueue('q'));await recovered;assert.equal(state.methods.filter(m=>m.cls===50&&m.id===30).length,1);
}));
await test('failure of the last topology entity still leaves a usable reopened channel',()=>fixture({onMethod:(e,s)=>{
 if(s.peerId>1&&e.cls===40&&e.id===10){s.write(method(e.ch,20,40,u16(406),short('conflict'),u16(40),u16(10)));return true;}
}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareExchange('only');await reconnect(c,state);
 assert.equal(await ch.get('usable'),null);
}));
await test('skipping a failed consumer restores earlier subscriptions after reopening its channel',()=>fixture({onMethod:(e,s)=>{
 if(s.peerId>1&&e.cls===60&&e.id===20){const pos=3+e.args[2],tag=e.args.subarray(pos+1,pos+1+e.args[pos]).toString();
  if(tag==='bad'){s.write(method(e.ch,20,40,u16(403),short('refused'),u16(60),u16(20)));return true;}
  s.write(method(e.ch,60,21,short(tag)));deliver(s,e.ch,1,tag,'survives');return true;
 }
}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),messages=[];await ch.declareQueue('q');
 await ch.consume('q',m=>{if(m)messages.push(m);},{consumerTag:'good'});await ch.consume('q',()=>{},{consumerTag:'bad'});
 await reconnect(c,state);await until(()=>messages.length===1);assert.equal(messages[0].body.toString(),'survives');ch.ack(messages[0].args['delivery-tag']);
}));
await test('broker consumer cancellation removes its recovery entry',()=>fixture({},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),messages=[];await ch.declareQueue('q');await ch.consume('q',m=>messages.push(m),{consumerTag:'gone'});
 const cancelled=event(ch,'cancel');connectionSocket(state).write(method(ch.id,60,30,short('gone'),Buffer.from([0])));await cancelled;await until(()=>messages.length===1);
 assert.deepEqual(messages,[null]);await reconnect(c,state);assert(!state.methods.some(m=>m.peer===2&&m.cls===60&&m.id===20));
}));
await test('closing a channel during connection recovery cannot resurrect or leak the opening channel',()=>fixture({onMethod:(e,s)=>{
 if(s.peerId===2&&e.cls===20&&e.id===10&&e.ch===2)return true;
}},async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await b.declareQueue('q');
 const restored=event(c,'recovered');connectionSocket(state).destroy();await until(()=>state.methods.some(m=>m.peer===2&&m.cls===20&&m.id===10&&m.ch===2));const closing=b.close();connectionSocket(state).write(method(2,20,11,u32(0)));await closing;await restored;
 assert.equal(b.closed,true);assert.equal(await a.get('q'),null);assert(state.methods.some(m=>m.peer===2&&m.cls===20&&m.id===40&&m.ch===2));
}));
await test('connection recovery supersedes an older channel retry without a duplicate open',()=>fixture({onMethod:(e,s,state)=>{
 if(s.peerId===1&&e.cls===20&&e.id===10){state.opens=(state.opens??0)+1;if(state.opens===2){s.write(method(e.ch,20,40,u16(404),short('try later'),u16(20),u16(10)));return true;}}
 if(s.peerId===1&&e.cls===60&&e.id===70){s.write(method(e.ch,20,40,u16(404),short('missing'),u16(60),u16(70)));return true;}
}},async({open,state})=>{
 const c=await open({...config,recovery:{retryDelay:150,retryJitter:0,maxRetries:3}}),ch=await c.openChannel();
 await assert.rejects(ch.get('missing'));await until(()=>state.opens===2);await reconnect(c,state);
 await ch.declareQueue('after');await delay(180);assert.equal(state.methods.filter(m=>m.peer===2&&m.cls===20&&m.id===10).length,1);
}));
await test('server-named queue aliases also work for later passive declarations',()=>fixture({},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await reconnect(c,state);
 assert.equal((await ch.declareQueue(queue,{passive:true})).queue,c.resolveQueue(queue));
}));
await test('closing connection from a channel ready listener cannot resurrect it',()=>fixture({},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();let ready=0,recovered=0;
 c.on('ready',()=>ready++);c.on('recovered',()=>recovered++);
 ch.once('ready',()=>c.destroy(Error('stop from ready')));
 const closed=event(c,'close');connectionSocket(state).destroy();await closed;await delay(25);
 assert.equal(c.closed,true);assert.equal(ch.closed,true);assert.equal(ready,0);assert.equal(recovered,0);
}));
await test('closing connection from stateChange suppresses stale readiness notifications',()=>fixture({},async({open,state})=>{
 const c=await open(config);await c.openChannel();let ready=0,recovered=0;
 c.on('ready',()=>ready++);c.on('recovered',()=>recovered++);
 c.on('stateChange',x=>{if(x.to==='open')c.destroy(Error('stop at open'));});
 const closed=event(c,'close');connectionSocket(state).destroy();await closed;await delay(25);
 assert.equal(c.closed,true);assert.equal(ready,0);assert.equal(recovered,0);
}));
await test('a channel recovery notification permits a new topology RPC',()=>fixture({onMethod:(e,s,state)=>{
 if(e.cls===60&&e.id===70&&!state.failed){state.failed=true;s.write(method(e.ch,20,40,u16(404),short('missing'),u16(60),u16(70)));return true;}
}},async({open})=>{
 const c=await open(config),ch=await c.openChannel();
 const declared=new Promise((resolve,reject)=>ch.once('recovered',()=>ch.declareQueue('after-ready').then(resolve,reject)));
 await assert.rejects(ch.get('missing'));assert.equal((await declared).queue,'after-ready');
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/recovery-fixtures.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),scope:'Independently encoded TCP peer; actual RabbitMQ integration is separate.',passed:tests.length,tests,sources},null,2)+'\n');
console.log(`${tests.length} recovery fixture groups passed`);
