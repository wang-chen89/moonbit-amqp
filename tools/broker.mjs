import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {connect} from './client.mjs';
import {waitFor} from './outbound.mjs';
import {OutputWriter} from './broker-output.mjs';
import {parseArguments,sizeArgument,jsonSize,checkSize,prepareInput,prepareDestination,writeAll} from './broker-files.mjs';

const help=`Usage: node tools/broker.mjs roundtrip | publish QUEUE [--file PATH | --size BYTES] | get QUEUE [--file PATH | --raw]
Configuration: AMQP_HOST, AMQP_PORT, AMQP_USER, AMQP_PASSWORD, AMQP_VHOST. AMQP_TLS=1 enables TLS; AMQP_CA points to a trusted CA PEM file. AMQP_CERT and AMQP_KEY supply a client certificate; AMQP_SERVERNAME sets the TLS server name. AMQP_SASL is a comma-separated preference list (PLAIN,AMQPLAIN,EXTERNAL), default PLAIN; AMQP_LOCALE defaults to en_US. TCP requires AMQP_ALLOW_INSECURE=1.
Publish streams a regular file or exactly --size bytes from stdin; without either option stdin is spooled privately to disk before connecting. Publish waits for a publisher confirm and rejects mandatory returns. AMQP_MAX_BODY_BYTES defaults to 1073741824 (1 GiB); AMQP_TIMEOUT defaults to 10000 milliseconds per operation/progress wait. Both must be positive decimal integers.
Get --file saves to a new path only, via a synced temporary file and atomic hard link, then acknowledges. The filesystem must support hard links. Get --raw writes only body bytes to stdout, metadata to stderr, then acknowledges after output completion; empty queue exits 2 with no stdout. Default get prints JSON with bodyBase64 (8 MiB assembly limit); empty queue prints null. Roundtrip uses an exclusive temporary queue. Streamed results include bytes and SHA256. Exit 0 success, 1 error, 2 empty raw get, 130/143 handled SIGINT/SIGTERM. Failed outputs are not acknowledged; connection loss after saving/acknowledging can leave the outcome uncertain. No automatic retries.`;
let connection,writer,timeout=10000;
const controller=new AbortController(),signal=controller.signal,resources=[];
const abort=error=>{if(!signal.aborted){controller.abort(error);process.stdin.destroy();writer?.destroy(error);}};
for(const [event,code] of [['SIGINT',130],['SIGTERM',143]])process.on(event,()=>{process.exitCode=code;abort(Error(event));process.stdin.destroy();});
process.stdout.on('error',abort);
process.stderr.on('error',()=>{process.exitCode=1;});
async function output(stream,value){
  signal.throwIfAborted();
  if(stream===process.stdout){writer??=new OutputWriter();await waitFor(writer.write(value),timeout,[signal]);}
  else await waitFor(new Promise((resolve,reject)=>stream.write(value,error=>error?reject(error):resolve())),timeout,[signal]);
}
async function record(stream,value){await output(stream,JSON.stringify(value)+'\n');}
try {
  const options=parseArguments(process.argv.slice(2)),{command,queue}=options;
  if(command==='--help')await output(process.stdout,help+'\n');
  else{
    const limit=sizeArgument(process.env.AMQP_MAX_BODY_BYTES??'1073741824','AMQP_MAX_BODY_BYTES');
    const time=sizeArgument(process.env.AMQP_TIMEOUT??'10000','AMQP_TIMEOUT');
    if(!limit||time<1n||time>2147483647n)throw Error('Invalid body limit or timeout');timeout=Number(time);
    const secure=process.env.AMQP_TLS==='1';
    if(Boolean(process.env.AMQP_CERT)!==Boolean(process.env.AMQP_KEY))throw Error('AMQP_CERT and AMQP_KEY must both be configured');
    const sasl=process.env.AMQP_SASL?.split(',').map(mechanism=>({mechanism:mechanism.trim()}));
    const config={host:process.env.AMQP_HOST??'localhost',port:Number(process.env.AMQP_PORT??(secure?5671:5672)),username:process.env.AMQP_USER??'guest',password:process.env.AMQP_PASSWORD??'guest',vhost:process.env.AMQP_VHOST??'/',locale:process.env.AMQP_LOCALE??'en_US',sasl,allowInsecureAuth:process.env.AMQP_ALLOW_INSECURE==='1',timeout,signal,streamBodies:command==='publish'||Boolean(options.file||options.raw),tls:secure?{...(process.env.AMQP_CA?{ca:fs.readFileSync(process.env.AMQP_CA)}:{}),...(process.env.AMQP_CERT?{cert:fs.readFileSync(process.env.AMQP_CERT),key:fs.readFileSync(process.env.AMQP_KEY)}:{}),...(process.env.AMQP_SERVERNAME?{servername:process.env.AMQP_SERVERNAME}:{})}:undefined};
    const input=command==='publish'?await prepareInput(options,{stdin:process.stdin,limit,timeout,signal,resources}):undefined;
    const destination=command==='get'&&options.file?await prepareDestination(options.file):undefined;
    if(destination)resources.push(()=>destination.temp.cleanup());
    connection=await connect(config);const channel=await connection.openChannel();
    if(command==='publish'){
      await channel.declareQueue(queue,{passive:true});await channel.confirmSelect();
      let returned,drained;
      channel.on('return',message=>{returned=message;drained=message.body.discard();drained.catch(abort);});
      const hash=createHash('sha256');
      async function* chunks(){for await(const bytes of input.source){hash.update(bytes);yield bytes;}}
      await channel.publishStream('',queue,chunks(),input.size,{mandatory:true,signal});
      if(returned){await drained;throw Error(`Publish returned: ${returned.args['reply-text']}`);}
      await connection.close();await record(process.stdout,{confirmed:true,bytes:jsonSize(input.size),sha256:hash.digest('hex')});
    }else{
      let name=queue;
      if(command==='roundtrip'){
        name=(await channel.declareQueue('',{exclusive:true})).queue;
        await channel.confirmSelect();await channel.publish('',name,'Hello from MoonBit AMQP',{properties:{'content-type':'text/plain'}});
      }
      const message=await channel.get(name);
      if(!message){
        await connection.close();
        if(options.raw){process.exitCode=2;await record(process.stderr,{found:false});}else await record(process.stdout,null);
      }else if(options.file||options.raw){
        checkSize(BigInt(message.bodySize),limit);
        const hash=createHash('sha256');let bytes=0n;
        // Abort before unwinding the iterator on a sink failure: return() must not
        // wait to drain a TCP body after the destination has stopped accepting it.
        try{
          for await(const chunk of message.body){
            try{if(destination)await writeAll(destination.temp.handle,chunk,signal);else await output(process.stdout,chunk);}
            catch(error){abort(error);throw error;}
            bytes+=BigInt(chunk.length);hash.update(chunk);
          }
          await message.completed;
          if(destination)await destination.temp.install(destination.target,signal);
        }catch(error){abort(error);throw error;}
        await channel.ack(message.args['delivery-tag']);await connection.close();
        await record(options.raw?process.stderr:process.stdout,{found:true,fields:message.args,properties:message.properties,bytes:jsonSize(bytes),sha256:hash.digest('hex'),...(destination?{file:destination.target}:{})});
      }else{
        await record(process.stdout,{fields:message.args,properties:message.properties,bodyBase64:message.body.toString('base64')});
        await channel.ack(message.args['delivery-tag']);await connection.close();
      }
    }
  }
}catch(error){abort(error);console.error(error.message);process.exitCode ||= 1;}
finally{
  connection?.destroy();process.stdin.destroy();
  for(const cleanup of resources.reverse())try{await cleanup();}catch(error){console.error('Cleanup: '+error.message);process.exitCode ||= 1;}
  await writer?.close();
}
