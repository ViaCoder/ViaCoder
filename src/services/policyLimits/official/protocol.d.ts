import type { z } from 'zod/v4'
import type axios from 'axios'
import type { createHash } from 'node:crypto'

export type PolicyResponse = {
  restrictions: Record<string, { allowed: boolean }>
  compliance_taints: string[]
  monitoring_notice: { text: string; url?: string | null } | null
  defaults: Record<string, unknown>
  core_skills?: string[]
}
export function createPolicyText(ports: Record<string, never>): {
  sanitize(text: string, replacement: string, options?: { keepNewlines?: boolean; keepEmojiJoiners?: boolean }): string
  truncate(text: string, limit: number): string
  urlHasHiddenControls(text: string): boolean
}
export function createPolicySchema(ports: {
  O: typeof z.boolean; ae: typeof z.unknown; d: typeof z.object
  k: typeof z.array; o: typeof z.string; ue: typeof z.record
  p<T>(factory: () => T): () => T
  pO: ReturnType<typeof createPolicyText>['sanitize']
  re: ReturnType<typeof createPolicyText>['truncate']
  r$e: ReturnType<typeof createPolicyText>['urlHasHiddenControls']
  nm: typeof createHash
  S(value: unknown): string
}): {
  schema(): z.ZodType<PolicyResponse>
  parse(value: unknown): ReturnType<z.ZodType<PolicyResponse>['safeParse']>
  lossyCount(value: unknown): number
  rawResponses: WeakMap<object, unknown>
  rawResponse(value: PolicyResponse): unknown
  checksum(value: PolicyResponse): string
}
export type PolicyRequest = {
  endpoint: string; authHeaders: Record<string, string>; timeoutMs: number
  ifNoneMatch?: string; socketPath?: string; acceptAny2xx?: boolean
}
export type PolicyTransportResult = {
  kind: 'not_modified'; signature?: string; tunnelCredentialEpoch?: number
} | {
  kind: 'ok'; data: unknown; signature?: string; contentType: string; tunnelCredentialEpoch?: number
}
export function createPolicyProtocol(ports: {
  Ms(): boolean; Nc(): boolean; Pe(): string
  TS(options: { skipRetrievingKeyFromApiKeyHelper: boolean }): { key: string | null }
  Wi(): string; a: NodeJS.ProcessEnv; bC: string
  f(): { tunnelSocket?: string | null }; gt: typeof axios
  ln(): { accessToken: string; scopes: string[]; subscriptionType?: string | null } | null
}): {
  socketPath(): string | undefined
  ineligibleReason(options?: { skipBaseUrlCheck?: boolean }): string | undefined
  eligible(): boolean
  request(request: PolicyRequest): Promise<PolicyTransportResult>
  errorCredentialEpoch(error: unknown): number | undefined
  skipHttpRetry(status: number | undefined): boolean
}
