import type React from 'react'
import {jsx} from 'react/jsx-runtime'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {logEvent} from '../../../services/analytics/index.js'
import {gracefulShutdownSync} from '../../../utils/gracefulShutdown.js'
import {isQualifiedForGrove} from '../../../services/api/grove.js'
import type {AccountSettings,ApiResult,GroveConfig} from '../../../services/api/grove.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import {createGroveStartupStage287,type GroveDialogProps287,type GroveStartupResult287} from './native.js'

type CachedRead287<T>=((credentials?:CredentialStore)=>Promise<ApiResult<T>>)&{cache:{clear?():void}}
export interface GrovePublicApi287 {
 EX:CachedRead287<AccountSettings>;Cge:CachedRead287<GroveConfig>
 mMn(credentials?:CredentialStore):Promise<void>;Dot(enabled:boolean,credentials?:CredentialStore):Promise<void>
 NVe(storageV5?:unknown,credentials?:CredentialStore):Promise<boolean>
 gMn(settings:ApiResult<AccountSettings>,config:ApiResult<GroveConfig>,showAlready:boolean):boolean
 Cgo(credentials?:CredentialStore):Promise<void>
}
export interface PrivacySettingsDialogProps287 {settings:AccountSettings;domainExcluded?:boolean;onDone():void}
function namespace(file:string):Record<string,unknown>{return getOriginalModsLifecycle287().clearSourceModule287(file)}
export function getGrovePublicApi287():GrovePublicApi287 {
 const owner=namespace('chunk-fb1bj6ca.js')
 for(const name of ['EX','Cge','mMn','Dot','NVe','gMn','Cgo'])if(typeof owner[name]!=='function')throw Error('Original Grove public dependency missing: '+name)
 return owner as Record<string,unknown>&GrovePublicApi287
}
export function getGroveDialog287():React.ComponentType<GroveDialogProps287>{
 const view=namespace('chunk-t34vwkcs.js').dPn
 if(typeof view!=='function')throw Error('Original Grove dialog missing')
 return view as React.ComponentType<GroveDialogProps287>
}
export function getPrivacySettingsDialog287():React.ComponentType<PrivacySettingsDialogProps287>{
 const view=namespace('chunk-t34vwkcs.js').uPn
 if(typeof view!=='function')throw Error('Original privacy-settings dialog missing')
 return view as React.ComponentType<PrivacySettingsDialogProps287>
}
/** Exactly one original stage and the existing host renderer/result owner. No
 * copied profile, credential store, request cache or parallel startup task. */
export async function showGroveStartup287(
 show:(renderer:(done:()=>void)=>React.ReactNode)=>Promise<void>,
 result:GroveStartupResult287,
 scope:{storageV5?:unknown;credentials?:CredentialStore}={},
):Promise<'shown'|'skipped'|'stop'>{
 let complete:()=>void=()=>{throw Error('Grove startup completed before mount')},stopped=false
 const stage=createGroveStartupStage287({
  NVe:isQualifiedForGrove,T:scope.storageV5,x:scope.credentials,e:jsx,i:logEvent,cs:gracefulShutdownSync,P:result,
  importGrove287:async()=>({GroveDialog:getGroveDialog287()}),
 })
 const node=await stage(stop=>{stopped=stop==='stop';complete()})
 if(node===null)return 'skipped'
 await show(done=>{complete=done;return node})
 return stopped?'stop':'shown'
}
