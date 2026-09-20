import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {withRabbit} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_PERFORMANCE_REFERENCE;assert(executable,'Set AMQP_PERFORMANCE_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/performance-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./performance-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/authentication.mjs','tools/inbound.mjs','cmd/web/main.mbt','tools/performance-reference.go','tools/performance-worker.mjs','tools/benchmark-native.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','evidence/performance-reference-build.json','web/engine.mjs']);
const baseline=process.env.AMQP_PERFORMANCE_BASELINE;
const baselineURL=baseline?pathToFileURL(baseline.replaceAll('\\','/')+'/'):null;
const baselinePaths=baseline?['web/engine.mjs',...fs.readdirSync(new URL('tools/',baselineURL)).filter(name=>name.endsWith('.mjs')).map(name=>'tools/'+name)]:[];
const snapshotBaseline=()=>baseline?Object.fromEntries(baselinePaths.map(name=>[name,digest(new URL(name,baselineURL))])):null;
const baselineSources=snapshotBaseline();
const profile=process.env.AMQP_PERFORMANCE_PROFILE,quick=process.env.AMQP_PERFORMANCE_QUICK==='1';
const bounded=process.env.AMQP_PERFORMANCE_SUITE==='bounded';
const repeats=quick?1:bounded?3:5;
const worker=fileURLToPath(new URL('./performance-worker.mjs',import.meta.url));
async function run(kind,request,label){
 const args=kind==='go'?[]:[...(profile&&kind==='node'?['--cpu-prof','--cpu-prof-dir='+profile,'--cpu-prof-name='+label+'.cpuprofile']:[]),worker];
 const child=spawn(kind==='go'?executable:process.execPath,args,{windowsHide:true,env:{...process.env,AMQP_PERFORMANCE_CLIENT:kind==='baseline'?baseline+'/tools/client.mjs':''},stdio:['pipe','pipe','pipe']});
 let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.stdin.on('error',()=>{});
 const done=once(child,'close'),timer=setTimeout(()=>child.kill(),120000);child.stdin.end(JSON.stringify(request));
 try{const [code]=await done;assert.equal(code,0,`${kind} ${label}: ${stderr}`);const result=JSON.parse(stdout);assert.equal(result.measured.Count,request.Count);assert.equal(result.measured.Verified,request.Count);assert.equal(result.warmup.Verified,request.Warmup);assert.equal(result.measured.BatchMS.length,Math.ceil(request.Count/request.Window));return result;}finally{clearTimeout(timer);}
}
const rows=[];let packages;
await withRabbit(async info=>{
 packages=info.packages;
 const cases=bounded?[{tls:false,Bytes:128,Window:1,Receive:'get'},{tls:false,Bytes:65536,Window:32,Receive:'get'},{tls:true,Bytes:4096,Window:32,Receive:'consume'}]:[];
 if(!bounded){
  for(const tls of quick?[false]:[false,true])for(const Bytes of quick?[65536]:[128,4096,65536])for(const Window of quick?[32]:[1,32])cases.push({tls,Bytes,Window,Receive:'get'});
  if(!quick)for(const tls of [false,true])cases.push({tls,Bytes:4096,Window:32,Receive:'consume'});
 }
 for(let round=0;round<repeats;round++)for(const scenario of cases){
  const {tls,Bytes,Window,Receive}=scenario,name=`${tls?'tls':'tcp'}-${Bytes}-${Window}-${Receive}`;
  const request={URI:`${tls?'amqps':'amqp'}://demo:test-only@127.0.0.1:${tls?info.tlsPort:info.port}/?heartbeat=0`,Certificate:tls?Buffer.from(info.certificate,'base64').toString():'',Bytes,Window,Receive,Count:Window===1?128:512,Warmup:Window===1?32:128};
  const kinds=baseline?['go','baseline','node']:['go','node'];
  // Rotate execution order to avoid consistently giving one runtime the first slot.
  const offset=(round+cases.indexOf(scenario))%kinds.length,order=[...kinds.slice(offset),...kinds.slice(0,offset)],results={};
  for(const kind of order)results[kind]=await run(kind,request,`${name}-r${round}`);
  for(const kind of kinds)assert.deepEqual(results[kind].limits,results.go.limits,'negotiated settings differ');
  rows.push({name,round,scenario:{...scenario,Count:request.Count,Warmup:request.Warmup},order,results});
  console.log(`${name} r${round+1}: `+kinds.map(kind=>`${kind} publish ${results[kind].measured.PublishMS.toFixed(1)}ms receive ${results[kind].measured.ReceiveMS.toFixed(1)}ms`).join('; '));
 }
});
assertSourceUnchanged(sources);
assert.deepEqual(snapshotBaseline(),baselineSources,'Baseline changed during measurement');
const median=values=>{values=[...values].sort((a,b)=>a-b);return values[Math.floor(values.length/2)];};
const summary=[...new Set(rows.map(row=>row.name))].map(name=>{
 const group=rows.filter(row=>row.name===name),first=group[0],result={name,scenario:first.scenario,repeats:group.length,runtimes:{}};
 for(const kind of Object.keys(first.results)){
  const publish=group.map(row=>row.results[kind].measured.PublishMS),receive=group.map(row=>row.results[kind].measured.ReceiveMS);
  const batch=group.flatMap(row=>row.results[kind].measured.BatchMS).sort((a,b)=>a-b);
  result.runtimes[kind]={medianPublishMS:median(publish),medianReceiveMS:median(receive),publishMessagesPerSecond:first.scenario.Count*1000/median(publish),receiveMessagesPerSecond:first.scenario.Count*1000/median(receive),minPublishMS:Math.min(...publish),maxPublishMS:Math.max(...publish),medianBatchMS:median(batch),p95BatchMS:batch[Math.ceil(batch.length*.95)-1]};
 }
 result.nodeToGoPublishTime=result.runtimes.node.medianPublishMS/result.runtimes.go.medianPublishMS;
 result.nodeToGoReceiveTime=result.runtimes.node.medianReceiveMS/result.runtimes.go.medianReceiveMS;
 if(baseline){result.nodeToBaselinePublishTime=result.runtimes.node.medianPublishMS/result.runtimes.baseline.medianPublishMS;result.nodeToBaselineReceiveTime=result.runtimes.node.medianReceiveMS/result.runtimes.baseline.medianReceiveMS;}
 return result;
});
const output=process.env.AMQP_PERFORMANCE_OUTPUT??'performance-native.json';assert(/^[a-z0-9-]+\.json$/.test(output));
fs.writeFileSync(new URL('../evidence/'+output,import.meta.url),JSON.stringify({utc:new Date().toISOString(),host:{platform:process.platform,release:os.release(),arch:os.arch(),cpu:os.cpus()[0]?.model,logicalCPUs:os.cpus().length},node:process.version,commit:build.commit,binarySha256:build.binarySha256,baselineCommit:baseline?(process.env.AMQP_PERFORMANCE_BASELINE_COMMIT??'518a96c7e64e3fb2ddb96cf7dc8f38548c1fff07'):null,baselineSources,sources,packages,repeats,suite:bounded?'bounded':quick?'diagnostic':'full',summary,rows,scope:'Same Windows host, sequential fresh client processes, one WSL RabbitMQ with frame_max=8192. Exclusive non-durable classic queues; nonpersistent messages; publisher confirms in fixed batches; auto-ack receive. Warmup and setup excluded; get/consume timings include deterministic body and ordered message-id verification. Consume timing includes registration, excludes cancellation. All publishes acknowledged and all messages verified; final empty get checked. Batch p95 is not per-message latency for window>1. Execution order rotates across the recorded rounds; small local workloads are not a production/cluster/platform performance parity claim.'},null,2)+'\n');
console.log(`Saved ${rows.length} matched-workload measurements in ${output}`);
