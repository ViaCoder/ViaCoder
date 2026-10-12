import {createOfficialAgentPrompt287} from './officialAgentPrompt287/native.js'
import {contextRuntimeKernel} from '../../services/context/runtime.js'
import {FILE_WRITE_TOOL_NAME} from '../FileWriteTool/prompt.js'

// Standalone HHt consumer; the original Agent description/section owner stays
// isolated in agentPrompt287.ts. Runtime settings and token-window inputs are
// read through their existing source-backed owners.
export const officialAgentSystemPrompt287=createOfficialAgentPrompt287({
 Sn:FILE_WRITE_TOOL_NAME,
 _Rt:model=>contextRuntimeKernel.agentSystemTokenReminder(model),
})
