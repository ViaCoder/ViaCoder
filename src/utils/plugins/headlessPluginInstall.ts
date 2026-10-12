/**
 * Plugin installation for headless/CCR mode.
 *
 * This module provides plugin installation without AppState updates,
 * suitable for non-interactive environments like CCR.
 *
 * When CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE is enabled, plugins are stored as
 * ZIPs on a mounted volume. The storage layer (pluginLoader.ts) handles
 * ZIP creation on install and extraction on load transparently.
 */

import type {ToolUseContext} from '../../Tool.js'
import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'

export type HeadlessPluginInstallProgress287=
 |{status:'installed';name:string}
 |{status:'failed';name:string;error:string}

/**
 * Install plugins for headless/CCR mode.
 *
 * This is the headless equivalent of performBackgroundPluginInstallations(),
 * but without AppState updates (no UI to update in headless mode).
 *
 * @returns true if any plugins were installed (caller should refresh MCP)
 */
export function installPluginsForHeadless(
  onProgress?: (event:HeadlessPluginInstallProgress287)=>void,
  storageV5?:ToolUseContext['storageV5'],
  credentials?:ToolUseContext['credentials'],
):Promise<boolean> {
  // Full jl/ME use this host's ut()/Mods registry and original serialized
  // headlessInstallPass. No legacy second installer or parallel cache.
  const install=getOriginalModsLifecycle287().clearSourceModule287('chunk-xapeakym.js').jl as typeof installPluginsForHeadless
  return install(onProgress,storageV5,credentials)
}
