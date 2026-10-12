import type {z} from 'zod/v4'
import type {ToolUseContext, ToolPermissionContext, Tools} from '../Tool.js'
import type {AppState} from '../state/AppState.js'
import type {Message} from '../types/message.js'
import type {AgentDefinition, AgentDefinitionsResult} from '../tools/AgentTool/loadAgentsDir.js'
import type {ExecutionSession287} from '../services/context/officialExecutionOwners287/native.js'
import {getExecutionSession287, runWithExecutionSession287} from '../services/context/execution287.js'
import {getClearLifecycleBinding287, runWithCompactLifecycleContext287} from '../commands/clear/lifecycle287.js'
import type {ContextData} from './analyzeContext.js'
import type {ContextUsageDetail} from './contextUsageDetail.js'
import type {ContextTokenCounter} from './contextUsageDetail.js'
import type {LocalJSXCommandContext, LocalJSXCommandOnDone} from '../types/command.js'
import {toAttachmentAssemblerContext287, runWithAttachmentAssemblerContext287} from './attachmentAssembler287.js'

export type ContextAnalysisToolContext287 = Pick<ToolUseContext, 'credentials' | 'storageV5'> & {
  options: Partial<ToolUseContext['options']> & {
    systemPromptSnapshot?: unknown
    excludeDynamicSections?: boolean
  }
  getMcp?: () => AppState['mcp']
  agentId?: ToolUseContext['agentId']
}

export type ContextAnalysisOptions287 = {
  session: ExecutionSession287
  terminalWidth?: number
  toolUseContext?: ContextAnalysisToolContext287
  mainThreadAgentDefinition?: AgentDefinition
  originalMessages?: Message[]
  configuredWindow?: number
  excludeDynamicSections?: boolean
  detail?: ContextUsageDetail
}

export type CollectContextDataInput287 = Pick<ContextAnalysisToolContext287, 'credentials' | 'storageV5' | 'getMcp'> & {
  session?: ExecutionSession287
  messages: Message[]
  getAppState: () => AppState
  detail?: ContextUsageDetail
  terminalWidth?: number
  options: ContextAnalysisToolContext287['options'] & {
    mainLoopModel: string
    tools: Tools
    agentDefinitions: AgentDefinitionsResult
  }
}

export type SDKContextUsageHost287 = Pick<ContextAnalysisToolContext287, 'credentials' | 'storageV5'> & {
  session: ExecutionSession287
  engineState: () => AppState
  contextUsageInputs: () => Pick<CollectContextDataInput287, 'messages'> &
    Omit<CollectContextDataInput287['options'], 'mainLoopModel'> & {mainLoopModel?: string}
  redactsPersistedLane: () => boolean
}

/** ABI-only adapters. All original bodies, counters, caches and composition
 * dependencies resolve the same namespace used by the actual lifecycle owner.
 * Reading context neither runs clear/compact nor creates another execution. */
function sourceCall<T>(file: string, name: string, ...args: unknown[]): T {
  return (getClearLifecycleBinding287(file, name) as (...values: unknown[]) => T)(...args)
}

function withContext<T>(session: ExecutionSession287, context: Pick<ContextAnalysisToolContext287, 'credentials' | 'storageV5'> | undefined, callback: () => T): T {
  return runWithExecutionSession287(session, () => runWithCompactLifecycleContext287({
    session, credentials: context?.credentials, storageV5: context?.storageV5,
  }, callback))
}

export function analyzeOriginalContext287(messages: Message[], model: string,
  getPermissions: () => Promise<ToolPermissionContext>, tools: Tools,
  agents: AgentDefinitionsResult, options: ContextAnalysisOptions287): Promise<ContextData> {
  return withContext(options.session, options.toolUseContext, () =>
    sourceCall<Promise<ContextData>>('chunk-mphp7acd.js', 'ran', messages, model, getPermissions, tools, agents, options))
}

export function collectOriginalContext287(context: CollectContextDataInput287): Promise<ContextData> {
  const session = context.session ?? getExecutionSession287()
  return withContext(session, context, () =>
    sourceCall<Promise<ContextData>>('chunk-gp6vj8en.js', 'cte', {...context, session}))
}

export function formatOriginalContext287(data: ContextData): string {
  return sourceCall<string>('chunk-gp6vj8en.js', 'wJt', data)
}

export function projectOriginalContext287(data: ContextData): Record<string, unknown> {
  return sourceCall<Record<string, unknown>>('chunk-mphp7acd.js', 'abt', data)
}

export function getOriginalContextResponseSchema287(): z.ZodType<ContextData> {
  return sourceCall<z.ZodType<ContextData>>('chunk-f2cpzzp9.js', 'bmt')
}

/** The SDK control handler returns full cte data; abt belongs to the slash
 * command's contextUsage attachment, not this response. */
export function getOriginalSDKContextUsage287(request: {detail?: ContextUsageDetail}, host: SDKContextUsageHost287): Promise<ContextData> {
  return withContext(host.session, host, () =>
    sourceCall<Promise<ContextData>>('chunk-1b45yw62.js', 'qe', request, host))
}

export function callOriginalInteractiveContext287(onDone: LocalJSXCommandOnDone,
  context: LocalJSXCommandContext, args: string): Promise<null> {
  const view = toAttachmentAssemblerContext287(context)
  return runWithAttachmentAssemblerContext287(view, () => withContext(view.session, view, () =>
    sourceCall('chunk-2zfzkhkv.js', 'In', onDone, view, args)))
}

export function callOriginalContext287(args: string, context: CollectContextDataInput287): Promise<{
  type: 'text'; value: string; contextUsage: Record<string, unknown>
}> {
  const session = context.session ?? getExecutionSession287()
  return withContext(session, context, () =>
    sourceCall('chunk-gp6vj8en.js', 'Hss', args, {...context, session}))
}

export function countOriginalToolDefinitions287(tools: Tools,
  getPermissions: () => Promise<ToolPermissionContext>, agents: AgentDefinitionsResult | null,
  model?: string, counter?: ContextTokenCounter): Promise<number> {
  return sourceCall('chunk-mphp7acd.js', 'rx', tools, getPermissions, agents, model,
    undefined, undefined, undefined, counter)
}

export function countOriginalMcpTools287(tools: Tools,
  getPermissions: () => Promise<ToolPermissionContext>, agents: AgentDefinitionsResult | null,
  model: string, messages?: Message[], counter?: ContextTokenCounter): Promise<{
    mcpToolTokens: number; mcpToolDetails: ContextData['mcpTools'];
    deferredToolTokens: number; loadedMcpToolNames: Set<string>
  }> {
  const posture = sourceCall('chunk-mphp7acd.js', 'Lke', {})
  return sourceCall('chunk-mphp7acd.js', 'Zlo', tools, getPermissions, agents, model,
    messages, undefined, posture, undefined, undefined, counter)
}
