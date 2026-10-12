// Official npm 2.1.286 complete declarations, no body rewriting.
export function createOAuthCredentialReader({Bn,F,FYr,GG,Jde,KT,Pf,Rf,Tf,USe,a,bi,d,d0,j,m7n,r9,zS,zn}){
var Rht=30000;
function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
function xf(e){if(e){let n=e.refreshToken;return n===""||!!n&&bi.has(n)}if(cc())return!1;return}
function lk(e=["user:inference"]){return Fk()??[...e]}
function Fk(){let e=a.CLAUDE_CODE_OAUTH_SCOPES?.split(/\s+/).filter(Boolean);return e?.length?e:void 0}
var jH=["user:inference","user:ccr_inference","user:file_upload"];
function zH(){if(a.CLAUDE_CODE_OAUTH_TOKEN)return{accessToken:a.CLAUDE_CODE_OAUTH_TOKEN,refreshToken:null,expiresAt:null,scopes:lk(),subscriptionType:a.CLAUDE_CODE_SUBSCRIPTION_TYPE||null,rateLimitTier:a.CLAUDE_CODE_RATE_LIMIT_TIER||null};let e=d0(),n=(r)=>({accessToken:r,refreshToken:null,expiresAt:null,scopes:FYr()??lk(jH),subscriptionType:a.CLAUDE_CODE_SUBSCRIPTION_TYPE||null,rateLimitTier:a.CLAUDE_CODE_RATE_LIMIT_TIER||null});if(e&&(!GG()||cc()))return n(e);if(cc())return null;try{let g=zn().read({fromStoreCopy:!0})?.claudeAiOauth;if(g?.accessToken)return g}catch(r){d(r)}if(e)return n(e);return null}
function pn(){if(r9())return null;let e=Jde.of(j().host);if(e.value!==void 0)return e.value;let n=zH();return e.value=n,n}
async function $k(e,n){if(F()&&n!==void 0){let s=await n.probeCredentials();if(s.state!=="present")return wf(e,n);if(s.version!==e.lastCredentialsVersion){e.lastCredentialsVersion=s.version,KT(),Ef(e);return}return uk(e,n)}let r;try{r=(await Tf(Rf(zS(),".credentials.json"))).mtimeMs}catch{return wf(e,n)}if(r!==e.lastCredentialsMtimeMs){e.lastCredentialsMtimeMs=r,KT(),Ef(e);return}await uk(e,n)}
async function uk(e,n){try{if(!Bn())return;let r=e.promise?await e.promise.catch(()=>null):e.value;if(r===void 0)return;if(r!==null&&!xf(r))return;let s=Date.now();if(s-e.lastUnusableTokenRecheckAt<Rht)return;if(e.lastUnusableTokenRecheckAt=s,r!==null)e.lastKeychainAccessToken=r.accessToken;await wf(e,n)}catch(r){d(r)}}
function Ef(e){try{e.credentialsChangedOnDisk.emit()}catch(n){d(n)}}
async function wf(e,n){if(e.clear(),F())USe();let s=(await Fa(n))?.accessToken??null;if(s!==e.lastKeychainAccessToken)e.lastKeychainAccessToken=s,Pf(),Ef(e)}
function Fa(e){if(r9())return Promise.resolve(null);let n=Jde.of(j().host);if(n.promise)return n.promise;let r=XH(e);return n.promise=r,r.catch(()=>{if(n.promise===r)n.promise=null}),r}
async function XH(e){if(a.CLAUDE_CODE_OAUTH_TOKEN)return pn();let n=F()&&e!==void 0?await m7n(e):d0();if(n&&(!GG()||cc()))return pn();if(cc())return null;try{let g=(await zn().readAsync(e))?.claudeAiOauth;if(g?.accessToken)return g}catch(r){d(r)}if(n)return pn();return null}
return {sync:pn,async:Fa,readAsync:XH,readSync:zH,check:$k,recheck:uk,uncached:wf,unusable:xf,emit:Ef,scopes:lk};
}
