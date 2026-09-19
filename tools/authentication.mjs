export function responseBytes(value) {
  if(typeof value==='string') {
    if(!value.isWellFormed())throw TypeError('Invalid SASL response string');
    value=Buffer.from(value);
  }
  if(!(value instanceof Uint8Array)||value.length>1048576)throw TypeError('SASL response must be bytes or UTF-8 string, at most 1 MiB');
  return Buffer.from(value);
}

// Built-in credentials are copied; custom response functions remain live so a
// token provider can refresh its result for each selected reconnect handshake.
export function snapshotAuthentication(options={}) {
  const candidates=options.sasl??[{mechanism:'PLAIN',username:options.username??'guest',password:options.password??'guest'}];
  if(!Array.isArray(candidates)||!candidates.length||candidates.length>32)throw TypeError('Expected 1 to 32 SASL candidates');
  const sasl=candidates.map(candidate=>{
    if(!candidate||typeof candidate!=='object'||typeof candidate.mechanism!=='string'||! /^[\x21-\x7e]{1,255}$/.test(candidate.mechanism))throw TypeError('Invalid SASL mechanism');
    const mechanism=candidate.mechanism;
    if(Object.hasOwn(candidate,'response')) {
      return {mechanism,response:typeof candidate.response==='function'?candidate.response:responseBytes(candidate.response)};
    }
    if(mechanism==='EXTERNAL')return {mechanism};
    if(!['PLAIN','AMQPLAIN'].includes(mechanism))throw TypeError('Custom SASL mechanism requires a response');
    const username=candidate.username??options.username??'guest',password=candidate.password??options.password??'guest';
    if(typeof username!=='string'||typeof password!=='string'||!username.isWellFormed()||!password.isWellFormed())throw TypeError('Expected valid UTF-8 credential strings');
    if(Buffer.byteLength(username)+Buffer.byteLength(password)>1048000)throw TypeError('SASL credentials exceed size limit');
    if(mechanism==='PLAIN'&&(username.includes('\0')||password.includes('\0')))throw TypeError('Invalid PLAIN credentials');
    return {mechanism,username,password};
  });
  return {...options,sasl};
}

export function authenticationPlan(candidates) {
  const descriptors=[],providers=[];
  for(const candidate of candidates) {
    const {mechanism}=candidate;
    if(Object.hasOwn(candidate,'response')) {
      descriptors.push({kind:'deferred',mechanism});
      providers.push(typeof candidate.response==='function'?candidate.response:()=>candidate.response);
    } else {
      descriptors.push({kind:mechanism==='PLAIN'?'plain':mechanism==='AMQPLAIN'?'amqplain':'external',...candidate});
      providers.push(null);
    }
  }
  return {descriptors,providers};
}
