import { feature } from 'bun:bundle'
import {agentAdmission287} from './agentAdmission287.js'
import {agentPriming287,agentPrimingPorts287} from './agentPriming287.js'
import {createAgentPromptCaller287} from './officialAgentPriming287/native.js'
import {agentDelivery287} from '../SendMessageTool/agentDelivery287.js'
import {readConfirmationPermissionContext} from '../../utils/permissions/confirmWithUser.js'
import {installAgentHandbackContract287} from '../SendMessageTool/subagentHandback287.js'
import {toolMatchesName} from '../../Tool.js'
import type { UUID } from 'crypto'
import { randomUUID } from 'crypto'
import uniqBy from 'lodash-es/uniqBy.js'
import { logForDebugging } from 'src/utils/debug.js'
import { getProjectRoot, getSessionId } from '../../bootstrap/state.js'
import { getCommand, getSkillToolCommands, hasCommand } from '../../commands.js'
import {
  enhanceSystemPromptWithEnvDetails,
} from '../../constants/prompts.js'
import type { QuerySource } from '../../constants/querySource.js'
import { getSystemContext, getUserContext } from '../../context.js'
import type { CanUseToolFn } from '../../hooks/useCanUseTool.js'
import { query } from '../../query.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { getDumpPromptsPath } from '../../services/api/dumpPrompts.js'
import { cleanupAgentTracking } from '../../services/api/promptCacheBreakDetection.js'
import {
  connectToServer,
  fetchToolsForClient,
} from '../../services/mcp/client.js'
import {readAgentMcpConfigIngress287} from '../../services/mcp/officialAgentConfig287/readers.js'
import { getClaudeCodeMcpConfigs, getMcpConfigByName } from '../../services/mcp/config.js'
import { waitForAgentMcpTools } from '../../services/mcp/agentReadiness.js'
import { resolveMcpSdkGeneration } from '../../services/mcp/v2Lifecycle.js'
import { hashMcpConfig } from '../../services/mcp/utils.js'
import type {
  ConnectedMCPServerV2,
  MCPServerConnection,
  ScopedMcpServerConfig,
  ServerResource,
} from '../../services/mcp/types.js'
import type { Tool, Tools, ToolUseContext } from '../../Tool.js'
import { killShellTasksForAgent } from '../../tasks/LocalShellTask/killShellTasks.js'
import type { Command } from '../../types/command.js'
import type { AgentId } from '../../types/ids.js'
import type {
  ActiveGoalEvent,
  AssistantMessage,
  Message,
  ProgressMessage,
  RequestStartEvent,
  StreamEvent,
  SystemCompactBoundaryMessage,
  TombstoneMessage,
  ToolUseSummaryMessage,
  UserMessage,
} from '../../types/message.js'
import { createAttachmentMessage } from '../../utils/attachments.js'
import { AbortError } from '../../utils/errors.js'
import { getDisplayPath } from '../../utils/file.js'
import {
  cloneFileStateCache,
  createFileStateCacheWithSizeLimit,
  READ_FILE_STATE_CACHE_SIZE,
} from '../../utils/fileStateCache.js'
import {
  type CacheSafeParams,
  createSubagentContext,
} from '../../utils/forkedAgent.js'
import { registerFrontmatterHooks } from '../../utils/hooks/registerFrontmatterHooks.js'
import { clearSessionHooks } from '../../utils/hooks/sessionHooks.js'
import { executeSubagentStartHooks } from '../../utils/hooks.js'
import { createUserMessage } from '../../utils/messages.js'
import { getAgentModel } from '../../utils/model/agent.js'
import type { ModelAlias } from '../../utils/model/aliases.js'
import {
  clearAgentTranscriptSubdir,
  recordSidechainTranscript,
  setAgentTranscriptSubdir,
  writeAgentMetadata,
} from '../../utils/sessionStorage.js'
import {
  isRestrictedToPluginOnly,
  isSourceAdminTrusted,
} from '../../utils/settings/pluginOnlyPolicy.js'
import {
  asSystemPrompt,
  type SystemPrompt,
} from '../../utils/systemPromptType.js'
import {
  isPerfettoTracingEnabled,
  registerAgent as registerPerfettoAgent,
  unregisterAgent as unregisterPerfettoAgent,
} from '../../utils/telemetry/perfettoTracing.js'
import type { ContentReplacementState } from '../../utils/toolResultStorage.js'
import { createAgentId } from '../../utils/uuid.js'
import { resolveAgentTools } from './agentToolUtils.js'
import { type AgentDefinition, isBuiltInAgent } from './loadAgentsDir.js'
import { getAgentMcpSnapshot } from './agentMcpSnapshot.js'
import { acquireInlineAgentV2, bindAgentResourceTool, bindAgentV2Tool, findCanonicalAgentV2Tool,
  getAgentV2ToolBinding, type InlineAgentV2Lease } from './agentV2Routing.js'

/**
 * Initialize agent-specific MCP servers
 * Agents can define their own MCP servers in their frontmatter that are additive
 * to the parent's MCP clients. These servers are connected when the agent starts
 * and cleaned up when the agent finishes.
 *
 * @param agentDefinition The agent definition with optional mcpServers
 * @param toolUseContext Current status/real-pool owner context
 * @returns Agent-local clients, V2 leases, tools, resources, and cleanup function
 */
