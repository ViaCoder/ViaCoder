#!/usr/bin/env node
/**
 * Read-only, model-free acceptance for an already staged v0.7.3 Linux binary.
 * Only: SHA-256, CLI `doctor`, stdio initialize, tools/list, tools/call doctor.
 * No setup, desktop action, install, or window manipulation.
 */
import { execFile, spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'

const PROTOCOL = '2024-11-05'
const SERVER_NAME = 'computer-use-linux'
const SERVER_VERSION = '0.7.3'
const DOCTOR_TIMEOUT_MS = 30_000
const MCP_TIMEOUT_MS = 20_000
const MAX_OUTPUT_BYTES = 2_000_000

function fail(stage, reason) {
  throw Object.assign(new Error(reason), { stage })
}

function object(value, field) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('contract', `${field} must be an object`)
  return value
}

function field(value, key, type, prefix) {
  if (typeof value[key] !== type) fail('contract', `${prefix}.${key} must be ${type}`)
}

function check(value, prefix) {
  object(value, prefix)
  field(value, 'ok', 'boolean', prefix)
  field(value, 'detail', 'string', prefix)
}

function nullableString(value, key, prefix) {
  if (value[key] !== null && typeof value[key] !== 'string') {
    fail('contract', `${prefix}.${key} must be string|null`)
  }
}

function strings(value, prefix) {
  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
    fail('contract', `${prefix} must be string[]`)
  }
}

/** Serialized fields of diagnostics.rs::DoctorReport at the fixed source ref. */
export function validateDoctorReport(value) {
  object(value, 'doctor')
  const platform = object(value.platform, 'platform')
  for (const key of ['os', 'arch']) field(platform, key, 'string', 'platform')
  for (const key of [
    'desktop_session', 'xdg_session_type', 'xdg_current_desktop', 'wayland_display',
    'display', 'xauthority', 'dbus_session_bus_address', 'xdg_runtime_dir',
  ]) nullableString(platform, key, 'platform')
  for (const key of ['gnome_shell_version', 'gnome_screenshot', 'x11_display']) check(platform[key], `platform.${key}`)

  const portals = object(value.portals, 'portals')
  for (const key of [
    'desktop_portal', 'remote_desktop', 'screencast', 'screenshot', 'input_capture',
    'mutter_remote_desktop', 'mutter_screencast',
  ]) check(portals[key], `portals.${key}`)

  const accessibility = object(value.accessibility, 'accessibility')
  for (const key of ['at_spi_bus', 'toolkit_accessibility', 'at_spi_enabled', 'screen_reader_enabled']) {
    check(accessibility[key], `accessibility.${key}`)
  }

  const windowing = object(value.windowing, 'windowing')
  for (const key of [
    'gnome_shell_introspect', 'computer_use_linux_gnome_shell_extension',
    'cosmic_helper', 'kwin', 'hyprland',
  ]) check(windowing[key], `windowing.${key}`)
  for (const [key, entry] of Object.entries(object(windowing.backends, 'windowing.backends'))) {
    check(entry, `windowing.backends.${key}`)
  }
  for (const key of ['can_list_windows', 'can_focus_apps', 'can_focus_windows']) field(windowing, key, 'boolean', 'windowing')
  field(windowing, 'note', 'string', 'windowing')

  const input = object(value.input, 'input')
  for (const key of ['ydotool', 'ydotoold', 'ydotool_socket', 'uinput', 'xdotool', 'wtype']) {
    check(input[key], `input.${key}`)
  }

  const readiness = object(value.readiness, 'readiness')
  for (const key of [
    'can_register_mcp_tools', 'can_build_accessibility_tree', 'can_query_windows',
    'can_focus_apps', 'can_focus_windows', 'can_send_development_input',
    'can_capture_screenshots',
  ]) field(readiness, key, 'boolean', 'readiness')
  field(readiness, 'recommended_next_step', 'string', 'readiness')
  strings(readiness.blockers, 'readiness.blockers')

  const capabilities = object(value.capabilities, 'capabilities')
  for (const key of ['input', 'screenshot', 'window_control', 'accessibility', 'isolation']) {
    strings(capabilities[key], `capabilities.${key}`)
  }
  const preferred = object(capabilities.preferred, 'capabilities.preferred')
  for (const key of ['input', 'screenshot', 'window_control']) nullableString(preferred, key, 'capabilities.preferred')
  if (platform.os !== 'linux') fail('contract', 'doctor platform.os is not linux')
  return value
}

async function sha256(path) {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(path)) hash.update(chunk)
  return hash.digest('hex')
}

