/** SDK contracts recovered from the official 2.1.284
 * chunk-q1krdp3m.js Query/ProcessTransport/es implementation.
 * Query and Options expose the evidenced common surface, not a claimed complete
 * upstream declaration. V2 sessions, session stores, and SessionMessage remain
 * unrecovered rather than receiving guessed or catch-all definitions.
 */
import type { z as z3 } from 'zod/v3'
import type { z as z4 } from 'zod/v4'
import type { CallToolResult, ToolAnnotations } from '@modelcontextprotocol/sdk/types.js'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { UiHostRequest287 } from '../../cli/printOwnership287/publicHostTypes287.js'

export type EffortLevel = 'low' | 'medium' | 'high' | 'xhigh' | 'max'
export type AnyZodRawShape =
  | Record<string, z3.ZodType<unknown, z3.ZodTypeDef, unknown>>
  | Record<string, z4.ZodType>
export type InferShape<Schema extends AnyZodRawShape> = {
  [K in keyof Schema]: Schema[K] extends z4.ZodType ? z4.output<Schema[K]>
    : Schema[K] extends z3.ZodType<unknown, z3.ZodTypeDef, unknown> ? z3.output<Schema[K]> : never
}
export type SdkMcpToolDefinition<Schema extends AnyZodRawShape = AnyZodRawShape> = {
  name: string
  description: string
  inputSchema: Schema
  handler: (args: InferShape<Schema>, extra: unknown) => Promise<CallToolResult>
  annotations?: ToolAnnotations
  searchHint?: string
  alwaysLoad?: boolean
}
/** SDK config discriminant is defined by coreSchemas.McpSdkServerConfigSchema. */
export type McpSdkServerConfigWithInstance = {
  type: 'sdk'
  name: string
  instance: McpServer
  timeout?: number
}
export type { ListSessionsOptions } from '../../utils/listSessionsImpl.js'
export type GetSessionInfoOptions = { dir?: string }
export type SessionMutationOptions = { dir?: string }
export type GetSessionMessagesOptions = {
  dir?: string
  limit?: number
  offset?: number
  includeSystemMessages?: boolean
}
export type ForkSessionOptions = { dir?: string; upToMessageId?: string; title?: string }
export type ForkSessionResult = { sessionId: string }

import type {
  AccountInfo, AgentDefinition, AgentInfo, HookEvent, HookInput, HookJSONOutput,
  McpServerConfigForProcessTransport, McpServerStatus, ModelInfo, OutputFormat, PermissionMode,
  PermissionResult, PermissionUpdate, SDKMessage, SDKUserMessage, SdkBeta,
  SettingSource, SlashCommand, ThinkingConfig,
} from './coreTypes.recovered.js'
import type {
  ControlResponse, SDKControlGetContextUsageRequest, SDKControlGetContextUsageResponse, SDKControlGetSettingsResponse,
  SDKControlInitializeResponse, SDKControlMcpSetServersResponse,
  SDKControlReloadPluginsResponse, SDKControlRequestInner, SDKControlRewindFilesResponse,
} from './controlTypes.js'
import type { SandboxSettings } from '../sandboxTypes.js'
import type { Settings } from './settingsTypes.generated.js'

/**
 * Host-process surface used by the recovered 2.1.284 ProcessTransport.
 *
 * The official bundle injects `spawnClaudeCodeProcess` into ProcessTransport
 * and otherwise uses child_process.spawn. Keeping the process contract here
 * lets offline hosts provide a deterministic duplex fixture without changing
 * Query's lifecycle or the stream-json/control protocol.
 */
export type SDKProcessStdin = {
  writableEnded?: boolean
  write(chunk: string): boolean
  end(): void
  on(event: string, listener: (...args: any[]) => void): unknown
}

export type SDKProcessStream = AsyncIterable<string | Uint8Array> & {
  on?(event: string, listener: (...args: any[]) => void): unknown
  once?(event: string, listener: (...args: any[]) => void): unknown
  off?(event: string, listener: (...args: any[]) => void): unknown
  destroy?(): void
  unref?(): void
}

export type SDKChildProcess = {
  stdin: SDKProcessStdin
  stdout: SDKProcessStream
  stderr: SDKProcessStream
  killed?: boolean
  exitCode?: number | null
  signalCode?: string | null
  kill(signal?: string): boolean
  on(event: string, listener: (...args: any[]) => void): unknown
  once(event: string, listener: (...args: any[]) => void): unknown
  off(event: string, listener: (...args: any[]) => void): unknown
}

export type SDKSpawnRequest = {
  command: string
  args: string[]
  cwd?: string
  env: Record<string, string | undefined>
  signal: AbortSignal
}

export type SDKSpawnClaudeCodeProcess = (
  request: SDKSpawnRequest,
) => SDKChildProcess

/** Local host injection point. It mirrors the official custom-spawn hook and
 * adds executable resolution/logging so tests never need a real process. */
