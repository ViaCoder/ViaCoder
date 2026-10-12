import {runWithConfinedFileToolIo287} from '../../utils/confinement287/fileToolIoScope287.js'
import { assertDirectFileMutationCapability287, assertFileToolPathBoundary287 } from '../../utils/confinement287/toolPathBoundary287.js'









import type { ToolUseContext } from '../../Tool.js'
import {createElement} from 'react'
import {Text} from '../../ink.js'
import { buildTool, type ToolDef } from '../../Tool.js'
import {getOriginalFileEditDefinition287,type PublicFileOutcome287} from '../../services/tools/officialFileWriteEdit287.js'
import {getOriginalFileToolContext287} from '../../services/tools/officialPublicFileTools287.js'















import type { PermissionResult } from '../../utils/permissions/PermissionResult.js'



import {FILE_EDIT_TOOL_NAME} from './constants.js'
import { getEditToolDescription } from './prompt.js'
import {type FileEditOutput,inputSchema} from './types.js'
import {
  getToolUseSummary,
  renderToolResultMessage,
  renderToolUseErrorMessage,
  renderToolUseMessage,
  renderToolUseRejectedMessage,
  userFacingName,
} from './UI.js'


export type FileEditOutput287=Omit<FileEditOutput,'originalFile'> & PublicFileOutcome287 & {originalFile:string|null;staleRecovered?:boolean;contentNotInModelContext?:boolean}

export const FileEditTool = buildTool({
  name: FILE_EDIT_TOOL_NAME,
  get ruleContentField(){return getOriginalFileEditDefinition287().ruleContentField},
  get remoteExecution(){return getOriginalFileEditDefinition287().remoteExecution},
  get backgrounding(){return getOriginalFileEditDefinition287().backgrounding},
  searchHint: 'modify file contents in place',
  maxResultSizeChars: 100_000,
  strict: true,
  async description() {
    return 'A tool for editing files'
  },
  async prompt() {
    return getEditToolDescription()
  },
  userFacingName,
  getToolUseSummary,
  getActivityDescription(input) {
    const summary = getToolUseSummary(input)
    return summary ? `Editing ${summary}` : 'Editing file'
  },
  get inputSchema() {
    return getOriginalFileEditDefinition287().inputSchema
  },
  get outputSchema() {
    return getOriginalFileEditDefinition287().outputSchema
  },
  get outputSchemaAcrossProcesses(){return getOriginalFileEditDefinition287().outputSchemaAcrossProcesses},
  fromAnotherProcess(output:FileEditOutput287,input:Parameters<ReturnType<typeof getOriginalFileEditDefinition287>['fromAnotherProcess']>[1],options?:{userModified?:boolean}){
    return getOriginalFileEditDefinition287().fromAnotherProcess(output,input,options)
  },
  stripForStorage(output:FileEditOutput287,persisted?:boolean){return getOriginalFileEditDefinition287().stripForStorage(output,persisted)},
  coerceInput(input:unknown){return getOriginalFileEditDefinition287().coerceInput(input)},
  inputsEquivalent(a:Parameters<ReturnType<typeof getOriginalFileEditDefinition287>['inputsEquivalent']>[0],b:Parameters<ReturnType<typeof getOriginalFileEditDefinition287>['inputsEquivalent']>[1]){return getOriginalFileEditDefinition287().inputsEquivalent(a,b)},
  suppressesAllPermissionUpdates(input:Parameters<ReturnType<typeof getOriginalFileEditDefinition287>['suppressesAllPermissionUpdates']>[0]){return getOriginalFileEditDefinition287().suppressesAllPermissionUpdates(input)},
  toAutoClassifierInput(input) {return getOriginalFileEditDefinition287().toAutoClassifierInput(input)},
  getPath(input){return getOriginalFileEditDefinition287().getPath(input)},
  backfillObservableInput(input){getOriginalFileEditDefinition287().backfillObservableInput(input)},
  async preparePermissionMatcher(input){return getOriginalFileEditDefinition287().preparePermissionMatcher(input)},
  async checkPermissions(input,context):Promise<PermissionResult>{return getOriginalFileEditDefinition287().checkPermissions(input,getOriginalFileToolContext287(context))},
  renderToolUseMessage,
  renderToolResultMessage(data:FileEditOutput287,progress,options){
    if(data.staged){
      const block=getOriginalFileEditDefinition287().mapToolResultToToolResultBlockParam(data,'display-only')
      return createElement(Text,{color:'warning'},typeof block.content==='string'?block.content:null)
    }
    // The existing full-history/diff renderer takes text; nullable transported
    // old content stays nullable in protocol/storage and is lowered only here.
    return renderToolResultMessage({...data,originalFile:data.originalFile??''},progress,options)
  },
  renderToolUseRejectedMessage,
  renderToolUseErrorMessage,
  async validateInput(input,context:ToolUseContext){
    assertFileToolPathBoundary287(FileEditTool, input)
    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalFileEditDefinition287().validateInput(input,getOriginalFileToolContext287(context)))
  },
  async call(input,context,canUseTool,parentMessage,onProgress) {
    await assertDirectFileMutationCapability287(FileEditTool)
    assertFileToolPathBoundary287(FileEditTool, input)

    // Complete original Wt lower → Bfr → same jKe/tce, NZ/d_ handle,
    // recheckBeforeWrite/close, read cache, diagnostics and LSP owner.
    // Original Wt/gco put userModified in call options, while C's public
    // toolExecution carries it on this same context. Transport it once.
    const callOptions={userModified:context.userModified,globLimits:context.globLimits}
    return runWithConfinedFileToolIo287(context.abortController.signal, () => getOriginalFileEditDefinition287().call(input,getOriginalFileToolContext287(context),canUseTool,parentMessage,onProgress,callOptions))
  },
  mapToolResultToToolResultBlockParam(data:FileEditOutput287,toolUseID){return getOriginalFileEditDefinition287().mapToolResultToToolResultBlockParam(data,toolUseID)},
} satisfies ToolDef<ReturnType<typeof inputSchema>, FileEditOutput287>)
