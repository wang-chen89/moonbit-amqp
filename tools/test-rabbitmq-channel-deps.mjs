import assert from 'node:assert/strict';
import {once} from 'node:events';
import {randomUUID} from 'node:crypto';
import fs from 'node:fs';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/test-rabbitmq-channel-deps.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','web/engine.mjs']);
const event=(t,n)=>once(t,n,{signal:AbortSignal.timeout(12000)});
function recovered(ch){return new Promise((resolve,reject)=>{const timer=setTimeout(()=>finish(Error('Channel recovery timeout')),12000);const finish=error=>{clearTimeout(timer);ch.off('recovered',ok);ch.off('close',finish);error?reject(error):resolve();};const ok=()=>finish();ch.once('recovered',ok);ch.once('close',finish);});}
class Inbox{values=[];waiting=[];push=m=>{if(!m)return;const next=this.waiting.shift();if(next)next(m);else this.values.push(m);};take(){if(this.values.length)return Promise.resolve(this.values.shift());return new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Delivery timeout')),4000);this.waiting.push(m=>{clearTimeout(timer);resolve(m);});});}}
const tests=[],observations=[];
await withRabbit(async info=>{
 async function run(name,{queueOwner=0,mode='all',shared=false,generated=false,parallel=false}={}){
  const proxy=await proxyTo(info.port),c=await connect({host:'127.0.0.1',port:proxy.port,username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:3000,recovery:{maxRetries:3,retryDelay:40,retryJitter:0,topology:mode,onTopologyError:()=>false}});
  const id=randomUUID(),outer='outer-'+id,inner='inner-'+id,a=await c.openChannel(),b=await c.openChannel(),third=parallel?await c.openChannel():undefined,channels=[a,b],box=new Inbox(),siblingBox=new Inbox();
  try{
   await a.declareExchange(outer,'direct',{autoDelete:true});await a.declareExchange(inner,'direct',{autoDelete:true});await a.bindExchange(inner,outer,'key');
   const {queue}=await channels[queueOwner].declareQueue(generated?'':'q-'+id,{autoDelete:true,exclusive:generated});await a.bindQueue(queue,inner,'key');await b.qos(1);await b.consume(queue,box.push,{consumerTag:'target'});
   if(third)await third.consume(queue,()=>{},{consumerTag:'third',noAck:true});
   const {queue:survivor}=await a.declareQueue('',{exclusive:true});await a.qos(1);await a.consume(survivor,siblingBox.push,{consumerTag:'sibling'});await a.confirmSelect();
   await a.publish('',survivor,'held');const held=await siblingBox.take();
   if(shared)await a.consume(queue,()=>{},{consumerTag:'keep',noAck:true});
   const raw=a._raw,generation=a._generation,accepted=proxy.accepted,previous=c.resolveQueue(queue),changes=[];c.on('queueNameChanged',x=>changes.push(x));
   const pending=[recovered(b)];if(third)pending.push(recovered(third));
   // Attach handlers before generating broker errors so retry exhaustion cannot be unhandled.
   const allReady=Promise.all(pending);allReady.catch(()=>{});
   const failures=[b.get('missing-'+id)];if(third)failures.push(third.get('missing-third-'+id));
   for(const result of await Promise.allSettled(failures)){assert.equal(result.status,'rejected');assert.equal(result.reason.code,404);}
   assert.equal(await a.get(survivor),null);await allReady;
   assert.equal(proxy.accepted,accepted);assert.equal(a._raw,raw);assert.equal(a._generation,generation);assert.equal(c.state,'open');
   a.ack(held.args['delivery-tag']);await a.publish('',survivor,'sibling-after');const sibling=await siblingBox.take();assert.equal(sibling.body.toString(),'sibling-after');a.ack(sibling.args['delivery-tag']);
   if(shared)await a.cancel('keep');if(third)await third.cancel('third');
   await a.publish(outer,'key','target-after',{mandatory:true});const m=await box.take();assert.equal(m.body.toString(),'target-after');b.ack(m.args['delivery-tag']);
   if(generated&&shared){assert.equal(c.resolveQueue(queue),previous);assert.equal(changes.length,0);}
   if(generated&&!shared){assert.notEqual(c.resolveQueue(queue),previous);assert.equal(changes.length,1);}
   observations.push({name,mode,queueOwner,shared,generated,parallel,siblingUnchanged:true,sameConnection:true,confirmedDelivery:true,queueRenamed:c.resolveQueue(queue)!==previous});tests.push(name);console.log('PASS '+name);
  }finally{c.destroy();await proxy.close();}
 }
 try{
  await run('consumer channel restores auto-delete queue and routing declared on its sibling');
  await run('owned queue recovery restores bindings and exchanges declared by another channel',{queueOwner:1});
  await run('transient mode restores cross-channel dependencies',{mode:'transient'});
  await run('deleted server-named queue is regenerated once and aliases route through restored exchanges',{generated:true});
  await run('surviving server-named queue and sibling consumer are not replaced',{generated:true,shared:true});
  await run('two concurrent channel failures serialize dependency recovery without duplicate queue regeneration',{generated:true,parallel:true});
  assertSourceUnchanged(sources);
  fs.writeFileSync(new URL('../evidence/rabbitmq-channel-deps.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passed:tests.length,tests,observations,packages:info.packages,sources,scope:'Real channel 404 failures on one TCP connection; cross-channel recorded topology, all/transient modes, generated queues, simultaneous faults, confirmed delivery and untouched sibling delivery tags.'},null,2)+'\n');
 }catch(error){
  fs.writeFileSync(new URL('../evidence/channel-deps-last-failure.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passedBeforeFailure:tests.length,tests,error:error.message,sources},null,2)+'\n');throw error;
 }
});
console.log(`${tests.length} real RabbitMQ channel dependency groups passed`);
