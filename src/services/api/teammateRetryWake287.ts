import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {RetryWakeSubscription286} from './retryWake.js'
import {createTeammateRetryDispatcher287} from './teammateRetryDispatcher287.js'
import {findTeammateTaskByAgentId} from '../../tasks/InProcessTeammateTask/InProcessTeammateTask.js'

/** Original Me, one runtime signal per in-process teammate, not a retry actor.
 * The task publishes this same handle; Query and _Ut borrow its subscription. */
export interface TeammateRetryWake287 {
 subscribe:RetryWakeSubscription286
 emit():void
 clear():void
}
export function createTeammateRetryWake287():TeammateRetryWake287 {
 const Me=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-4s38z9x2.js','Me') as ()=>TeammateRetryWake287
 return Me()
}
/** Same original Jmr reads the caller's live task map after mailbox delivery. */
export const wakeTeammateRetry287=createTeammateRetryDispatcher287({pge:findTeammateTaskByAgentId})