export async function initializeAgentMcpServers(
  agentDefinition: AgentDefinition,
  toolUseContext: ToolUseContext,
  signal: AbortSignal,
): Promise<{
  agentClients: MCPServerConnection[]
  v2Clients: ConnectedMCPServerV2[]
  inlineLeases: InlineAgentV2Lease[]
  tools: Tools
  resources: Record<string, ServerResource[]>
  cleanup: () => Promise<void>
}> {
  const parentClients = toolUseContext.getAppState().mcp.clients
  // No Agent-local clients to add.
  if (!agentDefinition.mcpServers?.length) {
    return {
      agentClients: [],
      v2Clients: [],
      inlineLeases: [],
      tools: [],
      resources: {},
      cleanup: async () => {},
    }
  }

  // Complete original j6e owns strict/enterprise/plugin-only/name/transport
  // qualification, policy order, parent precedence and host refusal insertion.
  const parentConfigs=Object.fromEntries([...toolUseContext.options.mcpClients,...parentClients].map(client=>[client.name,client.config]))
  const configuredServers=readAgentMcpConfigIngress287()(parentConfigs,agentDefinition,{
    strictMcpConfig:toolUseContext.options.strictMcpConfig,
    onBlocked:names=>logForDebugging(`[Agent: ${agentDefinition.agentType}] MCP servers blocked by policy: ${names.join(', ')}`),
  })

  const agentClients: MCPServerConnection[] = []
  // Track which clients were newly created (inline definitions) vs. shared from parent
  // Only newly created clients should be cleaned up when the agent finishes
  const newlyCreatedClients: MCPServerConnection[] = []
  const agentV2Clients: ConnectedMCPServerV2[] = []
  const inlineLeases: InlineAgentV2Lease[] = []
  const agentTools: Tool[] = []
  const agentResources: Record<string, ServerResource[]> = {}
  // The canonical React owner reads this same public config source. Load it
  // only when no published/inherited status identifies a server yet.
  let publicConfigs: Promise<Record<string, ScopedMcpServerConfig>> | undefined
  const publicConfig = async (name: string) => {
    publicConfigs ??= getClaudeCodeMcpConfigs().then(result => result.servers)
    return (await publicConfigs)[name] ?? null
  }

  try {
  for (const spec of agentDefinition.mcpServers) {
    signal.throwIfAborted()
    let config: ScopedMcpServerConfig | null = null
    let name: string
    let isNewlyCreated = false
    let namedConfig: ScopedMcpServerConfig | null = null

    if (typeof spec === 'string') {
      // Reference by name - look up in existing MCP configs
      // V1 uses memoized connectToServer below; V2 routes through its lifecycle.
      name = spec
      const inheritedConfig = parentClients.find(client => client.name === spec)?.config ??
        toolUseContext.options.mcpClients?.find(client => client.name === spec)?.config
      if (!inheritedConfig) namedConfig = getMcpConfigByName(spec) ?? await publicConfig(spec)
      config = inheritedConfig ?? namedConfig
      if (!config) {
        logForDebugging(
          `[Agent: ${agentDefinition.agentType}] MCP server not found: ${spec}`,
          { level: 'warn' },
        )
        continue
      }
    } else {
      // Inline definition as { [name]: config }
      // These are agent-specific servers that should be cleaned up
      const entries = Object.entries(spec)
      if (entries.length !== 1) {
        logForDebugging(
          `[Agent: ${agentDefinition.agentType}] Invalid MCP server spec: expected exactly one key`,
          { level: 'warn' },
        )
        continue
      }
      const [serverName] = entries[0]!
      name = serverName
      config = configuredServers[name] ?? null
      if(!config)continue
      // Preserve the original temporary scope/agentSource and config identity.
      // An inherited collision stays parent-owned, never Agent-cleaned.
      isNewlyCreated = config !== parentConfigs[name]
    }

    // The selected generation is latched by the official-derived selector.
    // The legacy connectToServer/fetchToolsForClient below is V1-only. Reuse
    // an existing V2 owner or use the mature selected-discovery lifecycle for
    // an agent-specific server; no V2→V1 SDK cast is involved.
    if (resolveMcpSdkGeneration() === 'v2') {
      const current = toolUseContext.getAppState()
      const snapshot = getAgentMcpSnapshot(current)
      const status = current.mcp.clients.find(client => client.name === name)
      // A named reference resolved from the parent or persisted config is a
      // canonical server, even before its owner publishes the first status.
      // An inline object absent from those sources remains Agent-local.
      const publicCanonical = !status && !toolUseContext.options.mcpClients?.some(client => client.name === name)
        ? await publicConfig(name) : null
      const knownCanonical = (
        toolUseContext.options.mcpClients?.some(client => client.name === name &&
          client.config.scope === config.scope && hashMcpConfig(client.config) === hashMcpConfig(config)) ||
        namedConfig?.scope === config.scope &&
          hashMcpConfig(namedConfig) === hashMcpConfig(config) ||
        publicCanonical?.scope === config.scope &&
          hashMcpConfig(publicCanonical) === hashMcpConfig(config)
      )
      const sameCanonical = status && status.config.scope === config.scope &&
        hashMcpConfig(status.config) === hashMcpConfig(config)
      const canonical = sameCanonical && status.type === 'v2-connected'
        ? snapshot.v2Clients.find(client => client.name === name &&
            client.config.scope === config.scope && hashMcpConfig(client.config) === hashMcpConfig(config))
        : undefined
      if (canonical && status) {
        agentV2Clients.push(canonical)
        agentClients.push(status)
        agentTools.push(...snapshot.tools.filter(tool => tool.mcpInfo?.serverName === name))
        continue
      }
      if (sameCanonical || knownCanonical || typeof spec === 'string' && status) {
        throw new Error(`Agent MCP server "${name}" is disconnected: no matching live V2 runtime`)
      }
      const lease = await acquireInlineAgentV2(name, config, toolUseContext.getAppState)
      inlineLeases.push(lease)
      const selected = await lease.projection(signal)
      if (selected.client.type === 'connected' && 'v2Client' in selected.client) {
        const real = selected.client
        agentV2Clients.push(real)
        agentClients.push({
          name: real.name,
          type: 'v2-connected',
          generation: 'v2',
          config: real.config,
          capabilities: real.capabilities,
          serverInfo: real.serverInfo,
          instructions: real.instructions,
        })
      } else {
        agentClients.push(selected.client)
      }
      agentTools.push(...selected.tools)
      if (selected.resources) agentResources[name] = selected.resources
      continue
    }

    // Connect to the server
    const client = await connectToServer(name, config)
    agentClients.push(client)
    if (isNewlyCreated) {
      newlyCreatedClients.push(client)
    }
    signal.throwIfAborted()

    // Fetch tools if connected
    if (client.type === 'connected') {
      const tools = await fetchToolsForClient(client)
      agentTools.push(...tools)
      logForDebugging(
        `[Agent: ${agentDefinition.agentType}] Connected to MCP server '${name}' with ${tools.length} tools`,
      )
    } else {
      logForDebugging(
        `[Agent: ${agentDefinition.agentType}] Failed to connect to MCP server '${name}': ${client.type}`,
        { level: 'warn' },
      )
    }
  }
  } catch (error) {
    for (const lease of inlineLeases) await lease.release()
    for (const client of newlyCreatedClients) if (client.type === 'connected') await client.cleanup()
    throw error
  }

  // Create cleanup function for agent-specific servers
  // Only clean up newly created clients (inline definitions), not shared/referenced ones
  // Shared clients (referenced by string name) are memoized and used by the parent context
  const cleanup = async () => {
    for (const lease of inlineLeases) await lease.release()
    for (const client of newlyCreatedClients) {
      if (client.type === 'connected') {
        try {
          await client.cleanup()
        } catch (error) {
          logForDebugging(
            `[Agent: ${agentDefinition.agentType}] Error cleaning up MCP server '${client.name}': ${error}`,
            { level: 'warn' },
          )
        }
      }
    }
  }

  // Parent clients remain in the app state; only Agent-local ownership is returned.
  return {
    agentClients,
    v2Clients: agentV2Clients,
    inlineLeases,
    tools: agentTools,
    resources: agentResources,
    cleanup,
  }
}

