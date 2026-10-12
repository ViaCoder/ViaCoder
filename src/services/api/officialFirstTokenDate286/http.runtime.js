// Generated from complete original Wt/lr and checker-resolved local closure.
// All shared auth/storage/context services remain ports; no copied reader/host.
export function createOfficialFirstPartyHttp286(ports){
const {AC,Bn,CO,Fa,Fv,He,Hi,JN,OF,QD,QI,RF,R_,S,Spe,TF,Uu,Vl,Wv,a,be,bi,d,dxe,h1,h2,ht,i2e,kn,lc,pn,t,xt,zn}=ports
function cue(){return}
function gh(){switch(process.env.CLAUDE_CODE_ENTRYPOINT){case"claude-vscode":return"claude_code_vscode";case"remote":case"remote_baku":case"remote_cowork":case"remote_desktop":case"remote_mobile":case"remote_projects":return"claude_code_remote";case"claude-in-teams":return"claude_code_remote";case"sdk-cli":case"sdk-ts":case"sdk-py":return"claude_code_sdk";case"mcp":return"claude_code_mcp";case"claude-code-github-action":return"claude_code_github_action";case"local-agent":return"claude_code_local_agent";case"claude_in_slack":return"claude_in_slack";case"claude-in-slack":return"claude-in-slack";case"cli":default:return"claude_code_cli"}}
var nt=(n,e)=>{try{if(n!==null&&typeof n==="object"&&!("telemetryMessage"in n)&&Object.isExtensible(n))Object.assign(n,{telemetryMessage:e})}catch{}return n};
function ee(n){return n instanceof Error?n:Error(String(n))}
function o4r(){let e=AC(),n=CO();return new be({...e,...n&&{ca:n},keepAlive:!1})}
var qN="Invalid SemVer: <redacted>";
function ha(e,n){try{return Bun.semver.order(e,n)}catch(r){throw nt(ee(r),qN)}}
function sS(e,n){return ha(e,n)>=0}
var oc=60000;
var ZN=8388608;
var Tv=32768;
var qo=262144;
function tF(e,n){let r=Math.min(e,ZN);return Math.max(n,Math.ceil(r/Tv*1000))}
function Rv(e,n){return Math.max(n,Math.ceil(e/Tv*1000))}
function Ov(){return sS("1.4.3","1.4.0")}
class _a extends Error{waitedMs;constructor(e){super("transfer stalled");this.waitedMs=e;this.name="UploadStalledError"}}
function nF(e,n){let r=!1,s=!1,g=(b,E)=>{r=!0,b.abort(new _a(E))},h=setTimeout(g,n,e,n);return{touch:()=>{if(!s)h.refresh()},relax:(b)=>{if(s)return;clearTimeout(h),h=setTimeout(g,b,e,b)},clear:()=>{s=!0,clearTimeout(h)},fired:()=>r}}
function*rF(e,n){for(let r=0;r<e.length;r+=qo)n(r),yield e.subarray(r,Math.min(r+qo,e.length));n(e.length)}
function xv(e,n={}){let r=n.stallMs??oc,s=Math.max(tF(e.length,r),n.tailFloorMs??0),g=new AbortController,h=()=>g.abort(n.signal?.reason);if(n.signal?.aborted)h();else n.signal?.addEventListener("abort",h,{once:!0});let b=nF(g,r),E=0;return{body:JN.from(rF(e,(w)=>{if(E=w,w===e.length)b.relax(s);else b.touch()}),{objectMode:!1}),signal:g.signal,dispose:()=>{b.clear(),n.signal?.removeEventListener("abort",h)},seen:()=>({body_bytes:e.length,bytes_handed:E,stalled:b.fired()&&n.signal?.aborted!==!0})}}
async function uv(e){if(!Bn())throw Error("Cloud sessions are only available on the first-party Anthropic API provider.");await Hi({credentials:e});let n=pn()?.accessToken;if(n===void 0)throw Error("Claude Code cloud sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");let r=await h2();if(!r)throw Error("Unable to get organization UUID");return{accessToken:n,orgUUID:r}}
function yBt(e){return{Authorization:`Bearer ${e}`,"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-client-platform":gh()}}
function Ayn(){return}
function hSe(){return Ayn()!==void 0}
function LYe(){if(!hSe())return{host:"memory",auth:"async",refreshOAuth:!0};let e=kn.CLAUDE_CODE_MEMORY_API_TOKEN;return{host:"memory",auth:"none",refreshOAuth:!1,...e&&{headers:{Authorization:`Bearer ${e}`}}}}
var Uv=Symbol("uploadWire.freedAt");
var Lv=Symbol("uploadWire.stamping");
function CF(e){if(!(e instanceof lc.Agent))return;let n=e;if(n[Lv])return;n[Lv]=!0,n.on("free",(r)=>{r[Uv]=performance.now()})}
function Bv(){let e={},n,r;return{transport:{request(g,h){let b=g.protocol==="http:",E=(b?lc:Fv).request(g,h);return CF(g.agent??(b?lc.globalAgent:Fv.globalAgent)),E.once("socket",(w)=>{n=w,r=typeof w.bytesWritten==="number"?w.bytesWritten:void 0,e.response_started=!1,e.socket_reused=E.reusedSocket===!0;let k=w[Uv];if(e.socket_reused&&k!==void 0)e.socket_idle_ms=Math.round(performance.now()-k);let A=()=>{let M=w.localFamily??w.remoteFamily;if(M==="IPv4")e.local_af=4;else if(M==="IPv6")e.local_af=6};if(w.connecting)w.once("connect",A);else A()}),E.once("response",()=>{e.response_started=!0}),E}},seen:(g)=>({...e,...g&&n!==void 0&&r!==void 0&&typeof n.bytesWritten==="number"&&{bytes_flushed:Math.max(0,n.bytesWritten-r)}})}}
var xF=new Set(["authorization","proxy-authorization","x-authorization","x-api-key","cookie"]);
function DF(e,n){return n.auth==="none"&&n.host!=="frame"&&n.host!=="memory"&&n.baseUrl?n.baseUrl:e}
function Tyn(){return}
function mxe(e){return TF("sha256").update(e).digest("hex")}
function jv(e){if(!e.bypassEssentialTrafficOnly&&!0&&xt())return"essential-traffic-only";if(He()!=="firstParty")return"data-residency";return}
var zv="OAuth refresh token is no longer valid; run /login to re-authenticate";
var Vv="no claude.ai login";
async function lr(e,n,r,s={},g=!1){cue();let h=jv(s);if(h!==void 0)return{ok:!1,reason:h};if(s.frameTunnel&&(s.host!=="frame"||s.auth!=="session-jwt"))throw Error("frameTunnel requires host 'frame' and auth 'session-jwt'");let b={},E,w=n,k=null;if(s.auth==="teleport-org"){if(await Hi({credentials:s.credentials,storageV5:s.storageV5}),await Gq(s.credentials))return{ok:!1,reason:"no-auth",detail:zv};if(!pn()?.accessToken)return{ok:!1,reason:"no-auth",detail:"No OAuth token in keychain"};let{accessToken:Q,orgUUID:X}=await uv(s.credentials);k=Q,b={...yBt(Q),"x-organization-uuid":X},w=n.replace(":orgUUID",X)}else if(s.auth==="session-jwt"){let Q=Vl();if(!Q)return{ok:!1,reason:"no-auth",detail:"No session access token"};b={Authorization:`Bearer ${Q}`},E=b.Authorization}else if(s.auth==="claude-ai-oauth"){await Kv(s);let Q=pn(),X=Q?.accessToken;if(!QUt(Q)||!X)return{ok:!1,reason:"no-auth",detail:Vv};if(b={Authorization:`Bearer ${X}`,"anthropic-beta":Uu},s.recoverOAuth401&&(Q?.refreshToken||Spe()))k=X}else if(s.auth!=="none"){await Kv(s);let Q=s.auth==="async"?await QD():dxe();if(Q.error&&s.auth!=="optional")return{ok:!1,reason:"no-auth",detail:Q.error};b=Q.headers}if(s.host==="frame"&&Tyn()!==void 0){if(a.CLAUDE_CODE_ARTIFACTS_API_TOKEN)b={Authorization:`Bearer ${a.CLAUDE_CODE_ARTIFACTS_API_TOKEN}`};k=null}if(s.host==="memory"){let Q=LYe();if(Q.auth==="none")b=Q.headers??{},k=null}let A={"User-Agent":QI(),...b,...s.headers};if(s.frameTunnel){for(let Q of Object.keys(A))if(xF.has(Q.toLowerCase()))delete A[Q];A.Authorization=E}let M=null;if(s.reportSentAuth){let Q;for(let[X,ne]of Object.entries(A))if(X.toLowerCase()==="authorization")Q=ne;M=Q===void 0?null:mxe(Q)}let D=s.maxRedirects??(s.host==="frame"?0:void 0),B=r,K=s.timeout??15000,z;if(s.streamUpload!==void 0&&r!==void 0){let Q=NF(r),X=typeof r!=="string"&&!Yv(r);if(s.maxBodyLength!==void 0&&Q.length>s.maxBodyLength)throw new i2e("Request body larger than maxBodyLength limit",i2e.ERR_BAD_REQUEST);let ne=s.streamUpload.stallMs??oc,pe=s.streamUpload.tailFloorMs?.(Q.length);if(Ov())z=xv(Q,{stallMs:ne,...pe!==void 0&&{tailFloorMs:pe},signal:s.signal}),B=z.body;else B=Q,K=Math.max(Rv(Q.length,ne),pe??0);if(!FF(A,"content-type")&&!X)A["Content-Type"]=typeof r==="string"?"text/plain":"application/json";A["Content-Length"]=String(Q.length)}let W=s.streamUpload!==void 0&&r!==void 0&&D===0?Bv():void 0,Y;try{try{Y=await ht.request({method:e,baseURL:s.frameTunnel?`https://${s.frameTunnel.host}`:DF(Wv(s.host??"api"),s),url:w,data:B,timeout:z?0:K,signal:z?z.signal:s.signal,responseType:s.responseType,validateStatus:s.validateStatus,maxContentLength:s.maxContentLength,maxBodyLength:s.maxBodyLength,...D!==void 0&&{maxRedirects:D},...W&&{transport:W.transport},...s.freshConnection&&!s.frameTunnel&&{httpsAgent:o4r(),httpAgent:new RF({keepAlive:!1})},...s.frameTunnel&&{httpsAgent:s.frameTunnel.agent,proxy:!1},headers:A})}catch(Q){throw z?IF(Q,z):Q}finally{if(z)z.dispose(),s.streamUpload?.onSettled?.({...z.seen(),...W?.seen(!0)});else if(s.streamUpload&&Buffer.isBuffer(B))s.streamUpload.onSettled?.({body_bytes:B.length,bytes_handed:B.length,stalled:!1,...W?.seen(!1)})}}catch(Q){if(k!==null&&!g&&!s.isBackground&&ht.isAxiosError(Q)&&Q.response?.status===401&&!s.isRouteOwned401?.(Q.response.data)){let X=await $v(k,s);if(X==="retry")return Aa(Q.response.data),lr(e,n,r,s,!0);if(X!==null)return Aa(Q.response.data),X}throw Q}if(k!==null&&Y.status===401&&!g&&!s.isBackground&&!s.isRouteOwned401?.(Y.data)){let Q=await $v(k,s);if(Q==="retry")return Aa(Y.data),lr(e,n,r,s,!0);if(Q!==null)return Aa(Y.data),Q}return{ok:!0,data:Y.data,status:Y.status,response:Y,...s.reportSentAuth&&{sentAuthFingerprint:M}}}
async function Kv(e){if(!e.refreshOAuth)return;try{await Hi({credentials:e.credentials,storageV5:e.storageV5})}catch(n){t(`firstPartyApi: refreshOAuth failed (${n instanceof Error?n.message:n}); proceeding with cached token`)}}
function IF(e,n){let r=n.seen();if(!(ht.isCancel(e)&&r.stalled))return e;let s=n.signal.reason,g=s instanceof _a?`${Math.round(s.waitedMs/1000)}s`:"the allowance";return new i2e(r.bytes_handed===r.body_bytes?`upload stalled: no answer within ${g} of the body being handed over`:`upload stalled: nothing moved for ${g}`,i2e.ECONNABORTED)}
function NF(e){if(Buffer.isBuffer(e))return e;if(LF(e))return Buffer.from(e.buffer,e.byteOffset,e.byteLength);if(e instanceof ArrayBuffer)return Buffer.from(e);if(typeof e==="string")return Buffer.from(e);if(Yv(e))return Buffer.from(S(e));throw TypeError("streamUpload: unsupported request body type")}
function Yv(e){if(Array.isArray(e))return!0;if(typeof e!=="object"||e===null)return!1;let n=Object.getPrototypeOf(e);return n===Object.prototype||n===null}
function FF(e,n){let r=n.toLowerCase();return Object.keys(e).some((s)=>s.toLowerCase()===r)}
function LF(e){return ArrayBuffer.isView(e)}
function Aa(e){if(e instanceof OF)e.destroy()}
async function $v(e,n){let r=n.auth==="claude-ai-oauth";try{if(await R_(e,n.credentials,n.storageV5))return"retry";if(await Gq(n.credentials))return{ok:!1,reason:"no-auth",detail:r?Vv:zv};return null}catch(s){if(!r)throw s;return d(s),null}}
var Wt={get(e,n){return lr("GET",e,void 0,n)},post(e,n,r){return lr("POST",e,n,r)},put(e,n,r){return lr("PUT",e,n,r)},patch(e,n,r){return lr("PATCH",e,n,r)},delete(e,n,r){return lr("DELETE",e,n,r)}};
function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
async function Gq(e){let n=xf(await Fa(e));if(n!==void 0)return n;try{return Nk(await zn().readAsync(e))}catch{return!1}}
function xf(e){if(e){let n=e.refreshToken;return n===""||!!n&&bi.has(n)}if(cc())return!1;return}
function Nk(e){return e?.claudeAiOauth?.refreshToken===""}
function QUt(e){return h1(e?.scopes)&&!!e?.accessToken}
return {Wt,request:lr,recover:$v}
}
export function createOfficialFirstTokenDateErrors286(){
function cu(n,e){if(e?.(n))return!0;if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return!1;let t=n.response?.status;return t===void 0||t===401||t===403||t===429}
function l(n){return n instanceof Error?n.message:String(n)}
return {expected:cu,message:l}
}
