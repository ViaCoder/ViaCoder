// Verbatim official 2.1.287 canonical-name closure, using the original compiled catalog data.
export function createModelCanonical287(Vtr){
var QZ=["us","eu","apac","jp","au","us-gov","global"];
var p;
function O(){return{bakedCatalog:void 0,canonicalNameMemo:new Map,mainLoopCanonical:void 0,servedCapabilityLookup:void 0,featureGateLookup:void 0,modelKnowledge:void 0}}
function cL(){if(p===void 0)p=O();return p}
function R(e){let t=new Map,n=new Map;for(let r of e.models){t.set(r.id,r);for(let s of Object.values(r.provider_ids)){if(typeof s!=="string")continue;let _=s.toLowerCase(),l=n.get(_);if(l!==void 0&&l!==r.id)throw Error("model catalog: provider id collision across distinct entries");n.set(_,r.id)}}return{catalog:e,entriesById:t,catalogIdByProviderId:n}}
function g(){let e=cL();if(e.bakedCatalog===void 0)e.bakedCatalog=R(Vtr);return e.bakedCatalog}
function vwe(){return g().catalog}
function gse(e){return g().catalogIdByProviderId.get(e.toLowerCase())}
function xa(e){return g().entriesById.get(e)}
function u(e){let n=/^claude-([a-z]+)-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?/.exec(e);if(n){let[t,r="",o="",i]=n;return{family:r,major:Number(o),minor:i===void 0?void 0:Number(i),legacyVersionFirst:!1,base:t}}let s=/^claude-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?-([a-z]+)/.exec(e);if(s){let[t,r="",o,i=""]=s;return{family:i,major:Number(r),minor:o===void 0?void 0:Number(o),legacyVersionFirst:!0,base:t}}return null}
function $8r(e){return/^(?:-fast|-latest)?(?:-v\d{1,3}@\d{8}|[-@]\d{8})?(?:-v\d{1,3}(?::\d{1,3})?)?$/.test(e)}
function wu(e){let n=e.trim().toLowerCase();if(n===""||/\s/.test(n))return null;n=n.replace(/\[[12]m\]$/,"");let s=n.lastIndexOf("/");if(s!==-1)n=n.slice(s+1);let t=/^(?:([a-z-]+)\.)?anthropic\.(claude-.*)$/.exec(n);if(t){let[,a,l=""]=t;if(a!==void 0&&!QZ.includes(a))return null;n=l}let r=u(n);if(!r)return null;let o=n.slice(r.base.length);if(o!==""&&!/^[-@]/.test(o))return null;let i={family:r.family,major:r.major,legacyVersionFirst:r.legacyVersionFirst,base:r.base};if(r.minor!==void 0)i.minor=r.minor;if(!$8r(o))i.trailer=o;else{let a=/(?:-v\d+@|[-@])(\d{8})/.exec(o)?.[1];if(a!==void 0)i.date=a}return i}
function qj(e){return e!==null&&e.trailer===void 0}
function u0e(e,n){return e.major-n.major||(e.minor??0)-(n.minor??0)}
function qQe(e,n){return e.family===n.family&&e.legacyVersionFirst===n.legacyVersionFirst&&u0e(e,n)===0}
function Ct(e){return e.replace(/\[1m\]$/i,"")}
var MSt="claude-mythos-preview";
function $b(){return["claude-3-opus","claude-3-sonnet","claude-3-haiku"]}
function Ab(e){return e.replace(/-\d{8}$/,"")}
function xI(e){let n=[...vwe().models.map((r)=>r.id),...$b()];for(let r of n){let s=wu(r);if(qj(s)&&qQe(s,e))return r}return}
function OI(e){let n=gse(e);if(n!==void 0)return n;for(let s of QZ)if(s!=="us"&&e.startsWith(`${s}.anthropic.`)){let g=gse(`us${e.slice(s.length)}`);if(g!==void 0)return g;break}let r=wu(e);if(qj(r))return xI(r)??Ab(r.base);if(e.includes("claude-fable-5-1"))return"claude-fable-5-1";if(e.includes("claude-fable-5"))return"claude-fable-5";if(e.includes("claude-mythos-5-1"))return"claude-mythos-5-1";if(e.includes("claude-mythos-5"))return"claude-mythos-5";if(e.includes("claude-opus-5-5"))return"claude-opus-5-5";if(e.includes("claude-opus-5"))return"claude-opus-5";if(e.includes("claude-opus-4-8"))return"claude-opus-4-8";if(e.includes("claude-opus-4-7"))return"claude-opus-4-7";if(e.includes("claude-opus-4-6"))return"claude-opus-4-6";if(e.includes("claude-opus-4-5"))return"claude-opus-4-5";if(e.includes("claude-opus-4-1"))return"claude-opus-4-1";if(/claude-opus-4(?!-\d(?!\d))/.test(e))return"claude-opus-4-0";if(e.includes("claude-sonnet-5-5"))return"claude-sonnet-5-5";if(e.includes("claude-sonnet-5"))return"claude-sonnet-5";if(e.includes("claude-sonnet-4-6"))return"claude-sonnet-4-6";if(e.includes("claude-sonnet-4-5"))return"claude-sonnet-4-5";if(/claude-sonnet-4(?!-\d(?!\d))/.test(e))return"claude-sonnet-4-0";if(e.includes("claude-haiku-4-5"))return"claude-haiku-4-5";if(e.includes("claude-3-7-sonnet"))return"claude-3-7-sonnet";if(e.includes("claude-3-5-sonnet"))return"claude-3-5-sonnet";if(e.includes("claude-3-5-haiku"))return"claude-3-5-haiku";if(e.includes("claude-3-opus"))return"claude-3-opus";if(e.includes("claude-3-sonnet"))return"claude-3-sonnet";if(e.includes("claude-3-haiku"))return"claude-3-haiku";return Ab(e)}
function fb(e){e=e.toLowerCase();let n=cL().canonicalNameMemo,r=n.get(e);if(r!==void 0)return r;let s=OI(e);if(e.length<=256){if(n.size>=256)n.clear();n.set(e,s)}return s}
var PI=new Set($b());
function Doe(e){let n=Ct(e);return xa(n)!==void 0||PI.has(n)||n===MSt}
return {canonical:fb,isKnownIdentity:Doe,root:cL,catalog:vwe,entry:xa};
}
