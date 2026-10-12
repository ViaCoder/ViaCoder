import type {
  McpRuntimeConfigScope287,
  MCPServerConnection,
  McpClaudeAIProxyServerConfig,
  McpHTTPServerConfig,
  McpSSEServerConfig,
  McpStdioServerConfig,
} from '../../services/mcp/types.js'

// MCPSettings and ManagePlugins construct these display records. Keep the
// transport correlated with its config, independently of connection status.
type ServerInfoBase = {
  name: string
  client: MCPServerConnection
  scope: McpRuntimeConfigScope287
}

export type StdioServerInfo = ServerInfoBase & {
  transport: 'stdio'
  config: McpStdioServerConfig
}

export type SSEServerInfo = ServerInfoBase & {
  transport: 'sse'
  config: McpSSEServerConfig
  // ManagePlugins explicitly supplies undefined before auth status is known.
  isAuthenticated: boolean | undefined
}

export type HTTPServerInfo = ServerInfoBase & {
  transport: 'http'
  config: McpHTTPServerConfig
  isAuthenticated: boolean | undefined
}

export type ClaudeAIServerInfo = ServerInfoBase & {
  transport: 'claudeai-proxy'
  config: McpClaudeAIProxyServerConfig
  isAuthenticated: boolean | undefined
}

export type ServerInfo =
  | StdioServerInfo
  | SSEServerInfo
  | HTTPServerInfo
  | ClaudeAIServerInfo

// extractAgentMcpServers emits exactly these four transports. The absent
// endpoint field remains readable by the menu's conditional rendering, but
// cannot be supplied with an incompatible transport.
export type AgentMcpServerInfo = {
  name: string
  sourceAgents: string[]
  // The menu reads this status, but extraction does not query credentials.
  isAuthenticated?: boolean
} & (
  | { transport: 'stdio'; command: string; url?: never; needsAuth: false }
  | { transport: 'sse' | 'http'; url: string; command?: never; needsAuth: true }
  | { transport: 'ws'; url: string; command?: never; needsAuth: false }
)

// Navigation states and payloads come from MCPSettings' source-map source.
export type MCPViewState =
  | { type: 'list'; defaultTab?: 'Claude Code' | 'claude.ai' | 'Agents' }
  | { type: 'server-menu'; server: ServerInfo }
  | { type: 'server-tools'; server: ServerInfo }
  | { type: 'server-tool-detail'; server: ServerInfo; toolIndex: number }
  | { type: 'agent-server-menu'; agentServer: AgentMcpServerInfo }
