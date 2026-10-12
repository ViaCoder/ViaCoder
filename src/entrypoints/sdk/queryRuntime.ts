import {spawn} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {invokeOriginalSDKProcessControl287,invokeOriginalSDKHookCallback287,invokeOriginalSDKMcpControl287,invokeOriginalSDKHandleControlRequest287} from './permissionCallback287/native.js'
import {createSDKInitialization287,type SDKInitializationConfig287,type SDKMcpManifest287} from './initialize287/native.js'
import {logEvent} from '../../services/analytics/index.js'
import {logForDebugging} from '../../utils/debug.js'
import type {JSONRPCMessage} from '@modelcontextprotocol/sdk/types.js'
import type {Transport} from '@modelcontextprotocol/sdk/shared/transport.js'
import type {
  AccountInfo,
  AgentInfo,
  HookEvent,
  ModelInfo,
  PermissionMode,
  SDKMessage,
  SDKUserMessage,
  SlashCommand,
} from './coreTypes.recovered.js'
import type {
  ControlResponse,
  SDKControlInitializeResponse,
  SDKControlMcpSetServersResponse,
  SDKControlMcpMessageRequest,
  SDKControlReloadPluginsResponse,
  SDKControlRequest,
  SDKControlRequestInner,
  SDKControlResponse,
  SDKControlRewindFilesResponse,
} from './controlTypes.js'
import type {
  CanUseTool,
  HookCallbackMatcher,
  InternalOptions,
  InternalQuery,
  Options,
  Query as QueryContract,
  RuntimeMcpServerConfig,
  SDKChildProcess,
  SDKHost,
  SDKSpawnClaudeCodeProcess,
  WorkSecretAnswerer,
  SDKUiHost287,
} from './runtimeTypes.js'

const sdkInitialization287 = createSDKInitialization287(logForDebugging, logEvent)

const DEFAULT_RUN_END_CEILING_MS = 10_000
const MAX_STDERR_TAIL = 2048
const MAX_UNMATCHED_CONTROL_RESPONSES = 1024
const LOCAL_CLI = fileURLToPath(new URL('../cli.tsx', import.meta.url))

export class AbortError extends Error {
  override name = 'AbortError'

  constructor(message = 'The operation was aborted') {
    super(message)
  }
}

function abortError(reason?: unknown): AbortError {
  return new AbortError(reason instanceof Error ? reason.message : String(reason ?? 'The operation was aborted'))
}

function asError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

function json(value: unknown): string {
  return JSON.stringify(value)
}

function randomRequestId(): string {
  return Math.random().toString(36).slice(2, 15)
}

function streamText(chunk: string | Uint8Array): string {
  return typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8')
}

function isScriptPath(path: string): boolean {
  return ['.js', '.mjs', '.tsx', '.ts', '.jsx'].some(ext => path.endsWith(ext))
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}


class AsyncQueue<T> implements AsyncIterable<T> {
  private values: T[] = []
  private waiters: Array<{
    resolve: (result: IteratorResult<T>) => void
    reject: (error: unknown) => void
  }> = []
  private finished = false
  private failure: unknown

  enqueue(value: T): void {
    if (this.finished) return
    const waiter = this.waiters.shift()
    if (waiter) waiter.resolve({done: false, value})
    else this.values.push(value)
  }

  done(): void {
    if (this.finished) return
    this.finished = true
    for (const waiter of this.waiters.splice(0)) waiter.resolve({done: true, value: undefined as never})
  }

  error(error: unknown): void {
    if (this.finished) return
    this.finished = true
    this.failure = error
    for (const waiter of this.waiters.splice(0)) waiter.reject(error)
  }

  async next(): Promise<IteratorResult<T>> {
    if (this.values.length > 0) return {done: false, value: this.values.shift() as T}
    if (this.failure !== undefined) throw this.failure
    if (this.finished) return {done: true, value: undefined as never}
    return new Promise<IteratorResult<T>>((resolve, reject) => this.waiters.push({resolve, reject}))
  }

  async return(): Promise<IteratorResult<T>> {
    this.done()
    return {done: true, value: undefined as never}
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this
  }
}

export type ProcessTransportOptions = Options & {
  /** Internal lifecycle option used by session-store hosts. */
  deferSpawn?: boolean
  /** Internal argv extension used by the official host. */
  extraArgs?: Record<string, unknown>
  /** Internal transport flags. */
  continueConversation?: boolean
  thinkingConfig?: Options['thinking']
  pluginsViaInitialize?: boolean
  projectConfigRoot?: string
  /** Internal session-mirroring flag used by the official ProcessTransport. */
  sessionMirror?: boolean
}

type ProcessSpec = {
  command: string
  args: string[]
  cwd?: string
  env: Record<string, string | undefined>
  signal: AbortSignal
}

function defaultSpawn(request: ProcessSpec): SDKChildProcess {
  return spawn(request.command, request.args, {
    cwd: request.cwd,
    env: request.env,
    stdio: ['pipe', 'pipe', 'pipe'],
    signal: request.signal,
    windowsHide: true,
  }) as unknown as SDKChildProcess
}

const defaultHost: SDKHost = {
  spawnClaudeCodeProcess: defaultSpawn,
  resolveClaudeCodeExecutable: () => LOCAL_CLI,
  log: (message, level = 'debug') => {
    if (level === 'error' || level === 'warn') process.stderr.write(`${message}\n`)
  },
}

function serializeSettings(settings: unknown): string | undefined {
  if (settings === undefined) return undefined
  return typeof settings === 'string' ? settings : json(settings)
}

