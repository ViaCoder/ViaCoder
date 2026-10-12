import {getExecutionSession287} from '../context/execution287.js'
import {getGlobalConfig} from '../../utils/config.js'
import {resolveThemeSetting} from '../../utils/systemTheme.js'
import {getNativeTipModule287} from './tipsProduction287.js'
import type {Tip,TipContext} from './types.js'

/** Existing prefetch callers use the current execution/theme owner. The full
 * original un and f are shared with Btt; the old marketplace boolean/cache and
 * authored external/internal arrays no longer exist. */
export function getRelevantTips(context?:TipContext):Promise<Tip[]>{
 return getNativeTipModule287().public.getRelevantTips({
  ...context,session:context?.session??getExecutionSession287(),
  theme:context?.theme??resolveThemeSetting(getGlobalConfig().theme),
 })
}
