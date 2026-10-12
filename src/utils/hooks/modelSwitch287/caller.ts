import {AsyncLocalStorage} from 'node:async_hooks'
import type {LocalJSXCommandContext} from '../../../types/command.js'
import type {ModelSwitchSessionHooks287} from './native.js'
import {getSessionHooks,getSessionFunctionHooks,getSessionHookCallback} from '../sessionHooks.js'
// Invocation context only; all hook records are read through the caller's existing AppState Map.
export type ModelSwitchCallerContext287=Pick<LocalJSXCommandContext,'getAppState'>
const calls=new AsyncLocalStorage<ModelSwitchCallerContext287>()
export function withModelSwitchCaller287<T>(context:ModelSwitchCallerContext287,work:()=>T):T{return calls.run(context,work)}
export function getModelSwitchCaller287(){return calls.getStore()}
export function modelSwitchSessionHooks287(context:ModelSwitchCallerContext287):ModelSwitchSessionHooks287 {
 return {has:(id,event)=>context.getAppState().sessionHooks.get(id)?.hooks[event as import('../../../entrypoints/agentSdkTypes.js').HookEvent]!==undefined,get:(id,event)=>getSessionHooks(context.getAppState(),id,event as import('../../../entrypoints/agentSdkTypes.js').HookEvent),getFunctionHooks:(id,event)=>getSessionFunctionHooks(context.getAppState(),id,event as import('../../../entrypoints/agentSdkTypes.js').HookEvent),getAppState:context.getAppState,getEntry:(id,event,matcher,hook)=>getSessionHookCallback(context.getAppState(),id,event as import('../../../entrypoints/agentSdkTypes.js').HookEvent,matcher,hook)}
}
