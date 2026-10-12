import type { ScopedMcpServerConfig } from '../services/mcp/types.js'
import { getDefaultLinuxComputerUseMcpConfig, LINUX_COMPUTER_USE_SERVER_NAME } from './linuxComputerUse/integration.js'
import { formatLinuxComputerUseDoctor } from './linuxComputerUse/integration.js'
import { selectDefaultWindowsComputerUseBackend, formatWindowsComputerUseDoctor,
  WINDOWS_COMPUTER_USE_SERVER_NAME, type WindowsComputerUseDiscoveryOptions } from './windowsComputerUse/index.js'

type DesktopConfig = {
  mcpConfig: Record<string, ScopedMcpServerConfig>
  allowedTools: string[]
  diagnostics: string[]
}

/** Startup configuration only. Connection, permission prompts and teardown stay
 * in the ordinary MCP lifecycle; no persistent config or second executor. */
export async function prepareDefaultDesktopMcp(options: {
  servers: Record<string, ScopedMcpServerConfig>
  bare: boolean
  strict: boolean
  enterprise: boolean
  nativeMacEnabled: boolean
  isDisabled(name: string): boolean
  filter(configs: Record<string, ScopedMcpServerConfig>): {
    allowed: Record<string, ScopedMcpServerConfig>; blocked: string[]
  }
  // Installed-backend and host seams for offline tests, never desktop emulation.
  platform?: NodeJS.Platform
  arch?: string
  linuxBinary?: string
  windowsDiscovery?: Pick<WindowsComputerUseDiscoveryOptions, 'executable' | 'pathForTest' | 'isFileForTest'>
  setupMac?: () => DesktopConfig | Omit<DesktopConfig, 'diagnostics'>
}): Promise<DesktopConfig> {
  const empty: DesktopConfig = { mcpConfig: {}, allowedTools: [], diagnostics: [] }
  if (options.bare || options.strict || options.enterprise) return empty
  const platform = options.platform ?? process.platform
  const arch = options.arch ?? process.arch
  let result = empty
  if (platform === 'darwin') {
    const name = 'computer-use'
    if (!options.nativeMacEnabled || options.servers[name] || options.isDisabled(name)) return empty
    if (arch !== 'x64' && arch !== 'arm64') return { ...empty, diagnostics: [`Computer use: unsupported architecture ${arch}`] }
    const setup = options.setupMac ?? (await import('./computerUse/setup.js')).setupComputerUseMCP
    result = { ...setup(), diagnostics: [] }
  } else if (platform === 'linux') {
    const name = LINUX_COMPUTER_USE_SERVER_NAME
    if (options.servers[name] || options.isDisabled(name)) return empty
    const desktop = await getDefaultLinuxComputerUseMcpConfig({
      explicitServers: options.servers, binary: options.linuxBinary,
      platformForTest: platform, archForTest: arch,
    })
    if (desktop.kind === 'configured') {
      result = { mcpConfig: { [name]: desktop.config }, allowedTools: [], diagnostics: [] }
      if (!desktop.probe.desktopReady) result.diagnostics.push(formatLinuxComputerUseDoctor(desktop.probe))
    } else if (desktop.kind === 'unavailable') {
      return { ...empty, diagnostics: [formatLinuxComputerUseDoctor(desktop.probe)] }
    } else if (desktop.kind === 'unsupported-architecture') {
      return { ...empty, diagnostics: [`Computer use: unsupported architecture ${arch}`] }
    }
  } else if (platform === 'win32') {
    const name = WINDOWS_COMPUTER_USE_SERVER_NAME
    if (options.servers[name] || options.isDisabled(name)) return empty
    const desktop = selectDefaultWindowsComputerUseBackend({ ...options.windowsDiscovery,
      target: { platform, arch },
    })
    if (desktop.kind !== 'stdio-config-ready') {
      return { ...empty, diagnostics: [formatWindowsComputerUseDoctor(desktop)] }
    }
    result = { mcpConfig: { [name]: { ...desktop.stdioConfig, scope: 'dynamic' } }, allowedTools: [], diagnostics: [] }
  }
  const filtered = options.filter(result.mcpConfig)
  return {
    mcpConfig: filtered.allowed,
    // Mac app-level request_access handles these tools' session approval. Don't
    // apply that bypass to arbitrary external/Linux MCP tools.
    allowedTools: filtered.blocked.length ? [] : result.allowedTools,
    diagnostics: [...result.diagnostics, ...filtered.blocked.map(name => `Computer use: ${name} blocked by MCP policy`)],
  }
}
