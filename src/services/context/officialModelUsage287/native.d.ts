import type {BetaUsage} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type {ModelUsage} from '../../../entrypoints/agentSdkTypes.js'
import type {ExecutionSession287} from '../officialExecutionOwners287/native.js'
import type {BehaviorMemoOwner287,CanonicalRoot287,ModelPicker287} from '../../../utils/model/officialModelBehavior287/native.js'
import type {SettingSource} from '../../../utils/settings/constants.js'

export type ModelProvider287 = 'firstParty'|'bedrock'|'vertex'|'foundry'|'anthropicAws'|'anthropicGoogleCloud'|'mantle'|'gateway'
export type CostBasis287 = 'list'|'managed'|'unknown'
export interface NativeModelUsage287 extends ModelUsage {
 thinkingTokens:number;canonicalModel:string;provider:ModelProvider287;costBasis:CostBasis287
}
export interface ManagedPricingInput287 {
 multiplier?:number
 overrides?:Record<string,{input:number;output:number;cacheRead:number;cacheWrite:number}>
}
export interface PricingRow287 {
 inputTokens:number;outputTokens:number;promptCacheReadTokens:number;promptCacheWriteTokens:number;webSearchRequests:number
}
export interface CompiledPricing287 {
 multiplier:number;exact:Map<string,PricingRow287>;builtin:Map<string,PricingRow287>;adminOverrides?:Record<string,string>
}
export interface ModelUsageSettings287 {
 modelOverrides?:Record<string,string>;modelPicker?:ModelPicker287;modelPricing?:ManagedPricingInput287
}
export type ModelIdentityOptions287 = {identity?:boolean;deterministic?:boolean;overridesMap?:Record<string,string>}
// Required source IO, not a fallback compiler or an inferred trust decision.
export interface ModelUsagePolicyPorts287 {
 policyOrigin(): 'helper'|'remote'|'plist'|'hklm'|'file'|'parent'|'hkcu'|null
 adminLoadBlocked():boolean
 hostPricing():ManagedPricingInput287|undefined
 policyOverrides():Record<string,string>|undefined
}
export interface ModelUsagePorts287 extends ModelUsagePolicyPorts287 {
 executionContext():ExecutionSession287
 sdkBetas():ReturnType<typeof import('../../../bootstrap/state.js').getSdkBetas>
 contextWindow:typeof import('../../../utils/context.js').getContextWindowForModel
 maxOutputTokens:typeof import('../../../utils/context.js').getModelMaxOutputTokens
 settingsStore():{policy:Record<string,unknown>}
 settingsSource(source:SettingSource):ModelUsageSettings287|null
 initialSettings():ModelUsageSettings287
 verifiedRemote():boolean
 clientData():Record<string,unknown>|null
 globalConfig():{additionalModelCostsCache?:Record<string,unknown>}
 canonicalRoot():CanonicalRoot287
 behaviorMemo():BehaviorMemoOwner287
 servedCatalog():{config:{models?:{id:string;behaves_as?:string|null}[]}}|null
 baseProvider():ModelProvider287
 environment:{readonly CLAUDE_CODE_USE_MANTLE:boolean}
 debug:typeof import('../../../utils/debug.js').logForDebugging
 logEvent(name:string,metadata:Record<string,number|boolean>):void
 pricingIgnored(name:string,reason:string):void
 pricingError(name:string,reason:string):void
 memoize<T>(factory:()=>T):()=>T
 stringSchema:typeof import('zod/v4').z.string
 numberSchema:typeof import('zod/v4').z.number
 objectSchema:typeof import('zod/v4').z.object
 recordSchema:typeof import('zod/v4').z.record
}
export interface ModelUsageNative287 {
 accumulate(cost:number,usage:BetaUsage,model:string):NativeModelUsage287
 canonicalModel(model:string,usage?:BetaUsage):string
 provider(model?:string):ModelProvider287
 costBasis(model:string,usage?:BetaUsage):CostBasis287
 managedPricing():CompiledPricing287|undefined
 compilePricing(input:ManagedPricingInput287,overrides?:Record<string,string>):CompiledPricing287|undefined
 modelIdentity(model:string,options?:ModelIdentityOptions287):string
 modelBehavior(model:string,options?:ModelIdentityOptions287):string
 recordInferenceBackingModel(profile:string,model:string):void
}
export function createModelUsage287(ports:ModelUsagePorts287):ModelUsageNative287
