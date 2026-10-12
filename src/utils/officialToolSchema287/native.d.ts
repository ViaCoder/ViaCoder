import type {Tool,Tools,ToolPermissionContext} from '../../Tool.js'
import type {AgentDefinition} from '../../tools/AgentTool/loadAgentsDir.js'
import type {BetaTool} from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
export type OriginalToolSchema287=BetaTool&{strict?:boolean;eager_input_streaming?:boolean;defer_loading?:boolean}
export interface ToolSchemaOptions287 {
 getToolPermissionContext:()=>Promise<ToolPermissionContext>
 tools:Tools
 agents:AgentDefinition[]
 allowedAgentTypes?:string[]
 model?:string
 querySource?:string
 enginePlacement?:'deferred'|'listed'
 deferLoading?:boolean
 cacheControl?:{type:'ephemeral';scope?:'global'|'org';ttl?:'5m'|'1h'}
 withoutToolDescribeHooks?:boolean
 byValueListing?:string
 recordedDescription?:string
 recordedEntry?:OriginalToolSchema287
}
export type SearchInput287={query:string;max_results?:number}
export interface SearchOutput287 {matches:string[];query:string;total_deferred_tools:number;pending_mcp_servers?:string[];failed_mcp_servers?:{name:string;errorCode?:string;error?:string}[]}
export interface SearchDescriptionCache287 {clear():void;describe(name:string,tools:Tools):Promise<string>;maybeInvalidate(tools:Tools):void}
export type SearchTool287=Tool<import('zod/v4').z.ZodType<SearchInput287>,SearchOutput287>&{
 create(context:{tools:Tools;refreshTools?:()=>Tools;turnMcpClients:readonly import('../officialMcpAttachments287/native.js').McpLiveClient287[];refreshMcpClients?:()=>readonly import('../officialMcpAttachments287/native.js').McpLiveClient287[];toolState:import('../officialToolState287/native.js').ToolState287;stickyBetas?:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287;agentId?:string}):{call(input:SearchInput287,options:{signal:AbortSignal}):Promise<{data:SearchOutput287}>}
}
export interface InlineToolDeclaration287 {name:string;description:string;schema:OriginalToolSchema287;server?:string}
export interface RecordedDeferredTools287 {entries:Map<string,OriginalToolSchema287>;nameOnlyAnnouncements:Set<string>;strippedReferences:Set<string>;toolInputCopies:Map<string,'wire'|'displayed'>}
export interface ToolSearchRequestPlan287 {betas:import('../officialModelBetas287/native.js').BetaToken287[];recordedInline:import('../officialMcpAttachments287/native.js').DeclaredToolSet287|undefined;pendingRecorded:import('../officialMcpAttachments287/native.js').DeclaredToolSet287|undefined;deferredEntriesSent:OriginalToolSchema287[]|undefined;byValueNames:Set<string>;placementTools:Tools;keptDeferredNames:Set<string>|undefined;byValueEnabled:boolean;lateToolsEnabled:boolean;tools:Tools;schemas:OriginalToolSchema287[];byValueSchemas:OriginalToolSchema287[];enabled:boolean;mode:'tool_search'|'tool_addition'|undefined;deferredNames:Set<string>;defer(tool:Tool):boolean;globalCacheStrategy:'none'|'system_prompt';needsToolBasedCacheMarker:boolean;declared:import('../officialMcpAttachments287/native.js').DeclaredToolSet287|undefined}
export interface RecordStamp287 {uuid():string;now():string}
export interface SnapshotAttachment287 extends WireShape287 {type:'prompt_snapshot';systemPrompt:string[];tools?:{name:string;description:string;schema?:OriginalToolSchema287;server?:string}[];cliPrefix?:unknown;wireShape?:unknown;reminderFold?:unknown;echoWireToolInputs?:unknown;contextRendering?:unknown}
export interface DeferredRecordAttachment287 {type:'deferred_tools_record';entries:OriginalToolSchema287[];nameOnlyAnnouncements?:string[];strippedReferences?:string[];toolInputCopies?:{id:string;copy:'wire'|'displayed'}[]}
export interface SnapshotProjection287 {systemPrompt:readonly string[];toolDescriptions?:Map<string,string>;toolEntries?:Map<string,OriginalToolSchema287>;toolServers?:Map<string,string>;recordedCliPrefix?:unknown;recordedWireShape?:unknown;record?:import('../../types/message.js').AttachmentMessage<SnapshotAttachment287>;source:'live_unrecorded'|'from_snapshot'|'live_recorded';snapshotHash?:string;atRenderPoint?:boolean}
export interface RecordOptions287 {options:Pick<import('../../Tool.js').ToolUseContext['options'],'bareFork'>&{systemPromptSnapshot?:boolean};querySource:string;stamp:RecordStamp287}
export interface ApiSystemMessage287 {type:'api_system';uuid:string;timestamp:string;message:{role:'system';content:string};toolAdditions?:string[];toolRemovals?:string[];toolDefinitions?:Record<string,OriginalToolSchema287>;outputConfig?:Record<string,unknown>;ephemeral?:boolean;ephemeralSuffix?:string;byValueRemovals?:string[]}
export type ToolSchemaPorts287=Record<string,unknown>
export interface PromptHead287 {cliPrefix:string;wireShape:WireShape287}
export interface WireShape287 {systemTurns?:boolean;toolChangeHeader?:boolean;inlineTools?:boolean;keptReminders?:boolean}
export type ToolSearchNormalized287=import('../../types/message.js').UserMessage|import('../../types/message.js').AssistantMessage|ApiSystemMessage287
export interface ToolSearchRecovery287 {
 onError(error:unknown):string|undefined
 setWire(wire:import('../../services/api/toolSearchRequest287.js').ToolSearchMessageWire287[],indices:number[]):void
 readonly messages:ToolSearchNormalized287[]
 readonly tools:OriginalToolSchema287[]
 readonly betas:import('../officialModelBetas287/native.js').BetaToken287[]
 readonly proxyDemoted:boolean
 readonly reason?:string
}
export type OriginalQueryOptions287=Omit<import('../../services/api/claude.js').Options,'stickyBetas'>&{agentContext:import('../../services/api/officialSdkClientOuter287/native.js').SdkRequestAgent287;stickyBetas?:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287}
export type QueryCallerContext287=import('../../Tool.js').ToolUseContext&{
 options:import('../../Tool.js').ToolUseContext['options']&{activeSkill?:string;activeMcpServer?:string;activeMcpTool?:string};
 isBackgroundAgent?:boolean;getAdvisorSetting?():string|undefined;
}
export interface QueryToolDuration287 {toolName:string;durationMs:number}
export interface QueryTurnOwner287 {
 assistantMessages:import('../../types/message.js').AssistantMessage[];
 toolResults:(import('../../types/message.js').UserMessage|import('../../types/message.js').AttachmentMessage)[];
 toolUseBlocks:import('@anthropic-ai/sdk/resources/index.mjs').ToolUseBlock[];
 toolDurations:QueryToolDuration287[];needsFollowUp:boolean;toolRequestedEndTurn:false|'tool'|'mcp_meta';
 shouldPreventContinuation:boolean;toolWasDeferred:boolean;
 streamingToolExecutor:import('../../services/tools/StreamingToolExecutor.js').StreamingToolExecutor|null;
 reset(options:{clearAssistantMessages:boolean}):void;rebuildStreamingToolExecutor():void;
}
export type OriginalQueryMessage287=import('../../types/message.js').AssistantMessage|import('../../types/message.js').StreamEvent|import('../../types/message.js').SystemAPIErrorMessage|import('../../types/message.js').AttachmentMessage
export interface OriginalRefusalControl287 {type:'refusal_no_fallback';originalModel:string;requestId:string|null;apiRefusalCategory:string|null;apiRefusalExplanation:string|null}
export interface OriginalFallbackRequest287 extends Omit<OriginalRefusalControl287,'type'> {type:'fallback_request';trigger:'refusal';fallbackModel:string;refusedEffort:unknown;creditCode:string|null;mintedStateless:boolean}
export interface OriginalServerFallback287 {type:'server_fallback';fromModel:string;toModel:string;reason:'refusal'|'sticky';apiRefusalCategory:string|null;midStream:boolean;requestId:string|null;refusedEffort:unknown;discardedMessages:import('../../types/message.js').AssistantMessage[];retainedMessages:import('../../types/message.js').AssistantMessage[];retainedText:string;finalStopReason:string|null}
export interface OriginalHintClears287 {type:'hint_clears';ids:string[];contentById:Record<string,string>}
export interface OriginalContextHintController287 {
 active:boolean
 buildRequestParams(messages:import('../../types/message.js').Message[]):{beta:import('../officialModelBetas287/native.js').BetaToken287;body:{context_hint:{enabled:true;target_tokens_saved?:number}}|null}|null
 onRequestError(error:unknown,messages:import('../../types/message.js').Message[]):Promise<{messages:import('../../types/message.js').Message[];clearedIds:Set<string>;clearedContent:Map<string,string>}|null>
 classifyStreamError(error:unknown):boolean
 onStreamFallback(messages:import('../../types/message.js').Message[],requestId?:string):Promise<{messages:import('../../types/message.js').Message[];clearedIds:Set<string>;clearedContent:Map<string,string>}|null>
 strip():void
}
export type OriginalQueryEvent287=OriginalHintClears287|OriginalQueryMessage287|OriginalRefusalControl287|OriginalFallbackRequest287|OriginalServerFallback287|{type:'streaming_fallback_began';cause:string}
export interface OriginalFallbackError287 extends Error {originalModel:string;fallbackModel:string;reason:string;originalError:unknown;blockMessage:string|undefined}
export interface OriginalRequestNormalizationOptions287 {
 model:string;bodyModel?:string;tools:Tools;betas:import('../officialModelBetas287/native.js').BetaToken287[]
 useToolSearch:boolean;accountMemoryWithheld?:boolean;keepForeignThinking?:'none'|'all'|'upgrade'
 reminderFold?:unknown;echoWireToolInputs?:boolean;resumeIncompleteThinking?:boolean
 ingestPool?:{tools:Tools;ownRequest?:{mcpServersPending:boolean}}
 deferredToolReferencePlan?:{kept:Map<string,unknown>;strippedReferenceKeys:Set<string>}
 declaredToolNames?:Set<string>;deferredWireToolNames?:Set<string>;nameOnlyAnnouncements?:Set<string>
 byValueNames?:Set<string>;byValueAnnouncements?:Set<string>;withoutAttachmentHooks?:boolean
 midConvLatchedOff?:boolean;keptReminders?:boolean;advisorDeferred?:boolean;advisorModel?:string;stripWebSearch?:boolean
 thinkingStripPlan?:ReadonlyMap<string,number>;advisorStripPlan?:ReadonlySet<string>
 perTurnEffort?:string;perTurnNow?:string
}
export interface OriginalRequestNormalization287 {
 messagesPreNormalize:import('../../types/message.js').Message[];messagesForAPI:ToolSearchNormalized287[]
 accountMemoryEpoch:string|undefined;midConvFallback:(()=>ToolSearchNormalized287[])|null
 toolChangeFallback:(()=>ToolSearchNormalized287[])|null;inlineToolsFallback:(()=>ToolSearchNormalized287[])|null
 keptForeignSignatures:boolean;blocksEligible:boolean
}
export type OriginalFallbackReason287='overloaded'|'server_error'|'model_not_found'|'permission_denied'|'model_blocked'|'last_resort'
export interface ToolSchemaRuntime287 {
 verifyAPIKey287(apiKey:string,isNonInteractiveSession:boolean,credentials?:import('../officialSecureStorage/runtime.js').CredentialStore,storageV5?:unknown):Promise<boolean>;
 countTextRequest(content:string,credentials?:import('../officialSecureStorage/runtime.js').CredentialStore):Promise<number|null>;
 tokenCountRequest(messages:import('@anthropic-ai/sdk/resources/beta/messages/messages.mjs').BetaMessageParam[],tools:import('@anthropic-ai/sdk/resources/beta/messages/messages.mjs').BetaToolUnion[],model?:string,options?:{credentials?:import('../officialSecureStorage/runtime.js').CredentialStore}):Promise<number|null>;
 gatewaySampleCount(messages:import('@anthropic-ai/sdk/resources/beta/messages/messages.mjs').BetaMessageParam[],tools:import('@anthropic-ai/sdk/resources/beta/messages/messages.mjs').BetaToolUnion[],credentials?:import('../officialSecureStorage/runtime.js').CredentialStore):Promise<number|null>;
 queryAgentEviction287(input:{stickyBetas?:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287;useExactTools?:boolean;name?:string;recordedUuids?:ReadonlySet<string>}):boolean;
 queryForkPoint287(messages:readonly import('../../types/message.js').Message[]):import('crypto').UUID|undefined;
 queryAttributionReset287(options:QueryCallerContext287['options'],enabled:boolean):void;
 querySkillName287(command:import('../../types/command.js').Command):string;
 querySkillContext287(command:import('../../types/command.js').Command,args:string,context:import('../../Tool.js').ToolUseContext):'inline'|'fork';
 queryReadOnlySkill287(context:import('../../Tool.js').ToolUseContext):boolean;
 queryAdvisor287(messages:readonly import('../../types/message.js').Message[],context:{getAdvisorSetting():string|undefined},options:{querySource:string;resumeActive?:boolean;configuredRuntimeModel:string;runtimeOptionsModel:string;carrier?:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287;toolChangesRide:(model:string)=>boolean}):{advisorModel?:string;advisorDeferred:boolean;advisorActive:boolean;announcement?:import('../attachments.js').AdvisorToolAttachment287}
 queryToolChangesRide287(carrier:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287,model:string):boolean
 queryStickyBetas287():import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287
 queryConfiguredModel287():string
 queryDetailedTracing287():boolean
 queryRuntimeModel287(options:Parameters<typeof import('../model/model.js').getRuntimeMainLoopModel>[0]):string
 queryUserSystemPrompt287(custom:string|readonly string[]|undefined,append?:string):string|undefined
 queryCanResumeThinking287(messages:readonly import('../../types/message.js').AssistantMessage[],model:string):boolean
 queryTurnOwner287(input:{createStreamingToolExecutor:()=>import('../../services/tools/StreamingToolExecutor.js').StreamingToolExecutor|null;onReset?:()=>void}):QueryTurnOwner287
 createContextHintController287(options:{querySource:string;agentId?:string;includeFirstPartyBetas:boolean;is529Error(error:unknown):boolean;storageV5?:unknown}):OriginalContextHintController287|null
 /** This typed surface is the hint branch of complete original U4e. */
 dispatchQueryHint287(event:OriginalHintClears287,callbacks:{onHintClears(event:OriginalHintClears287):void}):void
 clearHintToolResults287(messages:import('../../types/message.js').Message[],ids:Set<string>,content?:Map<string,string>):import('../../types/message.js').Message[]
 clearedHintReadPaths287(messages:import('../../types/message.js').Message[],ids:Set<string>):string[]
 fallbackReasonText287(reason:OriginalFallbackReason287,fromName:string,toName:string,error?:unknown):string
 fallbackBlockText287(error:Pick<OriginalFallbackError287,'blockMessage'>,modelName:string):string
 armedFallbackParameters287(arm:{forModel:string;model:string;mode:string}|undefined,model:string,betas:import('../officialModelBetas287/native.js').BetaToken287[],latches:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287,keepFallbackBetas?:boolean,armSuppressed?:boolean):{fallbacks?:'default'|{model:string}[]}

