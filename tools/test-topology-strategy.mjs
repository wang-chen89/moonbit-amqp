import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once,getEventListeners} from 'node:events';
import {DefaultTopologyRecovery} from './client.mjs';
import {fixture,delay,method,u16,short,deliver} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/topology-strategy.mjs','tools/recovery-peer.mjs','tools/test-topology-strategy.mjs','web/engine.mjs']);
const tests=[],base={maxRetries:2,retryDelay:2,retryJitter:0},event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(4000)});
const test=async(name,options,fn)=>{await fixture(options,fn);tests.push(name);console.log('PASS '+name);};
const opts=(strategy,more={})=>({timeout:600,recovery:{...base,...more,topologyRecovery:strategy}});
const cut=async(c,state)=>{const ready=event(c,'recovered');[...state.sockets].at(-1).destroy();return (await ready)[0];};
const expired=e=>e.code==='AMQP_RECOVERY_CONTEXT_EXPIRED';
function gate(){let resolve;return {promise:new Promise(r=>resolve=r),release:()=>resolve()};}

await test('invalid strategy fails before dialing',{},async({open,state})=>{
 for(const value of [null,false,()=>{}, {},{recoverTopology:4}])await assert.rejects(open(opts(value)),/topologyRecovery/);
 assert.equal(state.accepted,0);
});
await test('replacement suppresses built-in declarations and consumers while preserving channel setup',{},async({open,state})=>{
 let calls=0;const c=await open(opts({recoverTopology(ctx){calls++;assert.equal(ctx.channels.length,1);}})),ch=await c.openChannel();await ch.qos(3);await ch.confirmSelect();await ch.declareQueue('skip');await ch.consume('skip',()=>{},{consumerTag:'skip'});await cut(c,state);
 const replay=state.methods.filter(e=>e.peer===2);assert.equal(calls,1);assert.equal(replay.filter(e=>e.cls===50||e.cls===60&&e.id===20).length,0);assert(replay.some(e=>e.cls===60&&e.id===10));assert(replay.some(e=>e.cls===85));assert.equal(ch.state,'open');
});
await test('bound method snapshot delegates once and restores consumers across two losses',{},async({open,state})=>{
 const strategy={calls:0,async recoverTopology(ctx){this.calls++;assert(Object.isFrozen(ctx)&&Object.isFrozen(ctx.channels));const a=ctx.restoreDefault(),b=ctx.restoreDefault();assert.equal(a,b);return a;}};
 const c=await open(opts(strategy)),ch=await c.openChannel(),messages=[];await ch.declareQueue('restore');await ch.consume('restore',m=>messages.push(m.body.toString()),{consumerTag:'restored',noAck:true});strategy.recoverTopology=()=>{throw Error('replacement must not run');};
 for(let i=0;i<2;i++){await cut(c,state);deliver([...state.sockets].at(-1),ch._raw.id,1,'restored','ok'+i);for(let j=0;messages.length<=i&&j<30;j++)await delay(5);}
 assert.equal(strategy.calls,2);assert.deepEqual(messages,['ok0','ok1']);assert.equal(state.methods.filter(e=>e.cls===60&&e.id===20).length,3);assert.equal(c.recoveryConfig.hasCustomTopologyRecovery,true);
});
await test('custom channel operations can declare dynamic topology without replaying tracked entries',{},async({open,state})=>{
 const c=await open(opts({async recoverTopology(ctx){await ctx.channels[0].declareQueue('dynamic');}})),ch=await c.openChannel();await ch.declareQueue('original');await cut(c,state);const declarations=state.methods.filter(e=>e.peer===2&&e.cls===50&&e.id===10);assert.equal(declarations.length,1);assert.equal(declarations[0].args.subarray(3,-5).toString(),'dynamic');assert(c.topologyConfiguration().queues.original);assert(c.topologyConfiguration().queues.dynamic);
});
await test('custom declarations and subscriptions remain tracked for the next default recovery',{},async({open,state})=>{
 let calls=0;const messages=[];const c=await open(opts({async recoverTopology(ctx){if(++calls===1){await ctx.channels[0].declareQueue('added');await ctx.channels[0].consume('added',m=>messages.push(m.body.toString()),{consumerTag:'added',noAck:true});return;}return ctx.restoreDefault();}})),ch=await c.openChannel();
 for(let i=0;i<2;i++){await cut(c,state);deliver([...state.sockets].at(-1),ch._raw.id,1,'added','added-'+i);for(let j=0;messages.length<=i&&j<30;j++)await delay(5);}
 assert.deepEqual(messages,['added-0','added-1']);assert(c.topologyConfiguration().queues.added);assert.equal(state.methods.filter(e=>e.cls===60&&e.id===20).length,2);
});
await test('unreturned scoped operations finish before readiness and do not unlock outside application calls', {onMethod(e,s){if(e.peer===2&&e.cls===50&&e.id===10){setTimeout(()=>s.write(method(e.ch,50,11,short('operation'),Buffer.alloc(8))),70);return true;}}},async({open,state})=>{
 const started=gate();const c=await open(opts({recoverTopology(ctx){ctx.channels[0].declareQueue('operation');started.release();}})),ch=await c.openChannel();const ready=cut(c,state);await started.promise;await assert.rejects(ch.get('operation'),/Recovery in progress/);assert.equal(c.state,'reconnecting');await ready;assert(c.topologyConfiguration().queues.operation);
});
await test('public default strategy respects transient mode and resolves new anonymous queue names',{},async({open,state})=>{
 const c=await open(opts(new DefaultTopologyRecovery(),{topology:'transient'})),ch=await c.openChannel();await ch.declareQueue('durable',{durable:true});const {queue}=await ch.declareQueue('',{exclusive:true});await cut(c,state);assert.equal(c.resolveQueue(queue),'generated-2');assert.equal(state.methods.filter(e=>e.peer===2&&e.cls===50&&e.id===10).length,1);
});
await test('disabled topology never invokes a configured custom strategy',{},async({open,state})=>{
 let calls=0;const c=await open(opts({recoverTopology(){calls++;}},{topology:'none'})),ch=await c.openChannel();await ch.declareQueue('disabled');await cut(c,state);assert.equal(calls,0);assert.equal(c.topologyRecoveryEnabled,false);
});
await test('fatal custom error retries with a fresh context and cannot reuse the earlier scope',{},async({open,state})=>{
 const contexts=[];const c=await open(opts({async recoverTopology(ctx){contexts.push(ctx);if(contexts.length===1)throw Error('transient strategy failure');return ctx.restoreDefault();}})),ch=await c.openChannel();await ch.declareQueue('retry');const done=await cut(c,state);assert.equal(done.attempt,2);assert.equal(state.accepted,3);assert(contexts.every(x=>x.signal.aborted));await assert.rejects(contexts[0].restoreDefault(),expired);assert.equal(ch.state,'open');
});
await test('invalid results and invalid skipped entries exhaust bounded recovery',{},async({open,state})=>{
 for(const value of [true,[{}]]){const c=await open(opts({recoverTopology(){return value;}}));await c.openChannel();const end=event(c,'close');[...state.sockets].at(-1).destroy();const [error]=await end;assert.match(error.message,/exhausted/);assert.match(error.cause.message,/strategy|entity/);assert(c.closed);}
});
await test('returned skipped entities reach connection and channel recovered events',{},async({open,state})=>{
 const entry={type:'queue',name:'omitted',channel:1,error:Error('policy skip')};const c=await open(opts({recoverTopology(){return [entry];}})),ch=await c.openChannel();const done=await cut(c,state);assert.equal(done.skipped[0].name,'omitted');assert.notEqual(done.skipped[0],entry);assert(Object.isFrozen(done.skipped[0]));const ready=event(ch,'recovered');await ch.reconnect();assert.equal((await ready)[0].skipped[0].error,entry.error);
});
await test('close cancels an ignored strategy promise and revokes its late operations',{},async({open,state})=>{
 const entered=gate(),hold=gate();let ctx;const c=await open(opts({async recoverTopology(x){ctx=x;entered.release();await hold.promise;}}));await c.openChannel();[...state.sockets][0].destroy();await entered.promise;const joined=assert.rejects(c.reconnect());await c.close();await joined;assert(ctx.signal.aborted);await assert.rejects(ctx.restoreDefault(),expired);assert.throws(()=>ctx.channels[0].declareQueue('late'),expired);hold.release();await delay(5);assert(c.closed);assert.equal(state.accepted,2);assert.equal(getEventListeners(ctx.signal,'abort').length,0);
});
await test('transport loss interrupts a stalled strategy and the next attempt can recover',{},async({open,state})=>{
 const entered=gate();let calls=0,first;const c=await open(opts({recoverTopology(ctx){if(++calls===1){first=ctx;entered.release();return new Promise(()=>{});}return ctx.restoreDefault();}})),ch=await c.openChannel();await ch.declareQueue('again');const ready=event(c,'recovered');[...state.sockets][0].destroy();await entered.promise;[...state.sockets].at(-1).destroy();await ready;assert.equal(calls,2);assert(first.signal.aborted);assert.equal(ch.state,'open');
});
await test('closing one channel interrupts its strategy and leaves the sibling usable',{},async({open})=>{
 const entered=gate();let ctx;const c=await open(opts({recoverTopology(x){ctx=x;entered.release();return new Promise(()=>{});}})),ch=await c.openChannel(),sibling=await c.openChannel();const joining=assert.rejects(ch.reconnect());await entered.promise;await ch.close();await joining;assert(ctx.signal.aborted);await sibling.get('still-open');assert.equal(c.state,'open');
});
await test('readiness joins default restoration even if the callback omits its promise', {onMethod(e,s){if(e.peer===2&&e.cls===50&&e.id===10){setTimeout(()=>s.write(method(e.ch,50,11,short('held'),Buffer.alloc(8))),60);return true;}}},async({open,state})=>{
 let invoked=false;const c=await open(opts({recoverTopology(ctx){ctx.restoreDefault();invoked=true;}})),ch=await c.openChannel();await ch.declareQueue('held');const ready=cut(c,state);await delay(25);assert(invoked);assert.equal(c.state,'reconnecting');await ready;assert.equal(ch.state,'open');
});
await test('unreturned default failure cannot be mistaken for successful recovery', {onMethod(e,s){if(e.peer>1&&e.cls===50&&e.id===10){s.write(method(e.ch,20,40,u16(406),short('cannot declare'),u16(50),u16(10)));return true;}}},async({open,state})=>{
 const c=await open(opts({recoverTopology(ctx){ctx.restoreDefault();}},{onTopologyError:()=>false})),ch=await c.openChannel();await ch.declareQueue('bad');const end=event(c,'close');[...state.sockets][0].destroy();await end;assert(c.closed&&ch.closed);assert.equal(state.accepted,3);
});
await test('temporary scoped channels allow dynamic declarations with no tracked channels',{},async({open,state})=>{
 const c=await open(opts({async recoverTopology(ctx){assert.equal(ctx.channels.length,0);await ctx.withChannel(ch=>ch.declareQueue('standalone'));}}));await cut(c,state);assert.equal(state.methods.filter(e=>e.peer===2&&e.cls===50&&e.id===10).length,1);assert.equal(state.methods.filter(e=>e.peer===2&&e.cls===20&&e.id===40).length,1);
});
await test('a completed scope cannot send or open a channel and releases abort listeners',{},async({open,state})=>{
 let saved;const c=await open(opts({recoverTopology(ctx){saved=ctx;return ctx.restoreDefault();}}));await c.openChannel();await cut(c,state);assert(saved.signal.aborted);assert.throws(()=>saved.channels[0].get('late'),expired);await assert.rejects(saved.withChannel(()=>{}),expired);await assert.rejects(saved.restoreDefault(),expired);assert.equal(getEventListeners(saved.signal,'abort').length,0);
});
await test('single-channel custom recovery receives only the affected channel',{},async({open})=>{
 let count;const c=await open(opts({async recoverTopology(ctx){count=ctx.channels.length;await ctx.channels[0].declareQueue('custom-channel');}})),ch=await c.openChannel(),sibling=await c.openChannel(),before=sibling._raw;await ch.reconnect();assert.equal(count,1);assert.equal(sibling._raw,before);await sibling.get('custom-channel');
});
await test('strategy may handle a temporary task failure and continue default restoration',{},async({open,state})=>{
 let calls=0;const c=await open(opts({async recoverTopology(ctx){calls++;const task=ctx.withChannel(()=>{throw Error('optional task failed');});assert(task instanceof Promise);try{await task;}catch(error){assert.match(error.message,/optional/);}return ctx.restoreDefault();}})),ch=await c.openChannel();await ch.declareQueue('fallback');await cut(c,state);assert.equal(calls,1);assert.equal(ch.state,'open');await ch.get('fallback');
});
await test('strategy can catch a default failure and explicitly remove the failed channel', {onMethod(e,s){if(e.peer===2&&e.cls===50&&e.id===10){s.write(method(e.ch,20,40,u16(406),short('policy mismatch'),u16(50),u16(10)));return true;}}},async({open,state})=>{
 const c=await open(opts({async recoverTopology(ctx){try{return await ctx.restoreDefault();}catch{await ctx.channels[0].close();return [];}}},{onTopologyError:()=>false})),ch=await c.openChannel();await ch.declareQueue('optional');await cut(c,state);assert.equal(c.state,'open');assert(ch.closed);assert.equal(c.topologyConfiguration().queues.optional,undefined);const next=await c.openChannel();await next.get('another');
});
await test('explicit channel strategy failure returns once and retains its usable session',{},async({open})=>{
 let calls=0;const c=await open(opts({recoverTopology(){calls++;throw Error('fatal topology');}})),ch=await c.openChannel();await ch.declareQueue('retained');const before=ch._raw;await assert.rejects(ch.reconnect(),/fatal topology/);assert.equal(calls,1);assert.equal(ch._raw,before);assert.equal(ch.state,'open');assert(c.topologyConfiguration().queues.retained);await ch.get('retained');
});
await test('automatic channel strategy failure closes only that logical channel after one pass', {onMethod(e,s){if(e.cls===60&&e.id===70){s.write(method(e.ch,20,40,u16(404),short('missing'),u16(60),u16(70)));return true;}}},async({open})=>{
 let calls=0;const c=await open(opts({recoverTopology(){calls++;throw Error('fatal automatic topology');}})),ch=await c.openChannel(),sibling=await c.openChannel();await ch.declareQueue('forgotten');const end=event(ch,'close');await assert.rejects(ch.get('missing'));await end;assert.equal(calls,1);assert(ch.closed);assert.equal(sibling.state,'open');assert.equal(c.state,'open');assert.equal(c.topologyConfiguration().queues.forgotten,undefined);
});
await test('unreturned temporary channel failure propagates and cannot leak its channel',{},async({open,state})=>{
 const c=await open(opts({recoverTopology(ctx){ctx.withChannel(()=>{throw Error('temporary failed');});}}));const end=event(c,'close');[...state.sockets][0].destroy();await end;assert(c.closed);assert.equal(state.methods.filter(e=>e.cls===20&&e.id===40).length,2);
});
await test('blocking entity-error callbacks are cancelled by closing during default restoration', {onMethod(e,s){if(e.peer===2&&e.cls===50&&e.id===10){s.write(method(e.ch,20,40,u16(406),short('bad'),u16(50),u16(10)));return true;}}},async({open,state})=>{
 const entered=gate();const c=await open(opts(new DefaultTopologyRecovery(),{onTopologyError:()=>{entered.release();return new Promise(()=>{});}})),ch=await c.openChannel();await ch.declareQueue('blocked');[...state.sockets][0].destroy();await entered.promise;const joined=assert.rejects(c.reconnect());await assert.rejects(c.closeDeadline(Date.now()+100),e=>e.code==='AMQP_CONNECTION_CLOSED');await joined;assert(c.closed&&ch.closed);
});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/topology-strategy-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Independent scripted wire-peer checks for custom replacement/delegation, dynamic topology, retries, skipped entities, attempt revocation and cancellation. Native and broker validation are separate.'},null,2)+'\n');console.log(`${tests.length} topology strategy fixture groups passed`);
