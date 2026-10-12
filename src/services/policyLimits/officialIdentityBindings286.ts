/**
 * Production bindings for the complete 2.1.287 principal factory; legacy API name retained.
 *
 * All state-bearing production accessors are imported from their existing
 * owners. In particular, WIF attribution uses the accessor module's existing
 * ttgve2cs namespace, and j() uses the same execution host as secure storage.
 * This module does not create a second OAuth/WIF credential cache or host.
 */
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { filesCredentialSlots } from '../../vendor/official-files-api/slots.js'
import { F4n as replaceComplianceTaints } from '../../vendor/official-files-api/taints.js'
import { getAnthropicApiKeyWithSource, getAuthTokenSource, getClaudeAIOAuthTokens, getOauthAccountInfo, isClaudeAISubscriber } from '../../utils/auth.js'
import { authEnvironment } from '../../utils/authEnvironment.js'
import { clearBetasCaches } from '../../utils/betas.js'
import { configKeys } from '../../utils/officialConfigWriter/bindings.js'
import { createConfigQueue } from '../../utils/officialConfigWriter/runtime.js'
import { getFsImplementation } from '../../utils/fsOperations.js'
import { safeParseJSON } from '../../utils/json.js'
import { stripBOM } from '../../utils/jsonRead.js'
import { getGlobalClaudeFile } from '../../utils/env.js'
import { isBareMode } from '../../utils/envUtils.js'
import { errorMessage, isENOENT } from '../../utils/errors.js'
import { createPolicySignal287 } from './officialPublic287/signal.js'
const {Me:createSignal}=createPolicySignal287({})
import { getSecureStorage } from '../../utils/secureStorage/index.js'
import { getSecureStorageExecutionHost } from '../../utils/secureStorage/macOsKeychainHelpers.js'
import { isStorageV5PinnedOn } from '../../utils/secureStorage/storageV5.js'
import { getOAuthTokenFromFileDescriptor } from '../../utils/authFileDescriptor.js'
import { getWIFCredentials, getWIFTokenCache, getWifAttribution286, getOAuthResetExecutionContext286 } from '../../utils/httpWorkloadIdentity.js'
import { logError } from '../../utils/log.js'
import { logForDebugging } from '../../utils/debug.js'
import { uniq } from '../../utils/array.js'
import { hasWorkloadIdentityConfiguration } from '../../utils/workloadIdentity.js'
import { createOfficialPolicyCredentialSources286 } from './officialIdentity286/credentialSources.js'
import type { OfficialPolicyPrincipal286Ports } from './officialIdentity286/principal.js'
import { createOfficialPolicyPrincipal287 } from './officialPublic287/principal.js'
import { OfficialHostCell286 } from './officialIdentity286/hostCell.js'
import { OFFICIAL_POLICY_CORE_SKILLS_286 } from './officialIdentity286/coreSkills.js'
import { validatePolicyOrganizationUuid286 } from './officialIdentity286/organizationUuid.js'
import { officialPolicySocketAuth286 } from './officialIdentity286/socketAuth.js'

const credentialOrigins = createOfficialPolicyCredentialSources286({
  a: authEnvironment,
  ae: () => getFsImplementation(),
  d: logError,
  d0: getOAuthTokenFromFileDescriptor,
  F: isStorageV5PinnedOn,
  ft: (text: string, shouldLog = true) => safeParseJSON(text, shouldLog),
  FYr: () => filesCredentialSlots.oauthScopesFromFd(),
  G: isENOENT,
  GG: () => filesCredentialSlots.oauthTokenFromBgSnapshot(),
  j: getOAuthResetExecutionContext286,
  kr: isBareMode,
  Me: createSignal,
  ng: createConfigQueue,
  Oe: configKeys,
  q: OfficialHostCell286,
  Ro: stripBOM,
  vs: cell => cell.of(getSecureStorageExecutionHost()),
  Xt: validatePolicyOrganizationUuid286,
  za: getGlobalClaudeFile,
  zn: getSecureStorage,
})

