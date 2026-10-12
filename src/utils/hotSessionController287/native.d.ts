import type {PublicCcrSink287} from '../../hooks/officialPublicCcrSession287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {AppStateStore} from '../../state/AppStateStore.js'
import type {Message} from '../../types/message.js'
import type {LogOption} from '../../types/logs.js'
import type {ResumeEntrypoint} from '../../commands.js'
import type {FileStateCache} from '../fileStateCache.js'
import type {OfficialRltToolProgressOwner287} from '../../state/officialRltToolProgress287.js'
export interface HotSessionSnapshot287 {conversationId:string;haikuTitle:string|undefined;headHooksPending:boolean}
export interface HotResumeScope287 {
 readFileState:FileStateCache;memorySelector:unknown;
 isolationLatch:{current:unknown;onLatch:unknown};combinedInitialTools:unknown;
 requestDialog:NonNullable<import('../../Tool.js').ToolUseContext['requestDialog']>;
 setMainThreadAgentDefinition(agent:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition|undefined):void
 mergeReadFileStateFrom(messages:Message[],cwd:string):void
 reseatIsolationLatch(value:unknown):void
 reconstructContentReplacementState(messages:Message[],records:unknown[]):void
}
export interface HotSessionInput287 {
 session:ExecutionSession287;presentation?:'inline'|'fullscreen';store:AppStateStore;setAppState:AppStateStore['setState'];
 engine?:import('./engineNative.js').HotEngine287;
 chrome?:HotChromeController287;sandbox?:HotSandbox287;pendingHookMessages?:HotPendingHooks287;
 spinnerStore?:import('./spinnerAdopterNative.js').HotSpinnerStore287;
 clock?:import('../../ink/components/ClockContext.js').Clock;
 transcript:{getSnapshot():Message[];replace(updater:(messages:Message[])=>Message[]):void;cut():void};
 turn:{resetLoadingState():void;setAbortController(value:AbortController|null):void;resetForConversation(input:{kind:'resumed';messages:Message[]}):void;
 guard?:import('../QueryGuard.js').QueryGuard;getSnapshot?():{isExternalLoading:boolean;abortController:AbortController|null};
 buildToolUseContext?:import('../../hooks/toolPermission/officialReplRequester287/native.js').ReplRequesterScreenHost287['buildToolUseContext']};
 draft:{replaceValue(value:string):void};scope:HotResumeScope287;
 dialogStore:unknown;taskRegistry:unknown;messageQueue:unknown;
 storageV5?:undefined;credentials?:import('../officialSecureStorage/runtime.js').CredentialStore;
 sessionHooks:import('./runtime.js').HotSessionHooksRegistry287;initialMessages?:Message[];
 initialMessagesOrigin?:'local'|'remote';initialMainThreadAgentDefinition?:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition;
 resetReplTabToConvo():void;resetTurnEventTail():void;
}
export interface HotSessionController287 {
 bindHost(host:Record<string,unknown>):void
 subscribe(listener:()=>void):()=>void
 getSnapshot():HotSessionSnapshot287
 resume(sessionId:string,log:LogOption,entrypoint:ResumeEntrypoint):Promise<void>
 start():()=>void
 awaitPendingHooks():Promise<void>|void
 deferHookMessages(run:(signal:AbortSignal)=>Promise<import('../../types/message.js').HookResultMessage[]>):void
 releasePendingHookMessages():void
 adoptedPrefillRef:{readonly current:Promise<unknown>|undefined}
 onInit():Promise<void>
 compactConversation(input:HotCompactInput287):Promise<HotCompactResult287>
 bumpConversationId():void
 applyConversationReset(id:string):void
 markConversationRemote():void
 restoreReadFileState(messages:Message[],cwd:string,fork?:boolean,origin?:string):void
 rehydrateResumedFrameState(messages:Message[],fork?:boolean,origin?:string,reportCarry?:boolean):void
 _publish(snapshot:Partial<HotSessionSnapshot287>):void
}
export function createHotSessionClasses287(ports:Record<string,unknown>):{
 SessionController:new(input:HotSessionInput287)=>HotSessionController287
 ReplSessionScope:new(input:HotReplScopeInput287)=>HotReplScope287
 DraftController:new(input:HotDraftInput287)=>HotDraftController287
 PromptSubmitController:new(input:HotPromptHostInput287)=>HotPromptHost287
 Transcript:new(input:{initial:Message[];project(next:Message[],previous:Message[]):void})=>HotTranscript287
 ScrollPin:new(input:{transcript:HotTranscript287;awaySummary:{markUserScrolled():void}})=>HotScrollPin287
 SandboxController:new(input:HotSandboxInput287)=>HotSandbox287
 TurnController:new(input:HotTurnInput287)=>HotTurnController287
 GestureController:new(input:Record<string,unknown>)=>HotGestureController287
 ChromeController:new(input:Record<string,unknown>)=>HotChromeController287
 TitleController:new(input:Record<string,unknown>)=>HotTitleController287
 IdleNudge:new(input:Record<string,unknown>)=>HotIdleNudge287
 TransportController:new(input:Record<string,unknown>)=>HotRemoteTransport287
}

