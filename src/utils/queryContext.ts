import {createQueryContext287,type QueryContextInput287} from './officialQueryContext287/native.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getMemoryReadPolicy287} from '../constants/systemComposerMemory287.js'
import {communication287} from '../constants/communication287.js'
/**
 * Shared helpers for building the API cache-key prefix (systemPrompt,
 * userContext, systemContext) for query() calls.
 *
 * Lives in its own file because it imports from context.ts and
 * constants/prompts.ts, which are high in the dependency graph. Putting
 * these imports in systemPrompt.ts or sideQuestion.ts (both reachable
 * from commands.ts) would create cycles. Only entrypoint-layer files
 * import from here (QueryEngine.ts, cli/print.ts).
 */

import type { Command } from '../commands.js'
import { getSystemPrompt } from '../constants/prompts.js'
import { getSystemContext, getUserContext } from '../context.js'
import type { MCPServerConnection } from '../services/mcp/types.js'
import type { AppState } from '../state/AppStateStore.js'
import type { Tools, ToolUseContext } from '../Tool.js'
import type { AgentDefinition } from '../tools/AgentTool/loadAgentsDir.js'
import type { Message } from '../types/message.js'
import { createAbortController } from './abortController.js'
import { getToolState287 } from './toolState287.js'
import type { FileStateCache } from './fileStateCache.js'
import type { CacheSafeParams } from './forkedAgent.js'
import { getMainLoopModel, getRuntimeMainLoopModel } from './model/model.js'
import { asSystemPrompt } from './systemPromptType.js'
import {
  shouldEnableThinkingByDefault,
  type ThinkingConfig,
} from './thinking.js'

/**
 * Fetch the three context pieces that form the API cache-key prefix:
 * systemPrompt parts, userContext, systemContext.
 *
 * When customSystemPrompt is set, the default getSystemPrompt build and
 * getSystemContext are skipped. Dynamic exclusion moves the context values
 * and original excluded-memory section into userContext in source order.
 *
 * Callers assemble the final systemPrompt from defaultSystemPrompt (or
 * customSystemPrompt) + optional extras + appendSystemPrompt. QueryEngine
 * injects coordinator userContext and memory-mechanics prompt on top;
 * sideQuestion's fallback uses the base result directly.
 */
export type FetchSystemPromptPartsInput287 = Omit<QueryContextInput287,'session'> & {
  session?: QueryContextInput287['session']
  additionalWorkingDirectories?: string[]
  mcpClients?: MCPServerConnection[]
}

export async function fetchSystemPromptParts(input:FetchSystemPromptPartsInput287) {
  // Original live QueryEngine xIr() runs before kA/kC/QB prefix assembly.
  ;(require('./hooks/modelSwitch287/promptComposition.js') as typeof import('./hooks/modelSwitch287/promptComposition.js')).applyOriginalPromptInvalidations287()
  // The original IDn owns assembly and exclusion, not a second context cache.
  // Keep the existing CLI adapters for the tools/MCP host arguments.
  const context = createQueryContext287({
    kA:(tools,model,mode)=>getSystemPrompt(tools,model,input.additionalWorkingDirectories,input.mcpClients,mode),
    kC:getUserContext,
    QB:getSystemContext,
    M9:communication287.modelForPrompt,
    v2o:(model,mode)=>getMemoryReadPolicy287().composerPorts.v2o(model,mode),
  })
  return context.fetchSystemPromptParts({...input,session:input.session??getExecutionSession287()})
}

/**
 * Build CacheSafeParams from raw inputs when getLastCacheSafeParams() is null.
 *
 * Used by the SDK side_question handler (print.ts) on resume before a turn
 * completes — there's no stopHooks snapshot yet. Original pyr deliberately
 * calls IDn with analysisOnly, not Um: side questions do not add Um's
 * coordinator/custom-memory/tool-qualified/append-head sections.
 */
