import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {connect,newConnectionProperties} from './client.mjs';
import * as core from '../web/engine.mjs';
import {fixture,clientProperties,sampleProperties,method,u16,short,delay} from './metadata-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['session.mbt','authentication.mbt','cmd/web/authentication.mbt','tools/client.mjs','tools/recovery.mjs','tools/recovery-peer.mjs','tools/metadata-peer.mjs','tools/test-metadata.mjs','web/engine.mjs']);
const tests=[];
async function test(name,action){const watchdog=setTimeout(()=>{throw Error('Metadata fixture timeout: '+name);},10000);try{await action();tests.push(name);console.log('PASS '+name);}finally{clearTimeout(watchdog);}}
const capabilities={'publisher_confirms':true,'consumer_cancel_notify':true,'connection.blocked':true,'basic.nack':true};
await test('default identity factory returns independently mutable identity tables',async()=>{
 const a=newConnectionProperties(),b=newConnectionProperties();assert.deepEqual(a,{product:'moonbit-amqp',version:'0.24.0',platform:'moonbit'});a.product='changed';assert.equal(b.product,'moonbit-amqp');assert(!Object.hasOwn(b,'capabilities'));
});
await test('default client metadata equals independently decoded start-ok properties',()=>fixture({},async({open,state})=>{
 const c=await open();assert.deepEqual(clientProperties(state)[0],{...newConnectionProperties(),capabilities});assert.deepEqual(c.clientProperties,clientProperties(state)[0]);assert.deepEqual(c.config.properties,c.clientProperties);await c.close();
}));
await test('custom nested numeric binary and Unicode properties survive the actual handshake',()=>fixture({},async({open,state})=>{
 const properties=structuredClone(sampleProperties);properties.capabilities={disabled:false};const before=structuredClone(properties),c=await open({properties});
 assert.deepEqual(properties,before);assert.deepEqual(clientProperties(state)[0],{...sampleProperties,capabilities});assert.deepEqual(c.clientProperties,clientProperties(state)[0]);await c.close();
}));
await test('capabilities are replaced even when the caller supplies an invalid capability value',()=>fixture({},async({open,state})=>{
 for(const capabilities of [false,{$type:'unknown'},()=>{},undefined]){const c=await open({properties:{capabilities}});assert.deepEqual(Object.keys(c.clientProperties),['capabilities']);assert(Object.values(c.clientProperties.capabilities).every(v=>v===true));await c.close();}
 assert.equal(clientProperties(state).length,4);
 const key='bridge-capabilities';assert(!core.session_open_auth_properties(key,'[{"kind":"plain","mechanism":"PLAIN","username":"u","password":"p"}]','/','en_US',2,4096,0,false,'{"capabilities":{"$type":"unknown"}}').startsWith('ERROR:'));core.session_drop(key);
}));
await test('invalid property representations fail before opening a network connection',()=>fixture({},async({opts,state})=>{
 const cycle={};cycle.self=cycle;const accessor={};Object.defineProperty(accessor,'secret',{get(){throw Error('getter must not run');},enumerable:true});
 const extra=[];extra.note='not indexed';const symbol={};symbol[Symbol('key')]=true;
 const deep={};let cursor=deep;for(let i=0;i<40;i++)cursor=cursor.child={};
 for(const properties of [[],1,{x:undefined},{x:NaN},{x:1.5},{x:1n},{x:()=>{}},{x:new Date()},cycle,accessor,symbol,{x:Array(2)},{x:extra},deep,{x:'\ud800'},{['x'.repeat(256)]:true},{x:{$type:'int64',value:'bad'}},{x:'x'.repeat(2097153)}])
  await assert.rejects(connect({...opts,properties}),error=>!error.message.includes('getter must not run'));
 assert.equal(state.accepted,0);
}));
await test('server properties locales and version are copied from wire and kept independent',()=>fixture({properties:sampleProperties,locales:'en_US  fr_FR'},async({open})=>{
 const c=await open({vhost:'tenant',locale:'fr_FR'});assert.deepEqual(c.serverProperties,sampleProperties);assert.deepEqual(c.serverLocales,['en_US','','fr_FR']);assert.deepEqual(c.serverVersion,{major:0,minor:9});
 const snapshot=c.serverProperties;snapshot.nested.flags.length=0;c.serverLocales.push('other');c.serverVersion.major=99;
 assert.deepEqual(c.serverProperties,sampleProperties);assert.equal(c.serverVersion.major,0);assert.equal(c.serverLocales.length,3);assert.equal(c.config.vhost,'tenant');assert.equal(c.config.locale,'fr_FR');await c.close();
}));
await test('metadata retains hostile field names as data without prototype mutation',()=>fixture({properties:JSON.parse('{"__proto__":{"polluted":true},"constructor":"literal"}')},async({open,state})=>{
 const properties=JSON.parse('{"__proto__":{"polluted":true},"constructor":"literal"}'),c=await open({properties});
 assert.equal({}.polluted,undefined);assert.equal(c.serverProperties.__proto__.polluted,true);assert.equal(c.clientProperties.__proto__.polluted,true);assert.equal(clientProperties(state)[0].constructor,'literal');await c.close();
}));
await test('TCP address endpoints match the actual accepted socket and survive close',()=>fixture({},async({open,opts,state})=>{
 const c=await open(),peer=[...state.sockets][0],local=c.localAddress,remote=c.remoteAddress;
 assert.deepEqual(local,{address:peer.remoteAddress,port:peer.remotePort,family:peer.remoteFamily});assert.equal(remote.address,'127.0.0.1');assert.equal(remote.port,opts.port);assert.equal(remote.family,'IPv4');
 c.localAddress.port=0;assert.deepEqual(c.localAddress,local);assert.equal(c.tlsState.encrypted,false);assert.equal(c.tlsState.handshakeComplete,false);assert.equal(c.tlsState.peerCertificate,null);
 const info=c.connectionInfo;assert.equal(info.closed,false);await c.close();assert.equal(c.connectionInfo.closed,true);assert.deepEqual(c.localAddress,local);assert.deepEqual(c.remoteAddress,remote);assert.equal(c.serverProperties.product,'independent peer');
}));
await test('querying metadata and changing returned values does not change pending RPC state',()=>fixture({},async({open,state})=>{
 const c=await open(),ch=await c.openChannel(),before=state.methods.length;
 for(let i=0;i<100;i++){const info=c.connectionInfo;info.clientProperties.capabilities={};info.serverProperties.product='changed';info.limits.channelMax=0;}
 assert.equal(state.methods.length,before);await ch.qos(0);assert.equal(c.clientProperties.capabilities['basic.nack'],true);await c.close();
}));
await test('IPv6 endpoint metadata identifies the actual loopback connection',()=>fixture({listenHost:'::1'},async({open,opts,state})=>{
 const c=await open(),peer=[...state.sockets][0];assert.deepEqual(c.remoteAddress,{address:'::1',port:opts.port,family:'IPv6'});assert.deepEqual(c.localAddress,{address:peer.remoteAddress,port:peer.remotePort,family:'IPv6'});await c.close();
}));
await test('property validation is bounded by configured frame size before protocol use',()=>fixture({},async({opts,state})=>{
 await assert.rejects(connect({...opts,frameMax:4096,properties:{large:'x'.repeat(8192)}}),/properties|options/);assert.equal(state.accepted,0);
 const c=await connect({...opts,properties:{data:'x'.repeat(3000)},frameMax:4096});try{await c.close();}finally{c.destroy();}
}));
await test('recovery replaces server metadata and endpoints while retaining initial client snapshot',()=>fixture({properties:n=>({product:'peer-'+n,nested:{generation:n}})},async({open,state})=>{
 const properties={nested:{x:'initial'}},c=await open({properties,recovery:{retryDelay:10,retryJitter:0,maxRetries:3}}),first=c.connectionInfo;
 properties.nested.x='caller mutation';c.clientProperties.nested.x='getter mutation';const ready=once(c,'recovered',{signal:AbortSignal.timeout(3000)});[...state.sockets][0].destroy();await ready;
 assert.equal(c.connectionInfo.generation,2);assert.equal(first.generation,1);assert.equal(first.serverProperties.product,'peer-1');assert.equal(c.serverProperties.product,'peer-2');assert.deepEqual(clientProperties(state)[1],clientProperties(state)[0]);assert.equal(c.clientProperties.nested.x,'initial');assert.notEqual(c.localAddress.port,first.localAddress.port);assert.equal(c.connectionInfo.state,'open');await c.close();
}));
await test('single-channel recovery leaves connection metadata generation unchanged',()=>fixture({},async({open,state})=>{
 const c=await open({recovery:{retryDelay:5,retryJitter:0,maxRetries:3}}),ch=await c.openChannel(),before=c.connectionInfo,ready=once(ch,'recovered',{signal:AbortSignal.timeout(3000)});
 [...state.sockets][0].write(method(ch._raw.id,20,40,u16(404),short('gone'),u16(0),u16(0)));await ready;assert.deepEqual(c.connectionInfo,before);await c.close();
}));
await test('metadata bridge errors stay redacted and legacy session open exports still work',async()=>{
 assert.equal(core.connection_properties('{"secret":"must-not-appear"'), 'ERROR: invalid client properties');assert.equal(core.session_metadata('unknown'),'ERROR: connection metadata unavailable');
 const key='legacy-metadata';assert(!core.session_open(key,'u','p','/',2,4096,0).startsWith('ERROR:'));assert.equal(JSON.parse(core.session_metadata(key)).serverVersion,null);core.session_drop(key);
});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/metadata-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Independent byte peer verifies actual properties and metadata snapshots, validation, endpoint mapping, protocol neutrality and connection versus channel recovery generations. TLS and native reference comparisons are separate.'},null,2)+'\n');
console.log(`${tests.length} connection metadata fixture groups passed`);
