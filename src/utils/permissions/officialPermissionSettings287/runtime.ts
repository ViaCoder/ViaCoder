import fs from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { getAllowedSettingSources, getOriginalCwd, getSessionTrustAccepted } from '../../../bootstrap/state.js'
import { getExecutionSession287 } from '../../../services/context/execution287.js'
import {
  checkHasTrustDialogAccepted,
  getGlobalConfig,
  getPermissionTrustTrackingOwner287,
  getProjectPathForConfig,
  isPathTrusted,
} from '../../config.js'
import { getClaudeConfigHomeDir, isEnvTruthy } from '../../envUtils.js'
import type { SettingSource } from '../../settings/constants.js'
import { logForDebugging } from '../../debug.js'
import { gitExe } from '../../git.js'
import { getFsImplementation } from '../../fsOperations.js'
import {
  getSettingsFilePathForSource,
  getSettingsForSource,
} from '../../settings/settings.js'
import { getSettingsCacheStore287 } from '../../settings/settingsCache.js'
import { permissionRuleValueFromString } from '../permissionRuleParser.js'
import type { PermissionRule } from '../PermissionRule.js'
import {
  createOfficialPermissionSettings287,
  type PermissionSettingsPorts287,
  type PermissionSettingsSource287,
} from './native.js'
import {
  createOfficialPermissionTrust287,
  type OfficialPermissionTrustPorts287,
} from './trust.native.js'

export type LocalSettingsGitTracking287 = 'tracked' | 'tracked_in_index' | 'untracked' | 'indeterminate'

// Expose only the still-undeclared original probe port. enabledSources is
// already declared by the same canonical native owner using SettingSource[].
declare module '../../settings/officialSettingsStore287/native.js' {
  interface SettingsStore287 {
    localStoreProbes: {
      canonicalRootOwnerUids<T>(root: string, compute: (root: string) => T): T
      hasCanonicalRootOwnerUids(root: string): boolean
      normalizedRealHomeDir<T>(compute: () => T): T
    }
  }
}

// projectConfigRoot and diskless are original launchOptions methods in the pinned
// host implementation; projectConfigRoot is missing only from the local d.ts.
type PermissionLaunchOptions287 = {
  projectConfigRoot(): string | null
  diskless(): boolean
}

function launchOptions287(): PermissionLaunchOptions287 {
  return getExecutionSession287().host.launchOptions as unknown as PermissionLaunchOptions287
}

function officialTrust287() {
  const ports: OfficialPermissionTrustPorts287 = {
    env: {
      ...process.env,
      get CLAUDE_CODE_SANDBOXED() { return isEnvTruthy(process.env.CLAUDE_CODE_SANDBOXED) },
    },
    oe: getPermissionTrustTrackingOwner287,
    currentTrustProject: () => getOriginalCwd() || null,
    persistedTrustForProject: project => project !== null && isPathTrusted(project),
    trustFromSession: getSessionTrustAccepted,
    readGlobalConfig: getGlobalConfig,
    currentProjectKey: getProjectPathForConfig,
      originalCwd: getOriginalCwd,
    projectConfigRoot: () => launchOptions287().projectConfigRoot(),
    executionSession: getExecutionSession287,
    pathStylePlatform: () => process.platform === 'win32' ? 'windows' : process.platform,
    gitDiscoveryLog: (level, event, fields) => {
      logForDebugging(`${event} ${JSON.stringify(fields)}`, { level: level === 'error' ? 'error' : 'warn' })
    },
    pathResolve: path.resolve,
    path,
    settingsFilePathForSource: source => getSettingsFilePathForSource(source as SettingSource) ?? null,
    allowedSettingSources: getAllowedSettingSources,
    permissionConfigState: getSettingsCacheStore287,
    sourceOrder: ['userSettings', 'projectSettings', 'localSettings', 'flagSettings', 'policySettings'],
    fs: getFsImplementation,
    realpathOrNull: value => {
      try { return fs.realpathSync(value) } catch { return null }
    },
    debug: (message, options) => logForDebugging(message, { level: options.level }),
    homeDirectory: homedir,
    configDirectory: getClaudeConfigHomeDir,
    pathJoin: path.join,
    isNotFound: error => (error as NodeJS.ErrnoException | null)?.code === 'ENOENT',
    diskless: () => launchOptions287().diskless(),
    childProcess: () => ({ spawnSync }),
    resolveGitExecutable: () => gitExe(),
  }
  return createOfficialPermissionTrust287(ports)
}

