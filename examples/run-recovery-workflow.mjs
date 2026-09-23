import assert from 'node:assert/strict';
import {once} from 'node:events';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fixture,method,ack,short,deliver,until} from '../tools/recovery-peer.mjs';

// Fault injection uses the existing hand-written TCP peer, not a RabbitMQ
// emulator or evidence of real-broker deployment. It never opens a public port.
let report;
await fixture({
  onMethod(e,socket){
    if(e.cls===60&&e.id===20){
      socket.write(method(e.ch,60,21,short('worker')));
      deliver(socket,e.ch,1,'worker','unacknowledged consumer job');return true;
    }
  },
  onMessage(message,socket){
    socket.receipt=(socket.receipt??0)+1;
    if(JSON.parse(message.body.toString()).id==='outcome-unknown'){socket.destroy();return;}
    socket.write(ack(message.ch,socket.receipt));
  },
},async({open,state})=>{
  const connection=await open({timeout:2000,recovery:{retryDelay:10,retryJitter:0,maxRetries:3}});
  const publisher=await connection.openChannel(),consumer=await connection.openChannel(),deliveries=[];
  await publisher.declareExchange('jobs','direct');
  const {queue}=await consumer.declareQueue('',{exclusive:true,autoDelete:true});
  await consumer.bindQueue(queue,'jobs','work');await consumer.qos(1);
  await consumer.consume(queue,message=>{if(message)deliveries.push(message);},{consumerTag:'worker'});
  await publisher.confirmSelect();await until(()=>deliveries.length===1);
  const oldTag=deliveries[0].args['delivery-tag'];
  await publisher.publish('jobs','work',JSON.stringify({id:'confirmed-before',task:'generate-report'}));
  const recovered=once(connection,'recovered',{signal:AbortSignal.timeout(6000)});
  const unknown=await publisher.publish('jobs','work',JSON.stringify({id:'outcome-unknown',task:'generate-report'})).then(()=>undefined,error=>error);
  assert.ok(unknown instanceof Error);await recovered;await until(()=>deliveries.length===2);
  assert.equal(state.messages.length,2,'recovery must not automatically replay publications');
  const restoredQueue=connection.resolveQueue(queue);assert.notEqual(restoredQueue,queue);
  assert.throws(()=>consumer.ack(oldTag),/Stale/);
  const freshTag=deliveries[1].args['delivery-tag'];consumer.ack(freshTag);
  await until(()=>state.methods.some(e=>e.peer===2&&e.cls===60&&e.id===80));
  const acknowledgements=state.methods.filter(e=>e.peer===2&&e.cls===60&&e.id===80);
  assert.equal(acknowledgements.length,1);assert.equal(acknowledgements[0].args.readBigUInt64BE(0),1n);
  await publisher.publish('jobs','work',JSON.stringify({id:'confirmed-after',task:'generate-report'}));
  const peerReceived=state.messages.map(m=>JSON.parse(m.body.toString()).id);
  assert.deepEqual(peerReceived,['confirmed-before','outcome-unknown','confirmed-after']);
  report={scope:'scripted loopback TCP fault injection; not an independent broker',
    publications:[{id:'confirmed-before',outcome:'confirmed'},{id:'outcome-unknown',outcome:'unknown',peerReceived:true,automaticallyReplayed:false},{id:'confirmed-after',outcome:'confirmed'}],
    initialQueue:queue,restoredQueue,restoredConnectionState:connection.state,
    consumer:{oldTag,freshTag,oldTagRejected:true,acknowledgementsOnNewPhysicalChannel:1},peerReceived,
    decision:'Do not infer rejection from a lost confirmation. Reconcile by an application ID before deciding whether to retry.',
    notImplementedByExample:['durable outbox','application deduplication','exactly-once delivery','production deployment validation']};
  await connection.close();
});
const output=await fs.mkdtemp(path.join(os.tmpdir(),'amqp-recovery-workflow-'));
await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,...report}));
