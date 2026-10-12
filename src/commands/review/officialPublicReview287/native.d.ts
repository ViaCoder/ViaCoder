import type React from 'react'
import type {ContentBlockParam} from '@anthropic-ai/sdk/resources/messages.js'
import type {LocalCommandResult,LocalJSXCommandContext,LocalJSXCommandOnDone} from '../../../types/command.js'
export interface ReviewConsentOwner287 {isUltrareviewOverageConfirmed():boolean;markUltrareviewOverageConfirmed():void}
export type ReviewContext287=LocalJSXCommandContext & ReviewConsentOwner287
export type ReviewScope287={mode:'pr';prNumber:string;repo:string;host:string;hadArg:boolean;diffFiles?:number;diffLines?:number}|{mode:'branch';headBranch:string;baseBranch:string;mergeBaseSha:string;diffStat:string;hadArg:boolean;diffFiles?:number;diffLines?:number;noMergeBase?:'first_commit'|'unrelated_history'|'base_ref_missing';instructions?:string}
export type ReviewBillingGate287={kind:'proceed';billingNote:string;githubLogin?:string|null;preflightUnavailable?:boolean}|{kind:'needs-confirm';body:string;billingNote:string;githubLogin:string|null;lowCreditsNote:string|null}|{kind:'blocked';reason:string;message:string;actionUrl:string|null}
export type ReviewLaunchResult287={status:'launched';message:string;sessionId?:string;sessionUrl?:string;taskId?:string;title?:string;billingNote?:string;postReviewTo?:{repo:string;prNumber:string};postIgnored?:boolean;lowCreditsNote?:string}|{status:'needs-confirm';body:string;billingNote?:string}|{status:'blocked';message:string;actionUrl?:string|null;reason?:string}|{status:'error';message:string;reason?:string;gate_blocker?:string;entitlement_blocker?:string}
export interface ReviewLaunchOptions287 {confirm:boolean;singlePass?:boolean;withholdOverageConsent?:boolean;confirmsBeforeLaunch?:boolean;personRanTheCommand?:boolean;applyFixes?:boolean;postReview?:boolean;overageConfirmed:boolean;markOverageConfirmed():void;context:ReviewContext287;invocation:string;skipTaskRegistration?:boolean}
export interface ReviewLaunchOutcome287 {launched:boolean;blocks:ContentBlockParam[];sessionId?:string;sessionUrl?:string;taskId?:string;title?:string}
export interface ReviewOriginalCore287 {
 oRt(args:string):{scopeArgs:string;applyFixes:boolean;postReview?:boolean}
 aMn(args:string,invocation?:string,options?:{confirmsBeforeLaunch?:boolean;personRanTheCommand?:boolean;suppressSucceededRecoveryEvent?:boolean;suppressOfferedRecoveryEvent?:boolean;accessProbeBudgetMs?:number}):Promise<{ok:true;scope:ReviewScope287}|{ok:false;reason:string;error:string}>
 lMn(options:{overageConfirmed:boolean;credentials?:ReviewContext287['credentials'];skipLowCreditsNote?:boolean}):Promise<ReviewBillingGate287>
 cMn(scope:ReviewScope287,context:ReviewContext287,billingNote:string,options?:{invocation?:string;skipTaskRegistration?:boolean;applyFixesOnComplete?:boolean;postReviewToPR?:boolean;findingsArriveInSession?:boolean;signal?:AbortSignal}):Promise<ReviewLaunchOutcome287|null>
 TMe(args:string,options:ReviewLaunchOptions287):Promise<ReviewLaunchResult287>
 iRt(applyFixes:boolean,instructions?:string):string
}
export interface ReviewConsentDialogProps287 {subtitle?:string|null;body?:string;scope:ReviewScope287;postOption?:{githubLogin:string|null;preferPost:boolean}|null;onProceed(signal:AbortSignal,options:{postToPR:boolean}):Promise<void>;onCancel():void}
export interface ReviewOriginalClient287 {core():ReviewOriginalCore287;interactive():{Oo(onDone:LocalJSXCommandOnDone,context:ReviewContext287,args:string,invokedName?:string):Promise<React.ReactNode>;te:React.ComponentType<ReviewConsentDialogProps287>};text():{m(args:string,context:ReviewContext287,invokedName?:string):Promise<LocalCommandResult>}}
export function createPublicUltrareviewClient287(readBinding:(file:string,name:string)=>unknown,bindings:Record<string,Record<string,{file:string;name:string}>>):ReviewOriginalClient287
