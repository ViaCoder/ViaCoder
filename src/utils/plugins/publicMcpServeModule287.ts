/** Original MCP command dynamic imports must resolve the installed application
 * modules, not a second raw setup/sandbox/server owner in the restored graph.
 * Only these fixed module identifiers are host seams; no arbitrary loading.
 */
export function getPublicMcpServeModule287(specifier: string): Readonly<Record<string, unknown>> | undefined {
  switch (specifier) {
    case '/$bunfs/root/chunk-1sb33067.js':
      return import.meta.require('../../setup.js')
    case '/$bunfs/root/chunk-01m7d3vw.js':
      return import.meta.require('../sandbox/sandbox-adapter.js')
    case '/$bunfs/root/chunk-z12f8en9.js':
      return import.meta.require('../../entrypoints/mcp.js')
    default:
      return undefined
  }
}
