// Public AX producer text from npm 2.1.283: chunk-18sktzq8.js S6/or,
// chunk-mzg9kbjz.js mode-cycle S7, chunk-n3x3cg10.js wr.
import type {PermissionMode} from '../types/permissions.js'
import {queueScreenReaderAnnouncement} from './screen-reader-state.js'

const modeIndicators: Record<PermissionMode, string> = {
  default: 'manual mode',
  plan: 'plan mode',
  acceptEdits: 'accept edits',
  bypassPermissions: 'bypass permissions',
  dontAsk: "don't ask",
  auto: 'auto mode',
  bubble: 'manual mode', // not user-addressable; official S6 falls back to default
}

/** Official S7(`[${S6(mode)} on]`) on a committed mode transition. */
export function announceScreenReaderMode(mode: PermissionMode): void {
  queueScreenReaderAnnouncement(`[${modeIndicators[mode]} on]`)
}

/** Official wr: announce a kill, suppressing masked input and empty kills. */
export function announceScreenReaderKill(killed: string, mask: string): void {
  if (killed === '') return
  if (mask !== '') {
    queueScreenReaderAnnouncement('deleted')
    return
  }
  const spoken = killed.trim() === ''
    ? killed.includes('\n') ? 'new line' : killed.includes('\t') ? 'tab' : 'space'
    : killed.replaceAll('\n', ' ').trim()
  queueScreenReaderAnnouncement(spoken)
}

/** Local interactive /effort result adapter; the official S7 calls are nudge-only. */
export function announceScreenReaderEffortResult(message: string, changed: boolean): void {
  if (changed || message.startsWith('Failed to set effort level:'))
    queueScreenReaderAnnouncement(`[${message}]`)
}
