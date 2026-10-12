import { getGlobalConfig } from '../../utils/config.js'
import { getInitialSettings } from '../../utils/settings/settings.js'

export function effectiveFocus(settings: {viewMode?: 'focus'|'default'}, preference: boolean): boolean {
  return settings.viewMode ? settings.viewMode === 'focus' : preference
}

// No implicit enablement: only a previously explicit user preference or
// explicit settings value can opt in after restart/resume.
export function initialFocusPreference(): boolean {
  return effectiveFocus(getInitialSettings(), getGlobalConfig().briefTranscript === true)
}
