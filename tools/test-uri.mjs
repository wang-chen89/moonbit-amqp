import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {connect,Connection,parseURI} from './client.mjs';
import {connectionOptions} from './uri.mjs';
import {fixture,delay} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/client.mjs','tools/authentication.mjs','tools/recovery.mjs','tools/recovery-peer.mjs','tools/test-uri.mjs','web/engine.mjs']);
const tests=[];
async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
const address=(port,suffix='/')=>`amqp://u%2F:p%2B%40@127.0.0.1:${port}${suffix}`;
const startResponse=entry=>{
 const bytes=entry.args;let p=4+bytes.readUInt32BE(0);const mechanism=bytes.subarray(p+1,p+1+bytes[p]).toString();p+=1+bytes[p];
 const length=bytes.readUInt32BE(p);p+=4;return {mechanism,responseHex:bytes.subarray(p,p+length).toString('hex')};
};
await test('URI parser returns frozen records and explicit credential redaction',async()=>{
 const u=parseURI('amqps://user:fake-secret@host/%2F?heartbeat=9223372036854775807&auth_mechanism=plain');
 assert(Object.isFrozen(u));assert(Object.isFrozen(u.authMechanism));assert.equal(u.heartbeatSeconds,9223372036854775807n);
 assert.equal(u.redacted,'amqps://user:xxxxx@host/');assert(u.canonical.includes('fake-secret'));
 for(const input of [null,{},'amqp://u:fake-secret@host/%xx','amqp://host/\ud800'])assert.throws(()=>parseURI(input),error=>!error.message.includes('fake-secret'));
});
await test('URI normalization distinguishes URI and existing object defaults',async()=>{
 assert.deepEqual(connectionOptions({}),{});
 const o=connectionOptions('amqp://');assert.equal(o.heartbeat,10);assert.equal(o.timeout,30000);assert.equal(o.channelMax,2047);assert.equal(o.tls,undefined);
 assert.equal(connectionOptions('amqps://example.org').tls.servername,'example.org');assert.equal(connectionOptions('amqps://127.0.0.1').tls.servername,undefined);
 assert.throws(()=>connectionOptions('amqps://host',{tls:false}),/TLS/);
});
await test('URI transport rejects invalid ranges and mechanisms before opening a socket',()=>fixture({},async({opts,state})=>{
 for(const suffix of ['/?heartbeat=-1','/?heartbeat=65536','/?connection_timeout=-1','/?connection_timeout=2147483648','/?auth_mechanism=unknown','/?auth_mechanism='])
  await assert.rejects(connect(address(opts.port,suffix),{allowInsecureAuth:true}));
 for(const input of ['amqp://host:0','amqp://host:65536'])await assert.rejects(connect(input,{allowInsecureAuth:true}),/port/);
 assert.equal(state.accepted,0);
}));
await test('URI TCP authentication retains explicit opt-in and early cancellation',()=>fixture({},async({opts,state})=>{
 await assert.rejects(connect(address(opts.port)),/allowInsecureAuth/);
 await assert.rejects(connect(address(opts.port),{allowInsecureAuth:true,signal:AbortSignal.abort()}));
 assert.equal(state.accepted,0);
}));
for(const entry of ['function','static','constructor','object'])await test(entry+' entry sends exact decoded credentials and vhost',()=>fixture({},async({opts,state})=>{
 const uri=address(opts.port,'/%2Fspace%20%2B%2F?heartbeat=0&channel_max=4'),options={allowInsecureAuth:true,timeout:800};let c;
 try {
  if(entry==='function')c=await connect(uri,options);
  if(entry==='static')c=await Connection.connect(uri,options);
  if(entry==='object')c=await connect({...options,uri});
  if(entry==='constructor'){
   c=new Connection({...options,uri});
   // Constructor historically starts asynchronously; use an ordinary protocol operation after the peer handshake.
   for(let i=0;i<100&&!state.methods.some(e=>e.cls===10&&e.id===40);i++)await delay(5);
   await delay(5);
  }
  assert.deepEqual(startResponse(state.methods.find(e=>e.cls===10&&e.id===11)),{mechanism:'PLAIN',responseHex:Buffer.from('\0u/\0p+@').toString('hex')});
  const open=state.methods.find(e=>e.cls===10&&e.id===40);assert.equal(open.args.subarray(1,1+open.args[0]).toString(),'/space +/');
  assert.equal(c.limits.channelMax,4);assert.equal(c.limits.heartbeat,0);await c.close();
 }finally{c?.destroy();}
}));
await test('URI heartbeat overrides options while nonempty vhost and channel limits win',()=>fixture({heartbeat:7},async({opts,state})=>{
 const c=await connect(address(opts.port,'/uri?heartbeat=3&channel_max=6'),{allowInsecureAuth:true,vhost:'override',channelMax:2,heartbeat:1,timeout:800});
 try{assert.equal(c.limits.heartbeat,3);assert.equal(c.limits.channelMax,2);const e=state.methods.find(e=>e.cls===10&&e.id===40);assert.equal(e.args.subarray(1,1+e.args[0]).toString(),'override');await c.close();}finally{c.destroy();}
}));
await test('URI repeated SASL candidates use client order and explicit SASL overrides the URI',()=>fixture({mechanisms:'PLAIN AMQPLAIN'},async({opts})=>{
 const uri=address(opts.port,'/?auth_mechanism=amqplain&auth_mechanism=plain');
 const a=await connect(uri,{allowInsecureAuth:true,timeout:800});try{assert.equal(a.authenticationMechanism,'AMQPLAIN');await a.close();}finally{a.destroy();}
 const b=await connect(uri,{allowInsecureAuth:true,timeout:800,sasl:[{mechanism:'PLAIN'}]});try{assert.equal(b.authenticationMechanism,'PLAIN');await b.close();}finally{b.destroy();}
}));
await test('URI authentication identifiers are case insensitive like upstream DialConfig',()=>fixture({mechanisms:'PLAIN AMQPLAIN'},async({opts})=>{
 for(const name of ['PLAIN','PlAiN','plaın','AMQPLAIN','aMqPlAiN']) {
  const c=await connect(address(opts.port,'/?auth_mechanism='+encodeURIComponent(name)),{allowInsecureAuth:true,timeout:800});
  try{assert.equal(c.authenticationMechanism,name.toUpperCase());await c.close();}finally{c.destroy();}
 }
}));
await test('URI connection_timeout drives handshake expiry',()=>fixture({noStart:true},async({opts,state})=>{
 await assert.rejects(connect(address(opts.port,'/?connection_timeout=40'),{allowInsecureAuth:true}),/handshake timeout/);assert.equal(state.accepted,1);
}));
await test('URI TLS override ignores URI file parameters and snapshots its property object',async()=>{
 const tls={servername:'override.example'},options={tls};
 const o=connectionOptions('amqps://host/?cacertfile=missing&certfile=missing&keyfile=missing&server_name_indication=ignored',options);
 tls.servername='changed';assert.equal(o.tls.servername,'override.example');assert.equal(options.uri,undefined);
 assert.throws(()=>connectionOptions('amqps://host/?cacertfile=fake-secret'),error=>!error.message.includes('fake-secret')&&error.code==='ENOENT');
 assert.doesNotThrow(()=>connectionOptions('amqps://host/?certfile=missing'));
});
await test('URI recovery retains decoded endpoint credentials and ignores later caller mutation',()=>fixture({},async({opts,state})=>{
 const options={uri:address(opts.port,'/retained?heartbeat=0'),allowInsecureAuth:true,timeout:800,recovery:{retryDelay:5,retryJitter:0,maxRetries:3}};
 const c=await connect(options);try{
  options.uri='amqp://invalid:1';const recovered=once(c,'recovered',{signal:AbortSignal.timeout(3000)});[...state.sockets][0].destroy();await recovered;
  assert.equal(state.accepted,2);const starts=state.methods.filter(e=>e.cls===10&&e.id===11);assert.equal(starts.length,2);assert.deepEqual(startResponse(starts[0]),startResponse(starts[1]));
  await c.close();
 }finally{c.destroy();}
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/uri-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources,scope:'Actual MoonBit URI parser and transport entry against independent TCP peer; TLS file normalization is checked here, real TLS and native broker comparison separately.'},null,2)+'\n');
console.log(`${tests.length} URI connection fixture groups passed`);
