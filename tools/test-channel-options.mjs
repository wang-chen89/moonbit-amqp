import fs from 'node:fs';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import * as core from '../web/engine.mjs';
import {fixture,sequence,selected,method,ack,cat,u16,u32,short,delay} from './channel-options-peer.mjs';
import {gate,until} from './stream-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/channel-options-peer.mjs','tools/nowait-peer.mjs','tools/recovery-peer.mjs','tools/stream-peer.mjs','tools/test-channel-options.mjs','web/engine.mjs']);
const tests=[],wire=[];async function test(name,fn){await fn();tests.push(name);console.log('PASS '+name);}
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(4000)});
const recovering={recovery:{maxRetries:3,retryDelay:5,retryJitter:0},timeout:700};
const cut=async(c,state)=>{const ready=event(c,'recovered');[...state.sockets].at(-1).destroy();await ready;};
await test('all wire options retain UInt32 QoS and independent consume and publish flag bits',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await sequence(ch);const rows=state.methods.filter(selected);assert.equal(rows.length,18);wire.push(...rows.map(e=>({cls:e.cls,id:e.id,args:e.args.toString('hex')})));
 assert.deepEqual(rows.filter(e=>e.id===10&&e.cls===60).map(e=>[e.args.readUInt32BE(0),e.args.readUInt16BE(4),e.args[6]]),[[65536,7,0],[4294967295,65535,1],[0,0,0],[0,2,0]]);
 assert.deepEqual(rows.filter(e=>e.id===20&&e.cls===60).map(e=>e.args[7]),[6,7,14,15]);
 assert.deepEqual(rows.filter(e=>e.id===40&&e.cls===60).map(e=>e.args.at(-1)),[0,1,2,3,0,1,2,3]);assert.equal(state.messages.length,8);assert(state.messages.every(m=>m.body.toString()==='data'));await c.close();
}));
await test('invalid flags and QoS ranges fail locally before source iteration or wire output',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel(),before=state.methods.length;let iterated=0;const source={[Symbol.iterator](){iterated++;return [Buffer.from('x')][Symbol.iterator]();}};
 for(const value of [-1,65536,1.5,NaN,'1'])await assert.rejects(ch.qos(value));
 for(const value of [-1,4294967296,1.5,NaN,'1'])await assert.rejects(ch.qos(1,false,{prefetchSize:value}));
 for(const value of [1,null,'true',{}]){await assert.rejects(ch.qos(1,value));await assert.rejects(ch.flow(value));await assert.rejects(ch.consume('q',()=>{},{consumerTag:'same',noLocal:value,noWait:true}));await assert.rejects(ch.publish('','q','x',{immediate:value}));await assert.rejects(ch.publishStream('','q',source,1,{mandatory:value}));}
 assert.equal(iterated,0);assert.equal(state.methods.length,before);await ch.consume('q',()=>{},{consumerTag:'same',noLocal:true});await ch.cancel('same');await ch.qos(0);await c.close();
}));
await test('server flow notices pause new publications only on their channel and resume them',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel(),sibling=await c.openChannel(),s=[...state.sockets][0],values=[];ch.on('flow',v=>values.push(v));
 let notice=event(ch,'flow');s.write(method(ch.id,20,20,Buffer.from([0])));assert.deepEqual(await notice,[false]);await until(()=>state.methods.some(e=>e.cls===20&&e.id===21&&e.args[0]===0));
 await assert.rejects(ch.publish('','q','blocked'),/unavailable or blocked/);await sibling.publish('','q','sibling');await sibling.qos(0);
 notice=event(ch,'flow');s.write(method(ch.id,20,20,Buffer.from([1])));assert.deepEqual(await notice,[true]);await ch.publish('','q','resumed');await ch.qos(0);assert.deepEqual(values,[false,true]);assert.deepEqual(state.messages.map(m=>m.body.toString()),['sibling','resumed']);await c.close();
}));
await test('crossed flow requests keep delivery control replies separate from publisher notices',()=>fixture({onMethod:(e,s)=>{if(e.cls===20&&e.id===20){s.write(cat(method(e.ch,20,20,Buffer.from([0])),method(e.ch,20,20,Buffer.from([1])),method(e.ch,20,21,Buffer.from([0]))));return true;}}},async({open})=>{
 const c=await open(),ch=await c.openChannel(),values=[];ch.on('flow',v=>values.push(v));assert.equal(await ch.flow(false),false);assert.deepEqual(values,[false,true]);await ch.publish('','q','still-publishing');await ch.qos(0);await c.close();
}));
await test('unsolicited flow does not consume the reply slot of a pending QoS RPC',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===10){s.write(cat(method(e.ch,20,20,Buffer.from([0])),method(e.ch,60,11)));return true;}}},async({open})=>{
 const c=await open(),ch=await c.openChannel(),notice=event(ch,'flow');await ch.qos(1);assert.deepEqual(await notice,[false]);await c.close();
}));
await test('flow command waits behind all frames of the same-channel source',()=>{
 const held=gate();return fixture({},async({open,state})=>{const c=await open(),ch=await c.openChannel();async function* body(){yield Buffer.from('a');await held.promise;yield Buffer.from('b');}
 const publish=ch.publishStream('','q',body(),2),flow=ch.flow(false);await delay(35);assert(!state.methods.some(e=>e.cls===20&&e.id===20));held.resolve();await publish;assert.equal(await flow,false);assert.equal(state.messages[0].body.toString(),'ab');await c.close();});
});
await test('server flow during a streamed body is notified now and acknowledged after the body',()=>{
 const held=gate();return fixture({},async({open,state})=>{const c=await open(),ch=await c.openChannel();async function* body(){yield Buffer.from('a');await held.promise;yield Buffer.from('b');}
 const publish=ch.publishStream('','q',body(),2);await until(()=>state.methods.some(e=>e.cls===60&&e.id===40));const notice=event(ch,'flow');[...state.sockets][0].write(method(ch.id,20,20,Buffer.from([0])));await notice;assert(!state.methods.some(e=>e.cls===20&&e.id===21));held.resolve();await publish;await until(()=>state.methods.some(e=>e.cls===20&&e.id===21));assert.equal(state.messages[0].body.toString(),'ab');await assert.rejects(ch.publish('','q','paused'));await c.close();});
});
await test('negative flow reply returns effective state without disabling outgoing messages',()=>fixture({onMethod:(e,s)=>{if(e.cls===20&&e.id===20){s.write(method(e.ch,20,21,Buffer.from([0])));return true;}}},async({open})=>{
 const c=await open(),ch=await c.openChannel(),values=[];ch.on('flow',v=>values.push(v));assert.equal(await ch.flow(true),false);assert.deepEqual(values,[]);await ch.publish('','q','active');await ch.qos(0);await c.close();
}));
await test('flow broker channel rejection is reported and sibling stays usable',()=>fixture({onMethod:(e,s)=>{if(e.cls===20&&e.id===20){s.write(method(e.ch,20,40,u16(540),short('not implemented'),u16(20),u16(20)));return true;}}},async({open})=>{
 const c=await open(),ch=await c.openChannel(),sibling=await c.openChannel();await assert.rejects(ch.flow(false),e=>e.code===540);assert.equal(c.closed,false);await sibling.qos(0);await c.close();
}));
await test('missing flow response times out and terminates the connection',()=>fixture({onMethod:e=>e.cls===20&&e.id===20},async({open})=>{
 const c=await open({timeout:80}),ch=await c.openChannel();await assert.rejects(ch.flow(true),/RPC timeout/);assert(c.closed);
}));
await test('connection cancellation rejects pending flow without leaking its wait',()=>fixture({onMethod:e=>e.cls===20&&e.id===20},async({open,state})=>{
 const abort=new AbortController(),c=await open({signal:abort.signal}),ch=await c.openChannel(),pending=ch.flow(true);const rejected=assert.rejects(pending,/cancelled/);await until(()=>state.methods.some(e=>e.cls===20&&e.id===20));abort.abort(Error('cancelled'));await rejected;assert(c.closed);
}));
await test('recovery restores QoS size and noLocal snapshots before consumers but does not replay flow',()=>fixture({},async({open,state})=>{
 const c=await open(recovering),ch=await c.openChannel(),options={prefetchSize:65536},consumer={consumerTag:'c',noLocal:true,noWait:true};await ch.declareQueue('q');await ch.qos(3,false,options);await ch.qos(4,true,{prefetchSize:262144});await ch.consume('q',()=>{},consumer);await ch.flow(false);options.prefetchSize=1;consumer.noLocal=false;await cut(c,state);await ch.qos(0);const restored=state.methods.filter(e=>e.peer===2),qos=restored.filter(e=>e.cls===60&&e.id===10);assert.deepEqual(qos.slice(0,2).map(e=>[e.args.readUInt32BE(),e.args.readUInt16BE(4),e.args[6]]),[[65536,3,0],[262144,4,1]]);const consumed=restored.find(e=>e.cls===60&&e.id===20);assert(consumed);assert.equal(consumed.args[6]&9,9);assert(restored.indexOf(qos[1])<restored.indexOf(consumed));assert(!restored.some(e=>e.cls===20&&e.id===20));const notice=event(ch,'flow');[...state.sockets].at(-1).write(method(ch._raw.id,20,20,Buffer.from([0])));assert.deepEqual(await notice,[false]);await c.close();
}));
await test('failed local QoS does not overwrite a successfully recorded recovery setting',()=>fixture({},async({open,state})=>{
 const c=await open(recovering),ch=await c.openChannel();await ch.qos(9,false,{prefetchSize:512});await assert.rejects(ch.qos(1,false,{prefetchSize:-1}));await cut(c,state);await ch.flow(true);const e=state.methods.find(e=>e.peer===2&&e.cls===60&&e.id===10);assert.deepEqual([e.args.readUInt32BE(),e.args.readUInt16BE(4)],[512,9]);await c.close();
}));
await test('immediate option preserves confirms with both buffered and streamed sources',()=>{
 let count=0;return fixture({onMessage:(m,s)=>s.write(ack(m.ch,++count))},async({open})=>{const c=await open(),ch=await c.openChannel();await ch.confirmSelect();assert.equal((await ch.publish('','q','a',{immediate:true})).deliveryTag,1n);assert.equal((await ch.publishStream('','q',[Buffer.from('b')],1,{immediate:true,mandatory:true})).deliveryTag,2n);await c.close();});
});
await test('legacy bridge exports keep their calling convention and new flags exports agree',async()=>{
 const long=b=>cat(u32(b.length),b),keys=[];
 function ready(key){keys.push(key);core.session_open(key,'demo','test','/',8,8192,0);core.session_feed(key,method(0,10,10,Buffer.from([0,9]),u32(0),long(Buffer.from('PLAIN')),long(Buffer.from('en_US'))).toString('hex'));core.session_feed(key,method(0,10,30,u16(8),u32(8192),u16(0)).toString('hex'));core.session_feed(key,method(0,10,41,short('')).toString('hex'));core.session_send(key,1,'channel.open','[""]');core.session_feed(key,method(1,20,11,u32(0)).toString('hex'));}
 try{
  for(const name of ['session_publish','session_publish_flags','session_publish_start','session_publish_start_flags']){ready(name);const flags=name.endsWith('_flags'),stream=name.includes('_start'),args=[name,1,'','q',stream?'0':'','{}',true];if(flags)args.push(true);const result=JSON.parse(core[name](...args));assert.equal(result.output.length,2);assert.equal(Buffer.from(result.output[0],'hex').at(-2),flags?3:1);}
 }finally{for(const key of keys)core.session_drop(key);}
});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/channel-options-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,wire,sources,scope:'Independent AMQP peer validates QoS width, consume/publish flags, both flow directions, source/RPC ordering, timeout/cancel, recovery snapshots and additive bridge compatibility; not full API or broker support.'},null,2)+'\n');
console.log(`${tests.length} channel option fixture groups passed`);
