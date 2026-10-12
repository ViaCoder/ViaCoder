// Generated complete original per-session cache, tracking and AutoMem path fence. Outer loader is a named existing-owner port, not claimed restored here.
export function createMemorySession287(ports){
function module0(imports){
const tt=imports["tt"];
function Ln(t){return/^[\\/]{2}/.test(t)||CD(t)};
function jS(t){if(!/\/\.(?:vol|file|nofollow|resolve)(?:\/|$)/i.test(t))return!1;if(!t.startsWith("/"))return!1;let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&/^\.(?:vol|file|nofollow|resolve)$/i.test(n))return!0}return!1};
function C(t){return t.length===2&&_R(t[0])==="net"||t.length===3&&_R(t[0])==="network"&&_R(t[1])==="servers"};
function _R(t){return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").toUpperCase().toLowerCase()};
function ca(t){return da(t)};
function kl(t){return Ln(t)||ca(t)||SR(t)||jS(t)};
function da(t){return UEe(t)!==null};
var Bt=1024;
var Gt=4096;
var I=new Map;
var k=new Map;
function UEe(t){if(!t.startsWith("/"))return null;if(t.length>Gt)return Lt(t);let e=I.get(t);if(e===void 0){if(e=Lt(t),I.size>=Bt)I.clear();I.set(t,e)}return e};
function Lt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),C(e))return"/"+e.join("/")}return null};
function w$(t){if(!t.startsWith("/"))return!1;if(t.length>Gt)return Mt(t);let e=k.get(t);if(e===void 0){if(e=Mt(t),k.size>=Bt)k.clear();k.set(t,e)}return e};
function Mt(t){let e=[];for(let n of t.split("/")){if(n===""||n===".")continue;if(n===".."){e.pop();continue}if(e.push(n),e.length===1&&e[0].toLowerCase()==="network")return!0}return!1};
function SR(t){return w$(t)};
function CD(t){return Ft.test(t)||t.includes("??")&&Ft.test(Xt(t))};
var Ft=/^[\\/]\?\?[\\/]/;
function Xt(t){return tt.win32?tt.win32.normalize(t):t};
return {Ln,jS,C,_R,ca,kl,da,Bt,Gt,I,k,UEe,Lt,w$,Mt,SR,CD,Ft,Xt};
}
function module1(imports){
const f=imports["f"];
var L4r=new Set([".git","hooks",".husky",".githooks","node_modules",".vscode",".idea","head","config","objects","refs",".claude","skills","commands","agents",".cargo",".devcontainer",".yarn",".mvn"]);
var G6t=/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/;
var N4r=new RegExp(G6t,"g");
function Pc(e){return c(e,!0)};
function c(e,o){let n=e.toLowerCase().replace(/\u0131/g,"i").replace(/\u017f/g,"s"),t=n.replace(N4r,"");return(o?t.replace(/:.*$/,""):t).replace(/[. ]+$/,"")||n};
function F4r(e){return!1};
function aK(e,o,n){let t=e.slice(o.length).split(f),i=t.length-1;for(let r=0;r<t.length;r++){let s=Pc(t[r]);if(L4r.has(s)||F4r(s))return!0;if(r===i&&n?.has(s))return!0}return!1};
return {L4r,G6t,N4r,Pc,c,F4r,aK};
}
function module2(imports){
const k=imports["k"];
const GZn=imports["GZn"];
const N_t=imports["N_t"];
const Gr=imports["Gr"];
const o0=imports["o0"];
const kl=imports["kl"];
const Na=imports["Na"];
const aK=imports["aK"];
function E8(){if(k("tengu_moth_copse",!1))return!0;return GZn()};
function fE(e){return!o0(e)||e.length<3||/^[A-Za-z]:$/.test(e)||kl(e)||e.includes("\x00")};
function nK(e,n=N_t()){if(n===null||!n.endsWith(Gr)||fE(n.replace(/[/\\]+$/,"")))return!1;let r=Na(e);if(!r.startsWith(n))return!1;return!aK(r,n)};
return {E8,fE,nK};
}
function module3(imports){
const Tt=imports["Tt"];
const M0n=imports["M0n"];
const o0n=imports["o0n"];
const eat=imports["eat"];
const tat=imports["tat"];
const r0n=imports["r0n"];
const Jit=imports["Jit"];
const U=imports["U"];
const E8=imports["E8"];
const k=imports["k"];
const N_t=imports["N_t"];
const dgt=imports["dgt"];
const No=imports["No"];
const Xs=imports["Xs"];
const bEe=imports["bEe"];
const nK=imports["nK"];
const Ihn=imports["Ihn"];
const Goe=imports["Goe"];
var gJ=2000;
var s0n=/\]\(([^()\n]+?\.md)\)/gi;
var Zit={resolved:!1,read:!1,written:!1,injection:"none"};
class nat{memoryContext=null;surfacedKeys=new Set;accessedKeys=new Map;recordContextBuild(e){let{memoryDir:n}=e;this.memoryContext={memoryDir:n===null?null:{path:n,key:AR(n)},bodyKeys:new Set(e.injectedBodyPaths.slice(0,gJ).map(AR)),listedKeys:new Set(n===null?[]:e.indexContents.flatMap((r)=>i0n(r,n)).slice(0,gJ).map(AR))}}recordSurfaced(e){for(let n of e){if(this.surfacedKeys.size>=gJ)return;this.surfacedKeys.add(AR(n))}}recordAccess(e,n){let r=AR(e),s=this.accessedKeys.get(r);if(s===void 0&&this.accessedKeys.size>=gJ)return;let g=n==="read"?"read":"written";this.accessedKeys.set(r,s===void 0||s===g?g:"read_written")}priorAccess(e){return this.accessedKeys.get(AR(e))??"none"}injection(e){let n=this.injectionForKey(AR(e));return this.memoryContext===null&&n==="none"?"unknown":n}citedStatus(e){let n=this.memoryContext,r=n?.memoryDir??null,s=e.trim();if(n===null||r===null||s===""||s.split(/[\\/]/).includes(".."))return Zit;let g=/\.md$/i.test(s)?s:`${s}.md`,h=AR(eat(g)?g:tat(r.path,g)),b=r.key+r0n;if(!h.startsWith(b))return Zit;let w=this.statusForKey(h);if(w.resolved||/[\\/]/.test(s))return w;let D=Jit(h),j=new Set([...n.bodyKeys,...n.listedKeys,...this.surfacedKeys,...this.accessedKeys.keys()].filter((z)=>z.startsWith(b)&&Jit(z)===D));return j.size===1?this.statusForKey([...j][0]):w}reset(){this.memoryContext=null,this.surfacedKeys.clear(),this.accessedKeys.clear()}injectionForKey(e){return this.memoryContext?.bodyKeys.has(e)?"body":this.surfacedKeys.has(e)?"surfaced":this.memoryContext?.listedKeys.has(e)?"listed":"none"}statusForKey(e){let n=this.accessedKeys.get(e)??"none",r=this.injectionForKey(e);return{resolved:n!=="none"||r!=="none",read:n==="read"||n==="read_written",written:n==="written"||n==="read_written",injection:r}}};
var Xle=new Tt(()=>new nat);
function i0n(e,n){return[...e.matchAll(s0n)].map((r)=>r[1].trim()).filter((r)=>!eat(r)&&!/^[a-z][a-z0-9+.-]*:/i.test(r)&&!r.split(/[\\/]/).includes("..")).map((r)=>tat(n,r))};
function AR(e){return o0n(e).normalize("NFC").toLowerCase()};
var u0n=new Tt(()=>({files:new Map,nextEagerLoadReason:"session_start",shouldFireHook:!0,walkEpoch:0,hasLoggedInitialLoad:!1}));
var TJ=new Tt(()=>({}));
function EJ(e){return u0n.of(e)};
function _0n(e){let{content:n}=Ihn(e);return{path:Goe(),type:"AutoMem",content:n,contentDiffersFromDisk:!0,rawContent:e}};
function k0n(){return process.env.CLAUDE_COWORK_MEMORY_INDEX_CONTENT};
function oat(e){if(!dgt())return!0;let n=No(Xs()).map((r)=>r.endsWith(bEe)?r:r+bEe);return No(e).every((r)=>n.some((s)=>nK(r,s)))};
function vw(e,n=!1,r,s){let g=EJ(e),h=g.files.get(n);if(!h)h=M0n(e.root,g,Xle.of(e),n,r,s),g.files.set(n,h);return h};
function I0n(e){if(!e.shouldFireHook)return;e.shouldFireHook=!1;let n=e.nextEagerLoadReason;return e.nextEagerLoadReason="session_start",n};
function TA(e){EJ(e).files.clear()};
function Whe(){TA(U())};
function eHt(e,n="session_start"){let r=EJ(e);r.nextEagerLoadReason=n,r.shouldFireHook=!0,r.walkEpoch++,TA(e)};
function wat(e="session_start"){eHt(U(),e)};
function PTo(e){EJ(e).hasLoggedInitialLoad=!1};
function bxr(e){if(e.type==="AutoMem"&&E8())return!1;if((e.type==="Project"||e.type==="Local")&&k("tengu_paper_halyard",!1))return!1;if(!e.content)return!1;return!0};
function aat(e,n){let r=n.filter((s)=>s.type==="AutoMem"&&bxr(s));e.recordContextBuild({memoryDir:N_t(),injectedBodyPaths:r.map((s)=>s.path),indexContents:r.map((s)=>s.content)})};
return {gJ,s0n,Zit,nat,Xle,i0n,AR,u0n,TJ,EJ,_0n,k0n,oat,vw,I0n,TA,Whe,eHt,wat,PTo,bxr,aat};
}
const m0=module0({"tt":ports.path});
const m1=module1({"f":ports.path["sep"]});
const m2=module2({"k":ports["feature"],"GZn":ports["hasMemoryStores"],"N_t":ports["memoryDirectory"],"Gr":ports.path["sep"],"o0":ports.path["isAbsolute"],"kl":m0["kl"],"Na":ports.path["normalize"],"aK":m1["aK"]});
const m3=module3({"Tt":ports["sessionRegistry"],"M0n":ports["load"],"o0n":ports.path["resolve"],"eat":ports.path["isAbsolute"],"tat":ports.path["join"],"r0n":ports.path["sep"],"Jit":ports.path["basename"],"U":ports["session"],"E8":m2["E8"],"k":ports["feature"],"N_t":ports["memoryDirectory"],"dgt":ports["readFenceEnabled"],"No":ports["readPathCandidates"],"Xs":ports["requiredMemoryDirectory"],"bEe":ports.path["sep"],"nK":m2["nK"],"Ihn":ports["truncateIndex"],"Goe":ports["indexPath"]});
return {"get":m3.vw,"cache":m3.EJ,"clear":m3.TA,"clearCurrent":m3.Whe,"reset":m3.eHt,"resetCurrent":m3.wat,"resetMetrics":m3.PTo,"consumeHook":m3.I0n,"trackingRegistry":m3.Xle,"additionalRegistry":m3.TJ,"track":m3.aat,"readAllowed":m3.oat,"indexOverride":m3._0n,"indexEnv":m3.k0n};
}
