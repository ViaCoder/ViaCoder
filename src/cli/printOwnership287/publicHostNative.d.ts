import type {z} from 'zod/v4'
import type {StructuredIO} from '../structuredIO.js'
import type {RemoteIO} from '../remoteIO.js'
import type {AppState} from '../../state/AppState.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {UiHostRequest287,UiSystemEvent287} from './publicHostTypes287.js'
export interface SourceUiInstance287 {surface:string;component:string;requestId:string}
export interface SourceUiPanes287 {panes:{id:string;title:string;plugin:string;closeOnEscape?:boolean;holdToasts?:boolean;rows?:number;columns?:number}[];shownId:string|null;focusedId:string|null;focusRequestedId:string|null}
export interface SourceUiClient287 {surface:string;clientId:string}
export interface PrintPublicPorts287 {
 I:{outputFormat?:string};r:StructuredIO;qz:typeof RemoteIO;Wi(event:UiSystemEvent287):void;
 h5e:{onInvalidate(listener:(instances?:SourceUiInstance287[])=>void):()=>void};
 Gin(listener:(event:{plugin:string;text:string})=>void):()=>void;
 fi:{scroll:{subscribe(listener:(event:{clientId:string;component:'Pane'|'AbovePrompt';requestId:string;offset:number;isFollowingEnd?:boolean})=>void):()=>void};focus:{subscribe(listener:(event:{clientId:string;component:'Pane'|'AbovePrompt';requestId:string;plugin:string;element:string})=>void):()=>void}};
 wC(listener:(panes:SourceUiPanes287)=>void):()=>void;_C(panes:SourceUiPanes287):void;rk(panes:SourceUiPanes287):Extract<UiSystemEvent287,{subtype:'ui_panes'}> extends infer T?Omit<T,'type'|'subtype'>:never;
 IZo(requester:{copy(client:SourceUiClient287&{plugin:string;text:string}):Promise<boolean|undefined>;readPrompt(client:SourceUiClient287):Promise<{text:string;cursor:number}|undefined>;fillPrompt(client:SourceUiClient287&{text:string;mode:'replace'|'append'|'insert';decorations?:import('./publicHostTypes287.js').UiDecoration287[]}):Promise<boolean|undefined>;suggestPrompt(client:SourceUiClient287&{text:string}):Promise<boolean|undefined>}):()=>void;
 R4r():z.Schema<{copied:boolean}>;x4r():z.Schema<{text:string;cursor:number}>;P4r():z.Schema<{filled:boolean}>;I4r():z.Schema<{shown:boolean}>;P6n:number;LEt():boolean;
 Xy(input:{messageQueue:PrintPublicPorts287['Q'];getTasks():AppState['tasks'];publish(tasks:FinishedTaskMetadata287[]):void}):()=>void;
 Q:{subscribe(listener:()=>void):()=>void;getCommandQueueSnapshot():readonly QueuedCommand[]};v():AppState;EIr():void;
}
export interface FinishedTaskMetadata287 {task_id:string;task_type:string;description:string;status:string;output_file?:string}
export interface PrintPublicSubscriptions287 {live:boolean;readonly source:Record<'wb'|'Pb'|'Rb'|'Tb'|'bb'|'Xw'|'Mb',()=>void>;closeUi():void;closeComposer():void;closeTaskMetadata():void;active():boolean;panesRevision():number}
export function createPrintPublicSubscriptions287(ports:PrintPublicPorts287):PrintPublicSubscriptions287
export function createSendUiHostRequest287(gate:()=>boolean):<T>(this:StructuredIO,request:UiHostRequest287,schema:z.Schema<T>,timeout:number)=>Promise<T|undefined>
export function createSdkStatusSerializer287(ports:{q():string;ER():import('crypto').UUID}):(status:import('../../entrypoints/sdk/coreTypes.js').SDKStatus,metadata?:import('../../entrypoints/sdk/coreTypes.js').SDKStatusMetadata)=>import('../../entrypoints/sdk/coreTypes.js').SDKStatusMessage
export function createPrintUiWireSchemas287(ports:{f:typeof import('../../utils/lazySchema.js').lazySchema;u:typeof z.object;x:typeof z.literal;T:typeof z.array;o:typeof z.string;_:typeof z.string;C:typeof z.number;B:typeof z.enum;H:typeof z.boolean}):(()=>z.ZodType<import('../../entrypoints/sdk/coreTypes.js').SDKUiSystemMessage>)[]

export function createAsyncHookFinalizer287(ports:{tz():import('../../utils/hooks/asyncHookOwner287.js').AsyncHookOwner287&{values():import('../../utils/hooks/AsyncHookRegistry.js').PendingAsyncHook[]};YQ(event:string):boolean;Wi(event:{type:'system';subtype:'hook_response';hook_id:string;hook_name:string;hook_event:string;output:string;stdout:string;stderr:string;exit_code?:number;outcome:'success'|'error'|'cancelled'}):void;t(message:string,options?:{level:'error'|'debug'}):void}):()=>Promise<void>

