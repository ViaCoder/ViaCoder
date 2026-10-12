import {z} from 'zod/v4'
import mapValues from 'lodash-es/mapValues.js'
import sumBy from 'lodash-es/sumBy.js'
import {getExecutionSession287} from './execution287.js'
import type {ExecutionSession287} from './officialExecutionOwners287/native.js'
import {createCostPersistence287,type CostPersistence287,type CostPersistencePorts287,type CostStateEntry287} from './officialCostPersistence287/native.js'
import {
 getSessionId,getTotalCostUSD,getTotalAPIDuration,getTotalAPIDurationWithoutRetries,getTotalToolDuration,
 getTotalLinesAdded,getTotalLinesRemoved,getTotalDuration,getModelUsage,hasUnknownModelCost,
 getTotalInputTokens,getTotalOutputTokens,getTotalCacheCreationInputTokens,getTotalCacheReadInputTokens,
 getTotalWebSearchRequests,getSdkBetas,setCostStateForRestore,
} from '../../bootstrap/state.js'
import {saveCurrentProjectConfig} from '../../utils/config.js'
import {getContextWindowForModel,getModelMaxOutputTokens} from '../../utils/context.js'
import {getCostPersistenceProject287} from '../../utils/sessionStorage.js'
import {isShuttingDown} from '../../utils/gracefulShutdown.js'
import {logError} from '../../utils/log.js'

// A source-function binding cache, not a second execution/cost owner. Reset
// and independent roots are discovered via the existing current-owner getter.
let binding:{root:ExecutionSession287;native:CostPersistence287}|undefined
export function createCostPersistencePorts287():CostPersistencePorts287 {
 const root=getExecutionSession287().root
 return {executionContext:getExecutionSession287,root,
  project:getCostPersistenceProject287,saveProject:saveCurrentProjectConfig,mapValues,sumBy,
  sessionId:getSessionId,totalCost:getTotalCostUSD,apiDuration:getTotalAPIDuration,
  apiDurationWithoutRetries:getTotalAPIDurationWithoutRetries,toolDuration:getTotalToolDuration,
  linesAdded:getTotalLinesAdded,linesRemoved:getTotalLinesRemoved,totalDuration:getTotalDuration,
  startTime:()=>getExecutionSession287().costLedger.sessionStartTime(),modelUsage:getModelUsage,
  unknownCost:hasUnknownModelCost,inputTokens:getTotalInputTokens,outputTokens:getTotalOutputTokens,
  cacheCreationTokens:getTotalCacheCreationInputTokens,cacheReadTokens:getTotalCacheReadInputTokens,
  webSearchRequests:getTotalWebSearchRequests,shuttingDown:isShuttingDown,
  restore:setCostStateForRestore,sdkBetas:getSdkBetas,contextWindow:getContextWindowForModel,
  maxOutputTokens:getModelMaxOutputTokens,logError,
  number:z.number,string:z.string,object:z.object,record:z.record,literal:z.literal,boolean:z.boolean,
 }
}

export function getCostPersistence287():CostPersistence287 {
 const root=getExecutionSession287().root
 if(binding?.root===root)return binding.native
 const native=createCostPersistence287(createCostPersistencePorts287())
 binding={root,native}
 return native
}

export function restoreTranscriptCosts287(result:{costState?:CostStateEntry287}):boolean {
 return getCostPersistence287().restore(result)
}

// Original Mye forwards the loader's costState, including absence. Bce consumes
// that resolved input directly; rereading here can change the selected snapshot.
// Keep the existing caller argument shape without treating a path as a fallback.
export async function restoreLoadedTranscriptCosts287(result:{
 costState?:CostStateEntry287;sessionId?:string;fullPath?:string
},_transcriptPath?:string):Promise<boolean> {
 return restoreTranscriptCosts287(result)
}
