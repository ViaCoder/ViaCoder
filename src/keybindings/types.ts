import type { KEYBINDING_ACTIONS, KEYBINDING_CONTEXTS } from './schema.js'

export type KeybindingContextName = (typeof KEYBINDING_CONTEXTS)[number]
  | 'MessageActions' // Present only in the gated local MessageActions consumer.
export type KeybindingAction = (typeof KEYBINDING_ACTIONS)[number] | `command:${string}`

// File loading accepts strings before validation. Do not claim unknown JSON
// action names have already passed the public schema at this boundary.
export type KeybindingBlock = {
  context: KeybindingContextName
  bindings: Record<string, string | null>
}

export type ParsedKeystroke = {
  key: string
  ctrl: boolean
  alt: boolean
  shift: boolean
  meta: boolean
  super: boolean
}
export type Chord = ParsedKeystroke[]
export type ParsedBinding = {
  chord: Chord
  action: string | null
  context: KeybindingContextName
}
