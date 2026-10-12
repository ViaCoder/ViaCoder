export function createMainThreadAgentHookSelection287(ports){
function module0(imports){

var Ag=["PreToolUse","PostToolUse","PostToolUseFailure","PostToolBatch","Notification","UserPromptSubmit","UserPromptExpansion","SessionStart","SessionEnd","Stop","StopFailure","SubagentStart","SubagentStop","PreCompact","PostCompact","PreModelSwitch","PostModelSwitch","PermissionRequest","PermissionDenied","Setup","TeammateIdle","TaskCreated","TaskCompleted","Elicitation","ElicitationResult","ConfigChange","WorktreeCreate","WorktreeRemove","InstructionsLoaded","CwdChanged","FileChanged","DirectoryAdded","MessageDisplay"];
return {Ag};
}
function module1(imports){
const Ag=imports["Ag"];
function NQt(e){if(!e||Object.keys(e).length===0)return!1;for(let n of Ag){let o=e[n];if(!o||o.length===0)continue;for(let s of o)if((s.hooks?.length??0)>0)return!0}return!1};
return {NQt};
}
function module2(imports){
const ge=imports["ge"];
function jd(o){let t=ge("policySettings")?.strictPluginOnlyCustomization;if(t===!0)return!0;if(Array.isArray(t))return t.includes(o);return!1};
var g=new Set(["plugin","policySettings","built-in","builtin","bundled"]);
function dj(o){return o!==void 0&&g.has(o)};
return {jd,g,dj};
}
function module3(imports){
const c=imports["c"];
const n=imports["n"];
const Ee=imports["Ee"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
function um(){if(c()?.originalCwd===void 0&&n().project===null)return null;return Ee()};
function O3t(){return n().host.launchOptions.workspaceRestrictionState()?.restriction??null};
function Peo(e){if(O3t()?.gateKeys.includes(e))return!0;for(let t of n().host.launchOptions.restrictedWorkspaceRoots().values())if(t.gateKeys.includes(e))return!0;return!1};
return {V,um,O3t,Peo};
}
function module4(imports){
const u=imports["u"];
const O=imports["O"];
function $U(e){let r=u(e);if(O()==="windows")return r.replaceAll("\\","/");return r};
return {$U};
}
function module5(imports){

function Mn(t){return t.normalize("NFC")};
return {Mn};
}
function module6(imports){
const um=imports["um"];
const Peo=imports["Peo"];
const le=imports["le"];
const $U=imports["$U"];
const nw=imports["nw"];
const Mn=imports["Mn"];
const Xe=imports["Xe"];
const Ee=imports["Ee"];
function Pm(e){let n=e??um();return n!==null&&U_t(n)};
function U_t(e){return EIe(k2e(e))};
function EIe(e){if(Peo(e))return!1;return le().projects?.[e]?.hasTrustDialogAccepted===!0};
function YC(e){return k2e(e??Ee())};
function k2e(e){return $U(nw(e)??Mn(Xe(e)))};
return {Pm,U_t,EIe,YC,k2e};
}
function module7(imports){
const V=imports["V"];
const U=imports["U"];
class Ss{warned=new Set;firstTimeFor(e){if(this.warned.has(e))return!1;return this.warned.add(e),!0}reset(){this.warned.clear()}};
var _s=new V(()=>new Ss);
function xhn(e){return _s.of(U().host).firstTimeFor(e)};
return {Ss,_s,xhn};
}
function module8(imports){

function Hn(e){return e.replace(/[\p{Cc}\p{Cf}\u2028\u2029]+/gu," ")};
function met(e){return e.replace(/[\u007F-\u009F\u2028\u2029\p{Cf}]/gu,hwt)};
function hwt(e){return e.split("").map((n)=>"\\u"+n.charCodeAt(0).toString(16).padStart(4,"0")).join("")};
return {Hn,met,hwt};
}
function module9(imports){
const dj=imports["dj"];
const Pm=imports["Pm"];
const EIe=imports["EIe"];
const V=imports["V"];
const U=imports["U"];
const k2e=imports["k2e"];
const ARt=imports["ARt"];
const xRt=imports["xRt"];
const xhn=imports["xhn"];
const Hn=imports["Hn"];
const t=imports["t"];
const YC=imports["YC"];
const met=imports["met"];
const _=imports["_"];
const il=imports["il"];
const i=imports["i"];
const c=imports["c"];
function BNe(e){if(dj(e.source))return!0;if(e.source==="userSettings"||e.source==="flagSettings")return!0;if(!e.baseDir)return Pm();return EIe(PRt(e.baseDir))};
function Hxr(e){if(!e.baseDir)return;return PRt(e.baseDir)};
var hlo=new V(()=>new Map);
function PRt(e){let n=hlo.of(U().host),r=n.get(e);if(r!==void 0)return r;let s=k2e(ylo(e));return n.set(e,s),s};
function ylo(e){let n=ARt(e);if(xRt(e)==="agents"&&xRt(n)===".claude")return ARt(n);return e};
function Dxr(e){return met(_(e))};
function yHt(e){let n=Hxr(e)??YC();return`Run Claude Code in that folder once and accept the trust dialog, or set projects[${Dxr(n)}].hasTrustDialogAccepted: true in ${il()}.`};
function NKe(e,n,r="hooks"){if(r==="mcpServers"&&!xhn(`agent-origin-skip\x00${n}\x00${r}\x00${e.agentType}\x00${e.baseDir??""}`))return;let s=n==="mainThread"?"main-thread agent":"agent",g=Hn(e.agentType);t(`Skipping frontmatter ${r==="hooks"?"hooks":"MCP servers"} for ${s} '${g}': the folder its definition file came from is not trusted (source: ${e.source}). ${yHt(e)}`,{level:"error"}),i("tengu_agent_hooks_origin_untrusted",{what:c(r),source:c(e.source),surface:c(n),fromAdditionalDirectory:c(e.fromAdditionalDirectory===!0?"true":"false")})};
return {BNe,Hxr,hlo,PRt,ylo,Dxr,yHt,NKe};
}
function module10(imports){
const NQt=imports["NQt"];
const _kn=imports["_kn"];
const jd=imports["jd"];
const dj=imports["dj"];
const BNe=imports["BNe"];
const NKe=imports["NKe"];
function xHe(e){if(!e||!NQt(e.hooks)){_kn(void 0);return}let o=!jd("hooks")||dj(e.source),r=BNe(e);if(o&&r){_kn(e.hooks);return}if(o&&!r)NKe(e,"mainThread");_kn(void 0)};
return {xHe};
}
const m0=module0({});
const m1=module1({"Ag":m0["Ag"]});
const m2=module2({"ge":ports["settingsForSource"]});
const m3=module3({"c":ports["legacy"],"n":ports["execution"],"Ee":ports["originalCwd"]});
const m4=module4({"u":ports["path"]["normalize"],"O":ports["platform"]});
const m5=module5({});
const m6=module6({"um":m3["um"],"Peo":m3["Peo"],"le":ports["config"],"$U":m4["$U"],"nw":ports["canonicalGitRoot"],"Mn":m5["Mn"],"Xe":ports["path"]["resolve"],"Ee":ports["originalCwd"]});
const m7=module7({"V":m3["V"],"U":ports["execution"]});
const m8=module8({});
const m9=module9({"dj":m2["dj"],"Pm":m6["Pm"],"EIe":m6["EIe"],"V":m3["V"],"U":ports["execution"],"k2e":m6["k2e"],"ARt":ports["path"]["dirname"],"xRt":ports["path"]["basename"],"xhn":m7["xhn"],"Hn":m8["Hn"],"t":ports["debug"],"YC":m6["YC"],"met":m8["met"],"_":ports["stringify"],"il":ports["configFile"],"i":ports["analytics"],"c":ports["analyticsIdentity"]});
const m10=module10({"NQt":m1["NQt"],"_kn":ports["setAgentHooks"],"jd":m2["jd"],"dj":m2["dj"],"BNe":m9["BNe"],"NKe":m9["NKe"]});
return {"select":m10.xHe,"hasHooks":m1.NQt,"trusted":m9.BNe,"skip":m9.NKe};
}
