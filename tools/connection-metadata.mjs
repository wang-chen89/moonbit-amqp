import * as core from '../web/engine.mjs';
const prepared=Symbol('client properties snapshot');
const checked=text=>{if(text.startsWith('ERROR:'))throw TypeError('Invalid client properties');return text;};
export const newConnectionProperties=()=>JSON.parse(core.default_connection_properties());
export const cloneMetadata=value=>structuredClone(value);

function fields(value,depth,state) {
 if(++state.nodes>65536||depth>32)throw TypeError('Client properties nesting or element limit');
 if(value===null||typeof value==='boolean')return value;
 if(typeof value==='string'){if(!value.isWellFormed())throw TypeError('Invalid client property UTF-8');return value;}
 if(typeof value==='number'){if(!Number.isFinite(value))throw TypeError('Invalid client property number');return value;}
 if(!value||typeof value!=='object'||(!Array.isArray(value)&&![Object.prototype,null].includes(Object.getPrototypeOf(value))))throw TypeError('Invalid client property value');
 if(state.active.has(value))throw TypeError('Cyclic client properties');
 state.active.add(value);
 const result=Array.isArray(value)?[]:Object.create(null);
 for(const key of Reflect.ownKeys(value)){
  if(Array.isArray(value)&&key==='length')continue;
  if(Array.isArray(value)&&(typeof key!=='string'||!/^(0|[1-9][0-9]*)$/.test(key)||Number(key)>=value.length))throw TypeError('Client property arrays require indexed elements');
  if(typeof key!=='string'||!key.isWellFormed())throw TypeError('Invalid client property key');
  const descriptor=Object.getOwnPropertyDescriptor(value,key);
  if(!Object.hasOwn(descriptor,'value')||!descriptor.enumerable)throw TypeError('Client properties require enumerable data fields');
  result[key]=depth===0&&key==='capabilities'?false:fields(descriptor.value,depth+1,state);
 }
 if(Array.isArray(value)&&Object.keys(result).length!==value.length)throw TypeError('Sparse client property array');
 state.active.delete(value);return result;
}
function freeze(value){if(value&&typeof value==='object'){for(const v of Object.values(value))freeze(v);Object.freeze(value);}return value;}
export function snapshotProperties(options) {
 if(Object.hasOwn(options,prepared))return options;
 const source=options.properties??{};
 if(!source||typeof source!=='object'||Array.isArray(source))throw TypeError('Client properties must be a table');
 let json=JSON.stringify(fields(source,0,{nodes:0,active:new Set()}));
 if(json.length>2097152)throw TypeError('Client properties exceed 2 MiB JSON limit');
 json=checked(core.connection_properties(json));
 return {...options,properties:freeze(JSON.parse(json)),[prepared]:json};
}
export const propertiesJSON=options=>options[prepared];

export function socketAddresses(socket) {
 const address=(host,port,family)=>typeof host==='string'&&Number.isInteger(port)?{address:host,port,family:typeof family==='number'?'IPv'+family:family}:null;
 return {localAddress:address(socket.localAddress,socket.localPort,socket.localFamily),remoteAddress:address(socket.remoteAddress,socket.remotePort,socket.remoteFamily)};
}
const certificate=cert=>!cert?.raw?null:{subject:cloneMetadata(cert.subject??{}),issuer:cloneMetadata(cert.issuer??{}),subjectAltName:cert.subjectaltname??'',serialNumber:cert.serialNumber??'',validFrom:cert.valid_from??'',validTo:cert.valid_to??'',fingerprint256:cert.fingerprint256??'',derHex:cert.raw.toString('hex')};
export function tlsSnapshot(socket,serverName='',complete=false) {
 const empty={encrypted:Boolean(socket.encrypted),handshakeComplete:false,protocol:null,cipher:null,serverName:'',authorized:false,authorizationError:null,alpnProtocol:null,resumed:false,peerCertificate:null,peerCertificateChain:[],localCertificate:null};
 if(!socket.encrypted||!complete)return empty;
 const peer=socket.getPeerCertificate(true),chain=[],seen=new Set();let next=peer;
 while(next?.raw&&chain.length<64){const key=next.raw.toString('hex');if(seen.has(key))break;seen.add(key);chain.push(certificate(next));next=next.issuerCertificate;}
 return {...empty,handshakeComplete:true,protocol:socket.getProtocol(),cipher:socket.getCipher(),serverName:serverName||'',authorized:socket.authorized,
  authorizationError:socket.authorizationError?String(socket.authorizationError):null,alpnProtocol:socket.alpnProtocol||null,resumed:socket.isSessionReused(),
  peerCertificate:certificate(peer),peerCertificateChain:chain,localCertificate:certificate(socket.getCertificate())};
}
