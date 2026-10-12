function module0(imports){
var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {Me,wKt,s};
}
function module1(imports){
var R={"user-cancel":new DOMException("user-cancel","AbortError"),"remote-cancel":new DOMException("remote-cancel","AbortError"),shutdown:new DOMException("shutdown","AbortError"),interrupt:new DOMException("interrupt","AbortError"),"turn-abort":new DOMException("turn-abort","AbortError"),background:new DOMException("background","AbortError"),"refusal-fallback-edit":new DOMException("refusal-fallback-edit","AbortError"),"recovery-timeout":new DOMException("recovery-timeout","AbortError"),"permission-stop":new DOMException("permission-stop","AbortError")};
function fl(e){return R[e]};
return {fl,R};
}
function module2(imports){
function yo(t){return t};
return {yo};
}
function module3(imports){
const c=imports["c"];
const yo=imports["yo"];
const n=imports["n"];
function Ge(){let e=c()?.sessionId;if(e)return yo(e);let t=n();return t.identity.mainAgentId(t.id)};
return {Ge};
}
function module4(imports){
function tb(e){return e.mode==="poll-event"};
return {tb};
}
function module5(imports){
function Oy(e){return e?.kind==="human"};
function iZn(e){return e?.kind==="human"||e?.kind==="auto-continuation"};
function Hy(e){return e===void 0||e.kind==="human"||e.kind==="auto-continuation"};
function rm(e,n){if(n)return;return typeof e==="object"&&e!==null&&"kind"in e&&e.kind==="human"?{kind:"human"}:void 0};
return {iZn,Oy,Hy,rm};
}
function module6(imports){
const Ge=imports["Ge"];
const tb=imports["tb"];
const iZn=imports["iZn"];
const Hy=imports["Hy"];
const k=imports["k"];
function Hhe(e){return Array.isArray(e)&&e.some((n)=>n.type==="tool_result")};
function ilt(e){return e.mode==="poll-event"||e.mode==="task-notification"||e.skipAttachments===!0};
function Ku(e){return e.agentId===Ge()};
var Abn=new Set(["task-notification","poll-event"]);
function Pbn(e){return!Abn.has(e)};
function tf(e){return Pbn(e.mode)&&!e.isMeta&&Hy(e.origin)&&!ilt(e)};
function Xf(e){return Ku(e)&&e.passive!==!0};
function B7(e){return Xf(e)&&!tb(e)};
function Mln(e){return B7(e)&&e.mode==="prompt"&&e.shouldQuery!==!1&&!e.isMeta&&iZn(e.origin)};
function Jsn(){return k("tengu_velvet_panda",!0)};
function Mxr(){return Jsn()&&k("tengu_bubbly_meteor",!0)};
return {Mln,B7,Xf,Ku,tf,Pbn,Abn,ilt,Hhe,Mxr,Jsn};
}
function module7(imports){
function sM(e){if(typeof e==="string")return e.trim().startsWith("/");if(!Array.isArray(e))return!1;let n=e.at(-1);return n?.type==="text"&&typeof n.text==="string"&&n.text.trim().startsWith("/")};
return {sM};
}
function module8(imports){
const Hhe=imports["Hhe"];
function XRn(e){let n=new Map,o=new Set;for(let r=e.length-1;r>=0;r--){let s=e[r];if(s.type==="assistant"){for(let f of s.message.content)if(f.type==="tool_use")n.set(f.id,f.name);continue}if(s.type!=="user")continue;let u=s.message.content;if(!Hhe(u)){if(s.isMeta!==!0)break;continue}for(let f of u)if(typeof f!=="string"&&f.type==="tool_result")o.add(f.tool_use_id)}for(let r of o)n.delete(r);return n};
return {XRn};
}
function module9(imports){
function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function bn(n){return r(n)};
return {c,r,bn,S};
}
function module10(imports){
const bn=imports["bn"];
const S=imports["S"];
function tme(n){if(typeof n!=="string")return;return/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(n)?bn(n):S("nonconforming")};
return {tme};
}
function module11(imports){
const i=imports["i"];
const c=imports["c"];
const tme=imports["tme"];
function p(e,r,u){i("tengu_feature_sad",{...u,feature_name:c(e),error_code:tme(r)})};
return {p};
}
function module12(imports){
const Me=imports["Me"];
const Dr=imports["Dr"];
const qEt=imports["qEt"];
const fl=imports["fl"];
const d=imports["d"];
const Mln=imports["Mln"];
const Oy=imports["Oy"];
const tf=imports["tf"];
const sM=imports["sM"];
const Xf=imports["Xf"];
const XRn=imports["XRn"];
const p=imports["p"];
function Ra(e){try{e()}catch(r){d(r)}};
class Pm{messageQueue;drain;enabled;transcript;delivery;turnChanged=Me();turn={isRunning:!1,isCompacting:!1};taken=new Set;pressed=[];constructor({messageQueue:e,drain:r,enabled:n,transcript:s,session:g,taskRegistry:w,clock:h}){this.messageQueue=e,this.drain=r,this.enabled=n,this.transcript=s;let{turn:M}=this,v=()=>M.isRunning&&r.turnUnderWay&&!r.endSessionRequested&&!Dr();this.delivery=new qEt({turn:{agentId:void 0,guard:{get isActive(){return v()},get isRunning(){return v()},subscribe:this.turnChanged.subscribe},get abortController(){return r.abortController??null},readEvidence:()=>({isHeldByDialog:!1,isToolCallStarting:!1,isCompacting:M.isCompacting,isMainRequestAnnounced:!0}),interruptForSubmit:()=>r.abortController?.abort(fl("interrupt")),endsUnmovableShells:!1},messageQueue:e,transcript:s,session:g,taskRegistry:w,clock:h,featureName:"print_send_now"})}takeBeforeEnqueue(e){Ra(()=>{if(e.priority!=="now")return;for(let r of this.pressed.splice(0))this.messageQueue.promoteToNow(r);if(e.uuid===void 0||!this.turn.isRunning||this.drain.endSessionRequested||Dr()||!n_(e)||this.messageQueue.getCommandQueueSnapshot().some(Xf)||XRn(this.transcript.getSnapshot()).size===0||!this.enabled())return;e.priority="next",this.taken.add(e.uuid)})}press(e){Ra(()=>{let{uuid:r}=e;if(r===void 0||!this.taken.delete(r))return;if(!this.delivery.sendQueuedNow()){p("print_send_now","declined"),this.messageQueue.promoteToNow(r);return}this.pressed.push(r)})}pressWaiting(){let e=!1;return Ra(()=>{let r=this.messageQueue.getCommandQueueSnapshot().filter(Xf);if(r.length===0||!this.turn.isRunning||this.drain.endSessionRequested||Dr()||!r.every((s)=>s.priority!=="now"&&n_(s))||XRn(this.transcript.getSnapshot()).size===0||!this.enabled())return;if(e=this.delivery.sendQueuedNow(),!e){p("print_send_now","declined");return}let n=r[0]?.uuid;if(n!==void 0)this.pressed.splice(0,this.pressed.length,n)}),e}isTaking(e){return e.uuid!==void 0&&this.taken.has(e.uuid)}noteTurnStart(){this.turn.isRunning=!0,this.turn.isCompacting=!1,this.turnChanged.emit()}noteFrame(e){if(e.type==="system"&&e.subtype==="status"&&e.status!=="requesting")this.turn.isCompacting=e.status==="compacting"}noteTurnEnd(){this.turn.isRunning=!1,this.turn.isCompacting=!1,this.taken.clear(),this.pressed.length=0,this.turnChanged.emit()}dispose(){this.delivery.dispose(),this.turnChanged.clear()}};
function n_(e){return Mln(e)&&Oy(e.origin)&&tf(e)&&e.verifiedSlackHumanTurn!==!0&&!e.wait&&!sM(e.value)};
return {Pm,Ra,n_};
}
export function createPrintInputDeliveryRuntime287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({"c":ports["legacyContext"],"yo":m2["yo"],"n":ports["executionContext"]});
const m4=module4({});
const m5=module5({});
const m6=module6({"Ge":m3["Ge"],"tb":m4["tb"],"iZn":m5["iZn"],"Hy":m5["Hy"],"k":ports["feature"]});
const m7=module7({});
const m8=module8({"Hhe":m6["Hhe"]});
const m9=module9({});
const m10=module10({"bn":m9["bn"],"S":m9["S"]});
const m11=module11({"i":ports["analytics"],"c":m9["c"],"tme":m10["tme"]});
const m12=module12({"Me":m0["Me"],"Dr":ports["midTurnFoldCommitted"],"qEt":ports["Coordinator"],"fl":m1["fl"],"d":ports["logError"],"Mln":m6["Mln"],"Oy":m5["Oy"],"tf":m6["tf"],"sM":m7["sM"],"Xf":m6["Xf"],"XRn":m8["XRn"],"p":m11["p"]});
return {"Delivery":m12["Pm"],"enabled":m6["Mxr"],"humanOrigin":m5["rm"],"isMainThread":m6["Xf"]};
}
