// Official npm 2.1.286 complete declarations, no body rewriting.
export function createOAuthRefreshLease({C,Dn,Dt,EC,F,Gxe,J,Qi,Rf,S,SC,Tb,U,Xm,d,f,gr,i,l,mht,o,pC,pH,process,qUe,rk,t,u,v,vs,wE,zxe}){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
async function bl(e,n){try{let r=await F(e);if(!r.isFile()||r.size>n)return null;return await U(e,"utf8")}catch{return null}}
var wC="tengu_quiet_marten";
var kC=".oauth_refresh.lock.owner";
var CC=4096;
var TC=f(()=>u({pid:C().int(),procStart:o().max(64).optional(),pidDomain:o().max(512),pidSpace:o().max(512),lockBirthtimeMs:C().positive(),legacyLockBirthtimeMs:C().positive().optional()}));
class Fp{reader=null;register(e){let n=this.reader;return this.reader=e,n}}
var Lp=new Fp;
async function Bp({claudeDir:e,lockfilePath:n,legacyLockfilePath:r}){try{let[s,g,h,b]=await Promise.all([gr(n),r===null?null:gr(r),Tb(),rk()]);if(!(s.birthtimeMs>0))return null;let E={pid:process.pid,...h!==void 0&&{procStart:h},pidDomain:b,pidSpace:Gxe(),lockBirthtimeMs:s.birthtimeMs,...g!==null&&g.birthtimeMs>0&&{legacyLockBirthtimeMs:g.birthtimeMs}};return await Dn(ql(e),S(E)),s.birthtimeMs}catch(s){return t(`OAuth refresh lock owner record not written: ${l(s)}`),null}}
async function Hp(e,n){let r=await Yl(e);if(r===null||r.pid!==process.pid||r.lockBirthtimeMs!==n)return;await $p(e)}
async function Kp(e){let n=await RC(e);if(n==="taken_over"||n==="lock_changed"||n==="disabled")return n;try{return(await gr(e.lockfilePath)).mtimeMs===e.watchedMtimeMs?n:"lock_changed"}catch(r){return v(r)==="ENOENT"?"lock_changed":n}}
async function RC({claudeDir:e,lockfilePath:n,legacyLockfilePath:r,watchedMtimeMs:s}){let g=!1;try{let h=!0;try{h=Lp.reader?.(wC,!0)!==!1}catch{h=!0}if(!h)return"disabled";let b=await Yl(e);if(b===null)return(await gr(n)).mtimeMs===s?"no_owner_record":"lock_changed";let E=async()=>{let z=await gr(n);if(z.mtimeMs!==s)return"lock_changed";return z.birthtimeMs===b.lockBirthtimeMs?null:"record_mismatch"},w=await E();if(w!==null)return w;if(b.pidDomain!==await rk()||b.pidSpace!==Gxe())return"foreign_pid_space";if(!await mht())return"pid_view_untrusted";let{pid:k,procStart:A}=b;if(!(zxe(k)&&(Xm(k)||await qUe(k)||A!==void 0&&await wE(k,A)===!1)))return"holder_not_proven_gone";let D=await gr(r).catch((z)=>{if(v(z)==="ENOENT")return null;throw z});if(D!==null&&D.birthtimeMs!==b.legacyLockBirthtimeMs)return"legacy_lock_held";if(g=!0,D!==null)await Np(r);g=!1;let B=await E();if(B!==null)return B;g=!0,await Np(n);let K=await Yl(e);if(K!==null&&K.pid===b.pid&&K.lockBirthtimeMs===b.lockBirthtimeMs)await $p(e);return"taken_over"}catch(h){if(t(`OAuth refresh lock takeover skipped: ${l(h)}`),g)return"remove_failed";return v(h)==="ENOENT"?"lock_changed":"probe_failed"}}
function ql(e){return EC(e,kC)}
async function Yl(e){let n=await bl(ql(e),CC);if(n===null)return null;let r;try{r=J(n)}catch{return null}let s=TC().safeParse(r);return s.success?s.data:null}
async function $p(e){try{await SC(ql(e))}catch(n){if(v(n)!=="ENOENT")t(`OAuth refresh lock owner record not removed: ${l(n)}`)}}
async function Np(e){try{await pC(e)}catch(n){if(v(n)!=="ENOENT")throw n}}
function Jhn(e,n){return{lockfilePath:Rf(e,".oauth_refresh.lock"),realpath:!1,stale:60000,update:5000,onCompromised:(r)=>{t(`OAuth refresh lock compromised: ${r.message}`,{level:"error"}),n?.(r)}}}
async function Yk(e){return`${await pH(e).catch(()=>e)}.lock`}
async function f2o(e){let n=!1,r=new AbortController,s=()=>{n=!0,r.abort()},g=await Qi(e,Jhn(e,s)),h=await Yk(e),b=null;try{b=await Qi(h,{...Jhn(e,s),lockfilePath:h})}catch(k){if(k.code==="ELOCKED")throw i("tengu_oauth_refresh_legacy_lock_contended",{}),await g().catch((A)=>Dt(A)||n?t(`OAuth refresh new-lock release failed: ${A}`):d(A)),k;if(Dt(k))t(`OAuth refresh legacy-lock acquire failed: ${k}`);else d(k)}let E=M8n(),w=await Bp({claudeDir:e,lockfilePath:Jhn(e).lockfilePath,legacyLockfilePath:b?h:null});return{isCompromised:()=>n,signal:r.signal,release:async()=>{try{if(w!==null)await Hp(e,w);if(b)await b().catch((k)=>Dt(k)||n?t(`OAuth refresh legacy-lock release failed: ${k}`):d(k));await g()}finally{E()}}}}
class qk{held=0;released=null}
var m2o=new q(()=>new qk);
function M8n(){let e=vs(m2o);e.held++;let n=!0;return()=>{if(!n)return;if(n=!1,--e.held===0)e.released?.resolve(),e.released=null}}
return {acquire:f2o,options:Jhn,legacyPath:Yk,takeover:Kp,record:Yl,held:m2o,featureReader:Lp};
}
export function createOAuthLeaseErrorFilter(){
function v(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
var u=new Set(["ENOENT","EACCES","EPERM","ENOTDIR","ELOOP","ENAMETOOLONG","EROFS"]);
function Dt(n){return GA(v(n))}
function GA(n){return n!==void 0&&u.has(n)}
return Dt;
}
export function createOAuthSchemaLazy(){
class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}}
var nQn=new i;
function f(e){return nQn.lazy(e)}
return {lazy:f,manager:nQn};
}
export function createOAuthProcessProbes({H2e,O,O6t,Ze,ae,j,process,v,yIe}){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
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
return {ownStart:Tb,start:Fl,validPid:zxe,gone:Xm,zombie:qUe,trustedPidView:mht,sameStart:wE};
}
export function createProcessStatusParser(){
function O6t(n){let t=n.lastIndexOf(")");if(t<0)return;let e=n.slice(t+2),r=e.indexOf(" "),i=r<0?e:e.slice(0,r);return i.length===0?void 0:i}
function H2e(n){return n==="Z"||n==="X"}
return {state:O6t,isZombie:H2e};
}
export function createOAuthPidIdentity({O,i,o,r,s}){
function it(t,e){return t}
class e{pidSpace=null;pidDomain=void 0;uidsCollapse=null}
var Wxe=it(new e,(n)=>{n.pidDomain=void 0});
function Gxe(){if(Wxe.pidSpace===null){let n="";Wxe.pidSpace=`${o()}${n===""?"":"#"+n}`}return Wxe.pidSpace}
function rk(){return Wxe.pidDomain??=(async()=>C6o(O()))().catch((n)=>{throw Wxe.pidDomain=void 0,n}),Wxe.pidDomain}
async function C6o(n){if(n==="windows")return`darwin:${i().toLowerCase()}`;if(n!=="linux"&&n!=="wsl")return"darwin";let[e,t]=await Promise.all([r("/etc/machine-id","utf8").then((o)=>o.trim(),()=>""),s("/proc/self/ns/pid").catch(()=>"")]);return`darwin:${e}:${t}`}
return {domain:rk,space:Gxe};
}
export function createOAuthExecutableLookup({Et,K}){
function g(t,o){return o}
function yIe(t,o){let _=F6t(o);return _===""?null:H5r(t,_)}
function F6t(t){return t.split(K).map((o)=>uEn(o)).filter((o)=>st(o)).join(K)}
function uEn(t,o="darwin"){return o==="win32"?t.replaceAll('"',""):t}
function st(t){if(!Et(t))return!1;return!0}
function H5r(t,o){return g(t,Bun.which(t,{PATH:o}))}
return yIe;
}
export function createOAuthReleaseHandler({i,t}){return async function(z){try{i("tengu_oauth_token_refresh_lock_releasing",{})}catch(Q){t(`OAuth refresh lock-releasing event failed: ${Q}`,{level:"error"})}try{await z.release(),i("tengu_oauth_token_refresh_lock_released",{})}catch(Q){t(`OAuth refresh lock release failed: ${Q}`,{level:"error"});try{i("tengu_oauth_token_refresh_lock_release_error",{})}catch{}}};}
