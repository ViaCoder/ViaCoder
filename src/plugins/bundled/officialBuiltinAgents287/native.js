// Complete original builtin registry/selection/registration and Agents descriptor. Canonical state is cut, never copied.
export function createBuiltinRegistry287(ports){const {N,Ne,P,Rh,VG,Xo,Z,ZA,ZSn,_i,d,er,ge,ku,l,m,ro}=ports;const agentsDir287=ports.agentsDir287;
function Bt(e){let o=N(e)?e.files:void 0;return Object.freeze(Object.fromEntries((N(o)?Object.entries(o):[]).filter((r)=>typeof r[1]==="string")))};
function Ut(e,o){let r=N(e)?e.scan:void 0;if(N(r)&&Array.isArray(r.hooks)&&Array.isArray(r.calls)&&(r.nextTo===void 0||Array.isArray(r.nextTo)))return r;throw new P(`the build carried no hooks module scan for ${o}`,"the build carried no hooks module scan for a built-in")};
var ue="hooks/register.js";
var Vo=(e)=>`builtin:${e}/${ue}`;
var Ht=(e,o,r)=>({module:e,scan:Ut(o,r),files:Bt(o)});
var iU=(e,o,r)=>ku()?Ht(o,r(),e):{module:o,folder:e};
function Hh(e,o){return"folder"in o?{path:o.folder,modulePath:Rh(o.folder,ue)}:{path:_i,modulePath:Vo(e)}};
function Ch(e){return e===null||e===void 0?String(e):typeof e==="object"?`an object with keys [${Object.keys(e).join(", ")}]`:`a ${typeof e}`};
function Mh(e){if(typeof e==="object"&&e!==null&&"registerPlugin"in e&&typeof e.registerPlugin==="function")return e;throw new P(`a built-in module has no registerPlugin function: ${Ch(e)}`,"a built-in module has no registerPlugin function")};
function rpe(e,o){let r;try{r=o()}catch(n){fo(e,"require",n);return}let t;try{t=Mh(r)}catch(n){fo(e,"shape",n);return}try{t.registerPlugin()}catch(n){ro().builtinPlugins.delete(e),fo(e,"register",n)}};
function fo(e,o,r){let t=ro().builtinPluginFailures;if(t.has(e))return;t.set(e,{name:e,phase:o,message:l(r)}),d(Z(r)),m("plugin_bundled_register",o)};
function GVr(e){let o=ro(),r=o.builtinPlugins.get(e);if(r===void 0||o.builtinPluginFailures.has(e))return!1;if(r.isAvailable===void 0)return!0;try{return r.isAvailable()}catch(t){return fo(e,"is_available",t),!1}};
function eS(e){ro().builtinPlugins.set(e.name,e);let o=e.hooksModule;if(o===void 0)return;let r=Vo(e.name);if("scan"in o)Ne.registerScan(r,o.scan);else if("shipped"in o)Ne.register(r,o.shipped)};
function VE(e){return e.endsWith(`@${_i}`)};
function zw(e){return ro().builtinPlugins.get(e)};
function NQ(){let e=er(),o=[],r=[];for(let[t,n]of ro().builtinPlugins){if(!GVr(t))continue;let s=`${t}@${_i}`,p=ZA(s).length>0,i=n.enabledFromPolicyOnly?VG(ge("policySettings")?.enabledPlugins,s):n.enabledFromTrustedSettingsOnly?ZSn(s):!p?e?.enabledPlugins?.[s]:$jt(s),a=i!==void 0?i===!0:n.defaultEnabled??!0,f={name:t,manifest:{name:t,description:n.description,version:n.version,...n.defaultEnabled===void 0?{}:{defaultEnabled:n.defaultEnabled},...n.userConfig===void 0?{}:{userConfig:n.userConfig}},path:_i,source:s,repository:s,enabled:a,isBuiltin:!0,hooksConfig:n.hooks,mcpServers:n.mcpServers,...n.hooksModule===void 0?{}:Hh(t,n.hooksModule)};if(a)o.push(f);else r.push(f)}return{enabled:o,disabled:r}};
function $jt(e){let o=Xo();for(let r=o.length-1;r>=0;r--){let t=o[r];if(t===void 0)continue;let n=VG(ge(t)?.enabledPlugins,e);if(n!==void 0)return n}return};
return {eS,Vo,ue,NQ,GVr,fo,$jt,Hh,iU,Ht,Ut,Bt,rpe,Mh,Ch,VE,zw};}
export function createBuiltinSettingsChoice287(ports){const {TS,Xo,ZA,ge}=ports;const agentsDir287=ports.agentsDir287;
var lU=["userSettings","flagSettings","policySettings"];
function ZSn(t){let i=new Set(Xo()),e;for(let n of lU){if(!i.has(n))continue;let r=VG(ge(n)?.enabledPlugins,t);if(r!==void 0)e=r}return e};
function VG(t,i){let e=TS(i);return[e,...ZA(e),i].map((n)=>t?.[n]).find((n)=>n!==void 0)};
return {VG,ZSn,lU};}
export function createBuiltinStandalone287(ports){const {}=ports;const agentsDir287=ports.agentsDir287;
function ku(){return typeof Bun<"u"&&Bun.isStandaloneExecutable===!0};
return {ku};}
export function createBuiltinSuffix287(ports){const {}=ports;const agentsDir287=ports.agentsDir287;
var _i="builtin";
return {_i};}
export function createBuiltinObject287(ports){const {}=ports;const agentsDir287=ports.agentsDir287;
function N(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)};
return {N};}
export function createBuiltinInterop287(ports){const {}=ports;const agentsDir287=ports.agentsDir287;
var v=(a,c)=>()=>(c||a((c={exports:{}}).exports,c),c.exports);
return {v};}
export function createBuiltinAgentsDescriptor287(ports){const {I,eS,iU,lo,v}=ports;const agentsDir287=ports.agentsDir287;
var Le=v(function(Cr,Ne){Ne.exports={scan:{hooks:["session.start","prompt.context","agent.spawn","tool.call"],calls:["env.get","fs.ancestors","session.cwd","session.root","telemetry.log","telemetry.mark","ui.log"],env:{reads:["CLAUDE_CODE_DISABLE_ATTACHMENTS","CLAUDE_CODE_SIMPLE","HOME","USERPROFILE"],writes:[]}},files:{}}});
var W=!0;
var B=()=>lo("tengu_agents_md_mod",W);
var H="AGENTS.md as project instructions: by default loaded where the project has no CLAUDE.md; by its instructionFiles option, loaded beside CLAUDE.md, left out, or with the project instructions dropped";
var K="cc-plugin-agents-md";
var C="claude-md-or-agents-md";
var N=["claude-md","claude-md-or-agents-md","claude-md-and-agents-md","managed-only"];
var ne={instructionFiles:{type:"string",title:"Project instructions",description:`"claude-md": CLAUDE.md only, loaded by the engine as today. "claude-md-or-agents-md" (default): a project with no CLAUDE.md of its own gets its AGENTS.md files instead, loaded exactly where and how CLAUDE.md would be. "claude-md-and-agents-md": AGENTS.md files are loaded beside CLAUDE.md (a file CLAUDE.md already imports or links to is not loaded twice). "managed-only": the project's and your own instruction files are dropped; the organization's managed CLAUDE.md and memory stay.`,required:!1,default:C,options:[...N]}};
var Qe=()=>eS({name:K,description:H,isAvailable:B,hooksModule:iU(agentsDir287,I,()=>Le()),userConfig:ne});
return {Qe,K,H,B,W,Le,ne,C,N};}
export function initializeAgentsBuiltin287(ports){const {ro,rpe}=ports;let e=ro();if(e.builtinPluginsInitialized)return;e.builtinPluginsInitialized=!0;rpe("cc-plugin-agents-md",()=>ports.agentsModule());}
