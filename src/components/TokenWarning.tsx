import {c} from 'react/compiler-runtime'
import {useSyncExternalStore} from 'react'
import {jsx} from 'react/jsx-runtime'
import {Text} from '../ink.js'
import {useAppState} from '../state/AppState.js'
import {getClearSourceModule287} from '../commands/clear/lifecycle287.js'
import {getCompactModelFacts287} from '../services/compact/autoCompact.js'
import {compactWarningStore} from '../services/compact/compactWarningState.js'
import {isEnvTruthy} from '../utils/envUtils.js'
import {getUpgradeMessage} from '../utils/model/contextWindowUpgradeCheck.js'
import {createTokenWarning287} from './officialTokenWarning287/native.js'

// Stateless original renderer. z subscribes to the actual owning AppStore;
// model facts preserve the accepted third-party context-capacity integration.
const compact=(name:string)=>(...args:unknown[])=>(getClearSourceModule287('chunk-mphp7acd.js')[name] as (...args:unknown[])=>unknown)(...args)
const renderer=createTokenWarning287({w:c,z:useAppState,ice:compact('ice'),Vu:getCompactModelFacts287,
 kt:useSyncExternalStore,fWo:compactWarningStore.subscribe,pWo:compactWarningStore.getState,
 bm:compact('bm'),ole:getUpgradeMessage,b:Symbol.for('react.memo_cache_sentinel'),nne:compact('nne'),YV:compact('YV'),e:jsx,n:Text,Le:isEnvTruthy})
export const TokenWarning=renderer.iK
export const selectAutoCompactWindow287=renderer.xDt
export const selectRemoteAutocompactState287=renderer.RDt
