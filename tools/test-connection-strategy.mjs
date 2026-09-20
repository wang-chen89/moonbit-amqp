import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import {once,getEventListeners} from 'node:events';
import {DefaultConnectionRecovery} from './client.mjs';
import {fixture,delay,method,u16,u32,short,deliver} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/connection-strategy.mjs','tools/recovery-peer.mjs','tools/test-connection-strategy.mjs','web/engine.mjs']);
const tests=[],base={maxRetries:2,retryDelay:2,retryJitter:0},event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(4000)});
const test=async(name,options,fn)=>{await fixture(options,fn);tests.push(name);console.log('PASS '+name);};
const config=(strategy,more={})=>({timeout:500,recovery:{...base,...more,connectionRecovery:strategy}});
const noop=()=>({onConnectionClose(){},onChannelClose(){}});
function gate(){let resolve;return {promise:new Promise(r=>resolve=r),release:()=>resolve()};}
const closedSignal=async p=>{let closed=false;p.then(()=>closed=true);await Promise.resolve();return closed;};
const absent={onMethod(e,s){if(e.cls===60&&e.id===70&&e.args.subarray(3,-1).toString()==='absent'){s.write(method(e.ch,20,40,u16(404),short('missing'),u16(60),u16(70)));return true;}}};
const expired=e=>e.code==='AMQP_RECOVERY_CONTEXT_EXPIRED';

