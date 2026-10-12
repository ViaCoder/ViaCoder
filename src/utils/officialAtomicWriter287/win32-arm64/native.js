// Complete original settings context, held snapshot, source reader and admission; existing cache/parser/host ports.
import {rename as builtin0} from "node:fs/promises";
import {lstat as builtin1} from "node:fs/promises";
import {readlink as builtin2} from "node:fs/promises";
import {isAbsolute as builtin3} from "node:path";
import {resolve as builtin4} from "node:path";
import {realpath as builtin5} from "node:fs/promises";
import {dirname as builtin6} from "node:path";
import {randomBytes as builtin7} from "node:crypto";
import {open as builtin8} from "node:fs/promises";
import {closeSync as builtin9} from "node:fs";
function module0(imports){

class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
function l(n){return n instanceof Error?n.message:String(n)};
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return};
function W(n){return v(n)==="ENOENT"};
return {P,l,v,W};
}
function module1(imports){

class wir{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}};
var JH=new wir;
function ee(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??JH).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})};
return {wir,JH,ee};
}
function module2(imports){
const v=imports["v"];
const V=imports["V"];
const I=imports["I"];
const ee=imports["ee"];
var te=!1;
function ne(){return te};
function Te(){return!1};
function sor({served:e}){if(!ne())return!1;return e?!1:Te()};
var aT=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
function oCn(){return sor({served:!1})};
function QJr(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`};
var yL=new Set(["EPERM","EBUSY","EACCES"]);
var se=4;
var ce=50;
var Ae=Array.from({length:se-1},()=>ce);
function le(e,t,n=se-1){let r=v(e);return r!==void 0&&yL.has(r)&&t<n};
var fe=128;
async function Le(e){try{return((await I(e)).mode&fe)===0}catch{return!1}};
async function nU(e,t,n=Ae){let r=!1;for(let o=0;;o++)try{return await e(),r}catch(i){if(le(i,o,n.length)){if(o===0&&t!==void 0&&await Le(t))throw i;r=!0,await ee(n[o]);continue}throw i}};
function Zo(e,t,n=V){return nU(()=>n(e,t),t)};
function oMe(e){let t=v(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"};
async function me(e,t){if(t!=="win32")return!1;try{return await I(e),!0}catch(n){return v(n)==="ENOENT"?!1:{cause:n}}};
function W(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})};
async function _L(e,t="win32"){let n=await me(e,t);if(n===!0)throw W(e,n);if(n!==!1)throw n.cause};
return {te,ne,Te,sor,aT,oCn,QJr,yL,se,ce,Ae,le,fe,Le,nU,Zo,oMe,me,W,_L};
}
function module3(imports){
const ae=imports["ae"];
const ue=imports["ue"];
const H=imports["H"];
const j=imports["j"];
const ee=imports["ee"];
const E=imports["E"];
const t=imports["t"];
const Y=imports["Y"];
const W=imports["W"];
const Q=imports["Q"];
const A=imports["A"];
const oMe=imports["oMe"];
const Zo=imports["Zo"];
const v=imports["v"];
const aT=imports["aT"];
const _L=imports["_L"];
const oCn=imports["oCn"];
const QJr=imports["QJr"];
const l=imports["l"];
const P=imports["P"];
const L=imports["L"];
const K=imports["K"];
const m=imports["m"];
class re{identities=new Map;record(e,n,r,s){let u=J(e),i=this.identities.get(u);if(i)try{L(i.fd)}catch{}this.identities.set(u,{dev:n,ino:r,fd:s})}identity(e){return this.identities.get(J(e))}reset(){for(let{fd:e}of this.identities.values())try{L(e)}catch{}this.identities.clear()}};
function J(e){return j(e)};
function Y5o(e,n,r,s){K().record(e,n,r,s)};
function Rbt(e){return};
function Ctr(e,n,r,s){let u=`${n}${r}`;return u};
class Hf extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}};
class cEn extends Hf{constructor(e,n){super(QJr(e,n));this.name="HardLinkWriteRefusedError"}};
function ie(e){return{flags:"r+",flagsIfMissing:"wx"}};
class Rtr extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}};
function FQe(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new Rtr(e)};
function U(e,n){if(e instanceof Error&&!(e instanceof Hf)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e};
function ce(e){return};
async function tE(e,n,r={encoding:"utf-8"}){let s=ae(),u=(r.allowSymlink,0),i=e,o,f=!1;if(r.allowSymlink)try{let c=await ue(e);i=H(c)?c:j(await ee(E(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{r.checkParentDir;try{let c=await Y(e);if(c.isSymbolicLink())throw new Hf(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);o=c.mode,f=!0}catch(c){if(!W(c))throw c}}let w=`.tmp.${process.pid}.${Q(6).toString("hex")}`,h=Ctr(r.stagingDir,i,w,r.allowSymlink??!1),S=!1;if(r.allowSymlink&&!f)try{o=(await s.stat(i)).mode,f=!0}catch(c){if(!W(c))throw c}if(f&&o!==void 0)t(`Preserving file permissions: ${o.toString(8)}`);else if(r.mode!==void 0)o=r.mode,t(`Setting permissions for new file: ${o.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await A(h,"wx",f?ce(o):r.mode),b=!1,k;try{if(E(h)!==E(i))Rbt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),f&&o!==void 0)try{await c.chmod(o),t("Applied original permissions to temp file")}catch(g){if(!oMe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!oMe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}S=!0}catch(g){b=!0,k=g}try{await c.close()}catch(g){if(!b)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(b)throw k;if(t(`Temp file written successfully, size: ${n.length} bytes`),E(h)!==E(i))Rbt(r.stagingDir);t(`Renaming ${h} to ${i}`),await Zo(h,i,(g,F)=>s.rename(g,F)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let b=v(c);if(S&&b!==void 0&&aT.has(b)||!S&&f&&b==="EACCES"){let{flags:F,flagsIfMissing:D}=ie(u),T=!f&&r.mode!==void 0?r.mode:void 0,y;try{try{y=await A(i,F,T)}catch(p){if(D===void 0||!W(p))throw p;await _L(i),y=await A(i,D,T)}}catch(p){try{await s.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}if(v(p)==="ELOOP")throw new Hf(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await y.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??oCn()))throw new cEn(i,p.nlink);if(p.isFile())await y.truncate(0)}catch(p){await y.close().catch(()=>{});try{await s.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}U(p,c)}try{await y.writeFile(n,{encoding:r.encoding});try{await y.sync()}catch(p){if(!oMe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await y.close();try{await s.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await y.close()}catch{}try{await s.unlink(i)}catch{}if(S)throw new P(`Write to ${i} failed (${v(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");U(p,c)}}try{await s.unlink(h)}catch(F){t(`Failed to clean up temp file: ${F}`)}throw c}};
return {re,J,Y5o,Rbt,Ctr,Hf,cEn,ie,Rtr,FQe,U,ce,tE};
}
export function createAtomicWriter287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"v":m0["v"],"V":builtin0,"I":builtin1,"ee":m1["ee"]});
const m3=module3({"ae":ports["ae"],"ue":builtin2,"H":builtin3,"j":builtin4,"ee":builtin5,"E":builtin6,"t":ports["t"],"Y":builtin1,"W":m0["W"],"Q":builtin7,"A":builtin8,"oMe":m2["oMe"],"Zo":m2["Zo"],"v":m0["v"],"aT":m2["aT"],"_L":m2["_L"],"oCn":m2["oCn"],"QJr":m2["QJr"],"l":m0["l"],"P":m0["P"],"L":builtin9,"K":ports["j"],"m":ports["m"]});
return {"write":m3.tE,"StagingRegistry":m3.re,"record":m3.Y5o,"tampered":m3.FQe,"SymlinkWriteRefusedError":m3.Hf,"HardLinkWriteRefusedError":m3.cEn,"StagingDirTamperedError":m3.Rtr};
}
