// Complete source closure emitted from pinned official 2.1.287 chunk-5rsp1jx3.js#WC.
class i{resetters=[];built=[];lazy(e){let t,r=()=>{t=void 0};return this.resetters.push(r),()=>{if(t===void 0)t=e(),this.built.push(r);return t}}builtCount(){return this.built.length}releaseBuiltSince(e){for(let t of this.built.splice(e))t()}reset(){for(let e of this.resetters)e();this.built.length=0}}var _rr=new i;function f(e){return _rr.lazy(e)}
export function createOfficialEffortWc287Helpers287(imports){
const Be=imports.Be,le=imports.le;
function Ct(e){return e.replace(/\[1m\]$/i,"")}
function Jm(e){return Ct(Be(e,{identity:!0}))}
function V0(e){return e.replace(/\[1m\]/gi,"")}
function Z(n){return n instanceof Error?n:Error(String(n))}
function Ape(){let e=le().modelAccessCache;return(Array.isArray(e)?e:[]).filter((n)=>n!=null&&typeof n==="object"&&typeof n.apiName==="string"&&typeof n.entitled==="boolean")}
return {Ct,Jm,V0,Z,Ape};
}
export function createOfficialEffortWc287Ny287(imports){
let p;
const zQe=imports.zQe,xa=imports.xa;
function O(){return{bakedCatalog:void 0,canonicalNameMemo:new Map,mainLoopCanonical:void 0,servedCapabilityLookup:void 0,featureGateLookup:void 0,modelKnowledge:void 0}}
function cL(){if(p===void 0)p=O();return p}
var N={per_turn_effort:"tengu_per_turn_effort"};
function S(e){let t=N[e];if(t===void 0)return!0;return cL().featureGateLookup?.(t)===!0}
function ny(e,t,n){return zQe(t,e)??bzt(e,t,n)}
function bzt(e,t,n){if(cL().servedCapabilityLookup?.(t,[n,m(e)])===!0&&S(t))return!0;return L8r(e,t)?!0:void 0}
function L8r(e,t){return xa(m(e))?.capabilities.includes(t)}
function m(e){return e.replace(/\[1m\]/gi,"")}
p={...O(),servedCapabilityLookup:imports.servedCapabilityLookup,featureGateLookup:imports.featureGateLookup};
return ny;
}
export function createOfficialEffortResolver287(ports){
  const Ape=ports.Ape;
  const Be=ports.Be;
  const Ct=ports.Ct;
  const Dbe=ports.Dbe;
  const He=ports.He;
  const JU=ports.JU;
  const Jm=ports.Jm;
  const Kc=ports.Kc;
  const Rt=ports.Rt;
  const UVo=ports.UVo;
  const V0=ports.V0;
  const Xo=ports.Xo;
  const Z=ports.Z;
  const Z7e=ports.Z7e;
  const a=ports.a;
  const bkn=ports.bkn;
  const bu=ports.bu;
  const cQn=ports.cQn;
  const cc=ports.cc;
  const d=ports.d;
  const de=ports.de;
  const ge=ports.ge;
  const gt=ports.gt;
  const k=ports.k;
  const nu=ports.nu;
  const ny=ports.ny;
  const o=ports.o;
  const se=ports.se;
  const xa=ports.xa;
  const zF=ports.zF;
  const zQe=ports.zQe;
function jw(e){if(bkn(e))return!1;let n=Dbe(e,"effort");if(n!==void 0)return n;let r=Be(e),s=zQe("effort",r);if(s!==void 0)return s;let u=cQn(e,r);if(u!==void 0)return u.length>0;if(r.includes("claude-3-")||r==="claude-opus-4-0"||r==="claude-opus-4-1"||r==="claude-sonnet-4-0"||r==="claude-sonnet-4-5"||r==="claude-haiku-4-5")return!1;if(a.CLAUDE_CODE_ALWAYS_ENABLE_EFFORT)return!0;if(ny(r,"effort",e)||r==="claude-mythos-5")return!0;return zF(cc(e))}
var fe="tengu_loggia_passage";
function O(){return k(fe,!1)}
function A(e,n){return Jm(Rt(e))===Jm(Rt(n))}
function F(e){let n=JU(),r=Kc();if(n?.carriedEffort===void 0||r==null||O())return;try{return A(r,n.fallbackModel)&&A(e,n.fallbackModel)?n.carriedEffort:void 0}catch(s){d(Z(s));return}}
function qSe(e){return Ct(Be(Rt(e),{deterministic:!0,identity:!0}))}
function b(e){return nu.indexOf(e)}
function K(e){let n=[...bu(),...Xo().map((u)=>ge(u))],r=n.some((u)=>Object.values(u?.modelSettings??{}).some((l)=>l?.maxEffortLevel!==void 0))?qSe(e):void 0,s=null;for(let u of n){if(!u)continue;let l;if(r!==void 0)for(let[p,E]of Object.entries(u.modelSettings??{})){let g=E?.maxEffortLevel;if(g!==void 0&&(l===void 0||b(g)<b(l))&&qSe(p)===r)l=g}if(l??=u.maxEffortLevel,l!==void 0&&l!=="max"&&(s===null||b(l)<b(s)))s=l}return s}
function $v(e){return nu.includes(e)}
function aF(e){if(typeof e==="string")return $v(e)?e:"high";return"high"}
function S2t(e){let n=K(e),r=null,s=He();if(s==="firstParty"||s==="gateway"){let l=Be(V0(e.trim().toLowerCase()),{identity:!0}),p=Ape().find((E)=>Be(V0(E.apiName.trim().toLowerCase()),{identity:!0})===l)?.maxEffortLevel;r=p!=null&&$v(p)?p:null}let u=r===null?n:n===null?r:b(n)<b(r)?n:r;return u==="max"?null:u}
function b3(e,n){let r=S2t(n);return r!==null&&b(e)>b(r)?r:e}
function J(e,n,r){if(zQe("effort",r)===!1)return!1;let s=zQe(e,r);if(s===void 0)return;return s&&jw(n)}
function pQ(e){if(bkn(e))return!1;let n=Dbe(e,"max_effort");if(n!==void 0)return n;let r=Be(e),s=J("max_effort",e,r);if(s!==void 0)return s;let u=cQn(e,r);if(u!==void 0)return u.includes("max");if(r.includes("claude-3-")||r==="claude-opus-4-0"||r==="claude-opus-4-1"||r==="claude-opus-4-5"||r==="claude-sonnet-4-0"||r==="claude-sonnet-4-5"||r==="claude-haiku-4-5")return!1;if(ny(r,"max_effort",e)||r==="claude-mythos-5")return!0;return zF(cc(e))}
function xXe(e){if(bkn(e))return!1;let n=Dbe(e,"xhigh_effort");if(n!==void 0)return n;let r=Be(e),s=J("xhigh_effort",e,r);if(s!==void 0)return s;let u=cQn(e,r);if(u!==void 0)return u.includes("xhigh");if(r.includes("claude-3-")||r==="claude-opus-4-0"||r==="claude-opus-4-1"||r==="claude-opus-4-5"||r==="claude-opus-4-6"||r==="claude-sonnet-4-0"||r==="claude-sonnet-4-5"||r==="claude-sonnet-4-6"||r==="claude-haiku-4-5")return!1;if(ny(r,"xhigh_effort",e)||r==="claude-mythos-5")return!0;return zF(cc(e))}
function T(e,n){let r=e;if(typeof r==="string"&&$v(r))r=b3(r,n);if(r==="max"&&!pQ(n))r="high";if(r==="xhigh"&&!xXe(n))r="high";return r}
function G(e){return Number.isInteger(e)}
var z={med:"medium"};
function iF(e){if(e===void 0||e===null||e==="")return;if(typeof e==="number"&&G(e))return e;let n=String(e).toLowerCase(),r=z[n]??n;if($v(r))return r;let s=parseInt(n,10);if(!isNaN(s)&&G(s))return s;return}
function $9(){let e=a.CLAUDE_CODE_EFFORT_LEVEL;return e?.toLowerCase()==="unset"||e?.toLowerCase()==="auto"?null:iF(e)}
function Kxe(e){if(He()!=="firstParty")return null;let n=Z7e();if(n===null)return null;let r=n.default_effort_level;if(r==null||!$v(r))return null;let s=Be(V0(e.trim().toLowerCase()),{identity:!0});return Be(V0(n.name.trim().toLowerCase()),{identity:!0})===s?r:null}
var xe="tengu_witty_wand";
var Ce=f(()=>de(o(),se()));
function te(e){let n=k(xe,{});if(typeof n==="string")n=gt(n,!1);let r=Ce().safeParse(n);if(!r.success)return;let s=r.data[Ct(Be(e))],u=typeof s==="string"?s.trim().toLowerCase():void 0;return u!==void 0&&$v(u)?u:void 0}
function Pe(e){let n=UVo(e,Be(e));return n!==void 0&&$v(n)?n:void 0}
function we(e){return xa(Be(e))?.default_effort??"high"}
function l_n(e,n){return Kxe(e)??te(e)??n??Pe(e)??we(e)}
function jb(e,n,{turnEffort:r,hookEffortValue:s,carriedEffort:u=F(e)}={}){if(!jw(e))return;let l=K(e)!==null;if(s!==void 0){let S=typeof s==="number"&&l?aF(s):s;return T(S,e)}let p=$9();if(p===null&&!l)return;let E=l_n(e,u),g=p??(p===null?E:void 0)??r??n??E;if(typeof g==="number"&&l)g=aF(g);return T(g,e)}
function KA(e,n,r){let s=jb(e,n,{turnEffort:r})??"high";return aF(s)}
function WC(e,n,r){return jw(e)?KA(e,n,r):void 0}
return {resolve:WC,hookLevel:KA,supports:jw,requestLevel:jb};
}
export function createOfficialEffortWc287(ports){return createOfficialEffortResolver287(ports).resolve}
