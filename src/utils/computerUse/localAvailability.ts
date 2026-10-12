/** Local desktop capability; not an Anthropic account/rollout eligibility claim. */
export function getLocalComputerUseAvailability(
  platform: string = process.platform,
  arch: string = process.arch,
): { enabled: true } | { enabled: false; reason: string } {
  if (platform !== 'darwin') return { enabled: false, reason: 'Use the platform-specific desktop MCP backend' }
  if (arch !== 'x64' && arch !== 'arm64') return { enabled: false, reason: `Native desktop is unavailable for ${arch}` }
  // The pinned drivers cover both architectures. App approval, native integrity,
  // TCC, locks and cancellation are still enforced by the original executor.
  return { enabled: true }
}
