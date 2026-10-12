/** Local C: borrow the connected MCP row. This module never dials a server. */
import { CallToolResultSchema } from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod/v4'
import { getConnectedMcpClient } from '../../services/mcp/connectionAccess.js'
import type { ConnectedMcpServer } from '../../services/mcp/types.js'
import type { CuGrantFlags, AppGrant } from '../../vendor/official-desktop/nativeTypes.js'
import { getComputerUseClipboardKeyGrants287 } from '../../vendor/official-desktop/index.js'

export const PLATFORM_CU_HOST_TOOL = 'CClaudeCUHost'
const App = z.object({ bundleId: z.string().min(1), displayName: z.string().min(1) })
const Display = z.object({ displayId: z.number().int(), name: z.string(), isPrimary: z.boolean(),
  width: z.number().positive(), height: z.number().positive(), scaleFactor: z.number().positive(),
  originX: z.number(), originY: z.number() })
const Capture = z.object({ base64: z.string().min(1), width: z.number().positive(), height: z.number().positive(),
  displayWidth: z.number().positive(), displayHeight: z.number().positive(), displayId: z.number().int(),
  originX: z.number(), originY: z.number() })
export const PlatformCuContract = z.object({
  protocol: z.literal('cclaude-cu-executor/1'), platform: z.enum(['win32', 'linux']),
  upstream: z.string().min(1), version: z.string().min(1), ready: z.boolean(),
  screenshotFiltering: z.literal('none'), appIndexIncomplete: z.boolean(),
  methods: z.array(z.enum(['apps', 'displays', 'foreground', 'underPoint', 'cursor', 'capture',
    'zoom', 'click', 'move', 'drag', 'scroll', 'key', 'type', 'readClipboard', 'writeClipboard',
    'openApp', 'holdKey', 'mouseDown', 'mouseUp', 'releaseInput'])),
})
export type PlatformCuContract = z.infer<typeof PlatformCuContract>
export type PlatformCuCallContext = { signal: AbortSignal; apps: readonly AppGrant[]; flags: CuGrantFlags }

export type PlatformCuInvoker = (method: PlatformCuContract['methods'][number], args: Record<string, unknown>, context: PlatformCuCallContext) => Promise<unknown>

export async function callConnectedPlatformCu(connection: ConnectedMcpServer, args: Record<string, unknown>, signal: AbortSignal) {
  signal.throwIfAborted()
  if ('isClosed' in connection && connection.isClosed()) throw Error('Computer use MCP connection is closed')
  const access = getConnectedMcpClient(connection)
  const token = connection.config.type === 'stdio' ? connection.config.env?.CCLAUDE_CU_HOST_TOKEN : undefined
  const request = { name: PLATFORM_CU_HOST_TOOL, arguments: { ...args, ...(token ? { hostToken: token } : {}) } }
  const result = CallToolResultSchema.parse(access.generation === 'v2'
    ? await access.client.callTool(request, { signal })
    : await access.client.callTool(request, CallToolResultSchema, { signal }))
  signal.throwIfAborted()
  if (result.isError) throw Error(result.content.filter(c => c.type === 'text').map(c => c.text).join('\n') || 'Computer use backend error')
  // Host messages are structured JSON, not heuristic parsing of window titles,
  // Snapshot tables, stdout, or the backend's human-facing success strings.
  const text = result.content.filter(c => c.type === 'text')
  if (text.length !== 1 || result.content.length !== 1) throw Error('Invalid computer use host response')
  return JSON.parse(text[0]!.text) as unknown
}

export async function negotiatePlatformCu(connection: ConnectedMcpServer, platform: 'win32' | 'linux', signal: AbortSignal) {
  if (platform === 'win32' && (connection.config.type !== 'stdio' || !connection.config.env?.CCLAUDE_CU_HOST_TOKEN))
    throw Error('Computer use Windows bridge lacks the connected caller capability')
  const contract = PlatformCuContract.parse(await callConnectedPlatformCu(connection, { method: 'describe' }, signal))
  if (contract.platform !== platform) throw Error('Computer use backend platform mismatch')
  if (platform === 'win32' && (contract.upstream !== 'CursorTouch/Windows-MCP' || contract.version !== '0.8.7'))
    throw Error('Computer use Windows backend does not match the pinned 0.8.7 contract')
  if (platform === 'linux' && (contract.upstream !== 'agent-sh/computer-use-linux' || contract.version !== '0.7.3'))
    throw Error('Computer use Linux backend does not match the pinned 0.7.3 contract')
  for (const method of ['apps', 'displays', 'foreground', 'underPoint', 'cursor'] as const)
    if (!contract.methods.includes(method)) throw Error(`Computer use backend lacks trusted ${method} metadata`)
  return contract
}

/** Same live context supplies grants to the host on every operation; no grant
 * owner or identity inferred from the window caption is introduced here. */
