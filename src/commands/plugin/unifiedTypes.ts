import type { ConfigScope, MCPServerConnection } from '../../services/mcp/types.js'
import type { LoadedPlugin, PluginError } from '../../types/plugin.js'
import type { PersistablePluginScope } from '../../utils/plugins/pluginIdentifier.js'

/** Four producer branches in ManagePlugins' embedded 2.1.283 source map;
 * UnifiedInstalledCell narrows on the same discriminant. No runtime imports. */
export type UnifiedInstalledItem = { id: string; name: string } & (
  | {
      type: 'plugin'
      description?: string
      marketplace: string
      scope: PersistablePluginScope | 'builtin'
      isEnabled: boolean
      errorCount: number
      errors: PluginError[]
      plugin: LoadedPlugin
      pendingEnable?: boolean
      pendingUpdate?: boolean
      pendingToggle?: 'will-enable' | 'will-disable'
    }
  | {
      type: 'failed-plugin'
      marketplace: string
      scope: PersistablePluginScope
      errorCount: number
      errors: PluginError[]
    }
  | {
      type: 'mcp'
      description?: undefined
      scope: ConfigScope
      status: 'connected' | 'disabled' | 'pending' | 'needs-auth' | 'failed'
      client: MCPServerConnection
      indented?: boolean
    }
  | {
      type: 'flagged-plugin'
      marketplace: string
      scope: 'flagged'
      reason: string
      text: string
      flaggedAt: string
    }
)
