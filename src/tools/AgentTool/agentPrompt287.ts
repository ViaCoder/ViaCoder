import {getSurfaceIdentity287} from '../../services/context/surface287.js'
import memoize from 'lodash-es/memoize.js'
import {createAgentPrompt287} from './officialAgentPrompt287/native.js'
import {officialAgentSelection287} from './agentSelection287.js'
import {agentPromptState287} from '../../services/context/agentPromptState287.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getModelBehaviorName287,getModelIdentityName287} from '../../utils/model/behavior287.js'
import {getBakedCatalogEntry287,getCanonicalRoot287} from '../../utils/model/canonical287.js'
import {getModelBehaviorMemoOwner287} from '../../utils/model/servedCatalog.js'
import {getClientDataRecord} from '../../utils/clientData.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {logForDebugging} from '../../utils/debug.js'
import {getSessionId} from '../../bootstrap/state.js'
import {isBareMode} from '../../utils/envUtils.js'
import {getTeammateContext} from '../../utils/teammateContext.js'
import {getDynamicTeamContext} from '../../utils/teammate.js'
import {hasWorktreeCreateHook} from '../../utils/hooks.js'
import {findCanonicalGitRoot} from '../../utils/git.js'
import {getCwd} from '../../utils/cwd.js'
import {getPlatform} from '../../utils/platform.js'
import {getWindowsGitBashPath287} from '../../services/context/runtime.js'

export const officialAgentPrompt287=createAgentPrompt287({
 environment:authEnvironment,forkEnabled:officialAgentSelection287.forkEnabled,
 behavior:(model,options)=>options?.identity?getModelIdentityName287(model):getModelBehaviorName287(model),
 catalogEntry:model=>{const entry=getBakedCatalogEntry287(model);return entry?{capabilities:entry.capabilities??[]}:undefined},
 canonicalRoot:getCanonicalRoot287,clientDataRecord:model=>getClientDataRecord(model),feature:getFeatureValue_CACHED_MAY_BE_STALE,
 provider:getAPIProvider,mainModel:getMainLoopModel,memoOwner:getModelBehaviorMemoOwner287,servedOwner:getModelBehaviorMemoOwner287,
 execution:getExecutionSession287,surface:()=>getSurfaceIdentity287(),diskless:agentPromptState287.diskless,derivedSurface:agentPromptState287.derivedSurface,
 memoize,debug:logForDebugging,event(){},sessionId:getSessionId,
 subscription:()=>{const {getSubscriptionType}=require('../../utils/auth.js') as typeof import('../../utils/auth.js');return getSubscriptionType()},
 taskModeOwner:agentPromptState287.taskModeOwner,taskModeReaders:agentPromptState287.readers,
 backgroundPolicy:agentPromptState287.backgroundPolicy,bareMode:isBareMode,
 currentAgentScope:{getStore:getTeammateContext},teamContext:()=>({dynamicTeamContext:getDynamicTeamContext()}),
 hasWorktreeCreateHook,canonicalWorktreeRoot:findCanonicalGitRoot,cwd:getCwd,
 searchToolsOptIn:agentPromptState287.searchToolsOptIn,platform:getPlatform,gitBashPath:getWindowsGitBashPath287,
 hasAccessToken:()=>{const {getClaudeAIOAuthTokens}=require('../../utils/auth.js') as typeof import('../../utils/auth.js');return getClaudeAIOAuthTokens()?.accessToken!=null},
 projectConfig:()=>{const {getCurrentProjectConfig}=require('../../utils/config.js') as typeof import('../../utils/config.js');return getCurrentProjectConfig()},
 globalConfig:()=>{const {getGlobalConfig}=require('../../utils/config.js') as typeof import('../../utils/config.js');return getGlobalConfig()},
})
