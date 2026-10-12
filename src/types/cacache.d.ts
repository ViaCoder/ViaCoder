/** Runtime surface consumed from cacache 20.0.4 (lib/index.js, entry-index.js). */
declare module 'cacache' {
  export type CacheIndexEntry = {
    key: string
    time: number
    integrity: string
    size: number
    metadata?: unknown
  }

  export const ls: {
    (cache: string): Promise<Record<string, CacheIndexEntry>>
    stream(cache: string): AsyncIterable<CacheIndexEntry>
  }

  export const rm: {
    entry(cache: string, key: string): Promise<void>
  }
}