function readCliDoctor(binary) {
  return new Promise((resolve, reject) => {
    execFile(binary, ['doctor'], {
      encoding: 'utf8', timeout: DOCTOR_TIMEOUT_MS, maxBuffer: MAX_OUTPUT_BYTES,
      env: safeChildEnv(),
    }, (error, stdout) => {
      if (error) return reject(Object.assign(new Error('CLI doctor failed or timed out'), { stage: 'cli-doctor' }))
      try {
        resolve(validateDoctorReport(JSON.parse(stdout)))
      } catch (cause) {
        reject(Object.assign(new Error(`CLI doctor response invalid: ${cause.message}`), { stage: 'cli-doctor' }))
      }
    })
  })
}

function safeChildEnv() {
  return {
    ...process.env,
    COMPUTER_USE_LINUX_ENABLE_SHELL: '0',
    COMPUTER_USE_LINUX_NOTIFY_ON_COMPLETE: '0',
  }
}

export function startMcp(binary) {
  const child = spawn(binary, ['mcp'], { stdio: ['pipe', 'pipe', 'pipe'], env: safeChildEnv() })
  const pending = new Map()
  const lines = createInterface({ input: child.stdout, crlfDelay: Infinity })
  let nextId = 1
  let stdoutBytes = 0
  let closed = false
  const abort = reason => {
    if (closed) return
    closed = true
    for (const item of pending.values()) {
      clearTimeout(item.timer)
      item.reject(Object.assign(new Error(reason), { stage: 'mcp' }))
    }
    pending.clear()
  }
  child.stdout.on('data', chunk => {
    stdoutBytes += chunk.length
    if (stdoutBytes > MAX_OUTPUT_BYTES) {
      abort('MCP stdout exceeded bounded output')
      child.kill('SIGTERM')
    }
  })
  child.stderr.resume() // Drain diagnostics; never print potentially sensitive session details.
  child.on('error', () => abort('MCP process failed to start'))
  child.on('exit', () => abort('MCP process exited before response'))
  lines.on('line', line => {
    if (closed) return
    let message
    try { message = JSON.parse(line) } catch {
      abort('MCP stdout was not JSON-RPC')
      child.kill('SIGTERM')
      return
    }
    if (message.id === undefined) return
    const item = pending.get(message.id)
    if (!item) return
    pending.delete(message.id)
    clearTimeout(item.timer)
    if (message.error) item.reject(Object.assign(new Error('MCP returned JSON-RPC error'), { stage: 'mcp' }))
    else item.resolve(message.result)
  })
  const send = message => {
    if (closed) fail('mcp', 'MCP process is closed')
    child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', ...message })}\n`)
  }
  return {
    request(method, params) {
      const id = nextId++
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(id)
          reject(Object.assign(new Error(`${method} timed out`), { stage: 'mcp' }))
        }, MCP_TIMEOUT_MS)
        pending.set(id, { resolve, reject, timer })
        send({ id, method, params })
      })
    },
    notify(method) { send({ method }) },
    close() {
      abort('MCP acceptance complete')
      lines.close()
      child.stdin.end()
      if (child.exitCode === null) child.kill('SIGTERM')
    },
  }
}

function mcpDoctorContent(result) {
  object(result, 'tools/call result')
  if (result.isError === true) fail('mcp-doctor', 'MCP doctor returned a tool error')
  if (result.structuredContent !== undefined) return validateDoctorReport(result.structuredContent)
  const text = result.content?.find(item => item?.type === 'text')?.text
  if (typeof text !== 'string') fail('mcp-doctor', 'MCP doctor returned no structured or text report')
  try { return validateDoctorReport(JSON.parse(text)) } catch (cause) {
    fail('mcp-doctor', `MCP doctor report invalid: ${cause.message}`)
  }
}

