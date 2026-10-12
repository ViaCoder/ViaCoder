// Generated from fixed npm 2.1.287; original var statement is byte-for-byte intact.
export function createSubtaskCommand287(ports){
const {QRt,pT,Ea,kf}=ports;
var m=async(s,t,r)=>{let o=r.trim();if(!o)return s("Usage: /subtask \\<task\\>",{display:"system"}),null;let a=await QRt(o,t,t.canUseTool??kf);if(!a)return s(Ea()?"Subtasks are not available in coordinator sessions. Use /branch instead.":"Cannot start a subtask before the first conversation turn",{display:"system"}),null;return s(`${pT} forked ${a.name} (${a.agentId.slice(-4)})`,{display:"system"}),null};
return {call:m};
}
