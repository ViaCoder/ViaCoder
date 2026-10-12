import type { OfficialPolicyPrincipal286, OfficialPolicyPrincipalHostState286 } from '../officialIdentity286/principal.js'
import type { PolicyLimitsResponse } from '../types.js'
import type { Signal } from '../../../utils/signal.js'
export type PolicyPrincipal287 = OfficialPolicyPrincipal286 & {bearerDigest?: string;storedLoginOrgless?: boolean;unclassified?: boolean}
export type PolicyFetchOutcome287 = { success: boolean; retrying?: boolean; httpStatus: number | null; errorCode?: string }
export type HipaaEvidence287 = { seen: string[]; incomplete: boolean; ruledOut: string[] }
export type PolicyStamp287 = { v: 1; identity: string; kind: string; sha: string; confirmed_at: number; hipaa_seen: string[]; hipaa_seen_incomplete?: boolean; hipaa_ruled_out?: string[] }
export type StampRead287 = {kind:'absent'} | {kind:'ok';stamp:PolicyStamp287} | {kind:'unusable';cause:'io'|'content';code?:string}
export interface PolicyPrincipalState287 extends OfficialPolicyPrincipalHostState286 {
  sessionCache: PolicyLimitsResponse | null
  lastFetchOutcome: PolicyFetchOutcome287 | null
  settledWithoutVerdictFor: string | null
  failOpenVerdict: boolean
  sessionFromServerFetch: boolean
  lastServedCoreSkills: string[] | null
  verdictEnvBearerDigest: string | null
  diskAdoptionSuppressed: boolean
  diskAdoptionEpoch: number
  storageV5?: unknown
  lastStampVerdict: string
  lastStampMatchedIdentity: string | null
  hipaaEvidence: HipaaEvidence287
  hipaaSeenUnreadable: boolean
  diskBodyChecksum: string | null
  diskConfirmedAtMs: number | null
  diskRefusedAtMs: number | null
  hipaaEvidenceLoaded: boolean
  hintedTaints: string[]
  hintedDeniedKeys: string[]
  hintedEnforcedKeys: string[]
  sessionAttributed: boolean
  attributedBearerDigest: string | null
  sessionVerdictDisowned: boolean
  evidenceRereadForBearer?: string | null
  cacheRevision: number
  verdictChanged: Signal
  heldStartSignal: Signal
  replaceSessionCache(policy: PolicyLimitsResponse | null, failOpen?: boolean, preserveAttribution?: boolean): void
  effectiveTaints(taints?: string[]): string[]
  dropHintedTaints(): void
  hintFromRefusedBody(policy: PolicyLimitsResponse): void
  emitVerdictChanged(): void
}
export interface PolicyCatalogEntry287 { deniedUnder: string[]; onCacheMiss: 'allow'|'deny'|'hold'; onFailOpenVerdict?: 'deny'; serverPopulated?: boolean; transcriptScan?: boolean; hardBlockUnder?: string[]; label: string; verb: string; requirementId: string }
export declare function createOfficialPolicyPrincipal287(ports: Record<string, unknown>): {
  xq(): PolicyPrincipal287 | null
  Kne(principal: PolicyPrincipal287): string
  Yne(value: string): string
  rBr(): void
  Z4n(storage: unknown, credentials: unknown): Promise<void>
  jD(): string | undefined
  p(): PolicyPrincipalState287
  registry: Record<string, PolicyCatalogEntry287>
}
