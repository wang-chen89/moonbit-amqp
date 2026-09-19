import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['authentication.mbt','session.mbt','cmd/web/authentication.mbt','cmd/web/session.mbt','tools/authentication.mjs','tools/client.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/broker.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','tools/test-rabbitmq-auth.mjs','web/engine.mjs']);
const tests=[];async function test(name,action){await action();tests.push(name);console.log('PASS '+name);}
await withRabbit(async info=>{
 const credentials=Object.fromEntries(Object.entries(info.authentication).map(([k,v])=>[k,Buffer.from(v,'base64')]));
 const tls={ca:credentials.ca,cert:credentials.clientCert,key:credentials.clientKey,servername:'localhost'};
 const base={host:'127.0.0.1',port:info.port,username:'demo',password:'test-only',allowInsecureAuth:true,timeout:3000,heartbeat:2},connections=[];
 const open=async more=>{const c=await connect({...base,...more});connections.push(c);return c;};
 async function message(c,expected='auth-message') {
  const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();
  await ch.publish('',queue,expected);assert.equal((await ch.get(queue,{noAck:true})).body.toString(),expected);await ch.close();
 }
 try {
  await test('real AMQPLAIN authenticates and confirms a message over TCP',async()=>{const c=await open({sasl:[{mechanism:'AMQPLAIN'}]});assert.equal(c.authenticationMechanism,'AMQPLAIN');await message(c);await c.close();});
  await test('real AMQPLAIN over verified TLS succeeds without a client certificate',async()=>{const c=await open({port:info.tlsPort,tls:{ca:tls.ca,servername:'localhost'},allowInsecureAuth:false,sasl:[{mechanism:'AMQPLAIN'}]});await message(c);await c.close();});
  await test('real EXTERNAL maps a trusted client certificate to demo without a password',async()=>{const c=await open({port:info.tlsPort,tls,allowInsecureAuth:false,username:'not-demo',password:'incorrect',sasl:[{mechanism:'EXTERNAL'}]});assert.equal(c.authenticationMechanism,'EXTERNAL');await message(c);await c.close();});
  await test('EXTERNAL rejects missing client certificate',async()=>{await assert.rejects(open({port:info.tlsPort,tls:{ca:tls.ca,servername:'localhost'},sasl:[{mechanism:'EXTERNAL'}]}));});
  await test('EXTERNAL rejects a trusted certificate mapped to a nonexistent broker user',async()=>{await assert.rejects(open({port:info.tlsPort,tls:{...tls,cert:credentials.unknownCert,key:credentials.unknownKey},sasl:[{mechanism:'EXTERNAL'}]}));});
  await test('mutual TLS rejects a client certificate outside the broker trust root',async()=>{await assert.rejects(open({port:info.tlsPort,tls:{...tls,cert:credentials.rogueCert,key:credentials.rogueKey},sasl:[{mechanism:'EXTERNAL'}]}));});
  await test('EXTERNAL still verifies the server hostname',async()=>{await assert.rejects(open({port:info.tlsPort,tls:{...tls,servername:'incorrect.invalid'},sasl:[{mechanism:'EXTERNAL'}]}),/Hostname|Altname|altnames/);});
  for(const mechanism of ['AMQPLAIN','EXTERNAL'])await test(`real ${mechanism} reauthenticates across two forced reconnects`,async()=>{
   const proxy=await proxyTo(mechanism==='EXTERNAL'?info.tlsPort:info.port);let c;
   try {
    c=await open({port:proxy.port,tls:mechanism==='EXTERNAL'?tls:undefined,sasl:[{mechanism}],recovery:{maxRetries:3,retryDelay:40,retryJitter:0,onTopologyError:()=>false}});
    const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();
    for(let cycle=0;cycle<3;cycle++) {
     if(cycle){const restored=once(c,'recovered',{signal:AbortSignal.timeout(10000)});proxy.cut();await restored;}
     assert.equal(c.authenticationMechanism,mechanism);await ch.publish('',queue,mechanism+'-'+cycle);assert.equal((await ch.get(queue,{noAck:true})).body.toString(),mechanism+'-'+cycle);
    }
    await c.close();
   } finally {c?.destroy();await proxy.close();}
  });
  await test('broker CLI performs AMQPLAIN and certificate EXTERNAL message roundtrips',async()=>{
   const directory=fs.mkdtempSync(path.join(os.tmpdir(),'moonbit-amqp-auth-'));
   try {
    for(const [name,data] of [['ca',tls.ca],['cert',tls.cert],['key',tls.key]])fs.writeFileSync(path.join(directory,name+'.pem'),data,{mode:0o600});
    for(const mechanism of ['AMQPLAIN','EXTERNAL']) {
     const child=spawn(process.execPath,[fileURLToPath(new URL('./broker.mjs',import.meta.url)),'roundtrip'],{windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,AMQP_HOST:'127.0.0.1',AMQP_PORT:String(info.tlsPort),AMQP_USER:'demo',AMQP_PASSWORD:'test-only',AMQP_TLS:'1',AMQP_SASL:mechanism,AMQP_LOCALE:'en_US',AMQP_SERVERNAME:'localhost',AMQP_CA:path.join(directory,'ca.pem'),AMQP_CERT:path.join(directory,'cert.pem'),AMQP_KEY:path.join(directory,'key.pem')}});
     let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);const [code]=await once(child,'exit');assert.equal(code,0,stderr);
     assert.equal(Buffer.from(JSON.parse(stdout).bodyBase64,'base64').toString(),'Hello from MoonBit AMQP');
    }
   } finally {
    assert(path.resolve(directory).startsWith(path.resolve(os.tmpdir())+path.sep));assert(path.basename(directory).startsWith('moonbit-amqp-auth-'));
    fs.rmSync(directory,{recursive:true,force:true});
   }
  });
  assertSourceUnchanged(sources);
  fs.writeFileSync(new URL('../evidence/rabbitmq-auth.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,platform:process.platform,broker:'RabbitMQ 4.0.5-10ubuntu5 / Erlang OTP 27',plugin:'Unmodified bundled rabbitmq_auth_mechanism_ssl',packages:info.packages,passed:tests.length,tests,sources,scope:'Disposable loopback TCP/TLS broker; trusted/untrusted/unknown-user client certificates, two reconnects per mechanism and real CLI. No private key or credential material is saved in this report.'},null,2)+'\n');
 } finally {for(const c of connections)c.destroy();}
},{authentication:true});
console.log(`${tests.length} real RabbitMQ authentication groups passed`);
