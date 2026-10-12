export type MemoryFrontmatter287 = {
  name: string | null
  description: string | null
  metadata: Readonly<Record<string, unknown>>
}
export function memoryFrontmatter287(types: readonly string[]): string[]
export function normalizeMemoryFrontmatter287(value: Record<string, unknown>): MemoryFrontmatter287
export function memoryMetadata287(value: MemoryFrontmatter287, key: string): string | null
export const memoryAccessGuidance287: readonly string[]
