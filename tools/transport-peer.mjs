// Public Duplex wrapper deliberately hides net.Socket-specific APIs and addresses.
import {Duplex} from 'node:stream';
export function byteTransport(socket, {delay=0, fragment=0}={}) {
  socket.pause();
  const stream=new Duplex({highWaterMark:32,
    read(){socket.resume();},
    write(chunk,encoding,callback){socket.write(chunk,error=>{if(delay)setTimeout(()=>callback(error),delay);else callback(error);});},
    final(callback){socket.end(callback);},
    destroy(error,callback){socket.destroy();callback(error);},
  });
  socket.on('data',chunk=>{
    if(fragment){for(let i=0;i<chunk.length;i+=fragment)if(!stream.push(chunk.subarray(i,i+fragment)))socket.pause();}
    else if(!stream.push(chunk))socket.pause();
  });
  socket.on('end',()=>stream.push(null));
  socket.on('error',error=>stream.destroy(error));
  socket.on('close',()=>{if(!socket.readableEnded&&!stream.destroyed)stream.destroy(Error('Wrapped socket closed'));});
  return stream;
}
