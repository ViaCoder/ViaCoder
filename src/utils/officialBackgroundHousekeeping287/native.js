export function createHousekeepingMarkers287({De,we,t,i,j,h}){
const XBr=(()=>{var r=["ELOOP","ENXIO","EISDIR"];
var XBr=new Set(r);;return XBr})();
const {S,c}=(()=>{function r(n){return n}
function S(n){return r(n)}
function c(n){return r(n)};return {S,c}})();
const it=(()=>{function i(e){return e instanceof Error?e.message:String(e)}
function it(e){return e.code+("failureClass"in e?` ${e.failureClass}`:"")+("telemetryCode"in e&&e.telemetryCode?` ${e.telemetryCode}`:"")+("cause"in e&&e.cause?`: ${i(e.cause)}`:"")};return it})();
function aR(e,t){let n=`${t}.tmp.`;return e.startsWith(n)&&/^[0-9a-f]{8}$/.test(e.slice(n.length))}
var $t=86400000;
var Re=XBr;
function Ut(e){if(e===void 0)return S("none");if(!Re.has(e))return S("other");return e==="ELOOP"?S("ELOOP"):e==="EISDIR"?S("EISDIR"):S("ENXIO")}
function Wt(e){return e.code==="Failed"&&e.telemetryCode!==void 0&&Re.has(e.telemetryCode)}
function Gt(e){if(e.ok)return"removed it";return("telemetryCode"in e.error?e.error.telemetryCode:void 0)==="EISDIR"?"could not remove it (EISDIR): a directory at the marker path stays and the marker write will keep failing":`could not remove it (${e.error.code})`}
async function uSr(e){let r=await e.statMeta(De.state("last-cleanup"));if(r.ok||r.error.code==="NotFound"||!Wt(r.error))return;i("tengu_cleanup_throttle_marker",{marker:S("last-cleanup"),verdict:S("not_regular_rerun"),code:c(r.error.code),errno:Ut("telemetryCode"in r.error?r.error.telemetryCode:void 0)});let n=await e.delete(De.state("last-cleanup"));t(`.last-cleanup: sentinel is not a regular file (${it(r.error)}) \u2014 ${Gt(n)}; rewriting`,{level:"warn"})}
var Yt=[".npm-cache-cleanup",".version-cleanup",".last-cleanup",".deep-link-register-failed"];
async function pSr(e,r){if(!r.claimStagingReap())return;let n;try{n=await j.readdir(e)}catch{return}let s=Date.now()-$t;await Promise.all(n.filter((a)=>Yt.some((p)=>aR(a,p))).map(async(a)=>{let p=h(e,a);try{let w=await j.lstat(p);if(w.isFile()&&w.mtimeMs<s)await j.unlink(p)}catch{}}))}
return {pSr,uSr};
}
// Full original 287 scheduler, sentinel, transcript touch and errno predicates.
// No host constructor or second housekeeping state.
export function createBackgroundHousekeeping287({F,De,we,Y,N,z,t,d,Zmr,Muo,D,Wu,Hg,wso,NBn,fSr,pSr,uSr,js,My,wfn,setTimeout,setInterval}){
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function as(n){return n!==null&&typeof n==="object"&&"errno"in n&&typeof n.errno==="number"}
var u=new Set(["ENOENT","EACCES","EPERM","ENOTDIR","ELOOP","ENAMETOOLONG","EROFS"]);
function Ht(n){return PT(E(n))}
function PT(n){return n!==void 0&&u.has(n)}
function ch(n){return Hir(E(n))}
function Hir(n){return n==="EDEADLK"||n==="EINTR"||n==="ENXIO"||n==="ENODEV"||n==="ECANCELED"||n==="ENEEDAUTH"||n==="ESTALE"||n==="EUNKNOWN"||n==="ENOMEM"||n!==void 0&&c(n)}
function c(n){return n==="UNKNOWN"||n.startsWith("Unknown system error")}
function Pge(e){return Ht(e)||ch(e)}
function OGn(e){let n=js().sessionFile;if(n===null)return;Kfn(n,e)}
function Kfn(e,n){if(F()&&n!==void 0){let s=My(e);if(s!==void 0){try{n.touch(s).catch(()=>{})}catch{}return}}let r=new Date;wfn(e,r,r).catch(()=>{})}
var T=86400000;
var Olr=600000;
var RJo=5000;
var xJo=3600000;
async function PJo(o){if(F()&&o!==void 0){let n=await o.statMeta(De.state("last-cleanup"));return n.ok&&Date.now()-n.value.mtimeMs<T}try{let n=await Y(N(we(),".last-cleanup"));return Date.now()-n.mtimeMs<T}catch{return!1}}
async function Hlr(o,n){if(!o.backgroundHousekeeping.claim())return;if(Zmr(o),Muo(o),D(n),Wu())wso(n),OGn(n),setInterval(OGn,xJo,n).unref();let u="sentinel-unchecked";async function a(){if(Wu()&&Hg()>Date.now()-60000){setTimeout(s,Olr).unref();return}if(u!=="done"){if(u==="sentinel-unchecked"){if(u="sweep-due",await PJo(n)){setTimeout(s,Olr).unref();return}}if(u="done",await fSr(n),F()&&n!==void 0){await pSr(we(),o.backgroundHousekeeping),await uSr(n);let r=await n.write(De.state("last-cleanup"),new Date().toISOString(),{publishDiscipline:"inPlace"});if(!r.ok)t(`.last-cleanup write failed: ${r.error.code}`,{level:"error"})}else await z(N(we(),".last-cleanup"),new Date().toISOString()).catch((r)=>as(r)?t(`.last-cleanup write failed: ${r.code} ${r.message}`,{level:"error"}):d(r))}if(Wu()&&Hg()>Date.now()-60000){setTimeout(s,Olr).unref();return}await NBn()}function s(){return a().catch((r)=>Pge(r)?t(`background housekeeping failed: ${r.message}`,{level:"error"}):d(r))}setTimeout(s,RJo).unref()}
return {start:Hlr,isRecentCleanup:PJo,touchSession:OGn,isQuietFsError:Pge,hasNumericErrno:as};
}
