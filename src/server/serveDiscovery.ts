import {lock} from '../utils/lockfile.js'
import {desktopNativeFeatureArgs287} from './desktopNativeFeatureArgs287.js'
import {createProcessProbe} from '../utils/sessionRename/registry.js'
import {startupKey, type ServeStartupOptions} from './serveStartupOptions.js'
import { createHash, randomUUID } from 'node:crypto'
import { constants, closeSync, existsSync, lstatSync, mkdirSync, openSync, readFileSync, realpathSync,
  renameSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { homedir, networkInterfaces } from 'node:os'
import { join, resolve } from 'node:path'

// This private, same-user record advertises an existing service. It is not a
// launcher, credential store, or cross-user/session authentication mechanism.
const VERSION = 2
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
type Record = { version: 2; instanceId: string; url: string; token: string; authMode: 'token' | 'none';
  procStart?:string; claimId?:string; pid: number; configKey: string; sessionId?: string; cwd?: string }
export type SharedOwner = { serverUrl: string; authToken: string; authMode: 'token' | 'none'; sessionId?: string; cwd?:string; launchKey?:string;
  ownerId?: string; epoch?: number; pid?: number; procStart?: string }
export type OwnerLookup = { kind: 'none' } | { kind: 'active'; owner: SharedOwner; snapshot: import('./serveSession.js').ServeSnapshot } |
  { kind: 'unreachable'; reason: string }
export type AutoJoinIntent = { kind: 'fresh' } | { kind: 'resume'; sessionId: string }

export function autoJoinIntent(args: string[], stdinTTY: boolean, stdoutTTY: boolean,
  entrypoint: string | undefined): AutoJoinIntent | null {
  if (!stdinTTY || !stdoutTTY || (entrypoint && entrypoint !== 'cli')) return null
  if (!args.length) return { kind: 'fresh' }
  const resumeId = args.length === 2 && (args[0] === '-r' || args[0] === '--resume') ? args[1] :
    args.length === 1 ? /^--resume=(.+)$/.exec(args[0]!)?.[1] : undefined
  return resumeId && UUID.test(resumeId) ? { kind: 'resume', sessionId: resumeId } : null
}

function directory(): string { return join(homedir(), '.cache', 'cc', 'serve-runtime') }
function privateDirectory(): string | null {
  const path = directory()
  try {
    if (!existsSync(path)) mkdirSync(path, { recursive: true, mode: 0o700 })
    const stat = lstatSync(path)
    if (!stat.isDirectory() || stat.isSymbolicLink() || (stat.mode & 0o077) !== 0 ||
      (process.getuid && stat.uid !== process.getuid())) return null
    return path
  } catch { return null }
}
export function workspaceKey(cwd: string): string {
  return createHash('sha256').update(realpathSync(cwd)).digest('hex')
}
// Only routing/auth overrides actually consumed by the existing API/auth
// clients. This is identity for local auto-discovery, never a model capability
// claim. Saved OAuth material and credential files are deliberately not read.
const CONNECTION_ENV = [
  'ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'ANTHROPIC_BASE_URL',
  'ANTHROPIC_CUSTOM_HEADERS', 'ANTHROPIC_UNIX_SOCKET',
  'CLAUDE_CODE_USE_BEDROCK', 'CLAUDE_CODE_USE_VERTEX', 'CLAUDE_CODE_USE_FOUNDRY',
  'CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD', 'CLAUDE_CODE_SKIP_ANTHROPIC_GOOGLE_CLOUD_AUTH',
  'CLAUDE_CODE_SKIP_VERTEX_AUTH', 'CLAUDE_CODE_SKIP_FOUNDRY_AUTH', 'CLAUDE_CODE_SIMPLE',
  'ANTHROPIC_VERTEX_BASE_URL', 'ANTHROPIC_VERTEX_PROJECT_ID', 'CLOUD_ML_REGION',
  'GOOGLE_CLOUD_PROJECT', 'GCLOUD_PROJECT',
  'ANTHROPIC_GOOGLE_CLOUD_BASE_URL', 'ANTHROPIC_GOOGLE_CLOUD_PROJECT',
  'ANTHROPIC_GOOGLE_CLOUD_LOCATION', 'ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID',
  'GOOGLE_APPLICATION_CREDENTIALS',
  'ANTHROPIC_FOUNDRY_API_KEY', 'ANTHROPIC_FOUNDRY_BASE_URL', 'ANTHROPIC_FOUNDRY_RESOURCE',
  'AZURE_CLIENT_ID', 'AZURE_TENANT_ID', 'AZURE_CLIENT_SECRET',
  'AZURE_AUTHORITY_HOST', 'AZURE_FEDERATED_TOKEN_FILE',
  'ANTHROPIC_CONFIG_DIR', 'XDG_CONFIG_HOME', 'ANTHROPIC_PROFILE',
  'ANTHROPIC_ORGANIZATION_ID', 'ANTHROPIC_FEDERATION_RULE_ID',
  'ANTHROPIC_WORKSPACE_ID', 'ANTHROPIC_SERVICE_ACCOUNT_ID', 'ANTHROPIC_SCOPE',
  'CLAUDE_CODE_OAUTH_TOKEN', 'CLAUDE_CODE_OAUTH_SCOPES', 'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST',
  'CLAUDE_CODE_REMOTE', 'CLAUDE_CODE_ENTRYPOINT',
  'USER_TYPE', 'USE_STAGING_OAUTH',
  'HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'NO_PROXY',
  'http_proxy', 'https_proxy', 'all_proxy', 'no_proxy',
  'API_TIMEOUT_MS', 'NODE_EXTRA_CA_CERTS',
  'CLAUDE_CODE_CLIENT_CERT', 'CLAUDE_CODE_CLIENT_KEY', 'CLAUDE_CODE_CLIENT_KEY_PASSPHRASE',
] as const
const DESCRIPTOR_ENV = ['CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR', 'CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR'] as const
export function sharedStartupEnvironmentIssues(environment: NodeJS.ProcessEnv = process.env): string[] {
  // Inherited FD credentials belong to the originating process; detached
  // ownership must not read/copy them or silently replace its auth context.
  return DESCRIPTOR_ENV.filter(name => environment[name] !== undefined)
}
export function sharedConfigKey(environment: NodeJS.ProcessEnv = process.env): string {
  const base = [homedir(), environment.CLAUDE_CONFIG_DIR ?? '', process.execPath]
  const overrides = CONNECTION_ENV.flatMap(name => {
    const value = environment[name]
    // main labels ordinary non-TTY `serve` as sdk-cli and interactive TUI as
    // cli. Neither changes auth selection. Keep managed/remote SDK identities
    // distinct; this normalization does not broaden autoJoinIntent eligibility.
    if (value === undefined || name === 'CLAUDE_CODE_ENTRYPOINT' && (value === 'cli' || value === 'sdk-cli')) return []
    return [[name, value]]
  })
  for (const name of Object.keys(environment).filter(name => name.startsWith('VERTEX_REGION_CLAUDE_')).sort())
    overrides.push([name, environment[name]])
  // A descriptor's contents cannot be compared without reading a credential.
  // Keep those local to their owner process rather than guessing equivalence.
  if (DESCRIPTOR_ENV.some(name => environment[name] !== undefined)) overrides.push(['descriptor-owner-pid', String(process.pid)])
  return createHash('sha256').update(JSON.stringify(overrides.length ? [...base, overrides] : base)).digest('hex')
}
function pathFor(kind: 'service' | 'session', key: string): string {
  return join(directory(), `${kind}-${key}.json`)
}
function validUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === 'http:' && localServiceHost(url.hostname) &&
    !!url.port && url.pathname === '/' && !url.username && !url.password && !url.search && !url.hash }
  catch { return false }
}
function localServiceHost(host: string): boolean {
  if (host === '127.0.0.1') return true
  const parts = host.split('.').map(Number)
  const privateAddress = parts.length === 4 && parts.every(part => Number.isInteger(part) && part >= 0 && part <= 255) &&
    (parts[0] === 10 || parts[0] === 172 && parts[1]! >= 16 && parts[1]! <= 31 ||
      parts[0] === 192 && parts[1] === 168)
  return privateAddress && Object.values(networkInterfaces()).some(entries => entries?.some(entry =>
    entry.family === 'IPv4' && !entry.internal && entry.address === host))
}
function validRecord(value: unknown): value is Record {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const data = value as Partial<Record>
  return data.version === VERSION && typeof data.instanceId === 'string' && UUID.test(data.instanceId) &&
    typeof data.url === 'string' && validUrl(data.url) && typeof data.token === 'string' &&
    (data.authMode === 'token' || data.authMode === 'none') &&
    (data.procStart===undefined || typeof data.procStart==='string'&&data.procStart.length>0) &&
    (data.claimId===undefined || typeof data.claimId==='string'&&UUID.test(data.claimId)) &&
    data.token.length >= 24 && data.token.length <= 256 && !/[\s,]/.test(data.token) &&
    Number.isSafeInteger(data.pid) && data.pid! > 0 && typeof data.configKey === 'string' &&
    /^[a-f0-9]{64}$/.test(data.configKey) &&
    (data.sessionId === undefined && data.cwd === undefined ||
      typeof data.sessionId === 'string' && UUID.test(data.sessionId) && typeof data.cwd === 'string' && data.cwd.startsWith('/'))
}
function read(kind: 'service' | 'session', key: string): Record | null {
  if (!privateDirectory()) return null
  try {
    const file = pathFor(kind, key), stat = lstatSync(file)
    if (!stat.isFile() || stat.isSymbolicLink() || (stat.mode & 0o077) !== 0 ||
      (process.getuid && stat.uid !== process.getuid()) || stat.size > 4096) return null
    const value: unknown = JSON.parse(readFileSync(file, 'utf8'))
    return validRecord(value) ? value : null
  } catch { return null }
}
function write(kind: 'service' | 'session', key: string, record: Record): void {
  if (!privateDirectory()) return
  const destination = pathFor(kind, key)
  const temporary = `${destination}.${randomUUID()}.tmp`
  const fd = openSync(temporary, 'wx', 0o600)
  try { writeFileSync(fd, JSON.stringify(record)); closeSync(fd); renameSync(temporary, destination) }
  catch (error) { try { closeSync(fd) } catch {} try { unlinkSync(temporary) } catch {} throw error }
}
function removeIfOwned(kind: 'service' | 'session', key: string, instanceId: string): void {
  if (read(kind, key)?.instanceId !== instanceId) return
  try { unlinkSync(pathFor(kind, key)) } catch {}
}
const identityProbe=createProcessProbe()
async function identityLive(record:Record):Promise<boolean>{
 if(!pidLive(record.pid))return false
 if(record.procStart!==undefined){const actual=await createProcessProbe().start(record.pid);if(actual===undefined)throw Error('Shared owner process identity is unreadable');return actual===record.procStart}
 return true
}
function pidLive(pid: number): boolean {
  try { process.kill(pid, 0); return true }
  catch (error) { return (error as NodeJS.ErrnoException).code !== 'ESRCH' }
}
async function identify(record: Record): Promise<boolean> {
  try {
    const response = await fetch(`${record.url}v1/identity`, { headers: record.authMode === 'token' ? { authorization: `Bearer ${record.token}` } : {},
      signal: AbortSignal.timeout(700) })
    if (!response.ok) return false
    const identity = await response.json() as { instanceId?: string; configKey?: string }
    return identity.instanceId === record.instanceId && identity.configKey === record.configKey
  } catch { return false }
}
export function publishSharedService(url: string, token: string, instanceId = randomUUID(), authMode: 'token' | 'none' = 'token') {
  const configKey = sharedConfigKey()
  const record: Record = { version: VERSION, instanceId, url, token, authMode, pid: process.pid, configKey }
  if (!validRecord(record)) throw new Error('Invalid local shared service registration')
  write('service', configKey, record)
  const sessions = new Map<string,()=>Promise<void>>()
  return {
    instanceId, configKey,
    async claimSession(sessionId: string, cwd: string) {
      if (!UUID.test(sessionId)) throw new Error('Invalid shared session ID')
      const realCwd=realpathSync(cwd),path=pathFor('session',sessionId),claimId=randomUUID()
      const unlock=await lock(path,{realpath:false,retries:{retries:8,minTimeout:10,maxTimeout:50}})
      try {
        const existing=read('session',sessionId)
        if(existsSync(path)&&!existing)throw Error('Shared session ownership record is unreadable')
        if(existing&&await identityLive(existing))throw Error('Shared session already has a live owner')
        if(existing)removeIfOwned('session',sessionId,existing.instanceId)
        const procStart=await identityProbe.start(process.pid)
        if(procStart===undefined)throw Error('Current process identity is unreadable')
        const fd=openSync(path,'wx',0o600)
        try{writeFileSync(fd,JSON.stringify({...record,claimId,procStart,sessionId,cwd:realCwd}))}
        catch(error){unlinkSync(path);throw error}finally{closeSync(fd)}
      } finally {await unlock()}
      const release=async()=>{
        const unlock=await lock(path,{realpath:false,retries:{retries:8,minTimeout:10,maxTimeout:50}})
        try{const current=read('session',sessionId)
          if(current?.claimId===claimId&&current.instanceId===instanceId)unlinkSync(path)
          if(sessions.get(sessionId)===release)sessions.delete(sessionId)
        }finally{await unlock()}
      }
      sessions.set(sessionId,release)
      return release
    },
    async releaseSession(sessionId:string){await sessions.get(sessionId)?.()},
    async close(){await Promise.all([...sessions.values()].map(release=>release()));removeIfOwned('service',configKey,instanceId)},
  }

}
export async function discoverWorkspace(cwd: string): Promise<SharedOwner | null> {
  try { realpathSync(cwd) } catch { return null }
  const key = sharedConfigKey()
  const record = read('service', key)
  if (!record || record.configKey !== key ||
    !pidLive(record.pid) || !(await identify(record))) return null
  return { serverUrl: record.url, authToken: record.authMode === 'token' ? record.token : '', authMode: record.authMode }
}
export async function lookupSessionOwner(sessionId: string, _cwd = process.cwd(), localInstanceId?: string): Promise<OwnerLookup> {
  if (!UUID.test(sessionId)) return { kind: 'none' }
  if (!privateDirectory()) return {kind:'unreachable',reason:'Shared ownership directory is unreadable'}
  const record = read('session', sessionId)
  if (!record || record.sessionId !== sessionId) {
    if(existsSync(pathFor('session',sessionId)))return {kind:'unreachable',reason:'Shared ownership record is unreadable'}
    return {kind:'none'}
  }
  // A local facade must not recursively ask itself to discover a missing worker.
  if (record.instanceId === localInstanceId) return { kind: 'none' }
  try{if(!await identityLive(record))return {kind:'none'}}catch{return {kind:'unreachable',reason:'Shared owner process identity is unreadable'}}
  if (record.configKey !== sharedConfigKey()) return { kind: 'unreachable', reason: 'Shared session uses a different configuration location or runtime' }
  if (!(await identify(record))) return { kind: 'unreachable', reason: 'Shared session owner is running but not reachable' }
  try {
    const response = await fetch(`${record.url}v1/sessions/${sessionId}`, {
      headers: record.authMode === 'token' ? { authorization: `Bearer ${record.token}` } : {}, signal: AbortSignal.timeout(700) })
    if (!response.ok) return { kind: 'unreachable', reason: 'Shared session owner did not confirm this session' }
    const snapshot = await response.json() as import('./serveSession.js').ServeSnapshot
    if (snapshot.sessionId !== sessionId || snapshot.cwd !== record.cwd) return { kind: 'unreachable', reason: 'Shared session identity was not confirmed' }
    if (snapshot.identity !== undefined &&
      (snapshot.identity.sessionId !== sessionId || !snapshot.identity.ownerId ||
        !Number.isSafeInteger(snapshot.identity.epoch) || snapshot.identity.epoch < 0))
      return { kind: 'unreachable', reason: 'Shared session owner epoch was not confirmed' }
    // A confirmed stopped executor is eligible for an explicit history fork,
    // unlike an unresponsive owner which could still be writing.
    if (snapshot.closed === true) return { kind: 'none' }
    if (snapshot.closed !== false) return { kind: 'unreachable', reason: 'Shared session is not active' }
    return { kind: 'active', snapshot, owner: { serverUrl: record.url, authToken: record.authMode === 'token' ? record.token : '', authMode: record.authMode, sessionId, cwd:snapshot.cwd, launchKey:snapshot.launchKey,
      ownerId: snapshot.identity?.ownerId ?? snapshot.executorGeneration, epoch: snapshot.identity?.epoch ?? snapshot.epoch,
      pid: record.pid, procStart: record.procStart } }
  } catch { return { kind: 'unreachable', reason: 'Shared session owner did not confirm this session' } }
}
export async function createSharedSession(owner: SharedOwner, cwd: string, startup?: ServeStartupOptions, resumeFrom?:string): Promise<SharedOwner> {
  // A failure after POST may have created an idle worker. Do not fall through
  // to a local query owner, because that would make the outcome ambiguous.
  const response = await fetch(`${owner.serverUrl}v1/sessions`, { method: 'POST',
    headers: { ...(owner.authMode === 'token' ? { authorization: `Bearer ${owner.authToken}` } : {}), 'content-type': 'application/json' },
    body: JSON.stringify({ cwd, ...(startup ? {startup} : {}), ...(resumeFrom ? {resumeFrom} : {}) }), signal: AbortSignal.timeout(2000) })
  if (!response.ok) throw new Error(`Shared session creation failed (HTTP ${response.status})`)
  const result = await response.json() as { sessionId?: string }
  if (!result.sessionId || !UUID.test(result.sessionId)) throw new Error('Shared service returned an invalid session ID')
  return { ...owner, sessionId: result.sessionId }
}

