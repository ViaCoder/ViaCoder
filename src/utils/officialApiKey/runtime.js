// Complete official npm 2.1.285 declarations. Generated; no body rewriting.
export function createApiKeySelection({Gn,JI,Nc,PWt,S4n,Zn,a,ce,fo,ge,mJ,w4n}){
function LS(){return!1}
function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)}
function li(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")}
function D5(){if(!fo())return!1;return!0}
function tc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
function zg(){if(fo())return ge("flagSettings")?.apiKeyHelper;if(tc())return;return(Zn()||{}).apiKeyHelper}
function Ane(e){return e.trim().slice(-20)}
function VI(e){let n=e.customApiKeyResponses;return{approved:li(n?.approved),rejected:li(n?.rejected)}}
function E4o(e,n){let{approved:r,rejected:s}=VI(e);if(r.includes(n))return"approved";if(s.includes(n))return"rejected";return"new"}
function O5n(e){return E4o(ce(),e)}
function TS(e={}){if(D5()){if(a.ANTHROPIC_API_KEY)return{key:a.ANTHROPIC_API_KEY,source:"ANTHROPIC_API_KEY"};if(zg())return{key:e.skipRetrievingKeyFromApiKeyHelper?null:S4n(),source:"apiKeyHelper"};return{key:null,source:"none"}}let n=LS()?void 0:a.ANTHROPIC_API_KEY;if(PWt()&&n)return{key:n,source:"ANTHROPIC_API_KEY"};if(Le(!1)){let h=mJ();if(h)return{key:h,source:"ANTHROPIC_API_KEY"};if(!n&&!a.CLAUDE_CODE_OAUTH_TOKEN&&!a.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR&&!JI()&&!a.ANTHROPIC_AUTH_TOKEN&&!Nc()&&Gn())throw Error("ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN, or WIF env vars (ANTHROPIC_FEDERATION_RULE_ID + ANTHROPIC_ORGANIZATION_ID) required");if(n)return{key:n,source:"ANTHROPIC_API_KEY"};return{key:null,source:"none"}}if(n&&O5n(Ane(n))==="approved")return{key:n,source:"ANTHROPIC_API_KEY"};let r=mJ();if(r)return{key:r,source:"ANTHROPIC_API_KEY"};if(zg()){if(e.skipRetrievingKeyFromApiKeyHelper)return{key:null,source:"apiKeyHelper"};return{key:S4n(),source:"apiKeyHelper"}}let g=w4n();if(g)return g;return{key:null,source:"none"}}
return {select:TS,helper:zg,normalize:Ane,approval:O5n};
}
