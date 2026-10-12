// Complete original287 manual outer; stateless ports share actual business owners.
export function createManualCompact287(ports){
const Ajn=ports["Ajn"];
const Bi=ports["Bi"];
const D5=ports["D5"];
const DIr=ports["DIr"];
const G6n=ports["G6n"];
const H6=ports["H6"];
const HIr=ports["HIr"];
const I=ports["I"];
const JD=ports["JD"];
const P=ports["P"];
const Pce=ports["Pce"];
const T4e=ports["T4e"];
const TI=ports["TI"];
const UN=ports["UN"];
const Xxr=ports["Xxr"];
const YU=ports["YU"];
const Ye=ports["Ye"];
const Yxr=ports["Yxr"];
const ZT=ports["ZT"];
const ai=ports["ai"];
const cFe=ports["cFe"];
const d=ports["d"];
const fe=ports["fe"];
const hye=ports["hye"];
const kHt=ports["kHt"];
const l=ports["l"];
const o_=ports["o_"];
const ole=ports["ole"];
const qk=ports["qk"];
const rht=ports["rht"];
const t=ports["t"];
const ug=ports["ug"];
const wPt=ports["wPt"];
const yRe=ports["yRe"];
var ce=async(n,e)=>{let a=await b(e,{customInstructions:n});if(a.type!=="skipped")return a;return a.reason.startsWith(D5)?{type:"text",value:a.reason,level:"error"}:{type:"text",value:`Not compacted \xB7 ${a.reason}`}};
async function b(n,{customInstructions:e,mainThreadAgentDefinition:a,trigger:p="manual",origin:g}){let{abortController:k}=n,{messages:i}=n;if(n.getAppState().endedByModel)throw new P(UN("Claude ended this conversation. Start a new session (or /clear) to continue."),"Claude ended this conversation");if(i=ai(i),i.length===0)throw Error(w);let o=e.trim();try{return await D(i,n,{customInstructions:o,mainThreadAgentDefinition:a,trigger:p,origin:g??n.hookOrigin})}catch(r){if(k.signal.aborted)throw new Ye("Compaction canceled.");else if(TI(r,cFe))return{type:"text",value:cFe};else if(r instanceof H6)return{type:"text",value:r.message,level:"error"};else throw d(r),Error(`Error during compaction: ${r instanceof Error?r.message:String(r)}`,{cause:r})}};
async function D(n,e,{customInstructions:a,mainThreadAgentDefinition:p,trigger:g,origin:k}){e.onCompactEvent?.({type:"compact_progress",event:{type:"hooks_start",hookType:"pre_compact"}}),e.onCompactEvent?.({type:"sdk_status",status:"compacting"});let i=performance.now(),o=YU(),r,y=ug(n),E,S,R,v=async(s,m)=>{let[f,h]=await Promise.all([hye(e.session,{trigger:"manual",customInstructions:m||null},e,e.abortController.signal),wPt({toolUseContext:e,forkContextMessages:s,mainThreadAgentDefinition:p})]);if(R=h,f.blockedBy)return t(`Compaction blocked by PreCompact hook: ${f.blockedBy}`,{level:"warn"}),e.onQueryEvent?.({type:"notification",notification:{key:"compaction-blocked-by-hook",text:"compaction blocked by PreCompact hook",priority:"immediate",color:"warning"}}),{skip:`${D5}: ${f.blockedBy}`};let _=T4e(m,f.newCustomInstructions);e.onCompactEvent?.({type:"stream_mode",mode:"requesting"}),e.onQueryEvent?.({type:"response_length",op:"reset"}),e.onCompactEvent?.({type:"compact_progress",event:{type:"compact_start"}});let c=await I(e,m??"",f.newCustomInstructions,s,kHt(n));if(S=c.reuse,c.hit&&c.replacement!==void 0){let C=[...c.replacement,...c.since];return{messages:C,tokensBefore:y,record:{kind:"replacement",messages:C}}}let u=await(c.hit?G6n({...c.finalize,startTime:i,cacheSafeParams:h,mainChainTailAtStart:o}):HIr(s,h,{customInstructions:_,trigger:"manual",manualPrecomputeReuse:c.reuse,userWaitStartedAt:i,precomputedKind:c.precomputedKind,precomputedFailureCause:c.precomputedFailureCause,onResponseLength:(C)=>e.onQueryEvent?.(C)})).catch((C)=>(d(C),{ok:!1,reason:"error",detail:l(C)}));if(!u.ok)switch(u.reason){case"too_few_groups":throw Error(cFe);case"aborted":throw Error(qk);case"exhausted":throw new H6(O);case"media_unstrippable":throw new H6(A);case"error":throw new H6(`Error during compaction: ${u.detail||"unknown error"}`)}let M=u.result.boundaryMarker,T=Bi(M)?M.compactMetadata:void 0;return{messages:JD(u.result),tokensBefore:T?.preTokens,tokensAfter:T?.postTokens,usage:Xxr(u.result.compactionUsage),record:{kind:"compacted",compactionResult:u.result,hookDisplay:f.userDisplayMessage}}};try{let s=await Yxr({trigger:g,instructions:a||void 0,messages:n,isIsolated:!1,origin:k,signal:e.abortController.signal,compact:v});if(s.kind==="skipped")return r=`skipped: ${s.reason}`,{type:"skipped",reason:s.reason};let m=s.record,f=R??await wPt({toolUseContext:e,forkContextMessages:n,mainThreadAgentDefinition:p}),h=s.kind==="replaced"?s.messages:s.record.kind==="replacement"?Ajn(s.record.messages):void 0,_=h===void 0&&m?.kind==="compacted"?m.compactionResult:await DIr({replacement:h??[],preCompactMessages:n,cacheSafeParams:f,querySource:void 0,trigger:"manual",startTime:i,coreBoundary:m?.kind==="compacted"?m.compactionResult.boundaryMarker:void 0,compactionKind:"manual",precomputed:m?.kind==="replacement"}),c=m?.kind==="compacted"?m.hookDisplay:void 0,u=_.boundaryMarker;if(Bi(u))E=u.compactMetadata.postTokens;Pce(e.session,void 0,e.setAppState,void 0,void 0,e.storageV5),rht(),ZT(e.session,"compaction");let M=[c,_.userDisplayMessage].filter(Boolean).join(`
`)||void 0;return{type:"compact",compactionResult:{..._,userDisplayMessage:M},displayText:L(e.options.verbose,M),result:{...s.result,...E!==void 0&&{tokensAfter:E}}}}catch(s){throw r=s instanceof Error?s.message:"reactive compaction failed",s}finally{e.onCompactEvent?.({type:"stream_mode",mode:"requesting"}),e.onQueryEvent?.({type:"response_length",op:"reset"}),e.onCompactEvent?.({type:"compact_progress",event:{type:"compact_end"}}),yRe({trigger:"manual",success:!r,durationMs:performance.now()-i,preTokens:y,postTokens:E,error:r,precomputeReuse:S}),e.onCompactEvent?.({type:"sdk_status",status:null,metadata:{compactResult:r?"failed":"success",...r&&{compactError:r}}})}};
function L(n,e){let a=ole("tip"),p=o_("app:toggleTranscript","Global","ctrl+o"),g=[...n?[]:[`(${p} to see full summary)`],...e?[e]:[],...a?[a]:[]];return fe.dim("Compacted "+g.join(`
`))};
var w="No messages to compact";
var O="Compaction failed \xB7 conversation could not be reduced below the context limit";
var A="Compaction failed \xB7 attached media exceeds size limits";
return {ce,b,D,L};}
