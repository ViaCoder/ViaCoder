// Whole original la/fc/es/It + ordinary dependencies. Original module imports relocated through explicit canonical ports.
function outer(ports){
const {Dr,Rp,Han,aq,Ss,F,sxe,Wi,dC,dNo,of,B1,t,l,Pt,Dt,xr,gs,Fst,bpo,A2e,v2e,Luo,zPt,stn,jwo,Fwo,m,y,a,Mt,IA,Re,sfe,p,GPo,Fi,oSt,_Ye,S9n,sq,b4e,FUo,NUo,Dw,bzn,aIo,iIo,pe,Fu,C9n,A9n,qxe,q,G,k,evn,zt,UF,ih,M9e,qc,i,c,d,fqn,gne,uf,vf,ln,me,Jct,hsn,ye,Joe,tk,iT,jPo,o_,at,Hl,ml,nh,Ra,xE,FP,Kct,zDt,iGn,s0r,Nt,vu,Qwt,Win,Ku,ZOt,ORo,Kin,Oi,MEe,nativeRequire,nativeImport}=ports;
var lu=5000;
async function*Eo(e){let o=zPt(e.session,e),n=o?.get()?.hiddenDuringTurn,r=!!(n&&n.size>0),u=stn();if(!r&&!u)return;let s=!1;if(r){let{unhideComputerUseApps:g}=await nativeImport("/$bunfs/root/chunk-6vs8cyk3.js"),T=!1,M=g([...n]).then(()=>{T=!0},(R)=>{T=!0,t(`[Computer Use MCP] auto-unhide failed: ${l(R)}`)}),b=Promise.withResolvers(),E=setTimeout(b.resolve,lu);if(await Promise.race([M,b.promise]).finally(()=>clearTimeout(E)),!T)s=!0;o?.update((R)=>R?.hiddenDuringTurn===void 0?R:{...R,hiddenDuringTurn:void 0})}if(u){try{jwo()}catch(g){t(`[Computer Use MCP] unregisterEscHotkey failed: ${l(g)}`)}Fwo(),yield{type:"os_notification",message:"Claude is done using your computer",notificationType:"computer_use_exit"}}if(s)m("computeruse_turn_cleanup","unhide_timeout");else y("computeruse_turn_cleanup")};
var cu=30;
var Zn=60000;
var mu=2;
var gu=3;
var yu=120;
var hu=" \xB7 idle check-ins paused until your next message";
var _u=" Claude Code won't wake this session for another check-in until the user sends a message, so say clearly where things stand.";
function Su(e){return e.mode==="task-notification"&&Ku(e)&&e.passive!==!0};
function tr(){if(!k("tengu_saffron_wren",!0))return 0;return(a.CLAUDE_CODE_GOAL_CHECKIN_MINUTES??cu)*60000};
function Vi(e,o){return e*2**Math.min(o,mu)};
function zi(e,o,n){let r=Math.max(1,Math.round(o/60000)),u=na(e);if(n.length===0)return{summary:"Goal check-in: background work no longer running",body:`${u} is still active. Its evaluation was deferred for ${r} min while background work ran, and that work is no longer running (it finished or was stopped without reporting back). Continue toward the goal.`};let s=n.map((g)=>{let T=g.type==="local_bash"&&g.kind==="monitor",M=T?"monitor":M9e(g.type),b=g.type==="local_bash"&&!T?g.command:g.description;return zt(qc(`- ${g.id} \xB7 ${M} \xB7 ${oa(b)}`,yu))});return{summary:"Goal check-in: background work still running",body:`${u} is still active, and evaluation has been deferred for ${r} min because background work is still running:
${s.join(`
`)}
Check on their progress (e.g. read their output). If they are progressing, say so briefly and keep waiting; if they are stuck or no longer needed, fix or stop them and continue toward the goal.`}};
function bu(e){return{summary:e.summary+hu,body:e.body+_u}};
function er(e){return(e.idleCheckinCount??0)>=gu};
function Xi(e,o,n,r){let u=G(r,(s)=>s.type==="local_bash");if(i("tengu_goal_checkin_injected",{trigger:c(e),deferredMs:o,activeShells:u,activeAgents:r.length-u,checkinCount:n.checkinCount??0,idleCheckinCount:n.idleCheckinCount??0}),e==="idle_timer"&&er(n))p("goal_checkin","idle_cap_reached");else y("goal_checkin");t(`[goal] check-in injected (${e}) after ${Math.round(o/1000)}s deferred`)};
function Ji(e,o,n,r){if(e.deferredSince===void 0)return{deferredSince:n,checkinCount:0,isNewRun:!0};let u=Math.min(...o.map((g)=>g.startTime)),s=e.lastDeferralPassAt!==void 0&&Number.isFinite(u)&&u>e.lastDeferralPassAt&&n-e.lastDeferralPassAt>r;return s?{deferredSince:n,checkinCount:0,isNewRun:s}:{deferredSince:e.deferredSince,checkinCount:e.checkinCount??0,isNewRun:s}};
function Zi(e,o,n){let r=tr();if(r===0)return{nextGoal:e,checkinText:void 0};let u=Ji(e,o,n,r),s=n-u.deferredSince;if(s<Vi(r,u.checkinCount))return{nextGoal:{...e,deferredSince:u.deferredSince,checkinCount:u.checkinCount,lastDeferralPassAt:n},checkinText:void 0};let g={...e,deferredSince:n,checkinCount:u.checkinCount+1,lastDeferralPassAt:n},T=zi(e.condition,s,o).body;return Xi("turn_end",s,g,o),{nextGoal:g,checkinText:T}};
function XYt(e){let o=e.pendingGoalIdleCheckin();if(o!==void 0)clearTimeout(o),e.replacePendingGoalIdleCheckin(void 0)};
function $o(e){XYt(e.sessionScratch);let o=tr();if(o===0||e.goal.deferredSince===void 0)return;let n=Vi(o,e.goal.checkinCount??0),r=er(e.goal)?0:e.now-e.goal.deferredSince,u=Math.min(vu,Math.max(Zn,n-r));zr(e,u)};
function zr(e,o){let n=setTimeout(ku,o,e);n.unref(),e.sessionScratch.replacePendingGoalIdleCheckin(n)};
function ku(e){e.sessionScratch.replacePendingGoalIdleCheckin(void 0);let{goal:o,getAppState:n,setAppState:r,getDeferringTasks:u,deliver:s,hasQueued:g}=e,T=o;try{let M=n().activeGoal;if(!ra(M,o)||M.deferredSince===void 0)return;let b=tr();if(b===0)return;if(er(M)){t("[goal] idle check-in cap reached \u2014 tick re-armed only"),$o({...e,goal:M,now:Date.now()});return}if(Qwt()||g(Win)){zr(e,Zn);return}let E=u();if(E.length===0&&g(Su)){zr(e,Zn);return}let R=Date.now(),A=Ji(M,E,R,b);if(A.isNewRun){let z={...M,deferredSince:R,checkinCount:0,lastDeferralPassAt:R};r((x)=>x.activeGoal!==M?x:{...x,activeGoal:z}),T=z,$o({...e,goal:z,now:R});return}let B=R-A.deferredSince,D={...M,deferredSince:R,checkinCount:A.checkinCount+1,lastDeferralPassAt:R,idleCheckinCount:(M.idleCheckinCount??0)+1};r((z)=>z.activeGoal!==M?z:{...z,activeGoal:D}),T=D;let P=zi(M.condition,B,E);s(er(D)?bu(P):P),Xi("idle_timer",B,D,E),$o({...e,goal:D,now:R})}catch(M){d(M);try{$o({...e,goal:T,now:Date.now()})}catch(b){d(b)}try{m("goal_checkin","fire_failed")}catch(b){d(b)}}};
function oa(e){return UF(ih(e))};
function na(e){return`${evn}${zt(oa(e))}\xBB`};
function ra(e,o){return e!==void 0&&e.setAt===o.setAt&&e.condition===o.condition};
var Cu="tengu_joyful_globe";
function or(){return uf()&&k(Cu,!0)};
var zo=nativeRequire("/$bunfs/root/chunk-r4angm37.js");
var Ro=nativeRequire("/$bunfs/root/chunk-9hy804jg.js");
var Mu=nativeRequire("/$bunfs/root/chunk-1fv0b74j.js");
var nr=nativeRequire("/$bunfs/root/chunk-tnwx1mmk.js");
var lo=nativeRequire("/$bunfs/root/chunk-4hcet7cn.js");
var Oo=nativeRequire("/$bunfs/root/chunk-8hvekfp7.js");
function sa(e){return e.findLastIndex((o)=>o.type==="user"&&!o.isMeta&&!IA(o))};
function Jr(e){return e.type==="attachment"&&e.attachment.type==="hook_blocking_error"};
async function*es(e,o,n,r,u,s,g,T,M,b,E,R){let A=R==="tool",B=[...e,...o,...n];if(Rp(g.agentContext)&&(T.startsWith("repl_main_thread")||T==="sdk"))Han(aq({messages:B,systemPrompt:r,userContext:u,systemContext:s,toolUseContext:g,querySource:T,stickyBetas:b}));if(A||!Pt()&&g.sessionState)yield*aa(E,[...e,...o],o,g,T);if(!g.agentId)try{yield*Eo(g)}catch{}let D=Date.now(),P=g.agentId?void 0:g.getAppState().activeGoal,z=!1;try{let x=gne(pe(g).mode,g.abortController.signal,void 0,M,g.agentId,g,B,g.agentType,"loop_tick"),W=[];for await(let he of x){if(he.timedOut&&P&&he.hook?.prompt===P.condition)p("goal_met","evaluator_timeout");if(he.message){if(yield he.message,he.message.type==="attachment"){let xe=he.message.attachment;if("hookEvent"in xe&&(xe.hookEvent==="Stop"||xe.hookEvent==="SubagentStop")){if(xe.type==="hook_non_blocking_error")W.push(xe.stderr||`Exit code ${xe.exitCode}`);else if(xe.type==="hook_error_during_execution")W.push(xe.content)}}}if(he.blockingError||he.preventContinuation)t(`[end-turn] Stop hook block discarded (turn ended by ${R==="tool"?"tool result":R==="mcp_meta"?"MCP end-turn":"loop tick"}, no model re-invoke): ${he.blockingError?.blockingError??he.stopReason??"preventContinuation"}`)}if(W.length>0)yield{type:"notification",notification:{key:"stop-hook-error",text:`Stop hook error occurred \xB7 ${o_("app:toggleTranscript","Global","ctrl+o")} to see`,priority:"immediate"}};if(R)z=!0,yield*It(g,B,{stopHookActive:M})}catch(x){if(at(x)&&(g.abortController.signal.aborted||x instanceof Hl)){if(t("Stop hook cancelled (abort or stream teardown)"),R&&!z&&!g.abortController.signal.aborted)try{yield*It(g,B,{stopHookActive:M})}catch(W){t(`[stop-hooks] teardown reactions compensation failed: ${l(W)}`)}return}if(i("tengu_stop_hook_error",{duration:Date.now()-D,queryChainId:ye(g.queryTracking?.chainId),queryDepth:g.queryTracking?.depth}),yield Nt(`Stop hook failed: ${l(x)}`,"warning"),R&&!z)try{yield*It(g,B,{stopHookActive:M})}catch(W){t(`[stop-hooks] turn-end reactions compensation failed: ${l(W)}`,{level:"error"})}}};
async function*aa(e,o,n,r,u){if(!e||Ss(u)!=="main"||r.agentId||Dr()&&!r.abortController.signal.aborted)return;let s=Mu,g=s.detectSurfaces(F()&&r.storageV5?await s.watchedForSurfaces(r.storageV5):void 0),T=s.sinksFor(g),M=s.engineFor(T);if(!M)return;e.lastEmittedDetail="";let b=r.getAppState().postTurnSummary;if(T.has("summary"))yield{type:"post_turn_summary",value:null};let E=s.projectsRecapEnabled(r.options.tools);e.onClassified=(P,z)=>{if(z||!T.has("summary"))return;if(P.source==="no-text-turn"&&P.detail===""){if(b)r.setAppState((W)=>W.postTurnSummary===b?W:{...W,postTurnSummary:b}),sxe(r.sessionState,b);return}let x=s.classifiedToPostTurnSummary(P,{projectsRecap:E});if(P.source==="no-text-turn"){if(x.recent_action=b?.recent_action??"",b?.description!==void 0)x.description=b.description;if(b?.reply!==void 0)x.reply=b.reply}r.setAppState((W)=>W.postTurnSummary?.status_category===x.status_category&&W.postTurnSummary.status_detail===x.status_detail&&W.postTurnSummary.needs_action===x.needs_action&&W.postTurnSummary.recent_action===x.recent_action&&W.postTurnSummary.description===x.description&&W.postTurnSummary.reply===x.reply?W:{...W,postTurnSummary:x}),sxe(r.sessionState,x),Wi({type:"system",subtype:"post_turn_summary",summarizes_uuid:n.at(-1)?.uuid??"",status_category:x.status_category,status_detail:x.status_detail,needs_action:x.needs_action})};let R=dC(),A=R?r.options.agentDefinitions.activeAgents.find((P)=>P.agentType===R):void 0,B=o.filter((P)=>P.type==="assistant");if(E){let P=dNo(o);if(e.latestAsk="",P)Ro.captureLatestAsk(e,P)}else{let P=Ro.findLatestRealUserAsk(o);if(P)Ro.captureLatestAsk(e,P)}let D=Ro.classifyAndPush(e,of(),A,"",B,B1(r.taskRegistry.all()),M,g,!1,E).catch((P)=>{t(`[classifier] error: ${l(P)}`,{level:"error"})});if(Pt()||u==="sdk")await Dt(D,60000,"classifier write timed out").catch(()=>{})};
async function*la(e,o,n,r,u,s,g,T,M,b,E){if(Dr()&&!s.abortController.signal.aborted)return{blockingErrors:[],preventContinuation:!1};if(s.options.settingsHooksOff)return{blockingErrors:[],preventContinuation:!1};let R=Date.now(),A={messages:[...e,...o],systemPrompt:n,userContext:r,systemContext:u,toolUseContext:s,querySource:g,stickyBetas:M};if(Rp(s.agentContext)&&(g.startsWith("repl_main_thread")||g==="sdk"))Han(aq(A));if(yield*aa(E,A.messages,o,s,g),!xr()){if(!gs(process.env.CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION))if(Fst()&&Rp(s.agentContext))s.session.promptSuggestion.arm();else bpo(A,E?.lastResult);if(!s.agentId&&(A2e()||zo.isLaptopExtractActive(s.session.host))){let ae=zo.executeExtractMemories(A,s.appendSystemMessage);if(v2e()?.sync||zo.isLaptopExtractSync(s.session.host))try{await ae}catch(Pe){t(`extractMemories (sync) failed: ${Pe}`)}}if(!s.agentId)Luo(A,s.appendSystemMessage)}if(!s.agentId)try{yield*Eo(s)}catch{}let B=null;if((g.startsWith("repl_main_thread")||g==="sdk")&&nr.isBriefEnabled()&&!a.DISABLE_BRIEF_MODE_STOP_HOOK&&!s.agentId&&s.options.tools.some((ae)=>Mt(ae,lo.BRIEF_TOOL_NAME)))try{let ae=sa(e),Pe=e.slice(ae+1),N=[...Pe,...o].some((Oe)=>Oe.type==="assistant"&&Oe.message.content.some((bt)=>bt.type==="tool_use"&&(bt.name===lo.BRIEF_TOOL_NAME||bt.name===lo.LEGACY_BRIEF_TOOL_NAME))),mt=!N&&Pe.some((Oe)=>Oe.type==="user"&&Oe.isMeta&&typeof Oe.message.content==="string"&&Oe.message.content.includes(lo.BRIEF_ENFORCE_SENTINEL));if(!N&&!mt)B=Re({content:`${lo.BRIEF_ENFORCE_SENTINEL} ${nr.getBriefEnforceText()}`,isMeta:!0}),yield B}catch(ae){t(`Brief mode enforcement failed: ${l(ae)}`,{level:"error"})}let D=null,P=null;if(Oo&&g==="sdk"&&!s.agentId&&Oo.isProjectsReplyGateEnabled()&&Oo.isProjectsReplyMountConnected(s.getAppState()))try{let ae=Oo.evaluateProjectsReplyGate(e,o);switch(ae.kind){case"answered":y("bridge_projects_reply_gate");break;case"still_silent":m("bridge_projects_reply_gate","still_silent");break;case"skip":break;case"bounce":if(!s.options.tools.some((Pe)=>Mt(Pe,sfe))){m("bridge_projects_reply_gate","reply_tool_not_in_pool");break}p("bridge_projects_reply_gate",ae.reason),P=Re({content:ae.text,isMeta:!0}),yield P;break}}catch(ae){t(`Projects reply gate enforcement failed: ${l(ae)}`,{level:"error"})}let z=null;if(s.options.requiresStructuredOutput&&Ss(g)!=="auxiliary")try{let ae=sa(e),Pe=e.slice(ae+1),N=GPo([...Pe,...o],Fi),mt=!N&&Pe.some((Oe)=>Oe.type==="user"&&Oe.isMeta&&typeof Oe.message.content==="string"&&Oe.message.content.includes(oSt));if(!N&&!mt)z=Re({content:`${oSt} You MUST call the ${Fi} tool to complete this request. Call this tool now.`,isMeta:!0}),yield z}catch(ae){t(`StructuredOutput enforcement failed: ${l(ae)}`,{level:"error"})}let x=null;if(s.options.requiresHandback&&Ss(g)!=="auxiliary"&&s.agentId!==void 0)try{let ae=s.agentId,Pe=s.taskRegistry.get(ae),N=_Ye(Pe,ae),mt=S9n(Pe)?.handbackBounces??0;sq(ae,s.taskRegistry);let Oe=b4e(ae,s.taskRegistry);if(N!==void 0&&N.length===0&&!Oe&&mt<FUo)s.taskRegistry.update(ae,(bt)=>({...bt,handbackBounces:mt+1})),x=Re({content:`${NUo} Your report has not been delivered. Call ${Dw}({message: <your full report>}) now; the call ends your run.`,isMeta:!0}),yield x}catch(ae){t(`Subagent hand-back enforcement failed: ${l(ae)}`,{level:"error"})}if(Ss(g)!=="auxiliary"&&bzn())try{if(aIo(e.slice(iIo(e)),o,s.agentId??null).length>0)m("skill_inline_command_handoff","not_run")}catch(ae){t(`Skill inline command turn-end check failed: ${l(ae)}`,{level:"error"})}let W=[B,D,P,z,x].filter((ae)=>ae!==null),he=!1,xe,je=void 0,et=[...W],Ft=!1,Ie=[],I=!1,it=s.agentId?void 0:s.getAppState().activeGoal,Te,Vt;try{let ae=s.getAppState(),Pe=pe(s).mode,N=ae.activeGoal,mt=!s.agentId;if(mt)XYt(s.session.sessionScratch);if(N&&mt){let ee=ia(s.taskRegistry.all());if(ee.length>0){if(xe=qxe(s.sessionHooksRegistry,q()).find((se)=>se.prompt===N.condition),xe){s.sessionHooksRegistry.remove(q(),"Stop",xe),t("[goal] evaluation deferred \u2014 background work still running"),Te="deferred",Vt={activeAgents:G(ee,C9n),activeShells:G(ee,A9n)};let se;try{let le=Zi(N,ee,Date.now());je=le.nextGoal,se=le.checkinText}catch(le){d(le),je=N,m("goal_checkin","plan_failed")}if(je!==void 0&&je!==N)yield{type:"active_goal",value:je};if(se!==void 0){let le=Re({content:se,isMeta:!0});et.push(le),W.push(le),yield le}}}else if(N.deferredSince!==void 0){let{deferredSince:se,checkinCount:le,lastDeferralPassAt:Qe,...Je}=N;yield{type:"active_goal",value:Je}}}let Oe=(ee)=>{if(!ee)return;return(s.sessionHooksRegistry.get(q(),"Stop").get("Stop")??[]).flatMap((le)=>le.hooks).some((le)=>fqn(le,ee))?ee:void 0},bt=gne(Pe,s.abortController.signal,void 0,T,s.agentId,s,A.messages,s.agentType,"blockable_turn_end"),ro="",ct=0,co="",jt=!1,so=[],Qt=[],Bo=[];for await(let ee of bt){if(ee.message){if(yield ee.message,Jr(ee.message)&&or())et.push(ee.message);if(ee.message.type==="progress"&&ee.message.toolUseID){ro=ee.message.toolUseID,ct++;let se=ee.message.data;if(se.command)Bo.push({command:se.command,promptText:se.promptText})}if(ee.message.type==="attachment"){let se=ee.message.attachment;if("hookEvent"in se&&(se.hookEvent==="Stop"||se.hookEvent==="SubagentStop")){if(it&&ee.hook?.prompt===it.condition&&(se.type==="hook_non_blocking_error"||se.type==="hook_error_during_execution"))Te="error",p("goal_met","evaluator_error");if(se.type==="hook_non_blocking_error")so.push(se.stderr||`Exit code ${se.exitCode}`),jt=!0;else if(se.type==="hook_error_during_execution")so.push(se.content),jt=!0;else if(se.type==="hook_success"){if(se.stdout&&se.stdout.trim()||se.stderr&&se.stderr.trim())jt=!0;let le=Oe(ee.hook);if(se.hookEvent==="Stop"&&le){s.sessionHooksRegistry.remove(q(),"Stop",le);let Qe=s.getAppState().activeGoal;if(Qe?.condition===le.prompt){let Je=Qe.iterations+1,tt=Date.now()-Qe.setAt,Lt=vf()-Qe.tokensAtStart;if(yield{type:"active_goal",value:void 0},Te=ee.impossible?"impossible":"met",ee.impossible)yield ln({type:"goal_status",met:!1,failed:!0,condition:le.prompt,reason:ee.stopReason,iterations:Je,durationMs:tt,tokens:Lt}),i("tengu_goal_failed",{promptLength:le.prompt.length,reasonLength:ee.stopReason?.length??0,iterations:Je,durationMs:tt,tokens:Lt,origin:me(Qe.origin)}),m("goal_met","impossible");else yield ln({type:"goal_status",met:!0,condition:le.prompt,reason:ee.stopReason,iterations:Je,durationMs:tt,tokens:Lt}),i("tengu_goal_achieved",{promptLength:le.prompt.length,iterations:Je,durationMs:tt,tokens:Lt,origin:me(Qe.origin)}),y("goal_met"),s.sessionState?.notifyMetadataChanged({goal:{condition:le.prompt,set_at:Qe.setAt,iterations:Je,last_reason:null,met:!0}})}}}if("durationMs"in se&&"command"in se){let le=Bo.find((Qe)=>Qe.command===se.command&&Qe.durationMs===void 0);if(le)le.durationMs=se.durationMs}}}}if(ee.timedOut){if(it&&ee.hook?.prompt===it.condition)Te="cancelled",p("goal_met","evaluator_timeout");continue}if(ee.blockingError){let se=Re({content:Jct(ee.blockingError),isMeta:!0});et.push(se),yield se,jt=!0;let le=Oe(ee.hook),Qe=s.getAppState().activeGoal;if(le&&Qe?.condition===le.prompt)Te="not_met",yield{type:"active_goal",value:{...Qe,iterations:Qe.iterations+1,lastReason:ee.stopReason}},yield ln({type:"goal_status",met:!1,condition:le.prompt,reason:ee.stopReason});else so.push(ee.blockingError.blockingError)}if(ee.additionalContexts&&ee.additionalContexts.length>0){let se=s.agentId?"SubagentStop":"Stop",le=ln({type:"hook_additional_context",content:ee.additionalContexts,hookName:se,toolUseID:ro,hookEvent:se});if(!hsn(le))et.push(le);yield le,jt=!0,Qt.push(...ee.additionalContexts)}if(ee.preventContinuation)Ft=!0,co=ee.stopReason||"Stop hook prevented continuation",yield ln({type:"hook_stopped_continuation",message:co,hookName:"Stop",toolUseID:ro,hookEvent:"Stop"});if(s.abortController.signal.aborted){if(i("tengu_pre_stop_hooks_cancelled",{queryChainId:ye(s.queryTracking?.chainId),queryDepth:s.queryTracking?.depth}),!Joe(s.abortController.signal.reason))yield tk({toolUse:!1,interruptedByShutdown:iT(s.abortController.signal)});return{blockingErrors:[],preventContinuation:!0}}}if(ct>0){if(yield jPo(ct,Bo,so,Ft,co,jt,"suggestion",ro,void 0,void 0,Qt),so.length>0){let ee=o_("app:toggleTranscript","Global","ctrl+o");if(!T)yield{type:"notification",notification:{key:"stop-hook-error",text:`Stop hook error occurred \xB7 ${ee} to see`,priority:"immediate"}}}}if(Ft)return yield*It(s,A.messages,{stopHookActive:T}),{blockingErrors:[],preventContinuation:!0};if(et.length>0)return{blockingErrors:et,preventContinuation:!1,goalPass:Te};if(ml()){let ee=nh()??"",se=Ra()??"",le,Qe="",Je=xE(),Lt=(await FP(Je,s.storageV5)).filter((Ye)=>Ye.status==="in_progress"&&Ye.owner===ee);for(let Ye of Lt){let Xt=Kct(Ye.id,Ye.subject,Ye.description,ee,se,Pe,s.abortController.signal,void 0,s);for await(let pt of Xt){if(pt.message){if(pt.message.type==="progress"&&pt.message.toolUseID)Qe=pt.message.toolUseID;if(yield pt.message,Jr(pt.message)&&or())Ie.push(pt.message)}if(pt.blockingError){let yo=Re({content:zDt(pt.blockingError),isMeta:!0});Ie.push(yo),yield yo}if(pt.preventContinuation)I=!0,le=pt.stopReason||"TaskCompleted hook prevented continuation",yield ln({type:"hook_stopped_continuation",message:le,hookName:"TaskCompleted",toolUseID:Qe,hookEvent:"TaskCompleted"});if(s.abortController.signal.aborted)return{blockingErrors:[],preventContinuation:!0}}}let Wt=iGn(ee,se,Pe,s.abortController.signal,void 0,s);for await(let Ye of Wt){if(Ye.message){if(Ye.message.type==="progress"&&Ye.message.toolUseID)Qe=Ye.message.toolUseID;if(yield Ye.message,Jr(Ye.message)&&or())Ie.push(Ye.message)}if(Ye.blockingError){let Xt=Re({content:s0r(Ye.blockingError),isMeta:!0});Ie.push(Xt),yield Xt}if(Ye.preventContinuation)I=!0,le=Ye.stopReason||"TeammateIdle hook prevented continuation",yield ln({type:"hook_stopped_continuation",message:le,hookName:"TeammateIdle",toolUseID:Qe,hookEvent:"TeammateIdle"});if(s.abortController.signal.aborted)return{blockingErrors:[],preventContinuation:!0}}if(I)return yield*It(s,A.messages,{stopHookActive:T}),{blockingErrors:[],preventContinuation:!0};if(Ie.length>0)return{blockingErrors:Ie,preventContinuation:!1,goalPass:Te}}if(!b())yield*It(s,A.messages,{stopHookActive:T});return{blockingErrors:[],preventContinuation:!1,goalPass:Te}}catch(ae){if(at(ae)&&(s.abortController.signal.aborted||ae instanceof Hl)){if(t("Stop hook cancelled (abort or stream teardown)"),!s.abortController.signal.aborted){let N=[...et,...Ie],mt=Ft||I;if(mt||N.length===0&&!b())yield*It(s,A.messages,{stopHookActive:T});return{blockingErrors:N,preventContinuation:mt}}return{blockingErrors:[],preventContinuation:!1}}he=!0;let Pe=Date.now()-R;if(i("tengu_stop_hook_error",{duration:Pe,queryChainId:ye(s.queryTracking?.chainId),queryDepth:s.queryTracking?.depth}),yield Nt(`Stop hook failed: ${l(ae)}`,"warning"),W.length===0&&!b())yield*It(s,A.messages,{stopHookActive:T});return{blockingErrors:W,preventContinuation:!1,goalPass:it&&(Te===void 0||Te==="not_met")?"error":Te}}finally{if(xe)s.sessionHooksRegistry.add(q(),"Stop","",xe);if(je!==void 0&&!s.options.isNonInteractiveSession){let{getAppState:ae,setAppState:Pe,taskRegistry:N,session:mt,messageQueue:Oe}=s;try{$o({goal:je,now:Date.now(),sessionScratch:mt.sessionScratch,getAppState:ae,setAppState:Pe,getDeferringTasks:()=>ia(N.all()),...ts(Oe)})}catch(bt){d(bt);try{m("goal_checkin","arm_failed")}catch(ro){d(ro)}}}if(he)m("hook_stop_handler","hook_stop_handler_failed");else y("hook_stop_handler");if(it){let ae=s.abortController.signal.aborted,Pe=Te==="met"||Te==="not_met"||Te==="impossible";i("tengu_goal_evaluated",{outcome:c(Te??(he?"error":ae?"cancelled":"absent")),durationMs:Date.now()-R,iterations:it.iterations+(Pe?1:0),parentAborted:ae,origin:me(it.origin),...Vt})}}};
async function*It(e,o,{stopHookActive:n}){try{let r=gne(pe(e).mode,e.abortController.signal,void 0,n,e.agentId,e,o,e.agentType,"turn_end_reactions");for await(let u of r){if(u.message)yield u.message;if(u.blockingError||u.preventContinuation)t(`[stop-hooks] Turn-end reaction hook block discarded: ${u.blockingError?.blockingError??u.stopReason??"preventContinuation"}`)}}catch(r){if(at(r)&&(e.abortController.signal.aborted||r instanceof Hl)){t("[stop-hooks] Turn-end reactions pass cancelled (abort or stream teardown)");return}t("[stop-hooks] Turn-end reactions pass failed",{level:"error"}),d(r)}};
function ia(e){return Object.values(e).filter((o)=>!Fu(o)&&!(o.type==="local_agent"&&o.agentType==="main-session")&&(C9n(o)||A9n(o)))};
function ts(e){return{deliver:(o)=>{ZOt({...o,queue:e,origin:ORo})},hasQueued:(o)=>e.peek(o)!==void 0}};
var St=()=>nativeRequire("/$bunfs/root/chunk-9hy804jg.js");
var fs;
function go(e){if(fs===void 0)fs=St?.().createClassifierJobState(e)??null;return fs};
function no(e,o){let n=go(e);if(!St||!n||!o.startsWith("repl_main_thread")||e.agentId)return;St().markTurnAborted(n,of())};
function xn(e){if(e.agentId)return;let o=Oi(e.abortController.signal.reason);if(o!=="user-cancel"&&o!=="remote-cancel")return;return MEe()??void 0};
async function*fc({endTurnSource:e,messagesForQuery:o,assistantMessages:n,toolResults:r,toolUseBlocks:u,systemPrompt:s,userContext:g,systemContext:T,toolUseContext:M,updatedToolUseContext:b,querySource:E,stopHookActive:R,stickyBetas:A,queryChainIdForAnalytics:B,queryDepth:D,deps:P}){try{if(i("tengu_mcp_tool_result_ended_turn",{queryChainId:B,queryDepth:D,source:c(e)}),e==="mcp_meta")no(M,E);let z=new Map;for(let x of r)if(x.type==="user"&&Array.isArray(x.message.content)){for(let W of x.message.content)if(W.type==="tool_result")z.set(W.tool_use_id,W.content)}try{for await(let x of Kin(u.map((W)=>({tool_name:W.name,tool_input:W.input,tool_use_id:W.id,tool_response:z.get(W.id)})),`hook-${P.uuid()}`,b,pe(b).mode,b.abortController.signal)){if(x.message)yield x.message;if(x.blockingError||x.preventContinuation)t(`[end-turn] PostToolBatch block discarded (turn ended by ${e==="tool"?"tool result":"MCP end-turn"}, no model re-invoke): ${x.blockingError?.blockingError??x.stopReason??"preventContinuation"}`)}}catch(x){if(!(x instanceof Hl))throw x;t("PostToolBatch hooks cancelled (control stream closed)")}if(b.abortController.signal.aborted){if(!b.agentId)try{yield*Eo(b)}catch{}if(!Joe(b.abortController.signal.reason))yield tk({toolUse:!1,interruptedMessageId:xn(b),interruptedByShutdown:iT(b.abortController.signal),now:P.now,uuidFn:P.uuid})}yield*es(o,n,r,s,g,T,M,E,R,A,go(M),e)}catch(z){if(at(z))return;d(z)}};
return {la,fc,es,It,go,no,aa};
}

