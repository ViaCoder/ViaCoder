import axios from 'axios'
import { createHash } from 'node:crypto'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../analytics/growthbook.js'
import { isPolicyAllowed } from '../policyLimits/index.js'
import { getClaudeAIOAuthTokens, getCredentialCacheGeneration, hasProfileScope, isClaudeAISubscriber } from '../../utils/auth.js'
import { getGlobalConfig } from '../../utils/config.js'
import { getOauthConfig, OAUTH_BETA_HEADER } from '../../constants/oauth.js'
import { getAPIProvider, isFirstPartyAnthropicBaseUrl } from '../../utils/model/providers.js'
import { isBareMode, isEnvDefinedFalsy } from '../../utils/envUtils.js'
import { isEssentialTrafficOnly } from '../../utils/privacyLevel.js'
import { getCustomHeaders } from '../../utils/customHeaders.js'
import { getClaudeCodeUserAgent, getClaudeCodeClientPlatform as clientPlatform } from '../../utils/userAgent.js'
import { logForDebugging } from '../../utils/debug.js'
import { clearServedCatalog, parseServedCatalogResponse, setServedCatalog } from '../../utils/model/servedCatalog.js'
import {readServedCache, writeServedCache, isServedCacheStale, makeServedCacheEntry, isServedETag} from '../../utils/model/servedCatalogCache.js'

// Official chunk-y3dsk95a.js:net/Ope/h/kG and chunk-cajb2b5v.js:oi/bt.
// This build's h/x admits Claude.ai account/token scopes only, not API keys.
// Keep the official off-by-default gate; bootstrap's wire schema is unchanged.
function eligible(): boolean {
  if (isBareMode() || isEssentialTrafficOnly() || process.env.ANTHROPIC_UNIX_SOCKET ||
      isEnvDefinedFalsy(process.env.CLAUDE_CODE_MODEL_CATALOG) || getAPIProvider() !== 'firstParty' ||
      !isFirstPartyAnthropicBaseUrl() || !isPolicyAllowed('allow_model_catalog')) return false
  const config = getFeatureValue_CACHED_MAY_BE_STALE<unknown>('tengu_delegated_quail', {mode: 'off'})
  if (!config || typeof config !== 'object') return false
  const value = config as {served?: unknown; mode?: unknown}
  return (typeof value.served === 'string' ? value.served : value.mode) === 'primary'
}
function snapshot() {
  if (!eligible() || !isClaudeAISubscriber()) return null
  const token = getClaudeAIOAuthTokens()?.accessToken
  if (!token) return null
  const account = getGlobalConfig().oauthAccount
  const org = process.env.CLAUDE_CODE_ORGANIZATION_UUID ?? account?.organizationUuid
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const accountRoute = hasProfileScope() && typeof org === 'string' && uuid.test(org) && uuid.test(account?.accountUuid ?? '')
  const surface = process.env.CLAUDE_CODE_REMOTE ? 'ccr' : ['claude-desktop', 'claude-desktop-3p', 'local-agent'].includes(process.env.CLAUDE_CODE_ENTRYPOINT ?? '') ? 'ccd' : 'cc'
  const path = accountRoute ? `/api/organizations/${org.toLowerCase()}/model_selector/${surface}` : `/api/model_selector/${surface}`
  const key = createHash('sha256').update(JSON.stringify([token, getCredentialCacheGeneration(), org,
    account?.accountUuid, getOauthConfig().BASE_API_URL, path])).digest('hex')
  const hash = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 12)
  const cacheScope = accountRoute ? `${org.toLowerCase()}-${hash(account!.accountUuid.toLowerCase())}` : `tok-${hash(token)}`
  return {token, path, surface, key, cacheScope} as const
}

let inflight: {key: string; promise: Promise<void>} | undefined
export async function refreshServedModelCatalog({allowNetwork = true, force = false}: {allowNetwork?: boolean; force?: boolean} = {}): Promise<void> {
  const current = snapshot()
  if (!current) { clearServedCatalog(); return }
  if (inflight?.key === current.key) return inflight.promise
  const promise = (async () => {
    try {
      const prior = await readServedCache(current.cacheScope, current.surface)
      if (snapshot()?.key !== current.key) return
      if (prior) setServedCatalog(prior.catalog)
      if (!allowNetwork || prior && !force && !isServedCacheStale(prior)) return
      const response = await axios.get<unknown>(`${getOauthConfig().BASE_API_URL}${current.path}`, {
        headers: {'Content-Type': 'application/json', 'User-Agent': getClaudeCodeUserAgent(),
          ...getCustomHeaders(), Authorization: `Bearer ${current.token}`, 'anthropic-beta': OAUTH_BETA_HEADER,
          'anthropic-client-platform': clientPlatform(), ...(prior?.etag && {'If-None-Match': prior.etag})}, timeout: 5000, maxContentLength: 2_097_152,
        validateStatus: status => status === 304 || status >= 200 && status < 300,
      })
      if (snapshot()?.key !== current.key) return
      if (response.status === 304) {
        if (prior?.etag) await writeServedCache(current.cacheScope, current.surface, makeServedCacheEntry(prior.catalog, prior.etag))
        return
      }
      const catalog = parseServedCatalogResponse(response.data, current.surface)
      if (catalog !== undefined) {
        setServedCatalog(catalog)
        const etag = response.headers?.etag
        await writeServedCache(current.cacheScope, current.surface, makeServedCacheEntry(catalog, isServedETag(etag) ? etag : undefined))
      }
    } catch {
      // Keep the current same-scope rows on transient failure; never write
      // credentials or a model's identity into diagnostic output.
      logForDebugging('[servedCatalog] Model-selector refresh did not produce a valid response')
    }
  })()
  inflight = {key: current.key, promise}
  try { await promise } finally { if (inflight?.promise === promise) inflight = undefined }
}
