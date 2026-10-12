import type {ToolPermissionContext} from '../../Tool.js'
import {getPrintHostSource287} from '../printOwnership287/publicHostRuntime287.js'
import {runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'

export const REMOTE_READ_DEFAULT_BYTES = 1_000_000
export const REMOTE_READ_MAX_BYTES = 10_000_000

export type SdkReadFileResult287 = {contents: string; absPath: string; truncated?: boolean; encoding?: 'base64'}
type OriginalReadFile287 = (path: unknown, maxBytes: unknown, context: ToolPermissionContext,
  encoding?: unknown, source?: string) => Promise<SdkReadFileResult287>

/** Transport the complete original X4t and its canonical dependency owner.
 * Original path classification, handle identity, limits and errors stay there. */
export async function readSdkFile(request: {path: unknown; max_bytes?: unknown; encoding?: unknown},
  context: ToolPermissionContext, source?: string, signal: AbortSignal = new AbortController().signal): Promise<SdkReadFileResult287> {
  const read = getPrintHostSource287('chunk-tf63hv0k.js', 'X4t') as OriginalReadFile287
  return runWithConfinedFileToolIo287(signal,
    () => read(request.path, request.max_bytes, context, request.encoding, source), 'sdk')
}
