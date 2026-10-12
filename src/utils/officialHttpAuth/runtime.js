// Official npm 2.1.286 complete declarations; only recorded WIF dependency import remapping.
export function createHttpAuth({$Yr,BS,Bn,He,R_,Wc,Xn,a,ge,ht,kr,pn,t}){
var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
function Yc(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&r.has(e)}
function c3(e){return(process.env[e]?.trim()??"")!==""||$Yr(e)}
function QS(){return!1}
function Ng(){let e=process.env.ANTHROPIC_BASE_URL;if(!e)return!0;return Bh(e)}
function Bh(e){try{let t=new URL(e).host;return["api.anthropic.com"].includes(t)}catch{return!1}}
var PC="user:inference";
function hEn(t){return Array.isArray(t)&&t.includes(PC)}
var Uu="oauth-2025-04-20";
var SIe=["https://beacon.claude-ai.staging.ant.dev","https://claude.fedstart.com","https://claude-staging.fedstart.com"];
var NT="api.anthropic.com";
function Pg(){if(a.ANTHROPIC_BASE_URL)return us(a.ANTHROPIC_BASE_URL);return NT}
function Mg(e){return ls(Pg(),e)}
function ls(e,n){let r=BT(n)?us(n):void 0;return e!==void 0&&e===r&&HT(r)}
function BT(e){try{return new URL(e).protocol==="https:"}catch{return!1}}
function us(e){if(!e)return;try{return new URL(e).host}catch{return}}
function HT(e){return Bh(`https://${e}`)||SIe.some((n)=>us(n)===e)}
async function QD(e={}){if(!wb()&&Wc())try{let{getWIFCredentials:n,getWIFTokenCache:r}=await import("../httpWorkloadIdentity.js"),[s,g]=await Promise.all([r(),n()]);if(s!==null)return{headers:{...g?.extraHeaders,Authorization:`Bearer ${await s.getToken()}`,"anthropic-beta":Uu}}}catch(n){return t(`WIF auth header resolution failed: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),{headers:{},error:n instanceof Error?n.message:String(n),reasonCode:"wif_error"}}return dxe(e)}
function dxe(e={}){if(i9())return{headers:{},error:"Anthropic auth not used on third-party providers",reasonCode:"third_party"};if(ct()){let r=pn();if(!r?.accessToken)return{headers:{},error:"No OAuth token available",reasonCode:"no_oauth_token"};return{headers:{Authorization:`Bearer ${r.accessToken}`,"anthropic-beta":Uu}}}if(He()==="gateway")return{headers:{},error:"Not available when using a Cloud gateway",reasonCode:"gateway"};let n=wb();if(!n){let r=e.envBearerFallbackFor,s=r?gE():void 0;if(s&&r&&Ng()&&Mg(r)&&!a.ANTHROPIC_UNIX_SOCKET)return{headers:{Authorization:`Bearer ${s}`}};return{headers:{},error:"No API key available",reasonCode:"no_api_key"}}return{headers:{"x-api-key":n}}}
async function Xy(e,n){let r;if(n?.gateToSessionOAuthCredential){let s=pn(),g=await QD();r=s?.accessToken&&s.refreshToken&&g.headers.Authorization===`Bearer ${s.accessToken}`?s.accessToken:void 0}try{return await e()}catch(s){if(!ht.isAxiosError(s))throw s;let g=s.response?.status;if(!(g===401||n?.also403Revoked&&g===403&&typeof s.response?.data==="string"&&s.response.data.includes("OAuth token has been revoked")))throw s;if(n?.gateToSessionOAuthCredential){if(!r)throw s;let E=pn()?.accessToken;if(E&&E!==r)return await e();let w=n.oauthRefreshLatch;if(w?.attempted)throw s;if(w)w.attempted=!0;let k=n.onForcedRefreshOutcome,A=!1;if(await R_(r,n?.credentials,void 0,{onForcedRefreshOutcome:w||k?(D)=>{if(A=!0,w&&XUt.has(D))w.attempted=!1;k?.(D)}:void 0}),!A)k?.(void 0);let M=pn()?.accessToken;if(!M||M===r)throw s;return await e()}let b=pn()?.accessToken;if(!b)throw s;return await R_(b,n?.credentials),await e()}}
function fr(){return a.CLAUDE_CODE_REMOTE||Yc()}
function cc(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
function $Ut(){return fr()&&!a.CLAUDE_CODE_HOST_AUTH_ENV_VAR&&a.CLAUDE_CODE_ENTRYPOINT!=="claude-desktop-3p"}
function r9(){if(!kr())return!1;return!0}
function cl(){if(r9())return!1;if(a.ANTHROPIC_UNIX_SOCKET)return!!a.CLAUDE_CODE_OAUTH_TOKEN;if(Wc())return!1;let e=!Bn(),n=Xn()||{},r=kr()?ih():n.apiKeyHelper,s=gE(),g;try{g=BS({skipRetrievingKeyFromApiKeyHelper:!0}).source}catch{return!1}let h=g==="ANTHROPIC_API_KEY"||g==="apiKeyHelper",b=c3("CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR"),E=(s||h)&&!$Ut()||(r||b)&&!fr();return!(e||E)}
function gE(){return QS()?void 0:a.ANTHROPIC_AUTH_TOKEN}
function AJ(){let{key:e}=BS();return e}
function wb(){try{return AJ()}catch{return null}}
function ih(){if(kr())return ge("flagSettings")?.apiKeyHelper;if(cc())return;return(Xn()||{}).apiKeyHelper}
var XUt=new Set(["lock_timeout","lock_busy","lock_error"]);
function ct(){if(!cl())return!1;return h1(pn()?.scopes)}
function i9(){return!Bn()}
function h1(e){return hEn(e)}
return {authEnabled:cl,subscriber:ct,headers:dxe,resolveHeaders:QD,with401:Xy,envBearer:gE,envBearerEndpoint:Mg};
}
