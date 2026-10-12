import {sharedOAuthDescriptor} from './sharedOAuthDescriptor.js'
import {getApiKeyFromFd,setApiKeyFromFd} from '../bootstrap/state.js'

/**
 * Well-known token file locations in CCR. The Go environment-manager creates
 * /home/claude/.claude/remote/ and will (eventually) write these files too.
 * Until then, this module writes them on successful FD read so subprocesses
 * spawned inside the CCR container can find the token without inheriting
 * the FD — which they can't: pipe FDs don't cross tmux/shell boundaries.
 */
const CCR_TOKEN_DIR = '/home/claude/.claude/remote'
export const CCR_OAUTH_TOKEN_PATH = `${CCR_TOKEN_DIR}/.oauth_token`
export const CCR_API_KEY_PATH = `${CCR_TOKEN_DIR}/.api_key`
export const CCR_SESSION_INGRESS_TOKEN_PATH = `${CCR_TOKEN_DIR}/.session_ingress_token`

/**
 * Best-effort write of the token to a well-known location for subprocess
 * access. CCR-gated: outside CCR there's no /home/claude/ and no reason to
 * put a token on disk that the FD was meant to keep off disk.
 */
export function maybePersistTokenForSubprocesses(
  path: string,
  token: string,
  tokenName: string,
): void {
  sharedOAuthDescriptor.persist(path,token,tokenName)
}

/**
 * Fallback read from a well-known file. The path only exists in CCR (env-manager
 * creates the directory), so file-not-found is the expected outcome everywhere
 * else — treated as "no fallback", not an error.
 */
export function readTokenFromWellKnownFile(
  path: string,
  tokenName: string,
): string | null {
  return sharedOAuthDescriptor.wellKnown(path,tokenName)
}

/**
 * Get the CCR-injected OAuth token. Uses the official descriptor reader for FD-vs-disk
 * rationale. Env var: CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR.
 * Well-known file: /home/claude/.claude/remote/.oauth_token.
 */
export function getOAuthTokenFromFileDescriptor(): string | null {
  return sharedOAuthDescriptor.oauth()
}

/**
 * Get the CCR-injected API key. Uses the official descriptor reader for FD-vs-disk
 * rationale. Env var: CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR.
 * Well-known file: /home/claude/.claude/remote/.api_key.
 */
export function getApiKeyFromFileDescriptor(): string | null {
  return sharedOAuthDescriptor.read({
    envVar: 'CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR',wellKnownPath: CCR_API_KEY_PATH,
    label: 'API key',getCached: getApiKeyFromFd,setCached: setApiKeyFromFd,
  })
}
