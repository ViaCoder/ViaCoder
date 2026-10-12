import {createHookEngineSubscription287,createHookEngineSubscriptionSlots287,createHookEngineBackgroundSubscription287} from './engine.js'
import {getExecutionSession287} from '../../../services/context/execution287.js'
import {authEnvironment} from '../../authEnvironment.js'
import {sharedHttpAuth} from '../../sharedHttpAuth.js'
import {getClaudeAIOAuthTokens} from '../../auth.js'
import {isBareMode} from '../../envUtils.js'
import {shouldUseMockSubscription,getMockSubscriptionType} from '../../../services/mockRateLimits.js'
let owner:ReturnType<typeof createHookEngineSubscription287>|undefined
export function createOriginalModsSubscriptionPorts287():Record<string,unknown>{return {
 ...createHookEngineSubscriptionSlots287({n:getExecutionSession287}),
 ...createHookEngineBackgroundSubscription287({a:authEnvironment}),
 a:authEnvironment,xr:isBareMode,vl:sharedHttpAuth.authEnabled,fn:getClaudeAIOAuthTokens,
 // Read the existing mock state, not another private qualification/cache. The
 // recovered public Ni/Ul retain their own original compiled eligibility gate.
 en:()=>({enabled:shouldUseMockSubscription(),subscriptionType:getMockSubscriptionType()}),
}}
/** Complete original ir/rA/zWt with canonical auth/credential slots. */
export function getOriginalModsSubscription287(){return (owner??=createHookEngineSubscription287(createOriginalModsSubscriptionPorts287())).ir()}
