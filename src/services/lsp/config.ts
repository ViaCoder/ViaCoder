import type { ScopedLspServerConfig } from './types.js'

/**
 * Get all configured LSP servers from plugins.
 * LSP servers are only supported via plugins, not user/project settings.
 *
 * @returns Object containing servers configuration keyed by scoped server name
 */
export function getAllLspServers(storageV5?:unknown,credentials?:unknown):Promise<{servers:Record<string,ScopedLspServerConfig>;loadFailed:boolean}> {return (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').Stn(storageV5,credentials)}
