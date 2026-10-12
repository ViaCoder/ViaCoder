import type { LocalCommandCall } from '../../types/command.js'
import type { MCPServerConnection } from '../../services/mcp/types.js'
import { HELP_ARGS, INFO_ARGS, text } from '../noninteractive/types.js'
import { localMcpCommandHost, McpCommandControlError } from '../../services/mcp/localCommandHost.js'
export type McpCommandHost = {
  reconnect(name:string): Promise<{client:MCPServerConnection}>
  toggle(name:string): Promise<MCPServerConnection>
  /** Desired-state operation avoids reversing a concurrent enable/disable. */
  setEnabled?(name:string, enabled:boolean): Promise<MCPServerConnection>
}
const usage = 'Usage: /mcp [reconnect|enable|disable [<server>|all]]. With no server name, applies to all.'
// chunk-qmbtrg7a.js:Be. No React mount, and no success count before the control settles.
export const call:LocalCommandCall = async (args,context) => {
  const input = args.trim(), lower = input.toLowerCase()
  const clients = context.getAppState().mcp.clients.filter(client => client.name !== 'ide')
  if (!input || INFO_ARGS.includes(lower)) {
    if (!clients.length) return text(`No MCP servers are configured. Add one with \`claude mcp add\`.\n${usage}`)
    const count = (type:string) => clients.filter(client => client.type === type).length
    const cached = count('cached'), pending = count('pending'), connected = count('connected'), disabled = count('disabled')
    return text(`${clients.length} MCP server(s): ${connected} connected, ${cached ? `${cached} cached, ` : ''}${pending ? `${pending} connecting, ` : ''}${clients.length-connected-cached-pending-disabled} not connected, ${disabled} disabled. Use \`/mcp\` in the terminal for details.`)
  }
  if (HELP_ARGS.includes(lower)) return text(usage)
  const match = /^(\S+)\s*(.*)$/.exec(input)!, action = match[1]!.toLowerCase(), target = match[2] || 'all'
  if (!['reconnect','enable','disable'].includes(action)) return text(`"${action}" isn't a recognized /mcp action. Try reconnect, enable, or disable.`)
  const chosen = target === 'all' ? clients : clients.filter(client => client.name === target)
  if (!chosen.length) return text(target === 'all' ? 'No MCP servers are configured. Add one with `claude mcp add`.' : `There's no MCP server named "${target}". Run \`/mcp\` in the terminal to see configured servers.`)
  const host = context.commandRuntime?.mcp ?? localMcpCommandHost(context)
  if (!host) return text("Reconnect, enable, and disable aren't available in this session.")
  const selectedType = chosen[0]!.type as string
  if (target !== 'all' && selectedType === 'needs-approval') return text(`"${target}" is pending approval. Approve it with \`/mcp\` in the terminal first.`)
  if (action === 'reconnect') {
    if (target !== 'all' && selectedType === 'disabled') return text(`"${target}" is disabled. Run \`/mcp enable ${target}\` to bring it back.`)
    if (target !== 'all' && selectedType === 'pending') return text(`"${target}" is already reconnecting — retries can take a few minutes when a server keeps failing.`)
    const retry = target === 'all' ? chosen.filter(client => client.type === 'failed' || client.type === 'needs-auth') : chosen
    if (!retry.length) return text(chosen.some(client => client.type === 'disabled') ? `${chosen.filter(client => client.type === 'disabled').length} MCP server(s) are disabled. Run \`/mcp enable all\` to bring them back.` : 'All enabled MCP servers are already connected or connecting.')
    const results = await Promise.allSettled(retry.map(client => host.reconnect(client.name)))
    const success = results.filter(result => result.status === 'fulfilled' && result.value.client.type === 'connected').length
    if (target !== 'all') {
      const result = results[0]!
      if (result.status === 'rejected' && result.reason instanceof McpCommandControlError) return text(result.reason.message)
      const auth = result.status === 'fulfilled' && result.value.client.type === 'needs-auth'
      return text(success ? `Reconnected "${target}".` : auth ? `Couldn't reconnect "${target}" (needs authentication). Authenticate with \`/mcp\` in the terminal.` : `Couldn't reconnect "${target}". Check its config with \`/mcp\` in the terminal.`)
    }
    return text(`Reconnected ${success} of ${retry.length} MCP server(s). Run \`/mcp\` in the terminal to see status.`)
  }
  const enable = action === 'enable'
  const changing = chosen.filter(client => enable ? client.type === 'disabled' : client.type !== 'disabled' && (client.type as string) !== 'needs-approval')
  if (!changing.length) return text(target === 'all' ? `All MCP servers are already ${enable ? 'enabled' : 'disabled'}.` : `"${target}" is already ${enable ? 'enabled' : 'disabled'}.`)
  const results = await Promise.allSettled(changing.map(client => host.setEnabled ? host.setEnabled(client.name,enable) : host.toggle(client.name)))
  if (target !== 'all' && results[0]?.status === 'rejected' && results[0].reason instanceof McpCommandControlError) return text(results[0].reason.message)
  const fulfilled = results.filter(result => result.status === 'fulfilled').length
  const connected = results.filter(result => result.status === 'fulfilled' && result.value.type === 'connected').length
  if (target !== 'all') return text(!fulfilled ? `Couldn't ${action} "${target}". Run \`/mcp\` in the terminal to check.` : enable && !connected ? `Enabled "${target}", but it isn't connected yet. Check its config with \`/mcp\` in the terminal.` : `${enable ? 'Enabled' : 'Disabled'} "${target}".`)
  return text(`${enable ? 'Enabled' : 'Disabled'} ${fulfilled} MCP server(s)${enable && connected < fulfilled ? ` (${fulfilled-connected} enabled but not yet connected)` : ''}${fulfilled < changing.length ? ` (${changing.length-fulfilled} couldn't be changed)` : ''}. Run \`/mcp\` in the terminal to see status.`)
}
