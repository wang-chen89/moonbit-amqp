import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import fs from 'node:fs/promises';
import net from 'node:net';
import {connect} from './client.mjs';
import {until} from './recovery-peer.mjs';
const sources=sourceSnapshot(['authentication.mbt','cmd/web/authentication.mbt','tools/authentication.mjs','session.mbt','cmd/web/session.mbt','tools/client.mjs','tools/broker.mjs','web/engine.mjs','tools/rabbitmq-reference.py','tools/test-rabbitmq.mjs']);

const root = process.env.RABBITMQ_ROOT;
if (!root) throw Error('Set RABBITMQ_ROOT to extracted Ubuntu package root (Linux path for WSL)');
let script = fileURLToPath(new URL('./rabbitmq-reference.py', import.meta.url));
if (process.platform === 'win32') script = '/mnt/' + script[0].toLowerCase() + script.slice(2).replaceAll('\\', '/');
const server = process.platform === 'win32'
  ? spawn('wsl', ['-d', process.env.WSL_DISTRO ?? 'Ubuntu-D', '--exec', 'python3', script, root], {windowsHide: true, stdio: ['pipe', 'pipe', 'pipe']})
  : spawn('python3', [script, root], {stdio: ['pipe', 'pipe', 'pipe']});
let diagnostic = '', info, connections = [], cases = [], performanceSample;
server.stderr.on('data', x => { diagnostic += x.toString(); });
const exited = once(server, 'exit');
const lineReader = createInterface({input: server.stdout});
const startup = setTimeout(() => server.stdin.end(), 45000);
async function run(name, action) { await action(); cases.push(name); console.log(`PASS ${name}`); }
const delay = ms => new Promise(r => setTimeout(r, ms));
async function cli(args, env, input='') {
  const child=spawn(process.execPath,[fileURLToPath(new URL('./broker.mjs',import.meta.url)),...args],{env:{...process.env,...env},windowsHide:true,stdio:['pipe','pipe','pipe']});
  let stdout='',stderr='';child.stdout.on('data',x=>stdout+=x);child.stderr.on('data',x=>stderr+=x);child.stdin.end(input);
  const [code]=await once(child,'exit');return {code,stdout,stderr};
}
async function localReady(port) {
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    const ok = await new Promise(resolve => {
      const s = net.connect({host:'127.0.0.1', port});
      const finish = value => { s.destroy(); resolve(value); };
      s.once('connect', () => finish(true)); s.once('error', () => finish(false)); s.setTimeout(150, () => finish(false));
    });
    if (ok) return; await delay(100);
  }
  throw Error('WSL localhost forwarder did not become ready');
}
try {
  for await (const line of lineReader) { if (line.startsWith('READY ')) { info = JSON.parse(line.slice(6)); break; } }
  clearTimeout(startup);
  if (!info) throw Error('Server did not start: ' + diagnostic);
  await localReady(info.port); await localReady(info.tlsPort);
  const base = {host:'127.0.0.1', port:info.port, username:'demo', password:'test-only', allowInsecureAuth:true, timeout:8000};
  const c = await connect({...base, heartbeat:4, channelMax:20, frameMax:32768}); connections.push(c);
  await run('TCP PLAIN handshake negotiates channel/frame/heartbeat limits', async () => assert.deepEqual(c.limits, {channelMax:16, frameMax:8192, heartbeat:4}));
  const a = await c.openChannel(), b = await c.openChannel();
  const {queue} = await a.declareQueue('', {exclusive:true, arguments:{'x-message-ttl':60000}});
  await run('independent channels allow concurrent RPCs', async () => {
    const out = await Promise.all([a.declareQueue(queue, {passive:true}), b.declareQueue('', {exclusive:true})]);
    assert.equal(out[0].queue, queue); assert.ok(out[1].queue);
  });
  await a.confirmSelect();
  await run('confirmed fragmented binary publish properties and 64-bit timestamp', async () => {
    const body = Buffer.alloc(50000); for (let i=0;i<body.length;i++) body[i] = i % 256;
    await a.publish('', queue, body, {properties:{'content-type':'application/octet-stream','delivery-mode':2,'message-id':'binary-case',timestamp:'9007199254740993',headers:{label:'中文', nested:{active:true}, n:42, raw:{$type:'bytes',hex:'00ff'}, signed:{$type:'int64',value:'-9007199254740993'}}}});
    const message = await b.get(queue);
    assert.deepEqual(message.body, body); assert.equal(message.properties.timestamp, '9007199254740993');
    assert.equal(message.properties.headers.label.hex, Buffer.from('中文').toString('hex'));
    assert.equal(message.properties.headers.signed.value, '-9007199254740993');
    assert.equal(message.properties.headers.raw.hex,'00ff'); b.ack(message.args['delivery-tag']);
  });
  await run('empty get returns null after consumer ack', async () => assert.equal(await b.get(queue), null));
  await run('batched confirms settle every in-flight publish', async () => {
    await Promise.all(Array.from({length:24},(_,i)=>a.publish('',queue,`batch-${i}`)));
    assert.equal((await b.purgeQueue(queue))['message-count'],24);
  });
  await run('bounded publish-confirm timing sample verifies every message', async () => {
    const payload=Buffer.alloc(4096,0x61),times=[];
    for(let batch=0;batch<20;batch++) {
      const start=performance.now();await Promise.all(Array.from({length:8},()=>a.publish('',queue,payload)));
      if(batch>=4)times.push(performance.now()-start);
    }
    assert.equal((await b.purgeQueue(queue))['message-count'],160);
    times.sort((x,y)=>x-y);const elapsed=times.reduce((x,y)=>x+y,0);
    performanceSample={payloadBytes:4096,inFlight:8,warmupBatches:4,measuredBatches:16,messages:128,medianBatchMs:times[8],p95BatchMs:times[15],confirmedMessagesPerSecond:128000/elapsed,scope:'one Windows Node/WSL loopback run; nonpersistent messages, exclusive classic queue; not a production or upstream throughput comparison'};
  });
  await run('mandatory unroutable return carries body before confirm', async () => {
    const returned = once(a,'return'); await a.publish('', 'missing-'+Date.now(), 'returned', {mandatory:true});
    const [message] = await returned; assert.equal(message.args['reply-code'],312); assert.equal(message.body.toString(),'returned');
  });
  await run('nack requeues with redelivery then reject discards', async () => {
    await a.publish('',queue,'redeliver'); const first=await b.get(queue); b.nack(first.args['delivery-tag']);
    const second=await b.get(queue); assert.equal(second.args.redelivered,true); assert.equal(second.body.toString(),'redeliver');
    b.reject(second.args['delivery-tag'],false); assert.equal(await b.get(queue),null);
  });
  await run('qos consume ack cancel and callback failure isolation', async () => {
    await b.qos(1); const seen=[];
    const tag=await b.consume(queue,m=>{seen.push(m);});
    await a.publish('',queue,'first'); await a.publish('',queue,'second');
    for(let i=0;i<50 && seen.length<1;i++) await delay(20);
    assert.equal(seen.length,1); b.ack(seen[0].args['delivery-tag']);
    for(let i=0;i<50 && seen.length<2;i++) await delay(20);
    assert.equal(seen.length,2); b.ack(seen[1].args['delivery-tag']); await b.cancel(tag);
    const callbackError=once(b,'callbackError'); const badTag=await b.consume(queue,()=>{throw Error('user callback');},{noAck:true});
    await a.publish('',queue,'callback'); assert.match((await callbackError)[0].message,/user callback/); await b.cancel(badTag);
    assert.equal(await b.get(queue),null);
  });
  await run('server consumer cancel notification after queue deletion', async () => {
    const q=await b.declareQueue('',{exclusive:true}); const got=[];
    const tag=await b.consume(q.queue,m=>got.push(m)); const cancelled=once(b,'cancel');
    await a.deleteQueue(q.queue); assert.equal((await cancelled)[0],tag); await until(()=>got.length===1); assert.deepEqual(got,[null]);
  });
  const exchange='codex_'+Date.now();
  await run('exchange declare bind route unbind delete', async () => {
    await b.declareExchange(exchange,'direct'); await b.bindQueue(queue,exchange,'key');
    await a.publish(exchange,'key','routed'); const m=await b.get(queue,{noAck:true}); assert.equal(m.body.toString(),'routed');
    await b.unbindQueue(queue,exchange,'key'); await b.deleteExchange(exchange);
  });
  await run('transactions commit and rollback on separate channel', async () => {
    await b.txSelect(); await assert.rejects(b.confirmSelect(),/exclusive/);
    await b.publish('',queue,'rolled-back'); await b.txRollback(); assert.equal(await a.get(queue),null);
    await b.publish('',queue,'committed'); await b.txCommit(); assert.equal((await a.get(queue,{noAck:true})).body.toString(),'committed');
  });
  await run('channel exception preserves connection and other channels', async () => {
    const bad=await c.openChannel(); await assert.rejects(bad.declareQueue('missing-'+Date.now(),{passive:true}), /404/);
    assert.equal(bad.closed,true); assert.equal(c.closed,false); assert.equal((await a.declareQueue(queue,{passive:true})).queue,queue);
    const replacement=await c.openChannel(); assert.equal(replacement.id,bad.id);
    assert.throws(()=>bad.ack('1'),/Channel closed/);assert.throws(()=>bad.nack('1'),/Channel closed/);assert.throws(()=>bad.reject('1'),/Channel closed/);
    assert.equal((await replacement.declareQueue(queue,{passive:true})).queue,queue);await replacement.close();
  });
  await run('same-channel concurrent RPC rejected without desynchronization', async () => {
    const pending=a.declareQueue(queue,{passive:true}); await assert.rejects(a.get(queue),/One RPC/); await pending; assert.equal(await a.get(queue),null);
  });
  await run('heartbeats keep idle connection usable beyond negotiated timeout', async () => {await delay(5200); assert.equal((await a.declareQueue(queue,{passive:true})).queue,queue);});
  await run('bad password rejects handshake', async () => assert.rejects(connect({...base,password:'wrong'}),/403|ACCESS_REFUSED|ended|closed/));
  await run('missing vhost rejects handshake', async () => assert.rejects(connect({...base,vhost:'/not-present'}),/530|NOT_ALLOWED/));
  await run('TLS verifies server certificate and exchanges a message', async () => {
    const secure=await connect({...base,port:info.tlsPort,allowInsecureAuth:false,tls:{ca:Buffer.from(info.certificate,'base64'),servername:'localhost'}}); connections.push(secure);
    const ch=await secure.openChannel(); const q=await ch.declareQueue('',{exclusive:true}); await ch.confirmSelect();
    await ch.publish('',q.queue,'tls'); assert.equal((await ch.get(q.queue,{noAck:true})).body.toString(),'tls'); await secure.close();
  });
  await run('TLS rejects untrusted certificate', async () => assert.rejects(connect({...base,port:info.tlsPort,tls:{servername:'localhost'}}), /certificate|self-signed/));
  await run('TLS rejects wrong hostname even with trusted CA', async () => assert.rejects(connect({...base,port:info.tlsPort,tls:{ca:Buffer.from(info.certificate,'base64'),servername:'incorrect.test'}}), /Hostname|Altname|altnames/));
  await run('broker CLI roundtrip publish get and empty queue', async () => {
    const env={AMQP_HOST:'127.0.0.1',AMQP_PORT:String(info.port),AMQP_USER:'demo',AMQP_PASSWORD:'test-only',AMQP_ALLOW_INSECURE:'1',AMQP_TLS:'0'};
    let result=await cli(['roundtrip'],env);assert.equal(result.code,0,result.stderr);assert.equal(Buffer.from(JSON.parse(result.stdout).bodyBase64,'base64').toString(),'Hello from MoonBit AMQP');
    const name='cli_'+Date.now();await a.declareQueue(name);
    try {
      result=await cli(['publish',name],env,'cli input');assert.equal(result.code,0,result.stderr);assert.equal(JSON.parse(result.stdout).confirmed,true);
      result=await cli(['get',name],env);assert.equal(result.code,0,result.stderr);assert.equal(Buffer.from(JSON.parse(result.stdout).bodyBase64,'base64').toString(),'cli input');
      result=await cli(['get',name],env);assert.equal(result.code,0,result.stderr);assert.equal(JSON.parse(result.stdout),null);
    } finally {await a.deleteQueue(name);}
  });
  await run('orderly channel and connection close', async () => {await b.close(); await a.close(); await c.close(); assert.equal(c.closed,true);});
  assertSourceUnchanged(sources);
  await fs.writeFile(new URL('../evidence/rabbitmq-validation.json',import.meta.url),JSON.stringify({at:new Date().toISOString(),node:process.version,platform:process.platform,oracle:'RabbitMQ 4.0.5-10ubuntu5 on Erlang/OTP 27, Ubuntu distribution packages, unmodified binaries',transport:'Windows Node to loopback WSL Ubuntu-D' ,tests:cases,passed:cases.length,performanceSample,packages:info.packages,sources},null,2)+'\n');
  console.log(`RabbitMQ integration: ${cases.length} passed`);
} finally {
  clearTimeout(startup); for(const c of connections) c.destroy();
  server.stdin.end('\n');
  const [code]=await exited;
  if(code!==0) {console.error(diagnostic); throw Error('Reference server exit '+code);}
}
