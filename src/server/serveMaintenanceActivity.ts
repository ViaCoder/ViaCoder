import { homedir } from 'node:os'
import { join } from 'node:path'
import { existsSync, readFileSync, readdirSync, readlinkSync, realpathSync, statSync } from 'node:fs'
import { LocalRenameRegistry, createProcessProbe } from '../utils/sessionRename/registry.js'
import { listSharedSessionOwners, type OwnerLookup } from './serveDiscovery.js'
import type { ServeSnapshot } from './serveSession.js'
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path'

export type MaintenanceExecutor = {
  source: 'cli' | 'serve'
  pid: number
  pidStart: string
  sessionId: string
  ownerId: string
  ownerPublished: true
  state: 'active' | 'idle' | 'unknown'
}
export type MaintenanceActivity = {
  schema: 1
  observedAt: number
  complete: boolean
  coverage: Array<'cli-active-turns' | 'serve-snapshots'>
  status: 'clear' | 'busy' | 'unknown'
  executors: MaintenanceExecutor[]
}

/**
 * A snapshot is paired with the OS identity of the process that published it.
 * The caller (the serving hub) supplies these values; this module never asks
 * an old deployed service for a route which it may not implement.
 */
export type PublishedSnapshot = {
  snapshot: ServeSnapshot
  pid: number
  pidStart: string
  ownerId: string
  ownerPublished: boolean
}
export type CaptureMaintenanceActivityOptions = {
  snapshots: PublishedSnapshot[]
  /** Timestamp captured with the caller's hub snapshots; never refreshed by this observer. */
  snapshotsObservedAt: number
  configDir?: string
  localInstanceId?: string
  now?: () => number
  /** Test seams. Production uses Linux /proc and a fresh existing process probe. */
  platform?: NodeJS.Platform
  procRoot?: string
  uid?: number
  candidateRoot?: string
  managedRoot?: string
  processStart?: (pid: number) => Promise<string | undefined>
  /** Same-config shared owners; unknown/unreachable results are conservatively held. */
  sharedOwners?: () => Promise<Map<string, OwnerLookup> | undefined>
  /** Registry seam keeps tests on a temporary fake HOME/config tree. */
  liveRegistry?: () => Promise<Array<{pid:number; sessionId?:string; procStart?:string}>>
}

const COVERAGE = ['cli-active-turns', 'serve-snapshots'] as const
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
type NativeCliProcess = { pid: number; parentPid: number; startTicks: string; pidStart: string }
type NativeCoverage = { complete: boolean; processes: NativeCliProcess[] }

