import type { PrimitiveSchemaDefinition } from '@modelcontextprotocol/sdk/types.js'
import { getMultiSelectValues, isMultiSelectEnumSchema, validateElicitationInput } from '../utils/mcp/elicitationValidation.js'
import { ServeConflict } from './serveSession.js'

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}

/** Apply the existing terminal's synchronous primitive validation to an
 * actual SDK elicitation form. Unknown schema extensions remain with the
 * worker/MCP server, rather than being treated as unsupported by brand. */
export function validateElicitationContent(request: Record<string, unknown>, result: {
  action: 'accept' | 'decline' | 'cancel'; content?: Record<string, unknown>,
}): void {
  if (result.action !== 'accept' || request.mode === 'url') return
  const schema = object(request.requested_schema)
  const properties = object(schema?.properties)
  if (schema?.type !== 'object' || !properties) return
  const content = result.content ?? {}
  const required = Array.isArray(schema.required) ? schema.required.filter((key): key is string => typeof key === 'string') : []
  if (required.some(key => !Object.hasOwn(content, key))) throw new ServeConflict('Required elicitation field is missing')
  for (const [name, value] of Object.entries(content)) {
    const field = object(properties[name])
    if (!field || typeof field.type !== 'string') continue
    if (field.type === 'array') {
      const definition = field as PrimitiveSchemaDefinition
      if (isMultiSelectEnumSchema(definition)) {
        const valid = new Set(getMultiSelectValues(definition))
        if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || !valid.has(item))) {
          throw new ServeConflict(`Invalid elicitation field: ${name}`)
        }
      }
      continue
    }
    if (field.type === 'boolean') {
      if (typeof value !== 'boolean') throw new ServeConflict(`Invalid elicitation field: ${name}`)
      continue
    }
    if ((field.type === 'string' && typeof value !== 'string') ||
      ((field.type === 'number' || field.type === 'integer') && (typeof value !== 'number' || !Number.isFinite(value)))) {
      throw new ServeConflict(`Invalid elicitation field: ${name}`)
    }
    if (['string','number','integer'].includes(field.type)) {
      const checked = validateElicitationInput(String(value), field as PrimitiveSchemaDefinition)
      if (!checked.isValid) throw new ServeConflict(`Invalid elicitation field: ${name}: ${checked.error ?? 'schema mismatch'}`)
    }
  }
}