function inline(ports){
const {k,xr}=ports;
function hsn(e){if(!xr())return!1;let{type:n}=e.attachment;return n!=="queued_command"&&n!=="poll_events"};
var gVo="tengu_glowing_orbit";
function bzn(){return k(gVo,!0)!==!1};
function iIo(e){return Math.max(e.findLastIndex((n)=>n.type==="user"&&(n.promptSource!==void 0||n.isMeta!==!0&&n.stackedExpansion!==!0&&!IA(n))),0)};
function hVo(e,n){let r=n.replace(/\s+/g," ").trim(),s=e.replace(/\s+/g," ").trim(),g=/[\s;&|()<>]/;for(let h=s.indexOf(r);h!==-1;h=s.indexOf(r,h+1)){let b=s[h-1],w=s[h+r.length];if((b===void 0||g.test(b))&&(w===void 0||g.test(w)))return!0}return!1};
function kVo(e,n){let r=new Map;for(let s of e)if(s.type==="user"){let g=s.promptShellHandOff;if(g===void 0||g.agentId!==n)continue;for(let h of g.commands){let b=`${h.tool}
${h.command}`;if(!r.has(b))r.set(b,{entry:h,pending:h.command.split(`
`).filter((w)=>w.trim()!=="")})}}else if(s.type==="assistant"&&r.size>0)for(let g of s.message.content){if(g.type!=="tool_use")continue;let h=g.input;if(typeof h!=="object"||h===null||!("command"in h)||typeof h.command!=="string")continue;let b=h.command;for(let[w,D]of r){if(D.entry.tool!==g.name)continue;if(D.pending=D.pending.filter((j)=>!hVo(b,j)),D.pending.length===0)r.delete(w)}}return[...r.values()].map((s)=>s.entry)};
function aIo(e,n,r){return kVo([...e,...n],r)};
function IA(e){if(e.type!=="user")return!1;let n=e.message.content;if(typeof n==="string")return!1;return n.some((r)=>r.type==="tool_result")};
function GPo(e,n){let r;for(let s=e.length-1;s>=0;s--){let g=e[s];if(!g)continue;if(g.type==="assistant"&&Array.isArray(g.message.content)){let h=g.message.content.find((b)=>b.type==="tool_use"&&b.name===n);if(h){r=h.id;break}}}if(!r)return!1;for(let s=e.length-1;s>=0;s--){let g=e[s];if(!g)continue;if(g.type==="user"&&Array.isArray(g.message.content)){let h=g.message.content.find((b)=>b.type==="tool_result"&&b.tool_use_id===r);if(h)return h.is_error!==!0}}return!1};
return {bzn,aIo,iIo,hsn,GPo,IA};
}