type QueryMessage =
  | import('../../Tool.js').ToolQueryControlEvent287
  | ActiveGoalEvent
  | StreamEvent
  | RequestStartEvent
  | Message
  | ToolUseSummaryMessage
  | TombstoneMessage

/**
 * Type guard to check if a message from query() is a recordable Message type.
 * Matches the types we want to record: assistant, user, progress, or system compact_boundary.
 */
function isRecordableMessage(
  msg: QueryMessage,
): msg is
  | AssistantMessage
  | UserMessage
  | ProgressMessage
  | SystemCompactBoundaryMessage {
  return (
    msg.type === 'assistant' ||
    msg.type === 'user' ||
    msg.type === 'progress' ||
    (msg.type === 'system' &&
      'subtype' in msg &&
      msg.subtype === 'compact_boundary')
  )
}

export async function* runAgent({
  agentDefinition,
  promptMessages,
  toolUseContext,
  canUseTool,
  isAsync,
  canShowPermissionPrompts,
  forkContextMessages,
  querySource,spawnedBySkill,stickyBetas,name,recordedUuids,
  override,
  model,
  maxTurns,
  preserveToolUseResults,
  availableTools,
  allowedTools,
  onCacheSafeParams,
  contentReplacementState,
  useExactTools,
  worktreePath,
  description,
  transcriptSubdir,
  onQueryProgress,
  handbackOptIn,
  handbackTool,
  requiresStructuredOutput,
}: {
  agentDefinition: AgentDefinition
  promptMessages: Message[]
  toolUseContext: ToolUseContext
  canUseTool: CanUseToolFn
  isAsync: boolean
  /** Whether this agent can show permission prompts. Defaults to !isAsync.
   * Set to true for in-process teammates that run async but share the terminal. */
  canShowPermissionPrompts?: boolean
  forkContextMessages?: Message[]
  querySource: QuerySource
  spawnedBySkill?: string
  stickyBetas?: import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287
  name?:string
  recordedUuids?:ReadonlySet<string>
  override?: {
    userContext?: { [k: string]: string }
    systemContext?: { [k: string]: string }
    systemPrompt?: SystemPrompt
    abortController?: AbortController
    agentId?: AgentId
    onRetryStatus?: ToolUseContext['onRetryStatus']
    subscribeRetryWake?: ToolUseContext['subscribeRetryWake']
  }
  model?: ModelAlias
  maxTurns?: number
  /** Preserve toolUseResult on messages for subagents with viewable transcripts */
  preserveToolUseResults?: boolean
  /** Precomputed tool pool for the worker agent. Computed by the caller
   * (AgentTool.tsx) to avoid a circular dependency between runAgent and tools.ts.
   * Always contains the full tool pool assembled with the worker's own permission
   * mode, independent of the parent's tool restrictions. */
  availableTools: Tools | (() => Tools)
  /** Tool permission rules to add to the agent's session allow rules.
   * When provided, replaces ALL allow rules so the agent only has what's
   * explicitly listed (parent approvals don't leak through). */
  allowedTools?: string[]
  /** Optional callback invoked with CacheSafeParams after constructing the agent's
   * system prompt, context, and tools. Used by background summarization to fork
   * the agent's conversation for periodic progress summaries. */
  onCacheSafeParams?: (params: CacheSafeParams) => void
  /** Replacement state reconstructed from a resumed sidechain transcript so
   * the same tool results are re-replaced (prompt cache stability). When
   * omitted, createSubagentContext clones the parent's state. */
  contentReplacementState?: ContentReplacementState
  /** When true, use availableTools directly without filtering through
   * resolveAgentTools(). Also inherits the parent's thinkingConfig and
   * isNonInteractiveSession instead of overriding them. Used by the fork
   * subagent path to produce byte-identical API request prefixes for
   * prompt cache hits. */
  useExactTools?: boolean
  /** Worktree path if the agent was spawned with isolation: "worktree".
   * Persisted to metadata so resume can restore the correct cwd. */
  worktreePath?: string
  /** Original task description from AgentTool input. Persisted to metadata
   * so a resumed agent's notification can show the original description. */
  description?: string
  /** Optional subdirectory under subagents/ to group this agent's transcript
   * with related ones (e.g. workflows/<runId> for workflow subagents). */
  transcriptSubdir?: string
  /** Optional callback fired on every message yielded by query() — including
   * stream_event deltas that runAgent otherwise drops. Use to detect liveness
   * during long single-block streams (e.g. thinking) where no assistant
   * message is yielded for >60s. */
  onQueryProgress?: () => void
  handbackOptIn?: boolean
  handbackTool?: Tool
  requiresStructuredOutput?: boolean
}): AsyncGenerator<Message, void> {
  // Track subagent usage for feature discovery

  const appState = toolUseContext.getAppState()
  const permissionMode = appState.toolPermissionContext.mode
  // Always-shared channel to the root AppState store. toolUseContext.setAppState
  // is a no-op when the *parent* is itself an async agent (nested async→async),
  // so session-scoped writes (hooks, bash tasks) must go through this instead.
  const rootSetAppState =
    toolUseContext.setAppStateForTasks ?? toolUseContext.setAppState

  const resolvedAgentModel = getAgentModel(
    agentDefinition.model,
    toolUseContext.options.mainLoopModel,
    model,
    permissionMode,
  )

  const agentId = override?.agentId ? override.agentId : createAgentId()

  // Route this agent's transcript into a grouping subdirectory if requested
  // (e.g. workflow subagents write to subagents/workflows/<runId>/).
  if (transcriptSubdir) {
    setAgentTranscriptSubdir(agentId, transcriptSubdir)
  }

  // Register agent in Perfetto trace for hierarchy visualization
  if (isPerfettoTracingEnabled()) {
    const parentId = toolUseContext.agentId ?? getSessionId()
    registerPerfettoAgent(agentId, agentDefinition.agentType, parentId)
  }

  // Log API calls path for subagents (ant-only)
  if (process.env.USER_TYPE === 'ant') {
    logForDebugging(
      `[Subagent ${agentDefinition.agentType}] API calls: ${getDisplayPath(getDumpPromptsPath(agentId))}`,
    )
  }

  // Handle message forking for context sharing
  // Filter out incomplete tool calls from parent messages to avoid API errors
  const contextMessages: Message[] = forkContextMessages
    ? filterIncompleteToolCalls(forkContextMessages)
    : []
  const initialMessages: Message[] = [...contextMessages, ...promptMessages]

  const agentReadFileState =
    forkContextMessages !== undefined
      ? cloneFileStateCache(toolUseContext.readFileState)
      : createFileStateCacheWithSizeLimit(READ_FILE_STATE_CACHE_SIZE)

  const [baseUserContext, baseSystemContext] = await Promise.all([
    override?.userContext ?? getUserContext(),
    override?.systemContext ?? getSystemContext(),
  ])

  // Read-only agents (Explore, Plan) don't act on commit/PR/lint rules from
  // CLAUDE.md — the main agent has full context and interprets their output.
  // Dropping claudeMd here saves ~5-15 Gtok/week across 34M+ Explore spawns.
  // Explicit override.userContext from callers is preserved untouched.
  // Kill-switch defaults true; flip tengu_slim_subagent_claudemd=false to revert.
  const shouldOmitClaudeMd =
    agentDefinition.omitClaudeMd &&
    !override?.userContext &&
    getFeatureValue_CACHED_MAY_BE_STALE('tengu_slim_subagent_claudemd', true)
  const { claudeMd: _omittedClaudeMd, ...userContextNoClaudeMd } =
    baseUserContext
  const resolvedUserContext = shouldOmitClaudeMd
    ? userContextNoClaudeMd
    : baseUserContext

  // Explore/Plan are read-only search agents — the parent-session-start
  // gitStatus (up to 40KB, explicitly labeled stale) is dead weight. If they
  // need git info they run `git status` themselves and get fresh data.
  // Saves ~1-3 Gtok/week fleet-wide.
  const { gitStatus: _omittedGitStatus, ...systemContextNoGit } =
    baseSystemContext
  const resolvedSystemContext =
    agentDefinition.agentType === 'Explore' ||
    agentDefinition.agentType === 'Plan'
      ? systemContextNoGit
      : baseSystemContext

  // Override permission mode if agent defines one
  // However, don't override if parent is in bypassPermissions or acceptEdits mode - those should always take precedence
  // For async agents, also set shouldAvoidPermissionPrompts since they can't show UI
  const agentPermissionMode = agentDefinition.permissionMode
  const agentGetAppState = () => {
    const state = toolUseContext.getAppState()
    let toolPermissionContext = state.toolPermissionContext

    // Override permission mode if agent defines one (unless parent is bypassPermissions, acceptEdits, or auto)
    if (
      agentPermissionMode &&
      state.toolPermissionContext.mode !== 'bypassPermissions' &&
      state.toolPermissionContext.mode !== 'acceptEdits' &&
      !(
        feature('TRANSCRIPT_CLASSIFIER') &&
        state.toolPermissionContext.mode === 'auto'
      )
    ) {
      toolPermissionContext = {
        ...toolPermissionContext,
        mode: agentPermissionMode,
      }
    }

    // Set flag to auto-deny prompts for agents that can't show UI
    // Use explicit canShowPermissionPrompts if provided, otherwise:
    //   - bubble mode: always show prompts (bubbles to parent terminal)
    //   - default: !isAsync (sync agents show prompts, async agents don't)
    const shouldAvoidPrompts =
      canShowPermissionPrompts !== undefined
        ? !canShowPermissionPrompts
        : agentPermissionMode === 'bubble'
          ? false
          : isAsync
    if (shouldAvoidPrompts) {
      toolPermissionContext = {
        ...toolPermissionContext,
        shouldAvoidPermissionPrompts: true,
      }
    }

    // For background agents that can show prompts, await automated checks
    // (classifier, permission hooks) before showing the permission dialog.
    // Since these are background agents, waiting is fine — the user should
    // only be interrupted when automated checks can't resolve the permission.
    // This applies to bubble mode (always) and explicit canShowPermissionPrompts.
    if (isAsync && !shouldAvoidPrompts) {
      toolPermissionContext = {
        ...toolPermissionContext,
        awaitAutomatedChecksBeforeDialog: true,
      }
    }

    // Scope tool permissions: when allowedTools is provided, use them as session rules.
    // IMPORTANT: Preserve cliArg rules (from SDK's --allowedTools) since those are
    // explicit permissions from the SDK consumer that should apply to all agents.
    // Only clear session-level rules from the parent to prevent unintended leakage.
    if (allowedTools !== undefined) {
      toolPermissionContext = {
        ...toolPermissionContext,
        alwaysAllowRules: {
          // Preserve SDK-level permissions from --allowedTools
          cliArg: state.toolPermissionContext.alwaysAllowRules.cliArg,
          // Use the provided allowedTools as session-level permissions
          session: [...allowedTools],
        },
      }
    }

    // Override effort level if agent defines one
    const effortValue =
      agentDefinition.effort !== undefined
        ? agentDefinition.effort
        : state.effortValue

    if (
      toolPermissionContext === state.toolPermissionContext &&
      effortValue === state.effortValue
    ) {
      return state
    }
    return {
      ...state,
      toolPermissionContext,
      effortValue,
    }
  }

  // Official ho/Wt await DLe only for ordinary agents, then read the current
  // MCP projection. Exact fork keeps its parent's tool snapshot unchanged.
  if (!useExactTools) {
    await waitForAgentMcpTools(() => toolUseContext.getAppState().mcp)
  }
  const currentAvailableTools = typeof availableTools === 'function'
    ? availableTools() : availableTools
  const resolvedTools = useExactTools
    ? currentAvailableTools
    : resolveAgentTools(agentDefinition, currentAvailableTools, isAsync).resolvedTools

  const additionalWorkingDirectories = Array.from(
    appState.toolPermissionContext.additionalWorkingDirectories.keys(),
  )

  const agentSystemPrompt = override?.systemPrompt
    ? override.systemPrompt
    : asSystemPrompt(
        await getAgentSystemPrompt(
          agentDefinition,
          toolUseContext,
          resolvedAgentModel,
          additionalWorkingDirectories,
          resolvedTools,
        ),
      )

  // Determine abortController:
  // - Override takes precedence
  // - Async agents get a new unlinked controller (runs independently)
  // - Sync agents share parent's controller
  const agentAbortController = override?.abortController
    ? override.abortController
    : isAsync
      ? new AbortController()
      : toolUseContext.abortController

  let agentToolUseContext: ToolUseContext | undefined
  let mcpCleanup: () => Promise<void> = async () => {}
  try {

  // Execute SubagentStart hooks and collect additional context
  const additionalContexts: string[] = []
  for await (const hookResult of executeSubagentStartHooks(
    agentId,
    agentDefinition.agentType,
    agentAbortController.signal,
  )) {
    if (
      hookResult.additionalContexts &&
      hookResult.additionalContexts.length > 0
    ) {
      additionalContexts.push(...hookResult.additionalContexts)
    }
  }

  // Add SubagentStart hook context as a user message (consistent with SessionStart/UserPromptSubmit)
  if (additionalContexts.length > 0) {
    const contextMessage = createAttachmentMessage({
      type: 'hook_additional_context',
      content: additionalContexts,
      hookName: 'SubagentStart',
      toolUseID: randomUUID(),
      hookEvent: 'SubagentStart',
    })
    initialMessages.push(contextMessage)
  }

  // Register agent's frontmatter hooks (scoped to agent lifecycle)
  // Pass isAgent=true to convert Stop hooks to SubagentStop (since subagents trigger SubagentStop)
  // Same admin-trusted gate for frontmatter hooks: under ["hooks"] alone
  // (skills/agents not locked), user agents still load — block their
  // frontmatter-hook REGISTRATION here where source is known, rather than
  // blanket-blocking all session hooks at execution time (which would
  // also kill plugin agents' hooks).
  const hooksAllowedForThisAgent =
    !isRestrictedToPluginOnly('hooks') ||
    isSourceAdminTrusted(agentDefinition.source)
  if (agentDefinition.hooks && hooksAllowedForThisAgent) {
    registerFrontmatterHooks(
      rootSetAppState,
      agentId,
      agentDefinition.hooks,
      `agent '${agentDefinition.agentType}'`,
      true, // isAgent - converts Stop to SubagentStop
    )
  }

  // Preload skills from agent frontmatter
  const skillsToPreload = agentDefinition.skills ?? []
  if (skillsToPreload.length > 0) {
    const allSkills = await getSkillToolCommands(getProjectRoot())

    // Filter valid skills and warn about missing ones
    const validSkills: Array<{
      skillName: string
      skill: (typeof allSkills)[0] & { type: 'prompt' }
    }> = []

    for (const skillName of skillsToPreload) {
      // Resolve the skill name, trying multiple strategies:
      // 1. Exact match (hasCommand checks name, userFacingName, aliases)
      // 2. Fully-qualified with agent's plugin prefix (e.g., "my-skill" → "plugin:my-skill")
      // 3. Suffix match on ":skillName" for plugin-namespaced skills
      const resolvedName = resolveSkillName(
        skillName,
        allSkills,
        agentDefinition,
      )
      if (!resolvedName) {
        logForDebugging(
          `[Agent: ${agentDefinition.agentType}] Warning: Skill '${skillName}' specified in frontmatter was not found`,
          { level: 'warn' },
        )
        continue
      }

      const skill = getCommand(resolvedName, allSkills)
      if (skill.type !== 'prompt') {
        logForDebugging(
          `[Agent: ${agentDefinition.agentType}] Warning: Skill '${skillName}' is not a prompt-based skill`,
          { level: 'warn' },
        )
        continue
      }
      validSkills.push({ skillName, skill })
    }

    // Load all skill contents concurrently and add to initial messages
    const { formatSkillLoadingMetadata } = await import(
      '../../utils/processUserInput/processSlashCommand.js'
    )
    const loaded = await Promise.all(
      validSkills.map(async ({ skillName, skill }) => ({
        skillName,
        skill,
        content: await skill.getPromptForCommand('', toolUseContext),
      })),
    )
    for (const { skillName, skill, content } of loaded) {
      logForDebugging(
        `[Agent: ${agentDefinition.agentType}] Preloaded skill '${skillName}'`,
      )

      // Add command-message metadata so the UI shows which skill is loading
      const metadata = formatSkillLoadingMetadata(
        skillName,
        skill.progressMessage,
      )

      initialMessages.push(
        createUserMessage({
          content: [{ type: 'text', text: metadata }, ...content],
          isMeta: true,
        }),
      )
    }
  }

  // Initialize agent-specific MCP servers (additive to parent's servers)
  const {
    agentClients: agentMcpClients,
    v2Clients: agentV2Clients,
    inlineLeases,
    tools: agentMcpTools,
    resources: agentMcpResources,
    cleanup,
  } = await initializeAgentMcpServers(
    agentDefinition,
    toolUseContext,
    agentAbortController.signal,
  )
  mcpCleanup = cleanup

  // Exact forks inherit the parent's tool definitions, including an inline
  // MCP tool whose parent may settle first. Give the child its own lease on
  // the shared owner; never retain the parent's cleanup responsibility.
  for (const tool of resolvedTools) {
    const inherited = getAgentV2ToolBinding(tool)
    if (inherited?.source !== 'inline') continue
    const already = inlineLeases.some(lease => lease.name === inherited.name &&
      lease.config.scope === inherited.config.scope && hashMcpConfig(lease.config) === hashMcpConfig(inherited.config))
    if (already || findCanonicalAgentV2Tool(toolUseContext.getAppState(), inherited.name,
      inherited.config, inherited.toolName)) continue
    const lease = await acquireInlineAgentV2(inherited.name, inherited.config, toolUseContext.getAppState)
    inlineLeases.push(lease)
    const projected = await lease.projection(agentAbortController.signal)
    if (projected.client.type === 'connected' && 'v2Client' in projected.client) {
      agentV2Clients.push(projected.client)
      agentMcpClients.push({ name: projected.client.name, type: 'v2-connected', generation: 'v2',
        config: projected.client.config, capabilities: projected.client.capabilities,
        serverInfo: projected.client.serverInfo, instructions: projected.client.instructions })
    }
  }

  // Merge agent MCP tools with resolved agent tools, deduplicating by name.
  // Complete j6e has already resolved config collisions parent-first. The
  // selected Tool/connection instances remain identical in agentOptions below.
  const rawTools =
    agentMcpTools.length > 0
      ? uniqBy([...agentMcpTools, ...resolvedTools], 'name')
      : resolvedTools

  const currentForBindings = toolUseContext.getAppState()
  const canonicalV2 = getAgentMcpSnapshot(currentForBindings).v2Clients
  let allTools = rawTools.map(tool => {
    const resourceTool = bindAgentResourceTool(tool, agentMcpClients, inlineLeases)
    if (resourceTool !== tool) return resourceTool
    const serverName = tool.mcpInfo?.serverName
    const toolName = tool.mcpInfo?.toolName
    if (!serverName || !toolName) return tool
    const inherited = getAgentV2ToolBinding(tool)
    const ownLease = inlineLeases.find(lease => lease.name === serverName)
    const initialClient = agentV2Clients.find(client => client.name === serverName) ??
      canonicalV2.find(client => client.name === serverName) ??
      toolUseContext.options.mcpV2Clients?.find(client => client.name === serverName)
    const config = ownLease?.config ?? inherited?.config ?? initialClient?.config
    if (!config) return tool // V1 MCP tool: leave its mature wrapper intact.
    const source = ownLease ? 'inline' as const : 'canonical' as const
    return bindAgentV2Tool(tool, { name: serverName, toolName, config, source,
      lease: source === 'inline' ? ownLease : undefined })
  })

  // Original bC Lt: opt-in, ordinary tools, non-structured invocation,
  // no conflicting handback tool, and BOTH caller and child auto-mode.
  const handbackEnabled=handbackOptIn===true&&!useExactTools&&!requiresStructuredOutput&&handbackTool!==undefined&&
    !allTools.some(tool=>toolMatchesName(tool,agentDelivery287.Dw)&&tool!==handbackTool)&&
    agentDelivery287.DUo(readConfirmationPermissionContext(toolUseContext))&&agentGetAppState().toolPermissionContext.mode==='auto'
  installAgentHandbackContract287(toolUseContext,agentId,handbackEnabled,handbackOptIn===true)
  if(handbackEnabled&&handbackTool&&!allTools.includes(handbackTool))allTools=[...allTools,handbackTool]
  const handbackReminder=agentDelivery287.$Uo(initialMessages)
  if(handbackEnabled&&handbackReminder!=='reminder')initialMessages.push(createUserMessage({content:`<system-reminder>\n${agentDelivery287.MUo()}\n</system-reminder>`,isMeta:true}))
  else if(!handbackEnabled&&handbackOptIn===true&&handbackReminder==='reminder')initialMessages.push(createUserMessage({content:`<system-reminder>\n${agentDelivery287.LUo()}\n</system-reminder>`,isMeta:true}))

  // React publishes status, true V2 clients, and projected tools together.
  // Re-read the current pool after agent-specific setup; never V2→V1-cast.
  const currentState = toolUseContext.getAppState()
  const currentMcp = currentState.mcp
  const currentV2 = getAgentMcpSnapshot(currentState).v2Clients
  const clientByName = new Map(currentMcp.clients.map(client => [client.name, client]))
  for (const client of agentMcpClients) clientByName.set(client.name, client)
  const v2ByName = new Map(currentV2.map(client => [client.name, client]))
  for (const client of agentV2Clients) v2ByName.set(client.name, client)

  // Build agent-specific options
  const agentOptions: ToolUseContext['options'] = {
    runQuery:toolUseContext.options.runQuery,
    spawnedBySkill,
    ...(handbackEnabled&&{requiresHandback:true}),
    isNonInteractiveSession: useExactTools
      ? toolUseContext.options.isNonInteractiveSession
      : isAsync
        ? true
        : (toolUseContext.options.isNonInteractiveSession ?? false),
    appendSystemPrompt: toolUseContext.options.appendSystemPrompt,
    tools: allTools,
    commands: [],
    debug: toolUseContext.options.debug,
    verbose: toolUseContext.options.verbose,
    mainLoopModel: resolvedAgentModel,
    // Official tv's child options inherit n.options.fallbackModel and pass it
    // to the same runQuery path; this is a conditional fallback, not a probe.
    fallbackModel: toolUseContext.options.fallbackModel,
    // Fork children retain the cache-identical parent config. When text
    // forwarding is requested, retain the parent preference too; otherwise
    // keep the local default of disabling regular child thinking.
    thinkingConfig: useExactTools || toolUseContext.options.forwardSubagentText
      ? toolUseContext.options.thinkingConfig
      : { type: 'disabled' as const },
    forwardSubagentText: toolUseContext.options.forwardSubagentText,
    mcpClients: [...clientByName.values()],
    mcpV2Clients: [...v2ByName.values()],
    mcpResources: { ...currentMcp.resources, ...agentMcpResources },
    agentDefinitions: toolUseContext.options.agentDefinitions,
    // Fork children (useExactTools path) need querySource on context.options
    // for the recursive-fork guard at AgentTool.tsx call() — it checks
    // options.querySource === 'agent:builtin:fork'. This survives autocompact
    // (which rewrites messages, not context.options). Without this, the guard
    // reads undefined and only the message-scan fallback fires — which
    // autocompact defeats by replacing the fork-boilerplate message.
    ...(useExactTools && { querySource }),
  }

  // Create subagent context using shared helper
  // - Sync agents share setAppState, setResponseLength, abortController with parent
  // - Async agents are fully isolated (but with explicit unlinked abortController)
  agentToolUseContext = createSubagentContext(toolUseContext, {
    options: agentOptions,
    agentId,
    isBackgroundAgent:isAsync,
    agentType: agentDefinition.agentType,
    messages: initialMessages,
    readFileState: agentReadFileState,
    abortController: agentAbortController,
    getAppState: agentGetAppState,
    // Sync agents share these callbacks with parent
    shareSetAppState: !isAsync,
    shareSetResponseLength: true, // Both sync and async contribute to response metrics
    criticalSystemReminder_EXPERIMENTAL:
      agentDefinition.criticalSystemReminder_EXPERIMENTAL,
    contentReplacementState,
    onRetryStatus: override?.onRetryStatus,
    subscribeRetryWake: override?.subscribeRetryWake,
  })

  if(toolUseContext.dialogAgentContext287) agentToolUseContext.dialogAgentContext287={agentType:'subagent',isMainSession:false,isAsync,subagentName:agentDefinition.agentType};

  // Preserve tool use results for subagents with viewable transcripts (in-process teammates)
  if (preserveToolUseResults) {
    agentToolUseContext.preserveToolUseResults = true
  }

  // Expose cache-safe params for background summarization (prompt cache sharing)
  if (onCacheSafeParams) {
    onCacheSafeParams({
      systemPrompt: agentSystemPrompt,
      userContext: resolvedUserContext,
      systemContext: resolvedSystemContext,
      toolUseContext: agentToolUseContext,
      forkContextMessages: initialMessages,
    })
  }

  // Record initial messages before the query loop starts, plus the agentType
  // so resume can route correctly when subagent_type is omitted. Both writes
  // are fire-and-forget — persistence failure shouldn't block the agent.
  void recordSidechainTranscript(initialMessages, agentId).catch(_err =>
    logForDebugging(`Failed to record sidechain transcript: ${_err}`),
  )
  void writeAgentMetadata(agentId, {
    agentType: agentDefinition.agentType,
    ...(worktreePath && { worktreePath }),
    ...(description && { description }),
  }).catch(_err => logForDebugging(`Failed to write agent metadata: ${_err}`))

  // Track the last recorded message UUID for parent chain continuity
  let lastRecordedUuid: UUID | null = initialMessages.at(-1)?.uuid ?? null

    for await (const message of (agentToolUseContext.options.runQuery??query)({
      messages: initialMessages,
      systemPrompt: agentSystemPrompt,
      userContext: resolvedUserContext,
      systemContext: resolvedSystemContext,
      canUseTool,
      toolUseContext: agentToolUseContext,
      querySource,spawnedBySkill,
      stickyBetas,
      forkPointUuid:forkContextMessages!==undefined?(require('../../utils/toolSchema287.js') as typeof import('../../utils/toolSchema287.js')).getToolSchemaRuntime287().queryForkPoint287(forkContextMessages):undefined,
      evictCacheOnComplete:(require('../../utils/toolSchema287.js') as typeof import('../../utils/toolSchema287.js')).getToolSchemaRuntime287().queryAgentEviction287({stickyBetas,useExactTools,name,recordedUuids}),
      // This query contract accepts one fallback; a local compact-only chain
      // is not an Agent model choice and is never coerced into a string.
      fallbackModel: typeof agentToolUseContext.options.fallbackModel === 'string'
        ? agentToolUseContext.options.fallbackModel : undefined,
      agentCacheTtlOverride: agentDefinition.cacheTtl,
      maxTurns: maxTurns ?? agentDefinition.maxTurns,
    })) {
      onQueryProgress?.()
      // Forward subagent API request starts to parent's metrics display
      // so TTFT/OTPS update during subagent execution.
      if (
        message.type === 'stream_event' &&
        message.event.type === 'message_start' &&
        message.ttftMs != null
      ) {
        toolUseContext.pushApiMetricsEntry?.(message.ttftMs)
        continue
      }

      // Yield attachment messages (e.g., structured_output) without recording them
      if (message.type === 'attachment') {
        // Handle max turns reached signal from query.ts
        if (message.attachment.type === 'max_turns_reached') {
          logForDebugging(
            `[Agent
: $
{
  agentDefinition.agentType
}
] Reached max turns limit ($
{
  message.attachment.maxTurns
}
)`,
          )
          break
        }
        yield message
        continue
      }

      if (isRecordableMessage(message)) {
        // Record only the new message with correct parent (O(1) per message)
        await recordSidechainTranscript(
          [message],
          agentId,
          lastRecordedUuid,
        ).catch(err =>
          logForDebugging(`Failed to record sidechain transcript: ${err}`),
        )
        if (message.type !== 'progress') {
          lastRecordedUuid = message.uuid
        }
        yield message
      }
    }

    if (agentAbortController.signal.aborted) {
      throw new AbortError(agentAdmission287.abortReason(agentAbortController.signal.reason)==='permission-stop'?agentAdmission287.permissionStopMessage():undefined)
    }

    // Run callback if provided (only built-in agents have callbacks)
    if (isBuiltInAgent(agentDefinition) && agentDefinition.callback) {
      agentDefinition.callback()
    }
  } finally {
    // Clean up agent-specific MCP servers (runs on normal completion, abort, or error)
    await mcpCleanup()
    // Clean up agent's session hooks
    if (agentDefinition.hooks) {
      clearSessionHooks(rootSetAppState, agentId)
    }
    // Clean up prompt cache tracking state for this agent
    if (feature('PROMPT_CACHE_BREAK_DETECTION')) {
      cleanupAgentTracking(agentId)
    }
    // Release cloned file state cache memory
    agentToolUseContext?.readFileState.clear()
    // Release the cloned fork context messages
    initialMessages.length = 0
    // Release perfetto agent registry entry
    unregisterPerfettoAgent(agentId)
    // Release transcript subdir mapping
    clearAgentTranscriptSubdir(agentId)
    // Release this agent's todos entry. Without this, every subagent that
    // called TodoWrite leaves a key in AppState.todos forever (even after all
    // items complete, the value is [] but the key stays). Whale sessions
    // spawn hundreds of agents; each orphaned key is a small leak that adds up.
    rootSetAppState(prev => {
      if (!(agentId in prev.todos)) return prev
      const { [agentId]: _removed, ...todos } = prev.todos
      return { ...prev, todos }
    })
    // Kill any background bash tasks this agent spawned. Without this, a
    // `run_in_background` shell loop (e.g. test fixture fake-logs.sh) outlives
    // the agent as a PPID=1 zombie once the main session eventually exits.
    killShellTasksForAgent(agentId, toolUseContext.getAppState, rootSetAppState)
  }
}

