import type {z} from 'zod/v4'
import type {ExecutionSession287} from '../officialExecutionOwners287/native.js'
import type {ProjectConfig} from '../../../utils/config.js'
import type {FpsMetrics} from '../../../utils/fpsTracker.js'
import type {ModelUsage} from '../../../entrypoints/agentSdkTypes.js'
export interface CostStateEntry287 {
 type:'cost-state';sessionId:string;totalCostUSD:number;totalAPIDuration:number;
 totalAPIDurationWithoutRetries:number;totalToolDuration:number;totalLinesAdded:number;totalLinesRemoved:number;
 totalDuration:number;startTime:number;modelUsage:Record<string,Pick<ModelUsage,
 'inputTokens'|'outputTokens'|'thinkingTokens'|'cacheReadInputTokens'|'cacheCreationInputTokens'|'webSearchRequests'|'costUSD'>>;
 hasUnknownModelCost?:boolean
}
// Existing local Project filesystem/remote writer, not a second backend.
// No caller in this binding supplies the official optional storageV5 backend.
export interface CostPersistenceProject287 {
 appendEntry(entry:CostStateEntry287,sessionId:string,agent?:undefined,storage?:undefined):Promise<void>
}
export interface CostPersistencePorts287 {
 executionContext():ExecutionSession287;root:ExecutionSession287;project():CostPersistenceProject287;
 saveProject(update:(current:ProjectConfig)=>ProjectConfig,storage?:undefined):void;
 mapValues:typeof import('lodash-es/mapValues.js').default;sumBy:typeof import('lodash-es/sumBy.js').default;
 sessionId:typeof import('../../../bootstrap/state.js').getSessionId;
 totalCost:typeof import('../../../bootstrap/state.js').getTotalCostUSD;
 apiDuration:typeof import('../../../bootstrap/state.js').getTotalAPIDuration;
 apiDurationWithoutRetries:typeof import('../../../bootstrap/state.js').getTotalAPIDurationWithoutRetries;
 toolDuration:typeof import('../../../bootstrap/state.js').getTotalToolDuration;
 linesAdded:typeof import('../../../bootstrap/state.js').getTotalLinesAdded;
 linesRemoved:typeof import('../../../bootstrap/state.js').getTotalLinesRemoved;
 totalDuration:typeof import('../../../bootstrap/state.js').getTotalDuration;startTime():number;
 modelUsage:typeof import('../../../bootstrap/state.js').getModelUsage;
 unknownCost:typeof import('../../../bootstrap/state.js').hasUnknownModelCost;
 inputTokens:typeof import('../../../bootstrap/state.js').getTotalInputTokens;
 outputTokens:typeof import('../../../bootstrap/state.js').getTotalOutputTokens;
 cacheCreationTokens:typeof import('../../../bootstrap/state.js').getTotalCacheCreationInputTokens;
 cacheReadTokens:typeof import('../../../bootstrap/state.js').getTotalCacheReadInputTokens;
 webSearchRequests:typeof import('../../../bootstrap/state.js').getTotalWebSearchRequests;
 shuttingDown:typeof import('../../../utils/gracefulShutdown.js').isShuttingDown;
 restore:typeof import('../../../bootstrap/state.js').setCostStateForRestore;
 sdkBetas:typeof import('../../../bootstrap/state.js').getSdkBetas;
 contextWindow:typeof import('../../../utils/context.js').getContextWindowForModel;
 maxOutputTokens:typeof import('../../../utils/context.js').getModelMaxOutputTokens;
 logError:typeof import('../../../utils/log.js').logError;
 number:typeof z.number;string:typeof z.string;object:typeof z.object;record:typeof z.record;literal:typeof z.literal;boolean:typeof z.boolean;
}
export interface CostPersistence287 {
 save(metrics?:FpsMetrics,storage?:undefined):void;snapshot():CostStateEntry287|undefined;
 restore(result:{costState?:CostStateEntry287}):boolean;schema():z.ZodType<CostStateEntry287>;
 projectSaver(metrics?:FpsMetrics):(current:ProjectConfig)=>ProjectConfig;
 runSaver(storage?:undefined):void
}
export function createCostPersistence287(ports:CostPersistencePorts287):CostPersistence287
