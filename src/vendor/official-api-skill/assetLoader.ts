import { readFileSync } from 'node:fs'
import encodings from './encodings.json'

// Bun's native bundle can require embedded text assets. Source execution reads
// their verified bytes instead; the zstd magic check matches chunk-n4sab4fy.
export function readAsset(path: string): string {
  const bytes = readFileSync(new URL(path, import.meta.url))
  const compressed = bytes.length >= 4 && [40, 181, 47, 253].every((value, index) => bytes[index] === value)
  if (compressed) return Buffer.from(Bun.zstdDecompressSync(bytes)).toString('utf8')
  const encoding = (encodings as Record<string, number>)[path]
  return bytes.toString(encoding === 2 ? 'utf16le' : encoding === 1 ? 'latin1' : 'utf8')
}
