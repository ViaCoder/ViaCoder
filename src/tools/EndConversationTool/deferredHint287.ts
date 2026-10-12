import {createHookEngineEndHint287,createHookEngineEndHintNames287,createHookEngineEndHintModels287,createHookEngineEndHintGuard287} from '../../utils/hooks/modelSwitch287/engine.js'
import {getSurfaceIdentity287} from '../../services/context/surface287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
export function createEndConversationHintPorts287():Record<string,unknown>{return {
 ...createHookEngineEndHintNames287({}),...createHookEngineEndHintModels287({}),...createHookEngineEndHintGuard287({}),
 uA:()=>getSurfaceIdentity287().entrypoint,k:getFeatureValue_CACHED_MAY_BE_STALE,
 Vh:()=> (require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287().deferredToolSearchOptimistic(),
}}
// This namespace does not register/enable a tool or change explicit C model
// capabilities. dFn/dis retain all original model/flag/entrypoint/search gates.
const source=createHookEngineEndHint287(createEndConversationHintPorts287())
export const endConversationHint287={
 END_CONVERSATION_TOOL_NAME:createHookEngineEndHintNames287({}).yk,
 getDeferredHintSection:source.dis,
 isEndConversationToolEnabled:source.dFn,
}
