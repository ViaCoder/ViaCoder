import * as React from 'react'
import { bindSessionContext, DEFAULT_GRANT_FLAGS } from '../../vendor/official-desktop/index.js'
import { getSessionId } from '../../bootstrap/state.js'
import type { Tool, ToolUseContext } from '../../Tool.js'
import type { ConnectedMcpServer } from '../../services/mcp/types.js'
import type { AppGrant, CuGrantFlags, CuPermissionRequest, CuPermissionResponse, ScreenshotDims } from '../../vendor/official-desktop/nativeTypes.js'
import { requestDesktopApproval } from './approvalHost.js'
import { requestComputerUseDialog287 } from './approval287.js'
import { createDesktopCallLifecycle } from './callLifecycle.js'
import { getComputerUseMCPRenderingOverrides } from './toolRendering.js'
import { checkComputerUseLock, tryAcquireComputerUseLock } from './computerUseLock.js'
import { createPlatformExecutor, type PlatformCuContract, type PlatformCuInvoker } from './platformExecutor.js'
import { buildPlatformComputerUseTools } from './platformTools.js'
import { logForDebugging } from '../debug.js'
import { Text } from '../../ink.js'

/** One original binder per discovered connected row, and the SAME AppState
 * computerUseMcpState used by REPL and Web. No native-Mac host import. */
