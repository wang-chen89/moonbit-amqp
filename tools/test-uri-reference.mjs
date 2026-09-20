import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {uri_parse} from '../web/engine.mjs';
import {sourceSnapshot,assertSourceUnchanged,digest} from './evidence-source.mjs';

const binary=process.env.AMQP_URI_REFERENCE;
if(!binary)throw Error('Set AMQP_URI_REFERENCE to the pinned URI oracle binary');
const build=JSON.parse(fs.readFileSync(new URL('../evidence/uri-reference-build.json',import.meta.url)));
assert.equal(digest(binary),build.binarySha256);
assert.equal(digest(new URL('./uri-reference.go',import.meta.url)),build.programSha256);
const sources=sourceSnapshot(['uri.mbt','cmd/web/uri.mbt','web/engine.mjs','tools/test-uri-reference.mjs','tools/uri-reference.go']);
const vectors=[];
const add=(group,values)=>values.forEach(uri=>vectors.push({group,uri}));
add('upstream spec matrix',[
 'amqp://user:pass@host:10000/vhost','amqp://','amqp://:@/','amqp://user@','amqp://user:pass@',
 'amqp://guest:pass@','amqp://host','amqp://:10000','amqp:///vhost','amqp://host/','amqp://host/%2F',
 'amqp://host/%2F%2F','amqp://host/%2Fslash%2F','amqp://192.168.1.1:1000/','amqp://[::1]',
 'amqp://[::1]:1000','amqp://[fe80::1]','amqp://[fe80::1]','amqp://[fe80::1%25en0]',
 'amqp://[fe80::1]:5671','amqps:///','amqps://host:1000/'
]);
add('scheme and path',['','http://host/','AMQP://host/','AmQpS://host/',' amqp://host','amqp://ho st',
 'amqp:', 'amqp:opaque', 'amqp:bad%xx', 'amqp:opaque?heartbeat=2', 'amqp:/vhost',
 ...Array.from({length:8},(_,i)=>'amqp:'+ '/'.repeat(i+1)+'vhost'),
 ...['.','..','a/../b','a//b','%2f','%252f','a%20b/c','a+b','a%2Bb','a?b','a#fragment','%00','%EF%BB%BFv','中文','a\\b','%','%xy'].map(p=>'amqp://host/'+p)]);
add('authorities',['host:','host:0','host:65536','host:2147483647','host:2147483648','host:-1','host:+1','host:abc',
 '[::1]:','[::1]:0','[::1]:-1','[::1]suffix','[::','[foo]','[127.0.0.1]','::1','a:b:123',
 '[::ffff:127.0.0.1]','[1:2:3:4:5:6:7:8]','[1:2:3:4:5:6:7:8:9]','[:::1]',
 '[fe80::1%25eth0]','[fe80::1%25ethernet%20one]','[fe80::1%25]','[::1%25x%2fy]',
 'host%25name','host%41','中文','%E4%B8%AD%E6%96%87'].map(a=>'amqp://'+a));
add('userinfo',['@','user@',':@',':pass@','guest:guest@','user:guest@','guest:@','user:pa:ss@',
 'a@b@','u%2Fs:p%40ss@','%E4%B8%AD:%E6%96%87@','%00:foo@','中文:foo@','u%:p@'].map(u=>'amqp://'+u+'host/'));
