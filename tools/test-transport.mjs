import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {Duplex,PassThrough} from 'node:stream';
import {once} from 'node:events';
import {connect,open,Connection,defaultDial} from './client.mjs';
import {fixture,delay,ack,frame,method,cat,u16,u32,u64,short,long,deliver} from './recovery-peer.mjs';
import {byteTransport} from './transport-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/recovery-peer.mjs','tools/transport-peer.mjs','tools/test-transport.mjs','web/engine.mjs']);
const tests=[];
async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
const socket=async opts=>{const s=net.connect({host:opts.host,port:opts.port});s.on('error',()=>{});await once(s,'connect');return s;};
const silent=()=>new Duplex({read(){},write(c,e,cb){cb();}});
const settle=async predicate=>{for(let i=0;i<200&&!predicate();i++)await delay(5);assert(predicate());};

await test('dial receives decoded IPv6-compatible address and frozen cancellation context',()=>fixture({},async({opts,state})=>{
 const calls=[];const c=await connect('amqp://demo:test@route.invalid:12345/%2F?heartbeat=0',{allowInsecureAuth:true,timeout:800,dial:(network,address,context)=>{calls.push({network,address,context});return net.connect({host:opts.host,port:opts.port});}});
 try{assert.equal(calls.length,1);assert.equal(calls[0].network,'tcp');assert.equal(calls[0].address,'route.invalid:12345');assert(Object.isFrozen(calls[0].context));assert.equal(calls[0].context.host,'route.invalid');assert.equal(calls[0].context.port,12345);assert.equal(c.serverVersion.major,0);await c.close();await settle(()=>state.sockets.size===0);assert(calls[0].context.signal.aborted);}finally{c.destroy();}
}));
await test('async dial can route IPv6 URI over a different TCP endpoint',()=>fixture({},async({opts})=>{
 let address;const c=await connect('amqp://demo:test@[::1]:12345/?heartbeat=0',{allowInsecureAuth:true,timeout:800,dial:async(n,a)=>{address=a;return socket(opts);}});
 try{assert.equal(address,'[::1]:12345');assert.equal(c.remoteAddress.port,opts.port);await c.close();}finally{c.destroy();}
}));
for(const [name,entry] of [['function',open],['static',Connection.open.bind(Connection)]])await test(name+' open takes an established socket and owns shutdown',()=>fixture({},async({opts,state})=>{
 const s=await socket(opts);const c=await entry(s,opts);try{assert.equal(c.remoteAddress.port,opts.port);const ch=await c.openChannel();await ch.declareQueue('transport');await c.close();await settle(()=>s.destroyed&&state.sockets.size===0);}finally{c.destroy();}
}));
await test('generic binary Duplex supports fragmented handshake and output backpressure',()=>fixture({onMessage(msg,s){s.write(ack(msg.ch,1));}},async({opts,state})=>{
 const s=byteTransport(await socket(opts),{delay:2,fragment:1});const c=await open(s,{...opts,streamBodies:true});
 try{assert.equal(c.localAddress,null);assert.equal(c.remoteAddress,null);assert.equal(c.tlsState.encrypted,false);const ch=await c.openChannel();await ch.confirmSelect();const body=Buffer.alloc(65536,7);await ch.publishStream('','q',[body],body.length);assert.equal(state.messages.length,1);assert.deepEqual(state.messages[0].body,body);assert(c.writeStats.drainWaits>0);await c.close();await settle(()=>s.destroyed);}finally{c.destroy();}
}));
await test('generic Duplex streaming receive preserves completion and acknowledgements',()=>fixture({onMethod(e,s){if(e.cls===60&&e.id===20)setTimeout(()=>{
 const body=Buffer.alloc(20000,9);s.write(cat(method(e.ch,60,60,short('consumer'),u64(1),Buffer.from([0]),short(''),short('q')),frame(2,e.ch,cat(u16(60),u16(0),u64(body.length),u16(0)))));
 for(let i=0;i<body.length;i+=8000)s.write(frame(3,e.ch,body.subarray(i,i+8000)));
},5);}},async({opts})=>{
 const c=await open(byteTransport(await socket(opts)),{...opts,streamBodies:true,receiveHighWaterMark:4096});
 try{const ch=await c.openChannel();let resolve;const received=new Promise(r=>resolve=r);await ch.consume('q',resolve,{consumerTag:'consumer'});const msg=await received;const chunks=[];for await(const b of msg.body)chunks.push(b);await msg.completed;assert.deepEqual(Buffer.concat(chunks),Buffer.alloc(20000,9));await ch.ack(msg.args['delivery-tag']);await c.close();}finally{c.destroy();}
}));
await test('in-memory Duplex handshake and channel RPC need no socket methods',async()=>{
 let header=false;const methods=[];
 const s=new Duplex({read(){},write(chunk,encoding,cb){
  try{if(!header){assert.equal(chunk.toString('hex'),'414d515000000901');header=true;this.push(method(0,10,10,Buffer.from([0,9]),u32(0),long('PLAIN'),long('en_US')));}
   else{let p=0;while(p<chunk.length){const f=chunk.subarray(p,p+8+chunk.readUInt32BE(p+3));p+=f.length;const ch=f.readUInt16BE(1),cls=f.readUInt16BE(7),id=f.readUInt16BE(9);methods.push([cls,id]);
    if(cls===10&&id===11)this.push(method(0,10,30,u16(8),u32(8192),u16(0)));
    if(cls===10&&id===40)this.push(method(0,10,41,short('')));
    if(cls===20&&id===10)this.push(method(ch,20,11,u32(0)));
    if(cls===10&&id===50)this.push(method(0,10,51));
   }}cb();}catch(e){cb(e);}
 }});
 const c=await open(s,{allowInsecureAuth:true,heartbeat:0});try{await c.openChannel();await c.close();assert(methods.some(([cls,id])=>cls===20&&id===10));await settle(()=>s.destroyed);}finally{c.destroy();}
});
await test('invalid dial and open options fail before ownership or dialing',()=>fixture({},async({opts,state})=>{
 let calls=0;await assert.rejects(connect({...opts,dial:'invalid'}),/dial/);
 for(const extra of [{port:0},{properties:{bad:undefined}},{signal:AbortSignal.abort()}])await assert.rejects(connect({...opts,...extra,dial(){calls++;return silent();}}));
 const s=silent();try{for(const extra of [{dial(){}},{tls:{}},{recovery:true},{uri:'amqp://'}])await assert.rejects(open(s,{...opts,...extra}));assert.equal(s.destroyed,false);}finally{s.destroy();}
 assert.equal(calls,0);assert.equal(state.accepted,0);
}));
await test('non-byte and consumed transports are rejected without taking caller ownership',async()=>{
 const cases=[new PassThrough({objectMode:true}),new PassThrough().setEncoding('utf8'),new net.Socket(),silent()];cases[3].on('data',()=>{});
 for(const s of cases)try{await assert.rejects(open(s,{allowInsecureAuth:true}));assert.equal(s.destroyed,false);}finally{s.destroy();}
});
await test('invalid factory results are rejected and returned Duplex is destroyed',async()=>{
 for(const value of [null,{},17])await assert.rejects(connect({allowInsecureAuth:true,dial:()=>value}),/Duplex/);
 const s=new PassThrough({objectMode:true});await assert.rejects(connect({allowInsecureAuth:true,dial:()=>s}),/Duplex/);assert(s.destroyed);
});
await test('synchronous throw and asynchronous dial rejection preserve error identity',async()=>{
 const error=Error('custom dial failed');for(const dial of [()=>{throw error;},async()=>{throw error;}])await assert.rejects(connect({allowInsecureAuth:true,dial}),e=>e===error);
});
await test('timeout bounds stalled factory and destroys its late result',async()=>{
 let resolve,signal;const attempt=connect({allowInsecureAuth:true,timeout:30,dial:(n,a,c)=>{signal=c.signal;return new Promise(r=>resolve=r);}});
 await assert.rejects(attempt,/handshake timeout/);assert(signal.aborted);const s=silent();resolve(s);await settle(()=>s.destroyed);
});
await test('external abort cancels factory context and late rejection stays handled',async()=>{
 const controller=new AbortController(),error=Error('cancel dial');let reject,signal;
 const attempt=connect({allowInsecureAuth:true,signal:controller.signal,dial:(n,a,c)=>{signal=c.signal;return new Promise((r,j)=>reject=j);}});
 await settle(()=>Boolean(signal));controller.abort(error);await assert.rejects(attempt,e=>e===error);assert(signal.aborted);reject(Error('late failure'));await delay(10);
});
await test('open timeout and EOF destroy the transferred stream',async()=>{
 const a=silent();await assert.rejects(open(a,{allowInsecureAuth:true,timeout:30}),/handshake timeout/);assert(a.destroyed);
 const b=silent();const attempt=open(b,{allowInsecureAuth:true});b.push(null);await assert.rejects(attempt,/EOF|closed|ended/);assert(b.destroyed);
});
await test('constructor destruction during dialing releases a late stream',async()=>{
 let resolve;const c=new Connection({allowInsecureAuth:true,dial:()=>new Promise(r=>resolve=r)});await settle(()=>Boolean(resolve));c.destroy();const s=silent();resolve(s);await settle(()=>s.destroyed);assert(c.closed);assert.equal(c.writeStats.socketBufferedBytes,0);
});
await test('defaultDial supports TCP4, validates addresses, and clears handshake deadline after open',()=>fixture({},async({opts})=>{
 const dial=defaultDial(120);for(const [network,address] of [['udp','host:12'],['tcp','bad'],['tcp','host:0']])await assert.rejects(dial(network,address));
 const s=await dial('tcp4',opts.host+':'+opts.port);const c=await open(s,opts);try{await delay(160);assert.equal(c.closed,false);await c.openChannel();await c.close();}finally{c.destroy();}
}));
await test('defaultDial applies a handshake deadline even when used without Open',()=>fixture({noStart:true},async({opts})=>{
 const s=await defaultDial(30)('tcp',opts.host+':'+opts.port);await settle(()=>s.destroyed);
}));
await test('defaultDial supports actual IPv6 sockets',()=>fixture({listenHost:'::1'},async({opts})=>{
 const s=await defaultDial(800)('tcp6',`[::1]:${opts.port}`);const c=await open(s,opts);try{assert.equal(c.remoteAddress.family,'IPv6');await c.close();}finally{c.destroy();}
}));
await test('defaultDial unix network supports the platform local pipe transport',async()=>{
 const name='moonbit-transport-'+randomUUID(),endpoint=process.platform==='win32'?'\\\\.\\pipe\\'+name:path.join(os.tmpdir(),name+'.sock');
 await fixture({listenPath:endpoint},async()=>{const s=await defaultDial(800)('unix',endpoint);const c=await open(s,{allowInsecureAuth:true,heartbeat:0,timeout:800});try{assert.equal(c.localAddress,null);assert.equal(c.remoteAddress,null);await c.openChannel();await c.close();}finally{c.destroy();}});
});
await test('reusing an owned factory stream fails without destroying the live connection',()=>fixture({},async({opts})=>{
 const s=await socket(opts),c=await open(s,opts);try{
  await assert.rejects(connect({...opts,dial:()=>s}),/already owned/);assert.equal(c.closed,false);await c.openChannel();
  let resolve;const cancelled=connect({...opts,timeout:20,dial:()=>new Promise(r=>resolve=r)});await assert.rejects(cancelled,/timeout/);resolve(s);await delay(10);assert.equal(c.closed,false);await c.openChannel();await c.close();
 }finally{c.destroy();}
}));
await test('recovery invokes original custom factory with fresh signals and restores channel state',()=>fixture({},async({opts,state})=>{
 const calls=[];const options={...opts,recovery:{retryDelay:0,retryJitter:0,maxRetries:3},dial:(n,a,c)=>{calls.push(c);return net.connect({host:opts.host,port:opts.port});}};
 const c=await connect(options);try{const ch=await c.openChannel();await ch.declareQueue('transport-recovery');options.dial=()=>{throw Error('caller mutation');};const recovered=once(c,'recovered',{signal:AbortSignal.timeout(3000)});[...state.sockets][0].destroy();await recovered;assert.equal(calls.length,2);assert.notEqual(calls[0].signal,calls[1].signal);assert(calls[0].signal.aborted);assert.equal(calls[1].signal.aborted,false);assert.equal(c.connectionInfo.generation,2);assert.equal(state.methods.filter(e=>e.cls===50&&e.id===10).length,2);await ch.declareQueue('after');await c.close();}finally{c.destroy();}
}));
await test('closing recovery during a pending factory disposes the late connection without replay',()=>fixture({},async({opts,state})=>{
 let calls=0,resolve;const c=await connect({...opts,recovery:{retryDelay:0,retryJitter:0,maxRetries:3},dial:()=>++calls===1?net.connect({host:opts.host,port:opts.port}):new Promise(r=>resolve=r)});
 try{[...state.sockets][0].destroy();await settle(()=>Boolean(resolve));const closing=c.close();const s=silent();resolve(s);await closing;await settle(()=>s.destroyed);assert.equal(calls,2);assert(c.closed);}finally{c.destroy();}
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/transport-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Independent byte peer, generic/in-memory Duplex, TCP routing, factory cancellation/timeout/late completion, stream ownership/backpressure, default dial deadlines, and recovery. Native and TLS broker checks are separate.'},null,2)+'\n');
console.log(`${tests.length} custom transport fixture groups passed`);
