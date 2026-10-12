// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryLowPriority287(ports){
const {c,d,i,k,me,p,qn,y}=ports;
var d3="tengu_toasty_breeze";
var f3=10;
var p3=1440;
function xh(){let e=k(d3,{});return typeof e==="object"&&e!==null&&!Array.isArray(e)?e:{}};
function GLt(){let e=xh().version;return typeof e==="number"&&Number.isFinite(e)?e:0};
function LO(){let e=xh().cooloffMinutes,n=typeof e==="number"&&Number.isFinite(e)?Math.min(p3,Math.max(0,e)):f3;return Math.round(n*60000)};
var E3=60000;
function s$e(e=Date.now()){try{return XVn(e),qn().state.phase==="active"}catch(n){return d(n),!1}};
function YVn(e){return e.phase==="active"?e.resetsAtSeconds*1000+E3:null};
function XVn(e=Date.now()){let n=qn(),r=YVn(n.state);if(r===null||e<r)return!1;return sH("reset",e)};
function $O(e,n){e.state=n,e.changed.emit()};
function Yu(e){return{arm:me(e.arm),config_version:GLt()}};
function sH(e,n=Date.now()){let r=qn();if(r.state.phase!=="active"){if(e!=="user")r.stoppedWallResetsAtSeconds=void 0;return!1}if(e==="max_wait"){let s=LO();r.coolingOffUntilMs=s>0?n+s:void 0}if(i("tengu_lowpri_ended",{...Yu(r),reason:c(e),resumed:r.resumed,duration_ms:Math.max(0,n-r.state.acceptedAtMs),requests_served:r.requestsServed,requests_served_standard:r.requestsServedStandard,total_wait_ms:Math.max(0,r.totalWaitMs),...r.budgetUtilization!==void 0&&{budget_utilization_pct:Math.round(r.budgetUtilization*100)}}),v3(e)||r.requestsServed>0)y("low_priority_mode");else p("low_priority_mode",e);return r.stoppedWallResetsAtSeconds=e==="user"?r.state.resetsAtSeconds:void 0,$O(r,{phase:"idle"}),r.events.emit({type:"ended",reason:e}),!0};
function v3(e){switch(e){case"reset":case"user":case"conversation_reset":case"account_switch":case"extra_usage":return!0;case"weekly":case"budget":case"off":case"ineligible":case"wall":case"max_wait":return!1}};
return {s$e};
}
