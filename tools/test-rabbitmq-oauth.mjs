import assert from 'node:assert/strict';
import fs from 'node:fs';
import {once} from 'node:events';
import {randomUUID} from 'node:crypto';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {tokenIssuer,corruptSignature} from './oauth-test-token.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['session.mbt','tools/client.mjs','tools/authentication.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','tools/oauth-test-token.mjs','tools/test-rabbitmq-oauth.mjs','web/engine.mjs']);
const tests=[],observations=[];async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
await withRabbit(async info=>{
 const token=tokenIssuer(info),connections=[],base={host:'127.0.0.1',port:info.port,username:'ignored',allowInsecureAuth:true,heartbeat:2,timeout:3000};
 const open=async options=>{const c=await connect({...base,password:token(),...options});connections.push(c);return c;};
 const rejected=async action=>{let captured;await assert.rejects(action,error=>{captured=error;return true;});return captured.code??null;};
 async function roundtrip(c,body) {
  const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();await ch.publish('',queue,body);
  assert.equal((await ch.get(queue,{noAck:true})).body.toString(),body);await ch.close();
 }
 try {
  await test('real RS256 OAuth token authenticates and permits a confirmed message',async()=>{const c=await open();await roundtrip(c,'before');await c.close();});
  await test('updating token keeps the connection and channel usable beyond the original expiry',async()=>{
   const expires=Math.floor(Date.now()/1000)+3,c=await open({password:token({exp:expires})}),ch=await c.openChannel();
   const {queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();await ch.publish('',queue,'before');assert.equal((await ch.get(queue,{noAck:true})).body.toString(),'before');
   await c.updateSecret(token(),'renew before expiry');await delay(Math.max(0,(expires+1)*1000-Date.now()));
   await ch.publish('',queue,'after');assert.equal((await ch.get(queue,{noAck:true})).body.toString(),'after');await roundtrip(c,'new-channel-after-expiry');
   observations.push({scenario:'renewal',updated:true,sameChannel:true,afterOriginalExpiry:true});await c.close();
  });
  await test('new token scopes restrict new channel operations until a later permission renewal',async()=>{
   const c=await open();await c.updateSecret(token({scope:['localreview.read:*/*']}),'reduce permissions');
   const restricted=await c.openChannel();const code=await rejected(()=>restricted.declareQueue('denied-'+randomUUID()));assert.equal(code,403);
   assert(!c.closed);await c.updateSecret(token(),'restore permissions');await roundtrip(c,'allowed-again');observations.push({scenario:'scopes',deniedCode:code,restored:true});await c.close();
  });
  for(const [name,next] of [
   ['bad signature',()=>corruptSignature(token())],['wrong audience',()=>token({aud:'another-service'})],['changed subject',()=>token({sub:'different-client'})],
  ])await test('OAuth rejects '+name+' during credential update',async()=>{
   const c=await open(),code=await rejected(()=>c.updateSecret(next(),'invalid replacement'));assert(c.closed);observations.push({scenario:name,rejected:true,code});
  });
  await test('RabbitMQ 4.0 acknowledges an expired replacement but refuses the next authorized operation',async()=>{
   const c=await open();await c.updateSecret(token({exp:Math.floor(Date.now()/1000)-60}),'expired replacement');
   const code=await rejected(async()=>{const ch=await c.openChannel();await ch.declareQueue('expired-'+randomUUID());});
   assert.equal(typeof code,'number');observations.push({scenario:'expired replacement',updateAcknowledged:true,operationRejected:true,code});c.destroy();
  });
  await test('an already expired initial token is refused',async()=>{await rejected(()=>open({password:token({exp:Math.floor(Date.now()/1000)-60})}));});
  await test('verified TLS carries a successful OAuth credential update and message',async()=>{
   const c=await open({port:info.tlsPort,allowInsecureAuth:false,tls:{ca:Buffer.from(info.certificate,'base64'),servername:'localhost'}});await c.updateSecret(token(),'TLS renewal');await roundtrip(c,'encrypted-new-token');await c.close();
  });
  await test('application token provider supplies renewed credentials to both live update and recovery',async()=>{
   const proxy=await proxyTo(info.port);let c;
   try {
    const expires=Math.floor(Date.now()/1000)+3;let current=token({exp:expires}),calls=0;
    c=await open({port:proxy.port,sasl:[{mechanism:'PLAIN',response:()=>{calls++;return '\0ignored\0'+current;}}],recovery:{maxRetries:3,retryDelay:30,retryJitter:0,onTopologyError:()=>false}});
    const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();
    current=token();await c.updateSecret(current,'application refresh');await delay(Math.max(0,(expires+1)*1000-Date.now()));
    const recovered=once(c,'recovered',{signal:AbortSignal.timeout(10000)});proxy.cut();await recovered;
    assert.equal(calls,2);await ch.publish('',queue,'renewed-reconnect');assert.equal((await ch.get(queue,{noAck:true})).body.toString(),'renewed-reconnect');observations.push({scenario:'provider-recovery',providerCalls:calls,afterOriginalExpiry:true});await c.close();
   } finally {c?.destroy();await proxy.close();}
  });
  assertSourceUnchanged(sources);
  fs.writeFileSync(new URL('../evidence/rabbitmq-oauth.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,platform:process.platform,broker:'RabbitMQ 4.0.5-10ubuntu5 / Erlang OTP 27',plugin:'Unmodified bundled rabbitmq_auth_backend_oauth2',packages:info.packages,passed:tests.length,tests,observations,sources,scope:'Disposable RS256 static-key OAuth broker, verified TLS, update/expiry/scopes/rejections and provider-driven recovery. The test issuer signs local tokens; no OIDC discovery, remote JWKS, authorization-server exchange or production identity provider is exercised. No token or private key is retained.'},null,2)+'\n');
 } finally {for(const c of connections)c.destroy();}
},{oauth:true});
console.log(`${tests.length} real RabbitMQ OAuth groups passed`);
