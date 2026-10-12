/** Local Web command business runs inside the existing CLI worker. No model
 * request, HTTP-side cwd, terminal JSX renderer or credential-bearing state. */
import { createHash, type UUID } from 'node:crypto'
import { constants } from 'node:fs'
import { lstat, mkdir, open, realpath } from 'node:fs/promises'
import { basename, dirname, join, sep, resolve } from 'node:path'
import type { AppState } from '../../state/AppState.js'
import type { Tools } from '../../Tool.js'
import type { Message } from '../../types/message.js'
import { getOriginalCwd, getSessionId } from '../../bootstrap/state.js'
import { fetchGitDiff, fetchGitDiffHunks, fetchSingleFileGitDiff } from '../../utils/gitDiff.js'
import { renderMessagesToPlainText } from '../../utils/exportRenderer.js'
import {exportDefaultFilename287} from '../../commands/export/export.js'
import { clearMemoryFileCaches, getMemoryFiles } from '../../utils/claudemd.js'
import { getClaudeConfigHomeDir, isEnvTruthy } from '../../utils/envUtils.js'
import { getCurrentSessionTag, getTranscriptPath, saveTag } from '../../utils/sessionStorage.js'
import { recursivelySanitizeUnicode } from '../../utils/sanitization.js'
import { createBranchForLocalWeb } from '../../commands/branch/branch.js'
import { getDoctorDiagnostic } from '../../utils/doctorDiagnostic.js'
import {fileHistoryEnabled, fileHistoryCanRestore} from '../../utils/fileHistory.js'
import { parsePatch } from 'diff'
import { getCwd } from '../../utils/cwd.js'
import { findGitRoot, getIsGit } from '../../utils/git.js'
import { checkContextWarnings } from '../../utils/doctorContextWarnings.js'

export interface PublicCommandWorkerHost {
  getAppState(): AppState
  getMessages(): Message[]
  getTools(): Tools
}

/** Reuse Doctor's actual installation and context checks, not a fabricated
 * health flag. Installation paths, binaries and account data stay private. */
export async function handleLocalPublicDoctor(host: PublicCommandWorkerHost) {
  if (isEnvTruthy(process.env.DISABLE_DOCTOR_COMMAND)) throw Error('Doctor command is disabled')
  const state = host.getAppState()
  const [diagnostic, contextWarnings] = await Promise.all([
    getDoctorDiagnostic(),
    checkContextWarnings([...host.getTools()], state.agentDefinitions,
      async () => state.toolPermissionContext),
  ])
  return { installationType: diagnostic.installationType, version: diagnostic.version,
    autoUpdates: diagnostic.autoUpdates, hasUpdatePermissions: diagnostic.hasUpdatePermissions,
    packageManager: diagnostic.packageManager,
    ripgrep: { working: diagnostic.ripgrepStatus.working, mode: diagnostic.ripgrepStatus.mode },
    warnings: diagnostic.warnings.map(warning => ({ issue: warning.issue, fix: warning.fix })),
    contextWarnings }
}

/** Same Git data source as DiffDialog/useDiffData; bounded by gitDiff's own
 * file/size/time limits. No shell command is assembled from Web input. */
