export function createHookMatcher287(ports){
function module0(imports){
const uO=imports["uO"];
const tR=imports["tR"];
function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
var Vo={inline:"--plugin-dir session plugins",builtin:"built-in plugins","skills-dir":"plugins auto-loaded from .claude/skills/",synced:"plugins synced from your claude.ai account","claude-plugin-test":"plugins loaded by claude plugin test",npm:"plugins installed from an npm registry (`<package>@npm`); remove this marketplace and add it again under another name",pip:"plugins installed from a Python package index (reserved; not yet available)",uv:"plugins installed from a Python package index through uv (reserved; not yet available)",cargo:"plugins installed from a Rust crate registry (reserved; not yet available)",github:"plugins installed straight from a GitHub repository (`<owner>/<repo>@github`; reserved; not yet available)",gh:"plugins installed straight from a GitHub repository (reserved; not yet available)"};
function yz(e){return Object.hasOwn(Vo,e)};
function AXr(e){if(uO(e).composes==="tier")return!1;return tR(e).parentIncluded};
return {N,Vo,yz,AXr};
}
function module1(imports){
const N=imports["N"];
function ss(e,t){if(N(t)){let o=Object.create(null);for(let r of Object.keys(t).toSorted())Object.defineProperty(o,r,{value:t[r],enumerable:!0});return o}return t};
var is="\x00unserializable:";
function as(){let e=0;return()=>`${is}${++e}`};
var ps=as();
function Un(e){try{return JSON.stringify(e,ss)}catch{return ps()}};
return {ss,is,as,ps,Un};
}
function module2(imports){
const n=imports["n"];
const c=imports["c"];
function w6e(){return n().host.settingsSource.parentManagedSettingsInvalid()};
function Ut(){return n().host.launchOptions.diskless()};
function R(){return c()??n().hookRegistry.holder()};
function Net(){return R().pluginHookRunner};
function $to(){return c()?.bareMcpServerMatchersWarned??n().sessionScratch.bareMcpServerMatchersWarned()};
return {w6e,Ut,R,Net,$to};
}
function module3(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
return {Le};
}
function module4(imports){
const Le=imports["Le"];
function i(e){let n=process.argv.indexOf("--");return(n===-1?process.argv:process.argv.slice(0,n)).includes(e)};
function xr(){return Le(process.env.CLAUDE_CODE_SIMPLE)||i("--bare")};
function yr(){return Le(process.env.CLAUDE_CODE_SAFE_MODE)||i("--safe-mode")};
return {i,xr,yr};
}
function module5(imports){
const Ut=imports["Ut"];
const yr=imports["yr"];
const xr=imports["xr"];
var t={claudeMd:!0,skills:!0,workflows:!1,plugins:!0,pluginMonitors:!1,themes:!1,hljsLanguages:!0,hooks:!0,statusLine:!1,fileSuggestion:!1,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!0,agents:!0,outputStyles:!1,lspServers:!0,keybindings:!1};
var l={claudeMd:!1,skills:!1,workflows:!1,plugins:!1,pluginMonitors:!1,themes:!1,hljsLanguages:!1,hooks:!0,statusLine:!0,fileSuggestion:!0,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!1,agents:!1,outputStyles:!1,lspServers:!1,keybindings:!1};
var o={claudeMd:!1,skills:!1,workflows:!1,plugins:!1,pluginMonitors:!1,themes:!1,hljsLanguages:!1,hooks:!1,statusLine:!0,fileSuggestion:!0,mcpAutoDiscovered:!1,mcpClaudeAi:!1,mcpAgentFrontmatter:!1,agents:!1,outputStyles:!1,lspServers:!1,keybindings:!1};
function Gr(e,s){if(o[e]&&Ut())return!0;if(yr()&&!l[e])return!0;if(xr()&&!s?.explicitlyRequested)return t[e];return!1};
return {t,l,o,Gr};
}
function module6(imports){
const AXr=imports["AXr"];
const M=imports["M"];
function bje(){return AXr(M())};
function i0e(e){return e.filter((n)=>n.severity!=="warning")};
return {bje,i0e};
}
function module7(imports){
const ge=imports["ge"];
const yr=imports["yr"];
const er=imports["er"];
const i0e=imports["i0e"];
const eA=imports["eA"];
const w6e=imports["w6e"];
const bje=imports["bje"];
function jd(o){let t=ge("policySettings")?.strictPluginOnlyCustomization;if(t===!0)return!0;if(Array.isArray(t))return t.includes(o);return!1};
function Ty(){return yr()||coe()};
function coe(){let o=ge("policySettings");if(o?.allowManagedHooksOnly===!0)return!0;if(er().disableAllHooks===!0&&o?.disableAllHooks!==!0)return!0;return!1};
function TXn(){return yr()||ge("policySettings")?.allowManagedHooksOnly===!0||doe()};
function doe(){return i0e(eA()).length>0||w6e()&&bje()};
function yGr(){return TXn()||jd("hooks")};
function Wb(){return ge("policySettings")?.disableAllHooks===!0};
function obe(){return Wb()||coe()};
return {jd,Ty,coe,TXn,doe,yGr,Wb,obe};
}
function module8(imports){
const yz=imports["yz"];
var b=new Map;
var A=()=>{let e=b.get("external")??new Map([["responsive-mode","cc-plugin-responsive-mode"],["tips","cc-plugin-tips"],["mermaid","cc-plugin-mermaid"],["claude-test","cc-plugin-claude-test"],["agents-md","cc-plugin-agents-md"],["diff","cc-plugin-diff"],["telemetry","cc-plugin-telemetry"],["plugin-authoring","cc-plugin-plugin-authoring"],["sec-default","cc-plugin-sec-default"],...[]]);return b.set("external",e),e};
var m=()=>A();
var g=(e)=>[...m()].flatMap(([n,t])=>t===e?[n]:[]);
var _i="builtin";
function TS(e){let n=P(e);if(n===void 0)return e;let t=m(),r=h(n)[0],i=t.get(n)??t.get(Nr(n))??(r===void 0?void 0:t.get(r));return i===void 0?e:`${i}@${_i}`};
function P(e){let n=e.lastIndexOf("@");return n>0&&lbn(e.slice(n+1))===_i?e.slice(0,n):void 0};
function h(e){let n=g(e);return n.length>0?n:g(Nr(e))};
function lbn(e){let n=e.toLowerCase();return yz(n)?n:e};
function Nr(e){return e.normalize("NFC").toLowerCase()};
return {b,A,m,g,_i,TS,P,h,lbn,Nr};
}
function module9(imports){
const byt=imports["byt"];
const ge=imports["ge"];
const TS=imports["TS"];
function I1(){let e=byt();if(e)return new Set(e.managedIds);let n=ge("policySettings")?.enabledPlugins;if(!n)return null;let o=new Set;for(let[a,i]of Object.entries(n))if(i===!0&&a.includes("@"))o.add(TS(a));return o.size>0?o:null};
return {I1};
}
function module10(imports){
const Gr=imports["Gr"];
const S$=imports["S$"];
const Wb=imports["Wb"];
const Ty=imports["Ty"];
const yr=imports["yr"];
const I1=imports["I1"];
const yGr=imports["yGr"];
const Net=imports["Net"];
const V9=imports["V9"];
const LEe=imports["LEe"];
const TXn=imports["TXn"];
function l9(o){if(Gr("hooks"))return[];let e=S$()?.[o]??[];if(Wb())return e.filter((n)=>!("pluginRoot"in n)&&!("deviceOwner"in n));let i=u(),{managedOnly:t,managedPluginIds:l}=i,r=yGr(),s=Net();return[...V9()?.[o]??[],...t?[]:LEe()?.[o]??[],...e.filter((n)=>a(n)&&s?.holds(n.pluginId)===!0?!(TXn()&&!l?.has(n.pluginId)):(!("pluginRoot"in n)||g(n.pluginId,i))&&!(r&&("deviceOwner"in n)))]};
function a(o){return"pluginRoot"in o&&o.hooks.every((e)=>e.type==="command")};
function u(){let o=Ty();return{managedOnly:o,managedPluginIds:o&&!yr()?I1():null}};
function g(o,{managedOnly:e,managedPluginIds:i}){return!e||i?.has(o)===!0};
return {l9,a,u,g};
}
function module11(imports){

var c={Task:"Agent",KillShell:"TaskStop",KillBash:"TaskStop",ListPeers:"ListAgents",Brief:"SendUserMessage",ListMcpResources:"ListMcpResourcesTool",ReadMcpResource:"ReadMcpResourceTool",ReadMcpResourceDir:"ReadMcpResourceDirTool"};
function Zl(e){return Object.hasOwn(c,e)?c[e]:e};
function TZe(e){let n=[];for(let[t,r]of Object.entries(c))if(r===e)n.push(t);return n};
function bfe(e,n){let t=n&&Object.hasOwn(n,e)?n[e]:void 0;return t!==void 0&&t!==e?[e,t]:[e]};
function LZ(e,n){if(!n)return[];let t=[];for(let[r,s]of Object.entries(n))if(s===e)t.push(r);return t};
function $Xr(e){return UXr(e).replaceAll("\\\\","\\")};
function UXr(e){return e.replaceAll("\\(","(").replaceAll("\\)",")")};
function rWe(e){let n=C(e,"("),t=R(e,")");if(n===-1&&t===-1)return{kind:"bare"};let r=e.substring(0,n);if(n===-1||t<=n||t!==e.length-1||/[()]/.test(r))return{kind:"malformed"};return{kind:"call",toolName:r,rawContent:e.substring(n+1,t)}};
function jn(e){let n=rWe(e);if(n.kind!=="call"||!n.toolName)return{toolName:Zl(e)};if(n.rawContent===""||n.rawContent==="*")return{toolName:Zl(n.toolName)};let t=$Xr(n.rawContent);return{toolName:Zl(n.toolName),ruleContent:t}};
function C(e,n){for(let t=0;t<e.length;t++)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1};
function R(e,n){for(let t=e.length-1;t>=0;t--)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1};
return {c,Zl,TZe,bfe,LZ,$Xr,UXr,rWe,jn,C,R};
}
function module12(imports){

function qMr(e){return typeof e==="object"&&e!==null&&"deviceOwner"in e&&typeof e.deviceOwner==="string"};
return {qMr};
}
function module13(imports){
const $a=imports["$a"];
function rj(){return $a()?"bash":"powershell"};
return {rj};
}
function module14(imports){

function G(n,e){let r=0;for(let t of n)r+=+!!e(t);return r};
function L(n){return[...new Set(n)]};
return {G,L};
}
function module15(imports){

function l(n){return n instanceof Error?n.message:String(n)};
return {l};
}
function module16(imports){
const ge=imports["ge"];
const Un=imports["Un"];
const l9=imports["l9"];
const obe=imports["obe"];
const t2e=imports["t2e"];
const Zyt=imports["Zyt"];
const HWt=imports["HWt"];
const $to=imports["$to"];
const t=imports["t"];
const bfe=imports["bfe"];
const Zl=imports["Zl"];
const _n=imports["_n"];
const TZe=imports["TZe"];
const LZ=imports["LZ"];
const qMr=imports["qMr"];
const rj=imports["rj"];
const _=imports["_"];
const L=imports["L"];
const UWt=imports["UWt"];
const l=imports["l"];
const jn=imports["jn"];
const Net=imports["Net"];
const G=imports["G"];
var Ert={ArtifactComments:"Artifact",ArtifactData:"Artifact",ArtifactCheck:"Artifact"};
var Crt={Artifact:{comments:"ArtifactComments",reply:"ArtifactComments",resolve:"ArtifactComments",watch:"ArtifactComments",unwatch:"ArtifactComments",status:"ArtifactComments",resume_replies:"ArtifactComments",read_db:"ArtifactData",write_db:"ArtifactData",verify:"ArtifactCheck",preview:"ArtifactCheck"}};
function F2n(e){return Object.hasOwn(Ert,e)?Ert[e]:void 0};
function Rrt(e,n){if(!Object.hasOwn(Crt,e))return;let r=n?.action,s=Crt[e];return typeof r==="string"&&Object.hasOwn(s,r)?s[r]:void 0};
var DMe=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionDenied"]);
function G$o(e,n,r){if(!(n?/^[a-zA-Z0-9_|, -]+$/:/^[a-zA-Z0-9_|]+$/).test(e))return;return e.split(n?/[|,]/:"|").map((g)=>g.trim()).filter(Boolean).flatMap((g)=>bfe(Zl(g),r))};
function PLe(e,n){if(e!=="PreModelSwitch"&&e!=="PostModelSwitch")return n;let r=n.replace(/\[[12]m\](?=\s*(?:[|,]|$))/gi,"");return r.trim()===""?n:r};
function KWt(e){switch(e.hook_event_name){case"PreToolUse":case"PostToolUse":case"PostToolUseFailure":case"PermissionRequest":case"PermissionDenied":return e.tool_name;case"UserPromptExpansion":return e.command_name;case"SessionStart":return e.source;case"Setup":return e.trigger;case"PreCompact":case"PostCompact":return e.trigger;case"PreModelSwitch":{let n=t2e(e.to_model);return Zyt(n)?n:void 0}case"PostModelSwitch":{let n=t2e(e.to_model);return Zyt(n)?n:void 0}case"Notification":return e.notification_type;case"SessionEnd":return e.reason;case"StopFailure":return e.error;case"SubagentStart":return e.agent_type;case"SubagentStop":return e.agent_type;case"TeammateIdle":case"TaskCreated":case"TaskCompleted":return;case"Elicitation":return e.mcp_server_name;case"ElicitationResult":return e.mcp_server_name;case"ConfigChange":return e.source;case"DirectoryAdded":return e.source;case"InstructionsLoaded":return e.load_reason;case"FileChanged":return HWt(e.file_path);default:return}};
var ILe=new Set(["PreToolUse","PostToolUse","PostToolUseFailure","PermissionRequest","PermissionDenied","UserPromptExpansion","SessionStart","SessionEnd","Setup","PreCompact","PostCompact","PreModelSwitch","PostModelSwitch","Notification","SubagentStart","SubagentStop","Elicitation","ElicitationResult","ConfigChange","InstructionsLoaded","DirectoryAdded"]);
function z$o(e){if(!/^[a-zA-Z0-9_|, -]+$/.test(e))return!1;return e.split(/[|,]/).map((n)=>n.trim()).some((n)=>n.startsWith("mcp__")&&!n.slice(5).includes("__"))};
function q$o(e,n){if(!n||!DMe.has(e))return;let r=$to();if(r.has(n)||!z$o(n))return;r.add(n);let s=n.split(/[|,]/).map((g)=>g.trim()).find((g)=>g.startsWith("mcp__")&&!g.slice(5).includes("__"))??n;t(`Hook matcher \`${s}\` matches no tool (it is compared as an exact string). To match all tools from this server, use \`${s}__.*\`. See CHANGELOG v2.1.195.`,{level:"warn"})};
var K$o=/^\^?(?:\((?:\?:)?)?\^?\w+\$?(?:\|\^?\w+\$?)*\)?\$?$/;
function V$o(e,n){let r=n===void 0?void 0:_n(n,e);if(r!==void 0)return r.mcpInfo===void 0?r.familyParentToolName:void 0;return F2n(e)};
function VWt(e,n,r){let s=[],g=V$o(e,n);if(g!==void 0)s.push(g);let h=n===void 0?void 0:_n(n,e);if(h!==void 0){if(h.mcpInfo===void 0)s.push(...h.hookMatcherFamilyNames?.(r)??[])}else{let b=Rrt(e,r);if(b!==void 0)s.push(b)}return s};
function OLe(e,n,r,s,g,h){if(!n||n==="*")return!0;let b=G$o(n,r,s),w=VWt(e,g,h);if(b!==void 0)return b.includes(e)||w.some((D)=>b.includes(D));try{let D=new RegExp(n);if(D.test(e))return!0;if(K$o.test(n)&&w.some((j)=>D.test(j)))return!0;for(let j of TZe(e))if(D.test(j))return!0;for(let j of LZ(e,s))if(D.test(j))return!0;return!1}catch{return t(`Invalid regex pattern in hook matcher: ${n}`),!1}};
async function Y$o(e,n){let r=await YWt(e,n);if(r===void 0)return;let{names:s,patternMatcher:g}=r;return(h,b)=>{let w=jn(h);if(!s.includes(Zl(w.toolName)))return!1;if(!w.ruleContent)return!0;if(!g)return!1;return b||g(w.ruleContent)}};
async function YWt(e,n){if(e.hook_event_name!=="PreToolUse"&&e.hook_event_name!=="PostToolUse"&&e.hook_event_name!=="PostToolUseFailure"&&e.hook_event_name!=="PermissionRequest"&&e.hook_event_name!=="PermissionDenied")return;let r=Zl(e.tool_name),s=n&&_n(n,e.tool_name),g=s?.inputSchema.safeParse(e.tool_input),h=g?.success&&s?.preparePermissionMatcher?await s.preparePermissionMatcher(g.data):void 0;return{names:[r,...VWt(r,n,e.tool_input)],patternMatcher:h,judgeable:g?.success===!0}};
function Yx(e){switch(e.type){case"command":return`command\x00${e.shell??rj()}\x00${e.command}\x00${_(e.args??null)}\x00${e.if??""}`;case"http":return`http\x00${e.url}\x00${e.if??""}`;case"mcp_tool":return`mcp_tool\x00${e.server}\x00${e.tool}\x00${_(e.input??{})}\x00${e.if??""}`;case"script":return`script\x00${_(e.script??null)}\x00${_(e.file??null)}\x00${e.if??""}`;default:return}};
function I0o(e,n){if(e.type==="callback"||e.type==="function"||n.type==="callback"||n.type==="function")return e===n;let r=Yx(e);return r!==void 0?r===Yx(n):UWt(e,n)};
function O0o(e,n,r,s){if(e.type==="callback"||e.type==="function")return;let g=Yx(e);if(g===void 0)return;for(let h of[...s].reverse())for(let b of ge(h)?.hooks?.[n]??[]){if(!r.includes(b.matcher??""))continue;let w=b.hooks.find((D)=>Yx(D)===g);if(w!==void 0)return w}return};
function LLe(e){return e.hook.type==="callback"&&e.hook.internal===!0};
function MB(e,n){return`${e.pluginRoot??e.skillRoot??""}\x00${n}`};
function W0o(e,n){let r=new Set((ge("policySettings")?.hooks?.[n]??[]).map((s)=>Un(s)));return e.filter((s)=>!r.has(Un(s)))};
function OB(e,n,r,s){if(s?.managedHooksOnly){let w=ge("policySettings");if(w?.disableAllHooks===!0)return[];return[...w?.hooks?.[r]??[]]}let g=s?.managedHooksExcluded?W0o(l9(r),r):[...l9(r)],h=typeof n==="string"?[n]:n;if(e===void 0||obe())return g;for(let w of h){let D=e.get(w,r).get(r);if(D)g.push(...D)}let b=h[0];if(b!==void 0){let w=e.getFunctionHooks(b,r).get(r);if(w)g.push(...w)}return g};
async function d1t(e,n,r,s,g,h){try{let b=OB(e,n,r,h);h?.onPluginMatchersRead?.(b.filter((kt)=>("pluginRoot"in kt)));let w=KWt(s),D=ILe.has(s.hook_event_name);for(let kt of b)q$o(r,kt.matcher);t(`Getting matching hook commands for ${r} with query: ${w}`,{level:"verbose"}),t(`Found ${b.length} hook matchers in settings`,{level:"verbose"});let j=h?.getToolAliases?.(),K=(w!==void 0?b.filter((kt)=>!kt.matcher||OLe(w,PLe(r,kt.matcher),D,j,g,"tool_input"in s?s.tool_input:void 0)):b).flatMap((kt)=>{let $t="pluginRoot"in kt?kt.pluginRoot:void 0,It="pluginId"in kt?kt.pluginId:void 0,jt="pluginRoot"in kt?kt.pluginName:void 0,Xt="skillRoot"in kt?kt.skillRoot:void 0,un="projectRoot"in kt&&typeof kt.projectRoot==="string"&&!("pluginRoot"in kt)&&!("skillRoot"in kt)&&!("deviceOwner"in kt)&&!("origin"in kt)?kt.projectRoot:void 0,rn=$t?"pluginName"in kt?`plugin:${kt.pluginName}`:"plugin":Xt?"skillName"in kt?`skill:${kt.skillName}`:"skill":"settings",Yt=!kt.matcher||kt.matcher==="*"||kt.matcher===".*",Qt=qMr(kt),nn="origin"in kt&&kt.origin==="sdkHost";return kt.hooks.map((Pn)=>({hook:Pn,pluginRoot:$t,pluginId:It,pluginName:jt,skillRoot:Xt,...un!==void 0&&{projectRoot:un},hookSource:rn,matcherIsMatchAll:Yt,...h?.recordMatchers&&{matcherTexts:[kt.matcher??""]},...Qt&&{deviceForwarded:Qt},...nn&&{sdkHost:nn}}))});if(K.every((kt)=>kt.hook.type==="callback"||kt.hook.type==="function"))return K;let he=(kt)=>kt.if??"",_e=Array.from(new Map(K.filter((kt)=>kt.hook.type==="command").map((kt)=>[MB(kt,Yx(kt.hook)??""),kt])).values()),ke=Array.from(new Map(K.filter((kt)=>kt.hook.type==="prompt").map((kt)=>[MB(kt,`${kt.hook.prompt}\x00${he(kt.hook)}`),kt])).values()),be=Array.from(new Map(K.filter((kt)=>kt.hook.type==="agent").map((kt)=>[MB(kt,`${kt.hook.prompt}\x00${he(kt.hook)}`),kt])).values()),ve=Array.from(new Map(K.filter((kt)=>kt.hook.type==="http").map((kt)=>[MB(kt,Yx(kt.hook)??""),kt])).values()),Te=Array.from(new Map(K.filter((kt)=>kt.hook.type==="mcp_tool").map((kt)=>[MB(kt,Yx(kt.hook)??""),kt])).values()),xe=Array.from(new Map(K.filter((kt)=>kt.hook.type==="script").map((kt)=>[MB(kt,Yx(kt.hook)??""),kt])).values()),Pe=K.filter((kt)=>kt.hook.type==="callback"),$e=K.filter((kt)=>kt.hook.type==="function"),Ne=(kt)=>{if(h?.recordMatchers!==!0)return kt;try{let $t=L(K.filter((jt)=>jt.pluginRoot===kt.pluginRoot&&jt.skillRoot===kt.skillRoot&&I0o(jt.hook,kt.hook)).flatMap((jt)=>jt.matcherTexts??[])),It=kt.pluginRoot===void 0&&kt.skillRoot===void 0?O0o(kt.hook,r,$t,h.ownSources??[]):void 0;return{...kt,matcherTexts:$t,hook:It??kt.hook}}catch($t){return t(`Hooks: could not establish whose settings define a hook (${l($t)}); treating it as the project's`),{...kt,matcherTexts:[]}}},We=[..._e.map(Ne),...ke,...be,...ve.map(Ne),...Te.map(Ne),...xe.map(Ne),...Pe,...$e],Qe=We.some((kt)=>(kt.hook.type==="command"||kt.hook.type==="prompt"||kt.hook.type==="agent"||kt.hook.type==="http"||kt.hook.type==="mcp_tool"||kt.hook.type==="script")&&kt.hook.if)?await Y$o(s,g):void 0,Ze=Net(),et=We.filter((kt)=>{if(kt.hook.type!=="command"&&kt.hook.type!=="prompt"&&kt.hook.type!=="agent"&&kt.hook.type!=="http"&&kt.hook.type!=="mcp_tool"&&kt.hook.type!=="script")return!0;let $t=kt.hook.if;if(!$t)return!0;if(!Qe)return t(`Hook if condition "${$t}" cannot be evaluated for non-tool event ${s.hook_event_name}`),!1;let It=kt.hook.type==="command"&&kt.pluginId!==void 0&&Ze?.holds(kt.pluginId)===!0;if(Qe($t,It))return!0;return t(`Skipping hook due to if condition "${$t}" not matching`),!1}),bt=r==="SessionStart"||r==="Setup"?et.filter((kt)=>{if(kt.hook.type==="http")return t(`Skipping HTTP hook ${kt.hook.url} \u2014 HTTP hooks are not supported for ${r}`),!1;return!0}):et,ht=G(bt,LLe);return t(`Matched ${bt.length-ht} unique hooks for query "${w??"no match query"}" (${K.length-ht} before deduplication)`,{level:"verbose"}),bt}catch{return[]}};
return {Ert,Crt,F2n,Rrt,DMe,G$o,PLe,KWt,ILe,z$o,q$o,K$o,V$o,VWt,OLe,Y$o,YWt,Yx,I0o,O0o,LLe,MB,W0o,OB,d1t};
}
const m0=module0({"uO":ports["policyHelperComposition"],"tR":ports["policyRecords"]});
const m1=module1({"N":m0["N"]});
const m2=module2({"n":ports["execution"],"c":ports["legacy"]});
const m3=module3({});
const m4=module4({"Le":m3["Le"]});
const m5=module5({"Ut":m2["Ut"],"yr":m4["yr"],"xr":m4["xr"]});
const m6=module6({"AXr":m0["AXr"],"M":ports["settingsPolicyContext"]});
const m7=module7({"ge":ports["settingsForSource"],"yr":m4["yr"],"er":ports["settings"],"i0e":m6["i0e"],"eA":ports["settingsErrors"],"w6e":m2["w6e"],"bje":m6["bje"]});
const m8=module8({"yz":m0["yz"]});
const m9=module9({"byt":ports["pluginPolicy"],"ge":ports["settingsForSource"],"TS":m8["TS"]});
const m10=module10({"Gr":m5["Gr"],"S$":ports["registered"],"Wb":m7["Wb"],"Ty":m7["Ty"],"yr":m4["yr"],"I1":m9["I1"],"yGr":m7["yGr"],"Net":m2["Net"],"V9":ports["snapshot"],"LEe":ports["agentHooks"],"TXn":m7["TXn"]});
const m11=module11({});
const m12=module12({});
const m13=module13({"$a":ports["usesBashTools"]});
const m14=module14({});
const m15=module15({});
const m16=module16({"ge":ports["settingsForSource"],"Un":m1["Un"],"l9":m10["l9"],"obe":m7["obe"],"t2e":ports["canonicalModel"],"Zyt":ports["knownCanonicalModel"],"HWt":ports["path"]["basename"],"$to":m2["$to"],"t":ports["debug"],"bfe":m11["bfe"],"Zl":m11["Zl"],"_n":ports["findTool"],"TZe":m11["TZe"],"LZ":m11["LZ"],"qMr":m12["qMr"],"rj":m13["rj"],"_":ports["stringify"],"L":m14["L"],"UWt":ports["util"]["isDeepStrictEqual"],"l":m15["l"],"jn":m11["jn"],"Net":m2["Net"],"G":m14["G"]});
return {"match":m16.d1t,"gather":m16.OB,"configuredMatchers":m10.l9,"query":m16.KWt,"managedIds":m9.I1,"settingsUnknown":m7.doe};
}
