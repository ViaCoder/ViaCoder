// Generated complete 2.1.287 session guidance with cloud scope and skill allowlist.
function module0(imports){
const n=imports["n"];
function eB(){return n().host.extensionsConfig.sessionSkillAllowlist()};
return {eB};
}
function module1(imports){

var So="Skill";
return {So};
}
function module2(imports){

var yt="Agent";
return {yt};
}
function module3(imports){

var Ue="Bash";
return {Ue};
}
function module4(imports){

var co="Glob";
var Jr="Grep";
return {co,Jr};
}
function module5(imports){
const a=imports["a"];
var S=new Set(["remote","remote_desktop","remote_mobile","remote_projects","remote_trigger"]);
function HXo(){let e=a.CLAUDE_CODE_ENTRYPOINT;return Boolean(a.CLAUDE_CODE_REMOTE)&&e!==void 0&&S.has(e)};
return {S,HXo};
}
function module6(imports){
const eB=imports["eB"];
const So=imports["So"];
const yt=imports["yt"];
const bE=imports["bE"];
const Ue=imports["Ue"];
const co=imports["co"];
const Jr=imports["Jr"];
const Ce=imports["Ce"];
const HXo=imports["HXo"];
const Uao=imports["Uao"];
const dN=imports["dN"];
const FM=imports["FM"];
const rne=imports["rne"];
const ew=imports["ew"];
const _0=imports["_0"];
function Sm(e){return e.flatMap((n)=>Array.isArray(n)?n.map((r)=>`  - ${r}`):[` - ${n}`])};
var w7e=3;
function Hao(e,n,r,s){let g=eB(),h=(g===void 0?n.length>0:g.length>0)&&e.has(So),b=e.has(yt),w=bE()&&e.has(Ue)?`\`find\` or \`grep\` via the ${Ue} tool`:`the ${co} or ${Jr}`,D=[Ce()?null:"If you need the user to run a shell command themselves (e.g., an interactive login like `gcloud auth login`), suggest they type `! <command>` in the prompt \u2014 the `!` prefix runs the command in this session so its output lands directly in the conversation.",HXo()?"The user follows this cloud session in the Claude app, which can open only files inside the primary working directory, plus your scratchpad and memory directories when you have them. Write files meant for the user to read, such as deliverables or a drafted commit message, in one of those directories, and don't present a path anywhere else as a file the user can open.":null,b?Uao(r):null,...!r&&b&&dN()&&FM()==="default"&&!rne()?[`For broad codebase exploration or research that'll take more than ${w7e} queries, spawn ${yt} with subagent_type=${ew.agentType}. Otherwise use ${w} directly.`]:[],h&&!s?`When the user types \`/<skill-name>\`, invoke it via ${So}. Only use skills listed in the user-invocable skills section \u2014 don't guess.`:null,_0()&&!s?'If the user asks about "ultrareview" or how to run it, explain that /code-review ultra launches a multi-agent cloud review of the current branch (or /code-review ultra <PR#> for a GitHub PR); /ultrareview is a deprecated alias for the same command. It is user-triggered and billed; you cannot launch it yourself, so do not attempt to via Bash or otherwise. It needs a git repository (offer to "git init" if not in one); the no-arg form bundles the local branch and does not need a GitHub remote.':null].filter((j)=>j!==null);if(D.length===0)return null;return["# Session-specific guidance",...Sm(D)].join(`
`)};
return {Sm,w7e,Hao};
}
function module7(imports){
const a=imports["a"];
const tt=imports["tt"];
function gj(i){return a.CLAUDE_CODE_DISABLE_BUNDLED_SKILLS||(i??tt()).disableBundledSkills===!0};
return {gj};
}
export function createOfficialSessionGuidance287(ports){
const m0=module0({"n":ports["execution"]});
const m1=module1({});
const m2=module2({});
const m3=module3({});
const m4=module4({});
const m5=module5({"a":ports["environment"]});
const m6=module6({"eB":m0.eB,"So":m1.So,"yt":m2.yt,"bE":ports["embeddedSearch"],"Ue":m3.Ue,"co":m4.co,"Jr":m4.Jr,"Ce":ports["nonInteractive"],"HXo":m5.HXo,"Uao":ports["agentToolSection"],"dN":ports["agentsEnabled"],"FM":ports["taskMode"],"rne":ports["forkEnabled"],"ew":ports["exploreAgent"],"_0":ports["reviewAvailable"]});
const m7=module7({"a":ports["environment"],"tt":ports["settings"]});
return {guidance:m6.Hao,cloudScope:m5.HXo,skillAllowlist:m0.eB,bundledSkillsDisabled:m7.gj};
}
