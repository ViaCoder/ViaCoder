import {useMemo,useEffect,useReducer} from 'react'
import {useAppState} from '../../state/AppState.js'
import {subscribeServedCatalog} from './servedCatalog.js'
import {onGrowthBookRefresh} from '../../services/analytics/growthbook.js'
import {getOfficialModelMenuPolicy287} from './officialModelPicker287.js'
import {sourceRunningModel287,sourceModelSessionController287} from './officialModelPicker287/session.js'
import {createModelCommandModelViews287} from './officialModelCommand287/native.js'
export function createModelCommandViewsHostPorts287():Record<string,unknown>{return {
 Q:useMemo,R:useEffect,Uh:useReducer,z:useAppState,al:()=>useAppState(s=>s.settings),
 Qz:sourceRunningModel287.Qz,ZHt:sourceModelSessionController287.ZHt,vTe:sourceModelSessionController287.vTe,
 xp:(listener:()=>void)=>{const a=subscribeServedCatalog(listener),b=onGrowthBookRefresh(listener);return ()=>{a();b()}},
 nqo:(listener:()=>void)=>{const subscribe=getOfficialModelMenuPolicy287().nqo;if(typeof subscribe!=='function')throw Error('Unbound original tier move subscription');return subscribe(listener)},
 }}
export const sourceModelCommandViews287=createModelCommandModelViews287(createModelCommandViewsHostPorts287())
