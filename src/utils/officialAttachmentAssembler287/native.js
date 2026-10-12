// Complete fixed 287 Vor/_l and scheduler-local helper bodies, without projections.
export function createAttachmentAssembler287(ports){
for(const name of ["$Hr","$Lo","A7t","Arr","Ayn","BHr","Bn","Byt","C7t","Ce","Crr","Ddt","Dke","E2t","Ei","FFe","FJ","Irr","J5e","Jrr","Jzn","L","M7t","Mh","Mt","Odn","Ohe","Oo","PKr","Prr","QXt","Qrr","R7t","Rrr","SY","So","TJ","Vg","XXt","Xdn","Xor","Xzn","Ydn","Z","Zdn","Zmt","Zzn","_","_rr","_sr","a","a2","ai","bsr","c","c7","crr","csr","d","dLt","dk","drr","ept","eye","frr","fsr","g7t","h7t","hsr","i","irr","jHr","krr","le","lsr","mDo","mrr","msr","nm","out","p7t","pe","psr","ql","qo","s7t","ssr","st","t","tRt","toe","trr","urr","usr","ux","vrr","vto","vun","wrr","wsr","x7t","xDt","xee","xrr","yrr","ysr","zrr"])if(!Object.prototype.hasOwnProperty.call(ports,name)||ports[name]===undefined)throw Error("Unbound original attachment assembler dependency: "+name);
const $Hr=ports["$Hr"];
const $Lo=ports["$Lo"];
const A7t=ports["A7t"];
const Arr=ports["Arr"];
const Ayn=ports["Ayn"];
const BHr=ports["BHr"];
const Bn=ports["Bn"];
const Byt=ports["Byt"];
const C7t=ports["C7t"];
const Ce=ports["Ce"];
const Crr=ports["Crr"];
const Ddt=ports["Ddt"];
const Dke=ports["Dke"];
const E2t=ports["E2t"];
const Ei=ports["Ei"];
const FFe=ports["FFe"];
const FJ=ports["FJ"];
const Irr=ports["Irr"];
const J5e=ports["J5e"];
const Jrr=ports["Jrr"];
const Jzn=ports["Jzn"];
const L=ports["L"];
const M7t=ports["M7t"];
const Mh=ports["Mh"];
const Mt=ports["Mt"];
const Odn=ports["Odn"];
const Ohe=ports["Ohe"];
const Oo=ports["Oo"];
const PKr=ports["PKr"];
const Prr=ports["Prr"];
const QXt=ports["QXt"];
const Qrr=ports["Qrr"];
const R7t=ports["R7t"];
const Rrr=ports["Rrr"];
const SY=ports["SY"];
const So=ports["So"];
const TJ=ports["TJ"];
const Vg=ports["Vg"];
const XXt=ports["XXt"];
const Xdn=ports["Xdn"];
const Xor=ports["Xor"];
const Xzn=ports["Xzn"];
const Ydn=ports["Ydn"];
const Z=ports["Z"];
const Zdn=ports["Zdn"];
const Zmt=ports["Zmt"];
const Zzn=ports["Zzn"];
const _=ports["_"];
const _rr=ports["_rr"];
const _sr=ports["_sr"];
const a=ports["a"];
const a2=ports["a2"];
const ai=ports["ai"];
const bsr=ports["bsr"];
const c=ports["c"];
const c7=ports["c7"];
const crr=ports["crr"];
const csr=ports["csr"];
const d=ports["d"];
const dLt=ports["dLt"];
const dk=ports["dk"];
const drr=ports["drr"];
const ept=ports["ept"];
const eye=ports["eye"];
const frr=ports["frr"];
const fsr=ports["fsr"];
const g7t=ports["g7t"];
const h7t=ports["h7t"];
const hsr=ports["hsr"];
const i=ports["i"];
const irr=ports["irr"];
const jHr=ports["jHr"];
const krr=ports["krr"];
const le=ports["le"];
const lsr=ports["lsr"];
const mDo=ports["mDo"];
const mrr=ports["mrr"];
const msr=ports["msr"];
const nm=ports["nm"];
const out=ports["out"];
const p7t=ports["p7t"];
const pe=ports["pe"];
const psr=ports["psr"];
const ql=ports["ql"];
const qo=ports["qo"];
const s7t=ports["s7t"];
const ssr=ports["ssr"];
const st=ports["st"];
const t=ports["t"];
const tRt=ports["tRt"];
const toe=ports["toe"];
const trr=ports["trr"];
const urr=ports["urr"];
const usr=ports["usr"];
const ux=ports["ux"];
const vrr=ports["vrr"];
const vto=ports["vto"];
const vun=ports["vun"];
const wrr=ports["wrr"];
const wsr=ports["wsr"];
const x7t=ports["x7t"];
const xDt=ports["xDt"];
const xee=ports["xee"];
const xrr=ports["xrr"];
const yrr=ports["yrr"];
const ysr=ports["ysr"];
const zrr=ports["zrr"];
async function Vor(e,n,r,s,g,h,b){if(qo(n.agentContext))return[];let w=b?.conversationLatches??J5e(n),D=w===void 0?void 0:Xzn(w,ai(g??[]),n.options,n.options.tools,pe(n));if(g!==void 0)try{let et=b?.conversationLatches??J5e(n);if(et!==void 0&&!et.declaredToolsDecided){let bt=ai(g);xDt(et,Ohe(g,n.options)?.wireShape,n.options.mainLoopModel);let ht=c7(bt);if(Yzn(et,ht),Xdn(bt,[...ht.entries.values()],{strippedReferences:ht.strippedReferences}),ht.toolInputCopies.size>0&&Byt(bt))xee(bt,ht.toolInputCopies)}}catch(et){d(et)}let j=ql(n.options.mainLoopModel),z=n.messageQueue.countRemainingWakePollEventsAfter(s);if(a.CLAUDE_CODE_DISABLE_ATTACHMENTS||a.CLAUDE_CODE_SIMPLE||n.options.bareFork){if(b?.inputMentionsOnly)return[];let et=await FFe(s,j,z,{tools:n.options.tools});if(a.CLAUDE_CODE_SIMPLE)return et;return[...et,...await Jzn(n,g),...Ddt(n.options.tools,g),...await Kzn(n,g)]}let K=Bn(),he=setTimeout((et)=>et.abort(),1000,K),_e={...n,abortController:K},ke=!n.agentId,be=e&&!a.CLAUDE_CODE_EVAL_CONFINED?vto()?Promise.resolve(Crr(e)):Rrr(e,_e,n.abortController):Promise.resolve([]),ve=e?[_l("at_mentioned_files",()=>be),_l("mcp_resources",()=>a.CLAUDE_CODE_EVAL_CONFINED?Promise.resolve([]):Prr(e,_e.options.mcpClients,_e.options.mcpResources,_e.abortController.signal)),_l("agent_mentions",()=>Promise.resolve(xrr(e,n.options.agentDefinitions.activeAgents))),_l("skill_mentions",()=>Promise.resolve(b?.isHumanTypedPrompt&&ke&&!FJ(n)&&!Mh()&&n.options.tools.some((et)=>Mt(et,So))&&XXt()?QXt(b.preExpansionInput??e,n.options.commands,{typed:b.preExpansionInput!==void 0,pastedContents:b.pastedContents,permissionContext:pe(n)}):[])),_l("peer_mentions",()=>b?.isHumanTypedPrompt&&b.preExpansionInput!==void 0?be.then((et)=>Arr(b.preExpansionInput,n,et)):Promise.resolve([]))]:[],Te=await Promise.all(ve);if(b?.inputMentionsOnly){let et=await _l("nested_memory",()=>h7t(_e));return clearTimeout(he),[...Te.flat(),...et].filter((bt)=>bt!==void 0&&bt!==null)}let xe=(()=>{let et;return()=>et??=a2()?dk()?lsr(g,n.options.tools,n.storageV5):ssr(g,n):Promise.resolve([])})(),Pe=Vg()?Dke().remote?.noticeAttachment:void 0,$e=Vg()?Dke().remote?.correctionAttachment:void 0,Ne=!Vg()&&n.agentId===void 0&&n.toolState.get(ept).reason()!==void 0&&out(),We=[_l("queued_commands",()=>FFe(s,j,z,{tools:n.options.tools})),_l("sandbox_instructions",()=>Promise.resolve(Ddt(n.options.tools,g))),...C7t()?[_l("artifact_opening_prefetch",()=>mrr(n,g,e,b?.heldAppend===!0))]:[],_l("environment",()=>R7t(n,g)),_l("model",()=>x7t(n,g)),_l("session_settings",()=>A7t(n,g)),_l("ultrathink_effort",()=>Promise.resolve(yrr(e))),...[],_l("deferred_tools_delta",()=>Promise.resolve(dLt(n.options.tools,n.options.mainLoopModel,g,{callSite:ke?"attachments_main":"attachments_subagent",querySource:h},n.options.mcpClients.filter((et)=>et.type==="pending").map((et)=>et.name),Ce()?n.options.mcpClients.filter((et)=>et.type==="needs-auth").map((et)=>et.name):void 0,Ayn()?Odn(n.options.mcpClients):void 0,()=>{let et=n.options.tools,bt=!0,ht=mDo(g??[],et,{keepMcp:!0,surfacedOnWire:(n.stickyBetas??Ei()).surfacedOnWire}),kt=[];try{kt=Zdn(D,et,!0)}catch($t){Ydn($t);let It=new Set(et.map((jt)=>jt.name));kt=D?.names.filter((jt)=>!It.has(jt))??[]}return M7t(ht===void 0&&kt.length===0?void 0:L([...ht??[],...kt]),n.options.mcpClients,pe(n),D)},D,$Hr(b?.conversationLatches??J5e(n),n,h)))),_l("agent_listing_delta",()=>Jzn(n,g)),_l("mcp_instructions_delta",()=>Promise.resolve(BHr(n.options.mcpClients,n.options.tools,n.options.mainLoopModel,g,D))),_l("mcp_dropped_tools_delta",()=>Promise.resolve(jHr(n,g))),...Pe?[_l("tool_hosts_notice",()=>Pe(_e,g??[],"attachment_scan"))]:Ne?[_l("tool_hosts_notice",()=>Promise.resolve(vun(_e,g??[],out)))]:[],...$e?[_l("tool_hosts_correction",()=>$e(_e,{turnStart:e!==null||b?.isRegularUserPrompt===!0}))]:[],_l("changed_files",()=>Irr(_e)),_l("nested_memory",()=>h7t(TJ.peek(n.session)?.readFor?n:_e,g)),_l("dynamic_skill",()=>zrr(_e)),_l("skill_listing",()=>Zzn(_e)),_l("plan_mode",()=>drr(e,g,n,b)),_l("plan_mode_exit",()=>crr(g,n)),...[],...[],_l("auto_mode",()=>urr(g,n)),_l("auto_mode_exit",()=>frr(g,n)),_l("todo_reminders",xe),...PKr()!==null?[_l("tool_search_usage_reminder",()=>csr(g,n,async()=>(await xe()).length>0,D))]:[],...Oo()?[_l("teammate_mailbox",async()=>msr(n)),_l("team_context",async()=>hsr(g??[]))]:[],_l("agent_pending_messages",async()=>trr(n.agentId,n.taskRegistry,n.options.tools)),_l("critical_system_reminder",()=>Promise.resolve(wrr(n.criticalSystemReminder_EXPERIMENTAL))),...[],...ke&&e===null&&!b?.isRegularUserPrompt&&!b?.deliveredTurnStart&&!Zmt()&&s7t(n.options.mainLoopModel)?[_l("silent_turn_reminder",()=>Promise.resolve(irr(g??[])))]:[],_l("total_tokens_reminder",()=>{let et=(b?.isRegularUserPrompt??!1)&&eye()!=="off"&&tRt();return Promise.resolve(e===null&&!b?.deliveredTurnStart||et?_sr(n.session,g??[],n.options.mainLoopModel,n.agentId,et):[])}),_l("budget_usd",async()=>Promise.resolve(wsr(n.options.maxBudgetUsd)))],qe=ke?[...nm()?[_l("workflow_keyword_request",()=>Promise.resolve(b?.isHumanTypedPrompt&&!b.suppressWorkflowKeyword&&E2t()?_rr(b.preExpansionInput??e):[])),_l("ultra_effort_enter",()=>Promise.resolve(b?.isRegularUserPrompt?krr(g,n):[])),_l("workflow_size_guideline_change",()=>Promise.resolve(b?.isRegularUserPrompt?$Lo(ai(g??[]),le().workflowSizeGuideline,toe()):[]))]:[],_l("ide_selection",async()=>p7t(r,n)),_l("ide_opened_file",async()=>g7t(r,n,g)),_l("queued_ide_selections",async()=>(await Promise.all(s.filter(Hdt).flatMap(({ideSelection:et})=>et?[p7t(et,n),g7t(et,n,g)]:[]))).flat()),_l("output_style",()=>vrr(n)),_l("diagnostics",async()=>Qrr(n.options.tools,n.session)),_l("lsp_diagnostics",async()=>Jrr(n.options.tools,n.session)),_l("unified_tasks",async()=>usr(n.options.tools,n.taskRegistry)),_l("async_hook_responses",async()=>psr()),_l("memory_update",()=>Promise.resolve(fsr(n,g))),_l("token_usage",async()=>Promise.resolve(ysr(g??[],n.options.mainLoopModel,n.options.autoCompactWindow))),_l("output_token_usage",async()=>Promise.resolve(bsr()))]:[],[Qe,Ze]=await Promise.all([Promise.all(We),Promise.all(qe)]);return clearTimeout(he),[...Te.flat(),...Qe.flat(),...Ze.flat()].filter((et)=>et!==void 0&&et!==null)}
async function _l(e,n){let r=Date.now(),s=Math.random()<0.05;try{let g=await n(),h=Date.now()-r;if(s){let b=g.filter((w)=>w!==void 0&&w!==null).reduce((w,D)=>w+_(D).length,0);i("tengu_attachment_compute_duration",{label:c(e),duration_ms:h,attachment_size_bytes:b,attachment_count:g.length})}return g}catch(g){let h=Date.now()-r;if(s)i("tengu_attachment_compute_duration",{label:c(e),duration_ms:h,error:!0});if(g instanceof ux)t(`Attachment image resize failed in ${e}: ${g.message}`,{level:"error"});else d(st(Z(g),"attachment generator failed"));return SY(`Attachment error in ${e}`,g),[]}}
async function Kzn(e,n){return(await Promise.all([R7t(e,n),x7t(e,n),A7t(e,n),[]])).flat()}
function Yzn(e,n){for(let r of n.nameOnlyAnnouncements)e.nameOnlyAnnouncements.add(r)}
function Hdt(e){return Xor.has(e.mode)}
return {collect:Vor,compute:_l,earlyRuntime:Kzn,mergeAnnouncements:Yzn,isQueuedPrompt:Hdt};
}
export function createAttachmentCompute287(ports){
for(const name of ["SY","Z","_","d","i","t","ux"])if(typeof ports[name]!=="function")throw Error("Unbound original attachment compute dependency: "+name);
const SY=ports["SY"];
const Z=ports["Z"];
const _=ports["_"];
const d=ports["d"];
const i=ports["i"];
const t=ports["t"];
const ux=ports["ux"];
function r(n){return n}
function c(n){return r(n)}
var st=(n,e)=>{try{if(n!==null&&typeof n==="object"&&!("telemetryMessage"in n)&&Object.isExtensible(n))Object.assign(n,{telemetryMessage:e})}catch{}return n};
async function _l(e,n){let r=Date.now(),s=Math.random()<0.05;try{let g=await n(),h=Date.now()-r;if(s){let b=g.filter((w)=>w!==void 0&&w!==null).reduce((w,D)=>w+_(D).length,0);i("tengu_attachment_compute_duration",{label:c(e),duration_ms:h,attachment_size_bytes:b,attachment_count:g.length})}return g}catch(g){let h=Date.now()-r;if(s)i("tengu_attachment_compute_duration",{label:c(e),duration_ms:h,error:!0});if(g instanceof ux)t(`Attachment image resize failed in ${e}: ${g.message}`,{level:"error"});else d(st(Z(g),"attachment generator failed"));return SY(`Attachment error in ${e}`,g),[]}}
return _l;
}
