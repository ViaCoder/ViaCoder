import type {SDKMessage} from '../../entrypoints/agentSdkTypes.js'
import type {MessageOrigin,Message} from '../../types/message.js'
import type {Tools} from '../../Tool.js'
import type {ArrivalWriter287} from './arrivalStageNative.js'
export interface PrintConsumption287<T>{
 consume(input:string|import('@anthropic-ai/sdk/resources/messages.mjs').ContentBlockParam[],options:{origin?:MessageOrigin}|undefined,controller:AbortController):AsyncGenerator<T|SDKMessage,void,unknown>;
 recordSystem(frame:object,rows:Message[],writer:ArrivalWriter287,persist:boolean):void;
 recordRefusal(frame:Message,rows:Message[],persist:boolean):void;
 initialize(context:{session:object;storageV5?:unknown;tools:Tools;mcpClients:import('../../services/mcp/types.js').MCPServerConnection[];commands:import('../../commands.js').Command[];agents:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition[]},model:string,fast:boolean|undefined):Promise<SDKMessage>;
}
export function createPrintConsumption287<T=never>(ports:object):PrintConsumption287<T>
export type WholePrintTurnOptions287=Partial<Omit<import('../../utils/hotSessionController287/native.js').HotUserInput287,'input'|'mode'|'context'|'messages'|'entries'|'skipAttachments'>> & {
 skipAttachments?:boolean;
 abortController?:AbortController;turnStartClock?:unknown;frameTiming?:unknown;
 userMessageUuids?:string[];uuidIsClientEventUuid?:boolean;stopHookActive?:boolean;
 orphanedPermission?:import('../../types/textInputTypes.js').OrphanedPermission;
 [key:string]:unknown;
}
/** The original complete TS owns exactly one Q6e/feed and its arrival cells. */
export interface WholePrintInput287 {
 submitMessage(input:string|import('@anthropic-ai/sdk/resources/messages.mjs').ContentBlockParam[],options?:WholePrintTurnOptions287):AsyncGenerator<SDKMessage,void,unknown>;
 interrupt(reason?:string):void;setModel(model:string|undefined):void;
 getMessages():Message[];keepArrivedRows(rows:Message[]):void;appendMessages(rows:Message[]):void;
 getReadFileState():import('../../utils/fileStateCache.js').FileStateCache;
 dispose():void;
}
export function createWholePrintInput287(ports:object):WholePrintInput287
