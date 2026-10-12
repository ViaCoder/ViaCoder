// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryNames287(ports){
const {Fn,Qfe,S,bn,yN}=ports;
function NPe(e){return e.includes("application-inference-profile")&&typeof Qfe(Fn(e))!=="string"};
function vqr(e){let n=e.indexOf(":");return n>0?e.slice(0,n):void 0};
function YPe(e){if(e?.startsWith("agent:custom:"))return"agent:custom";return e};
var $O=/^[A-Za-z0-9._:[\]-]{1,100}$/;
var GO=/^[A-Za-z0-9._:[\]-]{1,91}@\d{8}(\[\d{1,3}[mM]\])?$/;
function Et(e){if(e==null)return;return $O.test(e)||GO.test(e)?bn(e):S("nonconforming")};
var bN="claude-plugin-telemetry-v1";
function Gbe(e){return yN("sha256").update(e+bN).digest("hex").slice(0,16)};
function rs(e){return bn(YPe(e)??"")};
return {Gbe,vqr,rs,Et,NPe};
}
