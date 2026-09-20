import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect} from './client.mjs';
import {fixture} from './recovery-peer.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_TOPOLOGY_STRATEGY_REFERENCE;assert(executable,'Set AMQP_TOPOLOGY_STRATEGY_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/topology-strategy-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./topology-strategy-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/topology-strategy.mjs','tools/recovery-peer.mjs','tools/topology-strategy-reference.go','tools/test-topology-strategy-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/topology-strategy-reference-build.json','web/engine.mjs']);
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(10000)});
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let out='',err='';child.stdout.on('data',b=>out+=b);child.stderr.on('data',b=>err+=b);child.stdin.on('error',()=>{});const ended=once(child,'close'),timer=setTimeout(()=>child.kill(),16000);child.stdin.end(JSON.stringify(request));try{const [code]=await ended;assert.equal(code,0,err);return JSON.parse(out);}finally{clearTimeout(timer);}}
async function node(r){
 let calls=0,dials=0,stream;const channelCounts=[];
 const strategy={async recoverTopology(ctx){calls++;channelCounts.push(ctx.channels.length);switch(r.Scenario){
  case 'replace':return;
  case 'dynamic':return void await ctx.channels[0].declareQueue('strategy-dynamic',{exclusive:true});
  case 'no-channels':return void await ctx.withChannel(ch=>ch.declareQueue('strategy-dynamic',{exclusive:true}));
  case 'skipped':return [{type:'queue',name:'policy-omitted',channel:1,error:Error('policy skip')}];
  case 'exhaust':case 'channel-fail':throw Error('strategy fatal');
  case 'retry':if(calls===1)throw Error('retry strategy');
 }return ctx.restoreDefault();}};
 const options={allowInsecureAuth:true,heartbeat:0,timeout:3000,...(r.Certificate?{tls:{ca:r.Certificate,servername:'localhost'}}:{})};
 const c=await connect(r.URI,{...options,dial(_n,_a,ctx){dials++;return stream=net.connect({host:ctx.host,port:ctx.port});},recovery:{maxRetries:2,retryDelay:1,retryJitter:0,topology:r.Scenario==='disabled'?'none':'all',topologyRecovery:strategy}});
 try{
  let ch;if(r.Scenario!=='no-channels'){ch=await c.openChannel();await ch.declareQueue('strategy-tracked',{exclusive:true});}
  let result='ok',skipped=[],rawError;
  if(['channel','channel-fail'].includes(r.Scenario)){await c.openChannel();try{await ch.reconnect();}catch(e){result='error';rawError=e.message;}}
  else{const wait=event(c,r.Scenario==='exhaust'?'close':'recovered');stream.destroy();const [value]=await wait;if(r.Scenario==='exhaust'){result='error';rawError=value.message;}else skipped=value.skipped.map(e=>e.name);}
  const records=c.topologyConfiguration().queues;
  const out={result,calls,channelCounts,dials,closed:c.closed,channelClosed:ch?.closed??false,skipped,trackedRecorded:Boolean(records['strategy-tracked']),dynamicRecorded:Boolean(records['strategy-dynamic'])};if(rawError)out.rawError=rawError;
  if(r.Broker&&!['exhaust','channel-fail'].includes(r.Scenario)){
   const present=async name=>{const probe=await connect(r.URI,options);try{const p=await probe.openChannel();try{await p.declareQueue(name,{passive:true});return true;}catch(e){if(e.code===404)return false;if(e.code===405)return true;throw e;}}finally{await probe.close();}};
   out.trackedExists=await present('strategy-tracked');out.dynamicExists=await present('strategy-dynamic');
  }return out;
 }finally{c.destroy();}
}
const peers=[],brokers=[],differences=[],localTests=[],fields=['result','calls','channelCounts','dials','closed','channelClosed','skipped','trackedRecorded','dynamicRecorded'];let packages;
function compare(name,reference,actual){const keys=[...fields,...('trackedExists' in reference?['trackedExists','dynamicExists']:[])];assert.deepEqual(Object.fromEntries(keys.map(k=>[k,actual[k]])),Object.fromEntries(keys.map(k=>[k,reference[k]])),name);return {name,reference,actual,matchedFields:keys};}
const scenarios=['delegate','replace','dynamic','retry','exhaust','disabled','channel','skipped','no-channels','channel-fail'];
for(const Scenario of scenarios)await fixture({},async({opts})=>{
 const r={URI:`amqp://demo:test@${opts.host}:${opts.port}/?heartbeat=0`,Scenario},reference=await native(r),actual=await node(r);
 if(Scenario==='channel-fail'){assert.equal(reference.calls,1);assert.equal(reference.channelClosed,false);}
 peers.push(compare(Scenario,reference,actual));console.log('MATCH topology strategy peer '+Scenario);
});
await withRabbit(async info=>{
 packages=info.packages;const URI=`amqp://demo:test-only@127.0.0.1:${info.port}/?heartbeat=0`;
 for(const Scenario of scenarios){const r={URI,Scenario,Broker:true};brokers.push(compare(Scenario,await native(r),await node(r)));console.log('MATCH topology strategy broker '+Scenario);}
 for(const Scenario of ['delegate','retry']){const r={URI:`amqps://demo:test-only@localhost:${info.tlsPort}/?heartbeat=0`,Scenario,Broker:true,Certificate:Buffer.from(info.certificate,'base64').toString()};brokers.push(compare('TLS '+Scenario,await native(r),await node(r)));}
 let raw,calls=0;const contexts=[];
 const c=await connect(URI,{allowInsecureAuth:true,timeout:3000,dial(_n,_a,x){return raw=net.connect({host:x.host,port:x.port});},recovery:{maxRetries:2,retryDelay:1,retryJitter:0,topologyRecovery:{async recoverTopology(ctx){calls++;contexts.push(ctx);return ctx.restoreDefault();}}}});
 try{const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();const messages=[];await ch.consume(queue,m=>messages.push(m.body.toString()),{consumerTag:'strategy-delivery',noAck:true});for(let i=0;i<2;i++){const ready=event(c,'recovered');raw.destroy();await ready;await ch.publish('',c.resolveQueue(queue),'round-'+i);for(let j=0;messages.length<=i&&j<100;j++)await new Promise(r=>setTimeout(r,10));}assert.deepEqual(messages,['round-0','round-1']);assert.equal(calls,2);assert(contexts.every(x=>x.signal.aborted));localTests.push('two real reconnects delegate default restoration and deliver confirmed messages through the original logical subscription');}finally{c.destroy();}
},{authentication:false});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/topology-strategy-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerMatches:peers.length,brokerMatches:brokers.length,explicitDifferences:differences.length,localPassed:localTests.length,peers,brokers,differences,localTests,packages,sources,scope:'Custom topology invocation counts/channel scopes, replacement/delegation/retry/skip outcomes; broker existence verified independently through passive probes, including TLS. Explicit channel fatal errors return after one pass and preserve the opened channel. Revocable asynchronous contexts are a local API contract, not Go scheduling equivalence.'},null,2)+'\n');console.log(`${peers.length} native strategy peer and ${brokers.length} broker outcomes matched; ${differences.length} explicit difference; ${localTests.length} local delivery scenario passed`);
