import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import provenance from './host-provenance.json'

type Binding = Record<string, any>
type NativeName = 'computer-use-swift' | 'computer-use-input'

// A load operation only: no permission requests, hotkeys, screenshots or input.
// Dependencies are injectable for offline failure/cache tests without dlopen.
export function createOfficialNativeLoader(deps: {
  platform: string; arch: string
  read: (path: string) => Uint8Array
  load: (path: string) => Binding
} = { platform: process.platform, arch: process.arch, read: readFileSync, load: createRequire(import.meta.url) }) {
  const cache = new Map<NativeName, Binding>()
  return (name: NativeName): Binding => {
    if (deps.platform !== 'darwin' || (deps.arch !== 'arm64' && deps.arch !== 'x64')) {
      throw new Error(`Official desktop 2.1.287 native capability unavailable for ${deps.platform}-${deps.arch}`)
    }
    const existing = cache.get(name)
    if (existing) return existing
    // Use the exact target's extraction. These bytes are universal today, but
    // target-specific paths keep provenance explicit and prevent an x64 load
    // from silently falling back to the arm64 package if x64 is ever absent.
    const target = `darwin-${deps.arch}`
    const relative = `native/${target}/${name}.node`
    const entry = provenance.files.find(file => file.path === relative)
    const path = fileURLToPath(new URL(relative, import.meta.url))
    if (!entry) throw new Error(`Official desktop 2.1.287 native capability unavailable for ${target}: ${name} has no verified source`)
    let bytes: Uint8Array
    try { bytes = deps.read(path) }
    catch { throw new Error(`Official desktop 2.1.287 native capability unavailable for ${target}: ${name} payload is missing`) }
    if (createHash('sha256').update(bytes).digest('hex') !== entry.sha256)
      throw new Error(`Official desktop 2.1.287 native capability unavailable for ${target}: ${name} hash mismatch`)
    const binding = deps.load(path)
    if (!binding || typeof binding !== 'object') throw new Error(`Invalid native binding: ${name}`)
    cache.set(name, binding)
    return binding
  }
}

const load = createOfficialNativeLoader()
export const loadOfficialSwiftBinding = () => load('computer-use-swift')
export const loadOfficialInputBinding = () => load('computer-use-input')
