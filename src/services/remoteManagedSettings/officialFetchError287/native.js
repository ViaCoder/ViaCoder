// Original 287 fetch-error catch and complete dependency closures; only native dynamic import is linked to its source runtime port.
function module0(imports){

function l(n){return n instanceof Error?n.message:String(n)};
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function Ws(n){let e=l(n);if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return{kind:"other",message:e};let t=n,r=t.response?.status;if(r===401||r===403)return{kind:"auth",status:r,message:e};if(t.code==="ECONNABORTED")return{kind:"timeout",status:r,message:e};if(t.code==="ECONNREFUSED"||t.code==="ENOTFOUND")return{kind:"network",status:r,message:e};return{kind:"http",status:r,message:e}};
function H6e(n){return n!==void 0&&n>=400&&n<500&&n!==408&&n!==409&&n!==429};
return {l,E,Ws,H6e};
}
function module1(imports){

var gGo=["ENOTFOUND","EAI_AGAIN","ECONNREFUSED","ECONNRESET","ETIMEDOUT","EHOSTUNREACH","ENETUNREACH","EPIPE","CERT_ERROR","ABORTED","OTHER"];
var hGo=["invalid_request_error","authentication_error","permission_error","not_found_error","rate_limit_error"];
var yGo=["ip_not_in_allowed_range","claude_code_key_creator_not_member","organization_disabled","organization_on_hold","restricted_regime_endpoint","oauth_not_allowed_for_organization","oauth_scope_insufficient","token_expired"];
return {gGo,hGo,yGo};
}
function module2(imports){
const hGo=imports["hGo"];
const yGo=imports["yGo"];
const gGo=imports["gGo"];
const E=imports["E"];
function Dht(e){let n=e?.response?.data?.error;if(!n||typeof n!=="object")return{};let a=typeof n.type==="string"?n.type:void 0,r=n.details?.error_code,s=typeof r==="string"?r:typeof n.error_code==="string"?n.error_code:typeof n.code==="string"?n.code:void 0,p=typeof n.message==="string"?n.message:void 0,_=s===void 0&&p!==void 0&&(a==="authentication_error"||a==="permission_error")?J(p):void 0;return{serverErrorType:a===void 0?void 0:hGo.includes(a)?a:"other",serverErrorCode:s===void 0?void 0:yGo.includes(s)?s:"other",..._!==void 0&&{serverAuthDenial:_}}};
function J(e){if(e.startsWith("Organization access has been revoked"))return"org_access_revoked";if(e.startsWith("Workspace access has been revoked"))return"workspace_revoked";if(/^OAuth (?:access )?token has been revoked\b/.test(e))return"token_revoked";if(/^OAuth (?:access )?token has expired\b/.test(e))return"token_expired";if(e.startsWith("OAuth access token is invalid")||e.startsWith("Invalid bearer token"))return"token_invalid";if(e.startsWith("OAuth token application has been deactivated"))return"application_deactivated";if(e.startsWith("Credential is invalid"))return"credential_invalid";return"other"};
var le=new Set(gGo);
function pe(e){return le.has(e)};
var _e=new Set(["UNABLE_TO_VERIFY_LEAF_SIGNATURE","UNABLE_TO_GET_ISSUER_CERT","UNABLE_TO_GET_ISSUER_CERT_LOCALLY","SELF_SIGNED_CERT_IN_CHAIN","DEPTH_ZERO_SELF_SIGNED_CERT","CERT_HAS_EXPIRED","CERT_NOT_YET_VALID","CERT_UNTRUSTED","CERT_REJECTED","CERT_SIGNATURE_FAILURE","ERR_TLS_CERT_ALTNAME_INVALID","HOSTNAME_MISMATCH"]);
var ge=new Set(["ECONNABORTED","ERR_CANCELED"]);
function W(e){if(e===void 0)return;if(pe(e))return e;if(_e.has(e))return"CERT_ERROR";if(ge.has(e))return"ABORTED";return};
function zXe(e){let n=e!==null&&typeof e==="object"&&"cause"in e?e.cause:void 0;return W(E(e))??W(E(n))??"OTHER"};
return {Dht,J,le,pe,_e,ge,W,zXe};
}
function module3(imports){

var I7e="gateway TLS pin store refused: the credentials file is a symlink";
var Iyt="gateway TLS pin store unreadable: the credentials file could not be read";
var gbn="gateway host resolved to a public address";
var ybn="gateway TLS certificate does not match the pinned fingerprint";
function Oyt(e){let n=typeof e==="object"&&e!==null&&"cause"in e?e.cause:void 0;for(let r of[e,n])if(r instanceof Error&&r.message.includes(ybn)&&"pinnedFingerprint"in r&&typeof r.pinnedFingerprint==="string"&&"presentedFingerprint"in r&&typeof r.presentedFingerprint==="string")return{pinnedFingerprint:r.pinnedFingerprint,presentedFingerprint:r.presentedFingerprint};return};
return {I7e,Iyt,gbn,ybn,Oyt};
}
export function createRemoteFetchError287({t,nS,fn,importWif,i,o5o}){
const m0=module0({});
const m1=module1({});
const m2=module2({"hGo":m1["hGo"],"yGo":m1["yGo"],"gGo":m1["gGo"],"E":m0["E"]});
const m3=module3({});
const {errorText:l,classify:Ws,terminalStatus:H6e,metadata:Dht,errno:zXe,pinMismatch:Oyt,pinRefused:I7e,pinUnreadable:Iyt,pinMismatchMessage:ybn,publicAddress:gbn}={errorText:m0["l"],classify:m0["Ws"],terminalStatus:m0["H6e"],metadata:m2["Dht"],errno:m2["zXe"],pinMismatch:m3["Oyt"],pinRefused:m3["I7e"],pinUnreadable:m3["Iyt"],pinMismatchMessage:m3["ybn"],publicAddress:m3["gbn"]};
function B(e){return e.httpStatus!==void 0?`${e.errorKind}/${e.httpStatus}`:e.errorKind}
return async function handle(error,{checksum:e,forcedRefreshAttempt:n=false,credentials:r,accessToken:s,profileBearer:g=false,consentIdentity:R,metadata:w={},retry:we}){
let v=(h)=>(t(`Remote settings: Fetch attempt failed (${B({errorKind:h.errorKind??"unknown_error",...h.httpStatus!==void 0&&{httpStatus:h.httpStatus}})})`),{...w,...h});
try{throw error}catch(h){let C=l(h?.cause);if(l(h).includes(I7e))return v({success:!1,error:"Cloud gateway TLS pin is in a symlinked credentials file",errorKind:"gateway_pin_refused",skipRetry:!0});if(l(h).includes(Iyt))return v({success:!1,error:"Cloud gateway TLS pin could not be read from the credentials file",errorKind:"gateway_pin_unreadable"});if(l(h).includes(ybn)||C.includes(ybn)){let b=Oyt(h);return v({success:!1,error:"Cloud gateway TLS certificate does not match stored pin",errorKind:"gateway_cert_mismatch",...b&&{gatewayPinMismatch:b},skipRetry:!0})}if(l(h).includes(gbn)||C.includes(gbn))return v({success:!1,error:"Cloud gateway connection outside the network it was checked on",errorKind:"gateway_public_address",skipRetry:!0});let{kind:T,status:P,message:E}=Ws(h);if(P===404)return{success:!0,settings:{},checksum:"",consentIdentity:R,...w};let x=Dht(h);switch(T){case"auth":{let b={success:!1,error:"Not authorized for remote settings",errorKind:P===401?"http_401":"http_403",skipRetry:!0,...x};if(P===401&&s&&!n){let A;if(g){let{getWIFTokenCache:O,invalidateWIFToken:L}=await importWif();await L(s),A=await O().then((H)=>H?.getToken()).catch(()=>{return})}else await nS(s,r,void 0,{onForcedRefreshOutcome:(O)=>{b.forcedRefreshOutcome=O}}),A=fn()?.accessToken;if(A&&A!==s){v(b),i("tengu_remote_settings_401_force_refresh_retry",{});let O=await we(e,!0,r);return{...O,retriedAfter401:!0,forcedRefreshOutcome:O.forcedRefreshOutcome??b.forcedRefreshOutcome}}}if(P===401&&g&&n)o5o(!0);return v(b)}case"timeout":return v({success:!1,error:"Remote settings request timeout",errorKind:"timeout",errno:zXe(h)});case"network":return v({success:!1,error:"Cannot connect to server",errorKind:"network_error",errno:zXe(h)});default:return v({success:!1,error:E,errorKind:P!==void 0&&P>=500?"http_5xx":P!==void 0&&P>=400?"http_4xx":"unknown_error",...P!==void 0&&P>=400&&{httpStatus:P},...x,...H6e(P)&&{skipRetry:!0}})}}
};
}
