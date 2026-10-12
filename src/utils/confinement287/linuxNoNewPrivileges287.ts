import { ConfinementPolicyError287 } from './confinementError287.js'
import type { Library } from 'bun:ffi'

// libc prctl(int option, ...): explicitly supply all five arguments. Linux
// x64/arm64 are LP64: the four variadic unsigned longs MUST be 64 bits, not i32.
// https://man7.org/linux/man-pages/man2/prctl.2.html (including width caveat)
// https://man7.org/linux/man-pages/man2/PR_GET_NO_NEW_PRIVS.2const.html
// https://man7.org/linux/man-pages/man2/PR_SET_NO_NEW_PRIVS.2const.html
const definitions = {
  prctl: { args: ['i32', 'u64', 'u64', 'u64', 'u64'], returns: 'i32' },
} as const
const PR_SET_NO_NEW_PRIVS = 38
const PR_GET_NO_NEW_PRIVS = 39

function unavailable(): never {
  // Keep loader/native exception details out of bootstrap logs.
  throw new ConfinementPolicyError287('LINUX_NO_NEW_PRIVILEGES_UNAVAILABLE')
}

/**
 * Synchronous bootstrap on the calling execution thread, AFTER non-admin check
 * and BEFORE config/auth/tools or child creation. Inert on other platforms.
 * https://docs.kernel.org/userspace-api/no_new_privs.html: inherited across
 * fork/clone/execve, cannot be unset; blocks exec-time setuid/setgid/file-cap
 * gains. Not capability removal, a workspace sandbox, or retroactive protection
 * for existing threads/children. Linux native acceptance is a separate gate.
 */
export function assertLinuxNoNewPrivileges287(): void {
  if (process.platform !== 'linux') return
  if (!['x64', 'arm64'].includes(process.arch)) unavailable()

  let library: Library<typeof definitions> | undefined
  let verified = false
  let failed = false
  try {
    // Same mature synchronous loading pattern as windowsTokenCapability287;
    // no subprocess, env/config fallback, or cached JS success.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ffi = require('bun:ffi') as typeof import('bun:ffi')
    // Fixed system soname, never a config/env/CWD-derived library path.
    library = ffi.dlopen('libc.so.6', definitions)
    const prctl = library.symbols.prctl
    const before = prctl(PR_GET_NO_NEW_PRIVS, 0n, 0n, 0n, 0n)
    if (before !== 0 && before !== 1) unavailable()
    if (before === 0) {
      if (prctl(PR_SET_NO_NEW_PRIVS, 1n, 0n, 0n, 0n) !== 0) unavailable()
      if (prctl(PR_GET_NO_NEW_PRIVS, 0n, 0n, 0n, 0n) !== 1) unavailable()
    }
    verified = true
  } catch { failed = true }
  finally {
    try { library?.close() } catch { failed = true }
  }
  if (failed || !verified) unavailable()
}
