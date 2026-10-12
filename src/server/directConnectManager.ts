import type {SharedThinkingState} from './sharedThinkingState.js'
import type {SharedConfigValues} from '../components/Settings/sharedConfig.js'
import type {SharedEffortState} from './sharedEffortState.js'
import { PlanControlNotDeliveredError } from '../commands/plan/remoteProtocol.js'
/* eslint-disable eslint-plugin-n/no-unsupported-features/node-builtins */

import { readRemoteReset } from '../commands/clear/remoteReset.js'

import { PlanControlClient, type PlanControlRequest, type ControlRequestOptions } from '../commands/plan/remoteProtocol.js'
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js'
import type {
  SDKControlPermissionRequest,
  SDKControlElicitationRequest,
  StdoutMessage,
} from '../entrypoints/sdk/controlTypes.js'
import type { RemotePermissionResponse } from '../remote/RemoteSessionManager.js'
import { logForDebugging } from '../utils/debug.js'
import { jsonParse, jsonStringify } from '../utils/slowOperations.js'
import type { RemoteMessageContent } from '../utils/teleport/api.js'

export type DirectConnectConfig = {
  seedAutocompactState?:import('../remote/autocompactState287.js').RemoteAutocompactState287
  serverUrl: string
  sessionId: string
  wsUrl: string
  authToken?: string
}

export type DirectConnectCallbacks = {
  onCatchUpTruncated?:()=>void
  /** C shared-terminal view of the original CU dialog, not can_use_tool. */
  onUserDialog?: (request: import('../vendor/official-desktop/nativeTypes.js').CuPermissionRequest,
    requestId: string, signal: AbortSignal) => Promise<import('../vendor/official-desktop/nativeTypes.js').CuPermissionResponse>
  onMessage: (message: SDKMessage, options?: { renderUser?: boolean }) => void
  onPermissionRequest: (
    request: SDKControlPermissionRequest,
    requestId: string,
  ) => void
  onPermissionResolved?: (requestId: string) => void
  onElicitationRequest?: (request: SDKControlElicitationRequest, requestId: string) => void
  onElicitationResolved?: (requestId: string) => void
  onConnected?: () => void
  /** Existing shared-session display metadata; not a model/SDK message. */
  onSessionTitle?: (title: string) => void
  onSessionModel?: (model: string) => void
  onSessionColor?: (color: import('../tools/AgentTool/agentColorManager.js').AgentColorName | undefined) => void
  onSessionThinking?: (state: SharedThinkingState) => void
  onSessionPreferences?: (settings: SharedConfigValues) => void
  onSessionEffort?: (state: SharedEffortState) => void
  onDisconnected?: () => void
  onError?: (error: Error) => void
}

function isStdoutMessage(value: unknown): value is StdoutMessage {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof value.type === 'string'
  )
}

export class DirectConnectSessionManager {
  private ws: WebSocket | null = null
  private planControls = this.createPlanControls()
  private resetIds = new Set<string>()
  private createPlanControls(): PlanControlClient {
    return new PlanControlClient(frame => {
      if (!this.isConnected()) throw new Error('Direct session is not connected')
      try { this.ws!.send(jsonStringify(frame)) }
      catch { throw new PlanControlNotDeliveredError() }
    })
  }
  getPlanIdentity(): object | undefined {
    return this.isConnected() ? this.planControls : undefined
  }

  requestPlanControl(request: PlanControlRequest, options: ControlRequestOptions): Promise<unknown> {
    return this.planControls.request(request, options)
  }
  private config: DirectConnectConfig
  private callbacks: DirectConnectCallbacks

  constructor(config: DirectConnectConfig, callbacks: DirectConnectCallbacks) {
    this.config = config
    this.callbacks = callbacks
  }

