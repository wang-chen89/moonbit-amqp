import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {fixture,method,delay} from './channel-options-peer.mjs';
import {gate,until} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_CONSUMER_CANCEL_REFERENCE;assert(executable,'Set AMQP_CONSUMER_CANCEL_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/consumer-cancel-reference-build.json',import.meta.url)));assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./consumer-cancel-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/consumer-cancel-reference.go','tools/test-consumer-cancel-native.mjs','tools/channel-options-peer.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/stream-peer.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/consumer-cancel-reference-build.json','web/engine.mjs']);
async function native(request,onRecord=()=>{},onStart){
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']}),records=[];let error='',callbackError;const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),25000);child.stdin.on('error',()=>{});child.stderr.on('data',b=>error+=b);const lines=createInterface({input:child.stdout});lines.on('line',line=>{try{const row=JSON.parse(line);records.push(row);onRecord(row);}catch(e){callbackError=e;child.kill();}});
 if(onStart){onStart(value=>child.stdin.write(JSON.stringify(value)+'\n'));child.stdin.write(JSON.stringify(request)+'\n');}else child.stdin.end(JSON.stringify(request));
 try{const [code]=await exited;if(callbackError)throw callbackError;assert.equal(code,0,error);return records.at(-1);}finally{clearTimeout(timer);}
}
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(12000)}),wire=[],wireScenarios=[],tests=[],comparisons=[],differences=[];
const selected=state=>state.methods.filter(e=>e.cls===60&&[10,20,30].includes(e.id)).map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')}));
for(const mode of ['wire','wire-nowait']){
 let held,control;
 await fixture({onMethod:(e,s)=>{if(mode==='wire-busy'&&e.cls===60&&e.id===10&&e.args.readUInt16BE(4)===1){held={e,s};control({Cancel:true});return true;}}},async({opts,state})=>{
  const reference=await native({Port:opts.port,Mode:mode},row=>{if(row.stage==='cancelled'){assert(held);assert(!state.methods.some(e=>e.cls===60&&e.id===30));held.s.write(method(held.e.ch,60,11));}},mode==='wire-busy'?send=>control=send:undefined),referenceWire=selected(state);
  let nodeHeld;
  await fixture({onMethod:(e,s)=>{if(mode==='wire-busy'&&e.cls===60&&e.id===10&&e.args.readUInt16BE(4)===1){nodeHeld={e,s};return true;}}},async({open,state})=>{
   const c=await open(),ch=await c.openChannel(),abort=new AbortController();await ch.consume('q',()=>{},{consumerTag:'consumer',signal:abort.signal,noWait:mode==='wire-nowait'});const cancelled=event(ch,'cancel');
   if(mode==='wire-busy'){const rpc=ch.qos(1);await until(()=>nodeHeld);abort.abort();assert(!state.methods.some(e=>e.cls===60&&e.id===30));nodeHeld.s.write(method(nodeHeld.e.ch,60,11));await rpc;}else abort.abort();await cancelled;await ch.qos(0);const actual={cancelled:true,connectionOpen:!c.closed},actualWire=selected(state);assert.deepEqual(actual,reference);assert.deepEqual(actualWire,referenceWire);actualWire.forEach((row,i)=>wire.push({scenario:mode,index:i,matched:true,actual:row,reference:referenceWire[i]}));wireScenarios.push({mode,matched:true,actual,reference});await c.close();
  });
 });
}console.log(`${wire.length} native consumer cancellation method frames matched across 2 RPC sequences`);
// Observe only scheduling at a withheld reply boundary, not a full Go RPC
// outcome: two concurrent Go call() waiters share the same reply channel.
let referenceBoundary;
await fixture({onMethod:(e,s)=>{
 if(e.cls===60&&e.id===10&&e.args.readUInt16BE(4)===1){referenceBoundary.send({Cancel:true});return true;}
 if(e.cls===60&&e.id===30){referenceBoundary.send({Finish:true});return true;}
}},async({opts,state})=>{
 referenceBoundary={};
 referenceBoundary.result=await native({Port:opts.port,Mode:'wire-busy'},()=>{},send=>referenceBoundary.send=send);
 referenceBoundary.methods=selected(state);assert.equal(referenceBoundary.result.cancelBeforeQosReply,true);
});
await fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===10&&e.args.readUInt16BE(4)===1){referenceBoundary.held={e,s};return true;}}},async({open,state})=>{
 const c=await open(),ch=await c.openChannel(),abort=new AbortController();await ch.consume('q',()=>{},{consumerTag:'consumer',signal:abort.signal});
 const rpc=ch.qos(1);await until(()=>referenceBoundary.held);const cancelled=event(ch,'cancel');abort.abort();await delay(30);
 assert(!state.methods.some(e=>e.cls===60&&e.id===30));const {e,s}=referenceBoundary.held;s.write(method(e.ch,60,11));await rpc;await cancelled;
 differences.push({name:'busy-rpc-scheduling',matched:false,actual:{cancelBeforeQosReply:false,completedAfterReply:true},reference:referenceBoundary.result,referenceMethods:referenceBoundary.methods,explanation:'At a withheld qos-ok boundary Go sends context-triggered basic.cancel concurrently; Node queues automatic cancellation until the current RPC reply. The Go probe ends at the observed wire boundary, without asserting success or failure of concurrent Go RPC replies.'});await c.close();
});
async function nodeCase(mode,port,prefix,proxy){
 const recovering=['cancel-before-recovery','recovery-after','offline-cancel'].includes(mode),c=await connect({host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:10000,...(recovering?{recovery:{maxRetries:8,retryDelay:40,retryJitter:0}}:{})});let ch=await c.openChannel();const abort=new AbortController(),q=prefix+'q',out={};
 const subscribe=(channel,queue,tag,signal,noWait=false)=>{const got=gate(),ended=gate(),registered=channel.consume(queue,m=>m?got.resolve(m):ended.resolve(),{consumerTag:tag,signal,noWait});registered.catch(()=>{});return {got:got.promise,ended:ended.promise,registered};};
 const inspect=async()=> (await ch.declareQueue(q,{passive:true}))['consumer-count'];
 const publish=body=>ch.publish('',q,body),get=async()=>{const m=await ch.get(q,{noAck:true});assert(m);return m;};
 try{
  await ch.declareQueue(q,{exclusive:true,autoDelete:mode==='auto-delete'});
  if(mode==='pre-aborted'){abort.abort();await assert.rejects(ch.consume(q,()=>{},{consumerTag:'consumer',signal:abort.signal}));Object.assign(out,{rejected:true,consumers:await inspect(),connectionOpen:!c.closed});}
  else if(mode==='shared'){const first=subscribe(ch,q,'first',abort.signal);await first.registered;const second=subscribe(ch,q,'second',abort.signal);await second.registered;abort.abort();await Promise.all([first.ended,second.ended]);Object.assign(out,{consumers:await inspect(),connectionOpen:!c.closed});}
  else if(mode==='siblings'){const sibling=await c.openChannel(),other=prefix+'other';await sibling.declareQueue(other,{exclusive:true});const first=subscribe(ch,q,'consumer',abort.signal);await first.registered;const second=subscribe(sibling,other,'consumer');await second.registered;abort.abort();await first.ended;await ch.publish('',other,'sibling');const m=await second.got;await sibling.ack(m.args['delivery-tag']);Object.assign(out,{body:m.body.toString(),consumers:await inspect(),siblingConsumers:(await sibling.declareQueue(other,{passive:true}))['consumer-count']});}
  else{
   await ch.qos(1);const sub=subscribe(ch,q,'consumer',abort.signal,mode==='no-wait');await sub.registered;
   if(mode==='manual-reuse'){await ch.cancel('consumer');let newClosed=false;await ch.consume(q,m=>{if(!m)newClosed=true;},{consumerTag:'consumer'});abort.abort();await ch.qos(0);Object.assign(out,{consumers:await inspect(),newClosed});}
   else if(mode==='unacked'){await publish('before');await sub.got;abort.abort();await sub.ended;out.emptyBeforeChannelClose=await ch.get(q,{noAck:true})===null;await ch.close();ch=await c.openChannel();const m=await get();Object.assign(out,{after:m.body.toString(),redelivered:m.args.redelivered});}
   else if(mode==='auto-delete'){abort.abort();await sub.ended;const probe=await c.openChannel();try{await probe.declareQueue(q,{passive:true});assert.fail('expected missing queue');}catch(error){assert(error.code);out.queueCode=error.code;}out.connectionOpen=!c.closed;}
   else if(recovering){
    if(mode==='cancel-before-recovery'){abort.abort();await sub.ended;}
    await ch.qos(1);const ready=event(c,'recovered');
    if(mode==='offline-cancel'){const lost=event(c,'stateChange');proxy.blocked=true;proxy.cut();await lost;abort.abort();await sub.ended;proxy.blocked=false;}else proxy.cut();
    await ready;if(mode==='recovery-after'){abort.abort();await sub.ended;}out.consumers=await inspect();await publish('after-cancel');const m=await get();if(mode==='cancel-before-recovery')Object.assign(out,{after:m.body.toString(),connectionOpen:!c.closed});else Object.assign(out,{body:m.body.toString(),delivered:false});
   }else{await publish('before');const m=await sub.got;await ch.ack(m.args['delivery-tag']);out.before=m.body.toString();abort.abort();await sub.ended;out.consumers=await inspect();await publish('after');out.after=(await get()).body.toString();out.connectionOpen=!c.closed;}
  }
  await c.close();return out;
 }finally{c.destroy();}
}
await withRabbit(async info=>{
 for(const mode of ['pre-aborted','active','no-wait','shared','unacked','siblings','auto-delete','cancel-before-recovery','manual-reuse','recovery-after','offline-cancel']){
  const prefix='cancel-'+randomUUID()+'-',recovering=['cancel-before-recovery','recovery-after','offline-cancel'].includes(mode),proxy=recovering?await proxyTo(info.port):undefined,port=proxy?.port??info.port;
  try{
   const reference=await native({Port:port,Prefix:prefix+'go-',Mode:mode},row=>{if(row.stage==='ready'){if(mode==='offline-cancel')proxy.blocked=true;proxy.cut();}if(row.stage==='offline-cancelled')proxy.blocked=false;}),actual=await nodeCase(mode,port,prefix+'node-',proxy);
   if(['manual-reuse','offline-cancel'].includes(mode)){
    assert.notDeepEqual(actual,reference);assert.equal(actual.consumers,mode==='manual-reuse'?1:0);assert.equal(reference.consumers,mode==='manual-reuse'?0:1);
    const explanation=mode==='manual-reuse'?'Go keeps the old context watcher after manual cancellation; cancelling it stops a new consumer reusing the same tag. Node releases the watcher with its subscription.':'With the reconnect proxy blocked, Go cancellation returns on the closed channel and leaves consumer recovery intent, so the consumer is restored. Node removes cancelled consumer intent while retaining queue/exchange topology without broker acknowledgement. Cancellation after completed recovery matches Go.';
    differences.push({name:mode,matched:false,actual,reference,explanation});console.log('PASS explicit native consumer lifecycle difference '+mode);
   }else{assert.deepEqual(actual,reference);comparisons.push({name:mode,matched:true,actual,reference});tests.push(mode);console.log('PASS native consumer cancellation broker '+mode);}
  }finally{await proxy?.close();}
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/consumer-cancel-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,wireCases:wire.length,wire,wireScenarios,passed:tests.length,tests,nativeComparisons:comparisons.length,comparisons,explainedDifferences:differences.length,differences,sources,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,scope:'Two independent-peer cancellation RPC sequences and nine real broker scenarios match. Three explicit differences cover a bounded RPC scheduling probe, tag reuse and offline cancellation; these are not matches. Offline cancellation retains queue/exchange topology without broker acknowledgement. No full context/API or throughput parity claim.'},null,2)+'\n');
});
console.log(`${tests.length} real consumer cancellation broker groups passed; ${comparisons.length} native scenarios matched; ${differences.length} explained differences`);
