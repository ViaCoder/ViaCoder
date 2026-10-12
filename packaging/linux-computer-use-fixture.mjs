#!/usr/bin/env node
/**
 * GNOME X11 / GTK3 owned-window AT-SPI test for upstream v0.7.3.
 * Read-only by default. --enable-accessibility calls upstream setup once;
 * --exercise-at-spi-actions mutates only this owned GTK fixture via semantic
 * AT-SPI actions. No window backend install, screenshots, or global input.
 */
import { spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { createInterface } from 'node:readline'
import { setTimeout as sleep } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'
import { acceptLinuxComputerUse, startMcp } from './linux-computer-use-acceptance.mjs'

const PROTOCOL = '2024-11-05'
const FIXTURE_PYTHON = String.raw`
import gi
import sys
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk, GLib

marker = sys.argv[1]
window = Gtk.Window(title=marker)
window.set_default_size(420, 120)
window.set_focus_on_map(False)
window.set_accept_focus(False)
window.connect('destroy', Gtk.main_quit)
window.get_accessible().set_name(marker)
box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=8)
entry = Gtk.Entry()
entry.set_text('initial')
entry.get_accessible().set_name(marker + '_ENTRY')
button = Gtk.Button(label='Fixture activate')
button.get_accessible().set_name(marker + '_BUTTON')
status = Gtk.Label(label=marker + '_STATUS_INITIAL')
status.get_accessible().set_name(marker + '_STATUS_INITIAL')

def activated(_button):
    value = marker + '_STATUS_ACTIVATED_' + entry.get_text()
    status.set_text(value)
    status.get_accessible().set_name(value)

button.connect('clicked', activated)
box.pack_start(entry, False, False, 0)
box.pack_start(button, False, False, 0)
box.pack_start(status, False, False, 0)
window.add(box)
window.show_all()

def ready():
    print('READY', flush=True)
    return False

GLib.idle_add(ready)
Gtk.main()
`

function fail(stage, reason) {
  throw Object.assign(new Error(reason), { stage })
}

function toolJson(result, tool) {
  if (!result || result.isError === true) fail(tool, `${tool} tool returned error`)
  if (result.content?.some(item => item?.type === 'image')) {
    fail(tool, `${tool} unexpectedly returned image content`)
  }
  if (result.structuredContent && typeof result.structuredContent === 'object') {
    return result.structuredContent
  }
  const text = result.content?.find(item => item?.type === 'text')?.text
  if (typeof text !== 'string') fail(tool, `${tool} returned no JSON report`)
  try { return JSON.parse(text) } catch { fail(tool, `${tool} text is not JSON`) }
}

function markerInNode(node, marker) {
  return [node?.name, node?.description, node?.text?.content]
    .some(value => typeof value === 'string' && value.includes(marker))
}

export function scopedStateArgs(pid, marker) {
  return {
    pid, app_name_or_bundle_identifier: marker,
    include_screenshot: false, max_nodes: 80, max_depth: 6, verbose: false,
  }
}

/** Only evaluates a PID-scoped report; never returns raw accessibility content. */
export function evaluateScopedFixtureState(state, marker) {
  if (!state || typeof state !== 'object' || state.backend !== 'linux-atspi') {
    fail('fixture-state', 'get_app_state output is not Linux AT-SPI state')
  }
  if (state.screenshot !== null || state.screenshot_error !== null) {
    fail('fixture-state', 'screenshot was attempted despite include_screenshot=false')
  }
  if (!Array.isArray(state.accessibility_tree) || typeof state.tree_scoped !== 'boolean') {
    fail('fixture-state', 'get_app_state tree fields differ from upstream schema')
  }
  if (state.app_name_or_bundle_identifier !== marker) {
    fail('fixture-state', 'get_app_state did not preserve the unique fixture scope')
  }
  if (!state.readiness || typeof state.readiness.can_build_accessibility_tree !== 'boolean') {
    fail('fixture-state', 'get_app_state readiness differs from upstream schema')
  }
  if (!state.readiness.can_build_accessibility_tree) {
    return { fixtureAcceptance: 'blocked-by-at-spi-readiness', nodeCount: 0, markerFound: false }
  }
  if (state.tree_scoped !== true) {
    // No tree inspection or content output after a failed scope.
    return { fixtureAcceptance: 'scope-not-verified', nodeCount: 0, markerFound: false }
  }
  if (state.accessibility_error !== null) {
    return { fixtureAcceptance: 'at-spi-query-error', nodeCount: 0, markerFound: false }
  }
  const markerFound = state.accessibility_tree.some(node => markerInNode(node, marker))
  return {
    fixtureAcceptance: markerFound ? 'owned-gtk3-tree-observed' : 'fixture-marker-not-observed',
    nodeCount: state.accessibility_tree.length,
    markerFound,
  }
}

function requireOwnedState(state, marker) {
  const evaluated = evaluateScopedFixtureState(state, marker)
  if (evaluated.fixtureAcceptance !== 'owned-gtk3-tree-observed') {
    fail('fixture-action', `owned fixture tree unavailable: ${evaluated.fixtureAcceptance}`)
  }
  return state.accessibility_tree
}

export function fixtureActionTargets(state, marker) {
  const tree = requireOwnedState(state, marker)
  const entry = tree.find(node => node?.name === `${marker}_ENTRY`
    && node.supports_editable_text === true && Number.isInteger(node.index))
  const button = tree.find(node => node?.name === `${marker}_BUTTON`
    && Number.isInteger(node.index) && Array.isArray(node.actions))
  const action = button?.actions.find(item => Number.isInteger(item?.index)
    && ['click', 'press'].includes(String(item.name).toLowerCase()))
  if (!entry || !button || !action || entry.index === button.index) {
    fail('fixture-action', 'owned Entry/AT-SPI Button action not uniquely available')
  }
  if (tree.filter(node => node?.name === `${marker}_ENTRY`).length !== 1
    || tree.filter(node => node?.name === `${marker}_BUTTON`).length !== 1) {
    fail('fixture-action', 'owned Entry/Button names are not unique')
  }
  return { entryIndex: entry.index, buttonIndex: button.index, buttonAction: String(action.index) }
}

function entryValueVerified(state, marker, value) {
  const tree = requireOwnedState(state, marker)
  const matches = tree.filter(node => node?.name === `${marker}_ENTRY`)
  return matches.length === 1 && matches[0].text?.content === value
}

function buttonEffectVerified(state, marker, value) {
  const tree = requireOwnedState(state, marker)
  const expected = `${marker}_STATUS_ACTIVATED_${value}`
  return tree.some(node => node?.name === expected || node?.text?.content === expected)
}

function requireActionTool(tools, name, fields) {
  const tool = tools?.find(item => item?.name === name)
  if (!tool || tool.annotations?.readOnlyHint !== false
    || tool.annotations?.destructiveHint !== true
    || tool.annotations?.idempotentHint !== false
    || fields.some(field => !tool.inputSchema?.properties?.[field])) {
    fail('fixture-action', `${name} schema/annotations differ from upstream`)
  }
}

function requireActionSuccess(result, name) {
  if (result?.ok !== true || result?.implemented !== true || result?.action !== name) {
    fail('fixture-action', `${name} did not report a successful AT-SPI action`)
  }
}

async function waitForOwnedState(mcp, args, marker, predicate, failure) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const state = toolJson(await mcp.request('tools/call', {
      name: 'get_app_state', arguments: args,
    }), 'get_app_state')
    requireOwnedState(state, marker)
    if (predicate(state)) return state
    if (attempt < 3) await sleep(150)
  }
  fail('fixture-action', failure)
}

