import * as lib0 from "path";
import * as lib1 from "os";
import * as lib2 from "util/types";
import * as lib3 from "events";
function module0(imports){
function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
var Vo={inline:"--plugin-dir session plugins",builtin:"built-in plugins","skills-dir":"plugins auto-loaded from .claude/skills/",synced:"plugins synced from your claude.ai account","claude-plugin-test":"plugins loaded by claude plugin test",npm:"plugins installed from an npm registry (`<package>@npm`); remove this marketplace and add it again under another name",pip:"plugins installed from a Python package index (reserved; not yet available)",uv:"plugins installed from a Python package index through uv (reserved; not yet available)",cargo:"plugins installed from a Rust crate registry (reserved; not yet available)",github:"plugins installed straight from a GitHub repository (`<owner>/<repo>@github`; reserved; not yet available)",gh:"plugins installed straight from a GitHub repository (reserved; not yet available)"};
function yz(e){return Object.hasOwn(Vo,e)};
return {N,yz,Vo};
}
function module1(imports){
const N=imports["N"];
function td(e){return N(e)};
function m2t(e){return e!==null&&typeof e==="object"&&"afterResultCommitted"in e&&typeof e.afterResultCommitted==="function"};
function Kyn(e,n,s){if(n||!m2t(e))return;try{e.afterResultCommitted()}catch(r){s(r)}};
function Mt(e,n){return e.name===n||(e.aliases?.includes(n)??!1)};
var Mr=new WeakMap;
var Pr=new WeakSet;
function ql(e){let n=new Map;for(let s of e){if(!n.has(s.name))n.set(s.name,s);if(s.aliases){for(let r of s.aliases)if(!n.has(r))n.set(r,s)}}return n};
function _n(e,n,s){let r=s&&Object.hasOwn(s,n)?s[n]:void 0;if(r!==void 0&&r!==n)return _n(e,r);let g=Mr.get(e);if(g)return g.get(n);if(Pr.has(e)){let h=ql(e);return Mr.set(e,h),h.get(n)}return Pr.add(e),e.find((h)=>Mt(h,n))};
function PWo(e){return e.backgrounding??"never"};
return {PWo,_n,Mr,Pr,ql,Mt,td,Kyn,m2t};
}
function module2(imports){
function yo(t){return t};
return {yo};
}
function module3(imports){
const n=imports["n"];
const c=imports["c"];
const yo=imports["yo"];
var an="NoProjectDirectoryError";
class gR extends Error{name=an;constructor(){super("This session has no working directory.")}};
function Es(e){let{project:t}=e;if(t===null)throw new gR;return t};
class Tt{#e;#t=new WeakMap;constructor(e){this.#e=e}peek(e){return this.#t.get(e.root)}of(e){let t=e.root,o=this.#t.get(t);if(o!==void 0)return o;let r=this.#e();return this.#t.set(t,r),r}drop(e){this.#t.delete(e.root)}};
function U(){return n()};
function Ge(){let e=c()?.sessionId;if(e)return yo(e);let t=n();return t.identity.mainAgentId(t.id)};
function k3t(){return n().host.launchOptions.printInputClosed()};
function w6e(){return n().host.settingsSource.parentManagedSettingsInvalid()};
function Ut(){return n().host.launchOptions.diskless()};
function R(){return c()??n().hookRegistry.holder()};
function Net(){return R().pluginHookRunner};
return {k3t,Ut,w6e,Net,R,Tt,U,Es,gR,an,Ge};
}
function module4(imports){
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module5(imports){
var qt=typeof global=="object"&&global&&global.Object===Object&&global;
var Tir=qt;
var Qt=typeof self=="object"&&self&&self.Object===Object&&self;
var te=Tir||Qt||Function("return this")();
var IL=te;
var ne=IL.Symbol;
var nB=ne;
var st=Object.prototype;
var {hasOwnProperty:re,toString:oe}=st;
var E=nB?nB.toStringTag:void 0;
function ie(t){var e=re.call(t,E),n=t[E];try{t[E]=void 0;var r=!0}catch(i){}var o=oe.call(t);if(r)if(e)t[E]=n;else delete t[E];return o};
var at=ie;
var se=Object.prototype;
var ae=se.toString;
function ue(t){return ae.call(t)};
var ut=ue;
var le="[object Null]";
var ce="[object Undefined]";
var lt=nB?nB.toStringTag:void 0;
function fe(t){if(t==null)return t===void 0?ce:le;return lt&&lt in Object(t)?at(t):ut(t)};
var mee=fe;
function pe(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")};
var iv=pe;
var de="[object AsyncFunction]";
var ge="[object Function]";
var he="[object GeneratorFunction]";
var me="[object Proxy]";
function xe(t){if(!iv(t))return!1;var e=mee(t);return e==ge||e==he||e==de||e==me};
var tEt=xe;
var we=IL["__core-js_shared__"];
var M=we;
var ft=function(){var t=/[^.]+$/.exec(M&&M.keys&&M.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();
function be(t){return!!ft&&ft in t};
var pt=be;
var _e=Function.prototype;
var Se=_e.toString;
function ye(t){if(t!=null){try{return Se.call(t)}catch(e){}try{return t+""}catch(e){}}return""};
var R6e=ye;
var Te=/[\\^$.*+?()[\]{}|]/g;
var ve=/^\[object .+?Constructor\]$/;
var Ae=Function.prototype;
var Oe=Object.prototype;
var Ce=Ae.toString;
var Ee=Oe.hasOwnProperty;
var Ne=RegExp("^"+Ce.call(Ee).replace(Te,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");
function Pe(t){if(!iv(t)||pt(t))return!1;var e=tEt(t)?Ne:ve;return e.test(R6e(t))};
var dt=Pe;
function Re(t,e){return t==null?void 0:t[e]};
var gt=Re;
function De(t,e){var n=gt(t,e);return dt(n)?n:void 0};
var gee=De;
var Le=gee(Object,"create");
var m=Le;
function Me(){this.__data__=m?m(null):{},this.size=0};
var ht=Me;
function Ie(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e};
var mt=Ie;
var ke="__lodash_hash_undefined__";
var $e=Object.prototype;
var je=$e.hasOwnProperty;
function We(t){var e=this.__data__;if(m){var n=e[t];return n===ke?void 0:n}return je.call(e,t)?e[t]:void 0};
var xt=We;
var He=Object.prototype;
var Ue=He.hasOwnProperty;
function Fe(t){var e=this.__data__;return m?e[t]!==void 0:Ue.call(e,t)};
var wt=Fe;
var ze="__lodash_hash_undefined__";
function Be(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=m&&e===void 0?ze:e,this};
var bt=Be;
function T(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}};
T.prototype.clear=ht;;
T.prototype.delete=mt;;
T.prototype.get=xt;;
T.prototype.has=wt;;
T.prototype.set=bt;;
var G=T;
function Ge(){this.__data__=[],this.size=0};
var _t=Ge;
function Ve(t,e){return t===e||t!==t&&e!==e};
var eme=Ve;
function Je(t,e){var n=t.length;while(n--)if(eme(t[n][0],e))return n;return-1};
var b=Je;
var Ke=Array.prototype;
var Ye=Ke.splice;
function Ze(t){var e=this.__data__,n=b(e,t);if(n<0)return!1;var r=e.length-1;if(n==r)e.pop();else Ye.call(e,n,1);return--this.size,!0};
var St=Ze;
function Xe(t){var e=this.__data__,n=b(e,t);return n<0?void 0:e[n][1]};
var yt=Xe;
function qe(t){return b(this.__data__,t)>-1};
var Tt=qe;
function Qe(t,e){var n=this.__data__,r=b(n,t);if(r<0)++this.size,n.push([t,e]);else n[r][1]=e;return this};
var vt=Qe;
function v(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}};
v.prototype.clear=_t;;
v.prototype.delete=St;;
v.prototype.get=yt;;
v.prototype.has=Tt;;
v.prototype.set=vt;;
var Wet=v;
var tn=gee(IL,"Map");
var Get=tn;
function en(){this.size=0,this.__data__={hash:new G,map:new(Get||Wet),string:new G}};
var At=en;
function nn(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null};
var Ot=nn;
function rn(t,e){var n=t.__data__;return Ot(e)?n[typeof e=="string"?"string":"hash"]:n.map};
var _=rn;
function on(t){var e=_(this,t).delete(t);return this.size-=e?1:0,e};
var Ct=on;
function sn(t){return _(this,t).get(t)};
var Et=sn;
function an(t){return _(this,t).has(t)};
var Nt=an;
function un(t,e){var n=_(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this};
var Pt=un;
function A(t){var e=-1,n=t==null?0:t.length;this.clear();while(++e<n){var r=t[e];this.set(r[0],r[1])}};
A.prototype.clear=At;;
A.prototype.delete=Ct;;
A.prototype.get=Et;;
A.prototype.has=Nt;;
A.prototype.set=Pt;;
var nEt=A;
var ln="Expected a function";
function V(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw TypeError(ln);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var s=t.apply(this,r);return n.cache=i.set(o,s)||i,s};return n.cache=new(V.Cache||nEt),n};
V.Cache=nEt;;
var is=V;
return {is,V,ln,nEt,A,At,en,G,T,Get,tn,gee,De,gt,Re,dt,Pe,iv,pe,pt,be,ft,M,we,IL,te,Tir,qt,Qt,tEt,xe,mee,fe,ce,le,lt,nB,ne,at,ie,re,st,E,oe,ut,ue,ae,se,ge,he,de,me,Ne,Ce,Ae,Ee,Oe,Te,ve,R6e,ye,Se,_e,Wet,v,Ct,on,_,rn,Ot,nn,Et,sn,Nt,an,Pt,un,ht,Me,m,Le,mt,Ie,xt,We,ke,je,$e,wt,Fe,Ue,He,bt,Be,ze,_t,Ge,St,Ze,b,Je,eme,Ve,Ye,Ke,yt,Xe,Tt,qe,vt,Qe};
}
function module6(imports){
const Le=imports["Le"];
const process=imports["process"];
const is=imports["is"];
const u=lib0["join"];
const R=lib1["homedir"];
function o(){return process.env.CLAUDE_CONFIG_DIR};
var we=is(()=>(o()??u(R(),".claude")).normalize("NFC"),o);
function p(){return process.env.CLAUDE_CODE_PROJECT_DIR_NAME};
var A=/^[A-Za-z0-9_-]{1,64}$/;
var C=/^(?:con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
function Hno(e){if(!e||!A.test(e)||C.test(e))return;return e};
function T(){return`${o()??""}\x00${p()??""}`};
var dKt=is(()=>o()?Hno(p()):void 0,T);
function i(e){let n=process.argv.indexOf("--");return(n===-1?process.argv:process.argv.slice(0,n)).includes(e)};
function xr(){return Le(process.env.CLAUDE_CODE_SIMPLE)||i("--bare")};
function yr(){return Le(process.env.CLAUDE_CODE_SAFE_MODE)||i("--safe-mode")};
return {xr,i,yr,we,o,dKt,Hno,A,C,p,T};
}
function module7(imports){
const xk=imports["xk"];
const a=imports["a"];
const xr=imports["xr"];
function Za(){return xk().backgroundTasksDisabled||a.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS||xr()};
return {Za};
}
function module8(imports){
const N=imports["N"];
const W=lib2["isProxy"];
function gF(r){if(!N(r))return!1;let o=Object.getPrototypeOf(r);return o===null||!W(o)&&Object.getPrototypeOf(o)===null};
function i(r){if(typeof r!=="object"||!r)return!1;try{return Reflect.get(RegExp.prototype,"source",r),!0}catch{return!1}};
function s(r,o,t){if(Array.isArray(r))return Array.prototype.some.call(r,(e)=>s(e,o,t));if(Array.isArray(o))return Array.prototype.some.call(o,(e)=>s(r,e,t));if(typeof r!=="object"||r===null)return r===o;if(gF(r)){if(typeof o!=="object"||!o)return!1;for(let e of Object.keys(r))if(!Object.hasOwn(o,e)||!s(r[e],o[e],t))return!1;return!0}return i(r)&&t(r,String(o))};
var KVr=(r,o)=>s(r,o,()=>!0);
var FQ=(r,o,t)=>Array.isArray(r)?r.some((e)=>FQ(e,o,t)):!gF(r)||!Object.hasOwn(r,o)||KVr(r[o],t);
return {FQ,gF,KVr,s,i};
}
function module9(imports){
const ut=imports["ut"];
const FQ=imports["FQ"];
var dd=(o,e,s)=>(s??ut().loadedModules).some((r)=>r.hooks(o)&&(e===void 0||Object.entries(e).every(([t,d])=>FQ(r.matcherFor(o),t,d))));
return {dd};
}
function module10(imports){
function Ys(){let t;return{set:(e)=>{t=e},get:()=>t}};
var kJn=Ys();
var byt=()=>kJn.get();
return {byt,kJn,Ys};
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
function Nr(e){return e.normalize("NFC").toLowerCase()};
return {TS,P,lbn,_i,m,A,b,h,g,Nr};
}
function module12(imports){
const byt=imports["byt"];
const ge=imports["ge"];
const TS=imports["TS"];
var a8e="cc-plugin-sec-default";
function I1(){let e=byt();if(e)return new Set(e.managedIds);let n=ge("policySettings")?.enabledPlugins;if(!n)return null;let o=new Set;for(let[a,i]of Object.entries(n))if(i===!0&&a.includes("@"))o.add(TS(a));return o.size>0?o:null};
return {a8e,I1};
}
function module13(imports){
const ut=imports["ut"];
const a8e=imports["a8e"];
var Lde=(o)=>o.link!==void 0;
var aft=()=>ut().loadedModules.filter((o)=>!(o.name===a8e&&Lde(o)));
return {aft,Lde};
}
function module14(imports){
const dd=imports["dd"];
const aft=imports["aft"];
var bde=(o)=>dd(`classic.${o}`,void 0,aft());
return {bde};
}
function module15(imports){
const N=imports["N"];
function ss(e,t){if(N(t)){let o=Object.create(null);for(let r of Object.keys(t).toSorted())Object.defineProperty(o,r,{value:t[r],enumerable:!0});return o}return t};
var is="\x00unserializable:";
function as(){let e=0;return()=>`${is}${++e}`};
var ps=as();
function Un(e){try{return JSON.stringify(e,ss)}catch{return ps()}};
return {Un,ss,ps,as,is};
}
function module16(imports){
const Ut=imports["Ut"];
const yr=imports["yr"];
const xr=imports["xr"];
var t={claudeMd:!0,skills:!0,workflows:!1,plugins:!0,pluginMonitors:!1,themes:!1,hljsLanguages:!0,hooks:!0,statusLine:!1,fileSuggestion:!1,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!0,agents:!0,outputStyles:!1,lspServers:!0,keybindings:!1};
var l={claudeMd:!1,skills:!1,workflows:!1,plugins:!1,pluginMonitors:!1,themes:!1,hljsLanguages:!1,hooks:!0,statusLine:!0,fileSuggestion:!0,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!1,agents:!1,outputStyles:!1,lspServers:!1,keybindings:!1};
var o={claudeMd:!1,skills:!1,workflows:!1,plugins:!1,pluginMonitors:!1,themes:!1,hljsLanguages:!1,hooks:!1,statusLine:!0,fileSuggestion:!0,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!1,agents:!1,outputStyles:!1,lspServers:!1,keybindings:!1};
function Gr(e,s){if(o[e]&&Ut())return!0;if(yr()&&!l[e])return!0;if(xr()&&!s?.explicitlyRequested)return t[e];return!1};
return {Gr,o,l,t};
}
function module17(imports){
function i0e(e){return e.filter((n)=>n.severity!=="warning")};
return {i0e};
}
function module18(imports){
const ge=imports["ge"];
const yr=imports["yr"];
const er=imports["er"];
const i0e=imports["i0e"];
const eA=imports["eA"];
const w6e=imports["w6e"];
const bje=imports["bje"];
function jd(o){let t=ge("policySettings")?.strictPluginOnlyCustomization;if(t===!0)return!0;if(Array.isArray(t))return t.includes(o);return!1};
function Ty(){return yr()||coe()};
function coe(){let o=ge("policySettings");if(o?.allowManagedHooksOnly===!0)return!0;if(er().disableAllHooks===!0&&o?.disableAllHooks!==!0)return!0;return!1};
function TXn(){return yr()||ge("policySettings")?.allowManagedHooksOnly===!0||doe()};
function doe(){return i0e(eA()).length>0||w6e()&&bje()};
function yGr(){return TXn()||jd("hooks")};
function Wb(){return ge("policySettings")?.disableAllHooks===!0};
function obe(){return Wb()||coe()};
return {Wb,Ty,coe,yGr,TXn,doe,jd,obe};
}
function module19(imports){
const Gr=imports["Gr"];
const S$=imports["S$"];
const Wb=imports["Wb"];
const Ty=imports["Ty"];
const yr=imports["yr"];
const I1=imports["I1"];
const yGr=imports["yGr"];
const Net=imports["Net"];
const V9=imports["V9"];
const LEe=imports["LEe"];
const TXn=imports["TXn"];
function l9(o){if(Gr("hooks"))return[];let e=S$()?.[o]??[];if(Wb())return e.filter((n)=>!("pluginRoot"in n)&&!("deviceOwner"in n));let i=u(),{managedOnly:t,managedPluginIds:l}=i,r=yGr(),s=Net();return[...V9()?.[o]??[],...t?[]:LEe()?.[o]??[],...e.filter((n)=>a(n)&&s?.holds(n.pluginId)===!0?!(TXn()&&!l?.has(n.pluginId)):(!("pluginRoot"in n)||g(n.pluginId,i))&&!(r&&("deviceOwner"in n)))]};
function a(o){return"pluginRoot"in o&&o.hooks.every((e)=>e.type==="command")};
function u(){let o=Ty();return{managedOnly:o,managedPluginIds:o&&!yr()?I1():null}};
function g(o,{managedOnly:e,managedPluginIds:i}){return!e||i?.has(o)===!0};
return {l9,u,a,g};
}
function module20(imports){
var c={Task:"Agent",KillShell:"TaskStop",KillBash:"TaskStop",ListPeers:"ListAgents",Brief:"SendUserMessage",ListMcpResources:"ListMcpResourcesTool",ReadMcpResource:"ReadMcpResourceTool",ReadMcpResourceDir:"ReadMcpResourceDirTool"};
function Zl(e){return Object.hasOwn(c,e)?c[e]:e};
function TZe(e){let n=[];for(let[t,r]of Object.entries(c))if(r===e)n.push(t);return n};
var AAn="workspace";
var I0e=`mcp__${AAn}__bash`;
var TAn=`mcp__${AAn}__web_fetch`;
function bfe(e,n){let t=n&&Object.hasOwn(n,e)?n[e]:void 0;return t!==void 0&&t!==e?[e,t]:[e]};
function LZ(e,n){if(!n)return[];let t=[];for(let[r,s]of Object.entries(n))if(s===e)t.push(r);return t};
return {bfe,Zl,c,TZe,LZ,I0e,AAn,TAn};
}
function module21(imports){
var HG="skill__";
return {HG};
}
function module22(imports){
function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function bn(n){return r(n)};
return {bn,r,S,c};
}
function module23(imports){
var JM=50000;
var HIe=4;
var g4o=400000;
var h4o=1073741824;
var q6t=1e4;
var rSt=1e5;
var fu="[Request interrupted by user for tool use]";
return {g4o,h4o,HIe,JM,rSt,fu,q6t};
}
function module24(imports){
function I(t,n,e=n+"s"){return t===1?n:e};
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function tc(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(-n),r=e.charCodeAt(0);return f(r>=56320&&r<=57343?e.slice(1):e)};
function ree(t,n,e,r){if(t.length<=n+e)return t;let i=n>0?re(t,n):"",o=e>0?tc(t,e):"";return`${i}${r(t.length-i.length-o.length)}${o}`};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
function HOe(t,n){if(t.length*3<=n)return t;let e=new TextEncoder,r=new Uint8Array(Math.max(0,Math.min(n,4194304))),i=0,o=0;while(o<t.length){let u=n-i;if(u<=0)break;let c=u<r.length?r.subarray(0,u):r,{read:s,written:h}=e.encodeInto(t.slice(o),c);if(s===0)break;o+=s,i+=h}return o>=t.length?t:t.slice(0,o)};
return {HOe,re,f,x,I,ree,tc};
}
function module25(imports){
const I0e=imports["I0e"];
const TAn=imports["TAn"];
const bn=imports["bn"];
const S=imports["S"];
const q6t=imports["q6t"];
const ree=imports["ree"];
var Ca={[I0e]:"Bash",[TAn]:"WebFetch"};
function Nn(e){let n=Object.hasOwn(Ca,e)?Ca[e]:void 0;if(n)return bn(n);if(e.startsWith("mcp__"))return S("mcp_tool");return bn(e)};
var IU=1024;
var NU=/\n\n\.\.\. \[(\d+) characters truncated\] \.\.\.\n\n/g;
function FU(e){return`

... [${e} characters truncated] ...

`};
function md(e,n=q6t){if(e.length<=n+IU)return e;let r=Math.floor(n/2);return ree(e,r,n-r,(s)=>{let g=e.slice(r,e.length-(n-r)),h=0;for(let b of g.matchAll(NU)){let v=b[1].length<=15?Number(b[1]):Number.NaN;if(Number.isSafeInteger(v)&&v>=b[0].length)h+=v-b[0].length}return FU(s+h)})};
return {Nn,Ca,md,IU,NU,FU};
}
function module26(imports){
const b=lib3["setMaxListeners"];
var A=50;
function Bn(e=A){let r=new AbortController;return b(e,r.signal),r};
function Wpe(e,r){if(e.signal.aborted)return r.abort(e.signal.reason),()=>{};let t=()=>r.abort(e.signal.reason);return e.signal.addEventListener("abort",t,{once:!0}),()=>e.signal.removeEventListener("abort",t)};
return {Bn,A,Wpe};
}
function module27(imports){
const bn=imports["bn"];
const S=imports["S"];
class Ye extends Error{constructor(n){super(n);this.name="AbortError"}};
class sB extends Error{stdout;stderr;code;interrupted;hadSandboxViolation;constructor(n){super("Shell command failed");this.name="ShellError",this.stdout=n.stdout,this.stderr=n.stderr,this.code=n.code,this.interrupted=n.interrupted,this.hadSandboxViolation=n.hadSandboxViolation??!1}};
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
function Z(n){return n instanceof Error?n:Error(String(n))};
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")};
return {Ye,tme,Z,P,E,sB};
}
function module28(imports){
const i=imports["i"];
const c=imports["c"];
const tme=imports["tme"];
function y(e,r){i("tengu_feature_ok",{feature_name:c(e),...r})};
function m(e,r,u){i("tengu_feature_bad",{...u,feature_name:c(e),error_code:tme(r)})};
function p(e,r,u){i("tengu_feature_sad",{...u,feature_name:c(e),error_code:tme(r)})};
return {p,m,y};
}
function module29(imports){
const Tt=imports["Tt"];
const U=imports["U"];
const t=imports["t"];
var r=new Tt(()=>({store:void 0}));
var n={maxBytes:0,save:async()=>null};
function B1r(e){return r.peek(e)?.store??(e.host.launchOptions.diskless()?n:void 0)};
function G_(){return B1r(U())};
async function F1e(e,o){try{return await e.save(o)}catch{return t("A result could not be saved where the model reads files",{level:"error"}),null}};
return {G_,B1r,r,n,F1e};
}
function module30(imports){
var wr={[Symbol.dispose](){}};
function Rr(){return wr};
var ng=Rr;
function _(e,n,r){using s=ng`JSON.stringify(${Se(e)})`;return JSON.stringify(e,n,r)};
function Se(e){return typeof e==="string"?e.length:e};
return {_,ng,Rr,wr,Se};
}
function module31(imports){
var t;
function F(){return t===!0};
return {F,t};
}
function module32(imports){
var l=String.fromCharCode(0);
var p=/^\.[0-9a-f]{16}\.aside$/;
function pqt(e){if(e.charCodeAt(0)!==46)return!1;return FK(e).some((n)=>p.test(n))};
function u(e){return typeof e==="string"&&/^[. ]+$/.test(e)};
function Xn(e){return!(typeof e!=="string"||e.length===0||u(e)||e.includes("/")||e.includes("\\")||e.includes(l)||pqt(e))};
function Xx(e){return e.length>0&&e.every(Xn)};
function fqt(e){return FK(e).some((n)=>n.endsWith(".jsonl"))};
function FK(e){let n=s.get(e);if(n!==void 0)return n;let a=Object.freeze(m(e));if(s.size>=d)s.clear();return s.set(e,a),a};
function m(e){let n=e.toLowerCase(),a=n.indexOf(":");return a===-1?[i(n)]:[i(n),i(n.slice(0,a))]};
var s=new Map;
var d=32768;
function i(e){let n=e.length;while(n>0){let a=e.charCodeAt(n-1);if(a!==46&&a!==32)break;n-=1}return n===e.length?e:e.slice(0,n)};
function r(e,n,a){return a===void 0?e:{...e,[n]:a}};
function f(e,n,a,t){let o=r({namespace:"transcript",projectKey:e,sessionId:n},"agentId",a);return r(o,"agentRelPath",t)};
function h(e,n,a){let c=r({namespace:"log",sessionId:e,channel:n},"agentId",a?.agentId);return r(c,"runId",a?.runId)};
var De={transcript:f,journal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,agentRelPath:a,journal:!0}),sessionJournal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,sessionJournal:a}),history:()=>({namespace:"history"}),log:h,globalConfig:()=>({namespace:"globalConfig"}),globalConfigCopy:(e,n)=>({namespace:"globalConfig",kind:e,stamp:n}),userSettings:()=>({namespace:"settings",layer:"user"}),projectSettings:(e)=>({namespace:"settings",layer:"project",projectKey:e}),localSettings:(e)=>({namespace:"settings",layer:"local",consentRootKey:e}),task:(e,n)=>({namespace:"task",listId:e,taskId:n}),taskListMeta:(e)=>({namespace:"task",listId:e,meta:!0}),taskListHighWaterMark:(e)=>({namespace:"task",listId:e,highWaterMark:!0}),memory:(e,n)=>({namespace:"memory",projectKey:e,relPath:n}),pluginRegistry:(e)=>({namespace:"pluginRegistry",file:e}),marketplaceCache:(e,n)=>({namespace:"marketplaceCache",marketplace:e,form:n}),marketplaceTree:(e,n)=>({namespace:"marketplaceCache",marketplace:e,relPath:n}),pluginCache:(e,n,a,t)=>({namespace:"pluginCache",marketplace:e,plugin:n,version:a,relPath:t}),cache:(e,n)=>({namespace:"cache",store:e,id:n}),paste:(e)=>({namespace:"paste",id:e}),state:(e)=>({namespace:"state",id:e}),pluginAssetCache:(e)=>({namespace:"pluginAssetCache",digest:e}),plan:(e)=>({namespace:"plan",name:e}),daemon:(e)=>({namespace:"daemon",relPath:e}),feedbackDraft:(e)=>({namespace:"feedbackDraft",draftId:e}),agentMemory:(e,n)=>({namespace:"agentMemory",layer:"user",agentType:e,relPath:n}),identity:()=>({namespace:"identity"}),team:(e)=>({namespace:"team",team:e}),sidecar:(e,n,a)=>({namespace:"sidecar",projectKey:e,sessionId:n,relPath:a}),mailbox:(e,n)=>({namespace:"mailbox",team:e,teammate:n}),scratch:(e,n)=>({namespace:"scratch",sessionId:e,relPath:n}),userConfigDir:(e,n)=>({namespace:"userConfigDir",dir:e,relPath:n}),fileHistory:(e,n)=>({namespace:"fileHistory",sessionId:e,backupFileName:n}),job:(e,n)=>({namespace:"job",jobId:e,relPath:n}),jobTimeline:(e)=>({namespace:"jobTimeline",jobId:e}),recording:(e,n,a)=>({namespace:"recording",projectKey:e,sessionId:n,stamp:a}),sessionLog:(e,n,a)=>({namespace:"sessionLog",projectKey:e,year:n.year,month:n.month,day:n.day,logName:a}),jobPins:()=>({namespace:"jobsRoot",file:"pins"}),jobDraft:(e)=>({namespace:"jobsRoot",draftKey:e}),session:(e)=>({namespace:"session",file:e}),bridgePointer:(e)=>({namespace:"bridgePointer",projectKey:e}),sessionAliases:(e)=>({namespace:"sessionAliases",projectKey:e}),dirSyncRecord:(e,n)=>({namespace:"dirSyncRecord",projectKey:e,sessionId:n})};
return {Xn,u,l,pqt,FK,s,m,i,d,p,fqt,De,f,r,h,Xx};
}
function module33(imports){
function tee(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n)|0;return e};
return {tee};
}
function module34(imports){
const S=lib0["join"];
const we=imports["we"];
const dKt=imports["dKt"];
const tee=imports["tee"];
var qse=200;
function Le(e){return Math.abs(tee(e)).toString(36)};
function k(e){return e.replace(/[^a-zA-Z0-9]/g,"-")};
function Jx(e){let n=k(e);if(n.length<=qse)return n;return`${n.slice(0,qse)}-${Le(e)}`};
function Dp(){return S(we(),"projects")};
function cw(e){return dKt()??Jx(e)};
function xg(e,n=Dp()){return S(n,cw(e))};
function HWe(){let e=dKt();return e===void 0?null:S(Dp(),e)};
var qbt=/^[0-9a-f]{16}(?:[0-9a-f]{48})?@v\d+$/;
return {Dp,qbt,HWe,xg,cw,Jx,k,qse,Le};
}
function module35(imports){
function aa(e,t){return{code:"InvalidArgument",argument:e,...t!==void 0&&{reason:t}}};
var DQr="AbsentParent";
function s6e(e){return e.code==="Failed"&&"telemetryCode"in e&&e.telemetryCode===DQr};
function Vf(e){if(s6e(e))return"ENOENT";return"telemetryCode"in e?e.telemetryCode:void 0};
return {aa,Vf,s6e,DQr};
}
function module36(imports){
const F=imports["F"];
const jr=lib0["basename"];
const Xn=imports["Xn"];
const It=lib0["basename"];
const fqt=imports["fqt"];
const Dp=imports["Dp"];
const xt=lib0["dirname"];
const De=imports["De"];
const aa=imports["aa"];
const FK=imports["FK"];
const qbt=imports["qbt"];
const Xx=imports["Xx"];
const Ae=lib0["join"];
const Bt=imports["Bt"];
const Br=lib0["relative"];
const kt=lib0["sep"];
const Mr=lib0["isAbsolute"];
const P=imports["P"];
const E=imports["E"];
const HWe=imports["HWe"];
const xg=imports["xg"];
const Es=imports["Es"];
function Un(e){return aa(e,"expected a segment that is not empty or made only of dots and spaces, with no path separator, NUL or set-aside shape")};
function Mm(e){if(typeof e!=="object"||e===null)return aa("key","expected a key object");let n=nr(e);if(n!==void 0)return n;let r=Ar(e);if(r===void 0)return aa("key",`${e.namespace} is not a storage namespace`);return Qe("key",r)};
function Qe(e,n){for(let[r,o,s]of n){let i=`${e}.${r}`;if(o===void 0){if(s!=="optional")return aa(i,"required")}else if(Yn(r)){if(!(e==="scope"&&r==="agentRelPath"&&Array.isArray(o)&&o.length===0)&&(!Array.isArray(o)||!Xx(o)))return aa(i,"expected a non-empty array of segments, none empty or made only of dots and spaces, with no path separator, NUL or set-aside shape")}else if(typeof o!=="string"||!Xn(o))return Un(i)}return};
function Yn(e){return e==="relPath"||e==="agentRelPath"};
var et=["commands","agents","output-styles","skills","workflows","routines","themes","rules","session-env","uploads","mcp-skill-archives","usage-data","mcp-discovery-cache"];
var tt=new Set(et);
var nt=`must be one of the userConfigDir directory names (${et.join(", ")})`;
var rt=["installed","marketplaces","flagged","catalog","inUseSweep"];
var Vn=new Set(rt);
var zn=`must be one of the pluginRegistry files (${rt.join(", ")})`;
var st=["manifest","catalog"];
var qn=new Set(st);
var Jn=`must be one of the marketplaceCache forms (${st.join(", ")})`;
var it=["world"];
var Zn=new Set(it);
var Qn=`must be one of the session journal names (${it.join(", ")})`;
function er(e){return Zn.has(e)};
function tr(e){return typeof e==="string"&&/^[0-9a-f]{64}$/.test(e)};
function nr(e){if(e.namespace==="transcript")return sr(e);if(e.namespace==="pluginAssetCache"&&!tr(e.digest))return aa("key.digest","must be a SHA-256 digest: 64 lowercase hexadecimal characters");if(e.namespace==="globalConfig"&&"kind"in e){if(!ut(e.kind))return aa("key.kind",lt);if(typeof e.stamp!=="string")return aa("key.stamp","a recovery copy key carries its stamp")}if(e.namespace==="task")return Sr(e);if(e.namespace==="sidecar"){let n=pe("key.sessionId",e.sessionId);if(n!==void 0)return n;if(ge(e.relPath))return aa("key.relPath",ie);return gt(e.relPath)?aa("key.relPath",ft):void 0}if(e.namespace==="recording")return pe("key.sessionId",e.sessionId)??(pt(e.stamp)?void 0:aa("key.stamp",ar));if(e.namespace==="jobsRoot")return Er(e);if(e.namespace==="userConfigDir"&&!tt.has(e.dir))return aa("key.dir",nt);if(e.namespace==="fileHistory")return rr(e);if(e.namespace==="settings"&&!br(e.layer))return aa("key.layer","must be user, project or local");if(e.namespace==="log")return Rr(e);if(e.namespace==="job"&&wt(e.relPath))return aa("key.relPath",Et);if(e.namespace==="sessionLog")return Pt("key",e)??(xr(e.logName)?void 0:aa("key.logName","must be the session-log stem <sessionId8>[-<title-slug>]: up to eight word characters, then lower-case a-z / 0-9 runs joined by single hyphens; not a bare device name"));if(e.namespace==="pluginRegistry"&&!Vn.has(e.file))return aa("key.file",zn);if(e.namespace==="marketplaceCache"){if(!("relPath"in e))return qn.has(e.form)?void 0:aa("key.form",Jn);return e.form===void 0?void 0:aa("key.form","a tree file key carries relPath, not form")}if(e.namespace!=="agentMemory")return;if(!at(e.layer))return aa("key.layer","must be user, project or local");if(e.layer==="user"&&"projectKey"in e)return aa("key.projectKey","the user layer is not keyed by project");if(e.layer!=="user"&&typeof e.projectKey!=="string")return aa("key.projectKey","required for the project and local layers");return typeof e.agentType==="string"?void 0:aa("key.agentType","an agent memory key names its agent")};
function rr(e){return typeof e.backupFileName!=="string"||!qbt.test(e.backupFileName)?aa("key.backupFileName","must be a backup file name the engine has ever written (hex hash @v version)"):void 0};
function at(e){return e==="user"||e==="project"||e==="local"};
var ct=["backup","corrupted"];
var or=new Set(ct);
var lt=`must be one of the global-config copy kinds (${ct.join(", ")})`;
function ut(e){return or.has(e)};
function sr(e){let n=pe("key.sessionId",e.sessionId);if(n!==void 0)return n;if(ge(e.agentRelPath))return aa("key.agentRelPath",ie);if("sessionJournal"in e){if(typeof e.sessionJournal!=="string"||!er(e.sessionJournal))return aa("key.sessionJournal",Qn);return e.agentId===void 0&&e.agentRelPath===void 0&&!("journal"in e)?void 0:aa("key.sessionJournal","a session journal key names the session's own journal: no agentId, agentRelPath or run journal")}if("journal"in e){if(e.journal!==!0)return aa("key.journal","must be true");if(!Array.isArray(e.agentRelPath))return aa("key.agentRelPath","a run journal key carries its run directory");return e.agentId===void 0?void 0:aa("key.agentId","a transcript key names an agent transcript or the run journal, never both")}return e.agentRelPath!==void 0&&e.agentId===void 0?aa("key.agentRelPath","requires agentId or journal"):void 0};
var Ibt="cloud-snapshots";
var dt=new Set(["memory","tiny_memory","bagel",Ibt,"bridge-pointer.json",".session-aliases"]);
var ir=/^[0-9]{1,16}$/;
var ar="must be the recording stamp: 1 to 16 decimal digits (epoch milliseconds)";
var fe=".cast";
var ft=`<stamp>${fe} inside a session's folder is that session's terminal recording stream: address it as keys.recording(projectKey, sessionId, stamp)`;
function pt(e){return typeof e==="string"&&ir.test(e)};
function gt(e){return Array.isArray(e)&&typeof e[0]==="string"&&FK(e[0]).some((n)=>R7r(n)!==void 0)};
function R7r(e){if(!e.endsWith(fe))return;let n=e.slice(0,-fe.length);return pt(n)?n:void 0};
var mt=[".ccr-tip.json",".precompact.json",fe];
var cr=`must not end with ${mt.join(", ")}: those name a session's project-level sibling files`;
function ht(e){return FK(e).some((n)=>mt.some((r)=>n.endsWith(r)))};
var Mrr=".dir-sync.json";
var ur=`must not end with ${Mrr}: that name is reserved for a cloud session's record at the project level`;
function dr(e){return FK(e).some((n)=>n.endsWith(Mrr))};
var fr=`${[...dt].join(", ")} are reserved: they name project-level entries, not sessions`;
function yt(e){return FK(e).some((n)=>dt.has(n))};
function pe(e,n){if(typeof n!=="string")return;if(yt(n))return aa(e,fr);if(ht(n))return aa(e,cr);if(dr(n))return aa(e,ur);return fqt(n)?aa(e,ie):void 0};
var gr=".meta.json";
var mr=".meta is reserved for the list metadata key, under every spelling that opens its file";
function hr(e){return yr(`${e}.json`)};
function yr(e){return FK(e).includes(gr)};
var ie="names a .jsonl stream, which only a transcript key addresses";
function ge(e){return Array.isArray(e)&&e.some((n)=>typeof n==="string"&&fqt(n))};
function br(e){return e==="user"||e==="project"||e==="local"};
var bt="must be debug, telemetry or apiDump";
function Rt(e){return e==="debug"||e==="telemetry"||e==="apiDump"};
function Rr(e){if(!Rt(e.channel))return aa("key.channel",bt);if(e.channel!=="apiDump")return;for(let n of["agentId","runId"])if(n in e&&e[n]!==void 0)return aa(`key.${n}`,"an apiDump key names its dump by one id \u2014 the agent's for a subagent's requests, else the session's (today's dump-prompts/<id>.jsonl); agentId and runId nest nothing on this channel");return};
function Sr(e){if("taskId"in e&&(("meta"in e)||("highWaterMark"in e)))return aa("key.taskId","a task key names an item, the list metadata or the list high-water mark, never more than one");if("meta"in e&&"highWaterMark"in e)return aa("key.highWaterMark","a task key names an item, the list metadata or the list high-water mark, never more than one");if("meta"in e&&e.meta!==!0)return aa("key.meta","must be true");if("highWaterMark"in e&&e.highWaterMark!==!0)return aa("key.highWaterMark","must be true");if(typeof e.listId!=="string")return aa("key.listId","a task key carries its listId");if("meta"in e||"highWaterMark"in e)return;if(typeof e.taskId!=="string")return aa("key.taskId","a task item key carries its taskId");if(hr(e.taskId))return aa("key.taskId",mr);return};
function Er(e){if("file"in e&&"draftKey"in e)return aa("key.draftKey","a jobs-root key names the pins file or one draft, never both");if("file"in e)return e.file==="pins"?void 0:aa("key.file","must be pins");if(typeof e.draftKey!=="string")return aa("key.draftKey","a jobs-root draft key carries its draftKey");return vr.test(e.draftKey)?void 0:aa("key.draftKey","must be 8 lowercase hex characters")};
var St="timeline.jsonl";
var Et=`${St} is the job's timeline stream: address it as keys.jobTimeline(jobId)`;
function wt(e){return Array.isArray(e)&&typeof e[0]==="string"&&FK(e[0]).includes(St)};
var wr=/^\d{4}$/;
var Ze=/^\d{2}$/;
var _r=/^[A-Za-z0-9_-]{1,8}(?:-[a-z0-9]+)*$/;
var Pr=128;
var Ir=/^(?:con|prn|aux|nul|com\d|lpt\d)$/i;
function xr(e){return typeof e==="string"&&e.length<=Pr&&_r.test(e)&&!Ir.test(e)};
function Pt(e,n){if(n.year!==void 0&&!ve(wr,n.year))return aa(`${e}.year`,"must be four digits (YYYY)");if(n.month!==void 0&&!ve(Ze,n.month))return aa(`${e}.month`,"must be two digits (MM)");if(n.day!==void 0&&!ve(Ze,n.day))return aa(`${e}.day`,"must be two digits (DD)");return};
function ve(e,n){return typeof n==="string"&&e.test(n)};
var vr=/^[0-9a-f]{8}$/;
function Ar(e){switch(e.namespace){case"transcript":return[["projectKey",e.projectKey],["sessionId",e.sessionId],["agentId",e.agentId,"optional"],["agentRelPath",e.agentRelPath,"optional"]];case"history":case"identity":return[];case"globalConfig":return"kind"in e?[["stamp",e.stamp]]:[];case"settings":return e.layer==="user"?[]:e.layer==="project"?[["projectKey",e.projectKey]]:[["consentRootKey",e.consentRootKey]];case"task":return"taskId"in e?[["listId",e.listId],["taskId",e.taskId]]:[["listId",e.listId]];case"memory":return[["projectKey",e.projectKey],["relPath",e.relPath]];case"pluginRegistry":return[];case"marketplaceCache":return"relPath"in e?[["marketplace",e.marketplace],["relPath",e.relPath]]:[["marketplace",e.marketplace]];case"pluginCache":return[["marketplace",e.marketplace],["plugin",e.plugin],["version",e.version],["relPath",e.relPath]];case"cache":return[["store",e.store],["id",e.id]];case"paste":return[["id",e.id]];case"pluginAssetCache":return[["digest",e.digest]];case"state":return[["id",e.id]];case"plan":return[["name",e.name]];case"feedbackDraft":return[["draftId",e.draftId]];case"agentMemory":return[...e.layer==="user"?[]:[["projectKey",e.projectKey]],["agentType",e.agentType],["relPath",e.relPath]];case"team":return[["team",e.team]];case"sidecar":return[["projectKey",e.projectKey],["sessionId",e.sessionId],["relPath",e.relPath]];case"scratch":return[["sessionId",e.sessionId],["relPath",e.relPath]];case"userConfigDir":return[["relPath",e.relPath]];case"fileHistory":return[["sessionId",e.sessionId],["backupFileName",e.backupFileName]];case"job":return[["jobId",e.jobId],["relPath",e.relPath]];case"daemon":return[["relPath",e.relPath]];case"jobsRoot":return"file"in e?[]:[["draftKey",e.draftKey]];case"session":return[["file",e.file]];case"bridgePointer":case"sessionAliases":return[["projectKey",e.projectKey]];case"dirSyncRecord":return[["projectKey",e.projectKey],["sessionId",e.sessionId]];case"mailbox":return[["team",e.team],["teammate",e.teammate]];case"log":return[["sessionId",e.sessionId],["agentId",e.agentId,"optional"],["runId",e.runId,"optional"]];case"jobTimeline":return[["jobId",e.jobId]];case"recording":return[["projectKey",e.projectKey],["sessionId",e.sessionId],["stamp",e.stamp]];case"sessionLog":return[["projectKey",e.projectKey],["year",e.year],["month",e.month],["day",e.day],["logName",e.logName]]}return};
var Or=6;
function Vx(e){let n=It(e);if(fqt(n))return;let r=Dp(),o=[n],s=xt(e);while(s!==r&&o.length<=Or+1){let b=xt(s);if(b===s)return;o.unshift(It(s)),s=b}if(s!==r||o.length<3)return;let[i,c,...f]=o;if(!Xn(i)||!Xn(c)||f.length===0||!f.every(Xn))return;let g=De.sidecar(i,c,f);return Mm(g)===void 0?g:void 0};
var Afe="tool-results";
function P_(e){return Ct(e.root.id,()=>Es(e.root).originalCwd)};
function Ct(e,n){return Ae(HWe()??xg(n()),e,Afe)};
function sW(e,n){if(jr(e)!==Afe||!Xn(n))return;return Vx(Ae(e,n))};
function Kr(e){let n=sW(e,"probe");if(n===void 0||n.namespace!=="sidecar")return;return{namespace:"sidecar",projectKey:n.projectKey,sessionId:n.sessionId,relPath:n.relPath.slice(0,-1)}};
async function iW(e,n){if(F()&&n!==void 0){let s=Kr(e);if(s!==void 0)try{if((await n.ensureScope(s)).ok)return}catch{}}let r=Bt(),o=!1;try{o=await Hr(r,e)}catch{}if(!o)return;try{await r.mkdir(e)}catch{}};
async function Hr(e,n){return await At(e,n)===void 0};
async function At(e,n){let r=Dp(),o=Br(r,n);if(o===""||o===".."||o.startsWith(".."+kt)||Mr(o))return;let s=r;for(let i of o.split(kt)){s=Ae(s,i);let c=await e.lstat(s);if(c===void 0)return;if(c.isSymbolicLink||!c.isDirectory)return s}return};
async function H7r(e,n){let r=await At(n,e);if(r!==void 0)throw new P(`tool-results path refused: ${r} is a link or not a directory`,"tool-results path refused: a directory on the way is a link or not a directory")};
async function D7r(e,n){if((await n.lstat(e))?.isSymbolicLink)await Dt(n,e)};
async function Dt(e,n){try{await e.delete(n)}catch(r){if(E(r)!=="ENOENT")throw r}};
return {iW,Kr,sW,Afe,Vx,Or,Mm,nr,sr,pe,yt,dt,Ibt,fr,ht,mt,fe,cr,dr,Mrr,ur,ie,ge,er,Zn,it,Qn,tr,ut,or,ct,lt,Sr,hr,yr,gr,mr,gt,R7r,pt,ir,ft,ar,Er,vr,tt,et,nt,rr,br,Rr,Rt,bt,wt,St,Et,Pt,ve,wr,Ze,xr,Pr,_r,Ir,Vn,rt,zn,qn,st,Jn,at,Ar,Qe,Yn,Un,Hr,At,H7r,D7r,Dt,P_,Ct};
}
function module37(imports){
function pn(t){let e=t/1024;if(e<1)return`${t} bytes`;if(e<1024)return`${e.toFixed(1).replace(/\.0$/,"")}KB`;let r=e/1024;if(r<1024)return`${r.toFixed(1).replace(/\.0$/,"")}MB`;return`${(r/1024).toFixed(1).replace(/\.0$/,"")}GB`};
return {pn};
}
function module38(imports){
const td=imports["td"];
const i=imports["i"];
const Nn=imports["Nn"];
const g4o=imports["g4o"];
const h4o=imports["h4o"];
const G_=imports["G_"];
const _=imports["_"];
const HOe=imports["HOe"];
const F1e=imports["F1e"];
const b=lib0["basename"];
const X=lib0["join"];
const iW=imports["iW"];
const Z=imports["Z"];
const t=imports["t"];
const F=imports["F"];
const sW=imports["sW"];
const z=lib0["dirname"];
const process=imports["process"];
const Vf=imports["Vf"];
const pn=imports["pn"];
const Bt=imports["Bt"];
const H7r=imports["H7r"];
const D7r=imports["D7r"];
const E=imports["E"];
const re=imports["re"];
const HIe=imports["HIe"];
const JM=imports["JM"];
const k=imports["k"];
var rre="<persisted-output>";
var jKn="</persisted-output>";
var v="<truncated-output>";
var K="</truncated-output>";
var J="tengu_velvet_ibis";
function Dde(e,n,r=JM,s=!1){if(!Number.isFinite(n))return n;if(s)return Math.min(n,r);let o=k(J,{})?.[e];if(typeof o==="number"&&Number.isFinite(o)&&o>0)return o;return Math.min(n,r)};
var iRe=2000;
var O="tool result was not saved";
function M_e(e,n,r){return X(e,`${n}.${r?"json":"txt"}`)};
async function Z6(e,n,r,s,a=h4o){let o=Array.isArray(e);if(o){if(e.some((g)=>!td(g)||g.type!=="text"))return{error:"Cannot persist tool results containing non-text content"}}let l=G_();if(l!==void 0){let p=Math.min(a,l.maxBytes),g,d,R;try{g=o?_(e,null,2):e,d=HOe(g,p),R=Buffer.from(d)}catch{return{error:O}}let C=await F1e(l,{leafName:b(M_e(r,n,o)),data:R});if(C===null)return{error:O};let{preview:A,hasMore:U}=n8e(d,iRe);return{filepath:C.path,originalSize:g.length,isJson:o,preview:A,hasMore:U,truncatedAtBytes:d===g?void 0:p}}await iW(r,s);let u=M_e(r,n,o),h,f;try{h=o?_(e,null,2):e,f=HOe(h,a)}catch(p){let g=I(Z(p));return t(`Failed to persist tool result to ${u}: ${g}`,{level:"error"}),{error:g}}let S=f===h?void 0:a,T=F()&&s!==void 0?sW(z(u),b(u)):void 0;if(F()&&s!==void 0&&T!==void 0){let p=await s.write(T,f,{precondition:{type:"ifAbsent"},mode:438&~process.umask()});if(!p.ok&&p.error.code!=="AlreadyExists"){let g=ae(p.error,u);return t(`Failed to persist tool result to ${u}: ${g}`,{level:"error"}),{error:g}}if(p.ok)t(`Persisted tool result to ${u} (${pn(f.length)})`)}else{let p=Bt();try{await H7r(z(u),p),await D7r(u,p),await p.writeExclusive(u,f),t(`Persisted tool result to ${u} (${pn(f.length)})`)}catch(g){if(E(g)!=="EEXIST")return t(`Failed to persist tool result to ${u}: ${I(Z(g))}`,{level:"error"}),{error:I(Z(g))};let d;try{d=await p.lstat(u)}catch{return{error:"tool result path could not be checked; not persisted"}}if(d?.isSymbolicLink)return{error:"tool result path is a link; not persisted"};if(d?.isFile!==!0)return{error:"tool result path is not a regular file; not persisted"};if(d.nlink>1)return{error:"tool result path has another name; not persisted"}}}let{preview:y,hasMore:P}=n8e(f,iRe);return{filepath:u,originalSize:h.length,isJson:o,preview:y,hasMore:P,truncatedAtBytes:S}};
function L_e(e){let n=`${rre}
`;return n+=e.truncatedAtBytes===void 0?`Output too large (${pn(e.originalSize)}). Full output saved to: ${e.filepath}

`:`Output exceeded the ${pn(e.truncatedAtBytes)} persist limit; only the first ${pn(e.truncatedAtBytes)} were saved to: ${e.filepath}

`,n+=`Preview (first ${pn(iRe)}):
`,n+=e.preview,n+=e.hasMore?`
...
`:`
`,n+=jKn,n};
var V="1023 bytes";
function WKn(e,n){if(Array.isArray(e)&&e.some((l)=>!td(l)||l.type!=="text"))return null;let r=typeof e==="string"?e:e.flatMap((l)=>l.type==="text"&&("text"in l)&&typeof l.text==="string"?[l.text]:[]).join(`
`),s=pn(r.length),a=Math.max(0,n-L(s,V,"").length),o=re(r,n8e(r,a).preview.length);if(o.length===r.length)return null;return{message:L(s,pn(o.length),o),originalSize:r.length}};
function L(e,n,r){return`${v}
Output too large (${e}). It could not be saved, so only the first ${n} are shown; the rest was dropped. If the tool can page or filter its results, call it again for the part you need.

${r}
${K}`};
async function t8e(e,n,r,s){return q(e,n.name,r,Dde(n.name,n.maxResultSizeChars,n.persistenceThresholdCeiling,n.skipAggregateToolResultBudget===!0),s)};
function d$r(e){if(!e)return!0;if(typeof e==="string")return e.trim()==="";if(!Array.isArray(e))return!1;if(e.length===0)return!0;return e.every((n)=>td(n)&&n.type==="text"&&("text"in n)&&(typeof n.text!=="string"||n.text.trim()===""))};
async function q(e,n,r,s,a){let o=e.content;if(d$r(o))return i("tengu_tool_empty_result",{toolName:Nn(n)}),{...e,content:`(${n} completed with no output)`};if(!o)return e;let l=s??g4o;if(!u$r(o,l))return e;let u=await Z6(o,e.tool_use_id,r,a);if(eG(u)){if(G_()!==void 0){let f=WKn(o,l);if(f===null)return e;return i("tengu_tool_result_persisted",{toolName:Nn(n),originalSizeBytes:f.originalSize,persistedSizeBytes:f.message.length,estimatedOriginalTokens:Math.ceil(f.originalSize/HIe),estimatedPersistedTokens:Math.ceil(f.message.length/HIe),thresholdUsed:l,stored:!1}),{...e,content:f.message}}return e}let h=L_e(u);return i("tengu_tool_result_persisted",{toolName:Nn(n),originalSizeBytes:u.originalSize,persistedSizeBytes:h.length,estimatedOriginalTokens:Math.ceil(u.originalSize/HIe),estimatedPersistedTokens:Math.ceil(h.length/HIe),thresholdUsed:l,truncatedAtCap:u.truncatedAtBytes!==void 0}),{...e,content:h}};
function n8e(e,n){if(e.length<=n)return{preview:e,hasMore:!1};let s=e.slice(0,n).lastIndexOf(`
`),a=s>n*0.5?s:n;return{preview:e.slice(0,a),hasMore:!0}};
function eG(e){return"error"in e};
function u$r(e,n){return!D(e)&&H(e)>n};
function D(e){return Array.isArray(e)&&e.some((n)=>td(n)&&(n.type==="image"||n.type==="document"))};
function H(e){if(typeof e==="string")return e.length;if(!Array.isArray(e))return 0;return e.reduce((n,r)=>n+(td(r)&&r.type==="text"&&"text"in r&&typeof r.text==="string"?r.text.length:0),0)};
function ae(e,n){let r=Vf(e);if(r===void 0)return`storage write failed: ${e.code}`;let s=Error("storage write failed");return s.code=r,s.path=n,I(s)};
function I(e){let n=e;if(n.code)switch(n.code){case"ENOENT":return`Directory not found: ${n.path??"unknown path"}`;case"EACCES":return`Permission denied: ${n.path??"unknown path"}`;case"ENOSPC":return"No space left on device";case"EROFS":return"Read-only file system";case"EMFILE":return"Too many open files";case"EEXIST":return`File already exists: ${n.path??"unknown path"}`;default:return`${n.code}: ${n.message}`}return e.message};
return {t8e,q,d$r,u$r,D,H,Z6,O,M_e,n8e,iRe,I,ae,eG,WKn,L,v,K,V,L_e,rre,jKn,Dde,J};
}
function module39(imports){
const re=imports["re"];
function zt(u){return u.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")};
function _we(u,d){let e=zt(u);if(e.length<=d)return e;return zt(YGt(u,d))};
function YGt(u,d){let a=Math.max(0,Math.floor(u.length*(d/zt(u).length)));for(;;){let c=re(u,a);if(zt(c).length+13<=d||a===0)return c+"\u2026 [truncated]";a=Math.floor(a*0.9)}};
return {zt,_we,YGt};
}
function module40(imports){
var Ru="task-notification";
var Oz="task-id";
var zK="tool-use-id";
var ZZ="task-type";
var ret="output-file";
var aC="status";
var wT="summary";
return {Oz,zK,ZZ,ret,aC,wT,Ru};
}
function module41(imports){
const Oz=imports["Oz"];
const zK=imports["zK"];
const ZZ=imports["ZZ"];
const ret=imports["ret"];
const aC=imports["aC"];
const wT=imports["wT"];
const Ru=imports["Ru"];
function qi({taskId:n,toolUseId:s,taskType:r,outputFile:e,status:i,summary:t,body:u,trailing:d}){let f=[[Oz,n],[zK,s],[ZZ,r],[ret,e],[aC,i],[wT,t]],o=`<${Ru}>`;for(let[a,T]of f)if(T)o+=`
<${a}>${T}</${a}>`;return`${o}${u??""}
</${Ru}>${d??""}`};
return {qi};
}
function module42(imports){
const PWo=imports["PWo"];
const k3t=imports["k3t"];
const k=imports["k"];
const Za=imports["Za"];
const bde=imports["bde"];
const ge=imports["ge"];
const Un=imports["Un"];
const l9=imports["l9"];
const obe=imports["obe"];
const bfe=imports["bfe"];
const Zl=imports["Zl"];
const _n=imports["_n"];
const TZe=imports["TZe"];
const LZ=imports["LZ"];
const t=imports["t"];
const V9=imports["V9"];
const Ty=imports["Ty"];
const LEe=imports["LEe"];
const S$=imports["S$"];
const dd=imports["dd"];
const HG=imports["HG"];
const Nn=imports["Nn"];
const d=imports["d"];
const Bn=imports["Bn"];
const Wpe=imports["Wpe"];
const KS=imports["KS"];
const Tt=imports["Tt"];
const i=imports["i"];
const Ye=imports["Ye"];
const p=imports["p"];
const t8e=imports["t8e"];
const P_=imports["P_"];
const I=imports["I"];
const zt=imports["zt"];
const rSt=imports["rSt"];
const Z6=imports["Z6"];
const eG=imports["eG"];
const Mi=imports["Mi"];
const qi=imports["qi"];
const _we=imports["_we"];
const Ge=imports["Ge"];
const m=imports["m"];
const Kyn=imports["Kyn"];
const y=imports["y"];
const fu=imports["fu"];
const sB=imports["sB"];
const md=imports["md"];
const Ru=imports["Ru"];
var xC="web-fetch";
function YM(e){return e.agentType==="subagent"&&e.isBuiltIn===!0&&e.subagentName===xC};
var Ert={ArtifactComments:"Artifact",ArtifactData:"Artifact",ArtifactCheck:"Artifact"};
var Crt={Artifact:{comments:"ArtifactComments",reply:"ArtifactComments",resolve:"ArtifactComments",watch:"ArtifactComments",unwatch:"ArtifactComments",status:"ArtifactComments",resume_replies:"ArtifactComments",read_db:"ArtifactData",write_db:"ArtifactData",verify:"ArtifactCheck",preview:"ArtifactCheck"}};
function F2n(e){return Object.hasOwn(Ert,e)?Ert[e]:void 0};
function Rrt(e,n){if(!Object.hasOwn(Crt,e))return;let r=n?.action,s=Crt[e];return typeof r==="string"&&Object.hasOwn(s,r)?s[r]:void 0};
function Cc(e){if(e.name.startsWith(HG))return"skill_tool";let n=String(Nn(e.name));if(n!==e.name)return n;if(e.mcpInfo!==void 0)return"mcp_tool";if(e.name.startsWith("eval_registered__"))return"eval_registered";if(e.uiTableKey!==void 0||e.name.includes("__"))return"dynamic_tool";return e.name};
var Woe="tool_call";
function uCt(e,{isOnScreen:n}){return`[Still running. The user sent a message while this call loads, and that message follows so you can answer it now. This ${e} call was not interrupted. Its result will be delivered to you on its own, in a later <${Ru}> carrying this tool_use_id. Do not repeat the call, and do not wait, sleep or poll for it. You cannot stop it either, so never say you cancelled or dropped it.${n?" On the user's screen this call simply still shows as in progress: nothing there says it was moved, backgrounded or detached, so do not describe it that way.":""} If they ask, it is still loading.]`};
var zoe=300000;
class xK{count=0};
function rE(e){if(e instanceof Ye)return e.message||fu;if(!(e instanceof Error))return String(e);let r=JPr(e).filter(Boolean).join(`
`).trim()||"Command failed with no output",s="maxErrorChars"in e&&typeof e.maxErrorChars==="number"&&Number.isFinite(e.maxErrorChars)&&e.maxErrorChars>0?e.maxErrorChars:void 0,g=md(r,s),h="truncationNote"in e&&typeof e.truncationNote==="string"&&e.truncationNote.length>0?e.truncationNote:void 0;return h!==void 0&&g!==r?`${g}

${h}`:g};
function JPr(e){if(e instanceof sB)return[`Exit code ${e.code}`,e.interrupted?fu:"",e.stderr,e.stdout];let n=[e.message];if("stderr"in e&&typeof e.stderr==="string")n.push(e.stderr);if("stdout"in e&&typeof e.stdout==="string")n.push(e.stdout);return n};
var DMe=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionDenied"]);
var Cdo=new Set([...DMe,"PostToolBatch"]);
function pne(e,n,r){let s=e?.agentId??r,g=e?.agentContext;return g!==void 0&&YM(g)&&Cdo.has(n)?[s,g.parentAgentId??r]:[s]};
function Jsn(){return k("tengu_velvet_panda",!0)};
function Mxr(){return Jsn()&&k("tengu_bubbly_meteor",!0)};
function fjn(e){return e&&!k3t()&&Mxr()};
class _xt{#e=new Set;add(e){return this.#e.add(e),()=>{this.#e.delete(e)}}list(){return[...this.#e]}};
var cTe=new Tt(()=>new _xt);
function ZTo(e){let n=0;for(let r of e)try{if(r.backgroundNow())n++}catch(s){t(`[foreground-tool-calls] moving ${r.toolUseId??"a call"} threw; it stays in the foreground`,{level:"error"}),d(s)}return n};
var kxt=rSt-2000;
function LMe(e,n,r){try{if(PWo(e)!=="detach"||r.agentId!==void 0||r.innerCall===!0||r.remoteCall!==void 0||r.options.isNonInteractiveSession&&!fjn(!0)||Za()||!k("tengu_tool_detach",!0))return!1;for(let s of["PostToolUse","PostToolUseFailure"])if(iPo({hookEvent:s,toolName:e.name,toolInput:n,tools:r.options.tools,toolAliases:r.options.toolAliases,sessionHooks:r.sessionHooksRegistry,sessionId:pne(r,s,r.session.id)}))return!1;return!(mFe("PostToolBatch",r.sessionHooksRegistry,pne(r,"PostToolBatch",r.session.id))||bde("PostToolBatch")||dd("tool.call",{tool:e.name}))}catch(s){return t(`[detach] ${Cc(e)}: the gate threw, so the call runs inline`,{level:"error"}),d(s),!1}};
async function Sxt({tool:e,input:n,toolUseID:r,toolUseContext:s,onProgress:g,run:h}){let b=Bn(),w=Wpe(s.abortController,b),D=!0;b.signal.addEventListener("abort",()=>{if(D&&!s.abortController.signal.aborted)s.abortController.abort(b.signal.reason)},{once:!0});let j=g?($e)=>{if(D)g($e)}:void 0,z=h({...s,abortController:b},j),K=KS.of(s.session),he=z.finally(()=>K.ended(r)).then(()=>"settled",()=>"settled"),_e=()=>{},ke=new Promise(($e)=>{_e=()=>$e("early")}),be=cTe.of(s.session).add({toolUseId:r,backgroundNow:()=>{if(!D||s.abortController.signal.aborted||s.toolState.get(xK).count>0||!LMe(e,n,s))return!1;return D=!1,K.letGo(r),_e(),!0}}),ve;try{ve=await Promise.race([he,ke])}finally{D=!1,be()}if(w(),ve==="settled"||s.abortController.signal.aborted)return await z;i("tengu_tool_call_detached",{toolName:Nn(e.name)}),t(`[detach] ${Cc(e)} ${r} moved to the background to deliver a message`);let Te=!s.options.isNonInteractiveSession;K.started(r,{detachedAt:Date.now(),tool:e,input:n},($e)=>b.abort($e));let xe=!1,Pe=setTimeout(()=>{xe=!0,b.abort("detached-ceiling")},zoe);return Pe.unref(),z.finally(()=>clearTimeout(Pe)).then(($e)=>{if(b.signal.aborted)throw new Ye;return $e}).then(($e)=>{if(!K.settled(r,{status:"completed",settledAt:Date.now(),data:$e.data})){p("query_tool_detach","conversation_cleared");return}return Rdo({tool:e,toolUseID:r,toolUseContext:s,result:$e,isOnScreen:Te,stillHeard:()=>K.getSnapshot().has(r)}).finally(()=>K.resultQueued(r))},($e)=>{let Ne=!xe&&b.signal.reason==="user-cancel",We=xe?`The call did not finish within ${zoe/60000} minutes and was stopped.`:Ne?"The user stopped this call before it finished.":rE($e);if(!K.settled(r,{status:Ne?"stopped":"failed",settledAt:Date.now(),text:We})){p("query_tool_detach","conversation_cleared");return}if(pre({toolName:e.name,toolUseID:r,status:"failed",text:We,passive:Ne,isOnScreen:Te})==="dropped")m("query_tool_detach","notify_failed");else p("query_tool_detach",xe?"ceiling":b.signal.aborted?"aborted":"tool_error")}).catch(d),{data:void 0,detached:{text:uCt(e.name,{isOnScreen:Te})}}};
async function Rdo({tool:e,toolUseID:n,toolUseContext:r,result:s,isOnScreen:g,stillHeard:h}){let b;try{let D=await t8e(e.mapToolResultToToolResultBlockParam(s.data,n),e,P_(r.session),r.storageV5);if(!h()){p("query_tool_detach","conversation_cleared");return}if(b=xdo(D.content),zt(b).length>kxt){let j=await Z6(b,n,P_(r.session),r.storageV5);if(!h()){p("query_tool_detach","conversation_cleared");return}if(eG(j)){pre({toolName:e.name,toolUseID:n,status:"failed",text:"The call completed, but its result is too large to carry in a notification and could not be saved to a file.",passive:!1,isOnScreen:g}),m("query_tool_detach","oversize_unsaved");return}b=`The result is ${j.originalSize} characters, too large to carry in a notification, so none of it is quoted here. ${j.truncatedAtBytes===void 0?"All of it":`Its first ${j.truncatedAtBytes} bytes`} was saved to ${j.filepath}. Read that file to see it.`}}catch(D){if(d(D),!h()){p("query_tool_detach","conversation_cleared");return}pre({toolName:e.name,toolUseID:n,status:"failed",text:"The call completed but its result could not be rendered.",passive:!1,isOnScreen:g}),m("query_tool_detach","render_failed");return}switch(pre({toolName:e.name,toolUseID:n,status:"completed",text:b,passive:!1,isOnScreen:g})){case"delivered":Kyn(s,!1,d),y("query_tool_detach");break;case"degraded":p("query_tool_detach","degraded_notification");break;case"dropped":m("query_tool_detach","notify_failed");break}};
function xdo(e){if(e===void 0)return"";if(typeof e==="string")return e;let n=[],r=0;for(let s of e)if(s.type==="text"&&typeof s.text==="string")n.push(s.text);else r++;if(r>0)n.push(`[${r} non-text ${I(r,"block")} of the result could not be carried in a notification]`);return n.join(`
`)};
function pre({toolName:e,toolUseID:n,status:r,text:s,passive:g,isOnScreen:h}){let b=r==="completed"?`The ${e} call finished; its result follows. ${h?"On the user's screen it just landed in that call's own row, like any tool result. ":""}Carry on from it as if the tool had just returned: do not announce a notification or a background task. If the user has since said they no longer need this result, do not answer the old request again: correct anything you got wrong in one or two lines, or say nothing new.`:`The ${e} call ended without a result; what happened follows. ${h?"On the user's screen that call's own row shows how it ended, like any tool error or interrupted call. ":""}Carry on as if the tool had just returned it: do not announce a notification or a background task.`;try{return Mi({value:qi({toolUseId:n,taskType:Woe,status:r,summary:zt(b),body:`
<result>
${_we(s,kxt)}
</result>`}),mode:"task-notification",skipAttachments:!0,priority:"next",agentId:Ge(),...g&&{passive:!0}},{turnAttribution:"inherit"}),"delivered"}catch(w){d(w);try{return Mi({value:qi({toolUseId:n,taskType:Woe,status:r,summary:zt(`${b} The result could not be rendered.`)}),mode:"task-notification",skipAttachments:!0,priority:"next",agentId:Ge()},{turnAttribution:"inherit"}),"degraded"}catch(D){return t(`[detach] degraded notification enqueue failed: ${String(D)}`,{level:"error"}),"dropped"}}};
function G$o(e,n,r){if(!(n?/^[a-zA-Z0-9_|, -]+$/:/^[a-zA-Z0-9_|]+$/).test(e))return;return e.split(n?/[|,]/:"|").map((g)=>g.trim()).filter(Boolean).flatMap((g)=>bfe(Zl(g),r))};
function PLe(e,n){if(e!=="PreModelSwitch"&&e!=="PostModelSwitch")return n;let r=n.replace(/\[[12]m\](?=\s*(?:[|,]|$))/gi,"");return r.trim()===""?n:r};
var ILe=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionDenied","UserPromptExpansion","SessionStart","SessionEnd","Setup","PreCompact","PostCompact","PreModelSwitch","PostModelSwitch","Notification","SubagentStart","SubagentStop","Elicitation","ElicitationResult","ConfigChange","InstructionsLoaded","DirectoryAdded"]);
var K$o=/^\^?(?:\((?:\?:)?)?\^?\w+\$?(?:\|\^?\w+\$?)*\)?\$?$/;
function V$o(e,n){let r=n===void 0?void 0:_n(n,e);if(r!==void 0)return r.mcpInfo===void 0?r.familyParentToolName:void 0;return F2n(e)};
function VWt(e,n,r){let s=[],g=V$o(e,n);if(g!==void 0)s.push(g);let h=n===void 0?void 0:_n(n,e);if(h!==void 0){if(h.mcpInfo===void 0)s.push(...h.hookMatcherFamilyNames?.(r)??[])}else{let b=Rrt(e,r);if(b!==void 0)s.push(b)}return s};
function OLe(e,n,r,s,g,h){if(!n||n==="*")return!0;let b=G$o(n,r,s),w=VWt(e,g,h);if(b!==void 0)return b.includes(e)||w.some((D)=>b.includes(D));try{let D=new RegExp(n);if(D.test(e))return!0;if(K$o.test(n)&&w.some((j)=>D.test(j)))return!0;for(let j of TZe(e))if(D.test(j))return!0;for(let j of LZ(e,s))if(D.test(j))return!0;return!1}catch{return t(`Invalid regex pattern in hook matcher: ${n}`),!1}};
function W0o(e,n){let r=new Set((ge("policySettings")?.hooks?.[n]??[]).map((s)=>Un(s)));return e.filter((s)=>!r.has(Un(s)))};
function OB(e,n,r,s){if(s?.managedHooksOnly){let w=ge("policySettings");if(w?.disableAllHooks===!0)return[];return[...w?.hooks?.[r]??[]]}let g=s?.managedHooksExcluded?W0o(l9(r),r):[...l9(r)],h=typeof n==="string"?[n]:n;if(e===void 0||obe())return g;for(let w of h){let D=e.get(w,r).get(r);if(D)g.push(...D)}let b=h[0];if(b!==void 0){let w=e.getFunctionHooks(b,r).get(r);if(w)g.push(...w)}return g};
function iPo({hookEvent:e,toolName:n,toolInput:r,tools:s,toolAliases:g,sessionHooks:h,sessionId:b}){if(bde(e))return!0;let w=ILe.has(e);return OB(h,b,e).some(({matcher:D})=>!D||OLe(n,PLe(e,D),w,g,s,r))};
function mFe(e,n,r){let s=V9()?.[e];if(s&&s.length>0)return!0;if(!Ty()){let b=LEe()?.[e];if(b&&b.length>0)return!0}let g=S$()?.[e];if(g&&g.length>0)return!0;if(n===void 0)return!1;return(typeof r==="string"?[r]:r).some((b)=>n.has(b,e))};
return {LMe,fjn,Mxr,Jsn,iPo,ILe,OB,W0o,OLe,G$o,VWt,V$o,F2n,Ert,Rrt,Crt,K$o,PLe,pne,YM,xC,Cdo,DMe,mFe,Cc,Sxt,cTe,_xt,xK,zoe,Rdo,xdo,kxt,pre,Woe,rE,JPr,uCt,ZTo};
}
export function createPrintDetachedRuntime287(ports){
const m0=module0({});
const m1=module1({"N":m0["N"]});
const m2=module2({});
const m3=module3({"n":ports["executionContext"],"c":ports["legacyContext"],"yo":m2["yo"]});
const m4=module4({});
const m5=module5({});
const m6=module6({"Le":m4["Le"],"process":ports["process"],"is":m5["is"]});
const m7=module7({"xk":ports["backgroundPolicy"],"a":ports["environment"],"xr":m6["xr"]});
const m8=module8({"N":m0["N"]});
const m9=module9({"ut":ports["modsRegistry"],"FQ":m8["FQ"]});
const m10=module10({});
const m11=module11({"yz":m0["yz"]});
const m12=module12({"byt":m10["byt"],"ge":ports["settingsForSource"],"TS":m11["TS"]});
const m13=module13({"ut":ports["modsRegistry"],"a8e":m12["a8e"]});
const m14=module14({"dd":m9["dd"],"aft":m13["aft"]});
const m15=module15({"N":m0["N"]});
const m16=module16({"Ut":m3["Ut"],"yr":m6["yr"],"xr":m6["xr"]});
const m17=module17({});
const m18=module18({"ge":ports["settingsForSource"],"yr":m6["yr"],"er":ports["settings"],"i0e":m17["i0e"],"eA":ports["settingsErrors"],"w6e":m3["w6e"],"bje":ports["parentManagedPolicyIncluded"]});
const m19=module19({"Gr":m16["Gr"],"S$":ports["registeredHooks"],"Wb":m18["Wb"],"Ty":m18["Ty"],"yr":m6["yr"],"I1":m12["I1"],"yGr":m18["yGr"],"Net":m3["Net"],"V9":ports["hookSnapshot"],"LEe":ports["mainThreadAgentHooks"],"TXn":m18["TXn"]});
const m20=module20({});
const m21=module21({});
const m22=module22({});
const m23=module23({});
const m24=module24({});
const m25=module25({"I0e":m20["I0e"],"TAn":m20["TAn"],"bn":m22["bn"],"S":m22["S"],"q6t":m23["q6t"],"ree":m24["ree"]});
const m26=module26({});
const m27=module27({"bn":m22["bn"],"S":m22["S"]});
const m28=module28({"i":ports["analytics"],"c":m22["c"],"tme":m27["tme"]});
const m29=module29({"Tt":m3["Tt"],"U":m3["U"],"t":ports["debug"]});
const m30=module30({});
const m31=module31({});
const m32=module32({});
const m33=module33({});
const m34=module34({"we":m6["we"],"dKt":m6["dKt"],"tee":m33["tee"]});
const m35=module35({});
const m36=module36({"F":m31["F"],"Xn":m32["Xn"],"fqt":m32["fqt"],"Dp":m34["Dp"],"De":m32["De"],"aa":m35["aa"],"FK":m32["FK"],"qbt":m34["qbt"],"Xx":m32["Xx"],"Bt":ports["filesystem"],"P":m27["P"],"E":m27["E"],"HWe":m34["HWe"],"xg":m34["xg"],"Es":m3["Es"]});
const m37=module37({});
const m38=module38({"td":m1["td"],"i":ports["analytics"],"Nn":m25["Nn"],"g4o":m23["g4o"],"h4o":m23["h4o"],"G_":m29["G_"],"_":m30["_"],"HOe":m24["HOe"],"F1e":m29["F1e"],"iW":m36["iW"],"Z":m27["Z"],"t":ports["debug"],"F":m31["F"],"sW":m36["sW"],"process":ports["process"],"Vf":m35["Vf"],"pn":m37["pn"],"Bt":ports["filesystem"],"H7r":m36["H7r"],"D7r":m36["D7r"],"E":m27["E"],"re":m24["re"],"HIe":m23["HIe"],"JM":m23["JM"],"k":ports["feature"]});
const m39=module39({"re":m24["re"]});
const m40=module40({});
const m41=module41({"Oz":m40["Oz"],"zK":m40["zK"],"ZZ":m40["ZZ"],"ret":m40["ret"],"aC":m40["aC"],"wT":m40["wT"],"Ru":m40["Ru"]});
const m42=module42({"PWo":m1["PWo"],"k3t":m3["k3t"],"k":ports["feature"],"Za":m7["Za"],"bde":m14["bde"],"ge":ports["settingsForSource"],"Un":m15["Un"],"l9":m19["l9"],"obe":m18["obe"],"bfe":m20["bfe"],"Zl":m20["Zl"],"_n":m1["_n"],"TZe":m20["TZe"],"LZ":m20["LZ"],"t":ports["debug"],"V9":ports["hookSnapshot"],"Ty":m18["Ty"],"LEe":ports["mainThreadAgentHooks"],"S$":ports["registeredHooks"],"dd":m9["dd"],"HG":m21["HG"],"Nn":m25["Nn"],"d":ports["logError"],"Bn":m26["Bn"],"Wpe":m26["Wpe"],"KS":ports["detachedSlot"],"Tt":m3["Tt"],"i":ports["analytics"],"Ye":m27["Ye"],"p":m28["p"],"t8e":m38["t8e"],"P_":m36["P_"],"I":m24["I"],"zt":m39["zt"],"rSt":m23["rSt"],"Z6":m38["Z6"],"eG":m38["eG"],"Mi":ports["enqueueNotification"],"qi":m41["qi"],"_we":m39["_we"],"Ge":m3["Ge"],"m":m28["m"],"Kyn":m1["Kyn"],"y":m28["y"],"fu":m23["fu"],"sB":m27["sB"],"md":m25["md"],"Ru":m40["Ru"]});
return {"eligible":m42["LMe"],"run":m42["Sxt"],"background":m42["ZTo"],"foregroundSlot":m42["cTe"],"PromptCounter":m42["xK"],"mapDetachedText":m42["uCt"],"render":m42["Rdo"],"notify":m42["pre"]};
}