export async function handleLocalPublicDiff(selectedPath?: string) {
  // Explicit Web list/refresh: a long-lived worker may predate git init.
  // Leave the official hot-path cache policy unchanged elsewhere.
  if (selectedPath === undefined) { findGitRoot.cache.clear(); getIsGit.cache.clear() }
  const [diff, hunks] = await Promise.all([fetchGitDiff(), fetchGitDiffHunks()])
  if (!diff) return { available: false as const, stats: null, files: [] }
  // Only entries in the worker's actual Git result may be read. In particular,
  // never turn a browser-provided path into an unrestricted file read.
  if (selectedPath !== undefined && !diff.perFileStats.has(selectedPath)) throw Error('文件已不在当前变更列表，请刷新')
  let detailUnavailable = false
  if (selectedPath !== undefined) {
    const entry = diff.perFileStats.get(selectedPath)!
    if (!entry.isBinary) {
      const root = findGitRoot(getCwd())
      if (!root) throw Error('Git 目录已不可用')
      const absolute = resolve(root, selectedPath)
      const metadata = await lstat(absolute).catch(() => null)
      const canonicalRoot = await realpath(root)
      const canonical = metadata?.isFile() ? await realpath(absolute) : null
      if ((metadata && !canonical) || (canonical && !canonical.startsWith(canonicalRoot + sep)) || (!metadata && entry.isUntracked)) detailUnavailable = true
      else {
        const single = await fetchSingleFileGitDiff(absolute)
        if (!single || single.patch.includes('\0')) detailUnavailable = true
        else {
          hunks.set(selectedPath, parsePatch(`--- a/file\n+++ b/file\n${single.patch}`)[0]?.hunks ?? [])
          entry.added = single.additions; entry.removed = single.deletions
        }
      }
    }
  }
  return { available: true as const, stats: diff.stats,
    files: [...diff.perFileStats].filter(([path]) => selectedPath === undefined || path === selectedPath).sort(([a], [b]) => a.localeCompare(b)).map(([path, entry]) => ({ path, linesAdded: entry.added,
      linesRemoved: entry.removed, isBinary: entry.isBinary, isUntracked: entry.isUntracked === true,
      ...(detailUnavailable ? {detailUnavailable: true} : {}),
      hunks: (hunks.get(path) ?? []).map(hunk => ({ oldStart: hunk.oldStart, oldLines: hunk.oldLines,
        newStart: hunk.newStart, newLines: hunk.newLines, lines: hunk.lines })) })) }
}

/** Real AppState registry, not SDK background_tasks (which only backgrounds). */
export function handleLocalPublicTasks(host: Pick<PublicCommandWorkerHost, 'getAppState'>) {
  return { tasks: Object.values(host.getAppState().tasks)
    .sort((a, b) => a.startTime - b.startTime || a.id.localeCompare(b.id))
    .map(task => ({ id: task.id, type: task.type,
    status: task.status, description: task.description, startTime: task.startTime,
    ...(task.endTime !== undefined ? { endTime: task.endTime } : {}),
    ...(task.toolUseId !== undefined ? { toolUseId: task.toolUseId } : {}) })) }
}

/** Uses /export's existing renderer, including its chunking and ANSI removal.
 * No transcript JSON, raw SDK frames or account metadata is exported. */
export async function handleLocalPublicExport(host: Pick<PublicCommandWorkerHost, 'getMessages' | 'getTools'>) {
  const content = await renderMessagesToPlainText(host.getMessages(), host.getTools())
  return { filename: exportDefaultFilename287(host.getMessages()), content }
}

export async function handleLocalPublicTag(request: { tag: string; confirmRemove?: true }) {
  // The original /tag isEnabled gate must remain authoritative.
  if (process.env.USER_TYPE !== 'ant') throw Error('Tag command is not enabled')
  const sessionId = getSessionId() as UUID
  if (!sessionId) throw Error('No active session to tag')
  const tag = recursivelySanitizeUnicode(request.tag).trim()
  if (!tag || tag.length > 128) throw Error('Invalid tag')
  const current = getCurrentSessionTag(sessionId)
  if (current === tag && request.confirmRemove !== true) return { tag: current, confirmationRequired: true as const }
  const removed = current === tag
  await saveTag(sessionId, removed ? '' : tag, getTranscriptPath())
  return { tag: removed ? '' : tag, removed }
}

export async function handleLocalPublicBranch(request: { title?: string }) {
  if (request.title !== undefined && (typeof request.title !== 'string' || request.title.trim().length > 100))
    throw Error('Invalid branch title')
  return createBranchForLocalWeb(request.title)
}

