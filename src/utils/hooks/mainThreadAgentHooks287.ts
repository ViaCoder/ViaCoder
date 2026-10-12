import * as path from 'node:path'
import {getOriginalCwd,setMainThreadAgentHooks287} from '../../bootstrap/state.js'
import {getExecutionSession287,getLegacyExecutionContext287} from '../../services/context/execution287.js'
import {logEvent} from '../../services/analytics/index.js'
import {getGlobalConfig} from '../config.js'
import {getGlobalClaudeFile} from '../env.js'
import {findCanonicalGitRoot} from '../git.js'
import {getPlatform} from '../platform.js'
import {logForDebugging} from '../debug.js'
import {getSettingsForSource} from '../settings/settings.js'
import {jsonStringify} from '../slowOperations.js'
import {createMainThreadAgentHookSelection287} from './officialHooksConfiguration287/agent.js'

// Expose existing je methods, not a second workspace restriction owner. The
// public unsupported launch entries remain blocked; source reads stay intact.
declare module '../../tools/AgentTool/officialAgentPromptState287/native.js' {
 interface LaunchOptions287 {
  workspaceRestrictionState():{restriction:{gateKeys:readonly string[];sparesInstructionFiles?:boolean}}|null|undefined
  restrictedWorkspaceRoots():ReadonlyMap<string,{gateKeys:readonly string[]}>
 }
}
const source=createMainThreadAgentHookSelection287({
 setAgentHooks:setMainThreadAgentHooks287,
 settingsForSource:getSettingsForSource,
 execution:getExecutionSession287,
 legacy:getLegacyExecutionContext287,
 originalCwd:getOriginalCwd,
 canonicalGitRoot:findCanonicalGitRoot,
 platform:getPlatform,
 config:getGlobalConfig,
 configFile:getGlobalClaudeFile,
 stringify:jsonStringify,
 debug:logForDebugging,
 // Analytics remains the accepted disabled-C leaf; it owns no product state.
 analytics:(name,metadata)=>logEvent(name,metadata as unknown as Parameters<typeof logEvent>[1]),
 analyticsIdentity:value=>value,
 path,
})
export const selectMainThreadAgentHooks287=source.select
export const isMainThreadAgentHookSourceTrusted287=source.trusted
