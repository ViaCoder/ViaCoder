// Complete official 2.1.287 declarations; only import ports are adapted.
export function createDreamLock287(ports) {
const {Ee,F,l,Xs,t,qh,ga,P,f,p,v,D,k,A,g:readDir,h:statCandidate,ie,u:dirname,Et,Bd,iR}=ports;
const Xn=(()=>{var l=String.fromCharCode(0);
var p=/^\.[0-9a-f]{16}\.aside$/;
function pqt(e){if(e.charCodeAt(0)!==46)return!1;return FK(e).some((n)=>p.test(n))};
function u(e){return typeof e==="string"&&/^[. ]+$/.test(e)};
function i(e){let n=e.length;while(n>0){let a=e.charCodeAt(n-1);if(a!==46&&a!==32)break;n-=1}return n===e.length?e:e.slice(0,n)};
function m(e){let n=e.toLowerCase(),a=n.indexOf(":");return a===-1?[i(n)]:[i(n),i(n.slice(0,a))]};
var s=new Map;
var d=32768;
function FK(e){let n=s.get(e);if(n!==void 0)return n;let a=Object.freeze(m(e));if(s.size>=d)s.clear();return s.set(e,a),a};
function Xn(e){return!(typeof e!=="string"||e.length===0||u(e)||e.includes("/")||e.includes("\\")||e.includes(l)||pqt(e))};
return Xn;})();
const De={memory:(e,n)=>({namespace:"memory",projectKey:e,relPath:n})};
const Y1=(()=>{const u=dirname,p=ie;function Y1(t){return u(t)===Bd()?p(t):void 0};
return Y1;})();
const Dp=Bd;
function aa(e){let n=Dp()+Et;if(!e.startsWith(n))return;let r=e.slice(n.length);while(r.endsWith(Et))r=r.slice(0,-Et.length);return r.split(Et)};
function SG(e){let n=aa(e);if(n?.length!==2||n[1]!=="memory")return;let r=n[0];return Xn(r)?r:void 0};
const vpo=(()=>{const g=readDir,h=statCandidate,p=A;async function ui(e,r,t){let s=Math.max(1,Math.floor(t?.maxPages??1e4)),u;for(let a=0;a<s;a++){if(t?.budget!==void 0){if(t.budget.pagesLeft<1)return{status:"capped"};t.budget.pagesLeft--}let n=await e(u);if(!n.ok)return{status:"error",error:n.error};if(await r(n.value.items),t?.until?.())return{status:"done"};if(u=n.value.cursor,!u)return{status:"done"}}return{status:"capped"}};
function P(s){let n=Y1(s);return n!==void 0&&Xn(n)?n:void 0};
async function vpo(s,n,o,a,u,d){let f=F()&&a!==void 0?P(s):void 0;if(a!==void 0&&f!==void 0){let t=new Map;try{await ui((i)=>a.listEntries({namespace:"transcript",projectKey:f},{skipScopeStats:!0,...n?{}:{skipKeyStats:!0},...i!==void 0&&{cursor:i}}),(i)=>{for(let e of i){if(e.kind!=="key"||e.key.namespace!=="transcript")continue;let r=iR(e.key.sessionId);if(!r)continue;if(n&&e.mtimeMs===void 0)continue;let c=n?Math.trunc(e.mtimeMs??0):0,l=t.get(r);if(l!==void 0){if(c>l.mtime)l.mtime=c;continue}t.set(r,{sessionId:r,filePath:p(s,`${e.key.sessionId}.jsonl`),mtime:c,projectPath:o,ownWorktrees:d})}},u!==void 0?{budget:u}:void 0)}catch{}return[...t.values()]}let m;try{m=await g(s)}catch{return[]}return(await Promise.all(m.map(async(t)=>{if(!t.endsWith(".jsonl"))return null;let i=iR(t.slice(0,-6));if(!i)return null;let e=p(s,t);if(!n)return{sessionId:i,filePath:e,mtime:0,projectPath:o,ownWorktrees:d};try{let r=await h(e);return{sessionId:i,filePath:e,mtime:r.mtime.getTime(),projectPath:o,ownWorktrees:d}}catch{return null}}))).filter((t)=>t!==null)};
return vpo;})();
var g=".consolidate-lock";
var y=3600000;
function s(e){return A(e,g)};
function c(e){let n=SG(e);return n===void 0?void 0:De.memory(n,[g])};
function b(e,n){let[a="",r=""]=e.split(`
`),o=parseInt(a.trim(),10),i=r.trim()===""?NaN:Number(r.trim());return{holderPid:Number.isFinite(o)?o:void 0,lastConsolidatedAt:Number.isFinite(i)?i:n}};
function h(e,n){return`${e??""}
${n}`};
async function Wze(e=Xs(),n){let a=F()&&n!==void 0?c(e):void 0;if(n&&a){let r=await n.readText([a]);if(!r.ok||!r.value.items[0].found)return 0;let{value:o,mtimeMs:i}=r.value.items[0];return b(o,i).lastConsolidatedAt}try{return(await p(s(e))).mtimeMs}catch{return 0}};
async function cpo(e){return L(Xs(),e)};
async function L(e,n){let a=F()&&n!==void 0?c(e):void 0;if(n&&a)return S(n,a);let r=s(e),o,i;try{let[u,w]=await Promise.all([p(r),f(r,"utf8")]);o=u.mtimeMs;let m=parseInt(w.trim(),10);i=Number.isFinite(m)?m:void 0}catch{}if(o!==void 0&&Date.now()-o<y){if(i!==void 0&&ga(i))return t(`[autoDream] lock held by live PID ${i} (mtime ${Math.round((Date.now()-o)/1000)}s ago)`),null}await P(e,{recursive:!0}),await k(r,String(process.pid));let d;try{d=await f(r,"utf8")}catch{return null}if(parseInt(d.trim(),10)!==process.pid)return null;return o??0};
async function Rrt(e,n){return C(Xs(),e,n)};
async function C(e,n,a){let r=F()&&a!==void 0?c(e):void 0;if(a&&r)return x(a,r,n);let o=s(e);try{if(n===0){await v(o);return}await k(o,"");let i=n/1000;await D(o,i,i)}catch(i){t(`[autoDream] rollback failed: ${l(i)} \u2014 next trigger delayed to minHours`)}};
async function S(e,n){let a=await e.readText([n]),r=a.ok?a.value.items[0]:void 0,o=r?.found?r.version:void 0,i=r?.found?b(r.value,r.mtimeMs):void 0;if(i!==void 0&&Date.now()-i.lastConsolidatedAt<y){if(i.holderPid!==void 0&&ga(i.holderPid))return t(`[autoDream] lock held by live PID ${i.holderPid} (acquired ${Math.round((Date.now()-i.lastConsolidatedAt)/1000)}s ago)`),null}let d=await e.updateText(n,(u)=>(u?.version??void 0)===o?{write:h(process.pid,Date.now()),result:!0}:{skip:!0,result:!1},r?.found?{publishDiscipline:"inPlace"}:void 0);if(!d.ok||d.value.result!==!0)return null;return i?.lastConsolidatedAt??0};
async function x(e,n,a){let r=a===0?await e.delete(n):await e.updateText(n,()=>({write:h(void 0,a)}),{publishDiscipline:"inPlace"});if(!r.ok)t(`[autoDream] rollback failed: ${r.error.code} \u2014 next trigger delayed to minHours`)};
async function dpo(e,n){let a=qh(Ee());return(await vpo(a,!0,void 0,n)).filter((o)=>o.mtime>e).map((o)=>o.sessionId)};
return {read:Wze,acquire:cpo,rollback:Rrt,listSessions:dpo,acquireAt:L,rollbackAt:C,lockPath:s,memoryProjectKey:SG,validProjectKey:Xn};
}
