import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
import net from 'node:net';
export async function withRabbit(action,{authentication=false}={}) {
 const root=process.env.RABBITMQ_ROOT;if(!root)throw Error('Set RABBITMQ_ROOT');
 let script=fileURLToPath(new URL('./rabbitmq-reference.py',import.meta.url));
 if(process.platform==='win32')script='/mnt/'+script[0].toLowerCase()+script.slice(2).replaceAll('\\','/');
 const args=[script,root,...(authentication?['--auth']:[])];
 const server=process.platform==='win32'?spawn('wsl',['-d',process.env.WSL_DISTRO??'Ubuntu-D','--exec','python3',...args],{windowsHide:true,stdio:['pipe','pipe','pipe']}):spawn('python3',args,{stdio:['pipe','pipe','pipe']});
 let diagnostic='',info;server.stderr.on('data',b=>diagnostic+=b);
 server.stdin.on('error',()=>{});
 const exited=once(server,'exit'),lines=createInterface({input:server.stdout});
 const startup=setTimeout(()=>server.stdin.end(),45000);
 try {
  for await(const line of lines)if(line.startsWith('READY ')){info=JSON.parse(line.slice(6));break;}
  clearTimeout(startup);if(!info)throw Error('RabbitMQ failed to start: '+diagnostic);
  for(const port of [info.port,info.tlsPort]) {
   const deadline=Date.now()+10000;let ready=false;
   while(Date.now()<deadline&&!ready) {
    ready=await new Promise(resolve=>{const socket=net.connect({host:'127.0.0.1',port});const done=ok=>{socket.destroy();resolve(ok);};socket.once('connect',()=>done(true));socket.once('error',()=>done(false));socket.setTimeout(150,()=>done(false));});
    if(!ready)await new Promise(resolve=>setTimeout(resolve,100));
   }
   if(!ready)throw Error('WSL broker forwarding unavailable');
  }
  return await action(info);
 } finally {
  clearTimeout(startup);server.stdin.end('\n');const [code]=await exited;
  if(code!==0)throw Error('RabbitMQ cleanup failed: '+diagnostic);
 }
}
export async function proxyTo(port) {
 const pairs=new Set();let accepted=0,blocked=false;
 const server=net.createServer(client=>{
  accepted++;if(blocked){client.destroy();return;}
  const upstream=net.connect({host:'127.0.0.1',port}),pair={client,upstream};pairs.add(pair);
  const stop=()=>{pairs.delete(pair);client.destroy();upstream.destroy();};
  client.on('error',stop);upstream.on('error',stop);client.on('close',stop);upstream.on('close',stop);
  client.pipe(upstream);upstream.pipe(client);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const cut=()=>{for(const {client,upstream} of [...pairs]){client.destroy();upstream.destroy();}};
 return {port:server.address().port,get accepted(){return accepted;},set blocked(value){blocked=value;},cut,
  async close(){cut();await new Promise(resolve=>server.close(resolve));}};
}
