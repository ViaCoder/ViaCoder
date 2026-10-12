// Exact bootstrap installer and cache maintenance; existing owners are mandatory.
export function createOfficialBootstrapHooks287({He,a,d,v,oe,Cbo}){
function WKr(e){oe().setClientDataReadGate(e)}
function GKr(e){oe().setClientDataStrictReadGate(e)}
function zKr(e){oe().setClientDataOverride(e)}
function qKr(e){oe().setClientDataStaleMatchGetter(e)}
function R(){let e=He();return e==="firstParty"||e==="anthropicAws"&&a.ANTHROPIC_AWS_BASE_URL===void 0}
function $Nn(){try{WKr(()=>{try{return R()}catch(e){return d(e),!0}}),GKr(()=>{try{return R()}catch(e){return d(e),!1}}),zKr((e,n)=>{try{return Cbo(e,n)}catch(s){return d(s),e}}),qKr(()=>{try{if(!R())return null;let e=v();return{entrypoint:e.entrypoint??null,model:e.model,org:e.organizationUuid}}catch(e){return d(e),null}})}catch(e){d(e)}}
return $Nn;
}
export function createOfficialBootstrapCacheMaintenance287({Xr}){
var Kjt=600000;
function oqr(){let e=Xr().providerCache.overturnedEntitlementDenies,n=Date.now();for(let[r,s]of e)if(n-s>=Kjt)e.delete(r)}
function Qr(){return{allModelBetas:new Map,modelBetas:new Map,bedrockExtraBodyParamsBetas:new Map,midConversationSystem:new Map}}
function Ej(){let e=Xr();e.betas=Qr(),e.betasCompiledOnly=Qr()}
return {Ej,oqr};
}
export function createOfficialBootstrapClientDataOverride287({Xr,Fn,rt}){
function l(e,n){return e.entries.find((r)=>r.pattern.test(n))?.clientData??null}
function h(){return Xr().clientDataUrl}
function Cbo(e,n){let{document:r}=h();if(r===void 0)return e;let i=l(r,Fn(n??rt()));return i===null?e:{...e,...i}}
return Cbo;
}
export function createOfficialBootstrapSlotHelpers287({c0}){
var kc="bi1-";
var f0=12;
var cKo=86400000;
function VZn(e){let n=JSON.stringify([e.entrypoint??null,e.model,e.ccVersion,e.organizationUuid]),r=c0("sha256").update(n).digest("hex");return kc+r.slice(0,16)}
function F_t(e){return typeof e==="object"&&e!==null&&"data"in e&&"at"in e&&typeof e.at==="number"}
function dKo(e,n,r){let s=typeof e==="object"&&e!==null?Object.entries(e).filter((g)=>g[0]!==n&&g[0].startsWith(kc)&&F_t(g[1])).sort(([,g],[,h])=>h.at-g.at).slice(0,f0-1):[];return Object.fromEntries([[n,r],...s])}
function Pu(n,e){if(e?.(n))return!0;if(!n||typeof n!=="object"||!("isAxiosError"in n)||!n.isAxiosError)return!1;let t=n.response?.status;return t===void 0||t===401||t===403||t===429}
return {VZn,F_t,dKo,cKo,Pu};
}
