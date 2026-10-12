import { constants as fsConstants } from 'node:fs'
import {
  open,
  lstat,
  rename,
  unlink,
} from 'node:fs/promises'
import { randomUUID, verify, X509Certificate } from 'node:crypto'
import { lock } from '../../utils/lockfile.js'

export type SignedCacheKind = 'managed-settings' | 'policy-limits'

export type SignedCacheRoot = {
  marker: string
  pem: string
}

export type SignedCacheSignature = {
  jws: string
  receivedAt: number
}

export type AcceptedIat = {
  typ: string
  aud?: string
  sub?: string
  ws?: string
  iat: number
}

export type SignedCacheVerificationResult = {
  result:
    | 'unsigned'
    | 'valid'
    | 'malformed'
    | 'no_embedded_root'
    | 'bad_chain'
    | 'cert_expired'
    | 'no_marker'
    | 'bad_signature'
    | 'wrong_type'
    | 'aud_mismatch'
    | 'sub_mismatch'
    | 'ws_mismatch'
    | 'sha_mismatch'
    | 'future_iat'
    | 'stale'
    | 'rollback'
  issuedAt?: number
  ageSeconds?: number
  certDaysLeft?: number
  wsUnanchored?: boolean
}

export type SignedCacheVerifyInput = {
  kind: SignedCacheKind
  jws?: string
  orgUuid?: string
  accountUuid?: string
  workspaceUuid?: string
  bodySha: string
  highWaterIat?: number
  nowMs?: number
  roots: readonly SignedCacheRoot[]
}

export type SignedCacheInjection = {
  roots?: readonly SignedCacheRoot[]
  readSignature?: (cachePath: string) => Promise<SignedCacheSignature | null>
  writeSignature?: (cachePath: string, signature: SignedCacheSignature) => Promise<void>
  readAcceptedIat?: (cachePath: string) => Promise<AcceptedIat | null>
  writeAcceptedIat?: (cachePath: string, value: AcceptedIat) => Promise<void>
  /** A non-file host owns atomic, identity-scoped high-water advancement. */
  advanceAcceptedIat?: (cachePath: string, value: AcceptedIat) => Promise<void>
  deleteSignature?: (cachePath: string) => Promise<void>
  deleteAcceptedIat?: (cachePath: string) => Promise<void>
}

const SIDECAR_HEADER = 'x-claude-code-signature'
const SIGNATURE_MAX_BYTES = 16_384
const CERT_MAX_BYTES = 8_192
const CLOCK_SKEW_MS = 300_000
const MAX_AGE_SECONDS: Record<SignedCacheKind, number> = {
  'managed-settings': 86_400,
  'policy-limits': 86_400,
}
const ROOTS: readonly SignedCacheRoot[] = Object.freeze([])

export function signedCacheRoots(
  injection?: SignedCacheInjection,
): readonly SignedCacheRoot[] {
  return injection?.roots ?? ROOTS
}

export function signatureHeaderValue(
  headers: Record<string, unknown> | undefined,
): string | undefined {
  if (!headers) return undefined
  const value = headers[SIDECAR_HEADER] ?? headers[SIDECAR_HEADER.toLowerCase()]
  return typeof value === 'string' && value.length > 0 && value.length <= SIGNATURE_MAX_BYTES
    ? value
    : undefined
}

export function signatureSidecarPath(cachePath: string): string {
  return `${cachePath}.signature.json`
}

export function acceptedIatSidecarPath(cachePath: string): string {
  return `${cachePath}.signature-iat.json`
}

export function signedCacheSignatureSchema(value: unknown): value is SignedCacheSignature {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as SignedCacheSignature).jws === 'string' &&
    (value as SignedCacheSignature).jws.length > 0 &&
    typeof (value as SignedCacheSignature).receivedAt === 'number' &&
    Number.isFinite((value as SignedCacheSignature).receivedAt)
  )
}

