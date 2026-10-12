export type CompactGatesHost = {
  a: {DISABLE_AUTO_COMPACT: boolean; CLAUDE_CODE_REMOTE: boolean}
  Le(value: string | undefined): boolean
  x(name: string, fallback: boolean): boolean
  fs(): string[]
  hk(): boolean
  he(source: string): Record<string, unknown> | null
  le(): Record<string, unknown>
  WT: Record<string, unknown>
  hFt(key: string): boolean
  Jut(key: string, value: unknown): boolean | undefined
  Lce(key: string, value: unknown): boolean | undefined
}
export function createOfficialCompactGates(host: CompactGatesHost): {
  Nf(): boolean
  Dj(): boolean
  W$(): boolean
}
