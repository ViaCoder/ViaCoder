/**
 * LSP Plugin Recommendation Utility
 *
 * Scans installed marketplaces for LSP plugins and recommends plugins
 * based on file extensions, but ONLY when the LSP binary is already
 * installed on the system.
 *
 * Limitation: Can only detect LSP plugins that declare their servers
 * inline in the marketplace entry. Plugins with separate .lsp.json files
 * are not detectable until after installation.
 */

import { getGlobalConfig, saveGlobalConfig } from '../config.js'
import { logForDebugging } from '../debug.js'
/**
 * LSP plugin recommendation returned to the caller
 */
export type LspPluginRecommendation = {
  pluginId: string // "plugin-name@marketplace-name"
  pluginName: string // Human-readable plugin name
  marketplaceName: string // Marketplace name
  description?: string // Plugin description
  isOfficial: boolean // From official marketplace?
  extensions: string[] // File extensions this plugin supports
  command: string // LSP server command (e.g., "typescript-language-server")
}

// Maximum number of times user can ignore recommendations before we stop showing
const MAX_IGNORED_COUNT = 5

/**
 * Find matching LSP plugins for a file path.
 *
 * Returns recommendations for plugins that:
 * 1. Support the file's extension
 * 2. Have their LSP binary installed on the system
 * 3. Are not already installed
 * 4. Are not in the user's "never suggest" list
 *
 * Results are sorted with official marketplace plugins first.
 *
 * @param filePath - Path to the file to find LSP plugins for
 * @returns Array of matching plugin recommendations (empty if none or disabled)
 */
export async function getMatchingLspPlugins(filePath:string,storageV5?:unknown,host?:import('../../services/context/officialExecutionOwners287/native.js').ExecutionHost287):Promise<LspPluginRecommendation[]> {
 const {getMatchingLspRecommendations287}=await import('./pluginRecommendation287.js')
 return getMatchingLspRecommendations287(filePath,storageV5,host)
}

/**
 * Add a plugin to the "never suggest" list
 *
 * @param pluginId - Plugin ID to never suggest again
 */
export function addToNeverSuggest(pluginId: string): void {
  saveGlobalConfig(currentConfig => {
    const current = currentConfig.lspRecommendationNeverPlugins ?? []
    if (current.includes(pluginId)) {
      return currentConfig
    }
    return {
      ...currentConfig,
      lspRecommendationNeverPlugins: [...current, pluginId],
    }
  })
  logForDebugging(`[lspRecommendation] Added ${pluginId} to never suggest`)
}

/**
 * Increment the ignored recommendation count.
 * After MAX_IGNORED_COUNT ignores, recommendations are disabled.
 */
export function incrementIgnoredCount(): void {
  saveGlobalConfig(currentConfig => {
    const newCount = (currentConfig.lspRecommendationIgnoredCount ?? 0) + 1
    return {
      ...currentConfig,
      lspRecommendationIgnoredCount: newCount,
    }
  })
  logForDebugging('[lspRecommendation] Incremented ignored count')
}

/**
 * Check if LSP recommendations are disabled.
 * Disabled when:
 * - User explicitly disabled via config
 * - User has ignored MAX_IGNORED_COUNT recommendations
 */
export function isLspRecommendationsDisabled(): boolean {
  const config = getGlobalConfig()
  return (
    config.lspRecommendationDisabled === true ||
    (config.lspRecommendationIgnoredCount ?? 0) >= MAX_IGNORED_COUNT
  )
}

/**
 * Reset the ignored count (useful if user re-enables recommendations)
 */
export function resetIgnoredCount(): void {
  saveGlobalConfig(currentConfig => {
    const currentCount = currentConfig.lspRecommendationIgnoredCount ?? 0
    if (currentCount === 0) {
      return currentConfig
    }
    return {
      ...currentConfig,
      lspRecommendationIgnoredCount: 0,
    }
  })
  logForDebugging('[lspRecommendation] Reset ignored count')
}
