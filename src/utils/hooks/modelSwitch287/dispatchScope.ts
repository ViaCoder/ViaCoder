import {AsyncLocalStorage} from 'node:async_hooks'
// The existing original inFlight record owns this transport-only scope. It is
// never sent over the wire and dies with that record's original unlink/delete.
const dispatchScope=Symbol('hooks.dispatch.scope287')
type ScopeRunner=ReturnType<typeof AsyncLocalStorage.snapshot>
type ScopedRecord=object&{[dispatchScope]?:ScopeRunner}
export function bindHookDispatchRecord287<T extends object>(record:T):T{
 Object.defineProperty(record,dispatchScope,{value:AsyncLocalStorage.snapshot()})
 return record
}
export function runHookDispatchScope287<T>(run:(host:DispatchHost287,frame:DispatchFrame287)=>T,host:DispatchHost287,frame:DispatchFrame287):T{
 const id=frame.frame?.dispatchId??frame.id
 const scope=id===undefined?undefined:host.inFlight.get(id)?.[dispatchScope]
 return scope?scope(run,host,frame):run(host,frame)
}
interface DispatchHost287 {inFlight:Map<number,ScopedRecord>}
interface DispatchFrame287 {id?:number;frame?:{dispatchId?:number}}
