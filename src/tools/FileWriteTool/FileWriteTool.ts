import {runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'
import { assertDirectFileMutationCapability287, assertFileToolPathBoundary287 } from '../../utils/confinement287/toolPathBoundary287.js'


import { z } from 'zod/v4'







import type { ToolUseContext } from '../../Tool.js'
import {createElement} from 'react'
import {Text} from '../../ink.js'
import { buildTool, type ToolDef } from '../../Tool.js'
import {getOriginalFileWriteDefinition287,type PublicFileOutcome287} from '../../services/tools/officialFileWriteEdit287.js'
import {getOriginalFileToolContext287} from '../../services/tools/officialPublicFileTools287.js'











import { lazySchema } from '../../utils/lazySchema.js'



import type { PermissionResult } from '../../utils/permissions/PermissionResult.js'


import { gitDiffSchema, hunkSchema } from '../FileEditTool/types.js'
import { FILE_WRITE_TOOL_NAME, getWriteToolDescription } from './prompt.js'
import {
  getToolUseSummary,
  isResultTruncated,
  renderToolResultMessage,
  renderToolUseErrorMessage,
  renderToolUseMessage,
  renderToolUseRejectedMessage,
  userFacingName,
} from './UI.js'

const inputSchema = lazySchema(() =>
  z.strictObject({
    file_path: z
      .string()
      .describe(
        'The absolute path to the file to write (must be absolute, not relative)',
      ),
    content: z.string().describe('The content to write to the file'),
  }),
)
type InputSchema = ReturnType<typeof inputSchema>

const outputSchema = lazySchema(() =>
  z.object({
    type: z
      .enum(['create', 'update'])
      .describe(
        'Whether a new file was created or an existing file was updated',
      ),
    filePath: z.string().describe('The path to the file that was written'),
    content: z.string().describe('The content that was written to the file'),
    structuredPatch: z
      .array(hunkSchema())
      .describe('Diff patch showing the changes'),
    originalFile: z
      .string()
      .nullable()
      .describe(
        'The original file content before the write (null for new files)',
      ),
    gitDiff: gitDiffSchema().optional(),
  }),
)
type OutputSchema = ReturnType<typeof outputSchema>

export type Output = z.infer<OutputSchema> & PublicFileOutcome287 & {userModified?:boolean;memdirStamped?:boolean}
export type FileWriteToolInput = InputSchema

export const FileWriteTool = buildTool({
  name: FILE_WRITE_TOOL_NAME,
  get ruleContentField(){return getOriginalFileWriteDefinition287().ruleContentField},
  get remoteExecution(){return getOriginalFileWriteDefinition287().remoteExecution},
  get backgrounding(){return getOriginalFileWriteDefinition287().backgrounding},
  searchHint: 'create or overwrite files',
  maxResultSizeChars: 100_000,
  strict: true,
  async description() {
    return 'Write a file to the local filesystem.'
  },
  userFacingName,
  getToolUseSummary,
  getActivityDescription(input) {
    const summary = getToolUseSummary(input)
    return summary ? `Writing ${summary}` : 'Writing file'
  },
  async prompt() {
    return getWriteToolDescription()
  },
  renderToolUseMessage,
  isResultTruncated,
  get inputSchema(): InputSchema {
    return getOriginalFileWriteDefinition287().inputSchema
  },
  get outputSchema() {
    return getOriginalFileWriteDefinition287().outputSchema
  },
  get outputSchemaAcrossProcesses(){return getOriginalFileWriteDefinition287().outputSchemaAcrossProcesses},
  fromAnotherProcess(output:Output,input:Parameters<ReturnType<typeof getOriginalFileWriteDefinition287>['fromAnotherProcess']>[1],options?:{userModified?:boolean}){
    return getOriginalFileWriteDefinition287().fromAnotherProcess(output,input,options)
  },
  stripForStorage(output:Output,persisted?:boolean){return getOriginalFileWriteDefinition287().stripForStorage(output,persisted)},
  coerceInput(input:unknown){return getOriginalFileWriteDefinition287().coerceInput(input)},
  inputsEquivalent(a:Parameters<ReturnType<typeof getOriginalFileWriteDefinition287>['inputsEquivalent']>[0],b:Parameters<ReturnType<typeof getOriginalFileWriteDefinition287>['inputsEquivalent']>[1]){return getOriginalFileWriteDefinition287().inputsEquivalent(a,b)},
  suppressesAllPermissionUpdates(input:Parameters<ReturnType<typeof getOriginalFileWriteDefinition287>['suppressesAllPermissionUpdates']>[0]){return getOriginalFileWriteDefinition287().suppressesAllPermissionUpdates(input)},
  toAutoClassifierInput(input) {return getOriginalFileWriteDefinition287().toAutoClassifierInput(input)},
  get coerceInputBeforePluginHooks(){return getOriginalFileWriteDefinition287().coerceInputBeforePluginHooks},
  getPath(input){return getOriginalFileWriteDefinition287().getPath(input)},
  backfillObservableInput(input){getOriginalFileWriteDefinition287().backfillObservableInput(input)},
  async preparePermissionMatcher(input){return getOriginalFileWriteDefinition287().preparePermissionMatcher(input)},
  async checkPermissions(input,context):Promise<PermissionResult>{return getOriginalFileWriteDefinition287().checkPermissions(input,getOriginalFileToolContext287(context))},
  renderToolUseRejectedMessage,
  renderToolUseErrorMessage,
  renderToolResultMessage(data:Output,progress,options){
    if(data.staged){
      const block=getOriginalFileWriteDefinition287().mapToolResultToToolResultBlockParam(data,'display-only')
      return createElement(Text,{color:'warning'},typeof block.content==='string'?block.content:null)
    }
    return renderToolResultMessage(data,progress,options)
  },
  extractSearchText() {
    // Transcript render shows either content (create, via HighlightedCode)
    // or a structured diff (update). The heuristic's 'content' allowlist key
    // would index the raw content string even in update mode where it's NOT
    // shown — phantom. Under-count: tool_use already indexes file_path.
    return ''
  },
  async validateInput(input,context:ToolUseContext){
    assertFileToolPathBoundary287(FileWriteTool, input)
    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalFileWriteDefinition287().validateInput(input,getOriginalFileToolContext287(context)))
  },
  async call(input,context,canUseTool,parentMessage,onProgress) {
    await assertDirectFileMutationCapability287(FileWriteTool)
    assertFileToolPathBoundary287(FileWriteTool, input)

    // Complete original Wt lower → LBn → same jKe/tce, NZ/d_ handle,
    // recheckBeforeWrite/close, read cache, diagnostics and LSP owner.
    // Original Wt/gco put userModified in call options, while C's public
    // toolExecution carries it on this same context. Transport it once.
    const callOptions={userModified:context.userModified,globLimits:context.globLimits}
    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalFileWriteDefinition287().call(input,getOriginalFileToolContext287(context),canUseTool,parentMessage,onProgress,callOptions))
  },
  mapToolResultToToolResultBlockParam(data:Output,toolUseID){return getOriginalFileWriteDefinition287().mapToolResultToToolResultBlockParam(data,toolUseID)},
} satisfies ToolDef<InputSchema, Output> & {readonly coerceInputBeforePluginHooks?:boolean})
