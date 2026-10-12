import { type ChildProcess, spawn } from 'child_process'
import {
  createMessageConnection,
  type MessageConnection,
  StreamMessageWriter,
  Trace,
} from 'vscode-jsonrpc/node.js'
import type {
  InitializeParams,
  InitializeResult,
} from 'vscode-languageserver-protocol'
import { logForDebugging } from '../../utils/debug.js'
import { errorMessage } from '../../utils/errors.js'
import { logError } from '../../utils/log.js'
import { subprocessEnv } from '../../utils/subprocessEnv.js'
import { BoundedMessageReader } from '../../vendor/official-lsp/BoundedMessageReader.js'

/** Official Bn crash error name; tool-cgroup attribution is not implemented
 * by the local Node spawn adapter and is intentionally not asserted. */
export class LSPServerCrashError extends Error {
  constructor(message: string) { super(message); this.name = 'LSPServerCrashError' }
}
/**
 * LSP client interface.
 */
export type LSPClient = {
  readonly isInitialized: boolean
  start: (
    command: string,
    args: string[],
    options?: {
      env?: Record<string, string>
      cwd?: string
    },
  ) => Promise<void>
  initialize: (params: InitializeParams) => Promise<InitializeResult>
  sendRequest: <TResult>(method: string, params: unknown) => Promise<TResult>
  sendNotification: (method: string, params: unknown) => Promise<void>
  onNotification: (method: string, handler: (params: unknown) => void) => void
  onRequest: <TParams, TResult>(
    method: string,
    handler: (params: TParams) => TResult | Promise<TResult>,
  ) => void
  stop: (shutdownTimeout?: number) => Promise<void>
}

/**
 * Create an LSP client wrapper using vscode-jsonrpc.
 * Manages communication with an LSP server process via stdio.
 *
 * @param onCrash - Called when the server process exits unexpectedly (non-zero
 *   exit code during operation, not during intentional stop). Allows the owner
 *   to propagate crash state so the server can be restarted on next use.
 */
