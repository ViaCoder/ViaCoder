import type { AssistantMessage, UserMessage } from '../types/message.js'
import { createFingerprint287 } from '../services/api/officialBilling287/runtime.js'

export const FINGERPRINT_SALT = '59cf53e54c78'
const officialFingerprint = createFingerprint287({
  buildMetadata: { get VERSION() { return MACRO.VERSION } },
})

/** The official internal-message path skips metadata before selecting text. */
export function extractFirstMessageText(messages: (UserMessage | AssistantMessage)[]): string {
  return officialFingerprint.firstMessageText(messages)
}

export function computeFingerprint(messageText: string, version: string): string {
  return officialFingerprint.fingerprint(messageText, version)
}

export function computeFingerprintFromMessages(messages: (UserMessage | AssistantMessage)[]): string {
  return officialFingerprint.fingerprintFromMessages(messages)
}
