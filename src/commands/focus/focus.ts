import { getIsRemoteMode } from '../../bootstrap/state.js'
import {focusPrompt287} from '../../constants/focusPrompt287.js'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { getGlobalConfig, saveGlobalConfig } from '../../utils/config.js'
import { isFullscreenActive } from '../../utils/fullscreen.js'
import { getInitialSettings } from '../../utils/settings/settings.js'
import { createCommands } from './official-command.js'

export const call: LocalJSXCommandCall = async (onDone, context, _args) => {
  const commands=createCommands({
    Qan:focusPrompt287.override, Qe:getInitialSettings, le:getGlobalConfig,
    Ce:async (update:Parameters<typeof saveGlobalConfig>[0])=>saveGlobalConfig(update),
    jlt:focusPrompt287.invalidate,
    Kzt:()=>getIsRemoteMode() ? " (applied locally — this remote transport can't update the remote session)" : null,
    can:()=>true, Blt:()=>false,
  })
  const official=await commands.interactive()
  return official.call(onDone,{
    ...context, presentation:isFullscreenActive() ? 'fullscreen' : 'default',
    onQueryEvent:(event:{settings:{briefTranscript:boolean}})=>context.setAppState(previous=>({
      ...previous,briefTranscript:event.settings.briefTranscript,
    })),
  })
}
