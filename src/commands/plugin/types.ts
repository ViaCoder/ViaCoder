/** Recovered from the embedded 2.1.283 PluginSettings/marketplace sources.
 * These are parent navigation states, not the per-panel detail states. */
export type ViewState =
  | { type: 'menu' }
  | { type: 'help' }
  | { type: 'validate'; path?: string }
  | { type: 'discover-plugins'; targetPlugin?: string; marketplace?: string; searchQuery?: string }
  | { type: 'browse-marketplace'; targetMarketplace: string; targetPlugin?: string }
  | {
      type: 'manage-plugins'
      targetPlugin?: string
      targetMarketplace?: string
      action?: 'enable' | 'disable' | 'uninstall' | 'update' | 'configure'
    }
  | { type: 'marketplace-list' }
  | { type: 'marketplace-menu' }
  | { type: 'add-marketplace'; initialValue?: string }
  | {
      type: 'manage-marketplaces'
      targetMarketplace?: string
      action?: 'remove' | 'update'
    }

export type PluginSettingsProps = {
  onComplete: import('../../types/command.js').LocalJSXCommandOnDone
  args?: string
  showMcpRedirectMessage?: boolean
  getSessionContext?: () => import('../../Tool.js').ToolUseContext
  commands?: import('../../types/command.js').Command[]
  getReloadCacheImpactOptions?: () => {
    model: string
    dynamicMcpConfig?: Record<string, import('../../services/mcp/types.js').ScopedMcpServerConfig>
  }
}
