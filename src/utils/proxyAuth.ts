import {createSdkProjectConfigRoot287} from '../services/api/officialSdkClientOuter287/native.js'
import { execa } from 'execa'
import { createOfficialProxyRetry286, type ProxyAuthOwner286 } from '../services/api/officialByteWatchdog286/proxy.runtime.js'
import { checkHasTrustDialogAccepted } from './config.js'
import { getCwd } from './cwd.js'
import { isEnvTruthy } from './envUtils.js'
import { getProxyUrl } from './proxy.js'
import { createAuthIntegerReader, createAuthDecoders } from './officialAuthEnvironment/runtime.js'
import { logForDebugging } from './debug.js'
import {
  getSettings_DEPRECATED,
  getSettingsForSource,
} from './settings/settings.js'

const proxyHelperTTLDecoder = createAuthDecoders({ rc: createAuthIntegerReader() }).int()
const DEFAULT_PROXY_AUTH_HELPER_TTL_MS = 5 * 60 * 1000
const PROXY_AUTH_HELPER_TIMEOUT_MS = 30_000

type ProxyAuthHelperResult = {
  stdout?: string
  stderr?: string
  failed: boolean
  timedOut?: boolean
  exitCode?: number | null
}

type ProxyAuthHelperRunner = (
  command: string,
  env: NodeJS.ProcessEnv,
  cwd: string,
) => Promise<ProxyAuthHelperResult>

let cache: { value: string; timestamp: number } | null = null
let pendingChallenge: string | undefined
let runner: ProxyAuthHelperRunner = async (command, env, cwd) => {
  const result = await execa(command, {
    shell: true,
    cwd,
    env,
    timeout: PROXY_AUTH_HELPER_TIMEOUT_MS,
    reject: false,
  })
  return {
    stdout: result.stdout,
    stderr: result.stderr,
    failed: result.failed,
    timedOut: result.timedOut,
    exitCode: result.exitCode,
  }
}

// Initialize the shared state owner before the helper adapter. credentialRetry
// imports this binding during its own module initialization.
const proxyOwner: ProxyAuthOwner286 = {
  get proxyAuthHelperConfig() {
    const helper = getConfiguredHelper()
    return {
      helper: helper?.command,
      fromProjectOrLocal: helper?.fromProjectOrLocal ?? false,
      trustAccepted: checkHasTrustDialogAccepted,
    }
  },
  get proxyAuthCache() { return cache },
  set proxyAuthCache(value) { cache = value },
  get proxyAuthPendingChallenge() { return pendingChallenge },
  set proxyAuthPendingChallenge(value) { pendingChallenge = value },
}
export const proxyRetry286 = createOfficialProxyRetry286({
  a: {
    get CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER() {
      return isEnvTruthy(process.env.CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER)
    },
  },
  ki: () => proxyOwner,
})

const { createOfficialProxyHelper286 } = require('../services/api/officialProxyHelper286/proxy-helper.runtime.js') as typeof import('../services/api/officialProxyHelper286/proxy-helper.runtime.js')
const nativeHelper = createOfficialProxyHelper286({
  a: {
    get CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER() {
      return isEnvTruthy(process.env.CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER)
    },
    get CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS() {
      return proxyHelperTTLDecoder.parse(process.env.CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS)
    },
  },
  D: () => proxyOwner,
  BPe: () => proxyRetry286.BPe(),
  Ce: () => (require('../bootstrap/state.js') as typeof import('../bootstrap/state.js')).getIsNonInteractiveSession(),
  // Original Co reads the same launch-options owner as settings/CLI overrides;
  // working cwd/project root are separate and must not replace this nullable slot.
  Io: createSdkProjectConfigRoot287(() =>
    (require('../services/context/execution287.js') as typeof import('../services/context/execution287.js')).getExecutionSession287()),
  xC: async (command, options) => runner(command, options.env, options.cwd ?? getCwd()),
  t: (message, options) => logForDebugging(message, options),
  $Pe: getProxyUrlFromEnvironment,
  ar: DEFAULT_PROXY_AUTH_HELPER_TTL_MS,
})

function getConfiguredHelper(): { command: string; fromProjectOrLocal: boolean } | undefined {
  if (!isEnvTruthy(process.env.CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER)) {
    return undefined
  }
  const command = getSettings_DEPRECATED()?.proxyAuthHelper
  if (typeof command !== 'string' || command.trim().length === 0) {
    return undefined
  }
  return {
    command,
    fromProjectOrLocal:
      getSettingsForSource('projectSettings')?.proxyAuthHelper === command ||
      getSettingsForSource('localSettings')?.proxyAuthHelper === command,
  }
}

function getProxyUrlFromEnvironment(): string | undefined {
  return getProxyUrl()
}

/** Read a cached dynamic Proxy-Authorization value or invoke the configured helper. */
export async function getProxyAuthToken(): Promise<string | undefined> {
  const helper = getConfiguredHelper()
  if (!helper) return undefined
  return (await nativeHelper.jPe()) ?? undefined
}

/** Clear cached helper output after settings/environment changes. */
export function clearProxyAuthCache(): void {
  cache = null
  pendingChallenge = undefined
}

/** Test seam: fixtures supply output without executing configured commands. */
export function setProxyAuthHelperRunnerForTesting(
  next: ProxyAuthHelperRunner | undefined,
): void {
  runner = next ?? (async (command, env, cwd) => {
    const result = await execa(command, {
      shell: true,
      cwd,
      env,
      timeout: PROXY_AUTH_HELPER_TIMEOUT_MS,
      reject: false,
    })
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      failed: result.failed,
      timedOut: result.timedOut,
      exitCode: result.exitCode,
    }
  })
  clearProxyAuthCache()
}