export async function buildSideQuestionFallbackParams({
  tools,
  commands,
  mcpClients,
  messages,
  readFileState,
  getAppState,
  setAppState,
  customSystemPrompt,
  appendSystemPrompt,
  thinkingConfig,
  agents,
  session = getExecutionSession287(),
  toolUseContext: parentContext,
  toolState,
  messageQueue,
  toolCatalog,
  sessionHooks,
  runQuery,
  storageV5 = parentContext?.storageV5,
  credentials = parentContext?.credentials,
  excludeDynamicSections,
  turnInProgress = false,
}: {
  tools: Tools
  commands: Command[]
  mcpClients: MCPServerConnection[]
  messages: Message[]
  readFileState: FileStateCache
  getAppState: () => AppState
  setAppState: (f: (prev: AppState) => AppState) => void
  customSystemPrompt: string | readonly string[] | undefined
  appendSystemPrompt: string | undefined
  thinkingConfig: ThinkingConfig | undefined
  agents: AgentDefinition[]
  session?: FetchSystemPromptPartsInput287['session']
  toolUseContext?: ToolUseContext
  toolState?: ToolUseContext['toolState']
  messageQueue?: unknown
  toolCatalog?: unknown
  sessionHooks?: ToolUseContext['sessionHooksRegistry']
  runQuery?: ToolUseContext['options']['runQuery']
  storageV5?: ToolUseContext['storageV5']
  credentials?: ToolUseContext['credentials']
  excludeDynamicSections?: boolean
  turnInProgress?: boolean
}): Promise<CacheSafeParams & {advisorModel?: string}> {
  const appState: AppState & {cacheBreakerPhrase?: string; autoCompactWindow?: number} = getAppState()
  const mainLoopModel = getRuntimeMainLoopModel({
    permissionMode: appState.toolPermissionContext.mode,
    mainLoopModel: getMainLoopModel(),
  })

  const { defaultSystemPrompt, userContext, systemContext } =
    await fetchSystemPromptParts({
      session,
      tools,
      mainLoopModel,
      additionalWorkingDirectories: Array.from(
        appState.toolPermissionContext.additionalWorkingDirectories.keys(),
      ),
      mcpClients,
      customSystemPrompt,
      excludeDynamicSections,
      cacheBreakerPhrase: appState.cacheBreakerPhrase,
      analysisOnly: true,
      storageV5,
      credentials,
    })

  // Lazy access avoids queryContext -> queryAssembly -> queryContext TDZ.
  // Reuse only the original e_e splitter; pyr does not invoke Um.
  const {splitCustom} = (require('./queryAssembly287.js') as typeof import('./queryAssembly287.js')).createProductionQueryAssembly287()
  const systemPrompt = asSystemPrompt([
    ...(customSystemPrompt !== undefined
      ? typeof customSystemPrompt === 'string' ? splitCustom(customSystemPrompt) : customSystemPrompt
      : defaultSystemPrompt),
    ...(appendSystemPrompt ? [appendSystemPrompt] : []),
  ])

  // Strip in-progress assistant message (stop_reason === null) — same guard
  // as btw.tsx. The SDK can fire side_question mid-turn.
  const last = messages.at(-1)
  const forkContextMessages =
    turnInProgress && last?.type === 'assistant' && last.message.stop_reason === null
      ? messages.slice(0, -1)
      : messages

  const toolUseContext: ToolUseContext & {
    session: NonNullable<FetchSystemPromptPartsInput287['session']>
    messageQueue?: unknown
    sessionHooksRegistry?: unknown
    options: ToolUseContext['options'] & {fastMode?: boolean; cacheBreakerPhrase?: string; toolCatalog?: unknown; runQuery?: ToolUseContext['options']['runQuery']}
  } = {
    ...parentContext,
    session,
    storageV5,
    credentials,
    ...(messageQueue !== undefined && {messageQueue}),
    ...(sessionHooks !== undefined && {sessionHooksRegistry: sessionHooks}),
    options: {
      ...parentContext?.options,
      commands,
      debug: false,
      mainLoopModel,
      tools,
      verbose: false,
      thinkingConfig:
        thinkingConfig ??
        (shouldEnableThinkingByDefault() !== false
          ? { type: 'adaptive' }
          : { type: 'disabled' }),
      mcpClients,
      mcpResources: {},
      isNonInteractiveSession: true,
      agentDefinitions: { activeAgents: agents, allAgents: [] },
      customSystemPrompt,
      ...(customSystemPrompt !== undefined && {omitGitStatus: true}),
      appendSystemPrompt,
      autoCompactWindow: appState.autoCompactWindow,
      fastMode: appState.fastMode,
      cacheBreakerPhrase: appState.cacheBreakerPhrase,
      ...(toolCatalog !== undefined && {toolCatalog}),
      ...(runQuery !== undefined && {runQuery}),
    },
    abortController: createAbortController(),
    toolState: toolState ?? parentContext?.toolState ?? getToolState287(session),
    toolDecisions: new Map(),
    readFileState,
    getAppState,
    setAppState,
    messages: forkContextMessages,
    setInProgressToolUseIDs: parentContext?.setInProgressToolUseIDs ?? (() => {}),
    setResponseLength: parentContext?.setResponseLength ?? (() => {}),
    updateFileHistoryState: parentContext?.updateFileHistoryState ?? (() => {}),
    updateAttributionState: parentContext?.updateAttributionState ?? (() => {}),
  }

  return {
    systemPrompt,
    userContext,
    systemContext,
    toolUseContext,
    forkContextMessages,
    advisorModel: appState.advisorModel,
  }
}
