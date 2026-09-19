import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {connect} from './client.mjs';
import {cat,frame,method,u16,short} from './stream-peer.mjs';
import {fixture,delay,gate,until,ack,header,getOk,deliver,returned,sendBody,hash,chunkAt} from './receive-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['session.mbt','receive_stream.mbt','receive_stream_test.mbt','cmd/web/session.mbt','cmd/web/authentication.mbt','tools/client.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/stream-peer.mjs','tools/receive-peer.mjs','tools/test-receive-stream.mjs','web/engine.mjs']);
const MiB=1048576,tests=[],observations=[],options={streamBodies:true,receiveHighWaterMark:32768,timeout:5000};
const event=(t,n)=>once(t,n,{signal:AbortSignal.timeout(12000)});
async function digest(message,slow=false){const h=createHash('sha256');let bytes=0;for await(const chunk of message.body){bytes+=chunk.length;h.update(chunk);if(slow)await delay(1);}await message.completed;return {bytes,sha256:h.digest('hex')};}
async function test(name,fn){await fn();tests.push(name);console.log('PASS '+name);}
function startSend(s,ch,size,opts){const promise=sendBody(s,ch,size,opts);promise.catch(()=>{});return promise;}

await test('stream mode validates options before dialing',async()=>{for(const extra of [{streamBodies:1},{receiveHighWaterMark:0},{receiveHighWaterMark:NaN}])await assert.rejects(connect({allowInsecureAuth:true,...extra}),/Invalid/);});
await test('12 MiB get exposes header early and paused consumer bounds read-ahead',async()=>{
 let produced=0,writer;
 await fixture({frameMax:4096,onMethod:(e,s)=>{if(e.cls===60&&e.id===70){writer=startSend(s,e.ch,12*MiB,{progress:n=>produced=n});return true;}}},async({open})=>{
  const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');assert.equal(m.type,'messageStart');assert.equal(m.bodySize,String(12*MiB));assert.equal(m.properties['content-type'],'application/octet-stream');assert.equal(m.body.wireComplete,false);
  await until(()=>c.readStats.backpressurePauses>0);await delay(80);const held=produced;await delay(80);assert.equal(produced,held);assert(held<12*MiB);assert(c.readStats.maxObservedBodyBytes<=c.readStats.bodyBufferBound);
  assert.deepEqual(await digest(m),{bytes:12*MiB,sha256:hash(12*MiB)});await writer;await ch.ack(m.args['delivery-tag']);await ch.declareQueue();assert.equal(c.readStats.bufferedBodyBytes,0);observations.push({name:'12 MiB held consumer',senderBytesBeforeResume:held,...c.readStats});
 });
});
await test('empty streamed get and get-empty preserve distinct results',()=>fixture({onMethod:(e,s,state)=>{if(e.cls===60&&e.id===70){if(state.emptySent)s.write(method(e.ch,60,72,short('')));else{state.emptySent=true;s.write(cat(getOk(e.ch),header(e.ch,0)));}return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');assert.deepEqual(await digest(m),{bytes:0,sha256:hash(0)});assert.equal(await ch.get('q'),null);assert.equal(c.readStats.retainedBodies,0);
}));
await test('ack nack reject and cumulative ack reject incomplete delivery locally',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch,5),header(e.ch,2),frame(3,e.ch,Buffer.from('a'))));return true;}}},async({open,state})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');
 for(const action of [()=>ch.ack(5),()=>ch.ack(0,true),()=>ch.ack(6,true),()=>ch.nack(5),()=>ch.reject(5)])assert.throws(action,/completion/);
 [...state.sockets][0].write(frame(3,ch.id,Buffer.from('b')));const bytes=[];for await(const b of m.body)bytes.push(b);await m.completed;assert.equal(Buffer.concat(bytes).toString(),'ab');await ch.ack(5);assert.equal(c.closed,false);
}));
await test('discard drains a large body and permits later acknowledgements and RPC',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){startSend(s,e.ch,12*MiB);return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');await m.body.discard();await ch.reject(m.args['delivery-tag'],false);await ch.declareQueue();assert.equal(c.readStats.bufferedBodyBytes,0);assert.equal(c.closed,false);
}));
await test('breaking iteration drains remaining bytes before iterator return completes',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){startSend(s,e.ch,2*MiB);return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');let n=0;for await(const b of m.body){n+=b.length;break;}assert(n>0&&n<2*MiB);assert.equal(m.body.wireComplete,true);await ch.ack(1);assert.equal(c.readStats.retainedBodies,0);
}));
for(const [name,wire,error] of [
 ['overrun',ch=>cat(getOk(ch),header(ch,1),frame(3,ch,Buffer.from('xx'))),/length/],
 ['duplicate header',ch=>cat(getOk(ch),header(ch,1),header(ch,1)),/duplicate/],
 ['method during body',ch=>cat(getOk(ch),header(ch,1),method(ch,50,11,short('q'),Buffer.alloc(8))),/interrupts/],
])await test(name+' fails the whole feed without exposing a successful get',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(wire(e.ch));return true;}}},async({open})=>{const c=await open(options),ch=await c.openChannel();await assert.rejects(ch.get('q'),error);assert.equal(c.closed,true);}));
await test('truncated UInt64 declared body rejects completion and current iterator',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,0xffffffffffffffffn),frame(3,e.ch,Buffer.from('part'))));setTimeout(()=>s.end(),30);return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');const done=assert.rejects(m.completed,/incomplete/);await assert.rejects(digest(m),/incomplete/);await done;assert.equal(c.closed,true);
}));
await test('missing body progress times out without allocating declared length',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,0xffffffffffffffffn)));return true;}}},async({open})=>{
 const c=await open({...options,timeout:120}),ch=await c.openChannel(),m=await ch.get('q');await assert.rejects(m.completed,/body progress timeout/);assert.equal(c.closed,true);assert.equal(c.readStats.maxObservedBodyBytes,0);
}));
await test('unread large body times out while socket is paused',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){startSend(s,e.ch,12*MiB);return true;}}},async({open})=>{
 const c=await open({...options,timeout:150}),ch=await c.openChannel(),m=await ch.get('q');await assert.rejects(m.completed,/body progress timeout/);assert(c.readStats.backpressurePauses>0);assert.equal(c.closed,true);
}));
await test('completed buffered stream remains readable after connection destruction',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,4),frame(3,e.ch,chunkAt(0,4))));return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');await m.completed;c.destroy();assert.deepEqual(await digest(m),{bytes:4,sha256:hash(4)});
}));
await test('partial channel closure rejects only its body and preserves sibling',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,20),frame(3,e.ch,Buffer.from('part'))));setTimeout(()=>s.write(method(e.ch,20,40,u16(404),short('gone'),u16(60),u16(70))),25);return true;}}},async({open})=>{
 const c=await open(options),a=await c.openChannel(),b=await c.openChannel(),m=await a.get('q');await assert.rejects(digest(m),/404/);await b.declareQueue();assert.equal(c.closed,false);assert.equal(c.readStats.activeBodies,0);
}));
await test('normal connection close releases paused input and rejects incomplete body',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,MiB),frame(3,e.ch,Buffer.alloc(65536))));return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');const failed=assert.rejects(m.completed,/closed/);await c.close();await failed;assert.equal(c.readStats.bufferedBodyBytes,0);
}));
await test('large mandatory return is streamed while publisher confirmation waits behind body',()=>fixture({onMessage:(m,s)=>{startSend(s,m.ch,12*MiB,{kind:returned}).then(()=>s.write(ack(m.ch,m.seq))).catch(()=>{});}},async({open})=>{
 const c=await open(options),ch=await c.openChannel();await ch.confirmSelect();const got=event(ch,'return'),published=ch.publish('','missing','request',{mandatory:true});published.catch(()=>{});const [m]=await got;assert.equal(m.args['reply-code'],312);assert.deepEqual(await digest(m),{bytes:12*MiB,sha256:hash(12*MiB)});assert.equal((await published).deliveryTag,1n);
}));
await test('two simultaneous consumer channels share a bounded incoming budget',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===20){s.write(method(e.ch,60,21,short('consumer')));startSend(s,e.ch,2*MiB,{kind:deliver});return true;}}},async({open})=>{
 const c=await open(options),a=await c.openChannel(),b=await c.openChannel(),first=gate(),second=gate();let p,q;
 await a.consume('q',m=>{p=digest(m,true);p.then(first.resolve,first.resolve);},{consumerTag:'consumer'});await b.consume('q',m=>{q=digest(m);q.then(second.resolve,second.resolve);},{consumerTag:'consumer'});await Promise.all([first.promise,second.promise]);assert.deepEqual(await p,{bytes:2*MiB,sha256:hash(2*MiB)});assert.deepEqual(await q,await p);await a.ack(1);await b.ack(1);assert(c.readStats.maxObservedBodyBytes<=c.readStats.bodyBufferBound);
}));
await test('recovery delivers stream headers early so large bodies cannot deadlock restoration',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===20){s.write(method(e.ch,60,21,short('consumer')));startSend(s,e.ch,e.ch===1?2*MiB:0,{kind:deliver});return true;}}},async({open,state})=>{
 const c=await open({...options,recovery:{maxRetries:3,retryDelay:10,retryJitter:0}}),a=await c.openChannel(),b=await c.openChannel();await a.declareQueue('q');const received=[],errors=[];let early=false;
 const callback=ch=>async m=>{try{if(c.state==='reconnecting')early=true;const result=await digest(m);await m.recoveryReady;await ch.ack(m.args['delivery-tag']);received.push({channel:ch.id,result});}catch(e){errors.push(e);}};
 await a.consume('q',callback(a),{consumerTag:'consumer'});await b.consume('q',callback(b),{consumerTag:'consumer'});await until(()=>received.length===2,10000);const ready=event(c,'recovered');[...state.sockets][0].destroy();await ready;await until(()=>received.length===4||errors.length>0,10000);assert.deepEqual(errors,[]);assert.equal(early,true);assert.equal(received.filter(x=>x.channel===a.id).every(x=>x.result.sha256===hash(2*MiB)),true);assert.equal(c.state,'open');
}));
await test('explicit channel close releases paused body without closing its sibling',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,MiB),frame(3,e.ch,Buffer.alloc(65536))));return true;}}},async({open})=>{
 const c=await open(options),a=await c.openChannel(),b=await c.openChannel(),m=await a.get('q');const failed=assert.rejects(m.completed,/closed/);await a.close();await failed;await b.declareQueue();assert.equal(c.closed,false);
}));
await test('overrun in a later socket read rejects an already exposed stream',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(cat(getOk(e.ch),header(e.ch,2),frame(3,e.ch,Buffer.from('a'))));setTimeout(()=>s.write(frame(3,e.ch,Buffer.from('xx'))),30);return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');assert.equal((await m.body.next()).value.toString(),'a');await assert.rejects(digest(m),/length/);assert.equal(c.closed,true);
}));
await test('consumer callback error discards its unread source and keeps connection usable',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===20){s.write(method(e.ch,60,21,short('consumer')));startSend(s,e.ch,2*MiB,{kind:deliver});return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),error=event(ch,'callbackError');await ch.consume('q',()=>{throw Error('application failed');},{consumerTag:'consumer'});assert.match((await error)[0].message,/application failed/);await until(()=>c.readStats.activeBodies===0);await ch.declareQueue();assert.equal(c.closed,false);
}));
await test('application backpressure pauses receive heartbeat deadline and resumes normally',()=>fixture({heartbeat:1,onMethod:(e,s)=>{if(e.cls===60&&e.id===70){const timer=setInterval(()=>s.write(frame(8,0,Buffer.alloc(0))),250);s.once('close',()=>clearInterval(timer));startSend(s,e.ch,2*MiB);return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q');await until(()=>c.readStats.backpressurePauses>0);await delay(1250);assert.equal(c.closed,false);assert.equal((await digest(m)).sha256,hash(2*MiB));await ch.declareQueue();assert.equal(c.closed,false);
}));
await test('reading completed body buffers does not hide absent broker heartbeats',()=>fixture({heartbeat:1,onMethod:(e,s)=>{if(e.cls===60&&e.id===70){startSend(s,e.ch,12264);return true;}}},async({open})=>{
 const c=await open(options),ch=await c.openChannel(),m=await ch.get('q'),closed=event(c,'close');await m.completed;for(let i=0;i<3;i++){await delay(350);await m.body.next();}assert.match((await closed)[0].message,/heartbeat/);
}));
await test('unobserved mandatory return is discarded for plain and recovering connections',async()=>{
 for(const recovery of [undefined,{maxRetries:3,retryDelay:10,retryJitter:0}])await fixture({onMessage:(m,s)=>{startSend(s,m.ch,2*MiB,{kind:returned}).then(()=>s.write(ack(m.ch,m.seq))).catch(()=>{});}},async({open})=>{
  const c=await open({...options,recovery}),ch=await c.openChannel();await ch.confirmSelect();await ch.publish('','missing','request',{mandatory:true});assert.equal(c.readStats.bufferedBodyBytes,0);assert.equal(c.closed,false);
 });
});
await test('one-byte body fragments hit the shared object-count watermark before the byte limit',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){startSend(s,e.ch,32768,{fragment:1});return true;}}},async({open})=>{
 const c=await open({...options,receiveHighWaterMark:MiB}),ch=await c.openChannel(),m=await ch.get('q');await until(()=>c.readStats.backpressurePauses>0);assert(c.readStats.bufferedBodyBytes<MiB);assert(c.readStats.bufferedChunks>=4096);assert(c.readStats.maxObservedChunks<=c.readStats.chunkBound);assert.deepEqual(await digest(m),{bytes:32768,sha256:hash(32768)});assert.equal(c.readStats.bufferedChunks,0);observations.push({name:'one-byte fragments',...c.readStats});
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/receive-stream-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,observations,sources,scope:'Opt-in incoming async byte streams; bounded shared body buffer and independent AMQP wire peer. Does not bound user-retained chunks, decoder/bridge temporaries or process RSS.'},null,2)+'\n');
console.log(`${tests.length} incoming streaming fixture groups passed`);
