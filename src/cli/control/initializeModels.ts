import type {SDKControlInitializeResponse} from '../../entrypoints/sdk/controlTypes.js'

type Model = SDKControlInitializeResponse['models'][number]

/** Official tl/$kr: initialize publishes selectable rows separately from
 * disabled VS Code-only rows. list_models is a different, full picker view. */
export function projectInitializeModelAvailability(models: readonly Model[], gate: {
  entrypoint: string | undefined
  provider: string
  firstPartyBaseUrl: boolean
}): Pick<SDKControlInitializeResponse, 'models' | 'unavailable_models'> {
  const active = models.filter(model => model.disabled !== true)
  const unavailable = gate.entrypoint === 'claude-vscode' &&
    gate.provider === 'firstParty' && gate.firstPartyBaseUrl
      ? models.filter(model => model.disabled === true)
      : []
  return {models: active, ...(unavailable.length > 0 && {unavailable_models: unavailable})}
}
