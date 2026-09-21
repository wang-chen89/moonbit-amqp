import assert from 'node:assert/strict';
import {once} from 'node:events';
import fs from 'node:fs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import {fixture,method,short,until} from './recovery-peer.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/recovery-peer.mjs','tools/test-autodelete.mjs','web/engine.mjs']);
const tests=[],config={recovery:{retryDelay:5,retryJitter:0,maxRetries:3},timeout:700};
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(5000)});
const socket=state=>[...state.sockets].at(-1);
async function reconnect(c,state){const ready=event(c,'recovered');socket(state).destroy();await ready;}
async function test(name,action,options={}){await fixture(options,action);tests.push(name);console.log('PASS '+name);}
async function chain(ch){await ch.declareExchange('outer','direct',{autoDelete:true});await ch.declareExchange('inner','direct',{autoDelete:true});await ch.bindExchange('inner','outer');await ch.declareQueue('q',{autoDelete:true});await ch.bindQueue('q','inner');}
function empty(c){assert.equal(c.topology.queues.size,0);assert.equal(c.topology.exchanges.size,0);assert.equal(c.topology.bindings.size,0);assert.equal(c.topology.exchangeBindings.size,0);}

await test('last consumer cancellation forgets the queue and full exchange chain before reconnect',async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await chain(ch);await ch.consume('q',()=>{},{consumerTag:'one'});await ch.cancel('one');empty(c);
 await reconnect(c,state);assert(!state.methods.some(m=>m.peer===2&&[40,50,60].includes(m.cls)));empty(c);
});
await test('consumer tags are channel scoped and all channels participate in last-consumer tracking',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await chain(a);
 await a.consume('q',()=>{},{consumerTag:'same'});await b.consume('q',()=>{},{consumerTag:'same'});await a.cancel('same');assert(c.topology.queue('q'));
 await reconnect(c,state);assert.equal(state.methods.filter(m=>m.peer===2&&m.cls===60&&m.id===20).length,1);
 await b.cancel('same');empty(c);
});
await test('never-consumed queues and never-bound exchanges survive no-op cancellation and unbind',async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareQueue('idle',{autoDelete:true});await ch.declareExchange('idle-e','direct',{autoDelete:true});
 await ch.cancel('unknown');await ch.unbindQueue('idle','idle-e','unknown');assert(c.topology.queue('idle'));assert(c.topology.exchanges.has('idle-e'));
 await reconnect(c,state);assert(c.topology.queue('idle'));assert(c.topology.exchanges.has('idle-e'));
});
await test('argument-distinct bindings and bindings from other channels retain their source until the last removal',async({open})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareExchange('e','headers',{autoDelete:true});await a.declareQueue('q');
 await a.bindQueue('q','e','',{kind:1});await b.bindQueue('q','e','',{kind:2});await a.unbindQueue('q','e','',{kind:1});assert(c.topology.exchanges.has('e'));assert.equal(c.topology.bindings.size,1);
 await b.unbindQueue('q','e','',{kind:2});assert(!c.topology.exchanges.has('e'));assert(c.topology.queue('q'));
});
await test('exchange unbinding removes only the auto-delete source, preserving an unbound destination',async({open})=>{
 const c=await open(config),ch=await c.openChannel();for(const e of ['source','destination'])await ch.declareExchange(e,'direct',{autoDelete:true});
 await ch.bindExchange('destination','source');await ch.unbindExchange('destination','source');assert(!c.topology.exchanges.has('source'));assert(c.topology.exchanges.has('destination'));
});
await test('explicit deletion cascades through a cyclic exchange graph without recursive looping',async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();for(const e of ['a','b','c'])await ch.declareExchange(e,'direct',{autoDelete:true});
 await ch.bindExchange('b','a');await ch.bindExchange('c','b');await ch.bindExchange('a','c');await ch.deleteExchange('a');empty(c);await reconnect(c,state);empty(c);
});
await test('failed deletion does not erase the desired topology',async({open})=>{
 const c=await open(config),ch=await c.openChannel();await chain(ch);const ready=event(ch,'recovered');await assert.rejects(ch.deleteQueue('q'),/406/);await ready;assert(c.topology.queue('q'));assert.equal(c.topology.exchanges.size,2);
},{onMethod(e,s){if(e.cls===50&&e.id===40){s.write(method(e.ch,20,40,Buffer.from([1,150]),short('in use'),Buffer.from([0,50,0,40])));return true;}}});
await test('a pending cross-channel consumer prevents premature auto-deletion before its acknowledgement',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await chain(a);await a.consume('q',()=>{},{consumerTag:'old'});
 const pending=b.consume('q',()=>{},{consumerTag:'pending'});await until(()=>state.methods.some(e=>e.peer===1&&e.cls===60&&e.id===20&&e.args.includes(Buffer.from('pending'))));await a.cancel('old');assert(c.topology.queue('q'));
 socket(state).write(method(b._raw.id,60,21,short('pending')));await pending;await reconnect(c,state);assert(c.topology.queue('q'));await b.cancel('pending');empty(c);
},{onMethod(e){if(e.peer===1&&e.cls===60&&e.id===20&&e.args.includes(Buffer.from('pending')))return true;}});
await test('a pending binding prevents the last acknowledged unbind from prematurely deleting its source',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareExchange('e','direct',{autoDelete:true});await a.declareQueue('q');await a.bindQueue('q','e','old');
 const pending=b.bindQueue('q','e','pending');await until(()=>state.methods.some(e=>e.peer===1&&e.cls===50&&e.id===20&&e.args.includes(Buffer.from('pending'))));await a.unbindQueue('q','e','old');assert(c.topology.exchanges.has('e'));
 socket(state).write(method(b._raw.id,50,21));await pending;await reconnect(c,state);assert(c.topology.exchanges.has('e'));await b.unbindQueue('q','e','pending');assert(!c.topology.exchanges.has('e'));
},{onMethod(e){if(e.peer===1&&e.cls===50&&e.id===20&&e.args.includes(Buffer.from('pending')))return true;}});
await test('explicit channel close forgets its last auto-delete consumer and channel-owned declarations',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await chain(a);await a.declareQueue('idle',{autoDelete:true});await a.consume('q',()=>{},{consumerTag:'only'});await a.close();
 assert(!c.topology.queue('q'));assert.equal(c.topology.exchanges.size,0);assert(!c.topology.queue('idle'));await reconnect(c,state);assert(!c.topology.queue('idle'));assert.equal(b.state,'open');
});
await test('broker cancellation cascades and repeated cancellation cannot resurrect records',async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await chain(ch);await ch.consume('q',()=>{},{consumerTag:'server'});
 const cancelled=event(ch,'cancel');socket(state).write(method(ch._raw.id,60,30,short('server'),Buffer.from([0])));await cancelled;empty(c);await ch.cancel('server');await reconnect(c,state);empty(c);
});
await test('server-named queue aliases are removed after cancellation following recovery',async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),{queue}=await ch.declareQueue('',{autoDelete:true,exclusive:true});await ch.consume(queue,()=>{},{consumerTag:'alias'});
 await reconnect(c,state);const current=c.resolveQueue(queue);assert.notEqual(current,queue);await ch.cancel('alias');assert(!c.topology.queue(queue));assert(!c.topology.queue(current));await reconnect(c,state);assert.equal(c.topology.queues.size,0);
});
await test('consumer acknowledgement immediately followed by broker cancellation cannot leave a stale recovery consumer',async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await chain(ch);const cancelled=event(ch,'cancel');await ch.consume('q',()=>{},{consumerTag:'immediate'});await cancelled;empty(c);
 await reconnect(c,state);assert(!state.methods.some(m=>m.peer===2&&m.cls===60&&m.id===20));
},{onMethod(e,s){if(e.cls===60&&e.id===20){s.write(Buffer.concat([method(e.ch,60,21,short('immediate')),method(e.ch,60,30,short('immediate'),Buffer.from([0]))]));return true;}}});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/autodelete-fixtures.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passed:tests.length,tests,sources,scope:'Independent wire peer validates desired topology and actual replay, cross-channel pending operations, explicit versus unexpected loss, aliases and failed mutations.'},null,2)+'\n');
console.log(`${tests.length} auto-delete fixture groups passed`);
