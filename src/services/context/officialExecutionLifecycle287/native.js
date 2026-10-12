// Original complete session switch and clear lifecycle closures.
import {randomUUID as builtin0} from "node:crypto";
function module0(imports){

function Mn(t){return t.normalize("NFC")};
return {Mn};
}
function module1(imports){

var s=globalThis.process?.getBuiltinModule?.("async_hooks");
var wKt=s?(e)=>s.AsyncResource.bind(e):(e)=>e;
function Me(){let e=new Set;return{subscribe(n){let r=wKt(n);return e.add(r),()=>{e.delete(r)}},emit(...n){let r;for(let o of e)try{o(...n)}catch(i){(r??=[]).push(i)}if(r)throw r.length===1?r[0]:AggregateError(r,"Signal listener(s) threw")},clear(){e.clear()}}};
return {s,wKt,Me};
}
function module2(imports){
const n=imports["n"];
const Mn=imports["Mn"];
const Me=imports["Me"];
const $fe=imports["$fe"];
var an="NoProjectDirectoryError";
class gR extends Error{name=an;constructor(){super("This session has no working directory.")}};
function Es(e){let{project:t}=e;if(t===null)throw new gR;return t};
function O(e,t){let o=t.originalCwd??e?.originalCwd,r=t.projectRoot??e?.projectRoot,i=t.cwd??e?.cwd;if(o===void 0&&r===void 0&&i===void 0)return null;if(o===void 0||r===void 0||i===void 0)throw new gR;return{originalCwd:Mn(o),projectRoot:Mn(r),cwd:Mn(i)}};
class Tt{#e;#t=new WeakMap;constructor(e){this.#e=e}peek(e){return this.#t.get(e.root)}of(e){let t=e.root,o=this.#t.get(t);if(o!==void 0)return o;let r=this.#e();return this.#t.set(t,r),r}drop(e){this.#t.delete(e.root)}};
function gn(){let e=n();return e.requestJournal.promptIndex()>0||e.sessionScratch.chromeAvailabilityStagesLogged().size>0};
function zQr(e={}){let t=n(),o=t.id;t.sessionScratch.forgetPlanSlug(o),t.identity.replaceProjectDir(null);let r=gn();t.requestJournal.replacePromptIndex(0),t.requestJournal.replaceLastCancelledAPIMessageId(null),t.requestJournal.clearLastMainThreadRequest(),t.requestJournal.replaceLastMainRequestId(void 0),t.modelSelection.forgetRefusalFallbackOccurred(),t.sessionFlags.forgetPendingContextCompacted(),t.sessionScratch.replacePendingBranchLinks(),t.sessionScratch.replaceChromeAvailabilityStagesLogged(r);let i=vn(),s=$fe();return t.costLedger.scopeTo(s),t.update({id:s,...e.setCurrentAsParent&&{parentId:o}}),mn(t,"clear",i),t.id};
function mn(e,t,o){let r=yn.of(e);if(o)r.emit(e.id,t,o);else r.emit(e.id,t)};
function Sn(e){kn.of(e).emit(Es(e).originalCwd)};
function ay(e,t,o=null,r){let i=n(),s=r?O(i.project,bn(r)):r,a,u=i.parentId;if(i.id!==e){if(i.sessionScratch.forgetPlanSlug(i.id),i.requestJournal.replaceLastCancelledAPIMessageId(null),i.requestJournal.clearLastMainThreadRequest(e),t!=="fork")i.requestJournal.replaceLastMainRequestId(void 0);i.modelSelection.forgetRefusalFallbackOccurred(),i.sessionFlags.forgetPendingContextCompacted(),i.sessionScratch.replacePendingBranchLinks(),i.sessionScratch.replaceChromeAvailabilityStagesLogged(gn()),a=vn(),u=void 0}if(i.identity.replaceProjectDir(o),i.update({id:e,parentId:u,...s!==void 0&&{project:s}}),mn(i,t,a),r?.originalCwd!==void 0)Sn(i)};
function vn(){let e=n(),t=e.modelSelection.refusalFallbackModelLatch();if(e.modelSelection.unlatchRefusalFallbackModel("session_transition"),!t||e.modelSelection.mainLoopModelOverride()!==t.fallbackModel)return;return e.modelSelection.overrideMainLoopModel(t.previousOverride),{appStateModel:t.previousAppStateModel,forSessionValue:t.previousModelForSession,overrideValue:t.previousOverride,restoredToExplicitOverride:t.previousOverride!==void 0,fallbackModel:t.fallbackModel}};
var yn=new Tt(()=>Me());
function Od(e){return yn.of(n()).subscribe(e)};
function bn(e){return{originalCwd:e.originalCwd?.normalize("NFC"),projectRoot:e.projectRoot?.normalize("NFC"),cwd:e.cwd?.normalize("NFC")}};
function l3t(e){let t=n();if(t.update({project:bn(e)}),e.originalCwd!==void 0)Sn(t)};
var kn=new Tt(()=>Me());
function qQr(e){return kn.of(n()).subscribe(e)};
return {an,gR,Es,O,Tt,gn,zQr,mn,Sn,ay,vn,yn,Od,bn,l3t,kn,qQr};
}
export function createExecutionLifecycle287(ports){
const m0=module0({});
const m1=module1({});
const m2=module2({"n":ports["executionContext"],"Mn":m0["Mn"],"Me":m1["Me"],"$fe":builtin0});
return {"NoProjectDirectoryError":m2.gR,"switchSession":m2.ay,"clearSession":m2.zQr,"subscribeSessionSwitch":m2.Od,"subscribeOriginalCwdChange":m2.qQr,"requireProject":m2.Es,"updateProject":m2.l3t};
}
