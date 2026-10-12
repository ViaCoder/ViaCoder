import {useEffect,useRef,useSyncExternalStore} from 'react'
import {getUsagePrograms287} from './usageConsumers287.js'
import {getBannerNotices287} from '../../components/LogoV2/noticesProduction287.js'
import type {UsageProgramLimit287} from './officialUsage287/runtime.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'

/** Original wall entries and dialog re-probes share the original host states.
 * UI owns only effect cancellation/re-render, never an eligibility or usage cache. */
export function useUsagePrograms287(limit:UsageProgramLimit287,credentials?:CredentialStore){
 const owner=getUsagePrograms287()
 const cedar=useSyncExternalStore(owner.subscribeCedar,owner.cedarState,owner.cedarState)
 const juniper=useSyncExternalStore(owner.subscribeJuniper,owner.juniperState,owner.juniperState)
 const retriedCedar=useRef(false),retriedJuniper=useRef(false),recheckedCedar=useRef(false)
 useEffect(()=>{
  if(cedar.phase==='failed'&&!retriedCedar.current){retriedCedar.current=true;owner.dialogCedar(limit,credentials)}
  else if(cedar.phase==='answered'&&!recheckedCedar.current){recheckedCedar.current=true;owner.dialogCedar(limit,credentials)}
 },[owner,cedar.phase,limit,credentials])
 useEffect(()=>{if(juniper.phase==='failed'&&!retriedJuniper.current){retriedJuniper.current=true;owner.dialogJuniper(limit,credentials)}},[owner,juniper.phase,limit,credentials])
 return {cedar,juniper,cedarSpent:owner.cedarSpent(limit),juniperSpent:owner.juniperSpent(limit)}
}

/** Original Qo St latch: only a true l4t kickoff is latched; storageV5 is the same ToolUseContext scope. */
export function useUsageLimitWallPromo287(limit:UsageProgramLimit287,credentials?:CredentialStore,storageV5?:unknown){
 const started=useRef(false)
 useEffect(()=>{if(started.current)return;started.current=getBannerNotices287().limitWallPromo287.kickoff(limit,credentials,storageV5)},[limit,credentials,storageV5])
}
