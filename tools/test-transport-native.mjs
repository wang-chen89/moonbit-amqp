import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import tls from 'node:tls';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect,open,defaultDial} from './client.mjs';
import {fixture,ack,until} from './recovery-peer.mjs';
import {clientProperties} from './metadata-peer.mjs';
import {byteTransport} from './transport-peer.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_TRANSPORT_REFERENCE;assert(executable,'Set AMQP_TRANSPORT_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/transport-reference-build.json',import.meta.url)));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./transport-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-peer.mjs','tools/metadata-peer.mjs','tools/transport-peer.mjs','tools/transport-reference.go','tools/test-transport-native.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','evidence/transport-reference-build.json','web/engine.mjs']);
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let output='',diagnostic='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),12000);child.stdin.end(JSON.stringify(request));try{const [code]=await exited;assert.equal(code,0,diagnostic);return JSON.parse(output);}finally{clearTimeout(timer);}}
const peers=[],brokers=[],localTests=[];let packages;
async function node(request,base){
 const calls=[];let stream,c;
 const dial=async(n,a)=>{calls.push({network:n,address:a});stream=net.connect({host:'127.0.0.1',port:Number(request.Target.split(':').at(-1))});stream.on('error',()=>{});await once(stream,'connect');return stream;};
 const options={username:'demo',password:'test-only',allowInsecureAuth:true,timeout:request.Timeout??5000,heartbeat:1,frameMax:131072,channelMax:64,properties:{product:'transport-test'},...base};
 if(request.Mode==='dial')c=await connect(request.URI,{...options,dial});
 else {
  if(request.Mode==='default')stream=await defaultDial(options.timeout)('tcp',request.Target);
  else {await dial('tcp',request.Target);calls.length=0;}
  if(request.TLSOpen){stream=tls.connect({...options.tls,socket:stream});stream.on('error',()=>{});await once(stream,'secureConnect');}
  if(request.Mode==='generic')stream=byteTransport(stream,{fragment:7});
  const {tls:unused,...opened}=options;c=await open(stream,opened);
 }
 try{
  const ch=await c.openChannel();await ch.declareQueue('transport-probe',{exclusive:true,autoDelete:true});await ch.confirmSelect();const confirmation=await ch.publish('','transport-probe','transport message');
  const body=request.Broker?(await ch.get('transport-probe',{noAck:true})).body.toString():'';
  const result={ack:Boolean(confirmation),body,vhost:c.config.vhost,mechanism:c.authenticationMechanism,...c.limits,tls:c.tlsState.handshakeComplete};await c.close();await until(()=>stream.destroyed);
  return {calls,ok:true,dialErrorIdentity:false,result,transportClosed:stream.destroyed};
 }finally{c?.destroy();stream?.destroy();}
}
for(const mode of ['dial','open','generic','default'])await fixture({heartbeat:1,onMessage(msg,s){s.write(ack(msg.ch,1));}},async({opts,state})=>{
 const request={Mode:mode,URI:'amqp://demo:test-only@route.invalid:12345/?heartbeat=1',Target:opts.host+':'+opts.port};
 const reference=await native(request),actual=await node(request);assert.deepEqual(actual.result,reference.result);assert.deepEqual(actual.calls,reference.calls);assert(actual.transportClosed&&reference.transportClosed);assert.equal(reference.deadlineCleared,mode!=='generic');
 const groups=[1,2].map(peer=>state.methods.filter(e=>e.peer===peer));
 const queue=g=>g.find(e=>e.cls===50&&e.id===10).args.toString('hex');assert.equal(queue(groups[0]),queue(groups[1]));
 const properties=peer=>clientProperties({...state,methods:state.methods.filter(e=>e.peer===peer)});assert.deepEqual(properties(1),properties(2));
 assert.equal(state.messages.length,2);assert.deepEqual(state.messages[0].body,state.messages[1].body);
 peers.push({mode,result:actual.result,calls:actual.calls,transportClosed:true,queueMethodHex:queue(groups[0]),bodyHex:state.messages[0].body.toString('hex')});console.log('MATCH native transport '+mode);
});
const marker=Error('dial marker');const failed=await native({Mode:'dial-error',URI:'amqp://route.invalid:12345',Target:'127.0.0.1:1'});let observed=false;await assert.rejects(connect('amqp://route.invalid:12345',{allowInsecureAuth:true,dial(n,a){observed=true;assert.deepEqual({network:n,address:a},failed.calls[0]);throw marker;}}),e=>e===marker);assert(observed&&failed.dialErrorIdentity&&!failed.ok);peers.push({mode:'dial-error',errorIdentity:true});
await fixture({noStart:true},async({opts})=>{
 const reference=await native({Mode:'default',Target:opts.host+':'+opts.port,Timeout:60});let s=await defaultDial(60)('tcp',opts.host+':'+opts.port);await assert.rejects(open(s,{...opts,timeout:200}),/timeout/);assert(s.destroyed&&reference.transportClosed&&!reference.ok);peers.push({mode:'default-handshake-timeout',transportClosed:true});
});
await withRabbit(async info=>{
 packages=info.packages;const directory=fs.mkdtempSync(path.join(os.tmpdir(),'moonbit-transport-'));
 const bytes=Object.fromEntries(Object.entries(info.authentication).map(([key,value])=>[key,Buffer.from(value,'base64')]));
 const files=Object.fromEntries(Object.entries(bytes).map(([key,value])=>{const file=path.join(directory,key+'.pem');fs.writeFileSync(file,value);return [key,file];}));
 try{
  for(const [name,mode,secure,preTls,mutual] of [['routed TCP','dial',false,false,false],['established TCP','open',false,false,false],['generic byte transport','generic',false,false,false],['default dial','default',false,false,false],['routed verified TLS','dial',true,false,false],['established verified TLS','open',true,true,false],['routed mutual TLS EXTERNAL','dial',true,false,true]]){
   const request={Mode:mode,URI:`${secure?'amqps':'amqp'}://demo:test-only@route.invalid:12345/?heartbeat=1`,Target:`127.0.0.1:${secure?info.tlsPort:info.port}`,Broker:true,TLSOpen:preTls,...(secure?{CAFile:files.ca,ServerName:'localhost'}:{}),...(mutual?{CertFile:files.clientCert,KeyFile:files.clientKey}:{})};
   const options=secure?{tls:{ca:bytes.ca,servername:'localhost',minVersion:'TLSv1.2',...(mutual?{cert:bytes.clientCert,key:bytes.clientKey}:{})},...(mutual?{sasl:[{mechanism:'EXTERNAL'}]}:{})}:{};
   const reference=await native(request),actual=await node(request,options);assert.deepEqual(actual.result,reference.result);assert.deepEqual(actual.calls,reference.calls);assert(actual.transportClosed&&reference.transportClosed);brokers.push({name,result:actual.result,calls:actual.calls,transportClosed:true});console.log('MATCH broker transport '+name);
  }
  // Failed TLS must dispose the custom dial's socket; no plaintext AMQP fallback.
  const proxy=await proxyTo(info.tlsPort);let failedSocket;
  try{await assert.rejects(connect('amqps://route.invalid:12345',{timeout:5000,tls:{ca:bytes.ca,servername:'wrong.invalid'},dial:()=>{failedSocket=net.connect({host:'127.0.0.1',port:proxy.port});return failedSocket;}}));assert(failedSocket.destroyed);localTests.push('TLS identity failure closes custom dial socket');}finally{await proxy.close();}
  const recoverProxy=await proxyTo(info.tlsPort);let c;const sockets=[],signals=[];
  try{
   c=await connect('amqps://demo:test-only@route.invalid:12345/?heartbeat=2',{timeout:5000,tls:{ca:bytes.ca,servername:'localhost'},recovery:{retryDelay:20,retryJitter:0,maxRetries:3},dial:(n,a,context)=>{signals.push(context.signal);const s=net.connect({host:'127.0.0.1',port:recoverProxy.port});sockets.push(s);return s;}});
   const ch=await c.openChannel();await ch.declareQueue('transport-recovery',{autoDelete:true});await ch.confirmSelect();await ch.publish('','transport-recovery','before');assert.equal((await ch.get('transport-recovery',{noAck:true})).body.toString(),'before');
   const recovered=once(c,'recovered',{signal:AbortSignal.timeout(10000)});recoverProxy.cut();await recovered;assert.equal(sockets.length,2);assert(sockets[0].destroyed&&signals[0].aborted);assert.equal(c.tlsState.authorized,true);assert.equal(c.connectionInfo.generation,2);await ch.publish('','transport-recovery','after');assert.equal((await ch.get('transport-recovery',{noAck:true})).body.toString(),'after');await ch.deleteQueue('transport-recovery');await c.close();await until(()=>sockets.every(s=>s.destroyed));assert(sockets.every(s=>s.destroyed));localTests.push('custom TLS dial is reinvoked and topology confirmed publish/get recover');console.log('PASS '+localTests.at(-1));
  }finally{c?.destroy();await recoverProxy.close();}
 }finally{assert(path.dirname(directory)===os.tmpdir()&&path.basename(directory).startsWith('moonbit-transport-'));fs.rmSync(directory,{recursive:true,force:true});}
},{authentication:true});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/transport-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerMatches:peers.length,brokerMatches:brokers.length,localPassed:localTests.length,peers,brokers,localTests,packages,sources,scope:'Six native transport successes/failures, queue method bytes/custom property tables/message bodies, and seven real broker results compared. TLS failure and custom TLS recovery are separately local. Node async factories, cancellation, total timeout and stream ownership guards are documented host contracts, not exact Go scheduler/network parity.'},null,2)+'\n');
console.log(`${peers.length} native transport results and ${brokers.length} broker results matched; ${localTests.length} local TLS cases passed`);
