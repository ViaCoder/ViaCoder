import { readFile } from 'node:fs/promises'
import { getPlanSlugCache, getSessionId } from '../../bootstrap/state.js'
import { getPlanFilePath } from '../../utils/plans.js'

export type GetPlanResponse = { exists: false } | { exists: true; content: string; path?: string }

/** Worker-side get_plan handler. It never creates a slug/file and never hides IO errors as absence. */
export async function getPlanControlResponse(options: {
  isPathHidden?: () => boolean
} = {}): Promise<GetPlanResponse> {
  if (!getPlanSlugCache().has(getSessionId())) return { exists: false }
  const path = getPlanFilePath()
  let content: string
  try {
    content = await readFile(path, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { exists: false }
    throw error
  }
  return { exists: true, content, ...(!options.isPathHidden?.() && { path }) }
}

/** Shared by the actual SDK dispatcher and offline wire tests. */
export async function dispatchGetPlanRequest(
  request: { request_id: string; request: { subtype: 'get_plan' } },
  emit: (frame: import('../../entrypoints/sdk/controlTypes.js').SDKControlResponse) => void,
): Promise<void> {
  try {
    const response = await getPlanControlResponse({ isPathHidden: () => true })
    emit({ type: 'control_response', response: {
      subtype: 'success', request_id: request.request_id, response,
    } })
  } catch {
    // This path is also exposed remotely: do not leak filesystem paths in errors.
    emit({ type: 'control_response', response: {
      subtype: 'error', request_id: request.request_id, error: 'Failed to read the session plan',
    } })
  }
}
