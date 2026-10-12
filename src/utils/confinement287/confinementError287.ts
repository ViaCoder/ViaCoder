// Same named Error + readonly code style as src/utils/errors.ts. No auth imports.
export type ConfinementErrorCode287 =
  | 'ADMINISTRATOR_PROCESS'
  | 'PRIVILEGE_CHECK_UNAVAILABLE'
  | 'LINUX_NO_NEW_PRIVILEGES_UNAVAILABLE'
  | 'INVALID_WORKSPACE_POLICY'
  | 'FORBIDDEN_WORKSPACE_ROOT'
  | 'WORKSPACE_IDENTITY_CHANGED'
  | 'PATH_OUTSIDE_WORKSPACE'
  | 'PATH_UNAVAILABLE'
  | 'DIRECT_MUTATION_KERNEL_BACKEND_UNAVAILABLE'
  | 'POLICY_CLOSED'

export class ConfinementPolicyError287 extends Error {
  constructor(public readonly code: ConfinementErrorCode287) {
    // Static messages: don't copy paths, credentials or native exceptions to logs.
    super(`Workspace confinement: ${code}`)
    this.name = 'ConfinementPolicyError287'
  }
}

// Same structural errno extraction as src/utils/errors.ts:getErrnoCode.
export function getErrnoCode287(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'code' in error &&
      typeof error.code === 'string') return error.code
  return undefined
}