/** Whole original oS; one delivery sequence shared by outer writer and Cie.trackWrite. */
export interface PrintResultDelivery287 {stamp<T extends object>(message:T):T&{result_index:number};readonly numbered:number}
export function createPrintResultDelivery287():PrintResultDelivery287
export function createSdkAutocompactSchema287(ports:{f:typeof import('../../utils/lazySchema.js').lazySchema;u:typeof z.object;x:typeof z.literal;o:typeof z.string;_:typeof z.string;C:typeof z.number;B:typeof z.enum;H:typeof z.boolean}):()=>z.ZodType<import('../../entrypoints/sdk/coreTypes.js').SDKAutocompactStateMessage>
export function seedRemoteAutocompact287(ports:{h:{seedAutocompactState?:NonNullable<AppState['remoteAutocompactState']>};Uo(update:(state:AppState)=>AppState):void;i:Function;S:Function;c:Function}):void
export function clearRemoteAutocompact287(setState:(update:(state:AppState)=>AppState)=>void):void
export type SdkControlProgress287={status:'started'|'api_retry';attempt?:number;max_retries?:number;retry_delay_ms?:number;error_status?:number|null}
export interface SdkSideQuestionRequest287 {
 question:string;history?:readonly {question:string;response:string;fallback_notice?:string}[];parentController:AbortController;
 onProgress(progress:SdkControlProgress287):void;getLiveMessages?():import('../../types/message.js').Message[];
 isTurnInProgress?():boolean;buildFallbackParams?():Promise<import('../../utils/forkedAgent.js').CacheSafeParams|null>;
}
export function createSdkSideQuestionControl287(ports:{Bn():AbortController;JR():import('../../utils/forkedAgent.js').CacheSafeParams|null;ai(messages:import('../../types/message.js').Message[]):import('../../types/message.js').Message[];urt:typeof import('../../utils/sideQuestion.js').runSideQuestion}):(request:SdkSideQuestionRequest287)=>Promise<{cancelled:true}|{cancelled:false;response:{response:string|null;synthetic?:boolean;refusal_fallback?:{original_model:string;fallback_model:string;content:string}}}>
export function createSdkControlProgressSchema287(ports:{f:typeof import('../../utils/lazySchema.js').lazySchema;u:typeof z.object;x:typeof z.literal;o:typeof z.string;_:typeof z.string;C:typeof z.number;B:typeof z.enum}):()=>z.ZodType<import('../../entrypoints/sdk/coreTypes.js').SDKControlRequestProgressMessage>
export function createSdkControlProgressWriter287(ports:{i:Function;c:Function;ht:{enqueue(frame:import('../../entrypoints/sdk/coreTypes.js').SDKControlRequestProgressMessage):void};eo():import('crypto').UUID;q():string}):(request:{request_id:string},progress:SdkControlProgress287)=>void
export function shouldCompleteSdkIngress287(frame:{type:string}):boolean
/** One original per-control detached boolean; no task/request registry. */
export function createSdkControlLifecycle287(ports:{r:{onCommandLifecycle?:(uuid:string,state:'started'|'completed')=>void};sr?:string;d(error:Error):void}):{
 Cr(work:()=>unknown|PromiseLike<unknown>):void;
 sl(work:()=>unknown|PromiseLike<unknown>):void;
 completeInline():void;readonly detached:boolean;
}
export function createSdkForkControlHost287(ports:{
 ht:{enqueue(frame:{type:'keep_alive'}):void};
 r:{sessionState:{getState():string}};
 Yt:{holdingParkedPermission():boolean};
 Q:{getDrainableMainThreadQueueLength():number};
 qe:Pick<import('../../tools/GetTaskTool/printLifecycleNative.js').PrintDrain287,'running'|'runPhase'>;
 a:{readonly CLAUDE_CODE_BG_TASKS_REPORT_RUNNING:boolean|undefined};
 v():AppState;aQe(state:AppState):boolean;
}):{lease():()=>void;blockedReason():string|null}
export function createTerminalInputOwner287(ports:{
 Le(value:string|boolean|undefined):boolean;i:typeof import('../../services/analytics/index.js').logEvent;
 kqt():string;t:typeof import('../../utils/debug.js').logForDebugging;
 DOe(stream:import('node:tty').ReadStream):void;pu(error:Error):Parameters<typeof import('../../services/analytics/index.js').logEvent>[1];
 Zm():boolean;sgo():void;a:typeof import('node:fs').openSync;s:typeof import('node:tty').ReadStream;
 process:Pick<NodeJS.Process,'stdin'>;
}):{Y9t:{get():import('../../utils/terminalInput287.js').TerminalInput287;reset():void};vR(exitOnCtrlC?:boolean):import('../../ink.js').RenderOptions}
export function createTerminalSizeRestore287(ports:{a:Pick<import('../../utils/officialTypedEnvironment287/native.js').TypedEnvironment287,'CLAUDE_CODE_RELAUNCH_TERMINAL_SIZE'>;process:Pick<NodeJS.Process,'stdout'|'env'>}):()=>void
export function createExistingCloudAttachCaller287(ports:{
 i:typeof import('../../services/analytics/index.js').logEvent;
 ye(id:string):string;
 fn(session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287,options:Record<string,unknown>):void;
 ee:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287;e:Record<string,unknown>;N:import('../../ink.js').Root;
 Pe:AppState;Ue:boolean|undefined;B:boolean|undefined;x:import('../../Tool.js').ToolUseContext['storageV5'];se:import('../../Tool.js').ToolUseContext['credentials'];
 pe:typeof import('../../interactiveHelpers.js').exitWithError;l(error:unknown):string;Kn:typeof import('../../utils/gracefulShutdown.js').gracefulShutdown;
 Eqt(id:string):string;vR(exitOnCtrlC?:boolean):import('../../ink.js').RenderOptions;
 wFt(directories:AppState['toolPermissionContext']['additionalWorkingDirectories']):string[];
 K:Pick<AppState['toolPermissionContext'],'additionalWorkingDirectories'>;
 load(file:string):Promise<Readonly<Record<string,unknown>>>;process:Pick<NodeJS.Process,'env'>;
}):(id:string)=>Promise<void>
export type CloudPrintAuth287={valid:true}|{valid:false;message:string;reason:string}
export function createExistingCloudPrintCaller287(ports:{
 ime(host:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287['host'],outcome:string):void;
 U():import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287;
 TF(credentials:import('../../Tool.js').ToolUseContext['credentials']):Promise<CloudPrintAuth287>;
 pHe(validation:Extract<CloudPrintAuth287,{valid:false}>):Promise<void>;Vs(message?:string):never;
 zb():Promise<void>;j_e():string|undefined;V2(policy:string,via:string):Promise<unknown>;Yt(message:string):never;
 Be:unknown;ie:string|undefined;i:typeof import('../../services/analytics/index.js').logEvent;c(value:string):never;
 Rx(id:string,options:undefined,credentials:import('../../Tool.js').ToolUseContext['credentials']):Promise<{session_status:string;bound_device_uuid?:string}>;
 l(error:unknown):string;Rm():boolean;Mpe(error:unknown):undefined;
 Npe(id:string,prompt:string,options?:{eventSigner:Promise<unknown>}):Promise<{ok:true}|{ok:false;reason:string}>;
 js(event:string,metadata?:Parameters<typeof import('../../services/analytics/index.js').logEvent>[1]):Promise<void>;
 _(value:object):string;process:Pick<NodeJS.Process,'stdout'>;oc(id:string,options:undefined,query:{from:string;m:string}):string;
 Kn:typeof import('../../utils/gracefulShutdown.js').gracefulShutdown;
 load(file:string):Promise<Readonly<Record<string,unknown>>>;n:{credentials?:import('../../Tool.js').ToolUseContext['credentials']};
}):(id:string)=>Promise<void>

