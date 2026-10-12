/**
 * Core plugin operations (install, uninstall, enable, disable, update)
 *
 * This module provides pure library functions that can be used by both:
 * - CLI commands (`claude plugin install/uninstall/enable/disable/update`)
 * - Interactive UI (ManagePlugins.tsx)
 *
 * Functions in this module:
 * - Do NOT call process.exit()
 * - Do NOT write to console
 * - Return result objects indicating success/failure with messages
 * - Can throw errors for unexpected failures
 */
import { dirname, join } from 'path'
import { getOriginalCwd } from '../../bootstrap/state.js'
import { isBuiltinPluginId } from '../../plugins/builtinPlugins.js'
import type { LoadedPlugin, PluginManifest } from '../../types/plugin.js'
import { isENOENT, toError } from '../../utils/errors.js'
import { getFsImplementation } from '../../utils/fsOperations.js'
import { logError } from '../../utils/log.js'
import {
  clearAllCaches,
  markPluginVersionOrphaned,
} from '../../utils/plugins/cacheUtils.js'
import {
  findReverseDependents,
  formatReverseDependentsSuffix,
} from '../../utils/plugins/dependencyResolver.js'
import {
  loadInstalledPluginsFromDisk,
  loadInstalledPluginsV2,
  removePluginInstallation,
  updateInstallationPathOnDisk,
} from '../../utils/plugins/installedPluginsManager.js'
import {
  getMarketplace,
  getPluginById,
  loadKnownMarketplacesConfig,
} from '../../utils/plugins/marketplaceManager.js'
import { deletePluginDataDir } from '../../utils/plugins/pluginDirectories.js'
import {
  parsePluginIdentifier,
  scopeToSettingSource,
} from '../../utils/plugins/pluginIdentifier.js'
import {
  formatResolutionError,
  installResolvedPlugin,
} from '../../utils/plugins/pluginInstallationHelpers.js'
import {
  cachePlugin,
  copyPluginToVersionedCache,
  getVersionedCachePath,
  getVersionedZipCachePath,
  loadAllPlugins,
  loadPluginManifest,
} from '../../utils/plugins/pluginLoader.js'
import { deletePluginOptions } from '../../utils/plugins/pluginOptionsStorage.js'
import { isPluginBlockedByPolicy } from '../../utils/plugins/pluginPolicy.js'
import { getPluginEditableScopes } from '../../utils/plugins/pluginStartupCheck.js'
import { calculatePluginVersion } from '../../utils/plugins/pluginVersioning.js'
import type {
  PluginMarketplaceEntry,
  PluginScope,
} from '../../utils/plugins/schemas.js'
import {
  getSettingsForSource,
  updateSettingsForSource,
} from '../../utils/settings/settings.js'
import { plural } from '../../utils/stringUtils.js'

/** Valid installable scopes (excludes 'managed' which can only be installed from managed-settings.json) */
export const VALID_INSTALLABLE_SCOPES = ['user', 'project', 'local'] as const

/** Installation scope type derived from VALID_INSTALLABLE_SCOPES */
export type InstallableScope = (typeof VALID_INSTALLABLE_SCOPES)[number]

/** Valid scopes for update operations (includes 'managed' since managed plugins can be updated) */
export const VALID_UPDATE_SCOPES: readonly PluginScope[] = [
  'user',
  'project',
  'local',
  'managed',
] as const

/**
 * Assert that a scope is a valid installable scope at runtime
 * @param scope The scope to validate
 * @throws Error if scope is not a valid installable scope
 */
export function assertInstallableScope(
  scope: string,
): asserts scope is InstallableScope {
  if (!VALID_INSTALLABLE_SCOPES.includes(scope as InstallableScope)) {
    throw new Error(
      `Invalid scope "${scope}". Must be one of: ${VALID_INSTALLABLE_SCOPES.join(', ')}`,
    )
  }
}

/**
 * Type guard to check if a scope is an installable scope (not 'managed').
 * Use this for type narrowing in conditional blocks.
 */
export function isInstallableScope(
  scope: PluginScope,
): scope is InstallableScope {
  return VALID_INSTALLABLE_SCOPES.includes(scope as InstallableScope)
}

