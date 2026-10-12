import { constants } from 'node:fs'
import { open, realpath } from 'node:fs/promises'
import { isAbsolute, resolve } from 'node:path'
import type { ToolUseContext } from '../../Tool.js'
import { getCwd } from '../../utils/cwd.js'
import { pathInAllowedWorkingPath } from '../../utils/permissions/filesystem.js'
import { MAX_WORKFLOW_SCRIPT_BYTES } from './scripts.js'

// Public local arm of official chunk-8t2a92ch.js gTn/OKt: scriptPath must
// remain in readable working roots, be regular, and resist link swaps.
export async function readWorkflowScriptPath(path: string, context: ToolUseContext): Promise<{ script: string; path: string } | { error: string }> {
  if (!path || path.includes('\0')) return { error: 'Invalid workflow script path' }
  const absolute = isAbsolute(path) ? path : resolve(getCwd(), path)
  const allowed = pathInAllowedWorkingPath(absolute, context.getAppState().toolPermissionContext)
  if (!allowed) return { error: `Workflow script path is outside readable working directories: ${path}` }
  let handle
  try { handle = await open(absolute, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0)) }
  catch { return { error: `Workflow script file not found: ${path}` } }
  try {
    const info = await handle.stat()
    if (!info.isFile() || info.nlink !== 1) return { error: `Workflow script file ${path} is not a regular unlinked file` }
    if (info.size > MAX_WORKFLOW_SCRIPT_BYTES) return { error: `Workflow script file ${path} exceeds ${MAX_WORKFLOW_SCRIPT_BYTES} bytes` }
    const canonical = await realpath(absolute)
    if (!pathInAllowedWorkingPath(canonical, context.getAppState().toolPermissionContext)) return { error: `Workflow script path is outside readable working directories: ${path}` }
    const bytes = Buffer.alloc(info.size)
    const { bytesRead } = await handle.read(bytes, 0, bytes.length, 0)
    return { script: bytes.subarray(0, bytesRead).toString('utf8'), path: canonical }
  } catch { return { error: `Failed to read workflow script file ${path}` } }
  finally { await handle.close() }
}
