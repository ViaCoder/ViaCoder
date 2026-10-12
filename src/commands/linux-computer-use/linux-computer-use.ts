import type { LocalCommandCall } from '../../types/command.js'
import { text } from '../noninteractive/types.js'
import {
  doctorLinuxComputerUse, formatLinuxComputerUseDoctor, registerInstalledLinuxComputerUse,
} from '../../utils/linuxComputerUse/integration.js'

const usage = 'Usage: /linux-computer-use [doctor|register] [absolute-binary-path]'

export const call: LocalCommandCall = async args => {
  const parts = args.trim().split(/\s+/).filter(Boolean)
  const action = parts[0] ?? 'doctor'
  if (!['doctor', 'register'].includes(action) || parts.length > 2) return text(usage)
  const options = parts[1] ? { binary: parts[1] } : {}
  if (action === 'doctor') return text(formatLinuxComputerUseDoctor(await doctorLinuxComputerUse(options)))
  try {
    const result = await registerInstalledLinuxComputerUse(options)
    switch (result.kind) {
      case 'registered':
        return text(`Registered installed Linux computer use as a local MCP server. Start a new session to connect it. Reported full desktop readiness: ${result.desktopReady ? 'yes' : 'no'}.`)
      case 'already-registered': return text('Linux computer use is already configured as an MCP server. Check /mcp for connection status.')
      case 'name-conflict': return { type: 'text', level: 'error', value: 'MCP name linux-computer-use is already configured differently; no changes made.' }
      case 'probe-unavailable': return { type: 'text', level: 'error', value: formatLinuxComputerUseDoctor(result.probe) }
    }
  } catch (error) {
    return { type: 'text', level: 'error', value: error instanceof Error ? error.message : String(error) }
  }
}
