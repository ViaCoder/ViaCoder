// NanmiCoder/cc-haha 76619c9c64807e1e52c3027cc6e9ca0b6f6c1852, MIT.
// Adaptation: local type alias replaces the upstream settings-only import.
type ChatSendBehavior = 'enter' | 'modifierEnter'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

export function shouldSubmitOnEnter(
  event: Pick<KeyboardEvent | ReactKeyboardEvent, 'key' | 'shiftKey' | 'ctrlKey' | 'metaKey'>,
  behavior: ChatSendBehavior,
): boolean {
  if (event.key !== 'Enter' || event.shiftKey) return false
  if (behavior === 'modifierEnter') return event.ctrlKey || event.metaKey
  return !event.ctrlKey && !event.metaKey
}
