import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {connect} from './client.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_URI_REFERENCE;assert(executable,'Set AMQP_URI_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/uri-reference-build.json',import.meta.url)));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./uri-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['tools/client.mjs','tools/authentication.mjs','tools/recovery.mjs','tools/recovery-channel.mjs','tools/recovery-state.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','tools/test-uri-broker.mjs','tools/uri-reference.go','evidence/uri-reference-build.json','web/engine.mjs']);
const comparisons=[],tests=[];let packages;
async function native(request) {
 const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let out='',err='';
 child.stdout.on('data',b=>out+=b);child.stderr.on('data',b=>err+=b);child.stdin.on('error',()=>{});
 const done=once(child,'close'),timer=setTimeout(()=>child.kill(),12000);child.stdin.end(JSON.stringify(request));
 try{const [code]=await done;assert.equal(code,0,err);return JSON.parse(out);}finally{clearTimeout(timer);}
}
async function body(c){const ch=await c.openChannel();try{const {queue}=await ch.declareQueue('',{exclusive:true,autoDelete:true});await ch.confirmSelect();await ch.publish('',queue,'URI connection probe');return (await ch.get(queue,{noAck:true})).body.toString();}finally{await ch.close();}}
await withRabbit(async info=>{
 packages=info.packages;
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'moonbit-uri-'));
 const bytes=Object.fromEntries(Object.entries(info.authentication).map(([key,value])=>[key,Buffer.from(value,'base64')]));
 const files=Object.fromEntries(Object.entries(bytes).map(([key,value])=>{const name=path.join(directory,key+' test.pem');fs.writeFileSync(name,value);return [key,name];}));
 const tcp=(query='',user='d%65mo:test%2Donly',vhost='%2F')=>`amqp://${user}@127.0.0.1:${info.port}/${vhost}${query?'?'+query:''}`;
 const tls=(params={},user='demo:test-only')=>`amqps://${user}@127.0.0.1:${info.tlsPort}/?`+new URLSearchParams({cacertfile:files.ca,server_name_indication:'localhost',connection_timeout:'3000',...params});
 async function compare(name,uri,{node={},go={},expected=true}={}) {
  const upstream=await native({URI:uri,...go});let connection,local;
  try{connection=await connect(uri,{allowInsecureAuth:true,timeout:3000,...node});local={ok:true,mechanism:connection.authenticationMechanism,vhost:node.vhost||'/',...connection.limits,body:await body(connection),tls:uri.startsWith('amqps:')};}
  catch(error){if(expected)throw error;local={ok:false};}
  finally{if(connection){await connection.close();connection.destroy();}}
  assert.equal(upstream.ok,expected,name+' upstream outcome');assert.equal(local.ok,expected,name+' local outcome');assert.deepEqual(local,upstream,name);
  comparisons.push({name,result:local});console.log('MATCH '+name);
 }
 try {
  await compare('TCP decoded built-in credentials and root virtual host',tcp());
  await compare('URI repeated authentication candidates select AMQPLAIN first',tcp('auth_mechanism=amqplain&auth_mechanism=plain'));
  await compare('explicit SASL overrides URI candidates',tcp('auth_mechanism=external'),{node:{sasl:[{mechanism:'PLAIN'}]},go:{SASL:['PLAIN']}});
  await compare('URI heartbeat and explicit channel max precedence',tcp('heartbeat=3&channel_max=6'),{node:{heartbeat:1,channelMax:2},go:{Heartbeat:1,ChannelMax:2}});
  await compare('explicit virtual host overrides a URI nonexistent virtual host',tcp('heartbeat=2','demo:test-only','missing'),{node:{vhost:'/'},go:{Vhost:'/'}});
  await compare('URI missing virtual host is rejected',tcp('','demo:test-only','missing'),{expected:false});
  await compare('bad password fails authentication',tcp('','demo:incorrect'),{expected:false});
  await compare('TLS uses URI CA file and explicit server identity',tls());
  await compare('TLS AMQPLAIN query authenticates with server verification',tls({auth_mechanism:'amqplain'}));
  await compare('URI client certificate pair authenticates with EXTERNAL',tls({certfile:files.clientCert,keyfile:files.clientKey,auth_mechanism:'external'},'unused:unused'));
  await compare('URI certificate without a key does not enable client authentication',tls({certfile:files.clientCert,auth_mechanism:'external'},'unused:unused'),{expected:false});
  await compare('URI unknown certificate identity is rejected',tls({certfile:files.unknownCert,keyfile:files.unknownKey,auth_mechanism:'external'},'unused:unused'),{expected:false});
  await compare('URI untrusted client certificate is rejected',tls({certfile:files.rogueCert,keyfile:files.rogueKey,auth_mechanism:'external'},'unused:unused'),{expected:false});
  await compare('URI wrong server identity fails verification',tls({server_name_indication:'wrong.example'}),{expected:false});
  await compare('URI server CA trust failure is rejected',tls({cacertfile:files.rogueCert}),{expected:false});
  await compare('explicit TLS configuration ignores URI file and SNI parameters',tls({cacertfile:'missing',certfile:'missing',keyfile:'missing',server_name_indication:'wrong.example'}),
   {node:{tls:{ca:bytes.ca,servername:'localhost'}},go:{TLSOverride:true,CAFile:files.ca,ServerName:'localhost'}});
  await compare('TCP URI ignores TLS query parameters',tcp('cacertfile=missing&certfile=missing&keyfile=missing'));
  await compare('TLS query with zero heartbeat negotiates broker interval',tls({heartbeat:'0',channel_max:'4'}));
  // Recovery is a local extension: the same URI-normalized TLS bytes must survive file removal.
  const proxy=await proxyTo(info.tlsPort);let c;
  try {
   const uri=tls({heartbeat:'2',certfile:files.clientCert,keyfile:files.clientKey,auth_mechanism:'external'},'unused:unused').replace(':'+info.tlsPort+'/',':'+proxy.port+'/');
   c=await connect(uri,{timeout:3000,recovery:{retryDelay:30,retryJitter:0,maxRetries:4}});assert.equal(await body(c),'URI connection probe');
   // Remove only test-created files; temp directory cleanup still runs on every outcome.
   for(const file of [files.ca,files.clientCert,files.clientKey])fs.unlinkSync(file);
   const recovered=once(c,'recovered',{signal:AbortSignal.timeout(10000)});proxy.cut();await recovered;
   assert.equal(c.authenticationMechanism,'EXTERNAL');assert.equal(await body(c),'URI connection probe');await c.close();
   tests.push('URI TLS credential bytes survive file removal and reconnection; confirmed messaging succeeds twice');console.log('PASS '+tests.at(-1));
  }finally{c?.destroy();await proxy.close();}
 }finally{
  assert(path.dirname(directory)===os.tmpdir()&&path.basename(directory).startsWith('moonbit-uri-'));
  fs.rmSync(directory,{recursive:true,force:true});
 }
},{authentication:true});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/uri-broker-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,matched:comparisons.length,comparisons,localPassed:tests.length,tests,packages,sources,scope:'Pinned unmodified Go and Node connect through URI to disposable RabbitMQ 4.0.5; success means confirmed publish and get with equal negotiated limits. TLS uses verification, real CA/client files, identity/trust failures. Recovery file snapshot is a separately counted local extension, not a native equivalence claim.'},null,2)+'\n');
console.log(`${comparisons.length} broker URI results matched; ${tests.length} local recovery scenario passed`);
