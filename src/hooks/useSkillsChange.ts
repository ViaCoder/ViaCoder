import { useCallback, useEffect, useRef } from 'react'
import type { Command } from '../commands.js'
import {
  clearCommandMemoizationCaches,
  clearCommandsCache,
  getCommands,
} from '../commands.js'
import { onGrowthBookRefresh } from '../services/analytics/growthbook.js'
import { logError } from '../utils/log.js'
import { skillChangeDetector } from '../utils/skills/skillChangeDetector.js'

/**
 * Keep the commands list fresh across two triggers:
 *
 * 1. Skill file changes (watcher) — full cache clear + disk re-scan, since
 *    skill content changed on disk.
 * 2. GrowthBook init/refresh — memo-only clear, since only `isEnabled()`
 *    predicates may have changed. Handles commands like /btw whose gate
 *    reads a flag that isn't in the disk cache yet on first session after
 *    a flag rename: getCommands() runs before GB init (main.tsx:2855 vs
 *    showSetupScreens at :3106), so the memoized list is baked with the
 *    default. Once init populates remoteEvalFeatureValues, re-filter.
 */
export function useSkillsChange(
  cwd: string | undefined,
  onCommandsChange: (commands: Command[]) => void,
): void {
  const generation = useRef({cwd, token: 0})
  if (generation.current.cwd !== cwd) generation.current = {cwd, token: generation.current.token + 1}
  const handleChange = useCallback(async () => {
    const token = generation.current.token
    if (!cwd) return
    try {
      // Clear all command caches to ensure fresh load
      clearCommandsCache()
      const commands = await getCommands(cwd)
      if (generation.current.cwd === cwd && generation.current.token === token) onCommandsChange(commands)
    } catch (error) {
      // Errors during reload are non-fatal - log and continue
      if (error instanceof Error) {
        logError(error)
      }
    }
  }, [cwd, onCommandsChange])

  const previousCwd = useRef(cwd)
  useEffect(() => {
    if (previousCwd.current !== cwd) {
      previousCwd.current = cwd
      void handleChange()
    }
    return skillChangeDetector.subscribe(handleChange)
  }, [cwd, handleChange])

  const handleGrowthBookRefresh = useCallback(async () => {
    const token = generation.current.token
    if (!cwd) return
    try {
      clearCommandMemoizationCaches()
      const commands = await getCommands(cwd)
      if (generation.current.cwd === cwd && generation.current.token === token) onCommandsChange(commands)
    } catch (error) {
      if (error instanceof Error) {
        logError(error)
      }
    }
  }, [cwd, onCommandsChange])

  useEffect(
    () => onGrowthBookRefresh(handleGrowthBookRefresh),
    [handleGrowthBookRefresh],
  )
}
