import * as path from 'node:path'
import {getProjectRoot} from '../../bootstrap/state.js'
import {getCwd} from '../../utils/cwd.js'
import {getClaudeConfigHomeDir} from '../../utils/envUtils.js'
import {findCanonicalGitRoot} from '../../utils/git.js'
import {sanitizePath} from '../../utils/path.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {filesystemPathRuntime287} from '../../utils/filesystemPathRuntime287.js'
import {getErrnoCode,isENOENT} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../services/analytics/index.js'
import {neutralizeMemoryContent287} from '../../services/context/official/memoryNeutralizer287/native.js'
import {truncateMemoryEntrypoint287,memoryEntryName287} from '../../memdir/officialMemoryTruncation287/native.js'
import {getMemoryDirectoryRuntime287} from '../../memdir/memoryDirectoryRuntime287.js'
import {logMemoryDirCounts} from '../../memdir/memdir.js'
import {createAgentPriming287,type AgentPrimingPorts287} from './officialAgentPriming287/native.js'

// Lazy source-backed gates/formatter avoid re-entering prompts during bootstrap.
const memory=()=>require('../../constants/systemComposerMemory287.js') as typeof import('../../constants/systemComposerMemory287.js')
export const isAgentMemoryEnabled287=()=>memory().isPublicAutoMemoryEnabled287()
export const agentPrimingPorts287:AgentPrimingPorts287={
 qd:isAgentMemoryEnabled287,we:getClaudeConfigHomeDir,Wd:memoryEntryName287,oe:getCwd,Ve:path.sep,cr:getProjectRoot,
 je:path.join,gm:path.dirname,pm:path.basename,Et:path.sep,Dp:()=>path.join(getClaudeConfigHomeDir(),'projects'),
 Jx:sanitizePath,aI:findCanonicalGitRoot,ae:getFsImplementation,
 gY:(fs,value)=>filesystemPathRuntime287.realpath(fs,value),W:isENOENT,E:getErrnoCode,
 Xn:value=>getMemoryDirectoryRuntime287().storageKeyValid(value),
 i:logEvent,c:value=>value as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,t:logForDebugging,
 vo:(displayName,memoryDir,options)=>memory().getMemoryReadPolicy287().memoryLines(displayName,memoryDir,options),
 Ihn:truncateMemoryEntrypoint287,jQ:neutralizeMemoryContent287,ze:logMemoryDirCounts,
 HHt:(prompt,model)=>{const {enhanceSystemPromptWithEnvDetails}=require('../../constants/prompts.js') as typeof import('../../constants/prompts.js');return enhanceSystemPromptWithEnvDetails(prompt,model)},
 get Nko(){return (require('../../constants/prompts.js') as typeof import('../../constants/prompts.js')).DEFAULT_AGENT_PROMPT},
}
export const agentPriming287=createAgentPriming287(agentPrimingPorts287)
