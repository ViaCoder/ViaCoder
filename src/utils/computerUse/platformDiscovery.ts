import { ListToolsResultSchema } from '@modelcontextprotocol/sdk/types.js'
import type { Tool } from '../../Tool.js'
import type { ConnectedMcpServer } from '../../services/mcp/types.js'
import { registerCleanup } from '../cleanupRegistry.js'
import { PLATFORM_CU_HOST_TOOL, negotiatePlatformCu } from './platformExecutor.js'
import { buildPlatformComputerUseTools } from './platformTools.js'
import { createPlatformComputerUseBinding } from './platformWrapper.js'
import { createLinux073ConnectedBackend, hasLinux073Tools } from '../linuxComputerUse/connectedExecutor.js'
import { getConnectedMcpClient } from '../../services/mcp/connectionAccess.js'

export function hasPlatformComputerUseHost(connection: { name: string }, tools: readonly Tool[], platform = process.platform) {
  return ((platform === 'win32' && connection.name === 'windows-computer-use') ||
    (platform === 'linux' && connection.name === 'linux-computer-use')) &&
    tools.some(tool => tool.mcpInfo?.toolName === PLATFORM_CU_HOST_TOOL)
}

/** Purely a binding cache keyed by the canonical connection identity. It owns
 * neither connections, grants, model state nor screenshots (the original
 * binder holds the latter). Revoked rows cannot be used to call an executor. */
const bindings = new WeakMap<ConnectedMcpServer, ReturnType<typeof createPlatformComputerUseBinding>>()
export async function projectPlatformComputerUse(connection: ConnectedMcpServer, tools: Tool[],
  project: (raw: ReturnType<typeof ListToolsResultSchema.parse>['tools']) => Tool[],
  signal = new AbortController().signal, platform = process.platform): Promise<Tool[]> {
  const legacyLinux = hasLinux073Tools(connection, tools, platform) && !hasPlatformComputerUseHost(connection, tools, platform)
  if (!legacyLinux && !hasPlatformComputerUseHost(connection, tools, platform)) return tools
  const linux = legacyLinux ? await createLinux073ConnectedBackend(connection, tools, signal) : undefined
  if (legacyLinux && !linux) return tools
  const contract = linux?.contract ?? await negotiatePlatformCu(connection, platform as 'win32' | 'linux', signal)
  if (!contract.ready) throw Error('Computer use backend is not ready on the interactive desktop')
  const raw = ListToolsResultSchema.parse({ tools: buildPlatformComputerUseTools(contract) }).tools
  let binding = bindings.get(connection)
  if (!binding) {
    binding = createPlatformComputerUseBinding(connection, contract, linux?.invoke)
    bindings.set(connection, binding)
    const client = getConnectedMcpClient(connection).client, previous = client.onclose, previousClose = client.close
    const ownedBinding = binding
    let unregister: (() => void) | undefined
    let closed = false
    const dispose = () => {
      if (closed) return
      closed = true
      ownedBinding.dispose()
      bindings.delete(connection)
      unregister?.()
      if (client.onclose === onclose) client.onclose = previous
      if (client.close === close) client.close = previousClose
    }
    // This is a consumer of the existing SDK close event, not a transport or
    // row.cleanup replacement. Preserve all canonical lifecycle handlers.
    const onclose = () => { try { previous?.() } finally { dispose() } }
    // Original xt deliberately removes onclose before row cleanup. Observe
    // the same SDK close method too; never replace the transport/row cleanup.
    const close: typeof client.close = async () => {
      if (contract.platform === 'win32' && contract.methods.includes('releaseInput')) {
        // Deliver release while the SAME stdio transport is still alive.
        // Even release failures must close it; they remain caller errors.
        try { await ownedBinding.dispose() } finally {
          try { await previousClose.call(client) } finally { dispose() }
        }
        return
      }
      try { return await previousClose.call(client) } finally { dispose() }
    }
    client.onclose = onclose
    client.close = close
    unregister = registerCleanup(async () => {
      if (contract.platform === 'win32' && contract.methods.includes('releaseInput')) {
        try { await ownedBinding.dispose() } finally { dispose() }
      } else dispose()
    })
  }
  const result = project(raw)
  const adapted = result.map(tool => ({ ...tool, ...binding.override(tool.mcpInfo?.toolName ?? '') }))
  // Existing mature Linux semantic tools remain their original permission and
  // SDK execution path; only the added Mac-style slice uses this app binder.
  // Do not call the unconverted remainder 'unified' or silently remove its C.
  // screenshot is also an upstream tool name. Replace only public names
  // consumed by the adapted dispatcher, otherwise the legacy raw caller wins
  // discovery and bypasses the new schema/approval/coordinates contract.
  const consumed = new Set(adapted.map(tool => tool.mcpInfo?.toolName))
  return legacyLinux ? [...tools.filter(tool => !consumed.has(tool.mcpInfo?.toolName)), ...adapted] : adapted
}
