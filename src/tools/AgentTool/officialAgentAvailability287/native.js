// Generated COMPLETE raw declarations; external owners have no fallback.
import {AsyncLocalStorage} from 'node:async_hooks'
import {isProxy} from 'node:util/types'
import {randomUUID} from 'node:crypto'
function module0(imports){

function Mt(e,n){return e.name===n||(e.aliases?.includes(n)??!1)};

return {Mt};
}
function module1(imports){

var yt="Agent";

return {yt};
}
function module2(imports){

function V1e(e){return e.mcpInfo?.serverName??(e.name?.startsWith("mcp__")?e.name.split("__")[1]:void 0)};

return {V1e};
}
function module3(imports){

function wZn(e){return e.agentId===void 0&&e.forRemoteExecution!==!0?e.hookCaller:void 0};

return {wZn};
}
function module4(imports){
const a=imports["a"];
function ut(){return a().registry};

return {ut};
}
function module5(imports){

var KF=["acceptEdits","auto","bypassPermissions","default","dontAsk","plan"];
var YF="manual";
function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
var Ag=["PreToolUse","PostToolUse","PostToolUseFailure","PostToolBatch","Notification","UserPromptSubmit","UserPromptExpansion","SessionStart","SessionEnd","Stop","StopFailure","SubagentStart","SubagentStop","PreCompact","PostCompact","PreModelSwitch","PostModelSwitch","PermissionRequest","PermissionDenied","Setup","TeammateIdle","TaskCreated","TaskCompleted","Elicitation","ElicitationResult","ConfigChange","WorktreeCreate","WorktreeRemove","InstructionsLoaded","CwdChanged","FileChanged","DirectoryAdded","MessageDisplay"];
var Vo={inline:"--plugin-dir session plugins",builtin:"built-in plugins","skills-dir":"plugins auto-loaded from .claude/skills/",synced:"plugins synced from your claude.ai account","claude-plugin-test":"plugins loaded by claude plugin test",npm:"plugins installed from an npm registry (`<package>@npm`); remove this marketplace and add it again under another name",pip:"plugins installed from a Python package index (reserved; not yet available)",uv:"plugins installed from a Python package index through uv (reserved; not yet available)",cargo:"plugins installed from a Rust crate registry (reserved; not yet available)",github:"plugins installed straight from a GitHub repository (`<owner>/<repo>@github`; reserved; not yet available)",gh:"plugins installed straight from a GitHub repository (reserved; not yet available)"};
function yz(e){return Object.hasOwn(Vo,e)};

return {KF,YF,N,Ag,Vo,yz};
}
function module6(imports){
const N=imports["N"];
const W=imports["W"];
const nd=imports["nd"];
function gF(r){if(!N(r))return!1;let o=Object.getPrototypeOf(r);return o===null||!W(o)&&Object.getPrototypeOf(o)===null};
var l=65536;
function i(r){if(typeof r!=="object"||!r)return!1;try{return Reflect.get(RegExp.prototype,"source",r),!0}catch{return!1}};
var xPe=(r)=>gF(r)&&!i(r);
function s(r,o,t){if(Array.isArray(r))return Array.prototype.some.call(r,(e)=>s(e,o,t));if(Array.isArray(o))return Array.prototype.some.call(o,(e)=>s(r,e,t));if(typeof r!=="object"||r===null)return r===o;if(gF(r)){if(typeof o!=="object"||!o)return!1;for(let e of Object.keys(r))if(!Object.hasOwn(o,e)||!s(r[e],o[e],t))return!1;return!0}return i(r)&&t(r,String(o))};
function Bjt(r,o,t=""){let e;if(Array.isArray(r))return Array.prototype.some.call(r,(n)=>(e=Bjt(n,o,t),e!==void 0)),e;if(Array.isArray(o))return Array.prototype.some.call(o,(n)=>(e=Bjt(r,n,t),e!==void 0)),e;if(!xPe(r))return;if(o===null)return{path:t,kind:"null"};switch(typeof o){case"string":return{path:t,kind:"string"};case"number":return{path:t,kind:"number"};case"boolean":return{path:t,kind:"boolean"};case"bigint":return{path:t,kind:"bigint"};case"object":break;case"undefined":case"symbol":case"function":return}for(let n of Object.keys(r)){if(!Object.hasOwn(o,n))continue;if(e=Bjt(r[n],o[n],t===""?n:`${t}.${n}`),e!==void 0)return e}return};
function zVr(r,o,t){let e=t.path.split(".").at(-1)??t.path;return`hooks module ${r}: on('${o}') matcher at ${t.path} is a nested object, but e.${t.path} is a ${t.kind} there, which an object matcher can never match (a matcher has no operator keys); the hook will not run for it. A ${t.kind} is matched by the literal value or, as a string, by a RegExp, e.g. { ${e}: /^prefix/ }`};
var VVr=32;
var d=(r)=>r.includes("g")?"g":r.includes("y")?"y":void 0;
var m=(r)=>({source:String(Reflect.get(RegExp.prototype,"source",r)),flags:String(Reflect.get(RegExp.prototype,"flags",r))});
function tr(r,o){if(o.length>l)return nd().log(`matcher: a value of ${o.length} characters is past the ${l} a RegExp matcher reads; it matches, so the hook decides`),!0;if(d(m(r).flags))r.lastIndex=0;return RegExp.prototype.exec.call(r,o)!==null};
var KVr=(r,o)=>s(r,o,()=>!0);
var FQ=(r,o,t)=>Array.isArray(r)?r.some((e)=>FQ(e,o,t)):!gF(r)||!Object.hasOwn(r,o)||KVr(r[o],t);
var _yt=(r,o)=>s(r,o,tr);

return {gF,l,i,xPe,s,Bjt,zVr,VVr,d,m,tr,KVr,FQ,_yt};
}
function module7(imports){
const ut=imports["ut"];
const FQ=imports["FQ"];
var dd=(o,e,s)=>(s??ut().loadedModules).some((r)=>r.hooks(o)&&(e===void 0||Object.entries(e).every(([t,d])=>FQ(r.matcherFor(o),t,d))));

return {dd};
}
function module8(imports){

function ct(t,e){return t};

return {ct};
}
function module9(imports){

function Ys(){let t;return{set:(e)=>{t=e},get:()=>t}};
var kJn=Ys();
var byt=()=>kJn.get();

return {Ys,kJn,byt};
}
function module10(imports){
const N=imports["N"];
class Oe extends Error{name="HooksError";telemetryMessage="function hooks error (message not reported: it may contain plugin details)";thrownName};
function Syt(e,r="aborted"){let{reason:o}=e;return o instanceof Error?o.message:o===void 0?r:String(o)};
function jjt(e,r){if(!N(e))throw new Oe(`${r}: next() takes the event's argument: next(e) passes it on, next({ ...e, x }) rewrites it`);return e};

return {Oe,Syt,jjt};
}
function module11(imports){
const yz=imports["yz"];
var b=new Map;
var A=()=>{let e=b.get("external")??new Map([["responsive-mode","cc-plugin-responsive-mode"],["tips","cc-plugin-tips"],["mermaid","cc-plugin-mermaid"],["claude-test","cc-plugin-claude-test"],["agents-md","cc-plugin-agents-md"],["diff","cc-plugin-diff"],["telemetry","cc-plugin-telemetry"],["plugin-authoring","cc-plugin-plugin-authoring"],["sec-default","cc-plugin-sec-default"],...[]]);return b.set("external",e),e};
var m=()=>A();
var g=(e)=>[...m()].flatMap(([n,t])=>t===e?[n]:[]);
var _i="builtin";
function TS(e){let n=P(e);if(n===void 0)return e;let t=m(),r=h(n)[0],i=t.get(n)??t.get(Nr(n))??(r===void 0?void 0:t.get(r));return i===void 0?e:`${i}@${_i}`};
function P(e){let n=e.lastIndexOf("@");return n>0&&lbn(e.slice(n+1))===_i?e.slice(0,n):void 0};
function h(e){let n=g(e);return n.length>0?n:g(Nr(e))};
function lbn(e){let n=e.toLowerCase();return yz(n)?n:e};
function Bl(e){let n=e.lastIndexOf("@");if(n<0)return;let t=e.slice(n+1);return t===""?void 0:t};
function Nr(e){return e.normalize("NFC").toLowerCase()};

return {b,A,m,g,_i,TS,P,h,lbn,Bl,Nr};
}
function module12(imports){
const Ag=imports["Ag"];
const Oe=imports["Oe"];
const Nr=imports["Nr"];
const _i=imports["_i"];
var SJn=Ag;
var Xe=SJn.map((e)=>`classic.${e}`);
var USn=["model.complete","model.classify","model.fork","audio.play","audio.speak","mcp.call","mcp.connect","session.cwd","session.root","session.model","session.turns","session.id","session.messages","session.repo","session.surface","session.surfaces","session.authorize","session.usage","session.version","turn.abort","prompt.read","flag.value","tool.list","tool.register","command.list","command.register","config.list","agent.list","agent.register","ui.toast","ui.status","ui.log","ui.notice","ui.invalidate","ui.open","ui.close","ui.panes","ui.copy","ui.blit","fs.read","fs.write","fs.list","fs.exists","fs.stat","fs.ancestors","store.get","store.set","store.delete","store.keys","state.get","state.set","clock.now","clock.sleep","clock.after","clock.every","http.fetch","process.run","process.spawn","settings.read","env.get","env.set"];
var Mts=Xe.filter((e)=>e!=="classic.PreToolUse");
var Ye=String.raw`(?!\p{Default_Ignorable_Code_Point})[\p{ID_Start}$_]`+String.raw`(?:(?!\p{Default_Ignorable_Code_Point})[\p{ID_Continue}$])*`;
var ac=["prepend","user","append","builtin","core"];
var y7e=(e)=>ac.indexOf(e);
function Lts(e,o){let r=y7e(o);return e.find((t)=>y7e(t.from)<r&&r<y7e(t.to))?.plugin};
var yyt=(e)=>({prepend:["append","builtin","core"],user:[],append:["core"],builtin:[],core:[]})[e];
var EJn=(e)=>yyt("prepend").includes(e);
function Nts(e,o){return Object.freeze([...e,Object.freeze({...o,to:e.reduce((r,t)=>y7e(t.to)>y7e(r)?t.to:r,o.to)})])};
var _7e=Object.freeze([]);
function XSn(e,o,r){let t=Nr(e);if(VE(e))return r.outermost.includes(t)?"prepend":"builtin";let n=[...o??[]].some((a)=>!VE(a)&&Nr(a)===t),s=(a)=>r[a].includes(t)&&(r.from[a]==="user"?!n:n),p=n?"prepend":"user",i=s("prepend")?"prepend":"append";return s("prepend")||s("append")?i:p};
var lt=new RegExp(`^${Ye}$`,"u");
function Ze(e){if(typeof e!=="string")return`${typeof e} is not an event name or a pattern (a string)`;let o=e.startsWith("!"),r=o?e.slice(1):e;if(o&&r==="*")return`"${e}" is not a pattern: it selects no event`;if(o&&r.startsWith("!"))return`"${e}" is not a pattern: "!" negates once`;let t=r==="*",n=r.endsWith(".*"),s=(n?r.slice(0,-2):r).split(".");if(!(t||s.every((i)=>lt.test(i))))return`"${e}" is not an event name or a pattern ("*", "<prefix>.*", or "!" before either)`;return{isNegated:o,selection:t?{kind:"every"}:n?{kind:"prefix",prefix:s.join(".")}:{kind:"name",name:r}}};
function eo(e){let o=Ze(e);if(typeof o==="string")throw new Oe(o);return o};
function npe(e,o){let{isNegated:r,selection:t}=eo(e),n;switch(t.kind){case"every":n=!0;break;case"prefix":n=o.startsWith(`${t.prefix}.`);break;case"name":n=o===t.name;break}return r?!n:n};
function VE(e){return e.endsWith(`@${_i}`)};

return {SJn,Xe,USn,Mts,Ye,ac,y7e,Lts,yyt,EJn,Nts,_7e,XSn,lt,Ze,eo,npe,VE};
}
function module13(imports){

function L(n){return[...new Set(n)]};
function wi(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")};

return {L,wi};
}
function module14(imports){

function r(n){return n};
function bn(n){return r(n)};

return {r,bn};
}
function module15(imports){
const bn=imports["bn"];
var sEt=(n)=>{if(n instanceof Error)return n;if(typeof n==="object"&&n!==null){try{let e=Object.prototype.toString.call(n);if(e==="[object Error]"||e==="[object DOMException]"){let t=Error(n.message,n.cause?{cause:n.cause}:{});if(n.stack)t.stack=n.stack;if(n.cause&&!t.cause)t.cause=n.cause;if(n.name)t.name=n.name;return t}}catch{}try{return Error(JSON.stringify(n))}catch{}}return Error(n)};
var $n=(()=>{class n extends Error{}return n})();
class xt extends $n{constructor(n,e,t,r,o){super(`${xt.makeMessage(n,e,t)}`);this.status=n,this.headers=r,this.requestID=r?.get("request-id"),this.workspaceID=r?.get("anthropic-workspace-id"),this.error=e,this.type=o??null}static makeMessage(n,e,t){let r=e?.message?typeof e.message==="string"?e.message:JSON.stringify(e.message):e?JSON.stringify(e):t;if(n&&r)return`${n} ${r}`;if(n)return`${n} status code (no body)`;if(r)return r;return"(no status code or body)"}static generate(n,e,t,r){if(!n||!r)return new Jd({message:t,cause:sEt(e)});let o=e,i=o?.error?.type;if(n===400)return new iEt(n,o,t,r,i);if(n===401)return new rHe(n,o,t,r,i);if(n===403)return new aEt(n,o,t,r,i);if(n===404)return new oHe(n,o,t,r,i);if(n===409)return new lEt(n,o,t,r,i);if(n===422)return new cEt(n,o,t,r,i);if(n===429)return new dEt(n,o,t,r,i);if(n>=500)return new uEt(n,o,t,r,i);return new xt(n,o,t,r,i)}};
class Dd extends xt{constructor({message:n}={}){super(void 0,void 0,n||"Request was aborted.",void 0)}};
class Jd extends xt{constructor({message:n,cause:e}){super(void 0,void 0,n||"Connection error.",void 0);if(e)this.cause=e}};
class iEt extends xt{};
class rHe extends xt{};
class aEt extends xt{};
class oHe extends xt{};
class lEt extends xt{};
class cEt extends xt{};
class dEt extends xt{};
class uEt extends xt{};
class Ye extends Error{constructor(n){super(n);this.name="AbortError"}};
function at(n){try{return n instanceof Ye||n instanceof Dd||n instanceof Error&&(n.name==="AbortError"||("__CANCEL__"in n)&&Boolean(n.__CANCEL__))}catch{return!1}};
function l(n){return n instanceof Error?n.message:String(n)};
function Ng(n){let e=n?.name;return typeof e==="string"&&/^[A-Z][a-zA-Z]{0,63}$/.test(e)?bn(e):void 0};

return {sEt,$n,xt,Dd,Jd,iEt,rHe,aEt,oHe,lEt,cEt,dEt,uEt,Ye,at,l,Ng};
}
function module16(imports){

function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
var m=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
var g=typeof String.prototype.toWellFormed==="function"?Function.prototype.call.bind(String.prototype.toWellFormed):void 0;
function wf(t){if(l)return l(t);return!m.test(t)};
function Fm(t){if(g)return g(t);return t.replace(a,"\uFFFD")};

return {re,f,x,m,a,l,g,wf,Fm};
}
function module17(imports){
const ct=imports["ct"];
const Ys=imports["Ys"];
const USn=imports["USn"];
const N=imports["N"];
const Mts=imports["Mts"];
const Oe=imports["Oe"];
const KF=imports["KF"];
const YF=imports["YF"];
const zs=imports["zs"];
const Xs=imports["Xs"];
const hi=imports["hi"];
const Bs=imports["Bs"];
const Ks=imports["Ks"];
const Xi=imports["Xi"];
const zi=imports["zi"];
const oa=imports["oa"];
const ra=imports["ra"];
const na=imports["na"];
const ea=imports["ea"];
const yi=imports["yi"];
const Ps=imports["Ps"];
const ui=imports["ui"];
const li=imports["li"];
const mi=imports["mi"];
const ri=imports["ri"];
const Fs=imports["Fs"];
const sa=imports["sa"];
const js=imports["js"];
const Ms=imports["Ms"];
const Us=imports["Us"];
const Ds=imports["Ds"];
const Ji=imports["Ji"];
const qi=imports["qi"];
const gi=imports["gi"];
const ti=imports["ti"];
const Wi=imports["Wi"];
const Fi=imports["Fi"];
const Vi=imports["Vi"];
const Di=imports["Di"];
const $i=imports["$i"];
const Ui=imports["Ui"];
const Ki=imports["Ki"];
const Bi=imports["Bi"];
const qs=imports["qs"];
const Zs=imports["Zs"];
const pa=imports["pa"];
const aa=imports["aa"];
const Pi=imports["Pi"];
const _i=imports["_i"];
const Ci=imports["Ci"];
const vi=imports["vi"];
const Ii=imports["Ii"];
const Ri=imports["Ri"];
const Hi=imports["Hi"];
const Vs=imports["Vs"];
const oi=imports["oi"];
const _7e=imports["_7e"];
const L=imports["L"];
const Lts=imports["Lts"];
const nd=imports["nd"];
const Md=imports["Md"];
const jjt=imports["jjt"];
const gF=imports["gF"];
const yyt=imports["yyt"];
const EJn=imports["EJn"];
const Nts=imports["Nts"];
const npe=imports["npe"];
const l=imports["l"];
const Vd=imports["Vd"];
const at=imports["at"];
const Syt=imports["Syt"];
const re=imports["re"];
const Ng=imports["Ng"];
const wf=imports["wf"];
const Fm=imports["Fm"];
var woe="engine";
var BBe=Object.freeze({plugin:woe,tier:"core"});
var JGo=Object.freeze([]);
function G0(e){return Object.setPrototypeOf(e,null),e};
var Bo=(e)=>G0((t,o)=>npe(t,e));
var Ko=Object.freeze({ms:0,remainingMs:Number.POSITIVE_INFINITY});
function EPe(e){let{call:t,signal:o,event:r,origin:n}=e,s=G0(t);if(s.to=G0(e.to),s.signal=o,s.is=e.is,s.event=r,s.origin=n,e.caught!==void 0)Object.assign(s,e.caught);return Object.defineProperty(s,"trace",{get:G0(e.trace),enumerable:!0}),Object.defineProperty(s,"budget",{get:G0(e.budget??(()=>Ko)),enumerable:!0}),Object.freeze(s)};
var GG={escape:String.raw`\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f`,placeholder:String.raw`\u{10eeee}`,loneSurrogate:String.raw`\ud800-\udfff`};
var H3=new RegExp(`[${String.raw`\t\n\r`}${GG.escape}${GG.loneSurrogate}${GG.placeholder}]`,"gu");
function ss(e,t){if(N(t)){let o=Object.create(null);for(let r of Object.keys(t).toSorted())Object.defineProperty(o,r,{value:t[r],enumerable:!0});return o}return t};
var is="\x00unserializable:";
function as(){let e=0;return()=>`${is}${++e}`};
var ps=as();
function Un(e){try{return JSON.stringify(e,ss)}catch{return ps()}};
var TPe=32;
var kPe=20000;
var LSn=4;
var NSn=(e)=>wf(e)?e:Fm(e);
var ms=4294967295;
function B(e){let t=e.length,r=typeof t!=="bigint"&&typeof t!=="symbol"?Math.max(Math.trunc(Number(t))||0,0):void 0;if(r===void 0||r>ms)throw new Oe(`a plugin's list claims a length no list has (got ${r??`a ${typeof t}`})`);return r};
function Re(e,t){let o=B(e);for(let r=0;r<o;r+=1)if(r in e&&!t(e[r]))return!1;return!0};
function Y(e){let t=B(e),o=[];o.length=t;for(let r=0;r<t;r+=1)if(r in e)o[r]=e[r];return o};
function fyt(e,t){if(typeof e==="string")return NSn(e);if(!Array.isArray(e)&&!gF(e))return e;if(t.copies.has(e))return t.copies.get(e);if(t.depth>=TPe*LSn||t.nodes>=kPe*LSn)return e;let r=Array.isArray(e)?Y(e).map((a,f)=>[String(f),a]):Object.entries(e);t.copies.set(e,e),t.nodes+=1,t.depth+=1;let n=r.map(([a,f])=>[t.isKeyed?NSn(a):a,fyt(f,t)]);t.depth-=1;let s=n.some(([a,f],m)=>a!==r[m]?.[0]||f!==r[m]?.[1]),i=Array.isArray(e)?n.map(([,a])=>a):Object.fromEntries(n),p=s?i:e;return t.copies.set(e,p),p};
var C=(e)=>(t,o,r)=>N(t)?e(t,o,r):"something that is not a result object";
function De(e,t,o){if(e.deny===void 0)return o(e)?void 0:`neither ${t} nor { deny }`;return typeof e.deny==="string"?o(e)?`a deny beside ${t}`:void 0:"a deny that is not a string"};
function gt(e,t,o=B(e)){for(let r=0;r<o;r+=1){let n=r in e?t(e[r]):void 0;if(n!==void 0)return[r,n]}return};
function OM(e){if(!Array.isArray(e))return;let t=B(e),o=[];for(let r=0;r<t;r+=1){let n=e[r];if(!(Object.hasOwn(e,r)&&typeof n==="string"))return;o.push(n)}return o};
var d7e=(e)=>OM(e)!==void 0;
function fe(e,t,o){let r=e.find((n)=>Un(t[n])!==Un(o[n]));if(!r)return;return`a changed ${r} (the envelope is the engine's; a rewrite keeps ${e.join(", ")})`};
function z0(e,t,o){let r=e.filter((s)=>!Object.hasOwn(t,s)&&Object.hasOwn(o,s));if(r.length===0)return t;let n={...t};for(let s of r)n[s]=o[s];return n};
var Gt=({event:e,check:t,checkArgument:o})=>({event:e,check:C(t),checkArgument:o});
function oe(e,...t){return typeof e==="string"&&!t.includes(e)?e.length:0};
var V=(e)=>({event:e,check:C((t)=>De(t,"{ value }",(o)=>Object.hasOwn(o,"value")))});
var qt=32000;
var Qt=(e,t)=>Object.fromEntries(e.map((o)=>[o,t(o)]));
function sr(e,t){if(Un(e.origin)!==Un(t.origin))return"a changed origin (the engine set it; next(e) passes it on)";return typeof e.text==="string"?void 0:"no { text } (a string)"};
var Zt=(e,t,o={restored:[],passedProblem:()=>{return}})=>({event:e,restoreArgument:(r,n)=>z0(["origin",...o.restored],r,n),checkArgument:(r,n)=>sr(r,n)??o.passedProblem(r),measureArgument:(r,n)=>oe(r.text,n.text),check:C((r)=>typeof r[t]==="boolean"?void 0:`no { ${t} } (true or false)`)});
var mr=(e)=>typeof e.cwd==="string"?void 0:"no { cwd }";
var cr=(e)=>typeof e.turnId==="string"?void 0:"no { turnId }";
var ur=["hook_event_name","session_id","transcript_path","cwd","scratchpad_dir","prompt_id","permission_mode","agent_id","agent_type","served_call","caller_session_id","effort"];
var lr=(e,t)=>fe(ur,e,t);
function dr(e){if(!N(e))return"an updatedPermissions entry that is not an object";if(!(typeof e.destination==="string"&&["userSettings","projectSettings","localSettings","session","cliArg"].includes(e.destination)))return"an updatedPermissions entry with an unknown destination";switch(e.type){case"addRules":case"replaceRules":case"removeRules":return(e.behavior==="allow"||e.behavior==="deny"||e.behavior==="ask")&&Array.isArray(e.rules)&&Re(e.rules,(r)=>N(r)&&typeof r.toolName==="string"&&(r.ruleContent===void 0||typeof r.ruleContent==="string"))?void 0:`an updatedPermissions ${e.type} without rules and a behavior`;case"setMode":return[...KF,YF].includes(e.mode)?void 0:"an updatedPermissions setMode with an unknown mode";case"addDirectories":case"removeDirectories":return d7e(e.directories)?void 0:`an updatedPermissions ${e.type} without directories`;default:return"an updatedPermissions entry of an unknown type"}};
function yr(e){let t=e===void 0;if(!N(e))return t?void 0:"a decision that is not an object";let o=e;if(o.behavior==="deny")return(o.message===void 0||typeof o.message==="string")&&(o.interrupt===void 0||typeof o.interrupt==="boolean")?void 0:"a deny decision whose message or interrupt has the wrong type";if(o.behavior!=="allow")return"a decision whose behavior is not allow or deny";if(!(o.updatedInput===void 0||N(o.updatedInput)))return"an allow decision whose updatedInput is not an object";let{updatedPermissions:n}=o,s=Array.isArray(n);return s||n===void 0?gt(s?n:[],dr)?.[1]:"an allow decision whose updatedPermissions is not a list"};
function gr(e){let{permissionDecision:t}=e;return t===void 0||t==="allow"||t==="deny"||t==="ask"?yr(e.decision):"a permissionDecision that is not allow, deny or ask"};
var xr=(e)=>[...["block","stopReason","sessionTitle","initialUserMessage","displayContent","permissionDecisionReason","worktreePath"].filter((t)=>e[t]!==void 0&&typeof e[t]!=="string"),...["preventContinuation","suppressOriginalPrompt","reloadSkills","retry"].filter((t)=>e[t]!==void 0&&e[t]!==!0),...["additionalContext","watchPaths"].filter((t)=>e[t]!==void 0&&!d7e(e[t]))];
function hr(e){let t=xr(e);return t.length>0?`${t.join(", ")} of the wrong type`:gr(e)};
function nJn(e){return{event:e,check:C(hr),checkArgument:lr}};
var Zi={event:"agent.offer",restoreArgument:(e,t)=>z0(["provider"],e,t),checkArgument:(e,t)=>{if(typeof e.agent!=="string")return"no { agent }";if(e.agent!==t.agent)return"a changed agent (the hooks beneath match on it)";if(typeof e.description!=="string")return"no { description }";if(e.source!==t.source)return"a changed source (the hooks beneath match on it)";return Un(e.provider)===Un(t.provider)?void 0:"a changed provider (pinned: who provides the agent is a fact)"},check:C((e)=>typeof e.isOffered==="boolean"?void 0:"no { isOffered } (a boolean)")};
var eu={...Qt(USn,V),...Qt(Mts,nJn),"ui.open":zs,"ui.close":Xs,"ui.blit":hi,"env.get":Bs,"env.set":Ks,"state.get":Xi,"state.set":zi,"classic.PreToolUse":oa,"tool.call":ra,"tool.check":na,"agent.offer":Zi,"agent.spawn":ea,"prompt.submit":yi,"prompt.fill":Ps,"prompt.suggest":Zt("prompt.suggest","isShown"),"prompt.edit":ui,"prompt.section":li,"prompt.context":mi,"prompt.attachment":ri,"prompt.compose":Fs,"tool.describe":sa,"command.run":js,"command.describe":Ms,"config.set":Us,"config.describe":Ds,"telemetry.log":Ji,"telemetry.mark":qi,"skill.prompt":gi,"attribution.text":ti,"session.receive":Wi,"session.append":Fi,"session.send":Vi,"session.compact":Di,"session.attach":$i,"session.detach":Ui,"session.measure":Ki,"session.end":Bi,"plugin.register":qs,"process.spawn":Zs,"session.start":Gt({event:"session.start",check:mr,checkArgument:mr}),"turn.start":Gt({event:"turn.start",check:cr,checkArgument:cr}),"turn.step":pa,"turn.complete":aa,"ui.render":Pi,"ui.resolve":_i,"ui.press":Ci,"ui.input":vi,"ui.select":Ii,"ui.message":Ri,"ui.scroll":Hi,"ui.focus":Vs,"engine.create":oi};
var Q=(e)=>e.isCore===!0||e.isManaged===!0;
var Ht=()=>({entry:void 0,beneath:void 0});
function tt(e,t){e.entry=Object.freeze(t)};
function Eo(e){let t=[];for(let o=e;o!==void 0;o=o.beneath)if(o.entry!==void 0)t.push(o.entry);return t.length===0?JGo:Object.freeze(t)};
var _d=({bottom:e,index:t,event:o})=>async(r,n,{run:s,floors:i})=>{let p=performance.now(),a="rejected",f;try{return f=await e(r,n,i),a="returned",f}finally{tt(s,{index:t,plugin:woe,tier:"core",event:o,outcome:a,ms:performance.now()-p,received:r,returned:f})}};
function Rn({handler:e,tier:t,index:o,site:r,e:n,descent:s}){let{run:i,floors:p}=s;if(p.length===0||Q(e))return;let m=(e.isHop===!0?e.tiers??[]:[t]).map((h)=>Lts(p,h)),d=m.length>0&&m.every((h)=>h!==void 0)?m[0]:void 0;if(d===void 0)return;let y=`bypassed by ${d}`;nd().log(`${e.name}: ${r.event} ${y} (tier ${t}); beneath runs`),tt(i,{index:o,plugin:e.name,tier:t,event:r.event,outcome:"skipped",reason:y,ms:0,received:n,returned:void 0});let u=Ht();return i.beneath=u,{run:u,floors:p}};
function Cn(e){if(!Md(e))Object.freeze(e);return e};
function je(e){let t=e.isCore===!0,o=t?"core":"prepend";return t||e.isManaged===!0?o:e.tier??"user"};
var bo=1e4;
var ot=ct(new Map,(e)=>{for(let t of e.values())clearTimeout(t.timer);e.clear()});
var O3=1000;
function ga(e,t){let o=ot.get(e);if(ot.delete(e),o!==void 0&&o.count>0)nd().log(`${t} ${o.count} more times in the last ${bo/O3}s (the last in ${o.lastMs.toFixed(1)}ms)`)};
function xa(e){let{plugin:t,tier:o,event:r,ms:n}=e,s=`${r} ${t}`,i=ot.get(s),p=`${t} (${o}) answered ${r} without next()`;if(i!==void 0){i.count+=1,i.lastMs=n;return}nd().log(`${p} in ${n.toFixed(1)}ms; nothing beneath it ran for this dispatch`);let a=setTimeout(ga,bo,s,p);a.unref(),ot.set(s,{count:0,lastMs:n,timer:a})};
var mbe=5000;
var Mt=new Vd;
async function aVr(e){let t=Mt.getStore();if(t===void 0)return e();t.pause();try{return await e()}finally{t.resume()}};
var rt=1000;
var ha=(e)=>e;
function ka(e,t){if(--e.pendingDownstream>0)return;if(e.beneathMs+=performance.now()-e.beneathSince,!e.settled)t.resume()};
function So(e,t=new Map){if(typeof e!=="object"||e===null)return e;let o=t.get(e);if(o!==void 0)return o;if(Array.isArray(e)){let n=[];t.set(e,n);for(let s of e)n.push(So(s,t));return n}if(!gF(e))return e;let r={};t.set(e,r);for(let n of Object.keys(e))Object.defineProperty(r,n,{value:So(e[n],t),enumerable:!0,writable:!0,configurable:!0});return r};
function jBe(e,t,o){if(o!==void 0&&o>qt)nd().log(`${e}: wrote a text of ${o} characters (${t}; over ${qt}, accepted: a plugin's text is its own to size)`)};
function nt({handler:e,site:t,e:o},r){let n=jjt(r,e.name),s=!Q(e)&&(t.checkArgument!==void 0||t.restoreArgument!==void 0),p=s&&!Object.is(n,o)?So(n):n,a=s?t.restoreArgument?.(p,o)??p:p,f=s?t.checkArgument?.(a,o):void 0;if(f!==void 0)throw new Oe(`${e.name}: next() passed an argument with ${f}`);if(s&&e.isHop!==!0)jBe(e.name,t.event,t.measureArgument?.(a,o));return ha(a)};
function _n(e,t,o){if(t.length===0)throw new Oe(`${o.plugin}: next.to() names no tier`);let r=yyt(o.tier);return t.toReversed().reduce((n,s)=>{if(!EJn(s))throw new Oe(`${o.plugin}: next.to names "${String(s)}", which is not a tier a dispatch continues at (append, builtin, core)`);if(r.length===0)throw new Oe(`${o.plugin}: next.to is available to managed plugins (prependPlugins / appendPlugins) only, not to a ${o.tier} hook`);if(!r.includes(s))throw new Oe(`${o.plugin}: next.to("${s}") skips nothing from ${o.tier}; a ${o.tier} hook may continue at `+yyt(o.tier).join(", "));return Nts(n,{from:o.tier,to:s,plugin:o.plugin})},e)};
function Oo(e){return e>=O3&&e%O3===0?`${e/O3}s`:`${e}ms`};
var wa="failed closed: its .catch answered";
function Le(e){let t=e instanceof Oe&&e.thrownName!==void 0?{name:e.thrownName}:e;return`errorKind=${e instanceof Error?Ng(t)??"Error":"unknown"} errorChars=${String(l(e)).length}`};
function Ta(e,t,o){return`hook failed closed: ${e}: ${Le(t)} (${o}; its .catch answered)`};
var st=(e,t)=>t.startsWith(`${e.name}: `)?t:`${e.name}: ${t}`;
function In(e){return nd().log(`hooks module ${e}: next() after it settled; refused`,"warn"),new Oe(`${e}: next() after it settled`)};
var Nn="...";
var Hn=120;
function jt(e){let t=(e.split(/\r?\n/u)[0]??"").replace(H3," ").trim();return t.length<=Hn?t:re(t,Hn-Nn.length)+Nn};
function Ao(e){if(!(e instanceof Error))return jt(String(e));let o=e instanceof Oe?e.thrownName:e.name,r=o===void 0?"":`${o}: `;return jt(`${r}${e.message}`)};
function Ea(e,t){let{expiredMs:o,lingeredMs:r,shape:n,caught:s}=t,i=s===void 0?"":`; ${s}`;if(o!==void 0)return{kind:"budget",why:`ran past its ${Oo(o)} budget${i}`};if(r!==void 0)return{kind:"lingered",why:`did not stop within ${Oo(r)} of the turn being interrupted`};return n!==void 0?{kind:"shape",why:`returned the wrong shape (${jt(n)})`}:{kind:"threw",why:`threw ${Ao(e)}${i}`}};
function ba({error:e,handler:t,site:o,effect:r,cause:n}){let s=st(t,l(e));if(nd().log(`hook failed: ${t.name}: ${Le(e)} (${o.event}; ${r})`,"error"),!Q(t))nd().hookFailed({plugin:t.name,environmentId:t.environmentId,event:o.event,reason:s,effect:r,hasOverrun:!1,skip:t.isHop===!0?void 0:Ea(e,n)});return s};
var Sa="skipped; what is below it ran in its place";
var Oa="skipped; its last next() run's result stands";
function Mn(e,t,o){let r=!1,n=()=>{r=!0};e.then(n,n),setTimeout(()=>{if(r||Q(t))return;let i=st(t,`still running ${mbe}ms after its budget ran out; ignores its signal`);nd().log(`hook overran: ${i} (${o.event})`,"error"),nd().hookFailed({plugin:t.name,event:o.event,reason:i,effect:"counted toward a runaway",hasOverrun:!0})},mbe).unref?.()};
function zE(e,t){if(e===void 0)return()=>{};if(e.aborted)return t.abort(e.reason),()=>{};let o=()=>t.abort(e.reason);return e.addEventListener("abort",o,{once:!0}),()=>e.removeEventListener("abort",o)};
function gy({handler:e,below:t,site:o,e:r,budget:n,downstreamSignal:s,state:i,run:p,floors:a,tier:f}){async function m(y,u,h=a){let A=o.raiseArgument?.(y)??y;if(i.pendingDownstream++===0)n.pause(),i.beneathSince=performance.now();let x=new AbortController,_=zE(s,x),b=zE(u,x),H=Ht();if(!s.aborted)p.beneath=H;let S=t(A,x.signal,{run:H,floors:h}).then((R)=>{let I=o.carry===void 0?R:o.carry(R,A,r);return i.belowRejected=void 0,i.fromBelow=[...i.fromBelow,I],I},(R)=>{throw i.belowRejected={error:R},R});i.inFlight=S;try{return await S}finally{_(),b(),ka(i,n)}}function c(y){let u=nt({handler:e,site:o,e:r},y);if(i.settled)throw In(e.name);return u}let d=(y)=>_n(a,y,{plugin:e.name,tier:f});return{runBelow:m,call:async(y,u,h)=>m(c(y),u,h),to:async(y,u)=>m(c(y),void 0,d(u)),replay:async(y,u,h)=>i.inFlight??m(nt({handler:e,site:o,e:r},y),u,h),replayTo:async(y,u)=>i.inFlight??m(nt({handler:e,site:o,e:r},y),void 0,d(u))}};
var lVr=(e)=>Promise.reject(new Oe(`no implementation for ${e.event}`));
var Aa=(e,t)=>({name:t.map((o)=>o.name).join("+"),tier:t[0]?.tier,tiers:L(t.map(je)),...t.at(-1)?.answersForEngine&&{answersForEngine:!0},budgetMs:0,isHop:!0,run:(o,r,{call:n,floors:s,cutAt:i})=>e.run({members:t,e:o,call:n,signal:r.signal,origin:r.origin,floors:s,cutAt:i})});
var va=(e)=>e.reduce((t,o)=>{let r=t.at(-1);return o.hop!==void 0&&r?.hop?.key===o.hop.key?[...t.slice(0,-1),{hop:r.hop,members:[...r.members,o]}]:[...t,{hop:o.hop,members:[o]}]},[]);
var Oy=(e)=>va(e).map((t)=>{let o=t.hop;return o===void 0?t.members[0]:Aa(o,t.members)});
var J7n=ct(Ys(),(e)=>e.set(void 0));
var Q7n=()=>J7n.get();
var dyt=()=>Q7n()!==void 0;
async function Ex({e,handlers:t,site:o,signal:r=new AbortController().signal,cutAt:n,budgetMs:s=o.budgetMs??gbe,bottom:i,origin:p=BBe,floors:a=_7e,trace:f}){let m=Oy(t),c=_d({bottom:i??(()=>lVr(o)),index:m.length,event:o.event}),d=Ht(),y=dyt();return m.reduceRight((u,h,A)=>{let x=A===m.length-1;return Cy({handler:h,index:A,below:u,site:o,budgetMs:s,cutAt:n,origin:p,nothingBelow:i===void 0&&x,answersForEngine:y&&x&&h.answersForEngine===!0})},c)(e,r,{run:d,floors:a}).then((u)=>(f?.(Eo(d)),u)).catch((u)=>{if(!Ge(u,r))nd().log(`hooks chain failed: ${Le(u)}`,"error");throw u})};
function Pa(e,t){let o=e,r=Date.now(),n,s=!1,i=!1,p=()=>{},a=Ln(new Promise((d,y)=>{p=y}));function f(){s=!0,p(new Oe(t))}function m(){r=Date.now(),i=!0,n=setTimeout(f,o)}let c=()=>i?Math.max(0,o-(Date.now()-r)):o;return m(),{expired:a,isExpired:()=>s,remainingMs:()=>s?0:c(),pause(){clearTimeout(n),o=c(),i=!1},resume:m,clear:()=>clearTimeout(n),rearm(){if(s)return;if(o=e,clearTimeout(n),i)m()}}};
function Ln(e){return e.catch(()=>{}),e};
function vo(e,t,o){let r=()=>o===void 0?Number.POSITIVE_INFINITY:Math.max(0,o-Date.now()),n=Math.min(e<=0?Number.POSITIVE_INFINITY:e,r());if(e<=0)return{expired:void 0,isExpired:()=>!1,reading:()=>o===void 0?Ko:Object.freeze({ms:n,remainingMs:r()}),hasGraceExpired:()=>!1,pause(){},resume(){},clear(){},rearm(){}};let s=0,i=!1,p,a=Pa(e,`exceeded ${e}ms budget`),f=Promise.withResolvers();function m(){if(p=Pa(mbe,`did not settle within ${mbe}ms of its signal aborting`),s>0)p.pause();p.expired.catch(f.reject)}let c=zE(t,{abort:m});return{expired:Ln(Promise.race([a.expired,f.promise])),isExpired:()=>a.isExpired(),reading:()=>Object.freeze({ms:n,remainingMs:Math.min(a.remainingMs(),r())}),hasGraceExpired:()=>p?.isExpired()??!1,pause(){if(s++===0)a.pause(),p?.pause()},resume(){if(--s===0&&!i)a.resume(),p?.resume()},clear(){i=!0,a.clear(),p?.clear(),c()},rearm(){if(!i)a.rearm()}}};
var gbe=1e4;
var Ro=({call:e,to:t,signal:o,event:r,origin:n,run:s,budget:i,caught:p})=>EPe({call:e,to:(a,...f)=>t(a,f),signal:o,is:Bo(r),event:r,origin:n,trace:()=>Eo(s.beneath),budget:()=>i.reading(),caught:p});
var Ia=()=>({pendingDownstream:0,settled:!1,inFlight:void 0,fromBelow:[],belowRejected:void 0,beneathMs:0,beneathSince:0});
var Ge=(e,t)=>t.aborted&&(at(e)||l(e)===Syt(t));
function Fy(e,t){return t!==void 0?`its .catch returned ${t}`:e};
function Na({kind:e,error:t,rejection:o}){let r=e==="throw",n=o===void 0?void 0:l(o.error);return r?l(t):n};
async function By({handler:e,e:t,signal:o,state:r,handle:n,site:s,origin:i,run:p,cutAt:a,kind:f,error:m}){let c=e.catch;if(c===void 0)return{answer:void 0,problem:void 0};let d=r.inFlight!==void 0;await r.inFlight?.then(void 0,()=>{return});let y=Na({kind:f,error:m,rejection:r.belowRejected}),u=new AbortController,h=zE(o,u),A=!1,x=`${e.name}: next() after its .catch settled`,_=(R)=>A?Promise.reject(new Oe(x)):aVr(R),b=vo(rt,o,a),H=Ro({call:(R,I,K)=>_(()=>n.replay(R,I,K)),to:(R,I)=>_(()=>n.replayTo(R,I)),signal:u.signal,event:s.event,origin:i,run:p,budget:b,caught:{error:Object.freeze({kind:f,...y===void 0?{}:{message:y},budget:rt}),called:d}}),S=Mt.run(b,()=>c(t,H));try{return{answer:b.expired===void 0?await S:await Promise.race([S,b.expired]),problem:void 0}}catch(R){if(Ge(R,o))throw R;let I=Oo(rt),K=b.isExpired(),M=K?`its .catch ran past its ${I} grace`:`its .catch threw ${Ao(R)}`;if(u.abort(new Oe(`${e.name}: ${M}`)),K)Mn(S,e,s);return{answer:void 0,problem:M}}finally{A=!0,b.clear(),h()}};
var Cy=({handler:e,index:t,below:o,site:r,budgetMs:n,cutAt:s,origin:i,nothingBelow:p,answersForEngine:a})=>async(f,m,c)=>{let{run:d,floors:y}=c,u=je(e),h=Rn({handler:e,tier:u,index:t,site:r,e:f,descent:c});if(h!==void 0)return o(f,m,h);let A=performance.now(),x=Ia(),_=new AbortController,b=zE(m,_),H=new AbortController,S=zE(m,H),R=e.budgetMs??n,I=vo(R,m,s),K=Cn(f),M=gy({handler:e,below:o,site:r,e:f,budget:I,downstreamSignal:_.signal,state:x,run:d,floors:y,tier:u}),{call:F,to:X,runBelow:Ne}=M,ue=Ro({call:F,to:X,signal:H.signal,event:r.event,origin:i,run:d,budget:I});function Ee(j){return nd().log(`${e.name}: its next() rejected below it (${r.event}); the rejection passes up`),j}function z(j){let W=r.settle,J=Q(e)||W===void 0;try{let q=J?j:W(j),se=Q(e)?q:r.restoreResult?.(q,x.fromBelow,f)??q,ie=Q(e)||a?se:r.stripResult?.(se,x.fromBelow)??se,$e=Q(e)?void 0:r.check?.(ie,f,x.fromBelow);if($e===void 0&&!Q(e)&&e.isHop!==!0)jBe(e.name,r.event,r.measure?.(ie,f,x.fromBelow));return{settled:ie,problem:$e}}catch(q){let le=`a result the site cannot read (${l(q)})`;return{settled:j,problem:le}}}let ye,ge,pe="rejected",xe=!1,Z,ne;try{Z=Mt.run(I,()=>e.run(K,ue,{call:F,floors:y,cutAt:s}));let W=I.expired===void 0?await Z:await Promise.race([Z,I.expired]);if(W===void 0)throw ne="no result",new Oe("returned no result");let{settled:J,problem:q}=z(W);if(q!==void 0)throw ne=q,new Oe(`returned ${q}`);ye=J,ge=J,pe=W===x.fromBelow.at(-1)?"passed":"returned",xe=x.inFlight===void 0&&!Q(e)&&e.isHop!==!0}catch(j){if(Ge(j,m))throw j;let W=I.isExpired(),J=W?void 0:x.belowRejected;if(J!==void 0&&e.catch===void 0)throw Ee(J.error);let q=st(e,l(j));if(x.settled=!0,W&&Z!==void 0)H.abort(new Oe(q)),Mn(Z,e,r);let se=x.inFlight!==void 0,le=m.aborted?{answer:void 0,problem:void 0}:await By({handler:e,e:K,signal:m,state:x,handle:M,site:r,origin:i,run:d,cutAt:s,kind:W?"timeout":"throw",error:j}),ie=le.answer===void 0?void 0:z(le.answer);if(ie!==void 0&&ie.problem===void 0)nd().log(Ta(e.name,j,r.event),"warn"),nd().hookFailed({plugin:e.name,environmentId:e.environmentId,event:r.event,reason:q,effect:wa,hasOverrun:!1}),ye=ie.settled,ge=ie.settled,pe="caught";else if(J===void 0){if(ba({error:j,handler:e,site:r,effect:se?Oa:Sa,cause:{expiredMs:W?R:void 0,lingeredMs:I.hasGraceExpired()?mbe:void 0,shape:ne,caught:Fy(le.problem,ie?.problem)}}),x.inFlight===void 0&&p)throw j;ye=await(x.inFlight??Ne(f)),ge=se?ye:void 0,pe=W?"expired":se?"kept":"skipped"}else throw Ee(J.error)}finally{x.settled=!0,I.clear(),S(),b();let j=performance.now(),W=j-A-x.beneathMs-(x.pendingDownstream>0?j-x.beneathSince:0);if(tt(d,{index:t,plugin:e.isCore===!0?woe:e.name,tier:u,event:r.event,outcome:pe,ms:W,received:f,returned:ge}),xe)xa({plugin:e.name,tier:u,event:r.event,ms:W});if(x.pendingDownstream>0)_.abort(new Oe(`${e.name} settled the call`))}return ye};
var _Jn=ct(Ys(),(e)=>e.set(void 0));
var Fo=(e)=>_Jn.get()?.get(e);
var PVr=(e)=>Fo(e)!==void 0;

return {woe,BBe,JGo,G0,Bo,Ko,EPe,GG,H3,ss,is,as,ps,Un,TPe,kPe,LSn,NSn,ms,B,Re,Y,fyt,C,De,gt,OM,d7e,fe,z0,Gt,oe,V,qt,Qt,sr,Zt,mr,cr,ur,lr,dr,yr,gr,xr,hr,nJn,Zi,eu,Q,Ht,tt,Eo,_d,Rn,Cn,je,bo,ot,O3,ga,xa,mbe,Mt,aVr,rt,ha,ka,So,jBe,nt,_n,Oo,wa,Le,Ta,st,In,Nn,Hn,jt,Ao,Ea,ba,Sa,Oa,Mn,zE,gy,lVr,Aa,va,Oy,J7n,Q7n,dyt,Ex,Pa,Ln,vo,gbe,Ro,Ia,Ge,Fy,Na,By,Cy,_Jn,Fo,PVr};
}
function module18(imports){
const ut=imports["ut"];
const t=imports["t"];
const gF=imports["gF"];
const FQ=imports["FQ"];
const ct=imports["ct"];
const VVr=imports["VVr"];
const Bjt=imports["Bjt"];
const nd=imports["nd"];
const zVr=imports["zVr"];
const l=imports["l"];
const _yt=imports["_yt"];
const Oe=imports["Oe"];
const KVr=imports["KVr"];
const PVr=imports["PVr"];
const BBe=imports["BBe"];
var _e=(e)=>typeof e==="string"?e:`${e.plugin}#${e.registration}`;
var ZNt=(e)=>(e??[]).map(_e).join(" > ");
var QNt=(e)=>typeof e==="string"?e:e.plugin;
function Et(e,r){let n=new Set;for(let i of e??[]){if(QNt(i)!==r)continue;if(typeof i==="string")return"every";n.add(i.registration)}return[...n].sort((i,s)=>i-s)};
var Ee=ct(new Map,(e)=>e.clear());
var Me=ct(new Set,(e)=>e.clear());
function G(e,r,n){let i=`${e.name}#${e.environmentId} ${r}`,s=Ee.get(i)??0;if(s>=VVr)return;Ee.set(i,s+1);let a=Bjt(e.matcherFor(r),n);if(a===void 0)return;let c=`${i} ${a.path}`;if(Me.has(c))return;Me.add(c),nd().log(zVr(e.name,r,a),"warn")};
function cFr(e,r,n){let i=e.matcherFor(r);if(i===void 0)return!0;try{if(_yt(i,n))return!0}catch(s){return t(`hooks module ${e.label}: on('${r}') matcher threw on the host (${l(s)}); the hop decides`),!0}return G(e,r,n),!1};
function Ae(e,r,{keys:n,e:i}){let s=e.matcherFor(r);if(s===void 0||!gF(i))return!1;try{let c=n.some((p)=>Object.hasOwn(i,p)&&!FQ(s,p,i[p]));if(c)G(e,r,i);return c}catch(c){return t(`hooks module ${e.label}: on('${r}') matcher threw on the host (${l(c)}); the hop decides`),!1}};
function se(e,r,n){if(!n||n.length===0)return e;let i=Et(n,e.name);if(i==="every"){t(`hooks module ${e.label} ${r} skipped: re-entry (the plugin's own code raised it; origin ${ZNt(n)})`);return}let s=e.registrationsFor(r),a=i.filter((c)=>s.includes(c));if(a.length===0)return e;if(!e.hooks(r,a)){t(`hooks module ${e.label} ${r} skipped: re-entry (its own frame is being dispatched; origin ${ZNt(n)})`);return}return t(`hooks module ${e.label} ${r}: hooks ${a.join(", ")} left out for re-entry (origin ${ZNt(n)})`),{...e,leftOut:a,hooks:(c,p=[])=>e.hooks(c,[...a,...p]),matcherFor:(c,p=[])=>e.matcherFor(c,[...a,...p])}};
function ypt(e,r,{only:n,e:i,among:s,pinned:a}={}){let c=(s??ut().loadedModules).flatMap((g)=>{if(!g.hooks(e)||g.name!==(n??g.name))return[];let m=se(g,e,r);return m===void 0||a!==void 0&&Ae(m,e,a)?[]:[m]});if(i===void 0)return c;let p=c.findIndex((g)=>cFr(g,e,i));return p===-1?[]:c.slice(p)};
function fe(e,r){let n=[];for(let i of e){let s=i.status();if(s.kind!=="live"){let a=s.kind==="retiring"||s.kind==="unloaded"&&s.retired,c=s.kind==="unloaded";t(`hooks module ${a?`${i.label}: its environment was retired by a reload during ${r}`:c?`${i.label}: its environment was unloaded (during ${r})`:`${i.label}: ${s.reason} (during ${r})`}; passing on`);continue}n.push(i)}return n};
function N3n(e,r,n){let i=e.matcherFor(r),s=e.hopKey.kind==="worker";if(i===void 0)return!0;let a=s?KVr(i,n):_yt(i,n);if(!a)G(e,r,n);return a};
function ce(e,r,n){let i=fe(e,r),s=i.findIndex((a)=>N3n(a,r,n));return s===-1?[]:i.slice(s)};
var le=(e,r,n)=>e.map((i)=>{let s=r.get(i);if(s===void 0)throw new Oe(`${n}: a hop member is not one of these handlers`);return s});
var Ne=({loaded:e,event:r,origin:n,raise:i,owners:s})=>({name:e.name,tier:e.tier,...PVr(e.args.modulePath)&&{answersForEngine:!0},run:(a,c,{call:p,floors:g,cutAt:m})=>U3n({members:[e],event:r,e:a,call:p,signal:c.signal,hookOrigin:n,raise:i,origin:c.origin,floors:g,cutAt:m}),hop:{key:e.hopKey,run:(a)=>U3n({members:le(a.members,s,r),event:r,e:a.e,call:a.call,signal:a.signal,hookOrigin:n,raise:i,origin:a.origin,floors:a.floors,cutAt:a.cutAt})}});
var Ue=(e)=>e;
var It=(e)=>e;
function aJ(e){let r=e?.at(-1);if(r===void 0)return BBe;let n=QNt(r),{loadedModules:i,moduleSeats:s}=ut(),c=i.find((p)=>p.name===n)?.tier??s.get(n)??"user";return Object.freeze({plugin:n,tier:c})};
var F3n=(e)=>e.map((r)=>r.label).join(", ");
function pe({members:e,event:r,e:n,hookOrigin:i,origin:s,raise:a,floors:c,cutAt:p,kind:g}){let[m]=e;if(i)t(`hooks module ${F3n(e)}: ${r}${g} nested in ${ZNt(i)}`);let y=e.flatMap((w)=>{let h=[...w.leftOut??[]],{environmentId:S}=w;return h.length>0?[{environmentId:S,registrations:h}]:[]});return{id:m?m.hopKey.nextDispatchId():0,event:r,payload:n,environments:e.map((w)=>w.environmentId),leftOut:y.length===0?void 0:y,origin:s,hookOrigin:i,raise:a,floors:c.length===0?void 0:c,cutAt:p}};
async function U3n(e){let{event:r,e:n,call:i,signal:s,floors:a}=e,c=ce(e.members,r,n),p=c[0]?.hopKey;if(!p)return i(n,void 0,a);let g=(S,k,v)=>i(S,k,v),m=performance.now();for(let S of c)S.enter();let y;try{y=await p.dispatch(pe({...e,members:c,kind:""}),g,s)}finally{for(let S of c)S.leave()}let h=typeof n==="object"&&"requestId"in n&&typeof n.requestId==="string"?` key=${n.requestId}`:"";return t(`hooks module ${F3n(c)} ${r} settled in ${(performance.now()-m).toFixed(1)}ms (${p.kind} hop, next() included)${h}`),Ue(y.result)};
function me(e,r,n){e.leave(),t(`hooks module ${e.label} ${r} settled in ${(performance.now()-n).toFixed(1)}ms (native link, next() included)`)};
function de({loaded:e,event:r,origin:n},i){let s=fe([e],r).length===1&&N3n(e,r,i);if(s&&n)t(`hooks module ${e.label} (native): ${r} nested in `+ZNt(n));return s};
function Qt(e){let{loaded:r,event:n,origin:i}=e;if(r.link===void 0)throw new Oe(`${r.name}: ${n}: not a native module; it runs in a hop`);let s=r.link({event:n,leftOut:r.leftOut,hookOrigin:i}),a=s.catch;async function c(m){let y=performance.now();r.enter();try{return await m()}finally{me(r,n,y)}}async function p(m,y){r.enter();try{return await a?.(m,y)}finally{r.leave()}}let g=(m,y,w)=>de({loaded:r,event:n,origin:i},m)?c(()=>s.run(m,y,w)):y(m);return It({...s,run:g,...a!==void 0&&{catch:p}})};
function Ve(e){return e.loaded.link!==void 0?Qt(e):Ne(e)};
function S0(e,r,n={}){let i=[],s=new Map;for(let a of ypt(e,r,n)){let c=Ve({loaded:a,event:e,origin:r,raise:n.raise,owners:s});s.set(c,a),i.push(c)}return i};

return {_e,ZNt,QNt,Et,Ee,Me,G,cFr,Ae,se,ypt,fe,N3n,ce,le,Ne,Ue,It,aJ,F3n,pe,U3n,me,de,Qt,Ve,S0};
}
function module19(imports){
const fyt=imports["fyt"];
var e9e=(e)=>fyt(e,{copies:new Map,nodes:0,depth:0,isKeyed:!1});

return {e9e};
}
function module20(imports){
const byt=imports["byt"];
const ge=imports["ge"];
const TS=imports["TS"];
const ut=imports["ut"];
const Bl=imports["Bl"];
const _i=imports["_i"];
const Nr=imports["Nr"];
const gCn=imports["gCn"];
const Xo=imports["Xo"];
const ir=imports["ir"];
var a8e="cc-plugin-sec-default";
var uft=a8e+"@"+_i;
function p9(){let e=ge("policySettings");return e!==null&&Object.keys(e).length>0};
function I$r(e){let n=e!==void 0,o=e?.indexOf(uft)??-1,a=o!==-1,i=p9()||gCn(),d=n||i?void 0:ir(),s=d==="team"||d==="enterprise",u=n?a:i||s,l=n?a?`seated by managed prependPlugins at position ${o+1}`:"not seated: managed prependPlugins does not list it":i?"seated outermost: this machine has managed settings":s?`seated outermost: the organization is ${d}`:`not seated: no managed settings and not a Team or Enterprise organization (${d??"none"})`;return{outermost:u?[uft]:[],seat:`${uft} ${l}`}};
function I1(){let e=byt();if(e)return new Set(e.managedIds);let n=ge("policySettings")?.enabledPlugins;if(!n)return null;let o=new Set;for(let[a,i]of Object.entries(n))if(i===!0&&a.includes("@"))o.add(TS(a));return o.size>0?o:null};
function DN(){let e=I1();if(e===null||byt())return e;let n=ut().vouchedManagedPluginIds,o=[...e].filter((a)=>Bl(a)===_i||n.has(Nr(a)));return o.length>0?new Set(o):null};
function jq(){let e=byt();if(e)return e.order;let n=p9()||gCn(),o=Xo().includes("userSettings")?ge("userSettings"):null,a=n?void 0:I$r(),i=a!==void 0&&a.outermost.length>0,r=!n&&!i,d=n?ge("policySettings"):r?o:null,s=["prependPlugins","appendPlugins"],[u,l]=s.map((m)=>{let c=d?.[m]?.map((p)=>TS(Nr(p)));return{ids:c,from:c===void 0?"none":n?"policy":"user",shadowed:!r&&o?.[m]!==void 0}}),f=a??I$r(u.ids);return{prepend:u.ids??[],append:l.ids??[],from:{prepend:u.from,append:l.from},shadowed:s.filter((m,c)=>[u,l][c].shadowed),...i&&{shadowedBy:"seat"},...f}};

return {a8e,uft,p9,I$r,I1,DN,jq};
}
function module21(imports){

var c={Task:"Agent",KillShell:"TaskStop",KillBash:"TaskStop",ListPeers:"ListAgents",Brief:"SendUserMessage",ListMcpResources:"ListMcpResourcesTool",ReadMcpResource:"ReadMcpResourceTool",ReadMcpResourceDir:"ReadMcpResourceDirTool"};
function Zl(e){return Object.hasOwn(c,e)?c[e]:e};
function bfe(e,n){let t=n&&Object.hasOwn(n,e)?n[e]:void 0;return t!==void 0&&t!==e?[e,t]:[e]};
function sA(e){return e.includes("*")};
function Q8(e,n){return new RegExp(`^${e.split("*").map((r)=>r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join(".*")}$`,"s").test(n)};
function O0e(e,n){return Q8(e,n)};
function $Xr(e){return UXr(e).replaceAll("\\\\","\\")};
function UXr(e){return e.replaceAll("\\(","(").replaceAll("\\)",")")};
function rWe(e){let n=C(e,"("),t=R(e,")");if(n===-1&&t===-1)return{kind:"bare"};let r=e.substring(0,n);if(n===-1||t<=n||t!==e.length-1||/[()]/.test(r))return{kind:"malformed"};return{kind:"call",toolName:r,rawContent:e.substring(n+1,t)}};
function jn(e){let n=rWe(e);if(n.kind!=="call"||!n.toolName)return{toolName:Zl(e)};if(n.rawContent===""||n.rawContent==="*")return{toolName:Zl(n.toolName)};let t=$Xr(n.rawContent);return{toolName:Zl(n.toolName),ruleContent:t}};
function C(e,n){for(let t=0;t<e.length;t++)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1};
function R(e,n){for(let t=e.length-1;t>=0;t--)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1};

return {c,Zl,bfe,sA,Q8,O0e,$Xr,UXr,rWe,jn,C,R};
}
function module22(imports){

var Li=["userSettings","projectSettings","localSettings","flagSettings","policySettings"];

return {Li};
}
function module23(imports){

function An(e){let t=e.replace(/[^a-zA-Z0-9_-]/g,"_");if(e.startsWith("claude.ai "))t=t.replace(/_+/g,"_").replace(/^_|_$/g,"");return t};

return {An};
}
function module24(imports){
const An=imports["An"];
const sA=imports["sA"];
const O0e=imports["O0e"];
function us(e){let n=e.split("__"),[r,t,...o]=n;if(r!=="mcp"||!t)return null;let s=o.length>0?o.join("__"):void 0;return{serverName:t,toolName:s}};
function Ds(e){return`mcp__${An(e)}__`};
function Pa(e,n){return`${Ds(e)}${An(n)}`};
function cm(e){return e.mcpInfo?Pa(e.mcpInfo.serverName,e.mcpInfo.toolName):e.name};
function CAn(e,n){let r=us(e),t=us(n);return r!==null&&t!==null&&r.serverName===t.serverName&&(r.toolName===void 0||r.toolName==="*"||t.toolName!==void 0&&sA(r.toolName)&&O0e(r.toolName,t.toolName))};

return {us,Ds,Pa,cm,CAn};
}
function module25(imports){
const n=imports["n"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function U(){return n()};

return {V,U};
}
function module26(imports){
const V=imports["V"];
const U=imports["U"];
var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
function _(){let e=uA();return e!==void 0&&r.has(e)};
class d{entrypoint=void 0;interactive=!1;spawnedByAttendedSession=void 0;childSession=!1;claudecode=!1;coworkFrameArtifacts=!1;hostScheduledRun=!1;chromeTabGroupKey=void 0;remoteControlOwnerDeclared=!1;setEntrypoint(e){this.entrypoint=e}setInteractive(e){this.interactive=e}setSpawnedByAttendedSession(e){this.spawnedByAttendedSession=e}setChildSession(e){this.childSession=e}setClaudecode(e){this.claudecode=e}setCoworkFrameArtifacts(e){this.coworkFrameArtifacts=e}setHostScheduledRun(e){this.hostScheduledRun=e}setChromeTabGroupKey(e){this.chromeTabGroupKey=e}setRemoteControlOwnerDeclared(e){this.remoteControlOwnerDeclared=e}};
var C=new V(()=>new d);
function n(){return C.of(U().host)};
function uA(){return n().entrypoint};
function hu(){return _()&&!n().childSession};

return {r,_,d,C,n,uA,hu};
}
function module27(imports){
const Ff=imports["Ff"];
const Li=imports["Li"];
const jn=imports["jn"];
const cm=imports["cm"];
const bfe=imports["bfe"];
const sA=imports["sA"];
const O0e=imports["O0e"];
const CAn=imports["CAn"];
const hu=imports["hu"];
var Txe=[...Li,"cliArg","command","session","toolsNarrowing","mcpServerPolicy","hostCredential"];
function OSe(e){return!e.mcpInfo&&Ff.has(e.name)};
function iBt(e,n){let r=[];for(let s of Txe){let g=e[s];if(g===void 0)continue;for(let h of g)r.push({source:s,ruleBehavior:n,ruleValue:jn(h)})}return r};
function Su(e){return iBt(e.alwaysDenyRules,"deny")};
function Ar(e,n,{proxyExpansion:r=!1,globMatching:s=!1,toolAliases:g}={}){let h=cm(e);if(n.ruleValue.toolName===h)return!0;let w="familyParentToolName"in e?e.familyParentToolName:void 0;if(w!==void 0&&e.mcpInfo===void 0&&n.ruleValue.toolName===w)return!0;if(r&&bfe(n.ruleValue.toolName,g).includes(h))return!0;if(s&&sA(n.ruleValue.toolName)&&O0e(n.ruleValue.toolName,h))return!0;return CAn(n.ruleValue.toolName,h)};
function Tr(e){return e.source!=="cliArg"&&e.source!=="toolsNarrowing"};
function Z2(e,n,r){let s={proxyExpansion:Tr(r),globMatching:!0,toolAliases:e.toolAliases};if(Ar(n,r,s))return!0;if(("aliasSkillToolNames"in n?n.aliasSkillToolNames:void 0)?.some((w)=>Ar({name:w},r,s)))return!0;let h="packagingAliasSkillToolNames"in n?n.packagingAliasSkillToolNames:void 0;if(h===void 0||sA(r.ruleValue.toolName)&&!hu())return!1;return h.some((w)=>Ar({name:w},r,s))};
function zs(e,n,r){if(OSe(n))return null;return(r??Su(e)).find((s)=>Go(n,s,e))||null};
function Go(e,n,r){return n.ruleValue.ruleContent===void 0&&Z2(r,e,n)};
function $2o(e,n,r){let s=new Set;for(let g of Su(n))if(g.ruleValue.toolName===r&&g.ruleValue.ruleContent!==void 0)s.add(g.ruleValue.ruleContent);return e.filter((g)=>!s.has(g.agentType))};

return {Txe,OSe,iBt,Su,Ar,Tr,Z2,zs,Go,$2o};
}
function module28(imports){

var hr="WebFetch";
var rbe="allow_web_fetch";

return {hr,rbe};
}
function module29(imports){
const Mt=imports["Mt"];
const yt=imports["yt"];
const V1e=imports["V1e"];
const wZn=imports["wZn"];
const dd=imports["dd"];
const dyt=imports["dyt"];
const eu=imports["eu"];
const LX=imports["LX"];
const NX=imports["NX"];
const SF=imports["SF"];
const e7=imports["e7"];
const t7=imports["t7"];
const zX=imports["zX"];
const BX=imports["BX"];
const $X=imports["$X"];
const yG=imports["yG"];
const GX=imports["GX"];
const UX=imports["UX"];
const qX=imports["qX"];
const ZX=imports["ZX"];
const n7=imports["n7"];
const JX=imports["JX"];
const QX=imports["QX"];
const hDr=imports["hDr"];
const lot=imports["lot"];
const dot=imports["dot"];
const VX=imports["VX"];
const KX=imports["KX"];
const vot=imports["vot"];
const wot=imports["wot"];
const nQ=imports["nQ"];
const rQ=imports["rQ"];
const Oe=imports["Oe"];
const sxn=imports["sxn"];
const S0=imports["S0"];
const ypt=imports["ypt"];
const Ex=imports["Ex"];
const aJ=imports["aJ"];
const e9e=imports["e9e"];
const BBe=imports["BBe"];
const XSn=imports["XSn"];
const DN=imports["DN"];
const jq=imports["jq"];
const jn=imports["jn"];
const zs=imports["zs"];
const hr=imports["hr"];
const a=imports["a"];
const on=imports["on"];
const rbe=imports["rbe"];
const $2o=imports["$2o"];
const pe=imports["pe"];
const wi=imports["wi"];
const AG=imports["AG"];
const M9=imports["M9"];
const ir=imports["ir"];
const FM=imports["FM"];
var bX={site:eu["agent.offer"],core:{name:"core",isCore:!0,budgetMs:0,run:async()=>({isOffered:!0})}};
var xtt=(e)=>e!==void 0&&wZn(e)!==void 0;
function wX(e,n,r){let s=r===void 0?[]:[r];return e===void 0||n.length===0?[...n,...s]:[e,...n,...s]};
var vX=(e)=>e.to==="collector"?e:{...e,to:e.to??"anthropic"};
var Att={"tool.call":(e)=>({...e,tool_use_id:e.tool_use_id??`toolu_${sxn().replace(/-/g,"")}`}),"tool.check":(e)=>e,"tool.describe":(e)=>e,"command.run":(e)=>e,"command.describe":(e)=>e,"config.set":(e)=>e,"config.describe":(e)=>e,"telemetry.log":vX,"telemetry.mark":(e)=>e,"prompt.submit":(e)=>e,"prompt.fill":(e)=>e,"prompt.edit":(e)=>e,"prompt.suggest":(e)=>e,"prompt.section":(e)=>e,"prompt.context":(e)=>e,"prompt.attachment":(e)=>e,"prompt.compose":(e)=>e,"agent.offer":(e)=>e,"agent.spawn":(e)=>e,"skill.prompt":(e)=>e,"attribution.text":(e)=>e,"session.start":(e)=>e,"session.receive":(e)=>e,"session.append":(e)=>e,"session.send":(e)=>e,"session.compact":(e)=>e,"session.attach":(e)=>e,"session.detach":(e)=>e,"session.measure":(e)=>e,"session.end":(e)=>e,"turn.start":(e)=>e,"turn.step":(e)=>e,"turn.complete":(e)=>e,"ui.scroll":(e)=>e,"ui.focus":(e)=>e};
var Xxn=eu["tool.check"];
var kNe=(e)=>Object.freeze({plugin:e,tier:XSn(e,DN(),jq())});
var CX=(e)=>Object.freeze({plugin:e.endsWith("Settings")?e.slice(0,-8):e,tier:e==="policySettings"?"prepend":"user"});
function uCo(e){if(e.source==="built-in")return BBe;return e.plugin===void 0?CX(e.source):kNe(e.plugin)};
var Mot=()=>({"agent.offer":bX.core,"attribution.text":LX.core,"command.describe":NX.core,"config.describe":SF.core,"telemetry.log":e7.core,"telemetry.mark":t7.core,"prompt.section":zX.core,"prompt.context":BX.core,"prompt.attachment":$X.core,"prompt.compose":yG.core,"prompt.fill":GX.core,"prompt.edit":UX.core,"prompt.suggest":qX.core,"skill.prompt":ZX.core,"tool.describe":n7.core,"session.start":JX.core,"session.receive":QX.core,"session.append":hDr.core,"session.attach":lot.core,"session.detach":dot.core,"session.measure":VX.core,"session.end":KX.core,"turn.start":vot.core,"turn.complete":wot.core,"ui.scroll":nQ.core,"ui.focus":rQ.core});
var Iot=new Set(["config.describe","command.describe","tool.describe","agent.offer"]);
var XIn=eu["agent.spawn"];
var yOn=eu["command.run"];
var DOn=eu["config.set"];
var mDn=eu["prompt.submit"];
var VDn=eu["session.compact"];
var crt=eu["session.send"];
function ine(e){if(e===void 0)return{};if(!e.includes("*"))return null;let n;for(let r of e){if(r==="*")continue;let{toolName:s,ruleContent:g}=jn(r);if(s!==yt||!g)return null;n??=[],n.push(...g.split(",").map((h)=>h.trim()).filter(Boolean))}return n?{allowedAgentTypes:n}:{}};
function Gjn(e,n){if(!e.requiredMcpServers||e.requiredMcpServers.length===0)return!0;return e.requiredMcpServers.every((r)=>n.some((s)=>s.toLowerCase().includes(r.toLowerCase())))};
function $ko(e,n){return e.filter((r)=>Gjn(r,n))};
var CBo=eu["tool.call"];
var S6n=eu["turn.step"];
var Eae=()=>({"tool.call":CBo,"tool.check":Xxn,"tool.describe":n7.site,"command.run":yOn,"command.describe":NX.site,"config.set":DOn,"config.describe":SF.site,"telemetry.log":e7.site,"telemetry.mark":t7.site,"prompt.submit":mDn,"prompt.fill":GX.site,"prompt.edit":UX.site,"prompt.suggest":qX.site,"prompt.section":zX.site,"prompt.context":BX.site,"prompt.attachment":$X.site,"prompt.compose":yG.site,"agent.offer":bX.site,"agent.spawn":XIn,"skill.prompt":ZX.site,"attribution.text":LX.site,"session.start":JX.site,"session.receive":QX.site,"session.append":hDr.site,"session.send":crt,"session.compact":VDn,"session.attach":lot.site,"session.detach":dot.site,"session.measure":VX.site,"session.end":KX.site,"turn.start":vot.site,"turn.step":S6n,"turn.complete":wot.site,"ui.scroll":nQ.site,"ui.focus":rQ.site});
function w1t(e,n){let r=e.findIndex((s)=>s.answersForEngine===!0);return e.toSpliced(r===-1?e.length:r,0,n)};
var fa=(e,n)=>(r)=>{let s=dyt(),g=s?void 0:n.core?.[e]??Mot()[e];if(g===void 0&&!s)return Promise.reject(new Oe(`$.${e}: no core at the bottom of the chain (the site did not install one and the call supplied none)`));let h=Att[e](r),b=Eae()[e],w=n.withoutModuleHandlers?[]:S0(e,n.origin,{only:n.only,...b.pinnedKeys!==void 0&&{pinned:{keys:b.pinnedKeys,e:h}}}),D=s?void 0:n.managed?.[e],j=s?n.withheldCore?.[e]:void 0,z=j===void 0?w:w1t(w,j),K=wX(D,z,g),he=D!==void 0&&w.length===0&&b.pinnedKeys!==void 0&&!n.withoutModuleHandlers&&ypt(e,n.origin,{only:n.only}).length>0,_e=Ex({e:h,handlers:he?[D,...K]:K,site:b,signal:n.signal,cutAt:n.cutAt,origin:aJ(n.origin),trace:n.trace});return Iot.has(e)?_e.then((ke)=>e9e(ke)):_e};
async function Zjn(e,n){if(xtt(n))return[...e];let r=await Promise.all(e.map((s)=>dd("agent.offer",{agent:s.agentType})?fa("agent.offer",{})({agent:s.agentType,description:s.whenToUse??"",source:s.source,provider:uCo(s)}):{isOffered:!0}));return e.filter((s,g)=>r[g]?.isOffered===!0)};
function cVt(e,n){return e.filter((r)=>{if(r.source!=="built-in"||!r.tools||r.tools.length===0||ine(r.tools)!==null)return!0;return r.tools.some((s)=>{if(s==="*")return!1;let g=jn(s).toolName;return!zs(n,{name:g})&&V2o(g)})})};
function V2o(e){return e!==hr||!a.CLAUDE_CODE_DISABLE_WEB_FETCH&&on(rbe)};
function _Wn(e,n,r,s){return Zjn(cVt($2o(e.filter((g)=>g.isEnabled?.(s)!==!1),n,r),n),s)};
function act(e,n,r,s){return _Wn(n?e.filter((g)=>n.includes(g.agentType)):e,r,yt,s)};
function uor(e){let{tools:n,disallowedTools:r}=e,s=n&&n.length>0,g=r&&r.length>0;if(s&&g){let h=new Set(r),b=n.filter((w)=>!h.has(w));if(b.length===0)return"None";return b.join(", ")}else if(s)return n.join(", ");else if(g)return`All tools except ${r.join(", ")}`;return"All tools"};
function ZXt(e,n){let r=uor(e),s=n&&e.whenToUseLean||e.whenToUse;return`- ${e.agentType}: ${s} (Tools: ${r})`};
async function Jzn(e,n){if(!e.options.tools.some((K)=>Mt(K,yt)))return[];let{activeAgents:r,allowedAgentTypes:s}=e.options.agentDefinitions,g=new Set;for(let K of e.options.tools){let he=V1e(K);if(he)g.add(he)}let h=await act($ko(r,[...g]),s,pe(e),e),b=new Set;for(let K of n??[]){if(K.type!=="attachment")continue;if(K.attachment.type!=="agent_listing_delta")continue;if(Array.isArray(K.attachment.addedLines))for(let he of wi(K.attachment.addedTypes))b.add(he);for(let he of wi(K.attachment.removedTypes))b.delete(he)}let w=new Set(h.map((K)=>K.agentType)),D=h.filter((K)=>!b.has(K.agentType)),j=[];for(let K of b)if(!w.has(K))j.push(K);if(D.length===0&&j.length===0)return[];D.sort((K,he)=>K.agentType.localeCompare(he.agentType)),j.sort();let z=AG(M9(e.options.mainLoopModel));return[{type:"agent_listing_delta",addedTypes:D.map((K)=>K.agentType),addedLines:D.map((K)=>ZXt(K,z)),builtInTypes:D.filter((K)=>K.source==="built-in").map((K)=>K.agentType),removedTypes:j,isInitial:b.size===0,showConcurrencyNote:ir()!=="pro"&&FM()==="default"}]};

return {bX,xtt,wX,vX,Att,Xxn,kNe,CX,uCo,Mot,Iot,XIn,yOn,DOn,mDn,VDn,crt,ine,Gjn,$ko,CBo,S6n,Eae,w1t,fa,Zjn,cVt,V2o,_Wn,act,uor,ZXt,Jzn};
}
export function createAgentAvailability287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({"a":ports["modsOwner"]});
const m5=module5({});
const m6=module6({"N":m5["N"],"W":isProxy,"nd":ports["diagnostics"]});
const m7=module7({"ut":m4["ut"],"FQ":m6["FQ"]});
const m8=module8({});
const m9=module9({});
const m10=module10({"N":m5["N"]});
const m11=module11({"yz":m5["yz"]});
const m12=module12({"Ag":m5["Ag"],"Oe":m10["Oe"],"Nr":m11["Nr"],"_i":m11["_i"]});
const m13=module13({});
const m14=module14({});
const m15=module15({"bn":m14["bn"]});
const m16=module16({});
const m17=module17({"ct":m8["ct"],"Ys":m9["Ys"],"USn":m12["USn"],"N":m5["N"],"Mts":m12["Mts"],"Oe":m10["Oe"],"KF":m5["KF"],"YF":m5["YF"],"zs":ports["catalog_zs"],"Xs":ports["catalog_Xs"],"hi":ports["catalog_hi"],"Bs":ports["catalog_Bs"],"Ks":ports["catalog_Ks"],"Xi":ports["catalog_Xi"],"zi":ports["catalog_zi"],"oa":ports["catalog_oa"],"ra":ports["catalog_ra"],"na":ports["catalog_na"],"ea":ports["catalog_ea"],"yi":ports["catalog_yi"],"Ps":ports["catalog_Ps"],"ui":ports["catalog_ui"],"li":ports["catalog_li"],"mi":ports["catalog_mi"],"ri":ports["catalog_ri"],"Fs":ports["catalog_Fs"],"sa":ports["catalog_sa"],"js":ports["catalog_js"],"Ms":ports["catalog_Ms"],"Us":ports["catalog_Us"],"Ds":ports["catalog_Ds"],"Ji":ports["catalog_Ji"],"qi":ports["catalog_qi"],"gi":ports["catalog_gi"],"ti":ports["catalog_ti"],"Wi":ports["catalog_Wi"],"Fi":ports["catalog_Fi"],"Vi":ports["catalog_Vi"],"Di":ports["catalog_Di"],"$i":ports["catalog_$i"],"Ui":ports["catalog_Ui"],"Ki":ports["catalog_Ki"],"Bi":ports["catalog_Bi"],"qs":ports["catalog_qs"],"Zs":ports["catalog_Zs"],"pa":ports["catalog_pa"],"aa":ports["catalog_aa"],"Pi":ports["catalog_Pi"],"_i":ports["catalog__i"],"Ci":ports["catalog_Ci"],"vi":ports["catalog_vi"],"Ii":ports["catalog_Ii"],"Ri":ports["catalog_Ri"],"Hi":ports["catalog_Hi"],"Vs":ports["catalog_Vs"],"oi":ports["catalog_oi"],"_7e":m12["_7e"],"L":m13["L"],"Lts":m12["Lts"],"nd":ports["diagnostics"],"Md":isProxy,"jjt":m10["jjt"],"gF":m6["gF"],"yyt":m12["yyt"],"EJn":m12["EJn"],"Nts":m12["Nts"],"npe":m12["npe"],"l":m15["l"],"Vd":AsyncLocalStorage,"at":m15["at"],"Syt":m10["Syt"],"re":m16["re"],"Ng":m15["Ng"],"wf":m16["wf"],"Fm":m16["Fm"]});
const m18=module18({"ut":m4["ut"],"t":ports["debug"],"gF":m6["gF"],"FQ":m6["FQ"],"ct":m8["ct"],"VVr":m6["VVr"],"Bjt":m6["Bjt"],"nd":ports["diagnostics"],"zVr":m6["zVr"],"l":m15["l"],"_yt":m6["_yt"],"Oe":m10["Oe"],"KVr":m6["KVr"],"PVr":m17["PVr"],"BBe":m17["BBe"]});
const m19=module19({"fyt":m17["fyt"]});
const m20=module20({"byt":m9["byt"],"ge":ports["settings"],"TS":m11["TS"],"ut":m4["ut"],"Bl":m11["Bl"],"_i":m11["_i"],"Nr":m11["Nr"],"gCn":ports["managedSettingsPresent"],"Xo":ports["enabledSettingSources"],"ir":ports["organization"]});
const m21=module21({});
const m22=module22({});
const m23=module23({});
const m24=module24({"An":m23["An"],"sA":m21["sA"],"O0e":m21["O0e"]});
const m25=module25({"n":ports["executionContext"]});
const m26=module26({"V":m25["V"],"U":m25["U"]});
const m27=module27({"Ff":ports["nonDeniableTools"],"Li":m22["Li"],"jn":m21["jn"],"cm":m24["cm"],"bfe":m21["bfe"],"sA":m21["sA"],"O0e":m21["O0e"],"CAn":m24["CAn"],"hu":m26["hu"]});
const m28=module28({});
const m29=module29({"Mt":m0["Mt"],"yt":m1["yt"],"V1e":m2["V1e"],"wZn":m3["wZn"],"dd":m7["dd"],"dyt":m17["dyt"],"eu":m17["eu"],"LX":ports["event_LX"],"NX":ports["event_NX"],"SF":ports["event_SF"],"e7":ports["event_e7"],"t7":ports["event_t7"],"zX":ports["event_zX"],"BX":ports["event_BX"],"$X":ports["event_$X"],"yG":ports["event_yG"],"GX":ports["event_GX"],"UX":ports["event_UX"],"qX":ports["event_qX"],"ZX":ports["event_ZX"],"n7":ports["event_n7"],"JX":ports["event_JX"],"QX":ports["event_QX"],"hDr":ports["event_hDr"],"lot":ports["event_lot"],"dot":ports["event_dot"],"VX":ports["event_VX"],"KX":ports["event_KX"],"vot":ports["event_vot"],"wot":ports["event_wot"],"nQ":ports["event_nQ"],"rQ":ports["event_rQ"],"Oe":m10["Oe"],"sxn":randomUUID,"S0":m18["S0"],"ypt":m18["ypt"],"Ex":m17["Ex"],"aJ":m18["aJ"],"e9e":m19["e9e"],"BBe":m17["BBe"],"XSn":m12["XSn"],"DN":m20["DN"],"jq":m20["jq"],"jn":m21["jn"],"zs":m27["zs"],"hr":m28["hr"],"a":ports["environment"],"on":ports["toolEnabled"],"rbe":m28["rbe"],"$2o":m27["$2o"],"pe":ports["permissionContext"],"wi":m13["wi"],"AG":ports["leanPrompt"],"M9":ports["modelForPrompt"],"ir":ports["organization"],"FM":ports["taskMode"]});

return {"listing":m29.Jzn,"serverFilter":m29.$ko,"listingLine":m29.ZXt,"toolMatcher":m0.Mt,"mcpServerName":m2.V1e,"available":m29.act,"filter":m29._Wn,"offer":m29.Zjn,"toolFilter":m29.cVt,"provider":m29.uCo,"offerCore":m29.bX,"offerSite":m17.Zi,"invoke":m29.fa,"mods":m4.ut,"setPolicy":m9.kJn,"engineState":m17.J7n,"providerTier":m12.XSn,"managedPlugins":m20.DN,"pluginOrder":m20.jq,"handlers":m18.S0,"chain":m17.Ex};
}

// Independent complete listing closure; availability is a real caller boundary.
function listingModule0(imports){

function Mt(e,n){return e.name===n||(e.aliases?.includes(n)??!1)};
return {Mt};
}
function listingModule1(imports){

var yt="Agent";
return {yt};
}
function listingModule2(imports){

function V1e(e){return e.mcpInfo?.serverName??(e.name?.startsWith("mcp__")?e.name.split("__")[1]:void 0)};
return {V1e};
}
function listingModule3(imports){

function wi(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")};
return {wi};
}
function listingModule4(imports){
const Mt=imports["Mt"];
const yt=imports["yt"];
const V1e=imports["V1e"];
const act=imports["act"];
const pe=imports["pe"];
const wi=imports["wi"];
const AG=imports["AG"];
const M9=imports["M9"];
const ir=imports["ir"];
const FM=imports["FM"];
function Gjn(e,n){if(!e.requiredMcpServers||e.requiredMcpServers.length===0)return!0;return e.requiredMcpServers.every((r)=>n.some((s)=>s.toLowerCase().includes(r.toLowerCase())))};
function $ko(e,n){return e.filter((r)=>Gjn(r,n))};
function uor(e){let{tools:n,disallowedTools:r}=e,s=n&&n.length>0,g=r&&r.length>0;if(s&&g){let h=new Set(r),b=n.filter((w)=>!h.has(w));if(b.length===0)return"None";return b.join(", ")}else if(s)return n.join(", ");else if(g)return`All tools except ${r.join(", ")}`;return"All tools"};
function ZXt(e,n){let r=uor(e),s=n&&e.whenToUseLean||e.whenToUse;return`- ${e.agentType}: ${s} (Tools: ${r})`};
async function Jzn(e,n){if(!e.options.tools.some((K)=>Mt(K,yt)))return[];let{activeAgents:r,allowedAgentTypes:s}=e.options.agentDefinitions,g=new Set;for(let K of e.options.tools){let he=V1e(K);if(he)g.add(he)}let h=await act($ko(r,[...g]),s,pe(e),e),b=new Set;for(let K of n??[]){if(K.type!=="attachment")continue;if(K.attachment.type!=="agent_listing_delta")continue;if(Array.isArray(K.attachment.addedLines))for(let he of wi(K.attachment.addedTypes))b.add(he);for(let he of wi(K.attachment.removedTypes))b.delete(he)}let w=new Set(h.map((K)=>K.agentType)),D=h.filter((K)=>!b.has(K.agentType)),j=[];for(let K of b)if(!w.has(K))j.push(K);if(D.length===0&&j.length===0)return[];D.sort((K,he)=>K.agentType.localeCompare(he.agentType)),j.sort();let z=AG(M9(e.options.mainLoopModel));return[{type:"agent_listing_delta",addedTypes:D.map((K)=>K.agentType),addedLines:D.map((K)=>ZXt(K,z)),builtInTypes:D.filter((K)=>K.source==="built-in").map((K)=>K.agentType),removedTypes:j,isInitial:b.size===0,showConcurrencyNote:ir()!=="pro"&&FM()==="default"}]};
return {Gjn,$ko,uor,ZXt,Jzn};
}
export function createAgentListing287(ports){
const l0=listingModule0({});
const l1=listingModule1({});
const l2=listingModule2({});
const l3=listingModule3({});
const l4=listingModule4({"Mt":l0["Mt"],"yt":l1["yt"],"V1e":l2["V1e"],"act":ports["available"],"pe":ports["permissionContext"],"wi":l3["wi"],"AG":ports["leanPrompt"],"M9":ports["modelForPrompt"],"ir":ports["subscription"],"FM":ports["taskMode"]});

return {"listing":l4.Jzn,"serverFilter":l4.$ko,"listingLine":l4.ZXt,"toolMatcher":l0.Mt,"mcpServerName":l2.V1e,"stringArray":l3.wi};
}
