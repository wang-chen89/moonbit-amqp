import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {once,getEventListeners} from 'node:events';
import {fixture,deliver,method,u16,short} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery-control.mjs','tools/recovery.mjs','tools/recovery-state.mjs','tools/recovery-channel.mjs','tools/recovery-peer.mjs','tools/test-recovery-control.mjs','web/engine.mjs']);
const tests=[],config={timeout:500,recovery:{maxRetries:2,retryDelay:5,retryJitter:0}};
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(4000)});
const isClosed=e=>e.code==='AMQP_RECOVERY_CLOSED';
async function test(name,options,fn){await fixture(options,fn);tests.push(name);console.log('PASS '+name);}
function dialer(){let attempts=0,failing=false,stream;return {get attempts(){return attempts;},get stream(){return stream;},set failing(v){failing=v;},dial(_network,_address,context){attempts++;if(failing)throw Error('injected dial failure');return stream=net.connect({host:context.host,port:context.port});}};}
async function settle(p){let done=false;p.then(()=>done=true);await Promise.resolve();return done;}

await test('disabled recovery rejects reconnect but cancellation waits for physical close',{},async({open})=>{
 const c=await open(),ch=await c.openChannel();for(const x of [c,ch]){await assert.rejects(x.reconnect(),isClosed);assert.equal(await settle(x.notifyRecoveryCancel()),false);}
 const a=c.notifyRecoveryCancel(),b=ch.notifyRecoveryCancel();await c.close();await Promise.all([a,b,c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);
});
await test('live connection reconnect is a no-op and many callers do not dial',{},async({open,state})=>{
 const c=await open(config);await Promise.all(Array.from({length:32},()=>c.reconnect()));assert.equal(state.accepted,1);assert.equal(c.connectionInfo.generation,1);assert.equal(await settle(c.notifyRecoveryCancel()),false);
});
await test('live channel reconnect replays topology without replacing the physical channel',{},async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareQueue('manual');const raw=a._raw,other=b._raw;
 const before=state.methods.filter(x=>x.cls===50&&x.id===10).length;await Promise.all(Array.from({length:12},()=>a.reconnect()));assert.equal(a._raw,raw);assert.equal(b._raw,other);assert.equal(state.methods.filter(x=>x.cls===50&&x.id===10).length,before+1);await a.get('manual');
});
await test('live channel replay preserves active consumers without a duplicate subscription',{},async({open,state})=>{
 const c=await open({...config,recovery:{...config.recovery,onTopologyError:()=>false}}),ch=await c.openChannel();await ch.declareQueue('active');const messages=[];await ch.consume('active',m=>messages.push(m),{consumerTag:'same',noAck:true});await ch.reconnect();assert.equal(state.methods.filter(e=>e.cls===60&&e.id===20).length,1);deliver([...state.sockets][0],ch._raw.id,1,'same','after replay');for(let i=0;!messages.length&&i<20;i++)await new Promise(r=>setTimeout(r,10));assert.equal(messages[0].body.toString(),'after replay');
});
await test('explicit callers join automatic connection recovery and preserve channels',{},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareQueue('joined');const changed=event(c,'stateChange');[...state.sockets][0].destroy();await changed;
 await Promise.all([c.reconnect(),c.reconnect(),ch.reconnect()]);assert.equal(c.state,'open');assert.equal(ch.state,'open');assert.equal(state.accepted,2);await ch.get('joined');
});
await test('retry exhaustion retains configured flags, clears topology and settles cancellation',{},async({open})=>{
 const d=dialer(),c=await open({...config,dial:d.dial}),ch=await c.openChannel();await ch.declareQueue('owned');const cn=c.notifyRecoveryCancel(),hn=ch.notifyRecoveryCancel();d.failing=true;const end=event(c,'close');d.stream.destroy();await end;
 await Promise.all([cn,hn,c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);assert.equal(d.attempts,3);assert(c.closed&&ch.closed&&c.recoveryEnabled&&c.connectionRecoveryEnabled&&c.topologyRecoveryEnabled);assert.equal(c.maxRetryCount,2);assert.equal(c.retryInterval,5);assert.deepEqual(c.topologyConfiguration().queues,{});
 await c.close();assert.equal(c.recoveryEnabled,false);assert.equal(c.maxRetryCount,0);await assert.rejects(c.reconnect(),isClosed);
});
await test('explicit retry after exhaustion starts a new usable lifecycle with fresh notification',{},async({open})=>{
 const d=dialer(),c=await open({...config,dial:d.dial}),old=await c.openChannel();await old.declareQueue('old');const oldCancel=c.notifyRecoveryCancel();d.failing=true;const end=event(c,'close');d.stream.destroy();await end;
 d.failing=false;await Promise.all([c.reconnect(),c.reconnect()]);assert.equal(d.attempts,4);assert.equal(c.connectionInfo.generation,2);assert.equal(old.closed,true);assert.deepEqual(c.topologyConfiguration().queues,{});const newCancel=c.notifyRecoveryCancel();assert.notEqual(newCancel,oldCancel);assert.equal(await settle(newCancel),false);const fresh=await c.openChannel();await fresh.declareQueue('fresh');await fresh.get('fresh');await c.close();await newCancel;
});
await test('failed explicit retry rejects and can be retried again within the same configured policy',{},async({open})=>{
 const d=dialer(),c=await open({...config,dial:d.dial});d.failing=true;const end=event(c,'close');d.stream.destroy();await end;await assert.rejects(c.reconnect(),/exhausted/);assert.equal(d.attempts,5);assert(c.closed&&c.recoveryEnabled);d.failing=false;await c.reconnect();assert.equal(d.attempts,6);assert.equal(c.state,'open');
});
await test('closing during backoff settles notifications and rejects all joined reconnect calls',{},async({open})=>{
 const d=dialer(),c=await open({...config,recovery:{...config.recovery,retryDelay:10000},dial:d.dial});d.failing=true;const started=event(c,'recovering');d.stream.destroy();await started;const joined=c.reconnect();const rejected=assert.rejects(joined,isClosed);await c.close();await rejected;await c.notifyRecoveryCancel();assert.equal(d.attempts,1);await assert.rejects(c.reconnect(),isClosed);
});
await test('destroy or external abort permanently prevents resurrection after exhaustion',{},async({open})=>{
 for(const how of ['destroy','abort']){const d=dialer(),controller=new AbortController(),c=await open({...config,dial:d.dial,signal:controller.signal});d.failing=true;const end=event(c,'close');d.stream.destroy();await end;if(how==='destroy')c.destroy();else controller.abort();assert.equal(c.recoveryEnabled,false);assert.equal(getEventListeners(controller.signal,'abort').length,0);await assert.rejects(c.reconnect(),isClosed);}
});
await test('cancellation observation does not cancel recovery and listeners remain bounded',{},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),p=c.notifyRecoveryCancel(),q=ch.notifyRecoveryCancel();for(let i=0;i<1000;i++){assert.equal(c.notifyRecoveryCancel(),p);assert.equal(ch.notifyRecoveryCancel(),q);}const recovered=event(c,'recovered');[...state.sockets][0].destroy();await recovered;assert.equal(await settle(p),false);assert.equal(await settle(q),false);assert.equal(c.listenerCount('close'),0);await ch.close();await q;assert.equal(await settle(p),false);await c.close();await p;
});
await test('explicit close wins when reconnect is called from a terminal close observer',{},async({open})=>{
 const d=dialer(),c=await open({...config,dial:d.dial});let joined;d.failing=true;const end=event(c,'close');c.on('close',()=>{joined=assert.rejects(c.reconnect(),isClosed);c.close();});d.stream.destroy();await end;await joined;assert.equal(d.attempts,3);assert.equal(c.recoveryEnabled,false);
});
await test('single-channel automatic recovery is joined and a sibling remains usable', {onMethod(e,s){if(e.cls===60&&e.id===70&&e.args.subarray(3,-1).toString()==='missing'){s.write(method(e.ch,20,40,u16(404),short('missing'),u16(60),u16(70)));return true;}}},async({open,state})=>{
 const c=await open(config),ch=await c.openChannel(),sibling=await c.openChannel();await ch.declareQueue('exists');await assert.rejects(ch.get('missing'));await Promise.all([ch.reconnect(),ch.reconnect()]);assert.equal(ch.state,'open');assert.equal(state.accepted,1);await sibling.get('exists');
});
await test('closed channel reconnect rejects without recreating its owner records',{},async({open})=>{
 const c=await open(config),ch=await c.openChannel();await ch.declareQueue('gone');await ch.close();await assert.rejects(ch.reconnect(),isClosed);assert.deepEqual(c.topologyConfiguration().queues,{});assert.equal(c.closed,false);
});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/recovery-control-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Recovery control and cancellation fixtures, including exhaustion, lifecycle restart, active replay, joining, bounded observation and close/abort races. Native and real broker comparisons are separate.'},null,2)+'\n');console.log(`${tests.length} recovery control fixture groups passed`);
