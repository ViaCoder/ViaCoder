/**
 * User keybinding configuration loader with hot-reload support.
 *
 * Loads keybindings from ~/.claude/keybindings.json and watches
 * for changes to reload them automatically.
 *
 * User customization follows the public keybinding rollout gate.
 */

import chokidar from 'chokidar'
import { readFileSync } from 'fs'
import { readFile, stat } from 'fs/promises'
import { dirname, join } from 'path'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../services/analytics/growthbook.js'
import { logEvent } from '../services/analytics/index.js'
import { registerCleanup } from '../utils/cleanupRegistry.js'
import { logForDebugging } from '../utils/debug.js'
import { getClaudeConfigHomeDir } from '../utils/envUtils.js'
import { errorMessage, isENOENT } from '../utils/errors.js'
import {getKeybindingState287} from './state287.js'
import { jsonParse } from '../utils/slowOperations.js'
import {getDefaultBindingsSource287} from './defaultBindingsSource287.js'
import { parseBindings } from './parser.js'
import type { KeybindingBlock, ParsedBinding } from './types.js'
import {
  checkDuplicateKeysInJson,
  type KeybindingWarning,
  validateBindings,
} from './validate.js'

const keybindingState287=getKeybindingState287()

/**
 * Check if keybinding customization is enabled.
 *
 * Returns true if the tengu_keybinding_customization_release GrowthBook gate is enabled.
 *
 * This function is exported so other parts of the codebase (e.g., /doctor)
 * can check the same condition consistently.
 */
export function isKeybindingCustomizationEnabled(): boolean {
  return getFeatureValue_CACHED_MAY_BE_STALE(
    'tengu_keybinding_customization_release',
    true,
  )
}

/**
 * Time in milliseconds to wait for file writes to stabilize.
 */
const FILE_STABILITY_THRESHOLD_MS = 500

/**
 * Polling interval for checking file stability.
 */
const FILE_STABILITY_POLL_INTERVAL_MS = 200

/**
 * Result of loading keybindings, including any validation warnings.
 */
export type KeybindingsLoadResult = {
  bindings: ParsedBinding[]
  warnings: KeybindingWarning[]
}

/**
 * Log a telemetry event when custom keybindings are loaded, at most once per day.
 * This lets us estimate the percentage of users who customize their keybindings.
 */
function logCustomBindingsLoadedOncePerDay(userBindingCount: number): void {
  const today = new Date().toISOString().slice(0, 10)
  if (keybindingState287.lastCustomBindingsLogDate === today) return
  keybindingState287.lastCustomBindingsLogDate = today
  logEvent('tengu_custom_keybindings_loaded', {
    user_binding_count: userBindingCount,
  })
}

/**
 * Type guard to check if an object is a valid KeybindingBlock.
 */
function isKeybindingBlock(obj: unknown): obj is KeybindingBlock {
  if (typeof obj !== 'object' || obj === null) return false
  const b = obj as Record<string, unknown>
  return (
    typeof b.context === 'string' &&
    typeof b.bindings === 'object' &&
    b.bindings !== null &&
    !Array.isArray(b.bindings) &&
    Object.values(b.bindings).every(action => action === null || typeof action === 'string')
  )
}

/**
 * Type guard to check if an array contains only valid KeybindingBlocks.
 */
function isKeybindingBlockArray(arr: unknown): arr is KeybindingBlock[] {
  return Array.isArray(arr) && arr.every(isKeybindingBlock)
}

/**
 * Get the path to the user keybindings file.
 */
export function getKeybindingsPath(): string {
  return join(getClaudeConfigHomeDir(), 'keybindings.json')
}

/**
 * Parse default bindings (cached for performance).
 */
function getDefaultParsedBindings(): ParsedBinding[] {
  return parseBindings(getDefaultBindingsSource287())
}

/**
 * Load and parse keybindings from user config file.
 * Returns merged default + user bindings along with validation warnings.
 *
 * When the rollout gate is disabled, returns only the default bindings.
 */
