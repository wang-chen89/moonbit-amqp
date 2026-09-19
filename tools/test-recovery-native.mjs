import fs from 'node:fs';
import assert from 'node:assert/strict';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {withRabbit,proxyTo} from './rabbitmq-harness.mjs';
const executable=process.env.AMQP_GO_REFERENCE;
assert(executable,'Set AMQP_GO_REFERENCE to the compiled independent Go scenario');
const sources=sourceSnapshot(['tools/recovery-reference.go','tools/test-recovery-native.mjs','tools/rabbitmq-harness.mjs','tools/rabbitmq-reference.py','evidence/rabbitmq-recovery.json']);
const binarySha256=digest(executable);
const commit='a0195c6baf35db642d13651cb28938f899062e7c';
const rows=[];
await withRabbit(async info=>{
 const proxy=await proxyTo(info.port);
 const child=spawn(executable,[String(proxy.port)],{windowsHide:true,stdio:['ignore','pipe','pipe']});
 let diagnostic='';child.stderr.on('data',b=>diagnostic+=b);
 const exited=once(child,'exit'),deadline=setTimeout(()=>child.kill(),30000);
 try {
  for await(const line of createInterface({input:child.stdout})) {
   const row=JSON.parse(line);rows.push(row);
   if(row.stage==='cycle'&&row.cycle<2)proxy.cut();
  }
  const [code]=await exited;assert.equal(code,0,diagnostic);
  assert.deepEqual(rows,[
   {stage:'cycle',cycle:0,body:'payload-0',confirmed:true},
   {stage:'recovered',cycle:1,renamed:true},
   {stage:'cycle',cycle:1,body:'payload-1',confirmed:true},
   {stage:'recovered',cycle:2,renamed:true},
   {stage:'cycle',cycle:2,body:'payload-2',confirmed:true},
  ]);
  const current=JSON.parse(fs.readFileSync(new URL('../evidence/rabbitmq-recovery.json',import.meta.url),'utf8'));
  assert.deepEqual(current.observations,rows);
  assertSourceUnchanged(sources);assert.equal(digest(executable),binarySha256);
  const report={utc:new Date().toISOString(),reference:'Official amqp091-go, unmodified pinned source',commit,source:`https://github.com/rabbitmq/amqp091-go/tree/${commit}`,archiveSha256:'19067ca18143f0101b390ab09a237e2de989fd900ca20917746a4b22b66cafef',referenceBinarySha256:digest(executable),referenceProgramSha256:digest(new URL('./recovery-reference.go',import.meta.url)),brokerPackages:info.packages,
   scope:'One native scenario: two forced connection losses, cross-channel transient topology, server-generated queue renaming, consumer continuity, QoS and confirmed delivery. Node executes the same behavior in test-rabbitmq-recovery.mjs; this is not full upstream API conformance.',rows,passed:true,sources};
  fs.writeFileSync(new URL('../evidence/recovery-native.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
  console.log('Pinned native Go recovery: two disconnects, three confirmed consumer deliveries and both queue renames passed');
 } finally {clearTimeout(deadline);if(child.exitCode===null)child.kill();await proxy.close();}
});
