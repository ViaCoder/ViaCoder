import { feature } from 'bun:bundle'
import {getNativeTipModule287} from '../services/tips/tipsProduction287.js'
import { chmod, mkdir, readdir, readFile, unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import {
  getOriginalCwd,
  getSessionId,
  onSessionSwitch,
} from '../bootstrap/state.js'
import { registerCleanup } from './cleanupRegistry.js'
import { logForDebugging } from './debug.js'
import { getClaudeConfigHomeDir } from './envUtils.js'
import { errorMessage, isFsInaccessible } from './errors.js'
import { isProcessRunning } from './genericProcessUtils.js'
import { getPlatform } from './platform.js'
import { jsonParse, jsonStringify } from './slowOperations.js'
import { getAgentId } from './teammate.js'

export type SessionKind = 'interactive' | 'bg' | 'daemon' | 'daemon-worker'
export type SessionStatus = 'busy' | 'idle' | 'waiting'

// Official 2.1.283 zt serializes PID-record read/modify/write operations.
// Name, bridge and session changes must not overwrite each other's fields.
let closing = false
/** Full original GH/_L/yS, keyed by the canonical execution host. */
export function getConcurrentSessionOwner287():Record<string,any>{return getNativeTipModule287('chunk-nankzm0s.js').GH()}
export function getConcurrentSessionWatchOwner287():Record<string,any>{return getConcurrentSessionOwner287()}
type RenameRegistryWriter = {
  setName(name: string, source: 'user'): Promise<boolean>
  sessionSwitched(): Promise<void>
}
let renameRegistryWriter: RenameRegistryWriter | undefined

/** Attach only the already registered rename host. All PID mutations still
 * flow through getConcurrentSessionOwner287().pidFileWriteChain; this does not install another file writer. */
export function attachSessionRenameRegistry(writer: RenameRegistryWriter): () => void {
  renameRegistryWriter = writer
  return () => {if (renameRegistryWriter === writer) renameRegistryWriter = undefined}
}

function getSessionsDir(): string {
  return join(getClaudeConfigHomeDir(), 'sessions')
}

/**
 * Kind override from env. Set by the spawner (`claude --bg`, daemon
 * supervisor) so the child can register without the parent having to
 * write the file for it — cleanup-on-exit wiring then works for free.
 * Gated so the env-var string is DCE'd from external builds.
 */
function envSessionKind(): SessionKind | undefined {
  if (feature('BG_SESSIONS')) {
    const k = process.env.CLAUDE_CODE_SESSION_KIND
    if (k === 'bg' || k === 'daemon' || k === 'daemon-worker') return k
  }
  return undefined
}

/**
 * True when this REPL is running inside a `claude --bg` tmux session.
 * Exit paths (/exit, ctrl+c, ctrl+d) should detach the attached client
 * instead of killing the process.
 */
export function isBgSession(): boolean {
  return envSessionKind() === 'bg'
}

/**
 * Write a PID file for this session and register cleanup.
 *
 * Registers all top-level sessions — interactive CLI, SDK (vscode, desktop,
 * typescript, python, -p), bg/daemon spawns — so `claude ps` sees everything
 * the user might be running. Skips only teammates/subagents, which would
 * conflate swarm usage with genuine concurrency and pollute ps with noise.
 *
 * Returns true if registered, false if skipped.
 * Errors logged to debug, never thrown.
 */
export async function registerSession(): Promise<boolean> {
  if (getConcurrentSessionOwner287().registration) return getConcurrentSessionOwner287().registration
  if (getAgentId() != null) return false

  const kind: SessionKind = envSessionKind() ?? 'interactive'
  const dir = getSessionsDir()
  const pidFile = join(dir, `${process.pid}.json`)

  // Subscribe before the registration write enters the queue. A switch while
  // the initial file is being created then queues *after* that write instead
  // of being lost or racing a separate writer.
  const offSessionSwitch = onSessionSwitch(id => {
    void (renameRegistryWriter ? renameRegistryWriter.sessionSwitched() : updatePidFile({ sessionId: id }))
  })

  registerCleanup(async () => {
    closing = true
    offSessionSwitch()
    await getConcurrentSessionOwner287().pidFileWriteChain
    try {
      await unlink(pidFile)
    } catch {
      // ENOENT is fine (already deleted or never written)
    }
  })

  const registration = getConcurrentSessionOwner287().pidFileWriteChain.then(async () => {
    try {
      await mkdir(dir, { recursive: true, mode: 0o700 })
      await chmod(dir, 0o700)
      await writeFile(pidFile, jsonStringify({
        pid: process.pid,
        sessionId: getSessionId(),
        cwd: getOriginalCwd(),
        startedAt: Date.now(),
        kind,
        entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT,
        ...(feature('UDS_INBOX')
          ? { messagingSocketPath: process.env.CLAUDE_CODE_MESSAGING_SOCKET }
          : {}),
        ...(feature('BG_SESSIONS')
          ? {
              name: process.env.CLAUDE_CODE_SESSION_NAME,
              logPath: process.env.CLAUDE_CODE_SESSION_LOG,
              agent: process.env.CLAUDE_CODE_AGENT,
            }
          : {}),
      }))
      return true
    } catch (e) {
      logForDebugging(`[concurrentSessions] register failed: ${errorMessage(e)}`)
      return false
    }
  })
  getConcurrentSessionOwner287().pidFileWriteChain = registration.then(() => undefined)
  getConcurrentSessionOwner287().registration = registration
  return registration
}

/**
 * Update this session's name in its PID registry file so ListPeers
 * can surface it. Best-effort: silently no-op if name is falsy, the
 * file doesn't exist (session not registered), or read/write fails.
 */
export async function updateSessionRecord(patch: Record<string, unknown> | ((current: Record<string, unknown>) => Record<string, unknown>)): Promise<boolean> {
  if (closing) return false
  const pidFile = join(getSessionsDir(), `${process.pid}.json`)
  const write = getConcurrentSessionOwner287().pidFileWriteChain.then(async () => {
    try {
      const data = jsonParse(await readFile(pidFile, 'utf8')) as Record<
        string,
        unknown
      >
      const change = typeof patch === 'function' ? patch(data) : patch
      await writeFile(pidFile, jsonStringify({ ...data, ...change }))
      return true
    } catch (e) {
      logForDebugging(
        `[concurrentSessions] updatePidFile failed: ${errorMessage(e)}`,
      )
      return false
    }
  })
  getConcurrentSessionOwner287().pidFileWriteChain = write.then(() => undefined)
  return write
}

async function updatePidFile(patch: Record<string, unknown>): Promise<void> {
  await updateSessionRecord(patch)
}

export async function updateSessionName(
  name: string | undefined,
): Promise<void> {
  if (!name) return
  if (renameRegistryWriter) {await renameRegistryWriter.setName(name, 'user'); return}
  await updatePidFile({ name })
}

/**
 * Record this session's Remote Control session ID so peer enumeration can
 * dedup: a session reachable over both UDS and bridge should only appear
 * once (local wins). Cleared on bridge teardown so stale IDs don't
 * suppress a legitimately-remote session after reconnect.
 */
export async function updateSessionBridgeId(
  bridgeSessionId: string | null,
): Promise<void> {
  await updatePidFile({ bridgeSessionId })
}

/**
 * Push live activity state for `claude ps`. Fire-and-forget from REPL's
 * status-change effect — a dropped write just means ps falls back to
 * transcript-tail derivation for one refresh.
 */
export async function updateSessionActivity(patch: {
  status?: SessionStatus
  waitingFor?: string
}): Promise<void> {
  if (!feature('BG_SESSIONS')) return
  await updatePidFile({ ...patch, updatedAt: Date.now() })
}

/**
 * Count live concurrent CLI sessions (including this one).
 * Filters out stale PID files (crashed sessions) and deletes them.
 * Returns 0 on any error (conservative).
 */
export async function countConcurrentSessions(storageV5?:unknown): Promise<number> {
  return getNativeTipModule287('chunk-nankzm0s.js').x_t(storageV5)
}
