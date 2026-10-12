import {createRequire} from 'node:module'
import {createFetchWrapper287,type FetchWrapper287,type Fetch287} from './officialFetchWrapper287/native.js'
import {assertBedrockProviderRemoved,getAPIProviderForStatsig,isFirstPartyRequestEndpoint} from '../../utils/model/providers.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {getExecutionSession287,getLegacyExecutionContext287} from '../context/execution287.js'
import {getFetchRequestState286} from '../../utils/officialFetchRequestState286/runtime.js'
import {getClientData} from '../../utils/clientData.js'
import {createHttpWif286} from '../../utils/officialHttpWif286/runtime.js'
import {isClaudeAISubscriber} from '../../utils/auth.js'
import {officialLowPriority} from '../../utils/lowPriority.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {logEvent} from '../analytics/index.js'
import {logForDebugging,getMinDebugLogLevel} from '../../utils/debug.js'
import {logForDiagnosticsNoPII} from '../../utils/diagLogs.js'
import {logError} from '../../utils/log.js'
import {jsonStringify} from '../../utils/slowOperations.js'
import {sharedTlsFetch287} from '../../utils/sharedTlsFetch287.js'
import {createBlockGzipTransport287,handleGzipResponse286,prepareOriginalCompressionRequest287} from './requestCompression.js'
import {StreamIdleTimeoutError,StreamSuspendedError,StreamFirstByteTimeoutError,streamWatchdogClock286} from './streamWatchdog.js'
import {applicationPorts286} from './officialFetchWrapper286/applicationPorts.js'
const nativeRequire=createRequire(import.meta.url)
const blockTransport=createBlockGzipTransport287(sharedTlsFetch287)
const wif=createHttpWif286()
let runtime:FetchWrapper287|undefined
/** One original module clock and the existing root request/identity owners. */
export function getFetchWrapper287():FetchWrapper287{return runtime??=createFetchWrapper287(createFetchWrapperPorts287())}
export function createFetchWrapperPorts287():Record<string,unknown>{
 // Existing original pe has these members; its narrow public declaration
 // currently omits them. Read the actual method, not a synthetic model state.
 const selectionRead=<T>(name:string):T=>{
  const owner=getExecutionSession287().modelSelection,method=Reflect.get(owner,name)
  if(typeof method!=='function')throw new TypeError('Original modelSelection member missing: '+name)
  return method.call(owner)
 }
 return {
  builtins:new Proxy({}, {get:(_target,id)=>nativeRequire(String(id))}),nativeRequire,
  provider:()=>{assertBedrockProviderRemoved();return getNativeAPIProvider287()},providerForStats:getAPIProviderForStatsig,firstPartyEndpoint:isFirstPartyRequestEndpoint,
  defaultDispatch:blockTransport.fetch,blockResponse:blockTransport.handleResponse,gzipResponse:handleGzipResponse286,
  prepareCompression:prepareOriginalCompressionRequest287,
  requestState:getFetchRequestState286,clientData:getClientData,subscriber:isClaudeAISubscriber,
  wifBaseSnapshot:wif.getResolvedWIFBaseUrlSnapshot,
  atisLatch:()=>{
   const legacy=getLegacyExecutionContext287();if(legacy)return Reflect.get(legacy,'conversationAtisLatch')
   const owner=getExecutionSession287().conversationLatches
   const read=Reflect.get(owner,'atisLatch')
   if(typeof read!=='function')throw new TypeError('Original conversationLatches.atisLatch member missing')
   return read.call(owner)
  },
  refusalOccurred:()=>selectionRead<boolean>('refusalFallbackOccurred'),refusalHeaderArmed:()=>selectionRead<boolean>('refusalFallbackHeaderArmed'),
  refusalOrigin:()=>selectionRead<string|undefined>('refusalFallbackLatchOriginRequestId'),silentLaneArmed:()=>selectionRead<boolean>('silentLaneServerArmed'),
  armSilentLane:()=>selectionRead<void>('armSilentLaneFromServer'),
  lowPriorityActive:officialLowPriority.NMe,
  feature:getFeatureValue_CACHED_MAY_BE_STALE,environment:applicationPorts286.a,
  clock:streamWatchdogClock286,streamIdleError:StreamIdleTimeoutError,streamSuspendedError:StreamSuspendedError,streamFirstResponseError:StreamFirstByteTimeoutError,
  debug:logForDebugging,debugLevel:getMinDebugLogLevel,stringify:jsonStringify,errorLog:logError,diagnostics:logForDiagnosticsNoPII,
  // Retain the existing canceled analytics leaf; no queue or sender is restored.
  analytics:(name:string,_fields:unknown)=>logEvent(name,{}),
 }
}
export function createProductionFetchWrapper287(fetchImpl:Fetch287|undefined,source:string|undefined,routedProvider:string|undefined,storageV5:unknown,clock=streamWatchdogClock286):Fetch287 {
 return getFetchWrapper287().wrapper(fetchImpl,source,routedProvider,storageV5,clock)
}
