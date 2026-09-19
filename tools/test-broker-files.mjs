import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {fixture,ack,method,frame,cat,short,gate,delay,until} from './stream-peer.mjs';
import {sendBody,getOk,header,returned,hash,chunkAt} from './receive-peer.mjs';
import {cli,peerEnv} from './broker-test-process.mjs';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
const sources=sourceSnapshot(['tools/broker.mjs','tools/broker-files.mjs','tools/broker-output.mjs','tools/broker-output-worker.mjs','tools/broker-test-process.mjs','tools/test-broker-files.mjs','tools/client.mjs','tools/inbound.mjs','tools/outbound.mjs','tools/stream-peer.mjs','tools/receive-peer.mjs','web/engine.mjs']);
const folder=await fs.mkdtemp(path.join(os.tmpdir(),'amqp-cli-test-')),spools=path.join(folder,'spools');await fs.mkdir(spools);
const input=path.join(folder,'中文 input.bin'),empty=path.join(folder,'empty'),MiB=1048576,tests=[];
const file=await fs.open(input,'wx');for(let i=0;i<12*MiB;i+=65536)await file.write(chunkAt(i,65536));await file.close();await fs.writeFile(empty,'');
const noAck=state=>assert(!state.events.some(e=>e.cls===60&&[80,90,120].includes(e.id)));
async function test(name,action){await action();assert.deepEqual(await fs.readdir(spools),[]);assert(!(await fs.readdir(folder)).some(n=>n.startsWith('.moonbit-amqp-')));tests.push(name);console.log('PASS '+name);}
async function success(result){assert.equal(result.code,0,result.stderr);return JSON.parse(result.stdout);}
try{
 await test('strict arguments and resource settings fail before network use',async()=>{
  for(const args of [[],['roundtrip','x'],['publish'],['get','q','--raw','--file','x'],['publish','q','--file'],['publish','q','--size','-1'],['publish','q','--size','1.0'],['publish','q','--size','18446744073709551616'],['publish','q','--size','01'],['get','q','--size','1']]){const r=await cli(args).done;assert.equal(r.code,1);assert.match(r.stderr,/Invalid/);}
  for(const env of [{AMQP_TIMEOUT:'0'},{AMQP_TIMEOUT:'2147483648'},{AMQP_MAX_BODY_BYTES:'0'},{AMQP_MAX_BODY_BYTES:'bad'}])assert.equal((await cli(['get','q'],{env}).done).code,1);
  assert.equal((await cli(['--help']).done).code,0);
 });
 await test('input file preflight rejects missing directories and body limit',async()=>{
  for(const [name,env,pattern] of [[path.join(folder,'absent'),{},/ENOENT/],[folder,{},/regular file/],[input,{AMQP_MAX_BODY_BYTES:'10'},/Body limit/]]){const r=await cli(['publish','q','--file',name],{env:{...peerEnv(1,spools),...env}}).done;assert.equal(r.code,1);assert.match(r.stderr,pattern);}
 });
 for(const [name,size] of [[input,12*MiB],[empty,0]])await test(`regular file publication ${size} bytes waits for confirm and matches hash`,()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,m.seq))},async({port,state})=>{
  const result=await cli(['publish','q','--file',name],{env:peerEnv(port,spools)}).done,record=await success(result);assert.deepEqual(record,{confirmed:true,bytes:size,sha256:hash(size)});assert.equal(state.messages[0].sha256,hash(size));
 }));
 await test('unknown stdin is spooled before connecting and then streamed',()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,m.seq))},async({port,state})=>{
  const run=cli(['publish','q'],{env:peerEnv(port,spools),keepInput:true});
  for(let offset=0;offset<2*MiB;offset+=65536)if(!run.child.stdin.write(chunkAt(offset,65536)))await once(run.child.stdin,'drain');
  // Observe a nonempty spool without finishing stdin; no AMQP connection exists yet.
  assert.equal(state.accepted,0);assert.equal((await fs.readdir(spools)).length,1);run.child.stdin.end();
  const record=await success(await run.done);assert.equal(record.bytes,2*MiB);assert.equal(state.messages[0].sha256,hash(2*MiB));
 }));
 await test('stdin spool limit and idle timeout remove temporary files',async()=>{
  let result=await cli(['publish','q'],{env:{...peerEnv(1,spools),AMQP_MAX_BODY_BYTES:'65536'},input:chunkAt(0,65537)}).done;assert.equal(result.code,1);assert.match(result.stderr,/Body limit/);
  const run=cli(['publish','q'],{env:{...peerEnv(1,spools),AMQP_TIMEOUT:'100'},keepInput:true});result=await run.done;assert.equal(result.code,1);assert.match(result.stderr,/timeout/);
 });
 await test('known-length stdin streams exactly with no spool',()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,m.seq))},async({port,state})=>{
  const r=await cli(['publish','q','--size',String(2*MiB)],{env:peerEnv(port,spools),input:chunkAt(0,2*MiB)}).done;assert.equal((await success(r)).sha256,hash(2*MiB));assert.equal(state.messages[0].bytes,2*MiB);
 }));
 for(const [declared,length] of [[4096,4095],[4096,4097]])await test(`known stdin length mismatch ${declared}/${length} never reports success`,()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,m.seq))},async({port})=>{
  const r=await cli(['publish','q','--size',String(declared)],{env:peerEnv(port,spools),input:chunkAt(0,length)}).done;assert.equal(r.code,1);assert.equal(r.stdout,'');assert.match(r.stderr,/length|size|short|exceed/i);
 }));
 await test('publisher nack is an error',()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,m.seq,true))},async({port})=>{
  const r=await cli(['publish','q','--file',empty],{env:peerEnv(port,spools)}).done;assert.equal(r.code,1);assert.match(r.stderr,/nack|negativ/i);
 }));
 await test('large mandatory return drains and produces failure despite broker confirm',()=>fixture({onMessage:(m,s)=>{sendBody(s,m.ch,12*MiB,{kind:returned,fragment:65536}).then(()=>s.write(ack(m.ch,m.seq))).catch(()=>{});}},async({port})=>{
  const r=await cli(['publish','q','--file',input],{env:peerEnv(port,spools)}).done;assert.equal(r.code,1);assert.equal(r.stdout,'');assert.match(r.stderr,/Publish returned: NO_ROUTE/);
 }));
 for(const size of [0,12*MiB])await test(`file get ${size} bytes installs full body before ack`,()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===80){const saved=fsSync.readFileSync(path.join(folder,'received-'+size));assert.equal(saved.length,size);assert.equal(createHash('sha256').update(saved).digest('hex'),hash(size));}if(e.cls===60&&e.id===70){sendBody(s,e.ch,size,{fragment:65536}).catch(()=>{});return true;}}},async({port,state})=>{
  const target=path.join(folder,'received-'+size);const r=await cli(['get','q','--file',target],{env:peerEnv(port,spools)}).done,record=await success(r);assert.equal(record.bytes,size);assert.equal(record.sha256,hash(size));assert.equal(createHash('sha256').update(await fs.readFile(target)).digest('hex'),hash(size));assert.equal(state.events.filter(e=>e.cls===60&&e.id===80).length,1);await fs.unlink(target);
 }));
 await test('partial delivery exposes no destination and sends no ack',()=>{
  const held=gate();return fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){sendBody(s,e.ch,2*MiB,{hold:held.promise}).catch(()=>{});return true;}}},async({port,state})=>{
   const target=path.join(folder,'partial'),run=cli(['get','q','--file',target],{env:peerEnv(port,spools)});await until(()=>state.events.some(e=>e.cls===60&&e.id===70));await delay(50);await assert.rejects(fs.stat(target),{code:'ENOENT'});noAck(state);held.resolve();await success(await run.done);await fs.unlink(target);
  });
 });
 await test('existing output is preserved before connecting',async()=>{
  const r=await cli(['get','q','--file',input],{env:peerEnv(1,spools)}).done;assert.equal(r.code,1);assert.match(r.stderr,/already exists/);assert.equal((await fs.stat(input)).size,12*MiB);
 });
 await test('raced destination is preserved and message remains unacknowledged',()=>{
  const target=path.join(folder,'race');return fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){fs.writeFile(target,'keep',{flag:'wx'}).then(()=>sendBody(s,e.ch,4096)).catch(()=>{});return true;}}},async({port,state})=>{
   const r=await cli(['get','q','--file',target],{env:peerEnv(port,spools)}).done;assert.equal(r.code,1);assert.match(r.stderr,/EEXIST/);assert.equal(await fs.readFile(target,'utf8'),'keep');noAck(state);await fs.unlink(target);
  });
 });
 for(const mode of ['cut','overrun','timeout','limit'])await test(`failed ${mode} receive leaves no file and no acknowledgement`,()=>fixture({onMethod:(e,s)=>{
  if(e.cls===60&&e.id===70){if(mode==='cut')sendBody(s,e.ch,2*MiB,{cut:true}).catch(()=>{});else if(mode==='overrun')s.write(cat(getOk(e.ch),header(e.ch,1),frame(3,e.ch,Buffer.from('xx'))));else s.write(cat(getOk(e.ch),header(e.ch,2*MiB)));return true;}
 }},async({port,state})=>{
  const target=path.join(folder,mode),r=await cli(['get','q','--file',target],{env:{...peerEnv(port,spools),AMQP_TIMEOUT:'200',...(mode==='limit'?{AMQP_MAX_BODY_BYTES:'65536'}:{})}}).done;assert.equal(r.code,1,r.stderr);await assert.rejects(fs.stat(target),{code:'ENOENT'});noAck(state);
 }));
 await test('raw output is exact binary and metadata stays on stderr',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){sendBody(s,e.ch,2*MiB).catch(()=>{});return true;}}},async({port,state})=>{
  const r=await cli(['get','q','--raw'],{env:peerEnv(port,spools),raw:true}).done;assert.equal(r.code,0,r.stderr);assert.equal(r.bytes,2*MiB);assert.equal(r.sha256,hash(2*MiB));assert.equal(JSON.parse(r.stderr).sha256,r.sha256);assert.equal(state.events.filter(e=>e.cls===60&&e.id===80).length,1);
 }));
 await test('blocked raw output times out without acknowledgement',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){sendBody(s,e.ch,12*MiB).catch(()=>{});return true;}}},async({port,state})=>{
  const run=cli(['get','q','--raw'],{env:{...peerEnv(port,spools),AMQP_TIMEOUT:'250'},pauseOutput:true,raw:true});await once(run.child,'exit');run.child.stdout.resume();const r=await run.done;assert.equal(r.code,1,r.stderr);noAck(state);
 }));
 await test('empty raw and file gets distinguish absence from a zero-byte body',()=>fixture({onMethod:(e,s)=>{if(e.cls===60&&e.id===70){s.write(method(e.ch,60,72,short('')));return true;}}},async({port,state})=>{
  const target=path.join(folder,'absent-output'),r=await cli(['get','q','--file',target],{env:peerEnv(port,spools)}).done;assert.equal(await success(r),null);await assert.rejects(fs.stat(target),{code:'ENOENT'});
  const raw=await cli(['get','q','--raw'],{env:peerEnv(port,spools),raw:true}).done;assert.equal(raw.code,2);assert.equal(raw.bytes,0);assert.deepEqual(JSON.parse(raw.stderr),{found:false});noAck(state);
 }));
 assertSourceUnchanged(sources);await fs.writeFile(new URL('../evidence/broker-files-validation.json',import.meta.url),JSON.stringify({utc:new Date().toISOString(),node:process.version,platform:process.platform,passed:tests.length,tests,sources,scope:'Real CLI child processes and independent wire peer; bounded file/stdin/raw I/O, data hashes, confirm and ack order, malformed/truncated streams, resource failures and no-overwrite output. No native or throughput claim.'},null,2)+'\n');
}finally{await fs.unlink(input);await fs.unlink(empty);await fs.rmdir(spools);await fs.rmdir(folder);}
console.log(`${tests.length} broker file CLI fixture groups passed`);
