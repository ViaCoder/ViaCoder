// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryModel287(ports){
const {$r,Be,Dbe,Doe,Fn,He,Js,OU,Obe,RS,a,cc,ge,ho,jo,ny,pse,rK,rt,t,vt,zF}=ports;
function Hbe(e){if(!Bb(e))return e;let n=rt();return t(`[deniedModels] helper request for ${e} sent as ${n}`),n};
function Bb(e){try{return Obe(e)}catch{return!0}};
function wI(e){try{return Obe(e)}catch{return!1}};
function Moe(e,n=Be(e)){return Doe(n)||MI(e,n)};
function MI(e,n){return!1};
function Tx(e){let n=Fn(e),r=n.toLowerCase();if(!Object.hasOwn(OU,r))return n;let s=OU[r];if(s===void 0)return n;let g=vt()[s];if(jo().state==="refused")return n;let b;try{b=ge("policySettings")}catch{return n}let v=b?.availableModels,w=b?.modelOverrides??pse()??{},A,R;if(v===void 0)A=RS()[s],R=A!==g;else{if(!$r(r,{allowlist:v,overridesMap:w,envFreeAliasResolution:!0}))return n;let D=KI(w,s);A=D??g,R=D!==void 0}if(R&&wI(A))A=g,R=!1;let M=He();if(R||M!=="foundry"&&ho[s][M]!==null)return Fn(A);return n};
function KI(e,n){for(let[r,s]of Object.entries(e))if(Object.hasOwn(OU,r)&&OU[r]===n&&s)return s;return};
var av=["claude-opus-4-0","claude-sonnet-4-0","claude-opus-4-1","claude-sonnet-4-5","claude-haiku-4-5","claude-opus-4-5","claude-opus-4-6","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-8"];
function lr(e,n){if(e.includes("claude-3-"))return!0;let r=av.indexOf(e);return r!==-1&&r<av.indexOf(n)};
function Mbe(e){let n=Be(e);if(n.includes("claude-3-")||n==="claude-opus-4-0"||n==="claude-opus-4-1"||n==="claude-opus-4-5"||n==="claude-opus-4-6"||n==="claude-opus-4-7"||n==="claude-opus-4-8"||n==="claude-opus-5"||n==="claude-sonnet-4-0"||n==="claude-sonnet-4-5"||n==="claude-sonnet-4-6"||n==="claude-sonnet-5"||n==="claude-haiku-4-5")return!1;let r=ny(n,"rejects_disabled_thinking",e);if(r!==void 0)return r;return zF(cc(e))};
function own(e){let n=Be(e),r=cc(e);if(!zF(r))return!1;if(rK())return!1;return!lr(n,"claude-opus-4-1")};
function PQn(e){let n=Dbe(e,"temperature");if(n!==void 0)return n;return lr(Be(e),"claude-opus-4-7")};
function s2e(e=He()){if(e==="anthropicAws")return a.ANTHROPIC_AWS_BASE_URL===void 0;return e==="firstParty"&&Js()};
return {Hbe,Mbe,own,PQn,s2e,Tx,Moe};
}
