import type { McpbConfigOptions } from './config-contract.js'
import type { McpbConfig } from './manifest.js'
export function getMcpConfigForManifest(options: McpbConfigOptions): Promise<McpbConfig | undefined>
