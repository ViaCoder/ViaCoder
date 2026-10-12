import { getIsNonInteractiveSession } from '../../bootstrap/state.js'
import type { Command } from '../../types/command.js'

/** Preserve identity (bridge allowlists) unless a JSX command explicitly supplies a text twin. */
export function adaptNonInteractiveCommand(command: Command, nonInteractive = getIsNonInteractiveSession()): Command {
  if (!nonInteractive || command.type !== 'local-jsx' || !command.loadNonInteractive) return command
  return { ...command, type: 'local', supportsNonInteractive: true, load: command.loadNonInteractive }
}
