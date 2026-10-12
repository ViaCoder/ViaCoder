import {z} from 'zod/v4'
import {addToTotalCostState,getSdkBetas} from '../../bootstrap/state.js'
import {getContextWindowForModel,getModelMaxOutputTokens} from '../../utils/context.js'
import {getSettingsCacheStore287} from '../../utils/settings/settingsCache.js'
import {getInitialSettings,getSettingsForSource} from '../../utils/settings/settings.js'
import {isRemoteManagedSettingsCacheVerified} from '../remoteManagedSettings/syncCacheState.js'
import {getClientData} from '../../utils/clientData.js'
import {getGlobalConfig} from '../../utils/config.js'
import {getCanonicalRoot287} from '../../utils/model/canonical287.js'
import {getServedCatalog,getModelBehaviorMemoOwner287} from '../../utils/model/servedCatalog.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../analytics/index.js'
import {once} from 'lodash-es'
import {createModelUsage287,type ModelUsagePolicyPorts287,type ModelUsagePorts287} from './officialModelUsage287/native.js'
import type {BetaUsage} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'

// Binding is explicit. Do not silently replace original Jk/j8/n8r/pse by the
// legacy source-origin/merged-errors readers: those lose helper/admin semantics.
// No module initialization installs a producer or pulls in execution287.
export function createModelUsageApplicationPorts287(
 policy:ModelUsagePolicyPorts287 & Pick<ModelUsagePorts287,'pricingIgnored'|'pricingError'>,
 executionContext:ModelUsagePorts287['executionContext'],
):ModelUsagePorts287 {
 return {
  ...policy,executionContext,sdkBetas:getSdkBetas,
  contextWindow:getContextWindowForModel,maxOutputTokens:getModelMaxOutputTokens,
  settingsStore:getSettingsCacheStore287,
  settingsSource:getSettingsForSource,initialSettings:getInitialSettings,
  verifiedRemote:isRemoteManagedSettingsCacheVerified,
  clientData:getClientData,globalConfig:getGlobalConfig,
  canonicalRoot:getCanonicalRoot287,behaviorMemo:getModelBehaviorMemoOwner287,servedCatalog:getServedCatalog,
  baseProvider:getNativeAPIProvider287,environment:authEnvironment,debug:logForDebugging,
  logEvent,
  memoize:once,stringSchema:z.string,numberSchema:z.number,objectSchema:z.object,recordSchema:z.record,
 }
}

export function bindModelUsageLedgerProducer287(
 policy:ModelUsagePolicyPorts287 & Pick<ModelUsagePorts287,'pricingIgnored'|'pricingError'>,
 executionContext:ModelUsagePorts287['executionContext'],
) {
 const native=createModelUsage287(createModelUsageApplicationPorts287(policy,executionContext))
 return {
  native,
  record(cost:number,usage:BetaUsage,model:string) {
   const row=native.accumulate(cost,usage,model)
   addToTotalCostState(cost,row,model)
   return row
  },
 }
}