function buildSandboxSettings(options: ProcessTransportOptions): unknown {
  if (!options.sandbox) return undefined
  const settings = serializeSettings(options.settings)
  if (settings === undefined) return {sandbox: options.sandbox}
  try {
    return {...JSON.parse(settings), sandbox: options.sandbox}
  } catch {
    throw new Error('Cannot use both a settings file path and the sandbox option.')
  }
}

export function buildProcessArguments(options: ProcessTransportOptions): string[] {
  const args = ['--output-format', 'stream-json', '--verbose', '--input-format', 'stream-json']
  const thinking = options.thinkingConfig ?? options.thinking
    ?? (options.maxThinkingTokens === undefined
      ? undefined
      : options.maxThinkingTokens === 0
        ? {type: 'disabled' as const}
        : {type: 'enabled' as const, budgetTokens: options.maxThinkingTokens})
  if (thinking) {
    if (thinking.type === 'enabled') {
      if (thinking.budgetTokens === undefined) args.push('--thinking', 'adaptive')
      else args.push('--max-thinking-tokens', String(thinking.budgetTokens))
    } else if (thinking.type === 'disabled') args.push('--thinking', 'disabled')
    else args.push('--thinking', 'adaptive')
    if (thinking.type !== 'disabled' && thinking.display) args.push('--thinking-display', thinking.display)
  }
  if (options.effort) args.push('--effort', options.effort)
  if (options.maxTurns) args.push('--max-turns', String(options.maxTurns))
  if (options.maxBudgetUsd !== undefined) args.push('--max-budget-usd', String(options.maxBudgetUsd))
  if (options.taskBudget) args.push('--task-budget', String(options.taskBudget.total))
  if (options.model) args.push('--model', options.model)
  if (options.agent) args.push('--agent', options.agent)
  if (options.betas?.length) args.push('--betas', options.betas.join(','))
  if (options.outputFormat?.type === 'json_schema') args.push('--json-schema', json(options.outputFormat.schema))
  if (options.debugFile) args.push('--debug-file', options.debugFile)
  else if (options.debug) args.push('--debug')
  if (options.canUseTool && options.permissionPromptToolName) {
    throw new Error('canUseTool callback cannot be used with permissionPromptToolName. Please use one or the other.')
  }
  if (options.canUseTool) args.push('--permission-prompt-tool', 'stdio')
  else if (options.permissionPromptToolName) args.push('--permission-prompt-tool', options.permissionPromptToolName)
  if (options.permissionPrompts) args.push('--permission-prompts', options.permissionPrompts)
  if (options.continue || options.continueConversation) args.push('--continue')
  if (options.resume) args.push(`--resume=${options.resume}`)
  const allowedTools = [...(options.allowedTools ?? [])]
  if (options.skills !== undefined) {
    const skills = options.skills === 'all' ? ['Skill'] : options.skills.map(name => `Skill(${name})`)
    for (const skill of skills) if (!allowedTools.includes(skill)) allowedTools.push(skill)
  }
  if (allowedTools.length) args.push('--allowedTools', allowedTools.join(','))
  if (options.disallowedTools?.length) args.push('--disallowedTools', options.disallowedTools.join(','))
  if (options.tools !== undefined) args.push('--tools', options.tools.length === 0 ? '' : options.tools.join(','))
  const processMcpServers: Record<string, unknown> = {}
  for (const [name, config] of Object.entries(options.mcpServers ?? {})) {
    if (config.type !== 'sdk') processMcpServers[name] = config
  }
  if (Object.keys(processMcpServers).length) args.push('--mcp-config', json({mcpServers: processMcpServers}))
  if (options.settingSources !== undefined) args.push(`--setting-sources=${options.settingSources.join(',')}`)
  if (options.strictMcpConfig) args.push('--strict-mcp-config')
  if (options.permissionMode) args.push('--permission-mode', options.permissionMode)
  if (options.allowDangerouslySkipPermissions) args.push('--allow-dangerously-skip-permissions')
  if (options.fallbackModel) {
    if (options.model && options.fallbackModel === options.model) {
      throw new Error('Fallback model cannot be the same as the main model. Please specify a different fallbackModel option.')
    }
    args.push('--fallback-model', options.fallbackModel)
  }
  if (options.includeHookEvents) args.push('--include-hook-events')
  if (options.includePartialMessages) args.push('--include-partial-messages')
  if (options.sessionMirror) args.push('--session-mirror')
  if (options.persistSession === false) args.push('--no-session-persistence')
  if (options.projectConfigRoot) args.push(`--project-config-root=${options.projectConfigRoot}`)
  for (const directory of options.additionalDirectories ?? []) args.push('--add-dir', directory)
  if (options.pluginsViaInitialize || options.pluginDelivery === 'initialize' && options.plugins?.length) {
    args.push('--await-initialize')
    // Sent in initialize; no argv entry.
  } else {
    for (const plugin of options.plugins ?? []) {
      args.push(plugin.skipMcpDiscovery ? '--plugin-dir-no-mcp' : '--plugin-dir', plugin.path)
    }
  }
  if (options.forkSession) args.push('--fork-session')
  if (options.resumeSessionAt) args.push(`--resume-session-at=${options.resumeSessionAt}`)
  if (options.resumeDropsTurn !== undefined) args.push(`--resume-drops-turn=${options.resumeDropsTurn}`)
  if (options.sessionId) args.push(`--session-id=${options.sessionId}`)
  if (options.managedSettings) args.push('--managed-settings', json(options.managedSettings))
  const settings = buildSandboxSettings(options)
  if (settings !== undefined) args.push('--settings', serializeSettings(settings) as string)
  const extraArgs = options.extraArgs ?? {}
  for (const [name, value] of Object.entries(extraArgs)) {
    const flag = `--${name}`
    if (value === null || value === true) args.push(flag)
    else if (value !== false && value !== undefined) args.push(flag, typeof value === 'string' ? value : String(value))
  }
  return args
}

