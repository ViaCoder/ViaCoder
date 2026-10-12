// Complete fixed-287 lookup and continuation text; no quota state or feature cache created.
export function createQuotaPromptLookup287({k,Be}){
function CEr(t,n){let e=k(t,{});if(typeof e!=="object"||e===null)return;let u=e;return[n,Be(n),"default"].map((a)=>u[a]).find((a)=>typeof a==="string")};
return {CEr};
}
export function createQuotaResumeText287({CEr,rt}){
var H="tengu_lantern_wick_resume_by_model";
var j="Your claude.ai usage limit has reset. Continue the task you were working on when the limit was reached; do not repeat work that is already complete.";
function W(){let e=CEr(H,rt());return e!==void 0&&e.trim()!==""?e:j};
return {H,j,W};
}
