import type React from 'react'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
export interface OnboardingProps287 {host:ExecutionSession287['host'];onDone():void}
export interface OnboardingRuntime287 {Onboarding:React.ComponentType<OnboardingProps287>;Preflight:React.ComponentType<{onSuccess():void}>;checkEndpoints():Promise<{success:boolean;error?:string;sslHint?:string;usedProxy?:boolean}>}
export function createOnboarding287(ports:Record<string,unknown>):OnboardingRuntime287
