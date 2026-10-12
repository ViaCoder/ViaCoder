import type { LocalCommandCall } from '../../types/command.js'

export const call: LocalCommandCall = async (args, context) => {
  // The whole q closure owns preview/warn/force, remote forwarding and refresh.
  // Context and its setter are the existing command/session/AppState owner.
  const {ordinaryPluginSource287} = await import('../../utils/plugins/ordinaryPlugin287.js')
  const original = ordinaryPluginSource287('chunk-39q0qaj3.js').call as LocalCommandCall
  return original(args, context)
}

