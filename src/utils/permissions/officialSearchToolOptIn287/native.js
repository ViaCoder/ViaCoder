// Complete pinned 287 explicit search-tool launch parsing and real HEr producer fragment.
function module0(imports){

var c={Task:"Agent",KillShell:"TaskStop",KillBash:"TaskStop",ListPeers:"ListAgents",Brief:"SendUserMessage",ListMcpResources:"ListMcpResourcesTool",ReadMcpResource:"ReadMcpResourceTool",ReadMcpResourceDir:"ReadMcpResourceDirTool"};
function Zl(e){return Object.hasOwn(c,e)?c[e]:e};
function sA(e){return e.includes("*")};
function m(e){return e.replaceAll("\\","\\\\").replaceAll("(","\\(").replaceAll(")","\\)")};
function $Xr(e){return UXr(e).replaceAll("\\\\","\\")};
function UXr(e){return e.replaceAll("\\(","(").replaceAll("\\)",")")};
function rWe(e){let n=C(e,"("),t=R(e,")");if(n===-1&&t===-1)return{kind:"bare"};let r=e.substring(0,n);if(n===-1||t<=n||t!==e.length-1||/[()]/.test(r))return{kind:"malformed"};return{kind:"call",toolName:r,rawContent:e.substring(n+1,t)}};
function jn(e){let n=rWe(e);if(n.kind!=="call"||!n.toolName)return{toolName:Zl(e)};if(n.rawContent===""||n.rawContent==="*")return{toolName:Zl(n.toolName)};let t=$Xr(n.rawContent);return{toolName:Zl(n.toolName),ruleContent:t}};
function On(e){if(!e.ruleContent)return e.toolName;let n=m(e.ruleContent);return`${e.toolName}(${n})`};
var wfe="!";
function Op(e){if(e.length===0)return[];let n=[];for(let t of e){if(!t)continue;let r="",s=!1;for(let o of t)switch(o){case"(":s=!0,r+=o;break;case")":s=!1,r+=o;break;case",":if(s)r+=o;else{if(r.trim())n.push(r.trim());r=""}break;case" ":if(s)r+=o;else if(r.trim())n.push(r.trim()),r="";break;default:r+=o}if(r.trim())n.push(r.trim())}return n};
function C(e,n){for(let t=0;t<e.length;t++)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1};
function R(e,n){for(let t=e.length-1;t>=0;t--)if(e[t]===n){let r=0,s=t-1;while(s>=0&&e[s]==="\\")r++,s--;if(r%2===0)return t}return-1};

return {c,Zl,sA,m,$Xr,UXr,rWe,jn,On,wfe,Op,C,R};
}
function module1(imports){

function us(e){let n=e.split("__"),[r,t,...o]=n;if(r!=="mcp"||!t)return null;let s=o.length>0?o.join("__"):void 0;return{serverName:t,toolName:s}};

return {us};
}
function module2(imports){
const sA=imports["sA"];
const us=imports["us"];
function rbt(e){if(!sA(e))return null;let n=us(e);if(n&&!sA(n.serverName))return null;return{valid:!1,error:`Wildcard tool name "${e}" is not supported in allow rules`,suggestion:"An allow pattern must name the scope it widens \u2014 globs are permitted only in the tool position after a literal mcp__<server>__ prefix. Deny and ask rules accept wildcards anywhere",examples:["mcp__puppeteer__*","mcp__github__get_*"]}};

return {rbt};
}
function module3(imports){

var ZW=["default"];
function $qn(e){let n=e.toLowerCase();if(!ZW.includes(n))return null;return n};

return {ZW,$qn};
}
function module4(imports){

var co="Glob";
var Jr="Grep";

return {co,Jr};
}
function module5(imports){
const k=imports["k"];
const wfe=imports["wfe"];
const Zl=imports["Zl"];
const Op=imports["Op"];
const On=imports["On"];
const jn=imports["jn"];
const rbt=imports["rbt"];
const $qn=imports["$qn"];
const Feo=imports["Feo"];
const co=imports["co"];
const Jr=imports["Jr"];
function Nbo(e){let o=[],s=new Set,l=!1,n=[],u=[],m=k("tengu_tools_exclusion_killswitch",!1);for(let f=0;f<e.length;f++){let g=e[f];if(g===void 0)continue;if(!g.startsWith(wfe)){o.push(g);continue}let y=g.slice(wfe.length);if(y===""){let h=e[f+1];if(h===void 0||h.startsWith(wfe)||h.startsWith("(")){l=!0;continue}if(f++,!m)n.push(h);g=wfe+h,y=h}let b=y.indexOf("(");if(b===0){l=!0;continue}if(b>0){if(y=y.slice(0,b),!m)u.push(g)}if(!m)s.add(Zl(y))}return{kept:o,excluded:s,bare:l,detached:n,scoped:u}};
function initializeSearchTools(e,s){let h=[];let A=Op(e).map((r)=>On(jn(r))).filter((r)=>{let p=rbt(jn(r).toolName);if(p)return h.push(`Ignoring --allowedTools rule "${r}": ${p.error}. ${p.suggestion}.`),!1;return!0}),_=!!s&&s.length>0&&$qn(s.join(" ").trim())!==null,P=s&&!_?Nbo(Op(s)):{kept:[],excluded:new Set,bare:!1,detached:[],scoped:[]},D=P.kept.map(Zl).filter((r)=>!P.excluded.has(r)),Z=(r)=>D.includes(r)||A.some((p)=>jn(p).toolName===r);Feo([co,Jr].some(Z));return {allowed:A,base:P,kept:D,isPreset:_,warnings:h};}
return {Nbo,initializeSearchTools};
}
export function createSearchToolOptIn287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"sA":m0["sA"],"us":m1["us"]});
const m3=module3({});
const m4=module4({});
const m5=module5({"k":ports["feature"],"wfe":m0["wfe"],"Zl":m0["Zl"],"Op":m0["Op"],"On":m0["On"],"jn":m0["jn"],"rbt":m2["rbt"],"$qn":m3["$qn"],"Feo":ports["replaceSearchToolsOptIn"],"co":m4["co"],"Jr":m4["Jr"]});
return {parseList:m0.Op,parseBase:m5.Nbo,preset:m3.$qn,normalize:m0.Zl,parseRule:m0.jn,formatRule:m0.On,validateAllow:m2.rbt,initialize:m5.initializeSearchTools};
}
