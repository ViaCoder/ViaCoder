import {useOfficialNotifyAfterTimeout287} from './officialNotifyAfterTimeout287.js'
export {DEFAULT_INTERACTION_THRESHOLD_MS} from './officialNotifyAfterTimeout287.js'

/** The three public callers share the complete official notification hook.
 * Mye's own shown-at bound preserves C's no-premature-notification behavior
 * without resetting another consumer's actual last-input timestamp. */
export function useNotifyAfterTimeout(
  message: string,
  notificationType: string,
): void {
  useOfficialNotifyAfterTimeout287(message, notificationType)
}
