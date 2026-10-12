import Anthropic from '@anthropic-ai/sdk'
import {createHash,randomUUID} from 'node:crypto'
import {getAnthropicClient} from '../../services/api/client.js'
import {getAPIMetadata} from '../../services/api/claude.js'
import {classifyAPIError} from '../../services/api/errors.js'
import {createRequestErrorClassifier287} from '../../services/api/errorClassifier287.js'
import {getRetryDelay} from '../../services/api/withRetry.js'
import {currentLimits} from '../../services/claudeAiLimits.js'
import {OfficialHostCell286} from '../../services/policyLimits/officialIdentity286/hostCell.js'
import {oc as hasComplianceTaint} from '../../vendor/official-files-api/taints.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getFetchRequestState286} from '../officialFetchRequestState286/runtime.js'
import {getMcpConnectedProducer287} from '../../services/mcp/connectedProducer287.js'
import {notifyPolicyModelSuccess287} from '../../services/policyLimits/controllerEvents287.js'
import {getAttributionHeader,getCLISyspromptPrefix} from '../../constants/system.js'
import {authEnvironment} from '../authEnvironment.js'
import {handleOAuth401Error,isAnthropicAuthEnabled,isClaudeAISubscriber,getAnthropicApiKey} from '../auth.js'
import {getSharedOAuthRecovery} from '../sharedOAuthRecovery.js'
import {getSecureStorageExecutionHost} from '../secureStorage/macOsKeychainHelpers.js'
import {preferThirdPartyAuthentication,getLastApiCompletionTimestamp,setLastApiCompletionTimestamp,getPromptCache1hAllowlist,setPromptCache1hAllowlist,getPromptId,getSessionId,getIsInteractive} from '../../bootstrap/state.js'
import {isFirstPartyAnthropicBaseUrl} from '../model/providers.js'
import {getNativeAPIProvider287} from '../model/providerSelectionBindings287.js'
import {isKnownIdentity287} from '../model/canonical287.js'
import {CANONICAL_ID_TO_KEY,ALL_MODEL_CONFIGS} from '../model/configs.js'
import {getModelStrings} from '../model/modelStrings.js'
import {getModelUsagePolicy287} from '../../services/context/modelUsagePolicy287.js'
import {createOfficialModelMenuPolicyPorts287} from '../model/officialModelPicker287.js'
import {getModelBehaviorName287} from '../model/behavior287.js'
import {getCatalogEntry,getCatalogCapabilityOverride} from '../model/catalog.js'
import {getServedCapability} from '../model/servedCatalog.js'
import {getOfficialModelMenuPolicy287} from '../model/officialModelPicker287.js'
import {getMainLoopModel,normalizeModelStringForAPI} from '../model/model.js'
import {getModelBetaProducer287} from '../modelBetas287.js'
import {bindOfficialEffortWc287Imports287,resolveOfficialSideQueryEffort287,supportsOfficialHookEffort287} from '../model/effortWc287.js'
import {createOfficialEffortWc287Ny287} from '../model/officialEffortWc287/native.js'
import {EFFORT_LEVELS} from '../effort.js'
import {hasWorkloadIdentityConfiguration} from '../workloadIdentity.js'
import {officialLowPriority} from '../lowPriority.js'
import {createSideQueryLowPriority287} from './lowPriority.js'
import {outcomes as lowPriorityOutcomes} from '../../vendor/official-low-priority/host.js'
import {getInitialSettings} from '../settings/settings.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {logEvent} from '../../services/analytics/index.js'
import {logForDebugging} from '../debug.js'
import {logError} from '../log.js'
import {cloneDeep,jsonStringify} from '../slowOperations.js'
import {errorMessage,toError} from '../errors.js'
import {sharedTlsFetch287} from '../sharedTlsFetch287.js'
import {sleep} from '../sleep.js'
import {startLLMRequestSpan,endLLMRequestSpan} from '../telemetry/sessionTracing.js'
import {emitPerfettoInstant} from '../telemetry/perfettoTracing.js'
import {createSideQueryRequest287} from './request.js'
import {createSideQuerySystem287} from './system.js'
import {createSideQuerySource287} from './source.js'
import {createSideQuerySurrogates287} from './surrogates.js'
import {createSideQueryErrors287} from './errors.js'
import {createSideQueryCapabilities287} from './capabilities.js'
import {createSideQueryEffort287} from './effort.js'
import {createSideQueryTtl287} from './ttl.js'
import {createSideQueryModel287} from './model.js'
import {createSideQueryCompression287} from './compression.js'
import {createSideQuerySignalModel287} from './signalModel.js'
import {createSideQueryAttribution287} from './attribution.js'
import {createSideQueryNames287} from './names.js'
import {createSideQueryMcpNames287} from './mcpNames.js'
import {createSideQueryBetaGates287} from './betaGates.js'
import {createSideQueryOnce287} from './once.js'
import {createSideQueryPublicAccess287} from './publicAccess.js'
import {createSideQueryDispatchEnvironment287} from './dispatchEnvironment.js'
import {createSideQueryAttributionKey287} from './attributionKey.js'
import {createSideQueryEnvString287} from './envString.js'
import {createSideQueryUuid287} from './uuid.js'
import type {SideQueryOptions} from '../sideQuery.js'

