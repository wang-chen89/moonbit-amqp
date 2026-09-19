import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {waitFor} from './outbound.mjs';

export function sizeArgument(text, name='size') {
  if (!/^(0|[1-9][0-9]*)$/.test(text??'')) throw Error(`Invalid ${name}: expected a decimal UInt64`);
  const size=BigInt(text);
  if (size>18446744073709551615n) throw Error(`Invalid ${name}: exceeds UInt64`);
  return size;
}
export function parseArguments(args) {
  if (args.length===1&&args[0]==='--help') return {command:'--help'};
  const [command,queue,...flags]=args;
  if (command==='roundtrip'&&args.length===1) return {command};
  if (!['publish','get'].includes(command)||!queue) throw Error('Invalid arguments; use --help');
  if (!flags.length) return {command,queue};
  if (flags.length===2&&flags[0]==='--file'&&flags[1]) return {command,queue,file:flags[1]};
  if (command==='publish'&&flags.length===2&&flags[0]==='--size') return {command,queue,size:sizeArgument(flags[1])};
  if (command==='get'&&flags.length===1&&flags[0]==='--raw') return {command,queue,raw:true};
  throw Error('Invalid arguments; use --help');
}
export const jsonSize=size=>size<=BigInt(Number.MAX_SAFE_INTEGER)?Number(size):String(size);
export function checkSize(size,limit) {if(size>limit)throw Error(`Body limit: ${limit} bytes`);}
export async function writeAll(file,chunk,signal) {
  for(let offset=0;offset<chunk.length;){
    signal.throwIfAborted();
    const {bytesWritten}=await file.write(chunk,offset,chunk.length-offset);
    if(!bytesWritten)throw Error('File write made no progress');
    offset+=bytesWritten;
  }
}

// Only the two exact paths created here are removed. No recursive cleanup.
export class TemporaryFile {
  static async create(parent=os.tmpdir()) {
    const folder=await fs.mkdtemp(path.join(parent,'.moonbit-amqp-'));
    const name=path.join(folder,'body');
    try {return new TemporaryFile(folder,name,await fs.open(name,'wx+',0o600));}
    catch(error){await fs.rmdir(folder);throw error;}
  }
  constructor(folder,name,handle){Object.assign(this,{folder,name,handle});}
  async close(){if(this.handle){await this.handle.close();this.handle=undefined;}}
  async cleanup(){await this.close();await fs.unlink(this.name);await fs.rmdir(this.folder);}
  async install(target,signal){
    signal.throwIfAborted();await this.handle.sync();await this.close();signal.throwIfAborted();
    // link is atomic and fails if the target exists, including a raced-in symlink.
    // Unsupported filesystems fail safely; never fall back to replacing a file.
    await fs.link(this.name,target);
  }
}
export async function prepareDestination(name) {
  const target=path.resolve(name);
  try{await fs.lstat(target);throw Error('Output already exists');}
  catch(error){if(error.code!=='ENOENT')throw error;}
  return {target,temp:await TemporaryFile.create(path.dirname(target))};
}
export async function prepareInput(options,{stdin,limit,timeout,signal,resources}) {
  if(options.file){
    const handle=await fs.open(options.file,'r');resources.push(()=>handle.close());
    const stat=await handle.stat({bigint:true});
    if(!stat.isFile())throw Error('Input must be a regular file');
    checkSize(stat.size,limit);
    const source=handle.createReadStream({autoClose:false,start:0,highWaterMark:65536,signal});
    source.on('error',()=>{});
    resources.push(()=>source.destroy());
    return {source,size:stat.size};
  }
  if(options.size!==undefined){checkSize(options.size,limit);return {source:stdin,size:options.size};}
  const temp=await TemporaryFile.create();resources.push(()=>temp.cleanup());
  const iterator=stdin[Symbol.asyncIterator]();let size=0n;
  while(true){
    const item=await waitFor(iterator.next(),timeout,[signal]);
    if(item.done)break;
    size+=BigInt(item.value.length);checkSize(size,limit);
    await writeAll(temp.handle,item.value,signal);
  }
  const source=temp.handle.createReadStream({autoClose:false,start:0,highWaterMark:65536,signal});
  source.on('error',()=>{});
  resources.push(()=>source.destroy());
  return {source,size};
}