export function assertSharedStartupCompatible(owner:SharedOwner,startup?:ServeStartupOptions):void {
 if(startup && (Object.keys(startup.values).length || Object.keys(startup.env).length) && owner.launchKey!==startupKey(startup))
  throw new Error('Live shared session has different startup options; attach without overrides or explicitly fork a new session')
}
export async function continueSharedSession(owner:SharedOwner,id:string,startup?:ServeStartupOptions):Promise<SharedOwner>{
 const response=await fetch(`${owner.serverUrl}v1/sessions/${id}/continue`,{method:'POST',headers:{
  ...(owner.authMode==='token'?{authorization:`Bearer ${owner.authToken}`} : {}),'content-type':'application/json'},
  body:JSON.stringify(startup?{startup}:{}),signal:AbortSignal.timeout(5000)})
 if(!response.ok)throw new Error(`Shared resume failed (HTTP ${response.status}); no local executor started`)
 const result=await response.json() as {sessionId?:string;cwd?:string}
 if(!result.sessionId||!UUID.test(result.sessionId))throw new Error('Invalid shared resume response')
 return {...owner,sessionId:result.sessionId,cwd:result.cwd}
}

/** Official public PID-registry reader/probe, without registering another CLI.
 * No process injection, credentials, argv inspection or external record writes. */
