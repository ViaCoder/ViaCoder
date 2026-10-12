import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {createPrintTaskLaunchNative287} from './printLaunchNative.js'

export interface PrintTaskLaunchBinding287 {
  readonly host:ExecutionSession287['host']
  singleShot():boolean
  inputClosed():boolean
  markInputClosed():void
}

/** Exact pinned Kme classifier/Ceo expression before input normalization.
 * Capture the actual host so the eventual async input-close callback does
 * not mark a different host. No second owner, global STATE, or guessed -p bit. */
export function initializePrintTaskLaunch287(input:string|AsyncIterable<string>,options:{sdkUrl?:string}):PrintTaskLaunchBinding287 {
  const execution=getExecutionSession287()
  const launchOptions=execution.host.launchOptions
  const native=createPrintTaskLaunchNative287({executionContext:()=>({host:{launchOptions}})})
  native.initialize(input,options)
  return {host:execution.host,singleShot:native.singleShot,inputClosed:native.inputClosed,markInputClosed:native.markInputClosed}
}
