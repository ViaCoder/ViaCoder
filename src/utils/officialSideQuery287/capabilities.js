// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryCapabilities287(ports){
const {Fn,He,a,ckn,t,xt}=ports;
var dMr=/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])$/i;
function Nh(e){return e!==void 0&&dMr.test(e)?e:void 0};
var n9=/([a-z0-9_, ]+?)\s+not supported in your workspace/i;
var r9=/features are not available for Azure AI Foundry workspaces?:\s*([a-z0-9_, ]+)/i;
var o9=/server-side web search is not available in this environment/i;
function uw(){let e=Nh(a.ANTHROPIC_FOUNDRY_RESOURCE);return a.ANTHROPIC_FOUNDRY_BASE_URL||(e?`https://${e}.services.ai.azure.com`:void 0)};
function fw(e){let n=Fn(e);return`${uw()??"unknown-foundry-resource"}::${n}`};
var tI=/^[a-z][a-z0-9_]*$/;
function nI(e){let n=e.match(n9)?.[1];if(n){let s=n.split(",").map((h)=>h.trim());if(s.every((h)=>tI.test(h)))return s}let r=e.match(r9)?.[1];if(r){let s=r.split(/[,\s]+/).filter((h)=>h!=="and"&&tI.test(h));return s.length>0?s:null}if(o9.test(e))return["web_search"];return null};
function hdn(e,n){if(n.length===0)return;let r=fw(e),s=ckn(),h=s.get(r);if(h&&n.every((b)=>h.has(b)))return;let g=h?new Set(h):new Set;for(let b of n)g.add(b);s.set(r,g),t(`[foundry-capabilities] deployment ${r} does not support: ${[...g].join(", ")}`,{level:"warn"})};
function a_e(e,n){let r=ckn();if(r.size===0)return!0;return!r.get(fw(e))?.has(n)};
function ydn(e){if(He()!=="foundry")return null;if(!(e instanceof xt)||e.status!==400)return null;let n=e.error;if(n&&typeof n==="object"&&"error"in n){let r=n.error;if(r&&typeof r==="object"&&"message"in r&&typeof r.message==="string")return nI(r.message)}return nI(e.message??"")};
return {ydn,hdn,a_e};
}
