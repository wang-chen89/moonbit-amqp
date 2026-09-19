import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

// Run the actual CLI in a separate process. Binary output is hashed incrementally.
export function cli(args,{env={},input=Buffer.alloc(0),keepInput=false,raw=false,pauseOutput=false,onChunk,timeout=30000}={}){
  const clean={...process.env};for(const key of Object.keys(clean))if(key.startsWith('AMQP_'))delete clean[key];
  const child=spawn(process.execPath,[fileURLToPath(new URL('./broker.mjs',import.meta.url)),...args],{windowsHide:true,env:{...clean,AMQP_HOST:'127.0.0.1',AMQP_PORT:'1',AMQP_ALLOW_INSECURE:'1',AMQP_TLS:'0',AMQP_TIMEOUT:'3000',...env},stdio:['pipe','pipe','pipe']});
  let stdout='',stderr='',bytes=0;const hash=createHash('sha256');
  child.stdout.on('data',chunk=>{bytes+=chunk.length;hash.update(chunk);if(!raw)stdout+=chunk;onChunk?.(chunk,child);});
  if(pauseOutput)child.stdout.pause();
  child.stderr.on('data',chunk=>stderr+=chunk);child.stdin.on('error',()=>{});
  const timer=setTimeout(()=>child.kill(),timeout);
  const done=once(child,'close').then(([code,signal])=>({code,signal,stdout,stderr,bytes,sha256:hash.digest('hex')})).finally(()=>clearTimeout(timer));
  if(!keepInput)child.stdin.end(input);
  return {child,done};
}
export const peerEnv=(port,temp)=>({AMQP_PORT:String(port),TEMP:temp,TMP:temp,TMPDIR:temp});
