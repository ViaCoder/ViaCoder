import type {AppState} from '../../state/AppState.js'
import type {ResumeLoadResult,ProcessedResume,ResumeRestoreOptions287,ResumeRestoreContext287} from '../sessionRestore.js'
import type {HookResultMessage,Message} from '../../types/message.js'
import type {LogOption} from '../../types/logs.js'
import type {TurnInterruptionState} from '../conversationRecovery.js'
export interface ResumeHookCarrier287 {promise:Promise<HookResultMessage[]>;placement:'tail'|'head';abort():void}
export interface SessionRestore287 {
 sourceBinding(file:string,name:string):unknown
 sessionAgents(cwd?:string,storageV5?:undefined):Promise<import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinitionsResult|undefined>
 takeHookTitle():string|undefined
 commitHookTitle(title:string,id:string,storageV5?:undefined):Promise<void>
 hookTail(scope:{Ne:'resume'|'fork';qe:string;We:Message[];j:boolean;b:LogOption|undefined;r:{storageV5?:undefined;credentials?:import('../officialSecureStorage/runtime.js').CredentialStore};$e:number}):(signal:AbortSignal)=>Promise<HookResultMessage[]>
 restore(input:ResumeLoadResult,options:ResumeRestoreOptions287,context:ResumeRestoreContext287 & {session:import('../../services/context/officialExecutionOwners287/native.js').ExecutionSession287}):Promise<ProcessedResume>
 standalone(name:string|undefined,color:string|undefined):AppState['standaloneAgentContext']
 agent(setting:string|undefined,cli:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition|undefined,definitions:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinitionsResult,options?:{sessionAgentDefinitions?:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinitionsResult;sessionCwd?:string;onResolveMiss?(message:string):void}):{agentDefinition:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition|undefined;agentType:string|undefined}
 permission(mode:string|undefined,explicit:boolean):Promise<import('../permissions/PermissionMode.js').PermissionMode|undefined>
 model(messages:Message[],setting:string|null|undefined,warning?:(message:string)=>void,options?:{storageV5?:undefined;credentials?:import('../officialSecureStorage/runtime.js').CredentialStore}):Promise<string|undefined>
 modelDecision(messages:Message[],setting:string|null|undefined):{kind:'none'|'mode_dependent_setting'}|{kind:'ok';model:string}|{kind:'declined';model:string;reason:string}
 adoption(id:unknown,fork:boolean):{adoptedSessionId:string|null;effectiveFork:boolean}
 forkMetadata<T extends object>(input:T,options?:{stripWorktreeSession?:boolean;stripRelocatedCwd?:boolean}):T
 hookCarrier(placement:'tail'|'head',run:(signal:AbortSignal)=>Promise<HookResultMessage[]>):ResumeHookCarrier287
 alive(value:string|undefined):{sessionId?:string;boundaryAt:string;parentSessionId?:string}|null
 carrier(log:LogOption|undefined,messages:Message[],interruption:{turnInterruptionState:TurnInterruptionState},id:string|undefined,alive:boolean,forkOfLive:boolean,hooks:ResumeHookCarrier287):ResumeLoadResult
 modelIdentity(messages:Message[]):{modelId:string;marketingName:string|null;knowledgeCutoff:string|null}|undefined
 autoMode:{isAutoModeFromFallback():boolean;setProvisionalStartupMode(mode:import('../permissions/PermissionMode.js').PermissionMode|undefined):void;isAutoStartWithheldForHipaaTaint():boolean}
}
export function createSessionRestore287(ports:ReturnType<typeof import('../sessionRestoreBody287.js').createSessionRestoreProductionPorts287>):SessionRestore287
