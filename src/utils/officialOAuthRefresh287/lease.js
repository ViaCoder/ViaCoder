// Complete original npm 2.1.287 declarations; explicit existing-owner ports.
export function createOAuthRefreshLease287(ports){
const {J:Y,f,u,C,o,EC:wC,gr:mr,v:E,rk:eC,Gxe:nse,mht:WIe,zxe:jIe,Xm:Uf,qUe:tje,wE:HS,t,l,SC:EC,pC:SC,pH:SH,Rf:wf,Qi:oa,i,Dt:Ht,d,Tb:A_,Dn:Tn,S:_,vs:Rs,F,U}=ports;
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
async function Ol(e,n){try{let r=await F(e);if(!r.isFile()||r.size>n)return null;return await U(e,"utf8")}catch{return null}};
var kC="tengu_quiet_marten";
var AC=".oauth_refresh.lock.owner";
var CC=4096;
var TC=f(()=>u({pid:C().int(),procStart:o().max(64).optional(),pidDomain:o().max(512),pidSpace:o().max(512),lockBirthtimeMs:C().positive(),legacyLockBirthtimeMs:C().positive().optional()}));
class bp{reader=null;register(e){let n=this.reader;return this.reader=e,n}};
var vp=new bp;
async function Ep({claudeDir:e,lockfilePath:n,legacyLockfilePath:r}){try{let[s,g,h,b]=await Promise.all([mr(n),r===null?null:mr(r),A_(),eC()]);if(!(s.birthtimeMs>0))return null;let v={pid:process.pid,...h!==void 0&&{procStart:h},pidDomain:b,pidSpace:nse(),lockBirthtimeMs:s.birthtimeMs,...g!==null&&g.birthtimeMs>0&&{legacyLockBirthtimeMs:g.birthtimeMs}};return await Tn(Hl(e),_(v)),s.birthtimeMs}catch(s){return t(`OAuth refresh lock owner record not written: ${l(s)}`),null}};
async function wp(e,n){let r=await Bl(e);if(r===null||r.pid!==process.pid||r.lockBirthtimeMs!==n)return;await Cp(e)};
async function Ap(e){let n=await RC(e);if(n==="taken_over"||n==="lock_changed"||n==="disabled")return n;try{return(await mr(e.lockfilePath)).mtimeMs===e.watchedMtimeMs?n:"lock_changed"}catch(r){return E(r)==="ENOENT"?"lock_changed":n}};
async function RC({claudeDir:e,lockfilePath:n,legacyLockfilePath:r,watchedMtimeMs:s}){let g=!1;try{let h=!0;try{h=vp.reader?.(kC,!0)!==!1}catch{h=!0}if(!h)return"disabled";let b=await Bl(e);if(b===null)return(await mr(n)).mtimeMs===s?"no_owner_record":"lock_changed";let v=async()=>{let z=await mr(n);if(z.mtimeMs!==s)return"lock_changed";return z.birthtimeMs===b.lockBirthtimeMs?null:"record_mismatch"},w=await v();if(w!==null)return w;if(b.pidDomain!==await eC()||b.pidSpace!==nse())return"foreign_pid_space";if(!await WIe())return"pid_view_untrusted";let{pid:A,procStart:R}=b;if(!(jIe(A)&&(Uf(A)||await tje(A)||R!==void 0&&await HS(A,R)===!1)))return"holder_not_proven_gone";let D=await mr(r).catch((z)=>{if(E(z)==="ENOENT")return null;throw z});if(D!==null&&D.birthtimeMs!==b.legacyLockBirthtimeMs)return"legacy_lock_held";if(g=!0,D!==null)await yp(r);g=!1;let K=await v();if(K!==null)return K;g=!0,await yp(n);let G=await Bl(e);if(G!==null&&G.pid===b.pid&&G.lockBirthtimeMs===b.lockBirthtimeMs)await Cp(e);return"taken_over"}catch(h){if(t(`OAuth refresh lock takeover skipped: ${l(h)}`),g)return"remove_failed";return E(h)==="ENOENT"?"lock_changed":"probe_failed"}};
function Hl(e){return wC(e,AC)};
async function Bl(e){let n=await Ol(Hl(e),CC);if(n===null)return null;let r;try{r=Y(n)}catch{return null}let s=TC().safeParse(r);return s.success?s.data:null};
async function Cp(e){try{await EC(Hl(e))}catch(n){if(E(n)!=="ENOENT")t(`OAuth refresh lock owner record not removed: ${l(n)}`)}};
async function yp(e){try{await SC(e)}catch(n){if(E(n)!=="ENOENT")throw n}};
function Swn(e,n){return{lockfilePath:wf(e,".oauth_refresh.lock"),realpath:!1,stale:60000,update:5000,onCompromised:(r)=>{t(`OAuth refresh lock compromised: ${r.message}`,{level:"error"}),n?.(r)}}};
async function Qk(e){return`${await SH(e).catch(()=>e)}.lock`};
async function Fqo(e){let n=!1,r=new AbortController,s=()=>{n=!0,r.abort()},g=await oa(e,Swn(e,s)),h=await Qk(e),b=null;try{b=await oa(h,{...Swn(e,s),lockfilePath:h})}catch(A){if(A.code==="ELOCKED")throw i("tengu_oauth_refresh_legacy_lock_contended",{}),await g().catch((R)=>Ht(R)||n?t(`OAuth refresh new-lock release failed: ${R}`):d(R)),A;if(Ht(A))t(`OAuth refresh legacy-lock acquire failed: ${A}`);else d(A)}let v=qQn(),w=await Ep({claudeDir:e,lockfilePath:Swn(e).lockfilePath,legacyLockfilePath:b?h:null});return{isCompromised:()=>n,signal:r.signal,release:async()=>{try{if(w!==null)await wp(e,w);if(b)await b().catch((A)=>Ht(A)||n?t(`OAuth refresh legacy-lock release failed: ${A}`):d(A));await g()}finally{v()}}}};
class Zk{held=0;released=null};
var $qo=new V(()=>new Zk);
function qQn(){let e=Rs($qo);e.held++;let n=!0;return()=>{if(!n)return;if(n=!1,--e.held===0)e.released?.resolve(),e.released=null}};
return {acquire:Fqo,options:Swn,legacyPath:Qk,takeover:Ap,record:Bl,held:$qo,featureReader:vp};
}
