import * as nodeOs from 'node:os'
import * as nodePath from 'node:path'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {LocalJSXCommandContext,LocalCommandResult} from '../../../types/command.js'
import {createPublicUltrareviewClient287,type ReviewOriginalClient287,type ReviewContext287,type ReviewConsentOwner287,type ReviewLaunchOptions287,type ReviewLaunchResult287} from './native.js'
import provenance from './provenance.json'
export type {ReviewContext287,ReviewBillingGate287,ReviewLaunchResult287,ReviewConsentDialogProps287,ReviewLaunchOptions287,ReviewScope287} from './native.js'
/** These clients share the canonical credential/request/repository/task actors.
 * Only the three previously absent public review modules are instantiated here. */
let client287:ReviewOriginalClient287|undefined
function readBinding(file:string,name:string):unknown {
 if(file==='os')return Reflect.get(nodeOs,name)
 if(file==='path')return Reflect.get(nodePath,name)
 const value=getOriginalModsLifecycle287().clearSourceModule287(file)[name]
 if(value===undefined)throw Error('Original public review import missing: '+file+':'+name)
 return value
}
export function getPublicUltrareviewClient287():ReviewOriginalClient287 {
 return client287??=createPublicUltrareviewClient287(readBinding,Object.fromEntries(provenance.modules.map(m=>[m.file,m.bindings])))
}
export function isPublicUltrareviewEligible287():boolean {
 const original=readBinding('chunk-09m4fzsj.js','_0')
 if(typeof original!=='function')throw Error('Original ultrareview eligibility is not callable')
 return original()
}
/** REPL already carries SVe's functions. Other public contexts borrow that same
 * AppState accessor; no module/session-global consent flag or synthetic state. */
function hasReviewConsentOwner287<T extends LocalJSXCommandContext>(context:T):context is T & ReviewConsentOwner287 {
 return typeof Reflect.get(context,'isUltrareviewOverageConfirmed')==='function'&&typeof Reflect.get(context,'markUltrareviewOverageConfirmed')==='function'
}
export function withReviewConsentOwner287<T extends LocalJSXCommandContext>(context:T):T & ReviewConsentOwner287 {
 if(hasReviewConsentOwner287(context))return context
 const fn=readBinding('chunk-0tt5bg1g.js','SVe')
 if(typeof fn!=='function')throw Error('Original review AppState accessor missing')
 const accessor=fn as (read:T['getAppState'],write:T['setAppState'])=>ReviewConsentOwner287
 const consent=accessor(context.getAppState,context.setAppState)
 const view:T & ReviewConsentOwner287=Object.create(context)
 Object.defineProperties(view,{isUltrareviewOverageConfirmed:{value:consent.isUltrareviewOverageConfirmed,enumerable:true},markUltrareviewOverageConfirmed:{value:consent.markUltrareviewOverageConfirmed,enumerable:true}})
 return view
}
export async function launchPublicUltrareview287(args:string,context:LocalJSXCommandContext,options:Omit<ReviewLaunchOptions287,'context'|'overageConfirmed'|'markOverageConfirmed'>):Promise<ReviewLaunchResult287>{
 const view=withReviewConsentOwner287(context)
 return getPublicUltrareviewClient287().core().TMe(args,{...options,context:view,overageConfirmed:view.isUltrareviewOverageConfirmed(),markOverageConfirmed:view.markUltrareviewOverageConfirmed})
}
/** Existing text host injection is retained. Without one, use the complete
 * original personal-account client, whose own _0/preflight/consent gates run. */
export async function callPublicUltrareviewText287(args:string,context:LocalJSXCommandContext):Promise<LocalCommandResult>{
 const host=context.commandRuntime?.ultrareview
 const view=withReviewConsentOwner287(context)
 if(!host)return getPublicUltrareviewClient287().text().m(args,view)
 if(!isPublicUltrareviewEligible287())return {type:'text',value:'Ultrareview is currently unavailable.'}
 const core=getPublicUltrareviewClient287().core(),parsed=core.oRt(args)
 const result=await host.launch(parsed.scopeArgs,{confirm:true,singlePass:true,withholdOverageConsent:true,applyFixes:parsed.applyFixes,postReview:parsed.postReview===true,context:view,invocation:'/ultrareview'})
 switch(result.status){
 case 'launched':return {type:'query',value:result.message,prompt:core.iRt(parsed.applyFixes)}
 case 'needs-confirm':return {type:'text',value:`${result.body} /ultrareview can't show the billing confirmation in this session. Run "claude ultrareview" from your terminal to consent and launch, or use /ultrareview in an interactive Claude Code session.`}
 case 'blocked':return {type:'text',value:result.actionUrl?`${result.message}\n  → ${result.actionUrl}`:result.message}
 case 'error':return {type:'text',value:result.message}
 }
}