function doctorSummary(report) {
  const r = report.readiness
  // Upstream diagnostics.rs::check_detail_contains_true requires BOTH a
  // successful command and literal "true" in detail. Check.ok alone means the
  // gsettings / org.a11y.Status query succeeded, not that it is enabled.
  const reportedTrue = check => check.ok && check.detail.toLowerCase().includes('true')
  return {
    platform: {
      os: report.platform.os, arch: report.platform.arch,
      sessionType: report.platform.xdg_session_type,
      displayPresent: Boolean(report.platform.display),
      waylandDisplayPresent: Boolean(report.platform.wayland_display),
      sessionBusPresent: Boolean(report.platform.dbus_session_bus_address),
      nativeX11Display: report.platform.x11_display.ok,
    },
    accessibility: {
      atSpiBusAddressQuerySucceeded: report.accessibility.at_spi_bus.ok,
      atSpiStatusCheckSucceeded: report.accessibility.at_spi_enabled.ok,
      atSpiStatusReportedTrue: reportedTrue(report.accessibility.at_spi_enabled),
      toolkitSettingCheckSucceeded: report.accessibility.toolkit_accessibility.ok,
      toolkitSettingReportedTrue: reportedTrue(report.accessibility.toolkit_accessibility),
      canBuildAccessibilityTree: r.can_build_accessibility_tree,
    },
    windowing: {
      canList: report.windowing.can_list_windows,
      canFocusApps: report.windowing.can_focus_apps,
      canFocusWindows: report.windowing.can_focus_windows,
      backends: Object.fromEntries(Object.entries(report.windowing.backends).map(([name, value]) => [name, value.ok])),
    },
    input: { xdotool: report.input.xdotool.ok, ydotool: report.input.ydotool.ok, ydotoolSocket: report.input.ydotool_socket.ok },
    readiness: r,
    preferred: report.capabilities.preferred,
  }
}

/** Accept protocol/diagnostics only; full desktop acceptance requires separate fixture-window actions. */
export async function acceptLinuxComputerUse({ binary, expectedSha256, platformForTest } = {}) {
  if ((platformForTest ?? process.platform) !== 'linux') fail('preflight', 'Linux host required')
  if (!binary || !isAbsolute(binary)) fail('preflight', 'absolute --binary path required')
  if (!/^[a-f0-9]{64}$/i.test(expectedSha256 ?? '')) fail('preflight', '64-hex --sha256 required')
  if (!(await stat(binary)).isFile()) fail('preflight', 'binary is not a regular file')
  await access(binary, constants.X_OK)
  const actualSha256 = await sha256(binary)
  if (actualSha256.toLowerCase() !== expectedSha256.toLowerCase()) fail('preflight', 'binary SHA-256 mismatch')

  const cliReport = await readCliDoctor(binary)
  const mcp = startMcp(binary)
  try {
    const initialized = object(await mcp.request('initialize', {
      protocolVersion: PROTOCOL,
      capabilities: {},
      clientInfo: { name: 'local-linux-computer-use-acceptance', version: '1.0.0' },
    }), 'initialize result')
    if (initialized.protocolVersion !== PROTOCOL) fail('mcp', 'unexpected MCP protocol version')
    if (initialized.serverInfo?.name !== SERVER_NAME || initialized.serverInfo?.version !== SERVER_VERSION) {
      fail('mcp', 'unexpected MCP server identity/version')
    }
    mcp.notify('notifications/initialized')

    const listed = object(await mcp.request('tools/list', {}), 'tools/list result')
    if (!Array.isArray(listed.tools)) fail('mcp', 'tools/list returned no tools array')
    const doctorTool = listed.tools.find(tool => tool?.name === 'doctor')
    if (!doctorTool) fail('mcp', 'doctor tool not registered')
    if (doctorTool.annotations?.readOnlyHint !== true || doctorTool.annotations?.destructiveHint !== false) {
      fail('mcp', 'doctor tool read-only annotations differ from upstream')
    }
    const mcpReport = mcpDoctorContent(await mcp.request('tools/call', {
      name: 'doctor', arguments: {},
    }))
    if (mcpReport.platform.os !== cliReport.platform.os || mcpReport.platform.arch !== cliReport.platform.arch) {
      fail('mcp-doctor', 'CLI and MCP doctor platform differ')
    }
    return {
      ok: true,
      acceptance: 'binary-hash+cli-doctor+stdio-mcp-doctor',
      fullDesktopAcceptance: false,
      binarySha256: actualSha256,
      mcp: { protocolVersion: initialized.protocolVersion, serverInfo: initialized.serverInfo,
        doctorReadOnly: true, toolNames: listed.tools.map(tool => tool.name) },
      cliDoctor: doctorSummary(cliReport),
      mcpDoctor: doctorSummary(mcpReport),
    }
  } finally {
    mcp.close()
  }
}

function parseArgs(args) {
  const result = {}
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]
    if (!['--binary', '--sha256'].includes(key) || !args[i + 1]) fail('preflight', 'usage: --binary ABSOLUTE_PATH --sha256 HEX')
    result[key === '--binary' ? 'binary' : 'expectedSha256'] = args[i + 1]
  }
  return result
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(JSON.stringify(await acceptLinuxComputerUse(parseArgs(process.argv.slice(2))), null, 2))
  } catch (error) {
    console.error(JSON.stringify({ ok: false, stage: error.stage ?? 'preflight', reason: error.message }))
    process.exitCode = 1
  }
}
