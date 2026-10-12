// Complete fixed-287 Nl/ZYe/Ohn/ba closures; no backend, session or cache is constructed.
export function createAgentPriming287(ports){
const qd=ports.qd;
const je=ports.je;
const we=ports.we;
const Wd=ports.Wd;
const oe=ports.oe;
const Ve=ports.Ve;
const Jx=ports.Jx;
const aI=ports.aI;
const cr=ports.cr;
const ae=ports.ae;
const gY=ports.gY;
const W=ports.W;
const E=ports.E;
const gm=ports.gm;
const pm=ports.pm;
const i=ports.i;
const c=ports.c;
const t=ports.t;
const Dp=ports.Dp;
const Et=ports.Et;
const Xn=ports.Xn;
const vo=ports.vo;
const Ihn=ports.Ihn;
const ze=ports.ze;
const jQ=ports.jQ;
function r(e,n,a){return a===void 0?e:{...e,[n]:a}};
function f(e,n,a,t){let o=r({namespace:"transcript",projectKey:e,sessionId:n},"agentId",a);return r(o,"agentRelPath",t)};
function h(e,n,a){let c=r({namespace:"log",sessionId:e,channel:n},"agentId",a?.agentId);return r(c,"runId",a?.runId)};
var De={transcript:f,journal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,agentRelPath:a,journal:!0}),sessionJournal:(e,n,a)=>({namespace:"transcript",projectKey:e,sessionId:n,sessionJournal:a}),history:()=>({namespace:"history"}),log:h,globalConfig:()=>({namespace:"globalConfig"}),globalConfigCopy:(e,n)=>({namespace:"globalConfig",kind:e,stamp:n}),userSettings:()=>({namespace:"settings",layer:"user"}),projectSettings:(e)=>({namespace:"settings",layer:"project",projectKey:e}),localSettings:(e)=>({namespace:"settings",layer:"local",consentRootKey:e}),task:(e,n)=>({namespace:"task",listId:e,taskId:n}),taskListMeta:(e)=>({namespace:"task",listId:e,meta:!0}),taskListHighWaterMark:(e)=>({namespace:"task",listId:e,highWaterMark:!0}),memory:(e,n)=>({namespace:"memory",projectKey:e,relPath:n}),pluginRegistry:(e)=>({namespace:"pluginRegistry",file:e}),marketplaceCache:(e,n)=>({namespace:"marketplaceCache",marketplace:e,form:n}),marketplaceTree:(e,n)=>({namespace:"marketplaceCache",marketplace:e,relPath:n}),pluginCache:(e,n,a,t)=>({namespace:"pluginCache",marketplace:e,plugin:n,version:a,relPath:t}),cache:(e,n)=>({namespace:"cache",store:e,id:n}),paste:(e)=>({namespace:"paste",id:e}),state:(e)=>({namespace:"state",id:e}),pluginAssetCache:(e)=>({namespace:"pluginAssetCache",digest:e}),plan:(e)=>({namespace:"plan",name:e}),daemon:(e)=>({namespace:"daemon",relPath:e}),feedbackDraft:(e)=>({namespace:"feedbackDraft",draftId:e}),agentMemory:(e,n)=>({namespace:"agentMemory",layer:"user",agentType:e,relPath:n}),identity:()=>({namespace:"identity"}),team:(e)=>({namespace:"team",team:e}),sidecar:(e,n,a)=>({namespace:"sidecar",projectKey:e,sessionId:n,relPath:a}),mailbox:(e,n)=>({namespace:"mailbox",team:e,teammate:n}),scratch:(e,n)=>({namespace:"scratch",sessionId:e,relPath:n}),userConfigDir:(e,n)=>({namespace:"userConfigDir",dir:e,relPath:n}),fileHistory:(e,n)=>({namespace:"fileHistory",sessionId:e,backupFileName:n}),job:(e,n)=>({namespace:"job",jobId:e,relPath:n}),jobTimeline:(e)=>({namespace:"jobTimeline",jobId:e}),recording:(e,n,a)=>({namespace:"recording",projectKey:e,sessionId:n,stamp:a}),sessionLog:(e,n,a)=>({namespace:"sessionLog",projectKey:e,year:n.year,month:n.month,day:n.day,logName:a}),jobPins:()=>({namespace:"jobsRoot",file:"pins"}),jobDraft:(e)=>({namespace:"jobsRoot",draftKey:e}),session:(e)=>({namespace:"session",file:e}),bridgePointer:(e)=>({namespace:"bridgePointer",projectKey:e}),sessionAliases:(e)=>({namespace:"sessionAliases",projectKey:e}),dirSyncRecord:(e,n)=>({namespace:"dirSyncRecord",projectKey:e,sessionId:n})};
function iz(){if(process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR)return process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR;return we()};
function SG(e){let n=aa(e);if(n?.length!==2||n[1]!=="memory")return;let r=n[0];return Xn(r)?r:void 0};
function aa(e){let n=Dp()+Et;if(!e.startsWith(n))return;let r=e.slice(n.length);while(r.endsWith(Et))r=r.slice(0,-Et.length);return r.split(Et)};
var _o="auto memory";
async function He(e,n){if(n&&SG(e)!==void 0)return;let r=ae();try{await r.mkdir(e)}catch(s){let g=E(s);t(`ensureMemoryDirExists failed for ${e}: ${g??String(s)}`,{level:"debug"})}};
function fm(e,n){let r=e.lstatSync(n);if(r.isFile())return!0;return i("tengu_agent_memory_entrypoint_skipped",{reason:c(r.isSymbolicLink()?"leaf_link":"leaf_special")}),t(`agent memory: ${n} is not a regular file; not read`),!1};
function ba(e,n){let{displayName:r,memoryDir:s,extraGuidelines:g}=e,h=ae(),w=s+Wd,b=()=>{try{let I=e.entrypointRead??"follow";if(I==="none"||I==="regular-file"&&!fm(h,w))return{content:"",refused:!0};return{content:h.readFileSync(w,{encoding:"utf-8"}),refused:!1}}catch{return{content:"",refused:!1}}},{content:R,refused:M}=n!==void 0&&e.primedEntrypoint!==void 0?{content:e.primedEntrypoint,refused:!1}:b(),x=vo(r,s,{extraGuidelines:g,inlineTypes:!0,includeSkillUpkeep:!1,readOnly:M});if(R.trim()){let I=Ihn(R),A=r===_o?"auto":"agent";ze(s,{content_length:I.byteCount,line_count:I.lineCount,was_truncated:I.wasLineTruncated,was_byte_truncated:I.wasByteTruncated,memory_type:c(A)}),x.push(`## ${Wd}`,"",jQ(I.content))}else if(M)x.push(`## ${Wd}`,"",`Your ${Wd} was not loaded: it or its folder is a link or a special file, or could not be verified to be inside this working copy. Treat this agent memory as read-only in this session: do not create or write ${Wd} or other files in its folder.`);else x.push(`## ${Wd}`,"",`Your ${Wd} is currently empty. When you save new memories, they will appear here.`);return x.join(`
`)};
function ka(e){let n=e.replace(/[^a-zA-Z0-9\-_]/g,"-");return n===""?"unknown":n};
function ym(e){if(process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR)return je(process.env.CLAUDE_CODE_REMOTE_MEMORY_DIR,"projects",Jx(aI(cr())??cr()),"agent-memory-local",e)+Ve;return je(oe(),".claude","agent-memory-local",e)+Ve};
function _8n(e,n){let r=ka(e);switch(n){case"project":return je(oe(),".claude","agent-memory",r)+Ve;case"local":return ym(r);case"user":return je(iz(),"agent-memory",r)+Ve}};
function Ra(e){return e!=="user"};
function wm(e,n){if(!Ra(e))return"follow";if(!Qt(n,oe()))return"regular-file";let r=bm(n,oe());if(r==="beneath"||r==="absent")return"regular-file";return i("tengu_agent_memory_entrypoint_skipped",{reason:c(r==="elsewhere"?"folder_link":"folder_unresolved")}),t(r==="elsewhere"?`agent memory: ${n} leads out of the working copy or through a dangling link; its MEMORY.md is not read`:`agent memory: ${n} could not be resolved; its MEMORY.md is not read`),"none"};
function Qt(e,n){return e.startsWith(je(n,Ve))};
function bm(e,n){let r=ae(),s=e.replace(/[\\/]+$/,""),g;try{g=gY(r,n)}catch{return"unresolved"}try{return Qt(gY(r,s),g)?"beneath":"elsewhere"}catch(b){if(!vr(b))return"unresolved"}try{return r.lstatSync(s),"elsewhere"}catch(b){if(!vr(b))return"unresolved"}let{existing:h,missing:w}=Ea(r,s);try{return Qt(je(gY(r,h),...w),g)?"absent":"elsewhere"}catch(b){return vr(b)?"elsewhere":"unresolved"}};
function Ea(e,n,r=[]){try{e.lstatSync(n)}catch(s){let g=gm(n);if(vr(s)&&g!==n)return Ea(e,g,[pm(n),...r])}return{existing:n,missing:r}};
function vr(e){return W(e)||E(e)==="ENOTDIR"};
function Ohn(e,n,r,s){let g;switch(n){case"user":g="- Since this memory is user-scope, keep learnings general since they apply across all projects";break;case"project":g="- Since this memory is project-scope and shared with your team via version control, tailor your memories to this project";break;case"local":g="- Since this memory is local-scope (not checked into version control), tailor your memories to this project and machine";break}let h=_8n(e,n),w=wm(n,h);if(w!=="none")He(h,r);let b=process.env.CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES;return ba({displayName:"Persistent Agent Memory",memoryDir:h,extraGuidelines:b&&b.trim().length>0?[g,b]:[g],...s!==void 0&&{primedEntrypoint:s},entrypointRead:w},r)};
function vm(e,n){if(n!=="user"||je(iz(),"agent-memory")!==je(we(),"agent-memory"))return;return De.agentMemory(ka(e),[Wd])};
async function ZYe(e,n){if(n===void 0||e.memory===void 0||!qd())return;let r=vm(e.agentType,e.memory);if(r===void 0)return;let s=await n.readText([r]).catch(()=>{return}),g=s?.ok?s.value.items[0]:void 0;return g!==void 0&&g.found?g.value:""};
return {get prompt(){return createAgentPromptCaller287(ZYe,ports.HHt,ports.Nko)},prime:ZYe,key:vm,memoryPrompt:Ohn,directory:_8n,sanitize:ka};
}
export function createAgentPromptCaller287(ZYe,HHt,Nko){
async function Nl(e,s,n){try{let r=await ZYe(e,s.storageV5),g=e.getSystemPrompt({toolUseContext:s,primedAgentMemory:r});return await HHt([g],n)}catch(r){return HHt([Nko],n)}};
return Nl;
}
export function createPluginAgentPrompt287(qd,Ohn,he,Ze,qe){return (un)=>{if(qd()&&Ze){let rn=Ohn(he,Ze,un?.toolUseContext?.storageV5,un?.primedAgentMemory);return qe+`

`+rn}return qe};}
export function createJsonAgentPrompt287(qd,Ohn,e,s,b){return (D)=>{if(qd()&&s.memory)return b+`

`+Ohn(e,s.memory,D?.toolUseContext?.storageV5,D?.primedAgentMemory);return b};}
export function createMarkdownAgentPrompt287(qd,Ohn,h,ve,xn){return (wn)=>{if(qd()&&ve){let eo=Ohn(h,ve,wn?.toolUseContext?.storageV5,wn?.primedAgentMemory);return xn+`

`+eo}return xn};}
