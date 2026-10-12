// Generated from verified Claude Code 2.1.287 complete original declarations.
export function createNativeRequestCompression287({Ae,C,Hp,Ms,Ph,Y,a,c,f,fO,i,iA,k,le,ma,o,p,ry,t,u,wg,x,y,now}) {
const Date={now};
var w="tengu_atomic_ocean";
var L="tengu_gzip_request_bodies";
var D="tengu_gentle_hammock";
var j="tengu_golden_popcorn";
var M=4096;
var U=1024;
var N=604800000;
var H=8192;
function Q(e){if(e==="ccr_worker")return k(D,!1);return k(w,!1)||k(L,!1)}
function aBo(){let e=a.CLAUDE_CODE_GZIP_REQUEST_BODY_LEVEL??k(j,0);return Number.isInteger(e)&&e>=1&&e<=9?e:void 0}
function F(e){return e==="ccr_worker"?a.CLAUDE_CODE_GZIP_CCR_REQUEST_BODIES:a.CLAUDE_CODE_GZIP_REQUEST_BODIES}
function Z(e){return e==="ccr_worker"?U:M}
function J(e){if(a.ANTHROPIC_UNIX_SOCKET)return"unix_socket";if(Hp()!==void 0&&!Ph(e))return"proxy";let n=iA();if(n?.cert!==void 0||n?.key!==void 0)return"mtls";if(a.NODE_EXTRA_CA_CERTS){let r=wg();if(!(ma()||a.CLAUDE_CODE_ENTRYPOINT==="local-agent"&&(r===void 0||r.NODE_EXTRA_CA_CERTS!==void 0)))return"custom_ca"}return}
function ymt(e,n,r,s="api"){if(!ry(e))return;let d=typeof n==="string"?n.length:void 0,l=F(s);if(l===!1)return{gzip:!1,reason:"env_off",bodyChars:d};if(!fO())return{gzip:!1,reason:"not_bun_runtime",bodyChars:d};if(d===void 0)return{gzip:!1,reason:"non_string_body",bodyChars:d};if(d<Z(s))return{gzip:!1,reason:"below_min_size",bodyChars:d};if(l===!0)return Ms().gzipRequestBody.rejectedThisProcess?{gzip:!1,reason:"latched_off",bodyChars:d}:{gzip:!0,bodyChars:d};let g=J(e);if(g!==void 0)return{gzip:!1,reason:g,bodyChars:d};if(!Q(s))return{gzip:!1,reason:"flag_off",bodyChars:d};if(oe(r))return{gzip:!1,reason:"latched_off",bodyChars:d};return{gzip:!0,bodyChars:d}}
var K=f(()=>u({type:x("error"),error:u({type:o(),message:o()})}));
var O=f(()=>u({latchedAt:C().finite(),status:C()}));
var W=f(()=>u({error:o(),reason:o()}));
var V=["The request body is not valid JSON","Failed to parse request: could not parse request body as JSON"];
var G=/^bad json: (?:invalid character |unexpected EOF$|unexpected end of JSON input$|EOF$)/;
function b(e){return{status:e.status,header:(n)=>e.headers.get(n)??void 0,bodyText:()=>ee(e)}}
function X(e){return(e.header("request-id")?.startsWith("req_")??!1)||e.header("cf-ray")!==void 0}
async function ee(e){let n=e.clone().body?.getReader();if(!n)return"";let r=new TextDecoder,s="",d=H;try{while(d>0){let{done:l,value:g}=await n.read();if(l)break;let _=g.subarray(0,d);d-=_.byteLength,s+=r.decode(_,{stream:!0})}}catch{}finally{n.cancel().catch(()=>{})}return s}
function te(e){let n;try{n=Y(e)}catch{return G.test(e.trimEnd())}let r=K().safeParse(n);if(r.success)return V.some((d)=>r.data.error.message.startsWith(d));let s=W().safeParse(n);return s.success&&s.data.reason==="bad_json"&&G.test(s.data.error)}
async function q(e){if(e.status!==400&&e.status!==403&&e.status!==415)return null;if(!X(e))return"non_anthropic_rejection";if(e.status===400&&te(await e.bodyText()))return"invalid_json_at_origin";return null}
async function u2r(e){if(e.ok)return null;return q(b(e))}
async function ne(e){if(await q(e)!==null)return"same_rejection";return e.header("request-id")?.startsWith("req_")?"api_response":"not_api_response"}
function re(){let e;try{e=le().gzipRequestBodiesLatchedOff}catch{return"unavailable"}if(e===void 0)return;let n=O().safeParse(e);return n.success?n.data:"malformed"}
function E(e,n){Ae((r)=>{let s=O().safeParse(r.gzipRequestBodiesLatchedOff);return(s.success?s.data.latchedAt===e:r.gzipRequestBodiesLatchedOff!==void 0)?{...r,gzipRequestBodiesLatchedOff:void 0}:r},n)}
function oe(e){let n=Ms().gzipRequestBody;if(n.latchedOff)return!0;if(n.persistedLatchChecked)return!1;let r=re();if(r==="unavailable")return!1;if(n.persistedLatchChecked=!0,r===void 0)return!1;if(r==="malformed")return E(void 0,e),i("tengu_gzip_request_body_latch_cleared",{reason:c("malformed")}),!1;let s=Date.now()-r.latchedAt;if(s>=0&&s<N)return n.latchedOff=!0,n.persistedLatchInEffect=!0,!0;return E(r.latchedAt,e),i("tengu_gzip_request_body_latch_cleared",{reason:s<0?c("malformed"):c("expired"),latchedStatus:r.status,latchedAgeHours:Math.max(0,Math.round(s/3600000))}),!1}
function h(){let e=Ms().gzipRequestBody;e.latchedOff=!0,e.rejectedThisProcess=!0,e.persistedLatchChecked=!0}
function S({persist:e,status:n,storageV5:r,rollout:s="api"}){h();let d=Ms().gzipRequestBody;if(e&&!d.persistedLatchInEffect&&F(s)!==!0)d.persistedLatchInEffect=!0,Ae((l)=>({...l,gzipRequestBodiesLatchedOff:{latchedAt:Date.now(),status:n}}),r);return d.persistedLatchInEffect?"persisted":"process"}
function v(e,n){switch(e){case"api":if(n==="fell_back")p("api_gzip_request_body","fell_back");else if(Ms().once("gzip_request_body_ok"))y("api_gzip_request_body");return;case"ccr_worker":if(n==="fell_back")p("ccr_worker_gzip_request_body","fell_back");else if(Ms().once("ccr_worker_gzip_request_body_ok"))y("ccr_worker_gzip_request_body");return;case"frame_publish":if(n==="fell_back")p("artifact_publish_gzip_request_body","fell_back");else if(Ms().once("artifact_publish_gzip_request_body_ok"))y("artifact_publish_gzip_request_body");return}}
function X1t(e="api"){v(e,"sent")}
function A({rejection:e,status:n,viaCloudflare:r,retryOutcome:s,retryStatus:d,latched:l,bodyChars:g,rollout:_="api"}){v(_,"fell_back"),t(`[API REQUEST] gzip request body rejected (rollout=${_} status=${n} kind=${e}); re-sent uncompressed \u2192 ${s}${d!==void 0?` status=${d}`:""}; gzip latched off: ${l}`,{level:"warn"}),i("tengu_gzip_request_body_fallback",{rollout:c(_),rejection:c(e),status:n,viaCloudflare:r,retryOutcome:c(s),retryStatus:d,latched:c(l),requestBodyChars:g})}
async function T({rejection:e,first:n,resend:r,facts:s,aborted:d,bodyChars:l,storageV5:g,rollout:_}){let z={rejection:e,status:n.status,viaCloudflare:n.header("cf-ray")!==void 0,bodyChars:l,rollout:_},m;try{m=await r()}catch(P){throw A({...z,retryOutcome:d()?"aborted":"network_error",retryStatus:void 0,latched:S({persist:!1,status:n.status,storageV5:g,rollout:_})}),P}let R=s(m),B=await ne(R),I=S({persist:_!=="ccr_worker"&&e==="non_anthropic_rejection"&&B==="api_response",status:n.status,storageV5:g,rollout:_});return A({...z,retryOutcome:B,retryStatus:R.status,latched:I}),m}
async function p2r({res:e,dispatch:n,finalInit:r,identityBody:s,clientRequestId:d,storageV5:l,rollout:g="api"}){let _=await u2r(e);if(_===null)return e;h(),e.body?.cancel().catch(()=>{});let{compress:z,...m}=r,R={...m,body:s};if(d!==void 0){let B=Ms().gzipRequestBody.telemetryByClientRequestId.get(d);f2r(d,{requestBodyEncoding:"identity",requestBodyChars:s.length,gzipFallbackStatus:e.status,...B!==void 0&&"gzipBlocks"in B&&{gzipBlocks:B.gzipBlocks}})}return T({rejection:_,first:b(e),resend:()=>n(R),facts:b,aborted:()=>r.signal?.aborted===!0,bodyChars:s.length,storageV5:l,rollout:g})}
function f2r(e,n){Ms().gzipRequestBody.telemetryByClientRequestId.set(e,n)}
function dBo(e){if(e===void 0)return;let n=Ms().gzipRequestBody.dispatchAtByClientRequestId,r=n.get(e);return n.delete(e),r}
return {Lut:ymt,_Fr:p2r,SFr:f2r,pMo:dBo,KNt:X1t,classifyBlockResponse287:u2r,getGzipLevel:aBo};
}

