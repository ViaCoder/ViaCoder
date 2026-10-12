/** Local C: private data-only pipe. Paths/content never become shell source. */
export type FileIoRoot287 = Readonly<{canonicalPath: string; device: string; inode: string}>
export type FileIoText287 = {content: string; encoding: BufferEncoding; lineEndings: 'LF' | 'CRLF'}
export type FileIoStat287 = {size: number; mtimeMs: number; regular: boolean; directory: boolean}
export type FileIoIdentityStat287 = {dev: string; ino: string; size: string; regular: boolean}
/** macOS's OS-owned aliases name the same private trees. Preserve the leaf:
 * resolving the entire path here would defeat the original no-follow open. */
export function normalizeFileIoPrivateAlias287(path: string): string {
  return process.platform === 'darwin' ? path.replace(/^\/(tmp|var|etc)(?=\/|$)/, '/private/$1') : path
}
export type FileIoRange287 = {content: string; lineCount: number; totalLines: number; totalBytes: number; readBytes: number; mtimeMs: number; truncatedByBytes: boolean}
export type FileIoRequest287 =
  | {kind: 'open'; root: FileIoRoot287; path: string; approvedPaths: string[]; createParents?: boolean; leaf?: 'replace'; readOnly?: boolean; checkedIdentity?: {dev: string; ino: string}}
  | {kind: 'read'; maxBytes?: number}
  | {kind: 'readBytes'; maxBytes?: number}
  | {kind: 'readChunk'; offset: number}
  | {kind: 'readAt'; offset: number; length: number}
  | {kind: 'identityStat'; path?: string}
  | {kind: 'realpath' | 'readlink'; path: string}
  | {kind: 'stat'}
  | {kind: 'range'; offset?: number; limit?: number; maxBytes?: number; maxSelectedBytes?: number; truncateOnByteLimit?: boolean}
  | {kind: 'mtime'}
  | {kind: 'recheck'}
  | {kind: 'write'; content: string; encoding: BufferEncoding; lineEndings: 'LF' | 'CRLF'}
  | {kind: 'close'}
export type FileIoError287 = {name: string; message: string; code?: string; telemetryMessage?: string; sizeInBytes?: number; maxSizeBytes?: number; selectedBytes?: number; maxSelectedBytes?: number}
export type FileIoReply287 = {ok: true; value: unknown} | {ok: false; error: FileIoError287}
