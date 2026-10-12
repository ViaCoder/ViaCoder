import { readFile, stat, mkdir, open, rename, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { createHash } from 'node:crypto'
import lockfile from 'proper-lockfile'
import { getAPIProvider } from './model/providers.js'
import { isBareMode, isEnvTruthy } from './envUtils.js'
import { getConfiguredApiKeyHelper, getCredentialCacheGeneration } from './auth.js'
import { getUserAgent } from './http.js'
import { getProxyFetchOptions } from './proxy.js'
import { hasOfficialWorkloadIdentityConfiguration286 } from '../services/policyLimits/officialWifEligibilityBindings286.js'

const nowSeconds = () => Math.floor(Date.now() / 1000)
// chunk-v53y6yqm:uMr/v: retain a bounded set of rejected tokens across an
// apiKeyHelper generation change in the ordinary messages retry loop. Memory
// only; never logged or persisted. A sibling-rotated token is still reusable.
const rejectedAccessTokens = new Set<string>()
export type WorkloadToken = {token: string; expiresAt: number | null}
export class WorkloadIdentityError extends Error {
  constructor(message: string, readonly statusCode?: number) { super(message); this.name = 'WorkloadIdentityError' }
}
// Direct adaptation of SDK 0.112.1 embedded in npm 2.1.283:
// chunk-2mgnea7j.js:Lft and chunk-7vqqp82j.js:Y$o/O1e/X$o (seconds).
export class WorkloadTokenCache {
  private cached: WorkloadToken | null = null
  private pending: Promise<WorkloadToken> | null = null
  private force = false
  private lastAdvisoryError = 0
  constructor(private provider: (options?: {forceRefresh: true}) => Promise<WorkloadToken>) {}
  async getToken(): Promise<string> {
    const force = this.force; this.force = false
    const cached = this.cached
    if (force || cached === null) return (await this.refresh(force)).token
    if (cached.expiresAt === null || cached.expiresAt - nowSeconds() > 120) return cached.token
    if (cached.expiresAt - nowSeconds() > 30) {
      if (!this.pending && nowSeconds() - this.lastAdvisoryError >= 5) {
        void this.refresh().catch(() => { this.lastAdvisoryError = nowSeconds() })
      }
      return cached.token
    }
    return (await this.refresh()).token
  }
  invalidate(): void { this.cached = null; this.force = true }
  private refresh(force = false): Promise<WorkloadToken> {
    if (this.pending && !force) return this.pending
    this.pending = this.provider(force ? {forceRefresh: true} : undefined).then(value => {
      this.cached = value; this.pending = null; return value
    }, error => { this.pending = null; throw error })
    return this.pending
  }
}
type Profile = {
  organization_id?: string; workspace_id?: string; base_url?: string
  authentication: {type: 'oidc_federation' | 'user_oauth'; federation_rule_id?: string;
    service_account_id?: string; credentials_path?: string; client_id?: string;
    identity_token?: {source: string; path: string}; scope?: string}
}
export type BootstrapWorkloadIdentity = {baseURL: string; extraHeaders: Record<string, string>; cache: WorkloadTokenCache}
const env = (name: string) => process.env[name]?.trim() || undefined
function blocked(): boolean {
  // Bedrock is deliberately removed, but its legacy WIF gate must still
  // short-circuit before the provider assertion so a removed AWS setting does
  // not turn a non-applicable bootstrap path into an unrelated throw.
  return isBareMode() || isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK) || getAPIProvider() !== 'firstParty' || Boolean(process.env.ANTHROPIC_UNIX_SOCKET) ||
    Boolean(process.env.CLAUDE_CODE_REMOTE) || ['claude-desktop', 'local-agent'].includes(process.env.CLAUDE_CODE_ENTRYPOINT ?? '') ||
    Boolean(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST) || Boolean(env('ANTHROPIC_AUTH_TOKEN') || env('CLAUDE_CODE_OAUTH_TOKEN') ||
      env('CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR') || getConfiguredApiKeyHelper())
}
function configDir(): string | undefined {
  return env('ANTHROPIC_CONFIG_DIR') ?? (env('XDG_CONFIG_HOME') ? join(env('XDG_CONFIG_HOME')!, 'anthropic') :
    env('HOME') ? join(env('HOME')!, '.config', 'anthropic') : undefined)
}
// KS/Je metadata-only selector for synchronous callers (not a token reader).
// This also lets the local legacy CI auth guard recognize a WIF-only session.
export function hasWorkloadIdentityConfiguration(): boolean {
  return hasOfficialWorkloadIdentityConfiguration286()
}
async function boundedJSON(path: string, credentials = false): Promise<Record<string, any>> {
  const info = await stat(path)
  if (!info.isFile() || info.size > 1_048_576) throw new WorkloadIdentityError('Credential data is not a bounded regular file')
  if (credentials && process.platform !== 'win32' && (info.mode & 0o066) !== 0) throw new WorkloadIdentityError('Credential file has shared permissions')
  const value = JSON.parse(await readFile(path, 'utf8'))
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new WorkloadIdentityError('Invalid credential data')
  return value
}
async function profile(hasStoredOAuth: boolean): Promise<Profile | null> {
  const explicit = env('ANTHROPIC_PROFILE')
  const federation = env('ANTHROPIC_FEDERATION_RULE_ID'), organization = env('ANTHROPIC_ORGANIZATION_ID')
  if (!explicit && federation && organization) return {organization_id: organization, workspace_id: env('ANTHROPIC_WORKSPACE_ID'),
    base_url: env('ANTHROPIC_BASE_URL'), authentication: {type: 'oidc_federation', federation_rule_id: federation,
      service_account_id: env('ANTHROPIC_SERVICE_ACCOUNT_ID'), scope: env('ANTHROPIC_SCOPE')}}
  const dir = configDir()
  if (!dir) return null
  let name = explicit
  if (!name) { try { name = (await readFile(join(dir, 'active_config'), 'utf8')).trim() } catch { /* default profile */ } }
  name ||= 'default'
  if (!/^[A-Za-z0-9_.-]+$/.test(name) || name === '.' || name === '..') throw new WorkloadIdentityError('Invalid Anthropic profile name')
  let value: Record<string, any>
  try { value = await boundedJSON(join(dir, 'configs', `${name}.json`)) }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      if (explicit) throw new WorkloadIdentityError('The selected Anthropic profile was not found')
      return null
    }
    throw error
  }
  const auth = value.authentication
  if (!auth || (auth.type !== 'oidc_federation' && auth.type !== 'user_oauth')) {
    if (explicit) throw new WorkloadIdentityError('The selected Anthropic profile has an unsupported authentication type')
    return null
  }
  if (!explicit && hasStoredOAuth && auth.type === 'user_oauth') return null // ed/H$t: only implicit user OAuth yields to stored login
  return {organization_id: value.organization_id ?? organization, workspace_id: value.workspace_id ?? env('ANTHROPIC_WORKSPACE_ID'),
    base_url: env('ANTHROPIC_BASE_URL') ?? value.base_url, authentication: {...auth,
      federation_rule_id: auth.federation_rule_id ?? federation, service_account_id: auth.service_account_id ?? env('ANTHROPIC_SERVICE_ACCOUNT_ID'),
      credentials_path: auth.credentials_path ?? (auth.type === 'user_oauth' ? join(dir, 'credentials', `${name}.json`) : undefined)}}
}
export function validateTokenBaseURL(baseURL: string): void {
  let url: URL
  try { url = new URL(baseURL) } catch { throw new WorkloadIdentityError('Invalid token endpoint') }
  const host = url.hostname.replace(/^\[|\]$/g, '').toLowerCase()
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '::1'].includes(host))) {
    throw new WorkloadIdentityError('Token endpoint requires HTTPS or loopback HTTP')
  }
}
async function exchange(baseURL: string, body: Record<string, string>, federation: boolean): Promise<Record<string, any>> {
  validateTokenBaseURL(baseURL)
  const response = await fetch(`${baseURL}/v1/oauth/token`, {
    method: 'POST', headers: {'Content-Type': 'application/json', 'User-Agent': getUserAgent(),
      'anthropic-beta': 'oauth-2025-04-20' + (federation ? ',oidc-federation-2026-04-01' : '')},
    body: JSON.stringify(body), ...getProxyFetchOptions({forAnthropicAPI: true}), signal: AbortSignal.timeout(10_000),
  })
  // Do not put a token, request body, or upstream response body in an error.
  if (!response.ok) throw new WorkloadIdentityError('Token exchange failed', response.status)
  const reader = response.body?.getReader()
  if (!reader) throw new WorkloadIdentityError('Token response has no body')
  const chunks: Uint8Array[] = []; let length = 0
  try {
    for (;;) {
      const {done, value} = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > 1_048_576) { await reader.cancel(); throw new WorkloadIdentityError('Token response exceeds size limit') }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  let value: Record<string, any>
  try { value = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { throw new WorkloadIdentityError('Token response is not JSON') }
  if (typeof value?.access_token !== 'string' || !value.access_token ||
      value.token_type && String(value.token_type).toLowerCase() !== 'bearer' || !Number.isFinite(Number(value.expires_in))) {
    throw new WorkloadIdentityError('Token response has invalid required fields')
  }
  return value
}
async function atomicCredentials(path: string, value: Record<string, unknown>): Promise<void> {
  const dir = dirname(path); await mkdir(dir, {recursive: true, mode: 0o700})
  const temp = `${path}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`
  try {
    const file = await open(temp, 'wx', 0o600)
    try { await file.writeFile(JSON.stringify(value, null, 2)); await file.sync() } finally { await file.close() }
    await rename(temp, path)
  } catch (error) { await unlink(temp).catch(() => {}); throw error }
}
function credentials(config: Profile): BootstrapWorkloadIdentity {
  const baseURL = (env('ANTHROPIC_BASE_URL') || config.base_url || 'https://api.anthropic.com').replace(/\/+$/, '')
  const auth = config.authentication
  const provider = auth.type === 'oidc_federation' ? async (): Promise<WorkloadToken> => {
    validateTokenBaseURL(baseURL)
    if (auth.identity_token && auth.identity_token.source !== 'file') throw new WorkloadIdentityError('Unsupported identity token source')
    const path = auth.identity_token?.path ?? env('ANTHROPIC_IDENTITY_TOKEN_FILE')
    let assertion = path ? (await readFile(path, 'utf8')).trim() : env('ANTHROPIC_IDENTITY_TOKEN')
    if (!assertion || assertion.length > 16384 || !auth.federation_rule_id || !config.organization_id) throw new WorkloadIdentityError('Federation configuration is incomplete or assertion is oversized')
    const response = await exchange(baseURL, {grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion,
      federation_rule_id: auth.federation_rule_id, organization_id: config.organization_id,
      ...(auth.service_account_id && {service_account_id: auth.service_account_id}), ...(config.workspace_id && {workspace_id: config.workspace_id})}, true)
    assertion = undefined
    return {token: response.access_token, expiresAt: nowSeconds() + Number(response.expires_in)}
  } : async (options?: {forceRefresh: true}): Promise<WorkloadToken> => {
    const path = auth.credentials_path
    if (!path) throw new WorkloadIdentityError('OAuth profile has no credentials path')
    // Official user OAuth mode is fail-closed on cross-process lock failure.
    const release = await lockfile.lock(dirname(path), {stale: 60000, update: 5000, retries: 5})
    try {
      const value = await boundedJSON(path, true)
      if (typeof value.access_token !== 'string' || !value.access_token) throw new WorkloadIdentityError('OAuth profile has no access token')
      const expiry = value.expires_at == null ? null : Number(value.expires_at)
      const rejected = rejectedAccessTokens.has(value.access_token)
      const canAdoptSibling = rejectedAccessTokens.size > 0 && !rejected
      if ((!options?.forceRefresh || canAdoptSibling) && !rejected && (expiry === null || nowSeconds() < expiry - 30)) return {token: value.access_token, expiresAt: expiry}
      if (!auth.client_id || typeof value.refresh_token !== 'string' || !value.refresh_token) throw new WorkloadIdentityError('OAuth profile has no refresh credentials')
      const response = await exchange(baseURL, {grant_type: 'refresh_token', refresh_token: value.refresh_token, client_id: auth.client_id}, false)
      const expiresAt = nowSeconds() + Number(response.expires_in)
      await atomicCredentials(path, {...value, version: '1.0', type: 'oauth_token', access_token: response.access_token,
        expires_at: expiresAt, refresh_token: response.refresh_token || value.refresh_token})
      return {token: response.access_token, expiresAt}
    } finally { await release() }
  }
  return {baseURL, extraHeaders: config.workspace_id && auth.type === 'user_oauth' ? {'anthropic-workspace-id': config.workspace_id} : {}, cache: new WorkloadTokenCache(provider)}
}
let cached: {key: string; value: BootstrapWorkloadIdentity} | undefined
export async function resolveBootstrapWorkloadIdentity(hasStoredOAuth = false): Promise<BootstrapWorkloadIdentity | null> {
  if (blocked()) return null
  const config = await profile(hasStoredOAuth)
  if (!config) return null
  // In-memory digest only; not written or logged. Include assertion/FD choice
  // so replacing injected credentials cannot reuse an earlier token cache.
  const key = createHash('sha256').update(JSON.stringify([config, env('ANTHROPIC_IDENTITY_TOKEN'), env('ANTHROPIC_IDENTITY_TOKEN_FILE'), getCredentialCacheGeneration()])).digest('hex')
  if (cached?.key === key) return cached.value
  const value = credentials(config); cached = {key, value}; return value
}
export function clearBootstrapWorkloadIdentity(): void { cached = undefined; rejectedAccessTokens.clear() }

/** Authentication response observer only: the caller retains its retry policy. */
export function invalidateWorkloadIdentityToken(identity: BootstrapWorkloadIdentity, rejectedToken: string): void {
  rejectedAccessTokens.add(rejectedToken)
  while (rejectedAccessTokens.size > 20) rejectedAccessTokens.delete(rejectedAccessTokens.values().next().value!)
  identity.cache.invalidate()
}

// Does not probe any credential file. Used to discard bootstrap responses
// if the injecting host changes the selected profile or assertion mid-flight.
export function workloadIdentityCredentialStamp(): string {
  return createHash('sha256').update(JSON.stringify([
    'ANTHROPIC_PROFILE', 'ANTHROPIC_CONFIG_DIR', 'ANTHROPIC_BASE_URL', 'ANTHROPIC_FEDERATION_RULE_ID',
    'ANTHROPIC_ORGANIZATION_ID', 'ANTHROPIC_SERVICE_ACCOUNT_ID', 'ANTHROPIC_WORKSPACE_ID',
    'ANTHROPIC_IDENTITY_TOKEN', 'ANTHROPIC_IDENTITY_TOKEN_FILE', 'ANTHROPIC_SCOPE',
    'CLAUDE_CODE_HOST_CREDS_FILE', 'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST',
  ].map(key => process.env[key]))).digest('hex')
}
