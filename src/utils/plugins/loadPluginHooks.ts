import memoize from 'lodash-es/memoize.js'
import {modsRegistryOwner287} from './modsRegistryOwner287.js'
import {retryModelSwitchHookRegistration287,invalidateHookRegistration287,convertRegisteredPluginMatchers287} from '../hooks/modelSwitch287/registration.js'
import {HOOK_EVENTS} from '../hooks/officialHookOutput287/events.js'
import type { HookEvent } from 'src/entrypoints/agentSdkTypes.js'
import {
  clearRegisteredPluginHooks,
  getRegisteredHooks,
  registerHookCallbacks,
} from '../../bootstrap/state.js'
import type { LoadedPlugin } from '../../types/plugin.js'
import {
  getSettings_DEPRECATED,
  getSettingsForSource,
} from '../settings/settings.js'
import type { PluginHookMatcher } from '../settings/types.js'
import { jsonStringify } from '../slowOperations.js'
import { loadAllPluginsCacheOnly } from './pluginLoader.js'

/**
 * Convert plugin hooks configuration to native matchers with plugin context
 */
function convertPluginHooksToMatchers(
  plugin: LoadedPlugin,
): Record<HookEvent, PluginHookMatcher[]> {
  return convertRegisteredPluginMatchers287(plugin)
}

/**
 * Load and register hooks from all enabled plugins
 */
export const loadPluginHooks = memoize(async (): Promise<void> => {
  // Whole original R7 installs classic callbacks and module lifecycle through
  // the same canonical Mods registration slot; no parallel classic-only load.
  await retryModelSwitchHookRegistration287()
})

export function clearPluginHookCache(): void {
  // Only invalidate the memoize — do NOT wipe STATE.registeredHooks here.
  // Wiping here left plugin hooks dead between clearAllCaches() and the next
  // loadPluginHooks() call, which for Stop hooks might never happen
  // (gh-29767). The clear now lives inside loadPluginHooks() as an atomic
  // clear-then-register, so old hooks stay valid until the fresh load swaps
  // them out.
  loadPluginHooks.cache?.clear?.()
  invalidateHookRegistration287()
}

/**
 * Remove hooks from plugins no longer in the enabled set, without adding
 * hooks from newly-enabled plugins. Called from clearAllCaches() so
 * uninstalled/disabled plugins stop firing hooks immediately (gh-36995),
 * while newly-enabled plugins wait for /reload-plugins — consistent with
 * how commands/agents/MCP behave.
 *
 * The full swap (clear + register all) still happens via loadPluginHooks(),
 * which /reload-plugins awaits.
 */
export async function pruneRemovedPluginHooks(): Promise<void> {
  // Early return when nothing to prune — avoids seeding the loadAllPluginsCacheOnly
  // memoize in test/preload.ts beforeEach (which clears registeredHooks).
  if (!getRegisteredHooks() && modsRegistryOwner287.registry().loadedModules.length === 0) return
  const { enabled } = await loadAllPluginsCacheOnly()
  // Original Ego prunes by rf(plugin) storage identity, not display name.
  // Same fIt owns both R7 installation and removal, including Rse/Pxn.
  const lifecycle = (require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
  await lifecycle.registration.prune(new Set(enabled.map(lifecycle.registration.storageId)))
  const enabledRoots = new Set(enabled.map(p => p.path))

  // Re-read after the await: a concurrent loadPluginHooks() (hot-reload)
  // could have swapped STATE.registeredHooks during the gap. Holding the
  // pre-await reference would compute survivors from stale data.
  const current = getRegisteredHooks()
  if (!current) return

  // Collect plugin hooks whose pluginRoot is still enabled, then swap via
  // the existing clear+register pair (same atomic-pair pattern as
  // loadPluginHooks above). Callback hooks are preserved by
  // clearRegisteredPluginHooks; we only need to re-register survivors.
  const survivors: Partial<Record<HookEvent, PluginHookMatcher[]>> = {}
  for (const [event, matchers] of Object.entries(current)) {
    const kept = matchers.filter(
      (m): m is PluginHookMatcher =>
        'pluginRoot' in m && enabledRoots.has(m.pluginRoot),
    )
    if (kept.length > 0) survivors[event as HookEvent] = kept
  }

  clearRegisteredPluginHooks()
  registerHookCallbacks(survivors)
}

/**
 * Reset hot reload subscription state. Only for testing.
 */
export function resetHotReloadState(): void {
  const registry=modsRegistryOwner287.registry()
  const unsubscribe=registry.hookHotReloadUnsubscribe
  if(typeof unsubscribe==='function')unsubscribe()
  registry.hookHotReloadUnsubscribe=undefined
  registry.hookHotReloadSettingsSnapshot=undefined
  registry.hookHotReloadTierSnapshot=undefined
}

/**
 * Build a stable string snapshot of the settings that feed into
 * `loadAllPluginsCacheOnly()` for change detection. Sorts keys so comparison is
 * deterministic regardless of insertion order.
 *
 * Hashes FOUR fields — not just enabledPlugins — because the memoized
 * loadAllPluginsCacheOnly() also reads strictKnownMarketplaces, blockedMarketplaces
 * (pluginLoader.ts:1933 via getBlockedMarketplaces), and
 * extraKnownMarketplaces. If remote managed settings set only one of
 * these (no enabledPlugins), a snapshot keyed only on enabledPlugins
 * would never diff, the listener would skip, and the memoized result
 * would retain the pre-remote marketplace allow/blocklist.
 * See #23085 / #23152 poisoned-cache discussion (Slack C09N89L3VNJ).
 */
// Exported for testing — the listener at setupPluginHookHotReload uses this
// for change detection; tests verify it diffs on the fields that matter.
export function getPluginAffectingSettingsSnapshot(): string {
  const merged = getSettings_DEPRECATED()
  const policy = getSettingsForSource('policySettings')
  // Key-sort the two Record fields so insertion order doesn't flap the hash.
  // Array fields (strictKnownMarketplaces, blockedMarketplaces) have
  // schema-stable order.
  const sortKeys = <T extends Record<string, unknown>>(o: T | undefined) =>
    o ? Object.fromEntries(Object.entries(o).sort()) : {}
  return jsonStringify({
    enabledPlugins: sortKeys(merged.enabledPlugins),
    extraKnownMarketplaces: sortKeys(merged.extraKnownMarketplaces),
    strictKnownMarketplaces: policy?.strictKnownMarketplaces ?? [],
    blockedMarketplaces: policy?.blockedMarketplaces ?? [],
  })
}

/**
 * Set up hot reload for plugin hooks when remote settings change.
 * When policySettings changes (e.g., from remote managed settings),
 * compares the plugin-affecting settings snapshot and only reloads if it
 * actually changed.
 */
export function setupPluginHookHotReload(
  storageV5?:import('../../Tool.js').ToolUseContext['storageV5'],
  credentials?:import('../../Tool.js').ToolUseContext['credentials'],
):void {
  // Canonical full has owns the actual settings/tier snapshots and listener.
  const lifecycle=(require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287()
  const setup=lifecycle.clearSourceModule287('chunk-hrypqa3m.js').has
  setup(storageV5,credentials)
}
