// Independent test wire codec; never calls the production encoder or decoder.
import assert from 'node:assert/strict';
import {fixture as base,method,cat,u16,u32,u64,short,long,delay} from './recovery-peer.mjs';
export {method,cat,u16,u32,u64,short,long,delay};
const scalar=(tag,data=Buffer.alloc(0))=>cat(Buffer.from(tag),data);
export function table(value){const bytes=cat(...Object.entries(value).map(([key,v])=>cat(short(key),field(v))));return cat(u32(bytes.length),bytes);}
function field(value){
 if(value===null)return scalar('V');if(typeof value==='boolean')return scalar('t',Buffer.from([+value]));
 if(typeof value==='string')return scalar('S',long(value));
 if(typeof value==='number'){const b=Buffer.alloc(4);b.writeInt32BE(value);return scalar('I',b);}
 if(Array.isArray(value)){const b=cat(...value.map(field));return scalar('A',cat(u32(b.length),b));}
 const tag=value.$type;
 if(tag==='longstr'||tag==='bytes'){const b=Buffer.from(value.hex,'hex');return scalar(tag==='bytes'?'x':'S',cat(u32(b.length),b));}
 if(tag==='int64'){const b=Buffer.alloc(8);b.writeBigInt64BE(BigInt(value.value));return scalar('l',b);}
 if(tag==='timestamp')return scalar('T',u64(value.value));
 if(tag==='float32-bits')return scalar('f',u32(value.value));
 if(tag==='float64-bits')return scalar('d',u64(value.value));
 if(tag==='decimal'){const b=Buffer.alloc(4);b.writeInt32BE(value.value);return scalar('D',cat(Buffer.from([value.scale]),b));}
 return scalar('F',table(value));
}
export function readTable(bytes,offset=0){
 let pos=offset;
 const byte=()=>bytes[pos++],take=n=>{const b=bytes.subarray(pos,pos+n);assert.equal(b.length,n);pos+=n;return b;},uint=()=>take(4).readUInt32BE(0);
 const text=b=>{try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(b);}catch{return {$type:'longstr',hex:b.toString('hex')};}};
 const readValue=()=>{switch(String.fromCharCode(byte())){
  case 't':return Boolean(byte());case 'V':return null;case 'S':return text(take(uint()));case 'x':return {$type:'bytes',hex:take(uint()).toString('hex')};
  case 'b':return take(1).readInt8(0);case 'B':return byte();case 's':return take(2).readInt16BE(0);case 'u':return take(2).readUInt16BE(0);case 'I':return take(4).readInt32BE(0);case 'i':return uint();
  case 'l':return {$type:'int64',value:take(8).readBigInt64BE(0).toString()};case 'T':return {$type:'timestamp',value:take(8).readBigUInt64BE(0).toString()};
  case 'f':return {$type:'float32-bits',value:uint()};case 'd':return {$type:'float64-bits',value:take(8).readBigUInt64BE(0).toString()};
  case 'D':return {$type:'decimal',scale:byte(),value:take(4).readInt32BE(0)};
  case 'F':{const out=readTable(bytes,pos);pos=out.end;return out.value;}
  case 'A':{const n=uint(),end=pos+n,out=[];while(pos<end)out.push(readValue());assert.equal(pos,end);return out;}
  default:throw Error('Unknown independent field tag');
 }};
 const length=uint(),end=pos+length,out={};while(pos<end){const key=take(byte()).toString();Object.defineProperty(out,key,{value:readValue(),enumerable:true,writable:true,configurable:true});}assert.equal(pos,end);return {value:out,end};
}
export const fixture=(options,action)=>base({...options,start:peer=>method(0,10,10,Buffer.from([0,9]),table(typeof options.properties==='function'?options.properties(peer):options.properties??{product:'independent peer',capabilities:{'connection.blocked':true}}),long(options.mechanisms??'PLAIN'),long(typeof options.locales==='function'?options.locales(peer):options.locales??'en_US fr_FR'))},action);
export const clientProperties=state=>state.methods.filter(e=>e.cls===10&&e.id===11).map(e=>readTable(e.args).value);
export const sampleProperties={product:'shared client',connection_name:'metadata-test',nested:{flags:[true,null,'文'],amount:{$type:'decimal',scale:2,value:314}},counter:{$type:'int64',value:'9223372036854775807'},timestamp:{$type:'timestamp',value:'1700000000'},bytes:{$type:'bytes',hex:'00ff01'},opaque:{$type:'longstr',hex:'ff00'},float:{$type:'float32-bits',value:1069547520},double:{$type:'float64-bits',value:'4607182418800017408'}};
