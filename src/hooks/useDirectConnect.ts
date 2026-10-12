import type * as React from 'react'
import {getOfficialPublicCcrHook287,type PublicCcrSessionProps287,type PublicCcrSessionResult287} from './officialPublicCcrSession287.js'
import {adoptRemoteAutocompactState287,seedRemoteAutocompactState287,clearRemoteAutocompactState287} from '../remote/autocompactState287.js'
import { useAppStateStore, useSetAppState } from '../state/AppState.js'
import type { ElicitRequestParams } from '@modelcontextprotocol/sdk/types.js'
import { bindRemoteModeSync } from '../commands/plan/modeSyncHost.js'
import type { RemoteModeSync } from '../commands/plan/modeSync.js'
import { consumeRemoteReset, RemoteResetTracker } from '../commands/clear/remoteReset.js'
import type { RemotePlanHost } from '../commands/plan/remotePlan.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ToolUseConfirm } from '../components/permissions/PermissionRequest.js'
import type { SpinnerMode } from '../components/Spinner/types.js'
import type { RemotePermissionResponse } from '../remote/RemoteSessionManager.js'
import {
  createSyntheticAssistantMessage,
  createToolStub,
} from '../remote/remotePermissionBridge.js'
import {
  convertSDKMessage,
  isSessionEndMessage,
} from '../remote/sdkMessageAdapter.js'
import {
  type DirectConnectConfig, type DirectConnectCallbacks,
  DirectConnectSessionManager,
} from '../server/directConnectManager.js'
import { ServeDirectConnectSessionManager, type ServeDirectConnectConfig } from '../server/serveDirectConnectManager.js'
import type { Tool } from '../Tool.js'
import { findToolByName } from '../Tool.js'
import type { Message as MessageType } from '../types/message.js'
import type { PermissionAskDecision } from '../types/permissions.js'
import { logForDebugging } from '../utils/debug.js'
import { createSystemMessage, handleMessageFromStream, type StreamingThinking, type StreamingToolUse } from '../utils/messages.js'
import { gracefulShutdown } from '../utils/gracefulShutdown.js'
import type { RemoteMessageContent } from '../utils/teleport/api.js'
import type {SharedSessionCommandHost} from '../server/sharedSessionCommandHost.js'

type UseDirectConnectResult = {
  sendControlRequest:RemotePlanHost['sendControlRequest']
  sharedSession?: SharedSessionCommandHost
  planHost: RemotePlanHost
  isRemoteMode: boolean
  isConnected: boolean
  sendMessage: (content: RemoteMessageContent, opts?: { uuid?: string }) => Promise<boolean>
  cancelRequest: () => void
  disconnect: () => void
}

type UseDirectConnectProps = {
  requestComputerUseApproval?: DirectConnectCallbacks['onUserDialog']
  onConversationReset?: (id: string) => void
  onSessionTitle?: (title: string | undefined) => void
  config: DirectConnectConfig | ServeDirectConnectConfig | undefined
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
  setIsLoading: (loading: boolean) => void
  setToolUseConfirmQueue: React.Dispatch<React.SetStateAction<ToolUseConfirm[]>>
  tools: Tool[]
  setStreamingToolUses?: React.Dispatch<React.SetStateAction<StreamingToolUse[]>>
  setStreamMode?: React.Dispatch<React.SetStateAction<SpinnerMode>>
  setStreamingThinking?: React.Dispatch<React.SetStateAction<StreamingThinking | null>>
  onStreamingText?: (f: (current: string | null) => string | null) => void
  setResponseLength?: (f: (current: number) => number) => void
  setInProgressToolUseIDs?: (f: (prev: Set<string>) => Set<string>) => void
}

/** Public CCR ingress. The existing local direct/Serve hook below remains a
 * separate C owner; only the actual CCR caller passes the original MRe props. */
export function usePublicCcrSession287(props:PublicCcrSessionProps287):PublicCcrSessionResult287 {
  return getOfficialPublicCcrHook287()(props)
}

