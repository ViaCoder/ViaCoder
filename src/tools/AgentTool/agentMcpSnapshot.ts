import type { AppState } from '../../state/AppState.js'
import type { ConnectedMCPServerV2 } from '../../services/mcp/types.js'
import type { Tools } from '../../Tool.js'
import { jsonStringify } from '../../utils/slowOperations.js'

/** The same status→real-pool match used by List/Read MCP resource tools.
 * V2 status is not a V1 client and a missing/closed V2 instance must not
 * expose a stale projected tool from an earlier generation. */
export function getAgentMcpSnapshot(state: AppState): {
  tools: Tools
  v2Clients: ConnectedMCPServerV2[]
} {
  const statuses = state.mcp.clients
  const liveV2 = state.mcp.v2Clients.filter(client =>
    !client.isClosed() && statuses.some(status =>
      status.type === 'v2-connected' && status.name === client.name &&
      jsonStringify(status.config) === jsonStringify(client.config),
    ),
  )
  const v2Names = new Set(liveV2.map(client => client.name))
  const statusByName = new Map(statuses.map(status => [status.name, status]))
  const tools = state.mcp.tools.filter(tool => {
    const serverName = tool.mcpInfo?.serverName
    if (!serverName) return true
    const status = statusByName.get(serverName)
    if (status?.type === 'v2-connected') return v2Names.has(serverName)
    return status?.type === 'connected'
  })
  return { tools, v2Clients: liveV2 }
}
