import { getChromeMenuSource287 } from './menuRuntime287.js'
import type { ScopedMcpServerConfig } from '../../services/mcp/types.js'

// Official 287 chunk-nankzm0s:iJe/tA. Inference-only tokens are not accepted
// by /api/oauth/validate. This reads the normal host token state; never validates
// a token remotely or invents scope membership.
export function hasChromeBridgeScope(): boolean {
  return getChromeMenuSource287('chunk-nankzm0s.js').iJe()
}

export function shouldEnableClaudeInChrome(chromeFlag?: boolean): boolean {
  return getChromeMenuSource287('chunk-09m4fzsj.js').pNt(chromeFlag)
}

export function shouldAutoEnableClaudeInChrome(): boolean {
  // sLr's latch belongs to the same canonical Zc used by the bridge server,
  // not a second module-local cache. YW refreshes the normal config writer.
  return getChromeMenuSource287('chunk-09m4fzsj.js').sLr()
}

/** Complete original b$e caller, sharing canonical Zc/policy/config owners.
 * Native/source launching keeps the previously accepted C current entrypoint. */
export function setupClaudeInChrome(options?: {skipReconnectAutoOpen?: boolean}): {
  mcpConfig: Record<string, ScopedMcpServerConfig>
  allowedTools: string[]
  systemPrompt: string
} {
  return getChromeMenuSource287('chunk-09m4fzsj.js').b$e(options)
}

/** Complete original KW: first-time-only reconnect and optional suppression. */
export async function installChromeNativeHostManifest(
  manifestBinaryPath: string,
  options?: {skipReconnectAutoOpen?: boolean},
): Promise<void> {
  return getChromeMenuSource287('chunk-09m4fzsj.js').KW(manifestBinaryPath, options)
}

/** Complete 287 detector; cross-platform directory production stays with common.ts. */
export async function isChromeExtensionInstalled(): Promise<boolean> {
  return getChromeMenuSource287('chunk-09m4fzsj.js').cH()
}
