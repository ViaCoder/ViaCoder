import type { Command, LocalCommandCall } from '../../types/command.js'

/** Extra transport metadata until the shared Command type is restored. */
export type TextCommand = Extract<Command, { type: 'local' }> & {
  thinClientDispatch?: 'post-text' | 'control-request'
  terminalOriented?: boolean
}
export const text = (value: string) => ({ type: 'text' as const, value })
export const HELP_ARGS = ['help', '-h', '--help']
export const INFO_ARGS = ['current', 'status']
export function textCommand(
  name: string, description: string, load: () => Promise<{call: LocalCommandCall}>,
  metadata: Partial<Omit<TextCommand, 'type' | 'name' | 'load'>> = {},
): TextCommand {
  return { type: 'local', name, description, supportsNonInteractive: true, load, ...metadata }
}