export class ProcessTransport {
  readonly options: ProcessTransportOptions
  readonly abortController: AbortController
  private process?: SDKChildProcess
  private processStdin?: SDKChildProcess['stdin']
  private processStdout?: SDKChildProcess['stdout']
  private ready = false
  private exitError?: Error
  private exitEventDelivered = false
  private stderrTail = ''
  private abortHandler?: () => void
  private forwardedAbort = new AbortController()
  private pendingWrites: string[] = []
  private pendingEndInput = false
  private spawnResolve?: () => void
  private spawnReject?: (error: unknown) => void
  private spawnPromise?: Promise<void>
  private exitListeners: Array<{callback: (error?: Error) => void; handler: (...args: any[]) => void}> = []
  private readonly host: SDKHost

  constructor(options: ProcessTransportOptions, host: SDKHost = options.host ?? defaultHost) {
    this.options = {...options}
    // The official es() path passes spawnClaudeCodeProcess as a direct option;
    // local hosts may also provide the grouped host object. Preserve both,
    // with the direct SDK option taking precedence.
    this.host = {
      ...defaultHost,
      ...host,
      ...(options.spawnClaudeCodeProcess ? {spawnClaudeCodeProcess: options.spawnClaudeCodeProcess} : {}),
    }
    this.abortController = options.abortController ?? new AbortController()
    if (options.deferSpawn) {
      this.spawnPromise = new Promise<void>((resolve, reject) => {
        this.spawnResolve = resolve
        this.spawnReject = reject
      })
      this.spawnPromise.catch(() => {})
    } else this.initialize()
  }

  spawn(): void {
    try {
      this.initialize()
    } catch (error) {
      this.spawnAbort(asError(error))
      throw error
    }
    const writes = this.pendingWrites
    this.pendingWrites = []
    this.spawnResolve?.()
    this.spawnResolve = undefined
    this.spawnReject = undefined
    for (const value of writes) this.write(value)
    if (this.pendingEndInput) {
      this.pendingEndInput = false
      this.processStdin?.end()
    }
  }

  spawnAbort(error: Error): void {
    this.spawnReject?.(error)
    this.spawnReject = undefined
    this.spawnResolve = undefined
    this.pendingWrites = []
  }

  updateEnv(env: Record<string, string | undefined>): void {
    this.options.env = this.options.env ? {...this.options.env, ...env} : {...env}
  }

  updateResume(resume: string): void {
    this.options.resume = resume
  }

  getDefaultExecutable(): string {
    return process.versions.bun ? process.execPath : 'node'
  }

  private spawnLocalProcess(spec: ProcessSpec): SDKChildProcess {
    const child = this.host.spawnClaudeCodeProcess!(spec)
    const onStderr = (chunk: string | Uint8Array) => {
      const text = streamText(chunk)
      this.stderrTail += text
      if (this.stderrTail.length > MAX_STDERR_TAIL) this.stderrTail = this.stderrTail.slice(-MAX_STDERR_TAIL)
      if (this.options.stderr) this.options.stderr(text)
    }
    child.stderr.on?.('data', onStderr)
    child.stderr.on?.('error', error => this.host.log?.(`[ProcessTransport] stderr read failed: ${String(error)}`, 'error'))
    return child
  }

  initialize(): void {
    try {
      const env = this.options.env ? {...this.options.env} : {...process.env}
      if (!env.CLAUDE_CODE_ENTRYPOINT) env.CLAUDE_CODE_ENTRYPOINT = 'sdk-ts'
      if (!Object.keys(env).some(key => key.toUpperCase() === 'CLAUDE_CODE_SDK_READS_SESSION_STATE')) {
        env.CLAUDE_CODE_SDK_READS_SESSION_STATE = '1'
      }
      if (this.options.getOAuthToken) env.CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH = '1'
      if (this.options.getHostAuthToken) env.CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH = '1'
      delete env.NODE_OPTIONS
      if (this.options.debug) env.DEBUG = '1'
      else delete env.DEBUG
      const executablePath = this.options.pathToClaudeCodeExecutable
        ?? this.host.resolveClaudeCodeExecutable?.({cwd: this.options.cwd, executable: this.options.executable})
        ?? LOCAL_CLI
      const executable = this.options.executable ?? this.getDefaultExecutable()
      const executableArgs = this.options.executableArgs ?? []
      const flags = buildProcessArguments(this.options)
      const command = isScriptPath(executablePath) ? executable : executablePath
      const args = isScriptPath(executablePath)
        ? [...executableArgs, executablePath, ...flags]
        : [...executableArgs, ...flags]
      const spec: ProcessSpec = {
        command,
        args,
        cwd: this.options.cwd,
        env,
        signal: this.forwardedAbort.signal,
      }
      this.host.log?.(`Spawning Claude Code: ${command} ${args.join(' ')}`)
      this.process = this.spawnLocalProcess(spec)
      this.processStdin = this.process.stdin
      this.processStdout = this.process.stdout
      this.processStdin.on('error', error => {
        this.ready = false
        this.host.log?.(`[ProcessTransport] stdin write failed: ${String(error)}`, 'error')
      })
      this.abortHandler = () => this.close()
      this.abortController.signal.addEventListener('abort', this.abortHandler)
      if (this.abortController.signal.aborted) this.close()
      this.process.on('error', error => {
        this.ready = false
        if (this.abortController.signal.aborted) this.exitError = abortError(this.abortController.signal.reason)
        else this.exitError = new Error(`Failed to spawn Claude Code process: ${asError(error).message}`)
      })
      this.process.on('exit', (code, signal) => {
        this.exitEventDelivered = true
        this.ready = false
        if (this.abortController.signal.aborted) this.exitError = abortError(this.abortController.signal.reason)
        else this.exitError = this.getProcessExitError(code, signal)
      })
      this.ready = !this.abortController.signal.aborted
    } catch (error) {
      this.ready = false
      throw error
    }
  }