export function createLSPClient(
  serverName: string,
  onCrash?: (error: Error) => void,
): LSPClient {
  // State variables in closure
  let process: ChildProcess | undefined
  let connection: MessageConnection | undefined
  let isInitialized = false
  let startFailed = false
  let startError: Error | undefined
  let isStopping = false // Track intentional shutdown to avoid spurious error logging
  let boundaryStartController: AbortController | undefined
  // Queue handlers registered before connection ready (lazy initialization support)
  // Persist registrations across a crash/restart, not just until first start.
  const notificationHandlers = new Map<string, (params: unknown) => void>()
  const requestHandlers = new Map<string, (params: unknown) => unknown | Promise<unknown>>()

  function dispose(target: MessageConnection): void {
    try { target.dispose() }
    catch (error) { logForDebugging(`Connection disposal failed for ${serverName}: ${errorMessage(error)}`) }
  }
  function cleanup(targetProcess: ChildProcess, targetConnection: MessageConnection | undefined, force = false): void {
    if (targetConnection) dispose(targetConnection)
    targetProcess.removeAllListeners('error')
    targetProcess.removeAllListeners('exit')
    targetProcess.stdin?.removeAllListeners('error')
    targetProcess.stderr?.removeAllListeners('data')
    if (targetProcess.exitCode !== null || targetProcess.signalCode !== null) return
    try { targetProcess.kill(force ? 'SIGKILL' : undefined) }
    catch (error) { logForDebugging(`Process kill failed for ${serverName}: ${errorMessage(error)}`) }
  }

  function checkStartFailed(): void {
    if (startFailed) {
      throw startError || new Error(`LSP server ${serverName} failed to start`)
    }
  }

  return {
    get isInitialized(): boolean {
      return isInitialized
    },

    async start(
      command: string,
      args: string[],
      options?: {
        env?: Record<string, string>
        cwd?: string
      },
    ): Promise<void> {
      if (process) throw new Error(`LSP client ${serverName} already started`)
      startFailed = false
      startError = undefined
      isInitialized = false
      isStopping = false
      try {
        // 1. Spawn LSP server process
        // The confinement capability is attached to the existing execution
        // root. Keep the original direct-spawn path untouched for unbound
        // legacy callers; a bound execution must use the initialized native
        // sandbox and may never fall back to a host child.
        const { getExecutionWorkspaceConfinement287 } = require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')
        const workspacePolicy = getExecutionWorkspaceConfinement287()
        let spawnCommand = command
        let spawnArgs = args
        let spawnCwd = options?.cwd
        if (workspacePolicy) {
          if (globalThis.process.platform !== 'darwin' && globalThis.process.platform !== 'linux') {
            throw new Error(`Required workspace sandbox is unavailable for LSP on ${globalThis.process.platform}`)
          }
          const { getCwd } = require('../../utils/cwd.js') as typeof import('../../utils/cwd.js')
          const controller = new AbortController()
          boundaryStartController = controller
          const requestedCwd = options?.cwd ?? getCwd()
          const validateBoundary = () => {
            if (controller.signal.aborted) throw controller.signal.reason ?? new Error('LSP server closed before spawn')
            const currentPolicy = getExecutionWorkspaceConfinement287()
            if (currentPolicy !== workspacePolicy) throw new Error('Workspace execution policy changed')
            workspacePolicy.assertRootIdentity()
            workspacePolicy.preflightCwd(requestedCwd)
          }
          validateBoundary()
          const cwd = workspacePolicy.preflightCwd(requestedCwd).canonicalCandidate
          const { SandboxManager } = require('../../utils/sandbox/sandbox-adapter.js') as typeof import('../../utils/sandbox/sandbox-adapter.js')
          await SandboxManager.initialize()
          validateBoundary()
          if (!SandboxManager.isSandboxingEnabled()) throw new Error(SandboxManager.getSandboxUnavailableReason() ?? 'Required workspace sandbox is unavailable for LSP')
          // SandboxManager.wrapWithSandbox accepts a shell command. Quote the
          // exact executable/argument vector, then replace the outer shell so
          // existing kill/exit cleanup continues to address the sandbox tree.
          const shellquote = require('shell-quote') as typeof import('shell-quote')
          const wrapped = await SandboxManager.wrapWithSandbox(shellquote.quote([command, ...args]), '/bin/sh', undefined, controller.signal)
          spawnCommand = '/bin/sh'
          spawnArgs = ['-c', `exec ${wrapped}`]
          spawnCwd = cwd
          let released = false
          const releaseBoundary = () => {
            if (released) return
            released = true
            SandboxManager.cleanupAfterCommand()
          }
          try {
            validateBoundary()
            process = spawn(spawnCommand, spawnArgs, {
              stdio: ['pipe', 'pipe', 'pipe'],
              env: { ...subprocessEnv(), ...options?.env },
              cwd: spawnCwd,
              windowsHide: true,
            })
          } catch (error) {
            releaseBoundary()
            throw error
          }
          process.once('close', releaseBoundary)
          process.once('error', releaseBoundary)
          if (boundaryStartController === controller) boundaryStartController = undefined
        } else {
          process = spawn(spawnCommand, spawnArgs, {
            stdio: ['pipe', 'pipe', 'pipe'],
            env: { ...subprocessEnv(), ...options?.env },
            cwd: spawnCwd,
            // Prevent visible console window on Windows (no-op on other platforms)
            windowsHide: true,
          })
        }

        if (!process.stdout || !process.stdin) {
          throw new Error('LSP server process stdio not available')
        }

        // 1.5. Wait for process to successfully spawn before using streams
        // This is CRITICAL: spawn() returns immediately, but the 'error' event
        // (e.g., ENOENT for command not found) fires asynchronously.
        // If we use the streams before confirming spawn succeeded, we get
        // unhandled promise rejections when writes fail on invalid streams.
        const spawnedProcess = process // Capture for closure
        await new Promise<void>((resolve, reject) => {
          const onSpawn = (): void => {
            cleanup()
            resolve()
          }
          const onError = (error: Error): void => {
            cleanup()
            reject(error)
          }
          const cleanup = (): void => {
            spawnedProcess.removeListener('spawn', onSpawn)
            spawnedProcess.removeListener('error', onError)
          }
          spawnedProcess.once('spawn', onSpawn)
          spawnedProcess.once('error', onError)
        })

        // Capture stderr for server diagnostics and errors
        if (process.stderr) {
          process.stderr.on('data', (data: Buffer) => {
            const output = data.toString().trim()
            if (output) {
              logForDebugging(`[LSP SERVER ${serverName}] ${output}`)
            }
          })
        }

        // Handle process errors (after successful spawn, e.g., crash during operation)
        process.on('error', error => {
          if (process !== spawnedProcess) return
          if (!isStopping) {
            startFailed = true
            startError = error
            logError(
              new Error(
                `LSP server ${serverName} failed to start: ${error.message}`,
              ),
            )
          }
        })

        process.on('exit', (code, signal) => {
          if (process !== spawnedProcess) return
          if ((code === null ? signal !== null : code !== 0) && !isStopping) {
            isInitialized = false
            const reason = code === null ? `signal ${signal}` : `exit code ${code}`
            const crashError = new LSPServerCrashError(`LSP server ${serverName} crashed with ${reason}`)
            startFailed = true
            startError = crashError
            logError(crashError)
            cleanup(spawnedProcess, connection)
            process = undefined
            connection = undefined
            onCrash?.(crashError)
          }
        })

        // Handle stdin stream errors to prevent unhandled promise rejections
        // when the LSP server process exits before we finish writing
        process.stdin.on('error', (error: Error) => {
          if (process !== spawnedProcess) return
          if (!isStopping) {
            logForDebugging(
              `LSP server ${serverName} stdin error: ${error.message}`,
            )
          }
          // Error is logged but not thrown - the connection error handler will catch this
        })

        // 2. Create JSON-RPC connection
        let sessionConnection: MessageConnection | undefined
        const reader = new BoundedMessageReader(process.stdout, error => {
          if (process !== spawnedProcess || isStopping || spawnedProcess.exitCode !== null || spawnedProcess.signalCode !== null) {
            if (sessionConnection) dispose(sessionConnection)
            return
          }
          startFailed = true
          startError = error
          isInitialized = false
          logForDebugging(`LSP server ${serverName} protocol violation, stopping process: ${error.message}`, {level: 'error'})
          cleanup(spawnedProcess, sessionConnection, true)
          process = undefined
          connection = undefined
          onCrash?.(error)
        })
        const writer = new StreamMessageWriter(process.stdin)
        connection = createMessageConnection(reader, writer)
        sessionConnection = connection

        // 2.5. Register error/close handlers BEFORE listen() to catch all errors
        // This prevents unhandled promise rejections when the server crashes or closes unexpectedly
        connection.onError(([error, _message, _code]) => {
          if (process !== spawnedProcess) return
          // Only log if not intentionally stopping (avoid spurious errors during shutdown)
          if (!isStopping) {
            startFailed = true
            startError = error
            logError(
              new Error(
                `LSP server ${serverName} connection error: ${error.message}`,
              ),
            )
          }
        })

        connection.onClose(() => {
          if (process !== spawnedProcess) return
          // Only treat as error if not intentionally stopping
          if (!isStopping) {
            isInitialized = false
            // Don't set startFailed here - the connection may close after graceful shutdown
            logForDebugging(`LSP server ${serverName} connection closed`)
          }
        })

        // 3. Start listening for messages
        connection.listen()

        // 3.5. Enable protocol tracing for debugging
        // Note: trace() sends a $/setTrace notification which can fail if the server
        // process has already exited. We catch and log the error rather than letting
        // it become an unhandled promise rejection.
        connection
          .trace(Trace.Verbose, {
            log: (message: string) => {
              logForDebugging(`[LSP PROTOCOL ${serverName}] ${message}`)
            },
          })
          .catch((error: Error) => {
            logForDebugging(
              `Failed to enable tracing for ${serverName}: ${error.message}`,
            )
          })

        // 4. Apply any queued notification handlers
        for (const [method, handler] of notificationHandlers) {
          connection.onNotification(method, handler)
          logForDebugging(
            `Applied queued notification handler for ${serverName}.${method}`,
          )
        }

        // 5. Apply any queued request handlers
        for (const [method, handler] of requestHandlers) {
          connection.onRequest(method, handler)
          logForDebugging(
            `Applied queued request handler for ${serverName}.${method}`,
          )
        }

        logForDebugging(`LSP client started for ${serverName}`)
      } catch (error) {
        if (boundaryStartController) boundaryStartController = undefined
        if (process) {
          cleanup(process, connection)
          process = undefined
          connection = undefined
        }
        const err = error as Error
        logError(
          new Error(`LSP server ${serverName} failed to start: ${err.message}`),
        )
        throw error
      }
    },

    async initialize(params: InitializeParams): Promise<InitializeResult> {
      const current = connection
      if (!current) {
        throw new Error('LSP client not started')
      }

      checkStartFailed()

      try {
        const result: InitializeResult = await current.sendRequest(
          'initialize',
          params,
        )


        // Send initialized notification
        await current.sendNotification('initialized', {})

        // Exit/protocol error may have arrived during the awaited initialize.
        checkStartFailed()
        if (connection !== current) throw new Error('LSP server stopped during initialize')

        isInitialized = true
        logForDebugging(`LSP server ${serverName} initialized`)

        return result
      } catch (error) {
        const err = error as Error
        logError(
          new Error(
            `LSP server ${serverName} initialize failed: ${err.message}`,
          ),
        )
        throw startFailed && startError ? startError : error
      }
    },

    async sendRequest<TResult>(
      method: string,
      params: unknown,
    ): Promise<TResult> {
      if (!connection) {
        throw new Error('LSP client not started')
      }

      checkStartFailed()

      if (!isInitialized) {
        throw new Error('LSP server not initialized')
      }

      try {
        return await connection.sendRequest(method, params)
      } catch (error) {
        const err = error as Error
        logError(
          new Error(
            `LSP server ${serverName} request ${method} failed: ${err.message}`,
          ),
        )
        throw error
      }
    },

    async sendNotification(method: string, params: unknown): Promise<void> {
      if (!connection) {
        throw new Error('LSP client not started')
      }

      checkStartFailed()

      try {
        await connection.sendNotification(method, params)
      } catch (error) {
        const err = error as Error
        logError(
          new Error(
            `LSP server ${serverName} notification ${method} failed: ${err.message}`,
          ),
        )
        // Don't re-throw for notifications - they're fire-and-forget
        logForDebugging(`Notification ${method} failed but continuing`)
      }
    },

    onNotification(method: string, handler: (params: unknown) => void): void {
      notificationHandlers.set(method, handler)
      if (!connection) {
        logForDebugging(
          `Queued notification handler for ${serverName}.${method} (connection not ready)`,
        )
        return
      }

      checkStartFailed()

      connection.onNotification(method, handler)
    },

    onRequest<TParams, TResult>(
      method: string,
      handler: (params: TParams) => TResult | Promise<TResult>,
    ): void {
      const adapted = handler as (params: unknown) => unknown | Promise<unknown>
      requestHandlers.set(method, adapted)
      if (!connection) {
        logForDebugging(
          `Queued request handler for ${serverName}.${method} (connection not ready)`,
        )
        return
      }

      checkStartFailed()

      connection.onRequest(method, adapted)
    },

    async stop(shutdownTimeout?: number): Promise<void> {
      let shutdownError: Error | undefined

      // Mark as stopping to prevent error handlers from logging spurious errors
      isStopping = true
      boundaryStartController?.abort(new Error('LSP server closed before spawn'))

      const targetProcess = process
      const targetConnection = connection
      try {
        if (targetConnection) {
          // Exit is attempted even if shutdown rejects. Timeout bounds the
          // whole exchange; a late reply cannot dispose a restarted process.
          const shutdown = (async () => {
            let requestError: unknown
            try { await targetConnection.sendRequest('shutdown') }
            catch (error) { requestError = error }
            try { await targetConnection.sendNotification('exit') }
            catch (error) { throw requestError ?? error }
            if (requestError !== undefined) throw requestError
          })()
          shutdown.catch(() => {})
          if (shutdownTimeout !== undefined) {
            await withTimeout(shutdown, shutdownTimeout, `LSP server '${serverName}' timed out after ${shutdownTimeout}ms during shutdown`)
          } else await shutdown
        }
      } catch (error) {
        const err = error as Error
        logError(
          new Error(`LSP server ${serverName} stop failed: ${err.message}`),
        )
        shutdownError = err
        // Continue to cleanup despite shutdown failure
      } finally {
        // Always cleanup resources, even if shutdown/exit failed
        const currentProcess = process === targetProcess
        if (targetProcess) cleanup(targetProcess, targetConnection)
        else if (targetConnection) dispose(targetConnection)
        if (currentProcess) { process = undefined; connection = undefined }

        if (currentProcess) {
          isInitialized = false
          isStopping = false // Reset for potential restart
          if (shutdownError) { startFailed = true; startError = shutdownError }
        } else if (!targetProcess) isStopping = false

        logForDebugging(`LSP client stopped for ${serverName}`)
      }

      // Re-throw shutdown error after cleanup is complete
      if (shutdownError) {
        throw shutdownError
      }
    },
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>
  const deadline = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms) })
  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer!))
}