export function createPlatformExecutor(connection: ConnectedMcpServer, contract: PlatformCuContract,
  context: () => PlatformCuCallContext, backend?: PlatformCuInvoker) {
  const invoke = async (method: PlatformCuContract['methods'][number], args: Record<string, unknown> = {}) => {
    if (!contract.methods.includes(method)) throw Error(`Computer use backend capability unavailable: ${method}`)
    const live = context()
    if (backend) return backend(method, args, live)
    return callConnectedPlatformCu(connection, { method, args, allowedApps: live.apps.map(a => a.bundleId),
      grantFlags: live.flags }, live.signal)
  }
  const capture = async (displayId?: number, region?: { x: number; y: number; w: number; h: number }) => {
    const value = Capture.parse(await invoke(region ? 'zoom' : 'capture', { displayId, region }))
    if (!Buffer.from(value.base64, 'base64').subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])))
      throw Error('Computer use host capture is not JPEG')
    return value
  }
  const release = async (method: 'mouseUp' | 'releaseInput') => {
    if (contract.platform !== 'win32' || !contract.methods.includes(method))
      throw Error(`Computer use backend capability unavailable: ${method}`)
    // Revoked/aborted input must STILL release native resources. This is the
    // same connected capability, no approval cache or replacement transport.
    return callConnectedPlatformCu(connection, {method}, new AbortController().signal)
  }
  return {
    capabilities: { platform: contract.platform, screenshotFiltering: contract.screenshotFiltering,
      adaptiveResolution: false, saveToDisk: false, hostBundleId: 'cclaude.desktop.cli-no-window' },
    // none filtering never hides a window; these ports are intentionally not
    // advertised as native/mask filtering, appScoped, or OS permission grants.
    previewHideSet: async () => [] as string[], prepareForAction: async () => [] as string[],
    listInstalledApps: async () => z.array(App).parse(await invoke('apps')),
    listRunningApps: async () => z.array(App).parse(await invoke('apps')),
    isAppIndexIncomplete: () => contract.appIndexIncomplete,
    getAppIcon: async () => undefined,
    // Original monitor-name resolver consumes label, not the platform wire's
    // name. Preserve the same verified backend label without another index.
    listDisplays: async () => z.array(Display).parse(await invoke('displays')).map(d => ({...d,label:d.name})),
    getDisplaySize: async (id?: number) => {
      const displays = z.array(Display).parse(await invoke('displays'))
      const d = id === undefined ? displays.find(x => x.isPrimary) : displays.find(x => x.displayId === id)
      if (!d) throw Error('Requested computer use display is unavailable')
      return d
    },
    getFrontmostApp: async () => App.nullable().parse(await invoke('foreground')),
    appUnderPoint: async (x: number, y: number) => App.nullable().parse(await invoke('underPoint', { x, y })),
    getCursorPosition: async () => z.object({ x: z.number(), y: z.number() }).parse(await invoke('cursor')),
    screenshot: ({ displayId }: { allowedBundleIds: string[]; displayId?: number }) => capture(displayId),
    zoom: async (region: { x: number; y: number; w: number; h: number }, _ids: string[], displayId?: number) => {
      // Original sr supplies display-local physical coordinates, whereas all
      // platform host crops use desktop-global physical coordinates.
      const displays = z.array(Display).parse(await invoke('displays'))
      const display = displayId === undefined ? displays.find(d => d.isPrimary) : displays.find(d => d.displayId === displayId)
      if (!display) throw Error('Requested computer use display is unavailable')
      return capture(display.displayId, {...region, x:region.x+display.originX, y:region.y+display.originY})
    },
    moveMouse: async (x: number, y: number) => { await invoke('move', { x, y }) },
    click: async (x: number, y: number, button: string, clicks: number, modifiers?: string[]) => {
      if (modifiers?.length) throw Error('Computer use backend lacks held-key click modifiers')
      await invoke('click', { x, y, button, clicks })
    },
    drag: async (start: { x: number; y: number } | undefined, end: { x: number; y: number }) => { await invoke('drag', { start, end }) },
    scroll: async (x: number, y: number, dx: number, dy: number) => { await invoke('scroll', { x, y, dx, dy }) },
    key: async (text: string, repeat = 1) => {
      // Display-scope original dispatch does not apply the app-scoped key
      // clipboard check. Read the SAME original predicate and live flags here
      // before delivering a platform shortcut, not a second chord table.
      const live = context()
      for (const flag of getComputerUseClipboardKeyGrants287(text.toLowerCase().replace(/[ -]/g, '')))
        if (!live.flags[flag]) throw Error(`Computer use keyboard clipboard action requires explicit ${flag} approval`)
      await invoke('key', { text, repeat })
    },
    type: async (text: string, options: { viaClipboard: boolean }) => {
      if (options.viaClipboard) throw Error('Computer use backend lacks consent-preserving clipboard paste')
      await invoke('type', { text })
    },
    readClipboard: async () => z.string().parse(await invoke('readClipboard')),
    writeClipboard: async (text: string) => { await invoke('writeClipboard', { text }) },
    ...(contract.platform === 'win32' ? {
      openApp: async (app: string) => { await invoke('openApp', {app}) },
      holdKey: async (keys: string[], durationMs: number, isAborted?: () => boolean) => {
        if (isAborted?.()) throw Error('Computer use key hold aborted before delivery')
        const live = context()
        for (const flag of getComputerUseClipboardKeyGrants287(keys.join('+').toLowerCase().replace(/[ -]/g, '')))
          if (!live.flags[flag]) throw Error(`Computer use keyboard clipboard action requires explicit ${flag} approval`)
        await invoke('holdKey', {keys, durationMs})
      },
      mouseDown: async () => { await invoke('mouseDown') },
      mouseUp: async () => { await release('mouseUp') },
      releaseInput: async () => { await release('releaseInput') },
    } : {}),
  }
}