function procErrorCode(error: unknown): string | undefined {
  return (error as NodeJS.ErrnoException | undefined)?.code
}
function procIdentity(statText: string): { startTicks: string; state: string; parentPid: number } | undefined {
  // comm (field 2) can contain spaces and parentheses: parse after its final ')'.
  const end = statText.lastIndexOf(')')
  if (end < 0) return
  const fields = statText.slice(end + 1).trim().split(/\s+/) // begins at field 3
  const startTicks = fields[19] // field 22
  const state = fields[0]
  const parentPid = Number(fields[1]) // field 4
  return /^\d+$/.test(startTicks ?? '') && Number.isSafeInteger(parentPid) && parentPid >= 0 && typeof state === 'string'
    ? { startTicks: startTicks!, state, parentPid } : undefined
}
function verifiedAncestorRelation(procRoot: string, uid: number, child: NativeCliProcess, ancestorPid: number): boolean | undefined {
  if (child.pid === ancestorPid) return true
  try {
    const status = readFileSync(join(procRoot, String(child.pid), 'status'), 'utf8')
    const uidMatch = /^Uid:\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/m.exec(status)
    const before = procIdentity(readFileSync(join(procRoot, String(child.pid), 'stat'), 'utf8'))
    const after = procIdentity(readFileSync(join(procRoot, String(child.pid), 'stat'), 'utf8'))
    if (!uidMatch || Number(uidMatch[1]) !== uid || !before || !after ||
        before.startTicks !== child.startTicks || before.parentPid !== child.parentPid ||
        before.startTicks !== after.startTicks || before.parentPid !== after.parentPid) return undefined
  } catch { return undefined }
  let expectedPid = child.parentPid
  const seen = new Set<number>([child.pid])
  for (let depth = 0; depth < 64 && expectedPid > 1; depth++) {
    if (seen.has(expectedPid)) return undefined
    seen.add(expectedPid)
    const directory = join(procRoot, String(expectedPid))
    try {
      const status = readFileSync(join(directory, 'status'), 'utf8')
      const uidMatch = /^Uid:\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/m.exec(status)
      const before = procIdentity(readFileSync(join(directory, 'stat'), 'utf8'))
      const after = procIdentity(readFileSync(join(directory, 'stat'), 'utf8'))
      if (!uidMatch || Number(uidMatch[1]) !== uid || !before || !after ||
          before.state === 'Z' || before.state === 'X' || before.startTicks !== after.startTicks ||
          before.parentPid !== after.parentPid) return undefined
      if (expectedPid === ancestorPid) return true
      expectedPid = before.parentPid
    } catch { return undefined }
  }
  return expectedPid <= 1 ? false : undefined
}
function inside(root: string | undefined, candidate: string): boolean {
  if (!root || !candidate.startsWith('/')) return false
  const rel = relative(root, resolve(candidate))
  return rel === '' || rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel)
}
function isRecognizedCliScript(arg: string, roots: Array<string | undefined>, cwd?: string): boolean {
  const normalized = (isAbsolute(arg) ? arg : cwd ? resolve(cwd, arg) : arg).replaceAll('\\', '/')
  if (normalized.endsWith('/node_modules/@anthropic-ai/claude-code/cli.js')) return true
  return roots.some(root => inside(root, normalized) && (
    normalized.endsWith('/src/entrypoints/cli.tsx') || normalized.endsWith('/bin/cclaude') || normalized.endsWith('/bin/cc')))
}
function officialVersionExecutable(executable: string): boolean {
  const normalized = executable.replaceAll('\\', '/').replace(/ \(deleted\)$/, '')
  return /(?:^|\/)\.local\/share\/claude\/versions\/\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?$/.test(normalized)
}
function nativeCliExecutable(executable: string): boolean {
  const base = executable.slice(executable.lastIndexOf('/') + 1).replace(/ \(deleted\)$/, '')
  return base === 'claude' || base === 'cclaude' || officialVersionExecutable(executable)
}
function invocationScript(executable: string, argv: string[]): { script?: string; ambiguous: boolean } {
  const name = executable.slice(executable.lastIndexOf('/') + 1).replace(/ \(deleted\)$/, '')
  const bun = name === 'bun' || name === 'bunx'
  const node = name === 'node' || name === 'nodejs'
  const shell = name === 'bash' || name === 'sh' || name === 'dash'
  if (!bun && !node && !shell) return { ambiguous: false }
  // argv[0] is the executable. Only inspect the interpreter's script slot,
  // skipping known option/value pairs; later CLI arguments and prompt text are
  // never candidates for entrypoint matching.
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i]!
    if (arg === '--') return { script: argv[i + 1], ambiguous: !argv[i + 1] }
    if (arg === '-e' || arg === '--eval' || arg === '-p' || arg === '--print' || arg === '-c')
      return { ambiguous: true }
    const valued = bun
      ? ['--preload', '--config', '--define', '--cwd', '--inspect', '--inspect-brk', '--inspect-port', '--conditions']
      : node
        ? ['-r', '--require', '--import', '--loader', '--experimental-loader', '--conditions', '--inspect', '--inspect-brk', '--inspect-port', '--title', '--env-file']
        : []
    if (valued.includes(arg)) { if (!argv[i + 1]) return { ambiguous: true }; i++; continue }
    if (arg.startsWith('--') && arg.includes('=')) continue
    const valueless = bun
      ? ['--no-env-file', '--hot', '--watch', '--smol', '--prefer-offline', '--prefer-latest', '--prefer-frozen-lockfile', '--no-clear-screen', '--silent']
      : node
        ? ['--watch', '--test', '--experimental-strip-types', '--enable-source-maps', '--no-warnings', '--trace-warnings', '--trace-uncaught']
        : []
    if (valueless.includes(arg)) continue
    if (arg.startsWith('-')) return { ambiguous: true }
    return { script: arg, ambiguous: false }
  }
  return { ambiguous: true }
}
function classifyCliInvocation(executable: string, argv: string[], roots: Array<string | undefined>, cwd?: string): { cli: boolean; ambiguous: boolean } {
  if (nativeCliExecutable(executable)) return { cli: true, ambiguous: false }
  const resolved = invocationScript(executable, argv)
  return { cli: typeof resolved.script === 'string' && isRecognizedCliScript(resolved.script, roots, cwd), ambiguous: resolved.ambiguous }
}
function potentialCliScript(script: string | undefined): boolean {
  return !!script && (script.endsWith('/src/entrypoints/cli.tsx') || script === 'src/entrypoints/cli.tsx' ||
    script.endsWith('/bin/cclaude') || script === 'bin/cclaude' || script.endsWith('/bin/cc') || script === 'bin/cc' ||
    script.endsWith('node_modules/@anthropic-ai/claude-code/cli.js'))
}

