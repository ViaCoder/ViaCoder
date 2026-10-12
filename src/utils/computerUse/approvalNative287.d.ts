import type { CuPermissionRequest, CuPermissionResponse } from '../../vendor/official-desktop/nativeTypes.js'
import type { ComputerUseDialogSpec287, ComputerUseRequestDialog287 } from './approval287.js'
export function createComputerUseApprovalSpec287(f: unknown, Id: unknown, flags: CuPermissionResponse['flags']): ComputerUseDialogSpec287
export function createComputerUseApprovalCaller287(p: () => { abortController: Pick<AbortController, 'signal'>; requestDialog?: ComputerUseRequestDialog287 }, spec: ComputerUseDialogSpec287, flags: CuPermissionResponse['flags']): (request: CuPermissionRequest) => Promise<CuPermissionResponse>
