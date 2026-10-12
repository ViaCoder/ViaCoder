import type { Command } from '../../types/command.js'

/**
 * Partition only the commands already supplied by the active command registry.
 * Discovery/availability checks belong to getCommands; help must not make a
 * hidden or unregistered command executable merely to list it.
 *
 * A name can also be a built-in alias while an available custom command uses
 * that exact name. Classifying by the command's own source avoids putting the
 * custom command in the default tab by mistake.
 */
export function projectHelpCommands(commands: readonly Command[]): {
  builtin: Command[]
  custom: Command[]
} {
  const builtin: Command[] = []
  const custom: Command[] = []

  for (const command of commands) {
    if (command.isHidden) continue
    if (command.type !== 'prompt' || command.source === 'builtin') {
      builtin.push(command)
    } else {
      custom.push(command)
    }
  }

  return { builtin, custom }
}
