import type { AppState } from '../../state/AppStateStore.js'
import { hasConfirmedMcpSkillResourceRoot } from '../../skills/mcpSkills.js'
import { ListMcpResourcesTool } from '../../tools/ListMcpResourcesTool/ListMcpResourcesTool.js'
import { ReadMcpResourceTool } from '../../tools/ReadMcpResourceTool/ReadMcpResourceTool.js'
import { hashMcpConfig } from './utils.js'
import { getMcpConnectedProducer287 } from './connectedProducer287.js'

type McpSnapshot = AppState['mcp']
const helperNames = new Set([ListMcpResourcesTool.name, ReadMcpResourceTool.name])

export function isMcpResourceHelperName(name: string): boolean {
  return helperNames.has(name)
}

/** Derive shared helper availability from the current, actual connection pool.
 * A V2 status without its matching open runtime is not evidence of a live peer.
 * No separate owner/refcount survives remove, reconnect, or /clear. */
export function projectMcpResourceHelperTools(mcp: McpSnapshot): McpSnapshot['tools'] {
  let canList = false
  let canRead = false
  for (const status of mcp.clients) {
    if (status.type === 'connected') {
      const resources = Boolean(status.capabilities?.resources)
      canList ||= resources
      canRead ||= resources || hasConfirmedMcpSkillResourceRoot(status)
    } else if (status.type === 'v2-connected') {
      const live = mcp.v2Clients.find(client => client.name === status.name &&
        !client.isClosed() && client.config.scope === status.config.scope &&
        hashMcpConfig(client.config) === hashMcpConfig(status.config))
      if (!live) continue
      const resources = Boolean(live.capabilities.resources)
      canList ||= resources
      canRead ||= resources || hasConfirmedMcpSkillResourceRoot(live)
    }
  }
  const directory = getMcpConnectedProducer287().resourceDirectoryTool
  return [
    ...mcp.tools.filter(tool => !helperNames.has(tool.name) && tool.name !== directory.name),
    ...(canList ? [ListMcpResourcesTool] : []),
    ...(canRead ? [ReadMcpResourceTool] : []),
    ...(canList ? [directory] : []),
  ]
}

/** Original UYn reads one turn pool. Local C retains V2 status/runtime pools;
 * project only matching open actual objects at this read boundary. No cast,
 * client alias, cache, or qualification change; stale status stays negative. */
export function getMcpToolTurnClients287(options:Pick<import('../../Tool.js').ToolUseContext['options'],'mcpClients'|'mcpV2Clients'>):readonly import('../../utils/officialMcpAttachments287/native.js').McpLiveClient287[] {
  return options.mcpClients.map(status=>{
    if(status.type!=='v2-connected')return status
    const live=options.mcpV2Clients?.find(client=>client.name===status.name&&
      !client.isClosed()&&client.config.scope===status.config.scope&&
      hashMcpConfig(client.config)===hashMcpConfig(status.config))
    return live??status
  })
}