 fallbackErrorClass:new(originalModel:string,fallbackModel:string,reason?:string,originalError?:unknown,blockMessage?:string)=>OriginalFallbackError287
 normalizeOriginalRequest(messages:import('../../types/message.js').Message[],options:OriginalRequestNormalizationOptions287):OriginalRequestNormalization287
 originalQuery(messages:import('../../types/message.js').Message[],systemPrompt:import('../systemPromptType.js').SystemPrompt,thinking:import('../thinking.js').ThinkingConfig,tools:Tools,signal:AbortSignal,options:OriginalQueryOptions287):AsyncGenerator<OriginalQueryEvent287>

 createToolSearchRecovery287(messages:import('../../types/message.js').Message[],tools:Tools,options:import('../../services/api/claude.js').Options,latches:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287,plan:ToolSearchRequestPlan287,state:{betas:import('../officialModelBetas287/native.js').BetaToken287[];messages:ToolSearchNormalized287[];tools:OriginalToolSchema287[];inlineToolsFallback?:()=>ToolSearchNormalized287[];toolChangeFallback?:()=>ToolSearchNormalized287[];midConvFallback?:()=>ToolSearchNormalized287[];wire?:import('../../services/api/toolSearchRequest287.js').ToolSearchMessageWire287[];wireIndices?:number[];systemCacheProxyEligible?:boolean;keptOn?:boolean}):ToolSearchRecovery287
 sendPromptHead287(options:import('../../services/api/claude.js').Options,latches:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287,model:string,betas:import('../officialModelBetas287/native.js').BetaToken287[],keptOn?:boolean):string
 sendToolInputCopies287(messages:import('../../types/message.js').Message[],options:import('../../services/api/claude.js').Options):void
 requestOwnIngest(source:string):boolean
 echoWireInputs(messages:import('../../types/message.js').Message[],override?:boolean):boolean
 promptHeadPrefix(options?:{recorded?:string;isNonInteractive?:boolean;hasAppendSystemPrompt?:boolean}):string
 promptHeadWireShape(latches:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287,model:string,options:{betas:import('../officialModelBetas287/native.js').BetaToken287[];keptOn?:boolean}):WireShape287
 readToolInputCopies(messages:import('../../types/message.js').Message[]):Map<string,'wire'|'displayed'>
 normalizeToolSearchMessages(messages:import('../../types/message.js').Message[],tools:Tools,model?:string,options?:Record<string,unknown>):(import('../../types/message.js').UserMessage|import('../../types/message.js').AssistantMessage|ApiSystemMessage287)[]
 snapshotProject(messages:import('../../types/message.js').Message[],systemPrompt:readonly string[],options:RecordOptions287&{resumeActive?:boolean;contextRendering?:unknown;inheritedReminderFold?:()=>unknown;inheritedWireShape?:()=>unknown;inheritedEchoWireToolInputs?:()=>unknown}):SnapshotProjection287
 snapshotMerge(messages:import('../../types/message.js').Message[],inline:InlineToolDeclaration287[]|undefined,options:RecordOptions287&{head?:{cliPrefix?:unknown;wireShape?:unknown}}):import('../../types/message.js').AttachmentMessage<SnapshotAttachment287>|undefined
 deferredRecord(messages:import('../../types/message.js').Message[],sent:{entries:OriginalToolSchema287[];nameOnlyAnnouncements:Set<string>;strippedReferences:Set<string>}|undefined,options:RecordOptions287&{toolInputCopies?:Map<string,'wire'|'displayed'>}):import('../../types/message.js').AttachmentMessage<DeferredRecordAttachment287>|undefined
 readDeferredRecords(messages:import('../../types/message.js').Message[]):RecordedDeferredTools287
 readPromptSnapshot(messages:readonly import('../../types/message.js').Message[]):{systemPrompt:readonly string[];systemPromptHash:string;toolDescriptions:Map<string,string>;toolEntries:Map<string,OriginalToolSchema287>;toolServers:Map<string,string>;cliPrefix?:string;wireShape?:WireShape287;reminderFold?:boolean;echoWireToolInputs?:boolean;contextRendering?:'inline'|'announced'}|undefined

