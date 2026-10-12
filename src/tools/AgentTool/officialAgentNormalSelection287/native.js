// Complete original Do ordinary selection block, not the rest of Do or act.
export function createAgentNormalSelection287(ports){
const act=ports.availableAgents;
const cce=ports.normalize;
const Rn=ports.generalPurposeAvailable;
const jn=ports.parseRule;
const zs=ports.denyTool;
const a=ports.environment;
const on=ports.policyAllowed;
const vn=ports.forkGuard;
const iQ=ports.denyRule;
const tt=ports.typeList;
const f_n=ports.requiredTypeMessage;
const A5=ports.generalPurpose;
const eU=ports.forkType;
const N8e=ports.setAgentColor;
const i=ports.telemetry;
const m=ports.launchMetric;
const yt="Agent",hr="WebFetch",rbe="allow_web_fetch";
class ne extends Error{constructor(n){super(n);this.name="AgentTypeError"}};
function r(n){return n};
function S(n){return r(n)};
function bn(n){return r(n)};
function See(n,e){return e?bn(n):S("custom")};
function yie(n){return See(n.agentType,n.source==="built-in")};
function Sl(e){return e.source==="built-in"};
function ine(e){if(e===void 0)return{};if(!e.includes("*"))return null;let n;for(let r of e){if(r==="*")continue;let{toolName:s,ruleContent:g}=jn(r);if(s!==yt||!g)return null;n??=[],n.push(...g.split(",").map((h)=>h.trim()).filter(Boolean))}return n?{allowedAgentTypes:n}:{}};
function cVt(e,n){return e.filter((r)=>{if(r.source!=="built-in"||!r.tools||r.tools.length===0||ine(r.tools)!==null)return!0;return r.tools.some((s)=>{if(s==="*")return!1;let g=jn(s).toolName;return!zs(n,{name:g})&&V2o(g)})})};
function ZNe(e,n){return cVt([e],n).length===0};
function eFe(e){return`Agent type '${e}' is unavailable because every tool it may use is denied by the current permission settings.`};
function V2o(e){return e!==hr||!a.CLAUDE_CODE_DISABLE_WEB_FETCH&&on(rbe)};
return {AgentTypeError:ne,toolsFilter:cVt,toolsDenied:ZNe,async select({agents:de,allowedTypes:ye,permissionContext:re,context:e,requested:w,forkAvailable:Pt,guardOptions:Ot}){let s,Ft=[];
{let r=await act(de,ye,re,e);Ft=r;let b=r.map((P)=>P.agentType);if(w===void 0&&!Rn(de,ye)){i("tengu_subagent_type_miss",{requestedNormalized:S("OMITTED"),availableCount:r.length}),m("subagent_launch","subagent_type_missing");let P=Pt&&vn(Ot)===null?[eU,...b]:b;throw new ne(`${f_n}. Available agents: ${tt(P)}`)}let A=w??A5.agentType,M=r.find((P)=>P.agentType===A);if(!M){let P=cce(A),E=new Set(b),F=P?de.filter((O)=>cce(O.agentType)===P):[],D=See(P,F.length>0&&F.every(Sl)),ie=P.length;if(F.length>1){i("tengu_subagent_type_miss",{requestedNormalized:D,requestedLength:ie,availableCount:r.length,ambiguousCount:F.length}),m("subagent_launch","subagent_type_ambiguous");let O=F.map((J)=>J.agentType).filter((J)=>E.has(J));throw new ne(`Agent type '${A}' is ambiguous \u2014 matches ${F.map((J)=>E.has(J.agentType)?J.agentType:`${J.agentType} (unavailable)`).join(", ")}. ${O.length>0?`Use the exact name: ${O.join(" or ")}`:`None of these are available. Available agents: ${tt(b)}`}`)}if(F.length===1){let O=F[0];if(E.has(O.agentType)){if(M=O,M.color)N8e(A,M.color);i("tengu_subagent_type_normalized",{requestedNormalized:D,matched:yie(M)})}else{let J=O.agentType,ke=iQ(re,yt,J);if(ke)throw m("subagent_launch","subagent_type_denied"),new ne(`Agent type '${J}' has been denied by permission rule '${yt}(${J})' from ${ke.source}.`);if(ZNe(O,re))throw m("subagent_launch","subagent_type_tools_denied"),new ne(eFe(J))}}if(!M)throw i("tengu_subagent_type_miss",{requestedNormalized:D,requestedLength:ie,availableCount:r.length}),m("subagent_launch","subagent_type_not_found"),new ne(`Agent type '${A}' not found. Available agents: ${tt(b)}`)}if(M.source==="plugin"&&M.loadDefinition!==void 0){let P=await M.loadDefinition();if(P===void 0||P.agentType!==M.agentType||P.source!=="plugin")throw new ne(`Agent type '${A}' could not be loaded from its plugin.`);M=P}s=M}
return {selected:s,available:Ft};
}}
}
