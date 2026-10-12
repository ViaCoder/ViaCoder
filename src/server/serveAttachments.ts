import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs'
import { realpathSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { isAbsolute, join, relative, sep } from 'node:path'
import { prependPathRefs, sanitizeFileName } from '../bridge/inboundAttachments.js'
import { canonicalPathPreflight287 } from '../utils/confinement287/workspacePolicy287.js'
import { ConfinementPolicyError287 } from '../utils/confinement287/confinementError287.js'
import type { RemoteMessageContent } from '../utils/teleport/api.js'

/** Local equivalent of the official bridge's upload -> @file -> Read path.
 * All uploaded kinds use the CLI's file reader, including image resizing,
 * PDF references/page reads, text limits, notebooks, and permission checks.
 * Files stay on disk for subsequent reads and resumed sessions.
 * Call only after ServeSession has validated the content and operation ID.
 */
export async function prepareWebAttachments(
  sessionId: string, operationId: string, content: RemoteMessageContent, workspaceRoot: string,
): Promise<RemoteMessageContent> {
  if (typeof content === 'string' || !content.some(block => block.type !== 'text')) return content
  // The immutable session admission root, not the worker's mutable cwd or config home.
  if (!isAbsolute(workspaceRoot) || realpathSync(workspaceRoot) !== workspaceRoot) {
    throw new ConfinementPolicyError287('PATH_OUTSIDE_WORKSPACE')
  }
  const checkUploadPath = (path: string): void => {
    const remainder = relative(workspaceRoot, canonicalPathPreflight287(path).canonical)
    if (isAbsolute(remainder) || remainder === '..' || remainder.startsWith(`..${sep}`)) {
      throw new ConfinementPolicyError287('PATH_OUTSIDE_WORKSPACE')
    }
  }
  const dir = join(workspaceRoot, '.claude', 'uploads', sessionId, `turn-${operationId}`)
  checkUploadPath(dir)
  await mkdir(dir, { recursive: true, mode: 0o700 })
  const paths: string[] = []
  const remaining: ContentBlockParam[] = []
  for (const [index, block] of content.entries()) {
    if (block.type === 'text') {
      // The admission validator permits only text and base64 file blocks.
      remaining.push({ type: 'text', text: String(block.text) })
      continue
    }
    const source = block.source as { data: string; media_type: string }
    const extension = ({'application/pdf':'pdf','image/png':'png','image/jpeg':'jpg','image/gif':'gif','image/webp':'webp'} as Record<string,string>)[source.media_type] ?? 'bin'
    const sanitized = sanitizeFileName(typeof block.title === 'string' ? block.title : `attachment.${extension}`)
    const name = sanitized === '.' || sanitized === '..' ? 'attachment' : sanitized
    const fileDir = join(dir, String(index))
    checkUploadPath(fileDir)
    await mkdir(fileDir, { recursive: true, mode: 0o700 })
    const path = join(fileDir, name)
    // Preflight only; this does not claim race-free OS containment.
    checkUploadPath(path)
    await writeFile(path, Buffer.from(source.data, 'base64'), { mode: 0o600 })
    paths.push(path)
  }
  // The official helper adds @mentions to the final text block.
  return prependPathRefs(remaining, paths.map(path => `@"${path}"`).join(' ') + ' ') as RemoteMessageContent
}