export function acceptedIatSchema(value: unknown): value is AcceptedIat {
  if (!value || typeof value !== 'object') return false
  const candidate = value as AcceptedIat
  return (
    typeof candidate.typ === 'string' &&
    (candidate.aud === undefined || typeof candidate.aud === 'string') &&
    (candidate.sub === undefined || typeof candidate.sub === 'string') &&
    (candidate.ws === undefined || typeof candidate.ws === 'string') &&
    typeof candidate.iat === 'number' && Number.isFinite(candidate.iat)
  )
}

export async function readSignedCacheSignature(
  cachePath: string,
  injection?: SignedCacheInjection,
): Promise<SignedCacheSignature | null> {
  if (injection?.readSignature) return injection.readSignature(cachePath)
  return readJsonSidecar(signatureSidecarPath(cachePath), signedCacheSignatureSchema)
}

export async function writeSignedCacheSignature(
  cachePath: string,
  jws: string | undefined,
  injection?: SignedCacheInjection,
): Promise<void> {
  const sidecar = signatureSidecarPath(cachePath)
  if (jws === undefined) {
    if (injection?.deleteSignature) {
      await injection.deleteSignature(cachePath)
    }
    await removeIfPresent(sidecar)
    return
  }
  const signature = { jws, receivedAt: Date.now() }
  if (injection?.writeSignature) {
    await injection.writeSignature(cachePath, signature)
    return
  }
  await writeJsonSidecar(sidecar, signature)
}

export async function readAcceptedIat(
  cachePath: string,
  injection?: SignedCacheInjection,
): Promise<AcceptedIat | null> {
  if (injection?.readAcceptedIat) return injection.readAcceptedIat(cachePath)
  return readAcceptedIatFile(acceptedIatSidecarPath(cachePath))
}

type AcceptedIatIdentity = Omit<AcceptedIat, 'iat'>

function matchesIatIdentity(value: AcceptedIat, identity: AcceptedIatIdentity): boolean {
  return value.typ === identity.typ && value.aud === identity.aud &&
    value.sub === identity.sub && value.ws === identity.ws
}

export async function readAcceptedIatForIdentity(
  cachePath: string,
  identity: AcceptedIatIdentity,
  injection?: SignedCacheInjection,
): Promise<number | undefined> {
  const value = await readAcceptedIat(cachePath, injection)
  return value && matchesIatIdentity(value, identity) ? value.iat : undefined
}

/** Public OMo: best-effort lock, identity-scoped maximum, atomic publication. */
export async function writeAcceptedIat(
  cachePath: string,
  value: AcceptedIat,
  injection?: SignedCacheInjection,
): Promise<void> {
  if (injection?.advanceAcceptedIat) return injection.advanceAcceptedIat(cachePath, value)
  if (injection?.writeAcceptedIat) {
    // Legacy injected stores retain their contract; cross-process atomicity
    // belongs to that host, not a fabricated local backend/lock for it.
    const current = await readAcceptedIatForIdentity(cachePath, value, injection)
    if (current === undefined || current < value.iat) await injection.writeAcceptedIat(cachePath, value)
    return
  }
  const path = acceptedIatSidecarPath(cachePath)
  const release = await acquireIatLock(path)
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const current = await readAcceptedIatFile(path, release !== undefined)
      if (current && matchesIatIdentity(current, value) && current.iat >= value.iat) return
      if (!await writeAtomicIat(path, value)) return
    }
  } finally {
    await release?.().catch(() => {})
  }
}

export async function clearSignedCacheSidecars(
  cachePath: string,
  injection?: SignedCacheInjection,
): Promise<void> {
  if (injection?.deleteSignature) await injection.deleteSignature(cachePath)
  if (injection?.deleteAcceptedIat) await injection.deleteAcceptedIat(cachePath)
  await Promise.all([
    removeIfPresent(signatureSidecarPath(cachePath)),
    removeIfPresent(acceptedIatSidecarPath(cachePath)),
  ])
}

