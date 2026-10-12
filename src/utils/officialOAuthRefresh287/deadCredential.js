// Complete original npm 2.1.287 declarations; explicit existing-owner ports.
export function createOAuthDeadCredential287(ports){
const {Af,tl,fn,zn}=ports;
function LWt(){let e=Af(fn());if(e!==void 0)return e;try{return Ok(zn().read())}catch{return!1}};
async function V3(e){let n=Af(await tl(e));if(n!==void 0)return n;try{return Ok(await zn().readAsync(e))}catch{return!1}};
function Ok(e){return e?.claudeAiOauth?.refreshToken===""};
return {readAsync:V3,readSync:LWt};
}
