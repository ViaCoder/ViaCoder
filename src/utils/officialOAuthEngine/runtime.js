// Official npm 2.1.286 complete declarations, no body rewriting.
export function createOAuthRefreshEngine({$k,Bn,D8n,F,Fa,G2t,GG,I8n,Jde,Jhn,KT,Kp,N5r,Pde,Tf,Vd,Wa,Yk,Z,_,_ht,_n,a,ae,bi,c,cu,d,d0,f2o,h1,hEn,hf,ht,i,it,j,l,m,p,r9,t,zS,zn}){
function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
var _i=it(new Map,(e)=>e.clear());
var Sl=["bare","store","backend"];
function Gk(e){return e&&!Bn()}
function Wk(e,n){if(!(F()&&e!==void 0)||r9()||a.CLAUDE_CODE_OAUTH_TOKEN)return"bare";if(d0()&&(!GG()||cc()))return"bare";return n!==void 0?"backend":"store"}
function jk(e,n){for(let r of Sl.slice(Sl.indexOf(n))){let s=e(r);if(s)return s}return}
function zk(e,n){for(let r=Sl.indexOf(n)-1;r>=0;r--){let s=Sl[r],g=s===void 0?void 0:e(s);if(g)return g}return}
async function mf(e,n){let r=typeof e==="object"&&e!==null&&"file"in e&&typeof e.file==="string"?e.file:void 0,s=r===void 0||hf(r)===hf(n),g=s?Jhn(n).lockfilePath:r,h,b;try{let E=await Tf(g);b=E.mtimeMs,h=Math.max(0,Math.round(Date.now()-E.mtimeMs))}catch{h=void 0}return{contendedLock:s?_("current"):_("legacy"),lockAgeMs:h,mtimeMs:b}}
var ck=7500;
function fk(e,n){return e.mtimeMs!==void 0&&n.mtimeMs!==void 0&&e.contendedLock===n.contendedLock&&e.mtimeMs===n.mtimeMs}
function Hi(e={}){return o9(e).then((n)=>n==="refreshed")}
function o9({retryCount:e=0,force:n=!1,entryAccessToken:r,credentials:s,storageV5:g,usesLoginOffFirstParty:h=!1}={}){let b=Jde.of(j().host);if(e===0&&!n){let E=Gk(h)?"pendingOptedInRefreshChecks":"pendingRefreshChecks",w=Wk(s,g),k=(K)=>b[E][K],A=jk(k,w);if(A)return A;let M=()=>El(b,e,0,void 0,n,void 0,s,g,h),D=zk(k,w),B=(D?D.catch(()=>{return}).then(M):M()).finally(()=>{b[E]={...b[E],[w]:null}});return b[E]={...b[E],[w]:B},B}return El(b,e,0,void 0,n,r,s,g,h)}
function NYo(e,{isDefaultFirstPartyClient:n}){return Ide(e)||I9n(e)||!n&&xUo(e)||cu(e)}
async function El(e,n,r,s,g,h,b,E,w=!1,k=!1){await $k(e,b);let M=await Fa(b);if(!g){if(M&&!xN(M.expiresAt))return"not_needed";if(!M?.refreshToken)return"no_refresh_token"}if(!M?.refreshToken)return"no_refresh_token";if(bi.has(M.refreshToken))return"known_dead_refresh_token";if(_i.has(M.refreshToken))return"account_on_hold";if(!h1(M.scopes)&&!M.subscriptionType)return"not_refreshable";if(!Bn()&&!w)return"not_needed";let D=h??M.accessToken;KT();let B=await Fa(b);if(!B?.refreshToken)return"no_refresh_token";if(B.accessToken!==D)return _n(),i("tengu_oauth_token_refresh_race_resolved",{}),"refreshed";if(!g&&!xN(B.expiresAt))return"not_needed";let K=zS();await ae().mkdir(K);let z;try{i("tengu_oauth_token_refresh_lock_acquiring",{}),z=await f2o(K)}catch(Q){if(Q.code==="ELOCKED"){let X=s??await mf(Q,K);if(n<5){i("tengu_oauth_token_refresh_lock_retry",{retryCount:n+1});let be=1000+Math.random()*1000;return await Z(be),El(e,n+1,r+be,X,g,D,b,E,w,k)}let ne=B.expiresAt!==null&&Date.now()>=B.expiresAt,pe=await mf(Q,K);if(fk(X,pe)&&r<ck)await Z(ck-r),pe=await mf(Q,K);let{contendedLock:le,lockAgeMs:he}=pe,_e=!fk(X,pe);if(!_e&&!k&&String(le)==="current"&&pe.mtimeMs!==void 0){let be=await Kp({claudeDir:K,lockfilePath:Jhn(K).lockfilePath,legacyLockfilePath:await Yk(K),watchedMtimeMs:pe.mtimeMs});if(i("tengu_oauth_token_refresh_lock_dead_holder_takeover",{outcome:c(be),lockAgeMs:he}),be==="taken_over"||be==="lock_changed")return El(e,0,0,void 0,g,D,b,E,w,!0)}return i("tengu_oauth_token_refresh_lock_retry_limit_reached",{maxRetries:5,tokenPastExpiry:ne,contendedLock:le,lockAgeMs:he,holderAlive:_e}),p("oauth_token_refresh","oauth_refresh_lock_timeout",{token_past_expiry:ne,contended_lock:le,holder_alive:_e,...he!==void 0&&{lock_age_ms:he}}),_e?"lock_busy":"lock_timeout"}return d(Q),i("tengu_oauth_token_refresh_lock_error",{...Vd(Q)}),m("oauth_token_refresh","oauth_refresh_lock_error"),"lock_error"}let W=null,Y=!0;try{if(i("tengu_oauth_token_refresh_lock_acquired",{}),KT(),await zn().readAsyncStrict?.(b)===Wa)return i("tengu_oauth_token_refresh_locked_read_failed",{}),p("oauth_token_refresh","oauth_refresh_locked_read_failed"),"lock_error";let X=await Fa(b);if(!X?.refreshToken)return"no_refresh_token";if(W=X.refreshToken,X.accessToken!==D)return _n(),i("tengu_oauth_token_refresh_race_resolved",{}),"refreshed";if(!g&&!xN(X.expiresAt))return"not_needed";if(bi.has(X.refreshToken))return"known_dead_refresh_token";if(_i.has(X.refreshToken))return"account_on_hold";if(z.isCompromised())return i("tengu_oauth_token_refresh_lock_compromised_pre_post",{}),p("oauth_token_refresh","oauth_refresh_lock_compromised"),"lock_compromised";i("tengu_oauth_token_refresh_starting",{}),Y=Boolean((h1(X.scopes)||X.subscriptionType)&&!X.clientId);let ne=Y?N5r(X.scopes):X.scopes,pe=Y&&hEn(X.scopes),le;try{le=await Pde(X.refreshToken,{scopes:ne,clientId:X.clientId,signal:z.signal,invalidScopeRetried:pe,storageV5:E})}catch(he){if(!pe||!djr(he))throw he;i("tengu_oauth_refresh_invalid_scope_fallback",{}),le=await Pde(X.refreshToken,{scopes:X.scopes,clientId:X.clientId,signal:z.signal,storageV5:E})}return await I8n({isCompromised:z.isCompromised,postedRefreshToken:W,refreshedTokens:le,credentials:b}),"refreshed"}catch(Q){if(z.isCompromised()){t(`OAuth refresh failed while lock compromised: ${l(Q)}`,{level:"error"}),i("tengu_oauth_token_refresh_lock_compromised_in_catch",{}),KT();let ne=await Fa(b);if(ne&&ne.accessToken!==D)return _n(),i("tengu_oauth_token_refresh_race_recovered",{}),"refreshed";return p("oauth_token_refresh","oauth_refresh_lock_compromised"),"lock_compromised"}if(NYo(Q,{isDefaultFirstPartyClient:Y}))t(`OAuth refresh failed (expected): ${l(Q)}`,{level:"error"});else d(Q);KT();let X=await Fa(b);if(X&&X.accessToken!==D)return _n(),i("tengu_oauth_token_refresh_race_recovered",{}),"refreshed";if(Ide(Q)&&W)await D8n(W,b);if(I9n(Q)&&W)return _i.set(W,RUo(Q)),i("tengu_oauth_refresh_token_account_on_hold",{}),"account_on_hold";return Ide(Q)?"known_dead_refresh_token":"refresh_failed"}finally{try{i("tengu_oauth_token_refresh_lock_releasing",{})}catch(Q){t(`OAuth refresh lock-releasing event failed: ${Q}`,{level:"error"})}try{await z.release(),i("tengu_oauth_token_refresh_lock_released",{})}catch(Q){t(`OAuth refresh lock release failed: ${Q}`,{level:"error"});try{i("tengu_oauth_token_refresh_lock_release_error",{})}catch{}}}}
function xN(e,n=Date.now()){if(e===null)return!1;return n+300000>=e}
function Al(e){if(!e||typeof e!=="object")return{code:void 0,description:void 0};let n=e,r=n.error;return{code:typeof r==="string"?r:r&&typeof r==="object"?r.type:void 0,description:n.error_description}}
function I9n(e){if(!ht.isAxiosError(e)||!e.response)return!1;let n=e.response.status;if(n!==400&&n!==401&&n!==403)return!1;return G2t(e.response.data)!==null}
function RUo(e){return(ht.isAxiosError(e)?G2t(e.response?.data):null)?.url??_ht}
function Ide(e){if(!ht.isAxiosError(e)||!e.response)return!1;let n=e.response.status;if(n!==400&&n!==401)return!1;return Al(e.response.data).code==="invalid_grant"&&G2t(e.response.data)===null}
function djr(e){if(!ht.isAxiosError(e)||e.response?.status!==400)return!1;return Al(e.response.data).code==="invalid_scope"}
var gK=new Set(["invalid_client","invalid_scope","unauthorized_client"]);
function xUo(e){if(!ht.isAxiosError(e)||e.response?.status!==400)return!1;let{code:n}=Al(e.response.data);return typeof n==="string"&&gK.has(n)}
return {outcome:o9,refresh:Hi,direct:El,holdTokens:_i,classify:{invalidGrant:Ide,onHold:I9n,invalidScope:djr,expected:NYo},observeLock:mf,sameObservation:fk,lane:Wk};
}
export function createOAuthExpectedTransportError(){
function cu(n,e){if(e?.(n))return!0;if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return!1;let t=n.response?.status;return t===void 0||t===401||t===403||t===429}
return cu;
}
export function createOAuthHoldResponse({J,U,cn,f,ie,u,x}){
var qe="tengu_lively_beaver";
class te{reader=null;register(e){let r=this.reader;return this.reader=e,r}}
var re=new te;
function A6o(e){return re.register(e)}
function yht(){let e=re.reader;if(!e)return!1;try{return e(qe,!1)===!0}catch{return!1}}
var MXe="account_on_hold";
var _ht="https://claude.ai/restricted";
var ee=2048;
var Je=/^https:\/\/[a-z0-9.-]+\/[A-Za-z0-9/._~%-]*(?:\?[A-Za-z0-9._~%=&-]*)?(?<![.?])$/;
function Qe(e){try{return e===new URL(cn().CLAUDE_AI_ORIGIN).origin}catch{return!1}}
function Yxe(e){if(typeof e!=="string"||e.length>ee)return _ht;let r;try{r=new URL(e)}catch{return _ht}if(r.protocol!=="https:"||r.username||r.password||r.port||r.hash)return _ht;let n=r.hostname;return(n==="claude.ai"||n.endsWith(".claude.ai")||n==="anthropic.com"||n.endsWith(".anthropic.com")||Qe(r.origin))&&r.href.length<=ee&&Je.test(r.href)?r.href:_ht}
var Ze=f(()=>u({error:U(["invalid_grant","access_denied"]),error_description:x(MXe),error_uri:ie().optional()}));
function G2t(e){if(!yht())return null;let r=e;if(typeof r==="string"){if(!r.includes(MXe))return null;try{r=J(r)}catch{return null}}let n=Ze().safeParse(r);return n.success?{url:Yxe(n.data.error_uri)}:null}
return {read:G2t,url:Yxe,register:A6o,defaultUrl:_ht};
}
export function createOAuthRefreshScopes({cn}){
function N(n){return[...new Set(n)]}
var PC="user:inference";
var $3="user:profile";
var hJe="user:plugins";
var mEn="user:projects:read";
var gEn="user:projects:write";
function hEn(t){return Array.isArray(t)&&t.includes(PC)}
var r=[$3,PC,"user:sessions:claude_code","user:mcp_servers","user:file_upload"];
function yJe(){let t=cn(),e=[...r];if(t.PLUGINS_SCOPE_REGISTERED)e.push(hJe);return e}
var n=[mEn,gEn];
function vZn(t){if(!Array.isArray(t))return[];let e=n;return t.filter((o)=>e.includes(o))}
function N5r(t){return N([...yJe(),...vZn(t)])}
return {hasInference:hEn,refreshScopes:N5r};
}
export function createOAuthResetBinding(){
function it(t,e){return t}
return it;
}
