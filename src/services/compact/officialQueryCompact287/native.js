// Complete original bounded query compact producer/guard statements; one existing owner.
export function createQueryCompactLifecycle287(ports){
const Lan=ports["Lan"];
const UIr=ports["UIr"];
const BIr=ports["BIr"];
const FIr=ports["FIr"];
const rs=ports["rs"];
const jm=ports["jm"];
const EOr=ports["EOr"];
const Nue=ports["Nue"];
const kjn=ports["kjn"];
const FDt=ports["FDt"];
const St=ports["St"];
const xc=ports["xc"];
const go=ports["go"];
const no=ports["no"];
const of=ports["of"];
const KM=ports["KM"];
const d=ports["d"];
const EY=ports["EY"];
const mR=ports["mR"];
const Ei=ports["Ei"];
const OIr=ports["OIr"];
const Uxo=ports["Uxo"];
const Hlt=ports["Hlt"];
const ug=ports["ug"];
const i=ports["i"];
const c=ports["c"];
const C6=ports["C6"];
const S=ports["S"];
const Fxr=ports["Fxr"];
const nko=ports["nko"];
const pFe=ports["pFe"];
const uo=ports["uo"];
const IIr=ports["IIr"];
function $i(e){let o=!0;return{disarm(){o=!1},[Symbol.dispose](){if(!o)return;o=!1;try{e()}catch(n){d(n)}}}}
return {
automaticCacheSafeParams({u,s,g,f,w,lt,W}){return {systemPrompt:u,userContext:s,systemContext:g,toolUseContext:f,forkContextMessages:w,advisorModel:f.getAppState().advisorModel,stickyBetas:lt,agentCacheTtlOverride:W}},
reactiveCacheSafeParams({u,s,g,f,ot,w,lt,W}){return {systemPrompt:u,userContext:s,systemContext:g,toolUseContext:ot,forkContextMessages:w,advisorModel:f.getAppState().advisorModel,stickyBetas:lt,agentCacheTtlOverride:W}},
observerLifetime({f,b}){var vs=St&&xc()&&b.startsWith("repl_main_thread")&&!f.agentId?$i(()=>no(f,b)):void 0;return vs},
markTurnActive({vs,w,f,N}){if(St&&vs){let h=w.findLast((v)=>v.type==="user"&&!v.isMeta&&typeof v.message.content==="string");St().markTurnActive(go(f),of(),{userText:h?.type==="user"&&typeof h.message.content==="string"&&!KM(h.message.content)?h.message.content:void 0,isTurnStart:N.transition===void 0})}},
stickyBetas({e,po}){let lt=e.stickyBetas??(po==="main"||po===void 0?void 0:po==="subagent"?EY():mR(Ei()));return lt},
isPreFirstCompactFork({f,Ve,b}){var ur=f.precomputeSourceKey!==void 0&&Ve?.compacted!==!0&&!Lan(b);return ur},
estimate({ws,No,N,ur,b,w,qt,In,f,po,u,s,g,lt,W}){if(UIr({autocompactRan:ws,hasAttemptedReactiveCompact:No,lastTransitionReason:N.transition?.reason,isPreFirstCompactFork:ur,querySource:b,contextTokens:jm(w,qt.bytesPerToken)-In,messagesCounted:w,facts:qt,autoCompactWindow:f.options.autoCompactWindow}))if(po==="subagent")FIr(f.session.precompute,f.agentId,"subagent_estimate",rs(b));else BIr({querySource:b,messages:w,facts:qt,cacheSafeParams:{systemPrompt:u,userContext:s,systemContext:g,toolUseContext:f,forkContextMessages:w,advisorModel:f.getAppState().advisorModel,stickyBetas:lt,agentCacheTtlOverride:W},...b==="sdk"&&{promptScan:EOr(w)}});},
response({ws,No,N,ur,b,w,Q,qt,In,f,po,u,s,g,lt,W,to,be,vt}){if(UIr({autocompactRan:ws,hasAttemptedReactiveCompact:No,lastTransitionReason:N.transition?.reason,isPreFirstCompactFork:ur,querySource:b,contextTokens:to,messagesCounted:Q,facts:qt,autoCompactWindow:f.options.autoCompactWindow}))if(po==="subagent"&&vt.length===0)FIr(f.session.precompute,f.agentId,"subagent_final_turn",rs(b));else{let wt=Nue(be),fo=wt.input_tokens+wt.cache_creation_input_tokens+wt.cache_read_input_tokens,yt=jm(w,qt.bytesPerToken)-In;BIr({querySource:b,messages:[...w,...Q],facts:qt,cacheSafeParams:{systemPrompt:u,userContext:s,systemContext:g,toolUseContext:f,forkContextMessages:w,advisorModel:f.getAppState().advisorModel,stickyBetas:lt,agentCacheTtlOverride:W},armTrigger:"api_response",estimateGapTokens:fo-yt,...b==="sdk"&&{promptScan:EOr([...w,...Q])}})}},
retryGate({v,No,on,N,Ve}){let ue=v&&No&&on==="available"&&N.transition?.reason==="reactive_compact_retry",ne=No&&!ue,J=ue?{action:"proceed",consecutiveRapidRefills:Ve?.consecutiveRapidRefills??0}:kjn(Ve),{consecutiveRapidRefills:Me}=J;return {deeper:ue,hasAttempted:ne,rapid:J,consecutiveRapidRefills:Me}},
retryState({ue,At,v,on,ut,Ae,f,Ve,qe}){let Kt=ue?"spent":At===void 0&&v&&on==="none"&&FDt(ut).length>=3?"available":on;let N;N={guards:{...Ae,hasAttemptedReactiveCompact:At===void 0,reactiveCompactDeeperPass:Kt},messages:ut,toolUseContext:f,compactTracking:Ve,resumeIncompleteThinking:qe,transition:{reason:At?"precomputed_compact_swap":"reactive_compact_retry"}};return N},
*impossibleConversation({h,ne,b,f,w,H,on,I}){if(h&&OIr({hasAttempted:ne,querySource:b,aborted:f.abortController.signal.aborted})&&Uxo(w)){let ot=FDt(w),ut=ot.length,Kt=H?"image_error":"prompt_too_long",{actualTokens:Zt,limitTokens:Gn}=Hlt(h.errorDetails??""),Hn=ug(ot.flat()),Sn=Zt!==void 0?Math.max(0,Zt-Hn):void 0;i("tengu_ptl_surfaced_to_user",{reason:c(Kt),querySource:rs(b),wasGatedByPriorAttempt:ne,deeperPass:c(on),reactiveUnsupported:!C6(),precomputedKind:S("not_consulted"),compactionImpossible:!0,totalGroups:ut,overheadTokensEstimate:Sn});let bn=Kt==="prompt_too_long"?Fxr(h,nko({actualTokens:Zt,limitTokens:Gn,conversationTokensEstimate:Hn}),I):h;return yield bn,pFe(bn,f),uo(f,b,bn),{reason:Kt}}},
surfaceFailure({v,Uo,h,I}){let hn=v?IIr(Uo):void 0,Co=hn!==void 0?Fxr(h,hn,I):h;return Co}
}}
