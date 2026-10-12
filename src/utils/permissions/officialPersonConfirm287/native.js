// Official 287 full confirmation declarations; required host/schema ports are explicit.
import {randomUUID} from 'node:crypto';
export function createConfirmation287(ports){
const Hje=ports["Hje"];
const h0e=ports["h0e"];
const y0e=ports["y0e"];
const lnr=ports["lnr"];
const c=ports["c"];
const P=ports["P"];
const l=ports["l"];
const y=ports["y"];
const m=ports["m"];
const p=ports["p"];
const t=ports["t"];
const d=ports["d"];
const f=ports["f"];
const Jre=ports["Jre"];
const pe=ports["pe"];
const o5=ports["o5"];
const y7=ports["y7"];
const Jc=ports["Jc"];
const _tn=ports["_tn"];
const an=ports["an"];
const o=ports["o"];
const H=ports["H"];
const se=ports["se"];
const u=ports["u"];
const de=ports["de"];
const b=randomUUID;
function KFn(e,r){return e===r||e.behavior==="ask"&&e.forcedByCaller===!0};
function YFn(e){return e===Hje||e===h0e||e===y0e||e===lnr||_tn(e)};
var Eit="confirm_";
function JPt(e){let r=pe(e);return y7()&&r.shouldAvoidPermissionPrompts!==!0&&r.mode!=="dontAsk"};
async function Yqe(e){let{toolUseContext:r,source:i}=e;if(!JPt(r))return{kind:"unanswered",reason:"no_one_to_ask"};let s;try{s=await V(e)}catch(n){if(r.abortController.signal.aborted)t(`confirmWithUser(${i}): ask aborted with the turn: ${l(n)}`),s={kind:"aborted"};else d(n),s={kind:"unanswered",reason:"error"}}let a={source_hash:an(i)};switch(s.kind){case"chose":case"declined":case"aborted":y("permission_confirm_with_user",{...a,answer:c(s.kind)});break;case"unanswered":if(s.reason==="error")m("permission_confirm_with_user","error",a);else p("permission_confirm_with_user",s.reason,a);break}return s};
async function V({canUseTool:e,toolUseContext:r,source:i,header:s,question:a,choices:n,personOnly:_}){let h=o5.inputSchema.safeParse({questions:[{question:a,header:s,options:n.map(({label:g,description:W})=>({label:g,description:W??""})),multiSelect:!1}],metadata:{source:i}});if(!h.success)throw new P(`confirmWithUser(${i}): the question does not satisfy the AskUserQuestion schema: ${h.error.message}`,"confirmWithUser: the question does not satisfy the AskUserQuestion schema");let k=await o5.checkPermissions(h.data,r);if(k.behavior!=="ask")throw new P(`confirmWithUser(${i}): AskUserQuestion.checkPermissions answered ${k.behavior}, not ask`,"confirmWithUser: AskUserQuestion.checkPermissions did not answer ask");let C={...k,forcedByCaller:!0,..._===!0&&{personOnly:!0}},w=`${Eit}${b()}`,A=await e(o5,h.data,r,Jc({content:[]}),w,C).finally(()=>Jre(r.session,w));return O(A,C,r.abortController.signal,a,n)};
function O(e,r,i,s,a){if(KFn(e,r))return{kind:"unanswered",reason:"no_one_to_ask"};if(i.aborted)return{kind:"aborted"};switch(e.behavior){case"allow":{let n=T().safeParse(e.updatedInput);if(!n.success)return{kind:"unanswered",reason:"no_selection"};if(n.data.followUp===!0)return{kind:"declined"};let _=E(n.data.answers?.[s]);if(_==="")return{kind:"unanswered",reason:"no_selection"};let h=a.find((k)=>U(k.label)===_);return h!==void 0?{kind:"chose",value:h.value}:{kind:"declined",typedAnswer:_}}case"deny":if(e.decisionReason.type==="asyncAgent"||e.decisionReason.type==="other"&&YFn(e.decisionReason.reason))return{kind:"unanswered",reason:"no_one_to_ask"};return{kind:"declined"};case"ask":return{kind:"declined"}}};
var T=f(()=>u({answers:de(o(),se()).optional(),followUp:H().optional()}));
function E(e){if(typeof e==="string")return U(e);if(Array.isArray(e))return U(e.filter((r)=>typeof r==="string").join(", "));return""};
function U(e){return e.replace(/\s+/g," ").trim()};
return {confirm:Yqe,canAsk:JPt,unanswered:KFn};
}
export function createConfirmationContext287(ports){
const Ta=ports["Ta"];
const BE=ports["BE"];
const So=ports["So"];
const HG=ports["HG"];
const L=ports["L"];
function d(e,o){if(o.length===0)return e;return{...e,alwaysAllowRules:{...e.alwaysAllowRules,command:L([...e.alwaysAllowRules.command||[],...o])}}};
function u(e,o){if(o.length===0)return e;return{...e,alwaysDenyRules:{...e.alwaysDenyRules,command:L([...e.alwaysDenyRules.command||[],...o])}}};
class f{mode;autoClassifierActive;constructor(e,o){this.mode=e,this.autoClassifierActive=o}toJSON(){return}};
function HWo(e){return new f(e,Ta(e))};
function x6r(e){return e instanceof f&&!e.autoClassifierActive};
function c(e){if(!x6r(e))return;let o=e.mode;switch(o){case"default":case"acceptEdits":case"dontAsk":case"bubble":return o;case"plan":case"bypassPermissions":return"default";case"auto":return;default:{let n=o;return}}};
function y(e){return e===So||e.startsWith(`${So}(`)||e.startsWith(HG)};
function x(e){let o=y,n=!1,s={},r={};for(let[t,i]of Object.entries(e.strippedDangerousRules??{}))if(i!==void 0)r[t]=[...i];for(let[t,i]of Object.entries(e.alwaysAllowRules)){if(i===void 0)continue;let a=i.filter((l)=>!o(l));if(a.length!==i.length){n=!0;for(let l of i)if(o(l)){let p=r[t]??=[];if(!p.includes(l))p.push(l)}}s[t]=a}if(!n)return e;return{...e,alwaysAllowRules:s,strippedDangerousRules:r}};
function pe(e){let o=e.getAppState().toolPermissionContext,n=o!==void 0&&o.pollEventDeliveryGuard===!0;if(n)o=x(o);let s=e.permissionLayers;if(!s)return g(e,o);let r=s.findLast((t)=>t.kind==="working_directory");for(let t of s)switch(t.kind){case"allowed_tools":if(!n)o=d(o,[...t.allowedTools]);break;case"disallowed_tools":o=u(o,[...t.disallowedTools]);break;case"bash_command_clamp":o={...o,bashCommandClamps:[...o.bashCommandClamps??[],t.rules]};break;case"avoid_prompts":if(!o.shouldAvoidPermissionPrompts)o={...o,shouldAvoidPermissionPrompts:!0};break;case"sandbox_auto_allow_suspended":if(!o.sandboxAutoAllowSuspended)o={...o,sandboxAutoAllowSuspended:!0};break;case"permission_mode":{if(t.mode==="bypassPermissions"&&(BE()||!o.isBypassPermissionsModeAvailable))break;o={...o,mode:t.mode};break}case"working_directory":if(t===r&&!o.additionalWorkingDirectories.has(t.directory))o={...o,additionalWorkingDirectories:new Map([...o.additionalWorkingDirectories,[t.directory,{path:t.directory,source:"session"}]])};break;case"effort":case"model":case"max_thinking_tokens":case"flag_settings":break}return g(e,o)};
function g(e,o){return b(e,k(e,h(e,o)))};
function h(e,o){if(o===void 0||o.mode!=="auto"||e.forPromptShellCommand===!0||e.forRemoteExecution===!0)return o;let n=c(e.permissionModeAtRequest);return n===void 0?o:m(n,o)};
function b(e,o){if(e.forPromptShellCommand!==!0||o===void 0)return o;return o.mode==="auto"?m("default",o):o};
function m(e,o){return{...o,mode:e,modeBeforeRewrite:o.modeBeforeRewrite??o.mode}};
function k(e,o){if(e.forRemoteExecution!==!0||o===void 0)return o;let{blockReadsOutsideWorkingDirectories:n,...s}=o;return o.mode==="acceptEdits"||o.mode==="bypassPermissions"?m("default",s):s};
return {read:pe,capture:HWo,isCapturedNonAuto:x6r};
}
export function createConfirmationEligibility287(ports){
const Ce=ports["Ce"];
const EI=ports["EI"];
const lh=ports["lh"];
function y7(){if(lh().length>0&&Ce())return!1;if(Ce()&&!hHt(EI()))return!1;return!0};
function hHt(e){return e!==void 0&&e!=="none"};
return y7;
}
export function createConfirmationCleanup287(ports){
const Tt=ports["Tt"];
var xt=new Tt(()=>({calls:new Map,hostAttests:!1}));
var Cr=new Tt(()=>({byToolUse:new Map}));
function Jre(e,n){if(e!==void 0){xt.peek(e)?.calls.delete(n);let s=Cr.peek(e)?.byToolUse.get(n);if(s!==void 0){Cr.peek(e)?.byToolUse.delete(n);for(let r of s)r()}}};
return {finish:Jre,calls:xt,callbacks:Cr};
}
export function createConfirmationUtilities287(ports){
const er=ports["er"];
const bn=ports["bn"];
const e=ports["e"];
const mf=ports["mf"];
var Hje="tool permission stream closed before response received";
var h0e="canUseTool returned a schema-invalid permission result";
var y0e="tool permission request failed";
var lnr="permission prompt tool no longer connected";
function Ta(e,s=!1){return e==="auto"||e==="plan"&&!s&&mf()};
function H6r(){if((er()||{}).permissions?.disableBypassPermissionsMode==="disable")return"Bypass permissions mode was disabled by settings";return};
function BE(){return H6r()!==void 0};
function an(t){return bn(e("sha256").update(t).digest("hex").slice(0,12))};
function _tn(e){return e.startsWith("localDisplayOnly ask not forwarded:")};
return {autoActive:Ta,bypassDisabled:BE,hash:an,unforwarded:_tn,constants:{Hje,h0e,y0e,lnr}};
}
