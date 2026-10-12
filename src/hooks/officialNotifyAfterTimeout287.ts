import {useContext,useEffect,useState} from 'react'
import {useTerminalNotification} from '../ink/useTerminalNotification.js'
import {sendNotification} from '../services/notifier.js'
import type {NotificationContext287} from '../services/officialNotifications287/native.js'
import {getExecutionLastInteractionTime287} from '../services/context/execution287.js'
import {getOriginalModsLifecycle287} from '../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {OfficialRltRequestIdContext287} from '../utils/officialRlt287.js'

type OriginalClockHook287=(callback:()=>void,delay:number|null,options?:{immediate?:boolean})=>void
function useOriginalClock287(callback:()=>void,delay:number|null,options?:{immediate?:boolean}):void {
 // C ownership cut: formal permission/elicitation hosts already own Mye.
 // Invoke the same original oi with null, so no second timeout is registered.
 const hostRequestId=useContext(OfficialRltRequestIdContext287)
 const namespace=getOriginalModsLifecycle287().clearSourceModule287('chunk-jkt292h5.js') as {oi:OriginalClockHook287}
 namespace.oi(callback,hostRequestId===null?delay:null,options)
}
function useOriginalScope287():NotificationContext287 {
 const namespace=getOriginalModsLifecycle287().clearSourceModule287('chunk-038c023k.js') as {Te:()=>NotificationContext287}
 return namespace.Te()
}
// Complete official Mye + cco + nDt; oi/Jme reuse the existing Ink clock,
// and Te reads the existing canonical scope provider. No standalone interval,
// timestamp reset, cached scope or replacement notification dispatcher.
export const useOfficialNotifyAfterTimeout287=new Function('dP','Te','g','R','oi','Hg','kD',"function cco(h,v){return Date.now()-Math.max(Hg(),v)>=h};\nfunction Mye(h,v,D){let N=dP(),{storageV5:X,credentials:Se}=Te(),[_e,Pe]=g(!1),[Ie]=g(()=>Date.now());R(()=>{Pe(!1)},[h,v,N]),oi(()=>{if(!cco(nDt,Ie))return;if(Pe(!0),D!==void 0&&!D())return;kD({message:h,notificationType:v},N,{storageV5:X,credentials:Se})},_e?null:nDt)};\nvar nDt=6000;\nreturn Mye;")(useTerminalNotification,useOriginalScope287,useState,useEffect,useOriginalClock287,getExecutionLastInteractionTime287,sendNotification) as (message:string,notificationType:string,beforeNotify?:()=>boolean)=>void

export const DEFAULT_INTERACTION_THRESHOLD_MS=6000
