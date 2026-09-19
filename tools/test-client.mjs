// Scripted peer bytes below are independently constructed from the AMQP spec.
// It does not use the production MoonBit codec. RabbitMQ tests are separate.
import net from 'node:net';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import fs from 'node:fs/promises';
import {sourceSnapshot,assertSourceUnchanged} from './evidence-source.mjs';
import {connect} from './client.mjs';
import * as core from '../web/engine.mjs';
const sources=sourceSnapshot(['session.mbt', 'cmd/web/session.mbt', 'tools/client.mjs', 'web/engine.mjs', 'tools/test-client.mjs']);

const tests=[], cat=(...parts)=>Buffer.concat(parts), u16=n=>{const b=Buffer.alloc(2);b.writeUInt16BE(n);return b;}, u32=n=>{const b=Buffer.alloc(4);b.writeUInt32BE(n);return b;};
const u64=n=>{const b=Buffer.alloc(8);b.writeBigUInt64BE(BigInt(n));return b;};
const short=s=>cat(Buffer.from([Buffer.byteLength(s)]),Buffer.from(s));
const long=s=>cat(u32(Buffer.byteLength(s)),Buffer.from(s));
const frame=(type,ch,payload)=>cat(Buffer.from([type]),u16(ch),u32(payload.length),payload,Buffer.from([206]));
const method=(ch,cls,id,...args)=>frame(1,ch,cat(u16(cls),u16(id),...args));
const ack=(ch,tag,multiple=false,nack=false)=>method(ch,60,nack?120:80,u64(tag),Buffer.from([multiple?1:0]));
const started=()=>method(0,10,10,Buffer.from([0,9]),u32(0),long('PLAIN'),long('en_US'));
const delay=ms=>new Promise(r=>setTimeout(r,ms));

