import {getSDKPermissionRules287} from './officialSDKPermission287/runtime.js'
import { posix } from 'path'
import type { ToolPermissionContext } from '../../Tool.js'
// Types extracted to src/types/permissions.ts to break import cycles
import type {
  AdditionalWorkingDirectory,
  WorkingDirectorySource,
} from '../../types/permissions.js'
import type { EditableSettingSource } from '../settings/constants.js'
import { toPosixPath } from './filesystem.js'
import type { PermissionRuleValue } from './PermissionRule.js'
import type {
  PermissionUpdate,
  PermissionUpdateDestination,
} from './PermissionUpdateSchema.js'

// Re-export for backwards compatibility
export type { AdditionalWorkingDirectory, WorkingDirectorySource }

export function extractRules(
  updates: PermissionUpdate[] | undefined,
): PermissionRuleValue[] {
  if (!updates) return []

  return updates.flatMap(update => {
    switch (update.type) {
      case 'addRules':
        return update.rules
      default:
        return []
    }
  })
}

export function hasRules(updates: PermissionUpdate[] | undefined): boolean {
  return extractRules(updates).length > 0
}

/**
 * Applies a single permission update to the context and returns the updated context
 * @param context The current permission context
 * @param update The permission update to apply
 * @returns The updated permission context
 */
export function applyPermissionUpdate(
  context: ToolPermissionContext,
  update: PermissionUpdate,
): ToolPermissionContext {
  return getSDKPermissionRules287().zP(context,[update])
}

/**
 * Applies multiple permission updates to the context and returns the updated context
 * @param context The current permission context
 * @param updates The permission updates to apply
 * @returns The updated permission context
 */
export function applyPermissionUpdates(
  context: ToolPermissionContext,
  updates: PermissionUpdate[],
): ToolPermissionContext {
  return getSDKPermissionRules287().zP(context,updates)
}

export function supportsPersistence(
  destination: PermissionUpdateDestination,
): destination is EditableSettingSource {
  return (
    destination === 'localSettings' ||
    destination === 'userSettings' ||
    destination === 'projectSettings'
  )
}

/**
 * Persists a permission update to the appropriate settings source
 * @param update The permission update to persist
 */
export function persistPermissionUpdate(update:PermissionUpdate,storageV5?:unknown):Promise<void>{
 return getSDKPermissionRules287().V1([update],storageV5)
}

/**
 * Persists multiple permission updates to the appropriate settings sources
 * Only persists updates with persistable sources
 * @param updates The permission updates to persist
 */
export function persistPermissionUpdates(updates:PermissionUpdate[],storageV5?:unknown):Promise<void>{
 return getSDKPermissionRules287().V1(updates,storageV5)
}

/**
 * Creates a Read rule suggestion for a directory.
 * @param dirPath The directory path to create a rule for
 * @param destination The destination for the permission rule (defaults to 'session')
 * @returns A PermissionUpdate for a Read rule, or undefined for the root directory
 */
export function createReadRuleSuggestion(
  dirPath: string,
  destination: PermissionUpdateDestination = 'session',
): PermissionUpdate | undefined {
  // Convert to POSIX format for pattern matching (handles Windows internally)
  const pathForPattern = toPosixPath(dirPath)

  // Root directory is too broad to be a reasonable permission target
  if (pathForPattern === '/') {
    return undefined
  }

  // For absolute paths, prepend an extra / to create //path/** pattern
  const ruleContent = posix.isAbsolute(pathForPattern)
    ? `/${pathForPattern}/**`
    : `${pathForPattern}/**`

  return {
    type: 'addRules',
    rules: [
      {
        toolName: 'Read',
        ruleContent,
      },
    ],
    behavior: 'allow',
    destination,
  }
}
