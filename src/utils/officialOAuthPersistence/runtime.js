// Official npm 2.1.286 complete declarations, no body rewriting.
export function createOAuthCredentialState(){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var xzt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=xzt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}}
class Lk{value=void 0;promise=null;lastCredentialsMtimeMs=0;lastCredentialsVersion=void 0;lastKeychainAccessToken=null;lastUnusableTokenRecheckAt=0;lastOwnSavedAccessToken=null;credentialsChangedOnDisk=Me();pending401Handlers=new Map;pendingRefreshChecks={bare:null,store:null,backend:null};pendingOptedInRefreshChecks={bare:null,store:null,backend:null};clear(){this.value=void 0,this.promise=null}resetChangeCheck(){this.lastCredentialsMtimeMs=0,this.lastCredentialsVersion=void 0,this.lastKeychainAccessToken=null,this.lastUnusableTokenRecheckAt=0,this.lastOwnSavedAccessToken=null}}
var Jde=new q(()=>new Lk);
var MC=new q(()=>Me());
return {state:Jde,signal:Me,configurationChanged:MC};
}
export function createOAuthPersistence({F,GG,Jde,Pf,Sn,USe,Vd,Z,_,a,bi,bj,h1,i,j,l,pP,r9,t,vpe,zn}){
async function O8n(e,n){if(!h1(e.scopes))return i("tengu_oauth_tokens_not_claude_ai",{}),{success:!0};if(!e.refreshToken||!e.expiresAt)return i("tengu_oauth_tokens_inference_only",{}),{success:!0};let{accessToken:r,refreshToken:s,expiresAt:g,refreshTokenExpiresAt:h,scopes:b,clientId:E}=e,w=zn(),k=Ik();try{let A=Jde.of(j().host),M=await w.mutate((K)=>({...K,claudeAiOauth:Dk(K.claudeAiOauth,{accessToken:r,refreshToken:s,expiresAt:g,refreshTokenExpiresAt:h,scopes:b,subscriptionType:e.subscriptionType,rateLimitTier:e.rateLimitTier,clientId:E})}),n);if(M.success)A.lastOwnSavedAccessToken=r,i("tengu_oauth_tokens_saved",{storageBackend:k});else i("tengu_oauth_tokens_save_failed",{storageBackend:k});let D=F()&&n!==void 0?n:void 0,B=D&&A.promise;if(axe(),Pf(),D!==void 0)await Khn(D,B);return M}catch(A){return t(`Failed to save OAuth tokens: ${l(A)}`,{level:"error"}),i("tengu_oauth_tokens_save_exception",{storageBackend:k,...Vd(A)}),{success:!1,warning:H8n}}}
async function I8n({isCompromised:e,postedRefreshToken:n,refreshedTokens:r,credentials:s}){if(h1(r.scopes)&&r.refreshToken&&r.expiresAt){let h=e();if(h)i("tengu_oauth_token_refresh_lock_compromised_post_post",{});let b={accessToken:r.accessToken,refreshToken:r.refreshToken,expiresAt:r.expiresAt,refreshTokenExpiresAt:r.refreshTokenExpiresAt,scopes:r.scopes,subscriptionType:r.subscriptionType,rateLimitTier:r.rateLimitTier,clientId:r.clientId},E=!1,w=Ik(),k={success:!1},A=!1,M;for(let D=0;D<3;D++){if(D>0)await Z(100*D);E=!1,A=!1;try{k=await zn().mutate((B)=>{let K=B.claudeAiOauth?.refreshToken;if(!(B.claudeAiOauth!==void 0&&B.claudeAiOauth!==null&&(K===""||K===n)))return E=!0,B;return{...B,claudeAiOauth:Dk(B.claudeAiOauth,b)}},s)}catch(B){t(`OAuth refresh CAS save failed: ${l(B)}`,{level:"error"}),k={success:!1},A=!0,M=B;continue}if(E||k.success)break}if(A)KT();else{let D=F()&&s!==void 0?s:void 0,B=D&&Jde.of(j().host).promise;if(Kk(),D!==void 0)await Khn(D,B)}if(A)i("tengu_oauth_tokens_save_exception",{storageBackend:w,...Vd(M)});if(!E&&!A)i(k.success?"tengu_oauth_tokens_saved":"tengu_oauth_tokens_save_failed",{storageBackend:w});if(h)i(E?"tengu_oauth_refresh_compromised_cas_adopted_sibling":"tengu_oauth_refresh_compromised_cas_saved",{});else if(E)i("tengu_oauth_refresh_save_adopted_newer_write",{});if(E)return _n(),"adopted_sibling";return k.success?"saved":"save_failed"}let g=await O8n(r,s);return KT(),g.success?"saved":"save_failed"}
async function D8n(e,n){bi.add(e),i("tengu_oauth_refresh_token_marked_dead_invalid_grant",{});try{let r=!1,s=await zn().mutate((g)=>{let h=g.claudeAiOauth;if(!h||h.refreshToken!==e)return g;return r=!0,{...g,claudeAiOauth:{...h,refreshToken:"",accessToken:"",expiresAt:0}}},n);if(r&&s.success)i("tengu_oauth_refresh_token_cleared_on_disk",{});else if(r)t("OAuth dead-token disk clear: backend write failed",{level:"error"})}catch(r){t(`OAuth dead-token disk clear failed: ${l(r)}`,{level:"error"})}}
function Dk(e,n){return{accessToken:n.accessToken,refreshToken:n.refreshToken,expiresAt:n.expiresAt,refreshTokenExpiresAt:n.refreshTokenExpiresAt??e?.refreshTokenExpiresAt,scopes:n.scopes,subscriptionType:n.subscriptionType??e?.subscriptionType??null,rateLimitTier:n.rateLimitTier??e?.rateLimitTier??null,clientId:n.clientId}}
async function Khn(e,n){if(!RYe())return;let r=Jde.of(j().host),s;try{let b=await e.probeCredentials();s=b.state==="present"?b.version:void 0}catch(b){t(`Credentials version prime failed: ${l(b)}`,{level:"error"})}if(await n?.catch(()=>null),await r.promise?.catch(()=>null),r.promise=null,s!==void 0)r.lastCredentialsVersion=s;let g=VH(e);if(r.promise=g,await g===null){if(s!==void 0)r.lastCredentialsVersion=void 0;if(r.promise===g)r.promise=null}r.value=void 0}
async function VH(e){try{let n=(await zn().readAsync(e))?.claudeAiOauth;return n?.accessToken?n:null}catch(n){return t(`Credentials prime through the store failed (${n instanceof Error?n.name:typeof n})`,{level:"error"}),null}}
function RYe(){if(r9()||a.CLAUDE_CODE_OAUTH_TOKEN||a.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR||cc())return!1;return!(bj()&&!GG())}
function axe(){Jde.of(j().host).clear()}
function Kk(){axe(),pP(),Pf()}
function KT(){if(Kk(),F())USe()}
function Ik(){return Yw(zn().name)}
var H8n="Failed to save OAuth tokens";
var gf=new Set(["keychain","plaintext","windows-credman"]);
var ZB=/^([a-z-]+)-with-([a-z-]+)-fallback$/;
function Yw(e){if(gf.has(e))return Sn(e);let n=ZB.exec(e);return n&&gf.has(n[1])&&gf.has(n[2])?Sn(e):_("other")}
function _n(){vpe(null)}
function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
return {save:O8n,reconcile:I8n,clearDead:D8n,merge:Dk,prime:Khn,clear:axe,clearAll:KT};
}
export function createOAuthErrorCodes(){
function r(n){return n}
function Sn(n){return r(n)}
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function lx(n){return n&&/^[A-Z][A-Z0-9_]{0,63}$/.test(n)?Sn(n):void 0}
function co(n){return lx(v(n))}
function IP(n){return typeof n==="string"&&/^[A-Z][a-zA-Z]{0,63}$/.test(n)?Sn(n):void 0}
function P7r(n){return E.test(n)?Sn(n):void 0}
var E=/^(?:[\w$.\-<>[\]]{1,72}\.(?:[cm]?[jt]sx?|json|node|wasm|exe)|node:internal(?:\/[a-z0-9_-]{1,40}){1,4}|node:[a-z0-9_]{1,30}(?:\/(?:promises|web|consumers|posix|win32|types|strict|reporters))?|bun:[a-z0-9_]{1,20}|internal:[a-z0-9_-]{1,30}(?:\/[a-z0-9_-]{1,40}){0,3}|<anonymous>|\[eval\](?:-wrapper)?|native|unknown|cli|claude|ws|undici|node-fetch|isomorphic-fetch|vercel_fetch|utf-8-validate)(?::\d{1,8}){2}$/;
return {brand:Sn,code:co,constructor:IP,frame:P7r};
}
export function createOAuthErrorMetadata({IP,P7r,Sn,co,e}){
function S(e){try{return String(e)}catch{return"[unstringifiable]"}}
function PUe(e){return e.slice(0,500).replace(/https?:\/\/\S+/gi,"<url>").replace(/\b[\w.+-]+@[\w.-]+\.\w{2,}\b/g,"<email>").replace(/\b(?:sk-ant|sk|pk|ghp|gho|ghs|ghu|github_pat|xox[bpoars])[-_][\w-]{8,}\b/gi,"<key>").replace(/[A-Za-z]:\\[^\s"']*/g,"<path>").replace(/\\\\[^\s"']+/g,"<path>").replace(/(?:[^\s"'\\]+\\){2,}[^\s"']+/g,"<path>").replace(/(?:\/[^\s"':]+){2,}/g,"<path>").replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,"<id>").replace(/\breq_[A-Za-z0-9_-]{12,}/g,"<id>").replace(/\b[0-9a-fA-F]{16,}\b/g,"<id>").replace(/\b[A-Za-z0-9+/]{32,}={0,2}/g,"<b64>").replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g,"<ip>").replace(/\b\d{4,}\b/g,"<num>")}
function E(e,t=5){let n=[],i;for(let R of e.slice(0,4000).split(`
`)){let l=R.trim();if(!l.startsWith("at "))continue;let s=l.slice(3),u=s.indexOf(" (");if(i===void 0){let d=u!==-1?s.slice(u+2,-1):s;if(/^(?:node|bun|internal):/.test(d))i=d;else{let f=d.match(/([^/\\]+:\d+:\d+)\)?$/);if(f)i=f[1]}}let o=u!==-1?s.slice(0,u):s;if(o=o.replace(/^async\s+/,"").replace(/^new\s+/,""),o.includes("/")||o.includes("\\")||/:\d/.test(o))continue;if(o)n.push(o);if(n.length>=t)break}return{names:n,topFrame:i}}
function Vd(e){try{let t=S(e instanceof Error?e.message:e),n={error_message_hash:an(PUe(t))},i=co(e);if(i!==void 0)n.error_code=i;if(!(e instanceof Error))return n;let R=IP(e.constructor?.name);if(R!==void 0)n.error_constructor=R;if(typeof e.stack!=="string")return n;let l=e.stack,s=zQn(e),u=s.length<l.length&&l.endsWith(s),{names:o,topFrame:d}=E(s);if(o.length>0)n.error_stack_hash=an(o.join("|"));let f=u&&d!==void 0?P7r(d):void 0;if(f!==void 0)n.error_top_frame=f;return n}catch{return{}}}
function Je(e,r,n){let o=(s)=>s!==""&&e.startsWith(`${s}
`);if(n!==""){let s=typeof r==="string"&&r!==""?`${r}: ${n}`:"";if(s!==""&&o(s))return s.length;let u=`: ${n}`,c=e.indexOf(`${u}
`);return c>0&&!e.slice(0,c).includes(`
`)?c+u.length:r===""&&o(n)?n.length:-1}let i=r===void 0?"Error":typeof r==="string"?r:typeof r==="number"||typeof r==="boolean"||typeof r==="bigint"||r===null?String(r):"";return o(i)?i.length:-1}
function zQn(e){let r=typeof e.stack==="string"?e.stack:"",n=typeof e.message==="string"?e.message:"",o=Je(r,e.name,n);return o===-1?r:r.slice(o+1)}
function an(t){return Sn(e("sha256").update(t).digest("hex").slice(0,12))}
return Vd;
}
