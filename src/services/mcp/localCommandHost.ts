import {getMcpConnectedProducer287} from './connectedProducer287.js'
import {
  PromptListChangedNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
} from '@modelcontextprotocol/sdk/types.js'
import type { LocalJSXCommandContext } from '../../types/command.js'
import type { McpCommandHost } from '../../commands/mcp/mcp-noninteractive.js'
import {
  clearServerCache, discoverMcpServer, fetchCommandsForClient,
  fetchResourcesForClient, fetchToolsForClient, reconnectMcpServerImpl,
} from './client.js'
import { getClaudeCodeMcpConfigs, isMcpServerDisabled, setMcpServerEnabled } from './config.js'
import { commandBelongsToServer, getProjectMcpServerStatus, hashMcpConfig } from './utils.js'
import { getMcpPrefix } from './mcpStringUtils.js'
import type { ConnectedMCPServer, MCPServerConnection, ScopedMcpServerConfig } from './types.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { registerCleanup } from '../../utils/cleanupRegistry.js'
import { isShuttingDown } from '../../utils/gracefulShutdown.js'
import { settingsChangeDetector } from '../../utils/settings/changeDetector.js'
import { McpReconnectSupervisor, MCP_RECONNECT_ATTEMPTS } from './reconnectSupervisor.js'
import { mcpSkillsEnabled } from '../../skills/mcpSkills.js'

/** Public, local control failures. Do not print arbitrary transport errors (URLs can contain secrets). */
export class McpCommandControlError extends Error {}

type Context = LocalJSXCommandContext
type Discovery = Awaited<ReturnType<typeof reconnectMcpServerImpl>>
type Host = McpCommandHost & { updateContext(context: Context): void; dispose(): Promise<void> }
const hosts = new WeakMap<Context['getAppState'], Host>()

/**
 * React-free local manager for ordinary headless slash commands. Uses the same
 * connection/cache/discovery services as useManageMCPConnections, not a second
 * transport implementation. Private SDK/attached-host owners must inject their
 * own controls: mutating AppState alone would leave their private pools stale.
 * Evidence: chunk-mzg9kbjz eye (Zo/An/No), chunk-gg4jhzsm lt/Ge/_o.
 */
export function localMcpCommandHost(context: Context): McpCommandHost | undefined {
  if (!context.options.isNonInteractiveSession || isShuttingDown()) return undefined
  if (isEnvTruthy(process.env.CLAUDE_CODE_REMOTE) ||
      ['remote', 'remote_projects', 'remote_desktop', 'remote_mobile', 'remote_cowork', 'remote_baku', 'ssh-remote'].includes(process.env.CLAUDE_CODE_ENTRYPOINT ?? '')) return undefined
  // Older command-only embedders have no live connection/config ownership.
  if (!context.getAppState().mcp.clients.some(c => c.config)) return undefined
  let host = hosts.get(context.getAppState)
  if (!host) {
    host = createHost(context)
    hosts.set(context.getAppState, host)
  }
  host.updateContext(context)
  return host
}

/** Explicit owner teardown; does not change persisted enabled/approval state. */
export async function disposeLocalMcpCommandHost(context: Pick<Context, 'getAppState'>): Promise<void> {
  await hosts.get(context.getAppState)?.dispose()
}

