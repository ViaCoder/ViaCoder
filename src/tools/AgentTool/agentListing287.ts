import {createAgentListing287} from './officialAgentAvailability287/native.js'
import {getAvailableAgentsForSelection287,getEffectiveAgentPermissionContext287} from './agentNormalSelection287.js'
import {agentPromptState287} from '../../services/context/agentPromptState287.js'
import type {AgentDefinition} from './loadAgentsDir.js'
import type {ToolUseContext,ToolPermissionContext} from '../../Tool.js'

// Jzn remains async and always follows the real Agent/tool/permission pool.
// Full Mods offer/controller integration is tracked separately; no fabricated
// catalog or always-offered dispatcher is provided here.
export const officialAgentListing287=createAgentListing287<AgentDefinition,ToolPermissionContext,ToolUseContext>({
 available:getAvailableAgentsForSelection287,
 permissionContext:getEffectiveAgentPermissionContext287,
 modelForPrompt:model=>{
  const {communication287}=require('../../constants/prompts.js') as typeof import('../../constants/prompts.js')
  return communication287.modelForPrompt(model)
 },
 leanPrompt:model=>{
  const {communication287}=require('../../constants/prompts.js') as typeof import('../../constants/prompts.js')
  return communication287.leanForPrompt(model)
 },
 taskMode:agentPromptState287.taskMode,
 subscription:()=>{const {getSubscriptionType}=require('../../utils/auth.js') as typeof import('../../utils/auth.js');return getSubscriptionType()},
})