function context(ports){
const {}=ports;
function Ss(e){if(e===void 0)return;if(e.startsWith("repl_main_thread")||e==="sdk")return"main";if(e.startsWith("agent:")||e==="hook_agent")return"subagent";return"auxiliary"};
function Rp(e){return e.agentType==="main"};
function qo(e){return e?.agentType==="subagent"&&e.delegatedObservation===!0};
return {Ss,Rp,qo};
}

function phase(ports){
const {yl,qo,YM,QR,gg,M9e,qc,BS,Xc,oe,Sh,PA,S$o}=ports;
var TLe=1000;
function wWt(e){let n=[];for(let r of Object.values(e)){if(!gg(r))continue;let s={id:r.id,type:M9e(r.type),status:r.status,description:qc(r.description,TLe)};switch(r.type){case"local_bash":s.command=qc(r.command,TLe);break;case"local_agent":s.agent_type=r.agentType;break;case"monitor_mcp":s.server=r.server,s.tool=r.tool;break;case"mcp_task":s.server=r.serverName,s.tool=r.toolName;break;case"local_workflow":s.name=r.workflowName;break;case"in_process_teammate":case"remote_agent":case"dream":case"monitor_ws":case"auto_mode_scan":case"local_memory_import":break;default:}n.push(s)}return n};
function EWt(e=BS()){return e.map((n)=>({id:n.id,schedule:n.cron,recurring:n.recurring??!1,prompt:qc(n.prompt,TLe)}))};
async function*gne(e,n,r=yl,s=!1,g,h,b,w,D="turn_end"){let j=g?"SubagentStop":"Stop";if(qo(h.agentContext)||h.options.settingsHooksOff===!0)return;let z=YM(h.agentContext),K=h.agentId??h.session.id;if(!z&&!QR(j,h.sessionHooksRegistry,K))return;if(D==="turn_end_reactions"&&!h.sessionHooksRegistry.getFunctionHooks(K,j).get(j)?.length)return;let he=b?t_(b):void 0,_e=he?fo(he.message.content,`
`).trim()||void 0:void 0,ke={background_tasks:wWt(h.taskRegistry.all()),session_crons:EWt()},be=Xc(h.session,oe(),e,h),ve=g?{...be,hook_event_name:"SubagentStop",stop_hook_active:s,agent_id:g,agent_transcript_path:Sh(g),agent_type:w??be.agent_type??"",last_assistant_message:_e,...ke}:{...be,hook_event_name:"Stop",stop_hook_active:s,last_assistant_message:_e,...ke},Te;yield*PA({session:h.session,hookInput:ve,extendedHookInput:Te,toolUseID:S$o(),signal:n,timeoutMs:r,toolUseContext:h,messages:b,managedHooksOnly:z,skipSessionFunctionHooks:D!=="turn_end"&&D!=="turn_end_reactions",sessionFunctionHooksOnly:D==="turn_end_reactions"})};
function t_(e){return e.findLast((n)=>n.type==="assistant")};
function fo(e,n=""){return e.filter((r)=>r.type==="text").map((r)=>r.text).join(n)};
return {gne,wWt,EWt,t_,fo,TLe};
}

