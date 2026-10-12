/** C Web presenter boundary, NOT a native permission or an original UI body.
 * The original U/spec/binder still own dispatch and grant merge. Only requested
 * resolved application IDs and requested explicit flags cross this boundary. */
import { z } from 'zod/v4'
export const computerUseWebRequest287 = z.object({
  apps: z.array(z.object({ requestedName: z.string(), alreadyGranted: z.boolean().optional(),
    resolved: z.object({ bundleId: z.string(), displayName: z.string() }).optional() })),
  requestedFlags: z.object({ clipboardRead: z.boolean().optional(), clipboardWrite: z.boolean().optional(), systemKeyCombos: z.boolean().optional() }),
  reason: z.string().optional(), tccState: z.object({ accessibility: z.boolean(), screenRecording: z.boolean() }).optional(),
  willHide: z.array(z.string()).optional(),
})
const response = z.object({ granted: z.array(z.object({ bundleId: z.string(), displayName: z.string(), grantedAt: z.number().finite() })),
  denied: z.array(z.object({ bundleId: z.string(), reason: z.enum(['user_denied', 'not_installed']) })),
  flags: z.object({ clipboardRead: z.boolean(), clipboardWrite: z.boolean(), systemKeyCombos: z.boolean() }) })
export function computerUseWebAnswer287(input: unknown, allowed: boolean, answer?: Record<string, unknown>) {
  if (!allowed) return { behavior: 'completed' as const, result: { granted: [], denied: [],
    flags: { clipboardRead: false, clipboardWrite: false, systemKeyCombos: false } } }
  const request = computerUseWebRequest287.parse(input), value = response.parse(answer)
  if (request.tccState && (value.granted.length > 0 || Object.values(value.flags).some(Boolean)))
    throw Error('OS permissions must be granted on the desktop host')
  const ids = new Set<string>()
  for (const app of value.granted) {
    if (ids.has(app.bundleId) || !request.apps.some(a => a.resolved?.bundleId === app.bundleId && a.resolved.displayName === app.displayName))
      throw Error('Computer use approval includes an unrequested application')
    ids.add(app.bundleId)
  }
  for (const flag of ['clipboardRead', 'clipboardWrite', 'systemKeyCombos'] as const)
    if (value.flags[flag] && request.requestedFlags[flag] !== true) throw Error('Computer use approval includes an unrequested flag')
  for (const app of value.denied)
    if (!request.apps.some(a => (a.resolved?.bundleId ?? a.requestedName) === app.bundleId)) throw Error('Computer use denial includes an unrequested application')
  return { behavior: 'completed' as const, result: value }
}
