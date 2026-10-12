import type { CuPermissionRequest, CuPermissionResponse } from '../../vendor/official-desktop/nativeTypes.js'
import { DEFAULT_GRANT_FLAGS } from '../../vendor/official-desktop/index.js'
import { createComputerUseApprovalCaller287, createComputerUseApprovalSpec287 } from './approvalNative287.js'
import { lazySchema } from '../lazySchema.js'
import { z } from 'zod'

export interface ComputerUseDialogSpec287 {
  kind: 'computer_use_approval'
  payload(): { safeParse(value: unknown): { success: boolean; data?: unknown } }
  result(): { safeParse(value: unknown): { success: true; data: CuPermissionResponse } | { success: false; error?: unknown } }
  default: CuPermissionResponse
  hideWhile: readonly string[]
}
export type ComputerUseRequestDialog287 = (spec: ComputerUseDialogSpec287, request: CuPermissionRequest,
  options: { signal: AbortSignal }) => Promise<CuPermissionResponse>
let spec: ComputerUseDialogSpec287 | undefined
export function getComputerUseApprovalSpec287(): ComputerUseDialogSpec287 {
  if (spec) return spec
  // Same established schema ABI ports as officialRlt287 / SDK dialogs. The
  // shared graph cuts f/Id to these libraries; it does not publish those raw
  // module namespaces. No second Zod tree or permission requester is created.
  return spec = createComputerUseApprovalSpec287(lazySchema, z.custom, DEFAULT_GRANT_FLAGS)
}
export function requestComputerUseDialog287(context: { abortController: Pick<AbortController, 'signal'>; requestDialog?: ComputerUseRequestDialog287 }, request: CuPermissionRequest): Promise<CuPermissionResponse> {
  // Complete original U; p is the already-active ToolUseContext, not a second
  // mutable context/session owner. Missing presenter retains original denial.
  return createComputerUseApprovalCaller287(() => context, getComputerUseApprovalSpec287(), DEFAULT_GRANT_FLAGS)(request)
}