function createHost(initialContext: Context): Host {
  let context = initialContext
  const turns = new Map<string, Promise<unknown>>()
  const supervisor = new McpReconnectSupervisor()
  const operations = new Map<string, Set<AbortController>>()
  const managed = new Map<string, ConnectedMCPServer>()
  let disposed = false
  let authVersion = context.getAppState().authVersion
  let boundSignal: AbortSignal | undefined
  const unregister = registerCleanup(dispose)
  const unsubscribe = settingsChangeDetector.subscribe(() => { void revalidate() })
  const onAbort = () => { void dispose() }
  let disposal: Promise<void> | undefined
  function dispose(): Promise<void> {
    if (disposal) return disposal
    disposed = true
    supervisor.cancelAll()
    for (const controllers of operations.values()) for (const controller of controllers) controller.abort()
    boundSignal?.removeEventListener('abort', onAbort)
    unsubscribe(); unregister()
    disposal = Promise.allSettled([...turns.values(), ...[...managed.values()].map(detach)]).then(() => {
      managed.clear(); hosts.delete(initialContext.getAppState)
    })
    return disposal
  }
  async function revalidate() {
    for (const client of [...managed.values()]) {
      try {
        const config = await resolve(client.name)
        if (hashMcpConfig(config) !== hashMcpConfig(client.config) || isMcpServerDisabled(client.name)) throw new McpCommandControlError('Configuration changed.')
      } catch {
        supervisor.cancel(client.name); operations.get(client.name)?.forEach(controller => controller.abort())
        await detach(client)
        if (!disposed && owns(client)) publish(empty({name: client.name, config: client.config, type: isMcpServerDisabled(client.name) ? 'disabled' : 'failed'}))
      }
    }
  }
  function cancel(name: string) { supervisor.cancel(name); operations.get(name)?.forEach(controller => controller.abort()) }
  function manual<T>(name: string, work: (signal: AbortSignal) => Promise<T>, interrupt = true): Promise<T> {
    if (interrupt) cancel(name)
    const controller = new AbortController()
    const pending = operations.get(name) ?? new Set<AbortController>()
    pending.add(controller); operations.set(name, pending)
    return serial(name, () => work(controller.signal)).finally(() => {
      pending.delete(controller)
      if (!pending.size && operations.get(name) === pending) operations.delete(name)
    })
  }
  // All actions and list_changed refreshes for one server are serialized. Never
  // let a late refresh resurrect a disabled/replaced connection.
  function serial<T>(name: string, work: () => Promise<T>): Promise<T> {
    const next = (turns.get(name) ?? Promise.resolve()).catch(() => {}).then(work)
    turns.set(name, next)
    void next.finally(() => { if (turns.get(name) === next) turns.delete(name) }).catch(() => {})
    return next
  }
  function current(name: string) {
    return context.getAppState().mcp.clients.find(c => c.name === name)
  }
  function owns(client: ConnectedMCPServer) {
    const live = current(client.name)
    return live?.type === 'connected' && live.client === client.client
  }
  async function resolve(name: string): Promise<ScopedMcpServerConfig> {
    if (disposed || isShuttingDown() || context.abortController.signal.aborted || context.getAppState().authVersion !== authVersion)
      throw new McpCommandControlError('MCP control was cancelled or its identity changed.')
    const client = current(name)
    if (!client?.config) throw new McpCommandControlError('This server is no longer configured.')
    const config = client.config
    if (name === 'ide' || !['stdio', 'http', 'sse', 'ws'].includes(config.type ?? 'stdio') ||
        !['local', 'user', 'project', 'enterprise', 'dynamic'].includes(config.scope)) {
      throw new McpCommandControlError('This transport/source requires its owning host; local text controls do not manage it.')
    }
    if ((client.type as string) === 'needs-approval' ||
        config.scope === 'project' && getProjectMcpServerStatus(name) !== 'approved') {
      throw new McpCommandControlError('Approval is required. Approve this project server with /mcp in the terminal first.')
    }
    // Re-resolve from the real loader on EVERY dial/refresh, preserving managed
    // allow/deny, enterprise exclusivity, setting-source, project approval,
    // plugin-only and enabled-plugin gates. Never promote a cached state config
    // or an SDK-supplied dynamic config into an approved source.
    const { servers } = await getClaudeCodeMcpConfigs()
    const live = servers[name]
    if (!live) throw new McpCommandControlError('This server is blocked by policy, its source is disabled, or its configuration was removed. SDK/attached-host servers require their owning host.')
    if (live.type !== config.type || live.scope !== config.scope) {
      throw new McpCommandControlError('The server source changed. Reload its configuration in the owning host first.')
    }
    if (disposed || isShuttingDown() || context.abortController.signal.aborted || context.getAppState().authVersion !== authVersion)
      throw new McpCommandControlError('MCP control was cancelled or its identity changed.')
    return live
  }
  function publish(result: Discovery) {
    const { client, tools, commands, resources } = result
    const name = client.name, prefix = getMcpPrefix(name)
    const mergeTools = (old: Context['options']['tools']) => {
      const names = new Set(tools.map(t => t.name))
      return [...old.filter(t => !t.name.startsWith(prefix) && !names.has(t.name)), ...tools]
    }
    const mergeCommands = (old: Context['options']['commands']) =>
      [...old.filter(c => !commandBelongsToServer(c, name)), ...commands]
    const mergeClients = (old: MCPServerConnection[]) =>
      [...old.filter(c => c.name !== name), client]
    context.setAppState(state => {
      const nextResources = { ...state.mcp.resources }
      if (resources?.length) nextResources[name] = resources
      else delete nextResources[name]
      return { ...state, mcp: { ...state.mcp, clients: mergeClients(state.mcp.clients),
        tools: mergeTools(state.mcp.tools), commands: mergeCommands(state.mcp.commands), resources: nextResources } }
    })
    // Current-turn tools/commands and public MCP resource consumers must see the
    // same state; the next headless turn assembles from AppState.mcp.
    context.options.tools = mergeTools(context.options.tools)
    context.options.commands = mergeCommands(context.options.commands)
    context.options.mcpClients = mergeClients(context.options.mcpClients ?? [])
    context.options.mcpResources = context.getAppState().mcp.resources
  }
  function empty(client: MCPServerConnection): Discovery {
    return { client, tools: [], commands: [], resources: [] }
  }
  async function detach(client: MCPServerConnection) {
    if (client.type === 'connected') {
      client.client.onclose = undefined
      if (managed.get(client.name) === client) managed.delete(client.name)
      // Close this exact object even if its memo entry was invalidated on drop.
      await client.cleanup()
    }
    await clearServerCache(client.name, client.config)
  }
  function attach(client: ConnectedMCPServer) {
    // Preserve connectToServer's default elicitation cancel handler. No UI or
    // private SDK approval channel exists here; never auto-approve elicitation.
    managed.set(client.name, client)
    client.client.onclose = () => {
      if (!owns(client) || disposed || isShuttingDown()) return
      publish(empty({name: client.name, config: client.config, type: isMcpServerDisabled(client.name) ? 'disabled' : 'failed'}))
      if (!['sse', 'ws', 'http'].includes(client.config.type ?? '') || isMcpServerDisabled(client.name)) {
        void detach(client).catch(() => {})
        return
      }
      const expected = hashMcpConfig(client.config)
      void supervisor.start(client.name, (signal, attempt) => serial(client.name, async () => {
        if (signal.aborted || disposed || isShuttingDown()) return true
        try {
          const config = await resolve(client.name)
          if (hashMcpConfig(config) !== expected || isMcpServerDisabled(client.name)) return true
          const result = await connect(client.name, false, signal, attempt)
          return result.client.type === 'connected' || result.client.type === 'needs-auth'
        } catch {
          // resolve rechecks all source/approval/policy and identity gates; a
          // denied dial is terminal, never an excuse to probe other identities.
          return true
        }
      })).catch(() => {})
    }
    const refresh = (kind: 'tools' | 'prompts' | 'resources') => serial(client.name, async () => {
      if (!owns(client) || isMcpServerDisabled(client.name)) return
      try {
        const config = await resolve(client.name)
        if (hashMcpConfig(config) !== hashMcpConfig(client.config)) throw new McpCommandControlError('Configuration changed; reconnect first.')
      } catch {
        await detach(client)
        if (owns(client)) publish(empty({ name: client.name, type: 'failed', config: client.config }))
        return
      }
      if (kind === 'tools') fetchToolsForClient.cache.delete(getMcpConnectedProducer287().cacheKey(client.name,client.config))
      if (kind === 'prompts') fetchCommandsForClient.cache.delete(getMcpConnectedProducer287().cacheKey(client.name,client.config))
      if (kind === 'resources') {
        fetchResourcesForClient.cache.delete(getMcpConnectedProducer287().cacheKey(client.name,client.config))
        if (mcpSkillsEnabled(client.capabilities, client.config.type)) {
          const { fetchMcpSkillsForClient } = await import('../../skills/mcpSkills.js')
          fetchMcpSkillsForClient.cache.delete(getMcpConnectedProducer287().cacheKey(client.name,client.config))
          fetchCommandsForClient.cache.delete(getMcpConnectedProducer287().cacheKey(client.name,client.config))
        }
      }
      const result = await discoverMcpServer(client)
      try {
        const config = await resolve(client.name)
        if (hashMcpConfig(config) !== hashMcpConfig(client.config)) throw new McpCommandControlError('Configuration changed while refreshing.')
        if (owns(client) && !isMcpServerDisabled(client.name)) publish(result)
      } catch {
        await detach(client)
        if (owns(client)) publish(empty({ name: client.name, type: isMcpServerDisabled(client.name) ? 'disabled' : 'failed', config: client.config }))
      }
    }).catch(() => { /* The live connection remains visible; no synthetic refresh success. */ })
    if (client.capabilities.tools?.listChanged) client.client.setNotificationHandler(ToolListChangedNotificationSchema, () => refresh('tools'))
    if (client.capabilities.prompts?.listChanged) client.client.setNotificationHandler(PromptListChangedNotificationSchema, () => refresh('prompts'))
    if (client.capabilities.resources?.listChanged) client.client.setNotificationHandler(ResourceListChangedNotificationSchema, () => refresh('resources'))
  }
  async function connect(name: string, enable: boolean, signal: AbortSignal, attempt?: number) {
    signal.throwIfAborted()
    const config = await resolve(name)
    signal.throwIfAborted()
    const old = current(name)!
    if (!enable && (old.type === 'disabled' || isMcpServerDisabled(name))) {
      throw new McpCommandControlError('This server is disabled. Enable it before reconnecting.')
    }
    if (enable) {
      setMcpServerEnabled(name, true)
      if (isMcpServerDisabled(name)) throw new McpCommandControlError('The enabled state was not saved.')
    }
    await detach(old)
    signal.throwIfAborted()
    publish(empty({ name, type: 'pending', config, ...(attempt ? {reconnectAttempt: attempt, maxReconnectAttempts: MCP_RECONNECT_ATTEMPTS} : {}) }))
    const result = await reconnectMcpServerImpl(name, config, signal)
    try {
      signal.throwIfAborted()
      const latestConfig = await resolve(name)
      if (hashMcpConfig(latestConfig) !== hashMcpConfig(config)) throw new McpCommandControlError('Configuration changed while reconnecting. Reconnect with the new configuration.')
      if (isMcpServerDisabled(name)) throw new McpCommandControlError('This server was disabled while reconnecting.')
    } catch (error) {
      await detach(result.client)
      if (!disposed) publish(empty({ name, type: isMcpServerDisabled(name) ? 'disabled' : 'failed', config }))
      throw error
    }
    if (result.client.type === 'connected') attach(result.client)
    publish(result)
    return result
  }
  const host: Host = {
    dispose,
    updateContext(next) {
      context = next
      if (boundSignal !== next.abortController.signal) {
        boundSignal?.removeEventListener('abort', onAbort)
        boundSignal = next.abortController.signal
        boundSignal.addEventListener('abort', onAbort, {once: true})
      }
      if (authVersion !== next.getAppState().authVersion) {
        // Identity epoch change is a stop boundary, not automatic authorization
        // for the new account. A fresh public command must resolve gates again.
        void dispose()
        return
      }
      for (const client of next.getAppState().mcp.clients) {
        if (client.type === 'connected' && client.name !== 'ide' &&
            ['stdio', 'sse', 'ws', 'http'].includes(client.config.type ?? 'stdio') &&
            ['local', 'user', 'project', 'enterprise'].includes(client.config.scope) &&
            managed.get(client.name)?.client !== client.client) attach(client)
      }
      void revalidate()
    },
    reconnect: name => manual(name, signal => connect(name, false, signal)),
    toggle: name => manual(name, signal => setEnabled(name, current(name)?.type === 'disabled', signal)),
    setEnabled: (name, enabled) => manual(name, signal => setEnabled(name, enabled, signal), !enabled),
  }
  async function setEnabled(name: string, enabled: boolean, signal: AbortSignal): Promise<MCPServerConnection> {
    signal.throwIfAborted()
    const old = current(name)
    if (!old) throw new McpCommandControlError('This server is no longer configured.')
    // Validate ownership even for disable, but allow stopping a removed or
    // policy-revoked local server. No process/network is started on this path.
    if (enabled) {
      if (old.type !== 'disabled' && !isMcpServerDisabled(name)) return old
      return (await connect(name, true, signal)).client
    }
    if (old.config.type === 'sdk' || old.config.scope === 'claudeai' || old.name === 'ide' ||
        old.config.scope === 'dynamic' && !old.config.pluginSource) {
      throw new McpCommandControlError('This server requires its owning host to disable it.')
    }
    if ((old.type as string) === 'needs-approval') throw new McpCommandControlError('Approval is required in the owning host.')
    setMcpServerEnabled(name, false) // Official An: persist BEFORE onclose/cleanup.
    if (!isMcpServerDisabled(name)) throw new McpCommandControlError('The disabled state was not saved.')
    await detach(old)
    const disabled: MCPServerConnection = { name, type: 'disabled', config: old.config }
    publish(empty(disabled))
    return disabled
  }
  return host
}
