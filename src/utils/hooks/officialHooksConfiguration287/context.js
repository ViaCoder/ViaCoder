export function createHookBaseInput287(ports){
function module0(imports){

function Ay(e){let o;if(!e)return o;for(let n of e)if(n.kind==="effort")o=n.effort;return o};
return {Ay};
}
function module1(imports){
const dC=imports["dC"];
const kd=imports["kd"];
const Ay=imports["Ay"];
const jw=imports["jw"];
const KA=imports["KA"];
const Yf=imports["Yf"];
const Fw=imports["Fw"];
const NE=imports["NE"];
const NEe=imports["NEe"];
var N$o=/^[A-Za-z0-9][A-Za-z0-9_.-]{0,255}$/;
function Xc(e,n,r,s){let g=s?.agentType??dC(),h=s?.options?.mainLoopModel,b=kd(s?.getAppState?.()??{},h),w=Ay(s?.permissionLayers),D=h&&s?.getAppState&&jw(h)?{level:KA(h,b,w)}:void 0,j=s?.remoteCall;if(j!==void 0)return{session_id:`served:${(N$o.test(j.origin.callerSessionId??"")?j.origin.callerSessionId:void 0)??"unknown"}`,transcript_path:"",cwd:n,permission_mode:r,agent_id:s?.agentId,effort:D};return{session_id:e.id,transcript_path:Yf(e.id),cwd:n,scratchpad_dir:Fw()?NE(e.id)??void 0:void 0,prompt_id:NEe()??void 0,permission_mode:r,agent_id:s?.agentId,agent_type:g,effort:D}};
return {N$o,Xc};
}
const m0=module0({});
const m1=module1({"dC":ports["agentType"],"kd":ports["effortState"],"Ay":m0["Ay"],"jw":ports["supportsEffort"],"KA":ports["effortLevel"],"Yf":ports["transcript"],"Fw":ports["scratchEnabled"],"NE":ports["scratchDirectory"],"NEe":ports["promptId"]});
return {"baseInput":m1.Xc};
}
