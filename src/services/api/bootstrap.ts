import { refreshServedModelCatalog } from './bootstrapModels.js'
import { createHash } from 'node:crypto'
import { z } from 'zod'
import { getAnthropicApiKey, getClaudeAIOAuthTokens, getCredentialCacheGeneration } from '../../utils/auth.js'
import { clearClientDataWindowSeed287, getGlobalConfig, registerClientDataCacheKeyGetter286, saveGlobalConfig } from '../../utils/config.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {createOfficialBootstrapEntrypoint286} from '../../utils/officialClientData286/entrypoint.runtime.js'
import { logForDebugging } from '../../utils/debug.js'
import { logError } from '../../utils/log.js'
import { getMainLoopModel, getRuntimeMainLoopModel } from '../../utils/model/model.js'
import { stripModelContextSuffix } from '../../utils/model/modelIdentity.js'
import { getAPIProvider } from '../../utils/model/providers.js'
import { applyBootstrapResponse, bootstrapCacheKey, bootstrapSlotHelpers287, mergeBootstrapAccount, getBootstrapClientDataHookOwner287, clearBootstrapModelBetas287, sweepBootstrapProviderDenies287, applyBootstrapClientDataOverride287, type BootstrapContext } from './bootstrapCache.js'
import { initializeHostCredentials } from '../../utils/hostCredentials.js'
import { workloadIdentityCredentialStamp } from '../../utils/workloadIdentity.js'
import { bootstrapResponseSchema287, fetchBootstrapAPI287 } from './bootstrapResponse287.js'
import { createOfficialBootstrapPublisher287 } from './officialBootstrap287/native.js'
import {createOfficialBootstrapHooks287} from './officialBootstrap287/cache.js'
import { filesCredentialSlots } from '../../vendor/official-files-api/slots.js'
import { clearServedCatalog } from '../../utils/model/servedCatalog.js'
import { logEvent } from '../analytics/index.js'
import isEqual from 'lodash-es/isEqual.js'

// Exact official 2.1.287 chunk-k9q4wymh.js:Q schema with adapters to the
// existing local model metadata/pricing and auth owners.
export const bootstrapResponseSchema = bootstrapResponseSchema287
export type BootstrapResponse = z.infer<ReturnType<typeof bootstrapResponseSchema>>

const bootstrapEntrypoint286 = createOfficialBootstrapEntrypoint286({a: authEnvironment})

export function getBootstrapContext(model = getMainLoopModel()): BootstrapContext {
  return {entrypoint: bootstrapEntrypoint286.Yd() ?? null, model: stripModelContextSuffix(model),
    ccVersion: MACRO.VERSION, organizationUuid: getGlobalConfig().oauthAccount?.organizationUuid ?? null}
}

// Official 2.1.286 chunk-j328szzz.js:tt registers M6r with v/Z. Keep the
// registration on ConfigState and resolve current model/org context lazily.
function isCurrentBootstrapModel(model: string): boolean {
  const normalized = stripModelContextSuffix(model)
  const current = getMainLoopModel()
  const plan = getRuntimeMainLoopModel({permissionMode: 'plan', mainLoopModel: current})
  return normalized === stripModelContextSuffix(current) || normalized === stripModelContextSuffix(plan)
}
registerClientDataCacheKeyGetter286(model => {
  try {
    return bootstrapCacheKey(getBootstrapContext(model === undefined || isCurrentBootstrapModel(model) ? undefined : model))
  } catch (error) {
    logError(error)
    return 'bi1-key-unavailable'
  }
})
function credentialStamp(): string {
  // In-memory only. Neither secrets nor this digest are persisted or logged.
  return createHash('sha256').update(JSON.stringify([getCredentialCacheGeneration(), getAnthropicApiKey(),
    getClaudeAIOAuthTokens()?.accessToken, getGlobalConfig().oauthAccount?.accountUuid,
    getGlobalConfig().oauthAccount?.organizationUuid, workloadIdentityCredentialStamp()])).digest('hex')
}

async function fetchBootstrapAPI(context: BootstrapContext, credentials?: Parameters<typeof fetchBootstrapAPI287>[1]) {
  const stamp = credentialStamp()
  const result = await fetchBootstrapAPI287(context, credentials)
  return result ? {...result, stamp} : null
}

export const installBootstrapClientDataHooks287 = createOfficialBootstrapHooks287({
  He: getAPIProvider, a: authEnvironment, d: logError, v: getBootstrapContext,
  oe: getBootstrapClientDataHookOwner287, Cbo: applyBootstrapClientDataOverride287,
})
export const publishBootstrapResponse287 = createOfficialBootstrapPublisher287({
  $Nn: installBootstrapClientDataHooks287,
  He: getAPIProvider,
  // Invalidate the existing beta producer before the served-catalog listener.
  Ej: clearBootstrapModelBetas287,
  vpe: clearServedCatalog,
  v: getBootstrapContext,
  v6e: () => JSON.stringify([credentialStamp(), filesCredentialSlots.authenticatedAccountEpoch()]),
  nt: async (context: BootstrapContext, credentials?: Parameters<typeof fetchBootstrapAPI287>[1]) => {
    const result = await fetchBootstrapAPI(context, credentials)
    return result ? {response: result.response, viaScopelessOAuth: result.scopeless} : null
  },
  t: (message: string, options?: unknown) => logForDebugging(message, options as never),
  p: (event: string, data: Record<string, unknown>) => logEvent(event, data as never),
  y: (event: string) => logEvent(event, {} as never),
  le: getGlobalConfig,
  Or: isEqual,
  i: (event: string, data: Record<string, unknown>) => logEvent(event, data as never),
  VZn: bootstrapCacheKey,
  F_t: bootstrapSlotHelpers287.F_t,
  cKo: bootstrapSlotHelpers287.cKo,
  W_t: clearClientDataWindowSeed287,
  // Exact oqr sweep requires the same live original deny/reprobe producer.
  oqr: sweepBootstrapProviderDenies287,
  Ae: (updater: Parameters<typeof saveGlobalConfig>[0], storageV5?: unknown) => saveGlobalConfig(updater, storageV5),
  q: (account: Parameters<typeof applyBootstrapResponse>[0]['oauthAccount'], update: BootstrapResponse['oauth_account']) =>
    mergeBootstrapAccount(account, update),
  dKo: bootstrapSlotHelpers287.dKo,
  Pu: bootstrapSlotHelpers287.Pu,
  d: logError,
  _Kr: () => refreshServedModelCatalog(),
  ot: (account: BootstrapResponse['oauth_account']) => {
    if (!account?.account_uuid) return
    filesCredentialSlots.stampAuthenticatedAccount({accountUuid: account.account_uuid,
      emailAddress: account.account_email ?? undefined, organizationUuid: account.organization_uuid ?? undefined})
  },
})

export async function fetchBootstrapData(): Promise<void> {
  try {
    await initializeHostCredentials()
    await publishBootstrapResponse287()
  } catch (error) { logError(error) }
}
