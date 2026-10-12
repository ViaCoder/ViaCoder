// Leaf config module — intentionally minimal imports so UI components
// can read the auto-dream enabled state without dragging in the forked
// agent / task registry / message builder chain that autoDream.ts pulls in.

import { getInitialSettings } from '../../utils/settings/settings.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'

export function isAutoDreamSdkEntrypoint(entrypoint: string | undefined): boolean {
  return entrypoint === 'sdk-ts' || entrypoint === 'sdk-py' || entrypoint === 'sdk-cli'
}

export function resolveAutoDreamEnabled(
  rollout: { enabled?: unknown; available?: unknown } | null,
  readSetting: () => boolean | undefined,
): boolean {
  // The source checks hTt() before consulting the user override.
  if (rollout?.enabled !== true && rollout?.available !== true) return false
  const setting = readSetting()
  if (setting !== undefined) return setting
  return rollout?.enabled === true
}

/**
 * Whether background memory consolidation should run. User setting
 * (autoDreamEnabled in settings.json) overrides the GrowthBook default
 * when explicitly set; otherwise falls through to tengu_onyx_plover.
 */
export function isAutoDreamEnabled(): boolean {
  const gb = getFeatureValue_CACHED_MAY_BE_STALE<{ enabled?: unknown; available?: unknown } | null>(
    'tengu_onyx_plover',
    null,
  )
  return resolveAutoDreamEnabled(gb, () => getInitialSettings().autoDreamEnabled)
}
