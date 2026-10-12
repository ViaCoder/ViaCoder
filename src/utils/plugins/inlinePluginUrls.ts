import { createHash } from 'crypto'
import { readFile, rename, writeFile } from 'fs/promises'
import { join } from 'path'
import { logForDebugging } from '../debug.js'
import { errorMessage } from '../errors.js'
import {
  extractZipToDirectory,
  getSessionPluginCachePath,
} from './zipCache.js'

/** Official 2.1.284 --plugin-url limits and session semantics. */
export const INLINE_PLUGIN_URL_TIMEOUT_MS = 30_000
export const INLINE_PLUGIN_URL_MAX_BYTES = 256 * 1024 * 1024

type InlinePluginUrlResult = {
  paths: string[]
  errors: Array<{ index: number; error: string }>
}

type InlinePluginUrlMetadata = {
  url: string
  sha256: string
  expectedSha256?: string
}

const INLINE_PLUGIN_URL_MAX_REDIRECTS = 5

function urlKey(url: string): string {
  return createHash('sha256').update(url).digest('hex')
}

function validatePluginUrl(rawUrl: string): URL {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error('plugin URL must be a valid URL')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('plugin URL must use http or https')
  }
  if (parsed.username || parsed.password) {
    throw new Error('plugin URL must not contain embedded credentials')
  }
  return parsed
}

async function readBoundedResponse(response: Response): Promise<Uint8Array> {
  const contentLength = response.headers.get('content-length')
  if (contentLength !== null) {
    const declared = Number(contentLength)
    if (!Number.isSafeInteger(declared) || declared < 0) {
      throw new Error('plugin URL returned an invalid content-length')
    }
    if (declared > INLINE_PLUGIN_URL_MAX_BYTES) {
      throw new Error(
        `plugin archive exceeds ${INLINE_PLUGIN_URL_MAX_BYTES} byte limit`,
      )
    }
  }

  if (!response.body) {
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (bytes.byteLength > INLINE_PLUGIN_URL_MAX_BYTES) {
      throw new Error(
        `plugin archive exceeds ${INLINE_PLUGIN_URL_MAX_BYTES} byte limit`,
      )
    }
    return bytes
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > INLINE_PLUGIN_URL_MAX_BYTES) {
        await reader.cancel()
        throw new Error(
          `plugin archive exceeds ${INLINE_PLUGIN_URL_MAX_BYTES} byte limit`,
        )
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  const bytes = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return bytes
}

async function sha256File(path: string): Promise<string> {
  const data = await readFile(path)
  return createHash('sha256').update(data).digest('hex')
}

function normalizeExpectedSha256(value: string | undefined): string | undefined {
  if (value === undefined) return undefined
  const normalized = value.trim().toLowerCase()
  if (!/^[0-9a-f]{64}$/.test(normalized)) {
    throw new Error('plugin archive sha256 must be a 64-character hexadecimal digest')
  }
  return normalized
}

async function fetchPluginArchive(parsed: URL): Promise<Response> {
  let currentUrl = parsed.href
  for (let redirectCount = 0; ; redirectCount++) {
    const response = await fetch(currentUrl, {
      redirect: 'manual',
      headers: { 'User-Agent': 'Claude-Code-Plugin-Manager' },
      signal: AbortSignal.timeout(INLINE_PLUGIN_URL_TIMEOUT_MS),
    })
    if (response.status < 300 || response.status >= 400) return response

    if (redirectCount >= INLINE_PLUGIN_URL_MAX_REDIRECTS) {
      await response.body?.cancel()
      throw new Error(
        `plugin download exceeded ${INLINE_PLUGIN_URL_MAX_REDIRECTS} redirects`,
      )
    }
    const location = response.headers.get('location')
    await response.body?.cancel()
    if (!location) throw new Error('plugin download redirect has no location')
    currentUrl = validatePluginUrl(new URL(location, currentUrl).href).href
  }
}

async function materializeOne(
  rawUrl: string,
  index: number,
  cacheRoot: string,
  expectedSha256: string | undefined,
): Promise<string> {
  const parsed = validatePluginUrl(rawUrl)
  const normalizedExpectedSha256 = normalizeExpectedSha256(expectedSha256)
  const key = urlKey(parsed.href)
  const archivePath = join(cacheRoot, `url-${index}-${key}.zip`)
  const metadataPath = `${archivePath}.json`
  let archiveSha: string | undefined

  try {
    const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as InlinePluginUrlMetadata
    if (
      metadata.url === parsed.href &&
      metadata.expectedSha256 === normalizedExpectedSha256
    ) {
      const currentSha = await sha256File(archivePath)
      if (
        currentSha === metadata.sha256 &&
        (!normalizedExpectedSha256 || currentSha === normalizedExpectedSha256)
      ) {
        archiveSha = currentSha
      }
    }
  } catch {
    // A partial or old cache entry is replaced below.
  }

  if (!archiveSha) {
    let response: Response
    try {
      response = await fetchPluginArchive(parsed)
    } catch (error) {
      throw new Error(`plugin download failed: ${errorMessage(error)}`)
    }

    if (!response.ok) {
      throw new Error(`plugin download failed with HTTP ${response.status}`)
    }

    const bytes = await readBoundedResponse(response)
    archiveSha = createHash('sha256').update(bytes).digest('hex')
    if (normalizedExpectedSha256 && archiveSha !== normalizedExpectedSha256) {
      throw new Error(
        `plugin archive sha256 mismatch (expected ${normalizedExpectedSha256}, got ${archiveSha})`,
      )
    }
    const partPath = `${archivePath}.part`
    await writeFile(partPath, bytes)
    await rename(partPath, archivePath)
    await writeFile(
      metadataPath,
      JSON.stringify({
        url: parsed.href,
        sha256: archiveSha,
        ...(normalizedExpectedSha256
          ? { expectedSha256: normalizedExpectedSha256 }
          : {}),
      } satisfies InlinePluginUrlMetadata),
    )
  }

  // The URL archive is session-only. The shared extractor performs the same
  // central-directory/path/size checks used by local plugin ZIPs.
  const extractedPath = join(cacheRoot, `inline-url-${index}-${archiveSha}`)
  await extractZipToDirectory(archivePath, extractedPath)
  return extractedPath
}

/**
 * Resolve official --plugin-url inputs into session-only plugin directories.
 * URL archives are cached only inside the current session temp directory and
 * are never added to the installed plugin registry.
 */
export async function materializeInlinePluginUrls(
  urls: string[],
  expectedSha256?: Array<string | undefined>,
): Promise<InlinePluginUrlResult> {
  if (urls.length === 0) return { paths: [], errors: [] }

  const cacheRoot = await getSessionPluginCachePath()
  const paths: string[] = []
  const errors: Array<{ index: number; error: string }> = []
  for (const [index, rawUrl] of urls.entries()) {
    try {
      paths.push(
        await materializeOne(rawUrl, index, cacheRoot, expectedSha256?.[index]),
      )
      logForDebugging(`Loaded session-only plugin archive from URL ${index + 1}`)
    } catch (error) {
      errors.push({ index, error: errorMessage(error) })
      logForDebugging(`Failed to load session-only plugin URL ${index + 1}: ${errorMessage(error)}`, { level: 'warn' })
    }
  }
  return { paths, errors }
}