  private getProcessExitError(code?: number | null, signal?: string | null): Error | undefined {
    if (code !== undefined && code !== null && code !== 0) {
      return new Error(`Claude Code process exited with code ${code}${this.formatStderrTail()}`)
    }
    if (signal) return new Error(`Claude Code process terminated by signal ${signal}${this.formatStderrTail()}`)
    return undefined
  }

  private formatStderrTail(): string {
    const tail = this.stderrTail.trim()
    return tail ? `. stderr: ${tail}` : ''
  }

  write(value: string): void {
    if (this.abortController.signal.aborted) throw abortError(this.abortController.signal.reason)
    if (this.spawnResolve) {
      this.pendingWrites.push(value)
      return
    }
    if (!this.ready || !this.processStdin) throw new Error('ProcessTransport is not ready for writing')
    if (this.processStdin.writableEnded) return
    if (this.process?.killed || this.process?.exitCode !== null && this.process?.exitCode !== undefined) {
      throw new Error('Cannot write to terminated process')
    }
    try {
      this.processStdin.write(value)
    } catch (error) {
      this.ready = false
      throw new Error(`Failed to write to process stdin: ${asError(error).message}`)
    }
  }

  close(): void {
    this.spawnAbort(this.abortController.signal.aborted ? abortError(this.abortController.signal.reason) : new Error('Query closed before spawn'))
    this.processStdin?.end()
    this.processStdin = undefined
    if (this.abortHandler) {
      this.abortController.signal.removeEventListener('abort', this.abortHandler)
      this.abortHandler = undefined
    }
    const process = this.process
    if (process && !process.killed && process.exitCode == null && process.signalCode == null) {
      try {
        process.kill('SIGTERM')
        const timer = setTimeout(() => {
          if (process.exitCode == null && process.signalCode == null) process.kill('SIGKILL')
        }, 5000)
        timer.unref?.()
      } catch {}
    }
    this.ready = false
  }

  isReady(): boolean {
    return this.ready
  }

  async *readMessages(): AsyncGenerator<Record<string, any>> {
    if (this.spawnPromise) {
      await this.spawnPromise
      this.spawnPromise = undefined
    }
    if (!this.processStdout) throw new Error('ProcessTransport output stream not available')
    if (this.exitError) throw this.exitError
    let buffer = ''
    try {
      for await (const chunk of this.processStdout) {
        buffer += streamText(chunk)
        for (;;) {
          const newline = buffer.indexOf('\n')
          if (newline < 0) break
          const line = buffer.slice(0, newline).trim()
          buffer = buffer.slice(newline + 1)
          if (!line) continue
          try {
            yield JSON.parse(line) as Record<string, any>
          } catch {
            this.host.log?.(`Non-JSON stdout: ${line}`, 'warn')
          }
        }
      }
      const tail = buffer.trim()
      if (tail) {
        try { yield JSON.parse(tail) as Record<string, any> } catch { this.host.log?.(`Non-JSON stdout: ${tail}`, 'warn') }
      }
      if (this.exitError) throw this.exitError
      await this.waitForExit()
    } finally {
      buffer = ''
    }
  }

  endInput(): void {
    if (this.spawnResolve) {
      this.pendingEndInput = true
      return
    }
    this.processStdin?.end()
  }

  onExit(callback: (error?: Error) => void): () => void {
    if (!this.process) return () => {}
    const handler = (code?: number | null, signal?: string | null) => callback(this.getProcessExitError(code, signal))
    this.process.on('exit', handler)
    const entry = {callback, handler}
    this.exitListeners.push(entry)
    return () => {
      this.process?.off('exit', handler)
      const index = this.exitListeners.indexOf(entry)
      if (index >= 0) this.exitListeners.splice(index, 1)
    }
  }

  async waitForExit(): Promise<void> {
    if (this.exitError) throw this.exitError
    const process = this.process
    if (!process || process.exitCode === 0 || process.killed && this.exitEventDelivered) return
    await new Promise<void>((resolve, reject) => {
      const onExit = (code?: number | null, signal?: string | null) => {
        const error = this.abortController.signal.aborted
          ? abortError(this.abortController.signal.reason)
          : this.getProcessExitError(code, signal)
        if (error) reject(error)
        else resolve()
      }
      process.once('exit', onExit)
      process.once('error', reject)
    })
  }
}

type PendingControl = {
  handler: (response: ControlResponse | any) => void
  reject: (error: unknown) => void
}

type PendingMcp = {resolve: (value: JSONRPCMessage) => void; reject: (error: unknown) => void}

const NO_CONTROL_RESPONSE = Symbol('no-control-response')

