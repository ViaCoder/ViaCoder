// Generated from verified 2.1.286 original declarations. Regenerate with scripts/official/vendor-request-compression-286.mjs.
import {f} from './nativeMemo.js'
export function createNativeRequestCompression286(ports) {
  const {b0, Bh, c, C, ce, i, J, o, p, t, Te, u, wi, x, y, F, Q, Y, Z} = ports
  const Date = {now: ports.now}
var M=604800000;
var H=8192;
function Lut(e,n,r,s="api"){if(!Bh(e))return;let d=typeof n==="string"?n.length:void 0,l=F(s);if(l===!1)return{gzip:!1,reason:"env_off",bodyChars:d};if(!b0())return{gzip:!1,reason:"not_bun_runtime",bodyChars:d};if(d===void 0)return{gzip:!1,reason:"non_string_body",bodyChars:d};if(d<Y(s))return{gzip:!1,reason:"below_min_size",bodyChars:d};if(l===!0)return wi().gzipRequestBody.rejectedThisProcess?{gzip:!1,reason:"latched_off",bodyChars:d}:{gzip:!0,bodyChars:d};let g=Z(e);if(g!==void 0)return{gzip:!1,reason:g,bodyChars:d};if(!Q(s))return{gzip:!1,reason:"flag_off",bodyChars:d};if(se(r))return{gzip:!1,reason:"latched_off",bodyChars:d};return{gzip:!0,bodyChars:d}}
var K=f(()=>u({type:x("error"),error:u({type:o(),message:o()})}));
var O=f(()=>u({latchedAt:C().finite(),status:C()}));
var W=f(()=>u({error:o(),reason:o()}));
var V=["The request body is not valid JSON","Failed to parse request: could not parse request body as JSON"];
var k=/^bad json: (?:invalid character |unexpected EOF$|unexpected end of JSON input$|EOF$)/;
function b(e){return{status:e.status,header:(n)=>e.headers.get(n)??void 0,bodyText:()=>ee(e)}}
function X(e){return(e.header("request-id")?.startsWith("req_")??!1)||e.header("cf-ray")!==void 0}
async function ee(e){let n=e.clone().body?.getReader();if(!n)return"";let r=new TextDecoder,s="",d=H;try{while(d>0){let{done:l,value:g}=await n.read();if(l)break;let _=g.subarray(0,d);d-=_.byteLength,s+=r.decode(_,{stream:!0})}}catch{}finally{n.cancel().catch(()=>{})}return s}
function te(e){let n;try{n=J(e)}catch{return k.test(e.trimEnd())}let r=K().safeParse(n);if(r.success)return V.some((d)=>r.data.error.message.startsWith(d));let s=W().safeParse(n);return s.success&&s.data.reason==="bad_json"&&k.test(s.data.error)}
async function B(e){if(e.status!==400&&e.status!==403&&e.status!==415)return null;if(!X(e))return"non_anthropic_rejection";if(e.status===400&&te(await e.bodyText()))return"invalid_json_at_origin";return null}
async function ne(e){if(e.ok)return null;return B(b(e))}
async function re(e){if(await B(e)!==null)return"same_rejection";return e.header("request-id")?.startsWith("req_")?"api_response":"not_api_response"}
function oe(){let e;try{e=ce().gzipRequestBodiesLatchedOff}catch{return"unavailable"}if(e===void 0)return;let n=O().safeParse(e);return n.success?n.data:"malformed"}
function G(e,n){Te((r)=>{let s=O().safeParse(r.gzipRequestBodiesLatchedOff);return(s.success?s.data.latchedAt===e:r.gzipRequestBodiesLatchedOff!==void 0)?{...r,gzipRequestBodiesLatchedOff:void 0}:r},n)}
function se(e){let n=wi().gzipRequestBody;if(n.latchedOff)return!0;if(n.persistedLatchChecked)return!1;let r=oe();if(r==="unavailable")return!1;if(n.persistedLatchChecked=!0,r===void 0)return!1;if(r==="malformed")return G(void 0,e),i("tengu_gzip_request_body_latch_cleared",{reason:c("malformed")}),!1;let s=Date.now()-r.latchedAt;if(s>=0&&s<M)return n.latchedOff=!0,n.persistedLatchInEffect=!0,!0;return G(r.latchedAt,e),i("tengu_gzip_request_body_latch_cleared",{reason:s<0?c("malformed"):c("expired"),latchedStatus:r.status,latchedAgeHours:Math.max(0,Math.round(s/3600000))}),!1}
function q(){let e=wi().gzipRequestBody;e.latchedOff=!0,e.rejectedThisProcess=!0,e.persistedLatchChecked=!0}
function S({persist:e,status:n,storageV5:r,rollout:s="api"}){q();let d=wi().gzipRequestBody;if(e&&!d.persistedLatchInEffect&&F(s)!==!0)d.persistedLatchInEffect=!0,Te((l)=>({...l,gzipRequestBodiesLatchedOff:{latchedAt:Date.now(),status:n}}),r);return d.persistedLatchInEffect?"persisted":"process"}
function I(e,n){switch(e){case"api":if(n==="fell_back")p("api_gzip_request_body","fell_back");else if(wi().once("gzip_request_body_ok"))y("api_gzip_request_body");return;case"ccr_worker":if(n==="fell_back")p("ccr_worker_gzip_request_body","fell_back");else if(wi().once("ccr_worker_gzip_request_body_ok"))y("ccr_worker_gzip_request_body");return;case"frame_publish":if(n==="fell_back")p("artifact_publish_gzip_request_body","fell_back");else if(wi().once("artifact_publish_gzip_request_body_ok"))y("artifact_publish_gzip_request_body");return}}
function KNt(e="api"){I(e,"sent")}
function A({rejection:e,status:n,viaCloudflare:r,retryOutcome:s,retryStatus:d,latched:l,bodyChars:g,rollout:_="api"}){I(_,"fell_back"),t(`[API REQUEST] gzip request body rejected (rollout=${_} status=${n} kind=${e}); re-sent uncompressed \u2192 ${s}${d!==void 0?` status=${d}`:""}; gzip latched off: ${l}`,{level:"warn"}),i("tengu_gzip_request_body_fallback",{rollout:c(_),rejection:c(e),status:n,viaCloudflare:r,retryOutcome:c(s),retryStatus:d,latched:c(l),requestBodyChars:g})}
async function P({rejection:e,first:n,resend:r,facts:s,aborted:d,bodyChars:l,storageV5:g,rollout:_}){let m={rejection:e,status:n.status,viaCloudflare:n.header("cf-ray")!==void 0,bodyChars:l,rollout:_},z;try{z=await r()}catch(w){throw A({...m,retryOutcome:d()?"aborted":"network_error",retryStatus:void 0,latched:S({persist:!1,status:n.status,storageV5:g,rollout:_})}),w}let h=s(z),E=await re(h),v=S({persist:_!=="ccr_worker"&&e==="non_anthropic_rejection"&&E==="api_response",status:n.status,storageV5:g,rollout:_});return A({...m,retryOutcome:E,retryStatus:h.status,latched:v}),z}
async function _Fr({res:e,dispatch:n,finalInit:r,identityBody:s,clientRequestId:d,storageV5:l,rollout:g="api"}){let _=await ne(e);if(_===null)return e;q(),e.body?.cancel().catch(()=>{});let{compress:m,...z}=r,h={...z,body:s};if(d!==void 0)SFr(d,{requestBodyEncoding:"identity",requestBodyChars:s.length,gzipFallbackStatus:e.status});return P({rejection:_,first:b(e),resend:()=>n(h),facts:b,aborted:()=>r.signal?.aborted===!0,bodyChars:s.length,storageV5:l,rollout:g})}
function SFr(e,n){wi().gzipRequestBody.telemetryByClientRequestId.set(e,n)}
function pMo(e){if(e===void 0)return;let n=wi().gzipRequestBody.dispatchAtByClientRequestId,r=n.get(e);return n.delete(e),r}
  return {Lut, _Fr, SFr, pMo, KNt, classifyBlockResponse287: ne}
}
