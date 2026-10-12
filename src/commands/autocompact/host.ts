import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {applyAutoCompactFlagState287} from '../../state/autoCompactState287.js'
import {updateOrdinarySettingsAsync287} from '../../utils/settings/fastStatusWriter287.js'
import {getInitialSettings} from '../../utils/settings/settings.js'
import type { AutoCompactCommandContext, AutoCompactHost } from './autocompact.js'

const original=(name:string)=>(...args:unknown[])=>(getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')[name] as (...args:unknown[])=>any)(...args)
/** vRt -> original hn -> same settings owner; event -> original kqe -> AppState. */
export function localAutoCompactHost(context:AutoCompactCommandContext):AutoCompactHost {
  return {
    resolve:(model,override)=>original('wE')(original('Vu')(model),override),
    readSetting:()=>getInitialSettings().autoCompactWindow,
    isEnabled:()=>original('bm')(),
    async saveSetting(autoCompactWindow) {
      return updateOrdinarySettingsAsync287('userSettings',{autoCompactWindow},context.storageV5)
    },
    apply(value) {
      applyAutoCompactFlagState287({autoCompactWindow:value},context.setAppState)
      // IJ/Ml use kqe too. A second delivery of the same value returns the same
      // state identity and produces no duplicate store notification.
      const eventContext=context as typeof context & {onQueryEvent?:(event:{type:'apply_flag_settings';settings:{autoCompactWindow:number|null}})=>void}
      eventContext.onQueryEvent?.({type:'apply_flag_settings',settings:{autoCompactWindow:value}})
    },
  }
}
