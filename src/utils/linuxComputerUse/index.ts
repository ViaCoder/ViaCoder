/**
 * Read-only adapter for the already-installed computer-use-linux v0.7.3 binary.
 * Upstream contract: agent-sh/computer-use-linux@579ff7cc61cf679627cdd32338fcf20960b71e6e
 * (MIT); src/cli.rs (`doctor`, `mcp`) and src/diagnostics.rs (DoctorReport).
 * No desktop action, installer, MCP registration, or model change occurs here.
 */
import { execFile } from 'node:child_process'
import { access, stat } from 'node:fs/promises'
import { delimiter, isAbsolute, join } from 'node:path'
import { constants } from 'node:fs'
import { z } from 'zod/v4'
import type { McpStdioServerConfig } from '../../services/mcp/types.js'

const Check = z.object({ ok: z.boolean(), detail: z.string() })
const OptionalString = z.string().nullable()

/** Exact serialized field names from upstream diagnostics.rs DoctorReport. */
export const LinuxComputerUseDoctorReport = z.object({
  platform: z.object({
    os: z.string(), arch: z.string(), desktop_session: OptionalString,
    xdg_session_type: OptionalString, xdg_current_desktop: OptionalString,
    wayland_display: OptionalString, display: OptionalString,
    xauthority: OptionalString, dbus_session_bus_address: OptionalString,
    xdg_runtime_dir: OptionalString, gnome_shell_version: Check,
    gnome_screenshot: Check, x11_display: Check,
  }),
  portals: z.object({
    desktop_portal: Check, remote_desktop: Check, screencast: Check,
    screenshot: Check, input_capture: Check, mutter_remote_desktop: Check,
    mutter_screencast: Check,
  }),
  accessibility: z.object({
    at_spi_bus: Check, toolkit_accessibility: Check,
    at_spi_enabled: Check, screen_reader_enabled: Check,
  }),
  windowing: z.object({
    gnome_shell_introspect: Check, computer_use_linux_gnome_shell_extension: Check,
    cosmic_helper: Check, kwin: Check, hyprland: Check,
    backends: z.record(z.string(), Check),
    can_list_windows: z.boolean(), can_focus_apps: z.boolean(),
    can_focus_windows: z.boolean(), note: z.string(),
  }),
  input: z.object({
    ydotool: Check, ydotoold: Check, ydotool_socket: Check,
    uinput: Check, xdotool: Check, wtype: Check,
  }),
  readiness: z.object({
    can_register_mcp_tools: z.boolean(),
    can_build_accessibility_tree: z.boolean(),
    can_query_windows: z.boolean(), can_focus_apps: z.boolean(),
    can_focus_windows: z.boolean(), can_send_development_input: z.boolean(),
    can_capture_screenshots: z.boolean(),
    recommended_next_step: z.string(), blockers: z.array(z.string()),
  }),
  capabilities: z.object({
    input: z.array(z.string()), screenshot: z.array(z.string()),
    window_control: z.array(z.string()), accessibility: z.array(z.string()),
    isolation: z.array(z.string()),
    preferred: z.object({
      input: OptionalString, screenshot: OptionalString,
      window_control: OptionalString,
    }),
  }),
})

export type LinuxComputerUseDoctorReport = z.infer<typeof LinuxComputerUseDoctorReport>

export type LinuxComputerUseProbe =
  | { kind: 'unsupported-platform'; platform: NodeJS.Platform }
  | { kind: 'binary-not-found'; searched: string }
  | { kind: 'doctor-failed'; binaryPath: string; reason: string }
  | { kind: 'invalid-doctor-report'; binaryPath: string; reason: string }
  | { kind: 'mcp-unavailable'; binaryPath: string; report: LinuxComputerUseDoctorReport }
  | {
      kind: 'available'
      binaryPath: string
      report: LinuxComputerUseDoctorReport
      /** Reported readiness only, not proof of a successful desktop action. */
      desktopReady: boolean
      /** Pass under a chosen server name to the existing MCP config service. */
      stdioConfig: McpStdioServerConfig
    }

export interface LinuxComputerUseProbeOptions {
  /** Absolute path or PATH command name; defaults to computer-use-linux. */
  binary?: string
  /** Test seam; omit in production so the host platform is enforced. */
  platformForTest?: NodeJS.Platform
  /** Test seam for PATH discovery. */
  pathForTest?: string
}

async function executable(path: string): Promise<boolean> {
  try {
    if (!(await stat(path)).isFile()) return false
    await access(path, constants.X_OK)
    return true
  } catch {
    return false
  }
}

async function resolveBinary(name: string, pathValue: string): Promise<string | undefined> {
  if (isAbsolute(name)) return await executable(name) ? name : undefined
  // A relative path would depend on the caller's working directory; accept only
  // a simple PATH command name to keep the launch configuration deterministic.
  if (name.includes('/') || !name || name === '.' || name === '..') return undefined
  for (const dir of pathValue.split(delimiter)) {
    if (!dir || !isAbsolute(dir)) continue
    const candidate = join(dir, name)
    if (await executable(candidate)) return candidate
  }
  return undefined
}

function runDoctor(binaryPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(binaryPath, ['doctor'], {
      encoding: 'utf8', timeout: 15_000, maxBuffer: 1_048_576,
      windowsHide: true,
    }, (error, stdout) => error ? reject(error) : resolve(stdout))
  })
}

function desktopReady(report: LinuxComputerUseDoctorReport): boolean {
  const readiness = report.readiness
  return readiness.blockers.length === 0 &&
    readiness.can_build_accessibility_tree && readiness.can_query_windows &&
    readiness.can_focus_apps && readiness.can_focus_windows &&
    readiness.can_send_development_input && readiness.can_capture_screenshots
}

/**
 * Probe the upstream binary only. Never invokes `setup`, `mcp`, or a desktop tool.
 * `stdioConfig` inherits the caller's Linux desktop environment at launch.
 */
export async function probeLinuxComputerUse(
  options: LinuxComputerUseProbeOptions = {},
): Promise<LinuxComputerUseProbe> {
  const platform = options.platformForTest ?? process.platform
  if (platform !== 'linux') return { kind: 'unsupported-platform', platform }

  const requested = options.binary ?? 'computer-use-linux'
  const binaryPath = await resolveBinary(requested, options.pathForTest ?? process.env.PATH ?? '')
  if (!binaryPath) return { kind: 'binary-not-found', searched: requested }

  let stdout: string
  try {
    stdout = await runDoctor(binaryPath)
  } catch (error) {
    return {
      kind: 'doctor-failed', binaryPath,
      reason: error instanceof Error ? error.message : String(error),
    }
  }

  let decoded: unknown
  try {
    decoded = JSON.parse(stdout)
  } catch {
    return { kind: 'invalid-doctor-report', binaryPath, reason: 'doctor stdout is not JSON' }
  }
  const parsed = LinuxComputerUseDoctorReport.safeParse(decoded)
  if (!parsed.success) {
    return { kind: 'invalid-doctor-report', binaryPath, reason: 'doctor JSON does not match v0.7.3 DoctorReport' }
  }
  const report = parsed.data
  if (report.platform.os !== 'linux') {
    return { kind: 'invalid-doctor-report', binaryPath, reason: 'doctor did not report Linux' }
  }
  if (!report.readiness.can_register_mcp_tools) {
    return { kind: 'mcp-unavailable', binaryPath, report }
  }
  return {
    kind: 'available', binaryPath, report, desktopReady: desktopReady(report),
    stdioConfig: { type: 'stdio', command: binaryPath, args: ['mcp'] },
  }
}
