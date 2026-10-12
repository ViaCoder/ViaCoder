// Complete original settings context, held snapshot, source reader and admission; existing cache/parser/host ports.
import {rename as builtin0} from "node:fs/promises";
import {lstat as builtin1} from "node:fs/promises";
import {constants as builtin2} from "node:fs";
import {readlink as builtin3} from "node:fs/promises";
import {isAbsolute as builtin4} from "node:path";
import {resolve as builtin5} from "node:path";
import {realpath as builtin6} from "node:fs/promises";
import {dirname as builtin7} from "node:path";
import {open as builtin8} from "node:fs/promises";
import {randomBytes as builtin9} from "node:crypto";
import {openSync as builtin10} from "node:fs";
import {fstatSync as builtin11} from "node:fs";
import {closeSync as builtin12} from "node:fs";
import {join as builtin13} from "node:path";
import {basename as builtin14} from "node:path";
function module0(imports){

class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
function l(n){return n instanceof Error?n.message:String(n)};
function k(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function W(n){return k(n)==="ENOENT"};
return {P,l,k,W};
}
function module1(imports){

class pir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}};
var VH=new pir;
function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??VH).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})};
return {pir,VH,ee};
}
function module2(imports){
const k=imports["k"];
const K=imports["K"];
const C=imports["C"];
const ee=imports["ee"];
var te=!1;
function ne(){return te};
function be(){return!1};
function Jrr({served:e}){if(!ne())return!1;return e?!1:be()};
var iT=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
function JTn(){return Jrr({served:!1})};
function KJr(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`};
var se=4;
var ce=50;
var ke=Array.from({length:se-1},()=>ce);
function le(e,t,n=se-1){return!1};
var ue=128;
async function Ce(e){try{return((await C(e)).mode&ue)===0}catch{return!1}};
async function Q$(e,t,n=ke){let r=!1;for(let o=0;;o++)try{return await e(),r}catch(i){if(le(i,o,n.length)){if(o===0&&t!==void 0&&await Ce(t))throw i;r=!0,await ee(n[o]);continue}throw i}};
function ps(e,t,n=K){return Q$(()=>n(e,t),t)};
function s0e(e){let t=k(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"};
async function me(e,t){if(t!=="win32")return!1;try{return await C(e),!0}catch(n){return k(n)==="ENOENT"?!1:{cause:n}}};
function W(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})};
async function mL(e,t="linux"){let n=await me(e,t);if(n===!0)throw W(e,n);if(n!==!1)throw n.cause};
return {te,ne,be,Jrr,iT,JTn,KJr,se,ce,ke,le,ue,Ce,Q$,ps,s0e,me,W,mL};
}
function module3(imports){
const ae=imports["ae"];
const w=imports["w"];
const fe=imports["fe"];
const Y=imports["Y"];
const z=imports["z"];
const Q=imports["Q"];
const O=imports["O"];
const t=imports["t"];
const A=imports["A"];
const k=imports["k"];
const J=imports["J"];
const W=imports["W"];
const Z=imports["Z"];
const j=imports["j"];
const x=imports["x"];
const m=imports["m"];
const D=imports["D"];
const F=imports["F"];
const R=imports["R"];
const M=imports["M"];
const s0e=imports["s0e"];
const ps=imports["ps"];
const iT=imports["iT"];
const mL=imports["mL"];
const JTn=imports["JTn"];
const KJr=imports["KJr"];
const l=imports["l"];
const P=imports["P"];
class ne{identities=new Map;record(e,n,r,o){let f=X(e),i=this.identities.get(f);if(i)try{F(i.fd)}catch{}this.identities.set(f,{dev:n,ino:r,fd:o})}identity(e){return this.identities.get(X(e))}reset(){for(let{fd:e}of this.identities.values())try{F(e)}catch{}this.identities.clear()}};
function X(e){return z(e)};
function zYo(e,n,r,o){j().record(e,n,r,o)};
function rSt(e){if(!e)return;let n=j().identity(e);if(!n)return;let r;try{r=x(e,w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)}catch(o){let f=k(o);if(f==="ENOENT"||f==="ENOTDIR"||f==="ELOOP"||f==="EACCES")mZe(`Staging dir ${e} was established for a sandboxed command but is now unopenable (${f}) \u2014 refusing atomic write`);throw o}try{let o=D(r);if(o.dev!==n.dev||o.ino!==n.ino)mZe(`Staging dir ${e} identity changed (expected ${n.dev}/${n.ino}, found ${o.dev}/${o.ino}) \u2014 refusing atomic write`)}finally{F(r)}};
function Inr(e,n,r,o){let f=`${n}${r}`;if(!e)return f;let i=j().identity(e);if(o&&O(n)!==O(e))return rSt(e),f;let s=w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW;try{F(x(O(e),s))}catch(y){let h=k(y);if(h==="ELOOP"||h==="ENOTDIR"){if(i)mZe(`Staging dir parent ${O(e)} is ${h} but a sandboxed command established ${e} \u2014 refusing sibling fallback`);if(o)return f;throw new cm(`Refusing to stage atomic write under non-directory parent: ${O(e)}`)}if(!W(y))throw y;if(i)mZe(`Staging dir parent ${O(e)} is absent but a sandboxed command established ${e} \u2014 refusing sibling fallback`);return f}let u;try{u=x(e,s)}catch(y){let h=k(y);if(h==="ENOENT"||h==="ENOTDIR"||h==="ELOOP"){if(i)mZe(`Staging dir ${e} is ${h} but a sandboxed command established it \u2014 refusing sibling fallback`);return f}throw y}try{if(i){let y=D(u);if(y.dev!==i.dev||y.ino!==i.ino)mZe(`Staging dir ${e} identity changed (expected ${i.dev}/${i.ino}, found ${y.dev}/${y.ino}) \u2014 refusing atomic write`)}}finally{F(u)}return R(e,`${M(n)}${r}`)};
class cm extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}};
class sTn extends cm{constructor(e,n){super(KJr(e,n));this.name="HardLinkWriteRefusedError"}};
function re(e){return{flags:w.O_WRONLY|w.O_CREAT|e,flagsIfMissing:void 0}};
class Mnr extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}};
function mZe(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new Mnr(e)};
function U(e,n){if(e instanceof Error&&!(e instanceof cm)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e};
function se(e){return e===void 0?void 0:e&511|128};
async function tE(e,n,r={encoding:"utf-8"}){let o=ae(),f=r.allowSymlink?0:w.O_NOFOLLOW,i=e,s,u=!1;if(r.allowSymlink)try{let c=await fe(e);i=Y(c)?c:z(await Q(O(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{if(r.checkParentDir)try{await(await A(O(e),w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)).close()}catch(c){let E=k(c);if(E==="ELOOP"||E==="ENOTDIR")throw new cm(`Refusing to write into symlinked directory: ${O(e)}`)}try{let c=await J(e);if(c.isSymbolicLink())throw new cm(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);s=c.mode,u=!0}catch(c){if(!W(c))throw c}}let y=`.tmp.${process.pid}.${Z(6).toString("hex")}`,h=Inr(r.stagingDir,i,y,r.allowSymlink??!1),S=!1;if(r.allowSymlink&&!u)try{s=(await o.stat(i)).mode,u=!0}catch(c){if(!W(c))throw c}if(u&&s!==void 0)t(`Preserving file permissions: ${s.toString(8)}`);else if(r.mode!==void 0)s=r.mode,t(`Setting permissions for new file: ${s.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await A(h,w.O_WRONLY|w.O_CREAT|w.O_EXCL|f,u?se(s):r.mode),E=!1,_;try{if(O(h)!==O(i))rSt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),u&&s!==void 0)try{await c.chmod(s),t("Applied original permissions to temp file")}catch(g){if(!s0e(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!s0e(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}S=!0}catch(g){E=!0,_=g}try{await c.close()}catch(g){if(!E)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(E)throw _;if(t(`Temp file written successfully, size: ${n.length} bytes`),O(h)!==O(i))rSt(r.stagingDir);t(`Renaming ${h} to ${i}`),await ps(h,i,(g,L)=>o.rename(g,L)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let E=k(c);if(S&&E!==void 0&&iT.has(E)||!S&&u&&E==="EACCES"){let{flags:L,flagsIfMissing:T}=re(f),C=!u&&r.mode!==void 0?r.mode:void 0,b;try{try{b=await A(i,L,C)}catch(p){if(T===void 0||!W(p))throw p;await mL(i),b=await A(i,T,C)}}catch(p){try{await o.unlink(h)}catch(v){t(`Failed to clean up temp file: ${v}`)}if(k(p)==="ELOOP")throw new cm(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await b.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??JTn()))throw new sTn(i,p.nlink);if(p.isFile())await b.truncate(0)}catch(p){await b.close().catch(()=>{});try{await o.unlink(h)}catch(v){t(`Failed to clean up temp file: ${v}`)}U(p,c)}try{await b.writeFile(n,{encoding:r.encoding});try{await b.sync()}catch(p){if(!s0e(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await b.close();try{await o.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await b.close()}catch{}try{await o.unlink(i)}catch{}if(S)throw new P(`Write to ${i} failed (${k(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");U(p,c)}}try{await o.unlink(h)}catch(L){t(`Failed to clean up temp file: ${L}`)}throw c}};
return {ne,X,zYo,rSt,Inr,cm,sTn,re,Mnr,mZe,U,se,tE};
}
export function createAtomicWriter287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"k":m0["k"],"K":builtin0,"C":builtin1,"ee":m1["ee"]});
const m3=module3({"ae":ports["ae"],"w":builtin2,"fe":builtin3,"Y":builtin4,"z":builtin5,"Q":builtin6,"O":builtin7,"t":ports["t"],"A":builtin8,"k":m0["k"],"J":builtin1,"W":m0["W"],"Z":builtin9,"j":ports["j"],"x":builtin10,"m":ports["m"],"D":builtin11,"F":builtin12,"R":builtin13,"M":builtin14,"s0e":m2["s0e"],"ps":m2["ps"],"iT":m2["iT"],"mL":m2["mL"],"JTn":m2["JTn"],"KJr":m2["KJr"],"l":m0["l"],"P":m0["P"]});
return {"write":m3.tE,"StagingRegistry":m3.ne,"record":m3.zYo,"tampered":m3.mZe,"SymlinkWriteRefusedError":m3.cm,"HardLinkWriteRefusedError":m3.sTn,"StagingDirTamperedError":m3.Mnr};
}