export interface HotTurnInput287 {
 engine:import('./engineNative.js').HotEngine287;ownsEngine:boolean;presentation:'inline'|'fullscreen';
 initialExternalLoading:boolean;initialHaikuTitleAttempted:boolean;
 onTimingChange(update:Record<string,unknown>):void;
 frameNotifier:{deferred(callback:()=>void):void;paced<T>(callback:T):T;flush():void;isDeferring:boolean};
 stream:{scheduleTimeout(callback:()=>void,ms:number):()=>void;isStreamingTextVisible():boolean;getTranscriptLength():number};
}
export interface HotTurnStream287 extends OfficialRltToolProgressOwner287 {
 previewStore:{subscribe(listener:()=>void):()=>void;getState():{raw:string|null;transformed:string|null;rewrite:unknown;salvage:string|null;exact:boolean};getDerived():{displayed:string|null;hideTrailingLine:boolean;displayedHasNewline:boolean}}
 setStreamingToolUses:import('react').Dispatch<import('react').SetStateAction<import('../messages.js').StreamingToolUse[]>>;
 setStreamingThinking:import('react').Dispatch<import('react').SetStateAction<import('../messages.js').StreamingThinking|null>>;
 setUserInputOnProcessing(input:string|undefined,origin?:unknown,waited?:boolean):void;
 applyStreamingText(update:(previous:string|null)=>string|null):void;
 responseLength:number;inFlightMessageId:string|null;isMainResponseStreaming:boolean;
 getSnapshot():{toolProgress:ReadonlyMap<string,import('../../state/officialRltToolProgress287.js').OfficialRltToolProgress287>;streamingToolUses:import('../messages.js').StreamingToolUse[];streamingThinking:import('../messages.js').StreamingThinking|null;userInputOnProcessing:string|undefined};
 trackTranscriptWrite(previous:Message[],next:Message[]):void;reset():void;dispose():void;
 recordApiMetricsEvent(event:import('../officialRlt287.js').OfficialRltApiMetricEvent287):void;
}
export interface HotTurnController287 {
 executeQueuedInput(commands:import('../../types/textInputTypes.js').QueuedCommand[]):Promise<void>;
 prefillRateLimitAutoContinue():void;
 guard:import('../QueryGuard.js').QueryGuard;stream:HotTurnStream287;engineFeed:import('./runtime.js').HotEngineFeed287;
 loading:{getSnapshot():boolean;subscribe(listener:()=>void):()=>void};
 readPendingQueryParams():import('../../query.js').QueryParams;
 bindHost(host:Record<string,unknown>):void;dispose():void;subscribe(listener:()=>void):()=>void;
 getSnapshot():{isLoading:boolean;isExternalLoading:boolean;abortController:AbortController|null;submitCount:number;lastQueryCompletionTime:number};
 resetLoadingState():void;setAbortController(value:AbortController|null):void;resetForConversation(input:{kind:'fresh'|'resumed'|'rewound';messages?:Message[]}):void;
 buildToolUseContext:import('../../hooks/toolPermission/officialReplRequester287/native.js').ReplRequesterScreenHost287['buildToolUseContext'];
 setExternalLoading(value:boolean):void;markSubmit():void;resetTiming():void;markQueryComplete(time:number):void;
 readonly isExternalLoading:boolean;readonly runningTurnModelOverride:string|null;cancel(source?:'local'|'remote'):boolean;
 run(...args:unknown[]):Promise<void>;_pickNewSpinnerTip():void;
 watchLaunchPrompt():()=>void;
}
export interface HotGestureController287 {bindHost(host:Record<string,unknown>):void;readonly pending:unknown;clearPending():void;markQueryLoopStarted():void;cancelHeldAttach():void}
export interface HotChromeController287 {requestExit():void;bindHost(host:Record<string,unknown>):void;subscribe(listener:()=>void):()=>void;getSnapshot():Record<string,unknown>;setView(view:Record<string,unknown>):void;setIdeSelection(value:unknown):void;consumeIdeSelection(uuid?:string):void;recordIdeSelectionConsumedBy(uuid:string,value:unknown):void;returnIdeSelection(value:unknown):void;restoreIdeSelectionConsumedBy(uuid?:string,value?:unknown):void}
export interface HotTitleController287 {connect():void;subscribe(listener:()=>void):()=>void;getSnapshot():Record<string,unknown>;dispose():void}
export interface HotIdleNudge287 {setLocalOverlayShowing(value:boolean):void;onOtherTurnComplete(time:number):void;onClearSubmitted():void;dispose():void}

