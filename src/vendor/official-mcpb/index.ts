import type { McpbConfigOptions } from './config-contract.js'
import type { McpbConfig } from './manifest.js'
export { McpbManifestSchema } from './manifest.js'
export type { McpbManifest, McpbUserConfigurationOption, McpbConfig } from './manifest.js'

/** The supported source-bun platforms each use their own official closure. */
export async function getMcpConfigForManifest(options: McpbConfigOptions): Promise<McpbConfig | undefined> {
  if (process.platform === 'darwin') {
    return (await import('./config-darwin.js')).getMcpConfigForManifest(options)
  }
  if (process.platform === 'linux') {
    return (await import('./config-linux.js')).getMcpConfigForManifest(options)
  }
  throw new Error(`MCPB configuration is not supported on ${process.platform}`)
}
