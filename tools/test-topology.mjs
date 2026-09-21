import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {fixture,until,method,u16,short} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/recovery-state.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-peer.mjs','tools/test-topology.mjs','web/engine.mjs']);
const tests=[],config={recovery:{maxRetries:3,retryDelay:5,retryJitter:0},timeout:700};
const test=async(name,options,action)=>{await fixture(options,action);tests.push(name);console.log('PASS '+name);};
const event=(target,name)=>once(target,name,{signal:AbortSignal.timeout(4000)});
const cut=async(c,state)=>{const recovered=event(c,'recovered');[...state.sockets].at(-1).destroy();await recovered;};
const empty=()=>({qos:null,exchanges:{},queues:{},bindings:[],exchangeBindings:[]});
const queries=c=>({recoveryEnabled:c.recoveryEnabled,connectionRecoveryEnabled:c.connectionRecoveryEnabled,topologyRecoveryEnabled:c.topologyRecoveryEnabled,maxRetryCount:c.maxRetryCount,retryInterval:c.retryInterval});
await test('physical connection and channel expose disabled recovery and independent empty topology',{},async({open})=>{
 const c=await open(),ch=await c.openChannel();await ch.declareQueue('untracked');await ch.qos(3);assert.deepEqual(queries(c),{recoveryEnabled:false,connectionRecoveryEnabled:false,topologyRecoveryEnabled:false,maxRetryCount:0,retryInterval:0});assert.equal(c.reconnectionConfig,null);assert.equal(c.recoveryConfig,null);assert.deepEqual(ch.topologyConfiguration(),empty());assert.deepEqual(ch.topologyConfiguration(true),empty());const a=c.topologyConfiguration();a.queues.changed=true;assert.deepEqual(c.topologyConfiguration(),empty());assert.throws(()=>ch.topologyConfiguration('all'));await c.close();
});
await test('configured policy snapshots remain isolated and enabled getters reflect closing',{},async({open})=>{
 const options={...config,recovery:{...config.recovery,topology:'transient',maxTopologyEntries:12,onTopologyError:()=>true}};const c=await open(options);
 assert.deepEqual(queries(c),{recoveryEnabled:true,connectionRecoveryEnabled:true,topologyRecoveryEnabled:true,maxRetryCount:3,retryInterval:5});const saved=c.reconnectionConfig;saved.maxRetryCount=999;assert.equal(c.reconnectionConfig.maxRetryCount,3);const policy=c.recoveryConfig;assert.equal(policy.hasTopologyErrorHandler,true);assert.equal(policy.maxTopologyEntries,12);assert(!Object.values(policy).some(v=>typeof v==='function'));policy.topology='none';assert.equal(c.recoveryConfig.topology,'transient');assert.throws(()=>{c.recovery={};});
 const closing=c.close();assert.equal(c.recoveryEnabled,false);assert.equal(c.maxRetryCount,0);assert.equal(c.retryInterval,0);assert.equal(c.reconnectionConfig.maxRetryCount,3);await closing;
});
await test('disabled topology reports an empty configured view while connection recovery stays enabled',{},async({open})=>{
 const c=await open({...config,recovery:{...config.recovery,topology:'none'}}),ch=await c.openChannel();await ch.declareQueue('q');await ch.qos(2);assert.equal(c.recoveryEnabled,true);assert.equal(c.topologyRecoveryEnabled,false);assert.deepEqual(c.topologyConfiguration(),empty());assert.deepEqual(ch.topologyConfiguration(true),empty());await c.close();
});
await test('channel local and global views preserve independent channel QoS',{},async({open})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.qos(2,false,{prefetchSize:17});await b.qos(3,true);await a.declareExchange('ea');await b.declareExchange('eb','fanout');await a.declareQueue('qa');await b.declareQueue('qb');await a.bindQueue('qa','ea','key',{kind:1});await b.bindExchange('eb','ea','bridge');
 assert.deepEqual(Object.keys(a.topologyConfiguration().exchanges),['ea']);assert.deepEqual(Object.keys(b.topologyConfiguration().queues),['qb']);assert.equal(a.topologyConfiguration().bindings.length,1);assert.equal(b.topologyConfiguration().exchangeBindings.length,1);assert.equal(a.topologyConfiguration(true).qos.prefetchSize,17);assert.equal(b.topologyConfiguration(true).qos.global,true);assert.equal(Object.keys(a.topologyConfiguration(true).queues).length,2);assert.equal(c.topologyConfiguration().qos,null);await a.qos(9,true);assert.deepEqual(a.topologyConfiguration().qos,{prefetchCount:9,prefetchSize:0,global:true});await c.close();
});
await test('duplicate declarations retain both owners and the global view deduplicates bindings',{},async({open})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();for(const ch of [a,b]){await ch.declareExchange('e');await ch.declareQueue('q');await ch.bindQueue('q','e','k',{x:1});}
 for(const ch of [a,b])assert.equal(ch.topologyConfiguration().bindings.length,1);assert.equal(c.topologyConfiguration().bindings.length,1);await b.close();assert.equal(a.topologyConfiguration().bindings.length,1);assert.equal(c.topologyConfiguration().bindings.length,1);assert.deepEqual(b.topologyConfiguration(),empty());await c.close();
});
await test('nested arguments query copies cannot alter live declarations or later recovery',{},async({open,state})=>{
 const c=await open(config),a=await c.openChannel();const args={nested:{array:[1,{x:true}]},bytes:{$type:'bytes',hex:'00ff'}};await a.declareExchange('__proto__','direct',{arguments:args});await a.declareQueue('constructor',{arguments:args});await a.bindQueue('constructor','__proto__','k',args);args.nested.array[1].x=false;
 const view=a.topologyConfiguration(true);assert(Object.hasOwn(view.exchanges,'__proto__'));view.exchanges.__proto__.args.nested.array[1].x=false;view.queues.constructor.args.bytes.hex='99';view.bindings[0].args.nested.array=[];assert.equal(a.topologyConfiguration().exchanges.__proto__.args.nested.array[1].x,true);await cut(c,state);assert.equal(a.topologyConfiguration().queues.constructor.args.bytes.hex,'00ff');await c.close();
});
await test('cross-channel deletion and argument-specific unbind update every recorded owner',{},async({open})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();for(const ch of [a,b]){await ch.declareExchange('e');await ch.declareExchange('d');await ch.declareQueue('q');await ch.bindQueue('q','e','k',{v:1});await ch.bindQueue('q','e','k',{v:2});await ch.bindExchange('d','e','k');}
 await b.unbindQueue('q','e','k',{v:1});for(const ch of [a,b])assert.equal(ch.topologyConfiguration().bindings.length,1);await b.deleteExchange('e');for(const ch of [a,b]){const s=ch.topologyConfiguration();assert.equal(s.exchanges.e,undefined);assert.equal(s.bindings.length,0);assert.equal(s.exchangeBindings.length,0);}await b.deleteQueue('q');assert.deepEqual(a.topologyConfiguration().queues,{});await c.close();
});
await test('explicit channel close removes its orphan declarations and does not replay them',{},async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareQueue('idle',{autoDelete:true});await b.declareQueue('keep');await a.close();assert.equal(c.topologyConfiguration().queues.idle,undefined);assert.deepEqual(a.topologyConfiguration(),empty());await cut(c,state);assert.equal(c.topologyConfiguration().queues.idle,undefined);assert.equal(state.methods.filter(e=>e.peer===2&&e.cls===50&&e.id===10).length,1);await c.close();
});
await test('connection close clears live topology while already returned snapshots remain independent',{},async({open})=>{
 const c=await open(config),a=await c.openChannel();await a.qos(3);await a.declareQueue('q');const before=a.topologyConfiguration();await c.close();assert.equal(c.recoveryEnabled,false);assert.deepEqual(a.topologyConfiguration(),empty());assert.deepEqual(c.topologyConfiguration(),empty());assert.equal(before.queues.q.actualName,'q');before.queues.q.actualName='changed';assert.deepEqual(a.topologyConfiguration(),empty());
});
await test('anonymous queue keys and cross-channel bindings follow newly assigned names',{},async({open,state})=>{
 const c=await open(config),a=await c.openChannel(),b=await c.openChannel();await a.declareExchange('e');const {queue}=await a.declareQueue('',{exclusive:true});await b.bindQueue(queue,'e');const before=a.topologyConfiguration();await cut(c,state);const now=a.topologyConfiguration();assert.equal(now.queues[queue],undefined);const current=c.resolveQueue(queue);assert.equal(now.queues[current].declaredName,'');assert.equal(now.queues[current].actualName,current);assert.equal(b.topologyConfiguration().bindings[0].queue,current);assert(before.queues[queue]);await c.close();
});
await test('topology query does not publish unacknowledged or failed declarations', {onMethod(e,s,state){if(e.cls===50&&e.id===10&&!state.held){state.held=e;state.socket=s;return true;}}},async({open,state})=>{
 const c=await open(config),a=await c.openChannel();const pending=a.declareQueue('pending');await until(()=>state.held);assert.deepEqual(a.topologyConfiguration().queues,{});const e=state.held;state.socket.write(method(e.ch,50,11,short('pending'),Buffer.alloc(8)));await pending;assert(a.topologyConfiguration().queues.pending);await assert.rejects(a.declareExchange('bad','direct',{arguments:{['x'.repeat(256)]:true}}));assert.equal(a.topologyConfiguration().exchanges.bad,undefined);await c.close();
});
await test('passive probes leave tracked declarations unchanged',{},async({open})=>{
 const c=await open(config),a=await c.openChannel();await a.declareQueue('q',{durable:true});await a.declareQueue('q',{passive:true});await a.declareQueue('untracked',{passive:true});await a.declareExchange('untracked','direct',{passive:true});assert.equal(a.topologyConfiguration().queues.q.durable,true);assert.equal(a.topologyConfiguration().queues.untracked,undefined);assert.deepEqual(a.topologyConfiguration().exchanges,{});await c.close();
});
await test('per-channel duplicate ownership consumes and releases bounded topology capacity',{},async({open})=>{
 const c=await open({...config,recovery:{...config.recovery,maxTopologyEntries:2}}),a=await c.openChannel(),b=await c.openChannel(),d=await c.openChannel();await a.declareQueue('q');await b.declareQueue('q');await assert.rejects(d.declareQueue('q'),/limit/);await a.close();await d.declareQueue('q');await b.deleteQueue('q');await b.declareQueue('replacement');await d.declareQueue('another');await c.close();
});
await test('reconnecting queries expose desired topology and remain enabled until terminal close',{},async({open,state})=>{
 const c=await open({...config,recovery:{...config.recovery,retryDelay:30}}),a=await c.openChannel();await a.declareQueue('q');let observed=false;c.on('stateChange',e=>{if(e.to==='reconnecting'){observed=true;assert.equal(c.recoveryEnabled,true);assert(c.topologyConfiguration().queues.q);}});await cut(c,state);assert(observed);assert(a.topologyConfiguration().queues.q);await c.close();
});
assertSourceUnchanged(sources);fs.writeFileSync(new URL('../evidence/topology-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Recovery policy and topology queries against independent byte peer, per-channel duplicate ownership, cross-channel removal, closure lifecycle, deep snapshots, anonymous names, pending operations and bounded recording. Native comparison and real broker checks are separate.'},null,2)+'\n');console.log(`${tests.length} topology query fixture groups passed`);
