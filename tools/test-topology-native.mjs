import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect} from './client.mjs';
import {fixture,delay} from './recovery-peer.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_TOPOLOGY_REFERENCE;assert(executable,'Set AMQP_TOPOLOGY_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/topology-reference-build.json',import.meta.url)));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./topology-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/recovery-peer.mjs','tools/topology-reference.go','tools/test-topology-native.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','evidence/topology-reference-build.json','web/engine.mjs']);
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let output='',diagnostic='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),12000);child.stdin.end(JSON.stringify(request));try{const [code]=await exited;assert.equal(code,0,diagnostic);return JSON.parse(output);}finally{clearTimeout(timer);}}
function canonical(value){if(Array.isArray(value)){const rows=value.map(canonical);return rows.every(r=>r&&typeof r==='object'&&Object.hasOwn(r,'key'))?rows.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))):rows;}if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));return value;}
const queries=c=>({recoveryEnabled:c.recoveryEnabled,connectionRecoveryEnabled:c.connectionRecoveryEnabled,topologyRecoveryEnabled:c.topologyRecoveryEnabled,maxRetryCount:c.maxRetryCount,retryInterval:c.retryInterval});
async function node(request){
 const c=await connect(request.URI,{allowInsecureAuth:true,timeout:5000,channelMax:64,recovery:request.Mode==='off'?false:{maxRetries:3,retryDelay:5,retryJitter:0,topology:request.Mode}});const stages=[];
 try{
  const a=await c.openChannel(),b=await c.openChannel();const record=name=>stages.push({name,queries:queries(c),a:a.topologyConfiguration(),b:b.topologyConfiguration(),globalA:a.topologyConfiguration(true),globalB:b.topologyConfiguration(true)});record('initial');
  if(request.Scenario==='close'){await a.declareQueue('idle',{autoDelete:true});record('declared');await a.close();record('channel-closed');}
  else{
   await a.qos(2);await b.qos(4,true);const nested={label:'original',nested:{enabled:true}};
   await a.declareExchange('source','direct',{arguments:nested});await b.declareExchange('destination');await a.declareQueue('qa');await b.declareQueue('qb');await a.bindQueue('qa','source','key',{kind:1});await b.bindQueue('qb','destination','key');await b.bindExchange('destination','source','bridge',{flag:true});record('declared');
   if(request.Scenario==='duplicates'){await b.declareExchange('source','direct',{arguments:nested});await b.declareQueue('qa');await b.bindQueue('qa','source','key',{kind:1});await a.bindExchange('destination','source','bridge',{flag:true});record('duplicates');await a.close();record('channel-closed');}
   if(request.Scenario==='mutations'){await b.unbindQueue('qa','source','key',{kind:1});await b.deleteExchange('source');await b.deleteQueue('qa');record('deleted');}
   if(request.Scenario==='clone'){const view=a.topologyConfiguration(),clone=structuredClone(view);view.exchanges.source.args.nested.enabled=false;stages.push({name:'clone-alias',snapshot:clone,internal:a.topologyConfiguration()});}
  }
  await c.close();record('connection-closed');return {stages};
 }finally{c.destroy();}
}
const cases=[['all','basic'],['transient','basic'],['none','basic'],['off','basic'],['all','duplicates'],['all','mutations'],['all','close']];
const peerComparisons=[],brokerComparisons=[],differences=[],localTests=[];let packages;
for(const [mode,scenario] of cases)await fixture({heartbeat:1},async({opts})=>{
 const request={URI:`amqp://demo:test@${opts.host}:${opts.port}/?heartbeat=1`,Mode:mode,Scenario:scenario};
 const reference=await native(request),actual=await node(request);assert.deepEqual(canonical(actual),canonical(reference),mode+'/'+scenario);peerComparisons.push({mode,scenario,stages:actual.stages});console.log('MATCH topology peer '+mode+'/'+scenario);
});
await fixture({},async({opts})=>{
 const request={URI:`amqp://demo:test@${opts.host}:${opts.port}/?heartbeat=0`,Mode:'all',Scenario:'clone'},reference=await native(request),actual=await node(request);
 const upstream=reference.stages.find(s=>s.name==='clone-alias'),local=actual.stages.find(s=>s.name==='clone-alias');assert.equal(upstream.internal.exchanges.source.args.nested.enabled,false);assert.equal(upstream.snapshot.exchanges.source.args.nested.enabled,false);assert.equal(local.internal.exchanges.source.args.nested.enabled,true);assert.equal(local.snapshot.exchanges.source.args.nested.enabled,true);
 differences.push({name:'nested argument alias in upstream Clone',upstream:{queryMutationChangesInternal:true,queryMutationChangesClone:true},local:{queryMutationChangesInternal:false,queryMutationChangesClone:false},scope:'Pinned upstream copies structs/maps/slices but retains nested Args aliases; local queries and structuredClone preserve independent data.'});
});
await withRabbit(async info=>{
 packages=info.packages;const uri=`amqp://demo:test-only@127.0.0.1:${info.port}/?heartbeat=1`;
 for(const [mode,scenario] of cases){const request={URI:uri,Mode:mode,Scenario:scenario};const reference=await native(request),actual=await node(request);assert.deepEqual(canonical(actual),canonical(reference),mode+'/'+scenario);brokerComparisons.push({mode,scenario,stages:actual.stages});console.log('MATCH topology broker '+mode+'/'+scenario);}
 const admin=await connect(uri,{allowInsecureAuth:true,timeout:5000});
 try{const ch=await admin.openChannel();for(const q of ['qa','qb','idle'])await ch.deleteQueue(q);for(const e of ['source','destination'])await ch.deleteExchange(e);await admin.close();}finally{admin.destroy();}
 const proxy=await proxyTo(info.port);let c;
 try{
  c=await connect(`amqp://demo:test-only@127.0.0.1:${proxy.port}/?heartbeat=1`,{allowInsecureAuth:true,timeout:5000,recovery:{maxRetries:3,retryDelay:10,retryJitter:0}});
  const a=await c.openChannel(),b=await c.openChannel();await a.declareExchange('topology-live','direct',{autoDelete:true});await a.qos(2);await b.qos(3);const {queue}=await a.declareQueue('',{exclusive:true,autoDelete:true});await b.bindQueue(queue,'topology-live','key');await b.confirmSelect();
  const before=a.topologyConfiguration(true),recovered=once(c,'recovered',{signal:AbortSignal.timeout(12000)});proxy.cut();await recovered;const current=c.resolveQueue(queue),after=b.topologyConfiguration(true);assert.notEqual(current,queue);assert.equal(after.queues[current].declaredName,'');assert.equal(after.bindings[0].queue,current);assert.equal(after.qos.prefetchCount,3);assert.equal(a.topologyConfiguration(true).qos.prefetchCount,2);assert(before.queues[queue]);assert.equal(before.queues[current],undefined);
  await b.publish('topology-live','key','query recovery');assert.equal((await b.get(queue,{noAck:true})).body.toString(),'query recovery');localTests.push('actual broker-generated name and cross-channel binding snapshots update across connection recovery with confirmed route/get');
  // A channel-only failure must preserve both recorded owners of shared entities.
  await a.declareQueue('topology-shared',{autoDelete:true});await b.declareQueue('topology-shared',{autoDelete:true});const channelRecovered=once(a,'recovered',{signal:AbortSignal.timeout(12000)});await assert.rejects(a.get('topology-missing'));await channelRecovered;assert(a.topologyConfiguration().queues['topology-shared']);assert(b.topologyConfiguration().queues['topology-shared']);assert.equal(c.connectionInfo.generation,2);localTests.push('single-channel recovery retains duplicate ownership without replacing physical connection');
  await a.close();assert.equal(c.topologyConfiguration().queues[current],undefined);assert(b.topologyConfiguration().queues['topology-shared']);await b.deleteQueue('topology-shared');const final=b.topologyConfiguration(true),saved=structuredClone(final);await c.close();assert.deepEqual(b.topologyConfiguration(true),{qos:null,exchanges:{},queues:{},bindings:[],exchangeBindings:[]});assert.deepEqual(final,saved);assert.equal(c.recoveryEnabled,false);localTests.push('explicit channel removal preserves sibling declarations and connection close clears live views while saved snapshots remain independent');
 }finally{c?.destroy();await proxy.close();}
},{authentication:false});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/topology-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerMatches:peerComparisons.length,brokerMatches:brokerComparisons.length,localPassed:localTests.length,explicitDifferences:differences.length,peerComparisons,brokerComparisons,localTests,differences,packages,sources,scope:'Seven complete per-stage native query comparisons against independent peer and seven against RabbitMQ, including enabled flags, local/global ownership, QoS and close behavior. Three additional real recovery checks use the local API. Upstream nested Args alias is recorded separately; no complete recovery scheduling/strategy or performance parity claim.'},null,2)+'\n');console.log(`${peerComparisons.length} native topology results and ${brokerComparisons.length} broker results matched; ${localTests.length} local recovery cases passed; ${differences.length} explicit difference`);
