// Complete pinned 287 communication and model-prompt policy closures; original lexical modules retained.
function module0(imports){
const a=imports["a"];
const cL=imports["cL"];
const xa=imports["xa"];
const He=imports["He"];
function I9o(e){cL().servedCapabilityLookup=e};
var N={per_turn_effort:"tengu_per_turn_effort"};
function O9o(e){cL().featureGateLookup=e};
function S(e){let t=N[e];if(t===void 0)return!0;return cL().featureGateLookup?.(t)===!0};
function ny(e,t,n){return zQe(t,e)??bzt(e,t,n)};
function bzt(e,t,n){if(cL().servedCapabilityLookup?.(t,[n,m(e)])===!0&&S(t))return!0;return L8r(e,t)?!0:void 0};
function L8r(e,t){return xa(m(e))?.capabilities.includes(t)};
function zQe(e,t){return N8r(t).get(e)};
function N8r(e){let t=new Map,n=a.CLAUDE_CODE_MODEL_CAPABILITIES;if(n===void 0)return t;let r=m(e);for(let s of n.split(";")){let _=s.indexOf("=");if(_!==-1){let l=s.slice(0,_).trim();if(l==="")continue;if(!(l.endsWith("*")?r.startsWith(l.slice(0,-1)):r===l))continue}for(let l of(_===-1?s:s.slice(_+1)).split(",")){let d=l.trim(),v=!d.startsWith("-");t.set(v?d:d.slice(1),v)}}return t};
function m(e){return e.replace(/\[1m\]/gi,"")};
function od(e=He()){return e==="firstParty"||GF(e)||e==="gateway"};
function GF(e=He()){return e==="anthropicAws"||e==="anthropicGoogleCloud"};
return {I9o,N,O9o,S,ny,bzt,L8r,zQe,N8r,m,od,GF};
}
function module1(imports){
const n=imports["n"];
const Ut=imports["Ut"];
const Kwt=imports["Kwt"];
var s=new Set(["remote_cowork","remote_cowork_trigger"]);
function u(){let e=Ut()?Kwt():void 0;return e!==void 0&&s.has(e)};
function CTn(){return $Jr()||u()};
function $Jr(){let e=n();return e.entrypoint!==void 0&&(s.has(e.entrypoint)||e.entrypoint==="local-agent"||e.entrypoint==="local_agent")&&!e.childSession};
return {s,u,CTn,$Jr};
}
function module2(imports){
const CTn=imports["CTn"];
const ny=imports["ny"];
function AM(o,n){let e=ny(o,"fable_5_mitigations",n);if(e!==void 0)return e;if(o==="claude-mythos-5")return!0;return!1};
function KSe(o){return!CTn()&&ny(o,"fable_5_1_prompt_bundle")===!0};
return {AM,KSe};
}
function module3(imports){

var QZ=["us","eu","apac","jp","au","us-gov","global"];
return {QZ};
}
function module4(imports){
const QZ=imports["QZ"];
var MSt="claude-mythos-preview";
function Ct(e){return e.replace(/\[1m\]$/i,"")};
function cI(e,n){return Ct(e).toLowerCase()===Ct(n).toLowerCase()};
function Fn(e){return e.replace(/\[(1|2)m\]/gi,"")};
function wu(e){let n=e.trim().toLowerCase();if(n===""||/\s/.test(n))return null;n=n.replace(/\[[12]m\]$/,"");let s=n.lastIndexOf("/");if(s!==-1)n=n.slice(s+1);let t=/^(?:([a-z-]+)\.)?anthropic\.(claude-.*)$/.exec(n);if(t){let[,a,l=""]=t;if(a!==void 0&&!QZ.includes(a))return null;n=l}let r=u(n);if(!r)return null;let o=n.slice(r.base.length);if(o!==""&&!/^[-@]/.test(o))return null;let i={family:r.family,major:r.major,legacyVersionFirst:r.legacyVersionFirst,base:r.base};if(r.minor!==void 0)i.minor=r.minor;if(!$8r(o))i.trailer=o;else{let a=/(?:-v\d+@|[-@])(\d{8})/.exec(o)?.[1];if(a!==void 0)i.date=a}return i};
function $8r(e){return/^(?:-fast|-latest)?(?:-v\d{1,3}@\d{8}|[-@]\d{8})?(?:-v\d{1,3}(?::\d{1,3})?)?$/.test(e)};
function qj(e){return e!==null&&e.trailer===void 0};
function u(e){let n=/^claude-([a-z]+)-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?/.exec(e);if(n){let[t,r="",o="",i]=n;return{family:r,major:Number(o),minor:i===void 0?void 0:Number(i),legacyVersionFirst:!1,base:t}}let s=/^claude-(\d{1,2})(?!\d)(?:-(\d{1,2})(?!\d))?-([a-z]+)/.exec(e);if(s){let[t,r="",o,i=""]=s;return{family:i,major:Number(r),minor:o===void 0?void 0:Number(o),legacyVersionFirst:!0,base:t}}return null};
return {MSt,Ct,cI,Fn,wu,$8r,qj,u};
}
function module5(imports){

function r(n){return n};
function S(n){return r(n)};
function c(n){return r(n)};
function bn(n){return r(n)};
return {r,S,c,bn};
}
function module6(imports){
const bn=imports["bn"];
const S=imports["S"];
const ter=imports["ter"];
const Xr=imports["Xr"];
const Ct=imports["Ct"];
const Be=imports["Be"];
const ko=imports["ko"];
const k=imports["k"];
const xa=imports["xa"];
const MSt=imports["MSt"];
var $O=/^[A-Za-z0-9._:[\]-]{1,100}$/;
var GO=/^[A-Za-z0-9._:[\]-]{1,91}@\d{8}(\[\d{1,3}[mM]\])?$/;
function Et(e){if(e==null)return;return $O.test(e)||GO.test(e)?bn(e):S("nonconforming")};
function XQ(){return Xr().servedCatalogSuppressDepth>0};
function SWt(e){return Ct(Be(e))==="claude-opus-5"};
function $b(){return["claude-3-opus","claude-3-sonnet","claude-3-haiku"]};
var PI=new Set($b());
function Doe(e){let n=Ct(e);return xa(n)!==void 0||PI.has(n)||n===MSt};
function Moe(e,n=Be(e)){return Doe(n)||MI(e,n)};
function MI(e,n){return!1};
function Jm(e){return Ct(Be(e,{identity:!0}))};
function lo(e,n){let r=ko().pinnedFeatureValues??=new Map;if(!r.has(e))r.set(e,k(e,n));return r.get(e)};
function Kd(e){return ter(e)?.data??null};
return {$O,GO,Et,XQ,SWt,$b,PI,Doe,Moe,MI,Jm,lo,Kd};
}
function module7(imports){

class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
return {V};
}
function module8(imports){

function Le(e){if(!e)return!1;if(typeof e==="boolean")return e;let n=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(n)};
function gs(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let n=String(e).toLowerCase().trim();return["0","false","no","off"].includes(n)};
return {Le,gs};
}
function module9(imports){
const ny=imports["ny"];
const KSe=imports["KSe"];
const Be=imports["Be"];
const k=imports["k"];
const CTn=imports["CTn"];
const ter=imports["ter"];
const Fn=imports["Fn"];
const rt=imports["rt"];
const ko=imports["ko"];
const q=imports["q"];
const i=imports["i"];
const c=imports["c"];
const Et=imports["Et"];
const a=imports["a"];
const Kd=imports["Kd"];
const V=imports["V"];
const is=imports["is"];
const XQ=imports["XQ"];
const SWt=imports["SWt"];
const lo=imports["lo"];
const Le=imports["Le"];
const gs=imports["gs"];
const od=imports["od"];
const Jm=imports["Jm"];
const Moe=imports["Moe"];
const qj=imports["qj"];
const wu=imports["wu"];
const t=imports["t"];
const cI=imports["cI"];
const U=imports["U"];
var Ir="tengu_fennel_godwit";
function Tyn(e){if(e===void 0)return!1;if(ny(Be(e),"opus_5_prompt_bundle",e)!==!0)return!1;return!k(Ir,!1)};
function Ge(e){return!CTn()&&ny(e,"opus_5_5_prompt_bundle")===!0};
var Dr=new Set(["turn_updates","bash_output_audience_note","silent_turn_reminder","thinking_display_updates"]);
var Nr=new Set(["bison_cairn","larch_cistern"]);
var Lr=new Set(["silent_turn_reminder","quizzical_shore"]);
var Br=64;
var Hr="tengu_model_capability_from_client_data";
var go="tengu_model_capability_off_from_client_data";
function nj(e,n,s,r){if(r!==void 0)return r;let g=ny(n,e,s);if(g!==void 0)return g;let h=Dr.has(e)&&KSe(n)||Nr.has(e)&&Tyn(s)||Lr.has(e)&&Ge(n),b=ter(s);if(h){if(b?.data?.[e]!==!1)return!0;return fo(go,e,b),!1}if(b?.data?.[e]!==!0)return!1;return fo(Hr,e,b),!0};
function fo(e,n,s){let r=s.model??Fn(rt()),g=ko().clientDataCapabilityLogged??=new Map,h=q(),b=g.get(h);if(b===void 0){if(b=new Set,g.set(h,b),g.size>Br){let R=g.keys().next().value;if(R!==void 0)g.delete(R)}}let A=`${e===go?"-":""}${n}:${r}`;if(!b.has(A))b.add(A),i(e,{capability:c(n),model:Et(r)})};
function djo(e){return!1};
function pjo(e){return!1};
function jSe(e){return/-eap($|\[)/i.test(e)};
function mYn(e){let n=Ae();return XQ()?n.delegationCostsFirstCompiledOnly(e):n.delegationCostsFirst(e)};
function bo(e){if(e===void 0)return!1;let n=Be(e),s=ny(n,"lucky_cerf",e);if(s===!1)return!1;if(XQ())return s===!0;if(nj("lucky_cerf",n,e))return!0;let r=lo("tengu_lucky_cerf",null);return Array.isArray(r)&&r.some((g)=>typeof g==="string"&&cI(n,g))};
function Po(e,n){let s=Kd()?.[e];return typeof s==="object"&&s!==null&&Object.entries(s).some(([r,g])=>g===!0&&n.includes(r))};
function fjo(e){return a.CLAUDE_CODE_BASALT_COVE||Po("basalt_cove",e)};
var xo="tengu_thrifty_sonic";
function Co(){let e=M9(rt()),n=Be(e),s=ny(n,"thrifty_sonic",e);if(s===!1)return"none";if(KSe(n)||Ge(n)||Kd()?.[xo]===!0||s)return"forced";return SWt(e)?"cohort":"none"};
var To="tengu_cozy_teapot";
function Ro(e){return e==="strict"||e==="relaxed"?e:void 0};
function qr(){return Ro(Kd()?.[To])??(Ge(Be(M9(rt())))?"relaxed":void 0)??Ro(lo(To,null))??"strict"};
var Ft="tengu_willow_tern";
function hjo(e){return nj("amber_astrolabe",Be(e),e,a.CLAUDE_CODE_AMBER_ASTROLABE||void 0)};
function yjo(e){return nj("bison_cairn",Be(e),e,a.CLAUDE_CODE_BISON_CAIRN)};
function _jo(e){return nj("larch_cistern",Be(e),e,a.CLAUDE_CODE_LARCH_CISTERN||void 0)};
function n6r(){let e=Kd()?.[Ft];if(typeof e==="boolean")return e;if(e!==void 0){let n=Ae();if(!n.unusableWritingOverrideTold)n.unusableWritingOverrideTold=!0,t(`willow_tern: ignoring non-boolean clientData ${Ft} value of type ${typeof e}`)}return};
function Sjo(e){if(a.CLAUDE_CODE_WILLOW_TERN)return!0;let n=n6r();if(n!==void 0)return n;if(e===void 0)return!1;let s=Be(e);if(KSe(s))return!0;if(ny(s,"opus_5_prompt_bundle",e)!==!0)return!1;return k(Ft,!1)};
function Yr(e){let n=Be(e),s=ny(n,"lean_prompt",e);if(s!==void 0)return!s;if(jSe(e)||n==="claude-mythos-5")return!1;if(n.includes("claude-3-")||n.includes("haiku")||n.includes("sonnet")||n==="claude-opus-4-0"||n==="claude-opus-4-1"||n==="claude-opus-4-5"||n==="claude-opus-4-6"||n==="claude-opus-4-7")return!0;return!od()};
function AG(e){let n=Ae();return XQ()?n.leanPromptCompiledOnly(e):n.leanPrompt(e)};
function Ao(e){if(!e)return!1;if(Le(a.CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT))return!0;if(gs(a.CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT))return!1;if(!Yr(e))return!0;if(k("tengu_velvet_tide",!1))return!0;return Po("simple_system_prompt",Be(e))};
var Xr="breezy_horizon";
function M9(e){if(e===void 0)return;let n=Ae();return XQ()?n.modelForPromptCompiledOnly(e):n.modelForPrompt(e)};
function Mo(e){let n=a.CLAUDE_CODE_BREEZY_HORIZON;if(gs(n))return e;let s=Jm(e),r=Kd()?.[Xr],g=n??(typeof r==="object"&&r!==null?Object.entries(r).find(([A])=>A===s)?.[1]:void 0);if(g===void 0)return e;let h=n!==void 0?"env":"client_data";if(typeof g!=="string"||!Zr(g))return t(`[breezy_horizon] ${h}: ignoring ${String(g)} for ${s}: not a model id`,{level:"warn"}),e;let b=Jm(g);if(b===s){if(!qj(wu(g)))t(`[breezy_horizon] ${h}: ${g} names ${s} itself, so it maps nothing`,{level:"warn"});return e}let E=Ae().promptModelSwapsLogged;if(!E.has(e))E.add(e),i("tengu_breezy_horizon",{from_model:Et(s),to_model:Et(b),source:c(h)});return g};
function Zr(e){return Moe(e)||!/\s/.test(e)&&jSe(e)||qj(wu(e))};
class vo{bashFirstSessionAssignment=is(Co);bashFirstSessionAssignmentCompiledOnly=is(Co);bashFirstSteerVariant=is(qr);leanPrompt=is(Ao);leanPromptCompiledOnly=is(Ao);modelForPrompt=is(Mo);modelForPromptCompiledOnly=is(Mo);delegationCostsFirst=is(bo);delegationCostsFirstCompiledOnly=is(bo);promptModelSwapsLogged=new Set;unusableWritingOverrideTold=!1};
var ei=new V(()=>new vo);
function Ae(){return ei.of(U().host)};
return {Ir,Tyn,Ge,Dr,Nr,Lr,Br,Hr,go,nj,fo,djo,pjo,jSe,mYn,bo,Po,fjo,xo,Co,To,Ro,qr,Ft,hjo,yjo,_jo,n6r,Sjo,Yr,AG,Ao,Xr,M9,Mo,Zr,vo,ei,Ae};
}
function module10(imports){
const a=imports["a"];
const Ce=imports["Ce"];
const Kd=imports["Kd"];
const k=imports["k"];
const Be=imports["Be"];
const rt=imports["rt"];
function o(){let e=Kd()?.pewter_owl_model;if(typeof e==="string"&&e!=="")return e;return k("tengu_pewter_owl_model","")};
function r(e){if(a.CLAUDE_CODE_PEWTER_OWL!==void 0)return a.CLAUDE_CODE_PEWTER_OWL;if(Ce())return!1;let t=o();if(t!==""&&!Be(rt()).includes(t))return!1;return k(`tengu_${e}`,!1)||Kd()?.[e]===!0};
function nSe(){if(a.CLAUDE_CODE_PEWTER_OWL_TOOL!==void 0)return a.CLAUDE_CODE_PEWTER_OWL_TOOL;return r("pewter_owl_tool")};
return {o,r,nSe};
}
function module11(imports){
const Be=imports["Be"];
const nj=imports["nj"];
const a=imports["a"];
const AM=imports["AM"];
const djo=imports["djo"];
const pjo=imports["pjo"];
const fjo=imports["fjo"];
const ex=imports["ex"];
const nSe=imports["nSe"];
const AG=imports["AG"];
var fao=[AM,djo,pjo];
function pao(e,n){return fao.some((r)=>r(e,n))};
function mao(e,n){if(!AM(e,n))return!1;return!(ex.isBriefEnabled()||nSe())};
var gao="Before you start, say in a line what you're about to do; brief updates while you work help the user follow along. Close with a short recap that stands on its own \u2014 what you found, what you did, and what's next \u2014 so a reader who only sees the last message has the full picture.";
function hao(e){let n=Be(e);if(nj("turn_updates",n,e,a.CLAUDE_CODE_TURN_UPDATES))return gao;if(pao(n,e)||fjo(n)){let r=mao(n,e);return`# Communicating with the user

${r?"Your text output is what the user reads; they usually can't see your thinking or the raw tool results.":"Your text output is what the user reads between tool calls; they usually can't see your thinking or the raw tool results."} Write it for a teammate who stepped away and is catching up, not for a log file: they don't know the codenames or shorthand you created along the way, and they didn't watch your process unfold. Before your first tool call, say in a sentence what you're about to do; while working, give brief updates when you find something load-bearing or change direction.${r?`

Text you write between tool calls may not be shown to the user. Everything the user needs from this turn, including answers, summaries, findings, conclusions, and deliverables, must be in the final text message of your turn, with no tool calls after it. Keep text between tool calls to brief status notes. If something important appeared only mid-turn or in your thinking, restate it in that final message.`:""}

Lead with the outcome. Your first sentence after finishing should answer "what happened" or "what did you find": the thing the user would ask for if they said "just give me the TLDR." Supporting detail and reasoning come after, for readers who want them.

Being readable and being concise are different things, and readable matters more. If the user has to reread your summary or ask you to explain, any time saved by brevity is gone. The way to keep output short is to be selective about what you include (drop details that don't change what the reader would do next), not to compress the writing into fragments, abbreviations, arrow chains like \`A \u2192 B \u2192 fails\`, or jargon. What you do include, write in complete sentences with the technical terms spelled out. Don't make the reader cross-reference labels or numbering you invented earlier; say what you mean in place.

Match the response to the question: a simple question gets a direct answer in prose, not headers and sections. Use tables only for short enumerable facts, with explanations in the surrounding prose rather than the cells. Calibrate to the user: a bit tighter for an expert, more explanatory for someone newer.

Write code that reads like the surrounding code: match its comment density, naming, and idiom.
Only write a code comment to state a constraint the code itself can't show, never to say where it came from, what the next line does, or why your change is correct; that's you talking to the reviewer, not the next reader, and it's noise the moment the change merges.`}if(AG(e))return"Write code that reads like the surrounding code: match its comment density, naming, and idiom.";return`# Text output (does not apply to tool calls)
Assume users can't see most tool calls or thinking \u2014 only your text output. Before your first tool call, state in one sentence what you're about to do. While working, give short updates at key moments: when you find something, when you change direction, or when you hit a blocker. Brief is good \u2014 silent is not. One sentence per update is almost always enough.

Don't narrate your internal deliberation. User-facing text should be relevant communication to the user, not a running commentary on your thought process. State results and decisions directly, and focus user-facing text on relevant updates for the user.

When you do write updates, write so the reader can pick up cold: complete sentences, no unexplained jargon or shorthand from earlier in the session. But keep it tight \u2014 a clear sentence is better than a clear paragraph.

End-of-turn summary: one or two sentences. What changed and what's next. Nothing else.

Match responses to the task: a simple question gets a direct answer, not headers and sections.

In code: default to writing no comments. Never write multi-paragraph docstrings or multi-line comment blocks \u2014 one short line max. Don't create planning, decision, or analysis documents unless the user asks for them \u2014 work from conversation context, not intermediate files.`};
return {communication:hao};
}
export function createCommunicationPrompt287(ports){
const m0=module0({"a":ports["environment"],"cL":ports["canonicalRoot"],"xa":ports["catalogEntry"],"He":ports["provider"]});
const m1=module1({"n":ports["surface"],"Ut":ports["diskless"],"Kwt":ports["derivedSurface"]});
const m2=module2({"CTn":m1["CTn"],"ny":m0["ny"]});
const m3=module3({});
const m4=module4({"QZ":m3["QZ"]});
const m5=module5({});
const m6=module6({"bn":m5["bn"],"S":m5["S"],"ter":ports["clientDataRecord"],"Xr":ports["servedOwner"],"Ct":m4["Ct"],"Be":ports["behavior"],"ko":ports["memoOwner"],"k":ports["feature"],"xa":ports["catalogEntry"],"MSt":m4["MSt"]});
const m7=module7({});
const m8=module8({});
const m9=module9({"ny":m0["ny"],"KSe":m2["KSe"],"Be":ports["behavior"],"k":ports["feature"],"CTn":m1["CTn"],"ter":ports["clientDataRecord"],"Fn":m4["Fn"],"rt":ports["mainModel"],"ko":ports["memoOwner"],"q":ports["sessionId"],"i":ports["event"],"c":m5["c"],"Et":m6["Et"],"a":ports["environment"],"Kd":m6["Kd"],"V":m7["V"],"is":ports["memoize"],"XQ":m6["XQ"],"SWt":m6["SWt"],"lo":m6["lo"],"Le":m8["Le"],"gs":m8["gs"],"od":m0["od"],"Jm":m6["Jm"],"Moe":m6["Moe"],"qj":m4["qj"],"wu":m4["wu"],"t":ports["debug"],"cI":m4["cI"],"U":ports["execution"]});
const m10=module10({"a":ports["environment"],"Ce":ports["nonInteractive"],"Kd":m6["Kd"],"k":ports["feature"],"Be":ports["behavior"],"rt":ports["mainModel"]});
const m11=module11({"Be":ports["behavior"],"nj":m9["nj"],"a":ports["environment"],"AM":m2["AM"],"djo":m9["djo"],"pjo":m9["pjo"],"fjo":m9["fjo"],"ex":ports["brief"],"nSe":m10["nSe"],"AG":m9["AG"]});
return {...m11,modelPolicyOwner:m9.Ae,delegationCostsFirst:m9.mYn,modelForPrompt:m9.M9,lean:m9.AG,surface:ports.surface,sendUserMessageEnabled:m10.nSe,setCapabilityLookup:m0.I9o,setFeatureGateLookup:m0.O9o,promptPolicy:{reducedDelegationModel:m9.Tyn,autonomyModel:m9.hjo,deliveringWorkModel:m9.yjo,correctionsModel:m9._jo,willowModel:m9.Sjo,writingOverride:m9.n6r,deliveringWorkContext:m2.KSe,autonomyContext:m2.AM,cachedFeature:m6.lo}};
}
