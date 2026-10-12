import { logForDebugging } from '../debug.js'

// packaging/installer.ts owns directory releases plus current/previous pointers.
// NBn owns executable *files* in the official claude/versions tree. Neither that
// tree nor an immutable C release has native-cleanup ownership in this product.
// Do not infer ownership from HOME, executable permissions or a symlink target.
export const nativeCleanupPathContract287 = {
  distribution: 'immutable-source-release',
  nativeBinaryCleanup: 'not-applicable',
  reason: 'C source releases are directories managed by packaging; official native installations are not C-owned',
} as const

export type NativeVersionCleanupSource287 = {
  NBn(): Promise<void>
  xt(staging: string): Promise<void>
  [name: string]: unknown
}

// The full original closure is exposed in the one shared namespace. No native
// app install/update entry is admitted by this source accessor.
export function getNativeVersionCleanupSource287(): NativeVersionCleanupSource287 {
  const { getOriginalModsLifecycle287 } = import.meta.require('../hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../hooks/modelSwitch287/lifecycleRuntime.js')
  return getOriginalModsLifecycle287().clearSourceModule287(
    'chunk-qr1pdq5r.js',
  ) as NativeVersionCleanupSource287
}

export async function cleanupNativeVersions287(): Promise<typeof nativeCleanupPathContract287> {
  logForDebugging(`Skipping native binary cleanup: ${nativeCleanupPathContract287.reason}`)
  return nativeCleanupPathContract287
}
