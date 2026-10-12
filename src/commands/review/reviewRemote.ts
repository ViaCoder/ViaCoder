import type {LocalJSXCommandContext} from '../../types/command.js'
import {getPublicUltrareviewClient287,withReviewConsentOwner287,launchPublicUltrareview287,type ReviewLaunchOptions287} from './officialPublicReview287/runtime.js'
export type {ReviewLaunchResult287 as ReviewLaunchResult,ReviewBillingGate287 as OverageGate} from './officialPublicReview287/native.js'
/** The original lMn/preflight owns billing; no second quota or consent cache. */
export function checkOverageGate(context:LocalJSXCommandContext){const view=withReviewConsentOwner287(context);return getPublicUltrareviewClient287().core().lMn({overageConfirmed:view.isUltrareviewOverageConfirmed(),credentials:view.credentials})}
export function confirmOverage(context:LocalJSXCommandContext):void{withReviewConsentOwner287(context).markUltrareviewOverageConfirmed()}
export function launchRemoteReview(args:string,context:LocalJSXCommandContext,options:Omit<ReviewLaunchOptions287,'context'|'overageConfirmed'|'markOverageConfirmed'>){return launchPublicUltrareview287(args,context,options)}
