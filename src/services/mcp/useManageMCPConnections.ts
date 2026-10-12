import {readMcpReservedNames287} from './officialReservedNames287/readers.js'
import {readMcpStateCarrier287,type McpQueuedUpdate287} from './officialMcpStateCarrier287/readers.js'
import {useMcpQueuedUpdates287} from './officialMcpStateCarrier287/queue.js'
import {nativeMcpQueueClient287,sourceMcpCarrierState287,lowerMcpCarrierState287} from './mcpStateCarrier287.js'
import {createMcpListChanged287} from './officialListChanged287/native.js'
import {readMcpListChangeBindings287,readMcpListChangeClient287} from './officialListChanged287/readers.js'
import {readLegacyMcpLifecycleClient287} from './officialLegacyLifecycle287/readers.js'
import {createMcpInitialRetry287,createMcpCloseRetry287,type LegacyMcpRetryPorts287} from './officialRetry287/native.js'
import {readMcpRetryBindings287} from './officialRetry287/readers.js'
import {getMcpClientModule287} from './connectedProducer287.js'
import {invalidateMcpSkillsForServer287} from '../../skills/mcpSkills.js'
import {getMcpConnectedProducer287,adaptNativeModernConnection287} from './connectedProducer287.js'
import {useOptionalExecutionSession287} from '../../context/executionProject287.js'
import {getExecutionSession287,runWithExecutionSession287} from '../context/execution287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import { feature } from 'bun:bundle'
import {acquireMcpHookClients287} from './connectedProducer287.js'
import { basename } from 'path'
import { useCallback, useEffect, useRef,useContext } from 'react'
import {ClockContext} from '../../ink/components/ClockContext.js'
import { getSessionId, getOriginalCwd } from '../../bootstrap/state.js'
import { isShuttingDown } from '../../utils/gracefulShutdown.js'
import { McpReconnectSupervisor } from './reconnectSupervisor.js'
import type { Command } from '../../commands.js'
import type { Tool } from '../../Tool.js'
import {
  clearServerCache,
  discoverSelectedMcpServer,
  fetchCommandsForClient,
  fetchResourcesForClient,
  fetchToolsForClient,
  getMcpToolsCommandsAndResources,
  reconnectMcpServerImpl,
} from './client.js'
import type {
  ConnectedMCPServerV2,
  MCPServerConnection,
  ScopedMcpServerConfig,
  ServerResource,
} from './types.js'
import { createMcpV2Lifecycle, resolveMcpSdkGeneration, type McpV2Lifecycle } from './v2Lifecycle.js'
import type { SelectedMcpDiscovery } from './v2Production.js'
import { createMcpAuthTool } from '../../tools/McpAuthTool/McpAuthTool.js'
import { projectMcpResourceHelperTools } from './resourceToolProjection.js'
import { registerMcpReauth287 } from './officialReauth287/native.js'
import { readMcpReauthBindings287 } from './officialReauth287/readers.js'

import { fetchMcpSkillsForClient, mcpSkillsEnabled } from '../../skills/mcpSkills.js'

/* eslint-disable @typescript-eslint/no-require-imports */
const clearSkillIndexCache = feature('EXPERIMENTAL_SKILL_SEARCH')
  ? (
      require('../skillSearch/localSearch.js') as typeof import('../skillSearch/localSearch.js')
    ).clearSkillIndexCache
  : null

import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from 'src/services/analytics/index.js'
import {
  dedupClaudeAiMcpServers,
  doesEnterpriseMcpConfigExist,
  filterMcpServersByPolicy,
  getClaudeCodeMcpConfigs,
  isMcpServerDisabled,
  setMcpServerEnabled,
} from 'src/services/mcp/config.js'
import type { AppState } from 'src/state/AppState.js'
import type { PluginError } from 'src/types/plugin.js'
import { logForDebugging } from 'src/utils/debug.js'
import { getAllowedChannels } from '../../bootstrap/state.js'
import { useNotifications } from '../../context/notifications.js'
import {
  useAppState,
  useAppStateStore,
  useSetAppState,
} from '../../state/AppState.js'
import { errorMessage } from '../../utils/errors.js'
/* eslint-enable @typescript-eslint/no-require-imports */
import { logMCPDebug, logMCPError } from '../../utils/log.js'
import { enqueue } from '../../utils/messageQueueManager.js'
import {
  CHANNEL_PERMISSION_METHOD,
  ChannelMessageNotificationSchema,
  ChannelPermissionNotificationSchema,
  findChannelEntry,
  gateChannelServer,
  wrapChannelMessage,
} from './channelNotification.js'
import {
  type ChannelPermissionCallbacks,
  createChannelPermissionCallbacks,
  isChannelPermissionRelayEnabled,
} from './channelPermissions.js'
import {
  clearClaudeAIMcpConfigsCache,
  fetchClaudeAIMcpConfigsIfEligible,
} from './claudeai.js'
import { registerElicitationHandler, registerV2ElicitationHandler } from './elicitationHandler.js'
import { getMcpPrefix } from './mcpStringUtils.js'
import { hashMcpConfig, getProjectMcpServerStatus } from './utils.js'

/**
 * Create a unique key for a plugin error to enable deduplication
 */
function getErrorKey(error: PluginError): string {
  const plugin = 'plugin' in error ? error.plugin : 'no-plugin'
  return `${error.type}:${error.source}:${plugin}`
}

/**
 * Add errors to AppState, deduplicating to avoid showing the same error multiple times
 */
function addErrorsToAppState(
  setAppState: (updater: (prev: AppState) => AppState) => void,
  newErrors: PluginError[],
): void {
  if (newErrors.length === 0) return

  setAppState(prevState => {
    // Build set of existing error keys
    const existingKeys = new Set(
      prevState.plugins.errors.map(e => getErrorKey(e)),
    )

    // Only add errors that don't already exist
    const uniqueNewErrors = newErrors.filter(
      error => !existingKeys.has(getErrorKey(error)),
    )

    if (uniqueNewErrors.length === 0) {
      return prevState
    }

    return {
      ...prevState,
      plugins: {
        ...prevState.plugins,
        errors: [...prevState.plugins.errors, ...uniqueNewErrors],
      },
    }
  })
}

