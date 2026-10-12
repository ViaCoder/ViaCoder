import type { LocalCommandCall } from '../../types/command.js'
import { getAvailableEffortLevels, getEffortValueDescription } from '../../utils/effort.js'
import { getDefaultMainLoopModelSetting, parseUserSpecifiedModel } from '../../utils/model/model.js'
import { executeEffortChange } from '../../utils/model/effortCommand.js'
import { HELP_ARGS, text } from '../noninteractive/types.js'
import { showCurrentEffort } from './effort.js'
// chunk-4asmpfc5.js:u; chunk-t1gbm7x6.js:Oje/F/w/O. CLI -p changes are session-only.
export const call: LocalCommandCall = async (args, context) => {
  const input = args.trim()
  const state = context.getAppState()
  const model = parseUserSpecifiedModel(state.mainLoopModelForSession ?? state.mainLoopModel ?? getDefaultMainLoopModelSetting())
  const levels = getAvailableEffortLevels(model)
  const usage = `Usage: /effort <${levels.join('|')}${levels.length ? '|' : ''}auto>`
  if (HELP_ARGS.includes(input)) return text(`Usage: /effort [${[...levels, 'auto'].join('|')}]\n\nEffort levels:\n${levels.map(level => `- ${level}: ${getEffortValueDescription(level)}`).join('\n')}\n- auto: Use the default effort level for your model`)
  if (!input) return text(usage)
  if (input === 'current' || input === 'status') return text(showCurrentEffort(state.effortValue, model).message)
  const result = executeEffortChange(input, model, !context.options.isNonInteractiveSession)
  if (result.effortUpdate) context.setAppState(prev => ({...prev, effortValue: result.effortUpdate!.value}))
  return text(result.message)
}
