import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {connect} from './client.mjs';
import * as core from '../web/engine.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import {fixture,method,u16,short,delay} from './recovery-peer.mjs';
const sources=sourceSnapshot(['authentication.mbt','session.mbt','cmd/web/authentication.mbt','cmd/web/session.mbt','tools/authentication.mjs','tools/client.mjs','tools/recovery.mjs','tools/recovery-peer.mjs','tools/test-authentication.mjs','web/engine.mjs']);
const tests=[];
async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
export function startResponse(entry) {
 const bytes=entry.args;let pos=4+bytes.readUInt32BE(0);
 const mechanism=bytes.subarray(pos+1,pos+1+bytes[pos]).toString();pos+=1+bytes[pos];
 const count=bytes.readUInt32BE(pos);pos+=4;const response=bytes.subarray(pos,pos+count);pos+=count;
 return {mechanism,responseHex:response.toString('hex'),locale:bytes.subarray(pos+1,pos+1+bytes[pos]).toString()};
}
await test('authentication rejects malformed candidates and redacts malformed bridge credentials',async()=>{
 for(const sasl of [[],{},[{mechanism:'bad mechanism'}],[{mechanism:'CUSTOM'}],[{mechanism:'PLAIN',password:'a\0b'}],[{mechanism:'AMQPLAIN',password:'\ud800'}]])
  await assert.rejects(connect({sasl,allowInsecureAuth:true}),/SASL|PLAIN|credential/);
 const secret='fake-secret-must-not-appear';const result=core.session_open_auth('redaction','{"password":"'+secret,'/','en_US',4,4096,0);
 assert.match(result,/ERROR:/);assert(!result.includes(secret));
 for(const locale of [42,'','a b','\ud800','a'.repeat(256)])await assert.rejects(connect({locale,allowInsecureAuth:true}),/locale/);
});
await test('client preference and locale are transmitted with exact PLAIN bytes',()=>fixture({mechanisms:'AMQPLAIN PLAIN',locales:'en_US fr_FR'},async({open,state})=>{
 const c=await open({locale:'fr_FR',sasl:[{mechanism:'PLAIN',username:'I\u00adX',password:'Ⅸ'},{mechanism:'AMQPLAIN'}]});
 assert.equal(c.authenticationMechanism,'PLAIN');
 assert.deepEqual(startResponse(state.methods.find(x=>x.cls===10&&x.id===11)),{mechanism:'PLAIN',locale:'fr_FR',responseHex:Buffer.from('\0I\u00adX\0Ⅸ').toString('hex')});await c.close();
}));
await test('AMQPLAIN preserves embedded zero bytes and UTF-8 without PLAIN delimiters',()=>fixture({mechanisms:'AMQPLAIN'},async({open,state})=>{
 const c=await open({sasl:[{mechanism:'AMQPLAIN',username:'u\0x',password:'密'}]});
 const response=startResponse(state.methods.find(x=>x.cls===10&&x.id===11));assert.equal(response.mechanism,'AMQPLAIN');
 assert.equal(response.responseHex,'054c4f47494e53000000037500780850415353574f52445300000003e5af86');await c.close();
}));
await test('selected async provider runs once and unselected providers are never evaluated',()=>fixture({mechanisms:'TOKEN'},async({open,state})=>{
 let calls=0,unused=0;
 const c=await open({sasl:[{mechanism:'OTHER',response:()=>{unused++;throw Error('unused');}},{mechanism:'TOKEN',response:async({mechanism,signal})=>{calls++;assert.equal(mechanism,'TOKEN');assert(!signal.aborted);await delay(15);return Buffer.from([0,255,1]);}}]});
 assert.equal(calls,1);assert.equal(unused,0);assert.equal(startResponse(state.methods.find(x=>x.id===11&&x.cls===10)).responseHex,'00ff01');await c.close();
}));
await test('unsupported mechanism or locale does not call a secret provider or send credentials',()=>fixture({mechanisms:'PLAIN'},async({open,state})=>{
 let calls=0;await assert.rejects(open({sasl:[{mechanism:'TOKEN',response:()=>{calls++;return 'secret';}}]}),/shared SASL/);
 await assert.rejects(open({locale:'missing'}),/locale/);assert.equal(calls,0);assert(!state.methods.some(x=>x.cls===10&&x.id===11));
}));
await test('provider rejection fails the handshake without writing an initial response',()=>fixture({mechanisms:'TOKEN'},async({open,state})=>{
 await assert.rejects(open({sasl:[{mechanism:'TOKEN',response:async()=>{throw Error('token provider failed');}}]}),/token provider failed/);
 assert(!state.methods.some(x=>x.cls===10&&x.id===11));
}));
await test('invalid or oversized provider results cannot escape through the bridge',()=>fixture({mechanisms:'TOKEN'},async({open,state})=>{
 for(const response of [()=>({}),()=>Buffer.alloc(1048577),()=>'\ud800'])await assert.rejects(open({sasl:[{mechanism:'TOKEN',response}]}),/SASL/);
 assert(!state.methods.some(x=>x.cls===10&&x.id===11));
}));
await test('handshake timeout aborts a pending provider and suppresses its late result',()=>fixture({mechanisms:'TOKEN'},async({open,state})=>{
 let suppliedSignal,release;
 const pending=open({timeout:60,sasl:[{mechanism:'TOKEN',response:({signal})=>{suppliedSignal=signal;return new Promise(resolve=>release=resolve);}}]});
 await assert.rejects(pending,/handshake timeout/);assert(suppliedSignal.aborted);release('late');await delay(15);
 assert(!state.methods.some(x=>x.cls===10&&x.id===11));
}));
await test('explicit AbortSignal cancels authentication before any late response can be sent',()=>fixture({mechanisms:'TOKEN'},async({open,state})=>{
 const controller=new AbortController();let signal,release,started;
 const start=new Promise(resolve=>started=resolve);
 const pending=open({signal:controller.signal,sasl:[{mechanism:'TOKEN',response:context=>{signal=context.signal;started();return new Promise(resolve=>release=resolve);}}]});
 await start;controller.abort(Error('cancel auth'));await assert.rejects(pending,/cancel auth/);assert(signal.aborted);release('late');await delay(10);assert(!state.methods.some(x=>x.id===11&&x.cls===10));
}));
await test('recovery retains original candidates and reselects against the new broker offer',()=>fixture({mechanisms:peer=>peer===1?'AMQPLAIN':'PLAIN'},async({open,state})=>{
 const sasl=[{mechanism:'AMQPLAIN',username:'u',password:'p'},{mechanism:'PLAIN',username:'u',password:'p'}];
 const c=await open({sasl,recovery:{retryDelay:5,retryJitter:0,maxRetries:2}});assert.equal(c.authenticationMechanism,'AMQPLAIN');
 sasl[1].password='changed';sasl.length=0;
 const recovered=once(c,'recovered',{signal:AbortSignal.timeout(3000)});[...state.sockets][0].destroy();await recovered;
 assert.equal(c.authenticationMechanism,'PLAIN');assert.equal(startResponse(state.methods.find(x=>x.peer===2&&x.cls===10&&x.id===11)).responseHex,'00750070');await c.close();
}));
await test('custom provider refreshes once per selected recovery handshake',()=>fixture({mechanisms:'TOKEN'},async({open,state})=>{
 let token='first',calls=0;const c=await open({sasl:[{mechanism:'TOKEN',response:()=>{calls++;return token;}}],recovery:{retryDelay:5,retryJitter:0,maxRetries:2}});
 token='second';const recovered=once(c,'recovered',{signal:AbortSignal.timeout(3000)});[...state.sockets][0].destroy();await recovered;
 assert.equal(calls,2);assert.equal(startResponse(state.methods.find(x=>x.peer===2&&x.cls===10&&x.id===11)).responseHex,Buffer.from('second').toString('hex'));await c.close();
}));
await test('failed selected authentication is not silently retried with another mechanism',()=>fixture({mechanisms:'PLAIN AMQPLAIN',onMethod:(e,s)=>{
 if(e.cls===10&&e.id===11){s.write(method(0,10,50,u16(403),short('denied'),u16(10),u16(11)));return true;}
}},async({open,state})=>{
 await assert.rejects(open({sasl:[{mechanism:'PLAIN'},{mechanism:'AMQPLAIN'}]}),/403/);
 assert.equal(state.methods.filter(x=>x.cls===10&&x.id===11).length,1);assert.equal(state.accepted,1);
}));
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/auth-fixtures.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),passed:tests.length,tests,sources,scope:'Independent scripted TCP peer, including custom async response lifecycle and recovery; real certificate authentication is tested separately.'},null,2)+'\n');
console.log(`${tests.length} authentication fixture groups passed`);
