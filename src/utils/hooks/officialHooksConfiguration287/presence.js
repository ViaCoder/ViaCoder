export function createHookEntryPredicates287(ports){
function module0(imports){
const V9=imports["V9"];
const Ty=imports["Ty"];
const LEe=imports["LEe"];
const S$=imports["S$"];
const a=imports["a"];
var oPo=1500;
var I$o=60000;
function _ye(){let e=a.CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS;if(e!==void 0)return e;let n=0,r=Ty()?[]:LEe()?.SessionEnd??[],s=[...V9()?.SessionEnd??[],...r];for(let g of s)for(let h of g.hooks)if(h.timeout&&h.timeout*1000>n)n=h.timeout*1000;return Math.max(oPo,Math.min(n,I$o))};
function mFe(e,n,r){let s=V9()?.[e];if(s&&s.length>0)return!0;if(!Ty()){let b=LEe()?.[e];if(b&&b.length>0)return!0}let g=S$()?.[e];if(g&&g.length>0)return!0;if(n===void 0)return!1;return(typeof r==="string"?[r]:r).some((b)=>n.has(b,e))};
return {oPo,I$o,_ye,mFe};
}
const m0=module0({"V9":ports["snapshot"],"Ty":ports["managedOnly"],"LEe":ports["agentHooks"],"S$":ports["registered"],"a":ports["environment"]});
return {"hasEvent":m0.mFe,"sessionEndTimeout":m0._ye};
}
