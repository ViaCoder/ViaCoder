import {createHandbackOuterNative287,type HandbackOuterNative287,type OriginalEndTurnInput287} from './native.js'
import type {ToolUseContext} from '../../Tool.js'
import {agentDelivery287} from '../../tools/SendMessageTool/agentDelivery287.js'
import {agentAdmission287} from '../../tools/AgentTool/agentAdmission287.js'
import {adaptHandbackHookContext287,handbackEndTurnNative287} from '../../tools/SendMessageTool/handbackEndTurn287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getSessionCronTasks,getSessionId} from '../../bootstrap/state.js'
import {modelSwitchErrors287} from '../../utils/hooks/modelSwitch287/errors.js'
import {registrationCommitted287} from '../../utils/hooks/modelSwitch287/registrationGate.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {isStorageV5PinnedOn} from '../../utils/secureStorage/storageV5.js'
import {isBareMode,isEnvDefinedFalsy} from '../../utils/envUtils.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {isTeammate} from '../../utils/teammate.js'
import {getCwd} from '../../utils/cwd.js'
import {AbortError,isAbortError,errorMessage} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {getShortcutDisplay} from '../../keybindings/shortcutFormat.js'
import {createUserMessage,createSystemMessage,createUserInterruptionMessage,createStopHookSummaryMessage} from '../../utils/messages.js'
import {createAttachmentMessage} from '../../utils/attachments.js'
import {readConfirmationPermissionContext} from '../../utils/permissions/confirmWithUser.js'
import {getAgentTranscriptPath} from '../../utils/sessionStorage.js'
import {asAgentId} from '../../types/ids.js'
import {executePromptSuggestion} from '../../services/PromptSuggestion/promptSuggestion.js'
import {randomUUID} from 'node:crypto'
import {z} from 'zod/v4'
import {lazySchema} from '../../utils/lazySchema.js'
import {jsonStringify,jsonParse} from '../../utils/slowOperations.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {getModelBehaviorName287} from '../../utils/model/behavior287.js'
import {getClientData} from '../../utils/clientData.js'
import {getIsNonInteractiveSession,getTotalOutputTokens} from '../../bootstrap/state.js'
import {getAgentName,getTeamName} from '../../utils/teammate.js'
import {toolMatchesName} from '../../Tool.js'
import {getTaskListId,listTasks} from '../../utils/tasks.js'
import {isComputerUseActiveThisTurn,clearComputerUseActiveThisTurn} from '../../utils/computerUse/computerUseLock.js'
import {unregisterEscHotkey} from '../../utils/computerUse/escHotkey.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {saveCacheSafeParams} from '../../utils/forkedAgent.js'
import {executeAutoDream} from '../../services/autoDream/autoDream.js'
import {SYNTHETIC_MODEL} from '../../utils/messages.js'
import * as queue from '../../utils/messageQueueManager.js'
import {statSync} from 'node:fs'
import {join} from 'node:path'
import {getClaudeConfigHomeDir,isEnvTruthy} from '../../utils/envUtils.js'
import {getConcurrentSessionWatchOwner287} from '../../utils/concurrentSessions.js'
import {rS} from '../../utils/officialWorktreeState287.generated.js'
import {isFullscreenEnvEnabled} from '../../utils/fullscreen.js'
import {getPostTurnJobExports287} from '../postTurnClient287/index.js'
import {getPostTurnClient287} from '../postTurnClient287/index.js'
import {getMainThreadAgentType} from '../../bootstrap/state.js'
import {enqueueSdkEvent} from '../../utils/sdkEventQueue.js'
import {getSurfaceBridgeRuntime287} from '../../services/context/surface287.js'
import {readOfficialRltDelegatedActive287} from '../../utils/officialRlt287.js'

