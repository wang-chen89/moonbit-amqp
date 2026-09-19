import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {fixture,sequence,selected,method,cat} from './channel-options-peer.mjs';
import {gate} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_CHANNEL_OPTIONS_REFERENCE;assert(executable,'Set AMQP_CHANNEL_OPTIONS_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/channel-options-reference-build.json',import.meta.url)));assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./channel-options-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/channel-options-reference.go','tools/test-channel-options-native.mjs','tools/channel-options-peer.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/stream-peer.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/channel-options-reference-build.json','web/engine.mjs']);
async function native(request,onRecord=()=>{}){
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']}),records=[];let error='',callbackError;const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),25000);child.stdin.on('error',()=>{});child.stderr.on('data',b=>error+=b);const lines=createInterface({input:child.stdout});lines.on('line',line=>{try{const row=JSON.parse(line);records.push(row);onRecord(row);}catch(e){callbackError=e;child.kill();}});child.stdin.end(JSON.stringify(request));
 try{const [code]=await exited;if(callbackError)throw callbackError;assert.equal(code,0,error);return records.at(-1);}finally{clearTimeout(timer);}
}
const tests=[],wire=[],comparisons=[],differences=[],noticeComparisons=[];
const selectedWire=state=>state.methods.filter(selected).map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')}));
await fixture({},async({opts,state})=>{
 assert.deepEqual(await native({Port:opts.port,Mode:'wire'}),{wire:true});const reference=selectedWire(state);assert.equal(state.messages.length,8);
 await fixture({},async({open,state})=>{const c=await open(),ch=await c.openChannel();await sequence(ch);const actual=selectedWire(state);assert.equal(actual.length,18);assert.deepEqual(actual,reference);for(let i=0;i<actual.length;i++)wire.push({index:i,matched:true,actual:actual[i],reference:reference[i]});assert(state.messages.every(m=>m.body.toString()==='data'));await c.close();});
});console.log('18 native channel option method frames matched');
const noticePeer=(paused=false)=>({onMethod:(e,s)=>{if(e.cls===60&&e.id===10&&e.args.readUInt16BE(4)===1){const frames=[method(e.ch,20,20,Buffer.from([0]))];if(!paused)frames.push(method(e.ch,20,20,Buffer.from([1])));frames.push(method(e.ch,60,11));s.write(cat(...frames));return true;}}});
await fixture(noticePeer(),async({opts,state})=>{
 const reference=await native({Port:opts.port,Mode:'flow-notice'}),acks=state.methods.filter(e=>e.cls===20&&e.id===21).map(e=>e.args[0]);assert.deepEqual(acks,[0,1]);
 await fixture(noticePeer(),async({open,state})=>{const c=await open(),ch=await c.openChannel(),values=[];ch.on('flow',v=>values.push(v));await ch.qos(1);await ch.qos(2);const actual={values};assert.deepEqual(actual,reference);assert.deepEqual(state.methods.filter(e=>e.cls===20&&e.id===21).map(e=>e.args[0]),acks);noticeComparisons.push({matched:true,actual,reference,flowOkBits:acks});await c.close();});
});console.log('1 native server flow notification and automatic reply sequence matched');
await fixture({},async({opts,state})=>{
 const reference=await native({Port:opts.port,Mode:'qos-wrap'});assert.deepEqual(reference,{accepted:true});assert.equal(selectedWire(state)[0].args,'00000000000000');
 await fixture({},async({open,state})=>{const c=await open(),ch=await c.openChannel();await assert.rejects(ch.qos(65536,false,{prefetchSize:4294967296}));assert.equal(selectedWire(state).length,0);const actual={accepted:false};differences.push({name:'qos-out-of-wire-range',matched:false,reference,actual,referenceWire:'00000000000000',explanation:'Pinned Go only rejects negative integers and truncates count/size to uint16/uint32. Node rejects values outside the wire ranges before sending.'});await c.close();});
});
await fixture(noticePeer(true),async({opts,state})=>{
 const reference=await native({Port:opts.port,Mode:'publish-paused'});assert.deepEqual(reference,{published:true});assert.equal(state.messages.length,1);
 await fixture(noticePeer(true),async({open,state})=>{const c=await open(),ch=await c.openChannel();await ch.qos(1);await assert.rejects(ch.publish('','q','paused'),/unavailable or blocked/);await ch.qos(2);assert.equal(state.messages.length,0);const actual={published:false};differences.push({name:'automatic-publisher-pause',matched:false,reference,actual,explanation:'Pinned Go notifies the application but still allows Publish while paused. The MoonBit Session enforces server channel.flow(false) for new publications; Node exposes the notification as well.'});await c.close();});
});console.log('2 explicit native QoS range and paused-publication differences verified');
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(12000)});
async function nodeCase(mode,port,prefix,proxy){
 const opts={host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:10000},c=await connect({...opts,...(mode==='recovery'?{recovery:{maxRetries:5,retryDelay:40,retryJitter:0}}:{})});
 const ch=await c.openChannel(),out={},q=prefix+'q';
 const connectionOpen=async()=>{try{const s=await c.openChannel();await s.close();return true;}catch{return false;}};
 try{
  if(['qos-size','qos-max','flow-false'].includes(mode)){
   try{if(mode==='flow-false')await ch.flow(false);else await ch.qos(1,false,{prefetchSize:mode==='qos-max'?4294967295:1});assert.fail('expected broker rejection');}catch(error){assert(error.code);out.code=error.code;}out.connectionOpen=await connectionOpen();
  }else if(mode==='immediate'||mode==='immediate-stream'){
   await ch.declareQueue(q);await ch.confirmSelect();try{if(mode==='immediate')await ch.publish('',q,'data',{immediate:true});else await ch.publishStream('',q,[Buffer.from('da'),Buffer.from('ta')],4,{immediate:true});assert.fail('expected broker rejection');}catch(error){assert(error.code);out.code=error.code;}out.connectionOpen=await connectionOpen();const other=await connect(opts);try{const admin=await other.openChannel();out.messageStored=await admin.get(q,{noAck:true})!==null;await admin.deleteQueue(q);await other.close();}finally{other.destroy();}
  }else if(mode==='flow-true'){
   out.active=await ch.flow(true);await ch.declareQueue(q,{exclusive:true});await ch.publish('',q,'active');const m=await ch.get(q,{noAck:true});out.found=Boolean(m);out.body=m?.body.toString();
  }else{
   await ch.declareQueue(q,{exclusive:true});await ch.qos(1,false,{prefetchSize:0});let got=gate();await ch.consume(q,m=>{if(m)got.resolve(m);},{consumerTag:'consumer',noLocal:true,noWait:mode==='no-local-nowait'});await ch.publish('',q,'local-before');let m=await got.promise;out.body=m.body.toString();await ch.ack(m.args['delivery-tag']);
   if(mode==='recovery'){await ch.qos(1);got=gate();const ready=event(c,'recovered');proxy.cut();await ready;await ch.publish('',q,'local-after');m=await got.promise;out.after=m.body.toString();await ch.ack(m.args['delivery-tag']);}await ch.cancel('consumer');out.connectionOpen=!c.closed;
  }
  if(!c.closed)await c.close();return out;
 }finally{c.destroy();}
}
await withRabbit(async info=>{
 for(const mode of ['qos-size','qos-max','flow-true','flow-false','immediate','immediate-stream','no-local','no-local-nowait','recovery']){
  const prefix='options-'+randomUUID()+'-',proxy=mode==='recovery'?await proxyTo(info.port):undefined,port=proxy?.port??info.port;
  try{const reference=await native({Port:port,Prefix:prefix+'go-',Mode:mode},row=>{if(row.stage==='ready')proxy.cut();}),actual=await nodeCase(mode,port,prefix+'node-',proxy);assert.deepEqual(actual,reference);comparisons.push({name:mode,matched:true,actual,reference});tests.push(mode);console.log('PASS native channel option broker '+mode);}finally{await proxy?.close();}
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/channel-options-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,wireCases:wire.length,wire,noticeComparisons,passed:tests.length,tests,nativeComparisons:comparisons.length,comparisons,explainedDifferences:differences.length,differences,sources,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,scope:'18 exact method frames, one flow notification/reply sequence and nine real broker results including unsupported options and recovery. Two explicit local range/pause differences, not matches. RabbitMQ does not enforce noLocal isolation, rejects nonzero size/immediate/flow(false). No multiversion or throughput parity.'},null,2)+'\n');
});
console.log(`${tests.length} real channel option broker groups passed; ${comparisons.length} native scenarios matched; ${differences.length} explained differences`);
