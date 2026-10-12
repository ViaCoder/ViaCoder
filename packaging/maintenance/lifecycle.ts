import { existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, readdirSync, realpathSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { homedir } from 'node:os'
import { isAbsolute, join, relative, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { hostTarget } from '../platform.js'
import { hash, MANIFEST, verifySource } from '../source.js'
import type { InstallLifecycle } from '../installer.js'

export const ACTIVITY_ENDPOINT = '/v1/maintenance/activity'
export const ACTIVITY_MAX_AGE_MS = 2_000
export type ActivityReport = {
  schema: 1
  observedAt: number
  complete: true
  coverage: Array<'cli-active-turns' | 'serve-snapshots'>
  status: 'clear' | 'busy' | 'unknown'
  executors: Array<{ source: 'cli' | 'serve'; pid: number; pidStart: string; sessionId: string; ownerId: string;
    ownerPublished: true; state: 'active' | 'idle' | 'unknown' }>
}
export type LifecycleIO = {
  fetch(url: string, init?: RequestInit): Promise<Response>
  command(args: string[]): void
  home: string
  platform: string
  target: string
  processUses(path: string): Promise<boolean | 'unknown'>
  now(): number
  wait(ms: number): Promise<void>
  /** Offline seam; production loads this capture from the verified candidate. */
  captureActivity?(candidate: string, observedAt: number): Promise<unknown>
}
type ServiceOwner = { serverUrl: string; authToken: string; authMode: 'token' | 'none' }
type ServiceIdentity = { instanceId: string; configKey: string }

function systemIO(): LifecycleIO {
  return {
    fetch: (url, init) => fetch(url, init),
    command(args) {
      const env: Record<string, string> = { PATH: process.env.PATH ?? '/usr/bin:/bin', HOME: process.env.HOME ?? homedir() }
      for (const key of ['XDG_RUNTIME_DIR', 'DBUS_SESSION_BUS_ADDRESS', 'SYSTEMD_BUS_ADDRESS'])
        if (process.env[key] !== undefined) env[key] = process.env[key]!
      const result = Bun.spawnSync(args, { stdin: 'ignore', stdout: 'pipe', stderr: 'pipe', timeout: 15_000,
        env })
      if (result.exitCode !== 0) throw Error(`Lifecycle command failed: ${args[0]} ${args[1] ?? ''}`.trim())
    },
    home: process.env.HOME ?? homedir(), platform: process.platform, target: hostTarget(),
    async processUses(path) {
      if (process.platform !== 'linux') return 'unknown'
      const proc = '/proc'
      let names: string[]
      try { names = readdirSync(proc) } catch { return 'unknown' }
      for (const name of names) {
        if (!/^[1-9]\d*$/.test(name)) continue
        const base = join(proc, name)
        try {
          const status = readFileSync(join(base, 'status'), 'utf8')
          const uid = /^Uid:\s+(\d+)/m.exec(status)?.[1]
          if (uid !== String(process.getuid?.())) continue
          const args = readFileSync(join(base, 'cmdline'))
          if (args.toString().split('\0').some(arg => arg === path || arg.startsWith(`${path}${sep}`))) return true
        } catch (error) {
          const code = (error as NodeJS.ErrnoException).code
          if (code !== 'ENOENT' && code !== 'ESRCH' && code !== 'EACCES') return 'unknown'
          if (code === 'EACCES') return 'unknown'
        }
      }
      return false
    },
    now: Date.now,
    wait: ms => new Promise(resolve => setTimeout(resolve, ms)),
    async captureActivity(candidate, observedAt) {
      const modulePath = join(candidate, 'src/server/serveMaintenanceActivity.ts')
      if (!existsSync(modulePath)) return undefined
      const loaded = await import(pathToFileURL(modulePath).href) as {
        captureServeMaintenanceActivity?: (context: { candidate: string; observedAt: number }) => Promise<unknown>
      }
      if (typeof loaded.captureServeMaintenanceActivity !== 'function')
        return undefined
      return loaded.captureServeMaintenanceActivity({ candidate, observedAt })
    },
  }
}

function validActivity(value: unknown, now: number): ActivityReport {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Activity endpoint returned an invalid report; deployment is held')
  const report = value as Partial<ActivityReport>
  if (report.schema !== 1 || !Number.isSafeInteger(report.observedAt) ||
      (report.observedAt as number) > now + 250 || now - (report.observedAt as number) > ACTIVITY_MAX_AGE_MS ||
      report.complete !== true ||
      !Array.isArray(report.coverage) || !report.coverage.includes('cli-active-turns') ||
      !report.coverage.includes('serve-snapshots') || !['clear', 'busy', 'unknown'].includes(report.status ?? '') ||
      !Array.isArray(report.executors)) throw Error('Activity endpoint is stale or does not cover CLI and serve sessions; deployment is held')
  if (report.executors.some(item => !item || !['cli', 'serve'].includes(item.source) ||
      !Number.isSafeInteger(item.pid) || item.pid <= 1 || typeof item.pidStart !== 'string' || !item.pidStart ||
      typeof item.sessionId !== 'string' || !item.sessionId || typeof item.ownerId !== 'string' || !item.ownerId ||
      item.ownerPublished !== true || !['active', 'idle', 'unknown'].includes(item.state)))
    throw Error('Activity endpoint returned malformed executor state; deployment is held')
  return report as ActivityReport
}

function requireIdleActivity(value: unknown, now: number): ActivityReport {
  const report = validActivity(value, now)
  if (report.status !== 'clear' || report.executors.some(item => item.state !== 'idle'))
    throw Error('Active or unknown CLI/serve work found; deployment is held')
  return report
}

export async function requireFreshIdleActivity(fetcher: LifecycleIO['fetch'], owner: { serverUrl: string; authToken: string; authMode: 'token' | 'none' }, now = Date.now()): Promise<ActivityReport> {
  let response: Response
  try {
    response = await fetcher(new URL(ACTIVITY_ENDPOINT, owner.serverUrl).toString(), {
      headers: owner.authMode === 'token' ? { authorization: `Bearer ${owner.authToken}` } : {},
      cache: 'no-store', signal: AbortSignal.timeout(1_500),
    })
  } catch { throw Error('Fresh activity endpoint is unreachable; deployment is held') }
  if (!response.ok) throw Error(`Fresh activity endpoint unavailable (HTTP ${response.status}); deployment is held`)
  return requireIdleActivity(await response.json(), now)
}

async function readOnlyJson(io: LifecycleIO, owner: ServiceOwner, path: string): Promise<unknown> {
  let response: Response
  try {
    response = await io.fetch(new URL(path, owner.serverUrl).toString(), {
      headers: owner.authMode === 'token' ? { authorization: `Bearer ${owner.authToken}` } : {},
      cache: 'no-store', signal: AbortSignal.timeout(1_500),
    })
  } catch { throw Error(`Read-only service verification failed for ${path}`) }
  if (!response.ok) throw Error(`Read-only service verification failed for ${path} (HTTP ${response.status})`)
  try { return await response.json() } catch { throw Error(`Read-only service verification returned invalid JSON for ${path}`) }
}

function parseServiceIdentity(value: unknown): ServiceIdentity {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Discovered service identity is malformed')
  const data = value as Record<string, unknown>
  if (typeof data.instanceId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.instanceId) ||
      typeof data.configKey !== 'string' || !/^[a-f0-9]{64}$/.test(data.configKey))
    throw Error('Discovered service identity is malformed')
  return { instanceId: data.instanceId, configKey: data.configKey }
}

async function verifyRestartedOwner(prefix: string, previousIdentity: ServiceIdentity | undefined, io: LifecycleIO,
  discover: (cwd: string) => Promise<ServiceOwner | null>, onIdentity: (identity: ServiceIdentity) => void): Promise<void> {
  const owner = await discover(prefix)
  if (!owner) throw Error('Restarted cc-serve owner is not discoverable; deployment is held')
  const identity = parseServiceIdentity(await readOnlyJson(io, owner, '/v1/identity'))
  if (previousIdentity && (identity.configKey !== previousIdentity.configKey || identity.instanceId === previousIdentity.instanceId))
    throw Error('Restarted cc-serve identity did not confirm a new owner for the same configuration')
  onIdentity(identity)

  const catalog = await readOnlyJson(io, owner, '/v1/sessions')
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog) || !Array.isArray((catalog as Record<string, unknown>).sessions))
    throw Error('Restarted cc-serve returned an invalid read-only sessions catalog')
  const sessions = (catalog as { sessions: unknown[] }).sessions
  for (const item of sessions) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) throw Error('Restarted cc-serve returned a malformed session snapshot')
    const snapshot = item as Record<string, unknown>
    if (typeof snapshot.sessionId !== 'string' || !/^[0-9a-f-]{36}$/i.test(snapshot.sessionId) ||
        typeof snapshot.closed !== 'boolean' ||
        !(snapshot.activeOperationId === null || typeof snapshot.activeOperationId === 'string') ||
        !Array.isArray(snapshot.queuedOperationIds) || snapshot.queuedOperationIds.some(id => typeof id !== 'string') ||
        !snapshot.executorState || typeof snapshot.executorState !== 'object' || Array.isArray(snapshot.executorState) ||
        typeof (snapshot.executorState as Record<string, unknown>).status !== 'string')
      throw Error('Restarted cc-serve returned a malformed session snapshot')
  }

  // One bounded history page proves the discovered service can serve its
  // read-only history route. Message bodies are neither inspected nor logged.
  const first = sessions[0] as Record<string, unknown> | undefined
  if (!first) return
  const history = await readOnlyJson(io, owner,
    `/v1/sessions/${encodeURIComponent(first.sessionId as string)}/history?limit=1`)
  if (!history || typeof history !== 'object' || Array.isArray(history) || !Array.isArray((history as Record<string, unknown>).events))
    throw Error('Restarted cc-serve returned an invalid read-only history page')
  const events = (history as { events: unknown[] }).events
  if (events.length > 1 || events.some(event => !event || typeof event !== 'object' || Array.isArray(event) ||
      !Number.isSafeInteger((event as Record<string, unknown>).seq) ||
      typeof (event as Record<string, unknown>).at !== 'number' ||
      typeof (event as Record<string, unknown>).type !== 'string'))
    throw Error('Restarted cc-serve returned malformed read-only history entries')
}

