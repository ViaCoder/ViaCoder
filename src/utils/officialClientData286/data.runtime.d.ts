/** Native data is deliberately unfiltered: arrays and nullable override values retain raw behavior. */
export type OfficialClientDataState286 = {
  clientDataCacheKeyGetter: ((model?: string) => string) | null
  clientDataReadGate: (() => boolean) | null
  clientDataWindowSeed: {key: string; data: any} | null
  clientDataOverride: ((data: any, model?: string) => any) | null
}
export type OfficialClientDataReader286Ports = Readonly<{
  ce(): {clientDataCacheSlots?: unknown; clientDataCache?: unknown}
  oe(): OfficialClientDataState286
}>
export type OfficialClientDataRecord286 = {data: any; model?: string}
export declare function createOfficialClientDataReader286(ports: OfficialClientDataReader286Ports): {
  Td(model?: string): any
  zYn(model?: string): OfficialClientDataRecord286 | null
  dw(state: OfficialClientDataState286, model?: string): OfficialClientDataRecord286 | null
  Mgt(slot: unknown): boolean
  DYn: string
}
