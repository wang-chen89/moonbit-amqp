function deferred(){let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});promise.catch(()=>{});return {promise,resolve,reject};}

/** Single-pass async byte iterable. completed validates wire completion; discard drains without retaining bytes. */
export class IncomingBody {
  #queue=[];#head=0;#bytes=0;#waiter;#wireDone=false;#discarded=false;#error;#completion=deferred();
  #timer;#progress=Date.now();#owner;#timeout;#channel;#tag;#size;
  constructor(owner,event,timeout){this.#owner=owner;this.#channel=event.channel;this.#tag=event.args['delivery-tag'];this.#size=event.bodySize;this.#timeout=timeout;this.#arm();}
  get channel(){return this.#channel;}
  get deliveryTag(){return this.#tag;}
  get bodySize(){return this.#size;}
  get completed(){return this.#completion.promise;}
  get wireComplete(){return this.#wireDone;}
  get bufferedBytes(){return this.#bytes;}
  [Symbol.asyncIterator](){return this;}
  next(){
    if(this.#error)return Promise.reject(this.#error);
    if(this.#bytes){const value=this.#queue[this.#head];this.#queue[this.#head++]=undefined;this.#bytes-=value.length;if(this.#head>=1024&&this.#head*2>=this.#queue.length){this.#queue=this.#queue.slice(this.#head);this.#head=0;}this.#owner.release(value.length,1);this.#progress=Date.now();this.#settle();return Promise.resolve({value,done:false});}
    if(this.#wireDone||this.#discarded)return Promise.resolve({done:true});
    if(this.#waiter)return Promise.reject(Error('Only one pending body read is supported'));
    this.#waiter=deferred();return this.#waiter.promise;
  }
  async return(){await this.discard();return {done:true};}
  discard(){
    this.#discarded=true;this.#clear();this.#waiter?.resolve({done:true});this.#waiter=undefined;this.#progress=Date.now();this.#settle();return this.completed;
  }
  _push(chunk){
    if(this.#error||this.#wireDone)throw Error('Body chunk after completion');
    this.#progress=Date.now();
    if(this.#discarded)return;
    if(this.#waiter){const waiter=this.#waiter;this.#waiter=undefined;waiter.resolve({value:chunk,done:false});}
    else{this.#queue.push(chunk);this.#bytes+=chunk.length;this.#owner.reserve(chunk.length);}
  }
  _end(){this.#wireDone=true;this.#completion.resolve();this.#waiter?.resolve({done:true});this.#waiter=undefined;this.#settle();}
  _fail(error){if(this.#error)return;this.#error=error;clearTimeout(this.#timer);this.#clear();this.#waiter?.reject(error);this.#waiter=undefined;this.#completion.reject(error);this.#owner.finished(this);}
  _shutdown(error){clearTimeout(this.#timer);if(!this.#wireDone)this._fail(error);}
  #clear(){const size=this.#bytes,count=this.#queue.length-this.#head;this.#queue=[];this.#head=0;this.#bytes=0;this.#owner.release(size,count);}
  #settle(){if(this.#wireDone&&!this.#bytes){clearTimeout(this.#timer);this.#owner.finished(this);}}
  #arm(delay=this.#timeout){this.#timer=setTimeout(()=>{const remaining=this.#timeout-(Date.now()-this.#progress);if(remaining<=0)this.#owner.fail(Error('Incoming body progress timeout'));else this.#arm(remaining);},delay);this.#timer.unref();}
}

/** Connection-wide accounting. The caller stops decoding after one bounded input batch crosses highWaterMark. */
export class IncomingBodies {
  #active=new Map();#bodies=new Set();#bytes=0;#peak=0;#chunks=0;#peakChunks=0;#pauses=0;#closed=false;#wasPaused=false;
  constructor({highWaterMark,frameMax,timeout,changed,fail}){Object.assign(this,{highWaterMark,frameMax,timeout,changed,fail});}
  get paused(){return this.#bytes>=this.highWaterMark||this.#chunks>=4096;}
  get stats(){return {bufferedBodyBytes:this.#bytes,maxObservedBodyBytes:this.#peak,bufferedChunks:this.#chunks,maxObservedChunks:this.#peakChunks,chunkHighWaterMark:4096,chunkBound:12289,backpressurePauses:this.#pauses,activeBodies:this.#active.size,retainedBodies:this.#bodies.size,highWaterMark:this.highWaterMark,bodyBufferBound:this.highWaterMark+this.frameMax+65536};}
  reserve(n){this.#bytes+=n;this.#chunks++;this.#peak=Math.max(this.#peak,this.#bytes);this.#peakChunks=Math.max(this.#peakChunks,this.#chunks);if(this.#bytes>this.highWaterMark+this.frameMax+65536||this.#chunks>12289)throw Error('Incoming body buffer bound exceeded');this.#changed();}
  release(n,count){if(this.#closed)return;this.#bytes-=n;this.#chunks-=count;if(this.#bytes<0||this.#chunks<0)throw Error('Incoming body accounting underflow');this.#changed();}
  #changed(){if(this.paused&&!this.#wasPaused)this.#pauses++;this.#wasPaused=this.paused;this.changed();}
  start(event){
    if(this.#closed||this.#active.has(event.channel)||this.#bodies.size>=1024)throw Error('Incoming body stream limit or duplicate');
    const body=new IncomingBody(this,event,this.timeout);this.#active.set(event.channel,body);this.#bodies.add(body);return body;
  }
  push(event){const body=this.#active.get(event.channel);if(!body)throw Error('Body chunk without stream');body._push(Buffer.from(event.bodyHex,'hex'));}
  end(channel){const body=this.#active.get(channel);if(!body)throw Error('Body end without stream');this.#active.delete(channel);body._end();}
  finished(body){this.#bodies.delete(body);}
  assertComplete(channel,tag,multiple){const body=this.#active.get(channel);if(!body?.deliveryTag)return;const active=BigInt(body.deliveryTag),requested=BigInt(tag);if(active===requested||multiple&&(requested===0n||active<=requested))throw Error('Await incoming body completion before acknowledging');}
  discardAll(){for(const body of this.#bodies)body.discard().catch(()=>{});}
  discardChannel(channel){for(const body of this.#bodies)if(body.channel===channel)body.discard().catch(()=>{});}
  closeChannel(channel,error){const body=this.#active.get(channel);if(body){this.#active.delete(channel);body._fail(error);}}
  close(error){if(this.#closed)return;for(const body of this.#bodies)body._shutdown(error);this.#closed=true;this.#bytes=0;this.#chunks=0;this.#active.clear();this.#bodies.clear();}
}
