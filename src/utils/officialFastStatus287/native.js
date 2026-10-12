// Verified full public 287 Rbe closure; all mutable state is supplied by the canonical host.
export function createFastStatusLifecycle287({a,He,At,lc,Y,nZ,Xl,le,ox,fn,nS,hn,Ae,St,t,i}){
function ma(){return a.CLAUDE_CODE_REMOTE===!0&&a.CLAUDE_CODE_ENVIRONMENT_KIND===void 0};
function lz(){return a.CLAUDE_CODE_REMOTE===!0&&a.CLAUDE_CODE_ENVIRONMENT_KIND==="byoc"};
var s=new Set(["remote_cowork","remote_cowork_trigger"]);
function Pz(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&s.has(e)};
function Zvn(){return lc()!==null};
function wU(r){let s=(r.startsWith("sk-ant-si-")?r.slice(10):r).split(".");if(s.length!==3||!s[1])return null;try{return Y(Buffer.from(s[1],"base64url").toString("utf8"))}catch{return null}};
var WK="user:profile";
function To(){if(He()!=="firstParty")return!1;return!a.CLAUDE_CODE_DISABLE_FAST_MODE};
function e_(){return Fyt()||VJn()};
function Ls(){return a.CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK&&!Ln()};
function YBe(){return To()&&Zvn()};
function qu(){return zp()||YBe()&&g8("user:ccr_inference")&&!e_()};
function Ln(){return ma()&&Pz()};
function Qu(){return!Ln()&&le().penguinModeOrgEnabled===!0};
function Xu(){return Ln()&&Xl.orgStatus.status==="enabled"};
function Io(){let e=lc();if(e===null)return null;let n=wU(e);return n!==null&&typeof n==="object"&&!Array.isArray(n)?n:null};
function sr(e){return typeof e==="string"&&e!==""};
function Fyt(){let e=Io();if(e===null)return!1;return!(("account_uuid"in e)||("sub"in e))&&"org_service_name"in e&&sr(e.org_service_name)&&"code_agent_id"in e&&sr(e.code_agent_id)};
function VJn(){if(!lz())return!1;let e=Io();if(e===null)return!1;let n="ccr:role"in e?e["ccr:role"]:void 0,r="account_uuid"in e||"ccr:account_id"in e;return n==="session_worker"&&!r&&"code_agent_id"in e&&sr(e.code_agent_id)};
function zp(){let e=fn()?.scopes;return Array.isArray(e)&&e.includes(WK)};
function g8(e){let n=fn()?.scopes;return Array.isArray(n)&&n.includes(e)};
function Xb(){try{return nZ()}catch{return null}};
var tx=["free","preference","extra_usage_disabled","network_error","unknown"];
function nx(e){if(e==null)return"preference";return tx.find((n)=>n===e)??"unknown"};
function Rbn(){return Xl.orgStatus.status==="disabled"&&Xl.orgStatus.source==="server"};
function Ju(e){let n=Xl.replaceOrgStatus(e);if(e.status==="pending")return;let r=n.status!=="pending"?n.status==="enabled":le().penguinModeOrgEnabled===!0,s=e.status==="enabled",g=n.status==="disabled"&&e.status==="disabled"&&n.reason!==e.reason;if(r!==s||g)Xl.orgFastModeChange.emit(s)};
var ix=30000;
function bqr(){if(!To())return;if(Xl.orgStatus.status!=="pending")return;if(Ls()){Xl.replaceOrgStatus({status:"enabled"});return}let e=!1,n=Qu();Xl.replaceOrgStatus(e||n?{status:"enabled"}:{status:"disabled",reason:"unknown",source:"guess"})};
async function Rbe(e,n){if(bqr(),e_())return;if(At())return;if(!To())return;if(Ls()){if(!Rbn())Xl.replaceOrgStatus({status:"enabled"});return}if(Xl.inflightPrefetch)return t("Fast mode prefetch in progress, returning in-flight promise"),Xl.inflightPrefetch;let r=Xb();if(!(fn()?.accessToken&&qu())&&!r){if(Rbn()||Xu())return;let v=!1,w=Qu(),A=YBe();Ju(v||w?{status:"enabled"}:{status:"disabled",reason:A?"unknown":"preference",source:"guess"});return}if(!Xl.beginPrefetchWindow(Date.now(),ix)){t("Skipping fast mode prefetch, fetched recently");return}let g=async()=>{let v=fn(),w=v?.accessToken&&qu()?{accessToken:v.accessToken}:r?{apiKey:r}:null;if(!w)throw Error("No auth available");return ox(w)};async function h(){try{let v;try{v=await g()}catch(A){let M=St.isAxiosError(A)&&(A.response?.status===401||A.response?.status===403&&typeof A.response?.data==="string"&&A.response.data.includes("OAuth token has been revoked"))?fn()?.accessToken:void 0;if(M&&zp())await nS(M,n,e),v=await g();else throw A}let w=Xl.orgStatus.status!=="pending"&&!Ln()?Xl.orgStatus.status==="enabled":le().penguinModeOrgEnabled;if(Ju(v.enabled?{status:"enabled"}:{status:"disabled",reason:nx(v.disabled_reason),source:"server"}),w!==v.enabled){if(!v.enabled)await hn("userSettings",{fastMode:void 0},void 0,e);await Ae((A)=>({...A,penguinModeOrgEnabled:v.enabled}),e)}t(`Org fast mode: ${v.enabled?"enabled":`disabled (${v.disabled_reason??"preference"})`}`)}catch(v){let A=Qu(),R=St.isAxiosError(v)?v.response?.data:void 0,M=St.isAxiosError(v)&&v.response?.status===403&&typeof R==="object"&&R!==null&&"error"in R&&typeof R.error==="object"&&R.error!==null&&"type"in R.error&&R.error.type==="permission_error"&&!!fn()?.accessToken&&qu()&&!zp();if(!Rbn()&&!Xu())Ju(A?{status:"enabled"}:{status:"disabled",reason:M?"unknown":"network_error",source:"guess"});let D=Xl.orgStatus.status==="disabled"?`disabled (${Xl.orgStatus.reason})`:Xu()?"enabled (the server's own earlier answer)":"enabled (cached)";if(M)t(`Org fast mode status endpoint does not admit this session token (permission_error), standing on ${D}`),i("tengu_org_penguin_mode_fetch_refused",{});else t(`Failed to fetch org fast mode status, standing on ${D}: ${v}`,{level:"error"}),i("tengu_org_penguin_mode_fetch_failed",{})}}let b=h();return Xl.trackInflightPrefetch(b),b.finally(()=>Xl.clearInflightPrefetch(b)),b};
return {prefetch:Rbe,resolve:bqr,oauthAdmitted:qu,sessionWorker:e_,remoteCowork:Ln};
}
