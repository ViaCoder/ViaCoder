import type { PublishDiagnosticsParams } from 'vscode-languageserver-protocol'
import type { DiagnosticFile } from '../diagnosticTracking.js'
import type { LSPServerManager } from './LSPServerManager.js'

/**
 * Convert LSP diagnostics to Claude diagnostic format
 *
 * Converts LSP PublishDiagnosticsParams to DiagnosticFile[] format
 * used by Claude's attachment system.
 */
export function formatDiagnosticsForAttachment(params:PublishDiagnosticsParams):DiagnosticFile[] {return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').Pfr(params)}

/**
 * Handler registration result with tracking data
 */
export type HandlerRegistrationResult = {
  /** Total number of servers */
  totalServers: number
  /** Number of successful registrations */
  successCount: number
  /** Registration errors per server */
  registrationErrors: Array<{ serverName: string; error: string }>
  /** Runtime failure tracking (shared across all handler invocations) */
  diagnosticFailures: Map<string, { count: number; lastError: string }>
}

/**
 * Register LSP notification handlers on all servers
 *
 * Sets up handlers to listen for textDocument/publishDiagnostics notifications
 * from all LSP servers and routes them to Claude's diagnostic system.
 * Uses public getAllServers() API for clean access to server instances.
 *
 * @returns Tracking data for registration status and runtime failures
 */
export function registerLSPNotificationHandlers(manager:LSPServerManager,session=(import.meta.require('../context/execution287.js') as typeof import('../context/execution287.js')).getExecutionSession287()):HandlerRegistrationResult {return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').Ttn(manager,session)}