add('queries',[
 'heartbeat=0','heartbeat=-1','heartbeat=%2B2','heartbeat=1.2','heartbeat=','heartbeat=01','heartbeat=1_0',
 'heartbeat=9223372036854775807','heartbeat=-9223372036854775808','heartbeat=9223372036854775808',
 'heartbeat=18446744073709551616','heartbeat=1&heartbeat=2','heartbeat=%zz&heartbeat=4',
 'connection_timeout=0','connection_timeout=-1','connection_timeout=%2B9','connection_timeout=2147483648',
 'connection_timeout=9223372036854775807','connection_timeout=oops','channel_max=65535','channel_max=65536',
 'channel_max=0','channel_max=-1','channel_max=%2B1','channel_max=00','channel_max=',
 'auth_mechanism=amqplain&auth_mechanism=plain','auth_mechanism=&auth_mechanism=external',
 'cacertfile=C%3A%2FCA+file.pem&certfile=c.pem&keyfile=k.pem&server_name_indication=example.org',
 'heartbeat=2;channel_max=1&unknown=x','heartbeat=1&broken=%xx','%68eartbeat=4',
 'certfile=first&certfile=second','certfile=%zz&keyfile=ok','flag&empty=&certfile=one+two',
 'ignored=a#%zz','heartbeat=2#fragment'
].map(q=>'amqps://host/?'+q));
// All printable ASCII characters in each escaping context; literal space/control cases are invalid.
for(let c=32;c<127;c++) {
 const char=String.fromCharCode(c),encoded='%'+c.toString(16).padStart(2,'0');
 add('ASCII escaping', ['amqp://u'+char+':p@host/v','amqp://u'+encoded+':p@host/v','amqp://host/v'+char+'x',
   'amqp://host/v'+encoded+'x','amqp://host?certfile=x'+encoded+'y']);
}
add('control rejection',['\t','\r','\n','\0','\x7f'].flatMap(c=>['amqp://u:'+c+'@h/','amqp://h/'+c]));
const differences=[
 {uri:'amqp://host/%FF',reason:'MoonBit String requires valid UTF-8; Go strings also accept arbitrary bytes.'},
 {uri:'amqp://%FF:pass@host/',reason:'Invalid UTF-8 user information is rejected rather than propagated as a Go byte string.'},
 {uri:'amqp://host/'+ 'x'.repeat(65536),reason:'URI input is bounded to 64 KiB before parsing.'},
 {uri:'amqp://host/#\n',reason:'Literal control characters are rejected everywhere; Go accepts them in an ignored fragment.'},
 {uri:'amqp://host/#%FF',reason:'Ignored fragments must still decode as valid UTF-8.'},
 {uri:'amqp://host/?certfile=%FF',localAccepted:true,reason:'A query pair containing invalid UTF-8 is discarded like a malformed query escape; Go retains the byte string.'},
];
const inputs=[...vectors,...differences].map(v=>v.uri);
const p=spawnSync(binary,[],{input:JSON.stringify(inputs),encoding:'utf8',maxBuffer:8*1024*1024,timeout:20000});
assert.equal(p.status,0,p.stderr);
const upstream=JSON.parse(p.stdout);assert.equal(upstream.length,inputs.length);
const local=inputs.map(input=>{const text=uri_parse(input);if(text.startsWith('ERROR:'))return {ok:false};const {heartbeatSeconds,redacted,...row}=JSON.parse(text);return row;});
const mismatches=[];
for(let i=0;i<vectors.length;i++)try{assert.deepEqual(local[i],upstream[i]);}catch{mismatches.push({index:i,...vectors[i],local:local[i],upstream:upstream[i]});}
if(mismatches.length){console.error(JSON.stringify(mismatches.slice(0,15),null,2));throw Error(`${mismatches.length} URI reference mismatches`);}
for(let i=0;i<differences.length;i++){assert.equal(local[vectors.length+i].ok,differences[i].localAccepted??false);assert.equal(upstream[vectors.length+i].ok,true);assert.notDeepEqual(local[vectors.length+i],upstream[vectors.length+i]);}
assertSourceUnchanged(sources);
const report={utc:new Date().toISOString(),node:process.version,commit:build.commit,binarySha256:build.binarySha256,
 matched:vectors.length,explicitDifferences:differences.length,sources,
 groups:Object.fromEntries([...new Set(vectors.map(v=>v.group))].map(group=>[group,vectors.filter(v=>v.group===group).length])),
 vectors:vectors.map((v,i)=>({...v,expected:upstream[i]})),differences:differences.map((v,i)=>({...v,uri:v.uri.length>500?'[over-limit synthetic URI]':v.uri,local:local[vectors.length+i],upstreamAccepted:upstream[vectors.length+i].ok})),
 scope:'Exact parsed values, canonical string and acceptance compared with pinned unmodified Go implementation on this compiler; error wording is intentionally redacted and not compared. Parse behavior does not prove TCP/TLS connection behavior.'};
fs.writeFileSync(new URL('../evidence/uri-reference-validation.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(`${vectors.length} URI vectors matched; ${differences.length} explicit safety/type differences`);