/** Same MCP process, refreshed snapshot indices, owned fixture only. */
export async function exerciseOwnedAtSpiActions(mcp, tools, pid, marker, initialState) {
  requireActionTool(tools, 'set_value', ['element_index', 'value'])
  requireActionTool(tools, 'perform_action', ['element_index', 'action'])
  const args = scopedStateArgs(pid, marker)
  const value = `${marker}_VALUE`
  const initial = fixtureActionTargets(initialState, marker)
  requireActionSuccess(toolJson(await mcp.request('tools/call', {
    name: 'set_value', arguments: { element_index: initial.entryIndex, value },
  }), 'set_value'), 'set_value')

  const afterValue = await waitForOwnedState(
    mcp, args, marker,
    state => entryValueVerified(state, marker, value),
    'owned Entry did not expose the set value',
  )
  // Re-select from the latest scoped snapshot; upstream caches indices per
  // get_app_state call, so the initial button index is not reused.
  const refreshed = fixtureActionTargets(afterValue, marker)
  requireActionSuccess(toolJson(await mcp.request('tools/call', {
    name: 'perform_action',
    arguments: { element_index: refreshed.buttonIndex, action: refreshed.buttonAction },
  }), 'perform_action'), 'perform_action')

  await waitForOwnedState(
    mcp, args, marker,
    state => buttonEffectVerified(state, marker, value),
    'owned Button effect was not observed in a fresh snapshot',
  )
  return { entryValueVerified: true, buttonEffectVerified: true }
}

