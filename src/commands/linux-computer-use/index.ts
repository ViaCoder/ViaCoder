import { textCommand } from '../noninteractive/types.js'

/** Explicit operator entry; hidden on non-Linux hosts, never auto-registers. */
export default textCommand(
  'linux-computer-use',
  'Diagnose or explicitly register the installed Linux computer-use MCP server',
  () => import('./linux-computer-use.js'),
  { argumentHint: '[doctor|register] [absolute-binary-path]', isEnabled: () => process.platform === 'linux' },
)
