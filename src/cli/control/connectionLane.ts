/** Official 2.1.283 chunk-1bmr2qy3.js:Tg, using the active IO's facts.
 * Authentication/provider choice is deliberately not part of this predicate.
 */
export function redactsPersistedControlLane(
  transport: { readonly isHostedWorker: boolean; readonly persistsOutboundFrames?: boolean },
  environmentKind = process.env.CLAUDE_CODE_ENVIRONMENT_KIND,
): boolean {
  return transport.isHostedWorker ||
    (environmentKind === 'bridge' && transport.persistsOutboundFrames !== false)
}

/** ey advertises raw resource reads only on the non-redacted connection.
 * Other capabilities must be supplied by their implemented owners; presence
 * of an official string is not sufficient to advertise the operation.
 */
export function resourceReadCapabilities(redactsPersistedLane: boolean, capabilities: readonly string[] = []): string[] {
  const result = capabilities.filter(capability => capability !== 'mcp_read_resource_v1')
  if (!redactsPersistedLane) result.push('mcp_read_resource_v1')
  return result
}