function tasks(ports){
const {}=ports;
var uKn={local_agent:"subagent",local_workflow:"workflow",local_bash:"shell",monitor_mcp:"monitor",monitor_ws:"monitor",mcp_task:"MCP task",in_process_teammate:"teammate",dream:"dream",auto_mode_scan:"auto-mode scan",local_memory_import:"memory import",remote_agent:"cloud session"};
function M9e(e){return uKn[e]??e};
function Fu(e){return e.type==="local_agent"&&"isObserver"in e&&e.isObserver===!0};
function gg(e){if(e.status!=="running"&&e.status!=="pending")return!1;if("isBackgrounded"in e&&e.isBackgrounded===!1)return!1;return!0};
return {gg,M9e,Fu};
}

function job(ports){
const {}=ports;
function Rn(e={}){return{storageV5:e.storageV5,credentials:e.credentials,prevState:"",prevStateSince:Date.now(),accumulatedOutputs:{},lastClassifyAt:0,capturedIntent:"",inFlight:null,nameInFlight:!1,dispatchEmitted:!1,latestAsk:"",kicked:!1,lastBridgeNeeds:void 0,lastMsgCount:0,permissionBridgeSubscribed:!1,bridgeWriteChain:Promise.resolve(),lastEmittedDetail:"",lastMidturnLlmAt:0,lastMidturnLlmDetail:"",midturnLlmIntervalMs:0,midturnLlmEpoch:0,lastResult:null}};
return {Rn};
}

