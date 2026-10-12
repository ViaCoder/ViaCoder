// Complete official npm 2.1.285 declarations. Generated; no body rewriting.
export function createPolicyText({}){
function Vt(e){return Bun.stripANSI(e)}
var s="\\p{Default_Ignorable_Code_Point}\\u2800";
var uue=`\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\p{Cn}\\u2028\\u2029${s}`;
var p=new RegExp(`[${uue}]+`,"gu");
var o="\\u200D\\uFE0E\\uFE0F";
var u=new RegExp(`(?:(?![${o}])[${uue}])+`,"gu");
var c=new RegExp(`(?:(?![${o}\\n])[${uue}])+`,"gu");
var a=new RegExp(`(?<!\\S)[${o}]+`,"gu");
var g=/\p{Cs}/gu;
function pO(e,n,r){let t=r?.keepNewlines===!0||r?.keepEmojiJoiners===!0,i=Vt(e.replace(g,"\u200B")).replace(r?.keepNewlines?c:t?u:p,n);return t?i.replace(a,""):i}
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)}
var rn=/\p{Default_Ignorable_Code_Point}/u;
var on=/\p{Cf}/u;
function sn(e){return e>=8204&&e<=8207||e===1564||e>=65024&&e<=65039||e>=6155&&e<=6159||e===10240}
function D(e,n){return rn.test(e)||e==="\u2028"||e==="\u2029"||e==="\u2800"||n>=55296&&n<=57343||n===1109742||on.test(e)}
function f5(e){for(let n of e)if(D(n,n.codePointAt(0)??0))return!0;return!1}
function r$e(e){return/[\u0000-\u001f\u007f-\u009f]/.test(e)||f5(e)}
return {sanitize:pO,truncate:re,urlHasHiddenControls:r$e};
}
export function createPolicySchema({O,S,ae,d,k,nm,o,p,pO,r$e,re,ue}){
function V(n,e){let r=0;for(let t of n)r+=+!!e(t);return r}
function U(n){return[...new Set(n)]}
function e0(e){if(Array.isArray(e))return e.map(e0);if(e!==null&&typeof e==="object"){let n={};for(let s of Object.keys(e).sort())n[s]=e0(e[s]);return n}return e}
function tSe(e){let n=e0(e),s=S(n);return`sha256:${nm("sha256").update(s).digest("hex")}`}
function Y(e){let n=re(pO(e,"").toLowerCase(),64).trim();return/^[a-z0-9_-]+$/.test(n)?n:""}
var c9e=16;
function Oqn(e){let n=typeof e==="object"&&e!==null&&"compliance_taints"in e?e.compliance_taints:void 0;if(!Array.isArray(n))return 0;let i=V(n,(s)=>typeof s!=="string"||Y(s)===""),r=U(n.filter((s)=>typeof s==="string").map(Y).filter((s)=>s.length>0));return i+Math.max(0,r.length-c9e)}
var Fe=new WeakMap;
var xe=p(()=>d({restrictions:ue(o(),d({allowed:O()})),compliance_taints:k(ae()).default([]).transform((e,n)=>{let i=U(e.filter((r)=>typeof r==="string").map(Y).filter((r)=>r.length>0)).slice(0,c9e);if(e.length>0&&i.length===0)n.addIssue({code:"custom",message:"compliance_taints had entries but none were well-formed regime names"});return i}),monitoring_notice:d({text:o().max(500).transform((e)=>pO(e,"",{keepEmojiJoiners:!0})),url:o().max(2048).url().startsWith("https://").refine((e)=>!r$e(e)).nullish().catch(null)}).nullable().default(null).catch(null),defaults:ue(o(),ae()).default({}).catch({}),core_skills:k(o().max(128)).max(256).optional().catch([])}));
function lFt(e){let n=xe().safeParse(e);if(n.success)Fe.set(n.data,e);return n}
function jut(e){return Fe.get(e)??e}
return {schema:xe,parse:lFt,lossyCount:Oqn,rawResponses:Fe,rawResponse:jut,checksum:e=>tSe(jut(e))};
}
export function createPolicyProtocol({Ms,Nc,Pe,TS,Wi,a,bC,f,gt,ln}){
function rBo(e){let{CLAUDE_CODE_OAUTH_TOKEN:r,ANTHROPIC_API_KEY:n}=e;return!!e.ANTHROPIC_UNIX_SOCKET&&!e.ANTHROPIC_AUTH_TOKEN&&(r==="ssh-placeholder"&&!n||n==="ssh-placeholder"&&!r)}
var Upt="x-claude-code-tunnel-credential-epoch";
function RKn(e){if(e==null||!/^\d{1,15}$/.test(e))return;return Number(e)}
var E=16384;
var M="x-claude-code-signature";
function CFr(e){return typeof e==="string"&&e.length>0&&e.length<=E?e:void 0}
function QNt(e){return CFr(e&&M in e?e[M]:void 0)}
function f2e(n){return n!==void 0&&n>=400&&n<500&&n!==408&&n!==409&&n!==429}
function bD(){let e=f();if(e.tunnelSocket===void 0){let n=a.ANTHROPIC_UNIX_SOCKET;e.tunnelSocket=n&&rBo({ANTHROPIC_UNIX_SOCKET:n,CLAUDE_CODE_OAUTH_TOKEN:a.CLAUDE_CODE_OAUTH_TOKEN,ANTHROPIC_API_KEY:a.ANTHROPIC_API_KEY,ANTHROPIC_AUTH_TOKEN:a.ANTHROPIC_AUTH_TOKEN})?n:null}return e.tunnelSocket??void 0}
function qqn(e={}){if(Pe()!=="firstParty")return"third_party_provider";if(!e.skipBaseUrlCheck&&!bD()&&!Ms())return"custom_base_url";return}
function Eke(e={}){let n=qqn(e);if(n!==void 0)return n;if(bD())return;try{let{key:r}=TS({skipRetrievingKeyFromApiKeyHelper:!0});if(r)return}catch{}if(Nc())return;let i=ln();if(!i?.accessToken)return"no_auth";if(!i.scopes?.includes(bC))return"oauth_no_inference_scope";if(i.subscriptionType==null)return;if(i.subscriptionType!=="enterprise"&&i.subscriptionType!=="team")return"prosumer_oauth";return}
function xy(){return Eke()===void 0}
var Je={"Cache-Control":"no-cache",Pragma:"no-cache"};
async function we(e){let r=await gt.get(e.endpoint,{headers:{"User-Agent":Wi(),...Je,...e.ifNoneMatch!==void 0&&{"If-None-Match":`"${e.ifNoneMatch}"`},...e.authHeaders},timeout:e.timeoutMs,validateStatus:e.acceptAny2xx?(g)=>g>=200&&g<300||g===304:(g)=>g===200||g===304,...e.socketPath!==void 0&&{socketPath:e.socketPath}}),n=r.headers??{},o=QNt(n),h=n[Upt],s=RKn(typeof h==="string"?h:void 0);if(r.status===304)return{kind:"not_modified",signature:o,tunnelCredentialEpoch:s};return{kind:"ok",data:r.data,signature:o,contentType:String(n["content-type"]??"").toLowerCase(),tunnelCredentialEpoch:s}}
function De(e){if(!gt.isAxiosError(e))return;let r=e.response?.headers?.[Upt];return RKn(typeof r==="string"?r:void 0)}
return {socketPath:bD,ineligibleReason:Eke,eligible:xy,request:we,errorCredentialEpoch:De,skipHttpRetry:f2e};
}
