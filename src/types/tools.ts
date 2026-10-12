/** Recovered from BashTool/PowerShellTool generators, MCP client progress,
 * AgentTool/SkillTool emitters, WebSearchTool and TaskOutputTool.
 * REPL fields are evidenced by the official reducers and SDK formatter.
 * Workflow progress follows the public workflow task/SDK event discriminators.
 */
import type { AgentId } from './ids.js'
import type { NormalizedAssistantMessage, NormalizedUserMessage } from './message.js'
import type { TaskState } from '../tasks/types.js'

type ShellProgressFields = {
  output: string
  fullOutput: string
  elapsedTimeSeconds: number
  totalLines: number
  totalBytes?: number
  taskId?: string
  timeoutMs?: number
}
export type BashProgress = ShellProgressFields & { type: 'bash_progress' }
export type PowerShellProgress = ShellProgressFields & { type: 'powershell_progress' }
export type ShellProgress = BashProgress | PowerShellProgress
export type AgentToolProgress = {
  type: 'agent_progress'
  message: NormalizedAssistantMessage | NormalizedUserMessage
  prompt: string
  agentId: AgentId
  agentType?: string
  isBuiltIn?: boolean
  description?: string
}
export type SkillToolProgress = Omit<AgentToolProgress, 'type'> & { type: 'skill_progress' }
export type MCPProgress = {
  type: 'mcp_progress'
  status: 'started' | 'completed' | 'failed' | 'progress'
  serverName: string
  toolName: string
  elapsedTimeMs?: number
  progress?: number
  total?: number
  progressMessage?: string
}
export type WebSearchProgress =
  | { type: 'query_update'; query: string }
  | { type: 'search_results_received'; query: string; resultCount: number }
export type TaskOutputProgress = {
  type: 'waiting_for_task'
  taskDescription: string
  taskType: TaskState['type']
}
/** SDK task_progress.workflow_progress delta. Official public workflow runtime
 * emits phase and agent records; log records are filtered before SDK output.
 * Fields beyond the stable discriminator/index are optional as updates are
 * sparse and clients upsert successive deltas by type and index. */
export type SdkWorkflowProgress =
  | { type: 'workflow_phase'; index: number; title: string; kind?: string }
  | {
      type: 'workflow_agent'
      index: number
      label: string
      phaseIndex?: number
      phaseTitle?: string
      agentId?: string
      agentType?: string
      model?: string
      state?: string
      error?: string
      tokens?: number
      toolCalls?: number
      startedAt?: number
      queuedAt?: number
      lastProgressAt?: number
      resultPreview?: string
      promptPreview?: string
      cached?: boolean
      blocked?: boolean
    }
export type ToolProgressData = REPLToolProgress | ShellProgress | AgentToolProgress | SkillToolProgress | MCPProgress | WebSearchProgress | TaskOutputProgress

/** Official chunk-7sqj04a7 reducer, chunk-7dz9rvcm SDK formatter and
 * CollapsedReadSearchContent.tsx. The inner tool input is opaque to the wrapper. */
export type REPLToolProgress = {
  type: 'repl_tool_call'
  phase: 'start' | 'complete' | 'error'
  toolUseId: string
  toolName: string
  toolInput: unknown
}
