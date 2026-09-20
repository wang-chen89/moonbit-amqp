import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {randomUUID,createHash} from 'node:crypto';
import {connect} from './client.mjs';
import {fixture,method,ack,cat,u16,short} from './channel-options-peer.mjs';
import {until,delay} from './stream-peer.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_CONFIRMATIONS_REFERENCE;assert(executable,'Set AMQP_CONFIRMATIONS_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/confirmations-reference-build.json',import.meta.url)));assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./confirmations-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/confirmations-reference.go','tools/test-confirmations-native.mjs','tools/channel-options-peer.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/stream-peer.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/confirmations-reference-build.json','web/engine.mjs']);
async function native(request,onRecord=()=>{}){
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']}),records=[],callbacks=[];let diagnostic='',failure;const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),25000);
 child.stdin.on('error',()=>{});child.stderr.on('data',data=>diagnostic+=data);const lines=createInterface({input:child.stdout});
 lines.on('line',line=>{try{const row=JSON.parse(line);records.push(row);callbacks.push(Promise.resolve(onRecord(row)).catch(error=>{failure=error;child.kill();}));}catch(error){failure=error;child.kill();}});
 child.stdin.end(JSON.stringify(request));try{const [code]=await exited;await Promise.all(callbacks);if(failure)throw failure;assert.equal(code,0,diagnostic);return records.at(-1);}finally{clearTimeout(timer);}
}
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(12000)}),socket=state=>[...state.sockets][0],hash=body=>createHash('sha256').update(body).digest('hex');
const wire=[],wireComparisons=[],comparisons=[],differences=[],observations=[];
const countFor=mode=>['wire-normal','wire-wait','wire-future'].includes(mode)?1:3;
async function respond(mode,stage,state,ch=1){
 if(stage==='published'){
  await until(()=>state.messages.length===countFor(mode));const s=socket(state);
  if(mode==='wire-order')s.write(ack(ch,3));
  if(mode==='wire-multiple')s.write(ack(ch,3,true));
  if(mode==='wire-nack')s.write(cat(ack(ch,2,true,true),ack(ch,3)));
  if(mode==='wire-close')s.write(method(ch,20,40,u16(200),short('probe close'),u16(0),u16(0)));
  if(mode==='wire-zero')s.write(ack(ch,0,true));
  if(mode==='wire-future')s.write(ack(ch,99));
 }
 if(stage==='out-of-order')socket(state).write(cat(ack(ch,1),ack(ch,2,false,true)));
 if(stage==='wait-done')socket(state).write(ack(ch,1));
 if(stage==='probe-done')socket(state).write(ack(ch,countFor(mode),true));
}
const selected=state=>state.methods.filter(e=>e.cls===85&&e.id===10||e.cls===60&&e.id===40).map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')}));
const bodies=state=>state.messages.map(m=>({bytes:m.body.length,sha256:hash(m.body)}));
async function nodeWire(mode,open,state){
 const c=await open(),ch=await c.openChannel(),events=[],split={acks:[],nacks:[]};ch.on('confirm',v=>events.push({tag:Number(v.deliveryTag),ack:v.ack}));ch.on('ack',tag=>split.acks.push(Number(tag)));ch.on('nack',tag=>split.nacks.push(Number(tag)));
 const publish=()=>ch.publishWithDeferredConfirm('','q','x'),out={};
 if(mode==='wire-normal'){out.handleNil=await publish()===null;out.next=Number(ch.nextPublishSeqNo);await ch.qos(0);}
 else{
  await ch.confirmSelect();const handles=await Promise.all(Array.from({length:countFor(mode)},publish));await respond(mode,'published',state,ch.id);
  if(mode==='wire-order'){assert.equal(await handles[2].wait(),true);out.early=handles.map(h=>h.completed);await respond(mode,'out-of-order',state,ch.id);}
  if(mode==='wire-wait'){
   const abort=AbortSignal.abort();out.cancelled=await handles[0].wait({signal:abort}).then(()=>false,()=>true);out.timedOut=await handles[0].wait({timeout:5}).then(()=>false,()=>true);out.pendingAfterWaits=!handles[0].completed;await respond(mode,'wait-done',state,ch.id);
  }
  if(mode==='wire-zero'||mode==='wire-future'){
   if(mode==='wire-zero')await handles[0].wait();else await event(c,'close');
   out.probeAcked=handles.map(h=>h.acked);out.probeConnectionOpen=!c.closed;
   if(mode==='wire-zero')await respond(mode,'probe-done',state,ch.id);
  }
  out.acked=await Promise.all(handles.map(h=>h.wait()));out.tags=handles.map(h=>Number(h.deliveryTag));out.done=handles.map(h=>h.completed);out.next=Number(ch.nextPublishSeqNo);out.events=events;out.split=split;out.connectionOpen=!c.closed;
 }
 if(!c.closed)await c.close();return out;
}
for(const mode of ['wire-normal','wire-order','wire-multiple','wire-nack','wire-wait','wire-close','wire-zero','wire-future']){
 let reference,referenceWire,referenceBodies;
 await fixture({},async({opts,state})=>{reference=await native({Port:opts.port,Mode:mode},row=>respond(mode,row.stage,state));referenceWire=selected(state);referenceBodies=bodies(state);});
 await fixture({},async({open,state})=>{
  const actual=await nodeWire(mode,open,state);
  if(['wire-zero','wire-future'].includes(mode)){
   assert.notDeepEqual(actual,reference);assert(reference.probeConnectionOpen);assert(reference.probeAcked.every(v=>!v));
   if(mode==='wire-zero'){assert(actual.probeConnectionOpen);assert(actual.probeAcked.every(Boolean));}else{assert(!actual.probeConnectionOpen);assert(actual.acked.every(v=>!v));}
   differences.push({name:mode,matched:false,actual,reference,explanation:mode==='wire-zero'?'Node preserves its existing tag-zero/multiple all-outstanding interpretation. The fixed Go reference leaves handles pending until the later explicit cumulative tag; the 60 ms probe and subsequent completion are recorded separately.':'Node preserves fail-closed validation of a future broker confirmation tag. The fixed Go reference keeps the connection open and waits for a valid tag; the invalid-tag probe does not establish a broker-supported workflow.'});
  }else{
   assert.deepEqual(actual,reference);const actualWire=selected(state);assert.deepEqual(actualWire,referenceWire);assert.deepEqual(bodies(state),referenceBodies);
   actualWire.forEach((row,index)=>wire.push({scenario:mode,index,matched:true,actual:row,reference:referenceWire[index]}));wireComparisons.push({name:mode,matched:true,actual,reference,bodies:referenceBodies});
  }
 });console.log('PASS native confirmation peer '+mode);
}
async function nodeCase(mode,port,prefix,proxy){
 const recovering=['recovery','channel-recovery'].includes(mode),c=await connect({host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:10000,...(recovering?{recovery:{maxRetries:8,retryDelay:40,retryJitter:0}}:{})}),ch=await c.openChannel(),q=prefix+'q',out={},events=[];
 ch.on('confirm',v=>events.push({tag:Number(v.deliveryTag),ack:v.ack}));await ch.declareQueue(q,{exclusive:true});
 const publish=(body='x',key=q,mandatory=false)=>ch.publishWithDeferredConfirm('',key,body,{mandatory}),get=async()=>{const m=await ch.get(q,{noAck:true});assert(m);return m;};
 try{
  if(mode==='normal'||mode==='transaction'){if(mode==='transaction')await ch.txSelect();out.handleNil=await publish()===null;if(mode==='transaction')await ch.txCommit();out.body=(await get()).body.toString();out.next=Number(ch.nextPublishSeqNo);}
  else{
   await ch.confirmSelect();
   if(mode==='pre-aborted'){
    const abort=AbortSignal.abort();out.rejected=await ch.publishWithDeferredConfirm('',q,'x',{signal:abort}).then(()=>false,()=>true);out.handleNil=true;out.next=Number(ch.nextPublishSeqNo);out.empty=await ch.get(q,{noAck:true})===null;
   }else if(mode==='mandatory'){
    const returned=event(ch,'return'),h=await publish('returned',prefix+'absent',true);out.acked=await h.wait();const [m]=await returned;out.body=m.body.toString();out.code=m.args['reply-code'];out.events=events;
   }else if(mode==='multi-channel'){
    const other=await c.openChannel();await other.confirmSelect();const a=await publish('first'),b=await other.publishWithDeferredConfirm('',q,'second');out.acked=await Promise.all([a.wait(),b.wait()]);out.tags=[Number(a.deliveryTag),Number(b.deliveryTag)];out.next=[Number(ch.nextPublishSeqNo),Number(other.nextPublishSeqNo)];out.bodies=[(await get()).body.toString(),(await get()).body.toString()].sort();
   }else if(recovering){
    const before=await publish('before');assert.equal(await before.wait(),true);out.before=(await get()).body.toString();const ready=event(mode==='recovery'?c:ch,'recovered');
    if(mode==='recovery')proxy.cut();else await assert.rejects(ch.declareQueue(prefix+'absent',{passive:true}),e=>e.code===404);
    await ready;out.nextAfterRecovery=Number(ch.nextPublishSeqNo);const after=await publish('after');out.acked=[before.acked,await after.wait()];out.tags=[Number(before.deliveryTag),Number(after.deliveryTag)];out.after=(await get()).body.toString();out.events=events;out.next=Number(ch.nextPublishSeqNo);observations.push({mode,generations:[before.generation,after.generation]});
   }else{
    const body=mode==='stream'?Buffer.from([0,255,42,128]).toString('hex'):null;let h;
    if(mode==='stream'){const bytes=Buffer.from(body.repeat(262144),'hex');h=await ch.publishStreamWithDeferredConfirm('',q,[bytes.subarray(0,333333),bytes.subarray(333333)],bytes.length);}else h=await publish('hello');
    out.acked=await h.wait();out.done=h.completed;out.tag=Number(h.deliveryTag);out.next=Number(ch.nextPublishSeqNo);const m=await get();out.bytes=m.body.length;out.sha256=hash(m.body);out.events=events;
   }
  }
  out.connectionOpen=!c.closed;await c.close();return out;
 }finally{c.destroy();}
}
await withRabbit(async info=>{
 for(const mode of ['normal','transaction','basic','stream','mandatory','pre-aborted','multi-channel','recovery','channel-recovery']){
  const prefix='confirms-'+randomUUID()+'-',proxy=mode==='recovery'?await proxyTo(info.port):undefined,port=proxy?.port??info.port;
  try{const reference=await native({Port:port,Prefix:prefix+'go-',Mode:mode},row=>{if(row.stage==='ready')proxy.cut();}),actual=await nodeCase(mode,port,prefix+'node-',proxy);assert.deepEqual(actual,reference);comparisons.push({name:mode,matched:true,actual,reference});console.log('PASS native confirmation broker '+mode);}finally{await proxy?.close();}
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/confirmations-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,wireCases:wire.length,wire,wireScenarioComparisons:wireComparisons.length,wireComparisons,passed:comparisons.length,tests:comparisons.map(r=>r.name),nativeComparisons:comparisons.length,comparisons,explainedDifferences:differences.length,differences,observations,sources,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,scope:'Six controlled-peer semantic sequences and nine real broker scenarios match; exact method bytes and body hashes are checked for the matching peer sequences. Tag-zero multiple and invalid future-tag handling are explicit existing client differences. Local waiter timeout does not retract a publication. No claim of full Go channel scheduling, transport context or throughput parity.'},null,2)+'\n');
});
console.log(`${wire.length} native confirmation method frames; ${wireComparisons.length} peer sequences; ${comparisons.length} broker scenarios matched; ${differences.length} explicit differences`);
