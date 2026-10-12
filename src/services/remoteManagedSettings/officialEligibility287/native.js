function module0(imports){

function bD(e){return!!e&&!e.unpinned};
function pkn(e){let t=e?.hostVerdict;return t!==void 0&&"verified"in t&&t.verified};
function rto(e){return bD(e)||pkn(e)};
return {bD,pkn,rto};
}
function module1(imports){
const a=imports["a"];
var s=new Set(["remote_cowork","remote_cowork_trigger"]);
function Pz(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&s.has(e)};
return {s,Pz};
}
function module2(imports){

function l(n){return n instanceof Error?n.message:String(n)};
return {l};
}
function module3(imports){
const fn=imports["fn"];
function im(){return fn()?.accessToken!=null};
function c_t(){return fn()?.subscriptionType??null};
return {im,c_t};
}
function module4(imports){
const oA=imports["oA"];
const a=imports["a"];
const He=imports["He"];
const uo=imports["uo"];
const rto=imports["rto"];
const Js=imports["Js"];
const Pz=imports["Pz"];
const o_t=imports["o_t"];
const t=imports["t"];
const l=imports["l"];
const _Qe=imports["_Qe"];
const dn=imports["dn"];
const im=imports["im"];
const c_t=imports["c_t"];
const mb=imports["mb"];
const Ose=imports["Ose"];
const QYr=imports["QYr"];
const JYr=imports["JYr"];
function uj(){return a.CLAUDE_CODE_REMOTE&&a.CLAUDE_CODE_REMOTE_HERMETIC_MODE};
function g(e){try{return new URL(e).host}catch{return}};
function IXn(e=a.ANTHROPIC_BASE_URL||_Qe()){if(!e)return!0;let i=g(dn().BASE_API_URL);return i!==void 0&&g(e)===i};
function KP(){let e=Ose();if(e!==void 0)return e;let{eligible:i,ineligibleReason:n}=f(),r=a.CLAUDE_CODE_EVAL_CONFINED===!0,o=!i&&r;QYr(o);let s=i||o;return JYr(s,s?void 0:n)};
function u(){return CGr()||im()&&c_t()===null};
function CGr(){if(!im())return!1;let e=c_t();return e==="enterprise"||e==="team"};
function f(){if(oA())return{eligible:!0};if(uj())return{eligible:!1,ineligibleReason:"hermetic_remote_session"};if(He()==="gateway"){let n=uo(),r=rto(n);return{eligible:r,ineligibleReason:r?void 0:n?.hostVerdict!==void 0?"host_gateway_not_accepted":"unpinned_gateway"}}if(He()!=="firstParty")return{eligible:!1,ineligibleReason:"third_party_provider"};if(!Js())return{eligible:!1,ineligibleReason:"custom_base_url"};let e=a.CLAUDE_CODE_ENTRYPOINT;if(e==="local-agent"||Pz()||e?.startsWith("claude-coworker"))return{eligible:!1,ineligibleReason:"sandboxed_entrypoint"};let i=!1;try{i=o_t()}catch(n){t(`Remote settings: could not read the profile store (${l(n)}); not treating this session as profile-authenticated`,{level:"warn"})}if(i)return IXn()?{eligible:!0}:{eligible:!1,ineligibleReason:"profile_base_url_mismatch"};if(u())return{eligible:!0};try{let{key:n}=mb({skipRetrievingKeyFromApiKeyHelper:!0});if(n)return{eligible:!0}}catch{}return{eligible:!1,ineligibleReason:im()?"unsupported_subscription":"no_auth"}};
return {uj,g,IXn,KP,u,CGr,f};
}
export function createRemoteEligibility287(ports){
const m0=module0({});
const m1=module1({"a":ports["environment"]});
const m2=module2({});
const m3=module3({"fn":ports["tokens"]});
const m4=module4({"oA":ports["cacheOverride"],"a":ports["environment"],"He":ports["provider"],"uo":ports["gatewayAuth"],"rto":m0["rto"],"Js":ports["requestEndpointEnabled"],"Pz":m1["Pz"],"o_t":ports["profileEligible"],"t":ports["debug"],"l":m2["l"],"_Qe":ports["profileBaseURL"],"dn":ports["oauthConfig"],"im":m3["im"],"c_t":m3["c_t"],"mb":ports["apiKey"],"Ose":ports["eligibilityMemo"],"QYr":ports["setSnapshotOnly"],"JYr":ports["recordEligibility"]});
return {eligibility:m4["f"],memoizedEligibility:m4["KP"],profileHostMatches:m4["IXn"],hermeticRemote:m4["uj"],subscriptionEligible:m4["u"]};
}