/** Full kq is owned with bq's startup actors, not another sandbox backend. */
export interface HotSandboxInput287 {
 store:AppStateStore;setAppState:AppStateStore['setState'];isRemoteSession:boolean;
 storageV5?:undefined;credentials?:import('../officialSecureStorage/runtime.js').CredentialStore;
 getMessages():Message[];
 scope:Pick<HotReplScope287,'computeTools'>&{sandboxClassifierVerdicts():{getOrClassify(host:string,port:number|undefined,context:unknown,classify:()=>Promise<boolean>):Promise<boolean>}};
 networkPrompts:{ask(host:import('@anthropic-ai/sandbox-runtime').NetworkHostPattern,options?:{forwardToBridge:boolean}):Promise<boolean>};
}
export interface HotSandbox287 {
 start():{stop():void;refused:boolean};
 ask(host:import('@anthropic-ai/sandbox-runtime').NetworkHostPattern):Promise<boolean>;
}
export interface HotPendingHooks287 {promise:Promise<import('../../types/message.js').HookResultMessage[]>;placement:'head'|'tail';abort():void}

/** Complete Ctt object-argument ABI. The caller retains its actual context,
 * command/attachment owners and query admission; no serialization wrapper. */
export type HotUserInput287=Omit<Parameters<typeof import('../processUserInput/processUserInput.js').processUserInput>[0],'setToolJSX'|'skipAttachments'|'context'>&{
 context:import('../processUserInput/processUserInput.js').ProcessUserInputContext&{session?:ExecutionSession287};
 suppressWorkflowKeyword?:boolean;skipAttachments?:'all'|'mentions';
 wait?:boolean;aheadOfSessionStart?:boolean;pollEventDelivery?:boolean;
 skipSkillPermissionReset?:boolean;promptSubmitted?:unknown;
 localStdinOrigin?:boolean;sessionChannelPersonTyped?:boolean;
 modelScheduledOrigin?:unknown;artifactCommentTurn?:unknown;
 scheduledTaskId?:string;scheduledFireId?:string;
 verifiedSlackHumanTurn?:boolean;inlinedImagePaths?:string[];
 stampThreadState?:boolean;entries?:unknown;
}
export type HotUserInputResult287=import('../processUserInput/processUserInput.js').ProcessUserInputBaseResult&{
 localCommand?:boolean;commandExitCode?:number;forkDispatched?:boolean;
 disallowedTools?:string[];
}

export interface HotCompactInput287 {instructions:string;origin?:string;apiAttemptsLeft?:{count:number}}
export type HotCompactResult287={skip:string}|{result?:unknown;tokensBefore?:number;tokensAfter?:number;[key:string]:unknown}
export interface HotTranscriptReveal287 {
 reveal(uuid:string,options?:'start'|'center'|'end'|'nearest'):Promise<boolean>|null
 release():void
}
export interface HotScrollPin287 {
 viewport:{readonly handle:import('../../ink/components/ScrollBox.js').ScrollBoxHandle|null;attach(handle:import('../../ink/components/ScrollBox.js').ScrollBoxHandle|null):()=>void}
 modalViewport:HotScrollPin287['viewport']
 revealRef:{current:HotTranscriptReveal287|null}
 subscribe(listener:()=>void):()=>void
 getSnapshot():{dividerY:number|null;unseenDivider:import('../../components/FullscreenLayout.js').UnseenDivider|undefined}
 setRenderedLength(length:number):void
 repin(force?:boolean,reason?:string):void
 onUserRowLanded(message:Message):void
 onBelowTranscriptSlotChange(slot:string):void
 onUserScroll(sticky:boolean,handle:import('../../ink/components/ScrollBox.js').ScrollBoxHandle):void
 onUserScrollWithoutDivider(sticky:boolean):void
 reveal(uuid:string,options?:'start'|'center'|'end'|'nearest'):Promise<'unscrollable'|'unknown'|'revealed'>
 releaseReveal():void
 jumpToNew():void
 dispose():void
}

