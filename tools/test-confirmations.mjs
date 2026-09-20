import fs from 'node:fs';
import assert from 'node:assert/strict';
import {once,getEventListeners,setMaxListeners} from 'node:events';
import {fixture,method,ack,cat,u16,short,delay} from './channel-options-peer.mjs';
import {gate,until} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/channel-options-peer.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/stream-peer.mjs','tools/test-confirmations.mjs','web/engine.mjs']);
const tests=[];
async function test(name,fn){const timer=setTimeout(()=>{throw Error('Confirmation fixture watchdog: '+name);},20000);try{await fn();tests.push(name);console.log('PASS '+name);}finally{clearTimeout(timer);}}
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(8000)}),socket=state=>[...state.sockets][0];
const recovery={recovery:{maxRetries:3,retryDelay:5,retryJitter:0}};
async function confirmed(open,options){const c=await open(options),ch=await c.openChannel();await ch.confirmSelect();return {c,ch};}
const publish=(ch,body='x')=>ch.publishWithDeferredConfirm('','q',body);
const listen=ch=>{const rows=[];ch.on('confirm',row=>rows.push(row));return rows;};

await test('normal and transaction publications return null without allocating confirm sequence',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel(),rows=listen(ch);assert.equal(ch.nextPublishSeqNo,1n);
 assert.equal(await publish(ch),null);await ch.txSelect();assert.equal(await ch.publishStreamWithDeferredConfirm('','q',[Buffer.from('x')],1),null);await ch.txCommit();await ch.qos(0);
 assert.equal(state.messages.length,2);assert.equal(ch.nextPublishSeqNo,1n);assert.deepEqual(rows,[]);await c.close();
}));
await test('individual handles settle out of order while events and split notifications stay ordered',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),rows=listen(ch),yes=[],no=[];ch.on('ack',tag=>yes.push(tag));ch.on('nack',tag=>no.push(tag));
 const handles=await Promise.all([publish(ch,'a'),publish(ch,'b'),publish(ch,'c')]);assert.deepEqual(handles.map(h=>h.deliveryTag),[1n,2n,3n]);assert.equal(ch.nextPublishSeqNo,4n);
 for(const h of handles){assert(Object.isFrozen(h));assert.equal(h.completed,false);assert.equal(h.acked,false);assert.equal(h.generation,0);assert.equal(h.error,undefined);}
 socket(state).write(ack(ch.id,3));assert.equal(await handles[2].wait(),true);assert.equal(await handles[2].done,undefined);assert.deepEqual(rows,[]);assert.equal(handles[0].completed,false);
 socket(state).write(cat(ack(ch.id,1),ack(ch.id,2,false,true)));assert.deepEqual(await Promise.all(handles.map(h=>h.wait())),[true,false,true]);await until(()=>rows.length===3);
 assert.deepEqual(rows.map(r=>[r.deliveryTag,r.ack]),[[1n,true],[2n,false],[3n,true]]);assert.deepEqual(yes,[1n,3n]);assert.deepEqual(no,[2n]);assert.equal(handles[1].error,undefined);assert(rows.every(Object.isFrozen));await c.close();
}));
for(const negative of [false,true])await test('cumulative '+(negative?'nack':'ack')+' completes each publication exactly once',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),rows=listen(ch),handles=await Promise.all([publish(ch),publish(ch),publish(ch)]);
 socket(state).write(ack(ch.id,2,true,negative));assert.deepEqual(await Promise.all(handles.slice(0,2).map(h=>h.wait())),[!negative,!negative]);assert.equal(handles[2].completed,false);
 socket(state).write(ack(ch.id,3));assert.equal(await handles[2].wait(),true);assert.deepEqual(rows.map(r=>[r.deliveryTag,r.ack]),[[1n,!negative],[2n,!negative],[3n,true]]);await c.close();
}));
await test('zero-tag multiple confirmation covers all outstanding handles',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),rows=listen(ch),handles=await Promise.all([publish(ch),publish(ch)]);socket(state).write(ack(ch.id,0,true));assert.deepEqual(await Promise.all(handles.map(h=>h.wait())),[true,true]);assert.deepEqual(rows.map(r=>r.deliveryTag),[1n,2n]);await c.close();
}));
await test('wait cancellation and timeout release only their own listeners and preserve confirmation',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),h=await publish(ch),abort=new AbortController(),reason=Error('local wait cancelled');const wait=h.wait({signal:abort.signal}),other=h.wait();
 assert.equal(getEventListeners(abort.signal,'abort').length,1);abort.abort(reason);await assert.rejects(wait,e=>e===reason);assert.equal(getEventListeners(abort.signal,'abort').length,0);
 await assert.rejects(h.wait({timeout:5}),/wait timeout/);assert.equal(c.closed,false);assert.equal(h.completed,false);
 for(const options of [{signal:{}},{timeout:0},{timeout:1.5},{timeout:2147483648}])await assert.rejects(h.wait(options),TypeError);
 const early=AbortSignal.abort('already');await assert.rejects(h.wait({signal:early}),e=>e.cause==='already');socket(state).write(ack(ch.id,1));assert.equal(await other,true);assert.equal(await h.wait(),true);assert.equal(h.acked,true);await c.close();
}));
await test('waiter limit is bounded and cancelled waiters immediately release capacity',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),h=await publish(ch),abort=new AbortController();setMaxListeners(0,abort.signal);
 const waits=Array.from({length:1024},()=>h.wait({signal:abort.signal}));const settled=Promise.allSettled(waits);await assert.rejects(h.wait(),/waiter limit/);abort.abort();assert((await settled).every(r=>r.status==='rejected'));assert.equal(getEventListeners(abort.signal,'abort').length,0);
 const next=h.wait();socket(state).write(ack(ch.id,1));assert.equal(await next,true);await c.close();
}));
await test('broker confirm timeout settles handles false and retains the connection failure reason',()=>fixture({},async({open})=>{
 const {c,ch}=await confirmed(open,{timeout:70}),h=await publish(ch),closed=event(c,'close');assert.equal(await h.wait(),false);await closed;assert.equal(h.completed,true);assert.equal(h.acked,false);assert.match(h.error.message,/confirm timeout/);assert.equal(c.closed,true);
}));
await test('channel close completes pending handles without fabricating broker nack events',()=>fixture({},async({open})=>{
 const {c,ch}=await confirmed(open),sibling=await c.openChannel(),rows=listen(ch),h=await publish(ch);await ch.close();assert.equal(await h.wait(),false);assert.equal(h.error.code,200);assert.deepEqual(rows,[]);await sibling.qos(0);assert.equal(c.closed,false);await c.close();
}));
await test('connection destroy preserves acknowledged results and fails only unresolved handles',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),first=await publish(ch),second=await publish(ch),rows=listen(ch);socket(state).write(ack(ch.id,2));assert.equal(await second.wait(),true);const failure=Error('test transport lost');c.destroy(failure);
 assert.equal(await first.wait(),false);assert.equal(first.error,failure);assert.equal(await second.wait(),true);assert.equal(second.error,undefined);assert.deepEqual(rows,[]);
}));
for(const invalid of ['future','duplicate'])await test(invalid+' confirmation fails closed without settling unrelated handle as acknowledged',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),a=await publish(ch),b=await publish(ch),rows=listen(ch);
 if(invalid==='duplicate'){socket(state).write(ack(ch.id,1));assert.equal(await a.wait(),true);}
 const closed=event(c,'close');socket(state).write(ack(ch.id,invalid==='future'?99:1));await closed;assert.equal(await b.wait(),false);assert.match(b.error.message,/confirmation/);assert.equal(rows.length,invalid==='future'?0:1);
}));
await test('throwing and rejected confirmation observers cannot corrupt protocol or other observers',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),rows=listen(ch),errors=[];ch.on('callbackError',e=>errors.push(e.message));ch.once('confirm',()=>{throw Error('observer throw');});ch.once('ack',async()=>{throw Error('observer reject');});let onceCount=0;ch.once('confirm',()=>onceCount++);
 const a=await publish(ch);socket(state).write(ack(ch.id,1));assert.equal(await a.wait(),true);await until(()=>errors.length===2);const b=await publish(ch);socket(state).write(ack(ch.id,2));assert.equal(await b.wait(),true);assert.equal(onceCount,1);assert.equal(rows.length,2);assert.equal(c.closed,false);await c.close();
}));
await test('local failures and pre-aborted publication do not consume sequence numbers',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open);await assert.rejects(publish(ch,{}),TypeError);await assert.rejects(ch.publishWithDeferredConfirm('','q','x',{signal:AbortSignal.abort()}));
 for(let i=0;i<1025;i++)await assert.rejects(ch.publishWithDeferredConfirm('','q','x',{signal:{}}),TypeError);
 await assert.rejects(ch.publishWithDeferredConfirm('','q','x',{properties:{headers:{bad:{$type:'int64'}}}}),/missing field/);assert.equal(ch.nextPublishSeqNo,1n);assert.equal(state.messages.length,0);
 const h=await publish(ch);assert.equal(h.deliveryTag,1n);socket(state).write(ack(ch.id,1));assert.equal(await h.wait(),true);await c.close();
}));
await test('streamed deferred publication returns its handle only after the source finishes',()=>{
 const pause=gate();let reached=false;return fixture({onMessage:(m,s)=>s.write(ack(m.ch,1))},async({open})=>{
  const {c,ch}=await confirmed(open);async function* source(){yield Buffer.from('one');reached=true;await pause.promise;yield Buffer.from('two');}
  let returned=false;const result=ch.publishStreamWithDeferredConfirm('','q',source(),6).then(h=>{returned=true;return h;});await until(()=>reached);assert.equal(ch.nextPublishSeqNo,2n);assert.equal(returned,false);pause.resolve();const h=await result;assert.equal(h.deliveryTag,1n);assert.equal(await h.wait(),true);await c.close();
 });
});
await test('nack is a false deferred result while ordinary publication still rejects',()=>fixture({onMessage:(m,s,state)=>s.write(ack(m.ch,state.messages.length,false,true))},async({open})=>{
 const {c,ch}=await confirmed(open),h=await ch.publishStreamWithDeferredConfirm('','q',[Buffer.from('x')],1);assert.equal(await h.wait(),false);assert.equal(h.error,undefined);await assert.rejects(ch.publish('','q','x'),/nack/);assert.equal(c.closed,false);await c.close();
}));
await test('stream source failure rejects the send and closes the connection',()=>fixture({},async({open})=>{
 const {c,ch}=await confirmed(open);async function* broken(){yield Buffer.from('x');throw Error('source failed');}
 await assert.rejects(ch.publishStreamWithDeferredConfirm('','q',broken(),2),/source failed/);assert.equal(c.closed,true);
}));
await test('normal connection close drains deferred confirmations before shutdown',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open),h=await publish(ch);let closed=false;const closing=c.close().then(()=>closed=true);await delay(15);assert.equal(closed,false);assert(!state.methods.some(e=>e.cls===10&&e.id===50));socket(state).write(ack(ch.id,1));await closing;assert.equal(await h.wait(),true);
}));
await test('unsequenced event buffer and outstanding handles share bounded publication capacity',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open,{timeout:10000}),handles=await Promise.all(Array.from({length:1024},()=>publish(ch)));await until(()=>state.messages.length===1024);await assert.rejects(publish(ch),/publish limit/);
 socket(state).write(cat(...handles.slice(1).map(h=>ack(ch.id,h.deliveryTag))));await Promise.all(handles.slice(1).map(h=>h.wait()));await delay(0);await assert.rejects(publish(ch),/publish limit/);
 socket(state).write(ack(ch.id,1));await handles[0].wait();await delay(0);const next=await publish(ch);assert.equal(next.deliveryTag,1025n);socket(state).write(ack(ch.id,1025));assert.equal(await next.wait(),true);await c.close();
}));
await test('connection recovery preserves observers, closes old handles and resets tagged generations',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open,recovery),rows=listen(ch),a=await publish(ch),b=await publish(ch);socket(state).write(ack(ch._raw.id,2));assert.equal(await b.wait(),true);assert.equal(a.generation,1);
 const ready=event(c,'recovered');socket(state).destroy();assert.equal(await a.wait(),false);await ready;assert.equal(ch.nextPublishSeqNo,1n);assert.equal(rows.length,0);const next=await publish(ch);assert.equal(next.generation,2);socket(state).write(ack(ch._raw.id,1));assert.equal(await next.wait(),true);assert.deepEqual(rows.map(r=>[r.deliveryTag,r.generation]),[[1n,2]]);assert.equal(b.acked,true);await c.close();
}));
await test('single-channel recovery resets its confirms while healthy sibling sequence survives',()=>fixture({},async({open,state})=>{
 const {c,ch}=await confirmed(open,recovery),sibling=await c.openChannel();await sibling.confirmSelect();const a=await publish(ch),b=await publish(sibling),rows=listen(ch),otherRows=listen(sibling),ready=event(ch,'recovered');
 socket(state).write(method(ch._raw.id,20,40,u16(404),short('missing'),u16(60),u16(40)));assert.equal(await a.wait(),false);await ready;assert.equal(ch.nextPublishSeqNo,1n);assert.equal(sibling.nextPublishSeqNo,2n);socket(state).write(ack(sibling._raw.id,1));assert.equal(await b.wait(),true);
 const next=await publish(ch);socket(state).write(ack(ch._raw.id,1));assert.equal(await next.wait(),true);assert.equal(next.generation,2);assert.equal(otherRows[0].generation,1);assert.equal(rows[0].generation,2);assert.equal(c.state,'open');await c.close();
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/confirmations-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Independent peer verifies deferred send/result separation, ordered notifications, cumulative and invalid confirmations, local wait cancellation/limits, shutdown, streaming, publication capacity and per-generation recovery. Real broker and native reference comparisons are separate.'},null,2)+'\n');
console.log(`${tests.length} publisher confirmation fixture groups passed`);
