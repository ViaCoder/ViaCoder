// Official 2.1.287 public beta producer. R04-only transport projections in provenance.
export function createOfficialModelBetas287(ports){
const {Xr,a,Be,He,cc,zF,cL,zQe,xa,ol,ft,uwn,fd,Ce,tt,k,Ano,od,t}=ports;
var cp="oauth-2025-04-20";

var G_t=ports.betaRegistry.get("claude-code-20250219");
var ewe=ports.betaRegistry.get("oauth-2025-04-20");
var R6t=ports.betaRegistry.get("interleaved-thinking-2025-05-14");
var EU=ports.betaRegistry.get("context-1m-2025-08-07");
var twe=ports.betaRegistry.get("context-management-2025-06-27");
var Koe=ports.betaRegistry.get("structured-outputs-2025-12-15");
var ner=ports.betaRegistry.get("web-search-2025-03-05");
var JKr=ports.betaRegistry.get("advanced-tool-use-2025-11-20");
var uEn=ports.betaRegistry.get("tool-search-tool-2025-10-19");
var I2e=ports.betaRegistry.get("effort-2025-11-24");
var rer=ports.betaRegistry.get("task-budgets-2026-03-13");
var z_t=ports.betaRegistry.get("prompt-caching-scope-2026-01-05");
var O2e=ports.betaRegistry.get("prompt-caching-evict-2026-05-12");
var Ix=ports.betaRegistry.get("cache-keepalive-2026-09-03");
var V_t=ports.betaRegistry.get("extended-cache-ttl-2025-04-11");
var x6t=ports.betaRegistry.get("fast-mode-2026-02-01");
var P6t=ports.betaRegistry.get("redact-thinking-2026-02-12");
var H2e=ports.betaRegistry.get("thinking-resumption-2026-07-17");
var IF=ports.betaRegistry.get("thinking-token-count-2026-05-13");
var zM=ports.betaRegistry.get("afk-mode-2026-01-31");
var oer=ports.betaRegistry.get("advisor-tool-2026-03-01");
var Upe=ports.betaRegistry.get("cache-diagnosis-2026-04-07");
var QKr=ports.betaRegistry.get("context-hint-2026-04-09");
var I6t=ports.betaRegistry.get("mcp-servers-2025-12-04");
var ZKr=ports.betaRegistry.get("files-api-2025-04-14");
var e4r=ports.betaRegistry.get("environments-2025-11-01");
var O6t=ports.betaRegistry.get("ccr-byoc-2025-07-29");
var QE=ports.betaRegistry.get("mid-conversation-system-2026-04-07");
var OF=ports.betaRegistry.get("per-turn-control-2026-07-01");
var Pj=ports.betaRegistry.get("timing-2026-09-09");
var Dy=ports.betaRegistry.get("mid-conversation-tool-changes-2026-07-01");
var Jh=ports.betaRegistry.get("inline-tools-2026-09-15");
var VM=ports.betaRegistry.get("server-side-fallback-2026-06-01");
var C_=ports.betaRegistry.get("server-side-fallback-2026-07-01");
var vU=ports.betaRegistry.get("fallback-credit-2026-06-01");
var H6t=null;
var n4r=ports.betaRegistry.get("auto-mode-classifier-2026-07-16");
var XC=ports.betaRegistry.get("dangerous-tool-use-2026-09-03");
var RR=null;
var nwe=ports.betaRegistry.get("thinking-display-updates-2026-08-18");
var DF=ports.betaRegistry.get("message-threads-2026-08-12");
var CU=ports.betaRegistry.get("mid-conversation-system-clear-at-2026-08-21");
var HF=ports.betaRegistry.get("thinking-binding-controls-2026-08-01");
var CR=ports.betaRegistry.values();
var Wi=ports.betaRegistry;
function q_t(e){return Wi.get(e)}
function r4r(e){return Wi.get(e)??Object.freeze({name:e,header:e})}
function sT(e){return e.map((s)=>s.header)}
function K_t(e){return e.toLowerCase().includes("afk-mode")}
function rK(){return a.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS||qM()}
function qM(){return ol("hipaa")}
function Im(){return Yoe()&&!rK()}
function Yoe(){let e=He();return e==="firstParty"||e==="foundry"}
var N={per_turn_effort:"tengu_per_turn_effort"};
function S(e){let t=N[e];if(t===void 0)return!0;return cL().featureGateLookup?.(t)===!0}
function ny(e,t,n){return zQe(t,e)??bzt(e,t,n)}
function bzt(e,t,n){if(cL().servedCapabilityLookup?.(t,[n,m(e)])===!0&&S(t))return!0;return L8r(e,t)?!0:void 0}
function L8r(e,t){return xa(m(e))?.capabilities.includes(t)}
function m(e){return e.replace(/\[1m\]/gi,"")}
function Qr(){return{allModelBetas:new Map,modelBetas:new Map,bedrockExtraBodyParamsBetas:new Map,midConversationSystem:new Map}}
function _j(e){let n=Xr();n.servedCatalogSuppressDepth++;try{return e()}finally{n.servedCatalogSuppressDepth--}}
function XQ(){return Xr().servedCatalogSuppressDepth>0}
var XI=[{modelEnvVar:"ANTHROPIC_DEFAULT_FABLE_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_FABLE_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_DEFAULT_OPUS_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_OPUS_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_DEFAULT_SONNET_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_SONNET_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_DEFAULT_HAIKU_MODEL",capabilitiesEnvVar:"ANTHROPIC_DEFAULT_HAIKU_MODEL_SUPPORTED_CAPABILITIES"},{modelEnvVar:"ANTHROPIC_CUSTOM_MODEL_OPTION",capabilitiesEnvVar:"ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES"}];
function JI(e,n){if(od())return;for(let r of XI){let s=process.env[r.modelEnvVar]?.trim(),g=process.env[r.capabilitiesEnvVar];if(!s||g===void 0)continue;if(e!==s.toLowerCase())continue;return g.toLowerCase().split(",").map((h)=>h.trim()).includes(n)}return}
function Dbe(e,n){let r=e.toLowerCase(),s=`${r}:${n}`,g=Xr().providerCache.capabilityOverrides;if(g.has(s))return g.get(s);let h=JI(r,n);return g.set(s,h),h}
var av=["claude-opus-4-0","claude-sonnet-4-0","claude-opus-4-1","claude-sonnet-4-5","claude-haiku-4-5","claude-opus-4-5","claude-opus-4-6","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-8"];
function lr(e,n){if(e.includes("claude-3-"))return!0;let r=av.indexOf(e);return r!==-1&&r<av.indexOf(n)}
function QP(){return a.CLAUDE_CODE_DISABLE_1M_CONTEXT}
function n_t(e){return/\[1m\]/i.test(e)}
function zd(e){if(QP())return!1;return n_t(e)}
function nwn(){return tt().showThinkingSummaries??!1}
function rwn(e){let n=Dbe(e,"interleaved_thinking");if(n!==void 0)return n;let r=Be(e),s=cc(e);if(s==="foundry")return!0;if(zF(s))return!r.includes("claude-3-");if(r==="claude-haiku-4-5"||r.includes("claude-3-"))return!1;return!0}
function nN(e){let n=Be(e),r=ny(n,"context_management",e);if(r===!1)return!1;let s=cc(e);if(s==="foundry")return!0;if(zF(s))return!n.includes("claude-3-");return r||n==="claude-mythos-5"}
function own(e){let n=Be(e),r=cc(e);if(!zF(r))return!1;if(rK())return!1;return!lr(n,"claude-opus-4-1")}
function rN(){let e=Xr();return XQ()?e.betasCompiledOnly:e.betas}
function fa(e,n,r){let s=e(rN()),g=s.get(n);if(g!==void 0)return g;let h=r();if(s.set(n,h),!XQ()){let b=e(Xr().betasCompiledOnly);if(!b.has(n))b.set(n,_j(r))}return h}
function p8(e){return fa((n)=>n.midConversationSystem,e,()=>oN(e))}
function oN(e){if(ol("hipaa"))return!1;if(a.CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM)return!0;let n=Dbe(e,"mid_conversation_system");if(n!==void 0)return n;let r=Be(e);if(lr(r,"claude-opus-4-8"))return!1;let s=ny(r,"mid_conv_system",e);if(s!==void 0)return s;if(r==="claude-mythos-5")return!0;return zF(cc(e))}
function iwn(e){return fa((n)=>n.allModelBetas,e,()=>uN(e))}
function uN(e){let n=rK(),r={model:e,canonical:Be(e),provider:He(),experimentalBetasOff:n,firstPartyOnlyBetas:Im(),firstPartyCapabilityBetas:zF(cc(e))&&!n,interleavedThinking:rwn(e)},s=[];for(let h of aN)if(h.when(r))s.push(h.beta);let g=a.ANTHROPIC_BETAS;if(g)if(qM())t("ANTHROPIC_BETAS ignored: experimental betas are disabled by your organization's policy",{level:"debug"});else s.push(...g.split(",").map((h)=>h.trim()).filter((h)=>h&&!K_t(h)).map(r4r));return s}
function eZ(e){let n=fa((s)=>s.modelBetas,e,()=>{let s=iwn(e);return s}),r=Ano();return r.size===0?n:n.filter((s)=>!r.has(s))}
function Ej(){let e=Xr();e.betas=Qr(),e.betasCompiledOnly=Qr()}
var aN=[{beta:G_t,when:(e)=>!e.canonical.includes("haiku")},{beta:ewe,when:()=>ft()||Yoe()&&!uwn()&&fd()},{beta:EU,when:(e)=>zd(e.model)},{beta:R6t,when:(e)=>!a.DISABLE_INTERLEAVED_THINKING&&e.interleavedThinking},{beta:P6t,when:(e)=>e.firstPartyOnlyBetas&&e.interleavedThinking&&!Ce()&&!nwn()},...IF?[{beta:IF,when:(e)=>e.interleavedThinking&&!e.experimentalBetasOff&&(e.provider==="firstParty")}]:[],{beta:twe,when:(e)=>{let n=a.USE_API_CONTEXT_MANAGEMENT&&!1,r=nN(e.model);return e.firstPartyCapabilityBetas&&(n||r)}},{beta:Koe,when:(e)=>{let n=k("tengu_tool_pear",!1);return e.firstPartyCapabilityBetas&&own(e.model)&&n}},{beta:ner,when:(e)=>e.provider==="foundry"},{beta:z_t,when:(e)=>e.firstPartyOnlyBetas},{beta:QE,when:(e)=>p8(e.model)}];
return {Qr,_j,XQ,iwn,eZ,Ej,p8,r4r,q_t,sT,Im,rK};
}