await test('invalid connection strategy fails before opening transport',{},async({open,state})=>{for(const value of [null,false,{},()=>{},{onConnectionClose(){}},{onConnectionClose(){},onChannelClose:3}])await assert.rejects(open(config(value)),/connectionRecovery/);assert.equal(state.accepted,0);});
await test('no-op policy receives both connection and channel loss without automatic redial',{},async({open,state})=>{
 const seen=[],ended=gate(),s=noop();s.onConnectionClose=(c,error)=>{seen.push(['connection',error.message]);ended.release();};s.onChannelClose=(ch,error)=>seen.push(['channel',error.message]);const c=await open(config(s)),ch=await c.openChannel();await ch.declareQueue('retained');[...state.sockets][0].destroy();await ended.promise;await delay(5);assert.equal(state.accepted,1);assert.equal(c.state,'disconnected');assert.equal(ch.state,'disconnected');assert(c._raw.closed&&ch._raw.closed);assert(!c.closed&&!ch.closed);assert(c.topologyConfiguration().queues.retained);assert.equal(await closedSignal(c.notifyRecoveryCancel()),false);assert.equal(await closedSignal(ch.notifyRecoveryCancel()),false);assert.deepEqual(seen.map(x=>x[0]).sort(),['channel','connection']);await assert.rejects(c.openChannel());await assert.rejects(ch.get('retained'));
});
await test('manual reconnect after a no-op decision restores the original channel and consumer',{},async({open,state})=>{
 const ended=gate(),s=noop();s.onConnectionClose=()=>ended.release();const c=await open(config(s)),ch=await c.openChannel(),messages=[];await ch.declareQueue('manual');await ch.consume('manual',m=>messages.push(m.body.toString()),{consumerTag:'manual',noAck:true});[...state.sockets][0].destroy();await ended.promise;await Promise.all([c.reconnect(),ch.reconnect(),c.reconnect()]);assert.equal(state.accepted,2);assert.equal(ch.state,'open');deliver([...state.sockets].at(-1),ch._raw.id,1,'manual','restored');for(let i=0;!messages.length&&i<30;i++)await delay(5);assert.deepEqual(messages,['restored']);
});
await test('asynchronous decision delays recovery and uses the bound method snapshot',{},async({open,state})=>{
 const entered=gate(),resume=gate(),s={calls:0,onChannelClose(){},async onConnectionClose(c,error,ctx){this.calls++;entered.release();await resume.promise;return ctx.reconnect();}};const c=await open(config(s));await c.openChannel();s.onConnectionClose=()=>{throw Error('mutated method');};[...state.sockets][0].destroy();await entered.promise;assert.equal(state.accepted,1);const ready=c.waitForReady();resume.release();await ready;assert.equal(state.accepted,2);assert.equal(s.calls,1);assert.equal(c.recoveryConfig.hasCustomConnectionRecovery,true);assert(!Object.values(c.recoveryConfig).some(v=>typeof v==='function'));
});
await test('default delegate restores repeatedly and each physical loss has one notification per resource',{},async({open,state})=>{
 const defaults=new DefaultConnectionRecovery(),counts={connection:0,channel:0};const c=await open(config({onConnectionClose(...a){counts.connection++;return defaults.onConnectionClose(...a);},onChannelClose(...a){counts.channel++;return defaults.onChannelClose(...a);}})),a=await c.openChannel(),b=await c.openChannel();await a.declareQueue('delegate');for(let i=0;i<2;i++){const ready=event(c,'recovered');[...state.sockets].at(-1).destroy();await ready;}assert.deepEqual(counts,{connection:2,channel:4});assert.equal(state.accepted,3);await b.get('delegate');
});
await test('channel no-op retains topology and a sibling stays usable until manual reconnect',absent,async({open,state})=>{
 const hit=gate(),s=noop();let code;s.onChannelClose=(ch,error)=>{code=error.code;hit.release();};const c=await open(config(s)),ch=await c.openChannel(),other=await c.openChannel();await ch.declareQueue('retained');await assert.rejects(ch.get('absent'));await hit.promise;assert.equal(code,404);assert.equal(ch.state,'disconnected');await other.get('retained');assert(c.topologyConfiguration().queues.retained);await ch.reconnect();assert.equal(ch.state,'open');assert.equal(state.accepted,1);
});
await test('default channel strategy reopens only the failed channel',absent,async({open,state})=>{
 let con=0,chan=0;const defaults=new DefaultConnectionRecovery(),c=await open(config({onConnectionClose(...args){con++;return defaults.onConnectionClose(...args);},onChannelClose(...args){chan++;return defaults.onChannelClose(...args);}})),ch=await c.openChannel(),other=await c.openChannel(),raw=other._raw;await ch.declareQueue('exists');const ready=event(ch,'recovered');await assert.rejects(ch.get('absent'));await ready;assert.equal(chan,1);assert.equal(con,0);assert.equal(state.accepted,1);assert.equal(other._raw,raw);await ch.get('exists');
});
await test('connection decision may close permanently and settle all cancellation observers',{},async({open,state})=>{
 const s=noop();s.onConnectionClose=(c,e,ctx)=>ctx.close();const c=await open(config(s)),ch=await c.openChannel(),end=event(c,'close');[...state.sockets][0].destroy();await end;await Promise.all([c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);assert.equal(c.recoveryEnabled,false);assert.equal(state.accepted,1);assert.deepEqual(c.topologyConfiguration().queues,{});await assert.rejects(c.reconnect());
});
await test('channel policy can discard its channel without closing the connection',absent,async({open,state})=>{
 const s=noop();s.onChannelClose=(ch,e,ctx)=>ctx.close();const c=await open(config(s)),ch=await c.openChannel(),other=await c.openChannel();await ch.declareQueue('discard');const end=event(ch,'close');await assert.rejects(ch.get('absent'));await end;assert.equal(c.state,'open');assert.equal(other.state,'open');assert.equal(c.topologyConfiguration().queues.discard,undefined);assert.equal(state.accepted,1);
});
await test('throwing policy reports callbackError and leaves manual recovery available',{},async({open,state})=>{
 const s=noop();s.onConnectionClose=()=>{throw Error('policy failure');};const c=await open(config(s));await c.openChannel();const error=event(c,'callbackError');[...state.sockets][0].destroy();assert.match((await error)[0].message,/policy failure/);assert.equal(c.state,'disconnected');assert.equal(state.accepted,1);await c.reconnect();assert.equal(c.state,'open');
});
await test('closing cancels a hung decision and revokes late actions',{},async({open,state})=>{
 const entered=gate();let ctx;const s=noop();s.onConnectionClose=(c,e,x)=>{ctx=x;entered.release();return new Promise(()=>{});};const c=await open(config(s));await c.openChannel();[...state.sockets][0].destroy();await entered.promise;await c.close();assert(ctx.signal.aborted);await assert.rejects(ctx.reconnect(),expired);await assert.rejects(ctx.close(),expired);assert.equal(getEventListeners(ctx.signal,'abort').length,0);assert.equal(state.accepted,1);
});
await test('external reconnect supersedes a delayed policy without a second dial',{},async({open,state})=>{
 const entered=gate(),resume=gate();let ctx,late;const s=noop();s.onConnectionClose=async(c,e,x)=>{ctx=x;entered.release();await resume.promise;late=assert.rejects(x.reconnect(),expired);await late;};const c=await open(config(s));await c.openChannel();[...state.sockets][0].destroy();await entered.promise;await c.reconnect();assert(ctx.signal.aborted);resume.release();await delay(5);await late;assert.equal(state.accepted,2);assert.equal(c.state,'open');
});
await test('connection loss supersedes an earlier pending single-channel decision',absent,async({open,state})=>{
 const channel=gate(),connection=gate();let ctx;const s=noop();s.onChannelClose=(ch,e,x)=>{ctx=x;channel.release();return new Promise(()=>{});};s.onConnectionClose=()=>connection.release();const c=await open(config(s)),ch=await c.openChannel();await assert.rejects(ch.get('absent'));await channel.promise;[...state.sockets][0].destroy();await connection.promise;assert(ctx.signal.aborted);await assert.rejects(ctx.reconnect(),expired);await c.reconnect();assert.equal(ch.state,'open');
});
await test('default exhaustion runs the policy once and cancels retained resources',{},async({open})=>{
 let calls=0,dials=0,raw;const defaults=new DefaultConnectionRecovery(),s=noop();s.onConnectionClose=(...a)=>{calls++;return defaults.onConnectionClose(...a);};const c=await open({...config(s),dial(_n,_a,x){if(++dials>1)throw Error('offline');return raw=net.connect({host:x.host,port:x.port});}}),ch=await c.openChannel();await ch.declareQueue('gone');const end=event(c,'close');raw.destroy();await end;await Promise.all([c.notifyRecoveryCancel(),ch.notifyRecoveryCancel()]);assert.equal(calls,1);assert.equal(dials,3);assert(c.closed&&ch.closed&&c.recoveryEnabled);assert.deepEqual(c.topologyConfiguration().queues,{});
});
await test('application close and failed initial handshake do not invoke recovery policy',{},async({open})=>{
 let calls=0;const s={onConnectionClose(){calls++;},onChannelClose(){calls++;}},c=await open(config(s));await c.openChannel();await c.close();await assert.rejects(open({...config(s),dial(){throw Error('initial failure');}}),/initial failure/);assert.equal(calls,0);
});
await test('in-band topology errors do not cause redundant custom channel recovery', {onMethod(e,s){if(e.peer===2&&e.cls===50&&e.id===10&&e.args.subarray(3,-5).toString()==='broken'){s.write(method(e.ch,20,40,u16(406),short('bad topology'),u16(50),u16(10)));return true;}}},async({open,state})=>{
 let callbacks=0;const defaults=new DefaultConnectionRecovery(),c=await open(config({onConnectionClose(...args){return defaults.onConnectionClose(...args);},onChannelClose(...args){callbacks++;return defaults.onChannelClose(...args);}})),ch=await c.openChannel();await ch.declareQueue('broken');await ch.declareQueue('kept');const ready=event(c,'recovered');[...state.sockets][0].destroy();await ready;assert.equal(callbacks,1);await ch.get('kept');
});
await test('completed no-op contexts expire while the public manual API remains usable',{},async({open,state})=>{
 let ctx;const entered=gate(),s=noop();s.onConnectionClose=(c,e,x)=>{ctx=x;entered.release();};const c=await open(config(s));[...state.sockets][0].destroy();await entered.promise;await delay(5);assert(ctx.signal.aborted);await assert.rejects(ctx.reconnect(),expired);await c.reconnect();assert.equal(c.state,'open');
});
await test('closing from disconnected state notification prevents the queued policy from running',{},async({open,state})=>{
 let calls=0;const s=noop();s.onConnectionClose=()=>calls++;const c=await open(config(s));c.on('stateChange',x=>{if(x.to==='disconnected')c.close();});const end=event(c,'close');[...state.sockets][0].destroy();await end;await delay(5);assert.equal(calls,0);assert.equal(state.accepted,1);
});
await test('external abort cancels a pending decision and permanently disables recovery',{},async({open,state})=>{
 let ctx;const entered=gate(),external=new AbortController(),s=noop();s.onConnectionClose=(c,e,x)=>{ctx=x;entered.release();return new Promise(()=>{});};const c=await open({...config(s),signal:external.signal});[...state.sockets][0].destroy();await entered.promise;external.abort();await c.notifyRecoveryCancel();assert(ctx.signal.aborted);assert.equal(c.recoveryEnabled,false);assert.equal(getEventListeners(external.signal,'abort').length,0);await assert.rejects(c.reconnect());
});
await test('all sixteen pending channel decisions cancel without runtime warnings', {onMethod(e,s){if(e.cls===10&&e.id===11){s.write(method(0,10,30,u16(64),u32(8192),u16(0)));return true;}}},async({open,state})=>{
 const warnings=[],warning=e=>{if(e.name==='MaxListenersExceededWarning')warnings.push(e.message);};process.on('warning',warning);
 try{const entered=gate(),contexts=[];const s={onConnectionClose(c,e,x){contexts.push(x);entered.release();return new Promise(()=>{});},onChannelClose(ch,e,x){contexts.push(x);return new Promise(()=>{});}};const c=await open(config(s));for(let i=0;i<16;i++)await c.openChannel();[...state.sockets][0].destroy();await entered.promise;await delay(10);assert.equal(contexts.length,17);await c.close();assert(contexts.every(x=>x.signal.aborted));assert.deepEqual(warnings,[]);}finally{process.off('warning',warning);}
});
await test('starting a graceful connection close cancels a pending channel policy before close-ok', {onMethod(e,s){if(absent.onMethod(e,s))return true;if(e.cls===10&&e.id===50){setTimeout(()=>s.write(method(0,10,51)),60);return true;}}},async({open})=>{
 const entered=gate();let ctx;const s=noop();s.onChannelClose=(ch,e,x)=>{ctx=x;entered.release();return new Promise(()=>{});};const c=await open(config(s)),ch=await c.openChannel();await assert.rejects(ch.get('absent'));await entered.promise;const closing=c.close();assert.equal(c.state,'closing');assert(ctx.signal.aborted);await closing;
});
await test('default custom channel owner cleans up a fatal topology failure',absent,async({open})=>{
 const c=await open(config(new DefaultConnectionRecovery(),{topologyRecovery:{recoverTopology(){throw Error('fatal topology');}}})),ch=await c.openChannel(),other=await c.openChannel();await ch.declareQueue('failed');const end=event(ch,'close');await assert.rejects(ch.get('absent'));await end;assert(ch.closed);assert.equal(other.state,'open');assert.equal(c.topologyConfiguration().queues.failed,undefined);
});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/connection-strategy-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Independent scripted-peer recovery decision callbacks, no-op/delayed/default/manual recovery, preserved topology, cancellation, ownership and isolation. Native comparisons and broker delivery are separate.'},null,2)+'\n');console.log(`${tests.length} connection strategy fixture groups passed`);
