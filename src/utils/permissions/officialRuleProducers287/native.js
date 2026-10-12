// Pinned 2.1.287 HEr todo-tool producer: exact imported Qjn constants and initializer expressions.
var fk="TodoWrite";
var PE="TaskCreate";
var y9="TaskGet";
var NC="TaskUpdate";
var jA="TaskList";
var Qjn=[fk,PE,y9,NC,jA];
export function createPermissionRuleProducers287(ports){
  const {parseList:Op,formatRule:On,parseRule:jn,validateAllow:rbt,preset:$qn,parseBase:Nbo,normalize:Zl}=ports.ruleHelpers;
  return {todoToolNames:Qjn, initializeTodoToolOptIn(e,s){let h=[];let A=Op(e).map((r)=>On(jn(r))).filter((r)=>{let p=rbt(jn(r).toolName);if(p)return h.push(`Ignoring --allowedTools rule "${r}": ${p.error}. ${p.suggestion}.`),!1;return!0}),_=!!s&&s.length>0&&$qn(s.join(" ").trim())!==null,P=s&&!_?Nbo(Op(s)):{kept:[],excluded:new Set,bare:!1,detached:[],scoped:[]},D=P.kept.map(Zl).filter((r)=>!P.excluded.has(r)),Z=(r)=>D.includes(r)||A.some((p)=>jn(p).toolName===r);ports.hostLaunch.replaceTodoToolsOptIn(Qjn.some(Z));return {allowed:A,base:P,kept:D,isPreset:_,warnings:h}}};
}
