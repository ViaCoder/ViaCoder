/** Pinned official 2.1.287 public policy owner and complete FGr lifecycle. */
import {oc as hasComplianceTaint,wNo as resetComplianceTaints} from '../../vendor/official-files-api/taints.js'
import {getOfficialPolicyPrincipal286} from './officialIdentityBindings286.js'
import {getPolicyPublicClient287} from './publicBindings287.js'
import {getPolicyController287,getPolicyControllerFactory287} from './controllerBindings287.js'
import {resetPolicyProtocolForTesting} from './protocol.js'
import type {PolicyLimitsResponse} from './types.js'
import type {PolicyStartupServices287} from './officialPublic287/controller.js'

export {observePolicyApiResponse287,notifyPolicyModelSuccess287} from './controllerEvents287.js'
export {getPolicyController287} from './controllerBindings287.js'

export function hasPolicyComplianceTaint(regime:string):boolean {
 getPolicyPublicClient287().Z_()
 return hasComplianceTaint(regime)
}
export function getPolicyHeldStartState287(){
 const getter=(import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearLifecycleSource287('chunk-chme4mqf.js','H5o')
 return (getter as () => ReturnType<ReturnType<typeof getPolicyPublicClient287>['mts']>)()
}
export function subscribePolicyHeldStart287(listener:()=>void):()=>void {
 return getPolicyPublicClient287().xBe(listener)
}
export function isCommandPolicyAllowed287(policy:string):boolean{return getPolicyPublicClient287().gts(policy)}
export function isPolicyAllowed(policy:string):boolean{return getPolicyPublicClient287().on(policy)}
export function isPolicyLimitsEligible():boolean{return getPolicyPublicClient287().y_()}
export function getPolicyLimitsPrincipal286(){return getOfficialPolicyPrincipal286().xq()}
export function getPublishedClientDataPolicyRestrictions287():PolicyLimitsResponse['restrictions']|null {
 return getPolicyPublicClient287().Z_()?.restrictions??null
}
export function initializePolicyLimitsLoadingPromise():void {getPolicyController287().initializeLoadingPromise()}
export async function waitForPolicyLimitsToLoad():Promise<void> {await getPolicyControllerFactory287().GXe()}
export function loadPolicyLimits(options?:{startupAwaited?:boolean}):Promise<void> {return getPolicyController287().load(options)}
export function refreshPolicyLimits(options?:{observedBoundary?:boolean}):Promise<void> {return getPolicyController287().refresh(options)}
export function clearPolicyLimitsCache():Promise<void> {return getPolicyController287().clearCache()}
export function startBackgroundPolling():void {getPolicyController287().startBackgroundPolling()}
export function stopBackgroundPolling():void {getPolicyController287().stopBackgroundPolling()}
/** Original composition and host-prefetch admission, without a private backend. */
export function composePolicyStartupServices287(services:PolicyStartupServices287):void {getPolicyControllerFactory287().$Gr(services)}
export function primePolicyStorage287(storage:PolicyStartupServices287['storageV5']):Promise<void> {return getPolicyControllerFactory287().NGr(storage)}
export function awaitPolicyColdStart287():Promise<'completed'|'timed_out'|'skipped'> {return getPolicyControllerFactory287().GXe()}
export function requestPolicyLimitsAtStartup287():void {getPolicyControllerFactory287().UXn()}

/** Isolated fixture reset only; production clear/stop is the original class. */
export function _resetPolicyLimitsForTesting():void {
 getPolicyController287().stop()
 const state=getOfficialPolicyPrincipal286().p(),native=getPolicyPublicClient287()
 state.lastFetchOutcome=null;state.settledWithoutVerdictFor=null
 state.hipaaEvidence={seen:[],incomplete:false,ruledOut:[]};state.hipaaSeenUnreadable=false
 state.hipaaEvidenceLoaded=false;state.hintedTaints=[];state.hintedDeniedKeys=[];state.hintedEnforcedKeys=[]
 native.nSn();native.$ht();resetComplianceTaints();resetPolicyProtocolForTesting()
}
