import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {Duplex} from 'node:stream';
import {once,getEventListeners} from 'node:events';
import {open as openStream} from './client.mjs';
import {fixture,method,frame,u16,u32,u64,short,cat,delay,until} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery.mjs','tools/close-deadline.mjs','tools/outbound.mjs','tools/recovery-peer.mjs','tools/test-close-deadline.mjs','web/engine.mjs']);
const tests=[],timings=[],recovery={maxRetries:2,retryDelay:5,retryJitter:0};
const timeout=e=>e.code==='AMQP_CLOSE_DEADLINE'&&e.timeout===true,closed=e=>e.code==='AMQP_CONNECTION_CLOSED';
const event=(c,name)=>once(c,name,{signal:AbortSignal.timeout(4000)});
async function test(name,options,fn){await fixture(options,fn);tests.push(name);console.log('PASS '+name);}
const ignoreClose={onMethod:e=>e.cls===10&&e.id===50};
const laterClose={onMethod(e,s){if(e.cls===10&&e.id===50){setTimeout(()=>{if(!s.destroyed)s.write(method(0,10,51));},100);return true;}}};
await test('Date and Unix milliseconds close physical and recovering connections',{},async({open,state})=>{
 for(const r of [false,recovery])for(const asDate of [false,true]){const c=await open({recovery:r}),ch=await c.openChannel();const p=c.notifyRecoveryCancel();await c.closeDeadline(asDate?new Date(Date.now()+1000):Date.now()+1000);await p;assert(c.closed&&ch.closed);assert.equal(c.recoveryEnabled,false);}
 assert.equal(state.methods.filter(x=>x.cls===10&&x.id===50).length,4);
});
await test('invalid deadline values do not change state or cancellation ownership',{},async({open})=>{
 for(const r of [false,recovery]){const c=await open({recovery:r});let cancelled=false;c.notifyRecoveryCancel().then(()=>cancelled=true);for(const v of [undefined,'2026-09-20',NaN,Infinity,1.5,8640000000000001,new Date(NaN),{},true])await assert.rejects(c.closeDeadline(v),TypeError);assert.equal(c.closed,false);assert.equal(cancelled,false);assert.equal(c.recoveryEnabled,Boolean(r));const ch=await c.openChannel();await ch.get('still-open');await c.closeDeadline(null);}
});
await test('expired deadline fails before sending the close handshake',{},async({open,state})=>{
 for(const deadline of [0,new Date(Date.now()-100)]){const c=await open();await assert.rejects(c.closeDeadline(deadline),timeout);assert(c.closed);}
 assert.equal(state.methods.filter(x=>x.cls===10&&x.id===50).length,0);
});
await test('silent peer hits the absolute deadline and settles channels and notifications',ignoreClose,async({open})=>{
 for(const r of [false,recovery]){const c=await open({recovery:r,timeout:3000}),ch=await c.openChannel();const a=c.notifyRecoveryCancel(),b=ch.notifyRecoveryCancel(),start=performance.now();await assert.rejects(c.closeDeadline(Date.now()+60),timeout);timings.push({name:'silent close',elapsedMS:performance.now()-start});assert(performance.now()-start<1200);await Promise.all([a,b]);assert(c.closed&&ch.closed);assert.equal(c.recoveryEnabled,false);}
});
await test('deadline can exceed ordinary connection timeout while waiting for close-ok',laterClose,async({open})=>{
 const c=await open({timeout:35});await c.closeDeadline(Date.now()+700);assert(c.closed);
});
await test('null disables only the close deadline and a delayed response can succeed',laterClose,async({open})=>{
 const c=await open({timeout:35});await c.closeDeadline(null);assert(c.closed);
});
await test('Date is snapshotted and caller mutation cannot shorten an in-flight deadline',laterClose,async({open})=>{
 const c=await open({timeout:35}),d=new Date(Date.now()+700),closing=c.closeDeadline(d);d.setTime(0);await closing;assert(c.closed);
});
await test('far-future deadlines avoid the Node timer overflow and clear on success',laterClose,async({open})=>{
 const warnings=[],listen=w=>warnings.push(w);process.on('warning',listen);try{const c=await open({timeout:35});await c.closeDeadline(8640000000000000);assert.equal(warnings.filter(w=>w.name==='TimeoutOverflowWarning').length,0);}finally{process.off('warning',listen);}
});
await test('deadline close flushes sent publication bytes without waiting for unreceived confirms',{},async({open,state})=>{
 const c=await open(),ch=await c.openChannel();await ch.confirmSelect();const handle=await ch.publishWithDeferredConfirm('','q','no acknowledgement');await c.closeDeadline(Date.now()+400);assert.equal(await handle.wait(),false);assert.equal(state.messages[0].body.toString(),'no acknowledgement');assert(c.closed);
});
await test('deadline interrupts stalled streamed publication and closes its owned source',{},async({open})=>{
 const c=await open({timeout:3000}),ch=await c.openChannel();let returned=false,started=false;const source={async next(){started=true;return new Promise(()=>{});},return(){returned=true;return {done:true};},[Symbol.asyncIterator](){return this;}};
 const publishing=assert.rejects(ch.publishStream('','q',source,10),/deadline|closed/);await until(()=>started);await assert.rejects(c.closeDeadline(Date.now()+50),timeout);await publishing;await until(()=>returned);assert(returned);assert(c.closed&&ch.closed);
});
await test('closing a partially received stream rejects its completion and frees the connection', {onMethod(e,s){if(e.cls===60&&e.id===20)setImmediate(()=>s.write(cat(method(e.ch,60,60,short('waiting'),u64(1),Buffer.from([0]),short(''),short('q')),frame(2,e.ch,cat(u16(60),u16(0),u64(100),u16(0))))));if(e.cls===10&&e.id===50)return true;}},async({open})=>{
 const c=await open({streamBodies:true,timeout:3000}),ch=await c.openChannel();let got;const incoming=new Promise(r=>got=r);await ch.consume('q',got,{consumerTag:'waiting'});const message=await incoming;const rejected=assert.rejects(message.completed,/deadline|closed/);await assert.rejects(c.closeDeadline(Date.now()+50),timeout);await rejected;assert(c.closed);
});
await test('generic Duplex backpressure is bounded and drain listeners are removed',{},async({opts})=>{
 const socket=net.connect({host:opts.host,port:opts.port});await once(socket,'connect');socket.pause();let blocked=false;const s=new Duplex({highWaterMark:32,read(){socket.resume();},write(bytes,encoding,cb){if(!blocked)socket.write(bytes,cb);},destroy(e,cb){socket.destroy();cb(e);}});socket.on('data',b=>{if(!s.push(b))socket.pause();});socket.on('error',e=>s.destroy(e));socket.on('end',()=>s.push(null));
 const c=await openStream(s,opts);try{blocked=true;s.write(Buffer.alloc(64));assert(s.writableNeedDrain);await assert.rejects(c.closeDeadline(Date.now()+50),timeout);assert(s.destroyed&&c.closed);assert.equal(s.listenerCount('drain'),0);}finally{c.destroy();}
});
await test('successful close-ok disposes an owned Duplex even when its final callback stalls',{},async({opts})=>{
 const socket=net.connect({host:opts.host,port:opts.port});await once(socket,'connect');socket.pause();const s=new Duplex({read(){socket.resume();},write(b,e,cb){socket.write(b,cb);},final(){},destroy(e,cb){socket.destroy();cb(e);}});socket.on('data',b=>{if(!s.push(b))socket.pause();});socket.on('error',e=>s.destroy(e));socket.on('end',()=>s.push(null));const c=await openStream(s,opts);try{await c.closeDeadline(Date.now()+500);assert(c.closed&&s.destroyed&&socket.destroyed);}finally{s.destroy();c.destroy();}
});
await test('a second deadline call cannot reset the first close and ordinary close shares it',ignoreClose,async({open})=>{
 for(const r of [false,recovery]){const c=await open({recovery:r,timeout:3000}),first=c.closeDeadline(Date.now()+70),failure=assert.rejects(first,timeout);await assert.rejects(c.closeDeadline(null),closed);const ordinary=assert.rejects(c.close(),timeout);await Promise.all([failure,ordinary]);await assert.rejects(c.closeDeadline(Date.now()+1000),closed);}
});
await test('already exhausted recovery is explicitly disabled even though CloseDeadline rejects',{},async({open})=>{
 let calls=0,stream;const c=await open({recovery,dial:(_n,_a,ctx)=>{if(++calls>1)throw Error('offline');return stream=net.connect({host:ctx.host,port:ctx.port});}});const ended=event(c,'close');stream.destroy();await ended;assert(c.recoveryEnabled);await assert.rejects(c.closeDeadline(Date.now()+1000),closed);assert.equal(c.recoveryEnabled,false);await assert.rejects(c.reconnect());
});
await test('deadline close cancels reconnect and destroys a late transport without resurrection',{},async({open,opts})=>{
 let calls=0,stream,late;const controller=new AbortController();const c=await open({recovery,signal:controller.signal,dial:(_n,_a,ctx)=>{if(++calls>1)return new Promise(resolve=>late=resolve);return stream=net.connect({host:ctx.host,port:ctx.port});}});const changed=event(c,'recovering');stream.destroy();await changed;for(let i=0;!late&&i<100;i++)await delay(5);assert(late);const joining=assert.rejects(c.reconnect());await assert.rejects(c.closeDeadline(Date.now()+50),closed);await joining;const s=net.connect({host:opts.host,port:opts.port});s.on('error',()=>{});late(s);for(let i=0;!s.destroyed&&i<100;i++)await delay(5);assert(s.destroyed&&c.closed);assert.equal(c.recoveryEnabled,false);assert.equal(getEventListeners(controller.signal,'abort').length,0);
});
await test('peer EOF during close propagates failure and leaves a single terminal state',{onMethod(e,s){if(e.cls===10&&e.id===50){s.destroy();return true;}}},async({open})=>{
 const c=await open();let closes=0;c.on('close',()=>closes++);await assert.rejects(c.closeDeadline(Date.now()+800),/EOF|closed|ended/);assert(c.closed);assert.equal(closes,1);await c.notifyRecoveryCancel();
});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/close-deadline-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,timings,sources,scope:'Absolute close deadline, null clearing, deadline input snapshots, no confirm wait, pending streams, arbitrary Duplex backpressure, shared close and terminal recovery ownership. Timing samples only, not production performance.'},null,2)+'\n');console.log(`${tests.length} close deadline fixture groups passed`);
