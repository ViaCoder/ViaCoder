import {runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'
import { assertFileToolPathBoundary287 } from '../../utils/confinement287/toolPathBoundary287.js'
import { z } from 'zod/v4'
import {getOriginalGlobDefinition287} from '../../services/tools/officialPublicFileTools287.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {AssistantMessage} from '../../types/message.js'
import type {ToolCallProgress} from '../../Tool.js'
import { buildTool, type ToolDef } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js'
import { GLOB_TOOL_NAME } from './prompt.js'
import {
  getToolUseSummary,
  renderToolResultMessage,
  renderToolUseErrorMessage,
  renderToolUseMessage,
  userFacingName,
} from './UI.js'

const inputSchema = lazySchema(() =>
  z.strictObject({
    pattern: z.string().describe('The glob pattern to match files against'),
    path: z
      .string()
      .optional()
      .describe(
        'The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.',
      ),
  }),
)
type InputSchema = ReturnType<typeof inputSchema>
export type GlobInputSchema287 = InputSchema

const outputSchema = lazySchema(() =>
  z.object({
    durationMs: z
      .number()
      .describe('Time taken to execute the search in milliseconds'),
    numFiles: z.number().describe('Total number of files found'),
    filenames: z
      .array(z.string())
      .describe('Array of file paths that match the pattern'),
    totalMatches: z.number().optional(),
    countIsComplete: z.boolean().optional(),
    truncated: z
      .boolean()
      .describe('Whether results were truncated (limited to 100 files)'),
  }),
)
type OutputSchema = ReturnType<typeof outputSchema>
export type GlobOutputSchema287 = OutputSchema

export type Output = z.infer<OutputSchema>

export const GlobTool = buildTool({
  name: GLOB_TOOL_NAME,
  ruleContentField: 'path',
  backgrounding: 'never',
  remoteExecution: {supported: true},
  searchHint: 'find files by name pattern or wildcard',
  maxResultSizeChars: 100_000,
  async description(input, options) {
    return getOriginalGlobDefinition287().description(input, options)
  },
  userFacingName,
  getToolUseSummary,
  getActivityDescription(input) {
    const summary = getToolUseSummary(input)
    return summary ? `Finding ${summary}` : 'Finding files'
  },
  get inputSchema(): InputSchema {
    return getOriginalGlobDefinition287().inputSchema
  },
  get outputSchema(): OutputSchema {
    return getOriginalGlobDefinition287().outputSchema
  },
  isConcurrencySafe() {
    return true
  },
  isReadOnly() {
    return true
  },
  toAutoClassifierInput(input) {
    return getOriginalGlobDefinition287().toAutoClassifierInput(input)
  },
  suppressesAllPermissionUpdates(input) {
    return getOriginalGlobDefinition287().suppressesAllPermissionUpdates(input)
  },
  isSearchOrReadCommand() {
    return { isSearch: true, isRead: false }
  },
  getPath(input): string {
    return getOriginalGlobDefinition287().getPath(input)
  },
  async preparePermissionMatcher(input) {
    return getOriginalGlobDefinition287().preparePermissionMatcher(input)
  },
  async validateInput(input, context) {
    assertFileToolPathBoundary287(GlobTool, input)

    return getOriginalGlobDefinition287().validateInput(input, context)
  },
  async checkPermissions(input, context): Promise<PermissionResult> {
    return getOriginalGlobDefinition287().checkPermissions(input, context)
  },
  async prompt(options) {
    return getOriginalGlobDefinition287().prompt(options)
  },
  renderToolUseMessage,
  renderToolUseErrorMessage,
  renderToolResultMessage,
  // Reuses Grep's render (UI.tsx:65) — shows filenames.join. durationMs/
  // numFiles are "Found 3 files in 12ms" chrome (under-count, fine).
  extractSearchText({ filenames }) {
    return filenames.join('\n')
  },
  async call(input, context, canUseTool?: CanUseToolFn, parentMessage?: AssistantMessage, onProgress?: ToolCallProgress) {
    assertFileToolPathBoundary287(GlobTool, input)

    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalGlobDefinition287().call(input, context, canUseTool, parentMessage, onProgress, {globLimits: context.globLimits}))
  },
  mapToolResultToToolResultBlockParam(output, toolUseID) {
    return getOriginalGlobDefinition287().mapToolResultToToolResultBlockParam(output, toolUseID)
  },
} satisfies ToolDef<InputSchema, Output>)
