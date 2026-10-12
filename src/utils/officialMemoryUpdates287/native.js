// Complete pinned official 2.1.287 declarations; only imports bind to existing owners.
export function createMemoryUpdates287(ports){
const {ae,bo,open,m,t,Xe,_,errorString,f,u,o,T,H,B,x,Fe,qd,Goe,Re,ya}=ports;
const l=open;
const errorMessage=errorString;
const Vt=(()=>{function Vt(t,n,e=0){let r=0,i=t.indexOf(n,e);while(i!==-1)r++,i=t.indexOf(n,i+1);return r};return Vt;})();
function ROe(){return m.constants.O_RDONLY|m.constants.O_NONBLOCK|m.constants.O_NOCTTY};
async function vEe(e,n,r){let s=r!==void 0?r==="file":(await e.stat()).isFile(),i=[],o=0;while(o<n){let a=Buffer.allocUnsafe(Math.min(65536,n-o)),{bytesRead:u}=await e.read(a,0,a.length,s?o:null);if(u===0)break;i.push(a.subarray(0,u)),o+=u}return Buffer.concat(i,o)};
function D0e(n,e,i){if(n.isDirectory())throw Object.assign(Error("EISDIR: illegal operation on a directory, read"),{code:"EISDIR",errno:-21,syscall:"read",path:e});if(!n.isFile())throw Object.assign(Error("Not a regular file (device, FIFO, or socket)"),{code:"ERR_NOT_REGULAR_FILE",path:e});if(i!==void 0&&n.size>i)throw Object.assign(Error("File exceeds maxBytes limit"),{code:"ERR_FILE_TOO_LARGE",path:e,size:n.size,maxBytes:i})};
function yrr(n,e,i){if(i===void 0)return;if(n>i)throw Object.assign(Error("File exceeds maxBytes limit"),{code:"ERR_FILE_TOO_LARGE",path:e,size:n,maxBytes:i})};
function HAn(n){if(n.byteLength===0)return"utf8";if(n.byteLength>=2){if(n[0]===255&&n[1]===254)return"utf16le"}if(n.byteLength>=3&&n[0]===239&&n[1]===187&&n[2]===191)return"utf8";return"utf8"};
function DAn(n){let e=0,i=0;for(let r=0;r<n.length;r++)if(n[r]===`
`)if(r>0&&n[r-1]==="\r")e++;else i++;return e>i?"CRLF":"LF"};
async function vfe(n,e,i){D0e(await n.stat(),e,i);let r=i===void 0?await n.readFile():await vEe(n,i+1,"file");yrr(r.length,e,i);let s=HAn(r.subarray(0,4096)),o=r.toString(s),c=DAn(o.slice(0,4096));return{content:o.replaceAll(`\r
`,`
`),encoding:s,lineEndings:c}};
async function Rg(n,e){let i=ae(),{resolvedPath:r,isSymlink:s}=bo(i,n);if(s)t(`Reading through symlink: ${n} -> ${r}`);D0e(await i.stat(n),n,e);await using o=await l(n,ROe());return await vfe(o,n,e)};
function TM(e){if((e.offset??1)>1||e.isPartialView)return!1;if(e.limit===void 0)return!0;return e.content!==""&&Vt(e.content,`
`)+1<e.limit};
function HH(e,n){if(e.contentHash!==void 0)return e.contentHash===rXn(n);return e.content===n};
function Ww(e){return e.charCodeAt(0)===65279?e.slice(1):e};
function rXn(e){return Bun.hash(e).toString(36)};
const Eb=(()=>{async function Eb(e){let n=await ae().stat(e);return Math.floor(n.mtimeMs)};return Eb;})();
function Ado(e,n){let r=e.get(n);if(!r)return null;let s=r.isPartialView===!0&&(r.offset??1)<=1&&r.limit===void 0;return TM(r)||s?r:null};
function Pdo(e,n,r,s,g,h){let b=HH(r,g);return e.set(n,{content:g,timestamp:s,offset:void 0,limit:void 0,...(!b||r.contentNotInModelContext)&&{contentNotInModelContext:!0},...(r.isPartialView||h&&!b)&&{isPartialView:!0},...(h&&!b||r.refreshedBehindModel)&&{refreshedBehindModel:!0},...r.startupMemorySeed&&{startupMemorySeed:!0},...b&&r.seededFromContext&&{seededFromContext:!0}}),b?"unchanged":"changed"};
async function pDt(e,n,r={}){let s=Ado(e,n);if(!s)return null;try{let g=await Eb(n);if(g<=s.timestamp)return null;let h=Ww((await Rg(n)).content);if(e.get(n)!==s)return null;return Pdo(e,n,s,g,h,r.requireReadBeforeWrite===!0)}catch{return null}};
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
class Vv{pending=[];enqueue(e){this.pending.push(e)}drain(){let e=this.pending;return this.pending=[],e}};
var HDr=new V(()=>new Vv);
var C3=["User","Project","Local","Managed","AutoMem"];
var T3=["session_start","compaction","policy_refresh","directory_added","settings_sync","account_change","hooks_invalidate","policy_verdict","memory_paused","memory_resumed","auto_memory_off","auto_memory_back_on"];
var L_n=f(()=>u({path:o(),type:Fe([B(C3),x("AutoMemPinned").transform(()=>"AutoMem")]).catch("User"),content:o()}));
var lN=f(()=>u({files:T(L_n()),removed:T(o()).optional(),changed:H().optional(),reason:B(T3).optional().catch(void 0)}));
function m9e(e){return e.type==="attachment"&&e.attachment.type==="instructions"};
function csn(e){let n=e.findLastIndex((s)=>m9e(s)&&!s.attachment.changed&&lN().safeParse(s.attachment).success);if(n===-1)return;let r=new Map;for(let s=n;s<e.length;s++){let g=e[s];if(!m9e(g))continue;let h=lN().safeParse(g.attachment);if(!h.success)continue;for(let b of h.data.files)r.set(b.path,b);for(let b of h.data.removed??[])r.delete(b)}return r};
var nor=f(()=>u({type:x("nested_memory"),path:o(),content:u({content:o()})}));
function l1e(e){let n=new Map;for(let r of e){if(r.type!=="attachment"||r.attachment.type!=="nested_memory")continue;let s=nor().safeParse(r.attachment);if(s.success)n.set(s.data.path,s.data.content.content.trim())}return n};
function Bi(e){return e?.type==="system"&&e.subtype==="compact_boundary"};
function hdt(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r&&Bi(r))return n}return-1};
function ai(e,n){let r=hdt(e);return r===-1?e:e.slice(r)};
function fsr(e,n=[]){let r=HDr.of(e.session.host).drain().map((j)=>({type:"memory_update",source:"sync_unsaved",summary:j,paths:[],inContextPaths:[]})),s=e.getAppState().pendingMemoryUpdates;if(s.length===0)return r;let g=qd()&&process.env.CLAUDE_COWORK_MEMORY_INDEX_CONTENT!==""?Goe():null,h=ai(n),b=csn(h),w=l1e(h),D=(j)=>j===g||e.readFileState.has(j)||b?.has(j)===!0||w.has(j);return e.setAppState((j)=>j.pendingMemoryUpdates.length===0?j:{...j,pendingMemoryUpdates:[]}),r.concat(s.map((j)=>({type:"memory_update",source:j.source,summary:j.summary,paths:j.paths,inContextPaths:j.paths.filter(D)})))};
function L(n){return[...new Set(n)]};
function wi(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")};
var n=/[\x00-\x1f\x7f-\x9f\u2028\u2029]/g;
function OG(e){return e.replaceAll("<","&lt;").replaceAll(">","&gt;")};
function tbe(e){return e.replace(n,(t)=>`&#${t.charCodeAt(0)};`)};
function Yh(e){return tbe(OG(String(e??"")))};
var wrn={dream:"Background memory consolidation",extract:"Background memory extraction"};
function vrn(e){return Object.hasOwn(wrn,e)?wrn[e]:"A background memory process"};
var cP="This is ambient context \u2014 do not narrate it to the user unless they ask or it is directly relevant to their request.";
const enqueue=(()=>{function s(t){return(e)=>t((o)=>({...o,pendingMemoryUpdates:[...o.pendingMemoryUpdates,e]}))};return s;})();
const backgroundUpdate=(()=>{const l=errorMessage;async function OXt(e,r){if(r.paths.length===0)return;let n=[];for(let s of r.paths)try{let o=Xe(s);n.push(o);let u=await pDt(e.readFileState,o,{requireReadBeforeWrite:!0});if(u!==null)t(`[memdir] re-synced readFileState for ${s} after the background ${r.source} pass wrote it (${u==="changed"?"content changed":"mtime only, content identical"})`)}catch(o){t(`[memdir] left ${_(s)} out of the background ${r.source} pass's change notice, could not resolve it: ${l(o)}`)}if(n.length===0)return;e.enqueuePendingMemoryUpdate({...r,paths:L(n)})};return OXt;})();
function normalizeMemoryUpdate(e){switch(e.type){case"memory_update":{if(e.source==="sync_unsaved")return ya([Re({content:e.summary,isMeta:!0})]);let g=[`${vrn(e.source)} updated your memory directory: ${e.summary}`],h=wi(e.paths),b=wi(e.inContextPaths);if(h.length>0)g.push(`Files changed: ${h.map(Yh).join(", ")}`);if(b.length>0)g.push(`Your loaded copy of ${b.map(Yh).join(", ")} is now stale relative to disk \u2014 Read it again if you need current contents.`);return g.push(cP),ya([Re({content:g.join(`
`),isMeta:!0})])}}}
return {publish:backgroundUpdate,enqueue,drain:fsr,refresh:pDt,notices:HDr,normalize:normalizeMemoryUpdate,read:Rg};
}
