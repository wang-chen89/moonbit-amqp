import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_AUTODELETE_REFERENCE;assert(executable,'Set AMQP_AUTODELETE_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/autodelete-reference-build.json',import.meta.url)));
assert.equal(digest(executable),build.binarySha256);
const sources=sourceSnapshot(['tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/client.mjs','tools/autodelete-reference.go','tools/autodelete-scenarios.json','tools/test-autodelete-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/autodelete-reference-build.json','web/engine.mjs']);
const cases=JSON.parse(fs.readFileSync(new URL('./autodelete-scenarios.json',import.meta.url)));
const options=port=>({host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:3000});
const recovery={retryDelay:40,retryJitter:0,maxRetries:5,onTopologyError:()=>false};
const ready=c=>once(c,'recovered',{signal:AbortSignal.timeout(12000)});
function snapshot(c,prefix){const t=c.topology;return {exchanges:[...t.exchanges.keys()].map(n=>n.slice(prefix.length)).sort(),queues:[...t.queues.keys()].map(n=>n.slice(prefix.length)).sort(),bindings:t.bindings.size,exchangeBindings:t.exchangeBindings.size};}
async function probes(info,scenario,prefix){
 const c=await connect(options(info.port)),observed={};
 try {
  for(const step of scenario.steps.filter(s=>['exchange','queue'].includes(s.op))) {
   const ch=await c.openChannel(),key=step.op+':'+step.name;let code=0;
   try {if(step.op==='exchange')await ch.declareExchange(prefix+step.name,step.type??'direct',{passive:true});else await ch.declareQueue(prefix+step.name,{passive:true});}
   catch(error){assert.equal(error.code,404);code=error.code;}
   finally{if(!ch.closed)await ch.close();}
   observed[key]=code;
   const present=(step.op==='exchange'?scenario.expected.exchanges:scenario.expected.queues).includes(step.name);
   assert.equal(code,present?0:404,key);
  }
 } finally{await c.close();}
 return observed;
}
async function nodeCase(info,scenario){
 const prefix=randomUUID()+'-',proxy=await proxyTo(info.port),c=await connect({...options(proxy.port),recovery}),channels=[await c.openChannel(),await c.openChannel()],checkpoints=[];
 const name=n=>prefix+n;
 try {
  await channels[0].declareQueue(name('survivor'));
  for(const s of scenario.steps){const ch=channels[s.channel??0],args=s.args??{};
   switch(s.op){
    case 'exchange':await ch.declareExchange(name(s.name),s.type??'direct',{autoDelete:!!s.auto,arguments:args});break;
    case 'queue':await ch.declareQueue(name(s.name),{autoDelete:!!s.auto,arguments:args});break;
    case 'bind':await ch.bindQueue(name(s.queue),name(s.source),s.key??'',args);break;
    case 'unbind':await ch.unbindQueue(name(s.queue),name(s.source),s.key??'',args);break;
    case 'exchangeBind':await ch.bindExchange(name(s.destination),name(s.source),s.key??'',args);break;
    case 'exchangeUnbind':await ch.unbindExchange(name(s.destination),name(s.source),s.key??'',args);break;
    case 'queueDelete':await ch.deleteQueue(name(s.queue));break;
    case 'exchangeDelete':await ch.deleteExchange(name(s.name));break;
    case 'consume':await ch.consume(name(s.queue),()=>{},{consumerTag:s.tag,noAck:true});break;
    case 'cancel':await ch.cancel(s.tag);break;
    case 'checkpoint':checkpoints.push(snapshot(c,prefix));break;
    default:throw Error('Unknown operation');
   }
  }
  const before=snapshot(c,prefix);assert.deepEqual(before,scenario.expected);
  const recovered=ready(c);proxy.cut();await recovered;
  const ch=channels[0];await ch.confirmSelect();await ch.publish('',name('survivor'),'after-recovery');assert.equal((await ch.get(name('survivor'),{noAck:true})).body.toString(),'after-recovery');
  return {before,after:snapshot(c,prefix),checkpoints,survivor:true,broker:await probes(info,scenario,prefix)};
 } finally{c.destroy();await proxy.close();}
}
async function nativeCase(info,scenario){
 const prefix=randomUUID()+'-',proxy=await proxyTo(info.port),child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});
 const exited=once(child,'exit'),deadline=setTimeout(()=>child.kill(),30000),rows=[];let diagnostic='',broker;
 child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});
 try {
  child.stdin.write(JSON.stringify({port:proxy.port,prefix,steps:scenario.steps})+'\n');
  for await(const line of createInterface({input:child.stdout})){
   const row=JSON.parse(line);rows.push(row);
   if(row.stage==='mutated'){assert.deepEqual(row.topology,scenario.referenceExpected??scenario.expected);proxy.cut();}
   if(row.stage==='recovered'){broker=await probes(info,scenario,prefix);child.stdin.end('"done"\n');}
  }
  const [code]=await exited;assert.equal(code,0,diagnostic);assert.equal(rows.length,2);
  return {before:rows[0].topology,after:rows[1].topology,checkpoints:rows[0].checkpoints,survivor:rows[1].survivor,broker};
 }finally{clearTimeout(deadline);if(child.exitCode===null)child.kill();await proxy.close();}
}
const results=[];
await withRabbit(async info=>{
 for(const scenario of cases){
  const reference=await nativeCase(info,scenario),actual=await nodeCase(info,scenario);
  assert.deepEqual(actual.after,scenario.expected);
  assert.deepEqual(reference.after,scenario.referenceExpected??scenario.expected);
  if(scenario.difference){assert.notDeepEqual(actual,reference);assert.deepEqual(actual.broker,reference.broker);}
  else assert.deepEqual(actual,reference,scenario.name);
  results.push({name:scenario.name,matched:!scenario.difference,difference:scenario.difference,reference,actual});
  console.log((scenario.difference?'OBSERVED difference ':'PASS native/broker ')+scenario.name);
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/autodelete-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),cases:results.length,matched:results.filter(r=>r.matched).length,explainedDifferences:results.filter(r=>!r.matched).length,results,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,sources,scope:'Ten identical operation scenarios in unmodified pinned Go and Node: nine matches, one explicit never-bound no-op unbind bookkeeping difference. Before/after recovery snapshots, intermediate cross-channel checkpoints, confirmed survivor and passive broker probes; not full API conformance.'},null,2)+'\n');
});
console.log(`${results.filter(r=>r.matched).length} native auto-delete recovery scenarios matched; ${results.filter(r=>!r.matched).length} explained bookkeeping difference`);
