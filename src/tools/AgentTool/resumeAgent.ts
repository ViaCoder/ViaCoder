import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {ToolUseContext} from '../../Tool.js'
import type {Message,MessageOrigin} from '../../types/message.js'
import type {PermissionMode} from '../../utils/permissions/PermissionMode.js'
import type {AgentToolResult} from './agentToolUtils.js'
import {getOriginalSidechainSource287} from '../../utils/resumeWriter287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {isAgentStopPending} from '../../tasks/LocalAgentTask/LocalAgentTask.js'
import {getAgentUserStopState,clearAgentUserStopped} from './userStopState.js'

export type ResumeAgentResult = {
  agentId: string
  description: string
  outputFile?: string
  alreadyCompleted?: boolean
  inlineHandback?: Pick<AgentToolResult,'content'|'harnessNoteCount'|'harnessTailCount'|'harnessSectionHash'>
}

export type ResumeAgentParams = {
  agentId: string
  prompt: string
  toolUseContext: ToolUseContext
  canUseTool: CanUseToolFn
  invokingRequestId?: string
  parentPromptId?: string
  /** Complete WJ supplies these original Vt delivery fields. */
  promptOrigin?: MessageOrigin
  promptIsMeta?: boolean
  liveTranscript?: () => Message[]
  userInitiated?: boolean
  continueInterruptedTurn?: boolean
  suppressOwnerNotification?: boolean
  workerPermissionMode?: PermissionMode
  onDeliveryCommitted?: () => void
  isWebFetchLaunch?: boolean
}

export async function resumeAgentBackground(params: ResumeAgentParams): Promise<ResumeAgentResult> {
  // Exact C cancellation compatibility: already-running legacy workers and
  // their persisted user-stop file remain authoritative during migration.
  // No lease/task/worker owner is installed here; new execution is all original.
  const stopped=getAgentUserStopState(params.agentId)
  const namespace=getOriginalModsLifecycle287().clearSourceModule287('chunk-wnsb5bq3.js')
  if(isAgentStopPending(params.agentId)) {
    const ErrorType=namespace.Fae as new(message:string)=>Error
    throw new ErrorType(`Agent ${params.agentId} is still stopping; wait for its previous run to exit before resuming`)
  }
  if(stopped.stopped&&params.userInitiated!==true&&params.promptOrigin?.kind!=='observer-activity') {
    const ErrorType=namespace['W$'] as new(message:string)=>Error
    throw new ErrorType(`Agent ${params.agentId} was stopped by the user and will not be automatically resumed`)
  }
  // Full original B4 -> Ne -> Vt owns admission, cold restore and worker launch.
  // Its bC/V4 dependencies share this caller's actual Task/Gm/query/writer.
  const result=await getOriginalSidechainSource287<(input:ResumeAgentParams)=>Promise<ResumeAgentResult>>(
    'chunk-wnsb5bq3.js','B4',
  )(params)
  if(stopped.stopped&&params.userInitiated===true&&!result.alreadyCompleted)clearAgentUserStopped(params.agentId,stopped.count)
  return result
}
