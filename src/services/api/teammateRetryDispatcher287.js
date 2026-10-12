// Fixed 2.1.287 chunk-mky26gaw tL and chunk-yqskxm1q Jmr, complete bodies.
// pge borrows the live task-map reader; this closure owns no queue or signal.
export function createTeammateRetryDispatcher287({pge}) {
function tL(e,n){return`${e}@${n}`}
function Jmr(e,r,s){let a=pge(tL(r,s),e);if(a?.status==="running")a.retryWake?.emit()}
return Jmr
}
