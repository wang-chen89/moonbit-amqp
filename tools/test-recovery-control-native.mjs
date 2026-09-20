import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect} from './client.mjs';
import {fixture} from './recovery-peer.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_RECOVERY_CONTROL_REFERENCE;assert(executable,'Set AMQP_RECOVERY_CONTROL_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/recovery-control-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./recovery-control-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery-control.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/recovery-peer.mjs','tools/recovery-control-reference.go','tools/test-recovery-control-native.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','evidence/recovery-control-reference-build.json','web/engine.mjs']);
const event=(c,name)=>once(c,name,{signal:AbortSignal.timeout(10000)});
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let output='',diagnostic='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),14000);child.stdin.end(JSON.stringify(request));try{const [code]=await exited;assert.equal(code,0,diagnostic);return JSON.parse(output);}finally{clearTimeout(timer);}}
const result=async promise=>{try{await promise;return 'ok';}catch(e){return e.code==='AMQP_RECOVERY_CLOSED'?'closed':'error';}};
const query=c=>({closed:c.closed,recoveryEnabled:c.recoveryEnabled,connectionRecoveryEnabled:c.connectionRecoveryEnabled,topologyRecoveryEnabled:c.topologyRecoveryEnabled,maxRetryCount:c.maxRetryCount,retryInterval:c.retryInterval});
async function node(request){
 let attempts=0,failing=false,stream;
 const dial=(_network,_address,context)=>{attempts++;if(failing)throw Error('injected dial failure');return stream=net.connect({host:context.host,port:context.port});};
 const c=await connect(request.URI,{allowInsecureAuth:true,timeout:5000,channelMax:64,dial,recovery:request.Scenario==='off'?false:{maxRetries:2,retryDelay:5,retryJitter:0}});
 try {
  const ch=await c.openChannel();let connectionCancelled=false,channelCancelled=false;c.notifyRecoveryCancel().then(()=>connectionCancelled=true);ch.notifyRecoveryCancel().then(()=>channelCancelled=true);
  const stages=[],out={};const record=async name=>{await Promise.resolve();stages.push({name,query:query(c),attempts,connectionCancelled,channelCancelled,channelClosed:ch.closed,queues:Object.keys(ch.topologyConfiguration(true).queues).length});};await record('initial');
  if(['open','off','open-topology'].includes(request.Scenario)){
   if(request.Scenario==='open-topology'){await ch.declareQueue('control-owned',{autoDelete:true,exclusive:true});await record('declared');}
   out.connectionReconnect=await result(c.reconnect());out.channelReconnect=await result(ch.reconnect());await record('reconnected');
  }else if(request.Scenario==='active-consumer'){
   let topologyErrors=0,delivered=false;c.on('topologyError',()=>topologyErrors++);await ch.declareQueue('control-consumer',{exclusive:true});let receive;const received=new Promise(resolve=>receive=resolve);await ch.consume('control-consumer',m=>{if(m?.body.toString()==='after active replay'){delivered=true;receive();}},{consumerTag:'active-tag',noAck:true});out.channelReconnect=await result(ch.reconnect());await ch.confirmSelect();await ch.publish('','control-consumer','after active replay');out.confirmed=true;let timer;try{await Promise.race([received,new Promise(resolve=>timer=setTimeout(resolve,700))]);}finally{clearTimeout(timer);}out.delivered=delivered;out.topologyErrors=topologyErrors;await record('replayed');
  }else if(request.Scenario==='close'){
   await ch.close();out.channelReconnect=await result(ch.reconnect());await record('channel-closed');out.connectionClose=await result(c.close());out.connectionReconnect=await result(c.reconnect());await record('closed');await Promise.all([c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);out.lateConnectionCancelled=true;out.lateChannelCancelled=true;
  }else{
   await ch.declareQueue('control-owned',{autoDelete:true,exclusive:true});failing=true;
   if(request.Scenario==='cancel'){const changing=event(c,'stateChange');stream.destroy();await changing;out.connectionClose=await result(c.close());await record('cancelled');out.connectionReconnect=await result(c.reconnect());}
   else{const ended=event(c,'close');stream.destroy();await ended;await record('exhausted');await Promise.all([c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);out.lateConnectionCancelled=true;out.lateChannelCancelled=true;
    if(request.Scenario==='retry'){failing=false;out.connectionReconnect=await result(c.reconnect());await record('retried');const fresh=await c.openChannel();out.newChannel='ok';await fresh.close();}
    else{out.connectionClose=await result(c.close());await record('explicit-close-after-exhaustion');out.connectionReconnect=await result(c.reconnect());}
   }
  }
  return {...out,stages};
 }finally{await c.close();c.destroy();}
}
const cases=['open','off','open-topology','close','exhaust','retry','cancel'],peerComparisons=[],brokerComparisons=[],localTests=[];let packages,activeConsumerComparison;
function compare(scenario,reference,actual){
 assert.deepEqual(actual.stages,reference.stages,scenario+' query/cancellation stages');
 if(scenario==='retry'){assert.equal(reference.newChannel,'panic');assert.equal(actual.newChannel,'ok');assert.deepEqual({...actual,newChannel:'panic'},reference);return {scenario,queryMatched:true,outcomeMatched:false,difference:'usable new channel after exhaustion',reference,actual};}
 if(['exhaust','cancel'].includes(scenario)){assert.equal(reference.connectionClose,'closed');assert.equal(actual.connectionClose,'ok');assert.deepEqual({...actual,connectionClose:'closed'},reference);return {scenario,queryMatched:true,outcomeMatched:false,difference:'idempotent close already closed result',reference,actual};}
 assert.deepEqual(actual,reference);return {scenario,queryMatched:true,outcomeMatched:true,reference,actual};
}
for(const scenario of cases)await fixture({heartbeat:1},async({opts})=>{
 const URI=`amqp://demo:test@${opts.host}:${opts.port}/?heartbeat=1`,reference=await native({URI,Scenario:scenario}),actual=await node({URI,Scenario:scenario});peerComparisons.push(compare(scenario,reference,actual));console.log('CHECK recovery control peer '+scenario);
});
await withRabbit(async info=>{
 packages=info.packages;const URI=`amqp://demo:test-only@127.0.0.1:${info.port}/?heartbeat=1`;
 for(const scenario of cases){const reference=await native({URI,Scenario:scenario}),actual=await node({URI,Scenario:scenario});brokerComparisons.push(compare(scenario,reference,actual));console.log('CHECK recovery control broker '+scenario);}
 const activeRequest={URI,Scenario:'active-consumer'},reference=await native(activeRequest),actual=await node(activeRequest);console.log('Active consumer native result '+JSON.stringify(reference));assert.equal(reference.channelReconnect,'ok');assert.equal(actual.channelReconnect,'ok');assert.equal(reference.confirmResult,'closed');assert.equal(reference.confirmed,false);assert.equal(actual.confirmed,true);assert.equal(reference.delivered,false);assert.equal(reference.topologyErrors,1);assert.equal(actual.delivered,true);assert.equal(actual.topologyErrors,0);activeConsumerComparison={reference,actual,scope:'Explicit live-channel replay duplicates the upstream consumer tag, causing broker rejection and a skipped subscription; a following Confirm returns ErrClosed. Local replay retains the still-live subscription; confirmed publication and delivery verify usability.'};console.log('CHECK explicit active-consumer difference');
 let fail=false,stream;const dial=(_network,_address,context)=>{if(fail)throw Error('temporary outage');return stream=net.connect({host:context.host,port:context.port});};
 const c=await connect(URI,{allowInsecureAuth:true,timeout:5000,dial,recovery:{maxRetries:2,retryDelay:5,retryJitter:0}});
 try{
  const old=await c.openChannel();await old.declareQueue('discarded',{exclusive:true,autoDelete:true});const end=event(c,'close');fail=true;stream.destroy();await end;fail=false;await c.reconnect();assert(old.closed);assert.deepEqual(c.topologyConfiguration().queues,{});const fresh=await c.openChannel();await fresh.declareQueue('renewed',{exclusive:true,autoDelete:true});await fresh.confirmSelect();await fresh.publish('','renewed','after terminal recovery');assert.equal((await fresh.get('renewed',{noAck:true})).body.toString(),'after terminal recovery');localTests.push('exhaustion followed by explicit connection recovery creates a working channel and confirms/routes/gets data');
  const before=c.connectionInfo.generation;await fresh.reconnect();await fresh.publish('','renewed','after channel replay');assert.equal((await fresh.get('renewed',{noAck:true})).body.toString(),'after channel replay');assert.equal(c.connectionInfo.generation,before);localTests.push('explicit live channel replay preserves confirmed delivery without replacing connection');
  const cancelled=c.notifyRecoveryCancel();await c.close();await cancelled;await assert.rejects(c.reconnect(),e=>e.code==='AMQP_RECOVERY_CLOSED');localTests.push('explicit close settles the new lifecycle cancellation and blocks further resurrection');
 }finally{c.destroy();}
},{authentication:false});
const differences=[{name:'idempotent close already closed result',scenarios:['exhaust','cancel'],upstream:'ErrClosed',local:'successful idempotent close',scope:'Existing Node close contract is preserved; enabled flags and cancellation stage results match after final StateClosed.'},{name:'usable new channel after exhaustion',scenarios:['retry'],upstream:'Reconnect returns nil but new Channel panics on a cleared channel registry',local:'Reconnect creates a usable connection and new channels',scope:'Native panic was caught by the adapter; separately counted as a local improvement, never as full outcome parity.'},{name:'active consumer retained during explicit live replay',scenarios:['active-consumer'],upstream:'duplicate consumer tag closes channel and leaves a skipped consumer',local:'retains active subscription and delivers confirmed publication',scope:'Additional broker-only comparison; not included in matching outcome counts.'}];
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/recovery-control-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerQueryMatches:7,brokerQueryMatches:7,peerOutcomeMatches:4,brokerOutcomeMatches:4,explicitDifferences:differences.length,localPassed:localTests.length,peerComparisons,brokerComparisons,activeConsumerComparison,differences,localTests,packages,sources,scope:'Seven full query/cancellation stage comparisons on independent peer and real broker; four complete outcome matches on each. Three difference categories include an additional broker-only active-consumer case. Three local real recovery checks; cancellation compared after final StateClosed, not racy Close return. No complete recovery strategy, scheduling or performance equivalence.'},null,2)+'\n');console.log('7 native/7 broker query sequences matched; 4 complete outcomes each; 3 explicit differences; 3 local recovery cases passed');
