import { createHash } from 'node:crypto'
import type { AccountInfo, GlobalConfig } from '../../utils/config.js'
import type { BootstrapResponse } from './bootstrap.js'
import {getPermissionTrustTrackingOwner287} from '../../utils/config.js'
import {clearBetasCaches} from '../../utils/betas.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {getOfficialModelPickerProviderOwner287} from '../../utils/model/officialModelPicker287.js'
import {stripModelContextSuffix} from '../../utils/model/modelIdentity.js'
import {createOfficialBootstrapCacheMaintenance287, createOfficialBootstrapClientDataOverride287, createOfficialBootstrapSlotHelpers287,
  type BootstrapClientDataHookOwner287, type BootstrapModelCacheOwner287} from './officialBootstrap287/cache.js'

// This accessor returns nativeConfigState itself (config.ts:855), not its
// read-only hook snapshot. Refine the existing narrow trust-owner contract;
// never instantiate ConfigState here. A dedicated config export can replace
// this bridge without changing owner identity or behavior.
export function getBootstrapClientDataHookOwner287(): BootstrapClientDataHookOwner287 {
  const owner: unknown = getPermissionTrustTrackingOwner287()
  for (const key of ['setClientDataReadGate', 'setClientDataStrictReadGate',
    'setClientDataOverride', 'setClientDataStaleMatchGetter'] as const) {
    if (!owner || typeof owner !== 'object' || !(key in owner) ||
      typeof (owner as Record<string, unknown>)[key] !== 'function') {
      throw new TypeError(`Missing original ConfigState setter: ${key}`)
    }
  }
  return owner as BootstrapClientDataHookOwner287
}

// A3's exported accessor initializes and returns the same existing served/
// model-policy owner used by f8/s_e -> gU. Resolve lazily across the cold model
// import cycle. No second provider cache or registration-only shadow exists.
export function getBootstrapModelCacheOwner287(): BootstrapModelCacheOwner287 {
  const owner: BootstrapModelCacheOwner287 = getOfficialModelPickerProviderOwner287()
  // Exact yA's initial clientDataUrl field, on that SAME original producer
  // owner. No document is fabricated, fetched, or deemed entitled here.
  owner.clientDataUrl ??= {document: undefined}
  return owner
}
const cacheMaintenance287 = createOfficialBootstrapCacheMaintenance287({Xr: getBootstrapModelCacheOwner287})
export const sweepBootstrapProviderDenies287 = cacheMaintenance287.oqr
export const applyBootstrapClientDataOverride287 = createOfficialBootstrapClientDataOverride287({
  Xr: getBootstrapModelCacheOwner287, Fn: stripModelContextSuffix, rt: getMainLoopModel,
})
export function clearBootstrapModelBetas287(): void {
  // Exact Ej replaces the two original Qr groups on the SAME model-state
  // owner used by iwn/uN/eZ and the actual API request caller.
  clearBetasCaches()
}

// Port of 2.1.283 chunk-1vt3h958.js:xqn/mMo/Xut and chunk-zmqjrgey.js:q/vjo.
export type BootstrapContext = {
  entrypoint: string | null
  model: string
  ccVersion: string
  organizationUuid: string | null
}
export type ClientDataSlot = {
  data: Record<string, unknown> | null
  at: number
  entrypoint: string | null
  model: string
  org: string | null
}
export const bootstrapSlotHelpers287 = createOfficialBootstrapSlotHelpers287({c0: createHash})
export const bootstrapCacheKey = bootstrapSlotHelpers287.VZn
export function mergeBootstrapAccount(account: AccountInfo | undefined, update: BootstrapResponse['oauth_account']): AccountInfo | undefined {
  if (!account || !update || (update.account_uuid != null && update.account_uuid !== account.accountUuid)) return account
  return {
    ...account,
    organizationType: update.organization_type ?? null,
    organizationRateLimitTier: update.organization_rate_limit_tier ?? null,
    userRateLimitTier: update.user_rate_limit_tier ?? null,
    seatTier: update.seat_tier ?? null,
    ...(update.account_email != null && {emailAddress: update.account_email}),
    ...(update.organization_uuid != null && {organizationUuid: update.organization_uuid}),
    ...(update.organization_name != null && {organizationName: update.organization_name}),
  }
}
export function applyBootstrapResponse(config: GlobalConfig, response: BootstrapResponse, context: BootstrapContext, scopeless = false, now = Date.now()): GlobalConfig {
  const narrowed = response.narrowed ?? scopeless
  const oauthAccount = mergeBootstrapAccount(config.oauthAccount, response.oauth_account)
  const org = oauthAccount?.organizationUuid ?? context.organizationUuid
  const key = bootstrapCacheKey({...context, organizationUuid: org})
  const slots = Object.entries(config.clientDataCacheSlots ?? {})
    .filter(([k, v]) => k !== key && k.startsWith('bi1-') && v && 'data' in v && typeof v.at === 'number')
    .sort(([, a], [, b]) => b.at - a.at).slice(0, 11)
  return {
    ...config, oauthAccount,
    clientDataCacheSlots: Object.fromEntries([[key, {data: response.client_data ?? null, at: now,
      entrypoint: context.entrypoint, model: context.model, org}], ...slots]),
    ...(narrowed && response.additional_model_options == null ? {} : {
      additionalModelOptionsCache: response.additional_model_options ?? [], additionalModelOptionsAnsweredAt: now,
    }),
    ...(narrowed && response.additional_model_costs == null ? {} : {additionalModelCostsCache: response.additional_model_costs ?? {}}),
    ...(narrowed && response.model_access == null ? {} : {modelAccessCache: response.model_access ?? []}),
    ...(narrowed && response.org_model_default == null ? {} : {
      orgModelDefaultCache: response.org_model_default ? {...response.org_model_default, ...(org && {orgUuid: org})} : null,
    }),
    ...(narrowed && response.auto_compact_windows == null ? {} : {autoCompactWindowsCache: response.auto_compact_windows ?? null}),
  }
}
