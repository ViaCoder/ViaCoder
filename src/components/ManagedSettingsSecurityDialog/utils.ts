// Keep projection, comparison and persisted consent hashes on the same public
// 2.1.284 algorithm. The extracted module is pure and has no host/auth imports.
export {
  extractDangerousSettings,
  hasDangerousSettings,
  hasDangerousSettingsChanged,
  type DangerousSettings,
} from '../../vendor/official-managed-consent/logic.js'
import type { DangerousSettings } from '../../vendor/official-managed-consent/logic.js'

/** Keep the existing local dialog; show names only, never helper bodies. */
export function formatDangerousSettingsList(dangerous: DangerousSettings): string[] {
  const items = [
    ...Object.keys(dangerous.shellSettings),
    ...Object.keys(dangerous.envVars),
    ...Object.keys(dangerous.sandboxSettings),
    ...Object.keys(dangerous.isolationSettings),
    ...Object.keys(dangerous.payloadSlots),
  ]
  if (dangerous.hasHooks) items.push('hooks')
  return items
}
