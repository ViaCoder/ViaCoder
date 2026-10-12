import { open } from 'node:fs/promises'
import { isAbsolute } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { z } from 'zod'
import { getAPIProvider } from './model/providers.js'
import { isBareMode, isEnvTruthy } from './envUtils.js'
import { clearApiKeyHelperCache, getClaudeAIOAuthTokens } from './auth.js'

export type HostAuthRefreshResult = { authToken: string | null; materialUnchanged?: boolean }
export type HostAuthRefreshCallback = () => Promise<HostAuthRefreshResult>
let callback: HostAuthRefreshCallback | undefined
let fileCallback: HostAuthRefreshCallback | undefined
let pinnedEndpoints: Map<string, string> | undefined
let seededCredentials = new Set<string>()
let initialization: Promise<void> | undefined
export function getHostAuthTokenRefreshCallback(): HostAuthRefreshCallback | undefined { return callback }
export function setHostAuthTokenRefreshCallback(value: HostAuthRefreshCallback | undefined): void { callback = value }

// Official chunk-wyjbafrm.js:Wze/TUe/AMe. An apiKeyHelper is NOT a host
// refresh callback. On 1P the callback must be the host-file adapter itself.
export function hostOwnsAuth(): boolean {
  const refresh = getHostAuthTokenRefreshCallback()
  let officialEndpoint = !process.env.ANTHROPIC_BASE_URL
  try { if (process.env.ANTHROPIC_BASE_URL) officialEndpoint = new URL(process.env.ANTHROPIC_BASE_URL).host === 'api.anthropic.com' } catch { /* not 1P */ }
  const removedBedrock = isEnvTruthy(process.env.CLAUDE_CODE_USE_BEDROCK)
  const firstParty = !removedBedrock && getAPIProvider() === 'firstParty' &&
    (Boolean(process.env._CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL) || officialEndpoint)
  return Boolean(refresh && (!firstParty || refresh === fileCallback))
}
const endpointKeys = new Set(['ANTHROPIC_BASE_URL', 'ANTHROPIC_BEDROCK_BASE_URL', 'ANTHROPIC_VERTEX_BASE_URL',
  'ANTHROPIC_FOUNDRY_BASE_URL', 'ANTHROPIC_AWS_BASE_URL', 'ANTHROPIC_GOOGLE_CLOUD_BASE_URL', 'ANTHROPIC_BEDROCK_MANTLE_BASE_URL'])
const credentialKeys = new Set(['ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'CLAUDE_CODE_OAUTH_TOKEN',
  'AWS_BEARER_TOKEN_BEDROCK', 'ANTHROPIC_FOUNDRY_API_KEY', 'ANTHROPIC_FOUNDRY_AUTH_TOKEN', 'ANTHROPIC_AWS_API_KEY',
  'ANTHROPIC_CUSTOM_HEADERS', 'CLAUDE_CODE_SKIP_VERTEX_AUTH'])
const number = z.union([z.number(), z.string()]).pipe(z.coerce.number())
const schema = z.object({env: z.record(z.string(), z.string()), expiresAt: number.nullable().default(null),
  pid: z.number().int(), procStart: number})
