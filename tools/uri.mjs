import fs from 'node:fs';
import net from 'node:net';
import {uri_parse} from '../web/engine.mjs';

/** Contains credentials; use the redacted field when displaying an address. */
export function parseURI(input) {
  if(typeof input!=='string'||!input.isWellFormed())throw TypeError('Invalid AMQP URI');
  const text=uri_parse(input);
  if(text.startsWith('ERROR:'))throw TypeError('Invalid AMQP URI');
  const {ok,...parsed}=JSON.parse(text);
  return Object.freeze({...parsed,authMechanism:Object.freeze(parsed.authMechanism),
    heartbeatSeconds:parsed.heartbeatSeconds===null?null:BigInt(parsed.heartbeatSeconds),
    heartbeatNs:parsed.heartbeatNs===null?null:BigInt(parsed.heartbeatNs),
    connectionTimeout:BigInt(parsed.connectionTimeout)});
}

const bounded=(value,min,max,label)=>{
  if(value<BigInt(min)||value>BigInt(max))throw RangeError(`URI ${label} out of transport range`);
  return Number(value);
};
function readTLSFile(path,label) {
  // Preserve an OS error code without echoing URI-controlled path/credential data.
  try{return fs.readFileSync(path);}catch(cause){const error=Error(`Cannot read URI TLS ${label}`);error.code=cause.code;throw error;}
}

/** Normalize once before authentication/recovery snapshots. TLS file bytes are retained across retries. */
export function connectionOptions(input={},overrides) {
  let options;
  if(typeof input==='string') {
    if(overrides!==undefined&&(!overrides||typeof overrides!=='object'||Array.isArray(overrides)))throw TypeError('Invalid connection options');
    options={...overrides,uri:input};
  } else {
    if(!input||typeof input!=='object'||Array.isArray(input)||overrides!==undefined)throw TypeError('Invalid connection options');
    options={...input};
  }
  if(options.uri===undefined)return options;
  const uri=parseURI(options.uri);
  delete options.uri;
  // The URI owns the endpoint and built-in credentials. Explicit SASL candidates may override credentials.
  options.host=uri.host;options.port=bounded(BigInt(uri.port),1,65535,'port');
  options.username=uri.username;options.password=uri.password;
  if(options.vhost===undefined||options.vhost==='')options.vhost=uri.vhost;
  options.heartbeat=uri.heartbeatSeconds===null?(options.heartbeat??10):bounded(uri.heartbeatSeconds,0,65535,'heartbeat');
  if(options.channelMax===undefined||options.channelMax===0)options.channelMax=uri.channelMax||2047;
  options.timeout=options.timeout??(uri.connectionTimeout===0n?30000:bounded(uri.connectionTimeout,1,2147483647,'connection_timeout'));
  if(options.sasl===undefined&&uri.authMechanism.length) {
    options.sasl=uri.authMechanism.map(name=>{
      if(!['plain','amqplain','external'].includes(name))throw TypeError('Unsupported URI authentication mechanism');
      return {mechanism:name.toUpperCase(),username:uri.username,password:uri.password};
    });
  }
  if(uri.scheme==='amqps') {
    if(options.tls!==undefined&&(!options.tls||typeof options.tls!=='object'||Array.isArray(options.tls)))throw TypeError('Invalid URI TLS configuration');
    if(options.tls===undefined) {
      options.tls={minVersion:'TLSv1.2'};
      if(uri.caCertFile)options.tls.ca=readTLSFile(uri.caCertFile,'CA certificate');
      if(uri.certFile&&uri.keyFile) {
        options.tls.cert=readTLSFile(uri.certFile,'client certificate');
        options.tls.key=readTLSFile(uri.keyFile,'client key');
      }
      if(uri.serverName)options.tls.servername=uri.serverName;
    } else options.tls={...options.tls};
    if(!options.tls.servername&&!net.isIP(uri.host))options.tls.servername=uri.host;
  } else delete options.tls;
  return options;
}
