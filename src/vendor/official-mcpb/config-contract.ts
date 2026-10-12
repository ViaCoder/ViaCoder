import type { McpbManifest } from './manifest.js'

/** R's complete input; defaults do not satisfy required user_config fields. */
export type McpbConfigOptions = {
  manifest: McpbManifest
  extensionPath: string
  systemDirs: Record<string, string>
  userConfig?: Record<string, string | number | boolean | string[]>
  pathSeparator: string
  logger?: { warn(message: string): void }
}
