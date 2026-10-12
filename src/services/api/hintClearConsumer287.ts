import type {Message} from '../../types/message.js'
import type {OriginalHintClears287} from '../../utils/officialToolSchema287/native.js'
import type {ToolUseContext} from '../../Tool.js'
import {getToolSchemaRuntime287} from '../../utils/toolSchema287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {logForDebugging} from '../../utils/debug.js'
import {replaceToolResultContents,type ContentReplacementState} from '../../utils/toolResultStorage.js'
/** The existing RW request-replacement slot, never a second session cache. */
export function reapplyOriginalHintView287(messages:Message[],state:ContentReplacementState|undefined):Message[] {
 return state?replaceToolResultContents(messages,state.replacements):messages
}
/** Query's request history and real Read cache, not the retained visible transcript. */
export function applyOriginalHintClears287(messages:Message[],event:OriginalHintClears287,readFileState:ToolUseContext['readFileState'],state?:ContentReplacementState):Message[] {
 const runtime=getToolSchemaRuntime287(),ids=new Set(event.ids)
 const path=getOriginalModsLifecycle287().clearSourceModule287('chunk-2ejbgdvw.js').CK
 if(typeof path!=='function')throw Error('Missing original CK Read path expander')
 for(const file of runtime.clearedHintReadPaths287(messages,ids)) {
  const resolved=path(file)
  if(resolved===null){logForDebugging('hint_clears: a cleared Read has a file_path that cannot be expanded (null byte in it or in the working directory); leaving readFileState as is');continue}
  if(typeof resolved!=='string')throw Error('Invalid original CK Read path result')
  readFileState.delete(resolved)
 }
 const cleared=runtime.clearHintToolResults287(messages,ids,new Map(Object.entries(event.contentById)))
 // Store the exact original u2t result (including image and error-prefix rules),
 // not a guessed placeholder or a new persistent hint map. RW's original
 // provision gate and resume replacement lifecycle remain authoritative.
 if(state)for(const row of cleared) {
  if(row.type!=='user'||!Array.isArray(row.message.content))continue
  for(const block of row.message.content)if(block.type==='tool_result'&&ids.has(block.tool_use_id)&&typeof block.content==='string') {
   state.seenIds.add(block.tool_use_id)
   state.replacements.set(block.tool_use_id,block.content)
  }
 }
 return cleared
}
