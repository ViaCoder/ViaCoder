// Local official 2.1.283 chunk-mn08nqq5:uXt/r/o. This pure decision is also the
// offline acceptance seam; it must not invent a compliance approval when the
// host has no authoritative policy provider.
export function evaluateChicagoAvailability(input: {
  platform: string; arch: string; tier: string | null | undefined
  rolloutEnabled: unknown; complianceTaints: readonly string[] | undefined
}): {enabled: true} | {enabled: false; reason: string} {
  if (input.platform !== 'darwin') return {enabled: false, reason: 'Official npm CLI computer use is macOS-only; Claude Desktop computer use uses a separate host'}
  if (input.arch !== 'arm64' && input.arch !== 'x64') return {enabled: false, reason: `Native computer use is unavailable for ${input.arch}`}
  if (!input.complianceTaints) return {enabled: false, reason: 'Authoritative compliance policy host is not wired; HIPAA eligibility is unverified'}
  if (input.complianceTaints.includes('hipaa')) return {enabled: false, reason: 'Computer use is disabled under HIPAA'}
  if (input.tier !== 'pro' && input.tier !== 'max') return {enabled: false, reason: 'Official rollout requires a Pro or Max subscription'}
  if (input.rolloutEnabled !== true) return {enabled: false, reason: 'Official tengu_malort_pedway rollout is disabled'}
  return {enabled: true}
}
