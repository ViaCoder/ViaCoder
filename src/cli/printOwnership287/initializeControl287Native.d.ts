import type {SDKControlInitializeRequest,SDKControlInitializeResponse} from '../../entrypoints/sdk/controlTypes.js'
import type {Command} from '../../commands.js'
import type {AgentDefinition} from '../../tools/AgentTool/loadAgentsDir.js'
import type {AppState} from '../../state/AppState.js'
import type {StructuredIO} from '../structuredIO.js'
import type {StdoutMessage} from '../../entrypoints/sdk/controlTypes.js'
export interface InitializeOptions287 {
 systemPrompt?:string|readonly string[];appendSystemPrompt?:string;agent?:string;userSpecifiedModel?:string;
 systemPromptSnapshot?:boolean;planModeInstructions?:string;appendSubagentSystemPrompt?:string;
 toolAliases?:Record<string,string>;excludeDynamicSections?:boolean;promptSuggestions?:boolean;forwardSubagentText?:boolean;
 storageV5?:unknown;sessionMirror?:unknown;
}
export interface InitializeModelAvailability287 {
 models:SDKControlInitializeResponse['models'];
 unavailable:NonNullable<SDKControlInitializeResponse['unavailable_models']>;
}
export interface InitializePublication287 {
 enqueue(frame:StdoutMessage):unknown;
}
export type InitializeSetState287=(update:(state:AppState)=>AppState)=>void;
export interface InitializeOutcome287 {
 restrictedAgentModel?:string;
 mergedStdinAgents?:AgentDefinition[];
 publishedCommands:SDKControlInitializeResponse['commands'];
}
/** Exact complete RI fifteen positional parameters; no optional ABI tails. */
export type InitializeArguments287=[
 request:SDKControlInitializeRequest,requestId:string,initialized:boolean,output:InitializePublication287,
 getCommands:()=>Command[],getModelAvailability:()=>InitializeModelAvailability287,io:StructuredIO,
 enableAuthStatus:boolean,options:InitializeOptions287,getAgents:()=>AgentDefinition[],
 getAppState:()=>AppState,setAppState:InitializeSetState287,getModel:()=>string|undefined,
 sdkMcpManifestsParked:Record<string,string>|undefined,settleBeforeResponse:()=>Promise<unknown>|undefined,
];
export interface InitializeSettleInputs287 {
 rescan():Promise<unknown>|undefined;
 isReaderOwed():boolean;
 lookAgainOn:Array<(wake:()=>void)=>()=>void>;
}
export interface InitializeModelNoticeHost287 {
 session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287;
 storageV5?:unknown;
 messages():import('../../types/message.js').Message[];
 appendToConversation(rows:import('../../types/message.js').Message[]):void;
 enqueue(frame:StdoutMessage):unknown;
 isLaunchModelPick():boolean;
}
export interface InitializeModelNotices287 {
 conversationModel(activeModel:string):unknown;
 injectModelSwitchBreadcrumbs(modelArg:string,resolvedModel:string):void;
 noticeRestrictedModel(model:string,effectiveModel?:string):void;
 recordAllowedModelApplied():void;
 noticeFlagSettingsModel(input:{defaultPickRefused:boolean;model:string|null;rejected:boolean;stepDown:string|null;effectiveModel():string}):void;
}
export interface InitializeControlNative287 {
 createModelNotices(host:InitializeModelNoticeHost287):InitializeModelNotices287;
 initialize(...args:InitializeArguments287):Promise<InitializeOutcome287>;
 buildResponse(getCommands:()=>Command[],agents:AgentDefinition[],models:InitializeModelAvailability287['models'],unavailable:InitializeModelAvailability287['unavailable'],getAppState:()=>AppState,model:string|undefined,getSessionState:()=>string,hooksApplied:boolean|undefined,pluginsApplied:boolean|undefined,workspaceTrustRecorded:boolean|undefined,sdkMcpManifestsParked:Record<string,string>|undefined,storageV5:unknown,isRemoteTransport:boolean):Promise<SDKControlInitializeResponse>;
 seatAgent(agents:AgentDefinition[],options:InitializeOptions287,io:StructuredIO,flags?:{deferInitialPrompt?:boolean;reapplySystemPromptIfSeated?:boolean}):{agent:AgentDefinition|undefined;seatedNow:boolean;restrictedAgentModel:string|undefined};
 isSingleEmptyPrompt(value:unknown):boolean;
 modelAvailability():InitializeModelAvailability287;
 settleBeforeReply(inputs:InitializeSettleInputs287):Promise<unknown>|undefined;
}
export function createInitializeControlNative287(ports:object):InitializeControlNative287;
