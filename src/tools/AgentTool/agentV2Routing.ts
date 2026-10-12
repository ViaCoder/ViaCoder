import { getSessionId } from '../../bootstrap/state.js'
import type { AppState } from '../../state/AppState.js'
import type { Tool, ToolUseContext } from '../../Tool.js'
import { createMcpV2Lifecycle } from '../../services/mcp/v2Lifecycle.js'
import { discoverSelectedMcpServer, type SelectedMcpDiscovery } from '../../services/mcp/v2Production.js'
import type { ConnectedMCPServerV2, ScopedMcpServerConfig } from '../../services/mcp/types.js'
import { hashMcpConfig } from '../../services/mcp/utils.js'
import type { MCPServerConnection } from '../../services/mcp/types.js'
import { isMcpResourceHelperName } from '../../services/mcp/resourceToolProjection.js'
import { getAgentMcpSnapshot } from './agentMcpSnapshot.js'

type V2Result = Extract<SelectedMcpDiscovery, { generation: 'v2' }>
type ConnectedResult = V2Result & { client: ConnectedMCPServerV2 }
type StateGetter = () => AppState

// Same per-caller wait contract as McpV2Lifecycle's awaitWithSignal: cancelling
// one Agent must not abort a projection another Agent lease is still using.
function awaitProjectionWithSignal<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise
  signal.throwIfAborted()
  return new Promise<T>((resolve, reject) => {
    const abort = () => { signal.removeEventListener('abort', abort); reject(signal.reason) }
    signal.addEventListener('abort', abort, { once: true })
    promise.then(value => { signal.removeEventListener('abort', abort); resolve(value) },
      error => { signal.removeEventListener('abort', abort); reject(error) })
  })
}

/** Official V2 lifecycle's identity epoch, extended with the host /clear key.
 * The latter is published atomically with MCP state by the local host. */
export function getAgentV2Epoch(state: AppState): string {
  return `${getSessionId()}:${state.authVersion}:${state.mcp.sessionResetKey}`
}

function matchesConfig(a: ScopedMcpServerConfig, b: ScopedMcpServerConfig): boolean {
  return a.scope === b.scope && hashMcpConfig(a) === hashMcpConfig(b)
}

function connected(result: V2Result, name: string): asserts result is ConnectedResult {
  if (result.client.type !== 'connected' || !('v2Client' in result.client) || result.client.isClosed())
    throw new Error(`Agent MCP server "${name}" is disconnected`)
}

export function findCanonicalAgentV2Tool(state: AppState, name: string,
  config: ScopedMcpServerConfig, toolName: string): { client: ConnectedMCPServerV2; tool: Tool } | undefined {
  const snapshot = getAgentMcpSnapshot(state)
  const client = snapshot.v2Clients.find(item => item.name === name && matchesConfig(item.config, config))
  const tool = snapshot.tools.find(item => item.mcpInfo?.serverName === name && item.mcpInfo.toolName === toolName)
  return client && tool ? { client, tool } : undefined
}

type Slot = {
  name: string
  config: ScopedMcpServerConfig
  getters: Set<{ getState: StateGetter }>
  owner: ReturnType<typeof createMcpV2Lifecycle>
  cached?: { epoch: string; result: V2Result }
  pending?: { epoch: string; promise: Promise<V2Result> }
  closing?: Promise<void>
}
const inlineSlots = new Map<string, Slot>()

function slotState(slot: Slot): AppState {
  const lease = slot.getters.values().next().value as { getState: StateGetter } | undefined
  if (!lease) throw new Error(`Agent MCP server "${slot.name}" has no active owner`)
  return lease.getState()
}

