import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import { z } from 'zod'
import { type createChromeDeviceHost } from './deviceHost.js'

// Official 2.1.283 chunk-9r9kpwh0 sfn/iy; chunk-r4xrzyvn remote-only dispatch.
const deviceId = z.string().regex(/^[A-Za-z0-9-]{1,64}$/)
export const chromeBrowserHintsSchema = z.object({
  subtype: z.literal('set_chrome_browser_hints'),
  preferredDeviceId: deviceId.nullable().optional(),
  localDeviceIds: z.array(deviceId).max(32),
  hostPlatform: z.enum(['darwin', 'win32', 'linux']).optional(),
})
export type ChromeBrowserHintsRequest = z.infer<typeof chromeBrowserHintsSchema>

export function applyChromeBrowserHintsRequest(request: unknown, remoteHosted: boolean,
  host?: ReturnType<typeof createChromeDeviceHost>,
): { ok: true } | { ok: false; error: string } {
  if (!remoteHosted) return {ok: false, error: 'set_chrome_browser_hints is only accepted in a remote-hosted session'}
  const result = chromeBrowserHintsSchema.safeParse(request)
  if (!result.success) return {ok: false, error: `Invalid set_chrome_browser_hints: ${result.error.issues[0]?.message ?? 'malformed'}`}
  const hints = result.data
  const owner=host??getMcpConnectedProducer287()
  owner.updateBrowserHints({...hints, preferredDeviceId: hints.preferredDeviceId ?? undefined})
  return {ok: true}
}
