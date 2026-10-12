import type { Command } from '../../commands.js'
import type { Tool } from '../../Tool.js'
import { createMcpAuthTool } from '../../tools/McpAuthTool/McpAuthTool.js'
import { errorMessage } from '../../utils/errors.js'
import { isMcpServerDisabled } from './config.js'
import type { ConnectedMCPServerV2, MCPServerConnection, NeedsAuthMCPServer, ScopedMcpServerConfig, ServerResource, ServerResourceTemplate } from './types.js'
import { resolveMcpSdkGeneration, type McpSdkGeneration, type McpV2Lifecycle } from './v2Lifecycle.js'

/** Production selection boundary. The V1 arm invokes the existing complete
 * service path; the V2 arm invokes the recovered client and its own lifecycle.
 * There is no V2→V1 SDK cast or silent fallback after a V2 failure. The app
 * owner must bind the returned V2 connection to generation-aware consumers. */
export type SelectedMcpDiscovery = {attemptEpoch?:number;replaceOnly?:boolean} & (
  | { generation: 'v1'; client: MCPServerConnection; tools: Tool[]; commands: Command[]; resources?: ServerResource[]; resourceTemplates?: ServerResourceTemplate[] }
  | { generation: 'v2'; client: ConnectedMCPServerV2 | Exclude<MCPServerConnection, { type: 'connected' | 'v2-connected' }>; tools: Tool[]; commands: Command[]; resources?: ServerResource[]; resourceTemplates?: ServerResourceTemplate[] })

export type SelectMcpDiscoveryOptions = {
  signal?: AbortSignal
  /** Injection for offline selector tests; production uses the latched official gate. */
  resolveGeneration?: () => McpSdkGeneration
}

export async function discoverSelectedMcpServer(
  name: string,
  config: ScopedMcpServerConfig,
  v2Lifecycle: McpV2Lifecycle,
  options: SelectMcpDiscoveryOptions = {},
): Promise<SelectedMcpDiscovery> {
  options.signal?.throwIfAborted()
  const generation = (options.resolveGeneration ?? resolveMcpSdkGeneration)()
  if (generation === 'v1') {
    const { getMcpToolsCommandsAndResources } = await import('./client.js')
    let result: { client: MCPServerConnection; tools: Tool[]; commands: Command[]; resources?: ServerResource[]; resourceTemplates?: ServerResourceTemplate[] } | undefined
    await getMcpToolsCommandsAndResources(value => { result = value }, { [name]: config })
    options.signal?.throwIfAborted()
    if (!result) throw new Error(`MCP V1 discovery did not report server "${name}"`)
    return { generation, ...result }
  }

  if (isMcpServerDisabled(name))
    return { generation, client: { name, config, type: 'disabled' }, tools: [], commands: [] }
  if (!('command' in config) && !['http', 'sse', 'sse-ide', 'ws', 'ws-ide', 'claudeai-proxy'].includes(config.type))
    return { generation, client: { name, config, type: 'failed', error: `MCP V2 transport ${config.type} is not bound` }, tools: [], commands: [] }

  let connected: ConnectedMCPServerV2 | undefined
  try {
    const state = await v2Lifecycle.connect(name, config, { signal: options.signal })
    if (state.type === 'needs-auth') {
      const needsAuth: NeedsAuthMCPServer = state
      return { generation, client: needsAuth, tools: [createMcpAuthTool(name, config)], commands: [] }
    }
    connected = state
    if (config.type === 'claudeai-proxy') {
      const { markClaudeAiMcpConnected } = await import('./claudeai.js')
      markClaudeAiMcpConnected(name)
    }
    const projection = await v2Lifecycle.discover(state, { signal: options.signal })
    options.signal?.throwIfAborted()
    return { generation, client: projection.connection, tools: projection.tools, commands: projection.commands,
      resources: projection.resources.length ? projection.resources : undefined }
  } catch (error) {
    if (connected && !options.signal?.aborted) await v2Lifecycle.invalidate(name)
    options.signal?.throwIfAborted()
    return { generation, client: { name, config, type: 'failed', error: errorMessage(error) }, tools: [], commands: [] }
  }
}
