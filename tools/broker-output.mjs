import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export class OutputWriter {
  #child;#pending;#closed;#exit;
  constructor(){
    this.#child=spawn(process.execPath,[fileURLToPath(new URL('./broker-output-worker.mjs',import.meta.url))],{windowsHide:true,stdio:['ignore','inherit','ignore','ipc'],serialization:'advanced'});
    this.#exit=new Promise(resolve=>{const done=()=>{this.#fail(Error('Output writer closed'));resolve();};this.#child.once('exit',done);this.#child.once('error',done);});
    this.#child.on('error',error=>this.#fail(error));
    this.#child.on('message',message=>{const pending=this.#pending;this.#pending=undefined;if(message.ok)pending?.resolve();else pending?.reject(Error(message.error??'Output writer error'));});
  }
  #fail(error){this.#closed=error;this.#pending?.reject(error);this.#pending=undefined;}
  async write(value){
    const bytes=Buffer.isBuffer(value)?value:Buffer.from(value);
    for(let offset=0;offset<bytes.length;offset+=65536){
      if(this.#closed)throw this.#closed;if(this.#pending)throw Error('Overlapping output writes');
      await new Promise((resolve,reject)=>{this.#pending={resolve,reject};this.#child.send(bytes.subarray(offset,offset+65536),error=>{if(error)this.#fail(error);});});
    }
  }
  destroy(error=Error('Output cancelled')){this.#fail(error);if(this.#child.exitCode===null)this.#child.kill('SIGKILL');}
  async close(){if(this.#child.connected)this.#child.disconnect();await this.#exit;}
}
