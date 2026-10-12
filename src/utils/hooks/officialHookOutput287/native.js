export function createHookOutputParser287(ports){
function module0(imports){

function ot(t,n){let e=t.indexOf(n);return e===-1?t:t.slice(0,e)};
function Mr(t){return ot(t,`
`)};
return {ot,Mr};
}
function module1(imports){

function L(n){return[...new Set(n)]};
return {L};
}
function module2(imports){

function l(n){return n instanceof Error?n.message:String(n)};
return {l};
}
function module3(imports){
const t=imports["t"];
const Mr=imports["Mr"];
const Y=imports["Y"];
const rJ=imports["rJ"];
const L=imports["L"];
const _=imports["_"];
const l=imports["l"];
const ng=imports["ng"];
const zo=imports["zo"];
function dJ(e,n){if(!e||typeof e!=="object"||Array.isArray(e)||!n||typeof n!=="object")return;let r=[],s=new Set(Object.keys(n));for(let w of Object.keys(e))if(!s.has(w))r.push(w);let g=e.hookSpecificOutput,h="hookSpecificOutput"in n?n.hookSpecificOutput:void 0;if(g&&typeof g==="object"&&!Array.isArray(g)&&h&&typeof h==="object"){let w=new Set(Object.keys(h));for(let D of Object.keys(g))if(!w.has(D))r.push(`hookSpecificOutput.${D}`)}if(r.length===0)return;let b=r.includes("additionalContext")?" Did you mean hookSpecificOutput.additionalContext (with a hookEventName)?":"";t(`Hook JSON output had unrecognized keys (ignored): ${r.join(", ")}.${b}`)};
var wLe="Hook JSON output validation failed \u2014 ";
var i$o=new Set(["async","hookEventName","behavior"]);
function eWt(e){let n=e.path.at(-1);return e.code==="invalid_value"&&typeof n==="string"&&i$o.has(n)};
function oWt(e,n){let r=[...n,...e.path];if(e.code!=="invalid_union"||e.errors.length===0)return{path:r,message:e.message.replace(/^Invalid input: /,"")};let g=e.errors.find((j)=>j.length>0&&!j.some(eWt))?.[0];if(g)return oWt(g,r);let h=e.errors.flatMap((j)=>j.filter(eWt)),b=h[0];if(b?.code!=="invalid_value")return{path:r,message:e.message};let w=L(h.flatMap((j)=>j.code==="invalid_value"?j.values.map((z)=>_(z)):[])),D=w.slice(0,6).join(" | ");return{path:[...r,...b.path],message:`expected one of ${D}${w.length>6?" | \u2026":""}`}};
function tWt(e){return e.map(String).join(".")||"(root)"};
function _V(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
function iWt(e,n){let r=_V(e)?e.hookSpecificOutput:void 0,s=n.issues.map((w)=>oWt(w,[])),g=s[0],h=g?`${tWt(g.path)}: ${g.message}`:"unknown error";if(_V(r)&&!("hookEventName"in r))h='hookSpecificOutput is missing required field "hookEventName"';else if(_V(r)&&r.hookEventName==="PermissionRequest"&&!_V(r.decision)&&g?.path[0]==="hookSpecificOutput"&&g.path[1]==="decision")h+=' (PermissionRequest decision must be {"behavior": "allow"} or {"behavior": "deny", "message": "..."})';else if(_V(e)&&g?.path.length===1&&g.path[0]==="decision"&&(e.decision==="allow"||e.decision==="deny"||e.decision==="ask"))h+=e.decision==="ask"?' (top-level decision is the legacy approve|block field; for "ask" use hookSpecificOutput.permissionDecision in a PreToolUse hook)':` (top-level decision is the legacy approve|block field; for "${e.decision}" use hookSpecificOutput.permissionDecision in a PreToolUse hook, or hookSpecificOutput.decision: {"behavior": "${e.decision}"} in a PermissionRequest hook)`;let b=s.slice(1).map((w)=>`  - ${tWt(w.path)}: ${w.message}`).join(`
`);return`${wLe}${h}${b?`
`+b:""}

The hook's output was: ${_(e,null,2)}`};
function aWt(){return _({continue:"boolean (optional)",suppressOutput:"boolean (optional)",stopReason:"string (optional)",decision:'"approve" | "block" (optional)',reason:"string (optional)",systemMessage:"string (optional)",terminalSequence:"string (optional)",hookSpecificOutput:{"for PreToolUse":{hookEventName:'"PreToolUse"',permissionDecision:'"allow" | "deny" | "ask" | "defer" (optional)',permissionDecisionReason:"string (optional)",updatedInput:"object (optional) - Modified tool input to use"},"for PermissionRequest":{hookEventName:'"PermissionRequest"',decision:{"to allow":{behavior:'"allow"',updatedInput:"object (optional) - Modified tool input to use",updatedPermissions:"array (optional) - Permission updates"},"to deny":{behavior:'"deny"',message:"string (optional)",interrupt:"boolean (optional)"}}},"for UserPromptSubmit":{hookEventName:'"UserPromptSubmit"',additionalContext:"string (optional)"},"for PostToolUse":{hookEventName:'"PostToolUse"',additionalContext:"string (optional)"},"for PostToolBatch":{hookEventName:'"PostToolBatch"',additionalContext:"string (optional)"},"for Stop / SubagentStop":{hookEventName:'"Stop" | "SubagentStop"',additionalContext:"string (optional) - Feedback for the model; the conversation continues so the model can act on it"}}},null,2)};
function WWt(e){let n=Y(e),r=rJ().safeParse(n);if(r.success)return t("Successfully parsed and validated hook JSON output"),dJ(n,r.data),{json:r.data};return{validationError:iWt(n,r.error)}};
function Hce(e){let n=e.trim();if(!n.startsWith("{"))return t("Hook output does not start with {, treating as plain text"),{plainText:e};if(uGn(e))return{json:{async:!0}};try{let r=WWt(n);if("json"in r)return r;let s=`${r.validationError}

Expected schema:
${aWt()}`;return t(s),{plainText:e,validationError:s}}catch(r){if(!n.endsWith("}"))return t(`Hook output starts with { but is not a JSON object, treating as plain text: ${l(r)}`),{plainText:e};if(F$o(n))return t("Hook output is several JSON documents, treating as plain text"),{plainText:e};let s=`Hook output looks like a JSON object but is not valid JSON \u2014 ${l(r)}. Emit the payload with a JSON encoder (jq, ConvertTo-Json, json.dumps) rather than string concatenation so backslashes and quotes inside strings are escaped.`;return t(s),{plainText:e,validationError:s}}};
function F$o(e){let n=e.split(`
`).filter((s)=>s.trim()!=="");if(n.length<2)return!1;using r=ng`parseHookOutput: json lines (${n.length})`;return n.every((s)=>{try{let g=rJ().safeParse(zo(s.trim()));return!g.success||Object.keys(g.data).length===0}catch{return!1}})};
function uGn(e){let n=Mr(e).trim();if(!n.startsWith("{"))return!1;try{let r=Y(n);return typeof r==="object"&&r!==null&&"async"in r&&r.async===!0}catch{return!1}};
function Van(e){let n=e.trim();if(n===""){let r=rJ().safeParse({});if(r.success)return t("HTTP hook returned empty body, treating as empty JSON object"),{json:r.data}}if(!n.startsWith("{")){let r=`HTTP hook must return JSON, but got non-JSON response body: ${n.length>200?n.slice(0,200)+"\u2026":n}`;return t(r),{validationError:r}}try{let r=WWt(n);if("json"in r)return r;return t(r.validationError),r}catch(r){let s=`HTTP hook must return valid JSON, but parsing failed: ${r}`;return t(s),{validationError:s}}};
return {dJ,wLe,i$o,eWt,oWt,tWt,_V,iWt,aWt,WWt,Hce,F$o,uGn,Van};
}
function module4(imports){

function y0(e){return!(("async"in e)&&e.async===!0)};
function d_e(e){return"async"in e&&e.async===!0};
return {y0,d_e};
}
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({"t":ports["debug"],"Mr":m0["Mr"],"Y":ports["parse"],"rJ":ports["schema"],"L":m1["L"],"_":ports["stringify"],"l":m2["l"],"ng":ports["slowLogging"],"zo":ports["parse"]});
const m4=module4({});
return {"commandParser":m3.Hce,"httpParser":m3.Van,"validate":m3.WWt,"isSync":m4.y0,"isAsync":m4.d_e};
}
