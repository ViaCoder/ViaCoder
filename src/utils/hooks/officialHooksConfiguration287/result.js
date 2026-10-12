export function createHookResultProcessor287(ports){
function module0(imports){

var _L="\x1B";
var dW="\x07";
var TWe=";";
var rY={CSI:91,OSC:93,DCS:80,APC:95,PM:94,SOS:88,ST:92};
return {_L,dW,TWe,rY};
}
function module1(imports){
const n=imports["n"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function Xd(){return n().surfaceCapabilities.attacherCaps()};
return {V,Xd};
}
function module2(imports){
const Xd=imports["Xd"];
const a=imports["a"];
const _L=imports["_L"];
const dW=imports["dW"];
const rY=imports["rY"];
const TWe=imports["TWe"];
var h=_L+String.fromCharCode(rY.OSC);
var mpn=_L+"\\";
function W(){return Xd()?.terminal??a.terminal};
function OFt(){let e=Xd();if(e)return e.mux;if(a.TMUX)return"tmux";if(a.STY)return"screen";if(a.ZELLIJ)return"zellij";return null};
function $h(...e){let o=W()==="kitty"?mpn:dW;return`${h}${e.join(TWe)}${o}`};
function ox(e){let o=OFt();if(o==="tmux")return`\x1BPtmux;${e.replaceAll("\x1B","\x1B\x1B")}\x1B\\`;if(o==="screen")return`\x1BP${e.replaceAll("\x1B","\x1B\x1B")}\x1B\\`;return e};
return {h,mpn,W,OFt,$h,ox};
}
function module3(imports){
const dW=imports["dW"];
const _L=imports["_L"];
const ox=imports["ox"];
const $h=imports["$h"];
const t=imports["t"];
const _=imports["_"];
const V=imports["V"];
const U=imports["U"];
const i=imports["i"];
const c=imports["c"];
const ln=imports["ln"];
var b$n=new Set([0,1,2,9,99,777]);
var w$n=4096;
function v$n(e){let n="";for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);if(s>=32&&s!==127&&!(s>=128&&s<=159))n+=e[r]}return n};
function T$n(e){if(/^4;[0-4](;(100|\d{1,2})?)?$/.test(e))return!0;return!/^[\s\u180e\u200b]*[+-]?\p{Nd}/u.test(e)};
function E$n(e){if(e.length===0)return null;if(Buffer.byteLength(e,"utf8")>w$n)return null;let n=[],r=0;while(r<e.length){let s=e[r];if(s===dW){n.push({kind:"bel"}),r++;continue}if(s!==_L||e[r+1]!=="]")return null;let g=r+2,h=-1,b=0;while(g<e.length){if(e[g]===dW){h=g,b=1;break}if(e[g]===_L&&e[g+1]==="\\"){h=g,b=2;break}if(e[g]===_L)return null;g++}if(h===-1)return null;let w=e.slice(r+2,h),D=w.indexOf(";"),j=D===-1?w:w.slice(0,D),z=D===-1?"":w.slice(D+1);if(!/^\d+$/.test(j))return null;let K=Number(j);if(!b$n.has(K))return null;let he=v$n(z);if(K===9&&!T$n(he))return null;n.push({kind:"osc",ps:K,payload:he}),r=h+b}return n};
function Zve(e){let n=E$n(e);if(n===null)return null;return n.map((r)=>r.kind==="bel"?dW:ox($h(r.ps,r.payload))).join("")};
var $$o=new V(()=>new Set);
function B$o(e){let n=e?"true":"false",r=$$o.of(U().host);if(r.has(n))return;r.add(n),i("tengu_dead_probe_hook_updated_mcp_tool_output",{with_new_field:c(n)})};
function kV({json:e,command:n,hookName:r,toolUseID:s,hookEvent:g,expectedHookEvent:h,stdout:b,stderr:w,exitCode:D,durationMs:j}){let z={},K=e;if(K.continue===!1){if(z.preventContinuation=!0,K.stopReason)z.stopReason=K.stopReason}if(e.decision)switch(e.decision){case"approve":z.permissionBehavior="allow";break;case"block":z.permissionBehavior="deny",z.blockingError={blockingError:e.reason||"Blocked by hook",command:n};break;default:throw Error(`Unknown hook decision type: ${e.decision}. Valid types are: approve, block`)}if(e.systemMessage)z.systemMessage=e.systemMessage;if(e.terminalSequence){let he=Zve(e.terminalSequence);if(he!==null)z.terminalSequence=he;else t(`Hook ${r} (${g}) returned a terminalSequence that was rejected by the allowlist (only OSC 0/1/2/9/99/777 and BEL are permitted, and OSC 9 bodies may not begin with a digit unless in the 9;4 progress form)`)}if(e.hookSpecificOutput?.hookEventName==="PreToolUse"&&e.hookSpecificOutput.permissionDecision)switch(e.hookSpecificOutput.permissionDecision){case"allow":z.permissionBehavior="allow";break;case"deny":z.permissionBehavior="deny",z.blockingError={blockingError:e.reason||"Blocked by hook",command:n};break;case"ask":z.permissionBehavior="ask";break;case"defer":z.permissionBehavior="defer";break;default:throw Error(`Unknown hook permissionDecision type: ${e.hookSpecificOutput.permissionDecision}. Valid types are: allow, deny, ask, defer`)}if(z.permissionBehavior!==void 0&&e.reason!==void 0)z.hookPermissionDecisionReason=e.reason;if(e.hookSpecificOutput){if(h&&e.hookSpecificOutput.hookEventName!==h)throw Error(`Hook returned incorrect event name: expected '${h}' but got '${e.hookSpecificOutput.hookEventName}'. Full stdout: ${_(e,null,2)}`);switch(e.hookSpecificOutput.hookEventName){case"PreToolUse":if(e.hookSpecificOutput.permissionDecision)switch(e.hookSpecificOutput.permissionDecision){case"allow":z.permissionBehavior="allow";break;case"deny":z.permissionBehavior="deny",z.blockingError={blockingError:e.hookSpecificOutput.permissionDecisionReason||e.reason||"Blocked by hook",command:n};break;case"ask":z.permissionBehavior="ask";break;case"defer":z.permissionBehavior="defer";break}if(z.hookPermissionDecisionReason=e.hookSpecificOutput.permissionDecisionReason,e.hookSpecificOutput.updatedInput)z.updatedInput=e.hookSpecificOutput.updatedInput;z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"UserPromptSubmit":z.additionalContext=e.hookSpecificOutput.additionalContext,z.sessionTitle=e.hookSpecificOutput.sessionTitle,z.suppressOriginalPrompt=e.hookSpecificOutput.suppressOriginalPrompt;break;case"UserPromptExpansion":z.additionalContext=e.hookSpecificOutput.additionalContext,z.suppressOriginalPrompt=e.hookSpecificOutput.suppressOriginalPrompt;break;case"SessionStart":if(z.additionalContext=e.hookSpecificOutput.additionalContext,z.initialUserMessage=e.hookSpecificOutput.initialUserMessage,z.sessionTitle=e.hookSpecificOutput.sessionTitle,"watchPaths"in e.hookSpecificOutput&&e.hookSpecificOutput.watchPaths)z.watchPaths=e.hookSpecificOutput.watchPaths;z.reloadSkills=e.hookSpecificOutput.reloadSkills;break;case"Setup":z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"PreModelSwitch":if(e.hookSpecificOutput.permissionDecision)switch(e.hookSpecificOutput.permissionDecision){case"allow":z.permissionBehavior="allow";break;case"deny":z.permissionBehavior="deny",z.blockingError={blockingError:e.hookSpecificOutput.permissionDecisionReason||e.reason||"Blocked by hook",command:n};break;case"ask":z.permissionBehavior="ask";break}if(e.hookSpecificOutput.permissionDecisionReason!==void 0)z.hookPermissionDecisionReason=e.hookSpecificOutput.permissionDecisionReason;break;case"PostModelSwitch":z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"SubagentStart":z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"PostToolUse":if(z.additionalContext=e.hookSpecificOutput.additionalContext,z.classifierContext=e.hookSpecificOutput.classifierContext,e.hookSpecificOutput.updatedToolOutput!==void 0)z.updatedToolOutput=e.hookSpecificOutput.updatedToolOutput;if(e.hookSpecificOutput.updatedMCPToolOutput)B$o(e.hookSpecificOutput.updatedToolOutput!==void 0),z.updatedMCPToolOutput=e.hookSpecificOutput.updatedMCPToolOutput;else if(e.hookSpecificOutput.updatedMCPToolOutput!==void 0)z.legacyMcpRewriteSuppressed=!0;break;case"PostToolUseFailure":z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"PostToolBatch":z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"Stop":case"SubagentStop":z.additionalContext=e.hookSpecificOutput.additionalContext;break;case"PermissionDenied":z.retry=e.hookSpecificOutput.retry;break;case"PermissionRequest":if(e.hookSpecificOutput.decision){if(z.permissionRequestResult=e.hookSpecificOutput.decision,z.permissionBehavior=e.hookSpecificOutput.decision.behavior==="allow"?"allow":"deny",e.hookSpecificOutput.decision.behavior==="allow"&&e.hookSpecificOutput.decision.updatedInput)z.updatedInput=e.hookSpecificOutput.decision.updatedInput}break;case"Elicitation":if(e.hookSpecificOutput.action){if(z.elicitationResponse={action:e.hookSpecificOutput.action,content:e.hookSpecificOutput.content},e.hookSpecificOutput.action==="decline")z.blockingError={blockingError:e.reason||"Elicitation denied by hook",command:n}}break;case"ElicitationResult":if(e.hookSpecificOutput.action){if(z.elicitationResultResponse={action:e.hookSpecificOutput.action,content:e.hookSpecificOutput.content},e.hookSpecificOutput.action==="decline")z.blockingError={blockingError:e.reason||"Elicitation result blocked by hook",command:n}}break;case"MessageDisplay":z.displayContent=e.hookSpecificOutput.displayContent;break}}return{...z,message:z.blockingError?ln({type:"hook_blocking_error",hookName:r,toolUseID:s,hookEvent:g,blockingError:z.blockingError}):ln({type:"hook_success",hookName:r,toolUseID:s,hookEvent:g,content:"",stdout:b,stderr:w,exitCode:D,command:n,durationMs:j})}};
return {b$n,w$n,v$n,T$n,E$n,Zve,$$o,B$o,kV};
}
const m0=module0({});
const m1=module1({"n":ports["execution"]});
const m2=module2({"Xd":m1["Xd"],"a":ports["environment"],"_L":m0["_L"],"dW":m0["dW"],"rY":m0["rY"],"TWe":m0["TWe"]});
const m3=module3({"dW":m0["dW"],"_L":m0["_L"],"ox":m2["ox"],"$h":m2["$h"],"t":ports["debug"],"_":ports["stringify"],"V":m1["V"],"U":ports["execution"],"i":ports["analytics"],"c":ports["analyticsIdentity"],"ln":ports["attachment"]});
return {"process":m3.kV,"terminalSequence":m3.Zve};
}