function truncate(ports){
const {}=ports;
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
function qc(t,n){if(t.length<=n)return t;let e=re(t,n);return`${e}\u2026 [+${t.length-e.length} chars]`};
return {qc};
}

function suggestionGate(ports){
const {d,Z}=ports;
function Fst(){try{return!1}catch(e){return d(Z(e)),!1}};
return {Fst};
}

function closed(ports){
const {Hl}=ports;

return {Hl};
}

function activity(ports){
const {}=ports;
function yi(e){return e==="completed"||e==="failed"||e==="killed"};
var l=new Set(["local_agent","remote_agent","in_process_teammate","local_workflow"]);
function C9n(e){return l.has(e.type)&&!yi(e.status)&&!(e.type==="in_process_teammate"&&e.isIdle)&&!(e.type==="remote_agent"&&e.isLongRunning)};
function A9n(e){return e.type==="local_bash"&&!yi(e.status)};
return {C9n,A9n};
}

function goalHooks(ports){
const {}=ports;
function qxe(t,e){let n=[];for(let o of t.get(e,"Stop").get("Stop")??[]){if(o.matcher!==""||o.skillRoot!==void 0)continue;for(let s of o.hooks)if(s.type==="prompt")n.push(s)}return n};
return {qxe};
}

function matcher(ports){
const {rj,_}=ports;
function fqn(e,n){if(e.type!==n.type)return!1;let r=(s,h)=>(s.if??"")===(h.if??"");switch(e.type){case"command":{let s=rj();return n.type==="command"&&e.command===n.command&&_(e.args??null)===_(n.args??null)&&(e.shell??s)===(n.shell??s)&&r(e,n)}case"prompt":return n.type==="prompt"&&e.prompt===n.prompt&&r(e,n);case"agent":return n.type==="agent"&&e.prompt===n.prompt&&r(e,n);case"http":return n.type==="http"&&e.url===n.url&&r(e,n);case"mcp_tool":return n.type==="mcp_tool"&&e.server===n.server&&e.tool===n.tool&&_(e.input??{})===_(n.input??{})&&r(e,n);case"script":return n.type==="script"&&(e.script??null)===(n.script??null)&&(e.file??null)===(n.file??null)&&r(e,n);case"function":return!1}};
return {fqn};
}