/**
 * Filters out assistant messages with incomplete tool calls (tool uses without results).
 * This prevents API errors when sending messages with orphaned tool calls.
 */
export function filterIncompleteToolCalls(messages: Message[]): Message[] {
  // Build a set of tool use IDs that have results
  const toolUseIdsWithResults = new Set<string>()

  for (const message of messages) {
    if (message?.type === 'user') {
      const userMessage = message as UserMessage
      const content = userMessage.message.content
      if (Array.isArray(content)) {
        for (const block of content) {
          if (block.type === 'tool_result' && block.tool_use_id) {
            toolUseIdsWithResults.add(block.tool_use_id)
          }
        }
      }
    }
  }

  // Filter out assistant messages that contain tool calls without results
  return messages.filter(message => {
    if (message?.type === 'assistant') {
      const assistantMessage = message as AssistantMessage
      const content = assistantMessage.message.content
      if (Array.isArray(content)) {
        // Check if this assistant message has any tool uses without results
        const hasIncompleteToolCall = content.some(
          block =>
            block.type === 'tool_use' &&
            block.id &&
            !toolUseIdsWithResults.has(block.id),
        )
        // Exclude messages with incomplete tool calls
        return !hasIncompleteToolCall
      }
    }
    // Keep all non-assistant messages and assistant messages without tool calls
    return true
  })
}