export const sideQueryFactories287={request:createSideQueryRequest287,system:createSideQuerySystem287,source:createSideQuerySource287,surrogates:createSideQuerySurrogates287,errors:createSideQueryErrors287,capabilities:createSideQueryCapabilities287,effort:createSideQueryEffort287,ttl:createSideQueryTtl287,model:createSideQueryModel287,compression:createSideQueryCompression287,signalModel:createSideQuerySignalModel287,attribution:createSideQueryAttribution287,names:createSideQueryNames287,mcpNames:createSideQueryMcpNames287,betaGates:createSideQueryBetaGates287,once:createSideQueryOnce287,publicAccess:createSideQueryPublicAccess287,dispatchEnvironment:createSideQueryDispatchEnvironment287,attributionKey:createSideQueryAttributionKey287,uuid:createSideQueryUuid287,envString:createSideQueryEnvString287,lowPriority:createSideQueryLowPriority287}
type Factories=typeof sideQueryFactories287
const debug=logForDebugging
const metric=(event:string,fields:Record<string,unknown>)=>logEvent(event,fields as never)
const provider=()=>getNativeAPIProvider287()
const firstParty=()=>provider()==='firstParty'&&isFirstPartyAnthropicBaseUrl()
const beta=(header:string)=>getModelBetaProducer287().r4r(header)
let once:ReturnType<typeof createSideQueryOnce287>|undefined
function onceOwner(){return (once??=createSideQueryOnce287({U:()=>({host:getSecureStorageExecutionHost()}),V:OfficialHostCell286})).rl()}
const capability=createOfficialEffortWc287Ny287({zQe:(c,m)=>getCatalogCapabilityOverride(m,c),xa:getCatalogEntry,servedCapabilityLookup:(c,m)=>getServedCapability(c,...m),featureGateLookup:n=>getFeatureValue_CACHED_MAY_BE_STALE(n,false)})