  connect(): void {
    const headers: Record<string, string> = {}
    if (this.config.authToken) {
      headers['authorization'] = `Bearer ${this.config.authToken}`
    }
    // Bun's WebSocket supports headers option but the DOM typings don't
    this.ws = new WebSocket(this.config.wsUrl, {
      headers,
    } as unknown as string[])

    const socket = this.ws
    this.planControls.dispose()
    this.planControls = this.createPlanControls()
    this.ws.addEventListener('open', () => {
      if (this.ws !== socket) return
      this.callbacks.onConnected?.()
    })

    this.ws.addEventListener('message', event => {
      if (this.ws !== socket) return
      const data = typeof event.data === 'string' ? event.data : ''
      const lines = data.split('\n').filter((l: string) => l.trim())

      for (const line of lines) {
        let raw: unknown
        try {
          raw = jsonParse(line)
        } catch {
          continue
        }

        if(typeof raw==='object'&&raw!==null&&'type' in raw&&raw.type==='catch_up_truncated'){
          this.callbacks.onCatchUpTruncated?.()
          continue
        }
        if (!isStdoutMessage(raw)) {
          continue
        }
        const parsed = raw

        if (parsed.type === 'control_response') {
          this.planControls.receive(parsed)
          continue
        }

        // Handle control requests (permission requests)
        if (parsed.type === 'control_request') {
          if (parsed.request.subtype === 'can_use_tool') {
            this.callbacks.onPermissionRequest(
              parsed.request,
              parsed.request_id,
            )
          } else {
            // Send an error response for unrecognized subtypes so the
            // server doesn't hang waiting for a reply that never comes.
            logForDebugging(
              `[DirectConnect] Unsupported control request subtype: ${parsed.request.subtype}`,
            )
            this.sendErrorResponse(
              parsed.request_id,
              `Unsupported control request subtype: ${parsed.request.subtype}`,
            )
          }
          continue
        }

        const reset = readRemoteReset(parsed)
        if (reset && !this.resetIds.has(reset.newConversationId)) {
          this.resetIds.add(reset.newConversationId)
          if (this.resetIds.size > 2048) this.resetIds.delete(this.resetIds.values().next().value!)
          this.planControls.dispose(new Error('Remote conversation was reset'))
          this.planControls = this.createPlanControls()
        }

        // Forward SDK messages (assistant, result, system, etc.)
        if (
          parsed.type !== 'keep_alive' &&
          parsed.type !== 'control_cancel_request' &&
          parsed.type !== 'streamlined_text' &&
          parsed.type !== 'streamlined_tool_use_summary' &&
          !(parsed.type === 'system' && parsed.subtype === 'post_turn_summary')
        ) {
          this.callbacks.onMessage(parsed)
        }
      }
    })

    this.ws.addEventListener('close', () => {
      if (this.ws !== socket) return
      this.planControls.dispose()
      this.callbacks.onDisconnected?.()
    })

    this.ws.addEventListener('error', () => {
      if (this.ws !== socket) return
      this.callbacks.onError?.(new Error('WebSocket connection error'))
    })
  }

  sendMessage(content: RemoteMessageContent, opts?: { uuid?: string }): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return false
    }

    // Must match SDKUserMessage format expected by `--input-format stream-json`
    const message = jsonStringify({
      type: 'user',
      ...(opts?.uuid && { uuid: opts.uuid }),
      message: {
        role: 'user',
        content: content,
      },
      parent_tool_use_id: null,
      session_id: '',
    })
    this.ws.send(message)
    return true
  }

  respondToPermissionRequest(
    requestId: string,
    result: RemotePermissionResponse,
  ): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }

    // Must match SDKControlResponse format expected by StructuredIO
    const response = jsonStringify({
      type: 'control_response',
      response: {
        subtype: 'success',
        request_id: requestId,
        response: {
          behavior: result.behavior,
          ...(result.behavior === 'allow'
            ? { updatedInput: result.updatedInput }
            : { message: result.message }),
        },
      },
    })
    this.ws.send(response)
  }

  /**
   * Send an interrupt signal to cancel the current request
   */
  sendInterrupt(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }

    // Must match SDKControlRequest format expected by StructuredIO
    const request = jsonStringify({
      type: 'control_request',
      request_id: crypto.randomUUID(),
      request: {
        subtype: 'interrupt',
      },
    })
    this.ws.send(request)
  }

  private sendErrorResponse(requestId: string, error: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return
    }
    const response = jsonStringify({
      type: 'control_response',
      response: {
        subtype: 'error',
        request_id: requestId,
        error,
      },
    })
    this.ws.send(response)
  }

  disconnect(): void {
    this.planControls.dispose()
    if (this.ws) {
      const socket = this.ws
      this.ws = null // Ignore close/late-message callbacks from deliberate disposal.
      socket.close()
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}
