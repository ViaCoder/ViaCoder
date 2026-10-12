/** Explicit integration with the existing MCP configuration service. */
import type { McpStdioServerConfig } from '../../services/mcp/types.js'
import type { ScopedMcpServerConfig } from '../../services/mcp/types.js'
import { addMcpConfig, getMcpConfigByName } from '../../services/mcp/config.js'
import { probeLinuxComputerUse, type LinuxComputerUseProbe, type LinuxComputerUseProbeOptions } from './index.js'

export const LINUX_COMPUTER_USE_SERVER_NAME = 'linux-computer-use'

export type DefaultLinuxComputerUseMcp =
  | { kind: 'configured'; config: ScopedMcpServerConfig; probe: Extract<LinuxComputerUseProbe, { kind: 'available' }> }
  | { kind: 'explicit-config'; config: ScopedMcpServerConfig }
  | { kind: 'opted-out' }
  | { kind: 'unsupported-architecture'; platform: NodeJS.Platform; arch: string }
  | { kind: 'unavailable'; probe: Exclude<LinuxComputerUseProbe, { kind: 'available' }> }

export interface DefaultLinuxComputerUseMcpOptions extends LinuxComputerUseProbeOptions {
  /** The caller's already-resolved server map. An explicit entry always wins. */
  explicitServers?: Record<string, ScopedMcpServerConfig>
  /** A trusted/user-facing opt-out; never inferred from project configuration. */
  disabled?: boolean
  archForTest?: string
}

/**
 * Discover an installed upstream Linux desktop server for this startup only.
 * This does not write settings or start a second MCP transport: the returned
 * dynamic-scoped config is merged into the normal MCP lifecycle by the caller.
 */
export async function getDefaultLinuxComputerUseMcpConfig(
  options: DefaultLinuxComputerUseMcpOptions = {},
): Promise<DefaultLinuxComputerUseMcp> {
  if (options.disabled) return { kind: 'opted-out' }
  const explicit = options.explicitServers?.[LINUX_COMPUTER_USE_SERVER_NAME]
  if (explicit) return { kind: 'explicit-config', config: explicit }

  const platform = options.platformForTest ?? process.platform
  const arch = options.archForTest ?? process.arch
  if (platform === 'linux' && arch !== 'x64' && arch !== 'arm64') {
    return { kind: 'unsupported-architecture', platform, arch }
  }
  if (platform !== 'linux') {
    return { kind: 'unavailable', probe: { kind: 'unsupported-platform', platform } }
  }

  const probe = await doctorLinuxComputerUse(options)
  if (probe.kind !== 'available') return { kind: 'unavailable', probe }
  return {
    kind: 'configured',
    config: { ...probe.stdioConfig, scope: 'dynamic' },
    probe,
  }
}

export type RegistrationResult =
  | { kind: 'registered'; binaryPath: string; desktopReady: boolean }
  | { kind: 'already-registered'; binaryPath: string; desktopReady: boolean }
  | { kind: 'name-conflict'; binaryPath: string }
  | { kind: 'probe-unavailable'; probe: Exclude<LinuxComputerUseProbe, { kind: 'available' }> }

/** Narrow port permits offline tests without touching the operator's MCP settings. */
export interface McpConfigPort {
  get(name: string): { type?: string; command?: string; args?: string[] } | null
  add(name: string, config: McpStdioServerConfig, scope: 'local'): Promise<void>
}

const liveMcpConfig: McpConfigPort = {
  get: getMcpConfigByName,
  add: (name, config, scope) => addMcpConfig(name, config, scope),
}

/** No installation, service spawn, desktop action, settings mutation, or accessibility setup. */
export async function doctorLinuxComputerUse(
  options: LinuxComputerUseProbeOptions = {},
): Promise<LinuxComputerUseProbe> {
  return probeLinuxComputerUse(options)
}

/**
 * Persist only an explicit, doctor-validated stdio MCP entry through the normal
 * config service. The existing MCP lifecycle connects it on the next session;
 * this function deliberately does not create a second tool engine.
 */
export async function registerInstalledLinuxComputerUse(
  options: LinuxComputerUseProbeOptions = {},
  config: McpConfigPort = liveMcpConfig,
): Promise<RegistrationResult> {
  const probe = await doctorLinuxComputerUse(options)
  if (probe.kind !== 'available') return { kind: 'probe-unavailable', probe }

  const existing = config.get(LINUX_COMPUTER_USE_SERVER_NAME)
  if (existing) {
    const same = (existing.type === 'stdio' || existing.type === undefined) && existing.command === probe.binaryPath &&
      existing.args?.length === 1 && existing.args[0] === 'mcp'
    return same
      ? { kind: 'already-registered', binaryPath: probe.binaryPath, desktopReady: probe.desktopReady }
      : { kind: 'name-conflict', binaryPath: probe.binaryPath }
  }
  await config.add(LINUX_COMPUTER_USE_SERVER_NAME, probe.stdioConfig, 'local')
  return { kind: 'registered', binaryPath: probe.binaryPath, desktopReady: probe.desktopReady }
}

/** Check-success fields are intentionally not called capability readiness. */
export function formatLinuxComputerUseDoctor(probe: LinuxComputerUseProbe): string {
  switch (probe.kind) {
    case 'unsupported-platform': return `Linux computer use: unsupported platform (${probe.platform}).`
    case 'binary-not-found': return `Linux computer use: executable not found (${probe.searched}).`
    case 'doctor-failed': return `Linux computer use: doctor failed (${probe.reason}).`
    case 'invalid-doctor-report': return `Linux computer use: invalid doctor report (${probe.reason}).`
    case 'mcp-unavailable': return `Linux computer use: doctor reports MCP registration unavailable. ${probe.report.readiness.recommended_next_step}`
    case 'available': {
      const r = probe.report.readiness
      const lines = [
        `Linux computer use: installed binary ${probe.binaryPath}`,
        'MCP tools: registerable (not a connection or action result)',
        'Capability flags below are upstream doctor reports, not verified actions:',
        `Accessibility tree: ${r.can_build_accessibility_tree ? 'reported available' : 'reported blocked'}`,
        `Window query: ${r.can_query_windows ? 'reported available' : 'reported blocked'}`,
        `Window focus: ${r.can_focus_windows ? 'reported available' : 'reported blocked'}`,
        `Development input: ${r.can_send_development_input ? 'reported available' : 'reported blocked'}`,
        `Screenshots: ${r.can_capture_screenshots ? 'reported available' : 'reported blocked'}`,
        `Full reported desktop readiness: ${probe.desktopReady ? 'yes' : 'no'}`,
      ]
      if (r.blockers.length) lines.push(`Blockers: ${r.blockers.join('; ')}`)
      return lines.join('\n')
    }
  }
}
