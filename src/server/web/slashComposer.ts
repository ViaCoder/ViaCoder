/** Pure Web composer state. A selected command is UI state, not an execution. */
export type SlashCommandEntry = {
  name: string
  aliases?: readonly string[]
  description?: string
  argumentHint?: string
  supported?: boolean
  disabled?: boolean
}

export type SlashToken = { name: string; sessionKey: string }
export type SlashDraft = { input: string; token: SlashToken | null }
export type SlashCandidate = { name: string; description: string; argumentHint: string; matchedName: string }

export type SlashSerialization =
  | { kind: 'command'; intent: 'command'; text: string }
  | { kind: 'literal'; intent: 'literal'; text: string }
  | { kind: 'blocked'; intent: 'literal' | 'command'; text: string; reason: 'literal-boundary-required' | 'stale-command' | 'unsupported-command' }

const COMMAND_NAME = /^[a-zA-Z0-9_:-]+$/
const available = (command: SlashCommandEntry) => command.supported !== false && command.disabled !== true && COMMAND_NAME.test(command.name)
// The official parser splits on the literal space character, not all \s.
// A newline/tab starting the argument tail therefore still needs one separator.
const commandText = (name: string, tail: string) => `/${name}${tail && !tail.startsWith(' ') ? ' ' : ''}${tail}`

/**
 * Only a slash at offset 0 opens suggestions. The cursor must remain inside
 * the command word. No fuzzy/description matches: /zz has no menu.
 */
export function getSlashCandidates(
  input: string,
  cursor: number,
  commands: readonly SlashCommandEntry[],
  options: { composing?: boolean; selected?: SlashToken | null } = {},
): SlashCandidate[] {
  if (options.composing || options.selected || !input.startsWith('/') || cursor < 1 || cursor > input.length) return []
  const word = /^\/([a-zA-Z0-9_:-]*)/.exec(input)
  if (!word || cursor > word[0].length || (cursor < input.length && /[a-zA-Z0-9_:-]/.test(input[cursor]))) return []
  const prefix = input.slice(1, cursor).toLowerCase()
  const seen = new Set<string>()
  return commands.flatMap(command => {
    if (!available(command) || seen.has(command.name)) return []
    const match = [command.name, ...(command.aliases ?? [])].find(name => name.toLowerCase().startsWith(prefix))
    if (!match) return []
    seen.add(command.name)
    return [{ name: command.name, matchedName: match, description: command.description ?? '', argumentHint: command.argumentHint ?? '' }]
  })
}

/** Select replaces only the leading command word; the exact argument tail stays. */
export function selectSlashCandidate(
  input: string,
  candidateName: string,
  commands: readonly SlashCommandEntry[],
  sessionKey: string,
  options: { composing?: boolean } = {},
): SlashDraft | null {
  if (options.composing) return null
  const match = /^\/([a-zA-Z0-9_:-]*)(?=\s|$)/.exec(input)
  const command = commands.find(item => item.name === candidateName && available(item))
  if (!match || !command || !sessionKey) return null
  const prefix = match[1].toLowerCase()
  if (![command.name, ...(command.aliases ?? [])].some(name => name.toLowerCase().startsWith(prefix))) return null
  return { input: input.slice(match[0].length), token: { name: command.name, sessionKey } }
}

/** Deleting/backspacing the chip expands it to editable original command text. */
export function expandSlashToken(draft: SlashDraft): SlashDraft {
  return draft.token ? { input: commandText(draft.token.name, draft.input), token: null } : draft
}

/** Remove a chip without discarding its argument tail. */
export function removeSlashToken(draft: SlashDraft): SlashDraft {
  return draft.token ? { input: draft.input, token: null } : draft
}

/**
 * Call at send time, not on selection. Do not send a blocked result. The
 * Callers must opt in to the local per-turn literal boundary only when the
 * connected worker supports it; otherwise leading slash text is held.
 * Never rewrite literal text.
 */
export function serializeSlashComposer(
  draft: SlashDraft,
  commands: readonly SlashCommandEntry[],
  sessionKey: string,
  options: { literalBoundaryAvailable?: boolean } = {},
): SlashSerialization {
  if (!draft.token) return draft.input.startsWith('/') && !options.literalBoundaryAvailable
    ? { kind: 'blocked', intent: 'literal', text: draft.input, reason: 'literal-boundary-required' }
    : { kind: 'literal', intent: 'literal', text: draft.input }
  if (draft.token.sessionKey !== sessionKey) return { kind: 'blocked', intent: 'command', text: draft.input, reason: 'stale-command' }
  const command = commands.find(item => item.name === draft.token!.name)
  if (!command || !available(command)) return { kind: 'blocked', intent: 'command', text: draft.input, reason: 'unsupported-command' }
  return { kind: 'command', intent: 'command', text: commandText(command.name, draft.input) }
}
