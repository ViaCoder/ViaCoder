function module0(imports,version){

function Unr(){return};
function dVt(){let e=Unr();return e!==void 0&&e.startsWith("@")&&e.length>1?e.slice(1):void 0};
return {Unr,dVt};
}
function module1(imports,version){

var wr={[Symbol.dispose](){}};
function Rr(){return wr};
var ng=Rr;
var Y=(e,n)=>{using r=ng`JSON.parse(${Se(e)})`;return typeof n>"u"?JSON.parse(e):JSON.parse(e,n)};
function Se(e){return typeof e==="string"?e.length:e};
return {wr,Rr,ng,Y,Se};
}
function module2(imports,version){

function pC({attempt:t,baseMs:r,capMs:e=1/0,factor:o=2,jitter:n={kind:"none"},random:m=Math.random}){let i=Math.min(e,r*o**(t-1));switch(n.kind){case"none":return i;case"proportional":return i+m()*n.ratio*i;case"symmetric":return Math.max(0,i+i*n.ratio*(2*m()-1));case"full":{let a=Math.min(n.floorMs,i);return a+m()*(i-a)}}};
class Mir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}};
var aB=new Mir;
function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??aB).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})};
return {pC,Mir,aB,ee};
}
function module3(imports,version){
const pC=imports["pC"];
var pe=500;
function sL(e,r,n=32000,s=Math.random){let a=Math.round(pC({attempt:e,baseMs:pe,capMs:n,jitter:{kind:"proportional",ratio:0.25},random:s}));if(r){let o=parseInt(r,10);if(!isNaN(o))return Math.max(o*1000,a)}return a};
return {pe,sL};
}
function module4(imports,version){
const a=imports["a"];
const QT=imports["QT"];
var Dg=new QT;
function nZn(){return Dg.getStore()?.workload};
function kwn(e,n){return Dg.run({workload:e},n)};
function q0(){let e=process.env.CLAUDE_AGENT_SDK_VERSION?`, agent-sdk/${process.env.CLAUDE_AGENT_SDK_VERSION}`:"",n=a.CLAUDE_AGENT_SDK_CLIENT_APP?`, client-app/${a.CLAUDE_AGENT_SDK_CLIENT_APP}`:"",r=nZn(),s=r?`, workload/${r}`:"";return`claude-cli/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:version,FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION} (external, ${a.CLAUDE_CODE_ENTRYPOINT??"cli"}${e}${n}${s})`};
return {Dg,nZn,kwn,q0};
}
function module5(imports,version){
const a=imports["a"];
var Mor=new Set(["claude-desktop","claude-desktop-3p"]);
function f$(){{let e=a.CLAUDE_CODE_ENTRYPOINT;return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST&&a.CLAUDE_CODE_USE_GATEWAY&&(e!==void 0&&Mor.has(e)||i())}return!1};
function Lor(){return f$()&&i()};
function i(){return a.CLAUDE_CODE_HOST_GATEWAY_LINEAGE&&!!a.CLAUDE_CODE_HOST_CREDS_FILE};
var IXo="claude-desktop-3p";
return {Mor,f$,Lor,i,IXo};
}
function module6(imports,version){

function Mo(){return`claude-code/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:version,FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-10-01T16:02:06Z",GIT_SHA:"3c446a1b98aceb99a6cdee0f84a8bea42f4a8937",HOOKS_WORKER_URL:"/$bunfs/root/src/plugins/functionHooks/hooks-worker/hooks-worker.js",DD_SOURCEMAP_GROUP:"darwin"}.VERSION}`};
return {Mo};
}
function module7(imports,version){
const Unr=imports["Unr"];
const J=imports["J"];
const dVt=imports["dVt"];
const xe=imports["xe"];
const Y=imports["Y"];
const fe=imports["fe"];
const uo=imports["uo"];
const we=imports["we"];
const sL=imports["sL"];
const t=imports["t"];
const ee=imports["ee"];
const q0=imports["q0"];
const Lor=imports["Lor"];
const a=imports["a"];
const IXo=imports["IXo"];
const f$=imports["f$"];
const Mo=imports["Mo"];
var Ue=5;
function We(){let e=q0();if(!Lor())return e;let n=`, ${a.CLAUDE_CODE_ENTRYPOINT??"cli"}`,r=e.indexOf(n);return r===-1?e:e.slice(0,r+n.length)+`, ${IXo}`+e.slice(r+n.length)};
async function Ve(e){let n=Unr();if(n===void 0)return null;if(n==="fail")return{success:!1,error:"mocked fetch failure",errorKind:"unknown_error",skipRetry:!0};if(n==="empty")return{success:!0,settings:{},checksum:void 0,consentIdentity:await J(e)};try{let r=dVt(),s=r!==void 0?await xe(r,"utf-8"):n,g=Y(s);if(!g||typeof g!=="object"||Array.isArray(g))return{success:!1,error:"mock JSON parse failed",errorKind:"parse_error",skipRetry:!0};let R=fe(g,"mock remote settings");if("ruledEmpty"in R)return R.ruledEmpty;return{success:!0,...R,checksum:"mock",consentIdentity:await J(e)}}catch{return{success:!1,error:"mock JSON parse failed",errorKind:"parse_error",skipRetry:!0}}};
function B(e){return e.httpStatus!==void 0?`${e.errorKind}/${e.httpStatus}`:e.errorKind};
async function Ze(e,n={}){let r=await Ve(n.credentials);if(r)return r;let s=null,g=uo()&&!n.background||n.singleAttempt?0:Ue;for(let R=1;R<=g+1;R++){if(s=await we(e,!1,n.credentials),s.attempts=R,s.success)return s;if(s.skipRetry)return s;if(R>g)return s;let w=sL(R);t(`Remote settings: Retry ${R}/${g} after ${w}ms (${B({errorKind:s.errorKind??"unknown_error",...s.httpStatus!==void 0&&{httpStatus:s.httpStatus}})})`),await ee(w)}return s};
return {Ue,We,Ve,B,Ze};
}
export function createRemoteRequest287(ports){
const m0=module0({},ports.version);
const m1=module1({},ports.version);
const m2=module2({},ports.version);
const m3=module3({"pC":m2["pC"]},ports.version);
const m4=module4({"a":ports["environment"],"QT":ports.builtins["async_hooks"]["AsyncLocalStorage"]},ports.version);
const m5=module5({"a":ports["environment"]},ports.version);
const m6=module6({},ports.version);
const m7=module7({"Unr":m0["Unr"],"J":ports["consent"],"dVt":m0["dVt"],"xe":ports.builtins["fs/promises"]["readFile"],"Y":m1["Y"],"fe":ports["payload"],"uo":ports["gateway"],"we":ports["fetch"],"sL":m3["sL"],"t":ports["debug"],"ee":m2["ee"],"q0":m4["q0"],"Lor":m5["Lor"],"a":ports["environment"],"IXo":m5["IXo"],"f$":m5["f$"],"Mo":m6["Mo"]},ports.version);
const f$=m5["f$"],We=m7.We,Mo=m6["Mo"];
return {retry:m7["Ze"],mock:m7["Ve"],gatewayUserAgent:m7["We"],codeUserAgent:Mo,isDesktop:f$,withWorkload:m4["kwn"],clock:m2.aB,userAgent:()=>f$()?We():Mo()};
}