export type SDKHost = {
  spawnClaudeCodeProcess?: SDKSpawnClaudeCodeProcess
  resolveClaudeCodeExecutable?: (options: {
    cwd?: string
    executable?: string
  }) => string
  log?: (message: string, level?: 'debug' | 'info' | 'warn' | 'error') => void
}

/** The SDK awaits each callback; null explicitly leaves a permission unanswered. */
export type CanUseTool = (
  toolName: string,
  input: Record<string, unknown>,
  options: {
    signal: AbortSignal
    suggestions?: PermissionUpdate[]
    blockedPath?: string
    decisionReason?: string
    mcpServer?: {name: string; source: string}
    computerFolder?: {path: string; computer_name: string}
    matchedAskRule?: {source: string; toolName: string; ruleContent?: string}
    title?: string
    displayName?: string
    description?: string
    defaultToNo?: boolean
    suppressAlwaysAllowRule?: boolean
    toolUseID: string
    agentID?: string
    requestId: string
    requiresUserInteraction?: boolean
    serverPrompt?: string
  },
) => Promise<PermissionResult | null>

export type HookCallback = (
  input: HookInput,
  toolUseID: string | undefined,
  options: { signal: AbortSignal },
) => Promise<HookJSONOutput>
export type HookCallbackMatcher = { matcher?: string; hooks: HookCallback[]; timeout?: number }
export type RuntimeMcpServerConfig = Exclude<McpServerConfigForProcessTransport, { type: 'sdk' }> | McpSdkServerConfigWithInstance

/** Private Query callback used by the official remote-control work-secret flow. */
export type WorkSecretAnswerer = {
  sessionId: string
  refresh: (sessionId: string, options: { signal: AbortSignal }) => Promise<string | null | undefined>
}

/** Public SDK callbacks for the four optional uiHost control-request variants.
 * Payloads are the original request minus `subtype`; cancellation is the exact
 * per-request AbortSignal created by QueryRuntime.handleControlRequest. */
type UiHostPayload287<S extends UiHostRequest287['subtype']> = Omit<Extract<UiHostRequest287, { subtype: S }>, 'subtype'>
export type SDKUiHost287 = {
  copy?: (request: UiHostPayload287<'ui_copy'>, context: { signal: AbortSignal }) => unknown | Promise<unknown>
  promptRead?: (request: UiHostPayload287<'ui_prompt_read'>, context: { signal: AbortSignal }) => unknown | Promise<unknown>
  promptFill?: (request: UiHostPayload287<'ui_prompt_fill'>, context: { signal: AbortSignal }) => unknown | Promise<unknown>
  promptSuggest?: (request: UiHostPayload287<'ui_prompt_suggest'>, context: { signal: AbortSignal }) => unknown | Promise<unknown>
}

/** Verified common options from Zt/ProcessTransport. Omitted advanced surfaces
 * (custom spawn, prompt snapshots, dialogs, storage) require their own evidence;
 * there is deliberately no index signature allowing unchecked options. */
export type Options = {
  abortController?: AbortController
  additionalDirectories?: string[]
  agent?: string
  agents?: Record<string, AgentDefinition>
  allowedTools?: string[]
  tools?: string[]
  betas?: SdkBeta[]
  canUseTool?: CanUseTool
  continue?: boolean
  cwd?: string
  debug?: boolean
  debugFile?: string
  disallowedTools?: string[]
  env?: Record<string, string | undefined>
  executable?: string
  executableArgs?: string[]
  pathToClaudeCodeExecutable?: string
  fallbackModel?: string
  enableFileCheckpointing?: boolean
  forkSession?: boolean
  hooks?: Partial<Record<HookEvent, HookCallbackMatcher[]>>
  includeHookEvents?: boolean
  includePartialMessages?: boolean
  forwardSubagentText?: boolean
  persistSession?: boolean
  thinking?: ThinkingConfig
  effort?: EffortLevel
  maxThinkingTokens?: number
  maxTurns?: number
  maxBudgetUsd?: number
  taskBudget?: { total: number }
  mcpServers?: Record<string, RuntimeMcpServerConfig>
  model?: string
  outputFormat?: OutputFormat
  permissionMode?: PermissionMode
  allowDangerouslySkipPermissions?: boolean
  permissionPromptToolName?: string
  /** Official ProcessTransport flag forwarded to --permission-prompts. */
  permissionPrompts?: string
  plugins?: { type: 'local'; path: string; skipMcpDiscovery?: boolean }[]
  pluginDelivery?: 'argv' | 'initialize'
  resume?: string
  resumeSessionAt?: string
  /** Official ProcessTransport flag forwarded to --resume-drops-turn. */
  resumeDropsTurn?: string
  sessionId?: string
  skills?: 'all' | string[]
  stderr?: (data: string) => void
  strictMcpConfig?: boolean
  sandbox?: SandboxSettings
  // Zt serializes settings objects; ProcessTransport also accepts a settings
  // path/JSON string. The source names are the public CLI names, not file keys.
  settings?: Settings | string
  managedSettings?: Settings
  settingSources?: SettingSource[]
  // buildInitializeRequest normalizes a single string to a string array.
  systemPrompt?: string | string[] | { type: 'custom'; prompt: string | string[]; snapshot?: boolean }
    | { type: 'preset'; preset?: 'claude_code'; append?: string; excludeDynamicSections?: boolean; snapshot?: boolean }
  /** Official host injection hook; used instead of child_process.spawn. */
  spawnClaudeCodeProcess?: SDKSpawnClaudeCodeProcess
  /** Local host facade for deterministic ProcessTransport injection. */
  host?: SDKHost
  /** Host callbacks forwarded through the SDK control channel. */
  onElicitation?: (
    request: {
      serverName: string
      message: string
      mode?: 'form' | 'url'
      url?: string
      elicitationId?: string
      requestedSchema?: Record<string, unknown>
      title?: string
      displayName?: string
      description?: string
    },
    context: { signal: AbortSignal; requestId: string },
  ) => Promise<{ action: 'accept' | 'decline' | 'cancel'; content?: Record<string, unknown> } | null>
  onUserDialog?: (
    request: { dialogKind: string; payload: Record<string, unknown>; toolUseID?: string },
    context: { signal: AbortSignal; requestId: string },
  ) => Promise<Record<string, unknown> | null>
  getOAuthToken?: (options: {
    signal: AbortSignal
    onDecline?: (reason: string) => void
  }) => Promise<string | null | undefined>
  getHostAuthToken?: (options: { signal: AbortSignal }) => Promise<string | null | undefined | Record<string, unknown>>
}

