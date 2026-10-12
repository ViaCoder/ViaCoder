import { randomUUID } from 'node:crypto'
import {
  existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync,
  renameSync, rmSync, writeFileSync,
} from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { copySource, hash, MANIFEST, verifySource } from './source.js'

export type DeliveryMetadata = {
  /** Must equal the verified source artifact manifest version. */
  version: string
  /** First 16 hex characters of SHA256(JSON.stringify(release-manifest)). */
  buildID: string
  /** Full source manifest digest, not a user-asserted acceptance result. */
  sourceManifestSHA256: string
  /** Exact 40-hex P and C commit identities represented by this artifact. */
  pCommit: string
  cCommit: string
  /** Explicit outstanding conditions/boundaries; never inferred as passed. */
  knownBoundaries: string[]
}

const RECORDS = [
  'AGENTS.md',
  'PROJECT_REQUIREMENTS.md',
  'WORK_PLAN_287.md',
  'RELEASE_NOTES.md',
  'BUILD_INSTALL_ROLLBACK.md',
] as const

type DeliveryFile = { path: string; sha256: string; mode: number }
type DeliveryManifest = {
  format: 1
  kind: 'viacoder-source-and-work-records'
  validationScope: 'source-integrity-and-records-only'
  version: string
  buildID: string
  sourceManifestSHA256: string
  pCommit: string
  cCommit: string
  knownBoundaries: string[]
  sourceFiles: DeliveryFile[]
  recordFiles: Array<{ path: string; sha256: string }>
}

function assertDisjoint(left: string, right: string, what: string): void {
  const within = (parent: string, child: string) => {
    const rel = relative(parent, child)
    return !rel || (!isAbsolute(rel) && rel !== '..' && !rel.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`))
  }
  if (within(left, right) || within(right, left)) throw Error(`${what} paths must be disjoint`)
}

function regularFile(root: string, name: string): string {
  const path = join(root, name)
  if (lstatSync(path).isSymbolicLink() || !lstatSync(path).isFile()) throw Error(`Record must be a regular file: ${name}`)
  return path
}

/** Build a verified source+records directory suitable for the existing release archive step. */
export function createDeliveryBundle(
  artifact: string,
  recordsRoot: string,
  output: string,
  metadata: DeliveryMetadata,
): string {
  const sourceInput = resolve(artifact)
  const recordsInput = resolve(recordsRoot)
  const outputInput = resolve(output)
  if (lstatSync(sourceInput).isSymbolicLink() || lstatSync(recordsInput).isSymbolicLink()) throw Error('Artifact and records roots cannot be symlinks')
  const source = realpathSync(sourceInput)
  const records = realpathSync(recordsInput)
  const dest = join(realpathSync(dirname(outputInput)), basename(outputInput))
  if (!lstatSync(source).isDirectory() || lstatSync(source).isSymbolicLink()) throw Error('Artifact must be a regular directory')
  if (!lstatSync(records).isDirectory() || lstatSync(records).isSymbolicLink()) throw Error('Records root must be a regular directory')
  try { lstatSync(dest); throw Error(`Output already exists: ${dest}`) } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error
  }
  assertDisjoint(source, dest, 'Artifact/output')
  assertDisjoint(records, dest, 'Records/output')
  assertDisjoint(source, records, 'Artifact/records')

  const sourceManifest = verifySource(source)
  const names = readdirSync(records).sort()
  if (names.length !== RECORDS.length || names.some(name => !(RECORDS as readonly string[]).includes(name))) {
    throw Error('Records root must contain only the five allowlisted records')
  }
  const manifestText = JSON.stringify(sourceManifest)
  const sourceIdentity = hash(manifestText)
  const sourceDigest = hash(readFileSync(join(source, MANIFEST)))
  if (metadata.version !== sourceManifest.version || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(metadata.version)) {
    throw Error('Delivery version does not match the verified source artifact')
  }
  if (metadata.sourceManifestSHA256 !== sourceDigest) throw Error('Source manifest SHA256 mismatch')
  if (metadata.buildID !== sourceIdentity.slice(0, 16)) throw Error('Build ID does not match source manifest identity')
  if (!/^[a-f0-9]{40}$/.test(metadata.pCommit) || !/^[a-f0-9]{40}$/.test(metadata.cCommit)) {
    throw Error('P/C commit metadata must be full lowercase 40-character commit IDs')
  }
  if (!Array.isArray(metadata.knownBoundaries) ||
      metadata.knownBoundaries.some(value => typeof value !== 'string' || !value.trim())) {
    throw Error('knownBoundaries must explicitly describe outstanding conditions')
  }

  const stage = `${dest}.stage-${randomUUID()}`
  mkdirSync(stage, { recursive: false })
  try {
    const sourceDir = join(stage, 'source')
    copySource(source, sourceDir)
    const recordDir = join(stage, 'records')
    mkdirSync(recordDir)
    const recordFiles = RECORDS.map(name => {
      const from = regularFile(records, name)
      const bytes = readFileSync(from)
      const to = join(recordDir, name)
      writeFileSync(to, bytes, { flag: 'wx', mode: 0o644 })
      return { path: name, sha256: hash(bytes) }
    })
    const manifest: DeliveryManifest = {
      format: 1,
      kind: 'viacoder-source-and-work-records',
      validationScope: 'source-integrity-and-records-only',
      version: metadata.version,
      buildID: metadata.buildID,
      sourceManifestSHA256: sourceDigest,
      pCommit: metadata.pCommit,
      cCommit: metadata.cCommit,
      knownBoundaries: [...metadata.knownBoundaries],
      sourceFiles: sourceManifest.files.map(entry => ({ ...entry })),
      recordFiles,
    }
    writeFileSync(join(stage, 'delivery-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx', mode: 0o644 })
    verifySource(sourceDir)
    renameSync(stage, dest)
    return dest
  } finally {
    if (existsSync(stage)) rmSync(stage, { recursive: true })
  }
}
