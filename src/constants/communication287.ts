import {feature} from 'bun:bundle'
import {getSurfaceIdentity287} from '../services/context/surface287.js'
import memoize from 'lodash-es/memoize.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {agentPromptState287} from '../services/context/agentPromptState287.js'
import {createCommunicationPrompt287} from './officialCommunication287/native.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {getModelBehaviorName287,getModelIdentityName287} from '../utils/model/behavior287.js'
import {getCanonicalRoot287,getBakedCatalogEntry287} from '../utils/model/canonical287.js'
import {getModelBehaviorMemoOwner287,getServedCapability} from '../utils/model/servedCatalog.js'
import {getAPIProvider} from '../utils/model/providers.js'
import {getMainLoopModel} from '../utils/model/model.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {getClientDataRecord} from '../utils/clientData.js'
import {getSessionId,getIsNonInteractiveSession} from '../bootstrap/state.js'
import {logForDebugging} from '../utils/debug.js'
import {logEvent} from '../services/analytics/index.js'

// Recovered host/root/launch ownership; no private host or qualification is manufactured.
export function createDefaultCommunication287(brief:{isBriefEnabled():boolean}){
 const native=createCommunicationPrompt287({
  environment:authEnvironment,
  behavior:(model,options)=>options?.identity?getModelIdentityName287(model):getModelBehaviorName287(model),
  catalogEntry:getBakedCatalogEntry287,canonicalRoot:getCanonicalRoot287,
  clientDataRecord:model=>getClientDataRecord(model),feature:getFeatureValue_CACHED_MAY_BE_STALE,
  mainModel:getMainLoopModel,memoOwner:getModelBehaviorMemoOwner287,servedOwner:getModelBehaviorMemoOwner287,
  execution:getExecutionSession287,surface:()=>getSurfaceIdentity287(),diskless:agentPromptState287.diskless,derivedSurface:agentPromptState287.derivedSurface,
  memoize,debug:logForDebugging,event:logEvent,sessionId:getSessionId,
  brief,nonInteractive:getIsNonInteractiveSession,
  provider:getAPIProvider,
 })
 native.setCapabilityLookup((capability,models)=>getServedCapability(capability,...models.filter((model):model is string=>model!==undefined)))
 native.setFeatureGateLookup(gate=>getFeatureValue_CACHED_MAY_BE_STALE(gate,false))
 function policy(model:string){
  const resolved=native.modelForPrompt(model)
  return {resolved,lean:native.lean(resolved)}
 }
 return {
  policy,
  promptPolicy:native.promptPolicy,
  communicationForResolvedModel:native.communication,
  modelForPrompt:native.modelForPrompt,
  modelPolicyOwner:native.modelPolicyOwner,
  delegationCostsFirst:native.delegationCostsFirst,
  leanForPrompt:native.lean,
  sendUserMessageEnabled:native.sendUserMessageEnabled,
  communication(model:string){return native.communication(policy(model).resolved)},
  key(model:string){const {lean}=policy(model);return `communication${lean?':L':''}${brief.isBriefEnabled()||native.sendUserMessageEnabled()?':send_user_msg':''}`},
 }
}

const briefPromptOwner287 = feature('KAIROS') || feature('KAIROS_BRIEF')
 ? require('../tools/BriefTool/BriefTool.js') as typeof import('../tools/BriefTool/BriefTool.js')
 : null

export const communication287 = createDefaultCommunication287({
 isBriefEnabled:()=>briefPromptOwner287?.isBriefEnabled()??false,
})
