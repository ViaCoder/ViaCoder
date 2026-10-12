import {runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'
import { assertFileToolPathBoundary287 } from '../../utils/confinement287/toolPathBoundary287.js'
import { z } from 'zod/v4'
import {getOriginalGrepDefinition287} from '../../services/tools/officialPublicFileTools287.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {AssistantMessage} from '../../types/message.js'
import type {ToolCallProgress} from '../../Tool.js'
import { buildTool, type ToolDef } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js'
import { semanticBoolean } from '../../utils/semanticBoolean.js'
import { semanticNumber } from '../../utils/semanticNumber.js'
import { GREP_TOOL_NAME } from './prompt.js'
import {
  getToolUseSummary,
  renderToolResultMessage,
  renderToolUseErrorMessage,
  renderToolUseMessage,
} from './UI.js'

const inputSchema = lazySchema(() =>
  z.strictObject({
    pattern: z
      .string()
      .describe(
        'The regular expression pattern to search for in file contents',
      ),
    path: z
      .string()
      .optional()
      .describe(
        'File or directory to search in (rg PATH). Defaults to current working directory.',
      ),
    glob: z
      .string()
      .optional()
      .describe(
        'Glob pattern to filter files (e.g. "*.js", "*.{ts,tsx}") - maps to rg --glob',
      ),
    output_mode: z
      .enum(['content', 'files_with_matches', 'count'])
      .optional()
      .describe(
        'Output mode: "content" shows matching lines (supports -A/-B/-C context, -n line numbers, head_limit), "files_with_matches" shows file paths (supports head_limit), "count" shows match counts (supports head_limit). Defaults to "files_with_matches".',
      ),
    '-B': semanticNumber(z.number().optional()).describe(
      'Number of lines to show before each match (rg -B). Requires output_mode: "content", ignored otherwise.',
    ),
    '-A': semanticNumber(z.number().optional()).describe(
      'Number of lines to show after each match (rg -A). Requires output_mode: "content", ignored otherwise.',
    ),
    '-C': semanticNumber(z.number().optional()).describe('Alias for context.'),
    context: semanticNumber(z.number().optional()).describe(
      'Number of lines to show before and after each match (rg -C). Requires output_mode: "content", ignored otherwise.',
    ),
    '-n': semanticBoolean(z.boolean().optional()).describe(
      'Show line numbers in output (rg -n). Requires output_mode: "content", ignored otherwise. Defaults to true.',
    ),
    '-i': semanticBoolean(z.boolean().optional()).describe(
      'Case insensitive search (rg -i)',
    ),
    '-o': semanticBoolean(z.boolean().optional()).describe(
      'Print only the matched (non-empty) parts of each matching line, one match per output line (rg -o / --only-matching). Requires output_mode: "content", ignored otherwise. Defaults to false.',
    ),
    type: z
      .string()
      .optional()
      .describe(
        'File type to search (rg --type). Common types: js, py, rust, go, java, etc. More efficient than include for standard file types.',
      ),
    head_limit: semanticNumber(z.number().optional()).describe(
      'Limit output to first N lines/entries, equivalent to "| head -N". Works across all output modes: content (limits output lines), files_with_matches (limits file paths), count (limits count entries). Defaults to 250 when unspecified. Pass 0 for unlimited (use sparingly — large result sets waste context).',
    ),
    offset: semanticNumber(z.number().optional()).describe(
      'Skip first N lines/entries before applying head_limit, equivalent to "| tail -n +N | head -N". Works across all output modes. Defaults to 0.',
    ),
    multiline: semanticBoolean(z.boolean().optional()).describe(
      'Enable multiline mode where . matches newlines and patterns can span lines (rg -U --multiline-dotall). Default: false.',
    ),
  }),
)
type InputSchema = ReturnType<typeof inputSchema>
export type GrepInputSchema287 = InputSchema

const outputSchema = lazySchema(() =>
  z.object({
    mode: z.enum(['content', 'files_with_matches', 'count']).optional(),
    numFiles: z.number(),
    filenames: z.array(z.string()),
    content: z.string().optional(),
    numLines: z.number().optional(), // For content mode
    numMatches: z.number().optional(), // For count mode
    totalFiles: z.number().optional(),
    totalLines: z.number().optional(),
    appliedLimit: z.number().optional(), // The limit that was applied (if any)
    appliedOffset: z.number().optional(), // The offset that was applied
  }),
)
type OutputSchema = ReturnType<typeof outputSchema>
export type GrepOutputSchema287 = OutputSchema

export type Output = z.infer<OutputSchema>

export const GrepTool = buildTool({
  name: GREP_TOOL_NAME,
  ruleContentField: 'path',
  backgrounding: 'never',
  remoteExecution: {supported: true},
  searchHint: 'search file contents with regex (ripgrep)',
  // 20K chars - tool result persistence threshold
  maxResultSizeChars: 20_000,
  strict: true,
  async description(input, options) {
    return getOriginalGrepDefinition287().description(input, options)
  },
  userFacingName() {
    return 'Search'
  },
  getToolUseSummary,
  getActivityDescription(input) {
    const summary = getToolUseSummary(input)
    return summary ? `Searching for ${summary}` : 'Searching'
  },
  get inputSchema(): InputSchema {
    return getOriginalGrepDefinition287().inputSchema
  },
  get outputSchema(): OutputSchema {
    return getOriginalGrepDefinition287().outputSchema
  },
  isConcurrencySafe() {
    return true
  },
  isReadOnly() {
    return true
  },
  toAutoClassifierInput(input) {
    return getOriginalGrepDefinition287().toAutoClassifierInput(input)
  },
  suppressesAllPermissionUpdates(input) {
    return getOriginalGrepDefinition287().suppressesAllPermissionUpdates(input)
  },
  isSearchOrReadCommand() {
    return { isSearch: true, isRead: false }
  },
  getPath(input): string {
    return getOriginalGrepDefinition287().getPath(input)
  },
  async preparePermissionMatcher(input) {
    return getOriginalGrepDefinition287().preparePermissionMatcher(input)
  },
  async validateInput(input, context) {
    assertFileToolPathBoundary287(GrepTool, input)

    return getOriginalGrepDefinition287().validateInput(input, context)
  },
  async checkPermissions(input, context): Promise<PermissionResult> {
    return getOriginalGrepDefinition287().checkPermissions(input, context)
  },
  async prompt(options) {
    return getOriginalGrepDefinition287().prompt(options)
  },
  renderToolUseMessage,
  renderToolUseErrorMessage,
  renderToolResultMessage,
  // SearchResultSummary shows content (mode=content) or filenames.join.
  // numFiles/numLines/numMatches are chrome ("Found 3 files") — fine to
  // skip (under-count, not phantom). Glob reuses this via UI.tsx:65.
  extractSearchText({ mode, content, filenames }) {
    if (mode === 'content' && content) return content
    return filenames.join('\n')
  },
  mapToolResultToToolResultBlockParam(output, toolUseID) {
    return getOriginalGrepDefinition287().mapToolResultToToolResultBlockParam(output, toolUseID)
  },
  async call(input, context, canUseTool?: CanUseToolFn, parentMessage?: AssistantMessage, onProgress?: ToolCallProgress) {
    assertFileToolPathBoundary287(GrepTool, input)

    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalGrepDefinition287().call(input, context, canUseTool, parentMessage, onProgress))
  },
} satisfies ToolDef<InputSchema, Output>)
