import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fixture} from './recovery-peer.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_AUTH_REFERENCE;assert(executable,'Set AMQP_AUTH_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/auth-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);
assert.equal(digest(new URL('./authentication-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['authentication.mbt','session.mbt','cmd/web/authentication.mbt','cmd/web/session.mbt','tools/authentication.mjs','tools/client.mjs','tools/recovery-peer.mjs','tools/authentication-reference.go','tools/test-auth-native.mjs','evidence/auth-reference-build.json','web/engine.mjs']);
function fields(data) {
 let pos=0;const entries=[];
 while(pos<data.length){const key=data.subarray(pos+1,pos+1+data[pos]).toString();pos+=1+data[pos];assert.equal(data[pos++],83);const n=data.readUInt32BE(pos);pos+=4;entries.push([key,data.subarray(pos,pos+n).toString('hex')]);pos+=n;}
 assert.equal(pos,data.length);return entries.sort(([a],[b])=>a.localeCompare(b));
}
function response(entry) {
 const data=entry.args;let pos=4+data.readUInt32BE(0);const mechanism=data.subarray(pos+1,pos+1+data[pos]).toString();pos+=1+data[pos];
 const n=data.readUInt32BE(pos);pos+=4;const payload=data.subarray(pos,pos+n);pos+=n;
 return {mechanism,response:mechanism==='AMQPLAIN'?fields(payload):payload.toString('hex'),locale:data.subarray(pos+1,pos+1+data[pos]).toString()};
}
async function native(request) {
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let stdout='',stderr='';
 const exited=once(child,'exit'),timer=setTimeout(()=>child.kill(),10000);child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify(request)+'\n');
 try {const [code]=await exited;assert.equal(code,0,stderr);return JSON.parse(stdout);}finally{clearTimeout(timer);if(child.exitCode===null)child.kill();}
}
const builtin=mechanism=>({Mechanism:mechanism,Username:'I\u00adX',Password:'密'});
const cases=[
 {name:'client PLAIN preference',offers:'AMQPLAIN PLAIN',candidates:[builtin('PLAIN'),builtin('AMQPLAIN')]},
 {name:'client AMQPLAIN preference',offers:'PLAIN AMQPLAIN',candidates:[builtin('AMQPLAIN'),builtin('PLAIN')]},
 {name:'later supported EXTERNAL candidate',offers:'EXTERNAL',candidates:[builtin('PLAIN'),builtin('EXTERNAL')]},
 {name:'binary custom initial response',offers:'TOKEN',candidates:[{Mechanism:'TOKEN',ResponseHex:'00ff01'}]},
 {name:'empty custom initial response',offers:'TOKEN',candidates:[{Mechanism:'TOKEN',ResponseHex:''}]},
 {name:'unsupported custom candidate before PLAIN',offers:'PLAIN',candidates:[{Mechanism:'TOKEN',ResponseHex:'ab'},builtin('PLAIN')]},
 {name:'custom locale',offers:'PLAIN',locales:'fr_FR en_US',locale:'fr_FR',candidates:[builtin('PLAIN')]},
 {name:'no common mechanism',offers:'EXTERNAL',candidates:[builtin('PLAIN')]},
 {name:'mechanism names are not substring matches',offers:'PLAINPLUS',candidates:[builtin('PLAIN')]},
];
const results=[];
for(const scenario of cases)await fixture({mechanisms:scenario.offers,locales:scenario.locales},async({open,opts,state})=>{
 const expected=await native({Operation:'connect',Port:opts.port,Candidates:scenario.candidates,Locale:scenario.locale??'en_US'});
 const first=state.methods.filter(x=>x.cls===10&&x.id===11).map(response);
 const sasl=scenario.candidates.map(c=>({mechanism:c.Mechanism,...(Object.hasOwn(c,'ResponseHex')?{response:Buffer.from(c.ResponseHex,'hex')}:{username:c.Username,password:c.Password})}));
 let actual;
 try {const c=await open({sasl,locale:scenario.locale??'en_US'});actual={ok:true,mechanism:c.authenticationMechanism};await c.close();}
 catch {actual={ok:false};}
 assert.equal(actual.ok,expected.ok,scenario.name);
 const second=state.methods.filter(x=>x.cls===10&&x.id===11&&x.peer===2).map(response);assert.deepEqual(second,first);
 if(actual.ok)assert.equal(actual.mechanism,expected.value.mechanism);
 results.push({name:scenario.name,accepted:actual.ok,wire:first,matched:true});console.log('PASS native '+scenario.name);
});
assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
fs.writeFileSync(new URL('../evidence/auth-native-negotiation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),commit:build.commit,binarySha256:build.binarySha256,passed:results.length,results,sources,scope:'Native Go and Node connect independently to the same hand-encoded peer. Compare selected mechanism, response bytes (AMQPLAIN table order normalized) and locale, or common negotiation rejection. This is not a real broker test.'},null,2)+'\n');
console.log(`${results.length} native authentication negotiations matched`);
