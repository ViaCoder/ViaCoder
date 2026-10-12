import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js'
import type { ConnectedMCPServer, ConnectedMCPServerV2, MCPServerConnection, ScopedMcpServerConfig } from '../../services/mcp/types.js'
import { ensureConnectedClient, readMcpResourceUnified } from '../../services/mcp/client.js'
import { filterMcpServersByPolicy, isMcpServerDisabled } from '../../services/mcp/config.js'
import { getProjectMcpServerStatus } from '../../services/mcp/utils.js'
import { isRestrictedToPluginOnly } from '../../utils/settings/pluginOnlyPolicy.js'
import { isBareMode } from '../../utils/envUtils.js'
import { assertReadableLane, type ControlLane } from './followupCommon.js'
import { sanitizeMcpText, parseOfficialInteger } from './officialDisplay.js'

export const MCP_READ_RESOURCE_CAPABILITY = 'mcp_read_resource_v1'
export const MAX_RESOURCE_CHARACTERS = 10_485_760
export type ResourceReadConnection = ConnectedMCPServer | ConnectedMCPServerV2
export interface ResourceReadOwner extends ControlLane {
  /** Bind to the same live merged pool as mcp_status, not a copied startup list. */
  connections(): readonly (MCPServerConnection | ConnectedMCPServerV2)[]
  isKnownMcpServer(name: string): boolean
  signal?: AbortSignal
  /** qge delegates to the active runtime's readResourceRaw. If supplied, retain
   * that host operation; this adapter itself does not switch SDK generations. */
  readResourceRaw?(connection: ResourceReadConnection, uri: string, options: {timeout: number; signal?: AbortSignal}): Promise<ReadResourceResult>
}
export type ResourceReadResponse = {contents: {
  uri: string; mimeType?: string; text?: string; blob?: string; _meta?: Record<string, unknown>
}[]}
export class ResourceReadError extends Error {
  constructor(readonly reason: string, message: string) { super(message); this.name = 'ResourceReadError' }
}
function fail(reason: string, message: string): never { throw new ResourceReadError(reason, message) }

/** zl: resource control uses MCP_TIMEOUT, not MCP_TOOL_TIMEOUT. */
export function resourceReadTimeoutMs(): number {
  const raw = process.env.MCP_TIMEOUT?.trim()
  const value = raw ? parseOfficialInteger(raw) : undefined
  return value !== undefined && Number.isFinite(value) && Number.isInteger(value) && value > 0 ? Math.min(value, 2_147_483_647) : 30_000
}
function projectMeta(meta: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  if (!meta) return undefined
  const entries = Object.entries(meta).filter(([key]) => !key.startsWith('com.anthropic/'))
  return entries.length ? Object.fromEntries(entries) : undefined
}
function policyBlock(name: string, config: ScopedMcpServerConfig): boolean {
  if (filterMcpServersByPolicy({[name]: config}).blocked.length) return true
  if (['enterprise', 'managed', 'local', 'user', 'project'].includes(config.scope)) {
    if (isBareMode()) return true
    if (isRestrictedToPluginOnly('mcp') && config.scope !== 'enterprise' && config.scope !== 'managed') return true
  }
  return false
}

/** Official ct: no tool/model invocation, persistence, arbitrary URI or SDK-host reads. */
export async function handleMcpReadResource(request: {serverName?: unknown; uri?: unknown}, owner: ResourceReadOwner): Promise<ResourceReadResponse> {
  assertReadableLane(owner, 'mcp_read_resource')
  const {serverName, uri} = request
  if (typeof serverName !== 'string') fail('bad_request', 'mcp_read_resource: serverName must be a string')
  if (typeof uri !== 'string') fail('bad_request', 'mcp_read_resource: uri must be a string')
  if (!uri.startsWith('ui://')) fail('not_ui_uri', 'mcp_read_resource: uri must use the ui:// scheme')
  const client = owner.connections().find(connection => connection.name === serverName)
  const name = sanitizeMcpText(serverName)
  if (!client) {
    if (owner.isKnownMcpServer(serverName)) fail('not_connected', `MCP server ${name} is not connected`)
    fail('server_not_found', `Server not found: ${name}`)
  }
  if (policyBlock(serverName, client.config)) fail('policy_blocked', `MCP server ${name} is blocked by enterprise managed policy`)
  if (client.type === 'disabled' || isMcpServerDisabled(serverName)) fail('disabled', `MCP server ${name} is disabled — enable it (mcp_toggle) before reading`)
  if (client.config.scope === 'project' && getProjectMcpServerStatus(serverName) !== 'approved') {
    fail('approval_required', `MCP server ${name} is not approved for this project — approve it in /mcp before reading`)
  }
  if (client.type !== 'connected') fail('not_connected', `MCP server ${name} is not connected (status: ${sanitizeMcpText(client.type)})`)
  if (client.config.type === 'sdk') fail('sdk_server', 'mcp_read_resource does not support SDK MCP servers: the caller hosts them and can read them directly')
  let response
  try {
    owner.signal?.throwIfAborted()
    const options = {timeout: resourceReadTimeoutMs(), ...(owner.signal ? {signal: owner.signal} : {})}
    if (owner.readResourceRaw) {
      const live = 'v2Client' in client ? client : await ensureConnectedClient(client)
      response = await owner.readResourceRaw(live, uri, options)
    } else {
      // The service owns SDK-generation-specific signatures and V2 cache bypass.
      response = await readMcpResourceUnified(client, uri, options)
    }
  } catch (error) {
    fail('read_failed', sanitizeMcpText(`mcp_read_resource: ${error instanceof Error ? error.message : String(error)}`))
  }
  const contents = response.contents.map(item => ({uri: item.uri, mimeType: item.mimeType,
    text: 'text' in item ? item.text : undefined, blob: 'blob' in item ? item.blob : undefined, _meta: projectMeta(item._meta)}))
  if (JSON.stringify(contents).length > MAX_RESOURCE_CHARACTERS) {
    fail('too_large', `mcp_read_resource: the resource exceeds the ${MAX_RESOURCE_CHARACTERS}-character limit`)
  }
  return {contents}
}
