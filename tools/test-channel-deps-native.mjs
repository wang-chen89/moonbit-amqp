import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_CHANNEL_DEPS_REFERENCE;assert(executable,'Set AMQP_CHANNEL_DEPS_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/channel-deps-reference-build.json',import.meta.url)));
assert.equal(digest(executable),build.binarySha256);
const sources=sourceSnapshot(['tools/channel-deps-reference.go','tools/test-channel-deps-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','tools/client.mjs','web/engine.mjs','evidence/rabbitmq-channel-deps.json','evidence/channel-deps-reference-build.json']);
const options=port=>({host:'127.0.0.1',port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:3000});
async function probe(c,kind,name){const ch=await c.openChannel();try{const value=kind==='queue'?await ch.declareQueue(name,{passive:true}):await ch.declareExchange(name,'direct',{passive:true});return {code:0,consumers:value['consumer-count']??0};}catch(error){assert.equal(error.code,404);return {code:404,consumers:0};}finally{if(!ch.closed)await ch.close();}}
const results=[];
await withRabbit(async info=>{
 for(const queueOwner of [0,1]){
  const prefix=randomUUID()+'-',proxy=await proxyTo(info.port),admin=await connect(options(info.port)),child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});
  const exited=once(child,'exit'),deadline=setTimeout(()=>child.kill(),20000),rows=[];let diagnostic='',observed,completed=false;
  child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});
  async function inspect(){
   if(completed)return;completed=true;
   let queue;
   const until=Date.now()+5000;
   do{queue=await probe(admin,'queue',prefix+'q');if(queueOwner===0&&queue.code===404||queueOwner===1&&queue.code===0&&queue.consumers===1)break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<until);
   assert.equal(queue.code,queueOwner===0?404:0);if(queueOwner===1)assert.equal(queue.consumers,1);
   observed={queue,outer:await probe(admin,'exchange',prefix+'outer'),inner:await probe(admin,'exchange',prefix+'inner'),sibling:await probe(admin,'queue',prefix+'sibling')};
   assert.equal(observed.outer.code,404);assert.equal(observed.inner.code,404);assert.equal(observed.sibling.code,0);child.stdin.end('"done"\n');
  }
  try{
   child.stdin.write(JSON.stringify({port:proxy.port,queueOwner,prefix})+'\n');
   for await(const line of createInterface({input:child.stdout})){
    const row=JSON.parse(line);rows.push(row);
    if(queueOwner===0&&row.stage==='entity-error'){assert.equal(row.type,'consumer');assert.equal(row.code,404);await inspect();}
    else if(queueOwner===1&&row.stage==='channel-error')await inspect();
   }
   const [code]=await exited;assert.equal(code,0,diagnostic);assert(observed);assert.equal(proxy.accepted,1);const done=rows.find(r=>r.stage==='done');assert(done.connectionOpen&&done.siblingOpen);
   const current=JSON.parse(fs.readFileSync(new URL('../evidence/rabbitmq-channel-deps.json',import.meta.url))),node=current.observations[queueOwner];assert.equal(node.queueOwner,queueOwner);assert(node.confirmedDelivery&&node.sameConnection&&node.siblingUnchanged);
   results.push({queueOwner,reference:observed,referenceEvents:rows,node,nodeImprovement:true,matched:false,explanation:queueOwner===0?'Pinned Go skips sibling-owned declarations and consumer recovery fails with 404; Node restores the registered dependency component.':'Pinned Go recreates its own queue and consumer but omits sibling-owned deleted exchanges/bindings; Node restores routed delivery.'});console.log('OBSERVED native boundary queue owner '+queueOwner);
  }finally{clearTimeout(deadline);if(child.exitCode===null)child.kill();admin.destroy();await proxy.close();}
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/channel-deps-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),cases:results.length,matched:0,explainedImprovements:results.length,results,commit:build.commit,binarySha256:build.binarySha256,brokerPackages:info.packages,sources,scope:'Two real single-channel recovery boundary comparisons. Explicit improvements over pinned Go behavior, not matching-conformance cases or a claim of full upstream parity.'},null,2)+'\n');
});
console.log(`${results.length} native channel dependency boundaries verified as explicit improvements`);
