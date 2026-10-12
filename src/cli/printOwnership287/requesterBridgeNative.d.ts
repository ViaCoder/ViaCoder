import type {ToolUseContext,Tools} from '../../Tool.js'
import type {Command} from '../../commands.js'
import type {Message} from '../../types/message.js'
import type {SDKMessage} from '../../entrypoints/sdk/coreTypes.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {MCPServerConnection} from '../../services/mcp/types.js'
export interface PrintRequester287 {
 surface:null;model():string;messages():Message[];tools():Tools;commands():Command[];mcpServers():string[];
 conversation():import('./arrivalStageNative.js').ArrivalConversation287&{keepArrived(rows:Message[]):void};conversation(session:object):object;toolContext(abortController:AbortController):ToolUseContext&{primitiveToolGrant?:ReadonlySet<string>};
 savedAgentMessages(agent:unknown):Promise<unknown>;requestMessages(request:unknown):Promise<unknown>;contextData(options?:object):Promise<unknown>;canUseTool:CanUseToolFn;
 composer:object;toast(plugin:string,text:string,timeout?:number):void;status(plugin:string,text?:string):void;
 addMcpServer(name:string,config:object):Promise<void>;removeMcpServer(name:string):Promise<void>;
 resolveMcpServer(config:object):Promise<unknown>;settledMcpServer(name:string):Promise<MCPServerConnection>;connectMcpServer(name:string,config:object):Promise<unknown>;
 refreshCommands():void;refreshAgents():Promise<void>;refreshContext():void;compact():Promise<never>;
}
export interface BridgeLoginIdentity287 {accountUuid?:string;organizationUuid?:string}
export interface JournalBridgeHandle287 {
 bridgeSessionId:string;getLastSequenceNum():number;noHistoryBackfill?:boolean;sessionGroupingId?:string;
 ownerAccountUuid?:string;ownerOrganizationUuid?:string;ownerVetoed?:boolean;getWorkerBearerToken?:()=>unknown;neverArchive?:boolean;
 teardown(options?:{reason:string}):Promise<void>;
}
export interface BridgeTranscriptRecord287 {id:string;seq:number;declaredDialogKinds?:string[];groupingId?:string;noHistoryBackfill?:boolean;ownerAccountUuid?:string;ownerOrganizationUuid?:string}
export interface PrintBridgeJournal287 {
 armForEnable(dialogKinds:Set<string>):BridgeTranscriptRecord287|null;setLoginIdentity(identity:BridgeLoginIdentity287|undefined):void;
 identityChanged(identity:BridgeLoginIdentity287|undefined):void;armedConversationRotated():boolean;
 attached(handle:JournalBridgeHandle287):void;enableFailed():void;persist(handle:JournalBridgeHandle287):void;noteTranscriptLocation():void;
 release(handle:JournalBridgeHandle287,options:{keepRecord:boolean}):void;dispose():void;
}
export interface PrintBridgeLifecycle287 {
 source:{Gw():void;zw():void;Yw():void;sn:PrintBridgeJournal287};
 attach(handle:JournalBridgeHandle287):void;enable(dialogKinds:Set<string>):Promise<BridgeTranscriptRecord287|null>;
 journal:PrintBridgeJournal287;announce(reason:string,options?:{force?:boolean}):void;
  disable():Promise<void>;forwardStatus(message:SDKMessage):void;signature():string;dispose():void;
 ingress(workSecret?:string):PrintRemoteIngressCallbacks287;
 requestDialog():NonNullable<import('../../Tool.js').ToolUseContext['requestDialog']>;
 cancelAsyncMessage(input:{targetUuid:string;sender:'host'|'remote_client';messageQueue:import('./controlNative.js').PrintControlQueue287&{dequeueAllMatching(predicate:(command:import('../../types/textInputTypes.js').QueuedCommand)=>boolean):import('../../types/textInputTypes.js').QueuedCommand[];withdrawInboundIngest(uuid:string):boolean};prewaitLatch:import('./controlNative.js').PrintPrewaitLatch287;io:Pick<import('../structuredIO.js').StructuredIO,'onCommandLifecycle'>}):boolean;
}
export interface PrintRemoteIngressCallbacks287 {
 onInboundMessage(message:SDKMessage):Promise<void>;
 onInterrupt():void;
 onStopTask(taskId:string):Promise<void>;
 onBackgroundTasks(toolUseId?:string):boolean;
 onCancelAsyncMessage(messageUuid:string):boolean;
}
export type PrintContextUsageInputs287 = Pick<import('../../utils/contextAnalysis287.js').CollectContextDataInput287,'messages'> & Omit<import('../../utils/contextAnalysis287.js').CollectContextDataInput287['options'],'mainLoopModel'>
export interface PrintCommandSubscriptions287 {hb():void;yb():void;_b():void;kb():void;Sf:{reload():Promise<unknown>;joinPluginDir(path:string):unknown;retarget(path:string):unknown}}
export interface PrintToolAssembly287 {assemble(state:import('../../state/AppState.js').AppState):Tools;tools():Tools;allowedAgentTypes():ToolUseContext['options']['agentDefinitions']['allowedAgentTypes'];primitiveToolGrant():ReadonlySet<string>|undefined}
export function readPrintCoordinatorSubscriptionFilter287(name:string):boolean
export function createPrintSingletonToolFilter287(ports:object):(permissions:import("../../Tool.js").ToolPermissionContext,tool:Tools[number])=>boolean
export function createPrintRepositoryToolKey287(ports:object):()=>boolean|undefined
export function createPrintToolSelection287(ports:object):{Vlr(tools:Tools,serverNames:string[]):Tools;m5t():string[];qlr(tool:ToolUseContext['options']['tools'][number],extra?:string[]):boolean;IJo(tools:Tools):Tools;mvt(initial:Tools,assembled:Tools,mode:import('../../Tool.js').ToolPermissionContext['mode'],all:Tools):Tools;gvt(tools:Tools,permissions:import('../../Tool.js').ToolPermissionContext):Tools}
export interface PrintRequesterOwner287 {readonly flagSettingsState287:{Ip:{value:string|readonly string[]|undefined}|undefined;pa:string|boolean|undefined;readonly gf:boolean};readonly toolAssembly287:PrintToolAssembly287;Ne:boolean;readonly pluginStoreOwner287:object;readModelOverride():string|undefined;requester:PrintRequester287;readonly contextUsageInputs:()=>PrintContextUsageInputs287;readonly contextUsage:(options?:object)=>Promise<import('../../utils/analyzeContext.js').ContextData>;appendMessages(rows:Message[]):void;bindArrivalEngine(engine:import('./arrivalStageNative.js').ArrivalEngine287):()=>void;beforeTurn():void;afterTurn():void;qualifiedCommands(commands?:Command[]):Command[];emitFrame(frame:SDKMessage):void;installCommandSubscriptions():PrintCommandSubscriptions287}
export interface PrintBridgeHostCallbacks287 {
 recordAtEnable:BridgeTranscriptRecord287|null;
 onDialogKindsDeclared(kinds:string[],source?:string):void;
 getBackfillMessages(bridgeSessionId:string):Message[];
 onGetContextUsage(options?:object):Promise<import('../../utils/analyzeContext.js').ContextData>;
 workspaceDiffComputeBudget:{perFileMs:number;totalMs:number};
 onClientInitialize():void;
}
export function createPrintBridgeHostCallbacks287(ports:object):PrintBridgeHostCallbacks287
export function createPrintRequester287(ports:object):PrintRequesterOwner287
export function createPrintBridgeLifecycle287(ports:object):PrintBridgeLifecycle287
export function createPrintRequestDialog287(ports:object):NonNullable<import('../../Tool.js').ToolUseContext['requestDialog']>
export function createPrintScopeState287(ports:object):import('./requesterBridgeRuntime287.js').PrintScopeState287
export interface PrintSessionProducers287 {
 Op:boolean;Po:boolean;lr:boolean;_r:boolean;Ya():boolean;bridgeInitialized():number;
 bridgeState(state:string,detail?:string,epoch?:number,failureKind?:string):void;
 vb():void;Cb():void;Db():void;xb():void;Ob():void;eb():void;ws():void;Mp():void;De():void;
 Zd:{noteTurnStart(input:{command:import('../../types/textInputTypes.js').QueuedCommand;members:import('../../types/textInputTypes.js').QueuedCommand[]}):void;noteFrame(frame:SDKMessage):void;noteTurnEnd():void};
 ju:{route():void;dispose():void;readonly resuming:boolean};
}
export function createPrintSessionProducers287(ports:object):PrintSessionProducers287