export class QueryRuntime implements InternalQuery {
  readonly transport: ProcessTransport
  private readonly isSingleUserTurn: boolean
  private readonly canUseTool?: CanUseTool
  private readonly hooks?: Partial<Record<HookEvent, HookCallbackMatcher[]>>
  private readonly abortController: AbortController
  private readonly jsonSchema?: Record<string, unknown>
  private readonly initConfig: SDKInitializationConfig287
  private readonly onElicitation?: Options['onElicitation']
  private readonly onUserDialog?: Options['onUserDialog']
  private readonly getOAuthToken?: Options['getOAuthToken']
  private readonly getHostAuthToken?: Options['getHostAuthToken']
  private uiHost?: SDKUiHost287
  private readonly workSecretAnswerer?: WorkSecretAnswerer
  private readonly verbatimPrompts: boolean
  private readonly runEndCeilingMs: number
  private readonly pendingControlResponses = new Map<string, PendingControl>()
  private readonly unmatchedControlResponses = new Map<string, ControlResponse | any>()
  private readonly cancelControllers = new Map<string, AbortController>()
  private readonly hookCallbacks = new Map<string, Function>()
  private readonly sdkMcpServers = new Map<string, {transport: Transport; connection: Promise<void>; timeout?: number}>()
  private stopSdkMcpManifestCapture?: () => void
  private readonly sdkMcpToolsChangedDuringCapture = new Set<string>()
  private readonly pendingMcpResponses = new Map<string, PendingMcp>()
  private readonly inputStream = new AsyncQueue<SDKMessage>()
  private readonly sdkMessages: AsyncGenerator<SDKMessage, void, unknown>
  private initializeWritten!: Promise<void>
  private markInitializeWritten!: () => void
  private initializeHasBeenWritten = false
  private writingFirstInitialize = false
  private cleanupPerformed = false
  private cleanupCause?: Error
  private cleanupPromise?: Promise<void>
  private cleanupCallbacks: Array<() => void> = []
  private runEnded = false
  private resultReceived = false
  private sessionState?: string
  private runEndCeilingTimer?: ReturnType<typeof setTimeout>
  private runEndedResolve?: () => void
  private latestCommands?: SlashCommand[]
  private lastErrorResultText?: string
  private initHooksPayload?: Record<string, unknown>
  private nextCallbackId = 0
  private initialization: Promise<SDKControlInitializeResponse>

  constructor(
    transport: ProcessTransport,
    isSingleUserTurn: boolean,
    options: Options = {},
    initConfig?: SDKInitializationConfig287,
  ) {
    this.transport = transport
    this.isSingleUserTurn = isSingleUserTurn
    this.canUseTool = options.canUseTool
    this.hooks = options.hooks
    this.abortController = options.abortController ?? transport.abortController
    this.jsonSchema = options.outputFormat?.type === 'json_schema' ? options.outputFormat.schema : undefined
    this.initConfig = initConfig ?? sdkInitialization287.project(options, {isSingleUserTurn}, this.abortController)
    this.onElicitation = options.onElicitation
    this.onUserDialog = options.onUserDialog
    this.getOAuthToken = options.getOAuthToken
    this.getHostAuthToken = options.getHostAuthToken
    this.workSecretAnswerer = (options as InternalOptions).workSecretAnswerer
    this.verbatimPrompts = (options as InternalOptions).verbatimPrompts === true
    this.runEndCeilingMs = Number.isFinite(Number((options as any).runEndCeilingMs))
      ? Math.max(0, Number((options as any).runEndCeilingMs))
      : DEFAULT_RUN_END_CEILING_MS
    for (const [name, config] of Object.entries(options.mcpServers ?? {})) {
      if (config.type === 'sdk' && 'instance' in config) this.connectSdkMcpServer(name, config as any)
    }
    this.sdkMessages = this.readSdkMessages()
    void this.readMessages()
    this.initializeWritten = new Promise(resolve => { this.markInitializeWritten = () => { this.initializeHasBeenWritten = true; resolve() } })
    this.initialization = this.initialize({first: true})
    this.initialization.catch(() => {})
  }

  private hasBidirectionalNeeds(): boolean {
    return this.sdkMcpServers.size > 0 || this.hooks !== undefined && Object.keys(this.hooks).length > 0
      || this.canUseTool !== undefined || this.onElicitation !== undefined || this.onUserDialog !== undefined
      || this.getOAuthToken !== undefined || this.getHostAuthToken !== undefined
      || this.workSecretAnswerer !== undefined
  }

  private async *readSdkMessages(): AsyncGenerator<SDKMessage, void, unknown> {
    try {
      for await (const message of this.inputStream) yield message
    } finally {
      await this.cleanup()
    }
  }

  next(value?: unknown): Promise<IteratorResult<SDKMessage>> { return this.sdkMessages.next(value) }
  [Symbol.asyncIterator](): AsyncGenerator<SDKMessage, void, unknown> { return this.sdkMessages }
  async return(value?: unknown): Promise<IteratorResult<SDKMessage, void>> { await this.cleanup(); return this.sdkMessages.return(value as void) }
  async throw(error?: unknown): Promise<IteratorResult<SDKMessage>> { await this.cleanup(error); return this.sdkMessages.throw(error) }
  async [Symbol.asyncDispose](): Promise<void> { await this.cleanup() }

  isClosed(): boolean { return this.cleanupPerformed }
  close(): void { void this.cleanup() }
  setError(error: unknown): void { this.inputStream.error(error) }
  addCleanupCallback(callback: () => void): void {
    if (this.cleanupPerformed) callback()
    else this.cleanupCallbacks.push(callback)
  }

  private async cleanup(cause?: unknown): Promise<void> {
    if (this.cleanupPromise) return this.cleanupPromise
    this.cleanupPerformed = true
    this.cleanupCause = cause ? asError(cause) : undefined
    this.stopSdkMcpManifestCapture?.()
    this.clearRunEndCeiling()
    this.cleanupPromise = (async () => {
      for (const callback of this.cleanupCallbacks) {
        try { callback() } catch {}
      }
      this.cleanupCallbacks = []
      for (const controller of this.cancelControllers.values()) controller.abort()
      this.cancelControllers.clear()
      try { this.transport.close() } catch {}
      const error = this.cleanupCause ?? new Error('Query closed before response received')
      for (const pending of this.pendingControlResponses.values()) pending.reject(error)
      this.pendingControlResponses.clear()
      this.unmatchedControlResponses.clear()
      for (const pending of this.pendingMcpResponses.values()) pending.reject(error)
      this.pendingMcpResponses.clear()
      await Promise.all([...this.sdkMcpServers.values()].map(entry => entry.transport.close().catch(() => {})))
      this.sdkMcpServers.clear()
      if (cause) this.inputStream.error(cause)
      else this.inputStream.done()
      try { await Promise.race([this.transport.waitForExit(), new Promise(resolve => setTimeout(resolve, 2000))]) } catch {}
    })()
    return this.cleanupPromise
  }

