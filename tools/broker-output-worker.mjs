import fs from 'node:fs';
// Isolate platform-dependent blocking stdout writes from the AMQP event loop.
// The parent sends one <=64 KiB chunk and waits for this acknowledgement.
process.on('message',chunk=>{
  try{
    if(!Buffer.isBuffer(chunk)||chunk.length>65536)throw Error('Invalid output chunk');
    for(let offset=0;offset<chunk.length;){const n=fs.writeSync(1,chunk,offset,chunk.length-offset);if(!n)throw Error('Output made no progress');offset+=n;}
    process.send({ok:true});
  }catch(error){process.send({error:error.message});}
});
process.on('disconnect',()=>process.exit(0));
