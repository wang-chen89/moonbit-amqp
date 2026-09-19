// Test-only JWT issuer for the disposable broker. No network identity provider.
import {sign,createPrivateKey} from 'node:crypto';
export const scopes=['localreview.configure:*/*','localreview.read:*/*','localreview.write:*/*'];
export function tokenIssuer(info) {
 const key=createPrivateKey(Buffer.from(info.oauth.signingKey,'base64'));
 return (claims={})=>{
  const now=Math.floor(Date.now()/1000),encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
  const body=encode({alg:'RS256',typ:'JWT',kid:'local-test'})+'.'+encode({sub:'local-client',aud:'localreview',iat:now-1,exp:now+120,scope:scopes,...claims});
  return body+'.'+sign('RSA-SHA256',Buffer.from(body),key).toString('base64url');
 };
}
export function corruptSignature(token) {
 const parts=token.split('.'),signature=Buffer.from(parts[2],'base64url');signature[0]^=1;return parts.slice(0,2).join('.')+'.'+signature.toString('base64url');
}
