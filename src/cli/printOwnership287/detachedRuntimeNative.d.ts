import type {Tool,ToolUseContext,ToolResult,ToolCallEvent287,ToolProgressData} from '../../Tool.js'
import type {ExecutionSession287,LegacyExecutionContext287} from '../../services/context/officialExecutionOwners287/native.js'
import type {PrintLifecycleNative287} from '../../tools/GetTaskTool/printLifecycleNative.js'
import type {TypedEnvironment287} from '../../utils/officialTypedEnvironment287/native.js'
import type {OfficialHostFilesystem287} from '../../utils/officialHostFilesystem287/native.js'
import type {ModsRegistry287} from '../../utils/plugins/officialModsRegistryOwner287/native.js'
import type {LoadedModule287} from '../../tools/AgentTool/officialAgentAvailability287/native.js'
import type {SettingSource} from '../../utils/settings/constants.js'
import type {SettingsJson,HooksSettings} from '../../utils/settings/types.js'
import type {ValidationError} from '../../utils/settings/validation.js'
import type {HookEvent} from '../../entrypoints/agentSdkTypes.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
export interface SessionHooksRegistry287 {
 get(id:string,event:HookEvent):Map<HookEvent,readonly {matcher?:string;hooks:readonly unknown[]}[]>
 getFunctionHooks(id:string,event:HookEvent):Map<HookEvent,readonly {matcher?:string;hooks:readonly unknown[]}[]>
 has(id:string,event:HookEvent):boolean
}
export type DetachedContext287=ToolUseContext & {session:ExecutionSession287;sessionHooksRegistry:SessionHooksRegistry287;remoteCall?:unknown}
export interface ForegroundCall287 {toolUseId:string;backgroundNow():boolean}
export interface DetachedResult287 extends ToolResult<undefined> {detached:{text:string}}
export interface DetachedRuntimePorts287 {
 executionContext():ExecutionSession287
 legacyContext():LegacyExecutionContext287|undefined
 detachedSlot:PrintLifecycleNative287['detachedSlot']
 debug:typeof import('../../utils/debug.js').logForDebugging
 logError:typeof import('../../utils/log.js').logError
 analytics:typeof import('../../services/analytics/index.js').logEvent
 environment:TypedEnvironment287
 feature<T>(name:string,fallback:T):T
 enqueueNotification(command:QueuedCommand,options:{turnAttribution:'inherit'}):void
 filesystem():OfficialHostFilesystem287
 hookSnapshot():HooksSettings|null
 registeredHooks:typeof import('../../bootstrap/state.js').getRegisteredHooks
 mainThreadAgentHooks():HooksSettings|undefined
 modsRegistry():ModsRegistry287<LoadedModule287>
 backgroundPolicy():import('../../tools/AgentTool/officialAgentPromptState287/native.js').BackgroundPolicy287
 settingsForSource(source:SettingSource):SettingsJson|null
 settings():SettingsJson
 settingsErrors():ValidationError[]
 parentManagedPolicyIncluded():boolean
 process:NodeJS.Process
}
export interface DetachedRuntime287 {
 eligible(tool:Tool,input:unknown,context:DetachedContext287):boolean
 run<T extends ToolResult<unknown>>(input:{tool:Tool;input:unknown;toolUseID:string;toolUseContext:DetachedContext287;onProgress?:(value:ToolCallEvent287<ToolProgressData>)=>void;run(context:DetachedContext287,onProgress?:((value:ToolCallEvent287<ToolProgressData>)=>void)):Promise<T>}):Promise<T|DetachedResult287>
 background(calls:readonly ForegroundCall287[]):number
 foregroundSlot:{of(session:ExecutionSession287):{add(call:ForegroundCall287):()=>void;list():ForegroundCall287[]};peek(session:ExecutionSession287):{list():ForegroundCall287[]}|undefined}
 PromptCounter:new()=>{count:number}
 mapDetachedText(tool:string,options:{isOnScreen:boolean}):string
 render(input:{tool:Tool;toolUseID:string;toolUseContext:DetachedContext287;result:ToolResult<unknown>;isOnScreen:boolean;stillHeard():boolean}):Promise<void>
 notify(input:{toolName:string;toolUseID:string;status:'completed'|'failed';text:string;passive:boolean;isOnScreen:boolean}):'delivered'|'degraded'|'dropped'
}
export function createPrintDetachedRuntime287(ports:DetachedRuntimePorts287):DetachedRuntime287
