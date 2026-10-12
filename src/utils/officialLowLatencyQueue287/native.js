// Generated exact nested source cuts from official 2.1.287 darwin-arm64; see provenance.json.
class qi{committed=!1}
var Hi=new qi;
function Dr(){return Hi.committed}
function Xoe(){Hi.committed=!0}
export function commitOfficialMidTurnFold287(){Xoe()}
export {Dr as isOfficialMidTurnFoldCommitted287};
export function createOfficialLowLatencyQueueOps287(ports){
const g=ports.commands;
// Exact zOr lexical state: D is cancel-pending insertion order; j is terminal-acked UUIDs; cap z=256.
const D=new Set(),j=new Set(),z=256;
const ve=new Set();
let qe=!1;
const K=ports.notify;
const Dr=()=>Hi.committed;
function he(Yo,qr){if(D.delete(Yo))D.add(Yo);else{if(qr?.terminalEmitted!==!0&&D.size>=z){let Lr;for(let Kr of D)if(!j.has(Kr)){Lr=Kr;break}if(Lr!==void 0)D.delete(Lr)}D.add(Yo)}if(qr?.terminalEmitted!==!0)return!1;if(j.has(Yo))return!1;return j.add(Yo),!0}
function _e(Yo){return D.delete(Yo)}
function ke(Yo){return j.delete(Yo)}
function be(Yo){return j.has(Yo)}
function Te(Yo){for(let qr of Yo)if(qr.uuid!==void 0)ve.add(qr.uuid)}
function xe(Yo){for(let qr of Yo)if(qr.uuid!==void 0)ve.delete(qr.uuid)}
function Pe(Yo){return ve.has(Yo)}
function Qe(){if(qe)return;qe=!0,K()}
function ht(Yo){let qr=g.find((Lr)=>Lr.uuid===Yo);if(qr===void 0||qr.priority==="now"||ve.has(Yo))return!1;return qr.priority="now",K(),!0}
function kt(Yo,qr){let Lr=g.find((Kr)=>Kr.uuid===Yo);if(Lr===void 0||Lr.priority!=="now")return!1;return Lr.priority=qr,K(),!0}
function $t(){return qe||Dr()}
let $e=new Map;
function Ne(Yo){if(Yo===void 0)return{withdrawn:()=>!1,[Symbol.dispose]:()=>{}};let qr={withdrawn:!1};return $e.set(Yo,qr),{withdrawn:()=>qr.withdrawn,[Symbol.dispose]:()=>{if($e.get(Yo)===qr)$e.delete(Yo)}}}
function We(Yo){let qr=$e.get(Yo);if(qr===void 0||qr.withdrawn)return!1;return qr.withdrawn=!0,!0}
let It=null;
let jt;
function Xt(Yo){It=Yo,jt=void 0}
function un(Yo){if(Yo===void 0||It===Yo)It=null,jt=void 0}
function rn(Yo){return It!==null&&It.some(Yo)}
let Yt=new Set;
function Qt(Yo){return Yt.add(Yo),{[Symbol.dispose]:()=>{Yt.delete(Yo)}}}
function nn(Yo){for(let qr of Yt)if(Yo(qr))return!0;return!1}
function Pn(Yo){let qr=new Set(Yo.map((Kr)=>Kr.uuid));for(let Kr of Yt)if(Kr.uuid!==void 0&&qr.has(Kr.uuid))Yt.delete(Kr);let Lr=(It??[]).flatMap((Kr)=>Kr.uuid===void 0?[]:[Kr.uuid]);if(Lr.length>0&&jt!=="appended")jt=Lr.some((Kr)=>qr.has(Kr))?"appended":"passed-over"}
function $n(){return jt}
let qn=Promise.resolve();
function En(){let Yo=qn,qr;return qn=new Promise((Lr)=>{qr=Lr}),{prior:Yo,release:qr}}
// Exact original zOr poll-admission cell; b is only a view of the existing notify callback.
const b={emit:ports.notify},at=ports.isAbort,t=ports.debug,d=ports.logError;
let qs=0;
function Vs(){qs++};
function fs(){if(qs===0)return;if(qs--,qs===0)try{b.emit()}catch(Yo){if(at(Yo))t(`queueChanged listener aborted: ${Yo}`);else d(Yo)}};
function Qi(){return qs};
function resetCancelPending(){D.clear();j.clear()}
return {beginPollEventAdmission:Vs,endPollEventAdmission:fs,pollEventAdmissionsPending:Qi,markCancelPending:he,consumeCancelPending:_e,consumeCancelPendingAcked:ke,hasCancelPendingAcked:be,resetCancelPending,registerFoldInFlight:Te,unregisterFoldInFlight:xe,isFoldInFlight:Pe,suspendMidTurnFold:Qe,isMidTurnFoldSuspended:$t,promoteToNow:ht,demoteFromNow:kt,beginInboundIngest:Ne,withdrawInboundIngest:We,setInFlightDrainBatch:Xt,clearInFlightDrainBatch:un,someInFlightDrainCommand:rn,trackSubmission:Qt,someSubmissionInFlight:nn,noteTurnAppended:Pn,getInFlightDrainBatchStanding:$n,takeInboundEnqueueTurn:En};
}
