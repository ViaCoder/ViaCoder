import { isRemoteManagedSettingsEligible } from '../services/remoteManagedSettings/syncCache.js'
import { clearCACertsCache } from './caCerts.js'
import { getGlobalConfig } from './config.js'
import { clearMTLSCache } from './mtls.js'
import { clearProxyCache, configureGlobalAgents } from './proxy.js'
import {type SettingSource} from './settings/constants.js'
import {getAllowedSettingSources} from '../bootstrap/state.js'
import {getSettingsCacheStore287} from './settings/settingsCache.js'
import {authEnvironment} from './authEnvironment.js'
import {getModelUsagePolicy287,getModelUsagePolicyContext287} from '../services/context/modelUsagePolicy287.js'
import {getMdmSettings} from './settings/mdm/settings.js'
import {getRemoteManagedSettingsRuntime287,getRemoteManagedSettingsSyncFromCache,isRemoteManagedSettingsCacheVerified} from '../services/remoteManagedSettings/syncCacheState.js'
import {logForDebugging} from './debug.js'
import {createManagedEnv287,createLoadedMTLSPaths287} from './officialManagedEnv287/native.js'
import {sharedTlsMaterial287} from './sharedTlsMaterial287.js'
import {loadExtraCACerts} from './caCerts.js'
import {loadMTLSClientMaterial} from './mtls.js'
import {logError} from './log.js'
import {getSettingsFilePathForSource} from './settings/settings.js'
import {resetSettingsCache} from './settings/settingsCache.js'
import {publishSettingsColorEnvironment287} from './subprocessEnv.js'
import { isSettingSourceEnabled } from './settings/constants.js'
import {
  getSettingsForSource,
} from './settings/settings.js'

// One AST-derived native snapshot owner, held by this existing managedEnv
// module and shared with compression through peekPreSettingsEnvironment286.
const nativeManagedEnvironment287=createManagedEnv287({
  allowedSources:getAllowedSettingSources,settingsStore:getSettingsCacheStore287,
  environment:authEnvironment,settingsSource:source=>getSettingsForSource(source as SettingSource),
  policyOrigin:()=>getModelUsagePolicy287().policyOrigin(),mdm:getMdmSettings,
  helperArmed:()=>{
    const read=getModelUsagePolicyContext287().helperArmedFromUserWritableBase
    if(!read)throw new Error('Original enterprise helper C.armedFromUserWritableBase owner is not installed')
    return read()
  },remoteSettings:getRemoteManagedSettingsSyncFromCache,remoteVerified:isRemoteManagedSettingsCacheVerified,
  debug:logForDebugging,
  globalConfig:getGlobalConfig,logError,resetSettingsCache,
  sourceEnabled:source=>isSettingSourceEnabled(source as SettingSource),
  settingsPath:source=>getSettingsFilePathForSource(source as SettingSource),
  publishColors:publishSettingsColorEnvironment287,remoteEligible:isRemoteManagedSettingsEligible,
  clearCACerts:clearCACertsCache,clearMTLS:clearMTLSCache,
  loadExtraCACerts,loadMTLS:loadMTLSClientMaterial,
  loadedMTLSPaths:createLoadedMTLSPaths287({k:sharedTlsMaterial287.mtlsState}),
  clearProxy:clearProxyCache,configureAgents:configureGlobalAgents,
})
// Upgrade the existing D singleton in place: snapshot, offered values and all consumers share it.
const preSettingsEnvironmentOwner286 = new nativeManagedEnvironment287.Owner()

// Original be=Yse({clear:oe}) registration uses MCP's already-restored P.
// Late binding avoids importing that owner while managedEnv is still evaluating.
let resetRegistration287:Readonly<{clear():void}>|undefined
export function getManagedEnvironmentResetRegistration287():Readonly<{clear():void}> {
  return resetRegistration287??=(require('../services/mcp/connectedProducer287.js') as typeof import('../services/mcp/connectedProducer287.js'))
    .getMcpConnectedProducer287().registerCacheClear({clear:()=>preSettingsEnvironmentOwner286.reset()})
}

