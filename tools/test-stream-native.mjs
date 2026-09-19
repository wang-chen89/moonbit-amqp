import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createHash,randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_STREAM_REFERENCE;assert(executable,'Set AMQP_STREAM_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/stream-reference-build.json',import.meta.url)));assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./stream-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['session.mbt','publish_stream.mbt','cmd/web/publish_stream.mbt','tools/client.mjs','tools/outbound.mjs','tools/recovery-channel.mjs','tools/stream-reference.go','tools/test-stream-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/stream-reference-build.json','web/engine.mjs']);
const MiB=1048576,tests=[],comparisons=[],observations=[];
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let stdout='',stderr='';const exit=once(child,'exit'),timer=setTimeout(()=>child.kill(),45000);child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify(request));try{const [code]=await exit;assert.equal(code,0,stderr);return JSON.parse(stdout);}finally{clearTimeout(timer);if(child.exitCode===null)child.kill();}}
function* chunks(size){for(let offset=0;offset<size;offset+=65536){const b=Buffer.alloc(Math.min(65536,size-offset));for(let i=0;i<b.length;i++)b[i]=(offset+i)%251;yield b;}}
const properties={'content-type':'application/octet-stream','message-id':'large-message','correlation-id':'stream-check','delivery-mode':2,headers:{label:'中文',n:42}};
const hash=size=>{const h=createHash('sha256');for(const b of chunks(size))h.update(b);return h.digest('hex');};
async function test(name,fn){await fn();tests.push(name);console.log('PASS '+name);}
await withRabbit(async info=>{
 const base={host:'127.0.0.1',port:info.port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:15000,maxBufferedBytes:MiB,frameMax:4096};
 const admin=await connect(base),a=await admin.openChannel(),queue='stream-'+randomUUID();await a.declareQueue(queue);
 const request={Port:info.port,Queue:queue,Mode:'get'};
 try{
  for(const [name,size,secure,buffered] of [['buffered 2 MiB TCP',2*MiB,false,true],['stream 12 MiB TCP',12*MiB,false,false],['stream 16 MiB verified TLS',16*MiB,true,false]])await test(name+' matches pinned Go body and properties',async()=>{
   const c=await connect({...base,maxBufferedBytes:buffered?4*MiB:MiB,...(secure?{port:info.tlsPort,tls:{ca:Buffer.from(info.certificate,'base64'),servername:'localhost'},allowInsecureAuth:false}:{} )}),ch=await c.openChannel();
   try{
    await ch.confirmSelect();const before=process.memoryUsage(),peak={rss:before.rss,external:before.external},sampler=setInterval(()=>{const v=process.memoryUsage();peak.rss=Math.max(peak.rss,v.rss);peak.external=Math.max(peak.external,v.external);},10);
    let confirmation;try{confirmation=buffered?await ch.publish('',queue,Buffer.concat([...chunks(size)]),{properties}):await ch.publishStream('',queue,chunks(size),size,{properties});}finally{clearInterval(sampler);}
    assert.equal(confirmation.deliveryTag,1n);const node=await native(request),reference=await native({...request,Mode:'publish',Size:size,...(secure?{Port:info.tlsPort,TLS:true,Certificate:Buffer.from(info.certificate,'base64').toString()}:{} )});
    assert.deepEqual(node,reference);assert.equal(node.bytes,size);assert.equal(node.sha256,hash(size));assert.equal(node.headers.label,'中文');assert(c.writeStats.maxObservedSocketBytes<=c.maxBufferedBytes);
    comparisons.push({name,size,matched:true,node,reference});observations.push({name,limits:c.limits,writeStats:c.writeStats,processMemory:{before,peak,samplePeriodMs:10,note:'Whole Node process sample; includes bridge, GC and source buffers. Not an RSS bound or throughput comparison.'}});await c.close();
   }finally{c.destroy();}
  });
  await test('12 MiB streamed transaction commits only after commit-ok and rollback discards',async()=>{
   const c=await connect(base),ch=await c.openChannel();try{await ch.txSelect();await ch.publishStream('',queue,chunks(12*MiB),12*MiB,{properties});assert.deepEqual(await native(request),{found:false});await ch.txCommit();const message=await native(request);assert.equal(message.sha256,hash(12*MiB));await ch.publishStream('',queue,chunks(12*MiB),12*MiB);await ch.txRollback();assert.deepEqual(await native(request),{found:false});await c.close();}finally{c.destroy();}
  });
  await test('mandatory streamed unroutable body is returned before publisher confirmation',async()=>{
   const ch=await admin.openChannel();await ch.confirmSelect();const returned=once(ch,'return',{signal:AbortSignal.timeout(10000)});await ch.publishStream('','missing-'+randomUUID(),chunks(65536),65536,{mandatory:true,properties});const [m]=await returned;assert.equal(m.args['reply-code'],312);assert.equal(createHash('sha256').update(m.body).digest('hex'),hash(65536));await ch.close();
  });
  await test('receiver keeps its explicit 8 MiB assembly limit for large returned content',async()=>{
   const c=await connect(base),ch=await c.openChannel();try{await ch.confirmSelect();await assert.rejects(ch.publishStream('','missing-'+randomUUID(),chunks(12*MiB),12*MiB,{mandatory:true}),/body|limit|large/i);assert(c.closed);}finally{c.destroy();}
  });
  await test('broker 16 MiB size cap rejects 32 MiB on its channel while sibling remains usable',async()=>{
   const c=await connect(base),ch=await c.openChannel(),sibling=await c.openChannel();try{await ch.confirmSelect();await assert.rejects(ch.publishStream('',queue,chunks(32*MiB),32*MiB),e=>e.code===406);await sibling.declareQueue(queue,{passive:true});assert.equal(c.closed,false);await c.close();}finally{c.destroy();}
  });
 }finally{await a.deleteQueue(queue);admin.destroy();}
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/stream-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,nativeComparisons:comparisons.length,comparisons,observations,sources,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,scope:'Three actual Go/Node publications compared through pinned Go receiver, plus transaction/return/receive-limit broker cases. Outbound streaming only; upstream Go publish buffers the full body. No representative throughput parity claim.'},null,2)+'\n');
});
console.log(`${tests.length} real streaming broker groups passed; ${comparisons.length} native large publication comparisons matched`);
