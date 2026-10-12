import type { z } from 'zod/v4'
import type { LspServerConfigSchema } from '../../utils/plugins/schemas.js'

/** Reuse the existing plugin schema, including its parsed transport default. */
export type LspServerConfig = z.infer<ReturnType<typeof LspServerConfigSchema>>

/** The public loader supports plugin-owned LSP servers only. */
export type ScopedLspServerConfig = LspServerConfig & {
  scope: 'dynamic'
  source: string
}

export type LspServerState =
  | 'stopped'
  | 'starting'
  | 'running'
  | 'stopping'
  | 'error'
