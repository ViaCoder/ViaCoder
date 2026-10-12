import type {ExecutionLifecycleContext287} from '../officialExecutionLifecycle287/native.js'
import type {LaunchOptions287} from '../../../tools/AgentTool/officialAgentPromptState287/native.js'
export interface StickyBetas287 {
 sent:Set<string>; rejected:Set<string>; declaredTools:unknown; noChannelTools:unknown;
 declaredToolsDecided:boolean; nameOnlyAnnouncements:Set<string>; surfacedOnWire:Set<string>; definedByValue:Set<string>;
 inlineToolsRefusal:{rejectedHeader:string|undefined;announcementsByName:Set<string>};
 advisorHeld:unknown;wireShapeSeed:unknown;webSearchHistoryRejected:boolean
}
export interface PromptAssembly287 {
 sections():Map<string,string|null>;recordSection(name:string,value:string|null):void;
 forgetAllSections():void;noteInvalidation(reason?:string):void;epoch():number;lastInvalidationReason():string|undefined;reset():void
}
// BEGIN EFFORT_UNSUPPORTED_LATCH_287_TYPES
export type AutoModeUnavailableResponse287={runKey:string;position:number;waited:Promise<boolean>}
export interface ExecutionRequestLatches287 {
 promptCache1hAllowlist():string[]|null
 replacePromptCache1hAllowlist(value:string[]|null):void
 effortUnsupportedModels():Set<string>
 autoModeUnavailableResponse(key:string):AutoModeUnavailableResponse287|undefined
 autoModeUnavailableResponsesInARow(run:string):number
 clearAutoModeUnavailableResponses(run:string):void
 noteAutoModeUnavailableResponse(key:string,value:AutoModeUnavailableResponse287):void
 threadsHeldForServerClassifier():boolean
 markThreadsHeldForServerClassifier():void
 thirdPartyServerClassifierRefused():boolean
 observedGateway():string|undefined
}
export interface ExecutionExtensionsConfig287 {additionalDirectoriesForClaudeMd():string[];replaceAdditionalDirectoriesForClaudeMd(value:string[]):void;teammateAgentId():string|undefined;sessionSkillAllowlist():readonly string[]|undefined;replaceSessionSkillAllowlist(value:readonly string[]|undefined):void}
export interface ExecutionHost287 {launchOptions:LaunchOptions287;readonly requestLatches:ExecutionRequestLatches287;readonly extensionsConfig:ExecutionExtensionsConfig287;readonly backgroundHousekeeping:{claim():boolean;claimStagingReap():boolean};readonly [slot:string]:unknown}
// END EFFORT_UNSUPPORTED_LATCH_287_TYPES
export interface ExecutionProject287 {originalCwd:string;projectRoot:string;cwd:string}
// BEGIN COST_LEDGER_287_TYPES
export type CostModelUsage287 = import('../../../entrypoints/sdk/coreTypes.recovered.js').ModelUsage
export interface RestoredTokens287 {
 inputTokens:number;outputTokens:number;cacheReadInputTokens:number;cacheCreationInputTokens:number
}
export interface CostRestore287 {
 totalCostUSD:number;totalAPIDuration:number;totalAPIDurationWithoutRetries:number;totalToolDuration:number;
 totalLinesAdded:number;totalLinesRemoved:number;lastDuration?:number;startTime?:number;
 modelUsage?:Record<string,CostModelUsage287>;hasUnknownModelCost?:boolean
}
export interface CostSnapshot287 {
 ownerSessionId:string|null;totalCostUSD:number;totalAPIDuration:number;totalAPIDurationWithoutRetries:number;
 totalToolDuration:number;startTime:number;sessionLogicalStartTime:number|undefined;
 totalLinesAdded:number;totalLinesRemoved:number;restoredCostUSD:number;restoredTokens:RestoredTokens287;
 hasUnknownModelCost:boolean;modelUsage:Record<string,CostModelUsage287>
}
// Cost callbacks are the original ae slots; no independent writer/owner.
export interface CostLedger287 {
 totalCostUSD():number;restoredCostUSD():number;restoredTokens():RestoredTokens287;
 totalAPIDuration():number;totalAPIDurationWithoutRetries():number;totalToolDuration():number;
 totalDuration():number;sessionStartTime():number;totalLinesAdded():number;totalLinesRemoved():number;
 hasUnknownModelCost():boolean;modelUsage():Record<string,CostModelUsage287>;
 usageForModel(model:string):CostModelUsage287|undefined;
 totalInputTokens():number;totalOutputTokens():number;totalCacheReadInputTokens():number;
 totalCacheCreationInputTokens():number;totalWebSearchRequests():number;
 recordApiDuration(total:number,withoutRetries:number):void;
 recordCost(cost:number,usage:CostModelUsage287,model:string):void;
 recordToolDuration(duration:number):void;recordLinesChanged(added:number,removed:number):void;
 markUnknownModelCost():void;zeroDurationsAndCostForTests():void;restartClock():void;
 anchorLogicalStart(startTime:number|undefined):void;restore(state:CostRestore287,sessionId:string):void;
 snapshot():CostSnapshot287;restoreSnapshot(snapshot:CostSnapshot287):void;
 claim(sessionId:string):void;scopeTo(sessionId:string):void;ownerSessionId():string|null;
 belongsTo(sessionId:string):boolean;reset(sessionId:string):void
 registerSaver(callback:(storage?:undefined)=>void):void;
 runSaver(storage?:undefined,fallback?:CostLedger287):void;
 registerTranscriptRecorder(callback:(entry:import('../officialCostPersistence287/native.js').CostStateEntry287,storage?:undefined)=>void):void;
 runTranscriptRecorder(entry:import('../officialCostPersistence287/native.js').CostStateEntry287,storage?:undefined,fallback?:CostLedger287):void
}
export interface CostResetJournal287 {promptId():string|null;replacePromptId(value:string|null):void}
export interface CostLedgerOwner287 {
 readonly id:string;readonly costLedger:CostLedger287;readonly requestJournal:CostResetJournal287
}
// END COST_LEDGER_287_TYPES
// These methods are implemented by the recovered source constructors; declare
// their lifecycle surface instead of reflecting or copying owner slots.
// Existing full ve/_e source instances, not new flag storage.
export interface ExecutionSurfaceCaps287 {
 readonly workspace:string;
 readonly remote:unknown|null;
 readonly [field:string]:unknown;
}
export interface ExecutionSurfaceCapabilities287 {
 sdkPerTaskStopAffordance():boolean|undefined;
 declarePerTaskStopAffordance(value:boolean|undefined):void;
 caps():ExecutionSurfaceCaps287;
 replBridgeActive():boolean;
 mainLoopBusy():boolean;
 attacherCaps():{terminal?:string|null;mux?:string|null}|null;
 replaceAttacherCaps(value:{terminal?:string|null;mux?:string|null}|null):void;
}
export interface ExecutionUserPresence287 {
 terminalFocus():boolean|undefined;
 lastInteractionTime():number;recordInteraction(immediate?:boolean):void;flushIfDirty():void;
 interactionFired:{subscribe(listener:()=>void):()=>void};resetBaseline():void;
}
// BEGIN PENDING_HINT_287_TYPES
export interface PendingPluginHint287 {v:number;type:"plugin";value:string;sourceCommand:string}
export interface ExecutionPendingHint287 {
 pending:PendingPluginHint287|null;shownThisSession:boolean;submitted:PendingPluginHint287[];
 subscribe(callback:()=>void):()=>void;getSnapshot():PendingPluginHint287|null;
 subscribeSubmitted(callback:()=>void):()=>void;submit(hint:PendingPluginHint287):void;takeSubmitted():PendingPluginHint287[];
 offer(hint:PendingPluginHint287):void;dismiss():void;markShown():void
}
// END PENDING_HINT_287_TYPES
export interface ExecutionSession287 extends Pick<ExecutionLifecycleContext287,
 'sessionScratch' | 'identity' | 'requestJournal' | 'modelSelection' | 'sessionFlags' | 'costLedger'> {
 readonly host:ExecutionHost287;readonly id:string;readonly parentId:string|undefined;readonly root:ExecutionSession287;
 readonly project:ExecutionProject287|null;
 readonly surfaceCapabilities:ExecutionSurfaceCapabilities287;
 readonly userPresence:ExecutionUserPresence287;
 readonly pendingHint:ExecutionPendingHint287;
 readonly sessionFlags:ExecutionLifecycleContext287['sessionFlags'] & import('../officialInstructionContent287/native.js').InstructionContentOwner287;
 readonly sessionScratch:ExecutionLifecycleContext287['sessionScratch'] & {bareMcpServerMatchersWarned():Set<string>};
 readonly hookRegistry:import('../../../utils/hooks/officialHooksConfiguration287/registry.js').ExecutionHookRegistry287;
 readonly costLedger:CostLedger287;
 readonly requestJournal:ExecutionLifecycleContext287['requestJournal'] & CostResetJournal287 & {lastCancelledAPIMessageId():string|null};
 readonly promptAssembly:PromptAssembly287;
 // Published existing original we field used by the complete ECo/fb startup join.
 readonly pluginsSync:{firstSyncPromise:Promise<boolean>|null};
 readonly conversationLatches:{stickyBetas():StickyBetas287;unlatchStickyBetas():void;reset():void};
 readonly [slot:string]:unknown;
 subscribe(callback:()=>void):()=>void;
 setCwd(cwd:string):void;
 withProject(project:Partial<ExecutionProject287>):ExecutionSession287;
 update(value:{id?:string;parentId?:string;project?:Partial<ExecutionProject287>|null}):void
}
export interface LegacyExecutionContext287 extends importLegacyHooks287 {stickyBetas:StickyBetas287;session?:ExecutionSession287;sessionId?:string;originalCwd?:string;cachedClaudeMdContent?:string|null}
export interface ExecutionSessionRegistry287<T> {peek(session:ExecutionSession287):T|undefined;of(session:ExecutionSession287):T;drop(session:ExecutionSession287):void}
export interface ExecutionSessionRegistryConstructor287 {new<T>(factory:()=>T):ExecutionSessionRegistry287<T>}
export interface ExecutionOwners287 {
 sessionRegistryConstructor:ExecutionSessionRegistryConstructor287;
 createHost():ExecutionHost287;
 createSession(input:{host:ExecutionHost287;id:string;parentId?:string;project:ExecutionProject287|null}):ExecutionSession287;
 createProjectFork(input:{kind:'fork';root:ExecutionSession287}|{kind:'root';host:ExecutionHost287;id:string;parentId?:string},project:ExecutionProject287|null):ExecutionSession287;
 unlatchStickyBetas():void;
 setUserPromptWaitingFor(session:ExecutionSession287,waitingFor:string|undefined):void;
 who(session:ExecutionSession287):boolean;
 wSr(session:ExecutionSession287):string|undefined;
 subscribeUserPrompt(session:ExecutionSession287,listener:()=>void):()=>void
}
export function createExecutionOwners287(ports:{executionContext():ExecutionSession287;legacyContext():LegacyExecutionContext287|undefined}):ExecutionOwners287

import type {LegacyHookRegistry287 as importLegacyHooks287} from '../../../utils/hooks/officialHooksConfiguration287/registry.js'
