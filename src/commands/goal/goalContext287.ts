import type {Message} from '../../types/message.js'
import type {HookEvent} from '../../entrypoints/agentSdkTypes.js'
import type {HookCommand} from '../../utils/settings/types.js'
import type {ActiveGoal} from '../../utils/goal.js'
/** Public mt9jr7v7 TXe/kXe context ABI. The registry and append actor are
 * borrowed from the running host, never created by the command factory. */
export interface GoalSessionHooks287 {
 get(scope:string,event:HookEvent):Map<HookEvent,readonly {matcher?:string;skillRoot?:string;hooks:readonly HookCommand[]}[]>
 add(scope:string,event:HookEvent,matcher:string,hook:HookCommand):void
 remove(scope:string,event:HookEvent,hook:HookCommand):void
}
export interface GoalAppend287 {type:'append';messages:Message[]}
export interface GoalCommandContext287 {
 sessionHooksRegistry:GoalSessionHooks287
 applyMessageOp(operation:GoalAppend287):void
 options:{activeGoal?:ActiveGoal}
}
