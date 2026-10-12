import {authEnvironment} from '../../utils/authEnvironment.js'
import {getGatewayAuthorizationHeaderOverrides} from './requestHeaders.js'
import {isDebugToStdErr} from '../../utils/debug.js'
import {createAuthDecoders, createAuthIntegerReader} from '../../utils/officialAuthEnvironment/runtime.js'
import {createOfficialFoundryEnvironment286} from './officialFoundry286/generated/foundryEnvironment.js'
import {createOfficialFoundryHostError286} from './officialFoundry286/generated/hostError.js'
import {runOfficialFoundry286RawBranch, createOfficialFoundryHostPredicate286} from './officialFoundry286/generated/rawBranch.js'

const foundryEnvironment = createOfficialFoundryEnvironment286({
  D: createAuthDecoders({rc: createAuthIntegerReader()}), process, base: authEnvironment,
})
const originalHostManagedError = createOfficialFoundryHostError286()

export type OfficialFoundry286Options = Record<string, unknown> & {
  /** Existing complete constructor common options, including the caller-owned headers. */
  defaultHeaders: Record<string, string | null | undefined>
}

export type OfficialFoundry286Ports = {
  /** Native cc override; default is original cc bound to the existing typed host flag. */
  isHostManaged?: () => boolean
  /** Optional typed 2.1.286 environment view, primarily for the caller-owned environment adapter. */
  authEnvironment?: Record<string, unknown>
  /** Optional error override; default is the original complete P/Bhn/FUt closure. */
  hostManagedError?: (provider: string) => Error
  /** Optional logger adapter; production defaults to the SDK's existing stderr setting. */
  shouldLogSdk?: () => boolean
  logger?: () => unknown
}

function defaultLogger() {
  return {
    error: (message: unknown, ...args: unknown[]) => console.error('[Anthropic SDK ERROR]', message, ...args),
    warn: (message: unknown, ...args: unknown[]) => console.error('[Anthropic SDK WARN]', message, ...args),
    info: (message: unknown, ...args: unknown[]) => console.error('[Anthropic SDK INFO]', message, ...args),
    debug: (message: unknown, ...args: unknown[]) => console.error('[Anthropic SDK DEBUG]', message, ...args),
  }
}

/**
 * Foundry-only adapter for the complete 2.1.286 _D provider branch.
 * `client.ts` remains the caller/owner: it supplies its existing ARGS object and
 * decides when provider selection enters this adapter. This adds no proxy,
 * retry, auth fallback, or Azure credential-resolution policy of its own.
 */
export async function createOfficialFoundry286(
  apiKey: string | null | undefined,
  commonOptions: OfficialFoundry286Options,
  ports: OfficialFoundry286Ports = {},
): Promise<unknown | null> {
  const env = {env: process.env}
  const foundryAuthEnvironment = ports.authEnvironment ?? foundryEnvironment
  return runOfficialFoundry286RawBranch({
    provider: 'foundry', apiKey, authEnvironment: foundryAuthEnvironment, env,
    commonOptions,
    isHostManaged: ports.isHostManaged ?? createOfficialFoundryHostPredicate286(authEnvironment),
    hostManagedError: ports.hostManagedError ?? originalHostManagedError,
    gatewayAuthOverrides: getGatewayAuthorizationHeaderOverrides,
    shouldLogSdk: ports.shouldLogSdk ?? isDebugToStdErr,
    logger: ports.logger ?? defaultLogger,
  })
}
