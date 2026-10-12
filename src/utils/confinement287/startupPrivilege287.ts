import {assertNonAdministrator287, type ExecutionEntry287, type ProcessPrivilegeFacts287} from './processPrivilege287.js'
import {createWindowsTokenCapability287} from './windowsTokenCapability287.js'
import {assertLinuxNoNewPrivileges287} from './linuxNoNewPrivileges287.js'

/** No config/auth imports: this gate must precede ordinary CLI initialization. */
export function assertExecutionProcess287(entry: ExecutionEntry287): ProcessPrivilegeFacts287 {
  const facts = assertNonAdministrator287(entry,
    process.platform === 'win32' ? createWindowsTokenCapability287() : undefined)
  if (process.platform === 'linux') assertLinuxNoNewPrivileges287()
  return facts
}
