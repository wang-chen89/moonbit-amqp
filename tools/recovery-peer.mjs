// Scripted peer bytes below are independently constructed from the AMQP spec.
// It does not use the production MoonBit codec. RabbitMQ tests are separate.
import net from 'node:net';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {connect} from './client.mjs';

const cat=(...parts)=>Buffer.concat(parts), u16=n=>{const b=Buffer.alloc(2);b.writeUInt16BE(n);return b;}, u32=n=>{const b=Buffer.alloc(4);b.writeUInt32BE(n);return b;};
const u64=n=>{const b=Buffer.alloc(8);b.writeBigUInt64BE(BigInt(n));return b;};
const short=s=>cat(Buffer.from([Buffer.byteLength(s)]),Buffer.from(s));
const long=s=>cat(u32(Buffer.byteLength(s)),Buffer.from(s));
const frame=(type,ch,payload)=>cat(Buffer.from([type]),u16(ch),u32(payload.length),payload,Buffer.from([206]));
const method=(ch,cls,id,...args)=>frame(1,ch,cat(u16(cls),u16(id),...args));
const ack=(ch,tag,multiple=false,nack=false)=>method(ch,60,nack?120:80,u64(tag),Buffer.from([multiple?1:0]));
const started=(options,peer)=>options.start?.(peer)??method(0,10,10,Buffer.from([0,9]),u32(0),long(typeof options.mechanisms==='function'?options.mechanisms(peer):options.mechanisms??'PLAIN'),long(options.locales??'en_US'));
const delay=ms=>new Promise(r=>setTimeout(r,ms));

async function fixture(options, action) {
  const sockets=new Set(), errors=[], connections=[];
  const state={methods:[],messages:[],sockets,errors,accepted:0};
  const server=net.createServer(socket=>{
    socket.peerId=++state.accepted; sockets.add(socket); socket.on('close',()=>sockets.delete(socket)); socket.on('error',()=>{});
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
            let chain=Promise.resolve();for(const byte of started(options,socket.peerId))chain=chain.then(()=>new Promise(r=>setImmediate(()=>{if(!socket.destroyed)send(Buffer.from([byte]));r();})));
          } else send(started(options,socket.peerId));
        }
        while(buffer.length>=8) {
          const size=buffer.readUInt32BE(3)+8;if(buffer.length<size)return;
          const f=buffer.subarray(0,size); buffer=buffer.subarray(size);assert.equal(f.at(-1),206);
          const type=f[0],ch=f.readUInt16BE(1),p=f.subarray(7,-1);
          if(type===1) {
            const cls=p.readUInt16BE(0),id=p.readUInt16BE(2),entry={cls,id,ch,args:p.subarray(4),peer:socket.peerId};state.methods.push(entry);
            if(options.onMethod?.(entry,socket,state)===true)continue;
            if(cls===10 && id===11) send(method(0,10,30,u16(8),u32(8192),u16(options.heartbeat??0)));
            else if(cls===10 && id===40) send(method(0,10,41,short('')));
            else if(cls===20 && id===10) send(method(ch,20,11,u32(0)));
            else if(cls===85 && id===10) send(method(ch,85,11));
            else if(cls===50 && id===10) {const n=p[6],name=p.subarray(7,7+n).toString();send(method(ch,50,11,short(name||('generated-'+socket.peerId)),u32(0),u32(0)));}
            else if(cls===40 && [10,20,30,40].includes(id))send(method(ch,40,id===40?51:id+1));
            else if(cls===50 && [20,50].includes(id))send(method(ch,50,id+1));
            else if(cls===50 && [30,40].includes(id))send(method(ch,50,id+1,u32(0)));
            else if(cls===60 && id===10)send(method(ch,60,11));
            else if(cls===60 && id===20) {let pos=6+p[6]+1;const n=p[pos];send(method(ch,60,21,p.subarray(pos,pos+n+1)));}
            else if(cls===60 && id===30)send(method(ch,60,31,p.subarray(4,5+p[4])));
            else if(cls===60 && id===70)send(method(ch,60,72,short('')));
            else if(cls===60 && id===110)send(method(ch,60,111));
            else if(cls===90 && [10,20,30].includes(id))send(method(ch,90,id+1));
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
  await new Promise((resolve,reject)=>{server.once('error',reject);if(options.listenPath)server.listen(options.listenPath,resolve);else server.listen(0,options.listenHost??'127.0.0.1',resolve);});
  const opts={host:options.listenHost??'127.0.0.1',port:server.address().port,username:'demo',password:'test',allowInsecureAuth:true,heartbeat:0,timeout:800};
  const open=async more=>{const c=await connect({...opts,...more});connections.push(c);return c;};
  try{await action({open,opts,state});assert.deepEqual(errors,[]);}
  finally{for(const c of connections)c.destroy();for(const s of sockets)s.destroy();await new Promise(r=>server.close(r));}
}
export {fixture,method,frame,ack,cat,u16,u32,u64,short,long,delay};
export async function until(check,timeout=4000){const t0=Date.now();while(!check()){if(Date.now()-t0>timeout)throw Error('Fixture condition timeout');await delay(5);}}
export function deliver(socket,ch,tag,consumerTag,body='message') {
 body=Buffer.from(body);
 socket.write(cat(method(ch,60,60,short(consumerTag),u64(tag),Buffer.from([0]),short(''),short('queue')),
 frame(2,ch,cat(u16(60),u16(0),u64(body.length),u16(0))),frame(3,ch,body)));
}
