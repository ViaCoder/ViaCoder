/**
 * Memory-directory scanning primitives. Split out of findRelevantMemories.ts
 * so extractMemories can import the scan without pulling in sideQuery and
 * the API-client chain (which closed a cycle through memdir.ts — #25372).
 */

import {getMemoryDirectoryRuntime287} from './memoryDirectoryRuntime287.js'
import type {MemoryHeader287,MemoryScanBackend287} from '../utils/officialMemoryDirectory287/native.js'
export type MemoryHeader=MemoryHeader287

/** Same bqn used by recall, extraction and index backfill. The regular-file
 * arm keeps its no-follow head handle through the actual Ake reader. */
export function scanMemoryFiles(memoryDir:string,signal:AbortSignal,options?:{regularFilesOnly?:boolean},backend?:MemoryScanBackend287):Promise<MemoryHeader[]> {
 return getMemoryDirectoryRuntime287().scan(memoryDir,signal,options,backend)
}

/**
 * Format memory headers as a text manifest: one line per file with
 * [type] filename (timestamp): description. Used by both the recall
 * selector prompt and the extraction-agent prompt.
 */
export function formatMemoryManifest(memories: MemoryHeader[]): string {
  return memories
    .map(m => {
      const tag = m.type ? `[${m.type}] ` : ''
      const ts = new Date(m.mtimeMs).toISOString()
      return m.description
        ? `- ${tag}${m.filename} (${ts}): ${m.description}`
        : `- ${tag}${m.filename} (${ts})`
    })
    .join('\n')
}
