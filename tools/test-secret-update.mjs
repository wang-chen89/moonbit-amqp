import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {fixture,method,u16,short,delay,cat} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['session.mbt','tools/client.mjs','tools/recovery.mjs','tools/authentication.mjs','tools/test-secret-update.mjs','tools/recovery-peer.mjs','web/engine.mjs']);
const tests=[];async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
const update=e=>e.cls===10&&e.id===70;
await test('credential update transmits exact binary longstr and UTF-8 reason while ordinary channel RPC proceeds',()=>fixture({onMethod:(e,s)=>{
 if(update(e)){setTimeout(()=>{if(!s.destroyed)s.write(method(0,10,71));},30);return true;}
}},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();const pending=c.updateSecret(Buffer.from([0,255,1]),'刷新');
 assert.equal(await ch.get('q'),null);await pending;const e=state.methods.find(update);assert.equal(e.ch,0);assert.equal(e.args.toString('hex'),'0000000300ff0106e588b7e696b0');await c.close();
}));
await test('credential replies do not emit unblocked or swallow real flow control events',()=>fixture({onMethod:(e,s)=>{
 if(update(e)){s.write(cat(method(0,10,60,short('memory')),method(0,10,71),method(0,10,61)));return true;}
}},async({open})=>{
 const c=await open();let blocked=0,unblocked=0;c.on('blocked',()=>blocked++);c.on('unblocked',()=>unblocked++);
 await c.updateSecret('fresh');assert.equal(blocked,1);assert.equal(unblocked,1);await c.close();
}));
await test('overlapping credential updates reject without disturbing the accepted request',()=>fixture({onMethod:(e,s)=>{
 if(update(e)){setTimeout(()=>{if(!s.destroyed)s.write(method(0,10,71));},25);return true;}
}},async({open,state})=>{
 const c=await open(),first=c.updateSecret('one');await assert.rejects(c.updateSecret('two'),/outstanding/);await first;await c.updateSecret('three');assert.equal(state.methods.filter(update).length,2);await c.close();
}));
await test('invalid local reason or oversized frame leaves the credential exchange usable',()=>fixture({onMethod:(e,s)=>{if(update(e)){s.write(method(0,10,71));return true;}}},async({open,state})=>{
 const c=await open();for(const reason of [3,'\ud800','a'.repeat(256)])await assert.rejects(c.updateSecret('not-logged',reason),/reason/);
 await assert.rejects(c.updateSecret(Buffer.alloc(8192)),/limit|large|size/);await c.updateSecret('valid','');assert.equal(state.methods.filter(update).length,1);await c.close();
}));
await test('missing credential acknowledgement times out the whole connection and all pending work',()=>fixture({onMethod:e=>update(e)||e.cls===60&&e.id===70},async({open})=>{
 const c=await open({timeout:80}),ch=await c.openChannel();const updatePromise=assert.rejects(c.updateSecret('fresh'),/update timeout/),get=assert.rejects(ch.get('q'));
 await Promise.all([updatePromise,get]);assert(c.closed);
}));
await test('server rejection preserves its reply code and terminates the pending credential exchange',()=>fixture({onMethod:(e,s)=>{
 if(update(e)){s.write(method(0,10,50,u16(530),short('credential refused'),u16(10),u16(70)));return true;}
}},async({open})=>{const c=await open();await assert.rejects(c.updateSecret('invalid'),error=>error.code===530);assert(c.closed);}));
await test('connection close and signal cancellation both release a pending credential update',async()=>{
 for(const mode of ['close','abort'])await fixture({onMethod:e=>update(e)},async({open})=>{
  const controller=new AbortController(),c=await open({signal:controller.signal});const pending=assert.rejects(c.updateSecret('pending'));await delay(10);
  if(mode==='close')await c.close();else controller.abort(Error('cancelled'));
  await pending;assert(c.closed);await assert.rejects(c.updateSecret('later'),/closed/);
 });
});
await test('unrequested credential acknowledgement fails closed',()=>fixture({},async({open,state})=>{
 const c=await open(),closed=once(c,'close');[...state.sockets][0].write(method(0,10,71));const [error]=await closed;assert.match(error.message,/unexpected connection method/);assert(c.closed);
}));
await test('disconnect during credential update rejects it without replay on the recovered connection',()=>fixture({onMethod:(e,s)=>{if(update(e)){s.destroy();return true;}}},async({open,state})=>{
 const c=await open({recovery:{retryDelay:5,retryJitter:0,maxRetries:2}});await c.openChannel();const recovered=once(c,'recovered',{signal:AbortSignal.timeout(3000)});
 await assert.rejects(c.updateSecret('ambiguous'));await recovered;assert.equal(state.methods.filter(update).length,1);assert.equal(c.state,'open');await c.close();
}));
await test('successful update changes only the live connection, keeping application-owned reconnect credentials',()=>fixture({onMethod:(e,s)=>{if(update(e)){s.write(method(0,10,71));return true;}}},async({open,state})=>{
 const c=await open({username:'u',password:'original',recovery:{retryDelay:5,retryJitter:0,maxRetries:2}});await c.updateSecret('replacement');
 const ready=once(c,'recovered',{signal:AbortSignal.timeout(3000)});[...state.sockets][0].destroy();await ready;
 const original=state.methods.find(e=>e.peer===1&&e.cls===10&&e.id===11),next=state.methods.find(e=>e.peer===2&&e.cls===10&&e.id===11);assert.deepEqual(next.args,original.args);await c.close();
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/secret-fixtures.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passed:tests.length,tests,sources,scope:'Independent TCP peer, exact wire bytes, RPC/flow separation, timeout/close/abort and recovery without replay. Real OAuth broker tests are separate.'},null,2)+'\n');
console.log(`${tests.length} credential update fixture groups passed`);
