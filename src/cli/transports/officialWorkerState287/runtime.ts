import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {installCCRWorkerStateNative287,enqueueClientDurableNative287,closeInternalSummaryNative287} from './native.js'
import type {WorkerStateUploaderConstructor287,CCRWorkerMethod287} from './types.js'
const file='chunk-bvq78v2j.js'
function source():Readonly<Record<string,unknown>> {
 return getOriginalModsLifecycle287().clearSourceModule287(file)
}
function originalClass():{prototype:object} {
 const cls=source().F$
 if(typeof cls!=='function')throw Error('Original CCR class missing')
 return cls as unknown as {prototype:object}
}
export function installCCRWorkerState287(client:object,url:URL,options:unknown):void {
 installCCRWorkerStateNative287.call(client,url,options,source())
}
export function invokeCCRWorkerMethod287<T>(client:object,name:CCRWorkerMethod287,args:readonly unknown[]=[]):T {
 const descriptor=Object.getOwnPropertyDescriptor(originalClass().prototype,name)
 const fn=descriptor?.value??descriptor?.get
 if(typeof fn!=='function')throw Error('Original CCR worker method missing: '+name)
 return Reflect.apply(fn,client,args) as T
}
export function getWorkerStateUploaderConstructor287():WorkerStateUploaderConstructor287 {
 const cls=source().ce
 if(typeof cls!=='function')throw Error('Original worker-state coalescer missing')
 return cls as WorkerStateUploaderConstructor287
}
export function getCCRInitErrorConstructor287():new(reason:'no_auth_headers'|'missing_epoch'|'worker_register_failed',httpStatus?:number)=>Error & {reason:'no_auth_headers'|'missing_epoch'|'worker_register_failed';httpStatus?:number} {
 const cls=source().tCe
 if(typeof cls!=='function')throw Error('Original CCR init error missing')
 return cls as ReturnType<typeof getCCRInitErrorConstructor287>
}
// Original shutdown releases the current session's activity callback and tool
// call row waiters. The existing CCR activity-owner token protects successors.
export function detachCCRWorkerPrerequisites287(client:object,releaseActivity:boolean):void {
 const original=source()
 if(releaseActivity){const stop=original.tGo;if(typeof stop!=='function')throw Error('Original CCR activity detach missing');stop()}
 const host=client as {stopToolCallGate?:()=>void;toolCallRowWaiters:Map<string,{reached():void}[]>}
 host.stopToolCallGate?.()
 for(const waiters of host.toolCallRowWaiters.values())for(const waiter of waiters)waiter.reached()
 host.toolCallRowWaiters.clear()
}

/** Original durable gate/enqueue tail, after the retained C stream accumulator. */
export function enqueueCCRClientDurable287(client:object,message:unknown,event:unknown):Promise<void> {
 return enqueueClientDurableNative287.call(client,message,event,source())
}
export function adoptCCRHeartbeatPolicy287(client:object,data:unknown):void {
 const original=source(),isObject=original.N
 if(typeof isObject!=='function')throw Error('Original CCR response guard missing')
 if(isObject(data))invokeCCRWorkerMethod287(client,'takeUpFlushPolicy',[(data as {event_flush_policy?:unknown}).event_flush_policy])
}
export function closeCCRInternalSummary287(client:object):void {
 closeInternalSummaryNative287.call(client)
}
