import type { z } from 'zod/v4'
import type { PolicyResponse } from '../official/protocol.js'
export declare function createPolicyResponse287(ports: Record<string, unknown>): {
  schema(): z.ZodType<PolicyResponse>
  parse(value: unknown): ReturnType<z.ZodType<PolicyResponse>['safeParse']>
  rawResponse(value: PolicyResponse): unknown
  lossyCount(value: unknown): number
}