/** Internal fields forwarded separately to the initialize request by Zt. */
export type InternalOptions = Options & {
  projectConfigRoot?: string
  verbatimPrompts?: boolean
  resolvePermissionModeInCli?: boolean
  title?: string
  planModeInstructions?: string
  appendSubagentSystemPrompt?: string
  toolAliases?: Record<string, string>
  supportedDialogKinds?: string[]
  perTaskStopAffordance?: boolean
  rapidFollowupPreempt?: boolean
  workspaceTrust?: {accepted: boolean; directory: string}
  webSearchIsolationExemptMcpServers?: string[]
  promptSuggestions?: boolean
  agentProgressSummaries?: boolean
  workSecretAnswerer?: WorkSecretAnswerer
}

/** Query's SDK message generator is distinct from the internal query.ts events.
 * Method names, async/void behavior and request mappings come from class Ue.
 * Response payloads use the recovered control schemas, not unchecked casts. */
export interface Query extends AsyncGenerator<SDKMessage, void, unknown> {
  /** Attach or replace the optional host callbacks used by ui_* control requests. */
  setUiHost(uiHost: SDKUiHost287 | undefined): void
  interrupt(options?: { cancelQueued?: boolean }): Promise<{
    still_queued: string[]; cancelled?: string[]
  } | undefined>
  setPermissionMode(mode: PermissionMode): Promise<void>
  setModel(model?: string): Promise<void>
  setMaxThinkingTokens(maxThinkingTokens: number | null): Promise<void>
  supportedCommands(): Promise<SlashCommand[]>
  supportedModels(): Promise<ModelInfo[]>
  supportedAgents(): Promise<AgentInfo[]>
  mcpServerStatus(): Promise<McpServerStatus[]>
  accountInfo(): Promise<AccountInfo>
  initializationResult(): Promise<SDKControlInitializeResponse>
  reinitialize(): Promise<SDKControlInitializeResponse>
  rewindFiles(userMessageId: string, options?: { dryRun?: boolean }): Promise<SDKControlRewindFilesResponse>
  reconnectMcpServer(serverName: string): Promise<void>
  toggleMcpServer(serverName: string, enabled: boolean): Promise<void>
  setMcpServers(servers: Record<string, RuntimeMcpServerConfig>): Promise<SDKControlMcpSetServersResponse>
  reloadPlugins(options?: { holdOnCacheImpact?: boolean }): Promise<SDKControlReloadPluginsResponse>
  stopTask(taskId: string): Promise<void>
  /** Official ii/sY control schemas and Ue.backgroundTasks: omitted id means all. */
  backgroundTasks(toolUseId?: string): Promise<boolean>
  streamInput(stream: AsyncIterable<SDKUserMessage>): Promise<void>
  close(): void
  [Symbol.asyncDispose](): Promise<void>
}

export interface InternalQuery extends Query {
  isClosed(): boolean
  cancelAsyncMessage(messageUuid: string): Promise<boolean>
  seedReadState(path: string, mtime: number): Promise<void>
  getSettings(): Promise<SDKControlGetSettingsResponse>
  getContextUsage(options?: Omit<SDKControlGetContextUsageRequest, 'subtype'>): Promise<SDKControlGetContextUsageResponse>
  applyFlagSettings(settings: Settings): Promise<void>
  setPromptSuggestionsPaused(paused: boolean): Promise<void>
  request(request: SDKControlRequestInner, options?: { signal?: AbortSignal }): Promise<ControlResponse>
  enableChannel(serverName: string): Promise<void>
  renameSession(title: string, sessionId?: string): Promise<void>
  generateSessionTitle(description: string, options?: { persist?: boolean }): Promise<string>
}
