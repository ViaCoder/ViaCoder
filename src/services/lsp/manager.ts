export interface OriginalLspLifecycle287 {
 get():LSPServerManager|undefined
 getStatus():{status:'not-started'|'pending'|'success'}|{status:'failed';error:Error}
 isConnected():boolean
 hasEverConnected():boolean
 waitForInitialization():Promise<void>
 initialize(session:import('../context/officialExecutionOwners287/native.js').ExecutionSession287,storageV5?:unknown,credentials?:unknown):void
 reinitialize(storageV5?:unknown,credentials?:unknown):void
 shutdown():Promise<void>
}
/** The exact canonical aP instance; no local lifecycle state or forwarding cycle. */
export function getOriginalLspLifecycle287():OriginalLspLifecycle287 {return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').aP}

import { getExecutionSession287 } from '../context/execution287.js'
import type { LSPServerManager } from './LSPServerManager.js'

/** Test-only teardown of the actual owner. Callers await its real shutdown. */
export function _resetLspManagerForTesting():Promise<void> {return getOriginalLspLifecycle287().shutdown()}

/**
 * Get the singleton LSP server manager instance.
 * Returns undefined before creation or after failure; the original pending instance
 * is visible while its initialization promise is still pending.
 *
 * Callers should check for undefined and handle gracefully, as initialization happens
 * asynchronously during Claude Code startup. Use getInitializationStatus() to
 * distinguish between pending, failed, and not-started states.
 */
export function getLspServerManager():LSPServerManager|undefined {return getOriginalLspLifecycle287().get()}

/**
 * Get the current initialization status of the LSP server manager.
 *
 * @returns Status object with current state and error (if failed)
 */
export function getInitializationStatus():ReturnType<OriginalLspLifecycle287['getStatus']> {return getOriginalLspLifecycle287().getStatus()}

/**
 * Check whether at least one language server is connected and healthy.
 * Backs LSPTool.isEnabled().
 */
export function hasEverConnected():boolean {return getOriginalLspLifecycle287().hasEverConnected()}

export function isLspConnected():boolean {return getOriginalLspLifecycle287().isConnected()}

/**
 * Wait for LSP server manager initialization to complete.
 *
 * Returns immediately if initialization has already completed (success or failure).
 * If initialization is pending, waits for it to complete.
 * If initialization hasn't started, returns immediately.
 *
 * @returns Promise that resolves when initialization is complete
 */
export function waitForInitialization():Promise<void> {return getOriginalLspLifecycle287().waitForInitialization()}

/**
 * Initialize the LSP server manager singleton.
 *
 * This function is called during Claude Code startup. It synchronously creates
 * the manager instance, then starts async initialization (loading LSP configs)
 * in the background without blocking the startup process.
 *
 * Safe to call multiple times - will only initialize once (idempotent).
 * However, if initialization previously failed, calling again will retry.
 */
export function initializeLspServerManager(session=getExecutionSession287(),storageV5?:unknown,credentials?:unknown):void {getOriginalLspLifecycle287().initialize(session,storageV5,credentials)}

/**
 * Force re-initialization of the LSP server manager, even after a prior
 * successful init. Called from refreshActivePlugins() after plugin caches
 * are cleared, so newly-loaded plugin LSP servers are picked up.
 *
 * Fixes https://github.com/anthropics/claude-code/issues/15521:
 * loadAllPlugins() is memoized and can be called very early in startup
 * (via getCommands prefetch in setup.ts) before marketplaces are reconciled,
 * caching an empty plugin list. initializeLspServerManager() then reads that
 * stale memoized result and initializes with 0 servers. Unlike commands/agents/
 * hooks/MCP, LSP was never re-initialized on plugin refresh.
 *
 * Safe to call when no LSP plugins changed: initialize() is just config
 * parsing (servers are lazy-started on first use). Also safe during pending
 * init: the generation counter invalidates the in-flight promise.
 */
export function reinitializeLspServerManager(storageV5?:unknown,credentials?:unknown):void {getOriginalLspLifecycle287().reinitialize(storageV5,credentials)}

/**
 * Shutdown the LSP server manager and clean up resources.
 *
 * This should be called during Claude Code shutdown. Stops all running LSP servers
 * and clears internal state. Safe to call when not initialized (no-op).
 *
 * NOTE: Errors during shutdown are logged for monitoring but NOT propagated to the caller.
 * State is always cleared even if shutdown fails, to prevent resource accumulation.
 * This is acceptable during application exit when recovery is not possible.
 *
 * @returns Promise that resolves when shutdown completes (errors are swallowed)
 */
export function shutdownLspServerManager():Promise<void> {return getOriginalLspLifecycle287().shutdown()}
