import { resolve } from 'node:path'
import { getClaudeConfigHomeDir } from '../envUtils.js'
import { logForDebugging } from '../debug.js'

/**
 * Public 2.1.284 StorageV5 key shape.  The host owns the namespace mapping;
 * the client only carries an opaque key through to the injected backend.
 */
export type StorageV5Key = {
  namespace: string
  relPath: readonly string[]
  [field: string]: unknown
}

export type StorageV5Error = {
  code: string
  message?: string
  failureClass?: string
  retryable?: boolean
  [field: string]: unknown
}

export type StorageV5Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: StorageV5Error }

export type StorageV5ReadRequest = {
  key: StorageV5Key
  offset: number
  length: number
}

export type StorageV5ReadItem = {
  found: boolean
  value?: string | Uint8Array
  totalBytes?: number
  [field: string]: unknown
}

export type StorageV5WriteOptions = {
  publishDiscipline?: 'atomic' | 'inPlace' | string
  mode?: number
  [field: string]: unknown
}

export type StorageV5DeleteOptions = {
  missingOk?: boolean
  [field: string]: unknown
}

export type StorageV5ListOptions = {
  cursor?: string
  skipKeyStats?: boolean
  skipScopeStats?: boolean
  links?: 'skip' | 'follow' | string
  maxLeaves?: number
  [field: string]: unknown
}

export type StorageV5ScopeKind =
  | { kind: 'absent' }
  | { kind: 'directory' }
  | { kind: 'file' }
  | { kind: 'other' }
  | { kind: 'link'; linkResolves?: boolean }
  | { kind: string; [field: string]: unknown }

export type StorageV5Meta = {
  kind: string
  size?: number
  mtimeMs?: number
  atimeMs?: number
  [field: string]: unknown
}

export type StorageV5Entry = {
  kind: 'key' | 'scope' | string
  key?: StorageV5Key
  scope?: StorageV5Key
  viaSymlink?: boolean
  [field: string]: unknown
}

export type StorageV5Update =
  | { skip: true }
  | { value: string; result?: unknown; [field: string]: unknown }
  | { data: string | Uint8Array; result?: unknown; [field: string]: unknown }

export type StorageV5HostFileStat =
  | { kind: 'absent'; [field: string]: unknown }
  | { kind: string; size?: number; [field: string]: unknown }

export interface StorageV5HostFiles {
  stat(key: StorageV5Key): Promise<StorageV5Result<StorageV5HostFileStat>>
  rename(from: StorageV5Key, to: StorageV5Key): Promise<StorageV5Result<void>>
  delete(key: StorageV5Key, options?: StorageV5DeleteOptions): Promise<StorageV5Result<void>>
  [method: string]: unknown
}

/**
 * This is intentionally an injected-client contract, not a local backend.
 * The public package calls these methods only after a host supplies the
 * object.  With no object, callers keep using the normal file implementation.
 */
export interface StorageV5Backend {
  read(items: readonly StorageV5ReadRequest[]): Promise<StorageV5Result<{ items: StorageV5ReadItem[] }>>
  write(key: StorageV5Key, data: string | Uint8Array, options?: StorageV5WriteOptions): Promise<StorageV5Result<unknown>>
  delete(key: StorageV5Key, options?: StorageV5DeleteOptions): Promise<StorageV5Result<unknown>>
  scopeKind(key: StorageV5Key, options?: { resolveLink?: boolean; [field: string]: unknown }): Promise<StorageV5Result<StorageV5ScopeKind>>
  ensureScope(key: StorageV5Key): Promise<StorageV5Result<unknown>>
  statMeta(key: StorageV5Key): Promise<StorageV5Result<StorageV5Meta>>
  listEntries(options?: StorageV5ListOptions): Promise<StorageV5Result<{ entries: StorageV5Entry[]; cursor?: string; done?: boolean }>>
  listRecursive(scope: StorageV5Key, options?: StorageV5ListOptions): Promise<StorageV5Result<{ entries: StorageV5Entry[]; skipped?: Record<string, number>; cursor?: string; done?: boolean }>>
  updateText(key: StorageV5Key, updater: (current: { value: string; [field: string]: unknown } | undefined) => StorageV5Update | Promise<StorageV5Update>): Promise<StorageV5Result<{ written: boolean; result?: unknown }>>
  touch(key: StorageV5Key): Promise<StorageV5Result<unknown>>
  append(key: StorageV5Key, items: ReadonlyArray<{ data: string | Uint8Array }>): Promise<StorageV5Result<unknown>>
  hostFiles: StorageV5HostFiles
}

