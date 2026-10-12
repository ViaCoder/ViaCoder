/**
 * Zod schema for keybindings.json configuration.
 * Used for validation and JSON schema generation.
 */

import { z } from 'zod/v4'
import { lazySchema } from '../utils/lazySchema.js'

import {
  OFFICIAL_KEYBINDING_CONTEXTS,
  OFFICIAL_KEYBINDING_CONTEXT_DESCRIPTIONS,
  OFFICIAL_KEYBINDING_ACTIONS,
  LEGACY_KEYBINDING_ACTIONS,
} from './officialRegistry.js'

export const KEYBINDING_CONTEXTS = OFFICIAL_KEYBINDING_CONTEXTS
export const KEYBINDING_CONTEXT_DESCRIPTIONS = OFFICIAL_KEYBINDING_CONTEXT_DESCRIPTIONS
export const KEYBINDING_ACTIONS = [
  ...OFFICIAL_KEYBINDING_ACTIONS,
  ...LEGACY_KEYBINDING_ACTIONS,
  // Existing source-runtime consumers not yet migrated to the new panels.
  'app:toggleTeammatePreview', 'app:globalSearch', 'app:quickOpen',
  'chat:messageActions', 'confirm:toggleExplanation', 'settings:close',
] as const

/**
 * Schema for a single keybinding block.
 */
export const KeybindingBlockSchema = lazySchema(() =>
  z
    .object({
      context: z
        .enum(KEYBINDING_CONTEXTS)
        .describe(
          'UI context where these bindings apply. Global bindings work everywhere.',
        ),
      bindings: z
        .record(
          z
            .string()
            .describe('Keystroke pattern (e.g., "ctrl+k", "shift+tab")'),
          z
            .union([
              z.enum(KEYBINDING_ACTIONS),
              z
                .string()
                .regex(/^command:[a-zA-Z0-9:\-_]+$/)
                .describe(
                  'Command binding (e.g., "command:help", "command:compact"). Executes the slash command as if typed.',
                ),
              z.null().describe('Set to null to unbind a default shortcut'),
            ])
            .describe(
              'Action to trigger, command to invoke, or null to unbind',
            ),
        )
        .describe('Map of keystroke patterns to actions'),
    })
    .describe('A block of keybindings for a specific context'),
)

/**
 * Schema for the entire keybindings.json file.
 * Uses object wrapper format with optional $schema and $docs metadata.
 */
export const KeybindingsSchema = lazySchema(() =>
  z
    .object({
      $schema: z
        .string()
        .optional()
        .describe('JSON Schema URL for editor validation'),
      $docs: z.string().optional().describe('Documentation URL'),
      bindings: z
        .array(KeybindingBlockSchema())
        .describe('Array of keybinding blocks by context'),
    })
    .describe(
      'Claude Code keybindings configuration. Customize keyboard shortcuts by context.',
    ),
)

/**
 * TypeScript types derived from the schema.
 */
export type KeybindingsSchemaType = z.infer<
  ReturnType<typeof KeybindingsSchema>
>
