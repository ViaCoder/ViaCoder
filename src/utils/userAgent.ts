/**
 * User-Agent string helpers.
 *
 * Kept dependency-free so SDK-bundled code (bridge, cli/transports) can
 * import without pulling in auth.ts and its transitive dependency tree.
 */

// Dependency-free official jg mapping shared by bootstrap and session ingress.
export {getClientPlatform as getClaudeCodeClientPlatform} from '../vendor/official-session-transports/protocol.js'

export function getClaudeCodeUserAgent(): string {
  return `claude-code/${MACRO.VERSION}`
}
