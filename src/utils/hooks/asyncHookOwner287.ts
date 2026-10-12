import {createAsyncHookFinalizer287} from '../../cli/printOwnership287/publicHostNative.js'
import {emitHookResponse,shouldEmit} from './hookEvents.js'
import {logForDebugging} from '../debug.js'
import {getOriginalModsLifecycle287} from './modelSwitch287/lifecycleRuntime.js'
import type {PendingAsyncHook} from './AsyncHookRegistry.js'
/** Original tz()/P$n.of(U().host), not a parallel process-global Map. */
export interface AsyncHookOwner287 {pendingHooks:Map<string,PendingAsyncHook>;values():PendingAsyncHook[];removeAll():void}
export function getAsyncHookOwner287():AsyncHookOwner287 {
 const getter=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-mphp7acd.js','tz')
 if(typeof getter!=='function')throw Error('Original async hook registry getter missing')
 return getter() as AsyncHookOwner287
}
// The three full pure bodies retain tz's canonical state. Wi/YQ deliberately
// preserve the accepted local Hook event consumer/allowlist, not a second
// undrained SDK event queue. No command runner or hook parser is substituted.
const finalize=createAsyncHookFinalizer287({tz:getAsyncHookOwner287,YQ:shouldEmit,t:logForDebugging,
 Wi:event=>emitHookResponse({hookId:event.hook_id,hookName:event.hook_name,hookEvent:event.hook_event,output:event.output,stdout:event.stdout,stderr:event.stderr,exitCode:event.exit_code,outcome:event.outcome}),
})
export function settleAsyncHookOwner287():Promise<void> {return finalize()}