function brief(ports){
const {_$,a,bU,vUr,k,qp}=ports;
var t=300000;
function wen(){return a.CLAUDE_CODE_BRIEF||bU("tengu_kairos_brief",!1,t)};
function HB(){return _$()&&wen()||vUr()};
var r=`In brief mode, plain assistant text is hidden from the user \u2014 only ${qp} reaches them. Call it now with your substantive reply for this turn. Do not mention this reminder; the message should read as if you wrote it unprompted, addressing only what the user actually asked. If you genuinely have nothing useful to tell the user, you may end the turn without calling it.`;
function cis(){let e=k("tengu_kairos_brief_stop_hook_text","");return typeof e==="string"&&e.length>0?e:r};
return {HB,cis};
}

function briefConstants(ports){
const {}=ports;
var qp="SendUserMessage";
var qGt="Brief";
var KGt="You ended the turn without calling SendUserMessage.";
return {qp,qGt,KGt};
}

function projects(ports){
const {ZG,jJe,jvr,NPt,Ma,Pa,bc,sfe,k,Vp}=ports;
var _="tengu_rc_thread_reply_gate";
function p(){return k(_,!0)};
var f=["reply","no_reply_needed","post_message","react","update_message","update_status"].map((e)=>Pa(bc,e));
var l=Pa(bc,"no_reply_needed");
var m=Pa(bc,"update_status");
var T="rc_owner";
function y(e){let t=e.mcp.clients.find((n)=>n.name===bc);return t!==void 0&&t.type==="connected"&&Vp(t.config)};
function I(e,t){let n=ZG(e).decider;if(n===null)return{kind:"skip"};let r=e[n.index];if(r===void 0)return{kind:"skip"};let a=g(r)?.startsWith(jJe)===!0;if(!a&&!h(r))return{kind:"skip"};let d=[...e.slice(n.index+1),...t];if(!d.some(E))return{kind:"skip"};let u=new Set;for(let s of d){if(s.type!=="user"||!Array.isArray(s.message.content))continue;for(let o of s.message.content)if(o.type==="tool_result"&&o.is_error===!0)u.add(o.tool_use_id)}let c;for(let s of d){if(s.type!=="assistant")continue;for(let o of s.message.content){if(o.type!=="tool_use"||!f.includes(o.name))continue;if(!u.has(o.id))return{kind:"answered"};c=o.name}}if(a)return{kind:"still_silent"};if(c!==void 0)return{kind:"bounce",reason:"reply_errored",text:`${jJe} Your \`${c}\` call this turn returned an error, so nothing reached the project thread. Call \`${sfe}\` again with what the thread should see, or \`${l}\` if no reply is warranted.`};return{kind:"bounce",reason:"silent_turn",text:`${jJe} Your last turn ended without a terminal \`mcp__${bc}__*\` tool call, so nothing reached the project thread: plain text is not delivered there. Call \`${sfe}\` now with what the thread should see, \`${m}\` if you dispatched work that reports back later, or \`${l}\` if no reply is warranted.`}};
function E(e){return e.type==="assistant"&&e.message.model!==Ma};
function g(e){return e.type==="user"&&e.isMeta===!0&&typeof e.message.content==="string"?e.message.content:void 0};
function h(e){if(e.type==="attachment")return e.attachment.type==="queued_command"&&e.attachment.projectsUserTurn===!0;if(e.type!=="user")return!1;if(e.projectsUserTurn===!0)return!0;let t=e.message.content,n=typeof t==="string"?t:t[0]?.type==="text"?t[0].text:void 0;if(n===void 0)return!1;let r=jvr(n);return r!==null&&NPt(r)&&r.data.sender_kind===T};
return {I,p,y};
}

function wake(ports){
const {Y,f,de,o,se}=ports;
var UQo='<wake reason="external-event"';
function BQo(n){return n.startsWith(UQo)};
var y=/^[a-z0-9-]{1,32}$/;
var b=/^[a-z0-9_.-]{1,64}$/;
var x=2048;
var c=/([a-z][a-z-]*)="([^"\s]{0,256})"/g;
var w=new Set(["reason","current-time"]);
var R=new Set(["source","kind","from","trust","untrusted-keys"]);
var W=f(()=>de(o(),se()));
function s(n){return n.trim()===""};
function jvr(n){if(!BQo(n))return null;let l=n.indexOf(">");if(l===-1||l>x)return null;let T=n.slice(5,l);if(!s(T.replace(c," ")))return null;for(let e of T.matchAll(c))if(!w.has(e[1]))return null;let i=n.indexOf("<event ",l+1);if(i===-1||!s(n.slice(l+1,i)))return null;let u=n.indexOf(">",i);if(u===-1||u-i>x)return null;let d=n.indexOf("</event>",u+1);if(d===-1)return null;let p=d+8,E=n.indexOf("</wake>",p);if(E===-1||!s(n.slice(p,E)))return null;if(!s(n.slice(E+7)))return null;let t=new Map,h=n.slice(i+6,u);if(!s(h.replace(c," ")))return null;for(let e of h.matchAll(c)){if(!R.has(e[1]))return null;let _=e[1];if(!t.has(_))t.set(_,e[2])}let m=t.get("source"),g=t.get("kind");if(m===void 0||g===void 0||!y.test(m)||!b.test(g))return null;let r=n.slice(u+1,d),k=r.indexOf("<!--");if(k!==-1){if(!s(r.slice(0,k)))return null;let e=r.indexOf("-->",k+4);if(e===-1)return null;r=r.slice(e+3)}let A=r.trim();if(!A.startsWith("{"))return null;let a;try{a=Y(A)}catch{return null}if(typeof a!=="object"||a===null||Array.isArray(a))return null;let v=W().safeParse(a);if(!v.success)return null;let S=t.get("from"),O=(t.get("untrusted-keys")??"").split(",").filter((e)=>e!=="");return{source:m,kind:g,...S!==void 0&&{from:S},data:v.data,untrustedKeys:O}};
function NPt(n){return n.source==="session-inbox"&&n.kind==="message.received"};
return {jvr,NPt};
}

function projectsIdentity(ports){
const {Vp}=ports;
var bc="hearthbot";
var sfe=`mcp__${bc}__reply`;
return {bc,sfe,Vp};
}

