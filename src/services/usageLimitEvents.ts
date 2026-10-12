import {getQuotaOwner287} from './claudeAiLimits.js'
import type {Signal} from '../utils/signal.js'
import type {ClaudeAILimits} from './claudeAiLimits.js'
// Native 429 rejection notifications are independent of snapshot changes.
// Successful response headers alone do not emit a rejection notification.
export const quotaRejected: Signal<[limits: ClaudeAILimits, source: string]> = {
 subscribe: listener => getQuotaOwner287().quotaRejected.subscribe(listener),
 emit: (limits, source) => getQuotaOwner287().quotaRejected.emit(limits, source),
 clear: () => getQuotaOwner287().quotaRejected.clear(),
}
export function quotaSource(source?: string): string {
  return source === 'sdk' || source?.startsWith('repl_main_thread') ? 'main_thread' : 'other'
}