export async function observeExternalSessionWriters():Promise<Set<string> | undefined> {
 const {LocalRenameRegistry}=await import('../utils/sessionRename/registry.js')
 const registry=new LocalRenameRegistry({configDir:process.env.CLAUDE_CONFIG_DIR??join(homedir(),'.claude'),
  getSessionId:()=>'',getCwd:()=>process.cwd(),logError:()=>{},shouldRegister:()=>false})
 try {
  const records=await registry.listLive({rejectUnreadable:true})
  return new Set(records.filter(record=>record.pid!==process.pid&&record.sessionId).map(record=>record.sessionId!))
 } catch { return undefined }
}
export async function assertNoExternalSessionWriter(sessionId:string):Promise<void> {
 const live=await observeExternalSessionWriters()
 if(!live)throw new Error('Session process registry is unreadable; ownership is unknown')
 if(live.has(sessionId))
  throw new Error('Session has a live external executor; view history or explicitly fork, not takeover')
}

/** Enumerate private claims, not arbitrary historical sessions. Mismatched
 * configuration claims remain unknown rather than being treated as ended.
 * Existing identity/cwd/PID checks remain the authority for every returned owner. */
export async function listSharedSessionOwners(localInstanceId: string) {
  const dir = privateDirectory()
  if (!dir) return undefined
  let names: string[]
  try { names = readdirSync(dir) } catch { return undefined }
  const ids = names.flatMap(name => {
    const id = /^session-(.+)\.json$/.exec(name)?.[1]
    if (!id || !UUID.test(id)) return []
    const record = read('session', id)
    return record?.instanceId !== localInstanceId ? [id] : []
  })
  const owners = new Map<string,OwnerLookup>()
  // Bounded concurrency; do not probe all transcript history or serially wait
  // for every stale/unresponsive owner before showing the catalog.
  for (let index = 0; index < ids.length; index += 8) {
    await Promise.all(ids.slice(index,index+8).map(async id => {
      owners.set(id, await lookupSessionOwner(id, process.cwd(), localInstanceId))
    }))
  }
  return owners
}