async function fixture(options, action) {
  const sockets=new Set(), errors=[], connections=[];
  const state={methods:[],messages:[],sockets,errors};
  const server=net.createServer(socket=>{
    sockets.add(socket); socket.on('close',()=>sockets.delete(socket)); socket.on('error',()=>{});
    let buffer=Buffer.alloc(0), header=false, publishing=new Map();
    const send=b=>socket.write(b);
    socket.on('data',chunk=>{
      try {
        buffer=cat(buffer,chunk);
        if(!header) {
          if(buffer.length<8)return;
          assert.equal(buffer.subarray(0,8).toString('hex'),'414d515000000901'); buffer=buffer.subarray(8);header=true;
          if(options.noStart)return;
          if(options.fragmentStart) {
            let chain=Promise.resolve();for(const byte of started())chain=chain.then(()=>new Promise(r=>setImmediate(()=>{if(!socket.destroyed)send(Buffer.from([byte]));r();})));
          } else send(started());
        }
        while(buffer.length>=8) {
          const size=buffer.readUInt32BE(3)+8;if(buffer.length<size)return;
          const f=buffer.subarray(0,size); buffer=buffer.subarray(size);assert.equal(f.at(-1),206);
          const type=f[0],ch=f.readUInt16BE(1),p=f.subarray(7,-1);
          if(type===1) {
            const cls=p.readUInt16BE(0),id=p.readUInt16BE(2),entry={cls,id,ch,args:p.subarray(4)};state.methods.push(entry);
            if(options.onMethod?.(entry,socket,state)===true)continue;
            if(cls===10 && id===11) send(method(0,10,30,u16(8),u32(8192),u16(options.heartbeat??0)));
            else if(cls===10 && id===40) send(method(0,10,41,short('')));
            else if(cls===20 && id===10) send(method(ch,20,11,u32(0)));
            else if(cls===85 && id===10) send(method(ch,85,11));
            else if(cls===50 && id===10) send(method(ch,50,11,short('q'),u32(0),u32(0)));
            else if(cls===60 && id===40) publishing.set(ch,{ch,body:Buffer.alloc(0),remaining:null});
            else if(cls===20 && id===40) send(method(ch,20,41));
            else if(cls===10 && id===50) send(method(0,10,51));
          } else if(type===2 || type===3) {
            const msg=publishing.get(ch);assert.ok(msg);
            if(type===2)msg.remaining=Number(p.readBigUInt64BE(4));
            else {msg.body=cat(msg.body,p);msg.remaining-=p.length;}
            if(msg.remaining===0){publishing.delete(ch);state.messages.push(msg);options.onMessage?.(msg,socket,state);}
          }
        }
      } catch(e){errors.push(e);socket.destroy();}
    });
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const opts={host:'127.0.0.1',port:server.address().port,username:'demo',password:'test',allowInsecureAuth:true,heartbeat:0,timeout:800};
  const open=async more=>{const c=await connect({...opts,...more});connections.push(c);return c;};
  try{await action({open,opts,state});assert.deepEqual(errors,[]);}
  finally{for(const c of connections)c.destroy();for(const s of sockets)s.destroy();await new Promise(r=>server.close(r));}
}
async function test(name, action){await action();tests.push(name);console.log('PASS '+name);}

await test('configuration rejects plaintext by default and invalid numeric values',async()=>{
  await assert.rejects(connect(),/allowInsecureAuth/);
  for(const options of [{frameMax:4095},{heartbeat:-1},{channelMax:0},{timeout:NaN},{port:65536}])await assert.rejects(connect({allowInsecureAuth:true,...options}),/Invalid/);
});
await test('fragmented handshake and graceful close',()=>fixture({fragmentStart:true},async({open})=>{const c=await open();const ch=await c.openChannel();assert.equal((await ch.declareQueue()).queue,'q');await ch.close();await c.close();}));
await test('handshake timeout destroys socket',()=>fixture({noStart:true},async({open})=>{await assert.rejects(open({timeout:80}),/handshake timeout/);}));
await test('abort during handshake',()=>fixture({noStart:true},async({open})=>{const controller=new AbortController();const p=open({signal:controller.signal});setTimeout(()=>controller.abort(Error('cancel connect')),30);await assert.rejects(p,/cancel connect/);}));
await test('RPC timeout rejects all channels and closes connection',()=>fixture({onMethod:e=>e.cls===50},async({open})=>{
  const c=await open({timeout:100}),a=await c.openChannel(),b=await c.openChannel();
  const result=await Promise.allSettled([a.declareQueue(),b.declareQueue()]);assert.equal(result[0].status,'rejected');assert.equal(result[1].status,'rejected');assert.equal(c.closed,true);
}));
await test('abort terminates pending RPC',()=>fixture({onMethod:e=>e.cls===50},async({open})=>{
  const controller=new AbortController(),c=await open({signal:controller.signal}),ch=await c.openChannel();const p=ch.declareQueue();controller.abort();await assert.rejects(p,/abort/i);assert.equal(c.closed,true);
}));
await test('premature EOF with partial message rejects get',()=>fixture({onMethod:(e,s)=>{
  if(e.cls===60&&e.id===70){s.end(cat(method(e.ch,60,71,u64(1),Buffer.from([0]),short(''),short('q'),u32(0)),frame(2,e.ch,cat(u16(60),u16(0),u64(20),u16(0))),frame(3,e.ch,Buffer.from('part'))));return true;}
}},async({open})=>{const c=await open(),ch=await c.openChannel();await assert.rejects(ch.get('q'),/incomplete/);assert.equal(c.closed,true);}));
await test('connection close rejects RPC and acknowledges peer',()=>fixture({onMethod:(e,s)=>{
  if(e.cls===50){s.write(method(0,10,50,u16(320),short('shutdown'),u16(0),u16(0)));return true;}
}},async({open,state})=>{const c=await open(),ch=await c.openChannel();await assert.rejects(ch.declareQueue(),/320/);await delay(30);assert.ok(state.methods.some(e=>e.cls===10&&e.id===51));}));
await test('out-of-order single and cumulative publisher confirmations',()=>fixture({onMessage:(m,s,state)=>{
  if(state.messages.length===3)s.write(cat(ack(m.ch,2),ack(m.ch,3,true)));
}},async({open})=>{const c=await open(),ch=await c.openChannel();await ch.confirmSelect();const result=await Promise.all([ch.publish('','q','a'),ch.publish('','q','b'),ch.publish('','q','c')]);assert.deepEqual(result.map(x=>x.deliveryTag),[1n,2n,3n]);}));
await test('publisher nack rejects only affected publish',()=>fixture({onMessage:(m,s,state)=>s.write(ack(m.ch,state.messages.length,false,state.messages.length===1))},async({open})=>{
  const c=await open(),ch=await c.openChannel();await ch.confirmSelect();await assert.rejects(ch.publish('','q','a'),/nack/);await ch.publish('','q','b');assert.equal(c.closed,false);
}));
await test('future confirmation tag fails closed',()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,99))},async({open})=>{
  const c=await open(),ch=await c.openChannel();await ch.confirmSelect();await assert.rejects(ch.publish('','q','a'),/confirmation/);assert.equal(c.closed,true);
}));
await test('unconfirmed publish timeout closes connection',()=>fixture({},async({open})=>{
  const c=await open({timeout:100}),ch=await c.openChannel();await ch.confirmSelect();await assert.rejects(ch.publish('','q','a'),/confirm timeout/);assert.equal(c.closed,true);
}));
await test('missing broker heartbeat fails idle connection',()=>fixture({heartbeat:1},async({open})=>{
  const c=await open({heartbeat:1,timeout:2500});const [error]=await once(c,'close');assert.match(error.message,/heartbeat/);
}));
await test('bad frame terminator fails pending request',()=>fixture({onMethod:(e,s)=>{
  if(e.cls===50){const bad=method(e.ch,50,11,short('q'),u32(0),u32(0));bad[bad.length-1]=0;s.write(bad);return true;}
}},async({open})=>{const c=await open(),ch=await c.openChannel();await assert.rejects(ch.declareQueue(),/terminator/);}));
await test('oversized frame rejected from header without waiting for body',()=>fixture({onMethod:(e,s)=>{
  if(e.cls===50){s.write(cat(Buffer.from([1]),u16(e.ch),u32(8185)));return true;}
}},async({open})=>{const c=await open(),ch=await c.openChannel();await assert.rejects(ch.declareQueue(),/exceeds limit/);}));
await test('invalid local publish leaves confirmation sequence usable',()=>fixture({onMessage:(m,s)=>s.write(ack(m.ch,1))},async({open})=>{
  const c=await open(),ch=await c.openChannel();await ch.confirmSelect();
  await assert.rejects(ch.publish('','q','x',{properties:{headers:{broken:{$type:'int64'}}}}),/missing field/);
  await assert.rejects(ch.publish('','q','x',{properties:{headers:{bits:{$type:'float32-bits',value:1.5}}}}),/uint32/);
  await assert.rejects(ch.publish('','q',Buffer.alloc(1048577)),/body limit/);
  assert.equal((await ch.publish('','q','ok')).deliveryTag,1n);
}));
await test('broker blocked event prevents publishing until unblocked',()=>fixture({onMethod:(e,s)=>{
  if(e.cls===50){s.write(cat(method(e.ch,50,11,short('q'),u32(0),u32(0)),method(0,10,60,short('memory'))));setTimeout(()=>{if(!s.destroyed)s.write(method(0,10,61));},100);return true;}
}},async({open})=>{const c=await open(),ch=await c.openChannel();const blocked=once(c,'blocked');await ch.declareQueue();await blocked;await assert.rejects(ch.publish('','q','x'),/blocked/);await once(c,'unblocked');await ch.publish('','q','ok');}));
await test('session bridge malformed table does not throw outside error result',async()=>{
  assert.doesNotThrow(()=>{const value=core.session_publish('missing',1,'','q','','{"headers":{"x":{"$type":"bytes"}}}',false);assert.match(value,/ERROR:/);});
});

assertSourceUnchanged(sources);
await fs.writeFile(new URL('../evidence/client-validation.json',import.meta.url),JSON.stringify({at:new Date().toISOString(),node:process.version,passed:tests.length,tests,sources},null,2)+'\n');
console.log(`Client fixtures: ${tests.length} passed`);
