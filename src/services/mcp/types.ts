import type { Client } from '@modelcontextprotocol/sdk/client/index.js'
import type { McpV2Client } from '../../vendor/official-mcp-v2/index.mjs'
import type {
  Resource,
  ResourceTemplate,
  ServerCapabilities,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod/v4'
import { lazySchema } from '../../utils/lazySchema.js'

// Configuration schemas and types
export const ConfigScopeSchema = lazySchema(() =>
  z.enum([
    'local',
    'user',
    'project',
    'dynamic',
    'enterprise',
    'claudeai',
    'managed',
  ]),
)
export type ConfigScope = z.infer<ReturnType<typeof ConfigScopeSchema>>

export const TransportSchema = lazySchema(() =>
  z.enum(['stdio', 'sse', 'sse-ide', 'http', 'ws', 'sdk']),
)
export type Transport = z.infer<ReturnType<typeof TransportSchema>>

export const McpStdioServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('stdio').optional(), // Optional for backwards compatibility
    command: z.string().min(1, 'Command cannot be empty'),
    args: z.array(z.string()).default([]),
    env: z.record(z.string(), z.string()).optional(),
  }),
)

// Cross-App Access (XAA / SEP-990): just a per-server flag. IdP connection
// details (issuer, clientId, callbackPort) come from settings.xaaIdp — configured
// once, shared across all XAA-enabled servers. clientId/clientSecret (parent
// oauth config + keychain slot) are for the MCP server's AS.
const McpXaaConfigSchema = lazySchema(() => z.boolean())

const McpOAuthConfigSchema = lazySchema(() =>
  z.object({
    clientId: z.string().optional(),
    callbackPort: z.number().int().positive().optional(),
    authServerMetadataUrl: z
      .string()
      .url()
      .startsWith('https://', {
        message: 'authServerMetadataUrl must use https://',
      })
      .optional(),
    xaa: McpXaaConfigSchema().optional(),
  }),
)

export const McpSSEServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('sse'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
    headersHelper: z.string().optional(),
    oauth: McpOAuthConfigSchema().optional(),
  }),
)

// Internal-only server type for IDE extensions
export const McpSSEIDEServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('sse-ide'),
    url: z.string(),
    ideName: z.string(),
    ideRunningInWindows: z.boolean().optional(),
  }),
)

// Internal-only server type for IDE extensions
export const McpWebSocketIDEServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('ws-ide'),
    url: z.string(),
    ideName: z.string(),
    authToken: z.string().optional(),
    ideRunningInWindows: z.boolean().optional(),
  }),
)

export const McpHTTPServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('http'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
    headersHelper: z.string().optional(),
    oauth: McpOAuthConfigSchema().optional(),
  }),
)

export const McpWebSocketServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('ws'),
    url: z.string(),
    headers: z.record(z.string(), z.string()).optional(),
    headersHelper: z.string().optional(),
  }),
)

export const McpSdkServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('sdk'),
    name: z.string(),
  }),
)

// Config type for Claude.ai proxy servers
export const McpClaudeAIProxyServerConfigSchema = lazySchema(() =>
  z.object({
    type: z.literal('claudeai-proxy'),
    url: z.string(),
    id: z.string(),
  }),
)

export const McpServerConfigSchema = lazySchema(() =>
  z.union([
    McpStdioServerConfigSchema(),
    McpSSEServerConfigSchema(),
    McpSSEIDEServerConfigSchema(),
    McpWebSocketIDEServerConfigSchema(),
    McpHTTPServerConfigSchema(),
    McpWebSocketServerConfigSchema(),
    McpSdkServerConfigSchema(),
    McpClaudeAIProxyServerConfigSchema(),
  ]),
)

export type McpStdioServerConfig = z.infer<
  ReturnType<typeof McpStdioServerConfigSchema>
>
export type McpSSEServerConfig = z.infer<
  ReturnType<typeof McpSSEServerConfigSchema>
>
export type McpSSEIDEServerConfig = z.infer<
  ReturnType<typeof McpSSEIDEServerConfigSchema>
>
export type McpWebSocketIDEServerConfig = z.infer<
  ReturnType<typeof McpWebSocketIDEServerConfigSchema>
>
export type McpHTTPServerConfig = z.infer<
  ReturnType<typeof McpHTTPServerConfigSchema>
>
export type McpWebSocketServerConfig = z.infer<
  ReturnType<typeof McpWebSocketServerConfigSchema>
>
export type McpSdkServerConfig = z.infer<
  ReturnType<typeof McpSdkServerConfigSchema>
>
export type McpClaudeAIProxyServerConfig = z.infer<
  ReturnType<typeof McpClaudeAIProxyServerConfigSchema>
>
export type McpServerConfig = z.infer<ReturnType<typeof McpServerConfigSchema>>

