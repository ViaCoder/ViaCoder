/** Pure wire projection primitives shared by the HTTP owner and browser.
 * No executor, credentials, CLI schema initialization or platform imports. */
export type Row = Record<string, unknown>
export const record = (value: unknown): Row | null => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Row : null
export const str = (value: unknown): string | undefined => typeof value === 'string' ? value : undefined
export const num = (value: unknown): number | undefined => typeof value === 'number' && Number.isFinite(value) ? value : undefined
export const bool = (value: unknown): boolean | undefined => typeof value === 'boolean' ? value : undefined
export const stringArray = (value: unknown): string[] | undefined => Array.isArray(value) && value.every(item => typeof item === 'string') ? value : undefined
export function pick(row: Row, fields: readonly string[], read: (value: unknown) => unknown): Row {
  const out: Row = {}
  for (const key of fields) {
    const value = read(row[key])
    if (value !== undefined) out[key] = value
  }
  return out
}
export function rows(value: unknown, project: (row: Row) => Row | null): Row[] | null {
  if (!Array.isArray(value)) return null
  const result: Row[] = []
  for (const item of value) {
    const row = record(item)
    const projected = row && project(row)
    if (!projected) return null
    result.push(projected)
  }
  return result
}
