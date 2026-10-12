import type {Tool,ToolUseContext,ToolResult,ToolCallEvent287,ToolProgressData} from '../../Tool.js'
import type {HooksSettings} from '../../utils/settings/types.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {LoadedModule287} from '../../tools/AgentTool/officialAgentAvailability287/native.js'
import type {ModsRegistry287} from '../../utils/plugins/officialModsRegistryOwner287/native.js'
import type {PrintLifecycleNative287} from '../../tools/GetTaskTool/printLifecycleNative.js'
import {createPrintDetachedRuntime287,type DetachedContext287,type ForegroundCall287,type DetachedRuntimePorts287} from './detachedRuntimeNative.js'
import {getExecutionSession287,getLegacyExecutionContext287} from '../../services/context/execution287.js'
import {printDetachedSlot287} from '../../tools/GetTaskTool/printLifecycle287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {agentPromptState287} from '../../services/context/agentPromptState287.js'
import {modsRegistryOwner287} from '../../utils/plugins/modsRegistryOwner287.js'
import {getRegisteredHooks} from '../../bootstrap/state.js'
import {getHooksConfigFromSnapshot} from '../../utils/hooks/hooksConfigSnapshot.js'
import {getSessionHooks,getSessionFunctionHooks} from '../../utils/hooks/sessionHooks.js'
import {getSettingsForSource,getSettings_DEPRECATED} from '../../utils/settings/settings.js'
import {getSettingsWithAllErrors} from '../../utils/settings/allErrors.js'
import {Bt} from '../../utils/officialHostFilesystem287/native.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getGetTaskFeatureState287} from '../../utils/task/getTaskSession287.js'
import {logEvent} from '../../services/analytics/index.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {enqueuePendingNotification} from '../../utils/messageQueueManager.js'
import {parentManagedPolicyIncluded287} from './parentPolicy287.js'

interface HookScope287 {mainThreadAgentHooks?:HooksSettings}
interface HookRegistryOwner287 {mainThreadAgentHooks():HooksSettings|undefined}
// Keep the single KS owner in printLifecycle287, but defer reading its live
// export until the detached caller actually uses it. printLifecycle287's
// task/tool imports can re-enter this module during ESM initialization.
const canonicalDetachedSlot287:PrintLifecycleNative287['detachedSlot']={
 of:execution=>printDetachedSlot287.of(execution),
}
// All business state ports read existing owners. The original w6e guard
// and complete bje/AXr selector share the actual SDK-parent policy source.
export const printOwnershipPorts287:DetachedRuntimePorts287={
 executionContext:getExecutionSession287,legacyContext:getLegacyExecutionContext287,
 detachedSlot:canonicalDetachedSlot287,process,environment:authEnvironment,
 feature:<T>(name:string,fallback:T):T=>{const pinned=getGetTaskFeatureState287().pinnedFeatureValues;return pinned?.has(name)?pinned.get(name) as T:getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)},
 backgroundPolicy:()=>agentPromptState287.backgroundPolicy(),
 debug:logForDebugging,logError,analytics:logEvent,
 enqueueNotification:enqueuePendingNotification,filesystem:Bt,
 hookSnapshot:getHooksConfigFromSnapshot,registeredHooks:getRegisteredHooks,
 mainThreadAgentHooks:()=>{const legacy=getLegacyExecutionContext287();return legacy?(legacy as HookScope287).mainThreadAgentHooks:(getExecutionSession287().hookRegistry as HookRegistryOwner287).mainThreadAgentHooks()},
 modsRegistry:()=>modsRegistryOwner287.registry() as ModsRegistry287<LoadedModule287>,
 settingsForSource:getSettingsForSource,settings:()=>getSettings_DEPRECATED(),
 settingsErrors:()=>getSettingsWithAllErrors().errors,
 parentManagedPolicyIncluded:parentManagedPolicyIncluded287,
}
export const printOwnership287=createPrintDetachedRuntime287(printOwnershipPorts287)

export const printForegroundSlot287=printOwnership287.foregroundSlot

export function getForegroundDetachedCalls287(session=getExecutionSession287()):ForegroundCall287[] {
 return printOwnership287.foregroundSlot.peek(session)?.list()??[]
}
/** A2/qEt is the only scheduling consumer. This export adds no scheduler. */
export function backgroundDetachedCalls287(calls:readonly ForegroundCall287[]):number {
 return printOwnership287.background(calls)
}
export function detachedContext287(context:ToolUseContext):DetachedContext287 {
 return {...context,session:getExecutionSession287(),sessionHooksRegistry:{
  get:(id,event)=>getSessionHooks(context.getAppState(),id,event),
  getFunctionHooks:(id,event)=>getSessionFunctionHooks(context.getAppState(),id,event),
  has:(id,event)=>{const state=context.getAppState();return !!getSessionHooks(state,id,event).get(event)?.length||!!getSessionFunctionHooks(state,id,event).get(event)?.length},
 }}
}
export function callWithPrintOwnership287<T extends ToolResult<unknown>>(input:{tool:Tool;input:unknown;toolUseID:string;context:ToolUseContext;onProgress:(value:ToolCallEvent287<ToolProgressData>)=>void;run(context:ToolUseContext,onProgress?:(value:ToolCallEvent287<ToolProgressData>)=>void):Promise<T>}) {
 const context=detachedContext287(input.context)
 if(!printOwnership287.eligible(input.tool,input.input,context))return input.run(input.context,input.onProgress)
 return printOwnership287.run({tool:input.tool,input:input.input,toolUseID:input.toolUseID,toolUseContext:context,onProgress:input.onProgress,run:input.run})
}
/** Uses the original xK actor in the actual context's YL store. */
export async function withDetachedPermissionWait287<T>(context:ToolUseContext,callback:()=>Promise<T>):Promise<T> {
 const counter=context.toolState.get(printOwnership287.PromptCounter)
 counter.count++
 try{return await callback()}finally{counter.count--}
}
