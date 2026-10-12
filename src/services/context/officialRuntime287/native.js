// Complete pinned 287 environment/model/task-budget closures; original lexical modules retained.
function module0(imports){
const a=imports["a"];
function Uxe(){return a.CLAUDE_CODE_SIMPLE};
function Nue(e){let n={input_tokens:e.input_tokens??0,output_tokens:e.output_tokens??0,cache_creation_input_tokens:e.cache_creation_input_tokens??0,cache_read_input_tokens:e.cache_read_input_tokens??0};if(cs(n)===0||!Array.isArray(e.iterations))return n;let s=e.iterations.findLast((r)=>!aa(r));if(!la(s))return n;return{input_tokens:s.input_tokens,output_tokens:s.output_tokens,cache_creation_input_tokens:s.cache_creation_input_tokens,cache_read_input_tokens:s.cache_read_input_tokens}};
function yx(e){let n=Nue(e);return cs(n)+n.output_tokens};
function cs(e){return e.input_tokens+e.cache_creation_input_tokens+e.cache_read_input_tokens};
function aa(e){if(typeof e!=="object"||e===null)return!1;let{type:n}=e;return n==="advisor_message"||n==="compaction"};
function la(e){if(typeof e!=="object"||e===null)return!1;let n=e;return(n.type==="message"||n.type==="fallback_message")&&Me(n.input_tokens)&&Me(n.output_tokens)&&Me(n.cache_creation_input_tokens)&&Me(n.cache_read_input_tokens)&&n.input_tokens+n.cache_creation_input_tokens+n.cache_read_input_tokens>0};
function Me(e){return typeof e==="number"&&Number.isFinite(e)&&e>=0};
return {Uxe,Nue,yx,cs,aa,la,Me};
}
function module1(imports){

var n=/[\x00-\x1f\x7f-\x9f\u2028\u2029]/g;
function oGr(e){return e.length<=256&&/^(?:\/(?!\.\.?(?:\/|$))[A-Za-z0-9._+@-]+)+$/.test(e)};
function tbe(e){return e.replace(n,(t)=>`&#${t.charCodeAt(0)};`)};
function OG(e){return e.replaceAll("<","&lt;").replaceAll(">","&gt;")};
function Yh(e){return tbe(OG(String(e??"")))};
return {n,oGr,tbe,OG,Yh};
}
function module2(imports){

var Jw="[Request interrupted by user]";
var fu="[Request interrupted by user for tool use]";
var Qw="The user doesn't want to take this action right now. STOP what you are doing and wait for the user to tell you how to proceed.";
return {Jw,fu,Qw};
}
function module3(imports){

var $M="No response requested.";
var Ma="<synthetic>";
return {$M,Ma};
}
function module4(imports){

class Tt{#e;#t=new WeakMap;constructor(e){this.#e=e}peek(e){return this.#t.get(e.root)}of(e){let t=e.root,o=this.#t.get(t);if(o!==void 0)return o;let r=this.#e();return this.#t.set(t,r),r}drop(e){this.#t.delete(e.root)}};
return {Tt};
}
function module5(imports){

var pD="<system-reminder>";
var TOe="</system-reminder>";
return {pD,TOe};
}
function module6(imports){
const Uxe=imports["Uxe"];
const kto=imports["kto"];
const oGr=imports["oGr"];
const Kx=imports["Kx"];
const a=imports["a"];
const Dyn=imports["Dyn"];
const P3e=imports["P3e"];
const Oyn=imports["Oyn"];
const Fw=imports["Fw"];
const NE=imports["NE"];
const Uc=imports["Uc"];
const cW=imports["cW"];
const ko=imports["ko"];
const $a=imports["$a"];
const vS=imports["vS"];
const Lm=imports["Lm"];
const pe=imports["pe"];
const f=imports["f"];
const u=imports["u"];
const o=imports["o"];
const H=imports["H"];
const T=imports["T"];
const Wo=imports["Wo"];
const x=imports["x"];
const i=imports["i"];
const c=imports["c"];
const Wp=imports["Wp"];
const xa=imports["xa"];
const Be=imports["Be"];
const sm=imports["sm"];
const tm=imports["tm"];
const Jw=imports["Jw"];
const fu=imports["fu"];
const Qw=imports["Qw"];
const $M=imports["$M"];
const Ma=imports["Ma"];
const yx=imports["yx"];
const Fet=imports["Fet"];
const pee=imports["pee"];
const G3e=imports["G3e"];
const Jto=imports["Jto"];
const S=imports["S"];
const Yh=imports["Yh"];
const A3e=imports["A3e"];
const tt=imports["tt"];
const Kd=imports["Kd"];
const t=imports["t"];
const k=imports["k"];
const Tt=imports["Tt"];
const pf=imports["pf"];
const Qp=imports["Qp"];
const Re=imports["Re"];
const pD=imports["pD"];
const TOe=imports["TOe"];
const ya=imports["ya"];
function Sm(e){return e.flatMap((n)=>Array.isArray(n)?n.map((r)=>`  - ${r}`):[` - ${n}`])};
var S2n="Bash tool also available for POSIX scripts \u2014 each takes its own syntax";
var whe="# Environment";
var Lyn="You have been invoked in the following environment: ";
var Nyn="# Environment update";
var D3e="The git stash stack is shared with the main checkout and all other worktrees, and other Claude sessions may push or pop it concurrently. Never use bare `git stash` / `git stash pop` \u2014 you could pop another session's changes. Prefer a temporary WIP commit to set work aside; if you must stash, use `git stash push -u -m \"<unique-tag>\"`, immediately capture your entry's SHA via `git stash list --format='%H %gs'`, restore with `git stash apply <sha>` (not pop), and afterwards drop the entry, re-finding its current `stash@{n}` by tag first.";
var L3e="This is a git worktree \u2014 an isolated copy of the repository. Run all commands from this directory. Do NOT `cd` to the original repository root.";
var Fyn="The primary working directory is no longer a git worktree.";
var $yn="The primary working directory announced earlier no longer applies.";
var vhe=f(()=>u({workingDirectory:o().optional(),isWorktree:H(),isGitRepo:H(),additionalWorkingDirectories:T(o()),platform:o(),shell:o().optional(),osVersion:o().optional(),scratchpadDirectory:o().optional()}));
var The=f(()=>Wo("field",[u({field:x("workingDirectory"),from:o().optional()}),u({field:x("isWorktree")}),u({field:x("isGitRepo")}),u({field:x("additionalWorkingDirectories"),added:T(o()),removed:T(o())}),u({field:x("scratchpadDirectory")})]));
function Byn(){let e=ko();return e.shellDescription??=Uyn(),e.shellDescription};
function Uyn(){let e=a.SHELL||"unknown",n=e.includes("zsh")?"zsh":e.includes("bash")?"bash":e;if(a.platform==="win32"){if(!$a())return"PowerShell";if(vS())return`PowerShell (primary); ${S2n}.`;return n}return n};
function Hyn(){let e=ko();if(e.agentProxyNote===void 0)e.agentProxyNote=A3e()??null;return e.agentProxyNote};
function jyn(){if(a.platform==="win32")return`${Dyn()} ${P3e()}`;return`${Oyn()} ${P3e()}`};
async function N3e({cwd:e,additionalWorkingDirectories:n}){let r=k3();if(r!==void 0)return r;let[s,g]=await Promise.all([e!==null&&Kx(),jyn()]),h=qyn();return{...e!==null&&{workingDirectory:e},isWorktree:e!==null&&(Uc()!==null||cW(e)),isGitRepo:s,additionalWorkingDirectories:[...n??[]],platform:a.platform,shell:Byn(),osVersion:g,...h&&{scratchpadDirectory:h}}};
function k3(e){let n=kto();if(n===void 0)return;let r=!n.said&&e!==void 0&&oW(e)&&e.workingDirectory!==void 0&&oGr(e.workingDirectory)&&e.workingDirectory!==n.unvouched?{path:e.workingDirectory,isGitRepo:e.isGitRepo}:n.directory;return{...r&&{workingDirectory:r.path},isWorktree:!1,isGitRepo:r?.isGitRepo??!1,additionalWorkingDirectories:[],platform:n.platform}};
function oW(e){return e.shell===void 0&&e.osVersion===void 0};
function qyn(){if(!Fw()||a.CLAUDE_CODE_SESSION_KIND==="bg")return;return NE()??void 0};
function F3e(e){return`Scratchpad directory: ${e} \u2014 always use it for temporary files (intermediate results, scripts, outputs that don't belong in the project) instead of \`/tmp\` or other system temp directories; it is session-specific, isolated from the project, and can generally be used without permission prompts. Only use \`/tmp\` if the user explicitly asks.`};
function Vyn(e){let n=Yh,r=e.workingDirectory,s=[...r===void 0?[]:[`Primary working directory: ${n(r)}`,e.isWorktree?L3e:null,e.isWorktree?D3e:null,`Is a git repository: ${e.isGitRepo}`],e.additionalWorkingDirectories.length>0?"Additional working directories:":null,e.additionalWorkingDirectories.length>0?e.additionalWorkingDirectories.map(n):null,`Platform: ${n(e.platform)}`,e.shell!==void 0?`Shell: ${n(e.shell)}`:null,e.osVersion!==void 0?`OS Version: ${n(e.osVersion)}`:null,e.scratchpadDirectory!==void 0?F3e(n(e.scratchpadDirectory)):null,oW(e)?null:Hyn()].filter((g)=>g!==null);return Sm(s).join(`
`)};
function $3e(e){return[whe,Lyn,Vyn(e)].join(`
`)};
function Ehe(e,n){return e.platform===n.platform&&e.shell===n.shell&&e.osVersion===n.osVersion};
function B3e(e,n){let r=[],s=n.workingDirectory;if(s!==e.workingDirectory)r.push({field:"workingDirectory",...s!==void 0&&(!oW(e)||e.workingDirectory===void 0||oGr(e.workingDirectory))&&{from:e.workingDirectory}});if(s!==void 0&&n.isWorktree!==e.isWorktree)r.push({field:"isWorktree"});if(s!==void 0&&n.isGitRepo!==e.isGitRepo)r.push({field:"isGitRepo"});let g=new Set(e.additionalWorkingDirectories),h=new Set(n.additionalWorkingDirectories),b=n.additionalWorkingDirectories.filter((D)=>!g.has(D)),w=e.additionalWorkingDirectories.filter((D)=>!h.has(D));if(b.length>0||w.length>0)r.push({field:"additionalWorkingDirectories",added:b,removed:w});if(n.scratchpadDirectory!==e.scratchpadDirectory)r.push({field:"scratchpadDirectory"});return r};
function b3(e,n){return[...n.workingDirectory===void 0?[{field:"workingDirectory"}]:[],...n.scratchpadDirectory===void 0&&e.withScratchpad?[{field:"scratchpadDirectory"}]:[]]};
function U3e(e,n){let r=[];for(let s of n)switch(s.field){case"workingDirectory":if(e.workingDirectory===void 0)r.push($yn);else{let g=s.from===void 0?"":` (was ${Yh(s.from)})`;r.push(`Primary working directory: ${Yh(e.workingDirectory)}${g}`)}break;case"isWorktree":if(e.workingDirectory===void 0)break;if(e.isWorktree)r.push(L3e,D3e);else r.push(Fyn);break;case"isGitRepo":if(e.workingDirectory!==void 0)r.push(`Is a git repository: ${e.isGitRepo} (was ${!e.isGitRepo})`);break;case"additionalWorkingDirectories":if(s.added.length>0)r.push("Additional working directories added:",s.added.map(Yh));if(s.removed.length>0)r.push("Additional working directories removed:",s.removed.map(Yh));break;case"scratchpadDirectory":r.push(e.scratchpadDirectory!==void 0?F3e(Yh(e.scratchpadDirectory)):"The scratchpad directory announced earlier is no longer available; use it no further.");break}if(r.length===0)return"";return[Nyn,...Sm(r)].join(`
`)};
function Jyn(e){return e.type==="attachment"&&e.attachment.type==="environment"};
function aW(e){let n=Zyn(e),r=n.flatMap((h)=>h.readable?[h]:[]),s=n.at(-1),g=n.findLast((h)=>M3e(h)||I3e(h));return{latest:s?.readable?s.snapshot:void 0,newestReadable:r.at(-1)?.snapshot,hasWholeBlock:r.some((h)=>h.changes===void 0),standing:n.reduce((h,b)=>M3e(b)?O3e(b):I3e(b)?void 0:h,void 0),mentioned:g&&O3e(g)}};
function M3e(e){return e.readable?e.snapshot.workingDirectory!==void 0:e.shown};
function I3e(e){return e.readable&&e.snapshot.workingDirectory===void 0&&e.changes?.some((n)=>n.field==="workingDirectory")===!0};
function O3e(e){if(!e.readable)return{withScratchpad:!0};return{withScratchpad:e.snapshot.workingDirectory!==void 0?e.snapshot.scratchpadDirectory!==void 0:e.changes?.some((n)=>n.field==="scratchpadDirectory")===!0}};
function Zyn(e){return e.flatMap((n,r)=>{if(!Jyn(n))return[];let s=vhe().safeParse(n.attachment.snapshot).data,g=n.attachment.changes;return[s===void 0?{index:r,readable:!1,shown:Array.isArray(n.rendered)&&n.rendered.length>0,wholeBlock:!Array.isArray(g)}:{index:r,readable:!0,snapshot:s,changes:Array.isArray(g)?g.flatMap((h)=>The().safeParse(h).data??[]):void 0}]})};
async function z3e(e,n,r){let s=pee(),g=await G3e(n,await r());if(pee()===s)Jto(e,g);return g};
var d_n="\x00";
function K3e(e,n){let r=`${e}${d_n}${JSON.stringify(n)}`,s=Fet();return s.has(r)?Promise.resolve(s.get(r)??null):z3e(r,e,()=>n)};
var u_n="env_info_model";
var Che=f(()=>u({modelId:o(),marketingName:o().nullable(),knowledgeCutoff:o().nullable()}));
var p_n=f(()=>o().nullable().optional());
function h_n(e){return xa(Be(e))?.knowledge_cutoff??null};
function V3e(e){return{modelId:e,marketingName:Wp(e)??null,knowledgeCutoff:h_n(e)}};
function __n(e){return e.marketingName?`You are powered by the model named ${e.marketingName}. The exact model ID is ${e.modelId}.`:`You are powered by the model ${e.modelId}.`};
function v_n(e){return e.knowledgeCutoff?`Assistant knowledge cutoff is ${e.knowledgeCutoff}.`:null};
function Y3e(e){return[__n(e),v_n(e)].filter((n)=>n!==null).join(" ")};
async function X3e(e){let n=await K3e(u_n,Y3e(e));return{type:"model",identity:e,text:n}};
function Q3e(e){let n=p_n().safeParse(e.text);return n.success&&n.data!==void 0?n.data:Y3e(e.identity)};
function J3e(e,n){return e.modelId===n.modelId&&e.marketingName===n.marketingName&&e.knowledgeCutoff===n.knowledgeCutoff};
function T_n(e){return e.type==="attachment"&&e.attachment.type==="model"};
function Ahe(e){let n=e.findLast(T_n)?.attachment,r=Che().safeParse(n?.identity);return r.success?{type:"model",identity:r.data,text:n?.text}:void 0};
function asn(e){return Ahe(e)?.identity};
function r2(e){if(e?.type==="assistant"&&"usage"in e.message&&!(e.message.content[0]?.type==="text"&&KTe.has(e.message.content[0].text))&&e.message.model!==Ma&&e.isUnmetered!==!0)return e.message.usage;return};
function e_t(e){let n=r2(e);return n?yx(n):void 0};
function v5(e){for(let n=e.length-1;n>=0;n--){let r=e_t(e[n]);if(r!==void 0)return r}return 0};
function oce(e){let r=e.findLast((g)=>g.type==="assistant");if(!r)return!1;let s=r2(r);return s?yx(s)>200000:!1};
var Vio=["off","infinite","fixed","countdown","padded-countdown"];
var Yio=5000000;
var ZCt=15000000;
var Xio=[75,50,25,10,0];
var Qio="tengu_lapis_anchor_threshold";
class eRt{#e=new Map;#t=new Map;#n=new Map;#o=new Map;rollOverContext(e,n){this.#e.set(e,(this.#e.get(e)??0)+n);let r=this.#r(e);r.rolledOver+=n,r.rolloverCount++}reanchorTaskBudget(e,n){this.#o.delete(e),this.#t.set(e,(this.#e.get(e)??0)+n),this.#n.set(e,0)}cumulativeUsed(e,n){let s=(this.#e.get(e)??0)+n-(this.#t.get(e)??0),g=this.#n.get(e)??0,h=Math.max(g,s);return this.#n.set(e,h),h}remaining(e,n,r){let s=this.cumulativeUsed(e,n),g=r-s,h=this.#r(e);for(let b of Xio){if(b>=h.loggedDownToPercent)continue;if(g>r*b/100)break;h.loggedDownToPercent=b,i(Qio,{thresholdPercent:b,budget:r,used:s,remaining:g,rolledOver:h.rolledOver,rolloverCount:h.rolloverCount,msSinceAnchor:Date.now()-h.anchoredAt,isSubagent:e!=="main"})}return g}#r(e){let n=this.#o.get(e);if(n===void 0)n={anchoredAt:Date.now(),rolledOver:0,rolloverCount:0,loggedDownToPercent:100},this.#o.set(e,n);return n}};
var gin=new Tt(()=>new eRt);
function ire(e){return typeof e==="string"&&Vio.includes(e)};
var hMe="tengu_lapis_anchor";
var yMe="tengu_lapis_anchor_budget";
var _Me="tengu_lapis_anchor_user_turn";
var kMe="tengu_lapis_anchor_from_client_data";
function SMe(e,n){if(n!==void 0)t(`[total_tokens reminder] ignoring clientData ${e} of type ${typeof n}; falling through to GrowthBook`,{level:"warn"})};
function eye(){let e=ko();return e.totalTokensReminderMode??=Jio(),e.totalTokensReminderMode};
function Jio(){let e=a.CLAUDE_CODE_TOTAL_TOKENS_REMINDER;if(ire(e))return e;let n=tt().totalTokensReminder;if(ire(n))return n;let r=Kd()?.[hMe],s=ire(r)?r:r===!1?"off":void 0;if(s!==void 0)return i(kMe,{mode:c(s)}),s;SMe(hMe,r);let g=k(hMe,"padded-countdown");return ire(g)?g:"padded-countdown"};
function are(){let e=ko();return e.totalTokensReminderBudget??=Zio(),e.totalTokensReminderBudget};
function Zio(){let e=a.CLAUDE_CODE_TOTAL_TOKENS_REMINDER_BUDGET;if(e!==void 0&&e>0)return e;let n=tt().totalTokensReminderBudget;if(Number.isFinite(n)&&n>0)return n;let r=Kd()?.[yMe];if(typeof r==="number"&&Number.isInteger(r)&&r>0)return i(kMe,{budget:r}),r;SMe(yMe,r);let s=k(yMe,ZCt);return Number.isFinite(s)&&s>0?s:ZCt};
function tRt(){let e=ko();return e.totalTokensReminderAfterUserTurn??=eao(),e.totalTokensReminderAfterUserTurn};
function eao(){let e=a.CLAUDE_CODE_TOTAL_TOKENS_REMINDER_AFTER_USER_TURN;if(e!==void 0)return e;let n=tt().totalTokensReminderAfterUserTurn;if(n!==void 0)return n;let r=Kd()?.[_Me];if(typeof r==="boolean")return i(kMe,{userTurn:r}),r;return SMe(_Me,r),k(_Me,!0)};
function lre(e,n){return`<total_tokens>${e==="infinite"?"Infinite":e==="fixed"?Yio:Math.max(0,n)} tokens left</total_tokens>`};
function _Rt(e){if(a.CLAUDE_CODE_DISABLE_ATTACHMENTS||a.CLAUDE_CODE_SIMPLE)return null;let n=eye();if(n==="off")return null;let r=n==="padded-countdown"?are():pf(e,Qp());return lre(n,r)};
function R1e(e){return!Uxe()&&!e.bareFork&&!e.isolatedContext};
async function R7t(e,n){if(!R1e(e.options))return[];let r=await N3e({cwd:Lm(),additionalWorkingDirectories:Array.from(pe(e).additionalWorkingDirectories.keys())}),{latest:s,newestReadable:g,hasWholeBlock:h,standing:b}=aW(ai(n??[])),w=k3(s)??r,D=w.workingDirectory!==void 0,j=D?void 0:b,z=g!==void 0&&g.workingDirectory===void 0,K=D&&z;if(j||K)i("tengu_environment_directory_change",{change:c(j?"gone":"appeared"),resent:j!==void 0&&z});let he=j??(oW(w)?b:void 0),_e=he?b3(he,w):[];if(!s||!h||!Ehe(s,w)||K)return[{type:"environment",snapshot:w},..._e.length>0?[{type:"environment",snapshot:w,changes:_e}]:[]];let ke=B3e(s,w),be=[...ke,..._e.filter((ve)=>!ke.some((Te)=>Te.field===ve.field))];return be.length===0?[]:[{type:"environment",snapshot:w,changes:be}]};
function i0o(e,n,r){let{latest:s,newestReadable:g,standing:h,mentioned:b}=aW(e),w=k3(s);if(w!==void 0){if(!g)return[];let be=w,ve=b?b3(b,be):[],Te=aW(n);return[...Te.hasWholeBlock&&Te.latest&&Ehe(Te.latest,be)?[]:[{type:"environment",snapshot:be}],...ve.length>0?[{type:"environment",snapshot:be,changes:ve}]:[]]}let D=r?s:g;if(!D)return[];let{workingDirectory:j,scratchpadDirectory:z,...K}=D,he=r?D:{...K,isWorktree:!1,isGitRepo:!1},_e=r?void 0:b;if(_e)i("tengu_environment_directory_change",{change:S("gone"),resent:h===void 0||D.workingDirectory===void 0});let ke=_e?b3(_e,he):[];return[...aW(n).hasWholeBlock?[]:[{type:"environment",snapshot:he}],...ke.length>0?[{type:"environment",snapshot:he,changes:ke}]:[]]};
async function x7t(e,n){if(!R1e(e.options))return[];let r=ai(n??[]),s=pe(e).mode,g=V3e(sm({permissionMode:s,mainLoopModel:tm(e),exceeds200kTokens:s==="plan"&&oce(r)})),h=asn(r);return h&&J3e(h,g)?[]:[await X3e(g)]};
function a0o(e,n){if(asn(n))return[];let r=Ahe(e);return r?[r]:[]};
function _sr(e,n,r,s,g){let h=eye();if(h==="off")return[];let b=s??"main",w=v5(n),D=gin.of(e);if(g)D.reanchorTaskBudget(b,w);let j=h==="countdown"?pf(r,Qp())-w:h==="padded-countdown"?D.remaining(b,w,are()):0;return[{type:"total_tokens_reminder",text:lre(h,j)}]};
var bv="The user doesn't want to proceed with this tool use. The tool use was rejected (eg. if it was a file edit, the new_string was NOT written to the file). STOP what you are doing and wait for the user to tell you how to proceed.";
var KTe=new Set([Jw,fu,Qw,bv,$M]);
function cl(e){return`${pD}
${e}
${TOe}`};
function Bi(e){return e?.type==="system"&&e.subtype==="compact_boundary"};
function hdt(e){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r&&Bi(r))return n}return-1};
function ai(e,n){let r=hdt(e);return r===-1?e:e.slice(r)};
const normalizers={total_tokens_reminder:(e)=>[Re({content:cl(e.text),isMeta:!0})],environment:(e)=>{let n=vhe().safeParse(e.snapshot);if(!n.success)return[];let r=Array.isArray(e.changes)?U3e(n.data,e.changes.flatMap((s)=>{let g=The().safeParse(s);return g.success?[g.data]:[]})):$3e(n.data);if(r==="")return[];return ya([Re({content:r,isMeta:!0})])},model:(e)=>{let n=Che().safeParse(e.identity);if(!n.success)return[];let r=Q3e({...e,identity:n.data});if(r===null||r==="")return[];return ya([Re({content:r,isMeta:!0})])}};
return {environment:R7t,model:x7t,restoreEnvironment:i0o,restoreModel:a0o,environmentSchema:vhe,changesSchema:The,modelSchema:Che,readEnvironment:aW,readModel:Ahe,formatEnvironment:$3e,formatEnvironmentChanges:U3e,modelIdentity:V3e,formatModel:Y3e,totalTokens:_sr,totalTokensMode:eye,totalTokensAfterUserTurn:tRt,agentSystemTokenReminder:_Rt,usage:v5,budgets:gin,normalizers};
}
export function createContextRuntime287(ports){
const m0=module0({"a":ports["a"]});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({});
const m5=module5({});
const m6=module6({"Uxe":m0["Uxe"],"kto":ports["toolsMachine"],"oGr":m1["oGr"],"Kx":ports["NR"],"a":ports["a"],"Dyn":ports["Ppn"],"P3e":ports["U6e"],"Oyn":ports["xpn"],"Fw":ports["Vb"],"NE":ports["jw"],"Uc":ports["Rc"],"cW":ports["M2"],"ko":ports["ko"],"$a":ports["Ta"],"vS":ports["Yb"],"Lm":ports["nm"],"pe":ports["pe"],"f":ports["p"],"u":ports["d"],"o":ports["o"],"H":ports["O"],"T":ports["k"],"Wo":ports["Fo"],"x":ports["R"],"i":ports["i"],"c":ports["c"],"Wp":ports["mp"],"xa":ports["Va"],"Be":ports["Be"],"sm":ports["Jf"],"tm":ports["qf"],"Jw":m2["Jw"],"fu":m2["fu"],"Qw":m2["Qw"],"$M":m3["$M"],"Ma":m3["Ma"],"yx":m0["yx"],"Fet":ports["S7e"],"pee":ports["tQ"],"G3e":ports["dmn"],"Jto":ports["Y5r"],"S":ports["_"],"Yh":m1["Yh"],"A3e":ports["B6e"],"tt":ports["Xe"],"Kd":ports["md"],"t":ports["t"],"k":ports["x"],"Tt":m4["Tt"],"pf":ports["Gg"],"Qp":ports["Em"],"Re":ports["ke"],"pD":m5["pD"],"TOe":m5["TOe"],"ya":ports["ji"]});
return m6;
}