const hooks=()=>require('../../utils/hooks.js') as typeof import('../../utils/hooks.js')
/** Original normal/child outer; port views read/write the existing owners. */
export function createPublicChildHandbackPorts287():Record<string,unknown>{return {
 postTurnClient287:getPostTurnJobExports287,
 dC:getMainThreadAgentType,Wi:enqueueSdkEvent,Vr:getSurfaceBridgeRuntime287,B1:readOfficialRltDelegatedActive287,
 of:()=>{const fn=getPostTurnClient287().jobs.of;if(typeof fn!=='function')throw Error('Original post-turn job key missing');return fn()},
 dNo:(messages:unknown[])=>{const fn=getPostTurnClient287().projects.dNo;if(typeof fn!=='function')throw Error('Original Projects ask selector missing');return fn(messages)},
 sre:(...args:unknown[])=>{const fn=getPostTurnClient287().projects.sre;if(typeof fn!=='function')throw Error('Original Projects mount predicate missing');return fn(...args)},
 N_e:(...args:unknown[])=>{const fn=getPostTurnClient287().projects.N_e;if(typeof fn!=='function')throw Error('Original Projects tool predicate missing');return fn(...args)},
 Dpn:(...args:unknown[])=>{const fn=getPostTurnClient287().classification.Dpn;if(typeof fn!=='function')throw Error('Original summary detail parser missing');return fn(...args)},
 R2:(...args:unknown[])=>{const fn=getPostTurnClient287().classification.R2;if(typeof fn!=='function')throw Error('Original classifier state missing');return fn(...args)},
 Dt:<T>(promise:Promise<T>,timeoutMs:number,message:string)=>getPostTurnClient287().timing.Dt(promise,timeoutMs,message),
 Hl:modelSwitchErrors287.Hl,Dr:registrationCommitted287,F:isStorageV5PinnedOn,xr:isBareMode,gs:isEnvDefinedFalsy,a:authEnvironment,k:getFeatureValue_CACHED_MAY_BE_STALE,
 t:logForDebugging,l:errorMessage,d:logError,at:isAbortError,Ye:AbortError,Z:errorMessage,
 i:()=>{},m:()=>{},y:()=>{},p:()=>{},c:(value:unknown)=>value,ye:(value:unknown)=>value,
 Re:createUserMessage,Nt:createSystemMessage,ln:createAttachmentMessage,tk:createUserInterruptionMessage,jPo:createStopHookSummaryMessage,
 pe:readConfirmationPermissionContext,q:getSessionId,ml:isTeammate,
 _Ye:(...args:Parameters<typeof agentDelivery287._Ye>)=>agentDelivery287._Ye(...args),S9n:(task:unknown)=>agentDelivery287.S9n(task),
 sq:(...args:Parameters<typeof agentDelivery287.sq>)=>agentDelivery287.sq(...args),b4e:(...args:Parameters<typeof agentDelivery287.b4e>)=>agentDelivery287.b4e(...args),
 FUo:agentDelivery287.FUo,NUo:agentDelivery287.NUo,Dw:agentDelivery287.Dw,
 A2e:()=>(require('../../services/extractMemories/extractMemories.js') as typeof import('../../services/extractMemories/extractMemories.js')).isExtractModeActive287(),bpo:executePromptSuggestion,Joe:agentAdmission287.quietInterrupt,iT:agentAdmission287.isShutdown,Oi:agentAdmission287.abortReason,
 o_:getShortcutDisplay,Jct:(error:Parameters<ReturnType<typeof hooks>['getStopHookMessage']>[0])=>hooks().getStopHookMessage(error),
 YM:handbackEndTurnNative287.managedWebAgent,QR:handbackEndTurnNative287.presence,yl:handbackEndTurnNative287.timeout,
 BS:getSessionCronTasks,oe:getCwd,Sh:(id:string)=>getAgentTranscriptPath(asAgentId(id)),S$o:randomUUID,
 Xc:(_session:unknown,_cwd:string,mode:Parameters<ReturnType<typeof hooks>['createBaseHookInput']>[0],context:ToolUseContext)=>hooks().createBaseHookInput(mode,getExecutionSession287().id,context),
 PA:(options:Parameters<ReturnType<ReturnType<typeof hooks>['getHookExecutionEngine287']>['PA']>[0])=>hooks().getHookExecutionEngine287().PA(options),
 Kin:(...args:Parameters<typeof handbackEndTurnNative287.postToolBatch>)=>handbackEndTurnNative287.postToolBatch(...args),
 Han:saveCacheSafeParams,
 v2e:()=>(require('../../services/extractMemories/extractMemories.js') as typeof import('../../services/extractMemories/extractMemories.js')).getPostTurnMemoryConfig287(),
 Luo:executeAutoDream,
 zPt:(_session:unknown,context:ToolUseContext)=>({get:()=>context.getAppState().computerUseMcpState,update:(f:(state:ReturnType<ToolUseContext['getAppState']>['computerUseMcpState'])=>ReturnType<ToolUseContext['getAppState']>['computerUseMcpState'])=>context.setAppState(state=>{const next=f(state.computerUseMcpState);return next===state.computerUseMcpState?state:{...state,computerUseMcpState:next}})}),
 stn:isComputerUseActiveThisTurn,Fwo:clearComputerUseActiveThisTurn,jwo:unregisterEscHotkey,
 nativeImport:(file:string)=>{if(file==='/$bunfs/root/chunk-6vs8cyk3.js')return import('../../utils/computerUse/executor.js');throw Error('Original outer import not installed: '+file)},
 nativeRequire:(file:string)=>{if(file==='/$bunfs/root/chunk-r4angm37.js'){const m=require('../../services/extractMemories/extractMemories.js') as typeof import('../../services/extractMemories/extractMemories.js');return {isLaptopExtractActive:m.isLaptopExtractDispatched287,isLaptopExtractSync:m.isLaptopExtractSync287,executeExtractMemories:m.executeExtractMemories}}return new Proxy({}, {get:(_target,key)=>{throw Error(`Original outer namespace not installed: ${file}:${String(key)}`)}})},
 Mt:toolMatchesName,
 Fi:'StructuredOutput',me:(v:unknown)=>v,G:(values:unknown[],predicate:(v:unknown)=>boolean)=>values.filter(predicate).length,
 vf:getTotalOutputTokens,Cu:{get reader(){return getFeatureValue_CACHED_MAY_BE_STALE}},
 rj:()=>'bash',_:jsonStringify,Y:jsonParse,f:lazySchema,de:z.record,o:z.string,se:z.unknown,
 _$:()=>getExecutionSession287().host.launchOptions.userMsgOptIn(),bU:getFeatureValue_CACHED_MAY_BE_STALE,
 Ce:getIsNonInteractiveSession,Kd:getClientData,Be:getModelBehaviorName287,rt:getMainLoopModel,
 Ma:SYNTHETIC_MODEL,Pa:(server:string,name:string)=>`mcp__${server}__${name}`,
 Vp:(config:unknown)=>getMcpConnectedProducer287().isCliOwnedMcpConfig(config),
 Ge:()=>getExecutionSession287().identity.mainAgentId(getExecutionSession287().id),Mi:queue.enqueuePendingNotification,
 Qwt:()=>getExecutionSession287().surfaceCapabilities.mainLoopBusy(),MEe:()=>getExecutionSession287().requestJournal.lastCancelledAPIMessageId(),
 // Mu surface admission is original fQo/mQo/hQo, not a default empty sink.
 Pt:()=>authEnvironment.CLAUDE_CODE_SESSION_KIND==='bg',rS,
 sC:(cap:string)=>((getExecutionSession287().surfaceCapabilities as {caps():{remote:{caps?:Record<string,boolean>}|null}}).caps().remote?.caps?.[cap]===true),
 mc:()=>(getExecutionSession287().surfaceCapabilities as {replBridgeActive():boolean}).replBridgeActive(),Sc:isFullscreenEnvEnabled,Le:isEnvTruthy,
 GH:getConcurrentSessionWatchOwner287,rL:statSync,kt:join,A:join,we:getClaudeConfigHomeDir,
 W:(error:unknown)=>(error as NodeJS.ErrnoException).code==='ENOENT',it:errorMessage,
 nh:getAgentName,Ra:getTeamName,xE:getTaskListId,FP:listTasks,
 Kct:(...args:Parameters<ReturnType<typeof hooks>['executeTaskCompletedHooks']>)=>hooks().executeTaskCompletedHooks(...args),zDt:(...args:Parameters<ReturnType<typeof hooks>['getTaskCompletedHookMessage']>)=>hooks().getTaskCompletedHookMessage(...args),
 iGn:(...args:Parameters<ReturnType<typeof hooks>['executeTeammateIdleHooks']>)=>hooks().executeTeammateIdleHooks(...args),s0r:(...args:Parameters<ReturnType<typeof hooks>['getTeammateIdleHookMessage']>)=>hooks().getTeammateIdleHookMessage(...args),

}}
let owner:HandbackOuterNative287|undefined
function native(){return owner??=createHandbackOuterNative287(createPublicChildHandbackPorts287())}
/** Read the original caller-held fs slot; no second classifier state. */
export function getPublicPostTurnClassifierState287(context:ToolUseContext){return native().go(adaptHandbackHookContext287(context))}
export function executePublicStop287(...args:Parameters<HandbackOuterNative287['la']>){
 const values=[...args] as Parameters<HandbackOuterNative287['la']>;values[5]=adaptHandbackHookContext287(args[5]);values[10]=args[10]??native().go(values[5]);return native().la(...values)
}
export function executePublicEndTurn287(input:OriginalEndTurnInput287){
 return native().fc({...input,toolUseContext:adaptHandbackHookContext287(input.toolUseContext),updatedToolUseContext:adaptHandbackHookContext287(input.updatedToolUseContext)})
}

export const executePublicChildStop287=executePublicStop287
export const executePublicChildEndTurn287=executePublicEndTurn287

/** Delegate original no/It to the same namespace used by fc/go/la. */
export function markPublicTurnAborted287(...args:Parameters<HandbackOuterNative287['no']>){
 return native().no(adaptHandbackHookContext287(args[0]),args[1])
}
export function executePublicTurnEndReactions287(...args:Parameters<HandbackOuterNative287['It']>){
 return native().It(adaptHandbackHookContext287(args[0]),args[1],args[2])
}
