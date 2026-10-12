// Complete original PostToolBatch producer/presence/parent-scope gates. No new hook owner.
export function createHandbackEndTurnNative287({V9,Ty,LEe,S$,MQ,Xc,oe,PA}){
var xC="web-fetch";
function YM(e){return e.agentType==="subagent"&&e.isBuiltIn===!0&&e.subagentName===xC};
var DMe=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionDenied"]);
var Cdo=new Set([...DMe,"PostToolBatch"]);
function pne(e,n,r){let s=e?.agentId??r,g=e?.agentContext;return g!==void 0&&YM(g)&&Cdo.has(n)?[s,g.parentAgentId??r]:[s]};
var yl=600000;
function QR(e,n,r){return mFe(e,n,r)||MQ(e)};
function mFe(e,n,r){let s=V9()?.[e];if(s&&s.length>0)return!0;if(!Ty()){let b=LEe()?.[e];if(b&&b.length>0)return!0}let g=S$()?.[e];if(g&&g.length>0)return!0;if(n===void 0)return!1;return(typeof r==="string"?[r]:r).some((b)=>n.has(b,e))};
async function*Kin(e,n,r,s,g,h=yl){if(r.options.settingsHooksOff)return;if(!QR("PostToolBatch",r.sessionHooksRegistry,pne(r,"PostToolBatch",r.session.id)))return;let b={...Xc(r.session,oe(),s,r),hook_event_name:"PostToolBatch",tool_calls:e};yield*PA({session:r.session,hookInput:b,toolUseID:n,signal:g,timeoutMs:h,toolUseContext:r})};
return {postToolBatch:Kin,parentScopes:pne,managedWebAgent:YM,presence:QR,timeout:yl};
}