export async function shadowVerifySignedCache(
  input: Omit<SignedCacheVerifyInput, 'jws' | 'highWaterIat'> & {
    cachePath: string
    injection?: SignedCacheInjection
  },
): Promise<SignedCacheVerificationResult> {
  const identity = { typ: input.kind, aud: input.orgUuid, sub: input.accountUuid, ws: input.workspaceUuid }
  const [signature, highWaterIat] = await Promise.all([
    readSignedCacheSignature(input.cachePath, input.injection),
    readAcceptedIatForIdentity(input.cachePath, identity, input.injection),
  ])
  const nowMs = input.nowMs ?? Date.now()
  const result = verifySignedCache({
    ...input,
    jws: signature?.jws,
    highWaterIat,
    nowMs,
    roots: input.injection?.roots ?? input.roots,
  })
  if (result.result === 'valid' && result.issuedAt !== undefined) {
    const next: AcceptedIat = {
      ...identity,
      iat: Math.min(result.issuedAt, Math.floor(nowMs / 1000)),
    }
    await writeAcceptedIat(input.cachePath, next, input.injection)
  }
  return result
}

export function verifySignedCache(input: SignedCacheVerifyInput): SignedCacheVerificationResult {
  const details: Omit<SignedCacheVerificationResult, 'result'> = {}
  try {
    return verifySignedCacheCore(input, details)
  } catch {
    return { result: 'malformed', ...details }
  }
}

