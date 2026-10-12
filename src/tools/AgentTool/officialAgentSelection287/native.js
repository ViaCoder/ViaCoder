// Complete pinned 287 Agent fork/availability/normalization/guard closures.
function module0(imports){

var yt="Agent";
var eU="fork";
var f_n="subagent_type is required: the general-purpose agent is not available in this session";
return {yt,eU,f_n};
}
function module1(imports){

var set="fork-boilerplate";
function uwt(e){if(e.type!=="user")return!1;let r=e.message?.content;return Array.isArray(r)&&r.some((n)=>n?.type==="text"&&typeof n.text==="string"&&n.text.startsWith(`<${set}>`))};
return {set,uwt};
}
function module2(imports){
const ko=imports["ko"];
const DRe=imports["DRe"];
const a=imports["a"];
const Ce=imports["Ce"];
const i=imports["i"];
const c=imports["c"];
const eU=imports["eU"];
const uwt=imports["uwt"];
function cce(e){return e.normalize("NFKC").toLowerCase().replace(/[\p{White_Space}\p{Pd}_]+/gu,"")};
var sao="tengu_fork_subagent_enabled";
function iao(){if(a.CLAUDE_CODE_FORK_SUBAGENT===!0)return"env";if(Ce())return"disabled";return"default"};
function aao(){let e=ko();if(DRe())return"disabled";if(a.CLAUDE_CODE_FORK_SUBAGENT===!1)return"disabled";if(e.forkSubagentEnabledSource!==void 0)return e.forkSubagentEnabledSource;let n=iao();if(n!=="disabled")e.forkSubagentEnabledSource=n,i(sao,{source:c(n)});return n};
function rne(){return aao()!=="disabled"};
function oPr(){return!DRe()&&a.CLAUDE_CODE_FORK_SUBAGENT!==!1};
var d1={agentType:eU,whenToUse:'Fork \u2014 inherits full conversation context. Selected explicitly via subagent_type: "fork" when the fork gate is on; never the default.',tools:["*"],maxTurns:200,model:"inherit",permissionMode:"bubble",source:"built-in",baseDir:"built-in",getSystemPrompt:()=>""};
function sPr(e){return e.some(uwt)};
return {cce,sao,iao,aao,rne,oPr,d1,sPr};
}
function module3(imports){
const rne=imports["rne"];
const oPr=imports["oPr"];
const cce=imports["cce"];
const eU=imports["eU"];
const iQ=imports["iQ"];
const yt=imports["yt"];
const A5=imports["A5"];
const d1=imports["d1"];
const sPr=imports["sPr"];
const f_n=imports["f_n"];
function In(n,e,{toolPermissionContext:p,scriptCall:h}){if(!(rne()||h&&oPr())||n.some((w)=>cce(w.agentType)===eU)||!(e?.includes(eU)??!0))return{available:!1,denyRule:null};let g=iQ(p,yt,eU);return{available:g===null,denyRule:g}};
function Rn(n,e){let p=cce(A5.agentType),h=n.filter((v)=>cce(v.agentType)===p),g=(v)=>e?.includes(v.agentType)??!0,w=h.find((v)=>v.agentType===A5.agentType);if(w)return g(w);return h.length===1&&g(h[0])};
function vn({isolation:n,querySource:e,messages:p}){if(n==="remote")return{code:"subagent_fork_remote_isolation",message:'Fork cannot use isolation: "remote" \u2014 a remote session cannot inherit the conversation context. Omit isolation (or use "worktree"), or spawn a named agent type for remote work.'};if(e===`agent:builtin:${d1.agentType}`||sPr(p))return{code:"subagent_recursive_fork",message:"Fork is not available inside a forked worker. Complete your task directly using your tools."};return null};
function tt(n){return n.join(", ")||"none"};
function Eo(n,e,p){let h=e.find((R)=>R.agentType===p);if(h)return h;let g=cce(p);if(!g)return;let w=n.filter((R)=>cce(R.agentType)===g);if(w.length!==1)return;let v=w[0];return e.some((R)=>R.agentType===v.agentType)?v:void 0};
return {availability:In,generalPurposeAvailable:Rn,guard:vn,matchAgent:Eo,normalize:cce,forkEnabled:rne,scriptForkEnabled:oPr,forkDefinition:d1,isForkChild:sPr,requiredTypeMessage:f_n,formatTypes:tt};
}
export function createAgentSelection287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"ko":ports["sessionMemo"],"DRe":ports["coordinator"],"a":ports["environment"],"Ce":ports["nonInteractive"],"i":ports["telemetry"],"c":ports["identity"],"eU":m0["eU"],"uwt":m1["uwt"]});
const m3=module3({"rne":m2["rne"],"oPr":m2["oPr"],"cce":m2["cce"],"eU":m0["eU"],"iQ":ports["denyRule"],"yt":m0["yt"],"A5":ports["generalPurpose"],"d1":m2["d1"],"sPr":m2["sPr"],"f_n":m0["f_n"]});
return m3;
}
