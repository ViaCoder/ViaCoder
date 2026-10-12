// Original 2.1.287 reset-delay declaration and complete wait-lease initialization.
// The caller owns its native-equivalent try/finally lifetime (using disposal).
export function createNativeQuotaWindowWait287({logError:d}){
var yLe=21600000;
function qLo(e,n){let r=e.headers?.get?.("anthropic-ratelimit-unified-reset");if(!r)return null;let s=Number(r);if(!Number.isFinite(s))return null;let g=Math.round(s*1000-n.now());if(g<=0)return null;return Math.min(g,yLe)}
function begin(r,ur,g,xo,Sr,s){
let Rr=void 0;if(ur&&!r.signal?.aborted)try{Rr=r.onQuotaWindowWait?.(ur,{retryAtMs:g.now()+xo,attempt:Sr,maxRetries:s})}catch(To){d(To)}let Yr=()=>{r.signal?.removeEventListener("abort",Yr);try{Rr?.()}catch(To){d(To)}Rr=void 0};if(Rr)r.signal?.addEventListener("abort",Yr,{once:!0});
return Yr;
}
return {resetDelay:qLo,begin};
}