  private async readMessages(): Promise<void> {
    try {
      for await (const message of this.transport.readMessages()) {
        if (message.type === 'control_response') {
          const response = (message as SDKControlResponse).response
          const pending = this.pendingControlResponses.get(response.request_id)
          if (pending) pending.handler(response)
          else {
            if (this.unmatchedControlResponses.size >= MAX_UNMATCHED_CONTROL_RESPONSES) {
              const first = this.unmatchedControlResponses.keys().next().value
              if (first) this.unmatchedControlResponses.delete(first)
            }
            this.unmatchedControlResponses.set(response.request_id, response)
          }
          continue
        }
        if (message.type === 'control_request') { void this.handleControlRequest(message as SDKControlRequest); continue }
        if (message.type === 'control_cancel_request') {
          const requestId = (message as any).request_id as string
          const controller = this.cancelControllers.get(requestId)
          if (controller) controller.abort()
          this.cancelControllers.delete(requestId)
          continue
        }
        if (message.type === 'keep_alive' || message.type === 'transcript_mirror') continue
        if (message.type === 'system' && message.subtype === 'commands_changed' && Array.isArray(message.commands)) this.latestCommands = message.commands
        if (message.type === 'result') {
          if (message.is_error) this.lastErrorResultText = message.subtype === 'success' ? message.result : (message.errors ?? []).join('; ')
          this.resultReceived = true
          if (this.sessionState === undefined || this.sessionState === 'idle' || !this.hasBidirectionalNeeds()) this.endRun()
          else this.armRunEndCeiling()
        } else if (message.type === 'system' && message.subtype === 'session_state_changed') {
          this.sessionState = message.state
          if (message.state === 'idle' && this.resultReceived) this.endRun()
          else if (!(this.isSingleUserTurn && this.runEnded)) {
            this.runEnded = false
            if (message.state === 'requires_action') this.clearRunEndCeiling()
            else if (this.resultReceived) this.armRunEndCeiling()
          }
          if (message.sdk_host_only === true) continue
        } else if ((message.type === 'assistant' || message.type === 'stream_event') && message.parent_tool_use_id === null && !(this.isSingleUserTurn && this.runEnded)) {
          this.runEnded = false
          this.clearRunEndCeiling()
        }
        this.inputStream.enqueue(message as SDKMessage)
      }
      this.inputStream.done()
      await this.cleanup()
    } catch (error) {
      this.inputStream.error(error)
      await this.cleanup(error)
    }
  }

  private handleControlRequest(message: SDKControlRequest): Promise<void> {
    return invokeOriginalSDKHandleControlRequest287(
      this, message, logForDebugging, NO_CONTROL_RESPONSE, json,
      error => asError(error).message,
    )
  }

  private processControlRequest(message: SDKControlRequest, signal: AbortSignal): Promise<unknown | typeof NO_CONTROL_RESPONSE> {
    return invokeOriginalSDKProcessControl287(this, message, signal, NO_CONTROL_RESPONSE, logForDebugging, logEvent, value => value)
  }

  private handleHookCallbacks(id: string, input: unknown, toolUseID: string | undefined, signal: AbortSignal): Promise<unknown> {
    return invokeOriginalSDKHookCallback287(this, id, input, toolUseID, signal)
  }

  private buildInitializeRequest(manifests?: Record<string, SDKMcpManifest287>): SDKControlRequestInner {
    return sdkInitialization287.build(this, manifests)
  }

  private initialize(options: {first: boolean} = {first: false}): Promise<SDKControlInitializeResponse> {
    return sdkInitialization287.initialize(this, options)
  }

  private captureSdkMcpServerManifests(): Promise<Record<string, SDKMcpManifest287> | undefined> {
    return sdkInitialization287.capture(this)
  }

  private endRun(): void {
    if (this.runEnded) return
    this.runEnded = true
    this.clearRunEndCeiling()
    this.runEndedResolve?.()
    this.runEndedResolve = undefined
    if (this.isSingleUserTurn) this.transport.endInput()
  }

  private armRunEndCeiling(): void {
    this.clearRunEndCeiling()
    if (this.runEnded || this.cleanupPerformed || this.runEndCeilingMs <= 0) return
    this.runEndCeilingTimer = setTimeout(() => this.endRun(), this.runEndCeilingMs)
    this.runEndCeilingTimer.unref?.()
  }

  private clearRunEndCeiling(): void {
    if (this.runEndCeilingTimer) clearTimeout(this.runEndCeilingTimer)
    this.runEndCeilingTimer = undefined
  }

  private waitForRunEnd(): Promise<void> {
    if (this.runEnded || this.cleanupPerformed || this.abortController.signal.aborted) return Promise.resolve()
    return new Promise(resolve => {
      const onAbort = () => resolve()
      this.abortController.signal.addEventListener('abort', onAbort, {once: true})
      this.addCleanupCallback(() => {
        this.abortController.signal.removeEventListener('abort', onAbort)
        resolve()
      })
      this.runEndedResolve = () => {
        this.abortController.signal.removeEventListener('abort', onAbort)
        resolve()
      }
    })
  }

