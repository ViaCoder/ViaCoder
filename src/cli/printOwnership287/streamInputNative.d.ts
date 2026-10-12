import type {QueryParams} from '../../query.js'
import type {HotEngine287} from '../../utils/hotSessionController287/engineNative.js'
export interface PrintStreamInput287 {
 readonly engine:HotEngine287;
 prepare(params:QueryParams,input:string|import('@anthropic-ai/sdk/resources/messages.mjs').ContentBlockParam[],options?:{origin?:import('../../types/message.js').MessageOrigin}):void;
 next():Promise<Record<string,unknown>>;
 takeTurnThrow():{error:unknown}|undefined;
 drain(controller:AbortController,denials?:unknown[]):Promise<void>;
 close():Promise<IteratorResult<Record<string,unknown>,void>>;
}
export function createPrintStreamInput287(ports:object):PrintStreamInput287
export function installPrintBridgeRequests287(io:Pick<import('../structuredIO.js').StructuredIO,'setOnControlRequestSent'|'setOnControlRequestResolved'|'getPendingPermissionRequests'|'getPendingUserDialogRequests'>,bridge:Pick<import('../../bridge/replBridge.js').ReplBridgeHandle,'sendControlRequest'|'sendControlCancelRequest'>):void
export function createPrintBridgeSnapshot287(ports:{readonly Ct:import('../../types/message.js').Message[];dn:import('../../types/message.js').Message[]|undefined}):{readonly messages:import('../../types/message.js').Message[]|undefined;stateChanged(state:string):void;failed():void}
