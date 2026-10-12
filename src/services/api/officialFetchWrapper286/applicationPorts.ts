import {authEnvironment} from '../../../utils/authEnvironment.js'
import {createAuthDecoders, createAuthIntegerKernel} from '../../../utils/officialAuthEnvironment/runtime.js'

/** Application owners only. No rawPorts286/productionBinding import, config,
 * auth, session, request-context, host or telemetry singleton is constructed.
 * Missing ports are ABSENT, not functions returning false/undefined. This is
 * intentionally not a second buildFetch nor a complete s9 factory.
 */
const integers = createAuthIntegerKernel()
const decoders = createAuthDecoders({rc: integers.integer})
const additions = {
  _CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL: decoders.bool(),
  CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS: decoders.int({min: 1}),
  CLAUDE_ENABLE_BYTE_WATCHDOG: decoders.triBool(),
  CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK: decoders.bool(),
  CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT: decoders.bool(),
  CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD: decoders.bool(),
  CLAUDE_CODE_ENVIRONMENT_KIND: decoders.str(),
} as const

// Delegate the existing authEnvironment lazily; extend only the missing s9
// transport getters with its existing decoder implementation and live env.
type TransportEnvironment = typeof authEnvironment & {
  readonly _CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL: boolean
  readonly CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS?: number
  readonly CLAUDE_ENABLE_BYTE_WATCHDOG?: boolean
  readonly CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK: boolean
  readonly CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_DEFAULT: boolean
  readonly CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD: boolean
  readonly CLAUDE_CODE_ENVIRONMENT_KIND?: string
}
function transportEnvironment(): TransportEnvironment {
  const view = Object.create(authEnvironment) as TransportEnvironment
  for (const [name, decoder] of Object.entries(additions)) {
    Object.defineProperty(view, name, {enumerable: true, get: () => decoder.parse(process.env[name])})
  }
  return Object.freeze(view)
}
const environment = transportEnvironment()

export const applicationPorts286 = Object.freeze({
  a: environment,
})
