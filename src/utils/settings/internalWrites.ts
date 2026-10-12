/**
 * Tracks timestamps of in-process settings-file writes so the chokidar watcher
 * in changeDetector.ts can ignore its own echoes.
 *
 * Extracted from changeDetector.ts to break the settings.ts → changeDetector.ts →
 * hooks.ts → … → settings.ts cycle. settings.ts needs to mark "I'm about to
 * write" before the write lands; changeDetector needs to read the mark when
 * chokidar fires. The canonical d6e map is the shared state — everything else in
 * changeDetector (chokidar, hooks, mdm polling) is irrelevant to settings.ts.
 *
 * Callers pass resolved paths. The path→source resolution (getSettingsFilePathForSource)
 * lives in settings.ts; both sync writers and the async original DQe mark this owner.
 */

import {getSettingsCacheStore287} from './settingsCache.js'
// Original DQe and the existing watcher share d6e.internalWrites.
const timestamps = () => getSettingsCacheStore287().internalWrites

export function markInternalWrite(path: string): void {
  timestamps().set(path, Date.now())
}

/**
 * True if `path` was marked within `windowMs`. Consumes the mark on match —
 * the watcher fires once per write, so a matched mark shouldn't suppress
 * the next (real, external) change to the same file.
 */
export function consumeInternalWrite(path: string, windowMs: number): boolean {
  const ts = timestamps().get(path)
  if (ts !== undefined && Date.now() - ts < windowMs) {
    timestamps().delete(path)
    return true
  }
  return false
}

export function clearInternalWrites(): void {
  timestamps().clear()
}