function verifySignedCacheCore(input: SignedCacheVerifyInput, details: Omit<SignedCacheVerificationResult, 'result'>): SignedCacheVerificationResult {
  if (!input.jws) return { result: 'unsigned' }
  const nowMs = input.nowMs ?? Date.now()
  if (Buffer.byteLength(input.jws, 'utf8') > SIGNATURE_MAX_BYTES) return { result: 'malformed' }
  const parts = input.jws.split('.')
  if (parts.length !== 3 || parts.some(part => !/^[A-Za-z0-9_-]+$/.test(part))) {
    return { result: 'malformed' }
  }

  const header = decodeJson(parts[0])
  const payload = decodeJson(parts[1])
  if (
    !header ||
    header.alg !== 'ES256' ||
    header.typ !== 'cc-signed-cache+jws' ||
    typeof header.kid !== 'string' ||
    !Array.isArray(header.x5c) ||
    header.x5c.length < 1 ||
    header.x5c.length > 3 ||
    !header.x5c.every((cert: unknown) => typeof cert === 'string' && /^[A-Za-z0-9+/]+={0,2}$/.test(cert)) ||
    !payload ||
    payload.v !== 1 ||
    typeof payload.typ !== 'string' ||
    typeof payload.aud !== 'string' ||
    typeof payload.iat !== 'number' || !Number.isFinite(payload.iat) ||
    (payload.sub !== undefined && typeof payload.sub !== 'string') ||
    (payload.ws !== undefined && typeof payload.ws !== 'string') ||
    typeof payload.sha !== 'string'
  ) {
    return { result: 'malformed' }
  }

  const issuedAt = payload.iat as number
  const ageSeconds = Math.floor(nowMs / 1000) - issuedAt
  const wsUnanchored = input.workspaceUuid === undefined && payload.ws !== undefined
  Object.assign(details, { issuedAt, ageSeconds, wsUnanchored })
  const encodedCertificates = (header.x5c as string[]).map(encoded => Buffer.from(encoded, 'base64'))
  if (encodedCertificates.some(der => der.length > CERT_MAX_BYTES)) return { result: 'malformed', ...details }
  const leaf = parseCertificate(encodedCertificates[0])
  const certDaysLeft = Math.floor((Date.parse(leaf.validTo) - nowMs) / 86_400_000)
  details.certDaysLeft = certDaysLeft
  if (input.roots.length === 0) return { result: 'no_embedded_root', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  const certificates = [leaf, ...encodedCertificates.slice(1).map(parseCertificate)]

  for (let index = 0; index + 1 < certificates.length; index++) {
    if (!isIssuedBy(certificates[index], certificates[index + 1])) {
      return { result: 'bad_chain', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
    }
  }
  const last = certificates.at(-1)!
  let matchedRoot: SignedCacheRoot | undefined
  let rootCertificate: X509Certificate | undefined
  for (const root of input.roots) {
    const candidate = new X509Certificate(root.pem)
    if (isIssuedBy(last, candidate)) {
      matchedRoot = root
      rootCertificate = candidate
      break
    }
  }
  if (!matchedRoot || !rootCertificate) return { result: 'bad_chain', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }

  const validAt = issuedAt * 1000
  if (![...certificates, rootCertificate].every(cert => validCertificate(cert, validAt))) {
    return { result: 'cert_expired', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  }
  if (!splitSubjectAltNames(leaf.subjectAltName ?? '').includes(`URI:${matchedRoot.marker}`)) {
    return { result: 'no_marker', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  }
  if (leaf.publicKey.asymmetricKeyType !== 'ec' || leaf.publicKey.asymmetricKeyDetails?.namedCurve !== 'prime256v1') {
    return { result: 'bad_signature', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  }
  let signatureValid = false
  try {
    signatureValid = verify(
      'sha256',
      Buffer.from(`${parts[0]}.${parts[1]}`, 'utf8'),
      { key: leaf.publicKey, dsaEncoding: 'ieee-p1363' },
      Buffer.from(parts[2], 'base64url'),
    )
  } catch {
    signatureValid = false
  }
  if (!signatureValid) return { result: 'bad_signature', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (payload.typ !== input.kind) return { result: 'wrong_type', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (payload.aud !== input.orgUuid) return { result: 'aud_mismatch', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (payload.sub !== input.accountUuid) return { result: 'sub_mismatch', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (input.workspaceUuid !== undefined && payload.ws !== input.workspaceUuid) return { result: 'ws_mismatch', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (payload.sha !== input.bodySha) return { result: 'sha_mismatch', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (ageSeconds < -Math.floor(CLOCK_SKEW_MS / 1000)) return { result: 'future_iat', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (ageSeconds > MAX_AGE_SECONDS[input.kind]) return { result: 'stale', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  if (input.highWaterIat !== undefined && issuedAt < input.highWaterIat) return { result: 'rollback', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
  return { result: 'valid', issuedAt, ageSeconds, certDaysLeft, wsUnanchored }
}

function parseCertificate(der: Buffer): X509Certificate {
  const certificate = new X509Certificate(der)
  if (certificate.raw.length !== der.length) throw new Error('trailing bytes after x5c certificate DER')
  return certificate
}

/** Official de: commas inside quoted SAN entries are not separators. */
function splitSubjectAltNames(value: string): string[] {
  const entries: string[] = []
  let entry = ''
  let quoted = false
  for (let index = 0; index < value.length; index++) {
    const char = value[index]
    if (quoted) {
      if (char === '\\' && index + 1 < value.length) {
        entry += char + value[++index]
        continue
      }
      entry += char
      if (char === '"') quoted = false
    } else if (char === '"') {
      quoted = true
      entry += char
    } else if (char === ',') {
      entries.push(entry)
      entry = ''
      while (index + 1 < value.length && /\s/.test(value[index + 1])) index++
    } else entry += char
  }
  if (quoted) return []
  entries.push(entry)
  return entries
}

function decodeJson(segment: string): Record<string, any> | null {
  try {
    const value = JSON.parse(Buffer.from(segment, 'base64url').toString('utf8'))
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null
  } catch {
    return null
  }
}

function isIssuedBy(child: X509Certificate, parent: X509Certificate): boolean {
  return Boolean(parent.ca && child.checkIssued(parent) && child.verify(parent.publicKey))
}

function validCertificate(certificate: X509Certificate, at: number): boolean {
  return at >= Date.parse(certificate.validFrom) - CLOCK_SKEW_MS && at <= Date.parse(certificate.validTo)
}

async function readJsonSidecar<T>(
  path: string,
  isValid: (value: unknown) => value is T,
): Promise<T | null> {
  const result = await readSidecar(path, isValid)
  return result.kind === 'ok' ? result.value : null
}

async function readSidecar<T>(path: string, isValid: (value: unknown) => value is T): Promise<
  { kind: 'ok'; value: T } | { kind: 'absent' | 'unparsable' }
> {
  let content: string
  try {
    // Match readFileFdGated: inspect the opened descriptor, cap allocations,
    // and avoid blocking on FIFOs. No credentials or host storage is read.
    if (!fsConstants.O_NONBLOCK && !(await lstat(path)).isFile()) return { kind: 'absent' }
    const handle = await open(path, fsConstants.O_RDONLY | (fsConstants.O_NONBLOCK ?? 0))
    try {
      const info = await handle.stat()
      if (!info.isFile() || info.size > SIGNATURE_MAX_BYTES + 256) return { kind: 'absent' }
      const buffer = Buffer.alloc(info.size)
      let size = 0
      while (size < buffer.length) {
        const { bytesRead } = await handle.read(buffer, size, buffer.length - size, size)
        if (bytesRead === 0) break
        size += bytesRead
      }
      content = buffer.toString('utf8', 0, size)
    } finally { await handle.close() }
  } catch { return { kind: 'absent' } }
  try {
    const value = JSON.parse(content)
    return isValid(value) ? { kind: 'ok', value } : { kind: 'unparsable' }
  } catch { return { kind: 'unparsable' } }
}

async function acquireIatLock(path: string): Promise<(() => Promise<void>) | undefined> {
  try {
    return await lock(path, {
      realpath: false,
      retries: { retries: 6, factor: 2, minTimeout: 20, maxTimeout: 320 },
      stale: 10_000,
      onCompromised: () => {},
    })
  } catch { return undefined }
}

async function readAcceptedIatFile(path: string, locked = false): Promise<AcceptedIat | null> {
  let result = await readSidecar(path, acceptedIatSchema)
  for (let attempt = 0; result.kind === 'unparsable' && attempt < 2; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 15))
    result = await readSidecar(path, acceptedIatSchema)
  }
  if (result.kind === 'unparsable' && !locked) {
    const release = await acquireIatLock(path)
    try { result = await readSidecar(path, acceptedIatSchema) }
    finally { await release?.().catch(() => {}) }
  }
  return result.kind === 'ok' ? result.value : null
}

async function writeAtomicIat(path: string, value: AcceptedIat): Promise<boolean> {
  const temporary = `${path}.${randomUUID()}.tmp`
  try {
    const handle = await open(temporary, 'wx', 0o600)
    try { await handle.writeFile(JSON.stringify(value), 'utf8') }
    finally { await handle.close() }
    await rename(temporary, path)
    return true
  } catch { return false }
  finally { await unlink(temporary).catch(() => {}) }
}

async function writeJsonSidecar(path: string, value: unknown): Promise<void> {
  try {
    if (!fsConstants.O_NOFOLLOW && (await lstat(path).catch(() => null))?.isSymbolicLink()) return
    const flags = fsConstants.O_WRONLY | fsConstants.O_CREAT | fsConstants.O_TRUNC | (fsConstants.O_NOFOLLOW ?? 0)
    const handle = await open(path, flags, 0o600)
    try {
      await handle.writeFile(JSON.stringify(value), { encoding: 'utf8' })
    } finally {
      await handle.close()
    }
  } catch {
    // The official sidecar is best-effort. Cache application does not become
    // a fabricated signature when the sidecar cannot be written.
  }
}

async function removeIfPresent(path: string): Promise<void> {
  try {
    await unlink(path)
  } catch { /* Best-effort unlink removes the sidecar, never its symlink target. */ }
}