  private requestInternal(request: SDKControlRequestInner, options?: {signal?: AbortSignal}): Promise<ControlResponse> {
    const signal = options?.signal
    if (signal?.aborted) return Promise.reject(abortError(signal.reason))
    if (this.cleanupPerformed) return Promise.reject(this.cleanupCause ?? new Error('Query closed before response received'))
    const requestId = randomRequestId()
    const envelope: SDKControlRequest = {type: 'control_request', request_id: requestId, request}
    const initialize = request.subtype === 'initialize'
    return new Promise((resolve, reject) => {
      let written = false
      let removeAbort: (() => void) | undefined
      const finish = (callback: () => void) => {
        this.pendingControlResponses.delete(requestId)
        removeAbort?.()
        callback()
      }
      const abort = () => {
        finish(() => reject(abortError(signal?.reason)))
        if (written) Promise.resolve(this.transport.write(json({type: 'control_cancel_request', request_id: requestId}) + '\n')).catch(() => {})
      }
      if (signal) {
        const handler = () => abort()
        signal.addEventListener('abort', handler, {once: true})
        removeAbort = () => signal.removeEventListener('abort', handler)
      }
      this.pendingControlResponses.set(requestId, {
        handler: response => {
          if (response.subtype === 'success') finish(() => resolve(response))
          else finish(() => reject(new Error(response.error)))
          if (!initialize) {
            for (const pending of response.pending_permission_requests ?? []) void this.handleControlRequest(pending)
            for (const pending of response.pending_user_dialog_requests ?? []) void this.handleControlRequest(pending)
          }
        },
        reject,
      })
      const unmatched = this.unmatchedControlResponses.get(requestId)
      if (unmatched !== undefined) {
        this.unmatchedControlResponses.delete(requestId)
        this.pendingControlResponses.get(requestId)?.handler(unmatched)
        return
      }
      const write = () => {
        if (signal?.aborted) return
        written = true
        try { this.transport.write(json(envelope) + '\n') } catch (error) { finish(() => reject(error)) }
      }
      try {
        if (this.initializeHasBeenWritten || this.writingFirstInitialize) write()
        else this.initializeWritten.then(write, reject)
      } catch (error) { finish(() => reject(error)) }
    })
  }

  setUiHost(uiHost: SDKUiHost287 | undefined): void { this.uiHost = uiHost }

  async interrupt(options?: {cancelQueued?: boolean}): Promise<{still_queued: string[]; cancelled?: string[]} | undefined> {
    const response = await this.request({subtype: 'interrupt', ...(options?.cancelQueued ? {cancel_queued: true} : {})} as any)
    const stillQueued = response.response?.still_queued
    if (!Array.isArray(stillQueued)) return undefined
    const cancelled = response.response?.cancelled
    return {still_queued: stillQueued.filter((value: unknown): value is string => typeof value === 'string'), ...(Array.isArray(cancelled) ? {cancelled: cancelled.filter((value: unknown): value is string => typeof value === 'string')} : {})}
  }

  async setPermissionMode(mode: PermissionMode): Promise<void> { await this.request({subtype: 'set_permission_mode', mode} as any) }
  async setModel(model?: string): Promise<void> { await this.request({subtype: 'set_model', model} as any) }
  async setMaxThinkingTokens(maxThinkingTokens: number | null): Promise<void> { await this.request({subtype: 'set_max_thinking_tokens', max_thinking_tokens: maxThinkingTokens} as any) }
  async supportedCommands(): Promise<SlashCommand[]> { const result = await this.initialization; return this.latestCommands ?? result.commands }
  async supportedModels(): Promise<ModelInfo[]> { return (await this.initialization).models }
  async supportedAgents(): Promise<AgentInfo[]> { return (await this.initialization).agents }
  async accountInfo(): Promise<AccountInfo> { return (await this.initialization).account }
  initializationResult(): Promise<SDKControlInitializeResponse> { return this.initialization }
  async reinitialize(): Promise<SDKControlInitializeResponse> { this.initialization = this.initialize({first: false}); return this.initialization }
  async mcpServerStatus(): Promise<any[]> { return ((await this.request({subtype: 'mcp_status'} as any)).response?.mcpServers ?? []) as any[] }
  async reconnectMcpServer(serverName: string): Promise<void> { await this.request({subtype: 'mcp_reconnect', serverName} as any) }
  async toggleMcpServer(serverName: string, enabled: boolean): Promise<void> { await this.request({subtype: 'mcp_toggle', serverName, enabled} as any) }
  async setMcpServers(servers: Record<string, RuntimeMcpServerConfig>): Promise<SDKControlMcpSetServersResponse> {
    for (const [name, entry] of [...this.sdkMcpServers]) if (!(name in servers) || servers[name].type !== 'sdk') await this.disconnectSdkMcpServer(name)
    const processServers: Record<string, RuntimeMcpServerConfig> = {}
    for (const [name, config] of Object.entries(servers)) {
      if (config.type === 'sdk' && 'instance' in config) {
        if (!this.sdkMcpServers.has(name)) this.connectSdkMcpServer(name, config as any)
        const existing = this.sdkMcpServers.get(name)
        if (existing?.timeout !== config.timeout) processServers[name] = {type: 'sdk', name, ...(existing?.timeout === undefined ? {} : {timeout: existing.timeout})} as any
        else processServers[name] = {type: 'sdk', name, ...(existing?.timeout === undefined ? {} : {timeout: existing.timeout})} as any
      } else processServers[name] = config
    }
    return (await this.request({subtype: 'mcp_set_servers', servers: processServers} as any)).response as SDKControlMcpSetServersResponse
  }
  async reloadPlugins(options?: {holdOnCacheImpact?: boolean}): Promise<SDKControlReloadPluginsResponse> { return (await this.request({subtype: 'reload_plugins', ...(options?.holdOnCacheImpact ? {hold_on_cache_impact: true} : {})} as any)).response as SDKControlReloadPluginsResponse }
  async stopTask(taskId: string): Promise<void> { await this.request({subtype: 'stop_task', task_id: taskId} as any) }
  async backgroundTasks(toolUseId?: string): Promise<boolean> {
    const response = (await this.request({subtype: 'background_tasks', ...(toolUseId === undefined ? {} : {tool_use_id: toolUseId})} as any)).response as {backgrounded?: boolean} | undefined
    return response?.backgrounded ?? true
  }

