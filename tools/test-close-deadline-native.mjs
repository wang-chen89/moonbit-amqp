import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect} from './client.mjs';
import {fixture} from './recovery-peer.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {withholdCloseReply} from './close-deadline-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_CLOSE_DEADLINE_REFERENCE;assert(executable,'Set AMQP_CLOSE_DEADLINE_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/close-deadline-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./close-deadline-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/close-deadline.mjs','tools/outbound.mjs','tools/recovery-peer.mjs','tools/close-deadline-peer.mjs','tools/close-deadline-reference.go','tools/test-close-deadline-native.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','evidence/close-deadline-reference-build.json','web/engine.mjs']);
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let output='',diagnostic='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});const ended=once(child,'close'),timer=setTimeout(()=>child.kill(),14000);child.stdin.end(JSON.stringify(request));try{const [code]=await ended;assert.equal(code,0,diagnostic);return JSON.parse(output);}finally{clearTimeout(timer);}}
function kind(error){if(!error)return 'ok';if(error.code==='AMQP_CONNECTION_CLOSED')return 'closed';if(error.timeout||/timeout|deadline/i.test(error.message))return 'timeout';return 'error';}
async function node(r){
 let stream,calls=0,settled=false,signalDial,late;const started=new Promise(resolve=>signalDial=resolve);
 const dial=(_network,_address,ctx)=>{if(++calls>1&&r.Scenario==='recovery-cancel'){signalDial();return late=(async()=>{await new Promise(resolve=>setTimeout(resolve,350));settled=true;throw Error('injected delayed dial failure');})();}return stream=net.connect({host:ctx.host,port:ctx.port});};
 const c=await connect(r.URI,{allowInsecureAuth:true,heartbeat:0,timeout:3000,dial,recovery:r.Scenario.startsWith('recovery-')?{maxRetries:2,retryDelay:1,retryJitter:0}:false,...(r.Certificate?{tls:{ca:r.Certificate,servername:'localhost'}}:{})});
 try{
  const ch=await c.openChannel(),closeErrors=[];let connectionCancelled=false,channelCancelled=false,noticesClosed=false;
  c.notifyRecoveryCancel().then(()=>connectionCancelled=true);ch.notifyRecoveryCancel().then(()=>channelCancelled=true);c.on('close',error=>{noticesClosed=true;if(error?.code!==200&&error?.message!=='Connection closed by application')closeErrors.push({code:error?.code??null,kind:kind(error)});});
  let confirmation;if(r.Scenario==='unconfirmed'){await ch.confirmSelect();confirmation=await ch.publishWithDeferredConfirm('','deadline-held','before deadline close');}
  if(r.Scenario==='already')await c.close();
  if(r.Scenario==='recovery-cancel'){stream.destroy();await started;}
  const deadline=r.Scenario==='zero'?null:Date.now()+r.Milliseconds,start=performance.now();let failure;
  try{await c.closeDeadline(deadline);}catch(error){failure=error;}
  const elapsedMS=performance.now()-start,dialSettledAtReturn=settled;await Promise.resolve();
  const out={result:kind(failure),closed:c.closed,channelClosed:ch.closed,connectionCancelled,channelCancelled,recoveryEnabled:c.recoveryEnabled,closeErrors,noticesClosed,elapsedMS};
  if(r.Scenario==='recovery-cancel')out.dialSettledAtReturn=dialSettledAtReturn;
  if(confirmation){out.confirmationDone=confirmation.completed;out.confirmationAcked=confirmation.acked;}
  return out;
 }finally{c.destroy();if(late)await Promise.allSettled([late]);}
}
const fields=['result','closed','channelClosed','connectionCancelled','channelCancelled','recoveryEnabled'];
function compare(name,reference,actual){assert.deepEqual(Object.fromEntries(fields.map(k=>[k,actual[k]])),Object.fromEntries(fields.map(k=>[k,reference[k]])),name);return {name,reference,actual,matchedFields:fields};}
const peers=[],brokers=[],localTests=[];let packages;
const cases=[['success',800],['zero',0],['timeout',80],['expired',-10],['already',800],['recovery-timeout',80],['recovery-cancel',50],['unconfirmed',800],['eof',800]];
for(const [Scenario,Milliseconds] of cases)await fixture({onMethod(e,s){if(e.cls===10&&e.id===50){if(Scenario.includes('timeout'))return true;if(Scenario==='eof'){s.destroy();return true;}}}},async({opts,state})=>{
 const r={URI:`amqp://demo:test@${opts.host}:${opts.port}/?heartbeat=0`,Scenario,Milliseconds},reference=await native(r),actual=await node(r);peers.push(compare(Scenario,reference,actual));
 if(Scenario==='recovery-cancel'){assert.equal(reference.dialSettledAtReturn,true);assert.equal(actual.dialSettledAtReturn,false);assert(reference.elapsedMS>=300);}
 if(Scenario==='expired'){assert.equal(reference.closeErrors.length,0);assert.equal(actual.closeErrors.length,1);}
 if(Scenario==='unconfirmed'){assert.equal(reference.confirmationDone,true);assert.equal(actual.confirmationDone,true);assert.equal(reference.confirmationAcked,false);assert.equal(actual.confirmationAcked,false);assert.equal(state.messages.length,2);assert(state.messages.every(m=>m.body.toString()==='before deadline close'));}
 console.log('MATCH close deadline peer '+Scenario);
});
await withRabbit(async info=>{
 packages=info.packages;const URI=`amqp://demo:test-only@127.0.0.1:${info.port}/?heartbeat=0`;
 for(const [Scenario,Milliseconds] of cases.filter(([s])=>!['timeout','recovery-timeout','unconfirmed','eof'].includes(s))){const r={URI,Scenario,Milliseconds};brokers.push(compare(Scenario,await native(r),await node(r)));console.log('MATCH close deadline broker '+Scenario);}
 const proxy=await withholdCloseReply(info.port);try{for(const Scenario of ['timeout','recovery-timeout']){const r={URI:`amqp://demo:test-only@127.0.0.1:${proxy.port}/?heartbeat=0`,Scenario,Milliseconds:80};brokers.push(compare(Scenario,await native(r),await node(r)));}assert.equal(proxy.closeRequests,4);}finally{await proxy.close();}
 for(const Scenario of ['success','zero','expired','recovery-success']){const r={URI:`amqps://demo:test-only@localhost:${info.tlsPort}/?heartbeat=0`,Certificate:Buffer.from(info.certificate,'base64').toString(),Scenario,Milliseconds:Scenario==='expired'?-10:1000};brokers.push(compare('TLS '+Scenario,await native(r),await node(r)));console.log('MATCH close deadline broker TLS '+Scenario);}
 const c=await connect(URI,{allowInsecureAuth:true,timeout:3000,recovery:{maxRetries:2,retryDelay:1,retryJitter:0}});
 try{const ch=await c.openChannel();await ch.declareQueue('deadline-delivery',{exclusive:true});await ch.confirmSelect();await ch.publish('','deadline-delivery','confirmed before close');assert.equal((await ch.get('deadline-delivery',{noAck:true})).body.toString(),'confirmed before close');const cn=c.notifyRecoveryCancel();await c.closeDeadline(new Date(Date.now()+1000));await cn;assert(c.closed&&ch.closed);await assert.rejects(c.reconnect());localTests.push('confirmed broker delivery/get followed by deadline close terminates logical channels and prevents reconnect');}finally{c.destroy();}
},{authentication:false});
const differences=[{name:'close notification API and timeout details',upstream:'Go NotifyClose channel closes; expired write-side deadline produced no error notification; read-side timeout produced AMQP frame-error 501 in observed runs.',local:'Node close event always reports its terminal error, including an expired deadline. Deadline error has code AMQP_CLOSE_DEADLINE and timeout=true.',scope:'Notification payload/Go channel scheduling are not counted as matched resource/result fields; raw observations retained.'},{name:'closing while a custom redial is still pending',upstream:'CloseDeadline waits for the in-flight custom dial to finish; 50 ms deadline does not bound the observed 350 ms wait.',local:'Abort-aware transport lifetime settles shutdown before the ignored factory promise; a late stream is still disposed.',scope:'Matched final result/cleanup fields; blocking and timing behavior explicitly differs.'}];
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/close-deadline-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerResourceResultMatches:peers.length,brokerResourceResultMatches:brokers.length,explicitDifferences:differences.length,localPassed:localTests.length,peers,brokers,differences,localTests,packages,sources,scope:'Compare result category, closed resources, cancellation and recovery-disabled state; raw errors/notifications and elapsed time retained separately. Real RabbitMQ includes withheld close replies and TLS. No full Go notification/deadline scheduling or performance parity claim.'},null,2)+'\n');console.log(`${peers.length} native peer and ${brokers.length} broker close resource/results matched; ${differences.length} explicit differences; ${localTests.length} local delivery scenario passed`);
