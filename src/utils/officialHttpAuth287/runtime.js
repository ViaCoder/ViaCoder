// Official npm 2.1.287 complete declarations; existing public port names and recorded WIF import mapping.
export function createHttpAuth({$Yr,BS,Bn,He,R_,Wc,Xn,a,ge,ht,kr,pn,t}){
const eto=$Yr,mb=BS,Vn=Bn,nS=R_,fd=Wc,er=Xn,St=ht,xr=kr,fn=pn;
var r=new Set(["claude-desktop","claude-desktop-3p","local-agent"]);
function yd(){let e=a.CLAUDE_CODE_ENTRYPOINT;return e!==void 0&&r.has(e)}
function pK(e){return(process.env[e]?.trim()??"")!==""||eto(e)}
function Cb(){return!1}
function tg(){let e=process.env.ANTHROPIC_BASE_URL;if(!e)return!0;return ry(e)}
function ry(e){try{let t=new URL(e).host;return["api.anthropic.com"].includes(t)}catch{return!1}}
var fA="user:inference";
function HTn(t){return Array.isArray(t)&&t.includes(fA)}
var cp="oauth-2025-04-20";
var wOe=["https://beacon.claude-ai.staging.ant.dev","https://claude.fedstart.com","https://claude-staging.fedstart.com"];
var zT="api.anthropic.com";
function Rg(){if(a.ANTHROPIC_BASE_URL)return os(a.ANTHROPIC_BASE_URL);return zT}
function Og(e){return ns(Rg(),e)}
function ns(e,n){let r=XT(n)?os(n):void 0;return e!==void 0&&e===r&&JT(r)}
function XT(e){try{return new URL(e).protocol==="https:"}catch{return!1}}
function os(e){if(!e)return;try{return new URL(e).host}catch{return}}
function JT(e){return ry(`https://${e}`)||wOe.some((n)=>os(n)===e)}
async function NM(e={}){if(!Xb()&&fd())try{let{getWIFCredentials:n,getWIFTokenCache:r}=await import("../httpWorkloadIdentity.js"),[s,g]=await Promise.all([r(),n()]);if(s!==null)return{headers:{...g?.extraHeaders,Authorization:`Bearer ${await s.getToken()}`,"anthropic-beta":cp}}}catch(n){return t(`WIF auth header resolution failed: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),{headers:{},error:n instanceof Error?n.message:String(n),reasonCode:"wif_error"}}return dIe(e)}
function dIe(e={}){if(h8())return{headers:{},error:"Anthropic auth not used on third-party providers",reasonCode:"third_party"};if(ft()){let r=fn();if(!r?.accessToken)return{headers:{},error:"No OAuth token available",reasonCode:"no_oauth_token"};return{headers:{Authorization:`Bearer ${r.accessToken}`,"anthropic-beta":cp}}}if(He()==="gateway")return{headers:{},error:"Not available when using a Cloud gateway",reasonCode:"gateway"};let n=Xb();if(!n){let r=e.envBearerFallbackFor,s=r?KE():void 0;if(s&&r&&tg()&&Og(r)&&!a.ANTHROPIC_UNIX_SOCKET)return{headers:{Authorization:`Bearer ${s}`}};return{headers:{},error:"No API key available",reasonCode:"no_api_key"}}return{headers:{"x-api-key":n}}}
async function E_(e,n){let r;if(n?.gateToSessionOAuthCredential){let s=fn(),g=await NM();r=s?.accessToken&&s.refreshToken&&g.headers.Authorization===`Bearer ${s.accessToken}`?s.accessToken:void 0}try{return await e()}catch(s){if(!St.isAxiosError(s))throw s;let g=s.response?.status;if(!(g===401||n?.also403Revoked&&g===403&&typeof s.response?.data==="string"&&s.response.data.includes("OAuth token has been revoked")))throw s;if(n?.gateToSessionOAuthCredential){if(!r)throw s;let v=fn()?.accessToken;if(v&&v!==r)return await e();let w=n.oauthRefreshLatch;if(w?.attempted)throw s;if(w)w.attempted=!0;let A=n.onForcedRefreshOutcome,R=!1;if(await nS(r,n?.credentials,void 0,{onForcedRefreshOutcome:w||A?(D)=>{if(R=!0,w&&$Wt.has(D))w.attempted=!1;A?.(D)}:void 0}),!R)A?.(void 0);let M=fn()?.accessToken;if(!M||M===r)throw s;return await e()}let b=fn()?.accessToken;if(!b)throw s;return await nS(b,n?.credentials),await e()}}
function pr(){return a.CLAUDE_CODE_REMOTE||yd()}
function Jl(){return a.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST}
function RWt(){return pr()&&!a.CLAUDE_CODE_HOST_AUTH_ENV_VAR&&a.CLAUDE_CODE_ENTRYPOINT!=="claude-desktop-3p"}
function f8(){if(!xr())return!1;return!0}
function vl(){if(f8())return!1;if(a.ANTHROPIC_UNIX_SOCKET)return!!a.CLAUDE_CODE_OAUTH_TOKEN;if(fd())return!1;let e=!Vn(),n=er()||{},r=xr()?vh():n.apiKeyHelper,s=KE(),g;try{g=mb({skipRetrievingKeyFromApiKeyHelper:!0}).source}catch{return!1}let h=g==="ANTHROPIC_API_KEY"||g==="apiKeyHelper",b=pK("CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR"),v=(s||h)&&!RWt()||(r||b)&&!pr();return!(e||v)}
function KE(){return Cb()?void 0:a.ANTHROPIC_AUTH_TOKEN}
function nZ(){let{key:e}=mb();return e}
function Xb(){try{return nZ()}catch{return null}}
function vh(){if(xr())return ge("flagSettings")?.apiKeyHelper;if(Jl())return;return(er()||{}).apiKeyHelper}
var $Wt=new Set(["lock_timeout","lock_busy","lock_error"]);
function ft(){if(!vl())return!1;return uU(fn()?.scopes)}
function h8(){return!Vn()}
function uU(e){return HTn(e)}
return {authEnabled:vl,subscriber:ft,headers:dIe,resolveHeaders:NM,with401:E_,envBearer:KE,envBearerEndpoint:Og};
}