  async streamInput(stream: AsyncIterable<SDKUserMessage>): Promise<void> {
    if (!this.initializeHasBeenWritten) await this.initializeWritten
    let count = 0
    try {
      for await (const message of stream) {
        if (this.abortController.signal.aborted) break
        count++
        this.runEnded = false
        this.resultReceived = false
        this.clearRunEndCeiling()
        const value = this.verbatimPrompts ? {...message, client_composed: true} : message
        this.transport.write(json(value) + '\n')
      }
      if (count > 0 && this.hasBidirectionalNeeds()) await this.waitForRunEnd()
      this.transport.endInput()
    } catch (error) {
      if (!(error instanceof AbortError)) throw error
    }
  }

  async cancelAsyncMessage(messageUuid: string): Promise<boolean> { return (await this.request({subtype: 'cancel_async_message', message_uuid: messageUuid} as any)).response?.cancelled === true }
  async seedReadState(path: string, mtime: number): Promise<void> { await this.request({subtype: 'seed_read_state', path, mtime} as any) }
  async getSettings(): Promise<any> { return (await this.request({subtype: 'get_settings'} as any)).response }
  async getContextUsage(options?: {detail?: 'summary' | 'full'}): Promise<any> { return (await this.request({subtype: 'get_context_usage', ...options} as any)).response }
  async applyFlagSettings(settings: Record<string, unknown>): Promise<void> { await this.request({subtype: 'apply_flag_settings', settings} as any) }
  async setPromptSuggestionsPaused(paused: boolean): Promise<void> { await this.request({subtype: 'set_prompt_suggestions_paused', paused} as any) }
  async request(request: SDKControlRequestInner, options?: {signal?: AbortSignal}): Promise<ControlResponse> { return this.requestInternal(request, options) }
  async enableChannel(serverName: string): Promise<void> { await this.request({subtype: 'channel_enable', serverName} as any) }
  async renameSession(title: string, sessionId?: string): Promise<void> { await this.request({subtype: 'rename_session', title, source: 'host', session_id: sessionId} as any) }
  async generateSessionTitle(description: string, options?: {persist?: boolean}): Promise<string> { return (await this.request({subtype: 'generate_session_title', description, persist: options?.persist} as any)).response?.title as string }
  async rewindFiles(userMessageId: string, options?: {dryRun?: boolean}): Promise<SDKControlRewindFilesResponse> { return (await this.request({subtype: 'rewind_files', user_message_id: userMessageId, dry_run: options?.dryRun} as any)).response as SDKControlRewindFilesResponse }

  private connectSdkMcpServer(name: string, config: {instance: any; timeout?: number}): void {
    sdkInitialization287.connect(this, name, config)
  }

  private async disconnectSdkMcpServer(name: string): Promise<void> {
    const entry = this.sdkMcpServers.get(name)
    if (!entry) return
    await entry.transport.close()
    if (this.sdkMcpServers.get(name) === entry) this.sdkMcpServers.delete(name)
  }

  private sendMcpServerMessageToCli(name: string, message: JSONRPCMessage): void {
    sdkInitialization287.send(this, name, message)
  }

  private handleMcpControlRequest(name: string, request: SDKControlMcpMessageRequest, transport: Transport): Promise<JSONRPCMessage> {
    return invokeOriginalSDKMcpControl287(this, name, request, transport)
  }

  public writeAfterInitialize(value: string): Promise<void> {
    if (this.initializeHasBeenWritten) {
      this.transport.write(value)
      return Promise.resolve()
    }
    return this.initializeWritten.then(() => { this.transport.write(value) })
  }
}

export function createQueryRuntime(prompt: string | AsyncIterable<SDKUserMessage>, options: Options = {}): QueryContract {
  const abortController = options.abortController ?? new AbortController()
  const initConfig = sdkInitialization287.project(options, {isSingleUserTurn: typeof prompt === 'string'}, abortController)
  const transportOptions: ProcessTransportOptions = {
    ...options,
    abortController,
    pluginsViaInitialize: options.pluginDelivery === 'initialize' && (options.plugins?.length ?? 0) > 0,
  }
  const transport = new ProcessTransport(transportOptions)
  const query = new QueryRuntime(transport, typeof prompt === 'string', transportOptions, initConfig)
  const abortOnError = (error: unknown) => {
    if (!transport.abortController.signal.aborted) transport.abortController.abort(error)
  }
  if (typeof prompt === 'string') {
    query.writeAfterInitialize(json({type: 'user', session_id: '', message: {role: 'user', content: [{type: 'text', text: prompt}]}, parent_tool_use_id: null, ...((options as InternalOptions).verbatimPrompts ? {client_composed: true} : {})}) + '\n').catch(abortOnError)
  } else query.streamInput(prompt).catch(abortOnError)
  return query
}

export function createDefaultSdkHost(): SDKHost {
  return {...defaultHost}
}
