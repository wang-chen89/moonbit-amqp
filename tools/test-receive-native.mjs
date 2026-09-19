import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createHash,randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest as fileDigest} from './evidence-source.mjs';
const executable=process.env.AMQP_RECEIVE_REFERENCE;assert(executable,'Set AMQP_RECEIVE_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/receive-reference-build.json',import.meta.url)));assert.equal(fileDigest(executable),build.binarySha256);assert.equal(fileDigest(new URL('./receive-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['session.mbt','receive_stream.mbt','cmd/web/session.mbt','cmd/web/authentication.mbt','tools/client.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/recovery-channel.mjs','tools/recovery.mjs','tools/receive-reference.go','tools/test-receive-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/receive-reference-build.json','web/engine.mjs']);
const MiB=1048576,tests=[],comparisons=[],observations=[];
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let stdout='',stderr='';const exit=once(child,'exit'),timer=setTimeout(()=>child.kill(),45000);child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify(request));try{const [code]=await exit;assert.equal(code,0,stderr);return JSON.parse(stdout);}finally{clearTimeout(timer);if(child.exitCode===null)child.kill();}}
function* chunks(size){for(let offset=0;offset<size;offset+=65536){const b=Buffer.alloc(Math.min(65536,size-offset));for(let i=0;i<b.length;i++)b[i]=(offset+i)%251;yield b;}}
const properties={'content-type':'application/octet-stream','message-id':'large-message','correlation-id':'stream-check','delivery-mode':2,headers:{label:'中文',n:42}};
const event=(t,n)=>once(t,n,{signal:AbortSignal.timeout(20000)});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function until(check){const end=Date.now()+15000;while(!check()){if(Date.now()>end)throw Error('Broker condition timeout');await delay(5);}}
async function collect(m){const hash=createHash('sha256');let bytes=0;for await(const b of m.body){hash.update(b);bytes+=b.length;}await m.completed;return {bytes,sha256:hash.digest('hex'),contentType:m.properties['content-type'],messageId:m.properties['message-id'],correlationId:m.properties['correlation-id'],deliveryMode:m.properties['delivery-mode'],headers:{label:Buffer.from(m.properties.headers.label.hex,'hex').toString(),n:m.properties.headers.n}};}
async function test(name,fn){try{await fn();tests.push(name);console.log('PASS '+name);}catch(error){console.error('FAIL '+name+': '+error.message);throw error;}}
await withRabbit(async info=>{
 const base={host:'127.0.0.1',port:info.port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:12000,streamBodies:true,receiveHighWaterMark:65536,frameMax:8192};
 const admin=await connect(base),a=await admin.openChannel(),queue='incoming-'+randomUUID();await a.declareQueue(queue);const request={Port:info.port,Queue:queue,Mode:'send'};
 admin.on('close',error=>{if(error.message!=='Connection destroyed')console.error('ADMIN CLOSE '+error.message);});
 try{
  for(const [name,size,secure,consume] of [['12 MiB TCP get',12*MiB,false,false],['16 MiB verified TLS consumer',16*MiB,true,true]])await test(name+' matches pinned Go bytes and properties',async()=>{
   const reference=await native({...request,Size:size,...(secure?{Port:info.tlsPort,TLS:true,Certificate:Buffer.from(info.certificate,'base64').toString()}:{} )});
   const c=await connect({...base,...(secure?{port:info.tlsPort,tls:{ca:Buffer.from(info.certificate,'base64'),servername:'localhost'},allowInsecureAuth:false}:{} )}),ch=await c.openChannel();
   try{
    let resolve,reject;const got=new Promise((a,b)=>{resolve=a;reject=b;});got.catch(()=>{});
    if(consume)await ch.consume(queue,resolve);else ch.get(queue).then(resolve,reject);const m=await got;
    await until(()=>c.readStats.backpressurePauses>0);await delay(100);const held=c.readStats,initial=process.memoryUsage(),peak={rss:initial.rss,external:initial.external};const sampler=setInterval(()=>{const v=process.memoryUsage();peak.rss=Math.max(peak.rss,v.rss);peak.external=Math.max(peak.external,v.external);},10);
    let actual;try{actual=await collect(m);}finally{clearInterval(sampler);}assert.deepEqual(actual,reference);assert.equal(m.bodySize,String(size));await ch.ack(m.args['delivery-tag']);await ch.declareQueue(queue,{passive:true});assert(c.readStats.maxObservedBodyBytes<=c.readStats.bodyBufferBound);comparisons.push({name,matched:true,actual,reference});observations.push({name,held,final:c.readStats,processMemory:{initial,peak,note:'Whole Node process observation, not an RSS guarantee or upstream throughput comparison.'}});await c.close();
   }finally{c.destroy();}
  });
  await test('discard then negative acknowledgement requeues the full original body',async()=>{
   const reference=await native({...request,Size:12*MiB}),ch=await admin.openChannel(),m=await ch.get(queue);await m.body.discard();await ch.nack(m.args['delivery-tag'],{requeue:true});const again=await ch.get(queue);assert.equal(again.args.redelivered,true);assert.deepEqual(await collect(again),reference);await ch.ack(again.args['delivery-tag']);await ch.close();
  });
  await test('prefetch one withholds the next stream until explicit acknowledgement',async()=>{
   const reference=await native({...request,Size:12*MiB});await native({...request,Size:4096});const ch=await admin.openChannel(),received=[];await ch.qos(1);const tag=await ch.consume(queue,m=>received.push(m));await until(()=>received.length===1);assert.deepEqual(await collect(received[0]),reference);await delay(100);assert.equal(received.length,1);await ch.ack(received[0].args['delivery-tag']);await until(()=>received.length===2);assert.equal((await collect(received[1])).bytes,4096);await ch.ack(received[1].args['delivery-tag']);await ch.cancel(tag);await ch.close();
  });
  await test('12 MiB mandatory return matches pinned Go and permits publisher confirmation',async()=>{
   const missing='missing-'+randomUUID(),reference=await native({...request,Queue:missing,Mode:'return',Size:12*MiB}),ch=await admin.openChannel();await ch.confirmSelect();const returned=event(ch,'return'),pending=ch.publishStream('',missing,chunks(12*MiB),12*MiB,{mandatory:true,properties});pending.catch(()=>{});const [m]=await returned;const actual=await collect(m);assert.deepEqual(actual,reference);assert.equal(m.args['reply-code'],312);assert.equal((await pending).deliveryTag,1n);comparisons.push({name:'12 MiB mandatory return',matched:true,actual,reference});await ch.close();
  });
  await test('disconnect fails the old body and recovered get redelivers it with a fresh tag',async()=>{
   const reference=await native({...request,Size:12*MiB}),proxy=await proxyTo(info.port),c=await connect({...base,port:proxy.port,recovery:{maxRetries:3,retryDelay:20,retryJitter:0}});
   try{const ch=await c.openChannel(),m=await ch.get(queue);await until(()=>c.readStats.backpressurePauses>0);const failed=assert.rejects(m.completed),ready=event(c,'recovered');proxy.cut();await failed;await ready;assert.throws(()=>ch.ack(m.args['delivery-tag']),/Stale/);const again=await ch.get(queue);assert(again);assert.equal(again.args.redelivered,true);assert.deepEqual(await collect(again),reference);await ch.ack(again.args['delivery-tag']);await c.close();}finally{c.destroy();await proxy.close();}
  });
  await test('closing an unread delivery channel requeues its body and keeps sibling usable',async()=>{
   const reference=await native({...request,Size:12*MiB}),c=await connect(base),ch=await c.openChannel(),sibling=await c.openChannel();try{const m=await ch.get(queue);await until(()=>c.readStats.backpressurePauses>0);const failed=assert.rejects(m.completed);await ch.close();await failed;assert.equal(c.closed,false);const again=await sibling.get(queue);assert(again);assert.equal(again.args.redelivered,true);assert.deepEqual(await collect(again),reference);await sibling.ack(again.args['delivery-tag']);await c.close();}finally{c.destroy();}
  });
  await test('legacy buffer mode preserves the 8 MiB receiving bound',async()=>{
   await native({...request,Size:12*MiB});const c=await connect({...base,streamBodies:false}),ch=await c.openChannel();try{await assert.rejects(ch.get(queue),/body.*limit/);assert.equal(c.closed,true);}finally{c.destroy();}
  });
 }finally{if(!a.closed)await a.deleteQueue(queue);admin.destroy();}
 assertSourceUnchanged(sources);assert.equal(fileDigest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/receive-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,nativeComparisons:comparisons.length,comparisons,observations,sources,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,scope:'Actual pinned Go publications to Node streamed get/consume and Go/Node mandatory returns; QoS, discard/requeue, channel closure and connection recovery on real RabbitMQ. Legacy bounded buffer mode retained. No production/throughput parity claim.'},null,2)+'\n');
});
console.log(`${tests.length} real incoming streaming broker groups passed; ${comparisons.length} native body/property comparisons matched`);
