export type OfficialRetryBackoff286 = (attempt: number, retryAfter?: string | null, capMs?: number, random?: () => number) => number
export type OfficialRetryBackoffPorts286 = Readonly<{
  Math: Pick<Math, 'random' | 'min' | 'max' | 'round'>
  parseInt: typeof globalThis.parseInt
  isNaN: typeof globalThis.isNaN
}>
export declare function createOfficialRetryBackoff286(ports: OfficialRetryBackoffPorts286): OfficialRetryBackoff286
