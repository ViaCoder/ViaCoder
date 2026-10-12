import type {SDKControlInitializeRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {HookCallbackMatcher} from '../../types/hooks.js'
import type {HookEvent} from '../../entrypoints/agentSdkTypes.js'
import type {StructuredIO} from '../structuredIO.js'

/** Official 2.1.283 headless initialize preflight (chunk-r4xrzyvn).
 * Validate the entire registration payload before mutating SDK servers/hooks.
 * This intentionally follows the runtime checks, not a stricter schema parser:
 * null optional values and unknown event names are accepted by the official loop.
 */
export function validateInitializeRegistration(request: {
  sdkMcpServers?: unknown
  webSearchIsolationExemptMcpServers?: unknown
  hooks?: unknown
  skills?: unknown
}): string | undefined {
  const servers = request.sdkMcpServers, exempt = request.webSearchIsolationExemptMcpServers
  if (servers != null && (!Array.isArray(servers) || servers.some(value => typeof value !== 'string')) ||
      exempt != null && (!Array.isArray(exempt) || exempt.some(value => typeof value !== 'string'))) {
    return 'initialize: sdkMcpServers and webSearchIsolationExemptMcpServers must be arrays of strings'
  }
  const hooks = request.hooks
  if (hooks != null && (typeof hooks !== 'object' || Array.isArray(hooks) ||
      Object.values(hooks).some(matchers => !Array.isArray(matchers) || matchers.some(matcher =>
        matcher === null || typeof matcher !== 'object' || !('hookCallbackIds' in matcher) ||
        !Array.isArray(matcher.hookCallbackIds) || matcher.hookCallbackIds.some((id: unknown) => typeof id !== 'string') ||
        'matcher' in matcher && matcher.matcher != null && typeof matcher.matcher !== 'string')))) {
    return 'initialize: hooks must map hook events to arrays of matchers carrying hookCallbackIds arrays and string matchers'
  }
  if (request.skills !== undefined && (!Array.isArray(request.skills) || request.skills.some(value => typeof value !== 'string'))) {
    return 'initialize: skills must be an array of strings'
  }
}

export function prepareSdkHookMatchers(
  hooks: NonNullable<SDKControlInitializeRequest['hooks']>,
  io: Pick<StructuredIO, 'createHookCallback'>,
): Partial<Record<HookEvent, HookCallbackMatcher[]>> {
  return Object.fromEntries(Object.entries(hooks).filter(([, matchers]) => matchers.length > 0)
    .map(([event, matchers]) => [event, matchers.map(matcher => ({
      matcher: matcher.matcher ?? undefined,
      hooks: matcher.hookCallbackIds.map(id => io.createHookCallback(id, matcher.timeout)),
    }))]))
}