export async function loadKeybindings(): Promise<KeybindingsLoadResult> {
  const defaultBindings = getDefaultParsedBindings()

  // Respect the rollout gate before reading user configuration
  if (!isKeybindingCustomizationEnabled()) {
    return { bindings: defaultBindings, warnings: [] }
  }

  const userPath = getKeybindingsPath()

  try {
    const content = await readFile(userPath, 'utf-8')
    const parsed: unknown = jsonParse(content)

    // Extract bindings array from object wrapper format: { "bindings": [...] }
    let userBlocks: unknown
    if (typeof parsed === 'object' && parsed !== null && 'bindings' in parsed) {
      userBlocks = (parsed as { bindings: unknown }).bindings
    } else {
      // Invalid format - missing bindings property
      const errorMessage = 'keybindings.json must have a "bindings" array'
      const suggestion = 'Use format: { "bindings": [ ... ] }'
      logForDebugging(`[keybindings] Invalid keybindings.json: ${errorMessage}`)
      return {
        bindings: defaultBindings,
        warnings: [
          {
            type: 'parse_error',
            severity: 'error',
            message: errorMessage,
            suggestion,
          },
        ],
      }
    }

    // Validate structure - bindings must be an array of valid keybinding blocks
    if (!isKeybindingBlockArray(userBlocks)) {
      const errorMessage = !Array.isArray(userBlocks)
        ? '"bindings" must be an array'
        : 'keybindings.json contains invalid block structure'
      const suggestion = !Array.isArray(userBlocks)
        ? 'Set "bindings" to an array of keybinding blocks'
        : 'Each block must have "context" (string) and "bindings" (object)'
      logForDebugging(`[keybindings] Invalid keybindings.json: ${errorMessage}`)
      return {
        bindings: defaultBindings,
        warnings: [
          {
            type: 'parse_error',
            severity: 'error',
            message: errorMessage,
            suggestion,
          },
        ],
      }
    }

    const userParsed = parseBindings(userBlocks)
    logForDebugging(
      `[keybindings] Loaded ${userParsed.length} user bindings from ${userPath}`,
    )

    // User bindings come after defaults, so they override
    const mergedBindings = [...defaultBindings, ...userParsed]

    logCustomBindingsLoadedOncePerDay(userParsed.length)

    // Run validation on user config
    // First check for duplicate keys in raw JSON (JSON.parse silently drops earlier values)
    const duplicateKeyWarnings = checkDuplicateKeysInJson(content)
    const warnings = [
      ...duplicateKeyWarnings,
      ...validateBindings(userBlocks, mergedBindings),
    ]

    if (warnings.length > 0) {
      logForDebugging(
        `[keybindings] Found ${warnings.length} validation issue(s)`,
      )
    }

    return { bindings: mergedBindings, warnings }
  } catch (error) {
    // File doesn't exist - use defaults (user can run /keybindings to create)
    if (isENOENT(error)) {
      return { bindings: defaultBindings, warnings: [] }
    }

    // Other error - log and return defaults with warning
    logForDebugging(
      `[keybindings] Error loading ${userPath}: ${errorMessage(error)}`,
    )
    return {
      bindings: defaultBindings,
      warnings: [
        {
          type: 'parse_error',
          severity: 'error',
          message: `Failed to parse keybindings.json: ${errorMessage(error)}`,
        },
      ],
    }
  }
}

/**
 * Load keybindings synchronously (for initial render).
 * Uses cached value if available.
 */
export function loadKeybindingsSync(): ParsedBinding[] {
  if (keybindingState287.bindings) {
    return keybindingState287.bindings
  }

  const result = loadKeybindingsSyncWithWarnings()
  return result.bindings
}

/**
 * Load keybindings synchronously with validation warnings.
 * Uses cached values if available.
 *
 * When the rollout gate is disabled, returns only the default bindings.
 */
