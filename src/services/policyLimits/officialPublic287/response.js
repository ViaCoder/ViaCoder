// Generated from pinned official 2.1.287 complete declarations; UTF-16 evidence in provenance.json.
export function createPolicyResponse287(ports){
const {G,H,L,T,de,f,hD,o,re,se,u}=ports;
var sn=/\p{Default_Ignorable_Code_Point}/u;
var an=/\p{Cf}/u;
function D(e,n){return sn.test(e)||e==="\u2028"||e==="\u2029"||e==="\u2800"||n>=55296&&n<=57343||n===1109742||an.test(e)};
function Y9(e){for(let n of e)if(D(n,n.codePointAt(0)??0))return!0;return!1};
function ABe(e){return/[\u0000-\u001f\u007f-\u009f]/.test(e)||Y9(e)};
function Y(e){let n=re(hD(e,"").toLowerCase(),64).trim();return/^[a-z0-9_-]+$/.test(n)?n:""};
var KXe=16;
function GXn(e){let n=typeof e==="object"&&e!==null&&"compliance_taints"in e?e.compliance_taints:void 0;if(!Array.isArray(n))return 0;let i=G(n,(s)=>typeof s!=="string"||Y(s)===""),r=L(n.filter((s)=>typeof s==="string").map(Y).filter((s)=>s.length>0));return i+Math.max(0,r.length-KXe)};
var Ee=f(()=>u({restrictions:de(o(),u({allowed:H()})),compliance_taints:T(se()).default([]).transform((e,n)=>{let i=L(e.filter((r)=>typeof r==="string").map(Y).filter((r)=>r.length>0)).slice(0,KXe);if(e.length>0&&i.length===0)n.addIssue({code:"custom",message:"compliance_taints had entries but none were well-formed regime names"});return i}),monitoring_notice:u({text:o().max(500).transform((e)=>hD(e,"",{keepEmojiJoiners:!0})),url:o().max(2048).url().startsWith("https://").refine((e)=>!ABe(e)).nullish().catch(null)}).nullable().default(null).catch(null),defaults:de(o(),se()).default({}).catch({}),core_skills:T(o().max(128)).max(256).optional().catch([])}));
var Ne=new WeakMap;
function ijt(e){let n=Ee().safeParse(e);if(n.success)Ne.set(n.data,e);return n};
function Uht(e){return Ne.get(e)??e};
return {schema:Ee,parse:ijt,rawResponse:Uht,lossyCount:GXn};
}
