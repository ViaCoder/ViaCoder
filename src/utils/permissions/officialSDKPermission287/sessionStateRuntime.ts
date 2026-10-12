import {createSDKPermissionSessionState287,createSDKPermissionDisplay287,type PermissionSessionState287} from './native.js'
import {createSignal} from '../../signal.js'
import {logError} from '../../log.js'
import {logForDiagnosticsNoPII} from '../../diagLogs.js'
import {authEnvironment} from '../../authEnvironment.js'
import {parkSessionActivityOnUser287,getMainLoopActivityPressure287,registerMainLoopActivityListener287,sessionActivity287} from '../../sessionActivity.js'
import {enqueueSdkEvent} from '../../sdkEventQueue.js'
import {getGraphemeSegmenter} from '../../intl.js'
let owner:PermissionSessionState287|undefined
let constructor287:ReturnType<typeof createSDKPermissionSessionState287>['t$t']|undefined
export function createPermissionSessionState287():PermissionSessionState287 {
 return new (getPermissionSessionStateConstructor287())()
}
export function getPermissionSessionStateConstructor287():ReturnType<typeof createSDKPermissionSessionState287>['t$t'] {
 if(constructor287)return constructor287
 const display=createSDKPermissionDisplay287({_a:getGraphemeSegmenter})
 const source=createSDKPermissionSessionState287({Me:createSignal,d:logError,ne:logForDiagnosticsNoPII,a:authEnvironment,bQ:parkSessionActivityOnUser287,Wi:enqueueSdkEvent,vo:display.vo,Yv:50})
 constructor287=source.t$t
 return constructor287
}
export function getPermissionSessionState287():PermissionSessionState287 {
 if(owner)return owner
 owner=createPermissionSessionState287()
 owner.setMainLoopRefcount(getMainLoopActivityPressure287())
 registerMainLoopActivityListener287(count=>owner!.setMainLoopRefcount(count))
 sessionActivity287.onNestedDrop(key=>owner!.dropNestedBlockedChain(key))
 return owner
}
