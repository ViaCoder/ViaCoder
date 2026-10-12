import {getOauthAccountInfo} from '../../utils/auth.js'
import {getGlobalConfig, saveGlobalConfig} from '../../utils/config.js'
import {getProjectsDir} from '../../utils/sessionStorage.js'
import {usageScopedModels287} from '../../services/api/usageConsumers287.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import {getUsageHeaderObservation,getQuotaOwner287} from '../../services/claudeAiLimits.js'
import {getUsageProduction287} from '../../services/api/usageProduction287.js'
import {createSessionUsageHost, type SessionUsageHost, type UsageSnapshot} from './sessionQueries.js'

const accountUuid = () => getOauthAccountInfo()?.accountUuid
const snapshot = () => getGlobalConfig().cachedUsageUtilization

/** Production binding for the active local OAuth/config/transcript lane. The
 * factory itself performs no reads, writes, network calls or scans. */
export function createLocalSessionUsageHost(redactsPersistedLane: () => boolean,context:{credentials?:CredentialStore;storageV5?:unknown}={}): SessionUsageHost {
  const base = createSessionUsageHost({
    redactsPersistedLane,
    rateLimits: {
      accountUuid,
      readSnapshot: snapshot,
      writeSnapshot(value: UsageSnapshot | undefined,storageV5?:unknown) {
        saveGlobalConfig(current => ({...current, cachedUsageUtilization: value}),storageV5)
      },
      lastAppliedObservationAtMs: () => getUsageHeaderObservation().lastAppliedObservationAtMs,
      readHeaderWindows: () => getUsageHeaderObservation().currentWindows,
      ...context,quotaOwner:getQuotaOwner287(),
      fetchUsage:credentials=>getUsageProduction287().read(credentials),
      scopedModelDisplayNames:usageScopedModels287.Gne,
      ensureScopedModelsReady:usageScopedModels287.BMr,
    },
    transcripts: {projectsDir: getProjectsDir()},
  })
  return base
}
