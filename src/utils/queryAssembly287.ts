import {feature} from 'bun:bundle'
import {z} from 'zod/v4'
import {createQueryAssembly287,type QueryAssemblyInput287} from './officialQueryAssembly287/native.js'
import {fetchSystemPromptParts,type FetchSystemPromptPartsInput287} from './queryContext.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getAllBaseTools} from '../tools.js'
import {getScratchpadDir,isScratchpadEnabled} from './permissions/filesystem.js'
import {getMemoryReadPolicy287} from '../constants/systemComposerMemory287.js'
import {hasAutoMemPathOverride} from '../memdir/paths.js'
import {communication287} from '../constants/communication287.js'
import {toolMatchesName} from '../Tool.js'
import {authEnvironment} from './authEnvironment.js'
import {getNativeAPIProvider287} from './model/providerSelectionBindings287.js'
import {isFirstPartyRequestEndpoint} from './model/providers.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'
import {oc as hasComplianceTaint} from '../vendor/official-files-api/taints.js'
import {logEvent} from '../services/analytics/index.js'
import {logError} from './log.js'
import {headlessProfilerCheckpoint} from './headlessProfiler.js'
import {asSystemPrompt} from './systemPromptType.js'

const coordinator = feature('COORDINATOR_MODE')
 ? require('../coordinator/coordinatorMode.js') as typeof import('../coordinator/coordinatorMode.js')
 : null

/** Original Um calls the same IDn, Memory, tool catalog and environment owners. */
export function createProductionQueryAssembly287(contextInput:Pick<FetchSystemPromptPartsInput287,'additionalWorkingDirectories'|'mcpClients'>={}) {
 return createQueryAssembly287({
  context:(input:FetchSystemPromptPartsInput287)=>fetchSystemPromptParts({...contextInput,...input}),
  checkpoint:headlessProfilerCheckpoint,
  // Retain canceled first-party phase telemetry, without a new collector.
  metric:(name:string,duration:number)=>logEvent(name,{duration_ms:duration}),
  coordinatorContext:(clients:readonly {name:string}[],_catalog:typeof getAllBaseTools,scratchpad:string|undefined)=>coordinator?.getCoordinatorUserContext(clients,scratchpad)??{},
  toolCatalog:{getAllBaseTools},scratchEnabled:isScratchpadEnabled,scratchDir:getScratchpadDir,
  hasMemoryOverride:hasAutoMemPathOverride,memoryPrompt:(model:string)=>getMemoryReadPolicy287().memoryDynamic(model),modelForPrompt:communication287.modelForPrompt,
  environment:authEnvironment,matchesTool:toolMatchesName,provider:getNativeAPIProvider287,
  firstPartyEndpoint:isFirstPartyRequestEndpoint,complianceTaint:hasComplianceTaint,
  objectSchema:z.object,stringSchema:z.string,booleanSchema:z.boolean,
  feature:getFeatureValue_CACHED_MAY_BE_STALE,
  analytics:(name:string)=>logEvent(name,{}),safeAnalyticsString:(value:string)=>value,errorLog:logError,
  brand:asSystemPrompt,
 })
}

export function assembleQueryPrefix287(input:Omit<QueryAssemblyInput287,'session'> & {session?:QueryAssemblyInput287['session'];additionalWorkingDirectories?:string[]}) {
 return createProductionQueryAssembly287({additionalWorkingDirectories:input.additionalWorkingDirectories,mcpClients:[...input.mcpClients]}).assemble({...input,session:input.session??getExecutionSession287()})
}
