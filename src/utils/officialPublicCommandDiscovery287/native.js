export function createCommandHook287(ports){const {A2,BBe,DN,Eyt,Ire,Lo,N0,Nr,XSn,aRn,dd,fa,gvt,hF,jq,lJ,us,wS,z2}=ports;const handler=ports.handler;
function qte(e,n){if(n.length===0||!e.some((s)=>s.loadedFrom==="syncedSkills"))return[...e];let r=new Set;return MI(r,n),F1(e,r)};
function PI(e,n,r=!1){if(!r&&z2(n))return;e.add(N0(n))};
function _S(e,n){let r=Ire(n);PI(e,n.name,r),PI(e,Lo(n),r);for(let s of n.aliases??[])PI(e,s,r)};
function pbe(e,n){e.add(N0(n.name));for(let r of n.aliases??[])e.add(N0(r))};
function MI(e,n){for(let r of n)if(r.loadedFrom!=="syncedSkills")_S(e,r)};
function nRn(e,n){return N0(hF(e.name))===""||n.has(N0(e.name))||n.has(N0(Eyt(Lo(e))))};
function ftt(e,n){let r=e.aliases;if(!r)return e;let s=r.filter((g)=>!n(g));if(s.length===r.length)return e;return{...e,aliases:s.length?s:void 0}};
function uX(e,n){return e.includes(":")||e.startsWith("mcp__")||n.has(e)};
function bbe(e,n){if(e.loadedFrom!=="syncedSkills")return e;if(nRn(e,n))return null;return D1(e,(r)=>uX(N0(r),n))};
function D1(e,n){let r=ftt(e,n);if(r.loadedFrom!=="syncedSkills")return r;let s=Lo(r);if(Eyt(s)===s||gKe(r)!==void 0)return r;let g=Eyt(s);return{...r,userFacingName:()=>g}};
function gKe(e){return e.type==="prompt"&&e.loadedFrom==="syncedSkills"&&e.unqualifiedName!=null&&(e.aliases?.includes(e.unqualifiedName)??!1)?e.unqualifiedName:void 0};
function F1(e,n,r){let s=[];for(let g of e){let h=bbe(g,n);if(h===null){r?.(g);continue}if(h.loadedFrom==="syncedSkills")pbe(n,h);s.push(h)}return s};
var kNe=(e)=>Object.freeze({plugin:e,tier:XSn(e,DN(),jq())});
var CX=(e)=>Object.freeze({plugin:e.endsWith("Settings")?e.slice(0,-8):e,tier:e==="policySettings"?"prepend":"user"});
var SAn=({plugin:e,spec:n})=>({type:"local",name:n.name,description:n.description,argumentHint:n.argumentHint,immediate:n.immediate===!0,loadedFrom:"plugin",supportsNonInteractive:!0,load:()=>Promise.resolve({call:()=>Promise.resolve({type:"text",value:`${e} registered /${n.name} but no command.run hook answered it: add on("command.run", { command: "${n.name}" }, ($, e) => ({ text: ... })) to the plugin.`})})});
var Ktt=Object.freeze(["enterprise","managed"]);
var K_=(e)=>lJ(e)?.pluginStorageId??e;
function RX(e){let n=K_(e);if(n!==e)return n;let r=Nr(e);return[...DN()??[]].find((s)=>Nr(s.slice(0,s.lastIndexOf("@")))===r)??e};
function xX(e){if(e.scope!==void 0&&Ktt.includes(e.scope))return Object.freeze({plugin:`mcp:${e.name}`,tier:"prepend"});if(e.pluginSource!==void 0)return kNe(e.pluginSource);let r=A2.ownerOfKey(e.name);if(r===void 0)return Object.freeze({plugin:`mcp:${e.name}`,tier:"user"});return kNe(RX(r))};
function RAn(e){let n="pluginInfo"in e?e.pluginInfo?.repository:void 0,r=wS.ownerOf(e.name),s=n??(r===void 0?void 0:RX(r)),g="source"in e?e.source:void 0,h=g==="mcp"?us(e.name)?.serverName:void 0;if(s!==void 0)return kNe(s);return g===void 0||g==="builtin"||g==="bundled"?BBe:h===void 0?CX(g):xX({name:h})};
var hvt=(e)=>({command:Lo(e),description:e.description,argumentHint:e.argumentHint,isHidden:e.isHidden===!0,immediate:e.immediate===!0,provider:RAn(e)});
async function yvt(e){let n=hvt(e);if(!dd("command.describe",{command:n.command}))return e;let r=await gvt.of(n,()=>fa("command.describe",{})(n));return r.description===n.description&&r.argumentHint===n.argumentHint&&r.isHidden===n.isHidden?e:{...e,description:r.description,argumentHint:r.argumentHint,isHidden:r.isHidden}};
var _vt=()=>wS.list().map(SAn);
var yZn={hooked:async(e)=>{let n=_vt(),r=n.length===0?e:[...qte(e,n),...n];return dd("command.describe")?Promise.all(r.map(yvt)):r},isHooked:()=>wS.list().length>0||dd("command.describe")};
var _Zn=()=>aRn(yZn);
return {install:_Zn,hook:yZn};}
export function createAuthQualification287(ports){const {Vn,ft,mb}=ports;const handler=ports.handler;
function IWt(){try{let{key:e,source:n}=mb({skipRetrievingKeyFromApiKeyHelper:!0});return e!==null&&n!=="none"}catch{return!1}};
function c2e(){if(!Vn())return!1;if(ft())return!1;return!0};
return {IWt,c2e};}
export function createLoginRegistration287(ports){const {IWt,a}=ports;const handler=ports.handler;
var xYt=()=>({type:"local-jsx",name:"login",get description(){return IWt()?"Switch Anthropic accounts":"Sign in with your Anthropic account"},isEnabled:()=>!a.DISABLE_LOGIN_COMMAND,fleetHostCall:async({login:e})=>e()});
return {createLogin:xYt};}
export function createRemoteLabel287(ports){const {}=ports;const handler=ports.handler;
var S9="Remote Control is disabled by your organization's policy (managed setting `disableRemoteControl`).";
return {S9};}
export function createManagedRemote287(ports){const {iO}=ports;const handler=ports.handler;
function N1(){return iO()?.settings.disableRemoteControl===!0};
return {N1};}
export function createAnalyticsToken287(ports){const {}=ports;const handler=ports.handler;
function r(n){return n};
function c(n){return r(n)};
return {c};}
export function createUpsell287(ports){const {Ce,Gp,Js,N1,Rc,S9,c,c2e,ft,i,k}=ports;const handler=ports.handler;
function J4e(){if(!Js())return!1;return c2e()};
function $8t(){return!ntr()&&J4e()&&!Ce()&&k("tengu_c4e_slash_upsell",!1)};
function Jer(){try{return Rc().source==="none"&&Gp({skipRetrievingKeyFromApiKeyHelper:!0}).source==="none"}catch{return!1}};
function ttr(e){if(e.managedDisabled?.isDisabled())return{variant:"policy_disabled",value:e.managedDisabled.reason};if(Jer())return{variant:"signed_out",value:`/${e.name} requires a claude.ai subscription. Run /login to sign in with your claude.ai account.`};return{variant:"c4e",value:`/${e.name} is available with Claude for Enterprise \u2014 ask your admin about migrating from API-key access.`}};
function AU(e){return{type:"local",name:e.name,aliases:e.aliases,description:`${e.description} \u2014 available with Claude for Enterprise`,isEnabled:$8t,isHidden:!0,supportsNonInteractive:!1,load:()=>Promise.resolve({call:async()=>{let{variant:n,value:r}=ttr(e);return i("tengu_c4e_slash_upsell_shown",{command:c(e.name),variant:c(n)}),{type:"text",value:r}}})}};
function ntr(){return ft()};
var B8t=[AU({name:"ultraplan",description:"A cloud session drafts a plan you can edit and approve"}),AU({name:"ultrareview",description:"Find and verify bugs in your branch using a cloud session"}),AU({name:"teleport",aliases:["tp"],description:"Send this session to the cloud, or resume one from claude.ai"}),AU({name:"remote-control",aliases:["rc"],description:"Control this session from your phone or claude.ai/code",managedDisabled:{isDisabled:()=>N1(),reason:S9}}),AU({name:"schedule",aliases:["routines"],description:"Create and manage scheduled remote Claude Code agents"}),AU({name:"autofix-pr",description:"Monitor and autofix any issues with the current PR"})];
return {B8t};}
export function createUnicode287(ports){const {}=ports;const handler=ports.handler;
function en(e){return Bun.stripANSI(e)};
var u="\\p{Default_Ignorable_Code_Point}\\u2800";
var SW=`\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${u}`;
var p=new RegExp(`[${SW}]+`,"gu");
var o="\\u200D\\uFE0E\\uFE0F";
var c=new RegExp(`(?:(?![${o}])[${SW}])+`,"gu");
var a=new RegExp(`(?:(?![${o}\\n])[${SW}])+`,"gu");
var g=new RegExp(`(?<!\\S)[${o}]+`,"gu");
var l=/\p{Cs}/gu;
function hD(e,n,r){let t=r?.keepNewlines===!0||r?.keepEmojiJoiners===!0,i=en(e.replace(l,"\u200B")).replace(r?.keepNewlines?a:t?c:p,n);return t?i.replace(g,""):i};
function Hn(e){return e.replace(/[\p{Cc}\p{Cf}\u2028\u2029]+/gu," ")};
return {hD,Hn};}
export function createClip287(ports){const {}=ports;const handler=ports.handler;
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)};
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)};
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")};
var a=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
var l=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0;
function Nz(t){if(l&&l(t))return t;return t.replace(a,"")};
return {re,Nz};}
export function createLabels287(ports){const {}=ports;const handler=ports.handler;
var gK="claude.ai sync";
return {gK};}
export function createSkillNames287(ports){const {ro}=ports;const handler=ports.handler;
function CJn(e=new Set){let o=[];for(let[r,t]of ro().builtinPlugins){if(e.has(r))continue;for(let n of t.skills??[])o.push(n.name,...n.aliases??[])}return o};
return {CJn};}
export function createBundledList287(ports){const {ro}=ports;const handler=ports.handler;
function FUt(){return[...ro().bundledSkills]};
return {FUt};}
export function createTerminalText287(ports){const {Hn,Nz,re}=ports;const handler=ports.handler;
var u=/[\p{Pi}\p{Pf}\u201a\u201e\u201f\u2e32\u2e34\u2e41\u2e49\u2e42\u3003\u300c-\u300f\ufe41-\ufe44\u301d-\u301f\u275b-\u2760\u276e\u276f\u{1f676}-\u{1f678}\u2032-\u2037\u2057\u02b9\u02ba\u0374\u02bd-\u02bf\u02c8\u02d2\u02d3\u02ca\u02ce\u02cf\u02dd\u02f4-\u02f6\u02ee\u00b4\u0384\u0385\u1fbd\u1fbf\u1fcd-\u1fcf\u1fdd-\u1fdf\u1ffd\u1ffe\u05f3\u05f4\u0559-\u055b\u07f4\u07f5\ua67f\ua78b\ua78c\uff02\uff07\uff62\uff63]/gu;
var i=/(?<![^\s\p{P}])\p{M}+/gu;
function aD(e){return Hn(AVt(Nz(e))).replace(/ {2,}/g," ").trim()};
var d=/\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]|\x1b[\]PX^_][^\x1b\x07]*(?:\x07|\x1b\\)/g;
var x=4;
function AVt(e){let n=e;for(let t=0;t<x;t++){let r=n.replace(d,"");if(r===n)break;n=r}return n};
function Lt(e,n=160){return Ez(aD(p(e,n)).normalize("NFC").replace(/[`\uff40\u02cb\u1fef\u2035]/g,"'").replace(i,""),n)};
function Ez(e,n=2000){return e.length>n?`${re(e,n)}\u2026`:e};
function sl(e,n=300){return Lt(e??"",n)};
function ze(e,n=300){return Lt(e??"",n).replace(u,"").replace(/[\u02bb\u02bc]/g,"\u2019").replace(/"/g,"\u201D").replace(/'/g,"\u2019").replace(i,"")};
function p(e,n){let t=re(e,n*8);if(t.length===e.length)return t;let r=/\x1b(?:[\]PX^_][^\x1b\x07]*\x1b?|\[[\x30-\x3f]*[\x20-\x2f]*)$/.exec(t);if(r===null)return t;let s=e.slice(r.index);return(s[1]==="["?/^\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]/.test(s):/^\x1b[\]PX^_][^\x1b\x07]*(?:\x07|\x1b\\)/.test(s))?t.slice(0,r.index):t};
return {ze,sl};}
export function createPluginLabel287(ports){const {hD}=ports;const handler=ports.handler;
function Rn(e){return hD(e," ",{keepEmojiJoiners:!0})};
function Ha(e){return hD(e,"",{keepEmojiJoiners:!0})};
function kg(e){return Ha(e)};
function hf(e){let n=Ka(e)?e.manifest.displayName:e.displayName;return Wje(typeof n==="string"?Rn(n).trim():n)??Wje(kg(e.name))??Wje(kg(Ka(e)?e.source:""))??"(unprintable plugin name)"};
function Wje(e){if(typeof e!=="string")return;return e.trim()?e:void 0};
function Ka(e){return"manifest"in e&&typeof e.manifest==="object"&&e.manifest!==null};
return {hf};}
export function createRegistrationGates287(ports){const {a,iO}=ports;const handler=ports.handler;
function nft(){return r()!==null};
function r(){if(a.CLAUDE_CODE_DISABLE_AGENT_VIEW)return"is disabled by CLAUDE_CODE_DISABLE_AGENT_VIEW";if(iO()?.settings.disableAgentView===!0)return"is disabled by the 'disableAgentView' setting";return null};
function JS(){return!nft()};
function Uq(){return!1};
return {JS,Uq};}
export function createCore287(ports){const {$tr,Btr,CJn,Ce,DJn,Eyt,FUt,G0o,Gjt,Ire,Ll,Lo,MU,Mh,N0,NQ,PBt,SSe,Sce,W4e,Wln,Y$t,YSn,Yb,Z,ZUo,a,as,cUe,c_,d,dbn,e1e,gK,ge,gmt,hF,hf,i8e,jMt,jln,jre,jtr,m,n8,ow,p,pH,q1t,qIo,ra,rl,ro,sl,sv,t,t8,tde,tt,v9n,vd,wS,wr,y,z2,ze}=ports;const handler=ports.handler;
function PI(e,n,r=!1){if(!r&&z2(n))return;e.add(N0(n))};
function _S(e,n){let r=Ire(n);PI(e,n.name,r),PI(e,Lo(n),r);for(let s of n.aliases??[])PI(e,s,r)};
function pbe(e,n){e.add(N0(n.name));for(let r of n.aliases??[])e.add(N0(r))};
function MI(e,n){for(let r of n)if(r.loadedFrom!=="syncedSkills")_S(e,r)};
function nRn(e,n){return N0(hF(e.name))===""||n.has(N0(e.name))||n.has(N0(Eyt(Lo(e))))};
function nlt(e,n){let r=[];for(let s of e){if(gmt(s)){n(s);continue}r.push(Ire(s)?s:ftt(s,z2))}return r};
function ftt(e,n){let r=e.aliases;if(!r)return e;let s=r.filter((g)=>!n(g));if(s.length===r.length)return e;return{...e,aliases:s.length?s:void 0}};
function uX(e,n){return e.includes(":")||e.startsWith("mcp__")||n.has(e)};
function kbe(e){return D1(e,()=>!0)};
function bbe(e,n){if(e.loadedFrom!=="syncedSkills")return e;if(nRn(e,n))return null;return D1(e,(r)=>uX(N0(r),n))};
function D1(e,n){let r=ftt(e,n);if(r.loadedFrom!=="syncedSkills")return r;let s=Lo(r);if(Eyt(s)===s||gKe(r)!==void 0)return r;let g=Eyt(s);return{...r,userFacingName:()=>g}};
function gKe(e){return e.type==="prompt"&&e.loadedFrom==="syncedSkills"&&e.unqualifiedName!=null&&(e.aliases?.includes(e.unqualifiedName)??!1)?e.unqualifiedName:void 0};
function F1(e,n,r){let s=[];for(let g of e){let h=bbe(g,n);if(h===null){r?.(g);continue}if(h.loadedFrom==="syncedSkills")pbe(n,h);s.push(h)}return s};
function sRn(){let e=Yb();return{setCommandSetHooker:e.set,hookedCommands:(n)=>e.get()?.hooked(n)??Promise.resolve(n),isCommandSetHooked:()=>e.get()?.isHooked()??!1}};
var fF=sRn();
var Tbe=fF.hookedCommands;
var aRn=fF.setCommandSetHooker;
function mtt(){let{placeholders:e,listedSkills:n}=c_();if(e.size===0&&n.size===0)return[];return[...Array.from(e).flatMap(([r,s])=>m2n(r)?[]:[s]),...Array.from(n.values()).flatMap((r)=>r.command?[r.command]:[])]};
function m2n(e){let n=c_().listedSkills.get(e);return n!==void 0&&!n.command&&n.withheld===!0};
function H1(){return a.CLAUDE_CODE_SYNC_SKILLS||a.CLAUDE_CODE_SYNC_SESSION_REFS||Y$t()};
var ztt=(e)=>e.type==="local"&&e.loadedFrom==="plugin";
function Jq(e){if(wS.ownerOf(e.name)!==void 0||ztt(e))return"plugin";if(e.type!=="prompt")return e.loadedFrom==="mcp"?"mcp":"builtin";switch(e.source){case"builtin":case"bundled":return"builtin";case"plugin":return"plugin";case"mcp":return"mcp";case"userSettings":case"projectSettings":case"localSettings":case"flagSettings":case"policySettings":case"memoryStore":return"user"}};
var tre={on:0,"name-only":1,"user-invocable-only":2,off:3};
var VCt=["policySettings","flagSettings"];
function wP(e,n){return e==null||n==null?void 0:ra(e,n)};
function TTe(e){let n=e.unqualifiedName;if(n==null)return;if(e.loadedFrom!=="syncedSkills")return n;return e.bareNameReserved?void 0:n};
function YCt(e){return[...e.aliases??[],...e.unqualifiedName!=null?[e.unqualifiedName]:[]]};
function XCt(e,n){let r;for(let s of n){let g=wP(e,s);if(g!==void 0&&(r===void 0||tre[g]>tre[r]))r=g}return r};
function nre(e){let n=tt().skillOverrides,r=TTe(e),s=wP(n,e.name)??wP(n,r),g=YCt(e);if(!g.length)return s;for(let h of VCt){let b=ge(h)?.skillOverrides;if(wP(b,e.name)!==void 0)break;let w=XCt(b,g);if(w!==void 0&&(s===void 0||tre[w]>tre[s]))s=w;if(wP(b,r)!==void 0)break}return s};
var Kio=new Set(["auto-mode-setup"]);
function sE(e){if((e.type==="local-jsx"||e.type==="local")&&Kio.has(e.name))return wP(tt().skillOverrides,e.name)==="off"?"off":"on";if(e.type!=="prompt"||e.source==="plugin")return"on";let n=tt(),r=nre(e)??"on";if(DJn(e,n))return r==="off"?"off":"user-invocable-only";return r};
function rq(e){let n=sE(e);return n==="user-invocable-only"||n==="off"};
function EP(e){return sE(e)==="off"};
function I0(e,n){return`${e}:${n}`};
function fne(e){let n=new Set,r=!1;for(let g of e){if(g.type!=="prompt"||g.loadedFrom!=="plugin"&&g.loadedFrom!=="bundled"&&g.loadedFrom!=="mcp")continue;if(g.disableModelInvocation||rq(g))continue;if(g.loadedFrom==="mcp")r=!0;let h=g.name.lastIndexOf(":");if(h>0)n.add(g.name.slice(h+1))}if(n.size===0)return e;let s=ro().fallbackShadowTelemetryLogged;return e.filter((g)=>{if(!hct(g))return!0;if(!n.has(g.name))return!0;return t(`Dropping fallback skill '${g.name}' \u2014 a plugin/MCP skill with the same suffix is loaded`),!1})};
function mne(e){return e.type==="prompt"&&!e.disableModelInvocation&&!rq(e)&&(e.source==="builtin"||e.loadedFrom==="bundled"||e.loadedFrom==="skills"||e.loadedFrom==="syncedSkills"||e.loadedFrom==="attachedFolder"||e.loadedFrom==="commands_DEPRECATED"||e.hasUserSpecifiedDescription||!!e.whenToUse)};
function gMe(e){return e.type==="prompt"&&!e.disableNonInteractive||e.type==="local"&&e.supportsNonInteractive};
function QPr(e){return e.userInvocable!==!1&&!EP(e)};
function gct(e){return Ll(e,"name").filter(QPr)};
function hct(e){return e.type==="prompt"&&e.fallback===!0&&e.loadedFrom!=="syncedSkills"};
function Sle({name:e,path:n,change:r}){let s={name:ze(e),...n!==void 0&&{path:sl(n)},change:r},g=`${s.path??""}\x00${s.name}\x00${r}`,h=kh().refusedReservedNames;if(h.has(g))return;h.set(g,s);let b=r==="workflow-name"?`workflow "${s.name}"`:`"${s.name}"`,w=s.path?` (${s.path})`:"",D=cUe(s.name);t(`[skills] not loading ${b}${w}: that name ${D}; ${r==="frontmatter-name"?"change its name: line":"rename it"}`,{level:"warn"})};
function JOr(){return{dynamicSkillDirs:new Set,dynamicSkills:new Map,conditionalSkills:new Map,activatedConditionalSkillNames:new Set,refusedReservedNames:new Map}};
function FV(){return ro().dynamicSkillStateKey()};
function jVt(){return FV()};
function kh(){let e=ro().dynamicSkillStates,n=FV(),r=e.get(n);if(!r)r=JOr(),e.set(n,r);return r};
function $V(){return ro().dynamicSkillStates.get(FV())??null};
function Uln(){return Array.from($V()?.dynamicSkills.entries()??[]).sort(([e,n],[r,s])=>n.name===s.name?e.localeCompare(r):n.name.localeCompare(s.name)).map(([,e])=>e)};
function n5e(e){if(e.type!=="prompt")return e.description;if(e.kind==="workflow")return`${e.description} (dynamic workflow)`;if(e.source==="plugin"){let n=e.pluginInfo?.pluginManifest;if(n)return`(${hf(n)}) ${e.description}`;return`${e.description} (plugin)`}if(e.source==="builtin"||e.source==="mcp"||e.source==="memoryStore"||e.source==="bundled")return e.description;if(e.loadedFrom==="syncedSkills")return`${e.description} (${gK})`;return`${e.description} (${ow(e.source)})`};
function yq(e){return gct(e).map(mcn)};
function mcn(e){let n=Lo(e),r=cLt(e),s=e.name!==n&&(e.name.includes(":")||e.type==="prompt"&&!e.isMcp&&!r&&YIo(e.name))?e.name:void 0,g=e.aliases?.filter((b)=>b!==n),h=s&&!g?.includes(s)?[...g??[],s]:g;return{name:n,description:n5e(e),argumentHint:e.argumentHint||"",aliases:h?.length?h:void 0,...r&&{builtin:!0}}};
function cLt(e){return Jq(e)==="builtin"};
function t1e(e){cXt(e);for(let n of FUt())_S(e,n);for(let n of CJn())PI(e,n)};
function cXt(e){for(let n of qIo())_S(e,n)};
function Utr(e){return ro().reservedSpellingsFor(e,()=>{let n=new Set;for(let r of e)if(r.loadedFrom!=="syncedSkills")_S(n,r);return t1e(n),n})};
function YIo(e){return Gjt(e)&&!uX(N0(e),uXt())};
function uXt(){let e=new Set;for(let n of MU())_S(e,n);return t1e(e),e};
async function Htr(e,n){let r=null,s=!1,g=!1;try{let[h,b]=await Promise.all([jMt(e,n).catch((j)=>{if(as(j))t(`Skill directory commands failed to load (${j.code}), continuing without them`,{level:"error"});else d(Z(j)),t("Skill directory commands failed to load, continuing without them");return r="cmd_load_skill_dir_failed",s=!0,[]}),Wln(n).catch((j)=>(d(Z(j)),r="cmd_load_plugin_skills_failed",g=!0,t("Plugin skills failed to load, continuing without them"),[]))]),w=jre(),D=YSn();if(t(`getSkills returning: ${h.length} skill dir commands, ${b.length} plugin skills, ${w.length} bundled skills, ${D.length} builtin plugin skills`),r)m("cmd_load",r);else y("cmd_load");return{skillDirCommands:h,pluginSkills:b,bundledSkills:w,builtinPluginSkills:D,trustedNamesFailedToLoad:s||g}}catch(h){return d(Z(h)),p("cmd_load","cmd_load_skills_failed"),t("Unexpected error in getSkills, returning empty"),{skillDirCommands:[],pluginSkills:[],bundledSkills:[],builtinPluginSkills:[],trustedNamesFailedToLoad:!0}}};
function HHr(e){return`${jVt()}:${dbn()}:${Ce()}:${sv()}:${PBt()}:${H1()}:${n8(e)}`};
function ztr(e,n){return t8(ro().loadedCommands,HHr(e),()=>qtr(e,n))};
function gfe(e){if(e.type!=="prompt"||e.loadedFrom!=="syncedSkills"||e.bareNameReserved||e.unqualifiedName==null||gKe(e)!==void 0)return e;return{...e,bareNameReserved:!0}};
async function qtr(e,n){let r=performance.now(),[{skillDirCommands:s,pluginSkills:g,bundledSkills:h,builtinPluginSkills:b,trustedNamesFailedToLoad:w},D,j]=await Promise.all([Htr(e,n).then((xe)=>(wr("skills_load_ms",performance.now()-r,r),xe)),W4e(n),jtr(e,n)]),z=s.filter((xe)=>xe.loadedFrom!=="syncedSkills"),K=nlt([...z,...ro().attachedFolderSkills?.()??[],...j,...D,...g,...h,...b,...MU()],(xe)=>{let Pe=z2(xe.name);Sle({name:Pe?xe.name:Lo(xe),path:xe.type==="prompt"?xe.skillRoot:void 0,change:xe.kind==="workflow"?"workflow-name":Pe?"path":"frontmatter-name"})}),he=s.filter((xe)=>xe.loadedFrom==="syncedSkills"),_e=new Set;if(he.length>0)MI(_e,K),MI(_e,jln()),t1e(_e);if(w&&he.length>0)t(`[skills] local or plugin skills failed to load; ${he.length} synced skill(s) answer only to anthropic-skills:<name> this session because their bare names cannot be checked for collisions`);let ke=F1(w?he.map(kbe):he,_e,(xe)=>t(`[skills] dropping synced skill '${xe.name}' (display '${Lo(xe)}'): its name is blank, or another command or an earlier synced skill already owns that namespaced name`)).map(gfe),[be,ve]=pH(K,(xe)=>v9n(xe)),Te=Jtr(fne([...ve,...ke,...be]));if(w)ro().markLoadedResultMissingTrustedNames(Te);return i8e("command",Te.map((xe)=>({name:xe.name,source:xe.type==="prompt"?xe.source:"builtin"})).reverse(),{resolves:!0}),Vtr(),Te};
function Vtr(){let e=ro().refusedReservedSkillNames();if(e.length===0||!rl().claim("skill_reserved_namespace_refused"))return;let n={refused:e.length};for(let{name:r,change:s}of e){let h=[`ns_${(q1t(r)??"unknown").replaceAll("-","_")}`,`kind_${s.replaceAll("-","_")}`];for(let b of h)n[b]=(n[b]??0)+1}p("skill_reserved_namespace","names_refused",n)};
async function yp(e,n){return Tbe(await Ytr(e,n))};
async function Ytr(e,n){G0o(tde);let r=await ztr(e,n),s=!sv(),g=ro().loadedResultIsMissingTrustedNames(r)?(Ze)=>Ze.map((et)=>et.loadedFrom==="syncedSkills"?kbe(et):et):(Ze)=>Ze,h=s?g(Uln()):Uln().filter((Ze)=>Ze.loadedFrom!=="syncedSkills"),b=s?g(mtt()):[],w=r.filter((Ze)=>Sce(Ze)&&vd(Ze));if(h.length===0&&b.length===0)return w;let D=h.filter((Ze)=>Sce(Ze)&&vd(Ze)),j=new Map,z=(Ze)=>{let et=j.get(Ze);if(et===void 0)et=Xtr(Ze,e),j.set(Ze,et);return et},K=b.length>0||D.some((Ze)=>Ze.loadedFrom==="syncedSkills")||w.some((Ze)=>Ze.loadedFrom==="syncedSkills"),he=new Set(K?Utr(r):[]);if(K){MI(he,D),MI(he,jln());for(let Ze of D){if(Ze.loadedFrom==="syncedSkills"||hct(Ze))continue;let et=z(Ze);if(et)PI(he,I0(et,Ze.name))}}let _e=K?F1(w,he).map(gfe):w,ke=new Set,be=new Set;for(let Ze of _e){ke.add(Ze.name);for(let et of Ze.aliases??[])ke.add(et);if(Ze.type==="prompt"&&Ze.skillRoot)be.add(Ze.skillRoot)}let ve=new Map;for(let Ze of D){if(hct(Ze)||Ze.loadedFrom==="syncedSkills")continue;ve.set(Ze.name,(ve.get(Ze.name)??0)+1)}let Te=[],xe=new Set;for(let Ze of D){if(Ze.type==="prompt"&&Ze.skillRoot&&be.has(Ze.skillRoot))continue;if(Ze.loadedFrom==="syncedSkills"){let It=bbe(Ze,he);if(It===null)continue;let jt=gfe(It);Te.push(jt),xe.add(jt.name),pbe(he,jt);continue}let et=z(Ze),bt=et!==null&&SSe()&&z2(I0(et,Ze.name))?null:et,ht=ke.has(Ze.name);if(hct(Ze)){if(ht||(ve.get(Ze.name)??0)>0||xe.has(Ze.name))continue;Te.push(bt?dXt(Ze,bt):Ze),xe.add(Ze.name);continue}if(!(ht||(ve.get(Ze.name)??0)>1)){Te.push(bt?dXt(Ze,bt):Ze),xe.add(Ze.name);continue}if(!bt){if(ht||xe.has(Ze.name)){if(et!==null)Sle({name:I0(et,Ze.name),path:Ze.type==="prompt"?Ze.skillRoot:void 0,change:"path"});continue}Te.push(Ze),xe.add(Ze.name);continue}let $t=I0(bt,Ze.name);if(ke.has($t)||xe.has($t))continue;Te.push(Qtr(Ze,bt,ht||xe.has(Ze.name))),xe.add($t)}if(b.length>0)MI(he,Te);let Pe=F1(b,he).map(gfe).filter((Ze)=>Sce(Ze)&&vd(Ze)),[$e,Ne]=pH(Te,(Ze)=>v9n(Ze)),We=[...Ne,...Pe];if(We.length===0&&$e.length===0)return _e;let qe=new Set(MU().map((Ze)=>Ze.name)),Qe=_e.findIndex((Ze)=>qe.has(Ze.name));if(Qe===-1)return fne([..._e,...We,...$e]);return fne([..._e.slice(0,Qe),...We,..._e.slice(Qe),...$e])};
function Xtr(e,n){if(n===null||e.type!=="prompt"||!e.skillRoot)return null;let r=`${e1e}.claude${e1e}`,s=e.skillRoot.lastIndexOf(r);if(s===-1)return null;let g=e.skillRoot.slice(0,s),h=Btr(n,g);if(!h||h.startsWith("..")||$tr(h))return null;return h.split(e1e).join("/")};
function dXt(e,n){if(e.type!=="prompt")return e;return{...e,description:`${e.description} (from ${n}/.claude/skills \u2014 applies when working on files under ${n}/)`}};
function Qtr(e,n,r){if(e.type!=="prompt")return e;let s=I0(n,e.name),g=r?`scoped to ${n}/ \u2014 use this instead of the unscoped "${e.name}" skill when the files being changed are under ${n}/`:`from ${n}/.claude/skills \u2014 applies when working on files under ${n}/`;return{...e,name:s,unqualifiedName:e.name,aliases:void 0,userFacingName:()=>s,description:`${e.description} (${g})`}};
var Wzn=new Set(["help","feedback"]);
function Jtr(e){let n=(b)=>b.type==="prompt"&&(b.source==="plugin"||b.loadedFrom==="syncedSkills"),r=Ce(),s=new Set;for(let b of e){let w=r&&!gMe(b);if(!w||!Wzn.has(b.name))s.add(b.name);if(!n(b)){for(let D of b.aliases??[])if(!w||!Wzn.has(D))s.add(D)}}let g,h=(b)=>{let w=N0(b);if(r&&Wzn.has(w))return!1;if(g===void 0){g=new Set;for(let j of MU())_S(g,j);for(let j of jre())_S(g,j);cXt(g);let D=NQ().disabled.map((j)=>j.name);for(let j of CJn(new Set(D)))PI(g,j)}return uX(w,g)};return e.map((b)=>{if(!n(b)||b.type!=="prompt")return b;if(b.loadedFrom==="syncedSkills")return D1(b,(D)=>s.has(D));let w=(b.aliases??[]).filter((D)=>s.has(D)||h(D));return w.length===0?b:{...D1(b,(D)=>w.includes(D)),shedAliases:b.shedAliases?[...b.shedAliases,...w]:w}})};
function m0(e,n){return t8(ro().skillToolCommands,HHr(e),()=>Ztr(e,n))};
async function Ztr(e,n){if(Mh())return[];let r=await yp(e,n);return ZUo(r.filter(mne),r)};
function Bye(e,n){return t8(ro().slashCommandToolSkills,HHr(e),()=>enr(e,n))};
async function enr(e,n){if(Mh())return[];try{let s=(await yp(e,n)).filter((g)=>g.type==="prompt"&&g.source!=="builtin"&&!EP(g)&&(g.hasUserSpecifiedDescription||g.whenToUse)&&(g.loadedFrom==="skills"||g.loadedFrom==="syncedSkills"||g.loadedFrom==="attachedFolder"||g.loadedFrom==="plugin"||g.loadedFrom==="bundled"||g.disableModelInvocation));return y("cmd_load"),s}catch(r){return d(Z(r)),p("cmd_load","cmd_load_slash_tool_skills_failed"),t("Returning empty skills array due to load failure"),[]}};
return {commands:yp,discover:Ytr,load:ztr,skillTool:m0,slashSkills:Bye,installCommandHook:aRn,skills:Htr,key:HHr,project:yq,projectOne:mcn,description:n5e,mode:sE,owner:Jq,dynamicState:kh,pluginCommands:wS};}
export function createNamespace287(ports){const {HPe,N0,k,nbe,x}=ports;const handler=ports.handler;
function Lo(e){return e.userFacingName?.()??e.name};
function lUe(e,o,n){let r=e?.immediate;return typeof r==="function"?r(o,n):r===!0};
var V1t=`uses ${HPe.map((e)=>`"${e}"`).join(" or ")}, the names reserved for the skills synced from your claude.ai account`;
function q1t(e){let o=N0(e),n=nbe(e).toLowerCase(),r=nbe(o);for(let s of HPe){if(o===s||o.startsWith(`${s}:`))return s;let p=nbe(`${s}:`);if(n.startsWith(p)||r.startsWith(p))return s}return};
function z2(e){return q1t(e)!==void 0};
function cUe(...e){for(let o of e){let n=q1t(o);if(n!==void 0)return`uses "${n}", a name reserved for the skills synced from your claude.ai account`}return V1t};
function Ire(e){return e.loadedFrom==="syncedSkills"||e.type==="prompt"&&e.source==="plugin"&&e.pluginInfo!==void 0&&x(e.pluginInfo)};
function v9n(e){return!Ire(e)&&(z2(e.name)||z2(Lo(e)))};
var v="tengu_plaid_harbor";
function SSe(){return k(v,!0)!==!1};
function ZUo(e,o){let n=new Set(o.filter(Ire).map((r)=>N0(r.name)));return n.size===0?[...e]:e.filter((r)=>Ire(r)||!n.has(N0(r.name)))};
function gmt(e){return!(e.type==="prompt"&&e.source==="plugin")&&v9n(e)&&SSe()};
return {Lo,Ire,gmt,cUe,v9n,q1t,z2,SSe,ZUo,lUe};}
export function createSanitize287(ports){const {}=ports;const handler=ports.handler;
function nbe(e){return"skill__"+e.replaceAll(":","__").replace(/[^a-zA-Z0-9_-]/g,"_")};
return {nbe};}
export function createSpelling287(ports){const {}=ports;const handler=ports.handler;
function g_(e){return e.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").replace(/\u1e9e/g,"\xDF").normalize("NFD").toUpperCase().toLowerCase()};
var ee=/^[!-~]+$/;
function N0(e){if(ee.test(e))return e.toLowerCase();return g_(e.normalize("NFKC").replace(/[\p{Z}\p{Cc}\p{Cf}\p{Default_Ignorable_Code_Point}\u2800]/gu,"").replace(/[\p{Pd}\u2212]/gu,"-").replace(/[\ua789\u2236\u0589\u05c3\u02d0]/g,":"))};
return {N0};}
export function createSync287(ports){const {}=ports;const handler=ports.handler;
var HPe=["anthropic-skills"];
function Eyt(e){return e.startsWith("anthropic-skills:")?e:`anthropic-skills:${e}`};
function Gjt(e){return/^[A-Za-z0-9._-]+$/.test(e)};
function hF(e){return e.startsWith("anthropic-skills:")?e.slice(17):e};
return {Eyt,Gjt,hF,HPe};}
export function createCache287(ports){const {}=ports;const handler=ports.handler;
function t8(e,n,i){let l=e.get(n);if(l!==void 0)return l;let t=i();return e.set(n,t),t};
function n8(e){return e??"\x00"};
return {t8,n8};}
export function createSyncOwner287(ports){const {G3t,U,V,j3t}=ports;const handler=ports.handler;
class tn{syncPromise=null;firstSyncPromise=null;firstListDeferred=null;firstRoundSettled=!1;firstRoundEmitted=!1;resyncTimer=null;resyncRunRound=null;consecutiveFailedRounds=0;bucketGeneration=null;pendingDownloads=new Map;placeholders=new Map;listedSkills=new Map;listedOwnerships=new Map;missingSkillResyncAt=-1/0;missingSkillResync=null;reset(){if(this.syncPromise=null,this.firstSyncPromise=null,this.firstListDeferred=null,this.firstRoundEmitted=!1,this.firstRoundSettled=!1,G3t(!1),j3t(!1),this.resyncTimer)clearTimeout(this.resyncTimer),this.resyncTimer=null;this.resyncRunRound=null,this.consecutiveFailedRounds=0,this.bucketGeneration=null,this.listedSkills.clear(),this.listedOwnerships.clear(),this.pendingDownloads.clear(),this.placeholders.clear(),this.missingSkillResyncAt=-1/0,this.missingSkillResync=null}};
var xt=new V(()=>new tn);
function c_(){return xt.of(U().host)};
return {state:c_};}
export function createSyncGate287(ports){const {Rc,Wn}=ports;const handler=ports.handler;
function Y$t(){return Rc().source==="claude.ai"&&!Wn()};
return {enabled:Y$t};}
export function createClaims287(ports){const {U,V}=ports;const handler=ports.handler;
class s{#t=new Set;#e=new Map;lastBellAt=0;claim(t){if(this.#t.has(t))return!1;return this.#t.add(t),!0}has(t){return this.#t.has(t)}claimIfChanged(t,e){if(this.#e.get(t)===e)return!1;return this.#e.set(t,e),!0}};
var oK=new V(()=>new s);
function rl(){return oK.of(U().host)};
return {state:rl};}
export function createHistory287(ports){const {U,V}=ports;const handler=ports.handler;
class SO{get=()=>[]};
var VX=new V(()=>new SO);
function wO(){return VX.of(U().host)};
function G0o(e){wO().get=e};
return {bind:G0o,state:wO};}
export function createBundledGate287(ports){const {a,t,tt,tw}=ports;const handler=ports.handler;
function gj(i){return a.CLAUDE_CODE_DISABLE_BUNDLED_SKILLS||(i??tt()).disableBundledSkills===!0};
var HJn="allow_bundled_skills";
function LPe(){return!tw(HJn)};
function L3(i){return LPe()&&!t().includes(i)};
function o8(i,e){return gj(e)||L3(i)};
function dbn(i){let e=LPe();return`${gj(i)}:${e}:${e?t().join(","):""}`};
function DJn(i,e){return i.type==="prompt"&&i.source==="builtin"&&o8(i.name,e)};
return {dbn,DJn};}
export const commandMetadataSymbols287=[];
