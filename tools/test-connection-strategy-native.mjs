import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {once} from 'node:events';
import {spawn} from 'node:child_process';
import {connect,DefaultConnectionRecovery} from './client.mjs';
import {fixture,method,u16,short} from './recovery-peer.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_CONNECTION_STRATEGY_REFERENCE;assert(executable,'Set AMQP_CONNECTION_STRATEGY_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/connection-strategy-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./connection-strategy-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/connection-strategy.mjs','tools/recovery-peer.mjs','tools/connection-strategy-reference.go','tools/test-connection-strategy-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/connection-strategy-reference-build.json','web/engine.mjs']);
function gate(){let resolve;return {promise:new Promise(r=>resolve=r),release:()=>resolve()};}
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let out='',err='';child.stdout.on('data',b=>out+=b);child.stderr.on('data',b=>err+=b);child.stdin.on('error',()=>{});const ended=once(child,'close'),timer=setTimeout(()=>child.kill(),15000);child.stdin.end(JSON.stringify(request));try{const [code]=await ended;assert.equal(code,0,err);return JSON.parse(out);}finally{clearTimeout(timer);}}
async function node(r){
 let connectionCalls=0,channelCalls=0,dials=0,raw;const connectionDone=gate(),channelDone=gate(),channelSeen=gate(),defaults=new DefaultConnectionRecovery(),errorCodes=[];
 const strategy={async onConnectionClose(c,e,ctx){connectionCalls++;errorCodes.push(e.code??null);try{if(['connection-noop','connection-manual'].includes(r.Mode))return;if(r.Mode==='connection-close'){await channelSeen.promise;return await ctx.close();}if(r.Mode==='connection-delay')await delay(35);return await defaults.onConnectionClose(c,e,ctx);}finally{connectionDone.release();}},async onChannelClose(ch,e,ctx){channelCalls++;errorCodes.push(e.code??null);channelSeen.release();try{if(r.Mode==='channel-close')return await ctx.close();if(['channel-noop','channel-manual'].includes(r.Mode))return;return await defaults.onChannelClose(ch,e,ctx);}finally{channelDone.release();}}};
 const c=await connect(r.URI,{allowInsecureAuth:true,timeout:3000,heartbeat:0,...(r.Certificate?{tls:{ca:r.Certificate,servername:'localhost'}}:{}),dial(_n,_a,x){dials++;if(dials>1&&r.Mode==='exhaust')throw Error('injected offline');return raw=net.connect({host:x.host,port:x.port});},recovery:r.Mode==='off'?false:{maxRetries:2,retryDelay:1,retryJitter:0,connectionRecovery:strategy}});
 try{
  const ch=await c.openChannel();await ch.declareQueue('policy-tracked',{exclusive:true});let connectionCancelled=false,channelCancelled=false;c.notifyRecoveryCancel().then(()=>connectionCancelled=true);ch.notifyRecoveryCancel().then(()=>channelCancelled=true);
  if(r.Mode==='explicit-close')await c.close();else if(r.Mode.startsWith('channel-')){await assert.rejects(ch.declareQueue('policy-absent',{passive:true}));await channelDone.promise;if(r.Mode==='channel-manual')await ch.reconnect();}
  else{raw.destroy();if(r.Mode==='off')await Promise.all([c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);else{await Promise.all([connectionDone.promise,channelDone.promise]);if(r.Mode==='connection-manual')await c.reconnect();}}
  await Promise.resolve();const out={connectionCalls,channelCalls,dials,transportClosed:(c._raw??c).closed,channelTransportClosed:(ch._raw??ch).closed,connectionCancelled,channelCancelled,recoveryEnabled:c.recoveryEnabled,tracked:Boolean(ch.topologyConfiguration(true).queues['policy-tracked']),errorCodes,logicalState:c.state??null,logicalChannelState:ch.state??null};
  if(r.Broker&&!out.transportClosed&&!out.channelTransportClosed){await ch.confirmSelect();const h=await ch.publishWithDeferredConfirm('','policy-tracked','policy-restored');out.confirmed=await h.wait();out.delivered=(await ch.get('policy-tracked',{noAck:true})).body.toString()==='policy-restored';}return out;
 }finally{c.destroy();}
}
const peers=[],brokers=[],differences=[],cleanupDifferences=[],localTests=[];let packages;
const fields=['connectionCalls','channelCalls','dials','transportClosed','channelTransportClosed','connectionCancelled','channelCancelled','recoveryEnabled','tracked'];
function compare(name,reference,actual){const keys=[...fields,...('confirmed' in reference?['confirmed','delivered']:[])];const a=Object.fromEntries(keys.map(k=>[k,actual[k]])),b=Object.fromEntries(keys.map(k=>[k,reference[k]]));assert.deepEqual(a,b,name);return {name,reference,actual,matchedFields:keys};}
function record(rows,name,reference,actual){
 if(['connection-close','channel-close'].includes(name)){
  assert.equal(reference.tracked,true);assert.equal(actual.tracked,false);
  if(name==='connection-close'){assert.equal(reference.channelCancelled,false);assert.equal(actual.channelCancelled,true);}
  const remaining=fields.filter(k=>k!=='tracked'&&(name!=='connection-close'||k!=='channelCancelled'));
  assert.deepEqual(Object.fromEntries(remaining.map(k=>[k,actual[k]])),Object.fromEntries(remaining.map(k=>[k,reference[k]])));
  cleanupDifferences.push({surface:rows===peers?'peer':'broker',name,reference,actual,otherMatchedFields:remaining});console.log('DIFFERENCE policy close cleanup '+name);return;
 }
 rows.push(compare(name,reference,actual));console.log('MATCH connection strategy '+(rows===peers?'peer ':'broker ')+name);
}
const modes=['connection-default','connection-noop','connection-manual','connection-delay','connection-close','channel-default','channel-noop','channel-manual','channel-close','exhaust','explicit-close','off'];
for(const Mode of modes)await fixture({onMethod(e,s){if(e.cls===50&&e.id===10&&e.args.subarray(3,-5).toString()==='policy-absent'){s.write(method(e.ch,20,40,u16(404),short('missing'),u16(50),u16(10)));return true;}}},async({opts})=>{
 const r={URI:`amqp://demo:test@${opts.host}:${opts.port}/?heartbeat=0`,Mode};const reference=await native(r),actual=await node(r);record(peers,Mode,reference,actual);
});
await withRabbit(async info=>{
 packages=info.packages;const URI=`amqp://demo:test-only@127.0.0.1:${info.port}/?heartbeat=0`;
 for(const Mode of modes){const r={URI,Mode,Broker:true};record(brokers,Mode,await native(r),await node(r));}
 for(const Mode of ['connection-default','connection-manual']){const r={URI:`amqps://demo:test-only@localhost:${info.tlsPort}/?heartbeat=0`,Mode,Broker:true,Certificate:Buffer.from(info.certificate,'base64').toString()};brokers.push(compare('TLS '+Mode,await native(r),await node(r)));}
 let wire;const entered=gate(),resume=gate();const c=await connect(URI,{allowInsecureAuth:true,timeout:3000,dial(_n,_a,x){return wire=net.connect({host:x.host,port:x.port});},recovery:{maxRetries:2,retryDelay:1,retryJitter:0,connectionRecovery:{onChannelClose(){},async onConnectionClose(c,e,ctx){entered.release();await resume.promise;return ctx.reconnect();}}}});
 try{const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();const messages=[];await ch.consume(queue,m=>messages.push(m.body.toString()),{consumerTag:'policy-consumer',noAck:true});wire.destroy();await entered.promise;assert.equal(c.state,'disconnected');resume.release();await c.waitForReady();await ch.publish('',c.resolveQueue(queue),'policy delivery');for(let i=0;messages.length===0&&i<100;i++)await delay(10);assert.deepEqual(messages,['policy delivery']);localTests.push('delayed custom decision restores a generated queue and original consumer, then delivers a confirmed broker message');}finally{c.destroy();}
},{authentication:false});
assert.equal(cleanupDifferences.length,4);differences.push({name:'policy closes an already failed transport',cases:cleanupDifferences,upstream:'Connection.beginClose returns ErrClosed before shutdown(nil); Channel.Close returns before closeChannel for an already closed session. Observed retained topology, and an unsettled channel cancellation after connection close.',local:'Explicit logical close always clears owned topology and settles affected lifecycle cancellation; no leaked retained channel after the policy discards the connection.',scope:'Both peer and real broker reproduce two close paths. These are explicit cleanup differences, not matched outcomes.'});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/connection-strategy-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerMatches:peers.length,brokerMatches:brokers.length,explicitDifferences:differences.length,localPassed:localTests.length,peers,brokers,differences,localTests,packages,sources,scope:'Custom decision invocation counts, physical closed state, policy flags, cancellation and retained topology; real broker confirmed delivery includes TLS. Node disconnected logical states and raw error representations are retained outside match assertions; not Go goroutine/channel scheduling equivalence.'},null,2)+'\n');console.log(`${peers.length} native connection strategy peer and ${brokers.length} broker outcomes matched; ${differences.length} explicit differences; ${localTests.length} local delivery scenario passed`);
