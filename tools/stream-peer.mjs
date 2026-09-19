// Independent AMQP wire peer. Bodies are hashed incrementally, never retained.
import net from 'node:net';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {connect} from './client.mjs';
export const cat=(...x)=>Buffer.concat(x),u16=n=>{const b=Buffer.alloc(2);b.writeUInt16BE(n);return b;},u32=n=>{const b=Buffer.alloc(4);b.writeUInt32BE(n);return b;},u64=n=>{const b=Buffer.alloc(8);b.writeBigUInt64BE(BigInt(n));return b;};
export const short=s=>cat(Buffer.from([Buffer.byteLength(s)]),Buffer.from(s)),long=s=>cat(u32(Buffer.byteLength(s)),Buffer.from(s));
export const frame=(kind,ch,p)=>cat(Buffer.from([kind]),u16(ch),u32(p.length),p,Buffer.from([206]));
export const method=(ch,cls,id,...args)=>frame(1,ch,cat(u16(cls),u16(id),...args));
export const ack=(ch,seq,nack=false)=>method(ch,60,nack?120:80,u64(seq),Buffer.from([0]));
export const delay=ms=>new Promise(r=>setTimeout(r,ms));
export const gate=()=>{let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};};
export async function until(check,timeout=4000){const end=Date.now()+timeout;while(!check()){if(Date.now()>end)throw Error('Fixture condition timeout');await delay(5);}}
export async function fixture(options,action){
 const sockets=new Set(),connections=[],errors=[],state={sockets,messages:[],events:[],accepted:0,maxFrame:0};
 const server=net.createServer(socket=>{
  socket.peer=++state.accepted;sockets.add(socket);socket.on('error',()=>{});socket.on('close',()=>sockets.delete(socket));
  let buffer=Buffer.alloc(0),header=false;const publishing=new Map(),sequence=new Map();
  const send=b=>socket.write(b);
  socket.on('data',chunk=>{try{
   buffer=cat(buffer,chunk);
   if(!header){if(buffer.length<8)return;assert.equal(buffer.subarray(0,8).toString('hex'),'414d515000000901');buffer=buffer.subarray(8);header=true;send(method(0,10,10,Buffer.from([0,9]),u32(0),long('PLAIN'),long('en_US')));}
   while(buffer.length>=8){
    const size=buffer.readUInt32BE(3)+8;if(buffer.length<size)return;
    const f=buffer.subarray(0,size);buffer=buffer.subarray(size);assert.equal(f.at(-1),206);state.maxFrame=Math.max(state.maxFrame,size);
    const kind=f[0],ch=f.readUInt16BE(1),p=f.subarray(7,-1),event={kind,ch,peer:socket.peer};
    if(kind===1){
     const cls=p.readUInt16BE(0),id=p.readUInt16BE(2);Object.assign(event,{cls,id});state.events.push(event);
     if(publishing.has(ch)&&!(cls===20&&id===41))throw Error('Method interleaved with partial content');
     if(options.onMethod?.(event,socket,state))continue;
     if(cls===10&&id===11)send(method(0,10,30,u16(16),u32(options.frameMax??131072),u16(options.heartbeat??0)));
     else if(cls===10&&id===40)send(method(0,10,41,short('')));
     else if(cls===20&&id===10)send(method(ch,20,11,u32(0)));
     else if(cls===85&&id===10)send(method(ch,85,11));
     else if(cls===50&&id===10)send(method(ch,50,11,short('q'),u32(0),u32(0)));
     else if(cls===60&&id===20)send(method(ch,60,21,short('consumer')));
     else if(cls===60&&id===40)publishing.set(ch,{ch,hash:createHash('sha256'),bytes:0,frames:0,peer:socket.peer});
     else if(cls===20&&id===41)publishing.delete(ch);
     else if(cls===20&&id===40)send(method(ch,20,41));
     else if(cls===10&&id===50)send(method(0,10,51));
    }else if(kind===2||kind===3){
     const msg=publishing.get(ch);assert(msg);
     if(kind===2){assert.equal(msg.size,undefined);msg.size=p.readBigUInt64BE(4);msg.header=p.toString('hex');state.events.push(event);options.onHeader?.(msg,socket,state);}
     else{assert.notEqual(msg.size,undefined);msg.bytes+=p.length;msg.frames++;msg.hash.update(p);assert(BigInt(msg.bytes)<=msg.size);options.onBody?.(msg,socket,state);}
     if(BigInt(msg.bytes)===msg.size){publishing.delete(ch);msg.sha256=msg.hash.digest('hex');delete msg.hash;msg.size=String(msg.size);msg.seq=(sequence.get(ch)??0)+1;sequence.set(ch,msg.seq);state.messages.push(msg);state.events.push({kind:'complete',ch,peer:socket.peer});options.onMessage?.(msg,socket,state);}
    }
   }
  }catch(error){errors.push(error);socket.destroy();}});
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const open=async extra=>{const c=await connect({host:'127.0.0.1',port:server.address().port,allowInsecureAuth:true,heartbeat:0,timeout:2000,...extra});connections.push(c);return c;};
 try{await action({open,state,port:server.address().port});assert.deepEqual(errors,[]);}finally{for(const c of connections)c.destroy();for(const s of sockets)s.destroy();await new Promise(r=>server.close(r));}
}
