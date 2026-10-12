import {getPublicUltrareviewClient287,isPublicUltrareviewEligible287} from './officialPublicReview287/runtime.js'
import type {LocalJSXCommandContext} from '../../types/command.js'
/** Complete original _0 → zut/lYe: first-party, remote environment, OAuth,
 * bridge/telemetry fallback and actual feature config all remain source-owned. */
export function isUltrareviewEnabled():boolean {return isPublicUltrareviewEligible287()}
/** Capability introspection only, not an entitlement grant or visibility gate. */
export function hasUltrareviewLaunchHost(context?:LocalJSXCommandContext):boolean {
 if(typeof context?.commandRuntime?.ultrareview?.launch==='function')return true
 return typeof getPublicUltrareviewClient287().core().TMe==='function'
}
