import type {SdkPromptIngress287} from './cli/sdkIngress287.js'
import type {PrintScopeState287} from './cli/printOwnership287/requesterBridgeRuntime287.js'
import type {ContentBlockParam} from '@anthropic-ai/sdk/resources/messages.mjs'
import {getSessionId} from './bootstrap/state.js'
import type {SDKMessage,SDKStatus,SDKStatusMetadata} from './entrypoints/agentSdkTypes.js'
import type {Command} from './commands.js'
import type {CanUseToolFn} from './hooks/useCanUseTool.js'
import type {MCPServerConnection} from './services/mcp/types.js'
import type {AppState} from './state/AppState.js'
import type {Tools,ToolUseContext} from './Tool.js'
import type {AgentDefinition} from './tools/AgentTool/loadAgentsDir.js'
import type {Message} from './types/message.js'
import type {OrphanedPermission} from './types/textInputTypes.js'
import {cloneFileStateCache,type FileStateCache} from './utils/fileStateCache.js'
import type {CredentialStore} from './utils/officialSecureStorage/runtime.js'
import type {ThinkingConfig} from './utils/thinking.js'

export type QueryEngineConfig = SdkPromptIngress287 & {
  sharedHostContext287?:PrintScopeState287
  cwd: string
  tools: Tools
  commands: Command[]
  strictMcpConfig?:boolean
  mcpClients: MCPServerConnection[]
  agents: AgentDefinition[]
  canUseTool: CanUseToolFn
  getAppState: () => AppState
  setAppState: (f: (prev: AppState) => AppState) => void
  initialMessages?: Message[]
  readFileCache: FileStateCache
  customSystemPrompt?: string | readonly string[]
  appendSystemPrompt?: string
  appendSystemPromptHead?: string
  excludeDynamicSections?: boolean
  planModeInstructions?:string
  systemPromptSnapshot?:boolean
  appendSubagentSystemPrompt?:string
  cacheBreakerPhrase?: string
  storageV5?: unknown
  credentials?: CredentialStore
  userSpecifiedModel?: string
  fallbackModel?: string
  thinkingConfig?: ThinkingConfig
  maxTurns?: number
  maxBudgetUsd?: number
  taskBudget?: { total: number }
  jsonSchema?: Record<string, unknown>
  verbose?: boolean
  replayUserMessages?: boolean
  /** Handler for URL elicitations triggered by MCP tool -32042 errors. */
  handleElicitation?: ToolUseContext['handleElicitation']
  includePartialMessages?: boolean
  forwardSubagentText?: boolean
  setSDKStatus?: (status: SDKStatus, metadata?: SDKStatusMetadata) => void
  abortController?: AbortController
  orphanedPermission?: OrphanedPermission
}

/**
 * QueryEngine owns the query lifecycle and session state for a conversation.
 * It extracts the core logic from ask() into a standalone class that can be
 * used by both the headless/SDK path and (in a future phase) the REPL.
 *
 * One QueryEngine per conversation. Each submitMessage() call starts a new
 * turn within the same conversation. State (messages, file cache, usage, etc.)
 * persists across turns.
 */
export class QueryEngine {
  private readonly owner287:import('./cli/printOwnership287/wholeInputRuntime287.js').WholePrintInputOwner287
  private readonly abortController:AbortController|undefined
  constructor(config:QueryEngineConfig) {
    const scope=config.sharedHostContext287
    const create=(require('./cli/printOwnership287/wholeInputRuntime287.js') as typeof import('./cli/printOwnership287/wholeInputRuntime287.js')).createWholePrintInputOwner287
    this.owner287=scope?.wholeInput287??create(config)
    if(scope?.wholeInput287)this.owner287.update(config)
    else if(scope)scope.wholeInput287=this.owner287
    this.abortController=config.abortController
    if(scope)scope.readFileCache=this.owner287.source.getReadFileState()
  }
  submitMessage(prompt:string|ContentBlockParam[],options?:import('./cli/printOwnership287/consumptionNative.js').WholePrintTurnOptions287):AsyncGenerator<SDKMessage,void,unknown> {
    return this.owner287.submitMessage(prompt,{...options,abortController:options?.abortController??this.abortController})
  }
  interrupt():void {this.owner287.source.interrupt()}
  getMessages():readonly Message[] {return this.owner287.source.getMessages()}
  keepArrivedRows(rows:Message[]):void {this.owner287.source.keepArrivedRows(rows)}
  appendMessages(rows:Message[]):void {this.owner287.source.appendMessages(rows)}
  getReadFileState():FileStateCache {return this.owner287.source.getReadFileState()}
  getSessionId():string {return getSessionId()}
  setModel(model:string):void {this.owner287.source.setModel(model)}
  dispose():Promise<void> {return this.owner287.close()}
}

/**
 * Sends a single prompt to the Claude API and returns the response.
 * Assumes that claude is being used non-interactively -- will not
 * ask the user for permissions or further input.
 *
 * Convenience wrapper around QueryEngine for one-shot usage.
 */
