import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {fixture,noWaitFlag,sequence} from './nowait-peer.mjs';
import {gate} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_NOWAIT_REFERENCE;assert(executable,'Set AMQP_NOWAIT_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/nowait-reference-build.json',import.meta.url)));assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./nowait-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/nowait-reference.go','tools/test-nowait-native.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/stream-peer.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/nowait-reference-build.json','web/engine.mjs']);
async function native(request,onRecord=()=>{}){
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']}),records=[];let error='',callbackError;const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),25000);child.stdin.on('error',()=>{});child.stderr.on('data',b=>error+=b);const lines=createInterface({input:child.stdout});lines.on('line',line=>{try{const row=JSON.parse(line);records.push(row);onRecord(row);}catch(e){callbackError=e;child.kill();}});child.stdin.end(JSON.stringify(request));
 try{const [code]=await exited;if(callbackError)throw callbackError;assert.equal(code,0,error);return records.at(-1);}finally{clearTimeout(timer);}
}
const tests=[],wire=[],comparisons=[],differences=[];
await fixture({},async({opts,state})=>{
 const result=await native({Port:opts.port,Mode:'wire'});assert.equal(result.confirmWait,true);const reference=state.methods.filter(e=>noWaitFlag(e)!==undefined).map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')}));
 await fixture({},async({open,state})=>{const c=await open(),ch=await c.openChannel();await sequence(ch);const actual=state.methods.filter(e=>noWaitFlag(e)!==undefined).map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')}));assert.equal(actual.length,15);assert.deepEqual(actual,reference);for(let i=0;i<actual.length;i++)wire.push({index:i,matched:true,actual:actual[i],reference:reference[i]});await c.close();});
});
console.log('15 native no-wait method frames matched');
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(12000)});
async function nodeCase(mode,port,prefix,proxy){
 const c=await connect({host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:10000,...(mode==='recovery'?{recovery:{maxRetries:5,retryDelay:40,retryJitter:0,onTopologyError:()=>false}}:{})});
 let ch=await c.openChannel();const out={},source=prefix+'source',dest=prefix+'destination',q=prefix+'queue';
 try{
  if(mode==='missing-queue'||mode==='missing-exchange'){
   if(mode==='missing-queue')await ch.declareQueue(q,{passive:true,noWait:true});else{await ch.declareQueue(q);await ch.bindQueue(q,source,'key',{}, {noWait:true});}
   out.accepted=true;try{await ch.qos(0);assert.fail('expected rejection');}catch(error){out.code=error.code;assert(out.code);}
   const sibling=await c.openChannel();await sibling.qos(0);out.connectionOpen=!c.closed;if(mode==='missing-exchange')await sibling.deleteQueue(q);
  }else{
   const wireQueue=mode==='anonymous'?'':q;
   await ch.declareExchange(source,'direct',{noWait:true});await ch.declareExchange(dest,'direct',{noWait:true});await ch.bindExchange(dest,source,'key',{}, {noWait:true});const declared=await ch.declareQueue(wireQueue,{exclusive:true,noWait:true});await ch.bindQueue(wireQueue,dest,'key',{}, {noWait:true});await ch.confirmSelect({noWait:true});
   const publish=body=>ch.publish(source,'key',body),get=async()=>{const m=await ch.get(wireQueue,{noAck:true});assert(m);return m.body.toString();};
   if(mode==='operations'){
    await publish('routed');const passive=await ch.declareQueue(q,{passive:true,noWait:true}),observed=await ch.declareQueue(q,{passive:true});Object.assign(out,{declaredCount:declared['message-count'],passiveCount:passive['message-count'],observedCount:observed['message-count'],body:await get()});await publish('purge');out.purgeCount=(await ch.purgeQueue(q,{noWait:true}))['message-count'];out.afterPurge=(await ch.declareQueue(q,{passive:true}))['message-count'];await ch.unbindExchange(dest,source,'key',{}, {noWait:true});await ch.qos(0);await publish('unbound');out.unboundEmpty=await ch.get(q,{noAck:true})===null;out.deleteCount=(await ch.deleteQueue(q,{noWait:true}))['message-count'];
   }else if(mode==='consumer'||mode==='recovery'){
    await ch.qos(1);let got=gate();await ch.consume(q,m=>{if(m)got.resolve(m);},{consumerTag:'consumer',noWait:true});await publish('before');let m=await got.promise;await ch.ack(m.args['delivery-tag']);out.before=m.body.toString();
    if(mode==='recovery'){await ch.qos(1);got=gate();const ready=event(c,'recovered');proxy.cut();await ready;await publish('after');m=await got.promise;await ch.ack(m.args['delivery-tag']);out.after=m.body.toString();}
    await ch.cancel('consumer',{noWait:true});out.consumersAfterCancel=(await ch.declareQueue(q,{passive:true}))['consumer-count'];await publish('get-after-cancel');out.afterCancel=await get();await ch.deleteQueue(q,{noWait:true});
   }else if(mode==='anonymous'){
    out.declaredName=declared.queue;out.declaredCount=declared['message-count'];await publish('anonymous');out.body=await get();await ch.deleteQueue('',{noWait:true});
   }else if(mode==='delete-if-empty'){
    await publish('retained');out.deleteCount=(await ch.deleteQueue(q,{ifEmpty:true,noWait:true}))['message-count'];try{await ch.qos(0);assert.fail('expected rejection');}catch(error){out.code=error.code;assert(out.code);}ch=await c.openChannel();const m=await ch.get(q,{noAck:true});out.retained=Boolean(m);out.body=m?.body.toString();await ch.deleteQueue(q);
   }else if(mode==='cancel-requeue'){
    await ch.qos(1);await ch.consume(q,()=>{},{consumerTag:'consumer',noWait:true});await publish('late');await ch.cancel('consumer',{noWait:true});await ch.qos(0);await ch.close();ch=await c.openChannel();const m=await ch.get(q,{noAck:true});out.retained=Boolean(m);out.body=m?.body.toString();await ch.deleteQueue(q);
   }else throw Error('Unknown scenario');
   await ch.deleteExchange(dest,{noWait:true});await ch.deleteExchange(source,{noWait:true});await ch.qos(0);
  }
  await c.close();return out;
 }finally{c.destroy();}
}
await withRabbit(async info=>{
 {
  const reference=await native({Port:info.port,Mode:'confirm-no-wait'});assert.deepEqual(reference,{completed:false,connectionOpen:true});
  const c=await connect({host:'127.0.0.1',port:info.port,username:'demo',password:'test-only',allowInsecureAuth:true,timeout:1000});try{const ch=await c.openChannel();await ch.confirmSelect({noWait:true});const q=await ch.declareQueue('',{exclusive:true});await ch.publish('',q.queue,'confirmed');assert.equal((await ch.get(q.queue,{noAck:true})).body.toString(),'confirmed');const actual={completed:true,connectionOpen:!c.closed,publicationConfirmed:true};differences.push({name:'confirm-no-wait',matched:false,reference,actual,explanation:'Pinned Go confirmSelect.wait() returns true despite the wire Nowait bit. RabbitMQ suppresses the reply; Go did not return within a 300 ms observation and was closed explicitly. Node completes locally and receives a real publisher confirmation.'});await c.close();}finally{c.destroy();}
  console.log('PASS explicit native Confirm(true) waiting difference');
 }
 for(const mode of ['operations','consumer','anonymous','missing-queue','missing-exchange','delete-if-empty','cancel-requeue','recovery']){
  const prefix='nowait-'+randomUUID()+'-',proxy=mode==='recovery'?await proxyTo(info.port):undefined,port=proxy?.port??info.port;
  try{
   const reference=await native({Port:port,Prefix:prefix,Mode:mode},row=>{if(row.stage==='ready')proxy.cut();});const actual=await nodeCase(mode,port,prefix,proxy);assert.deepEqual(actual,reference);comparisons.push({name:mode,matched:true,actual,reference});tests.push(mode);console.log('PASS native no-wait broker '+mode);
  }finally{await proxy?.close();}
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/nowait-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,wireCases:wire.length,wire,passed:tests.length,tests,nativeComparisons:comparisons.length,comparisons,explainedDifferences:differences.length,differences,sources,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,scope:'15 independent-peer wire frames and 8 real broker scenarios match. Go uses Confirm(false) in those broker scenarios to isolate its separately reported Confirm(true) waiting difference; Node uses no-wait confirms. Named recovery, delayed errors, anonymous queue and cancellation/requeue covered. No complete API or throughput parity claim.'},null,2)+'\n');
});
console.log(`${tests.length} real no-wait broker groups passed; ${comparisons.length} native scenarios matched; ${differences.length} explained confirm difference`);
