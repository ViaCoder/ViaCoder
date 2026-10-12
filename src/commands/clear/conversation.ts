/** Entire 287 B_r executes here; local-C transport/history bookends stay on
 * their existing owners rather than a parallel clear engine or reset queue. */
import type {UUID} from 'node:crypto'
import {getSessionId} from '../../bootstrap/state.js'
import {getCurrentSessionTitle,getCurrentSessionTag,saveTag} from '../../utils/sessionStorage.js'
import {createClearProduction287,type ClearContext287} from './lifecycle287.js'

export async function clearConversation(context:ClearContext287):Promise<void> {
 const old=getSessionId(),title=context.clearedSessionTitle?undefined:getCurrentSessionTitle(old)
 const tag=title?getCurrentSessionTag(old as UUID):undefined
 const runtime=createClearProduction287(context)
 for await(const event of runtime.run(runtime.input)) {
  if(context.onConversationReset)context.onConversationReset({...event,newConversationId:event.newConversationId as UUID})
  else context.setConversationId?.(event.newConversationId as UUID)
 }
 // Existing C MCP epoch turns only after the new source storage session exists.
 context.setAppState?.(state=>({...state,mcp:{...state.mcp,sessionResetKey:state.mcp.sessionResetKey+1}}))
 context.discoveredSkillNames?.clear();context.loadedNestedMemoryPaths?.clear()
 if(title&&tag)await saveTag(getSessionId() as UUID,tag)
}