function readReady(root: string, target: string): { version: string; target: string; manifestHash: string } {
  const manifest = verifySource(root, true)
  const ready = JSON.parse(readFileSync(join(root, '.cc-ready.json'), 'utf8')) as Record<string, unknown>
  const digest = hash(readFileSync(join(root, MANIFEST)))
  if (ready.format !== 1 || ready.manifestHash !== digest || ready.target !== target || ready.bun !== Bun.version)
    throw Error('Installed release ready manifest mismatch')
  if (typeof ready.target !== 'string' || manifest.version !== JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version)
    throw Error('Installed release version manifest mismatch')
  return { version: manifest.version, target: ready.target, manifestHash: digest }
}

function ensureUnit(source: string, io: LifecycleIO): void {
  const unitDir = join(io.home, '.config/systemd/user')
  mkdirSync(unitDir, { recursive: true, mode: 0o700 })
  for (const path of [io.home, join(io.home, '.config'), join(io.home, '.config/systemd'), unitDir]) {
    const stat = lstatSync(path)
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw Error(`Refusing unsafe user service directory: ${path}`)
  }
  const target = join(unitDir, 'cc-serve.service')
  const expected = readFileSync(source, 'utf8')
  let exists = false
  try { lstatSync(target); exists = true } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
  if (exists) {
    const stat = lstatSync(target)
    if (!stat.isFile() || stat.isSymbolicLink() || readFileSync(target, 'utf8') !== expected)
      throw Error('Existing user cc-serve.service differs from the packaged unit; manual review required')
    return
  }
  const temp = `${target}.next-${randomUUID()}`
  try { writeFileSync(temp, expected, { flag: 'wx', mode: 0o600 }); renameSync(temp, target) }
  finally { if (existsSync(temp)) rmSync(temp, { force: true }) }
}

