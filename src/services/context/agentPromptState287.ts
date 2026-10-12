import {createAgentPromptState287} from '../../tools/AgentTool/officialAgentPromptState287/native.js'
import {getExecutionSession287,unlatchExecutionStickyBetas287} from './execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'

// Original reader registration stores callbacks; it does not read feature,
// credentials or model state at module initialization. Keep that lazy boundary
// so either prompt-state or AgentTool can be the cold import entry.
export const agentPromptState287=createAgentPromptState287({
 executionContext:getExecutionSession287,unlatchStickyBetas:unlatchExecutionStickyBetas287,
 environment:authEnvironment,
 feature:(name,fallback)=>{
  const {getFeatureValue_CACHED_MAY_BE_STALE}=require('../analytics/growthbook.js') as typeof import('../analytics/growthbook.js')
  return getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)
 },
 behavior:(model,options)=>{
  const {getModelBehaviorName287,getModelIdentityName287}=require('../../utils/model/behavior287.js') as typeof import('../../utils/model/behavior287.js')
  return options?.identity?getModelIdentityName287(model):getModelBehaviorName287(model)
 },
 clientDataRecord:model=>{
  const {getClientDataRecord}=require('../../utils/clientData.js') as typeof import('../../utils/clientData.js')
  return getClientDataRecord(model)
 },
 canonicalRoot:()=>{
  const {getCanonicalRoot287}=require('../../utils/model/canonical287.js') as typeof import('../../utils/model/canonical287.js')
  return getCanonicalRoot287()
 },
 catalogEntry:model=>{
  const {getBakedCatalogEntry287}=require('../../utils/model/canonical287.js') as typeof import('../../utils/model/canonical287.js')
  const entry=getBakedCatalogEntry287(model);return entry?{capabilities:entry.capabilities??[]}:undefined
 },
 // Existing C telemetry cancellation is deliberately preserved.
 event(){},
})
