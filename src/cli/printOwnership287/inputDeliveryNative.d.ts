import type {OfficialLowLatencyConfiguration287,OfficialLowLatencyCoordinator287,OfficialLowLatencyQueue287,OfficialLowLatencyTaskRegistry287,OfficialLowLatencyQueuedCommand287} from '../../utils/officialLowLatencySubmit287/native.js'
import type {ExecutionSession287,LegacyExecutionContext287} from '../../services/context/officialExecutionOwners287/native.js'
import type {Message} from '../../types/message.js'
import type {PrintDrain287} from '../../tools/GetTaskTool/printLifecycleNative.js'
export interface PrintInputDeliveryPorts287 {
 Coordinator:new(configuration:OfficialLowLatencyConfiguration287)=>OfficialLowLatencyCoordinator287
 midTurnFoldCommitted():boolean
 executionContext():ExecutionSession287
 legacyContext():LegacyExecutionContext287|undefined
 analytics:typeof import('../../services/analytics/index.js').logEvent
 logError:typeof import('../../utils/log.js').logError
 feature<T>(name:string,fallback:T):T
}
export interface PrintInputDelivery287 {
 takeBeforeEnqueue(command:OfficialLowLatencyQueuedCommand287):void
 press(command:OfficialLowLatencyQueuedCommand287):void
 pressWaiting():boolean
 isTaking(command:OfficialLowLatencyQueuedCommand287):boolean
 noteTurnStart():void
 noteFrame(frame:{type:string;subtype?:string;status?:unknown}):void
 noteTurnEnd():void
 dispose():void
}
export declare function createPrintInputDeliveryRuntime287(ports:PrintInputDeliveryPorts287):{
 Delivery:new(host:{messageQueue:OfficialLowLatencyQueue287;drain:PrintDrain287;enabled():boolean;transcript:{getSnapshot():Message[]};session:ExecutionSession287;taskRegistry:OfficialLowLatencyTaskRegistry287;clock:OfficialLowLatencyConfiguration287['clock']})=>PrintInputDelivery287
 enabled():boolean
 humanOrigin(origin:unknown,isRemote:boolean):{kind:'human'}|undefined
 isMainThread(command:OfficialLowLatencyQueuedCommand287):boolean
}
