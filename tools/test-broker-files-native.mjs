import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createHash,randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {cli,peerEnv} from './broker-test-process.mjs';
import {hash,chunkAt} from './receive-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const binaries={send:process.env.AMQP_RECEIVE_REFERENCE,get:process.env.AMQP_STREAM_REFERENCE},builds={};
for(const [mode,name] of [['send','receive'],['get','stream']]){
 assert(binaries[mode],`Set AMQP_${name.toUpperCase()}_REFERENCE`);builds[mode]=JSON.parse(await fs.readFile(new URL(`../evidence/${name}-reference-build.json`,import.meta.url)));
 assert.equal(digest(binaries[mode]),builds[mode].binarySha256);assert.equal(digest(new URL(`./${name}-reference.go`,import.meta.url)),builds[mode].programSha256);
}
const sources=sourceSnapshot(['tools/broker.mjs','tools/broker-files.mjs','tools/broker-output.mjs','tools/broker-output-worker.mjs','tools/broker-test-process.mjs','tools/test-broker-files-native.mjs','tools/client.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/receive-reference.go','tools/stream-reference.go','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','tools/receive-peer.mjs','tools/stream-peer.mjs','evidence/receive-reference-build.json','evidence/stream-reference-build.json','web/engine.mjs']);
const MiB=1048576,tests=[],comparisons=[];
async function native(mode,request){const child=spawn(binaries[mode],[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let out='',err='';child.stdout.on('data',b=>out+=b);child.stderr.on('data',b=>err+=b);child.stdin.on('error',()=>{});const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),45000);child.stdin.end(JSON.stringify(request));try{const [code]=await exited;assert.equal(code,0,err);return JSON.parse(out);}finally{clearTimeout(timer);}}
const folder=await fs.mkdtemp(path.join(os.tmpdir(),'amqp-cli-native-')),spools=path.join(folder,'spools');await fs.mkdir(spools);const owned=new Set();
function filename(name){const p=path.join(folder,name);owned.add(p);return p;}
async function generated(name,size){const p=filename(name),f=await fs.open(p,'wx');try{for(let offset=0;offset<size;offset+=65536)await f.write(chunkAt(offset,Math.min(65536,size-offset)));}finally{await f.close();}return p;}
async function fileHash(name){const h=createHash('sha256');for await(const b of fsSync.createReadStream(name))h.update(b);return h.digest('hex');}
async function test(name,action){await action();assert.deepEqual(await fs.readdir(spools),[]);assert(!(await fs.readdir(folder)).some(n=>n.startsWith('.moonbit-amqp-')));tests.push(name);console.log('PASS '+name);}
const metadata=record=>({bytes:record.bytes,sha256:record.sha256,contentType:record.properties['content-type'],messageId:record.properties['message-id'],correlationId:record.properties['correlation-id'],deliveryMode:record.properties['delivery-mode'],headers:{label:Buffer.from(record.properties.headers.label.hex,'hex').toString(),n:record.properties.headers.n}});
try{
 const large=await generated('中文 large.bin',12*MiB),empty=await generated('empty.bin',0);
 await withRabbit(async info=>{
  const env={...peerEnv(info.port,spools),AMQP_USER:'demo',AMQP_PASSWORD:'test-only',AMQP_TIMEOUT:'15000'},ca=filename('ca.pem');await fs.writeFile(ca,Buffer.from(info.certificate,'base64'));
  const tls={...env,AMQP_PORT:String(info.tlsPort),AMQP_TLS:'1',AMQP_ALLOW_INSECURE:'0',AMQP_CA:ca,AMQP_SERVERNAME:'localhost'};
  const admin=await connect({host:'127.0.0.1',port:info.port,username:'demo',password:'test-only',allowInsecureAuth:true,timeout:15000}),channel=await admin.openChannel(),queue='files-'+randomUUID();await channel.declareQueue(queue);
  const request={Port:info.port,Queue:queue};
  try{
   await test('12 MiB CLI file publication is received byte-exact by pinned Go',async()=>{
    const r=await cli(['publish',queue,'--file',large],{env}).done;assert.equal(r.code,0,r.stderr);const actual=JSON.parse(r.stdout),reference=await native('get',request);assert.equal(reference.found,true);assert.equal(actual.bytes,reference.bytes);assert.equal(actual.sha256,reference.sha256);assert.equal(actual.sha256,hash(12*MiB));comparisons.push({name:'file publication',matched:true,actual:{bytes:actual.bytes,sha256:actual.sha256},reference:{bytes:reference.bytes,sha256:reference.sha256}});
   });
   for(const known of [false,true])await test(`${known?'16 MiB TLS known':'3 MiB unknown'} stdin publication matches pinned Go`,async()=>{
    const size=(known?16:3)*MiB,run=cli(['publish',queue,...(known?['--size',String(size)]:[])],{env:known?tls:env,keepInput:true});
    for(let offset=0;offset<size;offset+=65536)if(!run.child.stdin.write(chunkAt(offset,65536)))await once(run.child.stdin,'drain');run.child.stdin.end();
    const r=await run.done;assert.equal(r.code,0,r.stderr);const actual=JSON.parse(r.stdout),reference=await native('get',request);assert.equal(reference.found,true);assert.equal(actual.bytes,reference.bytes);assert.equal(actual.sha256,reference.sha256);assert.equal(actual.sha256,hash(size));comparisons.push({name:known?'known stdin TLS':'spooled stdin',matched:true,actual:{bytes:actual.bytes,sha256:actual.sha256},reference:{bytes:reference.bytes,sha256:reference.sha256}});
   });
   await test('12 MiB pinned Go publication is atomically saved and acknowledged by CLI',async()=>{
    const reference=await native('send',{...request,Size:12*MiB,Mode:'send'}),target=filename('received.bin'),r=await cli(['get',queue,'--file',target],{env}).done;assert.equal(r.code,0,r.stderr);const actual=metadata(JSON.parse(r.stdout));assert.deepEqual(actual,reference);assert.equal(await fileHash(target),reference.sha256);assert.deepEqual(await native('get',request),{found:false});comparisons.push({name:'file reception',matched:true,actual,reference});
   });
   await test('16 MiB pinned Go publication reaches raw stdout over verified TLS',async()=>{
    const reference=await native('send',{...request,Port:info.tlsPort,TLS:true,Certificate:Buffer.from(info.certificate,'base64').toString(),Size:16*MiB,Mode:'send'}),r=await cli(['get',queue,'--raw'],{env:tls,raw:true}).done;assert.equal(r.code,0,r.stderr);const actual=metadata(JSON.parse(r.stderr));assert.deepEqual(actual,reference);assert.equal(r.bytes,reference.bytes);assert.equal(r.sha256,reference.sha256);assert.deepEqual(await native('get',request),{found:false});comparisons.push({name:'raw TLS reception',matched:true,actual,reference});
   });
   await test('empty file roundtrip and empty queue remain distinguishable',async()=>{
    let r=await cli(['publish',queue,'--file',empty],{env}).done;assert.equal(r.code,0,r.stderr);const target=filename('zero-output');r=await cli(['get',queue,'--file',target],{env}).done;assert.equal(r.code,0,r.stderr);assert.equal(JSON.parse(r.stdout).bytes,0);assert.equal((await fs.stat(target)).size,0);
    const absent=filename('absent-output');r=await cli(['get',queue,'--file',absent],{env}).done;assert.equal(r.code,0,r.stderr);assert.equal(JSON.parse(r.stdout),null);await assert.rejects(fs.stat(absent),{code:'ENOENT'});
    r=await cli(['get',queue,'--raw'],{env,raw:true}).done;assert.equal(r.code,2);assert.equal(r.bytes,0);assert.deepEqual(JSON.parse(r.stderr),{found:false});
   });
   await test('receive size refusal requeues the complete message and removes partial file',async()=>{
    const reference=await native('send',{...request,Size:12*MiB,Mode:'send'}),target=filename('over-limit');const r=await cli(['get',queue,'--file',target],{env:{...env,AMQP_MAX_BODY_BYTES:'1048576'}}).done;assert.equal(r.code,1,r.stderr);assert.match(r.stderr,/Body limit/);await assert.rejects(fs.stat(target),{code:'ENOENT'});const retained=await native('get',request);assert.equal(retained.found,true);assert.equal(retained.sha256,reference.sha256);
   });
   await test('existing output remains intact and queued message is not consumed',async()=>{
    const reference=await native('send',{...request,Size:4096,Mode:'send'});const r=await cli(['get',queue,'--file',large],{env}).done;assert.equal(r.code,1);assert.match(r.stderr,/already exists/);assert.equal(await fileHash(large),hash(12*MiB));assert.equal((await native('get',request)).sha256,reference.sha256);
   });
   await test('broken raw stdout exits with error and broker redelivers the whole body',async()=>{
    const reference=await native('send',{...request,Size:12*MiB,Mode:'send'});const r=await cli(['get',queue,'--raw'],{env,raw:true,onChunk:(_chunk,child)=>child.stdout.destroy()}).done;assert.equal(r.code,1,r.stderr);assert.match(r.stderr,/EPIPE|pipe|write/i);const retained=await native('get',request);assert.equal(retained.found,true);assert.equal(retained.sha256,reference.sha256);
   });
   await test('blocked raw stdout times out and broker retains the unacknowledged body',async()=>{
    const reference=await native('send',{...request,Size:12*MiB,Mode:'send'}),run=cli(['get',queue,'--raw'],{env:{...env,AMQP_TIMEOUT:'500'},raw:true,pauseOutput:true});await once(run.child,'exit');run.child.stdout.resume();const r=await run.done;assert.equal(r.code,1,r.stderr);assert.match(r.stderr,/timeout/);assert.equal((await native('get',request)).sha256,reference.sha256);
   });
   await test('broker size rejection is reported without publishing a partial message',async()=>{
    const huge=await generated('32MiB.bin',32*MiB),r=await cli(['publish',queue,'--file',huge],{env}).done;assert.equal(r.code,1,r.stderr);assert.match(r.stderr,/PRECONDITION|406|size/i);assert.deepEqual(await native('get',request),{found:false});
   });
   await test('TLS hostname refusal removes the unopened receive output',async()=>{
    const target=filename('bad-tls'),r=await cli(['get',queue,'--file',target],{env:{...tls,AMQP_SERVERNAME:'wrong.invalid'}}).done;assert.equal(r.code,1);assert.match(r.stderr,/Hostname|Altname|altnames/i);await assert.rejects(fs.stat(target),{code:'ENOENT'});
   });
  }finally{if(!channel.closed)await channel.deleteQueue(queue);admin.destroy();}
  assertSourceUnchanged(sources);for(const mode of Object.keys(binaries))assert.equal(digest(binaries[mode]),builds[mode].binarySha256);
  await fs.writeFile(new URL('../evidence/broker-files-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,platform:process.platform,passed:tests.length,tests,nativeComparisons:comparisons.length,comparisons,sources,commit:builds.send.commit,binaries:Object.fromEntries(Object.keys(builds).map(k=>[k,builds[k].binarySha256])),brokerPackages:info.packages,scope:'Actual CLI subprocesses, pinned unmodified Go receiver/publisher and real RabbitMQ; TCP/TLS, file/stdin/raw data hashes, native properties, confirms, requeue on output failure and no-overwrite filesystem behavior. No throughput or cross-platform parity claim.'},null,2)+'\n');
 });
}finally{for(const name of owned)await fs.unlink(name).catch(e=>{if(e.code!=='ENOENT')throw e;});await fs.rmdir(spools);await fs.rmdir(folder);}
console.log(`${tests.length} real broker file CLI groups passed; ${comparisons.length} native byte/property comparisons matched`);
