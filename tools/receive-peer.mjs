import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {cat,frame,method,u16,u32,u64,short} from './stream-peer.mjs';
export {fixture,delay,gate,until,ack} from './stream-peer.mjs';
export const header=(ch,size)=>frame(2,ch,cat(u16(60),u16(0),u64(size),u16(0x8000),short('application/octet-stream')));
export const getOk=(ch,tag=1)=>method(ch,60,71,u64(tag),Buffer.from([0]),short(''),short('q'),u32(0));
export const deliver=(ch,tag=1)=>method(ch,60,60,short('consumer'),u64(tag),Buffer.from([0]),short(''),short('q'));
export const returned=ch=>method(ch,60,50,u16(312),short('NO_ROUTE'),short(''),short('missing'));
export function chunkAt(offset,length){const b=Buffer.alloc(length);for(let i=0;i<length;i++)b[i]=(offset+i)%251;return b;}
export function hash(size){const h=createHash('sha256');for(let offset=0;offset<size;offset+=65536)h.update(chunkAt(offset,Math.min(65536,size-offset)));return h.digest('hex');}
export async function sendBody(socket,ch,size,{kind=getOk,fragment=4088,progress=()=>{},hold,cut=false}={}){
 const write=async bytes=>{if(!socket.write(bytes))await once(socket,'drain');};
 await write(cat(kind(ch),header(ch,size)));
 for(let offset=0;offset<size;offset+=fragment){const n=Math.min(fragment,size-offset);await write(frame(3,ch,chunkAt(offset,n)));progress(offset+n);if(hold&&offset===0)await hold;if(cut&&offset===0){socket.end();return;}}
}
