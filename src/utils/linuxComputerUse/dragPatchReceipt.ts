/** Integrity binding for an explicitly installed local Linux drag build.
 * This unsigned operator-owned receipt is not upstream provenance or proof
 * that Linux desktop input was tested. It never installs or disables tools. */
import {createHash} from 'node:crypto'
import {z} from 'zod/v4'
import {LINUX_DRAG_PATCH_073 as patch} from './dragPatchIdentity.js'

export const LINUX_073_RELEASE_SHA256 = '7e5ce643a22fd37978f3220732813a0ca4accc55587e8f1c38c71ae83f67fcc4'
export const LINUX_DRAG_RECEIPT_SUFFIX = '.cclaude-linux-drag.json'
const Sha = z.string().regex(/^[a-f0-9]{64}$/)
export const LinuxDragBuildReceipt = z.strictObject({
  schema: z.literal(1),
  kind: z.literal('local-cargo-offline-locked-release'),
  patchId: z.literal(patch.id),
  baseCommit: z.literal(patch.baseCommit),
  patchSha256: z.literal(patch.patchSha256),
  sourceTreeSha256: z.literal(patch.sourceTreeSha256),
  sourceSha256: z.strictObject({
    'src/abs_pointer.rs': z.literal(patch.sourceSha256['src/abs_pointer.rs']),
    'src/server.rs': z.literal(patch.sourceSha256['src/server.rs']),
  }),
  target: z.enum(['x86_64-unknown-linux-gnu', 'aarch64-unknown-linux-gnu']),
  binarySha256: Sha,
  builtAt: z.string().datetime(),
})

export function linuxElfArchitecture(bytes: Buffer): 'x86_64' | 'aarch64' {
  if (bytes.length < 64 || !bytes.subarray(0, 4).equals(Buffer.from([0x7f, 0x45, 0x4c, 0x46])) ||
      bytes[4] !== 2 || bytes[5] !== 1 || bytes[6] !== 1 ||
      ![2, 3].includes(bytes.readUInt16LE(16))) throw Error('Linux drag build must be a 64-bit little-endian ELF executable')
  const machine = bytes.readUInt16LE(18)
  if (machine === 62) return 'x86_64'
  if (machine === 183) return 'aarch64'
  throw Error('Unsupported Linux drag ELF architecture')
}

export function verifyLinuxDragBuild(bytes: Buffer, receipt: unknown, arch: string) {
  const parsed = LinuxDragBuildReceipt.parse(receipt)
  const expected = parsed.target === 'x86_64-unknown-linux-gnu' ? 'x86_64' : 'aarch64'
  if ((arch === 'arm64' ? 'aarch64' : arch) !== expected || linuxElfArchitecture(bytes) !== expected)
    throw Error('Linux drag build architecture differs from doctor/receipt')
  if (createHash('sha256').update(bytes).digest('hex') !== parsed.binarySha256)
    throw Error('Linux drag installed binary differs from local build receipt')
  return parsed
}

type BinaryFs = {
  existsSync(path: string): boolean
  readFileBytesSync(path: string): Buffer
  readFileSync(path: string, options: {encoding: BufferEncoding}): string
}
/** The caller still uses exactly config.command + ['mcp'] on the same client. */
export function verifyInstalledLinux073Binary(command: string, arch: string, fs: BinaryFs) {
  const receiptPath = command + LINUX_DRAG_RECEIPT_SUFFIX
  if (fs.existsSync(receiptPath)) {
    const receipt = verifyLinuxDragBuild(fs.readFileBytesSync(command),
      JSON.parse(fs.readFileSync(receiptPath, {encoding: 'utf8'})), arch)
    return {kind: 'local-drag-patch' as const, receipt}
  }
  if (arch === 'x86_64') {
    if (createHash('sha256').update(fs.readFileBytesSync(command)).digest('hex') !== LINUX_073_RELEASE_SHA256)
      throw Error('Linux computer use installed binary differs from pinned 0.7.3 release; a patched build requires its local receipt')
    return {kind: 'pinned-release' as const}
  }
  // Preserve the established installed-ARM contract; do not invent an ARM
  // release digest or imply that the unreceipted server has the drag fix.
  return {kind: 'existing-arm-unverified-drag' as const}
}
