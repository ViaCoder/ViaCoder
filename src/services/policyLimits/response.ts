import { z } from 'zod/v4'
import { createHash } from 'node:crypto'
import { lazySchema } from '../../utils/lazySchema.js'
import { jsonStringify } from '../../utils/slowOperations.js'
import { count, uniq } from '../../utils/array.js'
import { createPolicyText } from './official/protocol.js'
import { createPolicyResponse287 } from './officialPublic287/response.js'
import { createPolicyChecksum287 } from './officialPublic287/checksum.js'

// Keep the existing complete text-sanitizer primitive; restore the raw 287
// response parser/WeakMap and checksum on this same production response owner.
const text = createPolicyText({})
export function bindPolicyResponsePorts287(): Record<string, unknown> {
  return { f: lazySchema, u: z.object, de: z.record, o: z.string, H: z.boolean,
    T: z.array, se: z.unknown, hD: text.sanitize, re: text.truncate,
    G: count, L: uniq }
}
const native = createPolicyResponse287(bindPolicyResponsePorts287())
const checksum = createPolicyChecksum287({ _m: createHash, _: jsonStringify })
export const policyResponseKernel = {
  ...native,
  checksum: (policy: Parameters<typeof native.rawResponse>[0]) => checksum.Dwe(native.rawResponse(policy)),
}
