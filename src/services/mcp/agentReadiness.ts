import { getIsInteractive, getIsRemoteMode } from '../../bootstrap/state.js'
import type { AppState } from '../../state/AppState.js'
import { isEnvTruthy } from '../../utils/envUtils.js'
import { sleep } from '../../utils/sleep.js'
import { getMcpPrefix } from './mcpStringUtils.js'

type AgentMcpView = Pick<AppState['mcp'], 'clients' | 'tools'>

/** Official 2.1.283 chunk-mf915hf8.js DLe/W2n/j2n/Nin, with Li from
 * chunk-77tq6657.js and YLe=2000 from chunk-4v3gzrwd.js. This is a
 * source-derived host translation: bootstrap interactive/remote mode stands
 * for official launchOptions.isInteractive/workspace==='remote'. */
export async function waitForAgentMcpTools(getMcp: () => AgentMcpView): Promise<void> {
  // Li: coordinator mode only; local interactive sessions do not wait.
  if (!isEnvTruthy(process.env.CLAUDE_CODE_COORDINATOR_MODE) ||
    (getIsInteractive() && !getIsRemoteMode() && !process.env.CLAUDE_CODE_REMOTE)) return

  // j2n: a pending server only blocks until its projected tool is present.
  // Nin: comms-role servers never block this wait.
  const hasUnprojectedPending = (mcp: AgentMcpView) => mcp.clients.some(client => {
    if (client.type !== 'pending' ||
      ('role' in client.config && client.config.role === 'comms')) return false
    const prefix = getMcpPrefix(client.name)
    return !mcp.tools.some(tool => tool.mcpInfo?.serverName === client.name || tool.name.startsWith(prefix))
  })

  // W2n: one initial check, then 50ms polls until settled or the 2s bound.
  if (!hasUnprojectedPending(getMcp())) return
  const deadline = Date.now() + 2_000
  while (Date.now() < deadline) {
    await sleep(50)
    if (!hasUnprojectedPending(getMcp())) return
  }
}
