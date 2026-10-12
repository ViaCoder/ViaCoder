import {getAgentContext,type AgentContext} from '../../utils/agentContext.js'
import type {AgentContext287} from '../officialTaskRegistration287/native.js'

/** Read the real launch field; omission remains omission, not inferred false.
 * No second ALS owner, background-state inference, or reflective routing. */
export function getTaskAgentContext287(source:AgentContext|undefined=getAgentContext()):AgentContext287|undefined {
  return source?{agentType:source.agentType,isAsync:source.agentType==='subagent'?source.isAsync:undefined}:undefined
}
