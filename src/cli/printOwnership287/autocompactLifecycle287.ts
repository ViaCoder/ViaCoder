import {getPrintHostSource287} from './publicHostRuntime287.js'
import type {PermissionSessionState287} from '../../utils/permissions/officialSDKPermission287/native.js'
import type {Message} from '../../types/message.js'
import type {SDKMessage} from '../../entrypoints/sdk/coreTypes.js'
import type {ContextData} from '../../utils/analyzeContext.js'

export interface PrintAutocompactLifecycle287 {
 onHead():void;afterPass(drained:boolean):void;close():void;
}
/** Whole Qg/gso and dso/Ve run against this IO's real session and requester.
 * No worker flag is inferred from SDK transport or forced for local Web. */
export function installPrintAutocompactLifecycle287(host:{
 sessionState:PermissionSessionState287;remoteWorker:unknown;sdkUrl?:string;
 enqueue(frame:SDKMessage):void;
 readInputs():{messages:Message[];model:string;autoCompactWindow?:number};
 contextUsage():Promise<ContextData>;
}):PrintAutocompactLifecycle287 {
 const readInputs=host.readInputs
 const dso=getPrintHostSource287('chunk-n2zepamy.js','dso') as (session:PermissionSessionState287,read:typeof readInputs,estimate:typeof host.contextUsage)=>{report():void;reportAtTurnEnd():unknown}
 const bHe=getPrintHostSource287('chunk-n2zepamy.js','bHe') as (read:typeof readInputs)=>unknown
 const reports=host.remoteWorker||host.sdkUrl?dso(host.sessionState,readInputs,host.contextUsage):undefined
 let recheck:(()=>void)|undefined
 if(host.remoteWorker){
  const Qg=getPrintHostSource287('chunk-xapeakym.js','Qg') as (input:{sessionState:PermissionSessionState287;enqueue:typeof host.enqueue;readInputs:typeof readInputs;reportContextUsage():void})=>()=>void
  recheck=Qg({sessionState:host.sessionState,enqueue:host.enqueue,readInputs,reportContextUsage:()=>reports!.report()})
 }else{
  host.sessionState.onAutocompactInputsChanged=()=>{reports?.report();bHe(readInputs)}
  if(host.sdkUrl){
   const Vd=getPrintHostSource287('chunk-nankzm0s.js','Vd') as ()=>Promise<unknown>
   void Vd().catch(()=>{}).then(()=>reports!.report())
  }
 }
 reports?.report()
 return {onHead:()=>recheck?.(),afterPass:drained=>{if(drained)reports?.reportAtTurnEnd()},close(){
  // Captured real IO owner, not the process's next session or a new registry.
  host.sessionState.onAutocompactInputsChanged=undefined
  if(host.remoteWorker)host.sessionState.onConversationReset=undefined
 }}
}