/** Original kht/$2t public cuts; readers never capture or mutate another environment. */
export function filterPolicyPredicateEnvironment287(env:Record<string,string>|undefined,source='policySettings'):Record<string,string> {
  return preSettingsEnvironmentOwner286.filterPolicyPredicateEnv(env,source,{forPolicyMatch:true})
}
export function isSettingsSourcedEnvironmentValue287(name:string,value:string):boolean {
  return preSettingsEnvironmentOwner286.isSettingsSourcedEnvValue(name,value)
}
/** Original zje -> ce -> Jm.of(host); real eligibility writer/reset remain in remote owner. */
export function isManagedPolicySnapshotOnly287():boolean {
  return getRemoteManagedSettingsRuntime287().snapshotEnabled()
}


// Original B.appliedGlobalConfigEnv / q9: this existing env owner records the
// filtered object actually applied, not a config re-read or a second snapshot.
export function getAppliedGlobalConfigEnvironment287():Readonly<Record<string,string>>|undefined {
  return preSettingsEnvironmentOwner286.getAppliedGlobalConfigEnv()
}

/** Return the latched pre-settings snapshot without causing a capture. */
export function peekPreSettingsEnvironment286():
  | Readonly<Record<string, string | undefined>>
  | undefined {
  return preSettingsEnvironmentOwner286.peekPreSettingsEnvSnapshot()
}

/**
 * Drop the current snapshot. On the next capture, names that were already
 * present before the claim remain launch-owned, matching `B.drop...` in the
 * raw 2.1.286 source.
 */
export function dropPreSettingsEnvironment286(
  claimedNames?: Iterable<string>,
): void {
  preSettingsEnvironmentOwner286.dropPreSettingsEnvSnapshot(claimedNames)
}




/**
 * Trusted setting sources whose env vars can be applied before the trust dialog.
 *
 * - userSettings (~/.claude/settings.json): controlled by the user, not project-specific
 * - flagSettings (--settings CLI flag or SDK inline settings): explicitly passed by the user
 * - policySettings (managed settings from enterprise API or local managed-settings.json):
 *   controlled by IT/admin (highest priority, cannot be overridden)
 *
 * Project-scoped sources (projectSettings, localSettings) are excluded because they live
 * inside the project directory and could be committed by a malicious actor to redirect
 * traffic (e.g., ANTHROPIC_BASE_URL) to an attacker-controlled server.
 */
const TRUSTED_SETTING_SOURCES = [
  'userSettings',
  'flagSettings',
  'policySettings',
] as const

/**
 * Apply environment variables from trusted sources to process.env.
 * Called before the trust dialog so that user/enterprise env vars like
 * ANTHROPIC_BASE_URL take effect during first-run/onboarding.
 *
 * For trusted sources (user settings, managed settings, CLI flags), ALL env vars
 * are applied — including ones like ANTHROPIC_BASE_URL that would be dangerous
 * from project-scoped settings.
 *
 * For project-scoped sources (projectSettings, localSettings), only safe env vars
 * from the SAFE_ENV_VARS allowlist are applied. These are applied after trust is
 * fully established via applyConfigEnvironmentVariables().
 */
export function applySafeConfigEnvironmentVariables():void {
  getManagedEnvironmentResetRegistration287()
  preSettingsEnvironmentOwner286.applySafeConfigEnvironmentVariables()
}

/**
 * Apply environment variables from settings to process.env.
 * This applies ALL environment variables (except provider-routing vars when
 * CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST is set — see filterSettingsEnv) and
 * should only be called after trust is established. This applies potentially
 * dangerous environment variables such as LD_PRELOAD, PATH, etc.
 */
export function applyConfigEnvironmentVariables():void {
  getManagedEnvironmentResetRegistration287()
  preSettingsEnvironmentOwner286.applyConfigEnvironmentVariables()
}
