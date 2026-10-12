import {getPrintHostSource287} from './publicHostRuntime287.js'
import {createArrivalStage287,type ArrivalConversation287,type ArrivalStage287,type ArrivalRowsReader287,type ArrivalTurnEvents287,type ArrivalTurnSpan287} from './arrivalStageNative.js'
import type {ToolUseContext} from '../../Tool.js'
import type {Message} from '../../types/message.js'
export function createArrivalRowsReader287(context:ToolUseContext,rows:Message[]):ArrivalRowsReader287 {
 const hi=getPrintHostSource287('chunk-w8a1w7ad.js','hi') as (context:ToolUseContext,rows:Message[])=>ArrivalRowsReader287
 return hi(context,rows)
}
export function beginArrivalTurn287(input:{turnEvents:ArrivalTurnEvents287;newMessages:Message[];input?:string;signal:AbortSignal;abort():void}):string {
 const mlr=getPrintHostSource287('chunk-n2zepamy.js','mlr') as (value:typeof input)=>string
 return mlr(input)
}
export function abortArrivalTurn287(controller:AbortController):void {
 const fl=getPrintHostSource287('chunk-k35krsdc.js','fl') as (name:'turn-abort')=>unknown
 controller.abort(fl('turn-abort'))
}
export function completeArrivalTurn287(input:{turnEvents:ArrivalTurnEvents287;turnId:string;transcript:{getSnapshot():Message[]};span:ArrivalTurnSpan287;durationMs:number;isAborted:boolean}):void {
 const Fbr=getPrintHostSource287('chunk-5ne43w2c.js','Fbr') as (value:typeof input)=>void
 Fbr(input)
}
/** A view onto the existing conversation/message owner, not another queue. */
export function createArrivalConversation287(rows:()=>import('../../types/message.js').Message[]):ArrivalConversation287 {
 const dye=getPrintHostSource287('chunk-mphp7acd.js','dye') as (ports:{keep:ArrivalConversation287['keep'];rows:typeof rows;list:ReturnType<typeof rows>;isHookable:true})=>ArrivalConversation287
 return dye({keep:arrived=>rows().push(...arrived),rows,list:rows(),isHookable:true})
}
export function installArrivalStage287(rows:()=>import('../../types/message.js').Message[],conversation:ArrivalConversation287,options:{storageV5?:unknown;turnEventsSettleMs?:number;sharedHostContext287?:import('./requesterBridgeRuntime287.js').PrintScopeState287}):ArrivalStage287 {
 const queue=(require('../../utils/messageQueueManager.js') as typeof import('../../utils/messageQueueManager.js'))
 const messageQueue=options.sharedHostContext287?.messageQueue287??{peek:queue.peek,getCommandQueue:queue.getCommandQueue,subscribe:queue.subscribeToCommandQueue}
 // TS.e.abortController is a lifetime parent. A print command's controller
 // belongs to gs.De, not to this IO-wide closure (it changes each turn).
 const ports={get s(){return rows()},g:conversation,e:{storageV5:options.storageV5,turnEventsSettleMs:options.turnEventsSettleMs,messageQueue},Bn:getPrintHostSource287('chunk-k35krsdc.js','Bn'),fl:getPrintHostSource287('chunk-k35krsdc.js','fl'),get qs(){return getPrintHostSource287('chunk-xapeakym.js','qs')},AJo:getPrintHostSource287('chunk-n2zepamy.js','AJo'),TJo:getPrintHostSource287('chunk-n2zepamy.js','TJo'),lt:getPrintHostSource287('chunk-f2n7vgt8.js','lt'),NZo:getPrintHostSource287('chunk-mphp7acd.js','NZo'),Nu:getPrintHostSource287('chunk-mphp7acd.js','Nu'),t:getPrintHostSource287('chunk-q80zaav8.js','t'),l:getPrintHostSource287('chunk-c9me9cp7.js','l'),
  iq:getPrintHostSource287('chunk-mphp7acd.js','iq'),uf:getPrintHostSource287('chunk-nankzm0s.js','uf'),
  Rd:getPrintHostSource287('chunk-nankzm0s.js','Rd'),d:getPrintHostSource287('chunk-amhtwhch.js','d'),
  get vln(){return getPrintHostSource287('chunk-mphp7acd.js','vln')},fS:getPrintHostSource287('chunk-xapeakym.js','fS'),_xo:getPrintHostSource287('chunk-mphp7acd.js','_xo')}
 Object.assign(ports,{V4t:getPrintHostSource287('chunk-n2zepamy.js','V4t'),z4t:getPrintHostSource287('chunk-n2zepamy.js','z4t')})
 return createArrivalStage287(ports)
}
