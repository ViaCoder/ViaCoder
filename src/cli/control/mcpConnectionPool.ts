import type {
  ConnectedMCPServerV2,
  MCPServerConnection,
} from '../../services/mcp/types.js'
import { jsonStringify } from '../../utils/slowOperations.js'

export type ControlMcpConnection =
  | Exclude<MCPServerConnection, { type: 'v2-connected' }>
  | ConnectedMCPServerV2

/** Join the app's status projection to its actual V2 runtime. Status and
 * resource controls share this pool; a V2 status alone is not a V1 client. */
export function controlMcpConnections(
  current: readonly MCPServerConnection[],
  v2: readonly ConnectedMCPServerV2[],
  sdk: readonly MCPServerConnection[],
  dynamic: readonly MCPServerConnection[],
): ControlMcpConnection[] {
  const existingNames = new Set([
    ...current.map(c => c.name),
    ...sdk.map(c => c.name),
  ])
  const runtimes = new Map(v2.map(c => [c.name, c]))
  const statuses = [
    ...current,
    ...sdk,
    ...dynamic.filter(c => !existingNames.has(c.name)),
  ]
  return statuses.map(status => {
    if (status.type !== 'v2-connected') return status
    const runtime = runtimes.get(status.name)
    if (
      runtime &&
      !runtime.isClosed() &&
      jsonStringify(runtime.config) === jsonStringify(status.config)
    ) return runtime
    // Never serve a resource from a missing, closed or superseded runtime, or
    // misreport a projection as a successfully connected SDK instance.
    return {
      type: 'failed',
      name: status.name,
      config: status.config,
      error: 'MCP V2 runtime is disconnected or superseded',
    }
  })
}
