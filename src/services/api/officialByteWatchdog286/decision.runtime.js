// Verified original 2.1.286 model-call decision kernel and controller; complete bodies unchanged.
export function createOfficialModelCallRetry286({a,wi,t,R,d,i,c,Pt,lu,dd,O1}) {
var qLt={retries:0,overloaded:0,stalls:0,truncations:0,afterThinkingOnly:0,triedWithoutStreaming:!1};
var kMo=2;
var Aq=3;
var OPo=10;
var DPo=300;
var OOe=15;
function v4(){return a.CLAUDE_CODE_RETRY_WATCHDOG}
function qOe(){let e=v4(),n=a.CLAUDE_CODE_MAX_RETRIES;if(n!==void 0&&n>=0){if(n>OOe&&!e){if(wi().once("max_retries_clamp_warning"))t(`CLAUDE_CODE_MAX_RETRIES=${n} clamped to ${OOe}`,{level:"warn"});return OOe}return n}return e?DPo:OPo}
function YOe(e,n,r,s){switch(e.kind){case"noResponse":return U0(n,r);case"httpError":return yMo(e,n,r);case"streamFailed":return _Mo(e,n,r,s)}}
function U0(e,n,r={decision:"fail",counts:e}){return e.retries<n.maxRetries?{decision:"retry",counts:{...e,retries:e.retries+1}}:r}
function yMo({status:e,fallbackModelCouldHelp:n},r,s){if(e===529)return KOe(r,s,void 0);if(e===429&&s.persistent)return{decision:"retry",counts:r};if(n&&s.hasFallbackModel)return{decision:"useFallbackModel",counts:r};if(e===408||e===409||e===429||e>=500)return U0(r,s);if(e===404&&!r.triedWithoutStreaming)return Rse(r,s,!0);return{decision:"fail",counts:r}}
function _Mo({cause:e,progress:n,stopReasonReceived:r},s,g,h){let b={decision:"fail",counts:s},w={decision:"keepPartial",counts:s},D=Rse(s,g,h);if(e==="denied")return b;if(n==="output")return e==="badRequest"||e==="unknown"?b:w;if(n==="thinkingOnly")switch(e){case"stalled":return r?w:Pq("stalls",1,s,g,w);case"connectionLost":case"truncated":case"malformed":return r?w:Pq("afterThinkingOnly",2,s,g,w);case"serverError":if(r)return b;if(g.hasFallbackModel&&!g.persistent)return{decision:"useFallbackModel",counts:s};return Pq("afterThinkingOnly",2,s,g,b);case"overloaded":return r?b:KOe(s,g,h);case"badRequest":case"unknown":return b}switch(e){case"overloaded":return n==="partialOutput"?Rse({...s,overloaded:s.overloaded+1},g,h):KOe(s,g,h);case"stalled":return n==="nothing"?Pq("stalls",1,s,g,D):D;case"truncated":return r?D:Pq("truncations",1,s,g,D);case"connectionLost":return r?D:U0(s,g,D);case"serverError":case"malformed":case"badRequest":case"unknown":return D}}
function KOe(e,n,r){let s={...e,overloaded:e.overloaded+1},g=r!==void 0,h=g?Rse(s,n,r):{decision:"fail",counts:s},b={decision:"retry",counts:s};if(n.background&&!n.persistent)return g&&n.hasFallbackModel?{decision:"useFallbackModel",counts:s}:h;if(s.overloaded<n.maxOverloaded)return n.persistent?b:U0(s,n,h);if(n.hasFallbackModel)return{decision:"useFallbackModel",counts:s};if(g)return h;return n.persistent?b:U0(s,n)}
function Pq(e,n,r,s,g){return r[e]<n?U0({...r,[e]:r[e]+1},s,g):g}
function Rse(e,n,r){if(!r)return{decision:"fail",counts:e};if(e.triedWithoutStreaming&&e.retries>=n.maxRetries)return{decision:"fail",counts:e};return{decision:"retryWithoutStreaming",counts:{...e,retries:Math.min(e.retries+1,n.maxRetries),triedWithoutStreaming:!0}}}
function SMo(e,n){if(e instanceof lu)return{kind:"noResponse"};let r=e instanceof Pt?e:e instanceof Error&&e.cause instanceof Pt?e.cause:void 0;if(r?.status===void 0||r.status===401||r.status===403)return;return{kind:"httpError",status:r.status,fallbackModelCouldHelp:n}}
function VLt(e,n){let r=R("tengu_attempt_decision_shadow",!1),s=qLt,g=s,h=kMo,b=!1,w=!1,D=()=>n!==void 0&&n.count<=0;function B(he){return he==="keepPartial"||!D()?he:"fail"}function W(he,_e){if(w)return;try{let ke=SMo(he,_e);if(ke===void 0)return;let be=YOe(ke,s,e,!0);return s=be.counts,{failure:ke,decision:be.decision}}catch(ke){d(ke);return}}function K(he,_e){if(he===void 0||he.decision===_e||b||!r)return;b=!0,i("tengu_attempt_decision_mismatch",{end:c(he.failure.kind),status:he.failure.kind==="httpError"?he.failure.status:void 0,decided:c(he.decision),did:c(_e),spent:s.retries,limit:e.maxRetries})}return{onStreamFailed(he,_e){g=s;let ke;try{let be=YOe(he,s,e,_e);s=be.counts,ke=be.decision}catch(be){d(be),ke=he.progress==="thinkingOnly"||he.progress==="output"?"keepPartial":_e?"retryWithoutStreaming":"fail"}return ke=B(ke),w=ke==="fail"||ke==="useFallbackModel",ke},undoLastCount(){s=g,w=!1},counts:()=>s,retriesLeft:()=>Math.max(0,e.maxRetries-s.retries),takeCredentialRenewal(){if(h<=0)return!1;return h--,!0},takeApiAttempt(){if(n===void 0)return!0;if(n.count<=0)return!1;return n.count--,!0},outOfApiAttempts:D,onWithRetryGaveUp(he){if(D())return"fail";let _e=W(he,!1),ke=_e?.decision==="retryWithoutStreaming"?"retryWithoutStreaming":"fail";return K(_e,ke),ke},reportHttpFailure(he,_e,ke){let{triedWithoutStreaming:be}=s,Ee=W(he,ke?.fallbackModelCouldHelp??!1);if(s={...s,triedWithoutStreaming:be},Ee===void 0&&_e==="retry")s={...s,retries:Math.min(s.retries+1,e.maxRetries)};K(Ee,_e)}}}
function QLt(e){let n=e.anyBlockFinished?e.anyOutputShown?"output":"thinkingOnly":e.anyOutputShown?"partialOutput":e.anyEvent?"started":"nothing",r=bMo(e);if(e.complete){if(r==="connectionLost"||r==="truncated"||r==="stalled"||(r==="overloaded"||r==="serverError")&&n==="output")return}return{kind:"streamFailed",cause:r,progress:n,stopReasonReceived:e.stopReasonReceived}}
function bMo(e){if(e.denied)return"denied";if(O1(e.error))return"overloaded";if(e.isServerError)return"serverError";if(e.stalled)return"stalled";if(e.isConnectionError)return e.truncated?"truncated":"connectionLost";if(e.malformed)return"malformed";return e.error instanceof Pt&&!(e.error instanceof lu)&&!(e.error instanceof dd)?"badRequest":"unknown"}
class gZ extends Error{constructor(){super("Not sent: no API attempts left")}}
return {v4,qOe,YOe,VLt,QLt,gZ};
}
export function createOfficialRetryForeground286() {
var Sjr={repl_main_thread:!0,"repl_main_thread:outputStyle:custom":!0,"repl_main_thread:outputStyle:Concise":!0,"repl_main_thread:outputStyle:Proactive":!0,"repl_main_thread:outputStyle:Explanatory":!0,"repl_main_thread:outputStyle:Learning":!0,sdk:!0};
var Xh=new Set([...Object.keys(Sjr),"agent:custom","agent:default","agent:builtin","compact","hook_agent","hook_prompt","side_question","web_search_tool","web_fetch_apply","repl_sampling","auto_mode","compact_fab_check","auto_mode_critique","auto_mode_setup_propose","chrome_mcp","artifact_comment_reply"]);
function Ode(e){if(e===void 0)return!0;if(e.startsWith("agent:"))return!0;return Xh.has(e)}
return Ode;
}
export function createOfficialOverloaded286({Pt}) {
function O1(e){if(!(e instanceof Pt))return!1;return e.status===529||(e.message?.includes('"type":"overloaded_error"')??!1)}
return O1;
}
