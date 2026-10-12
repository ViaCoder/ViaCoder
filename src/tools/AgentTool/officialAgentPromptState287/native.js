// Generated complete raw state declarations; no default execution host.
import {AsyncLocalStorage} from 'node:async_hooks'
function module0(imports){
const n=imports["n"];
class V{#e;#t=new WeakMap;constructor(e){this.#e=e}of(e){let t=this.#t.get(e);if(t!==void 0)return t;let o=this.#e();return this.#t.set(e,o),o}};
class Tt{#e;#t=new WeakMap;constructor(e){this.#e=e}peek(e){return this.#t.get(e.root)}of(e){let t=e.root,o=this.#t.get(t);if(o!==void 0)return o;let r=this.#e();return this.#t.set(t,r),r}drop(e){this.#t.delete(e.root)}};
class je{#e=!1;#t=null;#n=!1;#o=void 0;#r=!1;#i=!1;#l=!1;#d=!1;#s=void 0;#u=!1;#a=!1;#c=null;#p=null;#f=new Map;#h="cli";#m="fresh";#g=void 0;#k=!1;#v=!1;#b=[];#S=!1;#y=!1;#x=!1;#C=new Set;#R=!1;#T="none";#A=!1;#P=!1;#M=!1;#w=!1;#L=void 0;#I=void 0;#O=void 0;#F=!1;#E=!1;#D=!1;#H=null;#B=!0;#j=null;#U=!1;#_=null;#q=!1;#W=!1;#G={};#N=null;#K="none";#V=void 0;isInteractive(){return this.#e}replaceIsInteractive(e){this.#e=e}printOutputFormat(){return this.#t}replacePrintOutputFormat(e){this.#t=e}thinkingDisplayExplicit(){return this.#n}replaceThinkingDisplayExplicit(e){this.#n=e}permissionPromptToolName(){return this.#o}replacePermissionPromptToolName(e){this.#o=e}hasStreamingInput(){return this.#r}replaceHasStreamingInput(e){this.#r=e}singleShotPrintSession(){return this.#i}replaceSingleShotPrintSession(e){this.#i=e}printInputClosed(){return this.#l}markPrintInputClosed(){this.#l=!0}modelOverrideOptOutForSession(){return this.#d}replaceModelOverrideOptOutForSession(e){this.#d=e}rendererMode(){return this.#s}replaceRendererMode(e){this.#s=e}strictToolResultPairing(){return this.#u}replaceStrictToolResultPairing(e){this.#u=e}restrictedSession(){return this.#a}replaceRestrictedSession(e){this.#a=e}workspaceRestrictionState(){return this.#c}replaceWorkspaceRestrictionState(e){this.#c=e}replaceWorkspaceRestrictionUnsubscribe(e){this.#p?.(),this.#p=e}restrictedWorkspaceRoots(){return this.#f}addRestrictedWorkspaceRoot(e,t){this.#f.set(e,t)}clearRestrictedWorkspaceRoots(){this.#f=new Map}clientType(){return this.#h}replaceClientType(e){this.#h=e}sessionStartType(){return this.#m}replaceSessionStartType(e){this.#m=e}questionPreviewFormat(){return this.#g}replaceQuestionPreviewFormat(e){this.#g=e}extendedQuestionsEnabled(){return this.#k}replaceExtendedQuestionsEnabled(e){this.#k=e}questionOptionDescriptionsOptional(){return this.#v}replaceQuestionOptionDescriptionsOptional(e){this.#v=e}replConfigArgv(){return this.#b}replaceReplConfigArgv(e){this.#b=e}userMsgOptIn(){return this.#S}replaceUserMsgOptIn(e){this.#S=e}searchToolsOptIn(){return this.#y}replaceSearchToolsOptIn(e){this.#y=e}todoToolsOptIn(){return this.#x}replaceTodoToolsOptIn(e){this.#x=e}toolsOmittedByLaunchList(){return this.#C}replaceToolsOmittedByLaunchList(e){this.#C=e}wizardOperatorToolsEnabled(){return this.#R}replaceWizardOperatorToolsEnabled(e){this.#R=e}pollEventIngress(){return this.#T}markPollEventIngress(e){this.#T=e}ownEventDeliveryRequested(){return this.#A}markOwnEventDeliveryRequested(){this.#A=!0}sdkAgentProgressSummariesEnabled(){return this.#P}replaceSdkAgentProgressSummariesEnabled(e){this.#P=e}sessionPersistenceDisabled(){return this.#M}replaceSessionPersistenceDisabled(e){this.#M=e}diskless(){return this.#w}replaceDiskless(e){this.#w=e}ccrSessionUrl(){return this.#L}replaceCcrSessionUrl(e){this.#L=e}ccrDerivedSurface(){return this.#I}replaceCcrDerivedSurface(e){this.#I=e}toolsMachine(){return this.#O}replaceToolsMachine(e){this.#O=e}sessionBypassPermissionsMode(){return this.#F}replaceSessionBypassPermissionsMode(e){this.#F=e}disableSlashCommands(){return this.#E}replaceDisableSlashCommands(e){this.#E=e}disableFileMentions(){return this.#D}replaceDisableFileMentions(e){this.#D=e}sessionUploadsDir(){return this.#H}replaceSessionUploadsDir(e){this.#H=e}mayForwardHomeSettings(){return this.#B}replaceMayForwardHomeSettings(e){this.#B=e}homeSettingsHostConsent(){return this.#j}replaceHomeSettingsHostConsent(e){this.#j=e}scheduledTasksEnabled(){return this.#U}replaceScheduledTasksEnabled(e){this.#U=e}initJsonSchema(){return this.#_}replaceInitJsonSchema(e){this.#_=e}cliSessionConfigCarried(){return this.#q}replaceCliSessionConfigCarried(e){this.#q=e}forkRestrictedLaunchConfig(){return this.#W}replaceForkRestrictedLaunchConfig(e){this.#W=e}forkReplayLaunchConfig(){return this.#G}spareClaimState(){return this.#K}replaceSpareClaimState(e){this.#K=e}spareParkedAtMs(){return this.#V}replaceSpareParkedAtMs(e){this.#V=e}replaceForkReplayLaunchConfig(e){this.#G=e}projectConfigRoot(){return this.#N}replaceProjectConfigRoot(e){this.#N=e}reset(){this.#e=!1,this.#t=null,this.#K="none",this.#V=void 0,this.#n=!1,this.#o=void 0,this.#r=!1,this.#i=!1,this.#l=!1,this.#d=!1,this.#s=void 0,this.#u=!1,this.#a=!1,this.#c=null,this.replaceWorkspaceRestrictionUnsubscribe(null),this.#f=new Map,this.#h="cli",this.#m="fresh",this.#g=void 0,this.#k=!1,this.#v=!1,this.#b=[],this.#S=!1,this.#y=!1,this.#x=!1,this.#C=new Set,this.#R=!1,this.#T="none",this.#A=!1,this.#P=!1,this.#M=!1,this.#w=!1,this.#L=void 0,this.#I=void 0,this.#O=void 0,this.#F=!1,this.#E=!1,this.#D=!1,this.#H=null,this.#B=!0,this.#j=null,this.#U=!1,this.#_=null,this.#q=!1,this.#W=!1,this.#G={},this.#N=null}};
function U(){return n()};
function Neo(){return n().host.launchOptions.searchToolsOptIn()};
function Feo(e){n().host.launchOptions.replaceSearchToolsOptIn(e)};
function Ut(){return n().host.launchOptions.diskless()};
function Kwt(){return n().host.launchOptions.ccrDerivedSurface()};
function rKt(e){n().promptAssembly.forgetAllSections(),yR(e)};
function yR(e){n().promptAssembly.noteInvalidation(e)};

return {V,Tt,je,U,Neo,Feo,Ut,Kwt,rKt,yR};
}
function module1(imports){

function r(n){return n};
function c(n){return r(n)};

return {r,c};
}
function module2(imports){
const Tt=imports["Tt"];
const U=imports["U"];
const a=imports["a"];
const i=imports["i"];
const c=imports["c"];
const k=imports["k"];
const ter=imports["ter"];
var Ig="tengu_thistle_grebe";
class Ng{clientData=null;feature=null;registerClientData(e){let n=this.clientData;return this.clientData=e,n}registerFeature(e){let n=this.feature;return this.feature=e,n}};
var as=new Ng;
class Fg{modelSteerFloor=null;promptModel=void 0;latched=void 0;registerModelFloor(e){let n=this.modelSteerFloor;return this.modelSteerFloor=e,n}recordPromptModel(e){if(this.latched===void 0&&this.promptModel===void 0)this.promptModel=e}latch(e){this.latched=e}resetLatch(){this.latched=void 0,this.promptModel=void 0}};
var ZT=new Tt(()=>new Fg);
function ls(){return ZT.of(U())};
function Lg(e){return as.registerClientData(e)};
function Ug(e){return as.registerFeature(e)};
function Uqo(e){return ls().registerModelFloor(e)};
function Bqo(e){ls().recordPromptModel(e)};
function ss(e){return e==="default"||e==="no_nudges"||e==="counter_steer"?e:void 0};
function eR(e){let n=ss(a.CLAUDE_CODE_THISTLE_GREBE);if(n)return{steer:n,source:"env"};let r;try{r=ss(as.clientData?.()?.[Ig])}catch{}if(r)return{steer:r,source:"clientData"};let s=ss(as.feature?.(Ig,null));if(s)return{steer:s,source:"growthbook"};let{promptModel:g}=e;if(g!==void 0){let h=ss(e.modelSteerFloor?.(g));if(h)return{steer:h,source:"model"}}return{steer:"default",source:"default"}};
function FM(){let e=ls();if(e.latched!==void 0)return e.latched;let{steer:n,source:r}=eR(e);if(e.latch(n),n!=="default")i("tengu_subagent_steer_applied",{steer:c(n),source:c(r)});return n};
function jqo(){ls().resetLatch()};
function Kd(e){return ter(e)?.data??null};
Ug(k);
Lg(()=>Kd());
return {Ig,Ng,as,Fg,ZT,ls,Lg,Ug,Uqo,Bqo,ss,eR,FM,jqo,Kd};
}
function module3(imports){
const a=imports["a"];
const cL=imports["cL"];
const xa=imports["xa"];
var N={per_turn_effort:"tengu_per_turn_effort"};
function S(e){let t=N[e];if(t===void 0)return!0;return cL().featureGateLookup?.(t)===!0};
function ny(e,t,n){return zQe(t,e)??bzt(e,t,n)};
function bzt(e,t,n){if(cL().servedCapabilityLookup?.(t,[n,m(e)])===!0&&S(t))return!0;return L8r(e,t)?!0:void 0};
function L8r(e,t){return xa(m(e))?.capabilities.includes(t)};
function zQe(e,t){return N8r(t).get(e)};
function N8r(e){let t=new Map,n=a.CLAUDE_CODE_MODEL_CAPABILITIES;if(n===void 0)return t;let r=m(e);for(let s of n.split(";")){let _=s.indexOf("=");if(_!==-1){let l=s.slice(0,_).trim();if(l==="")continue;if(!(l.endsWith("*")?r.startsWith(l.slice(0,-1)):r===l))continue}for(let l of(_===-1?s:s.slice(_+1)).split(",")){let d=l.trim(),v=!d.startsWith("-");t.set(v?d:d.slice(1),v)}}return t};
function m(e){return e.replace(/\[1m\]/gi,"")};

return {N,S,ny,bzt,L8r,zQe,N8r,m};
}
function module4(imports){
const ny=imports["ny"];
const Be=imports["Be"];
const k=imports["k"];
var Ir="tengu_fennel_godwit";
function Tyn(e){if(e===void 0)return!1;if(ny(Be(e),"opus_5_prompt_bundle",e)!==!0)return!1;return!k(Ir,!1)};

return {Ir,Tyn};
}
function module5(imports){
const Uqo=imports["Uqo"];
const Tyn=imports["Tyn"];
const Bqo=imports["Bqo"];
const rKt=imports["rKt"];
const Akn=imports["Akn"];
const jqo=imports["jqo"];
function zV(e){rKt(e),Akn(),jqo()};
function hRt(e){Uqo((n)=>Tyn(n)?"no_nudges":void 0),Bqo(e)};

return {zV,hRt};
}
function module6(imports){
const r=imports["r"];
const V=imports["V"];
const U=imports["U"];
class D7n{#e=!1;#o=!1;#r=!1;#n;get backgroundTasksDisabled(){return this.#e}get unsandboxedCommandsDisabled(){return this.#o}get backgroundDeadlineDisabled(){return this.#r}get backgroundLaunchRule(){return this.#n}disableBackgroundTasks(){this.#e=!0}installBackgroundLaunchRule(e){if(!this.#e)throw Error("A background launch rule needs background tasks disabled first");if(typeof e.parameterDescription!=="string")throw Error("A background launch rule needs parameterDescription to be a string");if(this.#n!==void 0)throw Error("A background launch rule is already installed");this.#n=e}disableBackgroundDeadline(){this.#r=!0}disableUnsandboxedCommands(){this.#o=!0}};
var s=new V(()=>new D7n);
function xk(){return n.getStore()??s.of(U().host)};
var n=new r;
function FGo(e,o){return n.run(e,o)};

return {D7n,s,xk,n,FGo};
}
function module7(imports){
const D7n=imports["D7n"];
function G(e=new D7n){return e.disableBackgroundTasks(),e.disableUnsandboxedCommands(),e};

return {G};
}
export function createAgentPromptState287(ports){
const m0=module0({"n":ports["executionContext"]});
const m1=module1({});
const m2=module2({"Tt":m0["Tt"],"U":m0["U"],"a":ports["environment"],"i":ports["event"],"c":m1["c"],"k":ports["feature"],"ter":ports["clientDataRecord"]});
const m3=module3({"a":ports["environment"],"cL":ports["canonicalRoot"],"xa":ports["catalogEntry"]});
const m4=module4({"ny":m3["ny"],"Be":ports["behavior"],"k":ports["feature"]});
const m5=module5({"Uqo":m2["Uqo"],"Tyn":m4["Tyn"],"Bqo":m2["Bqo"],"rKt":m0["rKt"],"Akn":ports["unlatchStickyBetas"],"jqo":m2["jqo"]});
const m6=module6({"r":AsyncLocalStorage,"V":m0["V"],"U":m0["U"]});
const m7=module7({"D7n":m6["D7n"]});
return {"taskMode":m2.FM,"taskModeOwner":m2.ls,"readers":m2.as,"taskModeSlots":m2.ZT,"TaskModeOwner":m2.Fg,"TaskModeReaders":m2.Ng,"registerClientData":m2.Lg,"registerFeature":m2.Ug,"registerModelFloor":m2.Uqo,"recordPromptModel":m2.Bqo,"resetTaskModeLatch":m2.jqo,"preparePromptModel":m5.hRt,"invalidatePromptBoundary":m5.zV,"backgroundPolicy":m6.xk,"BackgroundPolicy":m6.D7n,"withBackgroundPolicy":m6.FGo,"disableServeBackground":m7.G,"LaunchOptions":m0.je,"searchToolsOptIn":m0.Neo,"replaceSearchToolsOptIn":m0.Feo,"diskless":m0.Ut,"derivedSurface":m0.Kwt};
}
