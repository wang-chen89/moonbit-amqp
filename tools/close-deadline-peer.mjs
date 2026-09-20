// A transparent TCP peer which can withhold the broker's close-ok and EOF.
import net from 'node:net';
export async function withholdCloseReply(port) {
  const sockets=new Set();let closeRequests=0;
  const server=net.createServer(client=>{
    const upstream=net.connect({host:'127.0.0.1',port});sockets.add(client);sockets.add(upstream);
    let header=false,buffer=Buffer.alloc(0),closing=false;
    client.on('data',bytes=>{
      buffer=Buffer.concat([buffer,bytes]);
      if(!header){if(buffer.length<8)return;upstream.write(buffer.subarray(0,8));buffer=buffer.subarray(8);header=true;}
      while(buffer.length>=8){const size=8+buffer.readUInt32BE(3);if(size>16777216){client.destroy();return;}if(buffer.length<size)return;const frame=buffer.subarray(0,size);buffer=buffer.subarray(size);if(frame[0]===1&&frame.readUInt16BE(1)===0&&frame.readUInt16BE(7)===10&&frame.readUInt16BE(9)===50){closing=true;closeRequests++;}upstream.write(frame);}
    });
    upstream.on('data',bytes=>{if(!closing)client.write(bytes);});
    upstream.on('end',()=>{if(!closing)client.end();});
    upstream.on('error',()=>{if(!closing)client.destroy();});
    client.on('error',()=>upstream.destroy());client.on('end',()=>upstream.end());
    client.on('close',()=>{sockets.delete(client);upstream.destroy();});upstream.on('close',()=>{sockets.delete(upstream);if(!closing)client.destroy();});
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  return {port:server.address().port,get closeRequests(){return closeRequests;},async close(){for(const s of sockets)s.destroy();await new Promise(resolve=>server.close(resolve));}};
}