/**
 * Get the project path for scopes that are project-specific.
 * Returns the original cwd for 'project' and 'local' scopes, undefined otherwise.
 */
export function getProjectPathForScope(scope: PluginScope): string | undefined {
  return scope === 'project' || scope === 'local' ? getOriginalCwd() : undefined
}

/**
 * Is this plugin enabled (value === true) in .claude/settings.json?
 *
 * Distinct from V2 installed_plugins.json scope: that file tracks where a
 * plugin was *installed from*, but the same plugin can also be enabled at
 * project scope via settings. The uninstall UI needs to check THIS, because
 * a user-scope install with a project-scope enablement means "uninstall"
 * would succeed at removing the user install while leaving the project
 * enablement active — the plugin keeps running.
 */
export function isPluginEnabledAtProjectScope(pluginId: string): boolean {
  return (
    getSettingsForSource('projectSettings')?.enabledPlugins?.[pluginId] === true
  )
}

// ============================================================================
// Result Types
// ============================================================================

/**
 * Result of a plugin operation
 */
export type PluginOperationResult = {
  success: boolean
  message: string
  pluginId?: string
  pluginName?: string
  scope?: PluginScope
  /** Plugins that declare this plugin as a dependency (warning on uninstall/disable) */
  reverseDependents?: string[]
}

/**
 * Result of a plugin update operation
 */
