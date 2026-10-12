// Original npm 2.1.286 per-platform declaration closures, no body rewriting.
function darwin_arm64(ports){
const j=ports.host;
const O=ports.platform;
const Ze=ports.exec;
const v=ports.errno;
const ae=ports.fs;
const q=(()=>{
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;})();
const yIe=(()=>{const K=ports.path.delimiter;
const Et=ports.path.isAbsolute;
function g(t,o){return o}
function yIe(t,o){let _=F6t(o);return _===""?null:H5r(t,_)}
function F6t(t){return t.split(K).map((o)=>uEn(o)).filter((o)=>st(o)).join(K)}
function uEn(t,o="darwin"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!Et(t))return!1;return!0}
function H5r(t,o){return g(t,Bun.which(t,{PATH:o}))}
return yIe;})();
const H2e=(()=>{
function H2e(n){return n==="Z"||n==="X"}
return H2e;})();
const O6t=(()=>{
function O6t(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
return O6t;})();
function Qa(e,n){if(n in e)return e[n];if(O()!=="windows")return;let r=Object.keys(e).find((i)=>i.toUpperCase()===n.toUpperCase());return r===void 0?void 0:e[r]}
async function LXn(e){if(O()!=="linux"&&O()!=="wsl")return;if(!zxe(e))return;try{let n=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return O6t(n)}catch{return}}
async function qUe(e){return H2e(await LXn(e))}
var w=2147483647;
function zxe(e){return Number.isInteger(e)&&e>1&&e<=w}
function Xm(e){if(!zxe(e))return!1;try{return process.kill(e,0),!1}catch(n){return v(n)==="ESRCH"}}
var y=16;
async function mht(){let e=O();if(e!=="linux"&&e!=="wsl")return!0;let n=ae(),r=await n.readlink("/proc/self").catch(()=>null);if(r===null||r!==String(process.pid))return!1;let i=await n.readdir("/proc").catch(()=>null);if(!i)return!1;return i.filter((o)=>/^\d+$/.test(o.name)).length>=y}
function KUe(e,n){if(n===e)return!0;return!1}
async function wE(e,n){let r=await Fl(e,{skipCache:!0});return r===void 0?void 0:KUe(n,r)}
class g{#e=void 0;get token(){return this.#e}set(e){return this.#e=e,e}reset(){this.#e=void 0}}
var qxe=new g;
class h{#e=new Map;get(e){return this.#e.get(e)}set(e,n){this.#e.set(e,n)}}
var x=new q(()=>new h);
async function Tb(){return qxe.token??qxe.set(await Fl(process.pid))}
var C=60000;
var F=5000;
async function Fl(e,n){let r=Date.now(),i=x.of(j().host);if(n?.env!==void 0)return b(e,n.env);if(!n?.skipCache){let u=i.get(e),l=u?.miss?F:C;if(u&&r-u.at<l)return u.p}let s=b(e),o={at:r,p:s};i.set(e,o);let a=await s;if(a===void 0&&i.get(e)===o)o.miss=!0;return a}
async function b(e,n){let r=n===void 0?{}:{env:n,extendEnv:!1};try{let i=n===void 0?"ps":yIe("ps",Qa(n,"PATH")??"");if(i===null)return;let s=await Ze(i,["-o","lstart=","-p",String(e)],{timeout:1000,...r,env:{...n??process.env,LC_ALL:"C",TZ:"UTC"}});return s.code===0&&s.stdout?s.stdout.trim():void 0}catch{return}}
const identity=(()=>{const it=(()=>{
function it(t,e){return t}
return it;})();
const o=ports.os.hostname;
const C6o=(()=>{const i=ports.os.hostname;
const r=ports.fsPromises.readFile;
const s=ports.fsPromises.readlink;
async function C6o(n){if(n==="windows")return`darwin:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"darwin";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`darwin:${e}:${t}`}
return C6o;})();
const O=ports.platform;
class e{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var Wxe=it(new e,(n)=>{n.pidDomain=void 0});
function Gxe(){if(Wxe.pidSpace===null){let n="";Wxe.pidSpace=`${o()}${n===""?"":"#"+n}`}return Wxe.pidSpace}
function rk(){return Wxe.pidDomain??=(async()=>C6o(O()))().catch((n)=>{throw Wxe.pidDomain=void 0,n}),Wxe.pidDomain}
return {space:Gxe,domain:rk};})();
return {ownStart:Tb,start:Fl,validPid:zxe,gone:Xm,trustedPidView:mht,sameStart:wE,zombie:qUe,identity};
}
function darwin_x64(ports){
const j=ports.host;
const O=ports.platform;
const Ze=ports.exec;
const v=ports.errno;
const ae=ports.fs;
const K=(()=>{
class K{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return K;})();
const yIe=(()=>{const W=ports.path.delimiter;
const Et=ports.path.isAbsolute;
function Y(t,o){return o}
function yIe(t,o){let _=F6t(o);return _===""?null:P5r(t,_)}
function F6t(t){return t.split(W).map((o)=>uEn(o)).filter((o)=>st(o)).join(W)}
function uEn(t,o="darwin"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!Et(t))return!1;return!0}
function P5r(t,o){return Y(t,Bun.which(t,{PATH:o}))}
return yIe;})();
const P2e=(()=>{
function P2e(n){return n==="Z"||n==="X"}
return P2e;})();
const O6t=(()=>{
function O6t(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
return O6t;})();
function Qa(e,n){if(n in e)return e[n];if(O()!=="windows")return;let r=Object.keys(e).find((i)=>i.toUpperCase()===n.toUpperCase());return r===void 0?void 0:e[r]}
async function DXn(e){if(O()!=="linux"&&O()!=="wsl")return;if(!zxe(e))return;try{let n=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return O6t(n)}catch{return}}
async function KUe(e){return P2e(await DXn(e))}
var w=2147483647;
function zxe(e){return Number.isInteger(e)&&e>1&&e<=w}
function Xm(e){if(!zxe(e))return!1;try{return process.kill(e,0),!1}catch(n){return v(n)==="ESRCH"}}
var y=16;
async function mht(){let e=O();if(e!=="linux"&&e!=="wsl")return!0;let n=ae(),r=await n.readlink("/proc/self").catch(()=>null);if(r===null||r!==String(process.pid))return!1;let i=await n.readdir("/proc").catch(()=>null);if(!i)return!1;return i.filter((o)=>/^\d+$/.test(o.name)).length>=y}
function qUe(e,n){if(n===e)return!0;return!1}
async function wE(e,n){let r=await Fl(e,{skipCache:!0});return r===void 0?void 0:qUe(n,r)}
class g{#e=void 0;get token(){return this.#e}set(e){return this.#e=e,e}reset(){this.#e=void 0}}
var Kxe=new g;
class h{#e=new Map;get(e){return this.#e.get(e)}set(e,n){this.#e.set(e,n)}}
var x=new K(()=>new h);
async function kb(){return Kxe.token??Kxe.set(await Fl(process.pid))}
var C=60000;
var F=5000;
async function Fl(e,n){let r=Date.now(),i=x.of(j().host);if(n?.env!==void 0)return b(e,n.env);if(!n?.skipCache){let u=i.get(e),l=u?.miss?F:C;if(u&&r-u.at<l)return u.p}let s=b(e),o={at:r,p:s};i.set(e,o);let a=await s;if(a===void 0&&i.get(e)===o)o.miss=!0;return a}
async function b(e,n){let r=n===void 0?{}:{env:n,extendEnv:!1};try{let i=n===void 0?"ps":yIe("ps",Qa(n,"PATH")??"");if(i===null)return;let s=await Ze(i,["-o","lstart=","-p",String(e)],{timeout:1000,...r,env:{...n??process.env,LC_ALL:"C",TZ:"UTC"}});return s.code===0&&s.stdout?s.stdout.trim():void 0}catch{return}}
const identity=(()=>{const it=(()=>{
function it(t,e){return t}
return it;})();
const o=ports.os.hostname;
const A6o=(()=>{const i=ports.os.hostname;
const r=ports.fsPromises.readFile;
const s=ports.fsPromises.readlink;
async function A6o(n){if(n==="windows")return`darwin:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"darwin";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`darwin:${e}:${t}`}
return A6o;})();
const O=ports.platform;
class e{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var Wxe=it(new e,(n)=>{n.pidDomain=void 0});
function Gxe(){if(Wxe.pidSpace===null){let n="";Wxe.pidSpace=`${o()}${n===""?"":"#"+n}`}return Wxe.pidSpace}
function rT(){return Wxe.pidDomain??=(async()=>A6o(O()))().catch((n)=>{throw Wxe.pidDomain=void 0,n}),Wxe.pidDomain}
return {space:Gxe,domain:rT};})();
return {ownStart:kb,start:Fl,validPid:zxe,gone:Xm,trustedPidView:mht,sameStart:wE,zombie:KUe,identity};
}
function linux_arm64(ports){
const j=ports.host;
const ae=ports.fs;
const M=ports.platform;
const Ze=ports.exec;
const T=ports.errno;
const q=(()=>{
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;})();
const koe=(()=>{
function koe(n){return n.slice(n.lastIndexOf(")")+2).split(" ")[19]}
return koe;})();
const dOe=(()=>{const K=ports.path.delimiter;
const Et=ports.path.isAbsolute;
function v(t,o){return o}
function dOe(t,o){let _=v2t(o);return _===""?null:n5r(t,_)}
function v2t(t){return t.split(K).map((o)=>Vwn(o)).filter((o)=>st(o)).join(K)}
function Vwn(t,o="linux"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!Et(t))return!1;return!0}
function n5r(t,o){return v(t,Bun.which(t,{PATH:o}))}
return dOe;})();
const Cje=(()=>{
function Cje(n){return n==="Z"||n==="X"}
return Cje;})();
const y2t=(()=>{
function y2t(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
return y2t;})();
function Ja(e,n){if(n in e)return e[n];if(M()!=="windows")return;let r=Object.keys(e).find((i)=>i.toUpperCase()===n.toUpperCase());return r===void 0?void 0:e[r]}
async function gXn(e){if(M()!=="linux"&&M()!=="wsl")return;if(!Uxe(e))return;try{let n=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return y2t(n)}catch{return}}
async function HHe(e){return Cje(await gXn(e))}
var w=2147483647;
function Uxe(e){return Number.isInteger(e)&&e>1&&e<=w}
function Ym(e){if(!Uxe(e))return!1;try{return process.kill(e,0),!1}catch(n){return T(n)==="ESRCH"}}
var y=16;
async function rht(){let e=M();if(e!=="linux"&&e!=="wsl")return!0;let n=ae(),r=await n.readlink("/proc/self").catch(()=>null);if(r===null||r!==String(process.pid))return!1;let i=await n.readdir("/proc").catch(()=>null);if(!i)return!1;return i.filter((o)=>/^\d+$/.test(o.name)).length>=y}
function jHe(e,n){if(n===e)return!0;return!1}
async function Sv(e,n){let r=await Fl(e,{skipCache:!0});return r===void 0?void 0:jHe(n,r)}
class g{#e=void 0;get token(){return this.#e}set(e){return this.#e=e,e}reset(){this.#e=void 0}}
var Hxe=new g;
class h{#e=new Map;get(e){return this.#e.get(e)}set(e,n){this.#e.set(e,n)}}
var C=new q(()=>new h);
async function ES(){return Hxe.token??Hxe.set(await Fl(process.pid))}
var _=60000;
var F=5000;
async function Fl(e,n){let r=Date.now(),i=C.of(j().host);if(n?.env!==void 0)return b(e,n.env);if(!n?.skipCache){let a=i.get(e),l=a?.miss?F:_;if(a&&r-a.at<l)return a.p}let s=b(e),o={at:r,p:s};i.set(e,o);let u=await s;if(u===void 0&&i.get(e)===o)o.miss=!0;return u}
async function b(e,n){let r=n===void 0?{}:{env:n,extendEnv:!1};try{{let o=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return koe(o)}let i=n===void 0?"ps":dOe("ps",Ja(n,"PATH")??"");if(i===null)return;let s=await Ze(i,["-o","lstart=","-p",String(e)],{timeout:1000,...r,env:{...n??process.env,LC_ALL:"C",TZ:"UTC"}});return s.code===0&&s.stdout?s.stdout.trim():void 0}catch{return}}
const identity=(()=>{const it=(()=>{
function it(t,e){return t}
return it;})();
const e=ports.fsSync.readlinkSync;
const u=ports.os.hostname;
const jzo=(()=>{const i=ports.os.hostname;
const r=ports.fsPromises.readFile;
const s=ports.fsPromises.readlink;
async function jzo(n){if(n==="windows")return`linux:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"linux";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`linux:${e}:${t}`}
return jzo;})();
const M=ports.platform;
class o{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var Fxe=it(new o,(t)=>{t.pidDomain=void 0});
function $xe(){if(Fxe.pidSpace===null){let t="";try{t=e("/proc/self/ns/pid")}catch{t=""}Fxe.pidSpace=`${u()}${t===""?"":"#"+t}`}return Fxe.pidSpace}
function eC(){return Fxe.pidDomain??=(async()=>jzo(M()))().catch((t)=>{throw Fxe.pidDomain=void 0,t}),Fxe.pidDomain}
return {space:$xe,domain:eC};})();
return {ownStart:ES,start:Fl,validPid:Uxe,gone:Ym,trustedPidView:rht,sameStart:Sv,zombie:HHe,identity};
}
function linux_x64(ports){
const j=ports.host;
const ae=ports.fs;
const M=ports.platform;
const Ze=ports.exec;
const k=ports.errno;
const V=(()=>{
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return V;})();
const Eoe=(()=>{
function Eoe(n){return n.slice(n.lastIndexOf(")")+2).split(" ")[19]}
return Eoe;})();
const dPe=(()=>{const f=ports.path.delimiter;
const Et=ports.path.isAbsolute;
function W(t,o){return o}
function dPe(t,o){let _=vGt(o);return _===""?null:n6r(t,_)}
function vGt(t){return t.split(f).map((o)=>Kwn(o)).filter((o)=>st(o)).join(f)}
function Kwn(t,o="linux"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!Et(t))return!1;return!0}
function n6r(t,o){return W(t,Bun.which(t,{PATH:o}))}
return dPe;})();
const Cje=(()=>{
function Cje(n){return n==="Z"||n==="X"}
return Cje;})();
const yGt=(()=>{
function yGt(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
return yGt;})();
function Ja(e,n){if(n in e)return e[n];if(M()!=="windows")return;let r=Object.keys(e).find((i)=>i.toUpperCase()===n.toUpperCase());return r===void 0?void 0:e[r]}
async function gXn(e){if(M()!=="linux"&&M()!=="wsl")return;if(!Fxe(e))return;try{let n=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return yGt(n)}catch{return}}
async function BBe(e){return Cje(await gXn(e))}
var w=2147483647;
function Fxe(e){return Number.isInteger(e)&&e>1&&e<=w}
function Ym(e){if(!Fxe(e))return!1;try{return process.kill(e,0),!1}catch(n){return k(n)==="ESRCH"}}
var y=16;
async function rht(){let e=M();if(e!=="linux"&&e!=="wsl")return!0;let n=ae(),r=await n.readlink("/proc/self").catch(()=>null);if(r===null||r!==String(process.pid))return!1;let i=await n.readdir("/proc").catch(()=>null);if(!i)return!1;return i.filter((o)=>/^\d+$/.test(o.name)).length>=y}
function jBe(e,n){if(n===e)return!0;return!1}
async function Sv(e,n){let r=await Nl(e,{skipCache:!0});return r===void 0?void 0:jBe(n,r)}
class g{#e=void 0;get token(){return this.#e}set(e){return this.#e=e,e}reset(){this.#e=void 0}}
var Bxe=new g;
class h{#e=new Map;get(e){return this.#e.get(e)}set(e,n){this.#e.set(e,n)}}
var x=new V(()=>new h);
async function TS(){return Bxe.token??Bxe.set(await Nl(process.pid))}
var C=60000;
var _=5000;
async function Nl(e,n){let r=Date.now(),i=x.of(j().host);if(n?.env!==void 0)return b(e,n.env);if(!n?.skipCache){let a=i.get(e),l=a?.miss?_:C;if(a&&r-a.at<l)return a.p}let s=b(e),o={at:r,p:s};i.set(e,o);let u=await s;if(u===void 0&&i.get(e)===o)o.miss=!0;return u}
async function b(e,n){let r=n===void 0?{}:{env:n,extendEnv:!1};try{{let o=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return Eoe(o)}let i=n===void 0?"ps":dPe("ps",Ja(n,"PATH")??"");if(i===null)return;let s=await Ze(i,["-o","lstart=","-p",String(e)],{timeout:1000,...r,env:{...n??process.env,LC_ALL:"C",TZ:"UTC"}});return s.code===0&&s.stdout?s.stdout.trim():void 0}catch{return}}
const identity=(()=>{const it=(()=>{
function it(t,e){return t}
return it;})();
const e=ports.fsSync.readlinkSync;
const u=ports.os.hostname;
const jzo=(()=>{const i=ports.os.hostname;
const r=ports.fsPromises.readFile;
const s=ports.fsPromises.readlink;
async function jzo(n){if(n==="windows")return`linux:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"linux";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`linux:${e}:${t}`}
return jzo;})();
const M=ports.platform;
class o{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var Nxe=it(new o,(t)=>{t.pidDomain=void 0});
function $xe(){if(Nxe.pidSpace===null){let t="";try{t=e("/proc/self/ns/pid")}catch{t=""}Nxe.pidSpace=`${u()}${t===""?"":"#"+t}`}return Nxe.pidSpace}
function eC(){return Nxe.pidDomain??=(async()=>jzo(M()))().catch((t)=>{throw Nxe.pidDomain=void 0,t}),Nxe.pidDomain}
return {space:$xe,domain:eC};})();
return {ownStart:TS,start:Nl,validPid:Fxe,gone:Ym,trustedPidView:rht,sameStart:Sv,zombie:BBe,identity};
}
function win32_arm64(ports){
const j=ports.host;
const M=ports.platform;
const De=ports.requireModule;
const t=ports.debug;
const Je=ports.exec;
const E=ports.errno;
const ae=ports.fs;
const q=(()=>{
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;})();
const PSe=(()=>{const W=ports.path.delimiter;
const v=ports.path.isAbsolute;
const skn=(()=>{const p=ports.path.resolve;
const c=ports.path.dirname;
const g=ports.path.sep;
const ot=ports.os.homedir;
const rt=ports.fsSync.realpathSync;
function CR(t){if(t.startsWith("\\\\?\\UNC\\"))return"\\\\"+t.slice(8);if(t.startsWith("\\\\?\\")&&t.length>=7&&t[5]===":")return t.slice(4);return t}
var Gt=new Set(["EPERM","EBUSY","EACCES"]);
var st=4;
var R=50;
var It;
function LQ(t){return Jer(t).real??null}
function skn(t,e){let n=p(e).toLowerCase(),r=c(p(t)).toLowerCase();if(r===n||kt(r,n)||$t(r,n,"lexical"))return!0;let o=LQ(e)?.toLowerCase();if(o==null)return!1;let i=LQ(c(p(t)))?.toLowerCase();if(i==null)return!0;return i===o||kt(i,o)||$t(i,o,"canonical")}
var wn=new Set(["node_modules",".venv","venv","env",".env","virtualenv",".tox",".nox",".direnv","__pypackages__"]);
function kt(t,e){if(!t.startsWith(U(e)+g))return!1;return t.split(g).some((n)=>wn.has(n))}
function U(t){return t.endsWith(g)?t.slice(0,-1):t}
var K;
function $t(t,e,n){let r=ot(),o=(process.env.LOCALAPPDATA??"").trim();if(n==="lexical")return Y(jt(r,o,(l)=>p(l).toLowerCase()),t,e);let i=r+"\x00"+o;if(K?.key===i)return Y(K.aliasDirs,t,e);let s=!0,a=jt(r,o,(l)=>{if(!bn(l))return p(l).toLowerCase();let u=LQ(l)?.toLowerCase();if(u==null)return s=!1,p(l).toLowerCase();return u});if(s)K={key:i,aliasDirs:a};return Y(a,t,e)}
function jt(t,e,n){let r=[];if(t)r.push(U(n(t))+g+["appdata","local","microsoft","windowsapps"].join(g));if(e){let o=U(n(e))+g+["microsoft","windowsapps"].join(g);if(!r.includes(o))r.push(o)}return r}
function bn(t){return/^[A-Za-z]:[\\/](?![\\/])/.test(t)}
function Y(t,e,n){let r=U(n);for(let o of t){if(!(o===r||o.startsWith(r+g)))continue;if(e===o||e.startsWith(o+g))return!0}return!1}
function Jer(t){let e=L(()=>CR(rt.native(t)));return{real:e.value,code:e.code}}
function z(t){return t!=null&&typeof t==="object"&&"code"in t&&typeof t.code==="string"?t.code:void 0}
function L(t){try{return{value:vn(t)}}catch(e){return{code:z(e)}}}
function vn(t){return Jt(t,()=>!0)}
function Jt(t,e){for(let n=0;;n++)try{return t()}catch(r){let o=z(r);if(o===void 0||!1||!Gt.has(o)||n>=st-1||!e())throw r;It??=new Int32Array(new SharedArrayBuffer(4)),Atomics.wait(It,0,0,R)}}
return skn;})();
function rt(t){let o=process.cwd();return t.filter((_)=>!skn(_,o))}
function Y(t,o){if(!o||!1||v(t))return o;return rt([o])[0]??null}
function PSe(t,o){let _=A2t(o);return _===""?null:l3r(t,_)}
function A2t(t){return t.split(W).map((o)=>nvn(o)).filter((o)=>st(o)).join(W)}
function nvn(t,o="win32"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!v(t))return!1;return/^(?:[a-zA-Z]:[\\/]|[\\/]{2})/.test(t)}
function l3r(t,o){return Y(t,Bun.which(t,{PATH:o}))}
return PSe;})();
const s7e=(()=>{
function s7e(n){return n==="Z"||n==="X"}
return s7e;})();
const Kwn=(()=>{
function Kwn(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
return Kwn;})();
function Ha(e,n){if(n in e)return e[n];if(M()!=="windows")return;let r=Object.keys(e).find((i)=>i.toUpperCase()===n.toUpperCase());return r===void 0?void 0:e[r]}
var l;
function B_n(){if(l!==void 0)return l;if(M()!=="windows")return l=null,l;try{let e=De("bun:ffi");l=e.dlopen("kernel32.dll",{OpenProcess:{args:["u32","i32","u32"],returns:"ptr"},GetProcessTimes:{args:["ptr","ptr","ptr","ptr","ptr"],returns:"i32"},CreateToolhelp32Snapshot:{args:["u32","u32"],returns:"ptr"},Process32FirstW:{args:["ptr","ptr"],returns:"i32"},Process32NextW:{args:["ptr","ptr"],returns:"i32"},CloseHandle:{args:["ptr"],returns:"i32"}}).symbols,t("[win32-kernel32] bun:ffi loaded")}catch(e){t(`[win32-kernel32] bun:ffi unavailable, falling back to spawn: ${e instanceof Error?e.message:String(e)}`),l=null}return l}
class d{#e=!1;get forcedUnavailable(){return this.#e}forceUnavailable(e){this.#e=e}}
var y=new d;
function f(){return!y.forcedUnavailable&&B_n()!==null}
var w=4096;
function aht(e){if(!Number.isInteger(e)||e<=0)return;let n=B_n();if(n==null)return;let r=n.OpenProcess(w,0,e);if(!r)return;try{let i=new Uint8Array(8),s=new Uint8Array(8),o=new Uint8Array(8),u=new Uint8Array(8);if(n.GetProcessTimes(r,i,s,o,u)===0)return;return new DataView(i.buffer).getBigUint64(0,!0)}catch{return}finally{n.CloseHandle(r)}}
async function kXn(e){if(M()!=="linux"&&M()!=="wsl")return;if(!Bxe(e))return;try{let n=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return Kwn(n)}catch{return}}
async function jHe(e){return s7e(await kXn(e))}
var T=2147483647;
function Bxe(e){return Number.isInteger(e)&&e>1&&e<=T}
function Km(e){if(!Bxe(e))return!1;try{return process.kill(e,0),!1}catch(n){return E(n)==="ESRCH"}}
var C=16;
async function lht(){let e=M();if(e!=="linux"&&e!=="wsl")return!0;let n=ae(),r=await n.readlink("/proc/self").catch(()=>null);if(r===null||r!==String(process.pid))return!1;let i=await n.readdir("/proc").catch(()=>null);if(!i)return!1;return i.filter((o)=>/^\d+$/.test(o.name)).length>=C}
function WHe(e,n){if(n===e)return!0;let r=Number(e),i=Number(n);return Number.isFinite(r)&&Number.isFinite(i)&&r>300000000000000000!==i>300000000000000000}
async function Sv(e,n){let r=await uc(e,{skipCache:!0});return r===void 0?void 0:WHe(n,r)}
class S{#e=void 0;get token(){return this.#e}set(e){return this.#e=e,e}reset(){this.#e=void 0}}
var jxe=new S;
class h{#e=new Map;get(e){return this.#e.get(e)}set(e,n){this.#e.set(e,n)}}
var I=new q(()=>new h);
async function RS(){return jxe.token??jxe.set(await uc(process.pid))}
var _=60000;
var A=5000;
async function uc(e,n){let r=Date.now(),i=I.of(j().host);if(n?.env!==void 0)return g(e,n.env);if(!n?.skipCache){let a=i.get(e),c=a?.miss?A:_;if(a&&r-a.at<c)return a.p}let s=g(e),o={at:r,p:s};i.set(e,o);let u=await s;if(u===void 0&&i.get(e)===o)o.miss=!0;return u}
async function g(e,n){let r=n===void 0?{}:{env:n,extendEnv:!1};try{{if(f())return aht(e)?.toString();let o=n===void 0?"powershell.exe":PSe("powershell.exe",Ha(n,"PATH")??"");if(o===null)return;let u=await Je(o,["-NoProfile","-Command",`(Get-CimInstance Win32_Process -Filter "ProcessId=${e}").CreationDate.Ticks`],{timeout:1000,...r});return u.code===0&&u.stdout?.trim()?u.stdout.trim():void 0}let i=n===void 0?"ps":PSe("ps",Ha(n,"PATH")??"");if(i===null)return;let s=await Je(i,["-o","lstart=","-p",String(e)],{timeout:1000,...r,env:{...n??process.env,LC_ALL:"C",TZ:"UTC"}});return s.code===0&&s.stdout?s.stdout.trim():void 0}catch{return}}
const identity=(()=>{const it=(()=>{
function it(t,e){return t}
return it;})();
const o=ports.os.hostname;
const qzo=(()=>{const i=ports.os.hostname;
const r=ports.fsPromises.readFile;
const s=ports.fsPromises.readlink;
async function qzo(n){if(n==="windows")return`win32:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"win32";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`win32:${e}:${t}`}
return qzo;})();
const M=ports.platform;
class e{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var $xe=it(new e,(n)=>{n.pidDomain=void 0});
function Uxe(){if($xe.pidSpace===null){let n="";$xe.pidSpace=`${o()}${n===""?"":"#"+n}`}return $xe.pidSpace}
function eR(){return $xe.pidDomain??=(async()=>qzo(M()))().catch((n)=>{throw $xe.pidDomain=void 0,n}),$xe.pidDomain}
return {space:Uxe,domain:eR};})();
return {ownStart:RS,start:uc,validPid:Bxe,gone:Km,trustedPidView:lht,sameStart:Sv,zombie:jHe,identity};
}
function win32_x64(ports){
const j=ports.host;
const M=ports.platform;
const De=ports.requireModule;
const t=ports.debug;
const Je=ports.exec;
const k=ports.errno;
const ae=ports.fs;
const V=(()=>{
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return V;})();
const PSe=(()=>{const K=ports.path.delimiter;
const W=ports.path.isAbsolute;
const sEn=(()=>{const p=ports.path.resolve;
const c=ports.path.dirname;
const g=ports.path.sep;
const ot=ports.os.homedir;
const rt=ports.fsSync.realpathSync;
function CR(t){if(t.startsWith("\\\\?\\UNC\\"))return"\\\\"+t.slice(8);if(t.startsWith("\\\\?\\")&&t.length>=7&&t[5]===":")return t.slice(4);return t}
var Gt=new Set(["EPERM","EBUSY","EACCES"]);
var st=4;
var R=50;
var It;
function NQ(t){return Jer(t).real??null}
function sEn(t,e){let n=p(e).toLowerCase(),r=c(p(t)).toLowerCase();if(r===n||kt(r,n)||$t(r,n,"lexical"))return!0;let o=NQ(e)?.toLowerCase();if(o==null)return!1;let i=NQ(c(p(t)))?.toLowerCase();if(i==null)return!0;return i===o||kt(i,o)||$t(i,o,"canonical")}
var wn=new Set(["node_modules",".venv","venv","env",".env","virtualenv",".tox",".nox",".direnv","__pypackages__"]);
function kt(t,e){if(!t.startsWith(U(e)+g))return!1;return t.split(g).some((n)=>wn.has(n))}
function U(t){return t.endsWith(g)?t.slice(0,-1):t}
var K;
function $t(t,e,n){let r=ot(),o=(process.env.LOCALAPPDATA??"").trim();if(n==="lexical")return Y(jt(r,o,(l)=>p(l).toLowerCase()),t,e);let i=r+"\x00"+o;if(K?.key===i)return Y(K.aliasDirs,t,e);let s=!0,a=jt(r,o,(l)=>{if(!bn(l))return p(l).toLowerCase();let u=NQ(l)?.toLowerCase();if(u==null)return s=!1,p(l).toLowerCase();return u});if(s)K={key:i,aliasDirs:a};return Y(a,t,e)}
function jt(t,e,n){let r=[];if(t)r.push(U(n(t))+g+["appdata","local","microsoft","windowsapps"].join(g));if(e){let o=U(n(e))+g+["microsoft","windowsapps"].join(g);if(!r.includes(o))r.push(o)}return r}
function bn(t){return/^[A-Za-z]:[\\/](?![\\/])/.test(t)}
function Y(t,e,n){let r=U(n);for(let o of t){if(!(o===r||o.startsWith(r+g)))continue;if(e===o||e.startsWith(o+g))return!0}return!1}
function Jer(t){let e=L(()=>CR(rt.native(t)));return{real:e.value,code:e.code}}
function z(t){return t!=null&&typeof t==="object"&&"code"in t&&typeof t.code==="string"?t.code:void 0}
function L(t){try{return{value:vn(t)}}catch(e){return{code:z(e)}}}
function vn(t){return Jt(t,()=>!0)}
function Jt(t,e){for(let n=0;;n++)try{return t()}catch(r){let o=z(r);if(o===void 0||!1||!Gt.has(o)||n>=st-1||!e())throw r;It??=new Int32Array(new SharedArrayBuffer(4)),Atomics.wait(It,0,0,R)}}
return sEn;})();
function rt(t){let o=process.cwd();return t.filter((_)=>!sEn(_,o))}
function g(t,o){if(!o||!1||W(t))return o;return rt([o])[0]??null}
function PSe(t,o){let _=A2t(o);return _===""?null:lYr(t,_)}
function A2t(t){return t.split(K).map((o)=>nvn(o)).filter((o)=>st(o)).join(K)}
function nvn(t,o="win32"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!W(t))return!1;return/^(?:[a-zA-Z]:[\\/]|[\\/]{2})/.test(t)}
function lYr(t,o){return g(t,Bun.which(t,{PATH:o}))}
return PSe;})();
const s7e=(()=>{
function s7e(n){return n==="Z"||n==="X"}
return s7e;})();
const Kwn=(()=>{
function Kwn(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
return Kwn;})();
function Ba(e,n){if(n in e)return e[n];if(M()!=="windows")return;let r=Object.keys(e).find((i)=>i.toUpperCase()===n.toUpperCase());return r===void 0?void 0:e[r]}
var l;
function U_n(){if(l!==void 0)return l;if(M()!=="windows")return l=null,l;try{let e=De("bun:ffi");l=e.dlopen("kernel32.dll",{OpenProcess:{args:["u32","i32","u32"],returns:"ptr"},GetProcessTimes:{args:["ptr","ptr","ptr","ptr","ptr"],returns:"i32"},CreateToolhelp32Snapshot:{args:["u32","u32"],returns:"ptr"},Process32FirstW:{args:["ptr","ptr"],returns:"i32"},Process32NextW:{args:["ptr","ptr"],returns:"i32"},CloseHandle:{args:["ptr"],returns:"i32"}}).symbols,t("[win32-kernel32] bun:ffi loaded")}catch(e){t(`[win32-kernel32] bun:ffi unavailable, falling back to spawn: ${e instanceof Error?e.message:String(e)}`),l=null}return l}
class d{#e=!1;get forcedUnavailable(){return this.#e}forceUnavailable(e){this.#e=e}}
var y=new d;
function f(){return!y.forcedUnavailable&&U_n()!==null}
var w=4096;
function aht(e){if(!Number.isInteger(e)||e<=0)return;let n=U_n();if(n==null)return;let r=n.OpenProcess(w,0,e);if(!r)return;try{let i=new Uint8Array(8),s=new Uint8Array(8),o=new Uint8Array(8),u=new Uint8Array(8);if(n.GetProcessTimes(r,i,s,o,u)===0)return;return new DataView(i.buffer).getBigUint64(0,!0)}catch{return}finally{n.CloseHandle(r)}}
async function EXn(e){if(M()!=="linux"&&M()!=="wsl")return;if(!Uxe(e))return;try{let n=await ae().readFile(`/proc/${e}/stat`,{encoding:"utf8"});return Kwn(n)}catch{return}}
async function jBe(e){return s7e(await EXn(e))}
var T=2147483647;
function Uxe(e){return Number.isInteger(e)&&e>1&&e<=T}
function Km(e){if(!Uxe(e))return!1;try{return process.kill(e,0),!1}catch(n){return k(n)==="ESRCH"}}
var C=16;
async function lht(){let e=M();if(e!=="linux"&&e!=="wsl")return!0;let n=ae(),r=await n.readlink("/proc/self").catch(()=>null);if(r===null||r!==String(process.pid))return!1;let i=await n.readdir("/proc").catch(()=>null);if(!i)return!1;return i.filter((o)=>/^\d+$/.test(o.name)).length>=C}
function WBe(e,n){if(n===e)return!0;let r=Number(e),i=Number(n);return Number.isFinite(r)&&Number.isFinite(i)&&r>300000000000000000!==i>300000000000000000}
async function Sv(e,n){let r=await uc(e,{skipCache:!0});return r===void 0?void 0:WBe(n,r)}
class S{#e=void 0;get token(){return this.#e}set(e){return this.#e=e,e}reset(){this.#e=void 0}}
var jxe=new S;
class h{#e=new Map;get(e){return this.#e.get(e)}set(e,n){this.#e.set(e,n)}}
var I=new V(()=>new h);
async function RS(){return jxe.token??jxe.set(await uc(process.pid))}
var _=60000;
var A=5000;
async function uc(e,n){let r=Date.now(),i=I.of(j().host);if(n?.env!==void 0)return g(e,n.env);if(!n?.skipCache){let a=i.get(e),c=a?.miss?A:_;if(a&&r-a.at<c)return a.p}let s=g(e),o={at:r,p:s};i.set(e,o);let u=await s;if(u===void 0&&i.get(e)===o)o.miss=!0;return u}
async function g(e,n){let r=n===void 0?{}:{env:n,extendEnv:!1};try{{if(f())return aht(e)?.toString();let o=n===void 0?"powershell.exe":PSe("powershell.exe",Ba(n,"PATH")??"");if(o===null)return;let u=await Je(o,["-NoProfile","-Command",`(Get-CimInstance Win32_Process -Filter "ProcessId=${e}").CreationDate.Ticks`],{timeout:1000,...r});return u.code===0&&u.stdout?.trim()?u.stdout.trim():void 0}let i=n===void 0?"ps":PSe("ps",Ba(n,"PATH")??"");if(i===null)return;let s=await Je(i,["-o","lstart=","-p",String(e)],{timeout:1000,...r,env:{...n??process.env,LC_ALL:"C",TZ:"UTC"}});return s.code===0&&s.stdout?s.stdout.trim():void 0}catch{return}}
const identity=(()=>{const it=(()=>{
function it(t,e){return t}
return it;})();
const o=ports.os.hostname;
const Vzo=(()=>{const i=ports.os.hostname;
const r=ports.fsPromises.readFile;
const s=ports.fsPromises.readlink;
async function Vzo(n){if(n==="windows")return`win32:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"win32";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`win32:${e}:${t}`}
return Vzo;})();
const M=ports.platform;
class e{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var Fxe=it(new e,(n)=>{n.pidDomain=void 0});
function $xe(){if(Fxe.pidSpace===null){let n="";Fxe.pidSpace=`${o()}${n===""?"":"#"+n}`}return Fxe.pidSpace}
function eR(){return Fxe.pidDomain??=(async()=>Vzo(M()))().catch((n)=>{throw Fxe.pidDomain=void 0,n}),Fxe.pidDomain}
return {space:$xe,domain:eR};})();
return {ownStart:RS,start:uc,validPid:Uxe,gone:Km,trustedPidView:lht,sameStart:Sv,zombie:jBe,identity};
}
const factories={"darwin-arm64":darwin_arm64,"darwin-x64":darwin_x64,"linux-arm64":linux_arm64,"linux-x64":linux_x64,"win32-arm64":win32_arm64,"win32-x64":win32_x64};
export function selectOAuthNativePlatform(platform,arch){const key=platform+'-'+arch;if(!factories[key])throw Error('Unsupported OAuth platform '+key);return key;}
export function createOAuthPlatformProbes(platform,ports){const factory=factories[platform];if(!factory)throw Error('Unsupported OAuth platform '+platform);return factory(ports);}
