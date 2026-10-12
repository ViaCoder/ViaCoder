import type {LogOption} from '../../types/logs.js'
import type {Message} from '../../types/message.js'
import type {ResumeLoadResult} from '../sessionRestore.js'
import type {TurnInterruptionState} from '../conversationRecovery.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export interface ResumeLoaderOptions287 {
 forkSession?:boolean;session?:ExecutionSession287;storageV5?:undefined;credentials?:import('../officialSecureStorage/runtime.js').CredentialStore;
 precedingRows?:{rows:Message[];first?:boolean};replyOnResume?:boolean;resumeInterruptedTurn?:boolean;hostAnswerableToolUseIds?:Set<string>;restoredCardToolUseId?:string;
 onSessionResolved?(info:{sessionId:string;transcriptPath?:string}):Promise<void|(()=>void)>|void|(()=>void);
 onNewestRunningInBackground?(info:{sessionId:string;provable:boolean}):void;
}
export interface ResumeController287 {
 sourceModule(file:string):Readonly<Record<string,unknown>>|undefined
 clearReadFileState(cache:import('../fileStateCache.js').FileStateCache):void
 retainAgentNames(names:import('../../state/AppState.js').AppState['agentNameRegistry'],tasks:import('../../state/AppState.js').AppState['tasks']):import('../../state/AppState.js').AppState['agentNameRegistry']
 copyFileHistory(log:LogOption,targetId?:string,storageV5?:undefined):Promise<void>
 readById(id:string,file?:string,storageV5?:undefined,precedingRows?:Message[]):Promise<LogOption|null>
 readFull(log:LogOption,options?:{storageV5?:undefined;onTranscriptUnreadable?(error:unknown):void}):Promise<LogOption>
 mergeHooks(messages:Message[],hooks:Message[]):Message[]
 endedModel(ended:boolean,setState:import('../messageQueueManager.js').SetAppState):void
 clearMetadata():void
 hotState(input:{messages:Message[];fileHistorySnapshots?:LogOption['fileHistorySnapshots']},setState:import('../messageQueueManager.js').SetAppState,sessionHooks:import('../../state/AppState.js').AppState['sessionHooks'],options?:{preserveLiveBudget?:boolean}):void
 restoreMetadata(input:Omit<Partial<LogOption>,'messages'>,options?:{storageV5?:undefined;taintSid?:string}):void
 load(source:string|LogOption|undefined,path:string|undefined,options:ResumeLoaderOptions287):Promise<ResumeLoadResult|null>
 deserialize(messages:Message[],deferred?:Set<string>,reply?:boolean,anchor?:string,autoResume?:boolean,forkOfLive?:boolean,answerable?:Set<string>,restoredCard?:string):{messages:Message[];turnInterruptionState:TurnInterruptionState;supersededToolUseIds:Set<string>;supersededToolNames:Map<string,string>;answeredToolUseIds:Set<string>;rescueSuppressed:boolean}
 filter(messages:Message[]):Message[]
 deferred(path:string,storageV5?:undefined):Promise<ResumeLoadResult['deferredToolUse']|null>
 preceding(messages:Message[],sessionId:string):Message[]
 skills(messages:Message[]):void
}
export function createResumeController287(ports:ReturnType<typeof import('../resumeController287.js').createResumeControllerPorts287>):ResumeController287
