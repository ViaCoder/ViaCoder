import { DEFAULT_GRANT_FLAGS } from '../../vendor/official-desktop/index.js'
import type { CuPermissionRequest, CuPermissionResponse } from '@ant/computer-use-mcp'

/** Adapter for official chunk-crht2na0 U's requestDialog + abort contract.
 * This port still uses setToolJSX, but never implies consent without a presenter.
 * Package dialogSignal also dismisses stale dialogs; a late onDone grants nothing.
 */
export async function requestDesktopApproval(request: CuPermissionRequest, host: {
  signal: AbortSignal
  dialogSignal?: AbortSignal
  present?: (request: CuPermissionRequest, done: (response: CuPermissionResponse) => void) => void
  clear: () => void
}): Promise<CuPermissionResponse> {
  if (!host.present) return { granted: [], denied: [], flags: { ...DEFAULT_GRANT_FLAGS } }
  const signals = [...new Set([host.signal, host.dialogSignal].filter(Boolean))] as AbortSignal[]
  let onAbort: () => void = () => {}
  try {
    return await new Promise<CuPermissionResponse>((resolve, reject) => {
      let settled = false
      onAbort = () => {
        if (settled) return
        settled = true
        reject(new Error('Computer Use permission dialog aborted'))
      }
      if (signals.some(signal => signal.aborted)) { onAbort(); return }
      for (const signal of signals) signal.addEventListener('abort', onAbort, { once: true })
      host.present!(request, response => {
        if (settled) return
        settled = true
        resolve(response)
      })
    })
  } finally {
    for (const signal of signals) signal.removeEventListener('abort', onAbort)
    host.clear()
  }
}
