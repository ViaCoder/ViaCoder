import type { McpbManifest } from '../../vendor/official-mcpb/index.js'
import { errorMessage } from '../errors.js'
import { jsonParse } from '../slowOperations.js'

/**
 * Parses and validates a DXT manifest from a JSON object.
 *
 * Lazy-imports the exact official manifest schema, using the existing zod/v3
 * runtime. Sessions that never touch .dxt/.mcpb do not construct its schemas.
 */
export async function validateManifest(
  manifestJson: unknown,
): Promise<McpbManifest> {
  const { McpbManifestSchema } = await import('../../vendor/official-mcpb/index.js')
  const parseResult = McpbManifestSchema.safeParse(manifestJson)

  if (!parseResult.success) {
    const errors = parseResult.error.flatten()
    const errorMessages = [
      ...Object.entries(errors.fieldErrors).map(
        ([field, errs]) => `${field}: ${errs?.join(', ')}`,
      ),
      ...(errors.formErrors || []),
    ]
      .filter(Boolean)
      .join('; ')

    throw new Error(`Invalid manifest: ${errorMessages}`)
  }

  return parseResult.data
}

/**
 * Parses and validates a DXT manifest from raw text data.
 */
export async function parseAndValidateManifestFromText(
  manifestText: string,
): Promise<McpbManifest> {
  let manifestJson: unknown

  try {
    manifestJson = jsonParse(manifestText)
  } catch (error) {
    throw new Error(`Invalid JSON in manifest.json: ${errorMessage(error)}`)
  }

  return validateManifest(manifestJson)
}

/**
 * Parses and validates a DXT manifest from raw binary data.
 */
export async function parseAndValidateManifestFromBytes(
  manifestData: Uint8Array,
): Promise<McpbManifest> {
  const manifestText = new TextDecoder().decode(manifestData)
  return parseAndValidateManifestFromText(manifestText)
}

/**
 * Generates an extension ID from author name and extension name.
 * Uses the same algorithm as the directory backend for consistency.
 */
export function generateExtensionId(
  manifest: McpbManifest,
  prefix?: 'local.unpacked' | 'local.dxt',
): string {
  const sanitize = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')

  const authorName = manifest.author.name
  const extensionName = manifest.name

  const sanitizedAuthor = sanitize(authorName)
  const sanitizedName = sanitize(extensionName)

  return prefix
    ? `${prefix}.${sanitizedAuthor}.${sanitizedName}`
    : `${sanitizedAuthor}.${sanitizedName}`
}
