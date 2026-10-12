// Complete pinned official 2.1.287 source; see provenance.json.
export function createSideQueryAttribution287(ports){
const {An,Gbe,Ss,bn,d,l,u6t,vqr}=ports;
var T="custom";
var ZS="third-party";
var f="custom";
function wJ(t,i,n,e,r){try{let o=E(t,i,n);if(e){let s=Ss(t);if(s==="main"||s==="subagent"){if(o.attributionMcpServer=e,r)o.attributionMcpTool=r}}return o}catch(o){return d(o),{}}};
function E(t,i,n){if(!t)return{};if(t.startsWith("agent:builtin:"))return{attributionAgent:t.slice(14),...A(i)};if(t.startsWith("agent:custom:")){let e=t.slice(13);return{attributionAgent:e,...A(i,vqr(e))}}if(t.startsWith("agent:"))return A(i);if(Ss(t)==="main"&&n)return A(n);return{}};
function A(t,i){if(!t)return i?{attributionPlugin:i}:{};let n=vqr(t)??i;return{attributionSkill:t,...n&&{attributionPlugin:n}}};
function cfn(t,i){let n=H(t,i),e={};if(n.attributionAgent!==void 0){e.attributionAgent=g(n.attributionAgent);let r=b(i.attributionAgent,n.attributionAgent,T);if(r!==void 0)e.attributionAgentHash=r}if(n.attributionSkill!==void 0){e.attributionSkill=g(n.attributionSkill);let r=b(i.attributionSkill,n.attributionSkill,ZS);if(r!==void 0)e.attributionSkillHash=r}if(n.attributionPlugin!==void 0){e.attributionPlugin=g(n.attributionPlugin);let r=b(i.attributionPlugin,n.attributionPlugin,ZS);if(r!==void 0)e.attributionPluginHash=r}if(n.attributionMcpServer!==void 0){e.attributionMcpServer=g(n.attributionMcpServer);let r=b(i.attributionMcpServer,n.attributionMcpServer,f);if(r!==void 0)e.attributionMcpServerHash=r}if(n.attributionMcpTool!==void 0){e.attributionMcpTool=g(n.attributionMcpTool);let r=b(i.attributionMcpTool,n.attributionMcpTool,f);if(r!==void 0)e.attributionMcpToolHash=r}return e};
function b(t,i,n){if(i!==n||t===void 0||t===n)return;return g(Gbe(t))};
function H(t,i){try{return v(t,i)}catch(n){return d(n),{}}};
function v(t,i){let{attributionAgent:n,attributionSkill:e,attributionPlugin:r,attributionMcpServer:o,attributionMcpTool:s}=i,{firstPartyPlugins:c,loggableMcpServers:p}=l(),u={};if(o!==void 0){let a=p.has(o);if(u.attributionMcpServer=a?An(o):f,s!==void 0){let h=a?u6t(o):void 0,F=a&&(h===void 0||h.has(An(s)));u.attributionMcpTool=F?An(s):f}}if(n!==void 0)if(t?.startsWith("agent:builtin:"))u.attributionAgent=n;else{let a=r!==void 0&&c.has(r);u.attributionAgent=a?n:T}if(r!==void 0){if(c.has(r)){if(u.attributionPlugin=r,e!==void 0)u.attributionSkill=e}else if(u.attributionPlugin=ZS,e!==void 0)u.attributionSkill=ZS}else if(e!==void 0)u.attributionSkill=e;return u};
function g(t){return bn(t)};
return {wJ,cfn};
}