export function loadKeybindingsSyncWithWarnings():KeybindingsLoadResult {
  return (require('../services/tips/tipsProduction287.js') as typeof import('../services/tips/tipsProduction287.js')).getNativeTipModule287('chunk-tf0wpqry.js').Sft(keybindingState287)
}

/**
 * Initialize file watching for keybindings.json.
 * Call this once when the app starts.
 *
 * This is a no-op while the public rollout gate is disabled.
 */
export async function initializeKeybindingWatcher(): Promise<void> {
  if (keybindingState287.initialized || keybindingState287.disposed) return

  // Respect the public rollout gate
  if (!isKeybindingCustomizationEnabled()) {
    logForDebugging(
      '[keybindings] Skipping file watcher - user customization disabled',
    )
    return
  }

  const userPath = getKeybindingsPath()
  const watchDir = dirname(userPath)

  // Only watch if parent directory exists
  try {
    const stats = await stat(watchDir)
    if (!stats.isDirectory()) {
      logForDebugging(
        `[keybindings] Not watching: ${watchDir} is not a directory`,
      )
      return
    }
  } catch {
    logForDebugging(`[keybindings] Not watching: ${watchDir} does not exist`)
    return
  }

  // Set initialized only after we've confirmed we can watch
  keybindingState287.initialized = true

  logForDebugging(`[keybindings] Watching for changes to ${userPath}`)

  keybindingState287.watcher = chokidar.watch(userPath, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: FILE_STABILITY_THRESHOLD_MS,
      pollInterval: FILE_STABILITY_POLL_INTERVAL_MS,
    },
    ignorePermissionErrors: true,
    usePolling: false,
    atomic: true,
  })

  keybindingState287.watcher.on('add', handleChange)
  keybindingState287.watcher.on('change', handleChange)
  keybindingState287.watcher.on('unlink', handleDelete)

  // Register cleanup
  registerCleanup(async () => disposeKeybindingWatcher())
}

/**
 * Clean up the file watcher.
 */
export function disposeKeybindingWatcher(): void {
  keybindingState287.disposed = true
  if (keybindingState287.watcher) {
    void keybindingState287.watcher.close()
    keybindingState287.watcher = null
  }
  keybindingState287.changed.clear()
}

/**
 * Subscribe to keybinding changes.
 * The listener receives the new parsed bindings when the file changes.
 */
export const subscribeToKeybindingChanges = keybindingState287.changed.subscribe

async function handleChange(path: string): Promise<void> {
  logForDebugging(`[keybindings] Detected change to ${path}`)

  try {
    const result = await loadKeybindings()
    keybindingState287.bindings = result.bindings
    keybindingState287.warnings = result.warnings

    // Notify all listeners with the full result
    keybindingState287.changed.emit(result)
  } catch (error) {
    logForDebugging(`[keybindings] Error reloading: ${errorMessage(error)}`)
  }
}

function handleDelete(path: string): void {
  logForDebugging(`[keybindings] Detected deletion of ${path}`)

  // Reset to defaults when file is deleted
  const defaultBindings = getDefaultParsedBindings()
  keybindingState287.bindings = defaultBindings
  keybindingState287.warnings = []

  keybindingState287.changed.emit({ bindings: defaultBindings, warnings: [] })
}

/**
 * Get the cached keybinding warnings.
 * Returns empty array if no warnings or bindings haven't been loaded yet.
 */
export function getCachedKeybindingWarnings(): KeybindingWarning[] {
  return keybindingState287.warnings
}

/**
 * Reset internal state for testing.
 */
export function resetKeybindingLoaderForTesting(): void {
  keybindingState287.initialized = false
  keybindingState287.disposed = false
  keybindingState287.bindings = null
  keybindingState287.warnings = []
  keybindingState287.lastCustomBindingsLogDate = null
  if (keybindingState287.watcher) {
    void keybindingState287.watcher.close()
    keybindingState287.watcher = null
  }
  keybindingState287.changed.clear()
}