type MemoryKind = 'User' | 'Project'
type MemoryEntry = { id: string; path: string; type: MemoryKind; label: string; exists: boolean }
const memoryId = (path: string) => createHash('sha256').update(path).digest('hex').slice(0, 20)
async function eligibleMemoryEntries(): Promise<MemoryEntry[]> {
  const root = getOriginalCwd(), home = getClaudeConfigHomeDir()
  const canonicalRoot = await realpath(root)
  const canonicalHome = await realpath(home).catch(() => home)
  const files = await getMemoryFiles()
  const candidates = [
    ...files.filter(file => file.type === 'User' || file.type === 'Project').map(file => ({path: file.path, type: file.type as MemoryKind})),
    {path: join(home, 'CLAUDE.md'), type: 'User' as const},
    {path: join(root, 'CLAUDE.md'), type: 'Project' as const},
  ]
  const seen = new Set<string>()
  const entries: MemoryEntry[] = []
  for (const candidate of candidates) {
    if (seen.has(candidate.path)) continue
    seen.add(candidate.path)
    // Do not make managed/external includes editable through this Web path.
    if (candidate.type === 'User' && !candidate.path.startsWith(home + '/') ||
      candidate.type === 'Project' && !candidate.path.startsWith(root + '/')) continue
    const metadata = await lstat(candidate.path).catch(error => {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
      throw error
    })
    if (metadata && (!metadata.isFile() || metadata.isSymbolicLink())) continue
    const parent = await realpath(dirname(candidate.path)).catch(error => {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
      throw error
    })
    const boundary = candidate.type === 'User' ? canonicalHome : canonicalRoot
    if (parent && parent !== boundary && !parent.startsWith(boundary + sep)) continue
    if (!parent && candidate.path !== join(home, 'CLAUDE.md')) continue
    entries.push({id: memoryId(candidate.path), path: candidate.path, type: candidate.type,
      label: `${candidate.type}: ${basename(candidate.path)}`, exists: metadata !== null})
  }
  return entries.sort((a, b) => a.type.localeCompare(b.type) || a.label.localeCompare(b.label) || a.id.localeCompare(b.id))
}
const hash = (content: string) => createHash('sha256').update(content).digest('hex')

export async function handleLocalPublicMemory(request: { action: 'list' | 'read' | 'write'; id?: string; content?: string; expectedHash?: string }) {
  const entries = await eligibleMemoryEntries()
  if (request.action === 'list') return { files: entries.map(({id, type, label, exists}) => ({id, type, label, exists})) }
  const selected = entries.find(item => item.id === request.id)
  if (!selected) throw Error('Memory file is not available')
  if (request.action === 'write' && !selected.exists && request.expectedHash !== hash(''))
    throw Error('Memory file changed or content is invalid')
  if (request.action === 'write' && !selected.exists && selected.type === 'User')
    await mkdir(getClaudeConfigHomeDir(), {recursive: true, mode: 0o700})
  const flags = request.action === 'read' ? constants.O_RDONLY | constants.O_NOFOLLOW :
    selected.exists ? constants.O_RDWR | constants.O_NOFOLLOW :
      constants.O_RDWR | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW
  const handle = await open(selected.path, flags, 0o600).catch(error => {
    if (request.action === 'read' && (error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  })
  try {
    const before = handle ? await handle.readFile({encoding: 'utf8'}) : ''
    if (before.length > 512_000) throw Error('Memory file is too large')
    // The user selected an eligible memory file. Preserve its editable bytes;
    // credential-bearing SDK metadata is excluded at the response boundary.
    if (request.action === 'read') return { id: selected.id, content: before, contentHash: hash(before), redacted: false }
    if (!handle || typeof request.content !== 'string' || request.content.length > 512_000 || request.expectedHash !== hash(before))
      throw Error('Memory file changed or content is invalid')
    const bytes = Buffer.from(request.content)
    let written = 0
    while (written < bytes.length) {
      const next = await handle.write(bytes, written, bytes.length - written, written)
      if (next.bytesWritten <= 0) throw Error('Memory write failed')
      written += next.bytesWritten
    }
    await handle.truncate(bytes.length)
    clearMemoryFileCaches()
    return { id: selected.id, contentHash: hash(request.content), written: true as const }
  } finally { await handle?.close() }
}

/** The actual worker snapshot catalog, not IDs guessed from UI transcript rows. */
export function handleLocalPublicCheckpoints(host: Pick<PublicCommandWorkerHost,'getAppState'|'getMessages'>) {
  if (!fileHistoryEnabled()) return {enabled:false,checkpoints:[]}
  const state=host.getAppState().fileHistory
  const labels=new Map(host.getMessages().filter(message=>message.type==='user'&&!message.isMeta).map(message=>{
    const content=message.type==='user'?message.message.content:''
    const text=typeof content==='string'?content:content.filter(block=>block.type==='text').map(block=>block.text).join(' ')
    return [message.uuid,text.replace(/\s+/g,' ').trim().slice(0,160)]
  }))
  return {enabled:true,checkpoints:state.snapshots.filter(snapshot=>fileHistoryCanRestore(state,snapshot.messageId)).map(snapshot=>({
    messageId:snapshot.messageId,timestamp:snapshot.timestamp.toISOString(),label:labels.get(snapshot.messageId)||'历史检查点',
  })).reverse()}
}