function launchGtkFixture(marker) {
  const env = { ...process.env, GDK_BACKEND: 'x11' }
  // GTK3's ATK/AT-SPI bridge is built in. Do not add legacy gail/atk modules.
  // Removing an inherited disable flag affects this child only.
  delete env.NO_AT_BRIDGE
  const child = spawn('python3', ['-c', FIXTURE_PYTHON, marker], {
    stdio: ['ignore', 'pipe', 'pipe'], env,
  })
  child.stderr.resume() // Do not print a GUI process's environment or warnings.
  const lines = createInterface({ input: child.stdout })
  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('GTK3 fixture did not become ready')), 10_000)
    lines.on('line', line => {
      if (line !== 'READY') return
      clearTimeout(timer)
      resolve()
    })
    child.on('error', () => { clearTimeout(timer); reject(new Error('GTK3 fixture process failed')) })
    child.on('exit', () => { clearTimeout(timer); reject(new Error('GTK3 fixture exited before readiness')) })
  })
  return {
    pid: child.pid,
    ready,
    close() { lines.close(); if (child.exitCode === null) child.kill('SIGTERM') },
  }
}

export function fixtureReadinessGate(protocol) {
  if (protocol.cliDoctor.platform.sessionType !== 'x11' || !protocol.cliDoctor.platform.displayPresent) {
    fail('preflight', 'verified X11 session environment required')
  }
  // get_app_state consults this exact upstream readiness gate before any
  // snapshot. A child-only GTK environment cannot override it; do not open a
  // visible fixture window that the upstream tool is certain to skip.
  if (!protocol.cliDoctor.accessibility.canBuildAccessibilityTree) {
    return {
      ok: false,
      acceptance: 'blocked-by-at-spi-readiness',
      fullDesktopAcceptance: false,
      protocolAcceptance: protocol.acceptance,
      fixtureLaunched: false,
    }
  }
  return null
}

/** One exact no-argument upstream setup_accessibility MCP call. */
export async function enableAccessibilityOnce(mcp) {
  const initialized = await mcp.request('initialize', {
    protocolVersion: PROTOCOL,
    capabilities: {},
    clientInfo: { name: 'local-owned-gtk3-fixture-setup', version: '1.0.0' },
  })
  if (initialized?.protocolVersion !== PROTOCOL || initialized?.serverInfo?.name !== 'computer-use-linux'
    || initialized?.serverInfo?.version !== '0.7.3') {
    fail('setup-accessibility', 'setup MCP handshake differs from upstream')
  }
  mcp.notify('notifications/initialized')
  const listed = await mcp.request('tools/list', {})
  const setupTool = listed?.tools?.find(tool => tool?.name === 'setup_accessibility')
  if (!setupTool || setupTool.annotations?.readOnlyHint !== false
    || setupTool.annotations?.destructiveHint !== false
    || setupTool.annotations?.idempotentHint !== true
    || Object.keys(setupTool.inputSchema?.properties ?? {}).length !== 0
    || (setupTool.inputSchema?.required?.length ?? 0) !== 0) {
    fail('setup-accessibility', 'upstream no-argument setup_accessibility schema differs')
  }
  const report = toolJson(await mcp.request('tools/call', {
    name: 'setup_accessibility', arguments: {},
  }), 'setup_accessibility')
  const beforeReady = report.before?.readiness?.can_build_accessibility_tree
  const afterReady = report.after?.readiness?.can_build_accessibility_tree
  if (typeof beforeReady !== 'boolean' || typeof afterReady !== 'boolean') {
    fail('setup-accessibility', 'upstream SetupReport lacks before/after readiness')
  }
  return { beforeReady, afterReady }
}

