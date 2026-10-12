// Official npm 2.1.287 complete routing functions; exact bodies, explicit existing host ports.
export function createContextRouting({u,DRt,LRt,PRt,_Y,JMn,XMn,wmo,vmo,bmo,Emo,wLn,kgo,L,LLe,Zi,Ego,bbr,bLn,tn,Aa,WO,x,y,f,Ur,gu,WWr}) {
const d=u;
const FOt=DRt;
const UOt=LRt;
const xOt=PRt;
const s1=_Y;
const csn=JMn;
const b2n=XMn;
const sAo=wmo;
const aAo=vmo;
const oAo=bmo;
const iAo=Emo;
const q2n=wLn;
const NTo=kgo;
const F=L;
const z1e=LLe;
const Ea=Zi;
const HTo=Ego;
const Exr=bbr;
const V2n=bLn;
const ln=tn;
const Bi=Aa;
const JD=WO;
const k=x;
const p=f;
const Nr=Ur;
const qd=gu;
function Gd(e){return e.type==="attachment"&&e.attachment.type==="coordinator_context"}
function Nd(e){return FOt().safeParse(e.findLast(Gd)?.attachment).data?.content}
function Hd(e){let o=e.findLast((n)=>n.type==="attachment"&&n.attachment.type==="context_sections");return UOt().safeParse(o?.attachment).data?.sections}
function Ld(e){try{return xOt()?s1(e)?.contextRendering:void 0}catch(o){d(o);return}}
function Bd(e){try{return xOt()&&b2n(e)!==void 0?"announced":void 0}catch(o){d(o);return}}
async function Jn(e,o,n,r){let{gitStatus:u,...s}=o.announced;try{let g=r?HTo(n.session):void 0;if(!o.carriesContext||o.bare)return o;let T,M=b2n(e);if(M!==void 0)T=M.gitStatus;else if(!n.options.omitGitStatus&&Exr())T=await(g??V2n())??void 0;return{...o,announced:T===void 0?s:{...s,gitStatus:T}}}catch(g){return d(g),{...o,announced:s}}}
function Cn(e,o){let[n,...r]=e;if(o.length===0||n===void 0||!Bi(n))return e;return[n,...o,...r]}
function qr(e,o,{querySource:n,resumeActive:r,stamp:u,announcementWalk:s}){if(r||o.bare)return[];let g=Ss(n)==="auxiliary";try{let T=[],M=csn(e),b=Xn(o.instructions,s);if(b&&!(g&&M)){let W=aAo(b,M);if(W)T.push(ln({type:"instructions",...W,...W.changed&&{reason:o.refreshReason}},u))}let E=b2n(e),R=Xn(o.announced,s),A=Object.keys(R).length>0;if(E?!g&&(A||o.carriesContext)&&!oAo(E,R):A||o.carriesContext)T.push(ln(E?{type:"session_context",context:R,changed:!0,reason:o.refreshReason}:{type:"session_context",context:R},u));let B=Nd(e),D=Xn(o.workerTools,s),P=Ea();if(!g&&B&&z1e()&&!P)T.push(ln({type:"coordinator_context",content:"",changed:!0},u));else if(P&&D!==void 0&&(g?B===void 0:B!==D))T.push(ln({type:"coordinator_context",content:D,...B!==void 0&&{changed:!0}},u));if(o.sections.length>0&&Hd(e)===void 0)T.push(ln({type:"context_sections",sections:Xn(o.sections,s)},u));let z=WWr(),x=sAo(e);if(g?x===void 0:x!==z)T.push(ln(x===void 0?{type:"date",date:z}:{type:"date",date:z,changed:!0},u));return T}catch(T){return d(T),[]}}
async function Lr(e,o,n,r){let{session:u}=n,s={userContext:e,systemContext:o,announced:{},workerTools:void 0,sections:[],instructions:void 0,refreshReason:"session_start",bare:n.options.bareFork===!0,carriesContext:Object.keys(e).length>0||Object.keys(o).length>0,rendering:void 0};if(n.options.bareFork)return s;let g=Ld(r.messages)??Bd(r.messages);if(g==="inline")return Ti(s);try{let T=e.claudeMd===void 0?void 0:await q2n(u,F()?n.storageV5:void 0,F()?n.credentials:void 0),M=n.options.managedInstructionsOnly?T?.filter((x)=>x.type==="Managed"):T,b={...e},E={...o},R={};for(let x of lsn){let W=b[x]??E[x];if(W)R[x]=W;delete b[x],delete E[x]}delete b.currentDate;let A=z1e()?b.workerToolsContext:void 0;if(A!==void 0)delete b.workerToolsContext;delete E.currentDate;let B;if(b.claudeMd!==void 0&&M!==void 0)B=iAo(M),delete b.claudeMd;else if(b.claudeMd==="")delete b.claudeMd;let{cacheBreaker:D,...P}=E,z=[...Object.entries(b),...Object.entries(P)].filter(([,x])=>x!=="").map(([x,W])=>({name:x,text:W}));return{userContext:{},systemContext:D===void 0?{}:{cacheBreaker:D},announced:R,workerTools:A,sections:z,instructions:B,refreshReason:NTo(u)??"session_start",bare:!1,carriesContext:s.carriesContext,rendering:"announced"}}catch(T){if(d(T),qd(T,r.querySource,g==="announced"?"none":"inline",r.afterCompaction===!0),g==="announced"){let{cacheBreaker:M}=o;return{...s,userContext:{},systemContext:M===void 0?{}:{cacheBreaker:M},bare:!0,rendering:"announced"}}return Ti(s)}}
async function Br(e,o,n,r,u){if(!(e.bare&&e.rendering==="announced"))return e;return Lr(o,n,r,{...u,afterCompaction:!0})}
async function Gr(e,{routing:o,toolUseContext:n,querySource:r,resumeActive:u,foreground:s,stamp:g}){try{let T=e.boundaryMarker,M=Bi(T)?T.compactMetadata.preservedMessages?.anchorUuid:void 0;if(e.messagesToKeep.length===0||u||M!==void 0&&M!==e.summaryMessages.at(-1)?.uuid)return[];if(!k("tengu_calm_noodle",!0))return y("compact_kept_tail_announcements",{enabled:!1,placed:0}),[];let b=new Set;for(let B of e.messagesToKeep)if(B.type==="attachment"&&$Ot.has(B.attachment.type)&&!(B.attachment.type==="instructions"&&B.attachment.changed))b.add(B.attachment.type);let E=JD(e),R=await Jn(E,o,n,s),A=qr(E,R,{querySource:r,resumeActive:u,stamp:g,announcementWalk:n.options.announcementWalk}).filter((B)=>!b.has(B.attachment.type));return y("compact_kept_tail_announcements",{enabled:!0,placed:A.length,kept_types:b.size}),Nr(A,r),A}catch(T){return d(T),p("compact_kept_tail_announcements","announce_failed"),[]}}
function Ti(e){let{claudeMd:o,...n}=e.userContext;return{...e,userContext:o===""?n:e.userContext,bare:!0,rendering:"inline"}}
function Xn(e,o){return o===void 0?e:o(e)}
function Ss(e){if(e===void 0)return;if(e.startsWith("repl_main_thread")||e==="sdk")return"main";if(e.startsWith("agent:")||e==="hook_agent")return"subagent";return"auxiliary"}
var $Ot=new Set(["instructions","session_context","coordinator_context","context_sections","date"]);
var lsn=["userEmail","attachedProject","gitStatus","perforceMode"];
return {route:Lr,retryRoute:Br,snapshotGit:Jn,announcements:qr,keptTail:Gr,insert:Cn,readSections:Hd,readCoordinator:Nd};
}
export function createPromptRenderingReader({p,d,k,o,G,O,ue,ae}) {
const f=p,u=d,T=k,B=G,H=O,de=ue,se=ae;
var j9e=["announced","inline"];
var G_n=f(()=>u({systemPrompt:T(o()),tools:T(u({name:o(),description:o(),schema:de(o(),se()).optional(),server:o().optional()})).optional(),cliPrefix:o().optional(),reminderFold:H().optional().catch(void 0),systemTurns:H().optional().catch(void 0),toolChangeHeader:H().optional().catch(void 0),inlineTools:H().optional().catch(void 0),keptReminders:H().optional().catch(void 0),echoWireToolInputs:H().optional().catch(void 0),contextRendering:B(j9e).optional().catch(void 0)}));
function z9e(e){return e.type==="attachment"&&e.attachment.type==="prompt_snapshot"}
// Validated contextRendering projection only; no second s1 snapshot cache.
return messages => G_n().safeParse(messages.findLast(z9e)?.attachment).data?.contextRendering;
}
export function createContextRoutingGate({uu}) {
const Cu=uu;
function uf(){let e=Cu.reader;if(!e)return!0;try{return e("tengu_foamy_spring",!0)!==!1}catch{return!0}}
return uf;
}
