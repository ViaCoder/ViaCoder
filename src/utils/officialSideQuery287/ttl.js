// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryTtl287(ports){
const {He,a,ft,k,nno,pa,tno,tt}=ports;
var vDe=["repl_main_thread*","sdk","auto_mode","memdir_relevance"];
function jEo(e){return TDe(e,vDe)};
function TDe(e,n){return e!==void 0&&n.some((r)=>r.endsWith("*")?e.startsWith(r.slice(0,-1)):e===r)};
function L$t(e,n,r=!1){if(a.FORCE_PROMPT_CACHING_5M)return{ttl:"5m",reason:"force_5m_env"};let s=jEo(e),g=s?a.CLAUDE_CODE_PROMPT_CACHE_TTL:a.CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL;if(g!==void 0)return{ttl:g,reason:"env"};let h=tt(),b=s?h.promptCacheTtl:h.subagentPromptCacheTtl;if(b!==void 0)return{ttl:b,reason:"setting"};if(n!==void 0&&!(n==="1h"&&r))return{ttl:n,reason:"agent_frontmatter"};if(a.ENABLE_PROMPT_CACHING_1H||He()==="bedrock"&&a.ENABLE_PROMPT_CACHING_1H_BEDROCK)return{ttl:"1h",reason:"enable_1h_env"};return};
function ejt(e,{agentCacheTtlOverride:n,ignoreOverage:r=!1}={}){let s=ft(),g=s&&!r&&pa().isUsingOverage===!0,h=L$t(e,n,g);if(h!==void 0)return h;if(!s||g)return{ttl:"5m",reason:"default"};let b=tno();if(b===null)b=k("tengu_prompt_cache_1h_config",{allowlist:[...vDe]}).allowlist??[],nno(b);return TDe(e,b)?{ttl:"1h",reason:"subscriber"}:{ttl:"5m",reason:"default"}};
function QD(e,n){return ejt(e,n).ttl==="1h"};
return {QD};
}