function credentialSource(): 'store' | 'env' | 'fd' | 'none' {
  const source = getAuthTokenSource().source
  if (source === 'claude.ai') return 'store'
  if (source === 'CLAUDE_CODE_OAUTH_TOKEN') return 'env'
  if (source === 'CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR' || source === 'CCR_OAUTH_TOKEN_FILE') return 'fd'
  return 'none'
}

const principalPorts: OfficialPolicyPrincipal286Ports = {
  a: authEnvironment as unknown as Readonly<Record<string, string | undefined>>,
  BS: () => getAnthropicApiKeyWithSource(),
  c9: () => require('./booleanSource287.js').policyBooleanSource287.servedTrue('tengu_lovely_umbrella'),
  cc: () => Boolean(authEnvironment.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST),
  ct: isClaudeAISubscriber,
  de: createHash,
  E2: clearBetasCaches,
  GG: () => filesCredentialSlots.oauthTokenFromBgSnapshot(),
  Hg: credentials => credentialOrigins.Hg(credentials),
  j: getOAuthResetExecutionContext286,
  kb: () => getWifAttribution286().kb(),
  kn: resolve,
  l: errorMessage,
  L6o: officialPolicySocketAuth286,
  Me: createSignal,
  MSe: directory => getWifAttribution286().MSe(directory),
  mWr: storage => credentialOrigins.mWr(storage),
  N: values => uniq(values),
  pn: () => getClaudeAIOAuthTokens() ?? undefined,
  q: OfficialHostCell286,
  qT: credentialSource,
  SM: () => getWifAttribution286().SM(),
  t: logForDebugging,
  t7n: taints => replaceComplianceTaints(taints),
  V2t: () => getWifAttribution286().V2t(),
  wb: () => Boolean(getAnthropicApiKeyWithSource().key),
  Wc: hasWorkloadIdentityConfiguration,
  Wgn: OFFICIAL_POLICY_CORE_SKILLS_286,
  xm: getOauthAccountInfo,
  Xt: validatePolicyOrganizationUuid286,
  XUe: () => getWifAttribution286().XUe(),
  Yzr: directory => getWifAttribution286().Yzr(directory),
}

// 287 raw declarations retain the existing credential/storage/WIF accessors.
// Only the principal implementation changes; p() remains the one shared host slot.
export const principalPorts287 = {
  U: principalPorts.j, V: principalPorts.q, Me: principalPorts.Me,
  dtr: principalPorts.t7n, Ej: principalPorts.E2, L: principalPorts.N,
  ubn: principalPorts.Wgn, t: principalPorts.t, l: principalPorts.l,
  ez: principalPorts.c9, a: principalPorts.a, a5o: principalPorts.L6o,
  fn: principalPorts.pn, Zg: principalPorts.Hg, S3r: principalPorts.mWr,
  ue: principalPorts.de, Xb: principalPorts.wb, fd: principalPorts.Wc,
  ew: principalPorts.kb, DGt: principalPorts.V2t, oje: principalPorts.XUe,
  rL: principalPorts.SM, K5r: principalPorts.Yzr, kn: principalPorts.kn,
  mb: principalPorts.BS, mwe: principalPorts.MSe, tn: principalPorts.Xt,
  ft: principalPorts.ct, Qm: principalPorts.xm, $k: principalPorts.qT,
  Uz: principalPorts.GG, Jl: principalPorts.cc,
}
let principal: ReturnType<typeof createOfficialPolicyPrincipal287> | undefined

/** The one production principal factory; its native p() slot is keyed by the shared host. */
export function getOfficialPolicyPrincipal286(): ReturnType<typeof createOfficialPolicyPrincipal287> {
  return principal ??= createOfficialPolicyPrincipal287(principalPorts287)
}

/** Exposes the already-bound native WIF getters for the eventual PolicyLimitsClient caller. */
export const officialPolicyIdentityCredentialPorts286 = {
  getWIFCredentials,
  getWIFTokenCache,
  getWifAttribution286,
  getOAuthResetExecutionContext286,
}
