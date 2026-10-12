// Official npm 2.1.286 complete declarations, no body rewriting.
export function createAuthIntegerKernel(){
var N=/^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/;
var E=/^[+-]?\d{1,3}([_,\u00A0\u202F ])\d{3}(?:\1\d{3})*$/;
var c=/[_,\u00A0\u202F ]/g;
function m(e){if(e.length<=32){if(N.test(e)){let n=Number(e);return Number.isInteger(n)?n:NaN}if(E.test(e))return parseInt(e.replace(c,""),10)}return}
function rc(e){let n=String(e).trim();return m(n)??parseInt(n,10)}
function eQe(e,n){if(e===void 0)return n;let r=rc(e);return Number.isNaN(r)?n:r}
return {integer:rc,withDefault:eQe};
}
export function createAuthDecoders({rc}){
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)}
function Cs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)}
function u(n){return n===void 0?void 0:String(n)}
function i(n){return{parse:(e)=>n(u(e))}}
function t(n){let e=n?.trim();return e?e:void 0}
function d(n){return i((e)=>{if(e===void 0)return;if(n?.digitsOnly&&!/^[+-]?\d+$/.test(e.trim()))return;let r=rc(e);if(!Number.isFinite(r))return;if(n?.min!==void 0&&r<n.min)return;if(n?.max!==void 0&&r>n.max)return;return r})}
var f=i(t);
var o=i((n)=>n);
var s=i((n)=>Le(n));
var l=i((n)=>{if(Le(n))return!0;if(Cs(n))return!1;return});
var m=d();
var D={str:()=>f,rawStr:()=>o,bool:()=>s,triBool:()=>l,int:(n)=>n?d(n):m,enum:(n)=>i((e)=>e!==void 0&&n.includes(e.trim())?e.trim():void 0)};
return D;
}
export function createAuthEnvironment({D,process}){
function gKo(n){if(typeof n==="boolean")return n?"1":"0";return String(n)}
var ZI=D.str();
var at=D.str();
var ut=D.str();
var Hi=D.str();
var AU=D.str();
var Lo=D.int();
var iL=D.str();
var In=D.triBool();
var OL=D.str();
var Up=D.bool();
var _o=D.str();
var Bt=D.str();
var Xt=D.str();
var OU=D.bool();
var Zp=D.bool();
var Do=D.int({min:0});
var To=D.int({min:0});
var tc=D.str();
var Fo=D.str();
var fo=D.str();
var zt=D.str();
var oc=D.str();
var CT=D.str();
var Bo=D.str();
var rT=D.str();
var Cc=D.str();
var ci=D.int({min:0,max:9,digitsOnly:!0});var blocks=D.int({min:0,max:2,digitsOnly:!0});
var Ti=D.triBool();
var Li=D.triBool();
var NA=D.str();
var UL=D.str();
var Ai=D.triBool();
var Si=D.int({min:1});
var mi=D.bool();
var Di=D.triBool();
var Oi=D.bool();
var ii=D.bool();
var zI=D.int();
function gJe(t,o){let _=Object.create(o);for(let[E,r]of Object.entries(t)){let e=_,s;Object.defineProperty(_,E,{get:()=>{let n=process.env[E];if(n!==e)s=r.parse(n),e=n;return s},enumerable:!0,configurable:!0})}return Object.defineProperties(_,{set:{value:(E,r)=>{process.env[E]=gKo(r)}},unset:{value:(E)=>{delete process.env[E]}}}),_}
return gJe({ANTHROPIC_CUSTOM_HEADERS:ZI,ANTHROPIC_API_KEY:at,ANTHROPIC_AUTH_TOKEN:ut,ANTHROPIC_BASE_URL:Hi,ANTHROPIC_UNIX_SOCKET:AU,CLAUDE_CODE_API_KEY_HELPER_TTL_MS:Lo,CLAUDE_CODE_ENTRYPOINT:iL,CLAUDE_CODE_GATEWAY_HINT_HEADERS:In,CLAUDE_CODE_DESKTOP_APP_VERSION:OL,CLAUDE_CODE_ADDITIONAL_PROTECTION:Up,CLAUDE_CODE_HOST_AUTH_ENV_VAR:_o,CLAUDE_CODE_OAUTH_TOKEN:Bt,CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR:Xt,CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST:OU,CLAUDE_CODE_REMOTE:Zp,CLAUDE_CODE_OAUTH_401_WAIT_MS:Do,CLAUDE_CODE_AUTH_FAIL_EXIT_MS:To,CLAUDE_CODE_REMOTE_SESSION_ID:tc,CLAUDE_CODE_SUBSCRIPTION_TYPE:Fo,CLAUDE_CODE_RATE_LIMIT_TIER:fo,CLAUDE_CODE_OAUTH_SCOPES:zt,CLAUDE_CODE_REMOTE_SESSION_ORIGIN:oc,CLAUDE_BG_AUTH_SNAPSHOT_PATH:CT,ANTHROPIC_PROFILE:Bo,CLAUDE_AGENT_SDK_CLIENT_APP:rT,CLAUDE_CODE_SESSION_KIND:Cc,CLAUDE_CODE_GZIP_REQUEST_BODY_LEVEL:ci,CLAUDE_CODE_GZIP_REQUEST_BODY_BLOCKS:blocks,CLAUDE_CODE_GZIP_REQUEST_BODIES:Ti,CLAUDE_CODE_GZIP_CCR_REQUEST_BODIES:Li,NODE_EXTRA_CA_CERTS:NA,CLAUDE_CODE_ENVIRONMENT_KIND:UL,CLAUDE_ENABLE_BYTE_WATCHDOG:Ai,CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS:Si,_CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL:mi,CLAUDE_ENABLE_STREAM_WATCHDOG:Di,CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK:Oi,CLAUDE_CODE_RETRY_WATCHDOG:ii,CLAUDE_CODE_MAX_RETRIES:zI},{});
}
export function createAuthIntegerReader(){return createAuthIntegerKernel().integer}
export function createAuthIntegerDefaultReader(){return createAuthIntegerKernel().withDefault}