export async function activateAndVerifyService(prefix: string, release: string, unitSource: string, io: LifecycleIO,
  attempts = 30, onActivationStart?: () => void): Promise<void> {
  if (io.platform !== 'linux') throw Error('Remote cc-serve lifecycle is supported only on Linux systemd user sessions')
  const verified = readReady(release, io.target)
  ensureUnit(unitSource, io)
  onActivationStart?.()
  io.command(['systemctl', '--user', 'daemon-reload'])
  io.command(['systemctl', '--user', 'enable', 'cc-serve.service'])
  io.command(['systemctl', '--user', 'restart', 'cc-serve.service'])
  const healthUrl = 'http://127.0.0.1:8765/health'
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      io.command(['systemctl', '--user', 'is-active', '--quiet', 'cc-serve.service'])
      const response = await io.fetch(healthUrl, { cache: 'no-store', signal: AbortSignal.timeout(1_000) })
      if (response.ok) {
        const body = await response.json() as Record<string, unknown>
        if (body.status === 'ok' && body.version === verified.version && body.manifestHash === verified.manifestHash) return
        throw Error('cc-serve ready response does not identify the verified release manifest')
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('does not identify')) throw error
    }
    await io.wait(250)
  }
  throw Error(`cc-serve.service did not become ready for ${verified.version}; endpoint ${healthUrl} never confirmed its manifest`)
}

