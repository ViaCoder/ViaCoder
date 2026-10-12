// Exact official 2.1.287 signed public client-data URL lifecycle.
export function createOfficialDownloadTransport287({St}){
var l=/(^|\.)(anthropic\.com|claude\.ai|claude\.com)$/i;
var _=/(^|\.)downloads\.claude\.ai$/i;
function E(e){let t,r=e.startsWith("//")?`https:${e}`:e;try{t=new URL(r).hostname}catch{t=e.match(/^[^/:]+/)?.[0]??e}return t.endsWith(".")?t.slice(0,-1):t}
function $0e(e){return l.test(E(e))}
function n$(e){return _.test(E(e))}
function Cfe(){return}
function c(e,t){for(let r of[e,t?.baseURL])if(r&&$0e(r))throw Error(`externalHttp: ${r} is Anthropic-operated. Use firstPartyApi from `+"src/services/http/firstParty \u2014 it enforces the 3P data-residency gate.")}
var sa={get(e,t){return c(e,t),Cfe(),St.get(e,t)},head(e,t){return c(e,t),Cfe(),St.head(e,t)},post(e,t,r){return c(e,r),Cfe(),St.post(e,t,r)},put(e,t,r){return c(e,r),Cfe(),St.put(e,t,r)},patch(e,t,r){return c(e,r),Cfe(),St.patch(e,t,r)},delete(e,t){return c(e,t),Cfe(),St.delete(e,t)}};
const hosted=(()=>{var m=/^([a-z][a-z\d+\-.]*:)?\/\//i;
function f(t,e){let o=e?.baseURL,r=m.test(t),n=null;if(r&&!n$(t))n=t;else if(o!=null&&!n$(o))n=o;else if(!r&&o==null)n=t;if(n!==null)throw Error(`downloads: request (url="${t}"`+(o!=null?`, baseURL="${o}"`:"")+") does not resolve to the public CDN (downloads.claude.ai). Use firstPartyApi for api.anthropic.com (residency-gated) or externalHttp for non-Anthropic hosts.")}
var N2={get(t,e){return f(t,e),Cfe(),St.get(t,e)}};return N2;})();
return {$0e,n$,sa,N2:hosted};
}
export function createOfficialPublishedDocumentReader287(ports){
const {M,G,Ru,Pr,f,u,o,C,x,t,ae,sa,N2,n$,$0e,gt}=ports;
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function W(n){return E(n)==="ENOENT"}
function l(n){return n instanceof Error?n.message:String(n)}
function Ws(n){let e=l(n);if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return{kind:"other",message:e};let t=n,r=t.response?.status;if(r===401||r===403)return{kind:"auth",status:r,message:e};if(t.code==="ECONNABORTED")return{kind:"timeout",status:r,message:e};if(t.code==="ECONNREFUSED"||t.code==="ENOTFOUND")return{kind:"network",status:r,message:e};return{kind:"http",status:r,message:e}}
var Ou=new Set(["metadata.google.internal","metadata.goog","metadata","instance-data","instance-data.ec2.internal","ip6-localhost","ip6-loopback","localhost.localdomain","localhost4","localhost4.localdomain4","localhost6","localhost6.localdomain6"]);
var Rr=new Set(["100.100.100.200","168.63.129.16","192.0.0.192"]);
function vr(e,n,s,r){return e===127||e===169&&n===254||e===0}
function Ao(e){return e[0]===0&&e[1]===100&&e[2]===255&&e[3]===155}
function Tr(e){let n=e.indexOf("%"),r=(n>=0?e.slice(0,n):e).toLowerCase().split("::");if(r.length>2)return;let i=r[0]?r[0].split(":"):[],d=r.length===2&&r[1]?r[1].split(":"):[],c=r.length===2?d:i,p=[],g=c.at(-1);if(g!==void 0&&g.includes(".")){let b=g.split(".").map(Number);if(b.length!==4||b.some((A)=>!Number.isInteger(A)||A<0||A>255))return;p=b,c.pop()}let h=(b)=>{let A=[];for(let D of b){if(!/^[0-9a-f]{1,4}$/.test(D))return;let v=parseInt(D,16);A.push(v>>8,v&255)}return A},m=h(r.length===2?i:[]),y=h(c);if(m===void 0||y===void 0)return;let S=m.length+y.length+p.length;if(S>16||r.length===1&&S!==16)return;return[...m,...Array(16-S).fill(0),...y,...p]}
function Dr(e){return Ao(e)&&e[4]===0&&e[5]===1}
function Cu(e){let n=[];if(e[0]===32&&e[1]===2)n.push(e.slice(2,6));let s=e.slice(0,10).every((p)=>p===0),r=s&&e[10]===255&&e[11]===255,i=s&&e[10]===0&&e[11]===0,d=Ao(e)&&e.slice(4,12).every((p)=>p===0),c=(e[8]===0||e[8]===2)&&e[9]===0&&e[10]===94&&e[11]===254;if(r||i||d||c)n.push(e.slice(12,16));return n}
function z8(e){let n=e.toLowerCase().replace(/^\[|\]$/g,"");if(n.endsWith("."))n=n.slice(0,-1);if(n===""||n==="localhost"||n.endsWith(".localhost"))return!0;if(Ou.has(n))return!0;if(n.startsWith("instance-data.")&&n.endsWith(".compute.internal"))return!0;if(Ru(n)){if(Rr.has(n))return!0;let[r=0,i=0,d=0,c=0]=n.split(".").map(Number);return vr(r,i,d,c)}if(!Pr(n))return!1;let s=Tr(n);if(s===void 0)return!0;if(Dr(s))return!0;if(s.every((r)=>r===0))return!0;if(s.slice(0,15).every((r)=>r===0)&&s[15]===1)return!0;if(n==="fd00:ec2::254")return!0;if(s[0]===254&&(s[1]??0)>=128&&(s[1]??0)<=191)return!0;return Cu(s).some((r)=>{let[i=0,d=0,c=0,p=0]=r;return vr(i,d,c,p)||Rr.has(`${i}.${d}.${c}.${p}`)})}
function KSt(e){if(e.href)return e.href;let n=e.host??(e.hostname&&(e.hostname.includes(":")&&!e.hostname.startsWith("[")?`[${e.hostname}]`:e.hostname)+(e.port?`:${e.port}`:""));return e.protocol&&n?`${e.protocol}//${n}`:""}
var y5e=2097152;
var Yse=256;
var qse=/^(?:W\/)?"[!#-~\x80-\xff]*"$/;
function w2(e){return typeof e==="string"&&e.length>0&&e.length<=Yse&&qse.test(e)}
var H={id:"claude-code-release-signing-key",spkiBase64:"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAp28rSV5I8HmK8CK9GixBUZR/gtJxeOCsRXO4EJiej40jzBmQA3cWXGosVO82ZfFsRKVTtMC5iB/HH9sxjncrmYNWGroJNbx29m/FgYQBgkCXT4AfFl6rnnXqRGLZOerj/4AqE4yQ1GZbhBgR55Z7ro0ieKK8RHYUspBKAFHyWRhCCz6THW6YRbf0p/hG/08TOY6Sj3cJ7/AEoTRf9ZmVNX1k0KvbUSiVGpGY9OIHWgxRJUF2pArU4o/hk+sqGAgEUh8Bjvjwvz6+quLXPg+y0Y8Ugb1Fg6BUppam/zydYY/Q/+yNjnuF154gD1jEeeir8R5czs6zUHSbo2yXUpAsIdWYo5End8vGsluVmFExnUWm/fTVMGoM5Wm3v1VRepMydEnJ+atz4oQdmPQcKNAip5GJO2uyk++xFr9CpKvlR5jral92toYV/m+mur3va8ydamWBo/qG7/wt0sdS81IwH6lcu0SQ39rgKD+bdoPLv05EqVMYTFRI2QZEsWGYTMs0DOrfCIJFH50qyD0x4sWw1gEWeG3jDgY8cj2StZz+zjqzUd05CibcCzEAGm1EQg5y9D40tIsAU1OI7bpgQ9V0lC8lrqE7zJY66UK9Z1daA8jrdDi6migNjHFrXfT3V4QvMthCIO05q05SS3x2G3ZpIgmI+CePUPB1pDf+lhPkU1MCAwEAAQ=="};
var dPt=[H];
function R(e){return new Uint8Array(Buffer.from(e.spkiBase64,"base64"))}
var b=".raw-sig.json";
function TEr(e){return M("sha256").update(e).digest("hex").slice(0,32)}
function T(e){return G(e.url)}
var Jge=y5e;
var Hqe=16384;
var N=1;
var j="RSASSA-PKCS1-v1_5-SHA512";
var L=f(()=>u({schema:x(N),algorithm:x(j),signature:o().min(1),publicKeySha256:o().regex(/^[0-9a-f]{64}$/)}).loose());
var B=1e4;
async function ien(e,{etag:n,noCache:r=!1}={}){try{return e.kind==="file"?await q(e):await X(e,{etag:n,noCache:r})}catch(i){let{kind:s,status:l}=Ws(i);switch(t(`[publishedCatalog] fetch failed: ${s}${l!==void 0?` ${l}`:""}`),s){case"timeout":return{status:"error",reason:"timeout"};case"network":return{status:"error",reason:"network"};case"auth":case"http":return l===void 0?{status:"error",reason:te(i)?"too_large":"network"}:{status:"error",reason:"http_status",httpStatus:l};case"other":return{status:"error",reason:"exception"}}}}
async function X(e,{etag:n,noCache:r}){let i=Q(e.url),s=r?{"Cache-Control":"no-cache",Pragma:"no-cache"}:void 0,l=await O(e.url,{responseType:"arraybuffer",timeout:B,maxContentLength:Jge,maxBodyLength:Jge,validateStatus:()=>!0,beforeRedirect:i,...(n!==void 0||s!==void 0)&&{headers:{...s,...n!==void 0&&{"If-None-Match":n}}}}),d=l.status;if(d===304&&n!==void 0)return t("[publishedCatalog] fetch: not modified"),{status:"not_modified",httpStatus:d};if(d<200||d>=300)return t(`[publishedCatalog] fetch: HTTP ${d}`),{status:"error",reason:"http_status",httpStatus:d};let c=w(l.data);if(c.length>Jge)return{status:"error",reason:"too_large",httpStatus:d};let h=void 0,g=!1,p=await O(ee(e.url),{responseType:"arraybuffer",timeout:B,maxContentLength:Hqe,maxBodyLength:Hqe,validateStatus:()=>!0,beforeRedirect:i,...s!==void 0&&{headers:s}});if(p.status>=200&&p.status<300){let m=w(p.data);if(m.length<=Hqe)g=!0,h=gt(Buffer.from(m).toString("utf8"),!1)}else t(`[publishedCatalog] sidecar fetch: HTTP ${p.status}`);return t(`[publishedCatalog] fetch ok: ${c.length} bytes${g?", sidecar present":", no sidecar"}`),{status:"ok",documentBytes:c,sidecar:h,hasSidecar:g,sidecarHttpStatus:p.status,etag:ne(l.headers),httpStatus:d}}
async function q(e){let n=T(e),r=ae(),i;try{i=await r.readFileBytes(n,Jge+1)}catch(d){return t(`[publishedCatalog] file read failed${W(d)?" (no such file)":""}`),{status:"error",reason:"read_failed"}}if(i.length>Jge)return{status:"error",reason:"too_large"};let s=void 0,l=!1;try{let d=await r.readFileBytes(`${n}${b}`,Hqe+1);if(d.length<=Hqe)l=!0,s=gt(d.toString("utf8"),!1)}catch(d){if(!W(d))t("[publishedCatalog] sidecar read failed")}return t(`[publishedCatalog] file read ok: ${i.length} bytes${l?", sidecar present":", no sidecar"}`),{status:"ok",documentBytes:new Uint8Array(i),sidecar:s,hasSidecar:l,sidecarHttpStatus:void 0,etag:void 0,httpStatus:void 0}}
function O(e,n){return n$(e)?N2.get(e,n):sa.get(e,n)}
function Q(e){let n=n$(e),r=D(e),i=e.toLowerCase().startsWith("https:");return(s)=>{let l=KSt(s),d=Z(l),c=J(l),h=r!==""&&D(l)===r,g=i?c==="https:":h||c==="https:";if(!(d!==""&&(n?n$(d):!$0e(d))&&g&&(h||!z8(d))))throw Error("[publishedCatalog] redirect refused: a hop left the host the request was pinned to")}}
function Z(e){try{return new URL(e).hostname.toLowerCase()}catch{return""}}
function D(e){try{let n=new URL(e).origin;return n==="null"?"":n}catch{return""}}
function J(e){try{return new URL(e).protocol.toLowerCase()}catch{return""}}
function ee(e){let n=new URL(e);return n.pathname+=b,n.toString()}
function w(e){if(e instanceof Uint8Array)return e;if(e instanceof ArrayBuffer)return new Uint8Array(e);if(typeof e==="string")return new TextEncoder().encode(e);return new Uint8Array(0)}
function te(e){return typeof e==="object"&&e!==null&&"code"in e&&(e.code==="ERR_FR_MAX_BODY_LENGTH_EXCEEDED"||e.code==="ERR_BAD_RESPONSE")}
function ne(e){let n=e?.etag;return w2(n)?n:void 0}
var I="claude-code-model-catalog-v1\x00";
var K={name:"RSASSA-PKCS1-v1_5",hash:"SHA-512"};
async function Kst({documentBytes:e,sidecar:n,roots:r,context:i=I}){let s=L().safeParse(n);if(!s.success)return{ok:!1,reason:"sidecar_invalid"};let l=Buffer.from(s.data.signature,"base64");if(l.length===0||l.toString("base64")!==s.data.signature)return{ok:!1,reason:"sidecar_invalid"};let d,c;for(let p of r){let m=A(R(p));if(await oe(m)===s.data.publicKeySha256){d=p,c=m;break}}if(d===void 0||c===void 0)return{ok:!1,reason:"unknown_key"};let h;try{h=await crypto.subtle.importKey("spki",c,K,!1,["verify"])}catch(p){return t(`[publishedCatalog] trust root ${d.id} is not an importable RSA key: ${p instanceof Error?p.name:"error"}`),{ok:!1,reason:"key_unusable"}}let g;try{g=await crypto.subtle.verify(K.name,h,A(l),re(e,i))}catch{g=!1}return g?{ok:!0,rootId:d.id}:{ok:!1,reason:"bad_signature"}}
function re(e,n=I){let r=new TextEncoder().encode(n),i=new Uint8Array(r.length+e.length);return i.set(r),i.set(e,r.length),i}
async function oe(e){let n=await crypto.subtle.digest("SHA-256",A(e));return Buffer.from(n).toString("hex")}
function A(e){let n=new Uint8Array(e.byteLength);return n.set(e),n}
return {ien,Kst,dPt,TEr,Q,re,oe};
}
export function createOfficialPublishedFloor287({Xr,Bt,Qd,we,b,f,u,o,C,de,x,gt,_,t}){
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
function W(n){return E(n)==="ENOENT"}
function ZP(){return Qd(we(),"cache","model-catalog")}
var kEr="published-floor.json";
var l=1;
var h=32;
var a=65536;
var v=f(()=>u({version:x(l),sources:de(o().min(1).max(64),u({version:C().int().nonnegative(),issuedAt:o().max(64),recordedAt:C().int().nonnegative()}))}));
function c(){return b(ZP(),kEr)}
function s(){return Xr().publishedCatalogFloorMarks}
async function aen(e){return await m(),s().get(e)?.version??0}
async function Yst(e,r,i=Date.now()){await m();let n=s().get(e);if(n!==void 0&&n.version>=r.version)return;s().set(e,{version:r.version,issuedAt:(r.issued_at??"").slice(0,64),recordedAt:i}),await F()}
function m(){let e=Xr();return e.publishedCatalogFloorRead??=p().then(g),e.publishedCatalogFloorRead}
function g(e){if(e===void 0)return;for(let[r,i]of e){let n=s().get(r);if(n===void 0||i.version>n.version)s().set(r,i)}}
async function p(){let e;try{e=await Bt().readRange(c(),0,a+1)}catch(i){if(!W(i))t(`[publishedCatalog] floor file read failed: ${E(i)??"unknown"}; no persisted version marks this session`);return}let r=e.length>a?void 0:v().safeParse(gt(e.toString("utf8"),!1));if(!r?.success){t(`[publishedCatalog] floor file ${r===void 0?"oversized":"invalid"}; no persisted version marks this session`);return}return new Map(Object.entries(r.data.sources))}
function F(){let e=Xr(),r=(e.publishedCatalogFloorWrite??Promise.resolve()).then(d,d);return e.publishedCatalogFloorWrite=r,r}
async function d(){try{g(await p());let e=[...s().entries()].sort(([,i],[,n])=>n.recordedAt-i.recordedAt).slice(0,h),r=Bt();await r.mkdir(ZP()),await r.atomicWrite(c(),_({version:l,sources:Object.fromEntries(e)}),384)}catch(e){t(`[publishedCatalog] floor file write failed: ${E(e)??"unknown"}`)}}
return {aen,Yst,kEr};
}
export function createOfficialClientDataUrl287({Xr,rt,a,t,d,f,gt,He,n$,on,dPt,TEr,ien,Kst,aen,Yst,Fn,o,C,se,T,u,de,x,L}){
function Hn(e){return e.replace(/[\p{Cc}\p{Cf}\u2028\u2029]+/gu," ")}
var R="claude-code-client-data-v1\x00";
var y=/^\/[A-Za-z0-9_./-]{1,300}$/;
function v(e){return`${R}${e}\x00`}
var k=1;
var P=f(()=>u({schema_version:x(k),version:C().int().nonnegative(),configs:T(u({model_pattern:o().min(1).max(200),client_data:de(o(),se())}).loose()).max(50)}).loose());
function w(e){let n=gt(Buffer.from(e).toString("utf8"),!1);if(n===null||typeof n!=="object"||!("schema_version"in n))return{ok:!1,reason:"parse_failed"};if(n.schema_version!==k)return{ok:!1,reason:typeof n.schema_version==="number"?"unsupported_schema":"parse_failed"};let r=P().safeParse(n);if(!r.success)return{ok:!1,reason:"parse_failed"};let i=[];for(let c of r.data.configs)try{i.push({pattern:new RegExp(c.model_pattern),clientData:c.client_data})}catch{return{ok:!1,reason:"parse_failed"}}return{ok:!0,document:{version:r.data.version,entries:i}}}
function l(e,n){return e.entries.find((r)=>r.pattern.test(n))?.clientData??null}
function m(e){return`Error: --client-data-url: ${e}. Claude Code does not start without the configuration it was given; to start without it, remove the flag, or remove CLAUDE_CODE_CLIENT_DATA_URL from your environment or settings.`}
function _(e,n){switch(e){case"invalid_url":return"the URL must be the https://downloads.claude.ai/ address Anthropic gave you, exactly as given";case"remote_session":return"it cannot be used in a cloud, remote-environment or ssh session, which runs Claude Code on another machine";case"third_party_provider":return"it only works when Claude Code talks to the Anthropic API directly, not through a cloud provider such as Bedrock, Vertex or Foundry, or a cloud gateway";case"policy_denied":return"your organization's policy does not allow it";case"not_found":return"there is nothing at that URL; it may have been withdrawn, so ask Anthropic for a new one";case"http_status":case"timeout":case"network":case"read_failed":return`Claude Code could not fetch the document from downloads.claude.ai (${e==="http_status"?`HTTP ${n??"error"}`:e}); check that your network or proxy allows https://downloads.claude.ai`;case"too_large":return"the server returned something too large to be a configuration document; try again, and if it keeps happening ask Anthropic";case"unsigned":case"sidecar_invalid":case"bad_signature":case"parse_failed":return`the document or its signature is not valid (${e}); ask Anthropic for a new URL`;case"unknown_key":case"key_unusable":case"unsupported_schema":return`this version of Claude Code cannot read the document (${e}); update Claude Code`;case"replayed_version":return"the server returned an older document than one already accepted on this machine; a proxy on your network may be serving an old copy; if not, ask Anthropic for a new URL";case"exception":return"Claude Code hit an internal error loading it; run with --debug for details"}}
function A(e,n){if(l(e,n)!==null)return;let r=U(e);return r===""?"the document covers no models; it has been switched off":`the document covers models matching ${r}, and this session runs ${p(n)}; pass the matching --model`}
function b(e,n){return l(e,n)!==null?`applied to ${p(n)} (document v${e.version})`:`loaded, not applied to ${p(n)}: it covers models matching ${U(e)}`}
function U(e){return p(e.entries.map((n)=>n.pattern.source).join(", "))}
function p(e){return Hn(L(e))}
function S(){let e=a.CLAUDE_CODE_CLIENT_DATA_URL?.trim();if(!e)return{kind:"unset"};let n;try{n=new URL(e)}catch{return{kind:"invalid_url"}}if(n.protocol!=="https:"||n.username!==""||n.password!==""||n.port!==""||!n$(n.hostname)||/[?#]/.test(e)||!y.test(n.pathname))return{kind:"invalid_url"};return{kind:"ok",source:{url:n.toString(),signingContext:v(n.pathname),cacheKey:TEr(n.pathname),roots:dPt}}}
function h(){return Xr().clientDataUrl}
async function Ebo({runsOnAnotherMachine:e=!1}={}){try{let n=S();if(n.kind==="unset")return;let r=await E(n,e);if("failure"in r)return m(_(r.failure,r.httpStatus));h().document=r.document,t(`[clientDataUrl] loaded document v${r.document.version} covering ${r.document.entries.length} model pattern(s)`);return}catch(n){return d(n),m(_("exception"))}}
function vbo(){let{document:e}=h();if(e===void 0)return;let n=A(e,Fn(rt()));return n===void 0?void 0:m(n)}
function Cbo(e,n){let{document:r}=h();if(r===void 0)return e;let i=l(r,Fn(n??rt()));return i===null?e:{...e,...i}}
function Abo(){let{document:e}=h();return e===void 0?void 0:b(e,Fn(rt()))}
async function E(e,n){if(e.kind==="invalid_url")return{failure:"invalid_url"};if(n)return{failure:"remote_session"};if(He()!=="firstParty")return{failure:"third_party_provider"};if(!on("allow_model_catalog"))return{failure:"policy_denied"};let{source:r}=e,i=await ien({kind:"hosted",url:r.url,trust:{kind:"compiled_roots",roots:r.roots},cacheKey:r.cacheKey},{noCache:!0});if(i.status!=="ok"){let{httpStatus:s}=i;if(s===404||s===410)return{failure:"not_found"};return{failure:i.status==="error"?i.reason:"http_status",httpStatus:s}}if(!i.hasSidecar){let{sidecarHttpStatus:s}=i;if(s===void 0||s===404||s===410)return{failure:"unsigned"};return s>=200&&s<300?{failure:"too_large"}:{failure:"http_status",httpStatus:s}}let c=await Kst({documentBytes:i.documentBytes,sidecar:i.sidecar,roots:r.roots,context:r.signingContext});if(!c.ok)return{failure:c.reason};let g=w(i.documentBytes);if(!g.ok)return{failure:g.reason};let{document:D}=g;if(D.version<await aen(r.cacheKey))return{failure:"replayed_version"};return await Yst(r.cacheKey,D),{document:D}}
return {Ebo,vbo,Cbo,Abo,S,w,E};
}
