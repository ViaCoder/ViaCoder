import mergeWith from 'lodash-es/mergeWith.js'
import isEqual from 'lodash-es/isEqual.js'
import omit from 'lodash-es/omit.js'
import pick from 'lodash-es/pick.js'
import once from 'lodash-es/once.js'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getExecutionSession287} from './execution287.js'
import {getSettingsCacheStore287} from '../../utils/settings/settingsCache.js'
import {getSettingsForSource,loadManagedFileSettings} from '../../utils/settings/settings.js'
import {getMdmSettings,getHkcuSettings,getMdmWslInherits287} from '../../utils/settings/mdm/settings.js'
import {getEnabledSettingSources} from '../../utils/settings/constants.js'
import {getPlatform} from '../../utils/platform.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../analytics/index.js'
import {getRemoteManagedSettingsRuntime287,getRemoteManagedSettingsSyncFromCache,getRawRemoteManagedSettingsCache,getRemoteManagedSettingsLoadStatus} from '../remoteManagedSettings/syncCacheState.js'
import {getPolicyParser287} from '../../utils/settings/policyParserOwner287.js'
import {createModelUsagePolicy287,type PolicyReadContext287,type ModelUsagePolicyNative287,type ModelUsagePolicyReadPorts287} from './officialModelUsagePolicy287/native.js'
import {createModelUsageApplicationPorts287} from './modelUsage287.js'
import {createModelUsage287,type ModelUsageNative287,type ModelUsagePorts287} from './officialModelUsage287/native.js'
import type {BetaUsage} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'

const parser=getPolicyParser287()
let policy:ModelUsagePolicyNative287|undefined
let usage:ModelUsageNative287|undefined

// Reuse the live settings registry and actual read ports. The local app has
// no installed enterprise-helper context; omit that optional source input,
// rather than inventing a helper owner or a permissive managed-trust value.
export function getModelUsagePolicyContext287():PolicyReadContext287 {
 const reader=getModelUsagePolicy287()
 return {store:getSettingsCacheStore287(),cwd:getOriginalCwd(),allowedSources:getEnabledSettingSources(),
  hostManagedProvider:authEnvironment.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST,
  parentManaged:reader.parentManaged(),wslInherits:getMdmWslInherits287,file:loadManagedFileSettings,mdm:getMdmSettings,hkcu:getHkcuSettings,
  credentialHelperKeysFrom:reader.credentialsFrom}
}

export function createModelUsagePolicyReadPorts287():ModelUsagePolicyReadPorts287 {
 return {
  context:getModelUsagePolicyContext287,settingsStore:getSettingsCacheStore287,mdm:getMdmSettings,
  helperArmedFromUserWritableBase:()=>getModelUsagePolicyContext287().helperArmedFromUserWritableBase?.(),
  managedFile:loadManagedFileSettings,parsePolicy:parser.parse,
  readUncached:(source,context)=>source==='policySettings'
   ?getModelUsagePolicy287().resolvePolicy(context).settings:getSettingsForSource(source),
  platform:getPlatform,filesystem:getFsImplementation,debug:logForDebugging,environment:authEnvironment,
  remoteOwner:()=>getRemoteManagedSettingsRuntime287().owner(),
  remoteSettings:getRemoteManagedSettingsSyncFromCache,rawRemoteSettings:getRawRemoteManagedSettingsCache,
  remoteLoadStatus:getRemoteManagedSettingsLoadStatus,
  remoteSnapshotEnabled:()=>getRemoteManagedSettingsRuntime287().snapshotEnabled(),
  mergeWith,isEqual,omit,pick,memoize:once,executionContext:getExecutionSession287,logEvent,
 }
}

export function getModelUsagePolicy287():ModelUsagePolicyNative287 {
 return policy??=createModelUsagePolicy287(createModelUsagePolicyReadPorts287())
}

export function createProductionModelUsagePorts287():ModelUsagePorts287 {
 const policy=getModelUsagePolicy287()
 const ports=createModelUsageApplicationPorts287(policy,getExecutionSession287)
 return {...ports,
  settingsSource:source=>source==='policySettings'
   ?policy.readSource(source,getModelUsagePolicyContext287()):getSettingsForSource(source),
 }
}

export function getModelUsageProducer287():ModelUsageNative287 {
 return usage??=createModelUsage287(createProductionModelUsagePorts287())
}

// This is a producer only. The existing cost-tracker sink records the row and
// amount once, followed by the unchanged local counters/advisor recursion.
export function accumulateModelUsage287(cost:number,response:BetaUsage,model:string) {
 return getModelUsageProducer287().accumulate(cost,response,model)
}
