// Complete fixed287 branch; only loop control is transported to its original caller.
export function createTaskEndSession287(ports){
const {t,qe,ll,Q,fl,Oo,Pt,On,Ze}=ports;
function $A(e,r){return parseInt(r??"1",10)>1&&e==="archived"}
return function taskEndSession287(A){
if($A(A.request.reason,process.env.CLAUDE_CODE_WORKER_EPOCH)){t("[print.ts] stale 'archived' end_session ignored on epoch>1 \u2014 from prior lifecycle"),Ze(A);return "continue";}if(t(`[print.ts] end_session received, reason=${A.request.reason??"unspecified"}`),qe.endSessionRequested=!0,ll(),Q.suspendMidTurnFold(),qe.abortController)qe.abortController.abort(fl("shutdown"));Oo(),Pt.abort(),On.discard(),Ze(A);return "break";
};
}
