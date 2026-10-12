/**
 * Built-in Plugin Registry
 *
 * Manages built-in plugins that ship with the CLI and can be enabled/disabled
 * by users via the /plugin UI.
 *
 * Built-in plugins differ from bundled skills (src/skills/bundled/) in that:
 * - They appear in the /plugin UI under a "Built-in" section
 * - Users can enable/disable them (persisted to user settings)
 * - They can provide multiple components (skills, hooks, MCP servers)
 *
 * Plugin IDs use the format `{name}@builtin` to distinguish them from
 * marketplace plugins (`{name}@{marketplace}`).
 */

import type { Command } from '../commands.js'
import type { BuiltinPluginDefinition, LoadedPlugin } from '../types/plugin.js'
import {readBuiltinSkillCommands287} from './bundled/builtinInit287.js'
import {getBuiltinRegistryOwner287,getBuiltinRegistryProduction287,readBuiltinPlugins287} from './bundled/builtinRegistry287.js'


export const BUILTIN_MARKETPLACE_NAME = 'builtin'

/**
 * Register a built-in plugin. Call this from initBuiltinPlugins() at startup.
 */
export function registerBuiltinPlugin(
  definition: BuiltinPluginDefinition,
): void {
  getBuiltinRegistryProduction287().eS(definition)
}

/**
 * Check if a plugin ID represents a built-in plugin (ends with @builtin).
 */
export function isBuiltinPluginId(pluginId: string): boolean {
  return getBuiltinRegistryProduction287().VE(pluginId)
}

/**
 * Get a specific built-in plugin definition by name.
 * Useful for the /plugin UI to show the skills/hooks/MCP list without
 * a marketplace lookup.
 */
export function getBuiltinPluginDefinition(
  name: string,
): BuiltinPluginDefinition | undefined {
  return getBuiltinRegistryProduction287().zw(name)
}

/**
 * Get all registered built-in plugins as LoadedPlugin objects, split into
 * enabled/disabled based on user settings (with defaultEnabled as fallback).
 * Plugins whose isAvailable() returns false are omitted entirely.
 */
export function getBuiltinPlugins(): {
  enabled: LoadedPlugin[]
  disabled: LoadedPlugin[]
} {
  return readBuiltinPlugins287()
}

/**
 * Get skills from enabled built-in plugins as Command objects.
 * Skills from disabled plugins are not returned.
 */
export function getBuiltinPluginSkillCommands(): Command[] {
  return readBuiltinSkillCommands287()
}

/**
 * Clear built-in plugins registry (for testing).
 */
export function clearBuiltinPlugins(): void {
  const owner=getBuiltinRegistryOwner287()
  owner.builtinPlugins.clear()
  owner.builtinPluginFailures.clear()
  owner.builtinPluginsInitialized=false
}

