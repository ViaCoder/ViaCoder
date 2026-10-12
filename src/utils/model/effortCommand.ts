import {clampEffortLevel, getAvailableEffortLevels, getEffortEnvOverride, getEffortValueDescription, parseEffortValue, toPersistableEffort, type EffortValue} from '../effort.js'
import {updateSettingsForSource} from '../settings/settings.js'
import {getEffortSettingsUpdate} from './effortSettings.js'

// Official chunk-fr7r2xfj:fV/de/se and chunk-t1gbm7x6:F/w/O.
// Shared by JSX and headless /effort. A failed write never changes session state.
export function executeEffortChange(args: string, model: string, persist = true): {
  message: string; effortUpdate?: {value: EffortValue | undefined}
} {
  const input = args.trim(), reset = ['auto', 'unset'].includes(input.toLowerCase())
  const parsed = parseEffortValue(input.toLowerCase()), levels = getAvailableEffortLevels(model)
  if (!reset && typeof parsed !== 'string') return {message: `Invalid argument: ${input}. Valid options are: ${[...levels, 'auto'].join(', ')}`}
  const value = reset ? null : clampEffortLevel(parsed as Exclude<typeof parsed, number | null | undefined>, model)
  const clamped = !reset && value !== parsed
  persist &&= !clamped
  const persistable = toPersistableEffort(value)
  if (persist && (reset || persistable !== undefined)) {
    const {error} = updateSettingsForSource('userSettings', getEffortSettingsUpdate(model, persistable))
    if (error) return {message: `Failed to set effort level: ${error.message}`}
  }
  const effortUpdate = {value}, env = getEffortEnvOverride(), raw = process.env.CLAUDE_CODE_EFFORT_LEVEL
  if (reset) return {effortUpdate, message: env !== undefined && env !== null
    ? `${persist ? 'Cleared effort from settings, but' : 'Effort set to auto for this session, but'} CLAUDE_CODE_EFFORT_LEVEL=${raw} still controls this session`
    : `Effort level set to auto${persist ? '' : ' (this session only)'}`}
  if (env !== undefined && env !== value) return {effortUpdate, message: persistable === undefined
    ? `Not applied: CLAUDE_CODE_EFFORT_LEVEL=${raw} overrides effort this session, and ${value} is session-only (nothing saved)`
    : `CLAUDE_CODE_EFFORT_LEVEL=${raw} overrides this session — clear it and ${value} takes over`}
  const suffix = persist && persistable !== undefined ? ' (saved as your default for new sessions)' : ' (this session only)'
  return {effortUpdate, message: clamped
    ? `Effort '${parsed}' exceeds the cap for ${model} set by your settings or organization; set to '${value}' instead${suffix}: ${getEffortValueDescription(value)}`
    : `Set effort level to ${value}${suffix}: ${getEffortValueDescription(value)}`}
}
