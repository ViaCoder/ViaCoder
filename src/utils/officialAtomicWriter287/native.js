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
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function W(n){return E(n)==="ENOENT"};
return {P,l,E,W};
}
function module1(imports){

class Mir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}};
var aB=new Mir;
function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??aB).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})};
return {Mir,aB,ee};
}
function module2(imports){
const E=imports["E"];
const K=imports["K"];
const I=imports["I"];
const ee=imports["ee"];
var te=!1;
function ne(){return te};
function be(){return!1};
function wor({served:e}){if(!ne())return!1;return e?!1:be()};
var aA=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
function mTn(){return wor({served:!1})};
function EJr(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`};
var se=4;
var ce=50;
var ke=Array.from({length:se-1},()=>ce);
function le(e,t,n=se-1){return!1};
var ue=128;
async function Ce(e){try{return((await I(e)).mode&ue)===0}catch{return!1}};
async function c$(e,t,n=ke){let r=!1;for(let o=0;;o++)try{return await e(),r}catch(i){if(le(i,o,n.length)){if(o===0&&t!==void 0&&await Ce(t))throw i;r=!0,await ee(n[o]);continue}throw i}};
function ps(e,t,n=K){return c$(()=>n(e,t),t)};
function uOe(e){let t=E(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"};
async function me(e,t){if(t!=="win32")return!1;try{return await I(e),!0}catch(n){return E(n)==="ENOENT"?!1:{cause:n}}};
function W(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})};
async function wL(e,t="darwin"){let n=await me(e,t);if(n===!0)throw W(e,n);if(n!==!1)throw n.cause};
return {te,ne,be,wor,aA,mTn,EJr,se,ce,ke,le,ue,Ce,c$,ps,uOe,me,W,wL};
}
function module3(imports){
const ae=imports["ae"];
const w=imports["w"];
const fe=imports["fe"];
const Y=imports["Y"];
const z=imports["z"];
const q=imports["q"];
const b=imports["b"];
const t=imports["t"];
const A=imports["A"];
const E=imports["E"];
const Q=imports["Q"];
const W=imports["W"];
const J=imports["J"];
const j=imports["j"];
const k=imports["k"];
const m=imports["m"];
const D=imports["D"];
const x=imports["x"];
const _=imports["_"];
const M=imports["M"];
const uOe=imports["uOe"];
const ps=imports["ps"];
const aA=imports["aA"];
const wL=imports["wL"];
const mTn=imports["mTn"];
const EJr=imports["EJr"];
const l=imports["l"];
const P=imports["P"];
class ne{identities=new Map;record(e,n,r,o){let f=Z(e),i=this.identities.get(f);if(i)try{x(i.fd)}catch{}this.identities.set(f,{dev:n,ino:r,fd:o})}identity(e){return this.identities.get(Z(e))}reset(){for(let{fd:e}of this.identities.values())try{x(e)}catch{}this.identities.clear()}};
function Z(e){return z(e)};
function F8o(e,n,r,o){j().record(e,n,r,o)};
function ybt(e){if(!e)return;let n=j().identity(e);if(!n)return;let r;try{r=k(e,w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)}catch(o){let f=E(o);if(f==="ENOENT"||f==="ENOTDIR"||f==="ELOOP"||f==="EACCES")RZe(`Staging dir ${e} was established for a sandboxed command but is now unopenable (${f}) \u2014 refusing atomic write`);throw o}try{let o=D(r);if(o.dev!==n.dev||o.ino!==n.ino)RZe(`Staging dir ${e} identity changed (expected ${n.dev}/${n.ino}, found ${o.dev}/${o.ino}) \u2014 refusing atomic write`)}finally{x(r)}};
function urr(e,n,r,o){let f=`${n}${r}`;if(!e)return f;let i=j().identity(e);if(o&&b(n)!==b(e))return ybt(e),f;let s=w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW;try{x(k(b(e),s))}catch(y){let h=E(y);if(h==="ELOOP"||h==="ENOTDIR"){if(i)RZe(`Staging dir parent ${b(e)} is ${h} but a sandboxed command established ${e} \u2014 refusing sibling fallback`);if(o)return f;throw new dm(`Refusing to stage atomic write under non-directory parent: ${b(e)}`)}if(!W(y))throw y;if(i)RZe(`Staging dir parent ${b(e)} is absent but a sandboxed command established ${e} \u2014 refusing sibling fallback`);return f}let u;try{u=k(e,s)}catch(y){let h=E(y);if(h==="ENOENT"||h==="ENOTDIR"||h==="ELOOP"){if(i)RZe(`Staging dir ${e} is ${h} but a sandboxed command established it \u2014 refusing sibling fallback`);return f}throw y}try{if(i){let y=D(u);if(y.dev!==i.dev||y.ino!==i.ino)RZe(`Staging dir ${e} identity changed (expected ${i.dev}/${i.ino}, found ${y.dev}/${y.ino}) \u2014 refusing atomic write`)}}finally{x(u)}return _(e,`${M(n)}${r}`)};
class dm extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}};
class RAn extends dm{constructor(e,n){super(EJr(e,n));this.name="HardLinkWriteRefusedError"}};
function re(e){return{flags:w.O_WRONLY|w.O_CREAT|e,flagsIfMissing:void 0}};
class prr extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}};
function RZe(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new prr(e)};
function B(e,n){if(e instanceof Error&&!(e instanceof dm)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e};
function se(e){return e===void 0?void 0:e&511|128};
async function rC(e,n,r={encoding:"utf-8"}){let o=ae(),f=r.allowSymlink?0:w.O_NOFOLLOW,i=e,s,u=!1;if(r.allowSymlink)try{let c=await fe(e);i=Y(c)?c:z(await q(b(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{if(r.checkParentDir)try{await(await A(b(e),w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)).close()}catch(c){let S=E(c);if(S==="ELOOP"||S==="ENOTDIR")throw new dm(`Refusing to write into symlinked directory: ${b(e)}`)}try{let c=await Q(e);if(c.isSymbolicLink())throw new dm(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);s=c.mode,u=!0}catch(c){if(!W(c))throw c}}let y=`.tmp.${process.pid}.${J(6).toString("hex")}`,h=urr(r.stagingDir,i,y,r.allowSymlink??!1),L=!1;if(r.allowSymlink&&!u)try{s=(await o.stat(i)).mode,u=!0}catch(c){if(!W(c))throw c}if(u&&s!==void 0)t(`Preserving file permissions: ${s.toString(8)}`);else if(r.mode!==void 0)s=r.mode,t(`Setting permissions for new file: ${s.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await A(h,w.O_WRONLY|w.O_CREAT|w.O_EXCL|f,u?se(s):r.mode),S=!1,v;try{if(b(h)!==b(i))ybt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),u&&s!==void 0)try{await c.chmod(s),t("Applied original permissions to temp file")}catch(g){if(!uOe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!uOe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}L=!0}catch(g){S=!0,v=g}try{await c.close()}catch(g){if(!S)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(S)throw v;if(t(`Temp file written successfully, size: ${n.length} bytes`),b(h)!==b(i))ybt(r.stagingDir);t(`Renaming ${h} to ${i}`),await ps(h,i,(g,R)=>o.rename(g,R)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let S=E(c);if(L&&S!==void 0&&aA.has(S)||!L&&u&&S==="EACCES"){let{flags:R,flagsIfMissing:T}=re(f),C=!u&&r.mode!==void 0?r.mode:void 0,F;try{try{F=await A(i,R,C)}catch(p){if(T===void 0||!W(p))throw p;await wL(i),F=await A(i,T,C)}}catch(p){try{await o.unlink(h)}catch(I){t(`Failed to clean up temp file: ${I}`)}if(E(p)==="ELOOP")throw new dm(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await F.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??mTn()))throw new RAn(i,p.nlink);if(p.isFile())await F.truncate(0)}catch(p){await F.close().catch(()=>{});try{await o.unlink(h)}catch(I){t(`Failed to clean up temp file: ${I}`)}B(p,c)}try{await F.writeFile(n,{encoding:r.encoding});try{await F.sync()}catch(p){if(!uOe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await F.close();try{await o.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await F.close()}catch{}try{await o.unlink(i)}catch{}if(L)throw new P(`Write to ${i} failed (${E(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");B(p,c)}}try{await o.unlink(h)}catch(R){t(`Failed to clean up temp file: ${R}`)}throw c}};
return {ne,Z,F8o,ybt,urr,dm,RAn,re,prr,RZe,B,se,rC};
}
export function createAtomicWriter287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"E":m0["E"],"K":builtin0,"I":builtin1,"ee":m1["ee"]});
const m3=module3({"ae":ports["ae"],"w":builtin2,"fe":builtin3,"Y":builtin4,"z":builtin5,"q":builtin6,"b":builtin7,"t":ports["t"],"A":builtin8,"E":m0["E"],"Q":builtin1,"W":m0["W"],"J":builtin9,"j":ports["j"],"k":builtin10,"m":ports["m"],"D":builtin11,"x":builtin12,"_":builtin13,"M":builtin14,"uOe":m2["uOe"],"ps":m2["ps"],"aA":m2["aA"],"wL":m2["wL"],"mTn":m2["mTn"],"EJr":m2["EJr"],"l":m0["l"],"P":m0["P"]});
return {"write":m3.rC,"StagingRegistry":m3.ne,"record":m3.F8o,"tampered":m3.RZe,"SymlinkWriteRefusedError":m3.dm,"HardLinkWriteRefusedError":m3.RAn,"StagingDirTamperedError":m3.prr};
}