export interface HotReplScopeSnapshot287 {
 commands:import('../../types/command.js').Command[];
 dynamicMcpConfig:Record<string,import('../../services/mcp/types.js').ScopedMcpServerConfig>|undefined;
 tools:import('../../Tool.js').Tool[];renderingTools:import('../../Tool.js').Tool[];
 allowedAgentTypes:string[]|undefined;
 mainThreadAgentDefinition:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition|undefined;
 combinedInitialTools:import('../../Tool.js').Tool[];
}
export interface HotReplScopeInput287 {
 session:ExecutionSession287;store:AppStateStore;
 initialTools:import('../../Tool.js').Tool[];
 initialCommands:import('../../types/command.js').Command[];
 initialMcpClients:import('../../services/mcp/types.js').MCPServerConnection[];
 initialDynamicMcpConfig?:Record<string,import('../../services/mcp/types.js').ScopedMcpServerConfig>;
 mainThreadAgentDefinition?:import('../../tools/AgentTool/loadAgentsDir.js').AgentDefinition;
 initialMessages?:Message[];initialContentReplacements?:import('../toolResultStorage.js').ContentReplacementRecord[];
 disableSlashCommands:boolean;isThinClient:boolean;
 refreshContext():void;
 onCommandsChange?(commands:import('../../types/command.js').Command[]):void;
}
export interface HotReplScope287 extends HotResumeScope287 {
 localJsx:{subscribe(listener:()=>void):()=>void;getSnapshot():Map<string,import('react').ReactNode>;show(node:import('react').ReactNode,options:{commandName:string;immediate:boolean;hidesPrompt:boolean;retireAtTurnBoundary:boolean}):{nodeId:string;closed:Promise<'closed'|'dismissed'>;close():void};closeCommandPanels():void;readonly size:number};
 seedMemoryFile(path:string,state:import('../fileStateCache.js').FileState&{keepContent:true}):void;
 filterCommands?:((command:import('../../types/command.js').Command)=>boolean);
 refresh():void;
 sessionBinding:import('../../hooks/toolPermission/officialReplRequester287/native.js').ReplRequesterBinding287;
 toolState:import('../officialToolState287/native.js').ToolState287;
 workerCommands:{getState():Set<string>|null;setState(update:(value:Set<string>|null)=>Set<string>|null):void};
 computeMcpClients():import('../../services/mcp/types.js').MCPServerConnection[];computeToolPoolFresh():{tools:import('../../Tool.js').Tool[];allowedAgentTypes?:string[];primitiveToolGrant?:unknown};sandboxClassifierVerdicts():{clear():void;getOrClassify(host:string,port:number|undefined,context:unknown,classify:()=>Promise<boolean>):Promise<boolean>};
 sessionEnvVars:Map<string,string>;
 apiKeyVerification:{subscribe(listener:()=>void):()=>void;getSnapshot():import('../../hooks/useApiKeyVerification.js').VerificationStatus;verify(options:{credentials?:import('../officialSecureStorage/runtime.js').CredentialStore;storageV5?:undefined}):Promise<void>};
 contentReplacementState:import('../toolResultStorage.js').ContentReplacementState|undefined;
 bindHost(host:import('../../hooks/toolPermission/officialReplRequester287/native.js').ReplRequesterScreenHost287):void;
 requireHost():import('../../hooks/toolPermission/officialReplRequester287/native.js').ReplRequesterScreenHost287;
 connect():void;dispose():void;subscribe(listener:()=>void):()=>void;getSnapshot():HotReplScopeSnapshot287;
 replaceLocalCommands(commands:import('../../types/command.js').Command[]):void;
 computeTools():import('../../Tool.js').Tool[];
 updateDynamicMcpConfig(config:HotReplScopeSnapshot287['dynamicMcpConfig']|((current:HotReplScopeSnapshot287['dynamicMcpConfig'])=>HotReplScopeSnapshot287['dynamicMcpConfig'])):void;
}

