import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect} from './client.mjs';
import {fixture,method} from './recovery-peer.mjs';
import {withRabbit} from './rabbitmq-harness.mjs';
import {tokenIssuer,corruptSignature} from './oauth-test-token.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_SECRET_REFERENCE;assert(executable,'Set AMQP_SECRET_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/secret-reference-build.json',import.meta.url),'utf8'));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./secret-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['session.mbt','tools/client.mjs','tools/authentication.mjs','tools/secret-reference.go','tools/test-secret-native.mjs','tools/recovery-peer.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','tools/oauth-test-token.mjs','evidence/secret-reference-build.json','web/engine.mjs']);
async function native(request) {
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let stdout='',stderr='';
 const done=once(child,'exit'),timer=setTimeout(()=>child.kill(),12000);child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify(request)+'\n');
 try {const [code]=await done;assert.equal(code,0,stderr);return JSON.parse(stdout);}finally{clearTimeout(timer);if(child.exitCode===null)child.kill();}
}
const wire=[],broker=[];
for(const [secretHex,reason] of [['',''],['00ff0178','binary'],[Buffer.from('新密钥\0 token').toString('hex'),'刷新'],['61','x'.repeat(255)],['62','新'.repeat(85)],['63','😀'.repeat(63)]])await fixture({onMethod:(e,s)=>{
 if(e.cls===10&&e.id===70){s.write(method(0,10,71));return true;}
}},async({open,opts,state})=>{
 const expected=await native({Mode:'wire',Port:opts.port,InitialSecret:'test',SecretHex:secretHex,Reason:reason});assert(expected.connected&&expected.updated);
 const c=await open();await c.updateSecret(Buffer.from(secretHex,'hex'),reason);await c.close();
 const rows=state.methods.filter(e=>e.cls===10&&e.id===70);assert.equal(rows.length,2);assert.deepEqual(rows[0].args,rows[1].args);assert(rows.every(r=>r.ch===0));
 wire.push({secretHex,reason,argumentsHex:rows[0].args.toString('hex'),matched:true});
});
console.log(`${wire.length} native credential update wire cases matched`);
await withRabbit(async info=>{
 const token=tokenIssuer(info),initial=token();
 const cases=[['valid',()=>token()],['bad signature',()=>corruptSignature(token())],['wrong audience',()=>token({aud:'other'})],['changed subject',()=>token({sub:'other'})],['expired replacement',()=>token({exp:Math.floor(Date.now()/1000)-60})],['reduced scopes',()=>token({scope:['localreview.read:*/*']})]];
 for(const [name,create] of cases) {
  const replacement=create();
  const expected=await native({Mode:'broker',Port:info.port,InitialSecret:initial,NewSecret:replacement,Reason:name});
  const actual={connected:false,updated:false,operationSucceeded:false,code:0};let c;
  try {
   c=await connect({host:'127.0.0.1',port:info.port,username:'ignored',password:initial,allowInsecureAuth:true,timeout:3000,heartbeat:2});actual.connected=true;
   await c.updateSecret(replacement,name);actual.updated=true;
   const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();await ch.publish('',queue,'after-update');
   assert.equal((await ch.get(queue,{noAck:true})).body.toString(),'after-update');actual.operationSucceeded=true;await c.close();
  } catch(error) {if(!error.code)throw error;actual.code=error.code;}
  finally{c?.destroy();}
  assert.deepEqual(actual,expected,name);assert(actual.connected);
  if(name==='valid')assert(actual.updated&&actual.operationSucceeded);
  else if(['expired replacement','reduced scopes'].includes(name))assert(actual.updated&&!actual.operationSucceeded&&actual.code!==0);
  else assert(!actual.updated&&actual.code!==0);
  broker.push({name,reference:expected,actual,matched:true});console.log('PASS native OAuth '+name);
 }
 assertSourceUnchanged(sources);assert.equal(digest(executable),build.binarySha256);
 fs.writeFileSync(new URL('../evidence/secret-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),commit:build.commit,binarySha256:build.binarySha256,wireCases:wire.length,brokerCases:broker.length,wire,broker,brokerPackages:info.packages,sources,scope:'Six native exact-wire comparisons against independent TCP peer; six Go/Node comparisons against the same unmodified OAuth broker. Tokens/keys are not retained. Confirms acknowledged expired replacement followed by authorization refusal in both clients.'},null,2)+'\n');
},{oauth:true});
console.log(`${broker.length} native OAuth credential update outcomes matched`);
