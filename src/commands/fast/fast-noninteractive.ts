import type { LocalCommandCall } from '../../types/command.js'
import { clearFastModeCooldown, clearFastModeModelRejections287, FAST_MODE_MODEL_DISPLAY, getFastModeModel, getFastModeUnavailableReason, isFastModeEnabled, isFastModeSupportedByModel, prefetchFastModeStatus } from '../../utils/fastMode.js'
import { formatModelPricing, getOpus46CostTier } from '../../utils/modelCost.js'
import { getFastIconString } from '../../components/FastIcon.js'
import {updateOrdinarySettingsAsync287} from '../../utils/settings/fastStatusWriter287.js'
import { checkModelSwitch, timeout, withInferenceChange } from '../noninteractive/modelSwitch.js'
import { text } from '../noninteractive/types.js'
export const fastCommandDependencies = { isFastModeEnabled, getFastModeUnavailableReason, prefetchFastModeStatus, checkModelSwitch }
// chunk-c2mx6fyc.js:f -> chunk-n5efbxqn.js:lvt. OFF must work when enabling is unavailable.
export const call: LocalCommandCall = async (args, context) => {
  if (!fastCommandDependencies.isFastModeEnabled()) return text(fastCommandDependencies.getFastModeUnavailableReason() ?? 'Fast mode is not available')
  const input = args.trim().toLowerCase()
  if (input && input !== 'on' && input !== 'off') return text(`Unknown argument "${input}". Use: /fast [on|off]`)
  const optionFastMode = (context.options as typeof context.options & {fastMode?:boolean}).fastMode
  const enable = input ? input === 'on' : !(optionFastMode ?? context.getAppState().fastMode)
  const persist = !context.options.isNonInteractiveSession
  return withInferenceChange(context, async () => {
    await timeout(fastCommandDependencies.prefetchFastModeStatus(context.storageV5, context.credentials), 8_000)
    const reason = fastCommandDependencies.getFastModeUnavailableReason()
    if (enable && reason) return text(`Fast mode unavailable: ${reason}`)
    const before = context.getAppState().mainLoopModel
    const promote = enable && !isFastModeSupportedByModel(before)
    const target = getFastModeModel()
    let messages: string[] = []
    if (promote) {
      const decision = await fastCommandDependencies.checkModelSwitch(target, context)
      if (decision.decision !== 'proceed') return text(`Fast mode unchanged: ${decision.reason ?? 'blocked by PreModelSwitch'}${decision.decision === 'ask' ? ' (use /model to switch, then /fast)' : ''}`)
      messages = decision.messages
      if (context.getAppState().mainLoopModel !== before) return text('Fast mode was not enabled: the model changed while PreModelSwitch hooks ran; try again')
    }
    if (persist) {
      const { error } = await updateOrdinarySettingsAsync287('userSettings', { fastMode: enable ? true : undefined },context.storageV5)
      if (error) return text(`Could not save fast mode: ${error.message}`)
    }
    clearFastModeCooldown()
    if (enable) clearFastModeModelRejections287()
    context.setAppState(prev => ({ ...prev, fastMode: enable, ...(promote ? { mainLoopModel: target, mainLoopModelForSession: null } : {}) }))
    const suffix = persist ? '' : ' (this session only)'
    return text(enable
      ? `${getFastIconString(true)} Fast mode ON${promote ? ` · model set to ${FAST_MODE_MODEL_DISPLAY}` : ''} · ${formatModelPricing(getOpus46CostTier(true))}${suffix}${messages.length ? '\n' + messages.join('\n') : ''}`
      : `Fast mode OFF${suffix}`)
  })
}
