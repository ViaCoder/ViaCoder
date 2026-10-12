import {createPlatformAtomic287} from '../officialAtomicWriter287/platform.js'
import {bindAtomicWriterCaller287,getAtomicStagingRegistry287} from '../atomicWriter287.js'
// Official npm 2.1.286 per-platform complete atomic writer/helper declarations.
function darwin_arm64(ports){
const helper1=(()=>{
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return v;})();
const helper2=(()=>{
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function G(n){return v(n)==="ENOENT"}
return G;})();
const helper3=(()=>{
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;})();
const helper4=(()=>{const v=helper1;
function dIe(e){let t=v(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
return dIe;})();
const helper6=(()=>{
class mtr{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var zQ=new mtr;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??zQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
return Z;})();
const helper5=(()=>{const ie=ports.fsPromises["rename"];
const I=ports.fsPromises["lstat"];
const Z=helper6;
var se=50;
function ce(e,t){return!1}
var le=128;
async function Le(e){try{return((await I(e)).mode&le)===0}catch{return!1}}
async function xG(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Le(t))throw o;n=!0,await Z(se);continue}throw o}}
function cs(e,t,n=ie){return xG(()=>n(e,t),t)}
return cs;})();
const helper7=(()=>{
var kC=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
return kC;})();
const helper8=(()=>{const I=ports.fsPromises["lstat"];
const v=helper1;
async function we(e,t){if(t!=="win32")return!1;try{return await I(e),!0}catch(n){return v(n)==="ENOENT"?!1:{cause:n}}}
function W(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
async function UM(e,t="darwin"){let n=await we(e,t);if(n===!0)throw W(e,n);if(n!==!1)throw n.cause}
return UM;})();
const helper9=(()=>{
var ee=!1;
function te(){return ee}
function Ne(){return!1}
function oZn({served:e}){if(!te())return!1;return e?!1:Ne()}
function Ywn(){return oZn({served:!1})}
return Ywn;})();
const helper10=(()=>{
function g5r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
return g5r;})();
const helper11=(()=>{
function l(n){return n instanceof Error?n.message:String(n)}
return l;})();
const helper12=(()=>{
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return P;})();
const helper0=(()=>{const ae=ports.fileOps;
const w=ports.fs["constants"];
const fe=ports.fsPromises["readlink"];
const U=ports.path["isAbsolute"];
const Y=ports.path["resolve"];
const Q=ports.fsPromises["realpath"];
const E=ports.path["dirname"];
const t=ports.debug;
const W=ports.fsPromises["open"];
const v=helper1;
const J=ports.fsPromises["lstat"];
const G=helper2;
const Z=ports.crypto["randomBytes"];
const q=helper3;
const L=ports.fs["closeSync"];
const j=ports.context;
const R=ports.fs["openSync"];
const m=ports.featureSad;
const D=ports.fs["fstatSync"];
const k=ports.path["join"];
const A=ports.path["basename"];
const dIe=helper4;
const cs=helper5;
const kC=helper7;
const UM=helper8;
const Ywn=helper9;
const g5r=helper10;
const l=helper11;
const P=helper12;
class ne{identities=new Map;record(e,n,r,o){let f=X(e),i=this.identities.get(f);if(i)try{L(i.fd)}catch{}this.identities.set(f,{dev:n,ino:r,fd:o})}identity(e){return this.identities.get(X(e))}reset(){for(let{fd:e}of this.identities.values())try{L(e)}catch{}this.identities.clear()}}
var pe=new q(()=>new ne);
function H(){return pe.of(j().host)}
function X(e){return Y(e)}
function wyt(e){if(!e)return;let n=H().identity(e);if(!n)return;let r;try{r=R(e,w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)}catch(o){let f=v(o);if(f==="ENOENT"||f==="ENOTDIR"||f==="ELOOP"||f==="EACCES")K7e(`Staging dir ${e} was established for a sandboxed command but is now unopenable (${f}) \u2014 refusing atomic write`);throw o}try{let o=D(r);if(o.dev!==n.dev||o.ino!==n.ino)K7e(`Staging dir ${e} identity changed (expected ${n.dev}/${n.ino}, found ${o.dev}/${o.ino}) \u2014 refusing atomic write`)}finally{L(r)}}
function YJn(e,n,r,o){let f=`${n}${r}`;if(!e)return f;let i=H().identity(e);if(o&&E(n)!==E(e))return wyt(e),f;let s=w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW;try{L(R(E(e),s))}catch(y){let h=v(y);if(h==="ELOOP"||h==="ENOTDIR"){if(i)K7e(`Staging dir parent ${E(e)} is ${h} but a sandboxed command established ${e} \u2014 refusing sibling fallback`);if(o)return f;throw new jf(`Refusing to stage atomic write under non-directory parent: ${E(e)}`)}if(!G(y))throw y;if(i)K7e(`Staging dir parent ${E(e)} is absent but a sandboxed command established ${e} \u2014 refusing sibling fallback`);return f}let u;try{u=R(e,s)}catch(y){let h=v(y);if(h==="ENOENT"||h==="ENOTDIR"||h==="ELOOP"){if(i)K7e(`Staging dir ${e} is ${h} but a sandboxed command established it \u2014 refusing sibling fallback`);return f}throw y}try{if(i){let y=D(u);if(y.dev!==i.dev||y.ino!==i.ino)K7e(`Staging dir ${e} identity changed (expected ${i.dev}/${i.ino}, found ${y.dev}/${y.ino}) \u2014 refusing atomic write`)}}finally{L(u)}return k(e,`${A(n)}${r}`)}
class jf extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}}
class awn extends jf{constructor(e,n){super(g5r(e,n));this.name="HardLinkWriteRefusedError"}}
function re(e){return{flags:w.O_WRONLY|w.O_CREAT|e,flagsIfMissing:void 0}}
class XJn extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}}
function K7e(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new XJn(e)}
function M(e,n){if(e instanceof Error&&!(e instanceof jf)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e}
function se(e){return e===void 0?void 0:e&511|128}
async function wv(e,n,r={encoding:"utf-8"}){let o=ae(),f=r.allowSymlink?0:w.O_NOFOLLOW,i=e,s,u=!1;if(r.allowSymlink)try{let c=await fe(e);i=U(c)?c:Y(await Q(E(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{if(r.checkParentDir)try{await(await W(E(e),w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)).close()}catch(c){let b=v(c);if(b==="ELOOP"||b==="ENOTDIR")throw new jf(`Refusing to write into symlinked directory: ${E(e)}`)}try{let c=await J(e);if(c.isSymbolicLink())throw new jf(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);s=c.mode,u=!0}catch(c){if(!G(c))throw c}}let y=`.tmp.${process.pid}.${Z(6).toString("hex")}`,h=YJn(r.stagingDir,i,y,r.allowSymlink??!1),F=!1;if(r.allowSymlink&&!u)try{s=(await o.stat(i)).mode,u=!0}catch(c){if(!G(c))throw c}if(u&&s!==void 0)t(`Preserving file permissions: ${s.toString(8)}`);else if(r.mode!==void 0)s=r.mode,t(`Setting permissions for new file: ${s.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await W(h,w.O_WRONLY|w.O_CREAT|w.O_EXCL|f,u?se(s):r.mode),b=!1,_;try{if(E(h)!==E(i))wyt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),u&&s!==void 0)try{await c.chmod(s),t("Applied original permissions to temp file")}catch(g){if(!dIe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!dIe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}F=!0}catch(g){b=!0,_=g}try{await c.close()}catch(g){if(!b)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(b)throw _;if(t(`Temp file written successfully, size: ${n.length} bytes`),E(h)!==E(i))wyt(r.stagingDir);t(`Renaming ${h} to ${i}`),await cs(h,i,(g,x)=>o.rename(g,x)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let b=v(c);if(F&&b!==void 0&&kC.has(b)||!F&&u&&b==="EACCES"){let{flags:x,flagsIfMissing:T}=re(f),C=!u&&r.mode!==void 0?r.mode:void 0,S;try{try{S=await W(i,x,C)}catch(p){if(T===void 0||!G(p))throw p;await UM(i),S=await W(i,T,C)}}catch(p){try{await o.unlink(h)}catch(I){t(`Failed to clean up temp file: ${I}`)}if(v(p)==="ELOOP")throw new jf(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await S.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??Ywn()))throw new awn(i,p.nlink);if(p.isFile())await S.truncate(0)}catch(p){await S.close().catch(()=>{});try{await o.unlink(h)}catch(I){t(`Failed to clean up temp file: ${I}`)}M(p,c)}try{await S.writeFile(n,{encoding:r.encoding});try{await S.sync()}catch(p){if(!dIe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await S.close();try{await o.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await S.close()}catch{}try{await o.unlink(i)}catch{}if(F)throw new P(`Write to ${i} failed (${v(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");M(p,c)}}try{await o.unlink(h)}catch(x){t(`Failed to clean up temp file: ${x}`)}throw c}}
return wv;})();
return {write:helper0};
}
function darwin_x64(ports){
const helper1=(()=>{
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return v;})();
const helper2=(()=>{
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function G(n){return v(n)==="ENOENT"}
return G;})();
const helper3=(()=>{
class K{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return K;})();
const helper4=(()=>{const v=helper1;
function dIe(e){let t=v(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
return dIe;})();
const helper6=(()=>{
class mtr{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var zQ=new mtr;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??zQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
return Z;})();
const helper5=(()=>{const ie=ports.fsPromises["rename"];
const C=ports.fsPromises["lstat"];
const Z=helper6;
var se=50;
function ce(e,t){return!1}
var le=128;
async function Le(e){try{return((await C(e)).mode&le)===0}catch{return!1}}
async function xG(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Le(t))throw o;n=!0,await Z(se);continue}throw o}}
function cs(e,t,n=ie){return xG(()=>n(e,t),t)}
return cs;})();
const helper7=(()=>{
var TA=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
return TA;})();
const helper8=(()=>{const C=ports.fsPromises["lstat"];
const v=helper1;
async function we(e,t){if(t!=="win32")return!1;try{return await C(e),!0}catch(n){return v(n)==="ENOENT"?!1:{cause:n}}}
function I(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
async function UM(e,t="darwin"){let n=await we(e,t);if(n===!0)throw I(e,n);if(n!==!1)throw n.cause}
return UM;})();
const helper9=(()=>{
var ee=!1;
function te(){return ee}
function Ne(){return!1}
function oZn({served:e}){if(!te())return!1;return e?!1:Ne()}
function Ywn(){return oZn({served:!1})}
return Ywn;})();
const helper10=(()=>{
function g5r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
return g5r;})();
const helper11=(()=>{
function l(n){return n instanceof Error?n.message:String(n)}
return l;})();
const helper12=(()=>{
class H extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return H;})();
const helper0=(()=>{const ae=ports.fileOps;
const w=ports.fs["constants"];
const fe=ports.fsPromises["readlink"];
const M=ports.path["isAbsolute"];
const B=ports.path["resolve"];
const q=ports.fsPromises["realpath"];
const E=ports.path["dirname"];
const t=ports.debug;
const C=ports.fsPromises["open"];
const v=helper1;
const Q=ports.fsPromises["lstat"];
const G=helper2;
const J=ports.crypto["randomBytes"];
const K=helper3;
const L=ports.fs["closeSync"];
const j=ports.context;
const R=ports.fs["openSync"];
const m=ports.featureSad;
const P=ports.fs["fstatSync"];
const k=ports.path["join"];
const W=ports.path["basename"];
const dIe=helper4;
const cs=helper5;
const TA=helper7;
const UM=helper8;
const Ywn=helper9;
const g5r=helper10;
const l=helper11;
const H=helper12;
class ne{identities=new Map;record(e,n,r,o){let f=Z(e),i=this.identities.get(f);if(i)try{L(i.fd)}catch{}this.identities.set(f,{dev:n,ino:r,fd:o})}identity(e){return this.identities.get(Z(e))}reset(){for(let{fd:e}of this.identities.values())try{L(e)}catch{}this.identities.clear()}}
var pe=new K(()=>new ne);
function Y(){return pe.of(j().host)}
function Z(e){return B(e)}
function wyt(e){if(!e)return;let n=Y().identity(e);if(!n)return;let r;try{r=R(e,w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)}catch(o){let f=v(o);if(f==="ENOENT"||f==="ENOTDIR"||f==="ELOOP"||f==="EACCES")q7e(`Staging dir ${e} was established for a sandboxed command but is now unopenable (${f}) \u2014 refusing atomic write`);throw o}try{let o=P(r);if(o.dev!==n.dev||o.ino!==n.ino)q7e(`Staging dir ${e} identity changed (expected ${n.dev}/${n.ino}, found ${o.dev}/${o.ino}) \u2014 refusing atomic write`)}finally{L(r)}}
function YJn(e,n,r,o){let f=`${n}${r}`;if(!e)return f;let i=Y().identity(e);if(o&&E(n)!==E(e))return wyt(e),f;let s=w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW;try{L(R(E(e),s))}catch(y){let h=v(y);if(h==="ELOOP"||h==="ENOTDIR"){if(i)q7e(`Staging dir parent ${E(e)} is ${h} but a sandboxed command established ${e} \u2014 refusing sibling fallback`);if(o)return f;throw new jf(`Refusing to stage atomic write under non-directory parent: ${E(e)}`)}if(!G(y))throw y;if(i)q7e(`Staging dir parent ${E(e)} is absent but a sandboxed command established ${e} \u2014 refusing sibling fallback`);return f}let u;try{u=R(e,s)}catch(y){let h=v(y);if(h==="ENOENT"||h==="ENOTDIR"||h==="ELOOP"){if(i)q7e(`Staging dir ${e} is ${h} but a sandboxed command established it \u2014 refusing sibling fallback`);return f}throw y}try{if(i){let y=P(u);if(y.dev!==i.dev||y.ino!==i.ino)q7e(`Staging dir ${e} identity changed (expected ${i.dev}/${i.ino}, found ${y.dev}/${y.ino}) \u2014 refusing atomic write`)}}finally{L(u)}return k(e,`${W(n)}${r}`)}
class jf extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}}
class awn extends jf{constructor(e,n){super(g5r(e,n));this.name="HardLinkWriteRefusedError"}}
function re(e){return{flags:w.O_WRONLY|w.O_CREAT|e,flagsIfMissing:void 0}}
class XJn extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}}
function q7e(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new XJn(e)}
function A(e,n){if(e instanceof Error&&!(e instanceof jf)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e}
function se(e){return e===void 0?void 0:e&511|128}
async function wv(e,n,r={encoding:"utf-8"}){let o=ae(),f=r.allowSymlink?0:w.O_NOFOLLOW,i=e,s,u=!1;if(r.allowSymlink)try{let c=await fe(e);i=M(c)?c:B(await q(E(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{if(r.checkParentDir)try{await(await C(E(e),w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)).close()}catch(c){let b=v(c);if(b==="ELOOP"||b==="ENOTDIR")throw new jf(`Refusing to write into symlinked directory: ${E(e)}`)}try{let c=await Q(e);if(c.isSymbolicLink())throw new jf(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);s=c.mode,u=!0}catch(c){if(!G(c))throw c}}let y=`.tmp.${process.pid}.${J(6).toString("hex")}`,h=YJn(r.stagingDir,i,y,r.allowSymlink??!1),F=!1;if(r.allowSymlink&&!u)try{s=(await o.stat(i)).mode,u=!0}catch(c){if(!G(c))throw c}if(u&&s!==void 0)t(`Preserving file permissions: ${s.toString(8)}`);else if(r.mode!==void 0)s=r.mode,t(`Setting permissions for new file: ${s.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await C(h,w.O_WRONLY|w.O_CREAT|w.O_EXCL|f,u?se(s):r.mode),b=!1,_;try{if(E(h)!==E(i))wyt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),u&&s!==void 0)try{await c.chmod(s),t("Applied original permissions to temp file")}catch(g){if(!dIe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!dIe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}F=!0}catch(g){b=!0,_=g}try{await c.close()}catch(g){if(!b)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(b)throw _;if(t(`Temp file written successfully, size: ${n.length} bytes`),E(h)!==E(i))wyt(r.stagingDir);t(`Renaming ${h} to ${i}`),await cs(h,i,(g,x)=>o.rename(g,x)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let b=v(c);if(F&&b!==void 0&&TA.has(b)||!F&&u&&b==="EACCES"){let{flags:x,flagsIfMissing:D}=re(f),T=!u&&r.mode!==void 0?r.mode:void 0,S;try{try{S=await C(i,x,T)}catch(p){if(D===void 0||!G(p))throw p;await UM(i),S=await C(i,D,T)}}catch(p){try{await o.unlink(h)}catch(I){t(`Failed to clean up temp file: ${I}`)}if(v(p)==="ELOOP")throw new jf(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await S.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??Ywn()))throw new awn(i,p.nlink);if(p.isFile())await S.truncate(0)}catch(p){await S.close().catch(()=>{});try{await o.unlink(h)}catch(I){t(`Failed to clean up temp file: ${I}`)}A(p,c)}try{await S.writeFile(n,{encoding:r.encoding});try{await S.sync()}catch(p){if(!dIe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await S.close();try{await o.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await S.close()}catch{}try{await o.unlink(i)}catch{}if(F)throw new H(`Write to ${i} failed (${v(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");A(p,c)}}try{await o.unlink(h)}catch(x){t(`Failed to clean up temp file: ${x}`)}throw c}}
return wv;})();
return {write:helper0};
}
function linux_arm64(ports){
const helper1=(()=>{
function T(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return T;})();
const helper2=(()=>{
function T(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function z(n){return T(n)==="ENOENT"}
return z;})();
const helper3=(()=>{
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;})();
const helper4=(()=>{const T=helper1;
function oOe(e){let t=T(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
return oOe;})();
const helper6=(()=>{
class Ger{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var LQ=new Ger;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??LQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
return Z;})();
const helper5=(()=>{const ie=ports.fsPromises["rename"];
const C=ports.fsPromises["lstat"];
const Z=helper6;
var se=50;
function ce(e,t){return!1}
var le=128;
async function Le(e){try{return((await C(e)).mode&le)===0}catch{return!1}}
async function wG(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Le(t))throw o;n=!0,await Z(se);continue}throw o}}
function cs(e,t,n=ie){return wG(()=>n(e,t),t)}
return cs;})();
const helper7=(()=>{
var ET=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
return ET;})();
const helper8=(()=>{const C=ports.fsPromises["lstat"];
const T=helper1;
async function we(e,t){if(t!=="win32")return!1;try{return await C(e),!0}catch(n){return T(n)==="ENOENT"?!1:{cause:n}}}
function I(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
async function MN(e,t="linux"){let n=await we(e,t);if(n===!0)throw I(e,n);if(n!==!1)throw n.cause}
return MN;})();
const helper9=(()=>{
var ee=!1;
function te(){return ee}
function Ne(){return!1}
function NQn({served:e}){if(!te())return!1;return e?!1:Ne()}
function Iwn(){return NQn({served:!1})}
return Iwn;})();
const helper10=(()=>{
function U6r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
return U6r;})();
const helper11=(()=>{
function l(n){return n instanceof Error?n.message:String(n)}
return l;})();
const helper12=(()=>{
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return P;})();
const helper0=(()=>{const ae=ports.fileOps;
const w=ports.fs["constants"];
const fe=ports.fsPromises["readlink"];
const U=ports.path["isAbsolute"];
const Y=ports.path["resolve"];
const Q=ports.fsPromises["realpath"];
const O=ports.path["dirname"];
const t=ports.debug;
const C=ports.fsPromises["open"];
const T=helper1;
const J=ports.fsPromises["lstat"];
const z=helper2;
const Z=ports.crypto["randomBytes"];
const q=helper3;
const F=ports.fs["closeSync"];
const j=ports.context;
const x=ports.fs["openSync"];
const m=ports.featureSad;
const I=ports.fs["fstatSync"];
const R=ports.path["join"];
const W=ports.path["basename"];
const oOe=helper4;
const cs=helper5;
const ET=helper7;
const MN=helper8;
const Iwn=helper9;
const U6r=helper10;
const l=helper11;
const P=helper12;
class ne{identities=new Map;record(e,n,r,o){let f=X(e),i=this.identities.get(f);if(i)try{F(i.fd)}catch{}this.identities.set(f,{dev:n,ino:r,fd:o})}identity(e){return this.identities.get(X(e))}reset(){for(let{fd:e}of this.identities.values())try{F(e)}catch{}this.identities.clear()}}
var pe=new q(()=>new ne);
function H(){return pe.of(j().host)}
function X(e){return Y(e)}
function ayt(e){if(!e)return;let n=H().identity(e);if(!n)return;let r;try{r=x(e,w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)}catch(o){let f=T(o);if(f==="ENOENT"||f==="ENOTDIR"||f==="ELOOP"||f==="EACCES")DJe(`Staging dir ${e} was established for a sandboxed command but is now unopenable (${f}) \u2014 refusing atomic write`);throw o}try{let o=I(r);if(o.dev!==n.dev||o.ino!==n.ino)DJe(`Staging dir ${e} identity changed (expected ${n.dev}/${n.ino}, found ${o.dev}/${o.ino}) \u2014 refusing atomic write`)}finally{F(r)}}
function y7n(e,n,r,o){let f=`${n}${r}`;if(!e)return f;let i=H().identity(e);if(o&&O(n)!==O(e))return ayt(e),f;let s=w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW;try{F(x(O(e),s))}catch(y){let h=T(y);if(h==="ELOOP"||h==="ENOTDIR"){if(i)DJe(`Staging dir parent ${O(e)} is ${h} but a sandboxed command established ${e} \u2014 refusing sibling fallback`);if(o)return f;throw new jf(`Refusing to stage atomic write under non-directory parent: ${O(e)}`)}if(!z(y))throw y;if(i)DJe(`Staging dir parent ${O(e)} is absent but a sandboxed command established ${e} \u2014 refusing sibling fallback`);return f}let u;try{u=x(e,s)}catch(y){let h=T(y);if(h==="ENOENT"||h==="ENOTDIR"||h==="ELOOP"){if(i)DJe(`Staging dir ${e} is ${h} but a sandboxed command established it \u2014 refusing sibling fallback`);return f}throw y}try{if(i){let y=I(u);if(y.dev!==i.dev||y.ino!==i.ino)DJe(`Staging dir ${e} identity changed (expected ${i.dev}/${i.ino}, found ${y.dev}/${y.ino}) \u2014 refusing atomic write`)}}finally{F(u)}return R(e,`${W(n)}${r}`)}
class jf extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}}
class FSn extends jf{constructor(e,n){super(U6r(e,n));this.name="HardLinkWriteRefusedError"}}
function re(e){return{flags:w.O_WRONLY|w.O_CREAT|e,flagsIfMissing:void 0}}
class _7n extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}}
function DJe(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new _7n(e)}
function A(e,n){if(e instanceof Error&&!(e instanceof jf)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e}
function se(e){return e===void 0?void 0:e&511|128}
async function Sk(e,n,r={encoding:"utf-8"}){let o=ae(),f=r.allowSymlink?0:w.O_NOFOLLOW,i=e,s,u=!1;if(r.allowSymlink)try{let c=await fe(e);i=U(c)?c:Y(await Q(O(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{if(r.checkParentDir)try{await(await C(O(e),w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)).close()}catch(c){let E=T(c);if(E==="ELOOP"||E==="ENOTDIR")throw new jf(`Refusing to write into symlinked directory: ${O(e)}`)}try{let c=await J(e);if(c.isSymbolicLink())throw new jf(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);s=c.mode,u=!0}catch(c){if(!z(c))throw c}}let y=`.tmp.${process.pid}.${Z(6).toString("hex")}`,h=y7n(r.stagingDir,i,y,r.allowSymlink??!1),S=!1;if(r.allowSymlink&&!u)try{s=(await o.stat(i)).mode,u=!0}catch(c){if(!z(c))throw c}if(u&&s!==void 0)t(`Preserving file permissions: ${s.toString(8)}`);else if(r.mode!==void 0)s=r.mode,t(`Setting permissions for new file: ${s.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await C(h,w.O_WRONLY|w.O_CREAT|w.O_EXCL|f,u?se(s):r.mode),E=!1,k;try{if(O(h)!==O(i))ayt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),u&&s!==void 0)try{await c.chmod(s),t("Applied original permissions to temp file")}catch(g){if(!oOe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!oOe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}S=!0}catch(g){E=!0,k=g}try{await c.close()}catch(g){if(!E)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(E)throw k;if(t(`Temp file written successfully, size: ${n.length} bytes`),O(h)!==O(i))ayt(r.stagingDir);t(`Renaming ${h} to ${i}`),await cs(h,i,(g,L)=>o.rename(g,L)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let E=T(c);if(S&&E!==void 0&&ET.has(E)||!S&&u&&E==="EACCES"){let{flags:L,flagsIfMissing:N}=re(f),D=!u&&r.mode!==void 0?r.mode:void 0,b;try{try{b=await C(i,L,D)}catch(p){if(N===void 0||!z(p))throw p;await MN(i),b=await C(i,N,D)}}catch(p){try{await o.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}if(T(p)==="ELOOP")throw new jf(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await b.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??Iwn()))throw new FSn(i,p.nlink);if(p.isFile())await b.truncate(0)}catch(p){await b.close().catch(()=>{});try{await o.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}A(p,c)}try{await b.writeFile(n,{encoding:r.encoding});try{await b.sync()}catch(p){if(!oOe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await b.close();try{await o.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await b.close()}catch{}try{await o.unlink(i)}catch{}if(S)throw new P(`Write to ${i} failed (${T(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");A(p,c)}}try{await o.unlink(h)}catch(L){t(`Failed to clean up temp file: ${L}`)}throw c}}
return Sk;})();
return {write:helper0};
}
function linux_x64(ports){
const helper1=(()=>{
function k(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return k;})();
const helper2=(()=>{
function k(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function z(n){return k(n)==="ENOENT"}
return z;})();
const helper3=(()=>{
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return V;})();
const helper4=(()=>{const k=helper1;
function oPe(e){let t=k(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
return oPe;})();
const helper6=(()=>{
class Ger{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var LQ=new Ger;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??LQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
return Z;})();
const helper5=(()=>{const ie=ports.fsPromises["rename"];
const L=ports.fsPromises["lstat"];
const Z=helper6;
var se=50;
function ce(e,t){return!1}
var le=128;
async function Le(e){try{return((await L(e)).mode&le)===0}catch{return!1}}
async function w2(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Le(t))throw o;n=!0,await Z(se);continue}throw o}}
function cs(e,t,n=ie){return w2(()=>n(e,t),t)}
return cs;})();
const helper7=(()=>{
var Tk=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
return Tk;})();
const helper8=(()=>{const L=ports.fsPromises["lstat"];
const k=helper1;
async function we(e,t){if(t!=="win32")return!1;try{return await L(e),!0}catch(n){return k(n)==="ENOENT"?!1:{cause:n}}}
function C(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
async function MD(e,t="linux"){let n=await we(e,t);if(n===!0)throw C(e,n);if(n!==!1)throw n.cause}
return MD;})();
const helper9=(()=>{
var ee=!1;
function te(){return ee}
function Ne(){return!1}
function DQn({served:e}){if(!te())return!1;return e?!1:Ne()}
function Own(){return DQn({served:!1})}
return Own;})();
const helper10=(()=>{
function F3r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
return F3r;})();
const helper11=(()=>{
function l(n){return n instanceof Error?n.message:String(n)}
return l;})();
const helper12=(()=>{
class I extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return I;})();
const helper0=(()=>{const ae=ports.fileOps;
const w=ports.fs["constants"];
const fe=ports.fsPromises["readlink"];
const U=ports.path["isAbsolute"];
const Y=ports.path["resolve"];
const q=ports.fsPromises["realpath"];
const O=ports.path["dirname"];
const t=ports.debug;
const C=ports.fsPromises["open"];
const k=helper1;
const Q=ports.fsPromises["lstat"];
const z=helper2;
const J=ports.crypto["randomBytes"];
const V=helper3;
const F=ports.fs["closeSync"];
const j=ports.context;
const x=ports.fs["openSync"];
const m=ports.featureSad;
const P=ports.fs["fstatSync"];
const R=ports.path["join"];
const W=ports.path["basename"];
const oPe=helper4;
const cs=helper5;
const Tk=helper7;
const MD=helper8;
const Own=helper9;
const F3r=helper10;
const l=helper11;
const I=helper12;
class ne{identities=new Map;record(e,n,r,o){let f=Z(e),i=this.identities.get(f);if(i)try{F(i.fd)}catch{}this.identities.set(f,{dev:n,ino:r,fd:o})}identity(e){return this.identities.get(Z(e))}reset(){for(let{fd:e}of this.identities.values())try{F(e)}catch{}this.identities.clear()}}
var pe=new V(()=>new ne);
function H(){return pe.of(j().host)}
function Z(e){return Y(e)}
function ayt(e){if(!e)return;let n=H().identity(e);if(!n)return;let r;try{r=x(e,w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)}catch(o){let f=k(o);if(f==="ENOENT"||f==="ENOTDIR"||f==="ELOOP"||f==="EACCES")HJe(`Staging dir ${e} was established for a sandboxed command but is now unopenable (${f}) \u2014 refusing atomic write`);throw o}try{let o=P(r);if(o.dev!==n.dev||o.ino!==n.ino)HJe(`Staging dir ${e} identity changed (expected ${n.dev}/${n.ino}, found ${o.dev}/${o.ino}) \u2014 refusing atomic write`)}finally{F(r)}}
function y7n(e,n,r,o){let f=`${n}${r}`;if(!e)return f;let i=H().identity(e);if(o&&O(n)!==O(e))return ayt(e),f;let s=w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW;try{F(x(O(e),s))}catch(y){let h=k(y);if(h==="ELOOP"||h==="ENOTDIR"){if(i)HJe(`Staging dir parent ${O(e)} is ${h} but a sandboxed command established ${e} \u2014 refusing sibling fallback`);if(o)return f;throw new jf(`Refusing to stage atomic write under non-directory parent: ${O(e)}`)}if(!z(y))throw y;if(i)HJe(`Staging dir parent ${O(e)} is absent but a sandboxed command established ${e} \u2014 refusing sibling fallback`);return f}let u;try{u=x(e,s)}catch(y){let h=k(y);if(h==="ENOENT"||h==="ENOTDIR"||h==="ELOOP"){if(i)HJe(`Staging dir ${e} is ${h} but a sandboxed command established it \u2014 refusing sibling fallback`);return f}throw y}try{if(i){let y=P(u);if(y.dev!==i.dev||y.ino!==i.ino)HJe(`Staging dir ${e} identity changed (expected ${i.dev}/${i.ino}, found ${y.dev}/${y.ino}) \u2014 refusing atomic write`)}}finally{F(u)}return R(e,`${W(n)}${r}`)}
class jf extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}}
class NSn extends jf{constructor(e,n){super(F3r(e,n));this.name="HardLinkWriteRefusedError"}}
function re(e){return{flags:w.O_WRONLY|w.O_CREAT|e,flagsIfMissing:void 0}}
class _7n extends Error{constructor(e){super(e);this.name="StagingDirTamperedError"}}
function HJe(e){throw m("sandbox_exec","atomic_write_staging_dir_tampered"),new _7n(e)}
function A(e,n){if(e instanceof Error&&!(e instanceof jf)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e}
function se(e){return e===void 0?void 0:e&511|128}
async function SE(e,n,r={encoding:"utf-8"}){let o=ae(),f=r.allowSymlink?0:w.O_NOFOLLOW,i=e,s,u=!1;if(r.allowSymlink)try{let c=await fe(e);i=U(c)?c:Y(await q(O(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{if(r.checkParentDir)try{await(await C(O(e),w.O_RDONLY|w.O_DIRECTORY|w.O_NOFOLLOW)).close()}catch(c){let E=k(c);if(E==="ELOOP"||E==="ENOTDIR")throw new jf(`Refusing to write into symlinked directory: ${O(e)}`)}try{let c=await Q(e);if(c.isSymbolicLink())throw new jf(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);s=c.mode,u=!0}catch(c){if(!z(c))throw c}}let y=`.tmp.${process.pid}.${J(6).toString("hex")}`,h=y7n(r.stagingDir,i,y,r.allowSymlink??!1),S=!1;if(r.allowSymlink&&!u)try{s=(await o.stat(i)).mode,u=!0}catch(c){if(!z(c))throw c}if(u&&s!==void 0)t(`Preserving file permissions: ${s.toString(8)}`);else if(r.mode!==void 0)s=r.mode,t(`Setting permissions for new file: ${s.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await C(h,w.O_WRONLY|w.O_CREAT|w.O_EXCL|f,u?se(s):r.mode),E=!1,_;try{if(O(h)!==O(i))ayt(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),u&&s!==void 0)try{await c.chmod(s),t("Applied original permissions to temp file")}catch(g){if(!oPe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!oPe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}S=!0}catch(g){E=!0,_=g}try{await c.close()}catch(g){if(!E)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(E)throw _;if(t(`Temp file written successfully, size: ${n.length} bytes`),O(h)!==O(i))ayt(r.stagingDir);t(`Renaming ${h} to ${i}`),await cs(h,i,(g,L)=>o.rename(g,L)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let E=k(c);if(S&&E!==void 0&&Tk.has(E)||!S&&u&&E==="EACCES"){let{flags:L,flagsIfMissing:D}=re(f),T=!u&&r.mode!==void 0?r.mode:void 0,b;try{try{b=await C(i,L,T)}catch(p){if(D===void 0||!z(p))throw p;await MD(i),b=await C(i,D,T)}}catch(p){try{await o.unlink(h)}catch(v){t(`Failed to clean up temp file: ${v}`)}if(k(p)==="ELOOP")throw new jf(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await b.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??Own()))throw new NSn(i,p.nlink);if(p.isFile())await b.truncate(0)}catch(p){await b.close().catch(()=>{});try{await o.unlink(h)}catch(v){t(`Failed to clean up temp file: ${v}`)}A(p,c)}try{await b.writeFile(n,{encoding:r.encoding});try{await b.sync()}catch(p){if(!oPe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await b.close();try{await o.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await b.close()}catch{}try{await o.unlink(i)}catch{}if(S)throw new I(`Write to ${i} failed (${k(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");A(p,c)}}try{await o.unlink(h)}catch(L){t(`Failed to clean up temp file: ${L}`)}throw c}}
return SE;})();
return {write:helper0};
}
function win32_arm64(ports){
const helper1=(()=>{
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function G(n){return E(n)==="ENOENT"}
return G;})();
const helper3=(()=>{
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return E;})();
const helper2=(()=>{const E=helper3;
function oIe(e){let t=E(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
return oIe;})();
const helper5=(()=>{
class etr{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var BQ=new etr;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??BQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
return Z;})();
const helper4=(()=>{const ie=ports.fsPromises["rename"];
const E=helper3;
const L=ports.fsPromises["lstat"];
const Z=helper5;
var LN=new Set(["EPERM","EBUSY","EACCES"]);
var ve=4;
var se=50;
function ce(e,t){let n=E(e);return n!==void 0&&LN.has(n)&&t<ve-1}
var le=128;
async function Ae(e){try{return((await L(e)).mode&le)===0}catch{return!1}}
async function vG(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Ae(t))throw o;n=!0,await Z(se);continue}throw o}}
function qo(e,t,n=ie){return vG(()=>n(e,t),t)}
return qo;})();
const helper6=(()=>{
var CE=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
return CE;})();
const helper7=(()=>{const L=ports.fsPromises["lstat"];
const E=helper3;
async function we(e,t){if(t!=="win32")return!1;try{return await L(e),!0}catch(n){return E(n)==="ENOENT"?!1:{cause:n}}}
function I(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
async function FN(e,t="win32"){let n=await we(e,t);if(n===!0)throw I(e,n);if(n!==!1)throw n.cause}
return FN;})();
const helper8=(()=>{
var ee=!1;
function te(){return ee}
function Ne(){return!1}
function WQn({served:e}){if(!te())return!1;return e?!1:Ne()}
function $wn(){return WQn({served:!1})}
return $wn;})();
const helper9=(()=>{
function z5r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
return z5r;})();
const helper10=(()=>{
function l(n){return n instanceof Error?n.message:String(n)}
return l;})();
const helper11=(()=>{
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return P;})();
const helper0=(()=>{const ae=ports.fileOps;
const ue=ports.fsPromises["readlink"];
const B=ports.path["isAbsolute"];
const H=ports.path["resolve"];
const ee=ports.fsPromises["realpath"];
const O=ports.path["dirname"];
const t=ports.debug;
const U=ports.fsPromises["lstat"];
const G=helper1;
const Q=ports.crypto["randomBytes"];
const T=ports.fsPromises["open"];
const oIe=helper2;
const qo=helper4;
const E=helper3;
const CE=helper6;
const FN=helper7;
const $wn=helper8;
const z5r=helper9;
const l=helper10;
const P=helper11;
function Pht(e){return}
function mJn(e,n,r,s){let u=`${n}${r}`;return u}
class _f extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}}
class $bn extends _f{constructor(e,n){super(z5r(e,n));this.name="HardLinkWriteRefusedError"}}
function ie(e){return{flags:"r+",flagsIfMissing:"wx"}}
function A(e,n){if(e instanceof Error&&!(e instanceof _f)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e}
function ce(e){return}
async function Sk(e,n,r={encoding:"utf-8"}){let s=ae(),u=(r.allowSymlink,0),i=e,o,f=!1;if(r.allowSymlink)try{let c=await ue(e);i=B(c)?c:H(await ee(O(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{r.checkParentDir;try{let c=await U(e);if(c.isSymbolicLink())throw new _f(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);o=c.mode,f=!0}catch(c){if(!G(c))throw c}}let w=`.tmp.${process.pid}.${Q(6).toString("hex")}`,h=mJn(r.stagingDir,i,w,r.allowSymlink??!1),S=!1;if(r.allowSymlink&&!f)try{o=(await s.stat(i)).mode,f=!0}catch(c){if(!G(c))throw c}if(f&&o!==void 0)t(`Preserving file permissions: ${o.toString(8)}`);else if(r.mode!==void 0)o=r.mode,t(`Setting permissions for new file: ${o.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await T(h,"wx",f?ce(o):r.mode),b=!1,k;try{if(O(h)!==O(i))Pht(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),f&&o!==void 0)try{await c.chmod(o),t("Applied original permissions to temp file")}catch(g){if(!oIe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!oIe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}S=!0}catch(g){b=!0,k=g}try{await c.close()}catch(g){if(!b)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(b)throw k;if(t(`Temp file written successfully, size: ${n.length} bytes`),O(h)!==O(i))Pht(r.stagingDir);t(`Renaming ${h} to ${i}`),await qo(h,i,(g,F)=>s.rename(g,F)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let b=E(c);if(S&&b!==void 0&&CE.has(b)||!S&&f&&b==="EACCES"){let{flags:F,flagsIfMissing:N}=ie(u),D=!f&&r.mode!==void 0?r.mode:void 0,y;try{try{y=await T(i,F,D)}catch(p){if(N===void 0||!G(p))throw p;await FN(i),y=await T(i,N,D)}}catch(p){try{await s.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}if(E(p)==="ELOOP")throw new _f(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await y.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??$wn()))throw new $bn(i,p.nlink);if(p.isFile())await y.truncate(0)}catch(p){await y.close().catch(()=>{});try{await s.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}A(p,c)}try{await y.writeFile(n,{encoding:r.encoding});try{await y.sync()}catch(p){if(!oIe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await y.close();try{await s.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await y.close()}catch{}try{await s.unlink(i)}catch{}if(S)throw new P(`Write to ${i} failed (${E(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");A(p,c)}}try{await s.unlink(h)}catch(F){t(`Failed to clean up temp file: ${F}`)}throw c}}
return Sk;})();
return {write:helper0};
}
function win32_x64(ports){
const helper1=(()=>{
function k(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function G(n){return k(n)==="ENOENT"}
return G;})();
const helper3=(()=>{
function k(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
return k;})();
const helper2=(()=>{const k=helper3;
function oIe(e){let t=k(e);return t==="EINVAL"||t==="ENOTSUP"||t==="EPERM"||t==="ENOSYS"}
return oIe;})();
const helper5=(()=>{
class etr{now(){return Date.now()}monotonicNow(){return performance.now()}setTimeout(t,r,e){let o=setTimeout(t,r);if(e?.unref)o.unref();return()=>clearTimeout(o)}}
var UQ=new etr;
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??UQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
return Z;})();
const helper4=(()=>{const ie=ports.fsPromises["rename"];
const k=helper3;
const L=ports.fsPromises["lstat"];
const Z=helper5;
var NL=new Set(["EPERM","EBUSY","EACCES"]);
var ve=4;
var se=50;
function ce(e,t){let n=k(e);return n!==void 0&&NL.has(n)&&t<ve-1}
var le=128;
async function Ae(e){try{return((await L(e)).mode&le)===0}catch{return!1}}
async function vG(e,t){let n=!1;for(let r=0;;r++)try{return await e(),n}catch(o){if(ce(o,r)){if(r===0&&t!==void 0&&await Ae(t))throw o;n=!0,await Z(se);continue}throw o}}
function Vo(e,t,n=ie){return vG(()=>n(e,t),t)}
return Vo;})();
const helper6=(()=>{
var Ck=new Set(["EXDEV","EPERM","EEXIST","EBUSY"]);
return Ck;})();
const helper7=(()=>{const L=ports.fsPromises["lstat"];
const k=helper3;
async function we(e,t){if(t!=="win32")return!1;try{return await L(e),!0}catch(n){return k(n)==="ENOENT"?!1:{cause:n}}}
function I(e,t){return Object.assign(Error("EEXIST: name already taken (exclusive create)",typeof t==="object"?{cause:t.cause}:void 0),{code:"EEXIST",syscall:"lstat",path:e})}
async function HL(e,t="win32"){let n=await we(e,t);if(n===!0)throw I(e,n);if(n!==!1)throw n.cause}
return HL;})();
const helper8=(()=>{
var ee=!1;
function te(){return ee}
function Ne(){return!1}
function WQn({served:e}){if(!te())return!1;return e?!1:Ne()}
function Fwn(){return WQn({served:!1})}
return Fwn;})();
const helper9=(()=>{
function z6r(e,t){return`Could not rewrite ${e} in place: this file has other names on disk (it is hard-linked, ${t} names in all), and writing it in place would change the file under every one of those names. Remove the extra links, then try again.`}
return z6r;})();
const helper10=(()=>{
function l(n){return n instanceof Error?n.message:String(n)}
return l;})();
const helper11=(()=>{
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
return P;})();
const helper0=(()=>{const ae=ports.fileOps;
const ue=ports.fsPromises["readlink"];
const B=ports.path["isAbsolute"];
const H=ports.path["resolve"];
const ee=ports.fsPromises["realpath"];
const O=ports.path["dirname"];
const t=ports.debug;
const U=ports.fsPromises["lstat"];
const G=helper1;
const q=ports.crypto["randomBytes"];
const T=ports.fsPromises["open"];
const oIe=helper2;
const Vo=helper4;
const k=helper3;
const Ck=helper6;
const HL=helper7;
const Fwn=helper8;
const z6r=helper9;
const l=helper10;
const P=helper11;
function Pht(e){return}
function mJn(e,n,r,s){let u=`${n}${r}`;return u}
class _f extends Error{constructor(e){super(e);this.name="SymlinkWriteRefusedError"}}
class Fbn extends _f{constructor(e,n){super(z6r(e,n));this.name="HardLinkWriteRefusedError"}}
function ie(e){return{flags:"r+",flagsIfMissing:"wx"}}
function A(e,n){if(e instanceof Error&&!(e instanceof _f)&&e!==n)try{if(e.cause===void 0)e.message+=` (atomic write failed first: ${l(n)})`,Object.defineProperty(e,"cause",{value:n,writable:!0,configurable:!0,enumerable:!1})}catch{}throw e}
function ce(e){return}
async function SE(e,n,r={encoding:"utf-8"}){let s=ae(),u=(r.allowSymlink,0),i=e,o,f=!1;if(r.allowSymlink)try{let c=await ue(e);i=B(c)?c:H(await ee(O(e)),c),t(`Writing through symlink: ${e} -> ${i}`)}catch{}else{r.checkParentDir;try{let c=await U(e);if(c.isSymbolicLink())throw new _f(`Refusing to write through symlink: ${e}. Resolve the symlink and pass the real target path explicitly.`);o=c.mode,f=!0}catch(c){if(!G(c))throw c}}let w=`.tmp.${process.pid}.${q(6).toString("hex")}`,h=mJn(r.stagingDir,i,w,r.allowSymlink??!1),b=!1;if(r.allowSymlink&&!f)try{o=(await s.stat(i)).mode,f=!0}catch(c){if(!G(c))throw c}if(f&&o!==void 0)t(`Preserving file permissions: ${o.toString(8)}`);else if(r.mode!==void 0)o=r.mode,t(`Setting permissions for new file: ${o.toString(8)}`);try{t(`Writing to temp file: ${h}`);let c=await T(h,"wx",f?ce(o):r.mode),E=!1,R;try{if(O(h)!==O(i))Pht(r.stagingDir);if(await c.writeFile(n,{encoding:r.encoding}),f&&o!==void 0)try{await c.chmod(o),t("Applied original permissions to temp file")}catch(g){if(!oIe(g))throw g;t(`fchmod unsupported on this filesystem: ${g}`)}try{await c.sync()}catch(g){if(!oIe(g))throw g;t(`fsync unsupported on this filesystem: ${g}`)}b=!0}catch(g){E=!0,R=g}try{await c.close()}catch(g){if(!E)throw g;t(`close also failed after temp write error: ${g}`,{level:"error"})}if(E)throw R;if(t(`Temp file written successfully, size: ${n.length} bytes`),O(h)!==O(i))Pht(r.stagingDir);t(`Renaming ${h} to ${i}`),await Vo(h,i,(g,S)=>s.rename(g,S)),t(`File ${i} written atomically`)}catch(c){t(`Failed to write file atomically: ${c}`,{level:"error"});let E=k(c);if(b&&E!==void 0&&Ck.has(E)||!b&&f&&E==="EACCES"){let{flags:S,flagsIfMissing:N}=ie(u),D=!f&&r.mode!==void 0?r.mode:void 0,y;try{try{y=await T(i,S,D)}catch(p){if(N===void 0||!G(p))throw p;await HL(i),y=await T(i,N,D)}}catch(p){try{await s.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}if(k(p)==="ELOOP")throw new _f(`Refusing to write through symlink: ${i} (O_NOFOLLOW)`);throw c}try{let p=await y.stat();if(p.nlink>1&&(r.refuseHardLinkedInPlace??Fwn()))throw new Fbn(i,p.nlink);if(p.isFile())await y.truncate(0)}catch(p){await y.close().catch(()=>{});try{await s.unlink(h)}catch(_){t(`Failed to clean up temp file: ${_}`)}A(p,c)}try{await y.writeFile(n,{encoding:r.encoding});try{await y.sync()}catch(p){if(!oIe(p))throw p;t(`fsync unsupported on this filesystem: ${p}`)}await y.close();try{await s.unlink(h)}catch(p){t(`Failed to clean up temp file: ${p}`)}t(`File ${i} written via in-place fallback`);return}catch(p){try{await y.close()}catch{}try{await s.unlink(i)}catch{}if(b)throw new P(`Write to ${i} failed (${k(p)??p}) after the target was truncated. The new content was preserved at ${h}.`,"writeFileAndFlush: in-place fallback write failed; content preserved at temp path");A(p,c)}}try{await s.unlink(h)}catch(S){t(`Failed to clean up temp file: ${S}`)}throw c}}
return SE;})();
return {write:helper0};
}
const factories={"darwin-arm64":darwin_arm64,"darwin-x64":darwin_x64,"linux-arm64":linux_arm64,"linux-x64":linux_x64,"win32-arm64":win32_arm64,"win32-x64":win32_x64};
export function createConfigPlatformAtomic(platform,arch,ports){if(platform===process.platform&&arch===process.arch)return bindAtomicWriterCaller287({fileOps:ports.fileOps,debug:ports.debug,featureBad:ports.featureSad});if(['darwin','linux','win32'].includes(platform)&&['arm64','x64'].includes(arch))return createPlatformAtomic287(platform,arch,{ae:ports.fileOps,t:ports.debug,m:ports.featureSad,j:getAtomicStagingRegistry287});const key=platform+'-'+arch,factory=factories[key];if(!factory)throw Error('Unsupported config platform '+key);return factory(ports);}