export function createPlatformComputerUseBinding(connection: ConnectedMcpServer, contract: PlatformCuContract, backend?: PlatformCuInvoker) {
  const lifecycle = createDesktopCallLifecycle<ToolUseContext>()
  let disposed = false
  let releasePromise: Promise<void> | undefined
  let removeAbort: (() => void) | undefined
  const context = () => {
    if (!lifecycle.current) throw Error('Computer use has no active tool context')
    return lifecycle.current
  }
  const executor = createPlatformExecutor(connection, contract, () => ({ signal: context().abortController.signal,
    apps: context().getAppState().computerUseMcpState?.allowedApps ?? [],
    flags: context().getAppState().computerUseMcpState?.grantFlags ?? DEFAULT_GRANT_FLAGS }), backend)
  const log = (message: string) => logForDebugging(`[Platform Computer Use] ${message}`)
  const logger = { silly: log, debug: log, info: log, warn: log, error: log }
  const tools = buildPlatformComputerUseTools(contract)
  const names = new Set(tools.map((t: { name: string }) => t.name))
  const actions = new Set(contract.methods.flatMap(method => ({ capture: ['screenshot'], zoom: ['zoom'],
    click: ['left_click','double_click','triple_click','right_click','middle_click'], type: ['type'], key: ['key'],
    scroll: ['scroll'], drag: ['left_click_drag'], move: ['mouse_move'], cursor: ['cursor_position'] }[method] ?? [])))
  actions.add('wait')
  if (contract.platform === 'win32' && contract.methods.includes('releaseInput')) {
    if (contract.methods.includes('holdKey')) actions.add('hold_key')
    if (contract.methods.includes('mouseDown')) actions.add('left_mouse_down')
    if (contract.methods.includes('mouseUp')) actions.add('left_mouse_up')
  }
  const session = {
    sessionId: getSessionId(), isAborted: () => disposed || lifecycle.isAborted(),
    getAllowedApps: () => context().getAppState().computerUseMcpState?.allowedApps ?? [],
    getGrantFlags: () => context().getAppState().computerUseMcpState?.grantFlags ?? DEFAULT_GRANT_FLAGS,
    getUserDeniedBundleIds: () => [],
    getSelectedDisplayId: () => context().getAppState().computerUseMcpState?.selectedDisplayId,
    getDisplayPinnedByModel: () => context().getAppState().computerUseMcpState?.displayPinnedByModel ?? false,
    getLastScreenshotDims: () => context().getAppState().computerUseMcpState?.lastScreenshotDims,
    onPermissionRequest: async (request: CuPermissionRequest, dialogSignal?: AbortSignal): Promise<CuPermissionResponse> => {
      const live = context(), setToolJSX = live.setToolJSX
      if (live.requestDialog) return requestComputerUseDialog287({ requestDialog: live.requestDialog,
        abortController: { signal: dialogSignal ? AbortSignal.any([live.abortController.signal, dialogSignal]) : live.abortController.signal } }, request)
      if (!setToolJSX) return { granted: [], denied: [], flags: { ...DEFAULT_GRANT_FLAGS } }
      const { ComputerUseApproval } = await import('../../components/permissions/ComputerUseApproval/ComputerUseApproval.js')
      return requestDesktopApproval(request, { signal: live.abortController.signal, dialogSignal,
        present: (request, onDone) => setToolJSX({ jsx: <><Text>{contract.methods.includes('capture') ? 'Screenshots include all visible windows; this backend does not hide or mask other applications.' : 'This backend exposes focused key and text input only; screenshots and pointer actions are unavailable.'}</Text><ComputerUseApproval request={request} onDone={onDone}/></>, shouldHidePromptInput: true }),
        clear: () => setToolJSX(null) })
    },
    onAllowedAppsChanged: (apps: readonly AppGrant[], flags: CuGrantFlags) => context().setAppState(prev => ({ ...prev,
      computerUseMcpState: { ...prev.computerUseMcpState, allowedApps: [...apps], grantFlags: flags } })),
    onScreenshotCaptured: (lastScreenshotDims: ScreenshotDims) => context().setAppState(prev => ({ ...prev,
      computerUseMcpState: { ...prev.computerUseMcpState, lastScreenshotDims } })),
    onDisplayPinned: (selectedDisplayId: number | undefined) => context().setAppState(prev => ({ ...prev,
      computerUseMcpState: { ...prev.computerUseMcpState, selectedDisplayId, displayPinnedByModel: selectedDisplayId !== undefined } })),
    checkCuLock: async () => {
      const lock = await checkComputerUseLock()
      return { holder: lock.kind === 'blocked' ? lock.by : lock.kind === 'held_by_self' ? getSessionId() : undefined,
        isSelf: lock.kind === 'held_by_self' }
    },
    acquireCuLock: async () => {
      const lock = await tryAcquireComputerUseLock()
      if (lock.kind === 'blocked') throw Error(`Computer use is held by session ${lock.by}`)
    },
  }
  const dispatch = bindSessionContext({ serverName: connection.name, logger, executor,
    isDisabled: () => !contract.ready,
    // Derived only from the explicit live host readiness handshake. This does
    // not claim macOS TCC, account eligibility, native filtering, or appScoped.
    ensureOsPermissions: async () => ({ granted: contract.ready }),
    getSubGates: () => ({ pixelValidation: false, clipboardPasteMultiline: false, mouseAnimation: false,
      hideBeforeAction: false, autoTargetDisplay: false, clipboardGuard: true }),
  }, 'pixels', session)
  const releaseHeld = () => releasePromise ??= (async () => {
    if (contract.platform !== 'win32' || !contract.methods.includes('releaseInput')) return
    await executor.releaseInput!()
    // Reset the ORIGINAL H/Y owner using its own Cr release path. Native
    // mouseUp is idempotent after the checked resource release above. An
    // abort/dispose gate may return its expected error; never invent success.
    if (lifecycle.current) await dispatch('left_mouse_up', {})
  })()
  return {
    dispose() {
      disposed = true
      removeAbort?.()
      if (lifecycle.callsInFlight) lifecycle.current?.abortController.abort()
      return releaseHeld()
    },
    override(name: string): Partial<Tool> {
      return { ...getComputerUseMCPRenderingOverrides(name), isConcurrencySafe: () => false,
        call: async (args, live) => {
          if (disposed) throw Error('Computer use connected binding is closed')
          if (lifecycle.callsInFlight) throw Error('Computer use call already active on this connected session')
          if (!names.has(name)) throw Error(`Computer use tool capability unavailable: ${name}`)
          const input = args as Record<string, unknown>
          const batch = name === 'computer_batch' ? input.actions : name === 'computer' ? [input] : []
          if (!Array.isArray(batch) || batch.some(a => !a || typeof a !== 'object' || !actions.has((a as { action: string }).action)))
            throw Error('Computer use action capability unavailable')
          const modifiersUnsupported=(action:string,value:Record<string,unknown>)=>
            (action.includes('click')||action==='scroll')&&typeof value.text==='string'&&value.text.length>0
          if (modifiersUnsupported(name,input)||batch.some(a=>modifiersUnsupported(a.action,a)))
            throw Error('Computer use backend lacks held-key click/scroll modifiers')
          if (contract.platform === 'win32' && contract.methods.includes('releaseInput')) {
            if (releasePromise) { await releasePromise; releasePromise = undefined }
            removeAbort?.()
            const onAbort = () => { releaseHeld().catch(error => log(String(error))) }
            live.abortController.signal.addEventListener('abort', onAbort, {once:true})
            removeAbort = () => live.abortController.signal.removeEventListener('abort', onAbort)
          }
          const result = await lifecycle.run(live, () => dispatch(name, args))
          if (releasePromise) await releasePromise
          if (result.isError) throw Error(result.content.filter((c: { type: string }) => c.type === 'text').map((c: { text: string }) => c.text).join('\n'))
          return { data: result.content.map((item: { type: string; data: string; mimeType?: string; text: string }) => item.type === 'image'
            ? { type: 'image' as const, source: { type: 'base64' as const, media_type: item.mimeType ?? 'image/jpeg', data: item.data } }
            : { type: 'text' as const, text: item.text }) }
        } }
    },
  }
}