export type McpRuntimeConfigScope287=ConfigScope|'agent'
export type AgentMcpServerConfig287=McpServerConfig & {
  scope:'agent'
  agentSource:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition['source']|'additionalDirectory'
}
// The original uPr stamps this discriminator only for temporary Agent configs.
// Persisted ConfigScope/CLI validation above never admit the internal branch.
export type ScopedMcpServerConfig = (
  (McpServerConfig & {scope:ConfigScope;agentSource?:never}) | AgentMcpServerConfig287
) & {
  declaredIn?: string
  // For plugin-provided servers: the providing plugin's LoadedPlugin.source
  // (e.g. 'slack@anthropic'). Stashed at config-build time so the channel
  // gate doesn't have to race AppState.plugins.enabled hydration.
  pluginSource?: string
}

export const McpJsonConfigSchema = lazySchema(() =>
  z.object({
    mcpServers: z.record(z.string(), McpServerConfigSchema()),
  }),
)

export type McpJsonConfig = z.infer<ReturnType<typeof McpJsonConfigSchema>>

// Server connection types
export type ConnectedMCPServer = {
  client: Client
  name: string
  type: 'connected'
  capabilities: ServerCapabilities
  serverInfo?: {
    name: string
    version: string
  }
  instructions?: string
  config: ScopedMcpServerConfig
  cleanup: () => Promise<void>
}

// Kept separate from ConnectedMCPServer: the V2 client's request/callTool
// signatures and modern wire schemas are not the npm SDK V1 signatures.
export type ConnectedMCPServerV2 = {
  generation: 'v2'
  v2Client: McpV2Client
  name: string
  type: 'connected'
  capabilities: Record<string, unknown>
  serverInfo?: { name: string; version: string }
  instructions?: string
  negotiatedProtocolVersion?:string
  protocolEra?:'modern'|'legacy'
  config: ScopedMcpServerConfig
  cleanup: () => Promise<void>
  isClosed: () => boolean
  /** Direct capability supplied by its actual lifecycle/cache owner. */
  ensureConnectedClient287?: (options?: import('./officialConnected287/native.js').EnsureMcpOptions287) => Promise<ConnectedMCPServerV2 | NeedsAuthMCPServer>
}

export type ConnectedMcpResourceServer = ConnectedMCPServer | ConnectedMCPServerV2
export type ConnectedMcpServer = ConnectedMcpResourceServer

// React's legacy client list carries status only for a V2 connection. The
// actual SDK instance is kept in mcp.v2Clients, never assigned to `.client`.
export type V2ConnectedMCPServerStatus = {
  name: string
  type: 'v2-connected'
  generation: 'v2'
  capabilities: Record<string, unknown>
  serverInfo?: { name: string; version: string }
  instructions?: string
  config: ScopedMcpServerConfig
}

export type FailedMCPServer = {
  name: string
  type: 'failed'
  config: ScopedMcpServerConfig
  error?: string
  errorCode?: string
}

export type NeedsAuthMCPServer = {
  name: string
  type: 'needs-auth'
  config: ScopedMcpServerConfig
}

export type CachedMCPServer = {
 name:string;type:'cached';config:ScopedMcpServerConfig;capabilities:Record<string,unknown>;cacheSavedAt:number;serverInfo?:{name:string;version:string};
 ensureConnectedClient287?:ConnectedMCPServerV2['ensureConnectedClient287'];
 mcpLifecycle287?:import('./v2Lifecycle.js').McpV2Lifecycle;
}

export type PendingMCPServer = {
  name: string
  type: 'pending'
  config: ScopedMcpServerConfig
  ensureConnectedClient287?:ConnectedMCPServerV2['ensureConnectedClient287'];
  mcpLifecycle287?:import('./v2Lifecycle.js').McpV2Lifecycle;
  reconnectAttempt?: number
  maxReconnectAttempts?: number
}

export type DisabledMCPServer = {
  name: string
  type: 'disabled'
  config: ScopedMcpServerConfig
}

export type MCPServerConnection =
  | ConnectedMCPServer
  | V2ConnectedMCPServerStatus
  | FailedMCPServer
  | NeedsAuthMCPServer
  | PendingMCPServer
  | DisabledMCPServer
  | CachedMCPServer

export function isMcpConnectedStatus(client: Pick<MCPServerConnection, 'type'>): boolean {
  return client.type === 'connected' || client.type === 'v2-connected'
}

// Resource types
export type ServerResource = Resource & { server: string }
// Same original tat wire template with gn's producing-server tag.
export type ServerResourceTemplate = ResourceTemplate & { server: string }

// MCP CLI State types
export interface SerializedTool {
  name: string
  description: string
  inputJSONSchema?: {
    [x: string]: unknown
    type: 'object'
    properties?: {
      [x: string]: unknown
    }
  }
  isMcp?: boolean
  originalToolName?: string // Original unnormalized tool name from MCP server
}

export interface SerializedClient {
  name: string
  type: 'connected' | 'v2-connected' | 'failed' | 'needs-auth' | 'pending' | 'disabled'
  capabilities?: ServerCapabilities
}

export interface MCPCliState {
  clients: SerializedClient[]
  configs: Record<string, ScopedMcpServerConfig>
  tools: SerializedTool[]
  resources: Record<string, ServerResource[]>
  normalizedNames?: Record<string, string> // Maps normalized names to original names
}
