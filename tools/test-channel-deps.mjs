import assert from 'node:assert/strict';
import {once} from 'node:events';
import fs from 'node:fs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import {fixture,method,u16,short} from './recovery-peer.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/recovery-peer.mjs','tools/test-channel-deps.mjs','web/engine.mjs']);
const config={timeout:700,recovery:{maxRetries:3,retryDelay:5,retryJitter:0,onTopologyError:()=>false}},tests=[];
const str=(bytes,offset=2)=>bytes.subarray(offset+1,offset+1+bytes[offset]).toString();
async function failure(c,ch,state){const start=state.methods.length,raw=ch._raw.id,ready=once(ch,'recovered',{signal:AbortSignal.timeout(5000)});[...state.sockets][0].write(method(raw,20,40,u16(404),short('missing'),u16(60),u16(70)));await ready;assert.equal(c.state,'open');return state.methods.slice(start);}
async function test(name,fn){await fixture({},fn);tests.push(name);console.log('PASS '+name);}
async function graph(a,b){await a.declareExchange('outer');await a.declareExchange('inner');await a.bindExchange('inner','outer','route');await a.declareQueue('q');await a.bindQueue('q','inner','route');await b.consume('q',()=>{},{consumerTag:'target'});}
function includes(rows,cls,id,name){return rows.some(r=>r.cls===cls&&r.id===id&&(name===undefined||str(r.args)===name));}

await test('consumer-only channel replays sibling-owned routing before subscription without reopening sibling',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await graph(a,b);const raw=a._raw,generation=a._generation,rows=await failure(c,b,state);
 assert.equal(a._raw,raw);assert.equal(a._generation,generation);assert(rows.every(r=>r.ch!==a._raw.id));
 for(const e of ['outer','inner'])assert(includes(rows,40,10,e));assert(includes(rows,50,10,'q'));assert(includes(rows,40,30));assert(includes(rows,50,20));
 const consume=rows.findIndex(r=>r.cls===60&&r.id===20);assert(consume>rows.findIndex(r=>r.cls===50&&r.id===20));
});
await test('owned queue seeds recovery of binding and exchange dependencies registered on another channel',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareExchange('e');await b.declareQueue('q');await a.bindQueue('q','e');
 const rows=await failure(c,b,state);assert(includes(rows,40,10,'e'));assert(includes(rows,50,10,'q'));assert(includes(rows,50,20));
});
await test('unrelated sibling components are not replayed or used as temporary recovery channels',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await graph(a,b);await a.declareExchange('unrelated');await a.declareQueue('unrelated-q');await a.bindQueue('unrelated-q','unrelated');
 const rows=await failure(c,b,state);assert(!includes(rows,40,10,'unrelated'));assert(!includes(rows,50,10,'unrelated-q'));assert(rows.every(r=>r.ch!==a._raw.id));
});
await test('all outgoing routes from a dependent exchange are restored, including routes to another queue',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await graph(a,b);await a.declareQueue('second');await a.bindQueue('second','inner','other');
 const rows=await failure(c,b,state);assert(includes(rows,50,10,'second'));assert.equal(rows.filter(r=>r.cls===50&&r.id===20).length,2);
});
await test('transient mode filters declarations after selecting cross-channel dependencies',async({open,state})=>{
 const c=await open({...config,recovery:{...config.recovery,topology:'transient'}}),a=await c.openChannel(),b=await c.openChannel();await a.declareExchange('durable','direct',{durable:true});await a.declareQueue('q',{autoDelete:true});await a.bindQueue('q','durable');await b.consume('q',()=>{},{consumerTag:'target'});
 const rows=await failure(c,b,state);assert(!includes(rows,40,10,'durable'));assert(includes(rows,50,10,'q'));assert(includes(rows,50,20));assert(includes(rows,60,20));
});
await test('disabled topology recovery still avoids declarations and consumer replay',async({open,state})=>{
 const c=await open({...config,recovery:{...config.recovery,topology:'none'}}),a=await c.openChannel(),b=await c.openChannel();await graph(a,b);await b.qos(3);
 const rows=await failure(c,b,state);assert(!rows.some(r=>[40,50].includes(r.cls)));assert(!includes(rows,60,20));assert(includes(rows,60,10));
});
await test('cyclic routes terminate and are declared only once per selected entity',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await graph(a,b);await a.bindExchange('outer','inner','back');
 const rows=await failure(c,b,state);assert.equal(rows.filter(r=>r.cls===40&&r.id===10).length,2);assert.equal(rows.filter(r=>r.cls===40&&r.id===30).length,2);
});
await test('unrecorded external queue is consumed without guessing its declaration options',async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareQueue('unrelated');await b.consume('external',()=>{},{consumerTag:'target'});
 const rows=await failure(c,b,state);assert(!rows.some(r=>r.cls===50&&r.id===10));assert(includes(rows,60,20));
});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/channel-deps-fixtures.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passed:tests.length,tests,sources,scope:'Independently encoded channel-close frames and observed outgoing methods; dependency order, sibling isolation, mode filters, cycles and unknown external entities.'},null,2)+'\n');
console.log(`${tests.length} channel dependency fixture groups passed`);
