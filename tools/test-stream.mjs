import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {once} from 'node:events';
import {fixture,method,ack,cat,u16,short,delay,gate,until} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import {waitFor,SendQueue} from './outbound.mjs';
const sources=sourceSnapshot(['session.mbt','publish_stream.mbt','publish_stream_test.mbt','cmd/web/publish_stream.mbt','tools/outbound.mjs','tools/client.mjs','tools/recovery-channel.mjs','tools/recovery.mjs','tools/stream-peer.mjs','tools/test-stream.mjs','web/engine.mjs']);
const tests=[],observations=[];const MiB=1048576;
async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
const confirmed={onMessage:(m,s)=>s.write(ack(m.ch,m.seq))};
function* chunks(size,chunkSize=65536){for(let offset=0;offset<size;offset+=chunkSize){const length=Math.min(chunkSize,size-offset),b=Buffer.alloc(length);for(let i=0;i<length;i++)b[i]=(offset+i)%251;yield b;}}
const sha=size=>{const h=createHash('sha256');for(const b of chunks(size))h.update(b);return h.digest('hex');};
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(6000)});

await test('buffered publication boundaries preserve binary content, caller snapshots and confirm order',()=>fixture({...confirmed,frameMax:4096},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();
 const sizes=[0,1,4088,4089,65536,65537],pending=[],hashes=[];
 for(const size of sizes){
  const body=Buffer.alloc(size);for(let i=0;i<size;i++)body[i]=(i*31+17)%256;
  hashes.push(createHash('sha256').update(body).digest('hex'));
  pending.push(ch.publish('','q',body,{properties:{'content-type':'application/octet-stream'}}));body.fill(0);
 }
 assert.deepEqual((await Promise.all(pending)).map(value=>value.deliveryTag),sizes.map((_,i)=>BigInt(i+1)));
 assert.deepEqual(state.messages.map(value=>value.bytes),sizes);
 assert.deepEqual(state.messages.map(value=>value.sha256),hashes);assert(state.maxFrame<=4096);
}));

