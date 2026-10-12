import {getExecutionSession287} from '../context/execution287.js'
import {getGlobalConfig} from '../../utils/config.js'
import {resolveThemeSetting} from '../../utils/systemTheme.js'
import {getBuiltinPackageModule287} from '../../plugins/bundled/builtinInit287.js'
import {getNativeTipModule287} from './tipsProduction287.js'
import type {Tip,TipContext} from './types.js'
export function selectTipWithLongestTimeSinceShown(tips:Tip[]):Tip|undefined{return getNativeTipModule287('chunk-bj5yaztj.js').T(tips)}
export function getTipToShowOnSpinner(context?:TipContext):Promise<Tip|undefined>{return getNativeTipModule287('chunk-bj5yaztj.js').Oio({...context,session:context?.session??getExecutionSession287(),theme:context?.theme??resolveThemeSetting(getGlobalConfig().theme)})}
export function recordShownTip(tip:Tip):void{getBuiltinPackageModule287('chunk-bj5yaztj.js').jtt(tip,'spinner',undefined)}
