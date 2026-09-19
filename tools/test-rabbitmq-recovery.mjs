import assert from 'node:assert/strict';
import {once} from 'node:events';
import {randomUUID} from 'node:crypto';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import fs from 'node:fs';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
const sources=sourceSnapshot(['authentication.mbt','cmd/web/authentication.mbt','tools/authentication.mjs','tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/rabbitmq-harness.mjs','tools/test-rabbitmq-recovery.mjs','tools/rabbitmq-reference.py','web/engine.mjs']);
const tests=[],observations=[],recoveryLatenciesMs=[],config={host:'127.0.0.1',username:'demo',password:'test-only',allowInsecureAuth:true,heartbeat:2,timeout:3000,recovery:{retryDelay:40,retryJitter:0,maxRetries:5,onTopologyError:()=>false}};
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(10000)});
async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
class Inbox {
 values=[];waiting=[];
 push(message){if(!message)return;const next=this.waiting.shift();if(next)next(message);else this.values.push(message);}
 take(){if(this.values.length)return Promise.resolve(this.values.shift());return new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Consumer delivery timed out')),5000);this.waiting.push(value=>{clearTimeout(timer);resolve(value);});});}
}
await withRabbit(async info=>{
 const proxy=await proxyTo(info.port),connections=[];
 const open=async options=>{const c=await connect({...config,port:proxy.port,...options});connections.push(c);return c;};
 const recover=async c=>{const ready=event(c,'recovered'),start=performance.now();proxy.cut();await ready;recoveryLatenciesMs.push(performance.now()-start);};
 try {
  await test('real TCP reconnect restores cross-channel exchanges, exchange binding, server-named queue, queue binding, QoS and consumer',async()=>{
   const c=await open(),a=await c.openChannel(),b=await c.openChannel(),inbox=new Inbox(),id=randomUUID();
   await a.declareExchange('source-'+id,'direct',{autoDelete:true});await a.declareExchange('dest-'+id,'direct',{autoDelete:true});
   await a.bindExchange('dest-'+id,'source-'+id,'key');
   const {queue}=await b.declareQueue('',{exclusive:true,autoDelete:true});await b.bindQueue(queue,'dest-'+id,'key');
   await b.qos(1);await b.consume(queue,m=>inbox.push(m),{consumerTag:'stable'});await a.confirmSelect();
   const names=[];c.on('queueNameChanged',x=>names.push(x));
   for(let epoch=0;epoch<3;epoch++){
    if(epoch){await recover(c);assert.equal(names.length,epoch);observations.push({stage:'recovered',cycle:epoch,renamed:true});}
    await a.publish('source-'+id,'key',Buffer.from('payload-'+epoch),{mandatory:true});
    const m=await inbox.take();assert.equal(m.body.toString(),'payload-'+epoch);b.ack(m.args['delivery-tag']);
    observations.push({stage:'cycle',cycle:epoch,body:m.body.toString(),confirmed:true});
   }
   assert.equal(names.length,2);assert.notEqual(c.resolveQueue(queue),queue);
   await c.close();
  });
  await test('unacknowledged named-queue message is redelivered and old delivery tag is rejected',async()=>{
   const c=await open(),a=await c.openChannel(),b=await c.openChannel(),inbox=new Inbox(),queue='recovery-'+randomUUID();
   await a.declareQueue(queue);await a.confirmSelect();await b.qos(1);await b.consume(queue,m=>inbox.push(m),{consumerTag:'redelivery'});
   await a.publish('',queue,'retry-body');const old=await inbox.take();await recover(c);
   const redelivered=await inbox.take();assert.equal(redelivered.body.toString(),'retry-body');assert.equal(redelivered.args.redelivered,true);
   assert.throws(()=>b.ack(old.args['delivery-tag']),/Stale/);b.ack(redelivered.args['delivery-tag']);
   await b.cancel('redelivery');await a.deleteQueue(queue);await c.close();
  });
  await test('real 404 channel failure preserves connection and sibling channel while restoring affected channel',async()=>{
   const c=await open(),a=await c.openChannel(),b=await c.openChannel();const {queue}=await b.declareQueue('',{exclusive:true});
   const accepted=proxy.accepted,ready=event(a,'recovered');await assert.rejects(a.get('missing-'+randomUUID()),/404/);
   assert.equal(await b.get(queue),null);await ready;assert.equal(proxy.accepted,accepted);assert.equal(await a.get(queue),null);await c.close();
  });
  await test('transaction recovery starts a new transaction and does not commit pre-disconnect work',async()=>{
   const c=await open(),ch=await c.openChannel(),queue='transaction-'+randomUUID();await ch.declareQueue(queue);await ch.txSelect();
   await ch.publish('',queue,'old-uncommitted');await recover(c);await ch.publish('',queue,'new-committed');await ch.txCommit();
   const m=await ch.get(queue,{noAck:true});assert.equal(m.body.toString(),'new-committed');assert.equal(await ch.get(queue),null);
   await ch.deleteQueue(queue);await c.close();
  });
  await test('closing during broker outage cancels recovery without later reconnect',async()=>{
   const c=await open();await c.openChannel();proxy.blocked=true;
   const reconnecting=event(c,'recovering');proxy.cut();await reconnecting;await c.close();const accepted=proxy.accepted;
   await new Promise(r=>setTimeout(r,150));assert.equal(proxy.accepted,accepted);assert.equal(c.closed,true);proxy.blocked=false;
  });
  await test('TLS recovery repeats peer certificate and hostname validation and restores exclusive queue',async()=>{
   const secureProxy=await proxyTo(info.tlsPort);let c;
   try {
    c=await connect({...config,port:secureProxy.port,allowInsecureAuth:false,tls:{ca:Buffer.from(info.certificate,'base64'),servername:'localhost'}});
    const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();
    const ready=event(c,'recovered');secureProxy.cut();await ready;
    await ch.publish('',queue,'encrypted');const m=await ch.get(queue,{noAck:true});assert.equal(m.body.toString(),'encrypted');await c.close();
   } finally {c?.destroy();await secureProxy.close();}
  });
  assertSourceUnchanged(sources);
  fs.writeFileSync(new URL('../evidence/rabbitmq-recovery.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,platform:process.platform,broker:'RabbitMQ 4.0.5-10ubuntu5 / Erlang OTP 27',packages:info.packages,passed:tests.length,tests,observations,recoveryLatenciesMs,performanceScope:'Single-process local recovery observations, not throughput or sustained production performance evidence.',sources},null,2)+'\n');
 } finally {for(const c of connections)c.destroy();await proxy.close();}
});
console.log(`${tests.length} real RabbitMQ recovery groups passed`);