/** Original goo prepared values consumed by jrs/Un/dRn/Nn, on the same host. */
export interface PreparedHeadlessCloud287 extends Pick<import('../../Tool.js').ToolUseContext,'storageV5'|'credentials'> {
 headlessCloud:true;cloudAttachId:string;serveOnly:boolean;outputFormat:string|undefined;
 session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287;
 inputPrompt:string|AsyncIterable<string>;resolvedMaxTurns:number|undefined;
 mcpConfigFlagServers:Record<string,import('../../services/mcp/types.js').ScopedMcpServerConfig>;
 systemPromptCli:string|undefined;appendSystemPromptCli:string|undefined;
 mainThreadAgentDefinition:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition|undefined;
 effectiveModel:string|undefined;effectiveReplayUserMessages:boolean|undefined;
 effectiveIncludePartialMessages:boolean|undefined;permissionModeCli:string|undefined;
 forwardHomeSettings:boolean;homeSettingsConsent:'forward'|null;tools:import('../../Tool.js').Tools;
}
export function createHeadlessCloudServingCaller287(ports:{
 yeo(format:string):void;fZo():void;x9r():boolean;Yt(message:string):never;
 ime:Parameters<typeof createExistingCloudPrintCaller287>[0]['ime'];U():PreparedHeadlessCloud287['session'];
 AEe(formatted:boolean):void;qP():void;jj():boolean;
 un(credentials:PreparedHeadlessCloud287['credentials'],phase:'at_start'|'on_settings_change'):Promise<boolean>;
 Ki:{subscribe(listener:()=>void):()=>void;initialize(memory:unknown,storageV5:PreparedHeadlessCloud287['storageV5'],options:{machineServesSession:true}):void};
 zEe(storageV5:PreparedHeadlessCloud287['storageV5']):void;Ym():boolean;xr():boolean;
 sme(session:PreparedHeadlessCloud287['session'],storageV5:PreparedHeadlessCloud287['storageV5'],credentials:PreparedHeadlessCloud287['credentials']):unknown;
 load(file:string):Promise<{runHeadlessCloudAttach(n:PreparedHeadlessCloud287,options:Record<string,unknown>,id:string,host:PreparedHeadlessCloud287['session']['host'],config:{serveOnly:boolean}):Promise<void>}>;
}):(prepared:PreparedHeadlessCloud287,options:Record<string,unknown>)=>Promise<void>
