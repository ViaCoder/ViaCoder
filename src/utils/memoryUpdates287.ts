import * as fs from 'node:fs'
import {open} from 'node:fs/promises'
import {z} from 'zod/v4'
import {getFsImplementation,safeResolvePath} from './fsOperations.js'
import {expandPath} from './path.js'
import {errorMessage} from './errors.js'
import {lazySchema} from './lazySchema.js'
import {logForDebugging} from './debug.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {isAutoMemoryEnabled,getAutoMemEntrypoint} from '../memdir/paths.js'
import {createMemoryUpdates287,type MemoryUpdates287,type MemoryUpdateContext287,type MemoryUpdatePorts287,type PendingMemoryUpdate287} from './officialMemoryUpdates287/native.js'
import type {ToolUseContext} from '../Tool.js'
import type {Message} from '../types/message.js'

export function createMemoryUpdateProductionPorts287():MemoryUpdatePorts287 {return {
 ae:getFsImplementation,bo:safeResolvePath,open,m:fs,t:logForDebugging,Xe:expandPath,_:JSON.stringify,errorString:errorMessage,
 f:lazySchema,u:z.object,o:z.string,T:z.array,H:z.boolean,B:z.enum,x:z.literal,Fe:z.union,
 qd:isAutoMemoryEnabled,Goe:getAutoMemEntrypoint,
 Re:(...args)=>(require('./messages.js') as typeof import('./messages.js')).createUserMessage(...args),
 ya:(...args)=>(require('./messages.js') as typeof import('./messages.js')).wrapMessagesInSystemReminder(...args),
}}
let source:MemoryUpdates287|undefined
export function getMemoryUpdates287():MemoryUpdates287 {return source??=createMemoryUpdates287(createMemoryUpdateProductionPorts287())}
/** The same root AppState setter and read cache; no pending-message side store. */
export function toMemoryUpdateContext287(context:ToolUseContext):MemoryUpdateContext287 {
 const setter=context.setAppStateForTasks??context.setAppState
 return {session:getExecutionSession287(),readFileState:context.readFileState,getAppState:context.getAppState,
 setAppState:setter,enqueuePendingMemoryUpdate:getMemoryUpdates287().enqueue(setter)}
}
export function publishBackgroundMemoryUpdate287(context:ToolUseContext,update:PendingMemoryUpdate287):Promise<void> {
 return getMemoryUpdates287().publish(toMemoryUpdateContext287(context),update)
}
export function getMemoryUpdateAttachments287(context:ToolUseContext,messages?:Message[]) {
 return getMemoryUpdates287().drain(toMemoryUpdateContext287(context),messages)
}
