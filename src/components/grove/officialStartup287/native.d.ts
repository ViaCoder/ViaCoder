import type React from 'react'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
export interface GroveStartupResult287 {onboardingShown:boolean;claudeInChromeAccepted?:boolean}
export type GroveDecision287='accept_opt_in'|'accept_opt_out'|'defer'|'escape'|'skip_rendering'
export interface GroveDialogProps287 {showIfAlreadyViewed:boolean;location:'settings'|'policy_update_modal'|'onboarding';onDone(decision:GroveDecision287):void}
export interface GroveStartupPorts287 {
 NVe(storageV5?:unknown,credentials?:CredentialStore):Promise<boolean>
 T?:unknown;x?:CredentialStore;e:typeof import('react/jsx-runtime').jsx
 i(name:string,metadata:Record<string,never>):void;cs(code:number):void
 P:GroveStartupResult287
 importGrove287():Promise<{GroveDialog:React.ComponentType<GroveDialogProps287>}>
}
export function createGroveStartupStage287(ports:GroveStartupPorts287):(done:(stop?:'stop')=>void)=>Promise<React.ReactNode>
