import {createKeyboardEventClass287} from '../officialInputClock287/native.js'
import { TerminalEvent } from './terminal-event.js'

/**
 * Keyboard event dispatched through the DOM tree via capture/bubble.
 *
 * Follows browser KeyboardEvent semantics: `key` is the literal character
 * for printable keys ('a', '3', ' ', '/') and a multi-char name for
 * special keys ('down', 'return', 'escape', 'f1'). The idiomatic
 * printable-char check is `e.key.length === 1`.
 */
export interface KeyboardEvent extends TerminalEvent {
  readonly key: string
  readonly name: string
  readonly sequence: string
  readonly ctrl: boolean
  readonly shift: boolean
  readonly meta: boolean
  readonly superKey: boolean
  readonly fn: boolean
  readonly soloKeypress: boolean | undefined
}
// Whole original NAt/yx and scalar decoder, with the existing DOM event base.
export const KeyboardEvent = createKeyboardEventClass287(TerminalEvent)