 searchRequestPlan(messages:import('../../types/message.js').Message[],tools:Tools,options:Omit<import('../../services/api/claude.js').Options,'stickyBetas'>&{stickyBetas:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287},latches:import('../../services/context/officialExecutionOwners287/native.js').StickyBetas287,betas:import('../officialModelBetas287/native.js').BetaToken287[]):Promise<ToolSearchRequestPlan287>

 searchTool:SearchTool287
 searchDescriptionCache:new()=>SearchDescriptionCache287
 searchMode():'tst'|'tst-auto'|'standard'
 searchOptimistic():boolean
 searchModelSupported(model:string):boolean
 mergedBetas(model:string,options?:{isAgenticQuery?:boolean}):unknown[]
 searchEnabled(model:string,tools:Tools,permissions:()=>Promise<ToolPermissionContext>,agents:AgentDefinition[],source?:string,credentials?:import('../officialSecureStorage/runtime.js').CredentialStore):Promise<boolean>
 searchCharThreshold(model:string):number
 searchDiscovered(messages:import('../../types/message.js').Message[],options?:{surfaced:Set<string>|{exceptAnnouncements:Set<string>}}):Set<string>
 searchDelta(...args:Parameters<typeof import('../toolSearch.js').getDeferredToolsDelta>):ReturnType<typeof import('../toolSearch.js').getDeferredToolsDelta>
 searchPreflight(tools:Tools):Promise<void>
 searchPlacement(tool:Tool,declared?:import('../officialMcpAttachments287/native.js').DeclaredToolSet287,pool?:Tools,options?:{toolSearchAbsent?:boolean;placements?:'engine'|'hooks'}):boolean
 searchRecordedListings(selected:Tools,pool:Tools,model:string,options:Omit<ToolSchemaOptions287,'tools'>&{enginePlacementOf(tool:Tool):'deferred'|'listed'},source?:string):Promise<{name:string;listing:string;definition:OriginalToolSchema287}[]|undefined>
 searchRecordedSchemas(tools:Tools,permissions:()=>Promise<ToolPermissionContext>,agents:{activeAgents:AgentDefinition[];allAgents:AgentDefinition[]},model?:string,descriptions?:Map<string,string>,entries?:Map<string,OriginalToolSchema287>):Promise<OriginalToolSchema287[]>
 searchRecordOnly(schemas:OriginalToolSchema287[],declared:import('../officialMcpAttachments287/native.js').DeclaredToolSet287,options:{pool:Tools;keptDeferred:Iterable<string>;keepMcp:boolean;requestCarriesStructuredOutputs:boolean;recordedEntries?:Map<string,OriginalToolSchema287>}):string[]
 searchTokenCounts(tools:Tools,permissions:()=>Promise<ToolPermissionContext>,agents:AgentDefinition[],model:string,credentials?:import('../officialSecureStorage/runtime.js').CredentialStore):Promise<number|null>

 prewarm(tools:Tools,build:(tool:Tool)=>Promise<OriginalToolSchema287>):Promise<void>
 engineDeferred(tool:Tool):boolean
 hookedDeferred(tool:Tool):boolean
 toolSchema(tool:Tool,options:ToolSchemaOptions287):Promise<OriginalToolSchema287>
 hookResolver(tool:Tool,description:string,isDeferred?:boolean):Promise<{description:string;isDeferred:boolean|undefined}>
 /** Canonical artifactSource287 a/X; original yxe reads that same existing slot. */
 artifactStateOwner():{current:undefined|Record<string,unknown>}
 artifactState():Record<string,unknown>
 artifactInitialized():boolean
}
export function createToolSchema287(ports:ToolSchemaPorts287):ToolSchemaRuntime287
