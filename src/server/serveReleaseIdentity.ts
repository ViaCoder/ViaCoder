import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import packageInfo from '../../package.json'

/** Identify the immutable source release, without reading credentials or history. */
export function getServeReleaseIdentity(root = join(import.meta.dir, '../..')): {
  version: string; manifestHash: string | null
} {
  let manifestHash: string | null
  try {
    manifestHash = createHash('sha256').update(readFileSync(join(root, 'release-manifest.json'))).digest('hex')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    // A source checkout has no release manifest; it cannot satisfy installed readiness.
    manifestHash = null
  }
  return { version: packageInfo.version, manifestHash }
}
