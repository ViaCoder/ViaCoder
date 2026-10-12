// Complete original 2.1.286 deadline/arming/gates and retry classifiers; zero body rewrites.
export function createOfficialRequestDeadline286({a,wi,He,hw,gw,Y3,eQe}) {
var mw=1e4;
var J3=32768;
function Ako(e,{escalated:n}){wi().streamFirstByteArmedRequestIds.set(e,{escalated:n})}
function Q3(e){if(e===void 0)return;let n=wi().streamFirstByteArmedRequestIds,r=n.get(e);return n.delete(e),r}
var YM="/invoke-with-response-stream";
function t9({clientRequestId:e,provider:n,routedProvider:r,method:s,url:h,body:g}){let b=Q3(e),w=b===void 0&&n==="bedrock"&&s==="POST"&&h.includes(YM);if(b===void 0&&!w||!pWn(r))return;let k=typeof g==="string"?Buffer.byteLength(g):0,A=Math.ceil(k/J3)*1000,D=eQe(process.env.API_TIMEOUT_MS,600000),M=D<=0?1/0:D-1000;if(M<mw)return;let W=Y3(n)+A,B=Math.min(W,M);if(b===void 0)return{escalated:!1,firstWindowMs:B,retryWindowMs:B};let K=Number.isFinite(M)?M:Math.max(W,pGo+A);return{escalated:b.escalated,firstWindowMs:B,retryWindowMs:K}}
function QM(e){return e==="firstParty"||e==="gateway"||e==="anthropicAws"}
function eI(){return a.CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK}
function WM(e){return gw(e)||e==="bedrock"&&eI()}
function pWn(e){if(!hw())return!1;return WM(e)&&WM(He())}
var pGo=600000;
return {Ako,Q3,t9,QM,WM,pWn}
}
export function createOfficialNoResponseRetry286({a,ASn}) {
function YG(n,e,t=5){let r=n;for(let o=0;o<t;o++){if(!(r instanceof Error))return;if(e(r))return r;r=r.cause}return}
function ljt(e){let r=YG(e,(n)=>n instanceof ASn);return r instanceof ASn?r:void 0}
var HLt=1;
function v4(){return a.CLAUDE_CODE_RETRY_WATCHDOG}
function NLt(e,n,r,s,g){let h=r;if(e.noResponse&&!v4())h=Math.min(h,n+HLt-s);if(g!==void 0)h=Math.min(h,n+g);return h}
return {ljt,v4,NLt,HLt}
}