/** Linux same-UID process census. argv is read only for in-memory path matching and is never returned or logged. */
export async function enumerateLinuxCliProcesses(options: {
  procRoot?: string
  candidateRoot?: string
  managedRoot?: string
  knownPids?: ReadonlySet<number>
  uid?: number
  processStart?: (pid: number) => Promise<string | undefined>
} = {}): Promise<NativeCoverage> {
  const root = options.procRoot ?? '/proc'
  const uid = options.uid ?? process.getuid?.()
  if (uid === undefined) return { complete: false, processes: [] }
  let entries: string[]
  let bootId: string
  try {
    entries = readdirSync(root)
    bootId = readFileSync(join(root, 'sys/kernel/random/boot_id'), 'utf8').trim()
    if (!bootId) return { complete: false, processes: [] }
  } catch { return { complete: false, processes: [] } }
  const startProbe = options.processStart ?? (pid => createProcessProbe().start(pid))
  const processes: NativeCliProcess[] = []
  let complete = true
  for (const name of entries) {
    if (!/^[1-9]\d*$/.test(name)) continue
    const pid = Number(name)
    if (!Number.isSafeInteger(pid) || String(pid) !== name) { complete = false; continue }
    const base = join(root, name)
    let status: string, statBeforeText: string
    try {
      status = readFileSync(join(base, 'status'), 'utf8')
      statBeforeText = readFileSync(join(base, 'stat'), 'utf8')
    } catch (error) {
      const code = procErrorCode(error)
      if (code !== 'ENOENT' && code !== 'ESRCH') complete = false
      continue
    }
    const uidMatch = /^Uid:\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/m.exec(status)
    if (!uidMatch) { complete = false; continue }
    if (Number(uidMatch[1]) !== uid) continue
    const before = procIdentity(statBeforeText)
    if (!before) { complete = false; continue }
    if (before.state === 'Z' || before.state === 'X') continue
    let executable: string
    try { executable = readlinkSync(join(base, 'exe')).replace(/ \(deleted\)$/, '') }
    catch (error) {
      const code = procErrorCode(error)
      if (options.knownPids?.has(pid) && code !== 'ENOENT' && code !== 'ESRCH') complete = false
      continue
    }
    let argv: string[]
    try {
      const bytes = readFileSync(join(base, 'cmdline'))
      argv = bytes.toString('utf8').split('\0').filter(Boolean)
    } catch (error) {
      const code = procErrorCode(error)
      if (code === 'ENOENT' || code === 'ESRCH') continue
      if (nativeCliExecutable(executable)) argv = []
      else if (options.knownPids?.has(pid)) { complete = false; continue }
      else continue
    }
    const scriptSlot = invocationScript(executable, argv).script
    let cwd: string | undefined
    if (potentialCliScript(scriptSlot) && !isAbsolute(scriptSlot!)) {
      try { cwd = readlinkSync(join(base, 'cwd')).replace(/ \(deleted\)$/, '') }
      catch { if (options.knownPids?.has(pid)) { complete = false; continue } }
    }
    const classification = classifyCliInvocation(executable, argv, [options.candidateRoot, options.managedRoot], cwd)
    if (classification.ambiguous && options.knownPids?.has(pid)) {
      complete = false
      continue
    }
    if (classification.ambiguous) continue
    if (!classification.cli) continue

    // Compare native kernel start ticks around inspection, then obtain the
    // repository's process identity representation (ps lstart) for registry joins.
    let statAfterText: string
    try { statAfterText = readFileSync(join(base, 'stat'), 'utf8') }
    catch { complete = false; continue }
    const after = procIdentity(statAfterText)
    if (!after || after.startTicks !== before.startTicks || after.parentPid !== before.parentPid) { complete = false; continue }
    let pidStart: string | undefined
    try { pidStart = await startProbe(pid) } catch { pidStart = undefined }
    if (!pidStart) { complete = false; continue }
    processes.push({ pid, parentPid: before.parentPid, startTicks: before.startTicks, pidStart })
  }
  return { complete, processes }
}

