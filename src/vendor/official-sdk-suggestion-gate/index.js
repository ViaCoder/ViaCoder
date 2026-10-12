// Recovered unmodified declarations from official npm 2.1.283. See provenance.json.
export function createOfficialSuggestionGate({x,d,te}) {
var Jk=new Set(["scheduled","task_notification","auto_continuation","host_synthetic","system"]);
function Xk({paused:e,turnOrigin:r}){let n;if(e)n="host_paused";else{let s=r();if(s===void 0||!Jk.has(s))return null;n="not_user_started"}return x("tengu_chomp_sable",!1)?n:null}
function Kf(e){try{return Xk(e)}catch(r){return d(te(r)),null}}
function UZt(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.type!=="user")continue;if(Smt(r))return-1;if(sme(r.message.content))continue;if(r.promptId||r.turnOrigin||!(r.isMeta||r.isVirtual||r.isVisibleInTranscriptOnly))return n}return-1}
function BZt(e){let n=UZt(e);if(n===-1)return;let r=e[n];return r.type==="user"?r.turnOrigin:void 0}
function sme(e){return Array.isArray(e)&&e.some((n)=>n.type==="tool_result")}
var D_e="fork-boilerplate";
function Smt(e){if(e.type!=="user")return!1;let r=e.message?.content;return Array.isArray(r)&&r.some((s)=>s?.type==="text"&&typeof s.text==="string"&&s.text.startsWith(`<${D_e}>`))}
return {getSuppressionReason:Kf,getTurnOrigin:BZt};
}
