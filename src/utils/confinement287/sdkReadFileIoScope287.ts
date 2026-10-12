import {getConfinedFileToolContext287, getConfinedSdkRead287, openConfinedSdkRead287} from './fileToolIoScope287.js'
import type {FileIoIdentityStat287} from './fileIoProtocol287.js'
import {normalizeFileIoPrivateAlias287} from './fileIoProtocol287.js'

function bigintStat(value: FileIoIdentityStat287) {
  return {dev: BigInt(value.dev), ino: BigInt(value.ino), size: BigInt(value.size), isFile: () => value.regular}
}

/** Import-only C seams. X4t/M6t/az retain their full original algorithms.
 * The descriptor and every byte read remain in the existing OS-confined child.
 * Other module callers, including ordinary tool scopes, use original imports.
 */
export function wrapOriginalSdkReadIo287(operation: 'open' | 'realpath' | 'lstat' | 'readlink', original: (...args: any[]) => any) {
  return (...args: any[]) => {
    if (getConfinedFileToolContext287()?.kind !== 'sdk') return original(...args)
    if (operation === 'open') return (async () => {
      const held = await openConfinedSdkRead287(args[0])
      return {
        stat: async () => bigintStat(await held.identityStat()),
        read: async (buffer: Buffer, offset: number, length: number, position: number) => {
          const bytes = await held.readAt(position, length)
          bytes.copy(buffer, offset)
          return {bytesRead: bytes.length, buffer}
        },
        close: () => held.close(),
      }
    })()
    const held = getConfinedSdkRead287()
    if (operation === 'lstat') return held.identityStat(normalizeFileIoPrivateAlias287(args[0])).then(bigintStat)
    return held[operation](normalizeFileIoPrivateAlias287(args[0]))
  }
}