export function useDirectConnect({
  requestComputerUseApproval,
  onConversationReset,
  onSessionTitle,
  config,
  setMessages,
  setIsLoading,
  setToolUseConfirmQueue,
  tools,
  setStreamingToolUses,
  setStreamMode,
  setStreamingThinking,
  onStreamingText,
  setResponseLength,
  setInProgressToolUseIDs,
}: UseDirectConnectProps): UseDirectConnectResult {
  const modeSync = useRef<RemoteModeSync | null>(null)
  const modeStore = useAppStateStore()
  const setAppState = useSetAppState()
  const resetTracker = useRef(new RemoteResetTracker())
  const resetCallback = useRef(onConversationReset)
  resetCallback.current = onConversationReset
  const titleCallback = useRef(onSessionTitle)
  titleCallback.current = onSessionTitle
  const computerUseApprovalCallback = useRef(requestComputerUseApproval)
  computerUseApprovalCallback.current = requestComputerUseApproval
  const isRemoteMode = !!config

  const managerRef = useRef<DirectConnectSessionManager | ServeDirectConnectSessionManager | null>(null)
  const configRef = useRef(config)
  configRef.current = config
  const hasReceivedInitRef = useRef(false)
  const isConnectedRef = useRef(false)
  const [isConnected,setConnected] = useState(false)
  // Presentation changes replace the REPL callback, not its session.
  // Keep the transport and replay cursor intact when reduced motion changes.
  const streamingTextCallback = useRef(onStreamingText)
  streamingTextCallback.current = onStreamingText
  const updateStreamingText = useCallback((update: (current: string | null) => string | null) => {
    streamingTextCallback.current?.(update)
  }, [])
  const clearStreaming = useCallback(() => {
    setStreamingToolUses?.(previous => previous.length ? [] : previous)
    setStreamingThinking?.(null)
    updateStreamingText(() => null)
  }, [setStreamingToolUses, setStreamingThinking, updateStreamingText])

  // Keep a ref to tools so the WebSocket callback doesn't go stale
  const toolsRef = useRef(tools)
  useEffect(() => {
    toolsRef.current = tools
  }, [tools])

  useEffect(() => {
    if (!config) {
      return
    }

    hasReceivedInitRef.current = false
    titleCallback.current?.(undefined)
    logForDebugging(`[useDirectConnect] Connecting to ${config.serverUrl}`)

    resetTracker.current = new RemoteResetTracker()
    clearRemoteAutocompactState287(setAppState)
    seedRemoteAutocompactState287(setAppState,config.seedAutocompactState)
    const permissionIds = new Map<string, string>()
    const elicitationControllers = new Map<string, AbortController>()
    const callbacks: DirectConnectCallbacks = {
      onCatchUpTruncated:()=>clearRemoteAutocompactState287(setAppState),
      onUserDialog: (request,id,signal) => {
        const presenter=computerUseApprovalCallback.current
        if(!presenter)return Promise.reject(new Error('Shared terminal computer use presenter missing'))
        return presenter(request,id,signal)
      },
      onMessage: (sdkMessage, options) => {
        modeSync.current?.receive(sdkMessage)
        if(sdkMessage.type==='autocompact_state'){
          adoptRemoteAutocompactState287(setAppState,sdkMessage.value,'thin_client_stream')
          return
        }
        if (sdkMessage.type === 'user' && sdkMessage.uuid) resetTracker.current.noteDelivered(sdkMessage.uuid)
        if (consumeRemoteReset(sdkMessage, resetTracker.current, {
          setMessages, onConversationReset: id => resetCallback.current?.(id),
          clearTransientState: () => { modeSync.current?.conversationReset(); setIsLoading(false); setToolUseConfirmQueue(() => []); clearStreaming() },
        })) return
        if (isSessionEndMessage(sdkMessage)) {
          setIsLoading(false)
          clearStreaming()
        }

        // Skip duplicate init messages (server sends one per turn)
        if (sdkMessage.type === 'system' && sdkMessage.subtype === 'init') {
          if (hasReceivedInitRef.current) {
            return
          }
          hasReceivedInitRef.current = true
        }

        const converted = convertSDKMessage(sdkMessage, {
          convertToolResults: true,
          convertUserTextMessages: options?.renderUser,
        })
        const mainSource = !('parent_tool_use_id' in sdkMessage) || !sdkMessage.parent_tool_use_id
        if (converted.type === 'message') {
          // The final main-thread assistant frame replaces the partial UI in
          // the same React batch. An Agent's final must not erase the main
          // thread's independently arriving stream.
          if (converted.message.type === 'assistant' && mainSource) {
            if (setStreamingToolUses && setStreamMode) {
              handleMessageFromStream(converted.message, message => setMessages(prev => [...prev, message]),
                () => {}, setStreamMode, setStreamingToolUses, undefined, setStreamingThinking,
                undefined, updateStreamingText)
            } else {
              clearStreaming()
              setMessages(prev => [...prev, converted.message])
            }
            if (setInProgressToolUseIDs) {
              const ids = converted.message.message.content.filter(block => block.type === 'tool_use').map(block => block.id)
              if (ids.length) setInProgressToolUseIDs(previous => new Set([...previous, ...ids]))
            }
          } else setMessages(prev => [...prev, converted.message])
        } else if (converted.type === 'stream_event' && mainSource && setStreamingToolUses && setStreamMode) {
          // Reuse the same official/local stream consumer as the REPL and
          // useRemoteSession. Agent-parent deltas stay out of main-thread
          // streamingText/tool-input state; their final SDK frames still render.
          handleMessageFromStream(converted.event, message => setMessages(prev => [...prev, message]),
            content => setResponseLength?.(length => length + content.length),
            setStreamMode, setStreamingToolUses, undefined, setStreamingThinking,
            undefined, updateStreamingText)
        }
      },
      onPermissionRequest: (request, requestId) => {
        permissionIds.set(requestId, request.tool_use_id)
        logForDebugging(
          `[useDirectConnect] Permission request for tool: ${request.tool_name}`,
        )

        const tool =
          findToolByName(toolsRef.current, request.tool_name) ??
          createToolStub(request.tool_name)

        const syntheticMessage = createSyntheticAssistantMessage(
          request,
          requestId,
        )

        const permissionResult: PermissionAskDecision = {
          behavior: 'ask',
          message:
            request.description ?? `${request.tool_name} requires permission`,
          suggestions: request.permission_suggestions,
          blockedPath: request.blocked_path,
        }

        const toolUseConfirm: ToolUseConfirm = {
          assistantMessage: syntheticMessage,
          tool,
          description:
            request.description ?? `${request.tool_name} requires permission`,
          input: request.input,
          toolUseContext: {} as ToolUseConfirm['toolUseContext'],
          toolUseID: request.tool_use_id,
          permissionResult,
          permissionPromptStartTimeMs: Date.now(),
          onUserInteraction() {
            // No-op for remote
          },
          onAbort() {
            const response = {
              behavior: 'deny',
              message: 'User aborted',
              ...('protocol' in config ? { interrupt: true } : {}),
            } as const
            manager.respondToPermissionRequest(requestId, response)
            setToolUseConfirmQueue(queue =>
              queue.filter(item => item.toolUseID !== request.tool_use_id),
            )
          },
          onAllow(updatedInput, permissionUpdates, _feedback) {
            const response = {
              behavior: 'allow',
              updatedInput,
              ...('protocol' in config && permissionUpdates.length ? { updatedPermissions: permissionUpdates } : {}),
            } as const
            manager.respondToPermissionRequest(requestId, response)
            setToolUseConfirmQueue(queue =>
              queue.filter(item => item.toolUseID !== request.tool_use_id),
            )
            setIsLoading(true)
          },
          onReject(feedback?: string) {
            const response: RemotePermissionResponse = {
              behavior: 'deny',
              message: feedback ?? 'User denied permission',
            }
            manager.respondToPermissionRequest(requestId, response)
            setToolUseConfirmQueue(queue =>
              queue.filter(item => item.toolUseID !== request.tool_use_id),
            )
          },
          async recheckPermission() {
            // No-op for remote
          },
        }

        setToolUseConfirmQueue(queue => [...queue, toolUseConfirm])
        setIsLoading(false)
      },
      onPermissionResolved: (requestId: string) => {
        const toolUseId = permissionIds.get(requestId)
        permissionIds.delete(requestId)
        if (toolUseId) setToolUseConfirmQueue(queue => queue.filter(item => item.toolUseID !== toolUseId))
      },
      onElicitationRequest: (request, requestId) => {
        if (!('protocol' in config) || elicitationControllers.has(requestId)) return
        const controller = new AbortController()
        elicitationControllers.set(requestId, controller)
        const params = { message: request.message,
          ...(request.mode ? { mode: request.mode } : {}),
          ...(request.url ? { url: request.url } : {}),
          ...(request.elicitation_id ? { elicitationId: request.elicitation_id } : {}),
          ...(request.requested_schema ? { requestedSchema: request.requested_schema } : {}),
        } as ElicitRequestParams
        setAppState(previous => ({ ...previous, elicitation: { queue: [...previous.elicitation.queue, {
          serverName: request.mcp_server_name, requestId, params, signal: controller.signal,
          waitingState: request.mode === 'url' && request.elicitation_id ? { actionLabel: 'Skip confirmation' } : undefined,
          respond: result => (manager as ServeDirectConnectSessionManager).respondToElicitation(requestId, result),
        }] } }))
      },
      onElicitationResolved: requestId => {
        elicitationControllers.get(requestId)?.abort()
        elicitationControllers.delete(requestId)
        setAppState(previous => ({ ...previous, elicitation: {
          queue: previous.elicitation.queue.filter(item => item.requestId !== requestId),
        } }))
      },
      onConnected: () => {
        logForDebugging('[useDirectConnect] Connected')
        isConnectedRef.current = true
        setConnected(true)
        modeSync.current?.connected()
      },
      onSessionTitle: title => titleCallback.current?.(title),
      onSessionThinking: state => {
        if(configRef.current!==config)return
        setAppState(previous=>({...previous,thinkingEnabled:state.enabled}))
      },
      onSessionPreferences: settings => {
        if(configRef.current!==config)return
        setAppState(previous=>{
          const {spinnerTipsEnabled:_tips,prefersReducedMotion:_motion,outputStyle:_style,...local}=previous.settings
          return {...previous,settings:{...local,...settings}}
        })
      },
      onSessionEffort: state => {
        const value=state.selection==='inherit'?undefined:state.selection==='default'?null:state.selection
        setAppState(previous=>previous.effortValue===value?previous:{...previous,effortValue:value})
      },
      onSessionColor: color => setAppState(previous => previous.standaloneAgentContext?.color === color ? previous : ({
        ...previous,
        standaloneAgentContext: {
          ...previous.standaloneAgentContext,
          name: previous.standaloneAgentContext?.name ?? '',
          color,
        },
      })),
      onSessionModel: model => setAppState(previous => previous.sharedSessionViewer && previous.mainLoopModel === model && previous.mainLoopModelForSession === null
        ? previous : {...previous, sharedSessionViewer:true, mainLoopModel: model, mainLoopModelForSession: null}),
      onDisconnected: () => {
        clearStreaming()
        modeSync.current?.disconnected()
        logForDebugging('[useDirectConnect] Disconnected')
        if (!isConnectedRef.current) {
          // Never connected — connection failure (e.g. auth rejected)
          process.stderr.write(
            `\nFailed to connect to server at ${config.serverUrl}\n`,
          )
        } else {
          // Was connected then lost — server process exited or network dropped
          process.stderr.write('\nServer disconnected.\n')
        }
        isConnectedRef.current = false
        setConnected(false)
        void gracefulShutdown(1)
        setIsLoading(false)
      },
      onError: error => {
        logForDebugging(`[useDirectConnect] Error: ${error.message}`)
      },
    }
    const manager = 'protocol' in config
      ? new ServeDirectConnectSessionManager(config, callbacks)
      : new DirectConnectSessionManager(config, callbacks)

    const binding = bindRemoteModeSync(modeStore, {
      send: (request, options) => manager.requestPlanControl(request, options),
      connectPolicy: 'current',
      notice: message => setMessages(previous => [...previous, createSystemMessage(message, 'warning')]),
    })
    modeSync.current = binding.sync
    managerRef.current = manager
    manager.connect()

    return () => {
      logForDebugging('[useDirectConnect] Cleanup - disconnecting')
      binding.dispose()
      clearRemoteAutocompactState287(setAppState)
      for (const controller of elicitationControllers.values()) controller.abort()
      const ids = new Set(elicitationControllers.keys())
      if (ids.size) setAppState(previous => ({ ...previous, elicitation: {
        queue: previous.elicitation.queue.filter(item => !ids.has(String(item.requestId))),
      } }))
      if (modeSync.current === binding.sync) modeSync.current = null
      manager.disconnect()
      managerRef.current = null
      clearStreaming()
    }
  }, [modeStore, config, setMessages, setIsLoading, setToolUseConfirmQueue, setAppState,
    setStreamingToolUses, setStreamMode, setStreamingThinking, updateStreamingText, setResponseLength,
    setInProgressToolUseIDs, clearStreaming])

  const sendMessage = useCallback(
    async (content: RemoteMessageContent, opts?: { uuid?: string }): Promise<boolean> => {
      const manager = managerRef.current
      if (!manager) {
        return false
      }

      setIsLoading(true)

      resetTracker.current.noteSubmission(opts?.uuid, content)
      try {
        const sent = await manager.sendMessage(content, opts)
        if (!sent) { resetTracker.current.forget(opts?.uuid); setIsLoading(false) }
        return sent
      } catch (error) { resetTracker.current.forget(opts?.uuid); setIsLoading(false); throw error }
    },
    [setIsLoading],
  )

  // Cancel the current request
  const cancelRequest = useCallback(() => {
    // Send interrupt signal to the server
    managerRef.current?.sendInterrupt()

    setIsLoading(false)
    clearStreaming()
  }, [setIsLoading, clearStreaming])

  const disconnect = useCallback(() => {
    modeSync.current?.disconnected()
    managerRef.current?.disconnect()
    managerRef.current = null
    isConnectedRef.current = false
        setConnected(false)
    clearStreaming()
  }, [clearStreaming])

  // Same stability concern as useRemoteSession — memoize so consumers
  // that depend on the result object don't see a fresh reference per render.
  const planHost = useMemo<RemotePlanHost>(() => ({
    waitForMode: (mode, options) => modeSync.current?.waitForMode(mode, options) ?? Promise.reject(new Error('Remote mode sync is not connected')),
    getSessionIdentity: () => managerRef.current?.getPlanIdentity(),
    getModeIdentity: () => modeSync.current?.getIdentity(),
    sendControlRequest: (request, options) => {
      const manager = managerRef.current
      return manager ? manager.requestPlanControl(request, options) : Promise.reject(new Error('Direct session is not connected'))
    },
    sendMessage,
  }), [sendMessage])
  const sharedSession = useMemo<SharedSessionCommandHost | undefined>(() => {
    if (!config || !('protocol' in config)) return undefined
    const current = () => {
      const manager = managerRef.current
      if (configRef.current !== config || !(manager instanceof ServeDirectConnectSessionManager) || !manager.isConnected())
        throw new Error('Shared session is not connected')
      return manager
    }
    const run = async <T,>(work: (manager: ServeDirectConnectSessionManager) => Promise<T>): Promise<T> => {
      const manager = current()
      const result = await work(manager)
      if (current() !== manager) throw new Error('Shared session changed before command confirmation')
      return result
    }
    return {
      contextUsage: signal => run(manager => manager.contextUsage(signal)),
      thinking: (change, signal) => run(manager => manager.thinking(change, signal)),
      getSettings: signal => run(manager => manager.getSettings(signal)),
      updateSettings: (update, signal) => run(manager => manager.updateSettings(update, signal)),
      subscribeSettingsChanges: listener => current().subscribeSettingsChanges(listener),
      listTasks: signal => run(manager => manager.listTasks(signal)),
      stopTask: (taskId,signal) => run(manager => manager.stopTask(taskId,signal)),
      subscribeTaskChanges: listener => current().subscribeTaskChanges(listener),
      effort: (value,signal,expectedModel) => run(manager=>manager.effort(value,signal,expectedModel)),
      setModel: (model, signal) => run(manager => manager.setModel(model, signal)),
      setColor: (color, signal) => run(manager => manager.setColor(color, signal)),
      rename: (title, signal) => run(manager => manager.rename(title, signal)),
      listPermissionRules: signal => run(manager => manager.listPermissionRules(signal)),
      updatePermissionRules: (update, signal) => run(manager => manager.updatePermissionRules(update, signal)),
      subscribePermissionRules: listener => current().subscribePermissionRules(listener),
    }
  }, [config])
  return useMemo(
    () => ({ isRemoteMode, isConnected, planHost, sharedSession, sendMessage, cancelRequest, disconnect,sendControlRequest:planHost.sendControlRequest }),
    [isRemoteMode, isConnected, planHost, sharedSession, sendMessage, cancelRequest, disconnect],
  )
}
