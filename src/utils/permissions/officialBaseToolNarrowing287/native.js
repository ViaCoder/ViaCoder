// Extracted complete 2.1.287 base-tool narrowing closure. Runtime-dependent behavior is supplied only through source-qualified ports.
function module0(imports){

var c={Task:"Agent",KillShell:"TaskStop",KillBash:"TaskStop",ListPeers:"ListAgents",Brief:"SendUserMessage",ListMcpResources:"ListMcpResourcesTool",ReadMcpResource:"ReadMcpResourceTool",ReadMcpResourceDir:"ReadMcpResourceDirTool"};
function Zl(e){return Object.hasOwn(c,e)?c[e]:e};
var wfe="!";
function Op(e){if(e.length===0)return[];let n=[];for(let t of e){if(!t)continue;let r="",s=!1;for(let o of t)switch(o){case"(":s=!0,r+=o;break;case")":s=!1,r+=o;break;case",":if(s)r+=o;else{if(r.trim())n.push(r.trim());r=""}break;case" ":if(s)r+=o;else if(r.trim())n.push(r.trim()),r="";break;default:r+=o}if(r.trim())n.push(r.trim())}return n};
return {c,Zl,wfe,Op};
}
function module1(imports){

var xYe="AppifactRepl";
return {xYe};
}
function module2(imports){

var ZW=["default"];
function $qn(e){let n=e.toLowerCase();if(!ZW.includes(n))return null;return n};
function Uqn(e){return e.filter((n)=>n.isEnabled()).map((n)=>n.name)};
return {ZW,$qn,Uqn};
}
function module3(imports){

var Ue="Bash";
var wt="PowerShell";
return {Ue,wt};
}
function module4(imports){
const Ue=imports["Ue"];
const wt=imports["wt"];
var Km="GetTask";
var J_=[Ue,wt];
return {Km,J_};
}
function module5(imports){

var Jhe=new Set(["Frame","FrameRead","TeamCreate","TeamDelete","SuggestBackgroundPR","AutofixPr","TaskOutput","AgentOutputTool","BashOutputTool","AgentOutput","BashOutput"]);
return {Jhe};
}
function module6(imports){

var co="Glob";
var Jr="Grep";
return {co,Jr};
}
function module7(imports){
const k=imports["k"];
const wfe=imports["wfe"];
const Zl=imports["Zl"];
const xYe=imports["xYe"];
const $qn=imports["$qn"];
const Uqn=imports["Uqn"];
const Op=imports["Op"];
const J_=imports["J_"];
const Km=imports["Km"];
const Ue=imports["Ue"];
const Jhe=imports["Jhe"];
const t=imports["t"];
const wt=imports["wt"];
const co=imports["co"];
const Jr=imports["Jr"];
const O=imports["O"];
function Nbo(e){let o=[],s=new Set,l=!1,n=[],u=[],m=k("tengu_tools_exclusion_killswitch",!1);for(let f=0;f<e.length;f++){let g=e[f];if(g===void 0)continue;if(!g.startsWith(wfe)){o.push(g);continue}let y=g.slice(wfe.length);if(y===""){let h=e[f+1];if(h===void 0||h.startsWith(wfe)||h.startsWith("(")){l=!0;continue}if(f++,!m)n.push(h);g=wfe+h,y=h}let b=y.indexOf("(");if(b===0){l=!0;continue}if(b>0){if(y=y.slice(0,b),!m)u.push(g)}if(!m)s.add(Zl(y))}return{kept:o,excluded:s,bare:l,detached:n,scoped:u}};
function MQo(e,o){let s=e.join(" ").trim();if($qn(s))return Uqn(o());let{kept:n,excluded:u}=Nbo(Op(e)),m=n.includes("preset:default")?o().map((f)=>f.name).concat(n.filter((f)=>f!=="preset:default")):n;if(u.size===0)return m;return m.filter((f)=>!u.has(Zl(f)))};
var ue=[Ue,wt,co,Jr];
function LQo({baseToolsCli:e,baseToolsIsPreset:o,parsedBaseTools:s,getAllBaseTools:l}){let n=[],u=MQo(e,l),m=new Set(u.map(Zl)),f=l(),g=o?null:f,y=g===null?Uqn(f):g.map((d)=>d.name),{excluded:b}=s;for(let d of g??l())if(d.familyParentToolName!==void 0&&b.has(d.familyParentToolName))m.delete(d.name);for(let d of f)if(d.familyParentToolName!==void 0&&m.has(d.familyParentToolName))m.add(d.name);if(J_.some((d)=>m.has(d)))m.add(Km);for(let d of b)m.delete(d);if(b.has(Ue)){let{APPIFACT_REPL_TOOL_NAME:d}={APPIFACT_REPL_TOOL_NAME:xYe};m.delete(d)}let h=y.filter((d)=>!m.has(d));for(let d of b){if(y.includes(d))continue;if(Jhe.has(d)){t(`--tools exclusion names a removed tool: ${d}`);continue}if(h.push(d),ue.includes(d))continue;n.push(`--tools entry "${wfe}${d}" matches no built-in tool \u2014 check for typos. An MCP tool with exactly that name is still withheld.`)}for(let d of s.scoped)n.push(`--tools entry "${d}" names a rule, not a tool; the whole tool is withheld. Write "${wfe}${d.slice(wfe.length,d.indexOf("("))}" to say so.`);for(let d of s.detached)n.push(`--tools entry "${wfe} ${d}" was read as "${wfe}${d}" and ${d} is withheld; write it without the space.`);if(s.bare)n.push(`--tools has a "${wfe}" with no tool name after it; write the name right after it, as in "${wfe}Bash".`);if(!o){for(let d of[...O()==="windows"?[wt]:[],co,Jr])if(!m.has(d)&&!h.includes(d))h.push(d)}return{toolsToDisallow:h,warnings:n}};
return {Nbo,MQo,ue,LQo};
}
function module8(imports){
const n=imports["n"];
function jeo(e){n().host.launchOptions.replaceToolsOmittedByLaunchList(new Set(e))};
return {jeo};
}
function module9(imports){

function Fx(e){switch(e){case"userSettings":return"user settings";case"projectSettings":return"shared project settings";case"localSettings":return"project local settings";case"flagSettings":return"command line arguments";case"policySettings":return"enterprise managed settings";case"cliArg":return"CLI argument";case"command":return"command configuration";case"session":return"current session";case"toolsNarrowing":return"CLI tool narrowing";case"mcpServerPolicy":return"MCP server policy";case"hostCredential":return"cloud-session credential guard"}};
return {Fx};
}
export function createBaseToolNarrowing287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({"Ue":m3["Ue"],"wt":m3["wt"]});
const m5=module5({});
const m6=module6({});
const m7=module7({"k":ports["feature"],"wfe":m0["wfe"],"Zl":m0["Zl"],"xYe":m1["xYe"],"$qn":m2["$qn"],"Uqn":m2["Uqn"],"Op":m0["Op"],"J_":m4["J_"],"Km":m4["Km"],"Ue":m3["Ue"],"Jhe":m5["Jhe"],"t":ports["debugTelemetry"],"wt":m3["wt"],"co":m6["co"],"Jr":m6["Jr"],"O":ports["platform"]});
const m8=module8({"n":ports["executionContext"]});
const m9=module9({});
return {parseList:m0.Op,parseBase:m7.Nbo,preset:m2.$qn,normalize:m0.Zl,resolveBase:m7.MQo,replaceOmitted:m8.jeo,sourceDisplay:m9.Fx,narrow:input=>m7.LQo(input)};
}