function metadata(ports){
const {i}=ports;
var Rd="(no content)";
var Ma="<synthetic>";
function Oy(e){return e?.kind==="human"};
function iZn(e){return e?.kind==="human"||e?.kind==="auto-continuation"};
var mu={decider:null,referentTail:void 0,scheduledTrigger:!1};
function ZG(e){try{return uR(e)}catch{return _u(),{...mu,scheduledTrigger:Jg(e)}}};
function _u(){try{i("tengu_turn_tail_analysis_degraded",{})}catch{}};
function Jg(e){for(let n=e.length-1;n>=0;n--)try{let r=e[n];if(r==null)continue;if(r.type==="attachment"&&r.attachment.type==="queued_command"){if(tr(r.attachment.origin))return!0;if(Qg(r.attachment))return!1;continue}if(r.type==="user"){if(em(r)){if(tr(r.origin))return!0;continue}return tr(r.origin)}}catch{continue}return!1};
function uR(e){let n=null,r=-1,s=!1,g=()=>({...mu,scheduledTrigger:s||Jg(e)});for(let v=e.length-1;v>=0;v--){let w=e[v];if(w==null)return g();try{if(w.type==="attachment"&&w.attachment.type==="queued_command"){if(tr(w.attachment.origin))s=!0;if(Qg(w.attachment)){let M=w.attachment.origin;n={index:v,origin:M,text:qg(fR(w.attachment.prompt)),userDriven:!0,strictHuman:Oy(M),scheduledTrigger:tr(M)},r=v;break}continue}if(w.type!=="user"||em(w)||tm(e,v)){if(w.type==="user"&&tr(w.origin))s=!0;continue}let A=w.origin,R=w.isMeta===!0&&Oy(A);n={index:v,origin:A,text:qg(cR(w)),userDriven:R||w.isMeta!==!0&&iZn(A),strictHuman:R||w.isMeta!==!0&&Oy(A),scheduledTrigger:tr(A)},r=v;break}catch{return _u(),g()}}if(n===null)return{...mu,scheduledTrigger:s};let h=s||n.scheduledTrigger,b;try{for(let v=r-1;v>=0;v--){let w=e[v];if(w==null)break;if(w.type!=="assistant")break;if(w.isApiErrorMessage===!0||w.isVirtual===!0||w.message?.model===Ma)continue;let R=dR(w);if(R!==null){b=R;break}}}catch{_u(),b=void 0}return{decider:n,referentTail:b,scheduledTrigger:h}};
function tr(e){return e?.kind==="task-notification"&&e.subkind==="scheduled-trigger"};
function qg(e){let n=e?.trim();return n&&n!==Rd?e:null};
function dR(e){let n=e.message?.content;if(!Array.isArray(n))return null;let r=[];for(let g of n)if(typeof g==="object"&&g!==null&&g.type==="text"&&typeof g.text==="string")r.push(g.text);let s=r.join(`
`);return s.trim()!==""?s:null};
function cR(e){let n=e.message?.content;if(typeof n==="string")return n;if(!Array.isArray(n))return null;let r=[];for(let s of n)if(typeof s==="object"&&s!==null&&s.type==="text"&&typeof s.text==="string")r.push(s.text);return r.length>0?r.join(`
`):null};
function fR(e){if(typeof e==="string")return e;if(!Array.isArray(e))return null;let n=[];for(let r of e)if(typeof r==="object"&&r!==null&&r.type==="text"&&typeof r.text==="string")n.push(r.text);return n.length>0?n.join(`
`):null};
function Qg(e){return Oy(e.origin)||e.isMeta!==!0&&iZn(e.origin)};
function em(e){return cJe(e)||e.isCompactSummary===!0};
function cJe(e){return e.toolUseResult!==void 0||e.sourceToolAssistantUUID!==void 0||e.sourceToolUseID!==void 0||e.turnCompanion===!0};
function tm(e,n){let r=e[n];if(r?.type!=="user"||!(r.origin===void 0||Oy(r.origin)))return!1;let s=Xg(r);if(s===null)return!1;let g=new Set(s),h;for(let b=n-1;b>=0&&g.size>0;b--){let v=e[b];if(v?.type==="assistant"){if(h!==void 0&&!pR(v,h))break;h=v;let w=v.message?.content;for(let A of Array.isArray(w)?w:[])if(typeof A==="object"&&A!==null&&A.type==="tool_use")g.delete(A.id)}else if(v?.type==="user"){if(v.replacesSpan===!0)break;let w=cJe(v)?mR(v):Xg(v);if(w===null)break;if(w.some((A)=>g.has(A)))return!1}}return g.size===0};
function pR(e,n){return e===n||e.message?.id!==void 0&&e.message.id===n.message?.id};
function mR(e){let n=e.message?.content;return Array.isArray(n)?n.flatMap((r)=>typeof r==="object"&&r!==null&&r.type==="tool_result"?[r.tool_use_id]:[]):[]};
function Xg(e){let n=e.message?.content;if(!Array.isArray(n)||n.length===0)return null;let r=[];for(let s of n){if(typeof s!=="object"||s===null||s.type!=="tool_result")return null;r.push(s.tool_use_id)}return r};
return {ZG};
}

function briefView(ports){
const {a,Ce,Kd,k,Be,rt}=ports;
function o(){let e=Kd()?.pewter_owl_model;if(typeof e==="string"&&e!=="")return e;return k("tengu_pewter_owl_model","")};
function r(e){if(a.CLAUDE_CODE_PEWTER_OWL!==void 0)return a.CLAUDE_CODE_PEWTER_OWL;if(Ce())return!1;let t=o();if(t!==""&&!Be(rt()).includes(t))return!1;return k(`tengu_${e}`,!1)||Kd()?.[e]===!0};
function vUr(){return r("pewter_owl_brief")};
return {vUr};
}

function constants(ports){
const {}=ports;
var oSt="[structured-output-enforce]";
var jJe="[projects-reply-gate]";
var evn="Goal check-in: \xAB";
return {oSt,evn,jJe};
}

function escaping(ports){
const {}=ports;
function zt(u){return u.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")};
var itr="\\u00ad\\u034f\\u0600-\\u0605\\u061c\\u06dd\\u070f\\u0890\\u0891\\u08e2\\u115f\\u1160\\u17b4\\u17b5\\u180b-\\u180f\\u200b-\\u200f\\u202a-\\u202e\\u2060-\\u206f\\u3164\\ufe00-\\ufe0f\\ufeff\\uffa0\\ufff0-\\ufffb\\u{110bd}\\u{110cd}\\u{13430}-\\u{1343f}\\u{1bca0}-\\u{1bca3}\\u{1d173}-\\u{1d17a}\\u{16fe4}\\u{e0000}-\\u{e0fff}";
var I={"\uFF1C":"<","\uFF1E":">","\uFE64":"<","\uFE65":">","\u2329":"<","\u232A":">","\u27E8":"<","\u27E9":">","\u3008":"<","\u3009":">","\u2039":"<","\u203A":">","\u02C2":"<","\u02C3":">","\u1438":"<","\u1433":">","\u276C":"<","\u276D":">","\u276E":"<","\u276F":">","\u2770":"<","\u2771":">","\u29FC":"<","\u29FD":">","\u226E":"<","\u226F":">","\u227A":"<","\u227B":">","\u22D6":"<","\u22D7":">","\uFF0F":"/","\u2215":"/","\u2044":"/"};
var bSt="A-Za-z0-9_\\-";
var i=(()=>{let u={"<":"<",">":">","/":"/"};for(let[d,e]of Object.entries(I))u[e]+=d;return{open:u["<"],close:u[">"],slash:u["/"],filler:`^${bSt}${u["<"]}${u[">"]}`,lookalikePattern:new RegExp(`[${Object.keys(I).join("")}]`,"g"),invisiblePattern:new RegExp(`[${itr}]`,"gu")}})();
function UF(u){return u.replace(i.lookalikePattern,(d)=>I[d]??d)};
return {zt,UF};
}

function sanitize(ports){
const {Ar,Nz}=ports;
function _(e){let n=e.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu,"");return n=n.replace(/[\u200B-\u200F]/g,"").replace(/[\u202A-\u202E]/g,"").replace(/[\u2066-\u2069]/g,"").replace(/[\uFEFF]/g,"").replace(/[\uE000-\uF8FF]/g,""),n};
function bf(e){let n=Nz(e);for(let r=0;r<10;r++){let t=_(n);if(t===n)return n;n=t}return n};
var E=/\p{Default_Ignorable_Code_Point}/gu;
function ih(e){return Ar(bf(e).replace(E,""))};
return {ih};
}

function queue(ports){
const {Mi,qi,zt,pD,TOe,Ge}=ports;
function Ku(e){return e.agentId===Ge()};
var ORo={kind:"task-notification",source:"goal-checkin"};
function Win(e){return e.origin?.kind==="task-notification"&&e.origin.source==="goal-checkin"};
function ZOt({summary:e,body:n,priority:r,stopHookActive:s,queue:g,origin:h,turnAttribution:b}){(g===void 0?Mi:g.enqueuePendingNotification)({value:qi({summary:zt(e),trailing:`
${cl(n)}`}),mode:"task-notification",agentId:Ge(),priority:r,stopHookActive:s,origin:h,skipAttachments:!0},{turnAttribution:b})};
function aq(e){return{systemPrompt:e.systemPrompt,userContext:e.userContext,systemContext:e.systemContext,toolUseContext:e.toolUseContext,forkContextMessages:e.messages,advisorModel:e.toolUseContext.getAdvisorSetting(),stickyBetas:e.stickyBetas}};
function cl(e){return`${pD}
${e}
${TOe}`};
return {ZOt,Ku,Win,ORo,aq};
}

function wakeFormat(ports){
const {Oz,zK,ZZ,ret,aC,wT,Ru}=ports;
function qi({taskId:n,toolUseId:s,taskType:r,outputFile:e,status:i,summary:t,body:u,trailing:d}){let f=[[Oz,n],[zK,s],[ZZ,r],[ret,e],[aC,i],[wT,t]],o=`<${Ru}>`;for(let[a,T]of f)if(T)o+=`
<${a}>${T}</${a}>`;return`${o}${u??""}
</${Ru}>${d??""}`};
return {qi};
}