async function currentProjection(slot: Slot): Promise<V2Result> {
  const epoch = getAgentV2Epoch(slotState(slot))
  if (slot.cached?.epoch === epoch &&
      (slot.cached.result.client.type !== 'connected' ||
       ('v2Client' in slot.cached.result.client && !slot.cached.result.client.isClosed()))) return slot.cached.result
  if (slot.pending?.epoch === epoch) return slot.pending.promise
  const promise = (async () => {
    await slot.owner.invalidate(slot.name)
    const result = await discoverSelectedMcpServer(slot.name, slot.config, slot.owner)
    if (result.generation !== 'v2' || getAgentV2Epoch(slotState(slot)) !== epoch)
      throw new Error(`Agent MCP server "${slot.name}" generation changed during discovery`)
    slot.cached = { epoch, result }
    return result
  })()
  slot.pending = { epoch, promise }
  try { return await promise }
  finally { if (slot.pending?.promise === promise) slot.pending = undefined }
}

export type InlineAgentV2Lease = {
  name: string
  config: ScopedMcpServerConfig
  projection(signal?: AbortSignal): Promise<V2Result>
  /** Drop old private runtime before routing to the newly canonical pool. */
  suspendForCanonical(): Promise<void>
  isCurrent(client: ConnectedMCPServerV2, epoch: string): boolean
  release(): Promise<void>
}

/** One lifecycle per inline name/config, not one dial per Agent. Leases keep
 * parent and fork child lifetimes independent; last release owns disposal. */
export async function acquireInlineAgentV2(name: string, config: ScopedMcpServerConfig,
  getState: StateGetter): Promise<InlineAgentV2Lease> {
  const key = `${name}\u0000${config.scope}\u0000${hashMcpConfig(config)}`
  let slot = inlineSlots.get(key)
  if (slot?.closing) { await slot.closing; slot = inlineSlots.get(key) }
  if (!slot) {
    const created = {
      name, config, getters: new Set<{ getState: StateGetter }>(), owner: undefined as unknown as Slot['owner'],
    } as Slot
    created.owner = createMcpV2Lifecycle({
      getIdentityEpoch: () => getAgentV2Epoch(slotState(created)),
      resolveConfig: async candidate => candidate === name && created.getters.size ? config : undefined,
    })
    inlineSlots.set(key, created)
    slot = created
  }
  const leaseToken = { getState }
  slot.getters.add(leaseToken)
  const owned = slot
  let released = false
  return {
    name, config,
    projection: (signal?: AbortSignal) => {
      if (released) throw new Error(`Agent MCP server "${name}" owner was released`)
      signal?.throwIfAborted()
      return awaitProjectionWithSignal(currentProjection(owned), signal)
    },
    async suspendForCanonical() {
      if (released) throw new Error(`Agent MCP server "${name}" owner was released`)
      if (!owned.cached && !owned.pending) return
      owned.cached = undefined
      await owned.owner.invalidate(name)
    },
    isCurrent(client, epoch) {
      return !released && getAgentV2Epoch(slotState(owned)) === epoch &&
        owned.cached?.epoch === epoch && owned.cached.result.client === client && !client.isClosed()
    },
    async release() {
      if (released) return
      released = true
      owned.getters.delete(leaseToken)
      if (owned.getters.size || owned.closing) return
      owned.closing = owned.owner.dispose()
      try { await owned.closing }
      finally { if (inlineSlots.get(key) === owned) inlineSlots.delete(key) }
    },
  }
}

type Binding = { name: string; config: ScopedMcpServerConfig; toolName: string;
  source: 'canonical' | 'inline'; lease?: InlineAgentV2Lease }
const bindings = new WeakMap<Tool, Binding>()
export function getAgentV2ToolBinding(tool: Tool): Binding | undefined { return bindings.get(tool) }

