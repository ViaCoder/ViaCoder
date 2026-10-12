import React,{createContext,useContext,useState,useEffect,useRef,useMemo,Suspense,use} from 'react'
import {c} from 'react/compiler-runtime'
import {jsx,jsxs,Fragment} from 'react/jsx-runtime'
import {z} from 'zod/v4'
import {Box,Text} from '../../ink.js'
import {useTerminalFocus} from '../../ink/hooks/use-terminal-focus.js'
import {useScreenReader} from '../../ink/components/ScreenReaderContext.js'
import {usageInputGuards287 as input,useUsageInputTimeout287 as timer} from '../../ink/usageInputBindings287.js'
import {Select} from '../../components/CustomSelect/select.js'
import {Dialog} from '../../components/design-system/Dialog.js'
import {ProgressBar} from '../../components/design-system/ProgressBar.js'
import {Byline} from '../../components/design-system/Byline.js'
import {ConfigurableShortcutHint} from '../../components/ConfigurableShortcutHint.js'
import {useKeybinding,useKeybindings} from '../../keybindings/useKeybinding.js'
import {getSubscriptionType} from '../../utils/auth.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {getTheme} from '../../utils/theme.js'
import {logError} from '../../utils/log.js'
import {logEvent} from '../analytics/index.js'
import {extraUsage} from '../../commands/extra-usage/index.js'
import {getPolicyPublicClient287} from '../policyLimits/publicBindings287.js'
import {createLocalSessionUsageHost} from '../../cli/control/usageHost.js'
import {nativeUsageTranscripts287} from './usageTranscripts287.js'
import {getUsagePrograms287,usageProgramConfig287,usageBody287,usageScopedModels287} from './usageConsumers287.js'
import {createUsageUiRenderer287,createUsageUiNotices287,createUsageUiResetText287,createUsageUiDate287,createUsageUiLeaf287,createUsageUiFormats287,createUsageUiCron287,createUsageUiCurrency287,createUsageTranscriptPolicy287,createUsageBehavior287,createUsageSchemaBuilder287,createUsageCedarConfirm287,createUsageConfirmSelect287} from './officialUsage287/runtime.js'
import type {UsageConsumerPorts287} from './officialUsage287/runtime.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'

export type UsageUiContext287={credentials?:CredentialStore;storageV5?:unknown}
const Context=createContext<UsageUiContext287>({})
const elements={w:c,e:jsx,r:jsxs,n:Text,s:Box,b:Symbol.for('react.memo_cache_sentinel'),g:useState}
const notices=createUsageUiNotices287({k:getFeatureValue_CACHED_MAY_BE_STALE,f:createUsageSchemaBuilder287({}),T:z.array,u:z.object,o:z.string,Id:z.custom,MN:getTheme})
const aggregate=createUsageBehavior287({ue:nativeUsageTranscripts287.read})
const policy=createUsageTranscriptPolicy287({on:(name:string)=>getPolicyPublicClient287().on(name),wh:(name:string)=>getPolicyPublicClient287().wh(name),ase:()=>getPolicyPublicClient287().ase(),
 x3:(name:string)=>getPolicyPublicClient287().x3(name),op:(...args:Parameters<ReturnType<typeof getPolicyPublicClient287>['op']>)=>getPolicyPublicClient287().op(...args)})
/** Props only enter the original app-context cut; authentication, snapshots and
 * transcript state remain in their existing production owners. */
export function getUsageUiPorts287(context:()=>UsageUiContext287=()=>useContext(Context)):UsageConsumerPorts287 {
 const host=(storageV5?:unknown,credentials?:CredentialStore)=>createLocalSessionUsageHost(()=>false,{storageV5,credentials})
 return {...elements,Te:context,eJt:(storageV5?:unknown)=>host(storageV5).seedRateLimits!(storageV5),uMn:(storageV5?:unknown,credentials?:CredentialStore)=>host(storageV5,credentials).readRateLimits(),
  y:(name:string)=>logEvent('tengu_feature_ok',{}),m:(name:string,reason:string)=>logEvent('tengu_feature_bad',{}),p:(name:string,reason:string)=>logEvent('tengu_feature_degraded',{}),
  FS:createUsageUiDate287({}),JLt:usageBody287.JLt,R:useEffect,We:useKeybinding,be:Byline,et:ConfigurableShortcutHint,ir:getSubscriptionType,
  jMr:notices,but:usageBody287.but,Gne:usageScopedModels287.Gne,Bbt:createUsageUiResetText287({}),SA:ProgressBar,K:Fragment,
  kMe:policy,lRt:aggregate,d:logError,br:Suspense,ur:use,Qt:useKeybindings,FC:createUsageUiCron287({}),fr:createUsageUiFormats287({}),F6:extraUsage,
  UL:createUsageUiLeaf287(elements),gi:createUsageUiCurrency287({}),
 }
}
const Renderer=createUsageUiRenderer287(getUsageUiPorts287())
export function UsageRenderer287({maxWidth,...context}:UsageUiContext287&{maxWidth:number}){
 const value=useMemo(()=>context,[context.credentials,context.storageV5])
 return <Context.Provider value={value}><Renderer maxWidth={maxWidth}/></Context.Provider>
}
export {useUsageInputGuard287,useUsageInputTimeout287} from '../../ink/usageInputBindings287.js'
const confirm=createUsageConfirmSelect287({...elements,nc:useTerminalFocus,kr:timer,Ze:useScreenReader,b0n:input.b0n,$e:Select,Ci:Symbol('NO_COMMITTED_ROW')})
/** Complete original confirmation callbacks/dwell/latch; POST uses the same
 * host-scoped Cedar owner and same shared request/credential service. */
export function getUsageCedarConfirmPorts287():UsageConsumerPorts287{
 const owner=getUsagePrograms287()
 return {...elements,A:useRef,...input,mo:250,un:Symbol.for('react.early_return_sentinel'),
  rM:usageProgramConfig287.rM,h4:owner.cedarTokens,Vdr:owner.cedarConfirmationNote,qdr:owner.cancelCedar,Kdr:owner.claimCedar,Wm:usageProgramConfig287.Wm,
  he:Dialog,qn:confirm}
}
export function UsageCedarConfirm287(props:React.ComponentProps<ReturnType<typeof createUsageCedarConfirm287>>){
 const Confirm=useMemo(()=>createUsageCedarConfirm287(getUsageCedarConfirmPorts287()),[])
 return <Confirm {...props}/>
}