function sanitizeText(ports){
const {}=ports;
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")};
var oee=/[\x00-\x08\x0E-\x1F\x7F-\x9F]/g;
function Ar(t){return t.replace(oee,"").replace(/\s+/g," ").trim()};
return {Ar,Nz};
}

function markup(ports){
const {}=ports;
var Ru="task-notification";
var Oz="task-id";
var zK="tool-use-id";
var ZZ="task-type";
var ret="output-file";
var aC="status";
var wT="summary";
var pD="<system-reminder>";
var TOe="</system-reminder>";
return {pD,TOe,Oz,zK,ZZ,ret,aC,wT,Ru};
}

function surfaces(ports){
const {Pt,p6t,rS,sC,a,mc,Mor,Ce,Sc,R2,t,k,Le,F,f6t,sre,N_e,Dpn}=ports;
var c=new Set(["remote","remote_cowork","remote_desktop","remote_mobile","remote_projects"]);
function fQo(e){if(Pt())return new Set(["bg"]);let r=new Set;if((e??p6t())||rS()!==null)r.add("watched");if(PDn())r.add("ccr");if(a.CLAUDE_CODE_ENVIRONMENT_KIND==="bridge"||mc())r.add("bridge");let s=a.CLAUDE_CODE_ENTRYPOINT;if(s!==void 0&&Mor.has(s))r.add("desktop");if(yQo())r.add("cli");if(!Ce()&&Sc())r.add("repl");return r};
function PDn(){if(sC("fanout"))return!0;if(a.CLAUDE_CODE_ENVIRONMENT_KIND==="byoc")return!0;if(a.CLAUDE_CODE_REMOTE)return c.has(a.CLAUDE_CODE_ENTRYPOINT??"")&&!process.env.BUGHUNTER_FLEET_SIZE;return!1};
async function yss(e){return F()&&e!==void 0?f6t(e):void 0};
var o={bg:["state"],watched:["state"],ccr:["summary"],bridge:["summary"],desktop:["summary"],cli:["summary"],repl:["headline"]};
function mQo(e){let r=new Set,s=gQo();for(let n of e){if(s.has(n))continue;for(let u of o[n])r.add(u)}if(e.has("bg"))r.delete("summary");if(k("tengu_classifier_summary_kill",!1))r.delete("summary");return r};
function gQo(){return l(k("tengu_classifier_disabled_surfaces",""))};
function l(e){let r=new Set;for(let s of e.split(",")){let n=s.trim();if(!n)continue;if(n in o)r.add(n);else if(!R2().warnedUnknownDisabledSurface)R2().warnedUnknownDisabledSurface=!0,t(`[classifier] tengu_classifier_disabled_surfaces: unknown surface '${n}' ignored`)}return r};
function hQo(e){if(e.size===0)return null;let r=e.has("state")?"llm":!e.has("summary")?"heuristic":process.env.CLAUDE_CODE_CLASSIFIER_SUMMARY!==void 0?Le(process.env.CLAUDE_CODE_CLASSIFIER_SUMMARY)?"llm":"heuristic":d();return r==="llm"&&k("tengu_cobalt_wren",!1)?"heuristic":r};
function d(){if(k("tengu_classifier_summary_llm_emit",!1))return"llm";return"heuristic"};
function yQo(){return!1};
function _ss(e){return sre()&&N_e(e)&&k("tengu_projects_thread_recap",!1)};
var i=new Map([["blocked","blocked"],["done","completed"],["working","review_ready"]]);
function Sss(e,r){if(e.recap)return{status_category:e.state==="failed"?"failed":i.get(e.state)??"review_ready",status_detail:e.recap.headline,needs_action:e.state==="blocked"?e.recap.needs:"",recent_action:e.recap.needsYou,description:e.recap.happened,reply:e.recap.reply};return{status_category:i.get(e.state)??"review_ready",status_detail:e.detail,needs_action:e.state==="blocked"?e.needs??"":"",recent_action:e.output.result??"",...r?.projectsRecap&&{description:Dpn(e.detail).text}}};
return {fQo,mQo,hQo,yss,_ss,Sss};
}

function watch(ports){
const {GH,rL,kt,Lj,W,t,l,De,it}=ports;
var Ea=".fleetview-heartbeat";
var bS=5000;
function gc(){return De.session(Ea)};
var yL=1000;
function vS(e,n){let{watchedCache:r}=e;return r&&n-r.at<yL?r.value:void 0};
function p6t(){let e=GH(),n=Date.now(),r=vS(e,n);if(r!==void 0)return r;let s=!1;try{let{mtimeMs:g}=rL(kt(Lj(),Ea));s=n-g<bS}catch(g){if(!W(g))t(`[concurrentSessions] heartbeat stat failed: ${l(g)}`)}return e.setWatchedCache({at:n,value:s}),s};
async function f6t(e){let n=GH(),r=Date.now(),s=vS(n,r);if(s!==void 0)return s;let g;try{let w=await e.statMeta(gc());if(w.ok)g=w.value.mtimeMs;else if(w.error.code!=="NotFound")t(`[concurrentSessions] heartbeat stat failed: ${it(w.error)}`)}catch(w){t(`[concurrentSessions] heartbeat stat failed: ${l(w)}`)}let h=Date.now(),b=g!==void 0&&h-g<bS,v=n.watchedCache;if(!v||v.at<r)n.setWatchedCache({at:h,value:b});return b};
return {p6t,f6t};
}

function sessionsPath(ports){
const {A,we}=ports;
function Lj(){return A(we(),"sessions")};
return {Lj};
}

function entrypoints(ports){
const {}=ports;
var Mor=new Set(["claude-desktop","claude-desktop-3p"]);
return {Mor};
}

function tokenGate(ports){
const {Cu}=ports;
function uf(){let e=Cu.reader;if(!e)return!0;try{return e("tengu_foamy_spring",!0)!==!1}catch{return!0}};
return {uf};
}

function summaryMetadata(ports){
const {Vr,d}=ports;
function f(e){let r=Vr(),n=r.replHandle??r.sdkHostedHandle,o=r.remoteEgressSuppressed;if(!n||n.outboundOnly||n.noHistoryBackfill||o===null||o())return;r.lastKnownPostTurnSummary=e,n.reportMetadata({post_turn_summary:e})};
function sxe(e,r){if(e?.notifyMetadataChanged({post_turn_summary:r}),e?.onMetadataChanged)return;try{f(r)}catch(n){d(n)}};
return {sxe};
}
export function createHandbackOuterNative287(ports){const ctx=context(ports),tk=tasks(ports),sk=inline(ports),hooks=phase({...ports,...ctx,...tk,...truncate(ports)}),strings=truncate(ports),gate=suggestionGate(ports),errors=closed(ports),pi=projectsIdentity(ports),cx=constants(ports),esc=escaping(ports),pr=projects({...ports,...pi,...cx,...wake(ports),...metadata(ports)}),bc=briefConstants(ports),br=brief({...ports,...bc,...briefView(ports)}),ss=surfaces({...ports,...watch({...ports,...sessionsPath(ports)}),...entrypoints(ports)});return outer({...ports,...ctx,...sk,...hooks,...strings,...gate,...errors,...tk,...cx,...esc,...sanitize({...ports,...sanitizeText(ports)}),...queue({...ports,...esc,...wakeFormat({...ports,...markup(ports)}),...markup(ports)}),...activity(ports),...goalHooks(ports),...matcher(ports),...tokenGate(ports),...summaryMetadata(ports),sfe:pi.sfe,nativeRequire:file=>file.endsWith('chunk-9hy804jg.js')?ports.postTurnClient287():file.endsWith('chunk-1fv0b74j.js')?{detectSurfaces:ss.fQo,sinksFor:ss.mQo,engineFor:ss.hQo,watchedForSurfaces:ss.yss,projectsRecapEnabled:ss._ss,classifiedToPostTurnSummary:ss.Sss}:file.endsWith('chunk-8hvekfp7.js')?{evaluateProjectsReplyGate:pr.I,isProjectsReplyGateEnabled:pr.p,isProjectsReplyMountConnected:pr.y}:file.endsWith('chunk-tnwx1mmk.js')?{isBriefEnabled:br.HB,getBriefEnforceText:br.cis}:file.endsWith('chunk-4hcet7cn.js')?{BRIEF_TOOL_NAME:bc.qp,LEGACY_BRIEF_TOOL_NAME:bc.qGt,BRIEF_ENFORCE_SENTINEL:bc.KGt}:ports.nativeRequire(file)}); }