function makeRegistry(configDir: string) {
  return new LocalRenameRegistry({ configDir, getSessionId: () => '', getCwd: () => process.cwd(),
    logError: () => {}, shouldRegister: () => false, probe: createProcessProbe() })
}
function managedReleaseRoot(root: string): string {
  const parent = dirname(root)
  return basename(parent) === 'releases' ? parent : root
}
function observerInstallRoot(): string | undefined {
  try {
    const root = realpathSync(resolve(import.meta.dir, '../..'))
    return statSync(root).isDirectory() ? root : undefined
  } catch { return undefined }
}
async function listExistingSharedOwners(localInstanceId: string): Promise<Map<string, OwnerLookup> | undefined> {
  // The discovery helper initializes a missing private directory. Observation
  // must stay read-only, so an absent path is an empty private-owner catalog.
  const ownerDirectory = join(homedir(), '.cache/cc/serve-runtime')
  if (!existsSync(ownerDirectory)) return new Map()
  return listSharedSessionOwners(localInstanceId)
}

function snapshotState(snapshot: ServeSnapshot): 'active' | 'idle' | 'unknown' {
  if (snapshot.closed !== false) return 'unknown'
  if (snapshot.activeOperationId !== null || snapshot.queuedOperationIds.length !== 0 ||
      snapshot.pendingApprovalIds.length !== 0 || snapshot.pendingElicitationIds.length !== 0 ||
      snapshot.executorState?.status === 'starting' || snapshot.executorState?.status === 'external-live') return 'active'
  if (!snapshot.executorState || snapshot.executorState.status !== 'ready' ||
      snapshot.executorState.canControl !== true || snapshot.activeOperationId !== null ||
      snapshot.queuedOperationIds.length !== 0 || snapshot.pendingApprovalIds.length !== 0 ||
      snapshot.pendingElicitationIds.length !== 0) return 'unknown'
  return 'idle'
}
function isConfirmedClosedSnapshot(snapshot: ServeSnapshot): boolean {
  return snapshot.closed === true && snapshot.executorState?.status === 'closed' &&
    snapshot.executorState.canControl === false && snapshot.activeOperationId === null &&
    snapshot.queuedOperationIds.length === 0 && snapshot.pendingApprovalIds.length === 0 &&
    snapshot.pendingElicitationIds.length === 0
}

