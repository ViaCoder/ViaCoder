import type { PolicyLimitsResponse } from '../types.js'
import type { PolicyFetchOutcome287, PolicyPrincipal287, HipaaEvidence287, PolicyStamp287, StampRead287 } from './principal.js'
export declare function createPolicyPublicClient287(ports: Record<string, unknown>): {
  wh(policy: string): null|'latched'|'route_missing'|'cache_miss'|'org_denied'
  xBe(listener: () => void): () => void
  ase():string[]
  x3(policy:string):{featureLabel:string;verb:string}
  op(policy:string,featureLabel:string,verb:string,override?:string):string|null
  eSn(stamp: StampRead287): boolean
  zXn(stamp: StampRead287, evidence: HipaaEvidence287): HipaaEvidence287
  tjt(stamp: PolicyStamp287): HipaaEvidence287
  njt(policy: PolicyLimitsResponse | null): void
  tSn(policy: PolicyLimitsResponse | null): void
  QXn(digest: string | null): void
  tzr(): void
  Fht(): void
  on(policy: string): boolean
  Z_(): PolicyLimitsResponse | null
  sjt(): PolicyLimitsResponse | null
  s7n(policy: PolicyLimitsResponse, stamp: StampRead287): PolicyLimitsResponse | null
  Lht(policy: PolicyLimitsResponse): void
  a7n(): void
  e7n(outcome: PolicyFetchOutcome287 | null, identity?: string | null, awaited?: boolean): void
  rU(): boolean
  dbe(): boolean
  mPe(): boolean
  mts(): 'loaded'|'pending'|'unobtainable'|'unobtainable_seen_hipaa'
  gts(policy: string): boolean
  PBe(stamp: StampRead287): void
  $ht(): void
  ZGr(options: {principal: PolicyPrincipal287; bodySha: string; confirmedAt: number; bodyTaints: string[]; previous: HipaaEvidence287; authority: 'prior_evidence'|'confirmed'}): PolicyStamp287
  RBe(path: string): Promise<StampRead287>
  I(path: string): StampRead287
  SGo(evidence: HipaaEvidence287): PolicyStamp287
  rjt(): void
  nSn(): void
  c7n(checksum: string, evidence: HipaaEvidence287, confirmed: number): void
  d7n(checksum: string | undefined, confirmed: number): void
  y_(): boolean
  k3(options?: {skipBaseUrlCheck?: boolean}): string | undefined

  B0(): PolicyLimitsResponse | null
  XXe(): number
  rzr(): void
  cbe(): boolean
  WE(): string
  sSn(text: string): PolicyLimitsResponse | null
  hzr(policy: PolicyLimitsResponse): boolean
  oSn(): HipaaEvidence287
  VXn(path: string, stamp: PolicyStamp287): Promise<void>
  qXn(path: string, stamp: PolicyStamp287): Promise<boolean>
  dzr(): string | null
  r7n(): boolean
  TBe: PolicyLimitsResponse
  rSn(): 'none'|'legacy'|'match'|'foreign'|'torn'|'disabled'
  lzr(): string | null
  lbe(): PolicyFetchOutcome287 | null
  KXe: number
  bGo(path: string): Promise<void>
  o7n(options?: {skipBaseUrlCheck?: boolean}): 'third_party_provider'|'custom_base_url'|undefined
  azr(): boolean
  ZXn(): boolean | undefined
  YXn: number
  n7n(): boolean
  uzr(): number | null
  nzr(taints: string[]): void
  XXn(): StampRead287
  u7n(storage: unknown, policy: PolicyLimitsResponse | null): void
  JXn(stamp: StampRead287): StampRead287
  gGo: string[]
  hGo: string[]
  yGo: string[]
  p7n(): boolean
}