export type HostCredentials = z.infer<typeof schema>
async function processStart(pid: number): Promise<number | null> {
  try {
    const {stdout} = await promisify(execFile)('ps', ['-o', 'lstart=', '-p', String(pid)],
      {timeout: 1000, env: {...process.env, LC_ALL: 'C', TZ: 'UTC'}})
    const date = Date.parse(`${stdout.trim()} UTC`)
    return Number.isFinite(date) ? date : null
  } catch { return null }
}
// WIt: bounded read, owner/mode, liveness, process-start pin, expiry. No
// default credential path is probed; only the host's explicitly supplied file.
export async function readHostCredentialsFile(
  path = process.env.CLAUDE_CODE_HOST_CREDS_FILE,
  getStart: (pid: number) => Promise<number | null> = processStart,
): Promise<HostCredentials | null> {
  if (!path || !isAbsolute(path)) return null
  let file: Awaited<ReturnType<typeof open>> | undefined
  try {
    file = await open(path, 'r')
    const stat = await file.stat()
    if (!stat.isFile() || stat.size > 65536 || process.platform !== 'win32' &&
        ((stat.mode & 63) !== 0 || stat.uid !== process.getuid?.())) return null
    const bytes = Buffer.alloc(65537)
    const {bytesRead} = await file.read(bytes, 0, bytes.length, 0)
    if (bytesRead > 65536) return null
    const parsed = schema.safeParse(JSON.parse(bytes.subarray(0, bytesRead).toString('utf8')))
    if (!parsed.success || !Number.isFinite(parsed.data.procStart)) return null
    const data = parsed.data
    if (data.pid <= 1) return null
    try { process.kill(data.pid, 0) } catch { return null }
    const start = await getStart(data.pid)
    if (start !== null && Math.abs(start - data.procStart) > 2000) return null
    if (data.expiresAt !== null && data.expiresAt < Date.now()) return null
    return {...data, env: Object.fromEntries(Object.entries(data.env).filter(([key]) => endpointKeys.has(key) || credentialKeys.has(key)))}
  } catch { return null } finally { await file?.close().catch(() => {}) }
}
function replaceCredentials(env: Record<string, string>): void {
  let changed = false
  for (const key of seededCredentials) if (!(key in env)) { delete process.env[key]; changed = true }
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] !== value) changed = true
    process.env[key] = value
  }
  seededCredentials = new Set(Object.keys(env))
  if (changed) {
    clearApiKeyHelperCache()
    getClaudeAIOAuthTokens.cache?.clear?.()
  }
}
function pinEndpoints(env: Record<string, string>): void {
  pinnedEndpoints = new Map()
  for (const [key, value] of Object.entries(env)) if (endpointKeys.has(key)) {
    const pinned = process.env[key] || value
    process.env[key] = pinned
    pinnedEndpoints.set(key, pinned)
  }
}
export async function initializeHostCredentials(): Promise<void> {
  if (callback || isBareMode() || !process.env.CLAUDE_CODE_HOST_CREDS_FILE || !isEnvTruthy(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)) return
  if (initialization) return initialization
  initialization = (async () => {
    const initial = await readHostCredentialsFile()
    if (callback) return // An embedding host may have installed its adapter while the file was read.
    if (initial) { pinEndpoints(initial.env); replaceCredentials(Object.fromEntries(Object.entries(initial.env).filter(([key]) => !endpointKeys.has(key)))) }
    fileCallback = async () => {
      const fresh = await readHostCredentialsFile()
      if (!fresh) throw new Error('Host credential file is missing, stale or expired')
      for (const [key, value] of Object.entries(fresh.env)) if (endpointKeys.has(key) && pinnedEndpoints && pinnedEndpoints.get(key) !== value) {
        throw new Error('Host credential refresh changed an endpoint')
      }
      const credentials = Object.fromEntries(Object.entries(fresh.env).filter(([key]) => !endpointKeys.has(key)))
      const bearerKey = process.env.CLAUDE_CODE_HOST_AUTH_ENV_VAR || 'ANTHROPIC_AUTH_TOKEN'
      if (seededCredentials.has(bearerKey) && !credentials[bearerKey]) throw new Error('Host credential refresh dropped its bearer')
      if (!pinnedEndpoints) pinEndpoints(fresh.env)
      replaceCredentials(credentials)
      return {authToken: credentials[bearerKey] ?? null}
    }
    setHostAuthTokenRefreshCallback(fileCallback)
  })()
  try { await initialization } finally { initialization = undefined }
}
export function resetHostCredentials(): void {
  callback = undefined; fileCallback = undefined; pinnedEndpoints = undefined; seededCredentials = new Set(); initialization = undefined
}
