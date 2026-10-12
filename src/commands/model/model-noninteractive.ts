import type { LocalCommandCall } from '../../types/command.js'
import { MODEL_ALIASES } from '../../utils/model/aliases.js'
import { checkOpus1mAccess, checkSonnet1mAccess } from '../../utils/model/check1mAccess.js'
import { getDefaultMainLoopModelSetting, getDefaultOpusModel, getDefaultSonnetModel, getMarketingNameForModel, isOpus1mMergeEnabled, renderDefaultModelSetting } from '../../utils/model/model.js'
import { isModelAllowed } from '../../utils/model/modelAllowlist.js'
import { validateModel } from '../../utils/model/validateModel.js'
import { clearFastModeCooldown, isFastModeEnabled, isFastModeSupportedByModel } from '../../utils/fastMode.js'
import { isBilledAsExtraUsage } from '../../utils/extraUsage.js'
import { HELP_ARGS, INFO_ARGS, text } from '../noninteractive/types.js'
import { checkModelSwitch, recordModelSwitch287, timeout, withInferenceChange } from '../noninteractive/modelSwitch.js'

export const modelCommandDependencies = { validateModel, checkModelSwitch, validationTimeoutMs: 15_000 }
const label = (model: string | null) => `${renderDefaultModelSetting(model ?? getDefaultMainLoopModelSetting())}${model === null ? ' (default)' : ''}`
const modelName = (model: string, fallback: string) => getMarketingNameForModel(model) ?? fallback
const usage = () => `Usage: /model <name>. Available: ${MODEL_ALIASES.join(', ')}, default, or a full model ID.`
// chunk-7h0dyhjk.js:k. Account substitution/remote flag propagation still need host integration.
export const call: LocalCommandCall = async (args, context) => {
  const input = args.trim()
  if (!input || INFO_ARGS.includes(input)) {
    const state = context.getAppState()
    const effort = state.effortValue == null ? '' : ` (effort: ${state.effortValue})`
    const info = state.mainLoopModelForSession
      ? `Current model: ${label(state.mainLoopModelForSession)} (session override from plan mode)\nBase model: ${label(state.mainLoopModel)}${effort}`
      : `Current model: ${label(state.mainLoopModel)}${effort}`
    return text(`${info}\n${usage()}`)
  }
  if (HELP_ARGS.includes(input)) return text(usage())
  return withInferenceChange(context, async () => {
    const model = input.toLowerCase() === 'default' ? null : input
    if (model && !isModelAllowed(model)) return text(`Model '${model}' is not available. Your organization restricts model selection.`)
    const lower = model?.toLowerCase() ?? ''
    if (lower.includes('fable')) return text('Fable uses usage credits and needs a one-time consent · pick Fable from /model in an interactive session to set it up')
    if (lower.includes('opus') && lower.includes('[1m]') && !isOpus1mMergeEnabled() && !checkOpus1mAccess()) return text(`${modelName(getDefaultOpusModel(), 'Opus')} with 1M context is not available for your account. Learn more: https://code.claude.com/docs/en/model-config#extended-context-with-1m`)
    if ((lower.includes('sonnet[1m]') || lower.includes('sonnet-4-6[1m]')) && !checkSonnet1mAccess()) return text(`${modelName(getDefaultSonnetModel(), 'Sonnet')} with 1M context is not available for your account. Learn more: https://code.claude.com/docs/en/model-config#extended-context-with-1m`)
    if (model && !(MODEL_ALIASES as readonly string[]).includes(lower)) {
      const result = await timeout(modelCommandDependencies.validateModel(model), modelCommandDependencies.validationTimeoutMs)
      if (!result) return text(`Couldn't confirm model '${model}' is available (the check timed out) · try again`)
      if (!result.valid) return text(result.error ?? `Model '${model}' not found`)
    }
    const hook = await modelCommandDependencies.checkModelSwitch(model, context)
    if (hook.decision !== 'proceed') return text(`Model unchanged: ${hook.reason ?? 'blocked by PreModelSwitch'}${hook.decision === 'ask' ? ' (run /model interactively to confirm)' : ''}${hook.messages.length ? '\n' + hook.messages.join('\n') : ''}`)
    const fastWasOn = context.getAppState().fastMode
    const fastOff = isFastModeEnabled() && !!fastWasOn && !isFastModeSupportedByModel(model)
    recordModelSwitch287(model,context)
    context.setAppState(prev => ({ ...prev, mainLoopModel: model, mainLoopModelForSession: null, ...(fastOff ? { fastMode: false } : {}) }))
    if (isFastModeEnabled()) clearFastModeCooldown()
    let message = `Set model to ${label(model)}`
    if (isFastModeEnabled() && fastWasOn && !fastOff) message += ' · Fast mode ON'
    if (isBilledAsExtraUsage(model, !!fastWasOn && !fastOff, isOpus1mMergeEnabled())) message += ' · Billed as extra usage'
    if (fastOff) message += ' · Fast mode OFF'
    if (hook.messages.length) message += '\n' + hook.messages.join('\n')
    return text(message)
  })
}