export function bindAgentV2Tool(tool: Tool, binding: Binding): Tool {
  const routed: Tool = {
    ...tool,
    async call(args, context, canUseTool, parentMessage, onProgress) {
      context.abortController.signal.throwIfAborted()
      const before = context.getAppState()
      const started = getAgentV2Epoch(before)
      let target = findCanonicalAgentV2Tool(before, binding.name, binding.config, binding.toolName)
      let viaInline = false
      if (target && binding.lease) await binding.lease.suspendForCanonical()
      if (!target && binding.source === 'inline' && binding.lease) {
        // The canonical owner may be publishing a replacement after /clear.
        // Do not race its pending/failed status with an Agent-local redial.
        if (before.mcp.clients.some(status => status.name === binding.name &&
            matchesConfig(status.config, binding.config))) {
          await binding.lease.suspendForCanonical()
          throw new Error(`Agent MCP tool "${tool.name}" is disconnected: canonical V2 runtime is not ready`)
        }
        const projection = await binding.lease.projection(context.abortController.signal)
        connected(projection, binding.name)
        const selected = projection.tools.find(item => item.mcpInfo?.serverName === binding.name &&
          item.mcpInfo.toolName === binding.toolName)
        if (!selected) throw new Error(`Agent MCP tool "${tool.name}" is disconnected`)
        target = { client: projection.client, tool: selected }
        viaInline = true
      }
      if (!target) throw new Error(`Agent MCP tool "${tool.name}" is disconnected: no matching live V2 runtime`)
      if (getAgentV2Epoch(context.getAppState()) !== started) throw new Error(`Agent MCP tool "${tool.name}" generation changed before call`)
      let result: Awaited<ReturnType<Tool['call']>>
      try { result = await target.tool.call(args, context, canUseTool, parentMessage, onProgress) }
      catch (error) {
        if (getAgentV2Epoch(context.getAppState()) !== started) throw new Error(`Agent MCP tool "${tool.name}" generation changed during call`, { cause: error })
        throw error
      }
      context.abortController.signal.throwIfAborted()
      const fresh = context.getAppState()
      if (getAgentV2Epoch(fresh) !== started ||
          (viaInline ? !binding.lease?.isCurrent(target.client, started) :
            findCanonicalAgentV2Tool(fresh, binding.name, binding.config, binding.toolName)?.client !== target.client))
        throw new Error(`Agent MCP tool "${tool.name}" generation changed during call`)
      return result
    },
  }
  bindings.set(routed, binding)
  return routed
}

/** Resource helpers read status from context.options. Supply the current
 * canonical AppState status at call time, retaining only Agent-local servers
 * absent from that owner. Their implementation then selects the matching real
 * V2 client from getAppState(), never from a stale options snapshot. */
export function bindAgentResourceTool(tool: Tool, localClients: MCPServerConnection[],
  leases: InlineAgentV2Lease[]): Tool {
  if (!isMcpResourceHelperName(tool.name)) return tool
  return {
    ...tool,
    async call(args, context, canUseTool, parentMessage, onProgress) {
      context.abortController.signal.throwIfAborted()
      const started = getAgentV2Epoch(context.getAppState())
      const current = context.getAppState().mcp
      const canonicalNames = new Set(current.clients.map(client => client.name))
      const local = localClients.filter(client => !canonicalNames.has(client.name))
      const localV2: ConnectedMCPServerV2[] = []
      const clients = [...current.clients, ...await Promise.all(local.map(async status => {
        const lease = leases.find(item => item.name === status.name && matchesConfig(item.config, status.config))
        if (!lease) return status
        const projected = await lease.projection(context.abortController.signal)
        if (projected.client.type !== 'connected' || !('v2Client' in projected.client)) return projected.client
        localV2.push(projected.client)
        return { name: status.name, type: 'v2-connected' as const, generation: 'v2' as const,
          config: projected.client.config, capabilities: projected.client.capabilities,
          serverInfo: projected.client.serverInfo, instructions: projected.client.instructions }
      }))]
      if (getAgentV2Epoch(context.getAppState()) !== started)
        throw new Error(`Agent MCP resources generation changed before call`)
      const state = context.getAppState()
      const liveV2 = [...getAgentMcpSnapshot(state).v2Clients, ...localV2]
      const result = await tool.call(args, { ...context,
        getAppState: () => ({ ...context.getAppState(), mcp: { ...context.getAppState().mcp,
          v2Clients: liveV2 } }),
        options: { ...context.options, mcpClients: clients, mcpV2Clients: liveV2 },
      }, canUseTool, parentMessage, onProgress)
      context.abortController.signal.throwIfAborted()
      if (getAgentV2Epoch(context.getAppState()) !== started)
        throw new Error(`Agent MCP resources generation changed during call`)
      return result
    },
  }
}
