import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import {createContextUpgrade287} from '../../components/officialTokenWarning287/native.js'

// Complete original upgrade selection, including native-1M model gating.
// All getters resolve the same existing model/auth owner at actual call time.
const model=(name:string)=>(...args:unknown[])=>(getOriginalModsLifecycle287().clearSourceModule287('chunk-nankzm0s.js')[name] as (...args:unknown[])=>unknown)(...args)
const original=createContextUpgrade287({Xh:model('Xh'),wF:model('wF'),EF:model('EF'),Kb:model('Kb'),Bu:model('Bu'),xm:model('xm')})
export const getUpgradeMessage=original.ole
