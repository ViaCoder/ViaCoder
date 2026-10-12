import type React from 'react'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
export interface ProTrialStatus287 {status:'ineligible'|'not_started'|'active'|'expired';daysRemaining:number|null}
export interface ProTrialStartProps287 {onDone():void;storageV5?:unknown;credentials?:CredentialStore}
export interface ProTrialStartupPorts287 {
 rnt():ProTrialStatus287;i(name:string,metadata:Record<string,never>):void
 e:typeof import('react/jsx-runtime').jsx;T?:unknown;x?:CredentialStore
 importScreen287():Promise<{ProTrialStartScreen:React.ComponentType<ProTrialStartProps287>}>
}
export function createProTrialStartupStage287(ports:ProTrialStartupPorts287):(done:()=>void)=>Promise<React.ReactNode>
export interface HeldHooksStartupPorts287 {
 T?:unknown;x?:CredentialStore;d(error:Error):void;Z(error:unknown):Error
 importHeldHooks287():Promise<{loadHooksModulesHeldForTrust(storageV5?:unknown,credentials?:CredentialStore):void}>
}
export function createHeldHooksStartup287(ports:HeldHooksStartupPorts287):()=>Promise<void>
