import type {UUID} from 'node:crypto'
import type {ToolUseContext} from '../../Tool.js'
import type {Message,AttachmentMessage} from '../../types/message.js'
import {getGitStatus,getUserContextInstructionSnapshot} from '../../context.js'
import {isCoordinatorMode} from '../../coordinator/coordinatorMode.js'
import {shouldIncludeGitInstructions} from '../../utils/gitSettings.js'
import {createAttachmentMessage} from '../../utils/attachments.js'
import {normalizeAttachmentForAPI,isCompactBoundaryMessage} from '../../utils/messages.js'
import {buildPostCompactMessages} from '../compact/compact.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {logError} from '../../utils/log.js'
import {isStorageV5PinnedOn} from '../../utils/secureStorage/storageV5.js'
import {officialContextAttachments as context} from './attachments.js'
import {createContextRouting,createContextRoutingGate,type Stamp} from './official/routing.js'
import {getExecutionSession287} from './execution287.js'
import type {ExecutionSession287} from './officialExecutionOwners287/native.js'
import {getToolSchemaRuntime287} from '../../utils/toolSchema287.js'
import type {InstructionFile,RefreshReason,ContextAttachment} from './official/attachments.js'

/** Actual host ports, not a fabricated storage/account backend. Normal builds
 * obtain files from context.ts; injected hosts may provide their own build. */
export type ContextRuntime = {
 toolsMachine?():import('./officialRuntime287/native.js').ToolsMachineSnapshot|undefined
 workingDirectory?():string|null
 agentProxyNote?():string|null|undefined
 resolvePromptSection?(name:string,text:string|null):Promise<string|null>
 loadInstructions?(storageV5?:unknown,credentials?:unknown):Promise<InstructionFile[]|undefined>
 refreshReason?:RefreshReason
 takeGitPrefetch?():Promise<string|null>|undefined
 storageV5?:unknown;credentials?:unknown
}
const routingGate=createContextRoutingGate({uu:{reader:(name,fallback)=>getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)}})
export function getContextRoutingRendering(messages:readonly Message[]) {return getToolSchemaRuntime287().readPromptSnapshot(messages)?.contextRendering}
export function contextRoutingInput(tool:ToolUseContext&{session?:ExecutionSession287}) {
 return {options:tool.options,session:tool.session??getExecutionSession287(),storageV5:tool.storageV5??tool.contextRuntime?.storageV5,credentials:tool.credentials??tool.contextRuntime?.credentials}
}
/** NTo reads the existing qI leaf without allocating or refreshing an entry.
 * T3 is the original attachment schema's reason vocabulary, not another store. */
function sourceRefreshReason287(value:unknown,reasons:unknown):value is RefreshReason {
 return typeof value==='string'&&Array.isArray(reasons)&&reasons.includes(value)
}
export function getContextRoutingRefreshReason287(session:unknown):RefreshReason|undefined {
 const source=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')
 if(typeof source.NTo!=='function')throw Error('original context refresh reader is not installed')
 const reason=source.NTo(session)
 if(reason===undefined)return
 if(!sourceRefreshReason287(reason,source.T3))throw Error('original context refresh reason violates its attachment schema')
 return reason
}
/** Borrow the complete original date actor and its existing per-session timezone
 * registry. Do not copy the actor or create another date/cache owner. */
export function getContextRoutingDate287():string {
 const date=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-a6fqs976.js').WWr
 if(typeof date!=='function')throw Error('original context date actor is not installed')
 const value=date()
 if(typeof value!=='string')throw Error('original context date actor returned a non-string')
 return value
}
export function createQueryContextRouting(userContext:Record<string,string>,tool:ToolUseContext) {
 const files=getUserContextInstructionSnapshot(userContext),runtime=tool.contextRuntime
 return createContextRouting({
  u:logError,DRt:context.coordinatorContextSchema,LRt:context.contextSectionsSchema,
  PRt:routingGate,
  _Y:messages=>getToolSchemaRuntime287().readPromptSnapshot(messages),
  JMn:context.readInstructions,XMn:context.readSessionContext,wmo:context.readDate,vmo:context.diffInstructions,bmo:context.sameSessionContext,Emo:context.snapshotInstructions,
  // Completed-build C transport: never reread LF's newer account snapshot.
  // The explicit injected host remains a port, not a second Memory cache.
  wLn:(_session,storageV5,credentials)=>runtime?.loadInstructions?runtime.loadInstructions(storageV5,credentials):Promise.resolve(files),
  kgo:session=>getContextRoutingRefreshReason287(session)??runtime?.refreshReason,L:isStorageV5PinnedOn,
  WWr:getContextRoutingDate287,
  LLe:()=>getFeatureValue_CACHED_MAY_BE_STALE('tengu_indexed_corbato',false),Zi:isCoordinatorMode,
  Ego:()=>runtime?.takeGitPrefetch?.(),bbr:()=>!process.env.CLAUDE_CODE_REMOTE&&shouldIncludeGitInstructions(),bLn:getGitStatus,
  tn:createContextAnnouncement,Aa:isCompactBoundaryMessage,WO:buildPostCompactMessages,x:getFeatureValue_CACHED_MAY_BE_STALE,
  // First-party telemetry is intentionally disabled in the local C layer.
  y(){},f(){},Ur(){},gu(){},
 })
}
export function createContextAnnouncement(attachment:ContextAttachment,stamp?:Stamp):AttachmentMessage {
 // tn/xIt/Uan's five-context-type cache projection. Date is a system display;
 // the other four are user/meta displays. No tool or refusal body is synthesized.
 let rendering:Pick<AttachmentMessage,'rendered'|'renderedRole'>={}
 try {
  const normalized=normalizeAttachmentForAPI(attachment)
  if(normalized.length>0)rendering={rendered:normalized.map(n=>({content:n.message.content})),renderedRole:attachment.type==='date'?'system':'user'}
 } catch(error) {logError(error)}
 const message:AttachmentMessage=stamp
  ? {attachment,type:'attachment',uuid:stamp.uuid() as UUID,timestamp:stamp.now()}
  : createAttachmentMessage(attachment)
 return {...message,...rendering}
}
