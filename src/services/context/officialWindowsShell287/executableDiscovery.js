// Complete pinned 2.1.287 uor closure; imported OS actions are explicit ports.
import path from 'node:path'

function executableModule0(imports){

class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
return {V};
}
function executableModule1(imports){
const process=imports["process"];
function o(){return process.env.CLAUDE_CONFIG_DIR};
function _Rn(e){let n=e==="CLAUDE_CONFIG_DIR"?o():process.env[e];if(n===void 0)return;let r=String(n).trim();return r?r:void 0};
return {o,_Rn};
}
function executableModule2(imports){
const p=imports["p"];
const c=imports["c"];
const g=imports["g"];
const rt=imports["rt"];
const process=imports["process"];
const nt=imports["nt"];
function _A(t){if(t.startsWith("\\\\?\\UNC\\"))return"\\\\"+t.slice(8);if(t.startsWith("\\\\?\\")&&t.length>=7&&t[5]===":")return t.slice(4);return t};
var Bt=new Set(["EPERM","EBUSY","EACCES"]);
var ot=4;
var R=50;
var Mt;
function mee(t){return _ir(t).real??null};
function kRn(t,e){let n=p(e).toLowerCase(),r=c(p(t)).toLowerCase();if(r===n||It(r,n)||kt(r,n,"lexical"))return!0;let o=mee(e)?.toLowerCase();if(o==null)return!1;let i=mee(c(p(t)))?.toLowerCase();if(i==null)return!0;return i===o||It(i,o)||kt(i,o,"canonical")};
var wn=new Set(["node_modules",".venv","venv","env",".env","virtualenv",".tox",".nox",".direnv","__pypackages__"]);
function It(t,e){if(!t.startsWith(U(e)+g))return!1;return t.split(g).some((n)=>wn.has(n))};
function U(t){return t.endsWith(g)?t.slice(0,-1):t};
var K;
function kt(t,e,n){let r=rt(),o=(process.env.LOCALAPPDATA??"").trim();if(n==="lexical")return Z($t(r,o,(l)=>p(l).toLowerCase()),t,e);let i=r+"\x00"+o;if(K?.key===i)return Z(K.aliasDirs,t,e);let s=!0,a=$t(r,o,(l)=>{if(!bn(l))return p(l).toLowerCase();let u=mee(l)?.toLowerCase();if(u==null)return s=!1,p(l).toLowerCase();return u});if(s)K={key:i,aliasDirs:a};return Z(a,t,e)};
function $t(t,e,n){let r=[];if(t)r.push(U(n(t))+g+["appdata","local","microsoft","windowsapps"].join(g));if(e){let o=U(n(e))+g+["microsoft","windowsapps"].join(g);if(!r.includes(o))r.push(o)}return r};
function bn(t){return/^[A-Za-z]:[\\/](?![\\/])/.test(t)};
function Z(t,e,n){let r=U(n);for(let o of t){if(!(o===r||o.startsWith(r+g)))continue;if(e===o||e.startsWith(o+g))return!0}return!1};
function _ir(t){let e=L(()=>_A(nt.native(t)));return{real:e.value,code:e.code}};
function z(t){return t!=null&&typeof t==="object"&&"code"in t&&typeof t.code==="string"?t.code:void 0};
function L(t){try{return{value:vn(t)}}catch(e){return{code:z(e)}}};
function vn(t){return Vt(t,()=>!0)};
function Vt(t,e){for(let n=0;;n++)try{return t()}catch(r){let o=z(r);if(o===void 0||!1||!Bt.has(o)||n>=ot-1||!e())throw r;Mt??=new Int32Array(new SharedArrayBuffer(4)),Atomics.wait(Mt,0,0,R)}};
return {_A,Bt,ot,R,Mt,mee,kRn,wn,It,U,K,kt,$t,bn,Z,_ir,z,L,vn,Vt};
}
function executableModule3(imports){
const V=imports["V"];
const U=imports["U"];
const g=imports["g"];
const _Rn=imports["_Rn"];
const m=imports["m"];
const p=imports["p"];
const process=imports["process"];
const kRn=imports["kRn"];
class f{resolved=new Map;lookup(e){return this.resolved.get(e)}remember(e,t){this.resolved.set(e,t)}forget(e){this.resolved.delete(e)}};
var w=new V(()=>new f);
var h=5000;
function u(e){try{return g(e,{throwIfNoEntry:!1})===void 0}catch{return!1}};
var S=new Set([".com",".exe",".bat",".cmd"]);
function b(e){let t=e.toLowerCase().replace(/.*[\\/]/,"").replace(/[. ]+$/,""),n=t.lastIndexOf(".");return n>0&&S.has(t.slice(n))};
function uor(e,t=!1){let n=w.of(U().host),o=n.lookup(e);if(o!==void 0)if(o!==null){if(!u(o))return o;n.forget(e)}else{if(!t)return o;n.forget(e)}let c=_Rn("SYSTEMROOT")||"C:\\Windows",d=m(c,"System32","where.exe");try{let i=p(d,[e],{stdio:"pipe",encoding:"utf8",timeout:h,windowsHide:!0,env:process.env}).trim().split(/\r?\n/).filter(Boolean),a=process.cwd(),l=!1;for(let r of i){if(u(r))continue;if(kRn(r,a)){l=!0;continue}if(!b(r))continue;return n.remember(e,r),r}if(i.length>0&&!l)n.remember(e,null);return null}catch(s){if(v(s))n.remember(e,null);return null}};
function v(e){if(e===null||typeof e!=="object")return!1;let t="status"in e?e.status:void 0,n="signal"in e?e.signal:void 0,o="code"in e?e.code:void 0;return t===1&&!n&&!o};
return {f,w,h,u,S,b,uor,v};
}

export function createWindowsExecutableDiscovery287(ports){
 for(const key of ['getCache','getEnv','cwd','homedir','lstatSync','realpathSyncNative','spawnSync'])if(typeof ports?.[key]!=='function')throw Error('Missing Windows executable discovery port: '+key);
 const processPort={get env(){return ports.getEnv()},cwd:ports.cwd};
 const currentCacheOwner=()=>({host:ports.getCache()});
 // This source-limited execFileSync bridge retains the Node spawn result fields
 // observed by original v(): status, signal and the original error code.
 const executeFileSync=(file,args,options)=>{
  const result=ports.spawnSync(file,args,options);
  if(result.error)throw Object.assign(result.error,result);
  if(result.status!==0)throw Object.assign(new Error('Command failed: '+file),result);
  return result.stdout;
 };
 const m0=executableModule0({});
const m1=executableModule1({"process":processPort});
const m2=executableModule2({"p":path.win32["resolve"],"c":path.win32["dirname"],"g":path.win32["sep"],"rt":ports["homedir"],"process":processPort,"nt":{native:ports.realpathSyncNative}});
const m3=executableModule3({"V":m0["V"],"U":currentCacheOwner,"g":ports["lstatSync"],"_Rn":m1["_Rn"],"m":path.win32["join"],"p":executeFileSync,"process":processPort,"kRn":m2["kRn"]});
 return {findExecutable:m3["uor"]};
}
