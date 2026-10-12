import type {AppState} from '../state/AppStateStore.js'
import {getPrintHostSource287} from '../cli/printOwnership287/publicHostRuntime287.js'
import {seedRemoteAutocompact287,clearRemoteAutocompact287} from '../cli/printOwnership287/publicHostNative.js'
import {logEvent} from '../services/analytics/index.js'

export type RemoteAutocompactState287=NonNullable<AppState['remoteAutocompactState']>
export type AutocompactStateSetter287=(update:(state:AppState)=>AppState)=>void

/** Stateless views over the original adapter. The receiving AppStore owns
 * the snapshot; neither the transport nor this module caches a second copy. */
export function readRemoteAutocompactState287(value:unknown):RemoteAutocompactState287|undefined {
 return (getPrintHostSource287('chunk-209ds336.js','tlr') as (value:unknown)=>RemoteAutocompactState287|undefined)(value)
}
export function adoptRemoteAutocompactState287(setState:AutocompactStateSetter287,value:unknown,via:'stream'|'thin_client_stream'):void {
 const adopt=getPrintHostSource287('chunk-209ds336.js','$Rn') as (setState:AutocompactStateSetter287,value:unknown,via:unknown)=>void
 const stamp=getPrintHostSource287('chunk-n4qghq20.js','S') as (value:string)=>unknown
 adopt(setState,value,stamp(via))
}
export function seedRemoteAutocompactState287(setState:AutocompactStateSetter287,seed:RemoteAutocompactState287|undefined):void {
 if(seed===undefined)return
 seedRemoteAutocompact287({h:{seedAutocompactState:seed},Uo:setState,i:logEvent,
  S:getPrintHostSource287('chunk-n4qghq20.js','S') as Function,c:getPrintHostSource287('chunk-n4qghq20.js','c') as Function})
}
export const clearRemoteAutocompactState287=clearRemoteAutocompact287