export type StorageV5EnvPin = {
  backend?: StorageV5Backend
  configHome: string
}

export type StorageV5PinDecision = 'pinned' | 'unchanged' | 'conflict'

let hoverRestDecision: boolean | undefined

/** Official L() reads the process-pinned decision, not backend presence. */
export function isStorageV5PinnedOn(): boolean {
  return hoverRestDecision === true
}

/** Exact one-process pin semantics from the public 2.1.284 helper. */
export function recordHoverRestDecision(value: unknown): StorageV5PinDecision {
  if (typeof value !== 'boolean') {
    logForDebugging(
      `tengu_hover_rest served a ${typeof value}, not a boolean; treating it as off`,
      { level: 'warn' },
    )
  }
  const next = value === true
  if (hoverRestDecision === undefined) {
    hoverRestDecision = next
    return 'pinned'
  }
  return hoverRestDecision === next ? 'unchanged' : 'conflict'
}

/** Offline tests may reset the process-local decision; production never does. */
export function resetStorageV5PinForTesting(): void {
  hoverRestDecision = undefined
}

function hoverRestEnvValue(): unknown {
  const raw = process.env.CLAUDE_CODE_HOVER_REST
  if (raw === undefined) return undefined
  const normalized = raw.trim().toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false
  // The public env projection is triBool: malformed/unset is not a pin.
  // Direct recordHoverRestDecision(nonBoolean) still pins off with a warning.
  return undefined
}

/** Public default factory from the package.  It deliberately returns undefined. */
export function tryCreateV5Backend(): StorageV5Backend | undefined {
  return undefined
}

/** Official env-pin helper; a private host may supply the factory. */
export function pinStorageV5FromEnv(
  factory: () => StorageV5Backend | undefined = tryCreateV5Backend,
): StorageV5EnvPin | undefined {
  const value = hoverRestEnvValue()
  if (value === undefined) return undefined
  const decision = recordHoverRestDecision(value)
  if (decision === 'conflict') {
    logForDebugging(
      'tengu_hover_rest read a second pin in this process; keeping the first decision',
      { level: 'warn' },
    )
  }
  if (decision !== 'pinned') return undefined
  return { backend: hoverRestDecision === true ? factory() : undefined, configHome: getClaudeConfigHomeDir() }
}

function sameConfigHome(left: string, right: string): boolean {
  // Official zue() compares absolute identities without requiring
  // the path to exist.  realpath would incorrectly reject a new config home.
  return resolve(left) === resolve(right)
}

/**
 * Adopt an already-built host pin.  This is the private-host boundary: no
 * endpoint, credentials, worker, or remote service is constructed here.
 */
export function adoptStorageV5EnvPin(
  pin: StorageV5EnvPin | undefined,
): StorageV5Backend | undefined {
  if (hoverRestDecision !== true || pin?.backend === undefined) return undefined
  if (!sameConfigHome(pin.configHome, getClaudeConfigHomeDir())) {
    logForDebugging(
      `CLAUDE_CONFIG_DIR now names ${getClaudeConfigHomeDir()}, not ${pin.configHome} where the v5 storage backend was built at start-up; not handing it on`,
      { level: 'warn' },
    )
    return undefined
  }
  return pin.backend
}

/** Adapter entry point used by the host-facing config/session code. */
export function resolveStorageV5(
  pin?: StorageV5EnvPin,
  factory: () => StorageV5Backend | undefined = () => undefined,
): StorageV5Backend | undefined {
  if (pin === undefined) return adoptStorageV5EnvPin(pinStorageV5FromEnv(factory))
  const value = hoverRestEnvValue()
  if (value !== undefined) recordHoverRestDecision(value)
  return adoptStorageV5EnvPin(pin)
}

/** Call a backend operation without converting a backend error into success. */
export async function callStorageV5<T>(
  operation: string,
  call: () => Promise<StorageV5Result<T>>,
): Promise<StorageV5Result<T>> {
  try {
    const result = await call()
    if (result && typeof result === 'object' && typeof result.ok === 'boolean') return result
    return { ok: false, error: { code: 'InvalidBackendResult', message: `${operation} returned an invalid result` } }
  } catch (cause) {
    return { ok: false, error: { code: 'BackendException', message: cause instanceof Error ? cause.message : String(cause) } }
  }
}