/** Serialize supported CLI-first startup across terminals. Once launch/POST
 * begins, errors never fall back to an independent local query executor. */
export async function ensureWorkspaceService(cwd: string): Promise<SharedOwner> {
  const existing = await discoverWorkspace(cwd)
  if (existing) return existing
  const dir = privateDirectory()
  if (!dir) throw Error('Private shared service directory is unavailable; no local executor started')
  const key = sharedConfigKey()
  const unlock = await lock(join(dir, `launch-${key}`), {realpath:false, retries:{retries:80,minTimeout:50,maxTimeout:100}})
  try {
    const found = await discoverWorkspace(cwd)
    if (found) return found
    const record = read('service', key)
    if (record && await identityLive(record)) throw Error('Shared service is running but unreachable; no local executor started')
    const {spawn} = await import('node:child_process')
    const root = resolve(import.meta.dir, '../..')
    const log = openSync(join(dir, `launch-${key}.log`), constants.O_WRONLY | constants.O_APPEND | constants.O_CREAT | constants.O_NOFOLLOW, 0o600)
    let child: ReturnType<typeof spawn>
    try {
      child = spawn(process.execPath, ['--no-env-file', '--feature=TRANSCRIPT_CLASSIFIER', ...desktopNativeFeatureArgs287(),
        `--config=${join(root,'packaging/runtime.bunfig.toml')}`, '--preload', join(root,'preload.ts'),
        join(root,'src/server/serveLocalHost.ts')], {cwd, env:process.env, detached:true, stdio:['ignore',log,log]})
    } finally { closeSync(log) }
    let failure: Error | undefined
    child.once('error', error => { failure = error })
    child.unref()
    for (let attempt=0; attempt<100; attempt++) {
      const owner = await discoverWorkspace(cwd)
      if (owner) return owner
      if (failure || child.exitCode !== null || child.signalCode !== null) break
      await new Promise(resolve => setTimeout(resolve,50))
    }
    // Terminate only the exact process launched above, never a registry PID.
    child.kill()
    throw Error('Shared service startup failed; no local executor started')
  } finally { await unlock() }
}