export interface HotDraftStash287 {text:string;cursorOffset:number;mode:import('../../types/textInputTypes.js').PromptInputMode;pastedContents:Record<number,import('../config.js').PastedContent>;launchWarning?:unknown}
export interface HotDraftValueState287 {value:string;active:boolean;stash:HotDraftStash287|null}
export interface HotDraftValueStore287 {getState():HotDraftValueState287;subscribe(listener:()=>void):()=>void}
export interface HotDraftInput287 {valueStore:HotDraftValueStore287;scheduleTimeout(callback:()=>void,delay:number):()=>void;rewriteEdit?(value:string,previous:string):string;onEdit?(value:string,previous:string):void}
export interface HotDraftSnapshot287 {value:string;cursorOffset:number;mode:import('../../types/textInputTypes.js').PromptInputMode;pastedContents:Record<number,import('../config.js').PastedContent>;stashedPrompt:HotDraftStash287|undefined;decorations:readonly unknown[]}
export interface HotDraftController287 {
 subscribe(listener:()=>void):()=>void;getSnapshot():HotDraftSnapshot287;readonly value:string;readonly cursorOffset:number;readonly mode:HotDraftSnapshot287['mode'];readonly pastedContents:HotDraftSnapshot287['pastedContents'];readonly stashedPrompt:HotDraftStash287|undefined;
 setValue(value:string):void;setValueTyped(value:string):void;replaceValue(value:string):void;setValueRaw(value:string):void;setValueWithCursor(value:string,cursor:number):void;setCursorOffset(value:number):void;insertText(value:string,origin?:'input'|'outside'):void;
 setMode(value:HotDraftSnapshot287['mode']):void;setPastedContents(value:HotDraftSnapshot287['pastedContents']|((previous:HotDraftSnapshot287['pastedContents'])=>HotDraftSnapshot287['pastedContents'])):void;
 clear():void;stash():void;popStash(origin:'input'|'outside'):boolean;paint(runs:unknown[]):void;dispose():void;
 onSubmitRequest(listener:(input:string,flag:boolean)=>void):()=>void;submit(input:string,flag?:boolean):boolean;
}
/** Whole WJ is instantiated, while only these original host methods are mounted.
 * Turn/submit/transport capabilities are not supplied or claimed by this view. */
export interface HotPromptHostInput287 {session?:ExecutionSession287;[key:string]:unknown;draft:HotDraftController287;dialogStore:{getState():{open:readonly unknown[]}};turn:{getSnapshot():{isLoading:boolean}};setAppState:AppStateStore['setState']}
export interface HotPromptHost287 {
 submitToAgent(input:string,task:import('../../tasks/InProcessTeammateTask/types.js').InProcessTeammateTaskState|import('../../tasks/LocalAgentTask/LocalAgentTask.js').LocalAgentTaskState,helpers:import('../handlePromptSubmit.js').PromptInputHelpers,pastedContents?:Record<number,import('../config.js').PastedContent>):Promise<void>;
 bindHost(host:Record<string,unknown>):void;submit(input:string,helpers:import('../handlePromptSubmit.js').PromptInputHelpers,options?:Record<string,unknown>):Promise<void>;
 readDraft():{text:string;cursor:number};
 fillDraft(text:string,mode:'replace'|'append'|'insert',decorations?:unknown[]):{isFilled:boolean;refusal?:'dialog'};
 suggestDraft(text:string,generationRequestId?:string):{isShown:boolean};
}

export interface HotTranscript287 {
 getSnapshot():Message[];subscribe(listener:()=>void):()=>void;
 replace(action:Message[]|((rows:Message[])=>Message[]),buffered?:boolean):void;
 keep(change:import('../../cli/printOwnership287/arrivalStageNative.js').SourceMessageOp287,buffered?:boolean):void;
 apply(change:import('../../cli/printOwnership287/arrivalStageNative.js').SourceMessageOp287,buffered?:boolean):void;
 settled():Promise<void>;cut():void;flush():void;
}

export interface HotRemoteTransport287 extends PublicCcrSink287 {readonly activeRemote:{isRemoteMode:boolean};bindHost(host:Record<string,unknown>):void;setActiveRemote(remote:unknown):void;refuseSubmit(input:string,mode:string):boolean;submit(input:string,options:Record<string,unknown>):Promise<void>|null;runBridgeImmediateCommand(...args:unknown[]):void}