export type PluginUpdateResult = {
  success: boolean
  message: string
  pluginId?: string
  newVersion?: string
  oldVersion?: string
  alreadyUpToDate?: boolean
  scope?: PluginScope
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Search all editable settings scopes for a plugin ID matching the given input.
 *
 * If `plugin` contains `@`, it's treated as a full pluginId and returned if
 * found in any scope. If `plugin` is a bare name, searches for any key
 * starting with `{plugin}@` in any scope.
 *
 * Returns the most specific scope where the plugin is mentioned (regardless
 * of enabled/disabled state) plus the resolved full pluginId.
 *
 * Precedence: local > project > user (most specific wins).
 */
function findPluginInSettings(plugin: string): {
  pluginId: string
  scope: InstallableScope
} | null {
  const hasMarketplace = plugin.includes('@')
  // Most specific first — first match wins
  const searchOrder: InstallableScope[] = ['local', 'project', 'user']

  for (const scope of searchOrder) {
    const enabledPlugins = getSettingsForSource(
      scopeToSettingSource(scope),
    )?.enabledPlugins
    if (!enabledPlugins) continue

    for (const key of Object.keys(enabledPlugins)) {
      if (hasMarketplace ? key === plugin : key.startsWith(`${plugin}@`)) {
        return { pluginId: key, scope }
      }
    }
  }
  return null
}

/**
 * Helper function to find a plugin from loaded plugins
 */
function findPluginByIdentifier(
  plugin: string,
  plugins: LoadedPlugin[],
): LoadedPlugin | undefined {
  const { name, marketplace } = parsePluginIdentifier(plugin)

  return plugins.find(p => {
    // Check exact name match
    if (p.name === plugin || p.name === name) return true

    // If marketplace specified, check if it matches the source
    if (marketplace && p.source) {
      return p.name === name && p.source.includes(`@${marketplace}`)
    }

    return false
  })
}

/**
 * Resolve a plugin ID from V2 installed plugins data for a plugin that may
 * have been delisted from its marketplace. Returns null if the plugin is not
 * found in V2 data.
 */
function resolveDelistedPluginId(
  plugin: string,
): { pluginId: string; pluginName: string } | null {
  const { name } = parsePluginIdentifier(plugin)
  const installedData = loadInstalledPluginsV2()

  // Try exact match first, then search by name
  if (installedData.plugins[plugin]?.length) {
    return { pluginId: plugin, pluginName: name }
  }

  const matchingKey = Object.keys(installedData.plugins).find(key => {
    const { name: keyName } = parsePluginIdentifier(key)
    return keyName === name && (installedData.plugins[key]?.length ?? 0) > 0
  })

  if (matchingKey) {
    return { pluginId: matchingKey, pluginName: name }
  }

  return null
}

/**
 * Get the most relevant installation for a plugin from V2 data.
 * For project/local scoped plugins, prioritizes installations matching the current project.
 * Priority order: local (matching project) > project (matching project) > user > first available
 */
export function getPluginInstallationFromV2(pluginId: string): {
  scope: PluginScope
  projectPath?: string
} {
  const installedData = loadInstalledPluginsV2()
  const installations = installedData.plugins[pluginId]

  if (!installations || installations.length === 0) {
    return { scope: 'user' }
  }

  const currentProjectPath = getOriginalCwd()

  // Find installations by priority: local > project > user > managed
  const localInstall = installations.find(
    inst => inst.scope === 'local' && inst.projectPath === currentProjectPath,
  )
  if (localInstall) {
    return { scope: localInstall.scope, projectPath: localInstall.projectPath }
  }

  const projectInstall = installations.find(
    inst => inst.scope === 'project' && inst.projectPath === currentProjectPath,
  )
  if (projectInstall) {
    return {
      scope: projectInstall.scope,
      projectPath: projectInstall.projectPath,
    }
  }

  const userInstall = installations.find(inst => inst.scope === 'user')
  if (userInstall) {
    return { scope: userInstall.scope }
  }

  // Fall back to first installation (could be managed)
  return {
    scope: installations[0]!.scope,
    projectPath: installations[0]!.projectPath,
  }
}

// ============================================================================
// Core Operations
// ============================================================================

/**
 * Install a plugin (settings-first).
 *
 * Order of operations:
 *   1. Search materialized marketplaces for the plugin
 *   2. Write settings (THE ACTION — declares intent)
 *   3. Cache plugin + record version hint (materialization)
 *
 * Marketplace reconciliation is NOT this function's responsibility — startup
 * reconcile handles declared-but-not-materialized marketplaces. If the
 * marketplace isn't found, "not found" is the correct error.
 *
 * @param plugin Plugin identifier (name or plugin@marketplace)
 * @param scope Installation scope: user, project, or local (defaults to 'user')
 * @returns Result indicating success/failure
 */
export async function installPluginOp(plugin:string,scope:InstallableScope='user',options:import('../../utils/plugins/ordinaryPlugin287.js').OrdinaryPluginInstallOptions287={},storage?:unknown):Promise<PluginOperationResult>{
 const {installOrdinaryPlugin287}=await import('../../utils/plugins/ordinaryPlugin287.js')
 return installOrdinaryPlugin287<PluginOperationResult>(plugin,scope,options,storage)
}

/**
 * Uninstall a plugin
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Uninstall from scope: user, project, or local (defaults to 'user')
 * @returns Result indicating success/failure
 */
export async function uninstallPluginOp(
  plugin: string,
  scope: InstallableScope = 'user',
  deleteDataDir = true,
): Promise<PluginOperationResult> {
  // Validate scope at runtime for early error detection
  assertInstallableScope(scope)

  const { enabled, disabled } = await loadAllPlugins()
  const allPlugins = [...enabled, ...disabled]

  // Find the plugin
  const foundPlugin = findPluginByIdentifier(plugin, allPlugins)

  const settingSource = scopeToSettingSource(scope)
  const settings = getSettingsForSource(settingSource)

  let pluginId: string
  let pluginName: string

  if (foundPlugin) {
    // Find the matching settings key for this plugin (may differ from `plugin`
    // if user gave short name but settings has plugin@marketplace)
    pluginId =
      Object.keys(settings?.enabledPlugins ?? {}).find(
        k =>
          k === plugin ||
          k === foundPlugin.name ||
          k.startsWith(`${foundPlugin.name}@`),
      ) ?? (plugin.includes('@') ? plugin : foundPlugin.name)
    pluginName = foundPlugin.name
  } else {
    // Plugin not found via marketplace lookup — it may have been delisted.
    // Fall back to installed_plugins.json (V2) which tracks installations
    // independently of marketplace state.
    const resolved = resolveDelistedPluginId(plugin)
    if (!resolved) {
      return {
        success: false,
        message: `Plugin "${plugin}" not found in installed plugins`,
      }
    }
    pluginId = resolved.pluginId
    pluginName = resolved.pluginName
  }

  // Check if the plugin is installed in this scope (in V2 file)
  const projectPath = getProjectPathForScope(scope)
  const installedData = loadInstalledPluginsV2()
  const installations = installedData.plugins[pluginId]
  const scopeInstallation = installations?.find(
    i => i.scope === scope && i.projectPath === projectPath,
  )

  if (!scopeInstallation) {
    // Try to find where the plugin is actually installed to provide a helpful error
    const { scope: actualScope } = getPluginInstallationFromV2(pluginId)
    if (actualScope !== scope && installations && installations.length > 0) {
      // Project scope is special: .claude/settings.json is shared with the team.
      // Point users at the local-override escape hatch instead of --scope project.
      if (actualScope === 'project') {
        return {
          success: false,
          message: `Plugin "${plugin}" is enabled at project scope (.claude/settings.json, shared with your team). To disable just for you: claude plugin disable ${plugin} --scope local`,
        }
      }
      return {
        success: false,
        message: `Plugin "${plugin}" is installed in ${actualScope} scope, not ${scope}. Use --scope ${actualScope} to uninstall.`,
      }
    }
    return {
      success: false,
      message: `Plugin "${plugin}" is not installed in ${scope} scope. Use --scope to specify the correct scope.`,
    }
  }

  const installPath = scopeInstallation.installPath

  // Remove the plugin from the appropriate settings file (delete key entirely)
  // Use undefined to signal deletion via mergeWith in updateSettingsForSource
  const newEnabledPlugins: Record<string, boolean | string[] | undefined> = {
    ...settings?.enabledPlugins,
  }
  newEnabledPlugins[pluginId] = undefined
  updateSettingsForSource(settingSource, {
    enabledPlugins: newEnabledPlugins,
  })

  clearAllCaches()

  // Remove from installed_plugins_v2.json for this scope
  removePluginInstallation(pluginId, scope, projectPath)

  const updatedData = loadInstalledPluginsV2()
  const remainingInstallations = updatedData.plugins[pluginId]
  const isLastScope =
    !remainingInstallations || remainingInstallations.length === 0
  if (isLastScope && installPath) {
    await markPluginVersionOrphaned(installPath)
  }
  // Separate from the `&& installPath` guard above — deletePluginOptions only
  // needs pluginId, not installPath. Last scope removed → wipe stored options
  // and secrets. Before this, uninstalling left orphaned entries in
  // settings.pluginConfigs (including the legacy ungated mcpServers sub-key
  // from the MCPB Configure flow) and keychain pluginSecrets forever. No
  // feature gate: deletePluginOptions no-ops when nothing is stored, and
  // pluginConfigs.mcpServers is written ungated so its cleanup must run
  // ungated too.
  if (isLastScope) {
    await deletePluginOptions(pluginId)
    if (deleteDataDir) {
      await deletePluginDataDir(pluginId)
    }
  }

  // Warn (don't block) if other enabled plugins depend on this one.
  // Blocking creates tombstones — can't tear down a graph with a delisted
  // plugin. Load-time verifyAndDemote catches the fallout.
  const reverseDependents = findReverseDependents(pluginId, allPlugins)
  const depWarn = formatReverseDependentsSuffix(reverseDependents)

  return {
    success: true,
    message: `Successfully uninstalled plugin: ${pluginName} (scope: ${scope})${depWarn}`,
    pluginId,
    pluginName,
    scope,
    reverseDependents:
      reverseDependents.length > 0 ? reverseDependents : undefined,
  }
}

/**
 * Set plugin enabled/disabled status (settings-first).
 *
 * Resolves the plugin ID and scope from settings — does NOT pre-gate on
 * installed_plugins.json. Settings declares intent; if the plugin isn't
 * cached yet, the next load will cache it.
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param enabled true to enable, false to disable
 * @param scope Optional scope. If not provided, auto-detects the most specific
 *   scope where the plugin is mentioned in settings.
 * @returns Result indicating success/failure
 */
export async function setPluginEnabledOp(
  plugin: string,
  enabled: boolean,
  scope?: InstallableScope,
): Promise<PluginOperationResult> {
  const operation = enabled ? 'enable' : 'disable'

  // Built-in plugins: always use user-scope settings, bypass the normal
  // scope-resolution + installed_plugins lookup (they're not installed).
  if (isBuiltinPluginId(plugin)) {
    const { error } = updateSettingsForSource('userSettings', {
      enabledPlugins: {
        ...getSettingsForSource('userSettings')?.enabledPlugins,
        [plugin]: enabled,
      },
    })
    if (error) {
      return {
        success: false,
        message: `Failed to ${operation} built-in plugin: ${error.message}`,
      }
    }
    clearAllCaches()
    const { name: pluginName } = parsePluginIdentifier(plugin)
    return {
      success: true,
      message: `Successfully ${operation}d built-in plugin: ${pluginName}`,
      pluginId: plugin,
      pluginName,
      scope: 'user',
    }
  }

  if (scope) {
    assertInstallableScope(scope)
  }

  // ── Resolve pluginId and scope from settings ──
  // Search across editable scopes for any mention (enabled or disabled) of
  // this plugin. Does NOT pre-gate on installed_plugins.json.
  let pluginId: string
  let resolvedScope: InstallableScope

  const found = findPluginInSettings(plugin)

  if (scope) {
    // Explicit scope: use it. Resolve pluginId from settings if possible,
    // otherwise require a full plugin@marketplace identifier.
    resolvedScope = scope
    if (found) {
      pluginId = found.pluginId
    } else if (plugin.includes('@')) {
      pluginId = plugin
    } else {
      return {
        success: false,
        message: `Plugin "${plugin}" not found in settings. Use plugin@marketplace format.`,
      }
    }
  } else if (found) {
    // Auto-detect scope: use the most specific scope where the plugin is
    // mentioned in settings.
    pluginId = found.pluginId
    resolvedScope = found.scope
  } else if (plugin.includes('@')) {
    // Not in any settings scope, but full pluginId given — default to user
    // scope (matches install default). This allows enabling a plugin that
    // was cached but never declared.
    pluginId = plugin
    resolvedScope = 'user'
  } else {
    return {
      success: false,
      message: `Plugin "${plugin}" not found in any editable settings scope. Use plugin@marketplace format.`,
    }
  }

  // ── Policy guard ──
  // Org-blocked plugins cannot be enabled at any scope. Check after pluginId
  // is resolved so we catch both full identifiers and bare-name lookups.
  if (enabled && isPluginBlockedByPolicy(pluginId)) {
    return {
      success: false,
      message: `Plugin "${pluginId}" is blocked by your organization's policy and cannot be enabled`,
    }
  }

  const settingSource = scopeToSettingSource(resolvedScope)
  const scopeSettingsValue =
    getSettingsForSource(settingSource)?.enabledPlugins?.[pluginId]

  // ── Cross-scope hint: explicit scope given but plugin is elsewhere ──
  // If the plugin is absent from the requested scope but present at a
  // different scope, guide the user to the right --scope — UNLESS they're
  // writing to a higher-precedence scope to override a lower one
  // (e.g. `disable --scope local` to override a project-enabled plugin
  // without touching the shared .claude/settings.json).
  const SCOPE_PRECEDENCE: Record<InstallableScope, number> = {
    user: 0,
    project: 1,
    local: 2,
  }
  const isOverride =
    scope && found && SCOPE_PRECEDENCE[scope] > SCOPE_PRECEDENCE[found.scope]
  if (
    scope &&
    scopeSettingsValue === undefined &&
    found &&
    found.scope !== scope &&
    !isOverride
  ) {
    return {
      success: false,
      message: `Plugin "${plugin}" is installed at ${found.scope} scope, not ${scope}. Use --scope ${found.scope} or omit --scope to auto-detect.`,
    }
  }

  // ── Check current state (for idempotency messaging) ──
  // When explicit scope given: check that scope's settings value directly
  // (merged state can be wrong if plugin is enabled elsewhere but disabled here).
  // When auto-detected: use merged effective state.
  // When overriding a lower scope: check merged state — scopeSettingsValue is
  // undefined (plugin not in this scope yet), which would read as "already
  // disabled", but the whole point of the override is to write an explicit
  // `false` that masks the lower scope's `true`.
  const isCurrentlyEnabled =
    scope && !isOverride
      ? scopeSettingsValue === true
      : getPluginEditableScopes().has(pluginId)
  if (enabled === isCurrentlyEnabled) {
    return {
      success: false,
      message: `Plugin "${plugin}" is already ${enabled ? 'enabled' : 'disabled'}${scope ? ` at ${scope} scope` : ''}`,
    }
  }

  // On disable: capture reverse dependents from the PRE-disable snapshot,
  // before we write settings and clear the memoized plugin cache.
  let reverseDependents: string[] | undefined
  if (!enabled) {
    const { enabled: loadedEnabled, disabled } = await loadAllPlugins()
    const rdeps = findReverseDependents(pluginId, [
      ...loadedEnabled,
      ...disabled,
    ])
    if (rdeps.length > 0) reverseDependents = rdeps
  }

  // ── ACTION: write settings ──
  const { error } = updateSettingsForSource(settingSource, {
    enabledPlugins: {
      ...getSettingsForSource(settingSource)?.enabledPlugins,
      [pluginId]: enabled,
    },
  })
  if (error) {
    return {
      success: false,
      message: `Failed to ${operation} plugin: ${error.message}`,
    }
  }

  clearAllCaches()

  const { name: pluginName } = parsePluginIdentifier(pluginId)
  const depWarn = formatReverseDependentsSuffix(reverseDependents)
  return {
    success: true,
    message: `Successfully ${operation}d plugin: ${pluginName} (scope: ${resolvedScope})${depWarn}`,
    pluginId,
    pluginName,
    scope: resolvedScope,
    reverseDependents,
  }
}

/**
 * Enable a plugin
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Optional scope. If not provided, finds the most specific scope for the current project.
 * @returns Result indicating success/failure
 */
export async function enablePluginOp(
  plugin: string,
  scope?: InstallableScope,
): Promise<PluginOperationResult> {
  return setPluginEnabledOp(plugin, true, scope)
}

/**
 * Disable a plugin
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Optional scope. If not provided, finds the most specific scope for the current project.
 * @returns Result indicating success/failure
 */
export async function disablePluginOp(
  plugin: string,
  scope?: InstallableScope,
): Promise<PluginOperationResult> {
  return setPluginEnabledOp(plugin, false, scope)
}

/**
 * Disable all enabled plugins
 *
 * @returns Result indicating success/failure with count of disabled plugins
 */
export async function disableAllPluginsOp(): Promise<PluginOperationResult> {
  const enabledPlugins = getPluginEditableScopes()

  if (enabledPlugins.size === 0) {
    return { success: true, message: 'No enabled plugins to disable' }
  }

  const disabled: string[] = []
  const errors: string[] = []

  for (const [pluginId] of enabledPlugins) {
    const result = await setPluginEnabledOp(pluginId, false)
    if (result.success) {
      disabled.push(pluginId)
    } else {
      errors.push(`${pluginId}: ${result.message}`)
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      message: `Disabled ${disabled.length} ${plural(disabled.length, 'plugin')}, ${errors.length} failed:\n${errors.join('\n')}`,
    }
  }

  return {
    success: true,
    message: `Disabled ${disabled.length} ${plural(disabled.length, 'plugin')}`,
  }
}

/**
 * Update a plugin to the latest version.
 *
 * This function performs a NON-INPLACE update:
 * 1. Gets the plugin info from the marketplace
 * 2. For remote plugins: downloads to temp dir and calculates version
 * 3. For local plugins: calculates version from marketplace source
 * 4. If version differs from currently installed, copies to new versioned cache directory
 * 5. Updates installation in V2 file (memory stays unchanged until restart)
 * 6. Cleans up old version if no longer referenced by any installation
 *
 * @param plugin Plugin name or plugin@marketplace identifier
 * @param scope Scope to update. Unlike install/uninstall/enable/disable, managed scope IS allowed.
 * @returns Result indicating success/failure with version info
 */
export async function updatePluginOp(
  plugin: string,
  scope: PluginScope,
  options: import('../../utils/plugins/ordinaryPlugin287.js').ExplicitPluginUpdateOptions287 = {},
  storage?: unknown,
): Promise<PluginUpdateResult> {
  const {updateOrdinaryPlugin287} = await import('../../utils/plugins/ordinaryPlugin287.js')
  const result = await updateOrdinaryPlugin287(plugin, scope, options, storage)
  return {
    ...result,
    success: result.outcome === 'updated' || result.outcome === 'up_to_date',
    alreadyUpToDate: result.outcome === 'up_to_date',
  }
}
