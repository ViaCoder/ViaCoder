import {open, realpath, lstat} from 'node:fs/promises'
import type {ToolPermissionContext} from '../../Tool.js'
import type {FileState} from '../../utils/fileStateCache.js'
import {getPrintHostSource287} from '../printOwnership287/publicHostRuntime287.js'
import {getConfinedFileToolContext287, getConfinedSdkRead287, runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'
import {wrapOriginalSdkReadIo287} from '../../utils/confinement287/sdkReadFileIoScope287.js'
import {getWorkspaceTrustDirectories287} from '../printOwnership287/workspaceTrust.js'

const source = (file: string, name: string): any => getPrintHostSource287(file, name)

/** Seed-only C seam: borrow the existing SDK descriptor while it is held.
 * No path stat, second open, new worker, state slot, or accepted-reader change.
 * The original bigint identity and bytes still use the accepted SDK IO seams.
 */
async function seedOpen287(path: string, flags: number) {
  const descriptor = await wrapOriginalSdkReadIo287('open', open)(path, flags)
  if (getConfinedFileToolContext287()?.kind !== 'sdk') return descriptor
  const held = getConfinedSdkRead287()
  return {
    stat: async (options: unknown) => {
      const identity = await descriptor.stat(options), snapshot = await held.stat()
      // dev/ino are immutable for this held fd. Sample size/mtime/regular
      // together, not from two differently timed metadata replies.
      return {...identity, size: BigInt(snapshot.size), mtimeMs: snapshot.mtimeMs, isFile: () => snapshot.regular}
    },
    read: descriptor.read,
    close: descriptor.close,
  }
}

/** Complete 287 print seed branch (without its transport ACK).
 * chunk-xapeakym.js UTF-16 [490114,491404), SHA256
 * 88c97e9bc1ec057e7e4b1dfd715ae22931e8a297547721d3c0d558a4d70fc37b.
 * P: original predicates/order/10MiB/normalizer/writer payload.
 * C: same SDK scope + descriptor metadata facade; original M6t's explicit IO
 * parameter keeps canonical-path identity checks in the same confined worker.
 */
export async function seedSdkReadState287(
  request: {path: string; mtime: number},
  context: () => ToolPermissionContext,
  writer: {set(path: string, seed: FileState): unknown},
  signal: AbortSignal = new AbortController().signal,
): Promise<void> {
  try {
    await runWithConfinedFileToolIo287(signal, async () => {
      const Xe = source('chunk-2ejbgdvw.js', 'Xe')
      const CB = source('chunk-a26hqvw3.js', 'CB'), HD = source('chunk-a26hqvw3.js', 'HD')
      const GA = source('chunk-5vadtxaa.js', 'GA'), Aa = source('chunk-6xrs6gmd.js', 'Aa')
      const jE = source('chunk-ay2eacsw.js', 'jE')
      const ie = source('chunk-tf63hv0k.js', 'cxn'), be = source('chunk-tf63hv0k.js', 'Y4t')
      const bind = source('chunk-xep95vq1.js', 'M6t'), pt = source('chunk-xep95vq1.js', 'az')
      const hw = wrapOriginalSdkReadIo287('realpath', realpath)
      const metadata = {realpath: hw, lstat: wrapOriginalSdkReadIo287('lstat', lstat)}
      const j = Xe(request.path), ue = CB(request.path, j, getWorkspaceTrustDirectories287(context()))
      if (!(!ue.ok || ue.pathsToCheck.some((path: string) => !GA(path, context(), 'read').allowed ||
        Aa(path, context(), 'read', 'deny') !== null || Aa(path, context(), 'read', 'ask') !== null))) {
        const St = await seedOpen287(j, ie)
        try {
          const it = await St.stat({bigint: true}), Bt = Math.floor(Number(it.mtimeMs))
          if (it.isFile() && it.size <= BigInt(10485760) && Bt <= request.mtime) {
            const ot = await pt(St, 10485760, it.size), Je = await hw(j)
            const jt = await bind(St, it, Je, metadata), kt = jt !== undefined && await be(jt, context())
            if (!(ot.overLimit || jt === undefined || !kt || HD(jt, getWorkspaceTrustDirectories287(context())) !== undefined ||
              !GA(jt, context(), 'read').allowed || Aa(jt, context(), 'read', 'deny') !== null ||
              Aa(jt, context(), 'read', 'ask') !== null)) {
              writer.set(j, {content: jE(ot.bytes.toString('utf-8')), timestamp: Bt,
                offset: undefined, limit: undefined, contentNotInModelContext: true})
            }
          }
        } finally {await St.close()}
      }
    }, 'sdk')
  } catch { /* Original seed is best-effort; print always emits its single success ACK. */ }
}
