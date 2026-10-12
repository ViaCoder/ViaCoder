import { constants as fsConstants } from 'node:fs'
import { lstat, open, realpath } from 'node:fs/promises'
import { resolve } from 'node:path'
import { safeParseJSON } from '../../utils/json.js'

/** Matches the public 2.1.284 --agents file contract. */
export const MAX_AGENTS_FILE_BYTES = 256 * 1024 * 1024

export const AGENTS_FILE_USAGE_ERROR =
  'Error: --agents takes a JSON object, or a file path only with --print (-p). Pass the agents as inline JSON, or run with -p to read them from a file.'

export type CliAgentsInput = {
  json: unknown
  filePath?: string
}

type FileIdentity = {
  dev: bigint | number
  ino: bigint | number
}

function sameIdentity(a: FileIdentity, b: FileIdentity): boolean {
  return a.dev === b.dev && a.ino === b.ino
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Resolve --agents without treating arbitrary strings as JSON in interactive
 * mode. File input is intentionally limited to -p, as in the official CLI.
 * The descriptor is opened without following symlinks and its identity is
 * checked before and after reading so a changing path cannot silently provide
 * a different agent definition.
 */
export async function readCliAgentsInput(
  value: unknown,
  allowFile: boolean,
): Promise<{ ok: true; value: CliAgentsInput } | { ok: false; error: string }> {
  if (typeof value !== 'string') {
    return isJsonObject(value)
      ? { ok: true, value: { json: value } }
      : { ok: false, error: AGENTS_FILE_USAGE_ERROR }
  }

  const parsed = safeParseJSON(value, false)
  if (isJsonObject(parsed)) return { ok: true, value: { json: parsed } }
  if (!allowFile) return { ok: false, error: AGENTS_FILE_USAGE_ERROR }

  const filePath = resolve(value)
  let handle: Awaited<ReturnType<typeof open>> | undefined
  try {
    const initial = await lstat(filePath, { bigint: true })
    if (!initial.isFile()) {
      return { ok: false, error: `Error: --agents file is not a regular file: ${filePath}` }
    }
    if (initial.nlink !== 1n) {
      return {
        ok: false,
        error: `Error: --agents file has more than one hard link: ${filePath} (its other names are not write-protected; pass a file with one name)`,
      }
    }
    if (initial.size > BigInt(MAX_AGENTS_FILE_BYTES)) {
      return {
        ok: false,
        error: `Error: --agents file is larger than ${MAX_AGENTS_FILE_BYTES} bytes: ${filePath}`,
      }
    }

    const noFollow =
      typeof fsConstants.O_NOFOLLOW === 'number' ? fsConstants.O_NOFOLLOW : 0
    handle = await open(filePath, fsConstants.O_RDONLY | noFollow)
    const opened = await handle.stat({ bigint: true })
    const initialIdentity: FileIdentity = { dev: initial.dev, ino: initial.ino }
    const openedIdentity: FileIdentity = { dev: opened.dev, ino: opened.ino }
    if (!sameIdentity(initialIdentity, openedIdentity)) {
      return { ok: false, error: `Error: --agents file changed while it was read: ${filePath}` }
    }

    const canonicalPath = await realpath(filePath).catch(() => filePath)
    const canonical = await lstat(canonicalPath, { bigint: true })
    if (!sameIdentity(initialIdentity, { dev: canonical.dev, ino: canonical.ino })) {
      return { ok: false, error: `Error: --agents file changed while it was read: ${filePath}` }
    }

    const content = await handle.readFile({ encoding: 'utf8' })
    const after = await handle.stat({ bigint: true })
    if (
      !sameIdentity(openedIdentity, { dev: after.dev, ino: after.ino }) ||
      after.size > BigInt(MAX_AGENTS_FILE_BYTES)
    ) {
      return { ok: false, error: `Error: --agents file changed while it was read: ${filePath}` }
    }

    const json = safeParseJSON(content, false)
    if (!isJsonObject(json)) {
      return { ok: false, error: `Error: --agents file does not contain a JSON object: ${filePath}` }
    }
    return { ok: true, value: { json, filePath } }
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : ''
    if (code === 'ENOENT') {
      return {
        ok: false,
        error: `Error: --agents file not found: ${filePath} (a value that is not a JSON object is read as a file path)`,
      }
    }
    return {
      ok: false,
      error: `Error reading --agents file ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
    }
  } finally {
    await handle?.close().catch(() => {})
  }
}
