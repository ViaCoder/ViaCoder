/**
 * Zod schemas for permission updates.
 *
 * This file is intentionally kept minimal with no complex dependencies
 * so it can be safely imported by src/types/hooks.ts without creating
 * circular dependencies.
 */
import z from 'zod/v4'
// Types extracted to src/types/permissions.ts to break import cycles
import type {
  PermissionUpdate,
  PermissionUpdateDestination,
} from '../../types/permissions.js'
import { lazySchema } from '../lazySchema.js'
import { getPrintHostSource287 } from '../../cli/printOwnership287/publicHostRuntime287.js'

// Re-export for backwards compatibility
export type { PermissionUpdate, PermissionUpdateDestination }

/**
 * PermissionUpdateDestination is where a new permission rule should be saved to.
 */
export const permissionUpdateDestinationSchema = lazySchema(() =>
  z.enum([
    // User settings (global)
    'userSettings',
    // Project settings (shared per-directory)
    'projectSettings',
    // Local settings (gitignored)
    'localSettings',
    // In-memory for the current session only
    'session',
    // From the command line arguments
    'cliArg',
  ]),
)

/** Borrow the same complete original jt used by SDK and permission hooks. */
export const permissionUpdateSchema = lazySchema(() =>
  (getPrintHostSource287('chunk-xep95vq1.js', 'jt') as () => z.ZodType<PermissionUpdate>)(),
)
