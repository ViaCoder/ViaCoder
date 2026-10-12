import { realpathSync, readdirSync, statSync } from 'node:fs'
import { dirname, isAbsolute, join } from 'node:path'
import { ServeConflict } from './serveSession.js'

/** Resolve once at session admission; workers and recovered history keep this cwd. */
export function canonicalHostDirectory(value: unknown): string {
  if (typeof value !== 'string' || !isAbsolute(value) || value.includes('\0')) throw new ServeConflict('An absolute host directory is required')
  try {
    const canonical = realpathSync(value)
    if (!statSync(canonical).isDirectory()) throw new ServeConflict('Host path is not a directory')
    return canonical
  } catch (error) {
    if (error instanceof ServeConflict) throw error
    throw new ServeConflict('Host directory is unavailable')
  }
}

export type HostDirectoryListing = { path: string; parent: string | null;
  directories: Array<{ name: string; path: string }> }

/** Directory names only; no file reads, content search, or project metadata probing. */
export function listHostDirectories(value: unknown): HostDirectoryListing {
  const path = canonicalHostDirectory(value)
  let names: string[]
  try { names = readdirSync(path) }
  catch { throw new ServeConflict('Host directory cannot be listed') }
  const directories: HostDirectoryListing['directories'] = []
  for (const name of names) {
    try {
      const child = canonicalHostDirectory(join(path, name))
      directories.push({ name, path: child })
    } catch { /* Files and inaccessible directories are not listed. */ }
  }
  directories.sort((a, b) => a.name.localeCompare(b.name))
  return { path, parent: dirname(path) === path ? null : dirname(path), directories }
}
