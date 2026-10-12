import { ConfinementPolicyError287 } from './confinementError287.js'

export type ExecutionEntry287 =
  | 'cli' | 'web' | 'print' | 'agent' | 'execution-service' | 'worker'

export type WindowsTokenFacts287 = Readonly<{
  processId: number
  elevated: boolean
  elevationType: 'default' | 'full' | 'limited'
  administratorsSidEnabled: boolean
}>

/**
 * Trusted native capability, NOT a setting/env/model-supplied report.
 * Implementation must query the CURRENT process token using platform APIs
 * (OpenProcessToken/GetTokenInformation; enabled Administrators SID membership).
 * Native adapter must handle or reject thread impersonation. No username test,
 * subprocess/PowerShell fallback, cached success or synthetic default token.
 * The Windows provider uses Bun FFI; native platform acceptance remains separate.
 */
export interface WindowsTokenCapability287 {
  readonly kind: 'windows-current-process-token-v1'
  queryCurrentProcessToken(): WindowsTokenFacts287
}

export type ProcessPrivilegeFacts287 =
  | Readonly<{ kind: 'posix'; entry: ExecutionEntry287; uid: number; euid: number }>
  | Readonly<{ kind: 'windows'; entry: ExecutionEntry287; token: WindowsTokenFacts287 }>

/** Call BEFORE config/auth/helper/tool initialization at EVERY runtime entry. */
export function assertNonAdministrator287(
  entry: ExecutionEntry287,
  windowsCapability?: WindowsTokenCapability287,
): ProcessPrivilegeFacts287 {
  if (process.platform === 'win32') {
    let token: WindowsTokenFacts287
    try {
      if (windowsCapability?.kind !== 'windows-current-process-token-v1') {
        throw new Error('missing native capability')
      }
      const facts = windowsCapability.queryCurrentProcessToken()
      if (!facts || facts.processId !== process.pid ||
          typeof facts.elevated !== 'boolean' ||
          typeof facts.administratorsSidEnabled !== 'boolean' ||
          !['default', 'full', 'limited'].includes(facts.elevationType)) {
        throw new Error('invalid native token facts')
      }
      token = Object.freeze({ ...facts })
    } catch {
      throw new ConfinementPolicyError287('PRIVILEGE_CHECK_UNAVAILABLE')
    }
    if (token.elevated || token.elevationType === 'full' ||
        token.administratorsSidEnabled) {
      throw new ConfinementPolicyError287('ADMINISTRATOR_PROCESS')
    }
    return Object.freeze({ kind: 'windows', entry, token })
  }

  let uid: number
  let euid: number
  try {
    if (typeof process.getuid !== 'function' || typeof process.geteuid !== 'function') {
      throw new Error('missing POSIX identity APIs')
    }
    uid = process.getuid()
    euid = process.geteuid()
    if (!Number.isSafeInteger(uid) || !Number.isSafeInteger(euid) || uid < 0 || euid < 0) {
      throw new Error('invalid POSIX identity')
    }
  } catch {
    throw new ConfinementPolicyError287('PRIVILEGE_CHECK_UNAVAILABLE')
  }
  // No IS_SANDBOX/bubblewrap/skip exception, including uid != 0 && euid == 0.
  if (uid === 0 || euid === 0) throw new ConfinementPolicyError287('ADMINISTRATOR_PROCESS')
  return Object.freeze({ kind: 'posix', entry, uid, euid })
}
