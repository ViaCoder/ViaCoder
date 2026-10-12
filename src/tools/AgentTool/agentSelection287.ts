import {createAgentSelection287} from './officialAgentSelection287/native.js'
import {getForkSubagentPolicyState287,getIsNonInteractiveSession} from '../../bootstrap/state.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {GENERAL_PURPOSE_AGENT} from './built-in/generalPurposeAgent.js'

export const officialAgentSelection287=createAgentSelection287({
 environment:authEnvironment,
 nonInteractive:getIsNonInteractiveSession,
 coordinator:()=>{
  const {isCoordinatorMode}=require('../../coordinator/coordinatorMode.js') as typeof import('../../coordinator/coordinatorMode.js')
  return isCoordinatorMode()
 },
 sessionMemo:getForkSubagentPolicyState287,
 // The existing C layer disables first-party analytics, including source exposure.
 telemetry:()=>{},
 identity:value=>value,
 denyRule:(...args)=>{
  const {getDenyRuleForAgent}=require('../../utils/permissions/permissions.js') as typeof import('../../utils/permissions/permissions.js')
  return getDenyRuleForAgent(...args)
 },
 generalPurpose:GENERAL_PURPOSE_AGENT,
})