/** Read-only release gate observation. Unknown evidence is never converted to idle. */
export async function captureMaintenanceActivity(
  options: CaptureMaintenanceActivityOptions,
): Promise<MaintenanceActivity> {
  const now = options.now ?? Date.now
  const start = options.processStart ?? (pid => createProcessProbe().start(pid))
  const registry = options.liveRegistry ?? (async () => {
    const instance = makeRegistry(options.configDir ?? process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude'))
    return instance.listLive({ rejectUnreadable: true })
  })
  let completeRegistry = true
  let live: Array<{pid:number; sessionId?:string; procStart?:string}> = []
  try { live = await registry() } catch { completeRegistry = false }

  let owners: Map<string, OwnerLookup> | undefined
  try { owners = await (options.sharedOwners ?? (() => listExistingSharedOwners(options.localInstanceId ?? '')) )() }
  catch { owners = undefined }

  const linux = (options.platform ?? process.platform) === 'linux'
  const inferredRoot = !options.candidateRoot || !options.managedRoot ? observerInstallRoot() : undefined
  const candidateRoot = options.candidateRoot ?? inferredRoot
  const managedRoot = options.managedRoot ?? (candidateRoot ? managedReleaseRoot(candidateRoot) : undefined)
  const rootsKnown = !!candidateRoot && !!managedRoot
  const knownPids = new Set<number>([
    ...live.map(item => item.pid), ...options.snapshots.map(item => item.pid),
    ...(owners ? [...owners.values()].flatMap(value => value.kind === 'active' && value.owner.pid ? [value.owner.pid] : []) : []),
  ])
  const nativeCoverage = linux ? await enumerateLinuxCliProcesses({ procRoot: options.procRoot,
    uid: options.uid, candidateRoot, managedRoot,
    knownPids, processStart: options.processStart }) : { complete: false, processes: [] }

  const executors: MaintenanceExecutor[] = []
  const snapshotBySession = new Map(options.snapshots.filter(item => item.snapshot.closed !== true)
    .map(item => [item.snapshot.sessionId, item]))
  let completeNativeCoverage = linux && nativeCoverage.complete && rootsKnown
  let unknownEvidence = !completeRegistry || !owners || !completeNativeCoverage
  const nativeByPid = new Map(nativeCoverage.processes.map(item => [item.pid, item]))
  const registryByPid = new Map(live.map(item => [item.pid, item]))
  const publishedRootPids = new Set<number>()
  for (const item of options.snapshots) {
    const s = item.snapshot
    if (!item.ownerPublished || !item.ownerId || !item.pidStart || !Number.isSafeInteger(item.pid) || item.pid <= 1 ||
        s.identity?.ownerId !== item.ownerId || s.identity.sessionId !== s.sessionId) continue
    const freshRoot = await start(item.pid).catch(() => undefined)
    if (freshRoot && freshRoot === item.pidStart) publishedRootPids.add(item.pid)
  }

  // Every same-UID process whose real executable/entrypoint identifies the
  // CLI must have a fresh matching registry row. Unregistered or mismatched
  // candidates hold unknown instead of being silently ignored.
  for (const candidate of nativeCoverage.processes) {
    const row = registryByPid.get(candidate.pid)
    const publishedRoot = publishedRootPids.has(candidate.pid) &&
      options.snapshots.some(item => item.pid === candidate.pid && item.pidStart === candidate.pidStart)
    if (publishedRoot) continue
    if (!row || !row.procStart || row.procStart !== candidate.pidStart) {
      completeNativeCoverage = false
      unknownEvidence = true
    }
  }

  // A live registry row is not an idle claim by itself. Its process identity,
  // matching current published snapshot, owner identity, and fully-idle state
  // all have to agree before reporting idle.
  for (const row of live) {
    const native = nativeByPid.get(row.pid)
    if (!native || native.pidStart !== row.procStart) {
      completeNativeCoverage = false
      unknownEvidence = true
      continue
    }
    const pidStart = await start(row.pid).catch(() => undefined)
    const paired = row.sessionId ? snapshotBySession.get(row.sessionId) : undefined
    const snapshot = paired?.snapshot
    const rootStart = paired ? await start(paired.pid).catch(() => undefined) : undefined
    const sameProcessOwner = !!paired && native.pid === paired.pid && native.pidStart === paired.pidStart
    const descendantOwner = !!paired && native.pid !== paired.pid &&
      verifiedAncestorRelation(options.procRoot ?? '/proc', options.uid ?? process.getuid?.() ?? -1, native, paired.pid) === true
    const exact = !!pidStart && !!row.procStart && pidStart === row.procStart && !!paired &&
      (sameProcessOwner || descendantOwner) && paired.pidStart === rootStart && paired.ownerPublished === true &&
      !!paired.ownerId && !!snapshot?.identity?.ownerId && snapshot.identity.ownerId === paired.ownerId &&
      snapshot.identity.sessionId === row.sessionId
    if (!exact || !uuid.test(row.sessionId ?? '')) { unknownEvidence = true; continue }
    const state = snapshotState(snapshot!)
    if (state !== 'idle') unknownEvidence = true
    executors.push({ source: 'cli', pid: row.pid, pidStart: pidStart!, sessionId: row.sessionId!,
      ownerId: paired!.ownerId, ownerPublished: true, state })
  }

  // Every current hub snapshot is represented, including starting, queued,
  // approval, elicitation, and externally-live states as non-idle evidence.
  for (const item of options.snapshots) {
    const s = item.snapshot
    if (s.closed === true) {
      if (!isConfirmedClosedSnapshot(s)) unknownEvidence = true
      continue
    }
    if (!uuid.test(s.sessionId) || !Number.isSafeInteger(item.pid) || item.pid <= 1 ||
        !item.pidStart || !item.ownerId || item.ownerPublished !== true ||
        !s.identity?.ownerId || s.identity.ownerId !== item.ownerId || s.identity.sessionId !== s.sessionId) {
      unknownEvidence = true
      continue
    }
    const fresh = await start(item.pid).catch(() => undefined)
    if (!fresh || fresh !== item.pidStart) {
      unknownEvidence = true
      executors.push({ source: 'serve', pid: item.pid, pidStart: fresh ?? item.pidStart,
        sessionId: s.sessionId, ownerId: item.ownerId, ownerPublished: true, state: 'unknown' })
      continue
    }
    const state = snapshotState(s)
    if (state !== 'idle') unknownEvidence = true
    executors.push({ source: 'serve', pid: item.pid, pidStart: fresh, sessionId: s.sessionId,
      ownerId: item.ownerId, ownerPublished: true, state })
  }

  // A private ownership claim which is live but absent from the supplied hub
  // snapshot set may be a different-config, unreachable, or stale owner. Hold.
  if (owners) for (const [sessionId, lookup] of owners) {
    const paired = snapshotBySession.get(sessionId)
    if (lookup.kind !== 'active' || !paired || !lookup.owner.ownerId ||
        lookup.owner.ownerId !== paired.ownerId || lookup.owner.pid !== paired.pid ||
        !lookup.owner.procStart || lookup.owner.procStart !== paired.pidStart) {
      unknownEvidence = true
      continue
    }
    const fresh = await start(lookup.owner.pid!).catch(() => undefined)
    if (!fresh || fresh !== lookup.owner.procStart) unknownEvidence = true
  }
  // Report the observation completion time, but independently retain and
  // validate the timestamp at which the caller sampled the hub snapshots.
  const observedAt = now()
  const snapshotAge = observedAt - options.snapshotsObservedAt
  const freshSnapshots = Number.isSafeInteger(options.snapshotsObservedAt) && snapshotAge >= -250 && snapshotAge <= 2_000
  if (!freshSnapshots) unknownEvidence = true
  const busy = executors.some(item => item.state === 'active')
  const status = busy ? 'busy' : unknownEvidence || executors.some(item => item.state === 'unknown') ? 'unknown' : 'clear'
  const complete = completeRegistry && owners !== undefined && completeNativeCoverage && freshSnapshots
  return { schema: 1, observedAt, complete, coverage: [...COVERAGE], status, executors }
}

/** Candidate-local entrypoint consumed by the release lifecycle before promotion.
 * It reads the existing registry and same-config published owners/snapshots;
 * it never calls a future maintenance endpoint on the currently installed service.
 */
export async function captureServeMaintenanceActivity(context: {
  candidate: string
  observedAt: number
}): Promise<MaintenanceActivity> {
  const fallbackAt = Number.isSafeInteger(context?.observedAt) ? context.observedAt : Date.now()
  const unknown = (): MaintenanceActivity => ({ schema: 1, observedAt: fallbackAt, complete: false,
    coverage: [...COVERAGE], status: 'unknown', executors: [] })
  let candidateRoot: string
  try {
    candidateRoot = realpathSync(context.candidate)
    const candidateStat = statSync(candidateRoot)
    const loadedRoot = realpathSync(resolve(import.meta.dir, '../..'))
    if (!candidateStat.isDirectory() || candidateRoot !== loadedRoot || !Number.isSafeInteger(context.observedAt)) return unknown()
  } catch { return unknown() }
  if (process.platform !== 'linux') return unknown()

  // observedAt was supplied by the lifecycle immediately before this read.
  // Keep it as the lower-bound sample time; a slow owner lookup becomes stale
  // and is held instead of receiving a refreshed timestamp.
  let owners: Map<string, OwnerLookup> | undefined
  try { owners = await listExistingSharedOwners('') } catch { owners = undefined }
  const snapshots: PublishedSnapshot[] = []
  if (owners) for (const [sessionId, lookup] of owners) {
    if (lookup.kind !== 'active') continue
    const owner = lookup.owner, snapshot = lookup.snapshot
    if (snapshot.sessionId !== sessionId || snapshot.identity?.sessionId !== sessionId ||
        !snapshot.identity.ownerId || snapshot.identity.ownerId !== owner.ownerId ||
        !Number.isSafeInteger(owner.pid) || owner.pid! <= 1 || !owner.procStart) continue
    snapshots.push({ snapshot, pid: owner.pid!, pidStart: owner.procStart, ownerId: owner.ownerId,
      ownerPublished: true })
  }
  const managedRoot = managedReleaseRoot(candidateRoot)
  return captureMaintenanceActivity({ snapshots, snapshotsObservedAt: context.observedAt,
    candidateRoot, managedRoot, localInstanceId: '', sharedOwners: async () => owners })
}
