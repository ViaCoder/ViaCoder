// Exact 2.1.286 lexical closures; source imports and helpers are bound in provenance.
export function createApiKeyCreate286({Pa,Po,Vd,XXe,_,cn,d2o,f,ht,i,m,o,ou,re,u,x,y}){
var uK=f(()=>u({error:u({message:o(),details:u({error_visibility:x("user_facing")})})}));
function jRe(e){if(!ou(e))return null;let n=uK().safeParse(e.response?.data);return n.success?n.data.error.message:null}
var dK=f(()=>u({error:u({type:x("permission_error"),message:o().min(1),details:u({error_code:x("verification_required")})})}));
function Jgn(e,n){if(e!==403)return;let r=dK().safeParse(n);if(!r.success)return;return Qgn(r.data.error.message)}
var Mf=XXe-`${Pa}: `.length;
function Qgn(e){let n=e.replace(/[\p{Cc}\p{Cf}\u0020\u2028\u2029]+/gu," ").trim();if(n==="")return;if(n.length<=Mf)return n;let r=n.lastIndexOf("https://");if(r!==-1){let s=n.indexOf(" ",r),g=n.slice(r,s===-1?void 0:s),h=Mf-g.length-2;if(h>=0)return`${re(n.slice(0,r),h).trimEnd()}\u2026 ${g}`}return`${re(n,Mf-1)}\u2026`}
class wi extends Error{constructor(e,n){super(e,n);this.name="VerificationRequiredError"}}
var rA="The server did not create an API key and gave no readable reason. If this keeps happening, contact support.";
class kl extends Error{constructor(e,n){super(e,n);this.name="KeyMintRefusedError"}}
async function ljr(e,n){try{let r=await ht.post(cn().API_KEY_URL,null,{headers:{Authorization:`Bearer ${e}`,"User-Agent":Po()}}),s=r.data?.raw_key;if(s)return await d2o(s,n),i("tengu_oauth_api_key",{status:_("success"),statusCode:r.status}),y("oauth_create_api_key"),s;return m("oauth_create_api_key","oauth_api_key_empty_response"),null}catch(r){i("tengu_oauth_api_key",{status:_("failure"),...Vd(r)});let s=ht.isAxiosError(r)?Jgn(r.response?.status,r.response?.data):void 0;if(s!==void 0)throw m("oauth_create_api_key","oauth_api_key_verification_required"),new wi(s,{cause:r});let g=jRe(r),h=ht.isAxiosError(r)?r.response?.status:void 0;if(g!==null&&h!==void 0&&h>=400&&h<500)throw m("oauth_create_api_key","oauth_api_key_refused"),new kl(Qgn(g)??rA,{cause:r});throw m("oauth_create_api_key","oauth_api_key_request_failed"),r}}
return ljr;
}
export function createApiKeySaveDarwin286({PUe,QN,Te,_m,an,bGo,c,i,j,l,mi,ok,p7n,q,t,xC}){
function o0(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
var Q0="could not be found in the keychain";
async function _w(){{let e=QN(),n=await xC(`security delete-generic-password -a ${ok()} -s "${e}"`,{reject:!1});if(n.exitCode!==0&&!n.stderr.includes(Q0))throw Error(n.stderr?`Failed to delete keychain entry: ${n.stderr}`:"Failed to delete keychain entry")}}
function ire(e){return e.trim().slice(-20)}
class Pk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var MYo=new q(()=>new Pk);
function Si(){return MYo.of(j().host)}
function WH(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function d2o(e,n){if(!WH(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Mk();let s=!0;if(s){let h=QN(),b=ok(),E=Buffer.from(e,"utf-8").toString("hex"),w=`add-generic-password -U -a "${b}" -s "${h}" -X "${E}"
`,k=await _m("security",["-i"],{input:w,reject:!1,timeout:5000});if(k.exitCode!==0){let A=(k.stderr||k.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(bGo(A)),error_hash:an(PUe(A)),exit_code:k.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${A?` (${A})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=ire(e);await Te((h)=>{let{approved:b,rejected:E}=o0(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:b.includes(g)?b:[...b,g],rejected:E}}},n),r.clear(),p7n()}
async function Mk(){try{await _w()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return d2o;
}
export function createApiKeyErrors286({Pa,XXe,f,o,ou,re,u,x}){
var uK=f(()=>u({error:u({message:o(),details:u({error_visibility:x("user_facing")})})}));
function jRe(e){if(!ou(e))return null;let n=uK().safeParse(e.response?.data);return n.success?n.data.error.message:null}
var dK=f(()=>u({error:u({type:x("permission_error"),message:o().min(1),details:u({error_code:x("verification_required")})})}));
function Jgn(e,n){if(e!==403)return;let r=dK().safeParse(n);if(!r.success)return;return Qgn(r.data.error.message)}
var Mf=XXe-`${Pa}: `.length;
function Qgn(e){let n=e.replace(/[\p{Cc}\p{Cf}\u0020\u2028\u2029]+/gu," ").trim();if(n==="")return;if(n.length<=Mf)return n;let r=n.lastIndexOf("https://");if(r!==-1){let s=n.indexOf(" ",r),g=n.slice(r,s===-1?void 0:s),h=Mf-g.length-2;if(h>=0)return`${re(n.slice(0,r),h).trimEnd()}\u2026 ${g}`}return`${re(n,Mf-1)}\u2026`}
class wi extends Error{constructor(e,n){super(e,n);this.name="VerificationRequiredError"}}
var rA="The server did not create an API key and gave no readable reason. If this keeps happening, contact support.";
class kl extends Error{constructor(e,n){super(e,n);this.name="KeyMintRefusedError"}}
return {Jgn,jRe,VerificationRequiredError:wi,KeyMintRefusedError:kl,keyMintFallback:rA};
}
export function createApiKeyTruncate286(){
function re(t,n){if(n<=0)return"";if(t.length<=n)return t;let e=t.slice(0,n),r=e.charCodeAt(n-1);return f(r>=55296&&r<=56319?e.slice(0,-1):e)}
function f(t){if(typeof Buffer<"u")return Buffer.from(t,"utf16le").toString("utf16le");return x(t)}
function x(t){let e=[];for(let r=0;r<t.length;r+=8192){let i=Math.min(r+8192,t.length),o=new Uint16Array(i-r);for(let u=r;u<i;u++)o[u-r]=t.charCodeAt(u);e.push(String.fromCharCode(...o))}return e.join("")}
return re;
}
export function createApiKeyKeychainErrorClass286(){
function bGo(e){if(!e)return"empty";let n=e.toLowerCase();if(n.includes("errsecduplicateitem")||n.includes("already exists"))return"duplicate_item";if(n.includes("unable to open")||n.includes("could not open"))return"keychain_unavailable";if(n.includes("errsecnodefaultkeychain")||n.includes("default keychain")||n.includes("no keychain"))return"no_keychain";if(n.includes("errsecitemnotfound")||n.includes("item could not be found"))return"item_not_found";if(n.includes("errsecinteractionnotallowed")||n.includes("interaction is not allowed")||n.includes("no user interaction"))return"interaction_not_allowed";if(n.includes("errsecusercanceled")||n.includes("cancel"))return"user_canceled";if(n.includes("errsecauthfailed")||n.includes("authorization")||n.includes("authentication")||n.includes("name or passphrase"))return"auth_failed";if(n.includes("locked")||n.includes("unlock"))return"keychain_locked";return"other"}
return bGo;
}
export function createApiKeySanitizeError286(){
function PUe(e){return e.slice(0,500).replace(/https?:\/\/\S+/gi,"<url>").replace(/\b[\w.+-]+@[\w.-]+\.\w{2,}\b/g,"<email>").replace(/\b(?:sk-ant|sk|pk|ghp|gho|ghs|ghu|github_pat|xox[bpoars])[-_][\w-]{8,}\b/gi,"<key>").replace(/[A-Za-z]:\\[^\s"']*/g,"<path>").replace(/\\\\[^\s"']+/g,"<path>").replace(/(?:[^\s"'\\]+\\){2,}[^\s"']+/g,"<path>").replace(/(?:\/[^\s"':]+){2,}/g,"<path>").replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,"<id>").replace(/\breq_[A-Za-z0-9_-]{12,}/g,"<id>").replace(/\b[0-9a-fA-F]{16,}\b/g,"<id>").replace(/\b[A-Za-z0-9+/]{32,}={0,2}/g,"<b64>").replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g,"<ip>").replace(/\b\d{4,}\b/g,"<num>")}
return PUe;
}
export function createApiKeyHashError286({Sn,e}){
function an(t){return Sn(e("sha256").update(t).digest("hex").slice(0,12))}
return an;
}
export function createApiKeyResponseListSanitizer286(){
function mi(n){if(!Array.isArray(n))return[];return n.every((e)=>typeof e==="string")?n:n.filter((e)=>typeof e==="string")}
return mi;
}
export function createApiKeyCache_darwin_arm64_286(){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;
}
export function createApiKeyCache_darwin_x64_286(){
class K{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return K;
}
export function createApiKeyCache_linux_arm64_286(){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;
}
export function createApiKeyCache_linux_x64_286(){
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return V;
}
export function createApiKeyCache_win32_arm64_286(){
class q{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return q;
}
export function createApiKeyCache_win32_x64_286(){
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}}
return V;
}
export function createApiKeySave_darwin_arm64_286({PUe,QN,Te,_m,an,bGo,c,i,j,l,mi,ok,p7n,q,t,xC}){
function o0(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
var Q0="could not be found in the keychain";
async function _w(){{let e=QN(),n=await xC(`security delete-generic-password -a ${ok()} -s "${e}"`,{reject:!1});if(n.exitCode!==0&&!n.stderr.includes(Q0))throw Error(n.stderr?`Failed to delete keychain entry: ${n.stderr}`:"Failed to delete keychain entry")}}
function ire(e){return e.trim().slice(-20)}
class Pk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var MYo=new q(()=>new Pk);
function Si(){return MYo.of(j().host)}
function WH(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function d2o(e,n){if(!WH(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Mk();let s=!0;if(s){let h=QN(),b=ok(),E=Buffer.from(e,"utf-8").toString("hex"),w=`add-generic-password -U -a "${b}" -s "${h}" -X "${E}"
`,k=await _m("security",["-i"],{input:w,reject:!1,timeout:5000});if(k.exitCode!==0){let A=(k.stderr||k.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(bGo(A)),error_hash:an(PUe(A)),exit_code:k.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${A?` (${A})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=ire(e);await Te((h)=>{let{approved:b,rejected:E}=o0(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:b.includes(g)?b:[...b,g],rejected:E}}},n),r.clear(),p7n()}
async function Mk(){try{await _w()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return d2o;
}
export function createApiKeySave_darwin_x64_286({HUe,K,QN,_m,an,bGo,c,i,j,ke,l,mi,oT,p7n,t,xA}){
function oP(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
var K0="could not be found in the keychain";
async function _w(){{let e=QN(),n=await xA(`security delete-generic-password -a ${oT()} -s "${e}"`,{reject:!1});if(n.exitCode!==0&&!n.stderr.includes(K0))throw Error(n.stderr?`Failed to delete keychain entry: ${n.stderr}`:"Failed to delete keychain entry")}}
function ire(e){return e.trim().slice(-20)}
class Ak{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var MYo=new K(()=>new Ak);
function Si(){return MYo.of(j().host)}
function zH(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function d2o(e,n){if(!zH(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Ck();let s=!0;if(s){let h=QN(),b=oT(),E=Buffer.from(e,"utf-8").toString("hex"),w=`add-generic-password -U -a "${b}" -s "${h}" -X "${E}"
`,C=await _m("security",["-i"],{input:w,reject:!1,timeout:5000});if(C.exitCode!==0){let T=(C.stderr||C.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(bGo(T)),error_hash:an(HUe(T)),exit_code:C.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${T?` (${T})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=ire(e);await ke((h)=>{let{approved:b,rejected:E}=oP(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:b.includes(g)?b:[...b,g],rejected:E}}},n),r.clear(),p7n()}
async function Ck(){try{await _w()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return d2o;
}
export function createApiKeySave_linux_arm64_286({I7n,J1e,MY,Nqo,Re,THe,an,c,i,j,l,mi,q,rg,t}){
function ZO(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
async function ww(){}
function Qne(e){return e.trim().slice(-20)}
class Dk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var Q9o=new q(()=>new Dk);
function Si(){return Q9o.of(j().host)}
function rK(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function C1o(e,n){if(!rK(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Ik();let s=!1;if(s){let h=J1e(),v=MY(),S=Buffer.from(e,"utf-8").toString("hex"),E=`add-generic-password -U -a "${v}" -s "${h}" -X "${S}"
`,w=await rg("security",["-i"],{input:E,reject:!1,timeout:5000});if(w.exitCode!==0){let C=(w.stderr||w.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(Nqo(C)),error_hash:an(THe(C)),exit_code:w.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${C?` (${C})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=Qne(e);await Re((h)=>{let{approved:v,rejected:S}=ZO(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:v.includes(g)?v:[...v,g],rejected:S}}},n),r.clear(),I7n()}
async function Ik(){try{await ww()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return C1o;
}
export function createApiKeySave_linux_x64_286({Ae,DVo,J1e,MY,O7n,V,an,c,i,j,kBe,l,mi,rg,t}){
function ZP(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
async function vw(){}
function Qne(e){return e.trim().slice(-20)}
class Uk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var Q8o=new V(()=>new Uk);
function Si(){return Q8o.of(j().host)}
function rK(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function C1o(e,n){if(!rK(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Bk();let s=!1;if(s){let h=J1e(),v=MY(),S=Buffer.from(e,"utf-8").toString("hex"),w=`add-generic-password -U -a "${v}" -s "${h}" -X "${S}"
`,C=await rg("security",["-i"],{input:w,reject:!1,timeout:5000});if(C.exitCode!==0){let T=(C.stderr||C.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(DVo(T)),error_hash:an(kBe(T)),exit_code:C.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${T?` (${T})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=Qne(e);await Ae((h)=>{let{approved:v,rejected:S}=ZP(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:v.includes(g)?v:[...v,g],rejected:S}}},n),r.clear(),O7n()}
async function Bk(){try{await vw()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return C1o;
}
export function createApiKeySave_win32_arm64_286({Ce,G7,IJn,LGo,THe,XF,an,c,i,j,l,mi,ng,q,t}){
function eO(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
async function Aw(){}
function nre(e){return e.trim().slice(-20)}
class Lk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var t9o=new q(()=>new Lk);
function Si(){return t9o.of(j().host)}
function iK(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function I1o(e,n){if(!iK(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Uk();let s=!1;if(s){let h=G7(),v=XF(),S=Buffer.from(e,"utf-8").toString("hex"),w=`add-generic-password -U -a "${v}" -s "${h}" -X "${S}"
`,T=await ng("security",["-i"],{input:w,reject:!1,timeout:5000});if(T.exitCode!==0){let R=(T.stderr||T.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(LGo(R)),error_hash:an(THe(R)),exit_code:T.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${R?` (${R})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=nre(e);await Ce((h)=>{let{approved:v,rejected:S}=eO(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:v.includes(g)?v:[...v,g],rejected:S}}},n),r.clear(),IJn()}
async function Uk(){try{await Aw()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return I1o;
}
export function createApiKeySave_win32_x64_286({Ce,G7,IJn,NGo,TBe,V,XH,an,c,i,j,l,mi,ng,t}){
function eO(e){let n=e.customApiKeyResponses;return{approved:mi(n?.approved),rejected:mi(n?.rejected)}}
async function gw(){}
function nre(e){return e.trim().slice(-20)}
class Lk{value=void 0;promise=null;clear(){this.value=void 0,this.promise=null}}
var t9o=new V(()=>new Lk);
function Si(){return t9o.of(j().host)}
function sK(e){return/^[a-zA-Z0-9-_]+$/.test(e)}
async function I1o(e,n){if(!sK(e))throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");let r=Si();await Uk();let s=!1;if(s){let h=G7(),v=XH(),S=Buffer.from(e,"utf-8").toString("hex"),w=`add-generic-password -U -a "${v}" -s "${h}" -X "${S}"
`,T=await ng("security",["-i"],{input:w,reject:!1,timeout:5000});if(T.exitCode!==0){let R=(T.stderr||T.stdout||"").trim().replace(/\s*\n\s*/g,"; ");throw i("tengu_api_key_keychain_error",{error_class:c(NGo(R)),error_hash:an(TBe(R)),exit_code:T.exitCode??-1}),Error(`Failed to save API key to macOS Keychain${R?` (${R})`:""}. Run \`claude doctor\` to diagnose keychain access.`)}i("tengu_api_key_saved_to_keychain",{})}else i("tengu_api_key_saved_to_config",{});let g=nre(e);await Ce((h)=>{let{approved:v,rejected:S}=eO(h);return{...h,primaryApiKey:s?h.primaryApiKey:e,customApiKeyResponses:{approved:v.includes(g)?v:[...v,g],rejected:S}}},n),r.clear(),IJn()}
async function Uk(){try{await gw()}catch(e){t(`Failed to remove API key from macOS keychain: ${l(e)}`,{level:"error"})}}
return I1o;
}
