import {p_o} from './officialAutoCompactState287/native.js'
import type {AppState} from './AppStateStore.js'

/** Original startup p_o. No default, merged inference, or env mutation. */
export const resolveInitialAutoCompactWindow287=p_o

/** The very same kqe consumed by IJ/Ml. The projection leaves unrelated C fields alone. */
export function applyAutoCompactFlagState287(
  settings:{autoCompactWindow?:unknown},
  setAppState:(updater:(state:AppState)=>AppState)=>void,
):void {
  if(!('autoCompactWindow' in settings))return
  const {getOriginalModsLifecycle287}=require('../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../utils/hooks/modelSwitch287/lifecycleRuntime.js')
  const kqe=getOriginalModsLifecycle287().clearSourceModule287('chunk-da7sx57w.js').kqe as (settings:{autoCompactWindow:unknown},setState:typeof setAppState)=>void
  kqe({autoCompactWindow:settings.autoCompactWindow},setAppState)
}
