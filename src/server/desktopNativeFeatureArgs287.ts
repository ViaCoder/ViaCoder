/** Native CLI branch, not a gate on the independent external desktop MCPs.
 * Fixed 287 Windows packages compile out CHICAGO_MCP and contain only rejecting
 * native loaders. Preserve the accepted macOS native-default C. */
export function desktopNativeFeatureArgs287(platform: NodeJS.Platform = process.platform): string[] {
  return platform === 'darwin' ? ['--feature=CHICAGO_MCP'] : []
}
