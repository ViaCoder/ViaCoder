import {runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'
import { assertDirectFileMutationCapability287, assertFileToolPathBoundary287 } from '../../utils/confinement287/toolPathBoundary287.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {AssistantMessage} from '../../types/message.js'
import { z } from 'zod/v4'
import { buildTool, type ToolDef, type ToolUseContext, type ToolCallProgress } from '../../Tool.js'
import {getOriginalNotebookEditDefinition287, getOriginalFileToolContext287} from '../../services/tools/officialPublicFileTools287.js'
import { lazySchema } from '../../utils/lazySchema.js'
import type { PermissionResult } from '../../utils/permissions/PermissionResult.js'
import { NOTEBOOK_EDIT_TOOL_NAME } from './constants.js'
import { DESCRIPTION, PROMPT } from './prompt.js'
import {
  getToolUseSummary,
  renderToolResultMessage,
  renderToolUseErrorMessage,
  renderToolUseMessage,
  renderToolUseRejectedMessage,
} from './UI.js'

export const inputSchema = lazySchema(() =>
  z.strictObject({
    notebook_path: z
      .string()
      .describe(
        'The absolute path to the Jupyter notebook file to edit (must be absolute, not relative)',
      ),
    cell_id: z
      .string()
      .optional()
      .describe(
        'The ID of the cell to edit. When inserting a new cell, the new cell will be inserted after the cell with this ID, or at the beginning if not specified.',
      ),
    new_source: z.string().describe('The new source for the cell'),
    cell_type: z
      .enum(['code', 'markdown'])
      .optional()
      .describe(
        'The type of the cell (code or markdown). If not specified, it defaults to the current cell type. If using edit_mode=insert, this is required.',
      ),
    edit_mode: z
      .enum(['replace', 'insert', 'delete'])
      .optional()
      .describe(
        'The type of edit to make (replace, insert, delete). Defaults to replace.',
      ),
  }),
)
type InputSchema = ReturnType<typeof inputSchema>
export type NotebookInputSchema287 = InputSchema

export const outputSchema = lazySchema(() =>
  z.object({
    new_source: z
      .string()
      .describe('The new source code that was written to the cell'),
    old_source: z.string().optional(),
    cell_id: z
      .string()
      .optional()
      .describe('The ID of the cell that was edited'),
    cell_type: z.enum(['code', 'markdown']).describe('The type of the cell'),
    language: z.string().describe('The programming language of the notebook'),
    edit_mode: z.string().describe('The edit mode that was used'),
    error: z
      .string()
      .optional()
      .describe('Error message if the operation failed'),
    // Fields for attribution tracking
    notebook_path: z.string().describe('The path to the notebook file'),
    original_file: z
      .string()
      .describe('The original notebook content before modification'),
    updated_file: z
      .string()
      .describe('The updated notebook content after modification'),
  }),
)
type OutputSchema = ReturnType<typeof outputSchema>
export type NotebookOutputSchema287 = OutputSchema

export type Output = z.infer<OutputSchema>

export const NotebookEditTool = buildTool({
  name: NOTEBOOK_EDIT_TOOL_NAME,
  ruleContentField: 'notebook_path',
  backgrounding: 'never',
  searchHint: 'edit Jupyter notebook cells (.ipynb)',
  maxResultSizeChars: 100_000,
  shouldDefer: true,
  async description() {
    return DESCRIPTION
  },
  async prompt() {
    return PROMPT
  },
  userFacingName() {
    return 'Edit Notebook'
  },
  getToolUseSummary,
  getActivityDescription(input) {
    const summary = getToolUseSummary(input)
    return summary ? `Editing notebook ${summary}` : 'Editing notebook'
  },
  get inputSchema(): InputSchema {
    return getOriginalNotebookEditDefinition287().inputSchema
  },
  get outputSchema(): OutputSchema {
    return getOriginalNotebookEditDefinition287().outputSchema
  },
  fromAnotherProcess(output, input) {
    return getOriginalNotebookEditDefinition287().fromAnotherProcess(output, input)
  },
  toAutoClassifierInput(input) {
    return getOriginalNotebookEditDefinition287().toAutoClassifierInput(input)
  },
  backfillObservableInput(input) {
    getOriginalNotebookEditDefinition287().backfillObservableInput(input)
  },
  async preparePermissionMatcher(input) {
    return getOriginalNotebookEditDefinition287().preparePermissionMatcher(input)
  },
  getPath(input): string {
    return getOriginalNotebookEditDefinition287().getPath(input)
  },
  async checkPermissions(input, context): Promise<PermissionResult> {
    return getOriginalNotebookEditDefinition287().checkPermissions(input, getOriginalFileToolContext287(context))
  },
  mapToolResultToToolResultBlockParam(output, toolUseID) {
    return getOriginalNotebookEditDefinition287().mapToolResultToToolResultBlockParam(output, toolUseID)
  },
  renderToolUseMessage,
  renderToolUseRejectedMessage,
  renderToolUseErrorMessage,
  renderToolResultMessage,
  async validateInput(input: z.infer<InputSchema>, toolUseContext: ToolUseContext) {
    assertFileToolPathBoundary287(NotebookEditTool, input)

    return runWithConfinedFileToolIo287(toolUseContext.abortController.signal, () => getOriginalNotebookEditDefinition287().validateInput(input, toolUseContext))
  },
  async call(input, context, canUseTool?: CanUseToolFn, parentMessage?: AssistantMessage, onProgress?: ToolCallProgress) {
    await assertDirectFileMutationCapability287(NotebookEditTool)
    assertFileToolPathBoundary287(NotebookEditTool, input)

    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalNotebookEditDefinition287().call(input, getOriginalFileToolContext287(context), canUseTool, parentMessage, onProgress))
  },

} satisfies ToolDef<InputSchema, Output>)