let officialTrustInstance: ReturnType<typeof officialTrust287> | undefined
function getOfficialTrust287(): ReturnType<typeof officialTrust287> {
  // config.ts imports this runtime through the permission loader. Keep owner
  // reads lazy so the config module can finish initializing its const exports.
  return officialTrustInstance ??= officialTrust287()
}

/** Original C0 command/status behavior through the generated official closure. */
export function classifyLocalSettingsGit287(projectRoot: string): LocalSettingsGitTracking287 {
  return getOfficialTrust287().C0(projectRoot)
}
export function A0(): LocalSettingsGitTracking287 { return getOfficialTrust287().A0() }
export function OE(): LocalSettingsGitTracking287 { return getOfficialTrust287().OE() }
export function ds(): boolean { return getOfficialTrust287().ds() }
/** Exact extracted T0 predicate, exposed for the ConfigState parity bridge. */
export function T0(): boolean { return getOfficialTrust287().T0() }
export function J0(options: { readonly onIndeterminate: 'tracked' | 'untracked' }): boolean {
  return getOfficialTrust287().J0(options)
}
/** Official source-cache canonical-root lookup (`bs`), same instance used by J0/aI. */
export function bs(rootOrPath: string): string | null { return getOfficialTrust287().bs(rootOrPath) }
/** Narrow status truth table retained for isolated enum tests, not a production classifier. */
export function j0ForTrackingStatus287(
  status: LocalSettingsGitTracking287,
  options: { readonly onIndeterminate: 'tracked' | 'untracked' },
): boolean {
  if (status === 'indeterminate') return options.onIndeterminate === 'tracked'
  return status === 'tracked' || status === 'tracked_in_index'
}
export function Pm(project?: string): boolean { return getOfficialTrust287().Pm(project) }
export function Rhn(): { gateProject: boolean; gateLocal: boolean } { return getOfficialTrust287().Rhn() }
export function Xo(): readonly PermissionSettingsSource287[] { return getOfficialTrust287().Xo() }
export function resetLocalSettingsGitTracking287ForTesting(): void {
  getPermissionTrustTrackingOwner287().setLocalSettingsGitTracked(undefined)
}

function enabledSourcesInOfficialOrder287(): readonly PermissionSettingsSource287[] {
  return getOfficialTrust287().Xo()
}

export function loadOfficialPermissionRulesFromDisk287(options?: {
  strictPersistedTrust?: boolean
}): PermissionRule[] {
  const ports: PermissionSettingsPorts287 = {
    permissionBehaviors: ['allow', 'deny', 'ask'],
    evalConfined: () => process.env.CLAUDE_CODE_EVAL_CONFINED === '1',
    getSettingsForSource: source => getSettingsForSource(source),
    parseRuleValue: raw => permissionRuleValueFromString(raw),
    enabledSources: enabledSourcesInOfficialOrder287,
    persistedTrust: () => checkHasTrustDialogAccepted(),
    ruleTrustGates: () => getOfficialTrust287().Rhn(),
    reportDroppedAllows: (field, count, files) => {
      logForDebugging(
        `Filtered ${count} untrusted ${field} permission rule(s) from ${files.join(', ')}`,
        { level: 'debug' },
      )
    },
  }
  return createOfficialPermissionSettings287(ports)._G(options)
}
