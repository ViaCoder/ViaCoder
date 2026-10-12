// Complete original 2.1.286 first-response clock and error; zero body rewrites.
export function createOfficialFirstHeader286({ROt,zQ,t,i,PA}) {
var UM=1000;
var Z3=5000;
async function n9(e,n,r,s,h=zQ){let g=o7n(s),b=new AbortController,w=r.signal??void 0,k=w?AbortSignal.any([w,b.signal]):b.signal,A,D=h.now(),M=0,W=()=>{let X=h.now(),ne=X-D;if(D=X,ne>Z3)M+=ne},B=h.setTimeout(K,UM,{unref:!0});function K(){W(),B=h.setTimeout(K,UM,{unref:!0})}let Y=h.setTimeout(()=>{W(),A=M>g/2?new ROt(M):new ASn(s,M),b.abort(A)},g);try{return await e(n,{...r,signal:k})}catch(X){if(A!==void 0&&!w?.aborted)throw t(`[first-byte] no response headers ${g/1000}s after dispatch${M>0?` (slept ${M}ms)`:""} \u2014 aborting request`,{level:"error"}),i("tengu_api_no_response_timeout",{provider:PA(),timeout_ms:g,slept_ms:M,suspended:A instanceof ROt,escalated:s.escalated}),A;throw X}finally{Y(),B()}}
function o7n(e){return e.escalated?e.retryWindowMs:e.firstWindowMs}
class ASn extends Error{deadline;sleptMs;code="StreamNoResponse";constructor(e,r){super("No response from API within the first-byte window");this.deadline=e;this.sleptMs=r;this.name="StreamNoResponseError"}}
return {n9,ASn,o7n}
}