/** No authentication, catalog, latches or request cache is constructed here. */
export function bindSideQueryPorts287(f:Factories=sideQueryFactories287):Record<string,any>{
 const source=f.source({}),surrogates=f.surrogates({}),primitives=f.mcpNames({})
 const gates=f.betaGates({a:authEnvironment,ol:hasComplianceTaint,He:provider,GF:(p:string)=>['anthropicAws','anthropicGoogleCloud'].includes(p)})
 const names=f.names({Fn:normalizeModelStringForAPI,bn:(v:unknown)=>v,S:(v:unknown)=>v,yN:createHash,Qfe:(model:string)=>getCatalogEntry(model)?.id})
 const policy=getOfficialModelMenuPolicy287(),policyPorts=createOfficialModelMenuPolicyPorts287()
 const model=f.model({...policyPorts,OU:CANONICAL_ID_TO_KEY,ho:ALL_MODEL_CONFIGS,Fn:normalizeModelStringForAPI,vt:policy.vt,jo:policy.jo,ge:policyPorts.ge,pse:()=>getModelUsagePolicy287().policyOverrides(),RS:getModelStrings,Obe:policy.Obe,$r:policy.$r,Doe:isKnownIdentity287,a:authEnvironment,He:provider,Js:isFirstPartyAnthropicBaseUrl,Be:getModelBehaviorName287,Dbe:bindOfficialEffortWc287Imports287().Dbe,cc:provider,zF:(p:string)=>p==='firstParty'||p==='foundry',rK:gates.rK,ny:capability,t:debug,
 rt:getMainLoopModel})
 const effects={...names,i:metric,t:debug,d:logError,xt:Anthropic.APIError,S:(v:unknown)=>v}
 const system=f.system({FVn:getCLISyspromptPrefix,QGr:getAttributionHeader,BH:()=>getAnthropicApiKey()===null&&hasWorkloadIdentityConfiguration(),NQ:createHash})
 const ttl=f.ttl({a:authEnvironment,ft:isClaudeAISubscriber,pa:()=>currentLimits,tno:getPromptCache1hAllowlist,nno:setPromptCache1hAllowlist,k:getFeatureValue_CACHED_MAY_BE_STALE,tt:getInitialSettings,He:provider})
 const effort=f.effort({nu:EFFORT_LEVELS,Be:getModelBehaviorName287,ny:capability})
 const capabilities=f.capabilities({...effects,He:provider,a:authEnvironment,Fn:normalizeModelStringForAPI,ckn:()=>(getExecutionSession287().host.requestLatches as unknown as {foundryDeploymentCapabilities():Map<string,Set<string>>}).foundryDeploymentCapabilities()})
 const compression=f.compression({Ms:getFetchRequestState286,c:(v:unknown)=>v})
 const errors=f.errors({...effects,sL:getRetryDelay})
 const attribution=f.attribution({...effects,...source,...primitives,l:()=>getMcpConnectedProducer287().attributionState(),Gbe:names.Gbe,
 u6t:(name:string)=>getMcpConnectedProducer287().attributionToolAllowlist(name)})
 const agent=f.attributionKey({...f.uuid({}),Gwn:getPromptId,q:getSessionId})
 const signalModel=f.signalModel({...effects,Fn:normalizeModelStringForAPI,Moe:model.Moe,rl:onceOwner,_:jsonStringify,oee:/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,cee:()=>getIsInteractive()?process.stdout:null,a:authEnvironment,y$:(s:string)=>process.stdout.write(s),Z:toError,st:(e:Error,context:string)=>new Error(context,{cause:e})})
 const ports={...effects,...source,...surrogates,...system,...ttl,...effort,...capabilities,...compression,...errors,...attribution,...signalModel,...model,
 // C: explicit disabled thinking stays disabled even for a denied-model reroute.
 Mbe:()=>false,
 pl:agent.pl,iM:getAnthropicClient,eJ:sharedTlsFetch287,vl:isAnthropicAuthEnabled,D5e:preferThirdPartyAuthentication,a:authEnvironment,Dn:f.dispatchEnvironment(f.envString({})).Dn,
 _j:(fn:()=>unknown)=>getModelBetaProducer287()._j(fn),eZ:(m:string)=>getModelBetaProducer287().eZ(m),sT:(v:Parameters<ReturnType<typeof getModelBetaProducer287>['sT']>[0])=>getModelBetaProducer287().sT(v),
 IF:beta('thinking-token-count-2026-05-13'),Koe:beta('structured-outputs-2025-12-15'),I2e:beta('effort-2025-11-24'),V_t:beta('extended-cache-ttl-2025-04-11'),
 jb:resolveOfficialSideQueryEffort287,jw:supportsOfficialHookEffort287,Im:gates.Im,
 Fn:normalizeModelStringForAPI,Tx:model.Tx,ZFe:getAPIMetadata,_f:cloneDeep,k:getFeatureValue_CACHED_MAY_BE_STALE,
 l4n:(m:string,_agent:unknown,_context:unknown,_messages:unknown,_fast:boolean,q:string)=>startLLMRequestSpan(m,{querySource:q} as never),
 c4n:(_span:unknown,fields:Record<string,unknown>)=>emitPerfettoInstant('LLM Attempt','api,attempt',fields as never),o$t:endLLMRequestSpan,
 s$e:f.lowPriority({qn:officialLowPriority.mr,me:(v:unknown)=>v==null?undefined:v,i:metric,k:getFeatureValue_CACHED_MAY_BE_STALE,c:(v:unknown)=>v,y:(operation:string)=>lowPriorityOutcomes.emit({operation,success:true}),p:(operation:string,reason:string)=>lowPriorityOutcomes.emit({operation,success:false,reason}),d:logError}).s$e,ja:firstParty,Gco:randomUUID,mde:'x-client-request-id',iKt:(m:string)=>(getExecutionSession287().host.requestLatches as unknown as {markEffortUnsupported(model:string):void}).markEffortUnsupported(m),
 I$:(e:unknown)=>createRequestErrorClassifier287('').predicates['I$']!(e),
 // Public unsupported-upstream helper has no firstParty/foundry reprobe path.
 Lut:(m:string,e:unknown)=>{const p=provider();if(['bedrock','vertex','mantle'].includes(p))throw new Error(`Excluded model-access provider: ${p}`);return f.publicAccess({cc:provider}).Lut(m,e)},
 Mdn:(m:string,e:unknown)=>{throw new Error(`Model access reprobe caller is unavailable for ${m}`,{cause:e})},
 He:provider,cc:provider,Jd:Anthropic.APIConnectionError,me:(v:unknown)=>typeof v==='string'?v:undefined,c:(v:unknown)=>v,Er:(v:unknown)=>v,ye:(v:unknown)=>v,ee:sleep,nS:handleOAuth401Error,l:errorMessage,ece:classifyAPIError,
 _wn:()=>{getSharedOAuthRecovery().state.of(getSecureStorageExecutionHost()).firstUnrecoveredAtMs=null},CY:getLastApiCompletionTimestamp,ikn:setLastApiCompletionTimestamp,jXn:notifyPolicyModelSuccess287,
 uJe:agent.uJe,
 }
 return ports
}
/** Factories hold only source declarations. Owners are resolved lazily per call. */
export function executeSideQuery287(options:SideQueryOptions){return sideQueryFactories287.request(bindSideQueryPorts287()).t2(options)}
