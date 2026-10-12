import {getOriginalModsLifecycle287} from '../hooks/modelSwitch287/lifecycleRuntime.js'
import {getOriginalCwd, getSessionId} from '../../bootstrap/state.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {attachSessionRenameRegistry, updateSessionRecord, getConcurrentSessionOwner287} from '../concurrentSessions.js'
import {registerCleanup} from '../cleanupRegistry.js'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {logError} from '../log.js'
import {LocalRenameRegistry} from './registry.js'

export type SessionRenameHostStatus =
  | {available: true; registry: LocalRenameRegistry}
  | {available: false; reason: 'not_started' | 'initializing' | 'registration_failed' | 'stable_address_requires_adoption_host' | 'windows_identity_unavailable'}

let status: SessionRenameHostStatus = {available: false, reason: 'not_started'}
let boot: Promise<SessionRenameHostStatus> | undefined

/** The exact process-wide instance used by name, switch, bridge and activity
 * writers. Null means the caller must use an unsupported-host response. */
export function getSessionRenameRegistry(): LocalRenameRegistry | null {
  return status.available ? status.registry : null
}
export function getSessionRenameHostStatus(): SessionRenameHostStatus {return status}
export function whenSessionRenameHostReady(): Promise<SessionRenameHostStatus> {return boot ?? Promise.resolve(status)}

/** Called once at REPL boot with the *actual* concurrentSessions registration.
 * -p and interactive both enter this path. Registration remains the sole PID
 * owner; the registry enriches it through that writer's serialized queue. */
export function initializeLocalSessionRenameHost(existingRegistration: Promise<boolean>, explicitName?: string): Promise<SessionRenameHostStatus> {
  if (boot) return boot
  status = {available: false, reason: 'initializing'}
  boot = (async () => {
    const stableAddress = getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_session_stable_address', false) === true
    if (stableAddress) return status = {available: false, reason: 'stable_address_requires_adoption_host'}
    if (process.platform === 'win32') return status = {available: false, reason: 'windows_identity_unavailable'}
    const registry = new LocalRenameRegistry({
      canonicalState:getConcurrentSessionOwner287(),
      canonicalNameState:(getOriginalModsLifecycle287().clearLifecycleSource287('chunk-z3rgg13c.js','Iw') as ()=>Record<string,any>)(),
      configDir: getClaudeConfigHomeDir(), getSessionId, getCwd: getOriginalCwd,
      logError, shouldRegister: () => true, existingRegistration,
      writePidPatch: updateSessionRecord,
      env: {
        CLAUDE_CODE_SESSION_KIND: process.env.CLAUDE_CODE_SESSION_KIND,
        CLAUDE_CODE_SESSION_NAME: process.env.CLAUDE_CODE_SESSION_NAME,
        CLAUDE_CODE_ENTRYPOINT: process.env.CLAUDE_CODE_ENTRYPOINT,
        CLAUDE_JOB_DIR: process.env.CLAUDE_JOB_DIR,
      },
      stableAddress,
    })
    // register() publishes the actual in-flight promise before anyone can
    // await whenRegistered(). No independent PID write chain is used here.
    if (!await registry.register()) return status = {available: false, reason: 'registration_failed'}
    const detach = attachSessionRenameRegistry(registry)
    registerCleanup(async () => {detach(); await registry.dispose()})
    if (explicitName) await registry.initializeSessionName(explicitName, 'user')
    return status = {available: true, registry}
  })().catch(error => {logError(error); return status = {available: false, reason: 'registration_failed'}})
  return boot
}