export async function getAgentSystemPrompt(
  agentDefinition: AgentDefinition,
  toolUseContext: Pick<ToolUseContext, 'options'|'storageV5'>,
  resolvedAgentModel: string,
  additionalWorkingDirectories: string[],
  resolvedTools: readonly Tool[],
): Promise<string[]> {
  const enabledToolNames = new Set(resolvedTools.map(t => t.name))
  // Only HHt's existing accepted C enhancer parameters vary per spawn. No
  // session/backend/cache factory is created; qd/root/FS read the same owners.
  const sourceCaller = createAgentPromptCaller287(
    agentPriming287.prime,
    (prompts, model) => enhanceSystemPromptWithEnvDetails(
      prompts,
      model,
      additionalWorkingDirectories,
      enabledToolNames,
    ),
    agentPrimingPorts287.Nko,
  )
  return sourceCaller(agentDefinition, toolUseContext, resolvedAgentModel)
}

/**
 * Resolve a skill name from agent frontmatter to a registered command name.
 *
 * Plugin skills are registered with namespaced names (e.g., "my-plugin:my-skill")
 * but agents reference them with bare names (e.g., "my-skill"). This function
 * tries multiple resolution strategies:
 *
 * 1. Exact match via hasCommand (name, userFacingName, aliases)
 * 2. Prefix with agent's plugin name (e.g., "my-skill" → "my-plugin:my-skill")
 * 3. Suffix match — find any command whose name ends with ":skillName"
 */
function resolveSkillName(
  skillName: string,
  allSkills: Command[],
  agentDefinition: AgentDefinition,
): string | null {
  // 1. Direct match
  if (hasCommand(skillName, allSkills)) {
    return skillName
  }

  // 2. Try prefixing with the agent's plugin name
  // Plugin agents have agentType like "pluginName:agentName"
  const pluginPrefix = agentDefinition.agentType.split(':')[0]
  if (pluginPrefix) {
    const qualifiedName = `${pluginPrefix}:${skillName}`
    if (hasCommand(qualifiedName, allSkills)) {
      return qualifiedName
    }
  }

  // 3. Suffix match — find a skill whose name ends with ":skillName"
  const suffix = `:${skillName}`
  const match = allSkills.find(cmd => cmd.name.endsWith(suffix))
  if (match) {
    return match.name
  }

  return null
}
