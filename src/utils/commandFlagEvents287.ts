import type {ToolUseContext} from '../Tool.js'
import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'
export interface CommandFlagEvent287 {type:'apply_flag_settings';settings:Record<string,unknown>}
/** Source brief/focus flag events use the existing complete kqe consumer. */
export function withCommandFlagEvents287<T extends ToolUseContext>(context:T):T & {onQueryEvent:(event:CommandFlagEvent287)=>void}{
 const original=(context as T & {onQueryEvent?:(event:CommandFlagEvent287)=>void}).onQueryEvent
 return Object.create(context,{onQueryEvent:{enumerable:true,value:(event:CommandFlagEvent287)=>{
  if(original)return original(event)
  const kqe=getOriginalModsLifecycle287().clearSourceModule287('chunk-da7sx57w.js').kqe as (settings:Record<string,unknown>,setState:ToolUseContext['setAppState'])=>void
  kqe(event.settings,context.setAppState)
 }}})
}
