import {createAgentNormalSelection287} from './officialAgentNormalSelection287/native.js'
import {officialAgentSelection287} from './agentSelection287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {setAgentColor} from './agentColorManager.js'
import {GENERAL_PURPOSE_AGENT} from './built-in/generalPurposeAgent.js'
import {FORK_AGENT} from './forkSubagent.js'
import type {AgentDefinition} from './loadAgentsDir.js'
import type {ToolPermissionContext,ToolUseContext} from '../../Tool.js'

/** Full original pe layer reader shared with person confirmation, not app-state-only permissions. */
export function getEffectiveAgentPermissionContext287(toolContext:ToolUseContext){
 const {readConfirmationPermissionContext}=require('../../utils/permissions/confirmWithUser.js') as typeof import('../../utils/permissions/confirmWithUser.js')
 return readConfirmationPermissionContext(toolContext)
}
// The native ordinary-selection block is complete. The full original act/Zjn
// (Mods agent.offer) availability owner remains a separate, explicit open slice.
export async function getAvailableAgentsForSelection287(agents:AgentDefinition[],allowed:readonly string[]|undefined,context:ToolPermissionContext,toolContext:ToolUseContext){
 const {filterDeniedAgents}=require('../../utils/permissions/permissions.js') as typeof import('../../utils/permissions/permissions.js')
 const filtered=filterDeniedAgents((allowed?agents.filter(agent=>allowed.includes(agent.agentType)):agents).filter(agent=>agent.isEnabled?.(toolContext)!==false),context,'Agent')
 return officialAgentNormalSelection287.toolsFilter(filtered,context)
}
export const officialAgentNormalSelection287=createAgentNormalSelection287({
 availableAgents:getAvailableAgentsForSelection287,
 normalize:officialAgentSelection287.normalize,
 generalPurposeAvailable:officialAgentSelection287.generalPurposeAvailable,
 parseRule:value=>{
  const {permissionRuleValueFromString}=require('../../utils/permissions/permissionRuleParser.js') as typeof import('../../utils/permissions/permissionRuleParser.js')
  return permissionRuleValueFromString(value)
 },
 denyTool:(context,tool)=>{
  const {getDenyRuleForTool}=require('../../utils/permissions/permissions.js') as typeof import('../../utils/permissions/permissions.js')
  return getDenyRuleForTool(context,tool)
 },
 environment:authEnvironment,
 policyAllowed:key=>{
  const {isPolicyAllowed}=require('../../services/policyLimits/index.js') as typeof import('../../services/policyLimits/index.js')
  return isPolicyAllowed(key)
 },
 forkGuard:officialAgentSelection287.guard,denyRule:(context,name,type)=>{
  const {getDenyRuleForAgent}=require('../../utils/permissions/permissions.js') as typeof import('../../utils/permissions/permissions.js')
  return getDenyRuleForAgent(context,name,type)
 },
 typeList:officialAgentSelection287.formatTypes,requiredTypeMessage:officialAgentSelection287.requiredTypeMessage,
 generalPurpose:GENERAL_PURPOSE_AGENT,forkType:FORK_AGENT.agentType,setAgentColor,
 // Preserve existing C first-party telemetry cancellation.
 telemetry:()=>{},launchMetric:()=>{},
})