const CLEANUP_LEGACY_VERSIONS = new Set(['2.1.183', '2.1.283'])

function safeLegacyRelease(prefix: string, path: string, pointers: Set<string>, target: string): string | undefined {
  const releases = realpathSync(join(prefix, 'releases'))
  const absolute = resolve(path)
  if (relative(releases, absolute).startsWith(`..${sep}`) || relative(releases, absolute) === '..' || isAbsolute(relative(releases, absolute))) return
  const releaseName = absolute.slice(releases.length + 1)
  if (releaseName.includes(sep) || ![...CLEANUP_LEGACY_VERSIONS].some(version => releaseName.startsWith(`${version}-`))) return
  let cursor = prefix
  for (const part of relative(prefix, absolute).split(sep)) {
    cursor = join(cursor, part)
    const stat = lstatSync(cursor)
    if (stat.isSymbolicLink()) return
  }
  if (!statSync(absolute).isDirectory() || pointers.has(realpathSync(absolute))) return
  const manifest = verifySource(absolute, true)
  if (!CLEANUP_LEGACY_VERSIONS.has(manifest.version) || !releaseName.startsWith(`${manifest.version}-`)) return
  const readyPath = join(absolute, '.cc-ready.json'), readyStat = lstatSync(readyPath)
  if (!readyStat.isFile() || readyStat.isSymbolicLink()) return
  const modules = join(absolute, 'node_modules')
  const modulesStat = lstatSync(modules)
  if (!modulesStat.isDirectory() || modulesStat.isSymbolicLink()) return
  const ready = JSON.parse(readFileSync(readyPath, 'utf8')) as Record<string, unknown>
  if (ready.format !== 1 || ready.manifestHash !== hash(readFileSync(join(absolute, MANIFEST))) ||
      ready.target !== target || ready.bun !== Bun.version) return
  return absolute
}

