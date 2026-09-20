import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {X509Certificate} from 'node:crypto';
import {connect,newConnectionProperties} from './client.mjs';
import {fixture,clientProperties,sampleProperties} from './metadata-peer.mjs';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
const executable=process.env.AMQP_METADATA_REFERENCE;assert(executable,'Set AMQP_METADATA_REFERENCE');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/metadata-reference-build.json',import.meta.url)));
assert.equal(digest(executable),build.binarySha256);assert.equal(digest(new URL('./metadata-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['session.mbt','authentication.mbt','cmd/web/authentication.mbt','tools/client.mjs','tools/recovery.mjs','tools/recovery-peer.mjs','tools/metadata-peer.mjs','tools/metadata-reference.go','tools/test-metadata-native.mjs','tools/rabbitmq-reference.py','tools/rabbitmq-harness.mjs','evidence/metadata-reference-build.json','web/engine.mjs']);
async function native(request){const child=spawn(executable,[],{windowsHide:true,stdio:['pipe','pipe','pipe']});let output='',diagnostic='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>diagnostic+=b);child.stdin.on('error',()=>{});const exited=once(child,'close'),timer=setTimeout(()=>child.kill(),12000);child.stdin.end(JSON.stringify(request));try{const [code]=await exited;assert.equal(code,0,diagnostic);return JSON.parse(output);}finally{clearTimeout(timer);}}
const coreMetadata=c=>({serverProperties:c.serverProperties,serverLocales:c.serverLocales,serverVersion:c.serverVersion,vhost:c.config.vhost,locale:c.config.locale,authenticationMechanism:c.authenticationMechanism,limits:c.limits});
const fromNative=r=>Object.fromEntries(['serverProperties','serverLocales','serverVersion','vhost','locale','authenticationMechanism','limits'].map(key=>[key,r[key]]));
const tlsMetadata=c=>{const s=c.tlsState;return {handshakeComplete:s.handshakeComplete,protocol:s.protocol??'',serverName:s.serverName,cipher:s.cipher?.standardName??'0x0000',verified:s.authorized,peerDER:s.peerCertificate?.derHex??'',resumed:s.resumed};};
const capabilities={'publisher_confirms':true,'consumer_cancel_notify':true,'connection.blocked':true,'basic.nack':true};
const peerComparisons=[],propertyComparisons=[],brokerComparisons=[],localTests=[],differences=[];
const nativeDefaults=await native({Mode:'defaults'});assert.deepEqual(Object.keys(nativeDefaults).sort(),Object.keys(newConnectionProperties()).sort());
for(const mode of ['default','empty','custom','caps','only-caps','mutate','ipv6'])await fixture({listenHost:mode==='ipv6'?'::1':undefined,properties:sampleProperties,locales:'en_US  fr_FR',onMethod:(entry,socket,state)=>{
 if(entry.cls===10&&entry.id===11){state.endpoints??=[];state.endpoints.push({address:socket.remoteAddress,port:socket.remotePort,family:socket.remoteFamily});}
}},async({opts,state,open})=>{
 const host=mode==='ipv6'?'[::1]':'127.0.0.1',uri=`amqp://demo:test@${host}:${opts.port}/tenant?heartbeat=0`,upstream=await native({URI:uri,Mode:mode==='ipv6'?'custom':mode,Locale:'fr_FR'});
 assert.deepEqual(upstream.localAddress,state.endpoints[0]);assert.deepEqual(upstream.remoteAddress,{address:opts.host,port:opts.port,family:mode==='ipv6'?'IPv6':'IPv4'});
 const properties=mode==='default'?undefined:mode==='empty'?{}:mode==='only-caps'?{capabilities:'invalid'}:structuredClone(sampleProperties);
 if(mode==='caps')properties.capabilities={publisher_confirms:false,unknown:true};
 const before=structuredClone(properties),c=await open({vhost:'tenant',locale:'fr_FR',properties});
 assert.deepEqual(c.localAddress,state.endpoints[1]);assert.deepEqual(c.remoteAddress,upstream.remoteAddress);
 assert.deepEqual(coreMetadata(c),fromNative(upstream));assert.deepEqual(tlsMetadata(c),upstream.tls);
 const wire=clientProperties(state);assert.equal(wire.length,2);
 if(['default','empty'].includes(mode)){
  assert.deepEqual(wire[0],{...nativeDefaults,capabilities});assert.deepEqual(wire[1],{...newConnectionProperties(),capabilities});
 }else{assert.deepEqual(wire[1],wire[0]);propertyComparisons.push({mode,properties:wire[1]});}
 assert.deepEqual(properties,before);
 if(mode==='mutate'){
  assert.equal(upstream.configPropertiesAfterMutation.nested.changed,'caller mutation');assert.equal(upstream.callerPropertiesAfterConnect.capabilities['basic.nack'],true);
  properties.nested.changed='caller mutation';assert.equal(c.config.properties.nested.changed,undefined);
  differences.push({kind:'caller-owned property aliasing',upstream:'Inserts capabilities into caller table; later nested mutation is visible through Config.Properties',local:'Snapshots input and returns independent copies; caller table remains unchanged',countedAsMatch:false});
 }
 peerComparisons.push({mode,metadata:coreMetadata(c),addressesChecked:true});await c.close();console.log('MATCH metadata peer '+mode);
});
differences.push({kind:'default library identity',scenarios:['default','empty'],upstream:nativeDefaults,local:newConnectionProperties(),explanation:'Same identity keys and mandatory capabilities; each library advertises its own product/version/platform. Exact identity values are not counted as matches.',countedAsMatch:false});
let packages;
await withRabbit(async info=>{
 packages=info.packages;const directory=fs.mkdtempSync(path.join(os.tmpdir(),'moonbit-metadata-'));
 const bytes=Object.fromEntries(Object.entries(info.authentication).map(([key,value])=>[key,Buffer.from(value,'base64')]));
 const files=Object.fromEntries(Object.entries(bytes).map(([key,value])=>{const file=path.join(directory,key+'.pem');fs.writeFileSync(file,value);return [key,file];}));
 const serverCertificate=new X509Certificate(Buffer.from(info.certificate,'base64'));
 const tls12={ca:bytes.ca,servername:'localhost',minVersion:'TLSv1.2',maxVersion:'TLSv1.2',ciphers:'ECDHE-RSA-AES128-GCM-SHA256'};
 const tcp=`amqp://demo:test-only@127.0.0.1:${info.port}/?heartbeat=1`,tls=`amqps://demo:test-only@127.0.0.1:${info.tlsPort}/?heartbeat=1`;
 async function compare(name,uri,node={},go={}){
  const upstream=await native({URI:uri,Mode:'custom',...go}),c=await connect(uri,{allowInsecureAuth:true,timeout:5000,channelMax:64,properties:structuredClone(sampleProperties),...node});
  try{
   assert.deepEqual(coreMetadata(c),fromNative(upstream),name);assert.deepEqual(tlsMetadata(c),upstream.tls,name+' TLS');assert.deepEqual(c.remoteAddress,upstream.remoteAddress);assert(c.localAddress.port>0);
   assert.deepEqual(c.clientProperties,upstream.callerPropertiesAfterConnect);const ch=await c.openChannel();await ch.qos(0);await ch.close();
   if(c.tlsState.encrypted){assert.equal(c.tlsState.peerCertificate.derHex,serverCertificate.raw.toString('hex'));assert.equal(c.tlsState.peerCertificate.fingerprint256,serverCertificate.fingerprint256);assert(c.tlsState.peerCertificateChain.length>0);const state=c.tlsState;state.peerCertificate.subject.CN='changed';assert.equal(c.tlsState.peerCertificate.subject.CN,'localhost');}
   if(node.tls?.cert)assert.equal(c.tlsState.localCertificate.derHex,new X509Certificate(bytes.clientCert).raw.toString('hex'));
   brokerComparisons.push({name,metadata:coreMetadata(c),tls:tlsMetadata(c),remoteAddress:c.remoteAddress});await c.close();console.log('MATCH metadata broker '+name);
  }finally{c.destroy();}
 }
 try{
  await compare('TCP properties and endpoint state',tcp);
  await compare('TCP URI mixed-case PLAIN mechanism',tcp+'&auth_mechanism=PlAiN');
  await compare('TCP URI mixed-case AMQPLAIN mechanism',tcp+'&auth_mechanism=aMqPlAiN');
  await compare('TCP URI Unicode simple-case PLAIN mechanism',tcp+'&auth_mechanism=pla%C4%B1n');
  await compare('verified TLS 1.2 certificate cipher and server identity',tls,{tls:tls12},{CAFile:files.ca,ServerName:'localhost',TLS12:true});
  await compare('mutual TLS EXTERNAL local and peer certificate metadata',tls+'&auth_mechanism=ExTeRnAl',{tls:{...tls12,cert:bytes.clientCert,key:bytes.clientKey}},{CAFile:files.ca,CertFile:files.clientCert,KeyFile:files.clientKey,ServerName:'localhost',TLS12:true});
  await compare('explicit unverified TLS reports unauthorized transport',tls,{tls:{...tls12,ca:undefined,rejectUnauthorized:false}},{Insecure:true,ServerName:'localhost',TLS12:true});
  const proxy=await proxyTo(info.tlsPort);let c;
  try{
   c=await connect({...{host:'127.0.0.1',port:proxy.port,username:'demo',password:'test-only',tls:{ca:bytes.ca,servername:'localhost',minVersion:'TLSv1.3',maxVersion:'TLSv1.3'},timeout:5000,heartbeat:2},properties:{connection_name:'metadata-recovery'},recovery:{retryDelay:30,retryJitter:0,maxRetries:4}});
   const first=c.connectionInfo;assert.equal(first.tlsState.protocol,'TLSv1.3');assert.equal(first.tlsState.authorized,true);assert.equal(first.tlsState.peerCertificate.derHex,serverCertificate.raw.toString('hex'));
   const ready=once(c,'recovered',{signal:AbortSignal.timeout(10000)});proxy.cut();await ready;assert.equal(c.connectionInfo.generation,2);assert.equal(c.tlsState.protocol,'TLSv1.3');assert.equal(c.tlsState.authorized,true);assert.notEqual(c.localAddress.port,first.localAddress.port);assert.deepEqual(c.serverProperties,first.serverProperties);assert.deepEqual(c.clientProperties,first.clientProperties);
   const ch=await c.openChannel(),{queue}=await ch.declareQueue('',{exclusive:true});await ch.confirmSelect();await ch.publish('',queue,'metadata recovery');assert.equal((await ch.get(queue,{noAck:true})).body.toString(),'metadata recovery');await c.close();
   assert.equal(c.connectionInfo.closed,true);assert.equal(c.tlsState.peerCertificate.derHex,serverCertificate.raw.toString('hex'));localTests.push('TLS 1.3 metadata survives connection replacement and final close; confirmed message roundtrip succeeds');console.log('PASS '+localTests.at(-1));
  }finally{c?.destroy();await proxy.close();}
 }finally{assert(path.dirname(directory)===os.tmpdir()&&path.basename(directory).startsWith('moonbit-metadata-'));fs.rmSync(directory,{recursive:true,force:true});}
},{authentication:true});
assertSourceUnchanged(sources);
fs.writeFileSync(new URL('../evidence/metadata-native.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,peerMatches:peerComparisons.length,propertyMatches:propertyComparisons.length,brokerMatches:brokerComparisons.length,localPassed:localTests.length,peerComparisons,propertyComparisons,brokerComparisons,localTests,differences,packages,sources,scope:'Server properties/locales/version/config and actual IPv4/IPv6 peer endpoints compared in seven independent Go/Node handshakes. Five custom start-ok tables match after field-order normalization. Seven broker results match, TLS 1.2 cipher pinned on both sides. TLS 1.3 recovery is separately checked against the real server certificate, not counted as a complete native TLS-state equivalence; TLS verified-chain internals and exporter APIs are not implemented.'},null,2)+'\n');
console.log(`${peerComparisons.length} native peer metadata results, ${propertyComparisons.length} client tables and ${brokerComparisons.length} broker results matched; ${localTests.length} local TLS recovery passed; ${differences.length} differences recorded`);
