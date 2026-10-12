import {open, mkdir, rename, unlink} from 'node:fs/promises'
import {join, dirname} from 'node:path'
import {z} from 'zod'
import {getClaudeConfigHomeDir} from '../envUtils.js'
import {servedCatalogCacheSchema, type ServedCatalog} from './servedCatalog.js'

// 2.1.283 chunk-y3dsk95a:y/JWe/k/hvt/bso/wso/QWe; chunk-hzevqd7x:TU.
const MAX_BYTES = 2_097_152 + 4096
export function isServedETag(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 256 && /^(?:W\/)?"[!#-~\x80-\xff]*"$/.test(value)
}
export function hasDroppedServedRows(catalog: ServedCatalog | null): boolean {
  return !!(catalog?.config.dropped_model_ids?.length || catalog?.config.dropped_unidentified_rows)
}
const schema = z.object({version: z.literal(2), fetchedAt: z.number().finite(), staleAt: z.number().finite(),
  etag: z.string().refine(isServedETag).optional(), catalog: servedCatalogCacheSchema.nullable()})
export type ServedCacheEntry = z.infer<typeof schema>
export function makeServedCacheEntry(catalog: ServedCatalog | null, etag?: unknown, now = Date.now(), random = Math.random()): ServedCacheEntry {
  return {version: 2, fetchedAt: now, staleAt: now + Math.round(3_600_000 * (1 + 0.1 * (2 * random - 1))), catalog,
    ...(isServedETag(etag) && !hasDroppedServedRows(catalog) && {etag})}
}
export function isServedCacheStale(entry: ServedCacheEntry, now = Date.now()): boolean {
  return now < entry.fetchedAt || now >= entry.staleAt || entry.staleAt > entry.fetchedAt + 3_600_000 * 1.1
}
export function servedCachePath(scope: string, surface: ServedCatalog['surface']): string {
  if (!/^(?:tok-[a-f0-9]{12}|[a-f0-9-]{36}-[a-f0-9]{12})$/.test(scope)) throw Error('Invalid catalog cache scope')
  return join(getClaudeConfigHomeDir(), 'cache', 'model-catalog', `${scope}-${surface}.json`)
}
export async function readServedCache(scope: string, surface: ServedCatalog['surface']): Promise<ServedCacheEntry | undefined> {
  const path = servedCachePath(scope, surface)
  let file: Awaited<ReturnType<typeof open>> | undefined
  try {
    file = await open(path, 'r')
    const info = await file.stat()
    if (!info.isFile() || info.size > MAX_BYTES) throw Error('Invalid catalog file')
    const bytes = Buffer.alloc(MAX_BYTES + 1), {bytesRead} = await file.read(bytes, 0, bytes.length, 0)
    if (bytesRead > MAX_BYTES) throw Error('Oversized catalog file')
    const entry = schema.parse(JSON.parse(bytes.subarray(0, bytesRead).toString('utf8')))
    if (entry.catalog && entry.catalog.surface !== surface) throw Error('Catalog surface mismatch')
    if (hasDroppedServedRows(entry.catalog)) delete entry.etag
    return entry
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') await unlink(path).catch(() => {})
    return undefined
  } finally { await file?.close().catch(() => {}) }
}
export async function writeServedCache(scope: string, surface: ServedCatalog['surface'], entry: ServedCacheEntry): Promise<void> {
  const path = servedCachePath(scope, surface), temp = `${path}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`
  try {
    await mkdir(dirname(path), {recursive: true, mode: 0o700})
    const file = await open(temp, 'wx', 0o600)
    try { await file.writeFile(JSON.stringify(entry)); await file.sync() } finally { await file.close() }
    await rename(temp, path)
  } catch { await unlink(temp).catch(() => {}) } // A disk error must not discard usable in-memory rows.
}
