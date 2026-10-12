import type { LocalJSXCommandContext } from '../../commands.js'
import type { LocalCommandResult } from '../../types/command.js'
import {
  runOfficialLowPriority,
} from '../../utils/lowPriority.js'

export async function call(
  _args: string,
  _context: LocalJSXCommandContext,
): Promise<LocalCommandResult> {
  return {type: 'text', value: runOfficialLowPriority('command')}
}
