/** Ordinary public yt/_t/mt + headless cm/qfe closure (official npm 2.1.283).
 * The private recordRename variant is deliberately absent. See parity doc.
 */
import { createSignal } from '../../utils/signal.js'
import {getSessionId} from '../../bootstrap/state.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getClaudeConfigHomeDir} from '../../utils/envUtils.js'
import {logError} from '../../utils/log.js'
import {getSessionRenameStorage} from '../../utils/sessionStorage.js'
import {getAgentId} from '../../utils/teammate.js'
import { cleanTitle, NameCoordinator, type NameDecision, type NameRegistry } from '../../utils/sessionRename/names.js'
import {RenameJobs} from '../../utils/sessionRename/jobs.js'
import type {LocalRenameRegistry} from '../../utils/sessionRename/registry.js'
import { saveRenameAgent, saveRenameTitle, type RenameTranscript } from '../../utils/sessionRename/transcript.js'
import {observeRenamePersistence} from './renameObservation.js'

export class RenameSessionError extends Error { readonly expected = true }
export type RenameSessionRequest = { title?: unknown; source?: unknown; session_id?: unknown }
export type SessionTitles = {
  titles: { attempted: boolean }
  storage: RenameTranscript
  pushHostRenameToBridge(name: string, sessionId: string): void
  applyRenamedSessionName(name: string): void
  /** Optional local Web observer; absent from official protocol hosts. */
  beginRenameObservation?(name: string): void
}
/** Returns no payload. The caller's existing dispatcher owns control_response. */
export function handleRenameSession(request: RenameSessionRequest, sessionTitles: SessionTitles | null): void | Promise<void> {
  if (sessionTitles === null) throw new RenameSessionError('unsupported control_request subtype')
  if (typeof request.title !== 'string') throw new RenameSessionError('rename_session: title must be a string')
  if (request.source != null && request.source !== 'remote' && request.source !== 'host') throw new RenameSessionError("rename_session: source must be 'remote' or 'host'")
  const title = cleanTitle(request.title), storage = sessionTitles.storage
  if (!title) throw new RenameSessionError('title must be non-empty')
  if (request.session_id !== undefined && request.session_id !== storage.getSessionId()) throw new RenameSessionError('session_id is not the current session')
  const sessionId = storage.getSessionId(), fromHost = request.source === 'host'
  sessionTitles.beginRenameObservation?.(title)
  const apply = () => {
    sessionTitles.titles.attempted = true
    if (fromHost && storage.getSessionId() === sessionId) sessionTitles.pushHostRenameToBridge(title, sessionId)
    sessionTitles.applyRenamedSessionName(title)
  }
  if (storage.materializedPath()) return saveRenameTitle(storage, sessionId, title, undefined, fromHost ? 'user' : 'remote').then(apply)
  storage.cacheTitle(title)
  apply()
}
export type PublicHeadlessRenameOptions = {
  /** Public wO/Izn yields undefined. A supplied private backend needs its own adapter. */
  storageV5?: unknown
  titles: { attempted: boolean }
  storage: RenameTranscript
  registry: NameRegistry
  jobs: Pick<RenameJobs, 'rename'>
  isTeammate: () => boolean
  /** Actual existing bridge guard/queue, not an invented host. */
  pushHostRenameToBridge: (name: string, sessionId: string) => void
  /** $Rt delayed-collision side effects, each with the existing archive guard. */
  publishCollisionToBridge: (name: string, sessionId: string) => void
  publishCollisionToCcr?: (name: string, sessionId: string) => void
  uniqueness?: () => boolean
  scheduleRecheck?: (task: () => Promise<void>) => void
  slug?: () => string
  logError: (error: unknown) => void
}
export function createPublicHeadlessSessionTitles(options: PublicHeadlessRenameOptions): SessionTitles & {
  drainRenames(): Promise<void>
  yielded: ReturnType<typeof createSignal<[string, string]>>
  takePendingYield(): [string, string] | undefined
  getTitleState(): ReturnType<ReturnType<typeof observeRenamePersistence>['snapshot']>
} {
  if (options.storageV5 !== undefined) throw new Error('rename_session: private storage backend is not supported by the public raw-fs adapter')
  const { registry } = options
  const observation = observeRenamePersistence(options.storage)
  const storage = observation.storage
  const reportError = (error: unknown) => {observation.fail(error); options.logError(error)}
  const schedule = (task: () => Promise<void>) => {
    const done = observation.work()
    const tracked = async () => {try {await task()} catch (error) {observation.fail(error); throw error} finally {done()}}
    if (options.scheduleRecheck) options.scheduleRecheck(tracked)
    else setTimeout(() => {void tracked().catch(options.logError)}, 3000).unref()
  }
  const coordinator = new NameCoordinator(registry, { uniqueness: options.uniqueness, schedule, slug: options.slug, logError: reportError })
  const yielded = createSignal<[string, string]>()
  let pendingYield: [string, string] | undefined
  let chain: Promise<void> = Promise.resolve()
  const unchanged = (name: string) => registry.current?.name === name && storage.currentTitle() === name && storage.currentAgentName() === name
  // This public headless lane always uses source=user, typed=false, mode=cache.
  // collision recursion is the sole additional source; no peer notices/adopter host.
  async function applyName(raw: string, source: 'user' | 'collision', mode: 'cache' | 'transcript', predecided?: NameDecision, prior?: (string | undefined)[]): Promise<void> {
    const requested = cleanTitle(raw)
    if (!requested) return
    const expected = prior ?? [registry.current?.name ?? storage.currentAgentName(), requested]
    const decision = predecided?.name === requested ? predecided : await coordinator.decide(requested, source)
    if (decision.settle === 'superseded' || predecided === undefined && unchanged(decision.name)) return
    const name = decision.name, sessionId = storage.getSessionId(), path = storage.materializedPath()
    if (path === null && mode === 'cache') storage.cacheAgentName(name)
    else await saveRenameAgent(storage, sessionId, name, path ?? storage.transcriptPath(sessionId), source === 'collision' ? 'hook' : 'user')
    if (await registry.setName(name, decision.recordSource)) observation.committedName(name, sessionId)
    else observation.fail(new Error('Session registry name was not persisted'), sessionId)
    coordinator.recheck(decision, async (next, old) => {
      if (mode === 'cache' && storage.materializedPath() === null) {
        storage.cacheTitle(next)
        await applyName(next, 'collision', 'cache')
      } else {
        // Public Gze/$Rt: pre-decided collision, title then bridge then qfe.
        const priorNames = [registry.current?.name ?? storage.currentAgentName(), next]
        const settled = await coordinator.decide(next, 'collision')
        if (!unchanged(next)) {
          const id = storage.getSessionId()
          await saveRenameTitle(storage, id, next, storage.materializedPath() ?? storage.transcriptPath(id), 'hook')
          options.publishCollisionToBridge(next, id)
          await applyName(next, 'collision', 'transcript', settled, priorNames)
          options.publishCollisionToCcr?.(next, id)
        }
      }
      pendingYield = [next, old]
      yielded.emit(next, old)
    })
    await options.jobs.rename(name, decision.recordSource === 'collision' ? 'collision' : 'user', expected)
    // zLn("renamed", ...) is an empty async function in this public artifact.
  }
  return {
    titles: options.titles, storage, pushHostRenameToBridge: options.pushHostRenameToBridge,
    beginRenameObservation: observation.begin,
    getTitleState: observation.snapshot,
    applyRenamedSessionName(name) {
      if (options.isTeammate()) return
      const done = observation.work()
      chain = chain.then(() => applyName(name, 'user', 'cache')).catch(reportError).finally(done)
    },
    drainRenames: () => chain,
    yielded,
    takePendingYield() { const pending = pendingYield; pendingYield = undefined; return pending },
  }
}

/** Concrete public local host. Private V5/CCR adapters are deliberately not
 * fabricated: callers must gate those lanes or supply their real capability. */
export function createLocalSessionRenameTitles(options: {
  registry: LocalRenameRegistry
  titles: {attempted: boolean}
  pushHostRenameToBridge(name: string, sessionId: string): void
  publishCollisionToBridge(name: string, sessionId: string): void
  publishCollisionToCcr?: (name: string, sessionId: string) => void
}) {
  const jobs = new RenameJobs({
    configDir: getClaudeConfigHomeDir(), getSessionId,
    getJobDir: () => process.env.CLAUDE_JOB_DIR,
    getSessionKind: () => process.env.CLAUDE_CODE_SESSION_KIND,
    logError,
  })
  return createPublicHeadlessSessionTitles({
    ...options, storage: getSessionRenameStorage(), jobs,
    isTeammate: () => getAgentId() != null,
    uniqueness: () => getFeatureValue_CACHED_MAY_BE_STALE('tengu_session_name_uniqueness', true) === true,
    logError,
  })
}