await test('pre-aborted waits observe later input rejection and queue close suppresses deferred work',async()=>{
 const controller=new AbortController();controller.abort(Error('cancelled'));let called=0;
 await assert.rejects(waitFor(Promise.reject(Error('late input')),100,[controller.signal]),/cancelled/);
 const q=new SendQueue(10),p=q.run(()=>called++);q.close(Error('closed'));await assert.rejects(p,/closed/);await delay(0);assert.equal(called,0);
});
await test('12 MiB lazy binary source hashes correctly using negotiated 4096 byte frames',()=>fixture({...confirmed,frameMax:4096},async({open,state})=>{
 const c=await open({timeout:10000,maxBufferedBytes:MiB}),ch=await c.openChannel();await ch.confirmSelect();
 assert.equal((await ch.publishStream('','q',chunks(12*MiB),12*MiB,{properties:{'content-type':'application/octet-stream'}})).deliveryTag,1n);
 assert.equal(state.messages[0].bytes,12*MiB);assert.equal(state.messages[0].sha256,sha(12*MiB));assert(state.maxFrame<=4096);assert.equal(c.closed,false);observations.push({name:'12 MiB fragmented',...state.messages[0],writeStats:c.writeStats});
}));
await test('buffered publish above the previous 1 MiB limit snapshots caller bytes',()=>fixture(confirmed,async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();const b=Buffer.alloc(2*MiB,71),expected=createHash('sha256').update(b).digest('hex');const p=ch.publish('','q',b);b.fill(9);await p;assert.equal(state.messages[0].sha256,expected);
}));
await test('slow reader backpressure bounds socket buffers and producer read-ahead',()=>fixture({...confirmed,onHeader:(m,s)=>s.pause()},async({open,state})=>{
 const c=await open({timeout:10000,maxBufferedBytes:MiB}),ch=await c.openChannel();await ch.confirmSelect();let produced=0;
 const source=(function*(){for(const b of chunks(32*MiB)){produced+=b.length;yield b;}})();
 const pending=ch.publishStream('','q',source,32*MiB);pending.catch(()=>{});
 await until(()=>c.writeStats.drainWaits>0);await delay(100);const held=produced;await delay(100);assert.equal(produced,held);assert(held<32*MiB);assert(c.writeStats.maxObservedSocketBytes<=MiB);
 [...state.sockets][0].resume();await pending;assert.equal(state.messages[0].sha256,sha(32*MiB));observations.push({name:'32 MiB paused receiver',producerBytesBeforeResume:held,totalBytes:32*MiB,writeStats:c.writeStats});
}));
await test('same-channel body, ack, buffered publication and RPC retain call order',()=>fixture(confirmed,async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();const release=gate(),entered=gate();
 const p=ch.publishStream('','q',(async function*(){yield Buffer.from('a');entered.resolve();await release.promise;yield Buffer.from('b');})(),2);
 await entered.promise;const a=ch.ack(5),b=ch.publish('','q','next'),rpc=ch.declareQueue();await delay(30);assert.equal(state.messages.length,0);release.resolve();await Promise.all([p,a,b,rpc]);
 const tail=state.events.filter(e=>e.ch===ch.id&&((e.kind===1&&((e.cls===60&&[40,80].includes(e.id))||e.cls===50))||e.kind==='complete')).map(e=>e.kind==='complete'?'body':`${e.cls}.${e.id}`);
 assert.deepEqual(tail,['60.40','body','60.80','60.40','body','50.10']);
}));
await test('waiting source does not block another channel and confirm timeout begins after body',()=>fixture(confirmed,async({open,state})=>{
 const c=await open({timeout:120}),a=await c.openChannel(),b=await c.openChannel();await a.confirmSelect();await b.confirmSelect();
 const p=a.publishStream('','q',(async function*(){for(let i=0;i<6;i++){await delay(50);yield Buffer.from('x');}})(),6);
 assert.equal((await b.publish('','q','fast')).deliveryTag,1n);await p;assert.equal(state.messages[0].ch,b.id);assert.equal(c.closed,false);
}));
await test('invalid metadata and sizes never consume a confirm sequence or close connection',()=>fixture(confirmed,async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();let pulled=0;const source={*[Symbol.iterator](){pulled++;yield Buffer.from('x');}};
 for(const size of [-1,1.5,Number.MAX_SAFE_INTEGER+1,1n<<64n])await assert.rejects(ch.publishStream('','q',source,size),/size/);
 await assert.rejects(ch.publishStream('','q',source,1,{properties:{unknown:true}}),/property|unknown/i);
 assert.equal(pulled,0);await ch.publishStream('','q',[],0);assert.equal((await ch.publish('','q','ok')).deliveryTag,2n);assert.equal(state.messages.length,2);
}));
for(const [name,source,size,pattern] of [
 ['short source',[Buffer.from('a')],2,/before declared/],['long source',[Buffer.from('abc')],2,/exceeds declared/],
 ['non-byte chunk',['a'],1,/byte chunks/],['source exception',{*[Symbol.iterator](){throw Error('source failed');}},1,/source failed/],
 ['source progress timeout',{[Symbol.asyncIterator](){return {next:()=>new Promise(()=>{}),return:()=>({done:true})};}},1,/progress timeout/],
])await test(name+' rejects and closes incomplete connection',()=>fixture({},async({open})=>{const c=await open({timeout:100}),ch=await c.openChannel();await assert.rejects(ch.publishStream('','q',source,size),pattern);assert.equal(c.closed,true);}));
await test('queued abort never opens its source and leaves later confirmation sequence intact',()=>fixture(confirmed,async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();const hold=gate(),entered=gate(),controller=new AbortController();let opened=0;
 const first=ch.publishStream('','q',(async function*(){entered.resolve();await hold.promise;yield Buffer.from('a');})(),1);await entered.promise;
 const next=ch.publishStream('','q',{*[Symbol.iterator](){opened++;yield Buffer.from('b');}},1,{signal:controller.signal});controller.abort(Error('queued cancel'));await assert.rejects(next,/queued cancel/);hold.resolve();await first;assert.equal(opened,0);assert.equal((await ch.publish('','q','last')).deliveryTag,2n);assert.equal(state.messages.length,2);
}));
await test('abort after header rejects queued operations and calls iterator return',()=>fixture({},async({open})=>{
 const c=await open(),ch=await c.openChannel(),controller=new AbortController(),entered=gate();let returned=0;
 const source={[Symbol.asyncIterator](){return {next(){entered.resolve();return new Promise(()=>{});},return(){returned++;return {done:true};}};}};
 const p=ch.publishStream('','q',source,10,{signal:controller.signal});p.catch(()=>{});await entered.promise;const queued=ch.declareQueue();queued.catch(()=>{});controller.abort(Error('active cancel'));await assert.rejects(p,/active cancel/);await assert.rejects(queued,/active cancel/);await until(()=>returned===1);assert(c.closed);
}));
await test('per-channel buffered queue cap rejects without sequence gaps',()=>fixture(confirmed,async({open})=>{
 const c=await open({maxBufferedBytes:MiB}),ch=await c.openChannel();await ch.confirmSelect();const hold=gate(),entered=gate();
 const p=ch.publishStream('','q',(async function*(){entered.resolve();await hold.promise;yield Buffer.from('x');})(),1);await entered.promise;
 const next=ch.publish('','q',Buffer.alloc(MiB));await assert.rejects(ch.publish('','q',Buffer.from('overflow')),/queue limit/);hold.resolve();assert.deepEqual((await Promise.all([p,next])).map(x=>x.deliveryTag),[1n,2n]);assert.equal((await ch.publish('','q','last')).deliveryTag,3n);
}));
await test('flow reply and server consumer cancellation wait behind the current body',()=>fixture({...confirmed,onHeader:(m,s)=>{if(m.size===2n)s.write(cat(method(m.ch,20,20,Buffer.from([0])),method(m.ch,60,30,short('consumer'),Buffer.from([0]))));}},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.consume('q',()=>{},{consumerTag:'consumer'});await ch.confirmSelect();
 await ch.publishStream('','q',(async function*(){yield Buffer.from('a');await delay(40);yield Buffer.from('b');})(),2);
 await until(()=>state.events.some(e=>e.cls===60&&e.id===31));assert.equal(c.closed,false);await assert.rejects(ch.publish('','q','blocked'),/blocked/);
 const flowed=event(ch,'flow');[...state.sockets][0].write(method(ch.id,20,20,Buffer.from([1])));await flowed;await ch.publish('','q','resumed');
}));
await test('broker channel close during source wait preserves healthy sibling',()=>fixture({onHeader:(m,s)=>s.write(method(m.ch,20,40,u16(404),short('gone'),u16(60),u16(40)))},async({open,state})=>{
 const c=await open(),a=await c.openChannel(),b=await c.openChannel();let returned=0;const source={[Symbol.asyncIterator](){return {next:()=>new Promise(()=>{}),return:()=>{returned++;return {done:true};}};}};
 await assert.rejects(a.publishStream('','q',source,10),/404/);await b.declareQueue();await until(()=>returned===1&&state.events.some(e=>e.cls===20&&e.id===41));assert.equal(c.closed,false);
}));
await test('interrupted recoverable stream is rejected once and never replayed',()=>fixture({...confirmed,onHeader:(m,s)=>{if(s.peer===1)s.destroy();}},async({open,state})=>{
 const c=await open({recovery:{maxRetries:3,retryDelay:10,retryJitter:0}}),ch=await c.openChannel();await ch.confirmSelect();let opened=0;
 const source={[Symbol.asyncIterator](){opened++;return {next:()=>new Promise(()=>{}),return:()=>({done:true})};}};
 const ready=event(c,'recovered');await assert.rejects(ch.publishStream('','q',source,10));await ready;
 await ch.publishStream('','q',chunks(2*MiB),2*MiB);assert.equal(opened,1);assert.equal(state.messages.length,1);assert.equal(state.messages[0].peer,2);
}));
await test('graceful connection close drains prior publications and fire-and-forget acknowledgements',()=>fixture(confirmed,async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();const p=ch.publishStream('','q',(async function*(){yield Buffer.from('a');await delay(40);yield Buffer.from('b');})(),2);ch.ack(7);await c.close();await p;
 assert.equal(state.messages.length,1);const methods=state.events.filter(e=>e.kind===1);assert(methods.findIndex(e=>e.cls===60&&e.id===80)<methods.findIndex(e=>e.cls===10&&e.id===50));
}));
await test('stalled socket drain times out and closes the partial connection',()=>fixture({onHeader:(m,s)=>s.pause()},async({open})=>{
 const c=await open({timeout:150,maxBufferedBytes:MiB}),ch=await c.openChannel();await assert.rejects(ch.publishStream('','q',chunks(32*MiB),32*MiB),/progress timeout/);assert(c.closed);assert(c.writeStats.drainWaits>0);
}));
await test('broker closure cancels queued channel work before its numeric id is reused',()=>fixture({...confirmed,onHeader:(m,s)=>{if(m.size===99n)s.write(method(m.ch,20,40,u16(404),short('gone'),u16(60),u16(40)));}},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();const p=ch.publishStream('','q',{[Symbol.asyncIterator](){return {next:()=>new Promise(()=>{}),return:()=>({done:true})};}},99);p.catch(()=>{});const q=ch.declareQueue();q.catch(()=>{});const a=ch.ack(8);a.catch(()=>{});
 await assert.rejects(p,/404/);await assert.rejects(q,/404/);await assert.rejects(a,/404/);const next=await c.openChannel();assert.equal(next.id,ch.id);await next.confirmSelect();await next.publish('','q','good');assert.equal(state.messages.length,1);assert.equal(c.closed,false);
}));
await test('bounded operation queue allows graceful draining when at capacity',async()=>{
 const q=new SendQueue(1,2),hold=gate();const a=q.run(()=>hold.promise),b=q.run(()=>42);await assert.rejects(q.run(()=>0),/queue limit/);const idle=q.idle();hold.resolve();assert.deepEqual(await Promise.all([a,b]),[undefined,42]);await idle;assert.equal(q.bufferedBytes,0);
});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/stream-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,observations,sources,scope:'Independent wire fixtures; outbound streaming only. Source-owned chunk storage excluded from sender buffer bound.'},null,2)+'\n');
console.log(`${tests.length} streaming fixture groups passed`);