export async function* ask({
  commands,
  prompt,
  promptUuid,
  origin,
  isMeta,
  skipSlashCommands,
  shouldQuery,queryHeldForNextTurn,skipAttachments,skipSubmissionHooks,memoryKick,turnStartClock,
  cwd,
  tools,
  mcpClients,
  strictMcpConfig,
  verbose = false,
  thinkingConfig,
  maxTurns,
  maxBudgetUsd,
  taskBudget,
  canUseTool,
  mutableMessages = [],
  getReadFileCache,
  setReadFileCache,
  customSystemPrompt,
  appendSystemPrompt,
  appendSystemPromptHead,excludeDynamicSections,planModeInstructions,systemPromptSnapshot,appendSubagentSystemPrompt,cacheBreakerPhrase,storageV5,credentials,
  userSpecifiedModel,
  fallbackModel,
  jsonSchema,
  getAppState,
  setAppState,
  abortController,
  replayUserMessages = false,
  includePartialMessages = false,
  forwardSubagentText = false,
  handleElicitation,
  agents = [],
  setSDKStatus,
  orphanedPermission,sharedHostContext287,
}: {
  sharedHostContext287?:PrintScopeState287
  commands: Command[]
  prompt: string | Array<ContentBlockParam>
  promptUuid?: string
  origin?: import('./types/message.js').MessageOrigin
  isMeta?: boolean
  skipSlashCommands?: boolean
  shouldQuery?:boolean;queryHeldForNextTurn?:boolean;skipAttachments?:boolean;skipSubmissionHooks?:boolean
  memoryKick?:import("./cli/printOwnership287/prepareTurnNative287.js").OriginalMemoryKick287;turnStartClock?:import("./cli/printOwnership287/consumptionNative.js").WholePrintTurnOptions287["turnStartClock"]
  cwd: string
  tools: Tools
  verbose?: boolean
  strictMcpConfig?:boolean
  mcpClients: MCPServerConnection[]
  thinkingConfig?: ThinkingConfig
  maxTurns?: number
  maxBudgetUsd?: number
  taskBudget?: { total: number }
  canUseTool: CanUseToolFn
  mutableMessages?: Message[]
  customSystemPrompt?: string | readonly string[]
  appendSystemPrompt?: string
  appendSystemPromptHead?: string
  excludeDynamicSections?: boolean
  planModeInstructions?:string
  systemPromptSnapshot?:boolean
  appendSubagentSystemPrompt?:string
  cacheBreakerPhrase?: string
  storageV5?: unknown
  credentials?: CredentialStore
  userSpecifiedModel?: string
  fallbackModel?: string
  jsonSchema?: Record<string, unknown>
  getAppState: () => AppState
  setAppState: (f: (prev: AppState) => AppState) => void
  getReadFileCache: () => FileStateCache
  setReadFileCache: (cache: FileStateCache) => void
  abortController?: AbortController
  replayUserMessages?: boolean
  includePartialMessages?: boolean
  forwardSubagentText?: boolean
  handleElicitation?: ToolUseContext['handleElicitation']
  agents?: AgentDefinition[]
  setSDKStatus?: (status: SDKStatus, metadata?: SDKStatusMetadata) => void
  orphanedPermission?: OrphanedPermission
}): AsyncGenerator<SDKMessage, void, unknown> {
  const engine = new QueryEngine({
    cwd,
    tools,
    commands,
    mcpClients,
    strictMcpConfig,
    agents,
    canUseTool,
    getAppState,
    setAppState,
    initialMessages: mutableMessages,
    readFileCache: sharedHostContext287?.wholeInput287?.source.getReadFileState()??cloneFileStateCache(getReadFileCache()),
    customSystemPrompt,
    appendSystemPrompt,
    appendSystemPromptHead,excludeDynamicSections,planModeInstructions,systemPromptSnapshot,appendSubagentSystemPrompt,cacheBreakerPhrase,storageV5,credentials,
    userSpecifiedModel,
    fallbackModel,
    thinkingConfig,
    maxTurns,
    maxBudgetUsd,
    taskBudget,
    jsonSchema,
    verbose,
    handleElicitation,
    replayUserMessages,
    includePartialMessages,
    forwardSubagentText,
    setSDKStatus,
    abortController,
    orphanedPermission,sharedHostContext287,
  })
  const releaseArrivalEngine287=sharedHostContext287?.bindArrivalEngine287?.(engine)

  try {
    yield* engine.submitMessage(prompt, {
      uuid: promptUuid,
      origin,
      isMeta,
      skipSlashCommands,
      shouldQuery,queryHeldForNextTurn,skipAttachments,skipSubmissionHooks,memoryKick,turnStartClock,
    })
  } finally {
    try {setReadFileCache(engine.getReadFileState())}
    finally {
      releaseArrivalEngine287?.()
      if(sharedHostContext287?.readFileCache===engine.getReadFileState())delete sharedHostContext287.readFileCache
      if(!sharedHostContext287)await engine.dispose()
    }
  }
}
