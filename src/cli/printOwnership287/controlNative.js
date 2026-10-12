function module0(imports){
function yo(t){return t};
var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function tn(t){if(typeof t!=="string")return null;return d.test(t)?t:null};
return {yo,tn,d};
}
function module1(imports){
const c=imports["c"];
const yo=imports["yo"];
const n=imports["n"];
function Ge(){let e=c()?.sessionId;if(e)return yo(e);let t=n();return t.identity.mainAgentId(t.id)};
return {Ge};
}
function module2(imports){
const Ge=imports["Ge"];
function Ku(e){return e.agentId===Ge()};
function Kce(e){return Ku(e)&&e.mode==="prompt"};
function QTo(e){let n=e[0]?.ccrTurnId;return e.every((r)=>r.ccrTurnId===n)?n:void 0};
return {Ku,QTo,Kce};
}
function module3(imports){
function wxt(){return{disclosures:[],staleRows:[],watchLifecycle:[]}};
return {wxt};
}
function module4(imports){
function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function bn(n){return r(n)};
return {c,r,bn,S};
}
function module5(imports){
const bn=imports["bn"];
const S=imports["S"];
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}};
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")};
return {P,tme};
}
function module6(imports){
const i=imports["i"];
const c=imports["c"];
const tme=imports["tme"];
function m(e,r,u){i("tengu_feature_bad",{...u,feature_name:c(e),error_code:tme(r)})};
return {m};
}
function module7(imports){
const P=imports["P"];
const m=imports["m"];
function tb(e){return e.mode==="poll-event"};
function vre(e,n){let r=!1;for(let s of e){if(s.pollEvent===void 0)continue;r=!0,s.pollEvent.settleDropped?.(new P(`poll event discarded undelivered: ${n}`,"poll event discarded undelivered"))}if(r)m("poll_event_delivery","discarded")};
return {vre,tb};
}
function module8(imports){
var u=8;
function Kwo(n){let t=n.findLast((e)=>e.traceContext)?.traceContext;if(!t)return{parent:void 0,linked:[]};let r=new Set([t.traceparent]),o=[];for(let{traceContext:e}of n)if(e&&!r.has(e.traceparent))r.add(e.traceparent),o.push(e);return{parent:t,linked:o.slice(-u)}};
return {Kwo,u};
}
function module9(imports){
const tn=imports["tn"];
function Hy(e){return e===void 0||e.kind==="human"||e.kind==="auto-continuation"};
function z3r(e){return e.findLast((n)=>v_t(n.turnAttributionKey)!==void 0)?.turnAttributionKey};
function v_t(e){return tn(e)??void 0};
return {z3r,v_t,Hy};
}
function module10(imports){
var R={"user-cancel":new DOMException("user-cancel","AbortError"),"remote-cancel":new DOMException("remote-cancel","AbortError"),shutdown:new DOMException("shutdown","AbortError"),interrupt:new DOMException("interrupt","AbortError"),"turn-abort":new DOMException("turn-abort","AbortError"),background:new DOMException("background","AbortError"),"refusal-fallback-edit":new DOMException("refusal-fallback-edit","AbortError"),"recovery-timeout":new DOMException("recovery-timeout","AbortError"),"permission-stop":new DOMException("permission-stop","AbortError")};
function fl(e){return R[e]};
return {fl,R};
}
function module11(imports){
const Ku=imports["Ku"];
const wxt=imports["wxt"];
const Pa=imports["Pa"];
const qQt=imports["qQt"];
const vre=imports["vre"];
const tb=imports["tb"];
const Kwo=imports["Kwo"];
const z3r=imports["z3r"];
const QTo=imports["QTo"];
const Kce=imports["Kce"];
const Hy=imports["Hy"];
const Dr=imports["Dr"];
const nJe=imports["nJe"];
const fl=imports["fl"];
function MP(e){return typeof e==="string"?[{type:"text",text:e}]:e};
function EP(e){if(e.length===1)return e[0];if(e.every((r)=>typeof r==="string"))return e.join(`
`);return e.flatMap(MP)};
function Oc(e){let r=e[0];if(e.length===1)return r;let n=Kwo(e),s=e.findLast((g)=>g.uuid)??r;return{...r,value:EP(e.map((g)=>g.value)),uuid:s.uuid,frameTiming:s.frameTiming,turnAttributionKey:z3r(e),traceContext:n.parent,linkedTraceContexts:n.linked,attachmentSourceUuid:void 0,deliveryId:void 0,fileAttachments:e.flatMap((g)=>g.fileAttachments??[]),clientPlatform:e.find((g)=>g.clientPlatform)?.clientPlatform??r.clientPlatform,ccrTurnId:QTo(e),...e.some((g)=>g.stampThreadState)&&{stampThreadState:!0}}};
function _Fc_commit_287(e){let r=e.members.filter((n)=>n.uuid!==void 0&&this.messageQueue.consumeCancelPending(n.uuid));if(r.length>0){vre(r.filter(tb),"cancelled by the host"),this.revokeCodeliveredFollowups(r);for(let s of r)if(!this.messageQueue.consumeCancelPendingAcked(s.uuid))this.io.onCommandLifecycle?.(s.uuid,"cancelled");let n=e.members.filter((s)=>!r.includes(s));if(n.length===0){this.prewaitLatch.dropParkedBatch();return}e.members.length=0,e.members.push(...n),e.command=Oc(e.members),e.uuids.length=0,e.uuids.push(...e.members.map((s)=>s.uuid).filter((s)=>s!==void 0))}return e};
function $y({messageQueue:e,drain:r,prewaitLatch:n,frameIntake:s,io:g,pressed:w,standsFor:h,deliver:M}){let v=w!==void 0&&w!==null&&w!=="",R=r.pendingDispatchUuids.filter((z)=>!e.hasCancelPendingAcked(z)),U=e.getCommandQueueSnapshot().filter((z)=>{let he=z.uuid&&h?.(z.uuid);return he?!v||he===w:Kce(z)&&!z.isMeta&&Hy(z.origin)&&z.shouldQuery!==!1&&z.passive!==!0&&(!v||z.uuid===w)}),H=r.abortController,I;if(U.length===0)I=(v?R.some((z)=>(h?.(z)??z)===w)||s.parkedUuids().some((z)=>z===w):R.length>0&&r.intentBatchInFlight||s.hasParked())?"delivering":"nothing_waiting";else if(!r.turnUnderWay||H===void 0||H.signal.aborted||r.endSessionRequested||Dr()||U.every(({uuid:z})=>z!==void 0&&e.isFoldInFlight(z))||M?.()===!0)I="delivering";else nJe(),H.abort(fl("remote-cancel")),I="stopped";let{receipt:de}=km({cancelQueued:!1,messageQueue:e,drain:r,prewaitLatch:n,frameIntake:s,io:g});return{still_queued:de.still_queued,send_now:I}};
function Ky({drain:e,prewaitLatch:r}){if(nJe(),e.abortController)e.abortController.abort(fl("remote-cancel"));else r.interruptBeforeArm()};
function km({cancelQueued:e,messageQueue:r,drain:n,prewaitLatch:s,frameIntake:g,io:w}){let h=r.getCommandQueueSnapshot().filter(Ku).map((R)=>R.uuid).filter((R)=>R!==void 0),M=wxt(),v;if(e){let R=r.removeByFilter(Ku,{reason:"cleared_on_cancel"});Pa(R),M=qQt(R),vre(R.filter(tb),"interrupt cleared the queue");let U=g?.cancelParked()??[];for(let I of U)w.onCommandLifecycle?.(I,"cancelled");let H=new Set([...M.staleRows,...M.watchLifecycle].map((I)=>I.uuid));for(let I of R)if(I.uuid!==void 0&&!H.has(I.uuid))w.onCommandLifecycle?.(I.uuid,"cancelled");s.clearIfNothingPending();for(let I of n.pendingDispatchUuids)if(r.markCancelPending(I,{terminalEmitted:!0}))w.onCommandLifecycle?.(I,"cancelled");v={still_queued:[],cancelled:[...n.pendingDispatchUuids,...h.filter((I)=>!H.has(I)&&!0),...U]}}else v={still_queued:[...n.pendingDispatchUuids.filter((R)=>!r.hasCancelPendingAcked(R)),...h,...g?.parkedUuids()??[]]};return{receipt:v,clearSurvivors:M}};
class wm{interruptBeforeTurnArmed=!1;intentDispatchPendingPreArm=!1;latchDoomedCommands=null;latchedWhileBatchParked=!1;messageQueue;commandLacksUserIntent;unsubscribeRemovals;constructor({messageQueue:e,commandLacksUserIntent:r}){this.messageQueue=e,this.commandLacksUserIntent=r,this.unsubscribeRemovals=e.subscribeToRemovals(()=>this.clearIfNothingPending())}interruptBeforeArm(){if(!(this.intentDispatchPendingPreArm||this.messageQueue.getCommandQueue().some((e)=>this.isUserIntent(e))))return;this.interruptBeforeTurnArmed=!0,this.latchedWhileBatchParked=this.intentDispatchPendingPreArm,this.latchDoomedCommands=new WeakSet(this.messageQueue.getCommandQueue().filter((e)=>this.isUserIntent(e)))}isDoomBoundary(e,r){return this.interruptBeforeTurnArmed&&this.latchDoomedCommands!==null&&this.latchDoomedCommands.has(e)!==this.latchDoomedCommands.has(r)}parkBatch(e){this.intentDispatchPendingPreArm=e}dropParkedBatch(){this.reset(),this.intentDispatchPendingPreArm=!1}consumeAtArm(e,r){if(this.intentDispatchPendingPreArm=!1,this.interruptBeforeTurnArmed&&r&&(this.latchedWhileBatchParked||e.some((n)=>this.latchDoomedCommands?.has(n)??!1)))return this.reset(),!0;return!1}reset(){this.interruptBeforeTurnArmed=!1,this.latchDoomedCommands=null,this.latchedWhileBatchParked=!1}clearIfNothingPending(){let e=this.latchDoomedCommands;if(this.interruptBeforeTurnArmed&&!this.intentDispatchPendingPreArm&&!(e!==null&&this.messageQueue.getCommandQueue().some((r)=>e.has(r)&&this.isUserIntent(r))))this.reset()}dispose(){this.unsubscribeRemovals()}isUserIntent(e){return Ku(e)&&!this.commandLacksUserIntent(e)}};
function hd(e){return e.shouldQuery===!1&&e.queryHeldForNextTurn!==!0||tb(e)||e.pollEmptyDispatch===!0||e.passive===!0};
return {km,_Fc_commit_287,Oc,EP,MP,$y,Ky,hd,wm};
}
function module12(imports){
function KZe(e){return e.send_now===!0&&e.cancel_queued!==!0};
return {KZe};
}
export function createPrintControlRuntime287(ports){
const m0=module0({});
const m1=module1({"c":ports["legacyContext"],"yo":m0["yo"],"n":ports["executionContext"]});
const m2=module2({"Ge":m1["Ge"]});
const m3=module3({});
const m4=module4({});
const m5=module5({"bn":m4["bn"],"S":m4["S"]});
const m6=module6({"i":ports["analytics"],"c":m4["c"],"tme":m5["tme"]});
const m7=module7({"P":m5["P"],"m":m6["m"]});
const m8=module8({});
const m9=module9({"tn":m0["tn"]});
const m10=module10({});
const m11=module11({"Ku":m2["Ku"],"wxt":m3["wxt"],"Pa":ports["revokeCodeliveredFollowups"],"qQt":ports["cancelArtifactHandoffs"],"vre":m7["vre"],"tb":m7["tb"],"Kwo":m8["Kwo"],"z3r":m9["z3r"],"QTo":m2["QTo"],"Kce":m2["Kce"],"Hy":m9["Hy"],"Dr":ports["midTurnFoldCommitted"],"nJe":ports["noteStop"],"fl":m10["fl"]});
const m12=module12({});
return {"cancelQueue":m11["km"],"commitBatch":m11["_Fc_commit_287"],"sendNow":m11["$y"],"interrupt":m11["Ky"],"isSendNow":m12["KZe"],"commandLacksUserIntent":m11["hd"],"prewaitLatch":m11["wm"],"abortReason":m10["fl"]};
}
