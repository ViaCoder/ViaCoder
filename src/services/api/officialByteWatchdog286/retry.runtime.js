// Verified original 2.1.286 sleep and retry-wake cancellation; complete bodies unchanged.
export function createOfficialRetrySleep286({zQ,dd}) {
function Z(t,r,e){return new Promise((o,n)=>{if(r?.aborted){if(e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o();return}let m=(e?.clock??zQ).setTimeout(()=>{r?.removeEventListener("abort",i),o()},t,{unref:e?.unref});function i(){if(m(),e?.throwOnAbort||e?.abortError)n(e.abortError?.()??Error("aborted"));else o()}r?.addEventListener("abort",i,{once:!0})})}
var wse=()=>new dd;
async function LLt(e,n){let r=n.clock??zQ;if(!n.subscribeRetryWake)return await Z(e,n.signal,{abortError:wse,clock:r}),!1;if(n.signal?.aborted)throw wse();let s=!1,g=new AbortController,h=n.subscribeRetryWake(()=>{s=!0,g.abort()}),b=()=>g.abort();n.signal?.addEventListener("abort",b,{once:!0});try{if(await Z(e,g.signal,{clock:r}),n.signal?.aborted)throw wse();return s}finally{h(),n.signal?.removeEventListener("abort",b)}}
return {Z,LLt};
}