// Keep the exported name for existing installer callers; cleanup remains
// intentionally limited to the two explicitly retired release lines above.
export async function cleanupVerified283(prefix: string, io: LifecycleIO): Promise<{ removed: string[]; manual: string[] }> {
  const root = realpathSync(prefix), releaseRoot = join(root, 'releases')
  if (!existsSync(releaseRoot)) return { removed: [], manual: [] }
  const releaseRootStat = lstatSync(releaseRoot)
  if (!releaseRootStat.isDirectory() || releaseRootStat.isSymbolicLink()) return { removed: [], manual: [] }
  const pointers = new Set<string>()
  for (const name of ['current', 'previous']) {
    const link = join(root, name)
    if (!existsSync(link) && !(() => { try { lstatSync(link); return true } catch { return false } })()) continue
    try {
      const target = process.platform === 'win32' ? readFileSync(link, 'utf8').trim() : readlinkSync(link)
      const path = resolve(root, target)
      pointers.add(realpathSync(path))
    } catch { return { removed: [], manual: ['current/previous pointer cannot be proven safe'] } }
  }
  const removed: string[] = [], manual: string[] = []
  for (const name of readdirSync(releaseRoot)) {
    if (![...CLEANUP_LEGACY_VERSIONS].some(version => name.startsWith(`${version}-`))) continue
    const path = join(releaseRoot, name)
    try {
      if (pointers.has(realpathSync(path))) { manual.push(`${name}: current/previous rollback target; retained`); continue }
      const eligible = safeLegacyRelease(root, path, pointers, io.target)
      if (!eligible) { manual.push(`${name}: ownership, manifest, or pointer safety was not proven`); continue }
      const occupied = await io.processUses(eligible)
      if (occupied !== false) { manual.push(`${name}: process occupancy is ${occupied === true ? 'active' : 'unknown'}`); continue }
      rmSync(eligible, { recursive: true, force: false })
      removed.push(name)
    } catch { manual.push(`${name}: verification failed; operator review required`) }
  }
  return { removed, manual }
}

export function createRemoteLifecycle(options: { unitSource: string; io?: LifecycleIO;
  discover?: (cwd: string) => Promise<{ serverUrl: string; authToken: string; authMode: 'token' | 'none' } | null>;
  onManualCleanup?: (items: string[]) => void } ): InstallLifecycle {
  const io = options.io ?? systemIO()
  // Source artifacts have no dependencies until installSource verifies the
  // candidate. Load discovery from that verified runtime, not this bootstrap.
  let discoveryRoot: string
  const discover = options.discover ?? (async (cwd: string) => {
    const { discoverWorkspace } = await import(pathToFileURL(join(discoveryRoot, 'src/server/serveDiscovery.ts')).href)
    return discoverWorkspace(cwd)
  })
  let serviceTouched = false
  let priorIdentity: ServiceIdentity | undefined
  let latestOwnerIdentity: ServiceIdentity | undefined
  return {
    async beforePromote({ prefix, candidate }) {
      if (io.platform !== 'linux') throw Error('Remote lifecycle requires a Linux systemd user service')
      discoveryRoot = candidate
      priorIdentity = undefined
      const observedAt = io.now()
      const captured = await io.captureActivity?.(candidate, observedAt)
      if (captured !== undefined) {
        // The candidate is already integrity-verified and final-location
        // verified under .install-lock. Its local read-only capture avoids
        // depending on an older deployed service having the new API route.
        requireIdleActivity(captured, io.now())
        const existingOwner = await discover(prefix)
        if (existingOwner) priorIdentity = parseServiceIdentity(await readOnlyJson(io, existingOwner, '/v1/identity'))
        return
      }
      const owner = await discover(prefix)
      if (!owner) throw Error('No discoverable cc-serve activity endpoint; activity is unknown and deployment is held')
      priorIdentity = parseServiceIdentity(await readOnlyJson(io, owner, '/v1/identity'))
      await requireFreshIdleActivity(io.fetch, owner, io.now())
    },
    async afterPromote({ prefix, release }) {
      await activateAndVerifyService(prefix, release, options.unitSource, io, 30, () => { serviceTouched = true })
      await verifyRestartedOwner(prefix, priorIdentity, io, discover, identity => { latestOwnerIdentity = identity })
      const result = await cleanupVerified283(prefix, io)
      if (result.manual.length) options.onManualCleanup?.(result.manual)
    },
    async afterPromotionFailure({ prefix, previous }) {
      if (!serviceTouched) return
      if (previous) await activateAndVerifyService(prefix, join(prefix, previous), options.unitSource, io)
      else {
        io.command(['systemctl', '--user', 'disable', '--now', 'cc-serve.service'])
        return
      }
      const baseline = latestOwnerIdentity ?? priorIdentity
      if (baseline) await verifyRestartedOwner(prefix, baseline, io, discover, identity => { latestOwnerIdentity = identity })
    },
  }
}