export async function testOwnedGtkFixture({
  binary, expectedSha256, enableAccessibility = false, exerciseAtSpiActions = false,
} = {}) {
  if (process.platform !== 'linux') fail('preflight', 'Linux host required')
  let protocol = await acceptLinuxComputerUse({ binary, expectedSha256 })
  let setupAccessibility
  if (enableAccessibility) {
    const mcp = startMcp(binary)
    try {
      setupAccessibility = await enableAccessibilityOnce(mcp)
    } finally {
      mcp.close()
    }
    // Re-run independent CLI + MCP doctor; never synthesize readiness from a
    // successful setup command or from the tool's after report alone.
    protocol = await acceptLinuxComputerUse({ binary, expectedSha256 })
  }
  const gated = fixtureReadinessGate(protocol)
  if (gated) return { ...gated, ...(setupAccessibility && { setupAccessibility }) }

  const marker = `CC_LINUX_CU_FIXTURE_${randomBytes(6).toString('hex')}`
  const fixture = launchGtkFixture(marker)
  let mcp
  try {
    await fixture.ready
    mcp = startMcp(binary)
    const initialized = await mcp.request('initialize', {
      protocolVersion: PROTOCOL,
      capabilities: {},
      clientInfo: { name: 'local-owned-gtk3-fixture', version: '1.0.0' },
    })
    if (initialized?.protocolVersion !== PROTOCOL || initialized?.serverInfo?.name !== 'computer-use-linux') {
      fail('mcp', 'fixture MCP handshake differs from upstream')
    }
    mcp.notify('notifications/initialized')
    const listed = await mcp.request('tools/list', {})
    const stateTool = listed?.tools?.find(tool => tool?.name === 'get_app_state')
    if (!stateTool || stateTool.annotations?.readOnlyHint !== true) {
      fail('mcp', 'upstream read-only fixture tools unavailable')
    }
    if (!stateTool.inputSchema?.properties?.pid || !stateTool.inputSchema?.properties?.include_screenshot
      || !stateTool.inputSchema?.properties?.app_name_or_bundle_identifier) {
      fail('mcp', 'get_app_state PID/app/screenshot input schema differs from upstream')
    }

    // If the PID has no AT-SPI root, upstream falls back to the app-name filter.
    // The unique marker prevents accidental whole-desktop traversal in that case.
    // No focus or input is sent, and include_screenshot prevents a portal prompt.
    const args = scopedStateArgs(fixture.pid, marker)
    const state = toolJson(await mcp.request('tools/call', {
      name: 'get_app_state', arguments: args,
    }), 'get_app_state')
    const evaluated = evaluateScopedFixtureState(state, marker)
    const actionResult = exerciseAtSpiActions && evaluated.fixtureAcceptance === 'owned-gtk3-tree-observed'
      ? await exerciseOwnedAtSpiActions(mcp, listed.tools, fixture.pid, marker, state)
      : null
    const actionAccepted = !exerciseAtSpiActions || actionResult?.entryValueVerified === true
      && actionResult?.buttonEffectVerified === true
    return {
      ok: evaluated.fixtureAcceptance === 'owned-gtk3-tree-observed' && actionAccepted,
      acceptance: actionResult ? 'owned-gtk3-at-spi-actions-verified' : evaluated.fixtureAcceptance,
      fullDesktopAcceptance: false,
      protocolAcceptance: protocol.acceptance,
      ...(setupAccessibility && { setupAccessibility }),
      fixtureLaunched: true,
      fixturePid: fixture.pid,
      ...evaluated,
      ...(actionResult && { actionResult }),
    }
  } finally {
    mcp?.close()
    fixture.close()
  }
}

export function parseFixtureArgs(args) {
  const result = { enableAccessibility: false, exerciseAtSpiActions: false }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--enable-accessibility') {
      result.enableAccessibility = true
      continue
    }
    if (args[i] === '--exercise-at-spi-actions') {
      result.exerciseAtSpiActions = true
      continue
    }
    if (!['--binary', '--sha256'].includes(args[i]) || !args[i + 1]) {
      fail('preflight', 'usage: --binary ABSOLUTE_PATH --sha256 HEX [--enable-accessibility] [--exercise-at-spi-actions]')
    }
    result[args[i] === '--binary' ? 'binary' : 'expectedSha256'] = args[++i]
  }
  return result
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await testOwnedGtkFixture(parseFixtureArgs(process.argv.slice(2)))
    console.log(JSON.stringify(result, null, 2))
    if (!result.ok) process.exitCode = 2
  } catch (error) {
    console.error(JSON.stringify({ ok: false, stage: error.stage ?? 'fixture', reason: error.message }))
    process.exitCode = 1
  }
}
