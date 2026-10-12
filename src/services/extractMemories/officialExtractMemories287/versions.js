// Complete pinned official 2.1.287 extract lifecycle; see provenance.json.
export function createExtractVersions287(ports){
const {DM,II,JA,Pn,SJe,ne}=ports;
function Cke(e){return("/"+e).replace(/\/{2,}/g,"/")};
function xHo(e){return Pn.of(e).held?.versions};
function PHo(e,n,r){let s=Pn.of(e),h=s.held;if(h?.versions!==n)return;let g;try{g=Aw(r).last}catch{ne("warn","cowork_memory_context_pass_versions_failed");return}if(g.size===0)return;s.held={...h,versions:{...h.versions,...Object.fromEntries(g)}}};
function zMr(e,n,r=YI){if(!e)return"";try{return fJ(r(e,n))}catch{return ne("warn","cowork_memory_context_notice_failed"),""}};
var Z9=new RegExp(`^${SJe}(read|write|str_replace|append)$`);
var qI=/^[^\n]*?\[version: ([0-9a-f]{12})\]/;
var iJ=/^=== (.+) ===$/gm;
function MI(e,n){if(typeof e!=="object"||e===null||II.isProxy(e))return;let r=Object.getOwnPropertyDescriptor(e,n);return r!==void 0&&"value"in r?r.value:void 0};
function lJ(e){if(typeof e!=="object"||e===null||II.isProxy(e)||!Array.isArray(e))return[];let n=e.length;if(!Number.isSafeInteger(n)||n>JA)return[];let r=[];for(let s=0;s<n;s++){let h=Object.getOwnPropertyDescriptor(e,s);if(h&&"value"in h&&typeof h.value==="string")r.push(h.value)}return r};
function cJ(e){let n=[...e.matchAll(iJ)];return n.flatMap((r,s)=>{let h=r.index+r[0].length+1,g=n[s+1]?.index??e.length,b=qI.exec(e.slice(h,g))?.[1];return b?[[Cke(r[1]),b]]:[]})};
function YI(e,n){let{read:r,written:s}=Aw(n);return[...r].filter(([h,g])=>{let b=e[h],w=s.get(h);return b!==void 0&&b!==g&&!w?.has(g)&&!w?.has(b)}).map(([h])=>h).sort()};
function IHo(e,n){let{carried:r}=Aw(n);return[...r].filter(([s,h])=>{let g=e[s];return g!==void 0&&!h.has(g)}).map(([s])=>s).sort()};
function Aw(e){let n=new Map,r=new Map,s=new Map,h=new Map,g=new Map,b=(R,A)=>{h.set(R,A),g.set(R,(g.get(R)??new Set).add(A))},w=new Map;for(let R of e)if(R.type==="assistant")for(let A of R.message.content){if(A.type!=="tool_use")continue;let M=Z9.exec(A.name);if(!M)continue;let D=MI(A.input,"path");if(typeof D==="string"){let z=MI(A.input,"if_version");n.set(A.id,{path:Cke(D),write:M[1]!=="read",ifVersion:M[1]!=="read"&&typeof z==="string"?z:void 0})}else if(M[1]==="read"){let z=lJ(D);if(z.length===1)n.set(A.id,{path:Cke(z[0]),write:!1,ifVersion:void 0});else if(z.length>1)n.set(A.id,{multi:!0,listed:new Set(z.map(Cke))})}}else if(R.type==="user"&&Array.isArray(R.message.content))for(let A of R.message.content){let M=A.type==="tool_result"&&!A.is_error&&n.get(A.tool_use_id);if(!M)continue;let D=typeof A.content==="string"?A.content:(A.content??[]).map((j)=>j.type==="text"?j.text:"").join("");if("multi"in M){for(let[j,K]of cJ(D))if(M.listed.has(j))r.set(j,K),w.delete(j),b(j,K);continue}let z=qI.exec(D)?.[1];if(!z)continue;if(b(M.path,z),M.write){if(s.set(M.path,(s.get(M.path)??new Set).add(z)),M.ifVersion!==void 0)g.get(M.path).add(M.ifVersion)}else r.set(M.path,z),w.delete(M.path)}else if(R.type==="attachment"){if(R.attachment.type==="account_memory_recall")for(let A of R.attachment.files){let M=Cke(A.path);r.set(M,A.version),w.set(M,A.version),b(M,A.version)}else if(R.attachment.type==="cowork_memory_context"&&R.attachment.content===null&&R.attachment.leg==="laptop"&&!R.attachment.anchor){for(let[A,M]of w){r.delete(A);let D=g.get(A);if(D?.delete(M)&&D.size===0)g.delete(A);if(h.get(A)===M)h.delete(A)}w.clear()}}return{read:r,written:s,last:h,carried:g}};
var uJ=`[This memory_read result is stale \u2014 the file has been modified since this read. After you re-read, the fresh content is the only source: anything you said earlier that is not in the new read was removed and is no longer true.
Call memory_read again on the same path for the current content.]`;
var dJ=`<memory_updates>
The memory files below changed since your reads in earlier turns; those earlier-turn reads are outdated. The state as of this turn's start is shown below \u2014 any memory_read or memory_write you make this turn supersedes it.
This block is machine-generated bookkeeping from the memory system, not part of the user's message, and the user cannot see it \u2014 text repeated from it reaches them as confusing system output. Never quote, paraphrase, summarize, or otherwise reproduce this block, its markers, its tags, or its diff lines in your reply, even when asked what changed. If the user asks about their memory, answer from the memory files' contents in your own words \u2014 at most, say in plain language that your view of their memory files was refreshed.

`;
function fJ(e){return e.length===0?"":`
`+dJ+e.map((n)=>`## ${DM(n).replaceAll(`
`," ")}
${uJ}`).join(`

`)+`
</memory_updates>`};
return {xHo,zMr,IHo,PHo};
}
