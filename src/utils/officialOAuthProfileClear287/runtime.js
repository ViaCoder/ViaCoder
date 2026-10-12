// Exact original 287 profile cleanup declarations; all I/O/state ports are explicit.
export function createOAuthProfileClear287(ports){
const errors=(()=>{
class P extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
function l(n){return n instanceof Error?n.message:String(n)}
function E(n){if(n&&typeof n==="object"&&"code"in n&&typeof n.code==="string")return n.code;return}
var u=new Set(["ENOENT","EACCES","EPERM","ENOTDIR","ELOOP","ENAMETOOLONG","EROFS"]);
function Mt(n){return RA(E(n))}
function RA(n){return n!==void 0&&u.has(n)}
return {E,l,Mt,P};
})();
const E=errors.E;
const l=errors.l;
const Mt=errors.Mt;
const P=errors.P;
const _=ports.join;
const H=ports.unlink;
const O=ports.readFile;
const XD=ports.configDir;
const a=ports.environment;
const lwe=ports.defaultProfile;
const gJn=ports.reset;
const t=ports.debug;
const f=ports.schemaLazy;
const pt=ports.looseObject;
const o=ports.string;
const J=ports.parse;
const iVr=(()=>{const j=ports.lockDirectory;
const ae=ports.dirname;
function iVr(e,n){return j(ae(e),n,"fail-closed")}
return iVr;})();
var Aot="41077d10-94b8-4194-be48-d251e9eb21b4";
var K=/^[A-Za-z0-9_.-]+$/;
var A={created_by:"claude-code"};
var B=f(()=>pt({created_by:o().optional(),base_url:o().optional(),authentication:pt({type:o(),client_id:o().optional(),credentials_path:o().optional()})}));
var z=f(()=>pt({created_by:o().optional()}));
async function b({revoke:e}={}){try{let r=XD();if(r===null)return{removed:!1};let n;try{n=S(r)}catch{return{removed:!1}}let s=await k(_(r,"configs",`${n}.json`));if(s===null||!D(s))return{removed:!1};if(await I(v(r,n))===null)return{removed:!1};return await iVr(v(r,n),()=>V(e))}catch(r){if(E(r)==="ENOENT")return{removed:!1};return t(`Logout: profile credential removal failed: ${l(r)}`,{level:"error"}),{removed:!1}}}
async function V(e){let r=XD();if(r===null)return{removed:!1};let n;try{n=S(r)}catch{return{removed:!1}}let s=await k(_(r,"configs",`${n}.json`));if(s===null||!D(s))return{removed:!1};let c=v(r,n),u=await I(c);if(u===null)return{removed:!1};let h={refreshToken:u.refreshToken,clientId:Aot};if(e&&h.refreshToken)await e({refreshToken:h.refreshToken,clientId:h.clientId});try{await H(c)}catch(g){return t(`Logout: could not remove profile credentials: ${l(g)}`,{level:"error"}),{removed:!1,...h}}return t(`Logout: removed credentials for profile ${n}`),gJn(),{removed:!0,...h}}
function S(e){let r=a.ANTHROPIC_PROFILE||lwe(e);if(!L(r))throw new P(`ANTHROPIC_PROFILE "${r}" is not a valid profile name (letters, digits, '_', '.', '-')`,"ANTHROPIC_PROFILE is not a valid profile name","invalid_profile_name");return r}
function L(e){return!!e&&K.test(e)&&e!=="."&&e!==".."}
function v(e,r){return _(e,"credentials",`${r}.json`)}
async function k(e){let r;try{r=await O(e,"utf-8")}catch(c){if(E(c)==="ENOENT")return null;if(Mt(c))return{authentication:{type:"unreadable"}};throw c}let n;try{n=J(r)}catch(c){return t(`Profile config is not JSON, treating as foreign: ${l(c)}`),{authentication:{type:"unreadable"}}}let s=B().safeParse(n);return s.success?s.data:{authentication:{type:"unreadable"}}}
function D(e){return e.created_by===A.created_by&&e.authentication.type==="user_oauth"&&e.authentication.client_id===Aot}
async function I(e){let r;try{r=await O(e,"utf-8")}catch(u){if(Mt(u))return null;throw u}let n;try{n=J(r)}catch{return null}let s=z().safeParse(n);if(!s.success||s.data.created_by!==A.created_by)return null;let c=s.data.refresh_token;return{refreshToken:typeof c==="string"?c:void 0}}
return {clear:b};
}
