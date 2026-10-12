import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {AppState} from '../../state/AppState.js'
import type {TaskState} from '../../tasks/types.js'
export interface AgentTaskRegistry287 {
 register(task:TaskState):void
 update<T extends TaskState>(id:string,updater:(task:T)=>T):void
 updateTranscript(id:string,updater:(transcript:AgentTranscript287)=>AgentTranscript287):void
 getTranscript(id:string):AgentTranscript287|undefined
 remove(id:string):void;evictTerminal(id:string):void
 applyOffsetsAndEvict(offsets:Record<string,number>,evictions:string[]):void
 get(id:string):TaskState|undefined;all():AppState['tasks']
 incrementWebSearchCalls():void;getWebSearchCalls():number;resetWebSearchCalls():void
 takeConcurrencySlot():()=>void;getConcurrentSubagents():number
}
export interface AgentTranscript287 {
 messages:unknown[];inProgressToolUseIDs:Set<string>
 turnStartTime?:number|null;totalPausedMs?:number
 progress?:import('../../tasks/LocalAgentTask/LocalAgentTask.js').AgentProgress
}
export interface AgentAdmissionContext287 {
 abortController:AbortController;options:{maxBudgetUsd?:number};session:ExecutionSession287
 taskRegistry:AgentTaskRegistry287;getAppState():AppState;rootToolSurface:{mainLoopModel:string}
}
export interface AgentAdmission287 {
 checkConcurrency(context:AgentAdmissionContext287):Error|undefined
 forContext(context:AgentAdmissionContext287,cleanup:()=>Promise<unknown>):{check(allowInterrupt?:boolean):void;take():Promise<()=>void>}
 permissionStopMessage():string
 abortToken(reason:'permission-stop'|'interrupt'|'turn-abort'|'shutdown'):DOMException
 quietInterrupt(reason:unknown):boolean;isShutdown(signal:AbortSignal):true|undefined
 abortReason(reason:unknown):unknown
}
export function createTaskRegistryNative287(ports:{getState():AppState;setState(updater:(state:AppState)=>AppState):void;en(task:TaskState,setter:(updater:(state:AppState)=>AppState)=>void):void;Jt(id:string,setter:(updater:(state:AppState)=>AppState)=>void,updater:(task:TaskState)=>TaskState):void;tn(id:string,setter:(updater:(state:AppState)=>AppState)=>void):void;nn(setter:(updater:(state:AppState)=>AppState)=>void,offsets:Record<string,number>,evictions:string[]):void;rr():{taskEvicted:{emit(id:string):void}}}):AgentTaskRegistry287
export function createAgentAdmissionNative287(ports:{a:{CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS?:number};zle():number;k(name:string,fallback:boolean):unknown;jC(enabled:boolean|undefined,model:string):boolean;IMe:{of(session:ExecutionSession287):{recordRefused(reason:'budget'|'concurrency_limit'):void}};m(event:string,reason:string):void;Ye:new()=>Error;j:new(message:string)=>Error}):AgentAdmission287