export function createNativeCompressionPadding287() {
function y_t(e){return e+`
`+Array.from({length:Math.floor(Math.random()*257)},()=>Math.random()<0.5?" ":"\t").join("")}
return y_t;
}

export function createNativeCompressionEndpoint287() {
function ry(e){try{let t=new URL(e).host;return["api.anthropic.com"].includes(t)}catch{return!1}}
return ry;
}

export function createNativeCompressionRemote287({a}) {
function ma(){return a.CLAUDE_CODE_REMOTE===!0&&a.CLAUDE_CODE_ENVIRONMENT_KIND===void 0}
return ma;
}

export function createNativeCompressionPreparation287({ymt,dBo,aBo,X1t,y_t,f2r}) {
return function prepare(A,M,D,j,s){
let K={...A,headers:M},X=A?.body,J=dBo(j),te=ymt(D,X,s),ce=te?.gzip&&typeof X==="string",Q=ce?aBo():void 0;
if(ce)K.compress=Q===void 0?"gzip":{encoding:"gzip",level:Q},X1t(),K.body=y_t(X);
if(j!==void 0&&te!==void 0){let Ze=J===void 0?{}:{requestPrepareMs:Math.round(performance.now()-J)};f2r(j,te.gzip?{requestBodyEncoding:"gzip",requestBodyChars:te.bodyChars,requestBodyGzipLevel:Q,...Ze}:{requestBodyEncoding:"identity",requestBodyChars:te.bodyChars,gzipSkipReason:te.reason,...Ze})}
return {init:K,compressed:ce,body:X,decision:te};
};
}
