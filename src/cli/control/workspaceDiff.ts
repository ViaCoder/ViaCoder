import type {ToolPermissionContext} from '../../Tool.js'
import {runOfficialWorkspaceDiff} from './workspaceDiffBindings.js'

export type WorkspaceDiffResponse = {diff: null | {
  stats: {filesCount: number; linesAdded: number; linesRemoved: number}
  perFileStats: Array<{path: string; added: number; removed: number; isBinary: boolean; isUntracked?: boolean}>
  hunks: Array<{path: string; hunks: Array<{oldStart: number; oldLines: number; newStart: number; newLines: number; lines: string[]}>}>
  skippedLarge: string[]
  restricted: string[]
  source: {kind: 'working-tree'} | {kind: 'branch'; baseBranch: string; baseRef: string}
}}

/** P: pinned public Tt/Rtn closures; C: local Git, permission and cwd bindings.
 * The private Z7n me/ce sandbox branch is excluded at the public-root preflight. */
export async function buildWorkspaceDiffResponse(
  _host: unknown,
  context: ToolPermissionContext,
  signal?: AbortSignal,
): Promise<WorkspaceDiffResponse> {
  return runOfficialWorkspaceDiff(context, signal) as Promise<WorkspaceDiffResponse>
}
