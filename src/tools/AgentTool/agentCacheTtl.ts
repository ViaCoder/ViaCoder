/** Official npm 2.1.283 chunk-3r295g4p.js:eGn with ugn key normalization
 * and chunk-ze990dc9.js:dUe. Invalid experimental values are ignored. */
export type AgentCacheTtl = '5m' | '1h'

export function parseAgentCacheTtl(value: unknown): AgentCacheTtl | undefined {
  if (typeof value !== 'object' || value === null) return
  const experimental = (value as Record<string, unknown>).experimental
  if (typeof experimental !== 'object' || experimental === null || Array.isArray(experimental)) return
  const entry = Object.entries(experimental).find(([key]) =>
    key.replace(/[-_]/g, '').toLowerCase() === 'cachettl')
  return entry?.[1] === '5m' || entry?.[1] === '1h' ? entry[1] : undefined
}
