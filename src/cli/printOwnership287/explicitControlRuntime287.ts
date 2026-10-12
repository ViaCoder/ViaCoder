/** Original 287 feedback, review and rating controls, borrowing canonical owners. */
import type {SDKControlRequest,SDKControlRequestInner} from '../../entrypoints/sdk/controlTypes.js'
import type {Message} from '../../types/message.js'
import type {SDKMessage} from '../../entrypoints/sdk/coreTypes.js'
import type {AppState} from '../../state/AppState.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {logEvent} from '../../services/analytics/index.js'
import {createPrintExplicitHelpers287} from './explicitHelpersNative287.js'
import {createPrintExplicitControlDispatcher287} from './print-explicit-control.native.js'

export type SubmitFeedback287=Extract<SDKControlRequestInner,{subtype:'submit_feedback'}>
export type UltrareviewLaunch287=Extract<SDKControlRequestInner,{subtype:'ultrareview_launch'}>
export type MessageRated287=Extract<SDKControlRequestInner,{subtype:'message_rated'}>

type SourceFunction287=(...args:any[])=>any
let missingHelperOwner287:ReturnType<typeof createPrintExplicitHelpers287>|undefined
/** Existing selected namespace ABI uses declaration names, not raw ESM aliases. */
function selected287(file:string,name:string):unknown {
 if(file==='chunk-2ynta9xc.js'&&name==='Kx')
  return (import.meta.require('../../utils/git.js') as typeof import('../../utils/git.js')).getIsGit
 return getPrintHostSource287(file,name)
}
function missingHelper287(file:string,name:string):SourceFunction287 {
 const owner=missingHelperOwner287??=createPrintExplicitHelpers287(selected287)
 const value=owner.source(file,name)
 if(typeof value!=='function')throw Error('Recovered explicit control helper missing '+file+':'+name)
 return value as SourceFunction287
}
function selectedFunction287(file:string,name:string):SourceFunction287 {
 const value=selected287(file,name)
 if(typeof value!=='function')throw Error('Selected explicit control helper missing '+file+':'+name)
 return value as SourceFunction287
}
export interface PrintExplicitControlHost287 {
 readonly Ct:Message[]
 qr(rows:Message[]):void
 I:Pick<import('../../Tool.js').ToolUseContext,'storageV5'|'credentials'>
 v():AppState
 R(update:(state:AppState)=>AppState):void
 Gm(getState:()=>AppState,setState:PrintExplicitControlHost287['R']):unknown
 sl(work:()=>Promise<void>):void
 Ze(request:SDKControlRequest,response?:Record<string,unknown>):void
 We(request:SDKControlRequest,error:string):void
 q():string
 ht:{enqueue(frame:SDKMessage):void}
 executionSession:object
 /** Main-connected existing original IEn, never a second schema. */
 IEn():{safeParse(value:unknown):{success:boolean;data?:unknown}}
}
/** Construct without reading helpers; each original branch resolves only its own dependencies. */
export function createPrintExplicitControl287(host:PrintExplicitControlHost287):(request:SDKControlRequest)=>boolean {
 const ports=Object.defineProperties({},Object.getOwnPropertyDescriptors(host))
 Object.defineProperties(ports,{
  txn:{get:()=>missingHelper287('chunk-tf63hv0k.js','txn')},
  q4t:{get:()=>missingHelper287('chunk-tf63hv0k.js','q4t')},
  J6e:{get:()=>missingHelper287('chunk-tf63hv0k.js','J6e')},
  TMe:{get:()=>{
   const owner=(import.meta.require('../../commands/review/officialPublicReview287/runtime.js') as typeof import('../../commands/review/officialPublicReview287/runtime.js')).getPublicUltrareviewClient287()
   return owner.core().TMe
  }},
  KA:{get:()=>missingHelper287('chunk-xapeakym.js','KA')},
  ODn:{get:()=>selectedFunction287('chunk-0tt5bg1g.js','ODn')},
  Bn:{get:()=>selectedFunction287('chunk-k35krsdc.js','Bn')},
  c:{get:()=>selectedFunction287('chunk-n4qghq20.js','c')},
  on:{get:()=>selectedFunction287('chunk-b5kmgz2n.js','on')},
  ye:{get:()=>selectedFunction287('chunk-t20x5mnd.js','ye')},
  i:{value:logEvent}, // Existing telemetry C no-op; explicit submissions still run original clients.
  loadOriginalModule287:{value:async(file:string)=>{
   if(file!=='chunk-gf9kpcg4.js')throw Error('Unexpected original explicit control import '+file)
   return {submitDraftFromRequest:missingHelper287(file,'y')}
  }},
  nr:{value:(request:SDKControlRequest,operation:string,error:unknown,extra:Record<string,unknown>={})=>{
   const qm=selectedFunction287('chunk-x5mcrns6.js','qm')
   const pme=selectedFunction287('chunk-n2zepamy.js','pme')
   host.We(request,pme(qm(host.executionSession),operation,error,extra).error)
  }},
 })
 return createPrintExplicitControlDispatcher287(ports)
}