/**
 * Hook to manage MCP (Model Context Protocol) server connections and updates
 *
 * This hook:
 * 1. Initializes MCP client connections based on config
 * 2. Sets up handlers for connection lifecycle events and sync with app state
 * 3. Manages automatic reconnection for SSE connections
 * 4. Returns a reconnect function
 */
export function useManageMCPConnections(
  dynamicMcpConfig: Record<string, ScopedMcpServerConfig> | undefined,
  isStrictMcpConfig = false,
) {
  const store = useAppStateStore()
  const carrierBindings287=readMcpStateCarrier287()
  const mcpCarrier287=carrierBindings287.RAt()
  const retryClock287=useContext(ClockContext)
  const executionSession287=useOptionalExecutionSession287()??getExecutionSession287()
  // Original fbe consumes the same canonical Te invocation context as plugin hooks.
  const {storageV5:Se,credentials:_e}=(getOriginalModsLifecycle287().clearSourceModule287('chunk-038c023k.js').Te as ()=>Pick<import('../../Tool.js').ToolUseContext,'storageV5'|'credentials'>)()
  const _authVersion = useAppState(s => s.authVersion)
  // Incremented by /reload-plugins (refreshActivePlugins) to pick up newly
  // enabled plugin MCP servers. getClaudeCodeMcpConfigs() reads loadAllPlugins()
  // which has been cleared by refreshActivePlugins, so the effects below see
  // fresh plugin data on re-run.
  // /cd publishes its existing settings/permission state after Yze repoints
  // the same session. Observe the canonical cwd on that store notification;
  // do not wait for the approval dialog's later plugin-reload completion.
  const configurationCwd = useAppState(() => getOriginalCwd())
  const _pluginReconnectKey = useAppState(s => s.mcp.pluginReconnectKey)
  const _sessionResetKey = useAppState(s => s.mcp.sessionResetKey)
  const setAppState = useSetAppState()

  // Track active reconnection attempts to allow cancellation
  const reconnectSupervisorRef = useRef(new McpReconnectSupervisor())
  const mountedRef = useRef(true)
  const v2LifecycleRef = useRef<McpV2Lifecycle | null>(null)
  const activeV2NamesRef = useRef(new Set<string>())
  const manualV2ConnectionsRef = useRef(new Set<string>())
  const activeConfigsRef = useRef(new Map<string, ScopedMcpServerConfig>())
  const onV2ResultRef = useRef<((result: Extract<SelectedMcpDiscovery, { generation: 'v2' }>) => void) | null>(null)

  // Dedup the --channels blocked warning per skip kind so that a user who
  // sees "run /login" (auth skip), logs in, then hits the policy gate
  // gets a second toast.
  const channelWarnedKindsRef = useRef<
    Set<'disabled' | 'auth' | 'policy' | 'marketplace' | 'allowlist'>
  >(new Set())
  // Channel permission callbacks — constructed once, stable ref. Stored in
  // AppState so interactiveHandler can subscribe. The pending Map lives inside
  // the closure (not module-level, not AppState — functions-in-state is brittle).
  const channelPermCallbacksRef = useRef<ChannelPermissionCallbacks | null>(
    null,
  )
  if (
    (feature('KAIROS') || feature('KAIROS_CHANNELS')) &&
    channelPermCallbacksRef.current === null
  ) {
    channelPermCallbacksRef.current = createChannelPermissionCallbacks()
  }
  // Store callbacks in AppState so interactiveHandler.ts can reach them via
  // ctx.toolUseContext.getAppState(). One-time set — the ref is stable.
  useEffect(() => {
    if (feature('KAIROS') || feature('KAIROS_CHANNELS')) {
      const callbacks = channelPermCallbacksRef.current
      if (!callbacks) return
      // GrowthBook runtime gate — separate from channels so channels can
      // ship without this. Checked at mount; mid-session flips need restart.
      // If off, callbacks never go into AppState → interactiveHandler sees
      // undefined → never sends → intercept has nothing pending → "yes tbxkq"
      // flows to Claude as normal chat. One gate, full disable.
      if (!isChannelPermissionRelayEnabled()) return
      setAppState(prev => {
        if (prev.channelPermissionCallbacks === callbacks) return prev
        return { ...prev, channelPermissionCallbacks: callbacks }
      })
      return () => {
        setAppState(prev => {
          if (prev.channelPermissionCallbacks === undefined) return prev
          return { ...prev, channelPermissionCallbacks: undefined }
        })
      }
    }
  }, [setAppState])
  const { addNotification } = useNotifications()

  // Complete original Uo/Do/bo share the existing queue, source epoch,
  // QGe writer and the actual retry supervisor's to/Ct/Ro refs.
  type PendingUpdate = MCPServerConnection & {
    tools?: Tool[]
    commands?: Command[]
    resources?: ServerResource[]
    resourceTemplates?: import('./types.js').ServerResourceTemplate[]
    replaceOnly?:boolean
    v2Connection?: ConnectedMCPServerV2 | null
  }
  const pendingUpdatesRef = useRef<McpQueuedUpdate287[]>([])
  const flushTimerRef = useRef<(()=>void)|null>(null)
  if(!retryClock287)throw Error('MCP queued updates require the actual Ink clock')
  const queued287=useMcpQueuedUpdates287({
    ce:useCallback,Ie:mcpCarrier287,Mo:pendingUpdatesRef,zo:flushTimerRef,
    ...carrierBindings287,...reconnectSupervisorRef.current.queuedRefs287(),Ut:retryClock287,
  })
  const flushPendingUpdates=queued287.flush
  const updateServer=useCallback((update:PendingUpdate)=>{
    const {tools,commands,resources,resourceTemplates,replaceOnly,...client}=update
    queued287.enqueue({...nativeMcpQueueClient287(client),tools,commands,resources,resourceTemplates,replaceOnly})
  },[queued287.enqueue])

  const onConnectionAttempt = useCallback(
    ({
      client,
      tools,
      commands,
      resources,
      resourceTemplates,
      replaceOnly,
    }: {
      client: MCPServerConnection
      tools: Tool[]
      commands: Command[]
      resources?: ServerResource[]
      resourceTemplates?: import('./types.js').ServerResourceTemplate[]
      replaceOnly?:boolean
    }, publish = true) => {
      if (publish) updateServer({ ...client, tools, commands, resources,resourceTemplates,replaceOnly })

      // Handle side effects based on client state
      switch (client.type) {
        case 'connected': {
          const retryPorts287=legacyRetryPorts287()
          retryPorts287.to.current.set(client.name,retryPorts287.TX)
          // Overwrite the default elicitation handler registered in connectToServer
          // with the real one (queues elicitation in AppState for UI). Registering
          // here (once per connect) instead of in a [mcpClients] effect avoids
          // re-running for every already-connected server on each state change.
          registerElicitationHandler(client.client, client.name, setAppState)

          client.client.onclose = () => {
            if(!mountedRef.current||isShuttingDown())return
            const live=queued287.current(client.name)
            if(live?.type==='connected'&&live.client!==client.client)return
            createMcpCloseRetry287(legacyRetryPorts287(),client)()
          }

          // Channel push: notifications/claude/channel → enqueue().
          // Gate decides whether to register the handler; connection stays
          // up either way (allowedMcpServers controls that).
          if (feature('KAIROS') || feature('KAIROS_CHANNELS')) {
            const gate = gateChannelServer(
              client.name,
              client.capabilities,
              client.config.pluginSource,
            )
            const entry = findChannelEntry(client.name, getAllowedChannels())
            // Plugin identifier for telemetry — log name@marketplace for any
            // plugin-kind entry (same tier as tengu_plugin_installed, which
            // logs arbitrary plugin_id+marketplace_name ungated). server-kind
            // names are MCP-server-name tier; those are opt-in-only elsewhere
            // (see isAnalyticsToolDetailsLoggingEnabled in metadata.ts) and
            // stay unlogged here. is_dev/entry_kind segment the rest.
            const pluginId =
              entry?.kind === 'plugin'
                ? (`${entry.name}@${entry.marketplace}` as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
                : undefined
            // Skip capability-miss — every non-channel MCP server trips it.
            if (gate.action === 'register' || gate.kind !== 'capability') {
              logEvent('tengu_mcp_channel_gate', {
                registered: gate.action === 'register',
                skip_kind:
                  gate.action === 'skip'
                    ? (gate.kind as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS)
                    : undefined,
                entry_kind:
                  entry?.kind as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                is_dev: entry?.dev ?? false,
                plugin: pluginId,
              })
            }
            switch (gate.action) {
              case 'register':
                logMCPDebug(client.name, 'Channel notifications registered')
                client.client.setNotificationHandler(
                  ChannelMessageNotificationSchema(),
                  async notification => {
                    const { content, meta } = notification.params
                    logMCPDebug(
                      client.name,
                      `notifications/claude/channel: ${content.slice(0, 80)}`,
                    )
                    logEvent('tengu_mcp_channel_message', {
                      content_length: content.length,
                      meta_key_count: Object.keys(meta ?? {}).length,
                      entry_kind:
                        entry?.kind as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
                      is_dev: entry?.dev ?? false,
                      plugin: pluginId,
                    })
                    enqueue({
                      mode: 'prompt',
                      value: wrapChannelMessage(client.name, content, meta),
                      priority: 'next',
                      isMeta: true,
                      origin: { kind: 'channel', server: client.name },
                      skipSlashCommands: true,
                    })
                  },
                )
                // Permission-reply handler — separate event, separate
                // capability. Only registers if the server declares
                // claude/channel/permission (same opt-in check as the send
                // path in interactiveHandler.ts). Server parses the user's
                // reply and emits {request_id, behavior}; no regex on our
                // side, text in the general channel can't accidentally match.
                if (
                  client.capabilities?.experimental?.[
                    'claude/channel/permission'
                  ] !== undefined
                ) {
                  client.client.setNotificationHandler(
                    ChannelPermissionNotificationSchema(),
                    async notification => {
                      const { request_id, behavior } = notification.params
                      const resolved =
                        channelPermCallbacksRef.current?.resolve(
                          request_id,
                          behavior,
                          client.name,
                        ) ?? false
                      logMCPDebug(
                        client.name,
                        `notifications/claude/channel/permission: ${request_id} → ${behavior} (${resolved ? 'matched pending' : 'no pending entry — stale or unknown ID'})`,
                      )
                    },
                  )
                }
                break
              case 'skip':
                // Idempotent teardown so a register→skip re-gate (e.g.
                // effect re-runs after /logout) actually removes the live
                // handler. Without this, mid-session demotion is one-way:
                // the gate says skip but the earlier handler keeps enqueuing.
                // Map.delete — safe when never registered.
                client.client.removeNotificationHandler(
                  'notifications/claude/channel',
                )
                client.client.removeNotificationHandler(
                  CHANNEL_PERMISSION_METHOD,
                )
                logMCPDebug(
                  client.name,
                  `Channel notifications skipped: ${gate.reason}`,
                )
                // Surface a once-per-kind toast when a channel server is
                // blocked. This is the only
                // user-visible signal (logMCPDebug above requires --debug).
                // Capability/session skips are expected noise and stay
                // debug-only. marketplace/allowlist run after session — if
                // we're here with those kinds, the user asked for it.
                if (
                  gate.kind !== 'capability' &&
                  gate.kind !== 'session' &&
                  !channelWarnedKindsRef.current.has(gate.kind) &&
                  (gate.kind === 'marketplace' ||
                    gate.kind === 'allowlist' ||
                    entry !== undefined)
                ) {
                  channelWarnedKindsRef.current.add(gate.kind)
                  // disabled/auth/policy get custom toast copy (shorter, actionable);
                  // marketplace/allowlist reuse the gate's reason verbatim
                  // since it already names the mismatch.
                  const text =
                    gate.kind === 'disabled'
                      ? 'Channels are not currently available'
                      : gate.kind === 'auth'
                        ? 'Channels require claude.ai authentication · run /login'
                        : gate.kind === 'policy'
                          ? 'Channels are not enabled for your org · have an administrator set channelsEnabled: true in managed settings'
                          : gate.reason
                  addNotification({
                    key: `channels-blocked-${gate.kind}`,
                    priority: 'high',
                    text,
                    color: 'warning',
                    timeoutMs: 12000,
                  })
                }
                break
            }
          }

          const register=createMcpListChanged287<import('./types.js').ConnectedMCPServer>({
            ...readMcpListChangeBindings287(),Ql:readLegacyMcpLifecycleClient287,
            t:logForDebugging,
            GS:{fetchMcpSkillsForClient,invalidateMcpSkillsForServer:invalidateMcpSkillsForServer287},
            mbe:()=>clearSkillIndexCache?.(),
          })
          register(client,update=>{
            if(!mountedRef.current||isShuttingDown())return
            const live=queued287.current(client.name)
            if(live?.type==='connected'&&live.client!==client.client)return
            updateServer(update)
          },Se)
          break
        }

        case 'failed':
          createMcpInitialRetry287(legacyRetryPorts287())(client)
          break
        case 'needs-auth':
        case 'cached':
        case 'pending':
        case 'disabled':
          break
      }
    },
    [updateServer,store,retryClock287,Se,_e,addNotification],
  )

  function legacyRetryPorts287():LegacyMcpRetryPorts287 {
    const bindings=readMcpRetryBindings287()
    return {...bindings,...reconnectSupervisorRef.current.queuedRefs287(),
      Ai:()=>!mountedRef.current||isShuttingDown()||bindings.Ai(),
      Io:name=>!mountedRef.current||isShuttingDown()||bindings.Io(name),
      Ut:retryClock287,Se,_e,Ql:readLegacyMcpLifecycleClient287,
      Do:state=>{if(mountedRef.current&&!isShuttingDown())updateServer(state)},
      qo:result=>{if(mountedRef.current&&!isShuttingDown())onConnectionAttempt(result)},
      No:addNotification,
    }
  }

  // Original be→oir→QGe.swapServerTools→f8t, on this existing UI writer.
  // The V2 statuses stay in clients; the read-only view uses actual live SDK
  // clients, never converted status objects or a second tool list.
  useEffect(()=>runWithExecutionSession287(executionSession287,()=>{
    const original=(require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
    return original.clearSourceModule287('chunk-bn3p37gv.js').oir((name,tools)=>runWithExecutionSession287(executionSession287,()=>{
      return mcpCarrier287.swapServerTools(name,tools)
    }))
  }),[executionSession287,mcpCarrier287])

  const sessionId = getSessionId()
  useEffect(()=>acquireMcpHookClients287(()=>{
    const {clients,v2Clients}=store.getState().mcp
    return [...clients.filter(client=>client.type!=='v2-connected').map(client=>{
      if(resolveMcpSdkGeneration()!=='v2'||(client.type!=='pending'&&client.type!=='cached'))return client
      const owner=getV2Lifecycle()
      return Object.defineProperties({...client},{mcpLifecycle287:{value:owner},ensureConnectedClient287:{value:(options?:import('./officialConnected287/native.js').EnsureMcpOptions287)=>owner.connect(client.name,client.config,{signal:options?.signal,timeoutMs:options?.timeoutMs})}})
    }),...v2Clients.map(client=>{
      // Original connected wiring must see this same lifecycle even while ho
      // replaces a live (not pending/cached) row, before its lists settle.
      Object.defineProperty(client,'mcpLifecycle287',{configurable:true,get:getV2Lifecycle})
      return client
    })]
  }),[sessionId,store])
  const registerV2CachedHandlers287 = useCallback((client:ConnectedMCPServerV2)=>{
    activeV2NamesRef.current.add(client.name)
    registerV2ElicitationHandler(client.v2Client,client.name,setAppState)
    const register=createMcpListChanged287({
      ...readMcpListChangeBindings287(),
      Ql:()=>({...getMcpClientModule287(),...readMcpListChangeClient287()}),
      t:logForDebugging,
      GS:{fetchMcpSkillsForClient,invalidateMcpSkillsForServer:invalidateMcpSkillsForServer287},
      mbe:()=>clearSkillIndexCache?.(),
    })
    register(client,update=>{
      // Original Do writes only the fields provided by each complete callback.
      // A revoked native row never republishes into a later mounted owner.
      if(!mountedRef.current||client.isClosed()||store.getState().mcp.v2Clients.find(row=>row.name===client.name)!==client)return
      updateServer({name:client.name,type:'v2-connected',generation:'v2',config:client.config,
        capabilities:client.capabilities,serverInfo:client.serverInfo,instructions:client.instructions,
        tools:update.tools,commands:update.commands,resources:update.resources,resourceTemplates:update.resourceTemplates,v2Connection:client})
    })
  },[store,setAppState,updateServer])
  const onV2Result = useCallback((result: Extract<SelectedMcpDiscovery, { generation: 'v2' }>) => {
    const client = result.client
    if (sessionId !== getSessionId()) return
    const expected = activeConfigsRef.current.get(client.name)
    if (!mountedRef.current || isShuttingDown() || !expected ||
        hashMcpConfig(expected) !== hashMcpConfig(client.config) ||
        isMcpServerDisabled(client.name) ||
        !filterMcpServersByPolicy({ [client.name]: expected }).allowed[client.name]) return
    if (client.type !== 'connected') {
      if (client.type !== 'failed') activeV2NamesRef.current.delete(client.name)
      updateServer({ ...client, tools: result.tools, commands: result.commands, resources: result.resources ?? [], resourceTemplates:result.resourceTemplates??[],replaceOnly:result.replaceOnly,v2Connection: null })
      if(client.type==='failed')getV2Lifecycle().retryInitialFailure287(result)
      return
    }
    activeV2NamesRef.current.add(client.name)
    const status: MCPServerConnection = {
      name: client.name, type: 'v2-connected', generation: 'v2',
      config: client.config, capabilities: client.capabilities,
      serverInfo: client.serverInfo, instructions: client.instructions,
    }
    updateServer({ ...status, tools: result.tools, commands: result.commands,
      resources: result.resources ?? [], resourceTemplates:result.resourceTemplates, replaceOnly:result.replaceOnly,v2Connection: client })
    registerV2CachedHandlers287(client)
  }, [store, updateServer, setAppState, sessionId,registerV2CachedHandlers287])
  onV2ResultRef.current = onV2Result
  useEffect(()=>{
    const source=getMcpConnectedProducer287()
    const current=(name:string,config:ScopedMcpServerConfig)=>mountedRef.current&&sessionId===getSessionId()&&activeConfigsRef.current.has(name)&&hashMcpConfig(activeConfigsRef.current.get(name)!)===hashMcpConfig(config)
    const refresh=(name:string,config:ScopedMcpServerConfig)=>{
      if(!current(name,config))return
      void getMcpToolsCommandsAndResources(onConnectionAttempt,{[name]:config},{v2Lifecycle:getV2Lifecycle(),onV2Result:result=>onV2ResultRef.current?.(result)}).catch(error=>logMCPError(name,`Cached MCP refresh failed: ${errorMessage(error)}`))
    }
    // Full original wk/kie is the sole cached-row adoption/failure consumer.
    // AppState stores a UI discriminator; its source view leases the same V2
    // runtime instead of manufacturing a legacy SDK client.
    const sourceState=sourceMcpCarrierState287
    const consumer=source.cachedConsumer({
      getAppState:()=>sourceState(store.getState()),
      setAppState:update=>{
        const before=store.getState()
        let adopted:import('./types.js').ConnectedMcpServer[]=[]
        setAppState(state=>{
          const next=update(sourceState(state))
          const mcp=lowerMcpCarrierState287(next.mcp)
          // Compare the actual AppState instances on both sides of the lens.
          // The source carrier's native-only ABI is not the UI V2 status ABI.
          const beforeClients:import('./types.js').ConnectedMcpServer[]=[
            ...before.mcp.clients.filter((client):client is Extract<MCPServerConnection,{type:'connected'}>=>client.type==='connected'),
            ...before.mcp.v2Clients,
          ]
          adopted=[...mcp.clients.filter((client):client is Extract<MCPServerConnection,{type:'connected'}>=>client.type==='connected'),...mcp.v2Clients].filter(client=>!beforeClients.includes(client))
          return {...next,mcp}
        })
        for(const client of adopted)if('v2Client'in client)registerV2CachedHandlers287(client);else onConnectionAttempt({client,tools:[],commands:[]},false)
      },
      // Interactive dynamic configs already live in this AppState owner; only
      // print has the separate SDK-hosted dynamic connection array.
      getDynamicMcpState:()=>({clients:[],tools:[]}),
      setDynamicMcpState:()=>{throw Error('Cached React settlement escaped its actual AppState owner')},
      ownsCachedRow:name=>activeConfigsRef.current.has(name),
      isRunEnding:()=>!mountedRef.current||sessionId!==getSessionId()||isShuttingDown(),
      isControlReconnectInFlight:name=>manualV2ConnectionsRef.current.has(name),
      onRetryRejected:(name,error)=>logMCPError(name,errorMessage(error)),
    })
    const releaseCached=consumer.subscribe();consumer.catchUp()
    // Complete original uhe success listener shares the existing qt actor.
    const releaseReauth=resolveMcpSdkGeneration()==='v2'?registerMcpReauth287({
      ...readMcpReauthBindings287(),
      Ie:mcpCarrier287,
      Se,_e,
      Ql:()=>({clearServerCache:source.clearServerModern,connectToServer:source.dialModern,
        detachAndCloseConnection:source.detachModern,fetchToolsForClient:source.listToolsModern,
        fetchCommandsForClient:source.listCommandsModern,fetchResourcesForClient:source.listResourcesModern}),
      GS:{fetchMcpSkillsForClient},
      qo:result=>{
        const client=adaptNativeModernConnection287(result.client)
        getV2Lifecycle().adoptSourceConnection287(client)
        onV2ResultRef.current?.({...result,client,generation:'v2'})
      },
      Do:result=>updateServer({...result,tools:[],commands:[],resources:[],resourceTemplates:[],v2Connection:null}),
      t:logForDebugging,
    }):registerMcpReauth287({
      ...readMcpReauthBindings287(),Ie:mcpCarrier287,Se,_e,
      Ql:()=>({clearServerCache:source.clearServerLegacy,connectToServer:source.dialLegacy,
        detachAndCloseConnection:source.detachLegacy,fetchToolsForClient:source.listToolsLegacy,
        fetchCommandsForClient:source.listCommandsLegacy,fetchResourcesForClient:source.listResourcesLegacy}),
      GS:{fetchMcpSkillsForClient},qo:result=>onConnectionAttempt(result),
      Do:result=>updateServer({...result,tools:[],commands:[],resources:[],resourceTemplates:[],v2Connection:null}),
      t:logForDebugging,
    })
    const identity=source.bindIdentityHandler(()=>{
      const rows=[...activeConfigsRef.current].map(([name,config])=>({name,config}))
      const affected=rows.filter(row=>source.identityScoped(row.config))
      const keep=new Set(rows.filter(row=>!source.identityScoped(row.config)).map(row=>source.cacheKey(row.name,row.config)))
      const clear=resolveMcpSdkGeneration()==='v2'?Promise.all(affected.map(row=>getV2Lifecycle().invalidate(row.name))):Promise.all(affected.map(row=>source.clearServerLegacy(row.name,row.config)))
      void clear.then(()=>{
        const evict=resolveMcpSdkGeneration()==='v2'?source.evictModern:source.evictLegacy
        mcpCarrier287.applyIdentityBoundary(new Set(affected.map(row=>row.name)),new Set())
        evict(keep,source.identityShouldBump(rows))
        for(const {name,config}of affected)refresh(name,config)
      }).catch(error=>logMCPError('identity',errorMessage(error)))
    })
    return()=>{releaseCached();releaseReauth?.();identity()}
  },[store,sessionId,onConnectionAttempt,registerV2CachedHandlers287,mcpCarrier287,Se,_e])

  function v2ResultAsStatus(result: Extract<SelectedMcpDiscovery, { generation: 'v2' }>): {
    client: MCPServerConnection; tools: Tool[]; commands: Command[]; resources?: ServerResource[]
  } {
    const client = result.client.type === 'connected'
      ? { name: result.client.name, type: 'v2-connected' as const, generation: 'v2' as const,
          config: result.client.config, capabilities: result.client.capabilities,
          serverInfo: result.client.serverInfo, instructions: result.client.instructions }
      : result.client
    return { client, tools: result.tools, commands: result.commands, resources: result.resources }
  }

  function getV2Lifecycle(): McpV2Lifecycle {
    if (v2LifecycleRef.current) return v2LifecycleRef.current
    const lifecycle = createMcpV2Lifecycle({
      getIdentityEpoch: () => `${getSessionId()}:${store.getState().authVersion}`,
      retryClock287:retryClock287,
      reconnectSupervisor287:reconnectSupervisorRef.current,
      onRetryNotice287:addNotification,
      onRetryState287:state=>{
        if(!mountedRef.current||isShuttingDown())return
        if(state.type==='connected')updateServer({name:state.name,config:state.config,type:'v2-connected',generation:'v2',capabilities:state.capabilities,serverInfo:state.serverInfo,instructions:state.instructions,v2Connection:state})
        else updateServer(state)
      },
      resolveConfig: async name => {
        const config = activeConfigsRef.current.get(name)
        if (!config || isMcpServerDisabled(name)) return undefined
        return filterMcpServersByPolicy({ [name]: config }).allowed[name]
      },
      onReconnect: result => {
        if(mountedRef.current&&activeConfigsRef.current.has(result.client.name))onV2ResultRef.current?.(result)
      },
      onConnection: (name, state) => {
        if (!activeV2NamesRef.current.has(name) || !mountedRef.current || store.getState().mcp.clients.find(row=>row.name===name)?.type==='cached') return
        if (state.type === 'disconnected') {
          const config = activeConfigsRef.current.get(name)
          if (config) updateServer({ name, config, type: 'failed', tools: [], commands: [], resources: [], v2Connection: null })
        } else if (state.type === 'needs-auth') {
          onV2ResultRef.current?.({ generation: 'v2', client: state,
            tools: [createMcpAuthTool(name, state.config)], commands: [] })
        } else if (!manualV2ConnectionsRef.current.has(name)) {
          void discoverSelectedMcpServer(name, state.config, lifecycle).then(result => {
            if (result.generation === 'v2') onV2ResultRef.current?.(result)
          }).catch(error => logMCPError(name, `V2 reconnect discovery failed: ${errorMessage(error)}`))
        }
      },
    })
    v2LifecycleRef.current = lifecycle
    return lifecycle
  }

  // Initialize all servers to pending state if they don't exist in appState.
  // Re-runs on session change (/clear) and on /reload-plugins (pluginReconnectKey).
  // On plugin reload, also disconnects stale plugin MCP servers (scope 'dynamic')
  // that no longer appear in configs — prevents ghost tools from disabled plugins.
  // Skip claude.ai dedup here to avoid blocking on the network fetch; the connect
  // useEffect below runs immediately after and dedups before connecting.
  useEffect(() => {
    const cwdAtStart = getOriginalCwd()
    let cancelled = false
    async function initializeServersAsPending() {
      const { servers: existingConfigs, errors: mcpErrors, reservedNameRefusals = [] } = isStrictMcpConfig
        ? { servers: {}, errors: [] }
        : await getClaudeCodeMcpConfigs(dynamicMcpConfig)
      const configs = { ...existingConfigs, ...dynamicMcpConfig }
      if (cancelled || cwdAtStart !== getOriginalCwd()) return
      const {Txo,Axo}=readMcpReservedNames287()
      mcpCarrier287.setReservedNameRefusals(Txo(Axo(),reservedNameRefusals))

      // Add MCP errors to plugin errors for UI visibility (deduplicated)
      addErrorsToAppState(setAppState, mcpErrors)

      mcpCarrier287.reconcileConfiguredServers(configs,cwdAtStart,stale=>{
        for(const client of stale){
          reconnectSupervisorRef.current.cancel(client.name)
          activeV2NamesRef.current.delete(client.name)
          if(client.type==='connected'){
            client.client.onclose=undefined
            if('v2Client'in client)void v2LifecycleRef.current?.invalidate(client.name).catch(()=>{})
            else void clearServerCache(client.name,client.config).catch(()=>{})
          }
        }
      })
    }

    void initializeServersAsPending().catch(error => {
      logMCPError(
        'useManageMCPConnections',
        `Failed to initialize servers as pending: ${errorMessage(error)}`,
      )
    })
    return () => { cancelled = true }
  }, [
    isStrictMcpConfig,
    dynamicMcpConfig,
    setAppState,
    sessionId,
    _pluginReconnectKey,
    _sessionResetKey,
    configurationCwd,
  ])

  // Load MCP configs and connect to servers
  // Two-phase loading: Claude Code configs first (fast), then claude.ai configs (may be slow)
  useEffect(() => {
    const cwdAtStart = getOriginalCwd()
    let cancelled = false
    const onCurrentConnectionAttempt: typeof onConnectionAttempt = result => {
      if (!cancelled && cwdAtStart === getOriginalCwd()) onConnectionAttempt(result)
    }
    const onCurrentV2Result: typeof onV2Result = result => {
      if (!cancelled && cwdAtStart === getOriginalCwd()) onV2Result(result)
    }

    async function loadAndConnectMcpConfigs() {
      activeConfigsRef.current.clear()
      // Clear claude.ai MCP cache so we fetch fresh configs with current auth
      // state. This is important when authVersion changes (e.g., after login/
      // logout). Kick off the fetch now so it overlaps with loadAllPlugins()
      // inside getClaudeCodeMcpConfigs; it's awaited only at the dedup step.
      // Phase 2 below awaits the same promise — no second network call.
      let claudeaiPromise: Promise<Record<string, ScopedMcpServerConfig>>
      if (isStrictMcpConfig || doesEnterpriseMcpConfigExist()) {
        claudeaiPromise = Promise.resolve({})
      } else {
        clearClaudeAIMcpConfigsCache()
        claudeaiPromise = fetchClaudeAIMcpConfigsIfEligible()
      }

      // Phase 1: Load Claude Code configs. Plugin MCP servers that duplicate a
      // --mcp-config entry or a claude.ai connector are suppressed here so they
      // don't connect alongside the connector in Phase 2.
      const { servers: claudeCodeConfigs, errors: mcpErrors } =
        isStrictMcpConfig
          ? { servers: {}, errors: [] }
          : await getClaudeCodeMcpConfigs(dynamicMcpConfig, claudeaiPromise)
      if (cancelled || cwdAtStart !== getOriginalCwd()) return

      // Add MCP errors to plugin errors for UI visibility (deduplicated)
      addErrorsToAppState(setAppState, mcpErrors)

      const configs = { ...claudeCodeConfigs, ...dynamicMcpConfig }
      for (const connection of store.getState().mcp.v2Clients) {
        const next = configs[connection.name]
        if (!next || hashMcpConfig(next) !== hashMcpConfig(connection.config) || isMcpServerDisabled(connection.name))
          void v2LifecycleRef.current?.invalidate(connection.name).catch(() => {})
      }

      // Start connecting to Claude Code servers (don't wait - runs concurrently with Phase 2)
      // Filter out disabled servers to avoid unnecessary connection attempts
      const enabledConfigs = Object.fromEntries(
        Object.entries(configs).filter(([name]) => !isMcpServerDisabled(name)),
      )
      for (const [name, config] of Object.entries(enabledConfigs)) activeConfigsRef.current.set(name, config)
      getMcpToolsCommandsAndResources(
        onCurrentConnectionAttempt,
        enabledConfigs,
        { v2Lifecycle: getV2Lifecycle(), onV2Result: onCurrentV2Result },
      ).catch(error => {
        logMCPError(
          'useManageMcpConnections',
          `Failed to get MCP resources: ${errorMessage(error)}`,
        )
      })

      // Phase 2: Await claude.ai configs (started above; memoized — no second fetch)
      let claudeaiConfigs: Record<string, ScopedMcpServerConfig> = {}
      let suppressedClaudeAi287:ReturnType<typeof dedupClaudeAiMcpServers>['suppressed']=[]
      if (!isStrictMcpConfig) {
        claudeaiConfigs = filterMcpServersByPolicy(
          await claudeaiPromise,
        ).allowed
        if (cancelled || cwdAtStart !== getOriginalCwd()) return

        // Suppress claude.ai connectors that duplicate an enabled manual server.
        // Keys never collide (`slack` vs `claude.ai Slack`) so the merge below
        // won't catch this — need content-based dedup by URL signature.
        if (Object.keys(claudeaiConfigs).length > 0) {
          const { servers: dedupedClaudeAi,suppressed } = dedupClaudeAiMcpServers(
            claudeaiConfigs,
            configs,
          )
          claudeaiConfigs = dedupedClaudeAi
          suppressedClaudeAi287=suppressed
        }

        if (Object.keys(claudeaiConfigs).length > 0) {
          mcpCarrier287.addPendingServers(claudeaiConfigs)

          // Now start connecting (only enabled servers)
          const enabledClaudeaiConfigs = Object.fromEntries(
            Object.entries(claudeaiConfigs).filter(
              ([name]) => !isMcpServerDisabled(name),
            ),
          )
          for (const [name, config] of Object.entries(enabledClaudeaiConfigs)) activeConfigsRef.current.set(name, config)
          getMcpToolsCommandsAndResources(
            onCurrentConnectionAttempt,
            enabledClaudeaiConfigs,
            { v2Lifecycle: getV2Lifecycle(), onV2Result: onCurrentV2Result },
          ).catch(error => {
            logMCPError(
              'useManageMcpConnections',
              `Failed to get claude.ai MCP resources: ${errorMessage(error)}`,
            )
          })
        }
      }

      mcpCarrier287.setSuppressedClaudeAiConnectors(suppressedClaudeAi287)

      // Log server counts after both phases complete
      const allConfigs = { ...configs, ...claudeaiConfigs }
      const counts = {
        enterprise: 0,
        global: 0,
        project: 0,
        user: 0,
        plugin: 0,
        claudeai: 0,
      }
      // Ant-only: collect stdio command basenames to correlate with RSS/FPS
      // metrics. Stdio servers like rust-analyzer can be heavy and we want to
      // know which ones correlate with poor session performance.
      const stdioCommands: string[] = []
      for (const [name, serverConfig] of Object.entries(allConfigs)) {
        if (serverConfig.scope === 'enterprise') counts.enterprise++
        else if (serverConfig.scope === 'user') counts.global++
        else if (serverConfig.scope === 'project') counts.project++
        else if (serverConfig.scope === 'local') counts.user++
        else if (serverConfig.scope === 'dynamic') counts.plugin++
        else if (serverConfig.scope === 'claudeai') counts.claudeai++

        if (
          process.env.USER_TYPE === 'ant' &&
          !isMcpServerDisabled(name) &&
          (serverConfig.type === undefined || serverConfig.type === 'stdio') &&
          'command' in serverConfig
        ) {
          stdioCommands.push(basename(serverConfig.command))
        }
      }
      logEvent('tengu_mcp_servers', {
        ...counts,
        ...(process.env.USER_TYPE === 'ant' && stdioCommands.length > 0
          ? {
              stdio_commands: stdioCommands
                .sort()
                .join(
                  ',',
                ) as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
            }
          : {}),
      })
    }

    void loadAndConnectMcpConfigs()

    return () => {
      cancelled = true
    }
  }, [
    isStrictMcpConfig,
    dynamicMcpConfig,
    onConnectionAttempt,
    onV2Result,
    setAppState,
    _authVersion,
    sessionId,
    _pluginReconnectKey,
    _sessionResetKey,
    configurationCwd,
  ])

  useEffect(() => () => {
    reconnectSupervisorRef.current.cancelAll()
    activeV2NamesRef.current.clear()
    const lifecycle = v2LifecycleRef.current
    v2LifecycleRef.current = null
    void lifecycle?.dispose()
  }, [_authVersion, sessionId, _sessionResetKey])

  // Cleanup all timers on unmount
  useEffect(() => {
    mountedRef.current = true
    const supervisor = reconnectSupervisorRef.current
    return () => {
      mountedRef.current = false
      supervisor.cancelAll()
      activeV2NamesRef.current.clear()
      const lifecycle = v2LifecycleRef.current
      v2LifecycleRef.current = null
      void lifecycle?.dispose()
      // Flush any pending batched MCP updates before unmount
      if (flushTimerRef.current !== null) {
        flushTimerRef.current()
        flushTimerRef.current = null
        flushPendingUpdates()
      }
    }
  }, [flushPendingUpdates])

  // Expose reconnectMcpServer function for components to use.
  // Reads mcp.clients via store.getState() so this callback stays stable
  // across client state transitions (no need to re-create on every connect).
  const reconnectMcpServer = useCallback(
    async (serverName: string) => {
      const client = store
        .getState()
        .mcp.clients.find(c => c.name === serverName)
      if (!client) {
        throw new Error(`MCP server ${serverName} not found`)
      }

      // Cancel any pending automatic reconnection attempt
      reconnectSupervisorRef.current.cancel(serverName)

      if (resolveMcpSdkGeneration() === 'v2') {
        const lifecycle = getV2Lifecycle()
        manualV2ConnectionsRef.current.add(serverName)
        try {
          const selected = await lifecycle.reconnect(serverName, client.config)
          if (selected.generation !== 'v2') throw new Error('MCP generation changed during reconnect')
          onV2Result(selected)
          return v2ResultAsStatus(selected)
        } finally { manualV2ConnectionsRef.current.delete(serverName) }
      }

      const result = await reconnectMcpServerImpl(serverName, client.config)

      onConnectionAttempt(result)

      // Don't throw, just let UI handle the client type in case the reconnect failed
      // (Detailed logs are within the reconnectMcpServerImpl via --debug)
      return result
    },
    [store, onConnectionAttempt, onV2Result],
  )

  // Expose function to toggle server enabled/disabled state
  const toggleMcpServer = useCallback(
    async (serverName: string): Promise<void> => {
      const client = store
        .getState()
        .mcp.clients.find(c => c.name === serverName)
      if (!client) {
        throw new Error(`MCP server ${serverName} not found`)
      }

      const isCurrentlyDisabled = client.type === 'disabled'

      if (!isCurrentlyDisabled) {
        // Cancel any pending automatic reconnection attempt
        reconnectSupervisorRef.current.cancel(serverName)

        // Persist disabled state to disk FIRST before clearing cache
        // This is important because the onclose handler checks disk state
        setMcpServerEnabled(serverName, false)

        // Disabling: disconnect and clean up if currently connected
        if (client.type === 'connected') {
          await clearServerCache(serverName, client.config)
        } else if (client.type === 'v2-connected') {
          await v2LifecycleRef.current?.invalidate(serverName)
        }

        // Update to disabled state (tools/commands/resources auto-cleared)
        updateServer({
          name: serverName,
          type: 'disabled',
          config: client.config,
        })
      } else {
        // Enabling: persist enabled state to disk first
        setMcpServerEnabled(serverName, true)

        // Mark as pending and reconnect
        updateServer({
          name: serverName,
          type: 'pending',
          config: client.config,
        })

        // Reconnect the server
        if (resolveMcpSdkGeneration() === 'v2') {
          const lifecycle = getV2Lifecycle()
          manualV2ConnectionsRef.current.add(serverName)
          try {
            const selected = await discoverSelectedMcpServer(serverName, client.config, lifecycle)
            if (selected.generation !== 'v2') throw new Error('MCP generation changed during enable')
            onV2Result(selected)
          } finally { manualV2ConnectionsRef.current.delete(serverName) }
        } else {
          const result = await reconnectMcpServerImpl(serverName, client.config)
          onConnectionAttempt(result)
        }
      }
    },
    [store, updateServer, onConnectionAttempt, onV2Result],
  )

  const invalidateV2McpServer = useCallback(async (serverName: string): Promise<void> => {
    activeV2NamesRef.current.delete(serverName)
    await v2LifecycleRef.current?.invalidate(serverName)
    const current = store.getState().mcp.clients.find(c => c.name === serverName)
    if (current) updateServer({ name: serverName, config: current.config, type: 'failed',
      tools: [], commands: [], resources: [], v2Connection: null })
  }, [store, updateServer])

  return { reconnectMcpServer, toggleMcpServer, invalidateV2McpServer }
}

function getTransportDisplayName(type: string): string {
  switch (type) {
    case 'http':
      return 'HTTP'
    case 'ws':
    case 'ws-ide':
      return 'WebSocket'
    default:
      return 'SSE'
  }
}
