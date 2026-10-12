import {formatTotalCost} from '../../cost-tracker.js'
import {getIsNonInteractiveSession,getModelUsage} from '../../bootstrap/state.js'
import {getSubscriptionType,hasProfileScope,isClaudeAISubscriber} from '../../utils/auth.js'
import {logForDebugging} from '../../utils/debug.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getQuotaOwner287} from '../../services/claudeAiLimits.js'
import {getSdkUsageReply287} from '../../services/api/usageConsumers287.js'
import {createLocalSessionUsageHost} from '../../cli/control/usageHost.js'
import {getPolicyPublicClient287} from '../../services/policyLimits/publicBindings287.js'
import {createUsageTranscriptPolicy287,createUsageUiResetText287,createUsageClock287,createUsageUiCurrency287} from '../../services/api/officialUsage287/runtime.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {createUsageText287,type UsageTextContext287,type UsageTextPorts287,type UsageTextResult287} from './officialText287/native.js'
import type {LocalJSXCommandContext} from '../../types/command.js'

function source<T>(file:string,name:string):T {
 // Canonical full module, not the added generic/clear public subset. Both
 // refer to the already-initialized production graph; no module is duplicated.
 const value=getOriginalModsLifecycle287().clearLifecycleSource287(file,name)
 if(value===undefined)throw Error(`Missing original usage text import ${file}:${name}`)
 return value as T
}
function sourceCall<T>(file:string,name:string,...args:unknown[]):T {
 return source<(...values:unknown[])=>T>(file,name)(...args)
}
const policy=createUsageTranscriptPolicy287({on:(name:string)=>getPolicyPublicClient287().on(name),wh:(name:string)=>getPolicyPublicClient287().wh(name),ase:()=>getPolicyPublicClient287().ase(),
 x3:(name:string)=>getPolicyPublicClient287().x3(name),op:(...args:Parameters<ReturnType<typeof getPolicyPublicClient287>['op']>)=>getPolicyPublicClient287().op(...args)})
/** Import bindings only. Usage/config/quota/transcript/credentials all retain
 * their existing owners; this factory contains no session state or cache. */
export function getUsageTextPorts287(context:UsageTextContext287):UsageTextPorts287 {
 return {
  Ce:getIsNonInteractiveSession,t:logForDebugging,
  I:(count,noun)=>sourceCall('chunk-eske5nfz.js','I',count,noun),
  en:value=>sourceCall('chunk-6re9qmwv.js','en',value),fe:{dim:value=>source<UsageTextPorts287['fe']>('chunk-2q133q3v.js','fe').dim(value)},
  Bo:session=>sourceCall('chunk-x5mcrns6.js','Bo',session),
  ft:isClaudeAISubscriber,zp:hasProfileScope,ir:getSubscriptionType,k:getFeatureValue_CACHED_MAY_BE_STALE,
  E4r:()=>sourceCall('chunk-xep95vq1.js','E4r'),
  Tu:createUsageClock287({}),Bbt:createUsageUiResetText287({}),He:getNativeAPIProvider287,
  RN:()=>sourceCall('chunk-09m4fzsj.js','RN'),gi:createUsageUiCurrency287({}),
  pa:()=>getQuotaOwner287().currentLimits,VV:()=>sourceCall('chunk-mphp7acd.js','VV'),
  // Gateway retains the canonical import: no new cache or fabricated reading.
  Klt:credentials=>sourceCall('chunk-mphp7acd.js','Klt',credentials),
  // Preserve existing local cost/unknown-model compatibility (C).
  jce:formatTotalCost,kMe:policy,
  tJt:options=>getSdkUsageReply287(createLocalSessionUsageHost(()=>sourceCall('chunk-x5mcrns6.js','Bo',context.session),context),options),
  nP:getModelUsage,Be:model=>sourceCall('chunk-nankzm0s.js','Be',model),
 }
}
/** Actual loader calls complete original G, including validated usageReport.
 * Bind the caller's session for every existing owner read. */
export function call(args:string,context:LocalJSXCommandContext):Promise<UsageTextResult287> {
 const input:UsageTextContext287={session:context.session??getExecutionSession287(),credentials:context.credentials,storageV5:context.storageV5}
 return runWithExecutionSession287(input.session,()=>createUsageText287(getUsageTextPorts287(input)).call(args,input))
}
