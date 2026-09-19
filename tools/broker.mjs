import fs from 'node:fs';
import {connect} from './client.mjs';

let connection;
try {
  const [command, queue, ...extra] = process.argv.slice(2);
  if (command === '--help') {
    console.log('Usage: node tools/broker.mjs roundtrip | publish QUEUE | get QUEUE\nConfiguration: AMQP_HOST, AMQP_PORT, AMQP_USER, AMQP_PASSWORD, AMQP_VHOST. AMQP_TLS=1 enables TLS; AMQP_CA points to a trusted CA PEM file. AMQP_CERT and AMQP_KEY supply a client certificate; AMQP_SERVERNAME sets the TLS server name. AMQP_SASL is a comma-separated preference list (PLAIN,AMQPLAIN,EXTERNAL), default PLAIN; AMQP_LOCALE defaults to en_US. TCP requires AMQP_ALLOW_INSECURE=1. Publish reads up to 1 MiB from stdin and waits for a publisher confirm. Get prints JSON with bodyBase64 and then acknowledges; empty queue prints null. Roundtrip uses an exclusive temporary queue. Exit 0 success, 1 error.');
  } else {
    if (!['roundtrip','publish','get'].includes(command) || extra.length || (command==='roundtrip' ? queue!==undefined : !queue)) throw Error('Invalid arguments; use --help');
    let body;
    if(command==='publish') {
      const chunks=[];let size=0;
      for await(const chunk of process.stdin){size+=chunk.length;if(size>1048576)throw Error('Body limit: 1 MiB');chunks.push(chunk);}
      body=Buffer.concat(chunks);
    }
    const secure=process.env.AMQP_TLS==='1';
    if(Boolean(process.env.AMQP_CERT)!==Boolean(process.env.AMQP_KEY))throw Error('AMQP_CERT and AMQP_KEY must both be configured');
    const sasl=process.env.AMQP_SASL?.split(',').map(mechanism=>({mechanism:mechanism.trim()}));
    connection=await connect({host:process.env.AMQP_HOST??'localhost',port:Number(process.env.AMQP_PORT??(secure?5671:5672)),username:process.env.AMQP_USER??'guest',password:process.env.AMQP_PASSWORD??'guest',vhost:process.env.AMQP_VHOST??'/',locale:process.env.AMQP_LOCALE??'en_US',sasl,allowInsecureAuth:process.env.AMQP_ALLOW_INSECURE==='1',tls:secure?{...(process.env.AMQP_CA?{ca:fs.readFileSync(process.env.AMQP_CA)}:{}),...(process.env.AMQP_CERT?{cert:fs.readFileSync(process.env.AMQP_CERT),key:fs.readFileSync(process.env.AMQP_KEY)}:{}),...(process.env.AMQP_SERVERNAME?{servername:process.env.AMQP_SERVERNAME}:{})}:undefined});
    const channel=await connection.openChannel();
    if(command==='publish') {
      await channel.declareQueue(queue,{passive:true});await channel.confirmSelect();
      let returned;channel.on('return',message=>{returned=message;});
      await channel.publish('',queue,body,{mandatory:true});
      if(returned)throw Error(`Publish returned: ${returned.args['reply-text']}`);
      console.log(JSON.stringify({confirmed:true,bytes:body.length}));
    } else {
      let name=queue;
      if(command==='roundtrip') {
        name=(await channel.declareQueue('',{exclusive:true})).queue;
        await channel.confirmSelect();await channel.publish('',name,'Hello from MoonBit AMQP',{properties:{'content-type':'text/plain'}});
      }
      const message=await channel.get(name);
      const record=message?{fields:message.args,properties:message.properties,bodyBase64:message.body.toString('base64')}:null;
      await new Promise((resolve,reject)=>process.stdout.write(JSON.stringify(record)+'\n',error=>error?reject(error):resolve()));
      if(message)channel.ack(message.args['delivery-tag']);
    }
    await connection.close();
  }
} catch(error){console.error(error.message);process.exitCode=1;}
finally{connection?.destroy();}
