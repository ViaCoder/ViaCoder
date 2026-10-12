import type {HookEvent} from '../../../entrypoints/agentSdkTypes.js'
import type {HooksSettings} from '../../settings/types.js'
import type {RegisteredHooks287} from './registry.js'
export interface HookSessionPresence287 {
  has(sessionId:string,event:HookEvent):boolean
}
export interface HookEntryPredicatePorts287 {
  snapshot():HooksSettings|null
  managedOnly():boolean
  agentHooks():HooksSettings|undefined
  registered():RegisteredHooks287|null|undefined
  environment:Pick<import('../../officialTypedEnvironment287/native.js').TypedEnvironment287,'CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS'>
}
export interface HookEntryPredicates287 {
  hasEvent(event:HookEvent,registry:HookSessionPresence287|undefined,sessionIds:string|readonly string[]):boolean
  sessionEndTimeout():number
}
export function createHookEntryPredicates287(ports:HookEntryPredicatePorts287):HookEntryPredicates287
