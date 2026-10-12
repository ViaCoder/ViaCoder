import {createOfficialSessionGuidance287} from './officialSessionGuidance287/native.js'
import {getIsNonInteractiveSession} from '../bootstrap/state.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {agentPromptState287} from '../services/context/agentPromptState287.js'
import {authEnvironment} from '../utils/authEnvironment.js'
import {getInitialSettings} from '../utils/settings/settings.js'
import {hasEmbeddedSearchTools} from '../utils/embeddedTools.js'
import {officialAgentPrompt287} from '../tools/AgentTool/agentPrompt287.js'
import {officialAgentSelection287} from '../tools/AgentTool/agentSelection287.js'
import {builtinAgentPolicy287} from '../tools/AgentTool/builtinAgentPolicy287.js'
import {EXPLORE_AGENT} from '../tools/AgentTool/built-in/exploreAgent.js'
import {isUltrareviewEnabled} from '../commands/review/ultrareviewEnabled.js'

export const sessionGuidance287=createOfficialSessionGuidance287({
 nonInteractive:getIsNonInteractiveSession,execution:getExecutionSession287,
 environment:authEnvironment,embeddedSearch:hasEmbeddedSearchTools,
 agentToolSection:officialAgentPrompt287.agentToolSection,
 agentsEnabled:builtinAgentPolicy287.isEnabled,
 forkEnabled:officialAgentSelection287.forkEnabled,
 exploreAgent:EXPLORE_AGENT,taskMode:agentPromptState287.taskMode,
 settings:getInitialSettings,
 // Preserve the existing explicitly unavailable cloud-review launch host;
 // the original Hao still receives its availability decision, not a fake grant.
 reviewAvailable:isUltrareviewEnabled,
})
