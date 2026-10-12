import {getRootBackgroundHostPorts287} from '../../../cli/background/host287.js'
import * as ReactHost287 from 'react'
import * as SDKErrorOwner287 from '@anthropic-ai/sdk'
import {getExportMessagesRenderer287} from './exportDisplayScope287.js'
import {createHooksLifecycle287,type HooksHostPorts287} from '../../plugins/officialHooksLifecycle287/native.js'
import {modsRegistryOwner287} from '../../plugins/modsRegistryOwner287.js'
import {createModsPolicy287} from '../../plugins/officialModsPolicy287/native.js'
import {createOutsideHookPorts287,getOutsideHookRuntime287} from '../outsideRuntime287.js'
import {markHookRegistrationCommitted287} from './registrationGate.js'
import {modelSwitchErrors287} from './errors.js'
import {getOriginalHookEngine287} from './engineRuntime.js'
import {getOriginalPromptContextOwner287,invalidateHookedPromptContext287} from './promptContext.js'
import {bindHookDispatchRecord287,runHookDispatchScope287} from './dispatchScope.js'
import {getOriginalCwd,getIsNonInteractiveSession} from '../../../bootstrap/state.js'
import {getExecutionSession287,getLegacyExecutionContext287,getRootExecutionSession287,executionSessionRegistryConstructor287} from '../../../services/context/execution287.js'
import {getSettingsCacheStore287} from '../../settings/settingsCache.js'
import lifecyclePorts287 from '../../plugins/officialHooksLifecycle287/ports.json' with {type:'json'}
// Config can register its root cleanup during this module's import cycle.
// Keep the one canonical memo hoisted rather than in an uninitialized TDZ.
var lifecycle:ReturnType<typeof createHooksLifecycle287>|undefined
// Adapt only the original object constructor ABI to C's positional constructor.
// All errors retain the existing ShellError prototype (including instanceof);
// neither dispatch nor the mature Bash/PowerShell tools acquire a second class.
function shellErrorConstructor287(input:{stdout:string;stderr:string;code:number;interrupted:boolean;hadSandboxViolation?:boolean}) {
 const {ShellError}=import.meta.require('../../errors.js') as typeof import('../../errors.js')
 const error=new ShellError(input.stdout,input.stderr,input.code,input.interrupted)
 Object.defineProperty(error,'hadSandboxViolation',{value:input.hadSandboxViolation??false,writable:true,enumerable:true,configurable:true})
 return error
}
function firstPartyRequestMethods287(){
 return (import.meta.require('../../../services/api/usageProduction287.js') as typeof import('../../../services/api/usageProduction287.js')).getNativeFirstPartyRequest287().Gt
}
export function createModsLifecycleProductionPorts287():HooksHostPorts287 {
 const outside=createOutsideHookPorts287(),policy=createModsPolicy287()
 const namedOwnerPorts287=['modsOwner','executionSessionReactProvider287','executionHostProjectReactProvider287','appStateReactContext287','storedImagePathsReactReader287','headlessStructuredIOConstructor287','consoleOAuthFlowComponent287','publicBtwCommand287','mcpClientModuleReader287','modelCanonicalRoot287','fleetInkCreateRoot287','fleetInkInstances287','mcpSkillBuildersOwner287','mcpStateOwnerReader287','inkTerminalWriteContext287','inkReconcilerOwner287','inkThemeContext287','claimContextRegistry287','firstPartyRequestOwner287'] as const
 type PlaceholderPortName287=Exclude<keyof HooksHostPorts287,typeof namedOwnerPorts287[number]>
 const missing=Object.fromEntries(lifecyclePorts287.filter(name=>!namedOwnerPorts287.some(wired=>wired===name)).map(name=>[name,()=>{throw Error('Original Hooks lifecycle application port not connected: '+name)}])) as Record<PlaceholderPortName287,unknown>
 return {...missing,...outside,...getRootBackgroundHostPorts287(),
  sdkAnthropicError287:SDKErrorOwner287.AnthropicError,
  sdkAPIError287:SDKErrorOwner287.APIError,
  sdkAPIUserAbortError287:SDKErrorOwner287.APIUserAbortError,
  sdkAPIConnectionError287:SDKErrorOwner287.APIConnectionError,
  sdkAPIConnectionTimeoutError287:SDKErrorOwner287.APIConnectionTimeoutError,
  sdkRetryableError287:SDKErrorOwner287.RetryableError,
  sdkBadRequestError287:SDKErrorOwner287.BadRequestError,
  sdkAuthenticationError287:SDKErrorOwner287.AuthenticationError,
  sdkPermissionDeniedError287:SDKErrorOwner287.PermissionDeniedError,
  sdkNotFoundError287:SDKErrorOwner287.NotFoundError,
  sdkConflictError287:SDKErrorOwner287.ConflictError,
  sdkUnprocessableEntityError287:SDKErrorOwner287.UnprocessableEntityError,
  sdkRateLimitError287:SDKErrorOwner287.RateLimitError,
  sdkInternalServerError287:SDKErrorOwner287.InternalServerError,
  taskMetadataDelete287:(...args:Parameters<typeof import('../../task/taskLoaderBackend287.js').deleteTaskMetadata287>)=>(import.meta.require('../../task/taskLoaderBackend287.js') as typeof import('../../task/taskLoaderBackend287.js')).deleteTaskMetadata287(...args),
  lspServerInstanceFactory287:(...args:Parameters<typeof import('../../../services/lsp/LSPServerInstance.js').createLSPServerInstance>)=> (import.meta.require('../../../services/lsp/LSPServerInstance.js') as typeof import('../../../services/lsp/LSPServerInstance.js')).createLSPServerInstance(...args),
  ideDiagnosticTrackerSlot287:{of:(_session:import('../../../services/context/officialExecutionOwners287/native.js').ExecutionSession287)=> (import.meta.require('../../../services/diagnosticTracking.js') as typeof import('../../../services/diagnosticTracking.js')).diagnosticTracker},
  lspDiagnosticRegistrySlot287:{of:(_session:import('../../../services/context/officialExecutionOwners287/native.js').ExecutionSession287)=> import.meta.require('../../../services/lsp/LSPDiagnosticRegistry.js') as typeof import('../../../services/lsp/LSPDiagnosticRegistry.js')},
  executeOutsideHooks:(...args:Parameters<ReturnType<typeof getOutsideHookRuntime287>['outside']>)=>getOutsideHookRuntime287().outside(...args),
  ...(import.meta.require('../../attachments.js') as typeof import('../../attachments.js')).createAttachmentAssemblerProductionPorts287(),
  // The published command qualifiers and reset readers share the accepted
  // OAuth value/promise cell and API-key helper owner, not m129's second Rpe.
  oauthCredentialRead287:()=> (import.meta.require('../../sharedOAuthReader.js') as typeof import('../../sharedOAuthReader.js')).getSharedOAuthReader().sync(),
  get fastModeRuntime287(){return (import.meta.require('../../fastMode.js') as typeof import('../../fastMode.js')).getCanonicalFastRuntimeView287()},
  get oauthCredentialCell287(){return (import.meta.require('../../sharedOAuthPersistence.js') as typeof import('../../sharedOAuthPersistence.js')).oauthCredentialState.state},
  apiKeyRead287:(...args:Parameters<typeof import('../../auth.js').getAnthropicApiKeyWithSource>)=> (import.meta.require('../../auth.js') as typeof import('../../auth.js')).getAnthropicApiKeyWithSource(...args),
  managedApiKeyRead287:()=> (import.meta.require('../../auth.js') as typeof import('../../auth.js')).getApiKeyFromConfigOrMacOSKeychain(),
  // Lazy exact leaf delegation: cleanupSweep287 may import this canonical
  // namespace; never initialize its C adapter while constructing the graph.
  cleanupHistoryCutoff287:(...args:Parameters<typeof import('../../cleanupSweep287.js').cleanupHistoryCutoff287>)=> (import.meta.require('../../cleanupSweep287.js') as typeof import('../../cleanupSweep287.js')).cleanupHistoryCutoff287(...args),
  cleanupRetentionSetting287:(...args:Parameters<typeof import('../../cleanupSweep287.js').cleanupRetentionSetting287>)=> (import.meta.require('../../cleanupSweep287.js') as typeof import('../../cleanupSweep287.js')).cleanupRetentionSetting287(...args),
  cleanupHistoryImages287:(...args:Parameters<typeof import('../../cleanupSweep287.js').cleanupHistoryImages287>)=> (import.meta.require('../../cleanupSweep287.js') as typeof import('../../cleanupSweep287.js')).cleanupHistoryImages287(...args),
  cleanupMessageLogs287:(...args:Parameters<typeof import('../../cleanupSweep287.js').cleanupMessageLogs287>)=> (import.meta.require('../../cleanupSweep287.js') as typeof import('../../cleanupSweep287.js')).cleanupMessageLogs287(...args),
  cleanupDebugLogs287:(...args:Parameters<typeof import('../../cleanupSweep287.js').cleanupDebugLogs287>)=> (import.meta.require('../../cleanupSweep287.js') as typeof import('../../cleanupSweep287.js')).cleanupDebugLogs287(...args),
  pluginAutoupdateDisabled287:()=> (import.meta.require('../../config.js') as typeof import('../../config.js')).shouldSkipPluginAutoupdate(),
  managedApiKeyReadCells287:{of:(host:object)=>(import.meta.require('../../auth.js') as typeof import('../../auth.js')).getCanonicalApiKeyReadCell287(host)},
  secureStorage:()=> (import.meta.require('../../secureStorage/index.js') as typeof import('../../secureStorage/index.js')).getSecureStorage(),
  // The canonical source menu and API/header path share this existing quota instance.
  get quotaOwner287(){return (import.meta.require('../../../services/claudeAiLimits.js') as typeof import('../../../services/claudeAiLimits.js')).getQuotaOwner287()},
  globalConfig:()=> (import.meta.require('../../config.js') as typeof import('../../config.js')).getGlobalConfig(),
  settingsTransform287:(...args:Parameters<ReturnType<typeof import('../../settings/fastStatusWriter287.js').getFastStatusSettingsWriter287>['transform']>)=>(import.meta.require('../../settings/fastStatusWriter287.js') as typeof import('../../settings/fastStatusWriter287.js')).getFastStatusSettingsWriter287().transform(...args),
  memorySessionCacheReader287:(session:import('../../../services/context/officialExecutionOwners287/native.js').ExecutionSession287)=>(import.meta.require('../../../services/context/execution287.js') as typeof import('../../../services/context/execution287.js')).runWithExecutionSession287(session,()=>(import.meta.require('../../claudemd.js') as typeof import('../../claudemd.js')).getMemorySessionCache287()),
  memoryFilesForSessionReader287:(...args:Parameters<typeof import('../../claudemd.js').getMemoryFilesForSession287>)=>(import.meta.require('../../claudemd.js') as typeof import('../../claudemd.js')).getMemoryFilesForSession287(...args),
  recordNestedMemoryTrigger287:(...args:Parameters<typeof import('../../nestedMemoryTrigger287.js').recordNestedMemoryTrigger287>)=>(import.meta.require('../../nestedMemoryTrigger287.js') as typeof import('../../nestedMemoryTrigger287.js')).recordNestedMemoryTrigger287(...args),
  ripgrepConfigReader287:()=> (import.meta.require('../../ripgrep.js') as typeof import('../../ripgrep.js')).getRipgrepConfig287(),
  globalTryWrite287:(...args:Parameters<typeof import('../../config.js').trySaveGlobalConfig287>)=>(import.meta.require('../../config.js') as typeof import('../../config.js')).trySaveGlobalConfig287(...args),
  exportMessagesRenderer287:getExportMessagesRenderer287,
  noticeText:(value:string)=>(import.meta.require('../../noticeText287.js') as typeof import('../../noticeText287.js')).Dm(value),
  publicSubcommandRootModule287:()=>({createSubcommandRoot:(import.meta.require('../../../cli/handlers/pluginSubcommandRoot287.js') as typeof import('../../../cli/handlers/pluginSubcommandRoot287.js')).createSubcommandRoot287}),
  publicInitCredentialsModule287:()=>({credentialsStoreFor:(import.meta.require('../../../entrypoints/officialInitContext287/index.js') as typeof import('../../../entrypoints/officialInitContext287/index.js')).officialInitCredentials287}),
  publicStartupSettingsModule287:()=>({getSettingsWithErrors:(import.meta.require("../../settings/settings.js") as typeof import("../../settings/settings.js")).getSettingsWithErrors}),
  publicStartupLogModule287:()=>({logError:(import.meta.require("../../log.js") as typeof import("../../log.js")).logError}),
  publicMcpServeModule287:(specifier:string)=>(import.meta.require('../../plugins/publicMcpServeModule287.js') as typeof import('../../plugins/publicMcpServeModule287.js')).getPublicMcpServeModule287(specifier),
  publicEnvironmentUiModule287:(specifier:string)=>(import.meta.require('../../../cli/environmentCloud287/uiRuntime.js') as typeof import('../../../cli/environmentCloud287/uiRuntime.js')).readEnvironmentUiPublicModule287(specifier),
  publicVoiceModule287:(specifier:string)=>(import.meta.require('../../../voice/official287/runtime.js') as typeof import('../../../voice/official287/runtime.js')).getPublicVoiceModule287(specifier),
  publicConfigCommandModule287:()=>(import.meta.require('../../publicConfigCommandModule287.js') as typeof import('../../publicConfigCommandModule287.js')).getPublicConfigCommandModule287(),
  reactHostInitializer287:()=>ReactHost287,
  get reactHostInternals287(){return Reflect.get(ReactHost287,'__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE')},
  ...Object.fromEntries(Object.entries(ReactHost287).map(([name,value])=>['reactHost287_'+name,value])),
  ...{inkDispatcher287:(import.meta.require('../../../ink/reconciler.js') as typeof import('../../../ink/reconciler.js')).dispatcher},
  nativeKeybindingEventRoot287:(...args:unknown[])=>{const fn=(import.meta.require('../../../keybindings/nativeKeybindingHost287.js') as typeof import('../../../keybindings/nativeKeybindingHost287.js')).getNativeKeybindingModule287('chunk-bv0yr1j4.js')['Yt'];return fn(...args)},
  nativeKeybindingContextRoot287:(...args:unknown[])=>{const fn=(import.meta.require('../../../keybindings/nativeKeybindingHost287.js') as typeof import('../../../keybindings/nativeKeybindingHost287.js')).getNativeKeybindingModule287('chunk-yq5s263e.js')['ert'];return fn(...args)},
  nativeKeybindingRegistryConstructor287:(...args:unknown[])=>{const fn=(import.meta.require('../../../keybindings/nativeKeybindingHost287.js') as typeof import('../../../keybindings/nativeKeybindingHost287.js')).getNativeKeybindingModule287('chunk-yq5s263e.js')['kAt'];return fn(...args)},
  get nativeKeybindingContext287(){return (import.meta.require('../../../keybindings/KeybindingContextLeaf287.js') as typeof import('../../../keybindings/KeybindingContextLeaf287.js')).NativeKeybindingContext287},
  ...{nativeKeybindingEventProjection287:(...args:unknown[])=>{const fn=(import.meta.require('../../../keybindings/nativeKeybindingHost287.js') as typeof import('../../../keybindings/nativeKeybindingHost287.js')).getNativeKeybindingModule287('chunk-yq5s263e.js')['Pco'];return fn(...args)}},
  hotDisplayOnlyTools287:(...args:unknown[])=>{const fn=(import.meta.require('../../hotSessionController287/runtime.js') as typeof import('../../hotSessionController287/runtime.js')).getHotSessionLeaves287().LPn;if(typeof fn!=='function')throw Error('Original hot LPn is not installed');return fn(...args)},
  staticKeybindingProvider287:(props:import('react').ComponentProps<typeof import('../../../keybindings/nativeKeybindingHost287.js').NativeStaticKeybindingProvider287>)=>(import.meta.require('../../../keybindings/nativeKeybindingHost287.js') as typeof import('../../../keybindings/nativeKeybindingHost287.js')).NativeStaticKeybindingProvider287(props),
  memoryContextSlot:getOutsideHookRuntime287().sourceModule('chunk-09m4fzsj.js').Pn,
  bindHookDispatchRecord:bindHookDispatchRecord287,runHooksDispatchScope:runHookDispatchScope287,
  hooksError:(import.meta.require('./errors.js') as typeof import('./errors.js')).modelSwitchErrors287.Oe,registrationCommit:(...args:Parameters<typeof markHookRegistrationCommitted287>)=>markHookRegistrationCommitted287(...args),
  subscriptionType:()=> (import.meta.require('./subscription.js') as typeof import('./subscription.js')).getOriginalModsSubscription287(),
  modsOwner:modsRegistryOwner287.owner,workingDirectory:getOriginalCwd,
  analyticStatus:(...args:unknown[])=>sourceEnginePorts().p(...args),analyticFailure:(...args:unknown[])=>sourceEnginePorts().m(...args),
  analytics:outside.analytics,featureFlag:outside.featureFlag,nonInteractive:getIsNonInteractiveSession,
  execution:getExecutionSession287,legacyExecution:getLegacyExecutionContext287,get rootExecution(){return getRootExecutionSession287()},sessionRegistry:executionSessionRegistryConstructor287,
  // Unt/Yye/_y must read the one existing connected MCP managed-config cell.
  get mcpSkillBuildersOwner287(){return (import.meta.require('../../../skills/mcpSkillBuilders.js') as typeof import('../../../skills/mcpSkillBuilders.js')).getMCPSkillBuilderRegistry287()},
  // The complete factory captures Gt while config registers cleanup. Resolve
  // its methods only when used, after auth initialization, on the same owner.
  firstPartyRequestOwner287:{
   get get(){return firstPartyRequestMethods287().get},
   get post(){return firstPartyRequestMethods287().post},
   get put(){return firstPartyRequestMethods287().put},
   get patch(){return firstPartyRequestMethods287().patch},
   get delete(){return firstPartyRequestMethods287().delete},
  },
  // Lazy readers borrow the actual Memory directory/policy actors at call time.
  memoryDirectoryOwnerReader287:()=>(import.meta.require('../../../constants/systemComposerMemory287.js') as typeof import('../../../constants/systemComposerMemory287.js')).getSystemComposerMemoryDirectoryOwner287(),
  memoryDirectoryPathReader287:()=>(import.meta.require('../../../constants/systemComposerMemory287.js') as typeof import('../../../constants/systemComposerMemory287.js')).getMemoryReadPolicy287().requiredMemoryDirectory287(),
  autoMemoryEnabledReader287:()=>(import.meta.require('../../../constants/systemComposerMemory287.js') as typeof import('../../../constants/systemComposerMemory287.js')).isPublicAutoMemoryEnabled287(),
  memoryReadFenceBlockedReader287:()=>(import.meta.require('../../../constants/systemComposerMemory287.js') as typeof import('../../../constants/systemComposerMemory287.js')).getMemoryReadPolicy287().readFenceBlocked287(),
  memoryClientStoresReader287:()=>(import.meta.require('../../../constants/systemComposerMemory287.js') as typeof import('../../../constants/systemComposerMemory287.js')).getMemoryReadPolicy287().clientStores(),
  mcpStateOwnerReader287:()=>getOutsideHookRuntime287().mcpState(),
  fleetInkCreateRoot287:(...args:Parameters<typeof import('../../../ink.js').createRoot>)=>(import.meta.require('../../../ink.js') as typeof import('../../../ink.js')).createRoot(...args),
  fleetInkInstances287:()=>(import.meta.require('../../../ink/instances.js') as typeof import('../../../ink/instances.js')).default,
  modelCanonicalRoot287:()=>(import.meta.require('../../model/canonical287.js') as typeof import('../../model/canonical287.js')).getCanonicalRoot287(),
  get publicBtwCommand287(){return (import.meta.require('../../../commands/btw/index.js') as typeof import('../../../commands/btw/index.js')).default},
  mcpClientModuleReader287:()=>(import.meta.require('../../../services/mcp/connectedProducer287.js') as typeof import('../../../services/mcp/connectedProducer287.js')).getMcpClientModule287(),
  connectedManagedMcpReader287:()=>((import.meta.require('../../../services/mcp/connectedProducer287.js') as typeof import('../../../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().sourceModule('chunk-mphp7acd.js').Unt as ()=>unknown)(),
  executionSessionReactReader287:(...args:Parameters<typeof import('../../../context/executionProject287.js').useExecutionSession287>)=>(import.meta.require('../../../context/executionProject287.js') as typeof import('../../../context/executionProject287.js')).useExecutionSession287(...args),
  executionHostReactReader287:()=>(import.meta.require('../../../context/executionProject287.js') as typeof import('../../../context/executionProject287.js')).useExecutionHost287(),
  executionProjectReactReader287:(...args:Parameters<typeof import('../../../context/executionProject287.js').useExecutionProject287>)=>(import.meta.require('../../../context/executionProject287.js') as typeof import('../../../context/executionProject287.js')).useExecutionProject287(...args),
  executionOptionalSessionReactReader287:()=>(import.meta.require('../../../context/executionProject287.js') as typeof import('../../../context/executionProject287.js')).useOptionalExecutionSession287(),
  executionSessionReactProvider287:(props:Parameters<typeof import('../../../context/executionProject287.js').ExecutionSessionProvider287>[0])=>(import.meta.require('../../../context/executionProject287.js') as typeof import('../../../context/executionProject287.js')).ExecutionSessionProvider287(props),
  executionHostProjectReactProvider287:(props:Parameters<typeof import('../../../context/executionProject287.js').HostProjectProvider287>[0])=>(import.meta.require('../../../context/executionProject287.js') as typeof import('../../../context/executionProject287.js')).HostProjectProvider287(props),
  get appStateReactContext287(){return (import.meta.require('../../../state/AppState.js') as typeof import('../../../state/AppState.js')).AppStoreContext},
  appStateStoreReactReader287:()=>(import.meta.require('../../../state/AppState.js') as typeof import('../../../state/AppState.js')).useAppStateStore(),
  appStateSelectReactReader287:(...args:Parameters<typeof import('../../../state/AppState.js').useAppState>)=>(import.meta.require('../../../state/AppState.js') as typeof import('../../../state/AppState.js')).useAppState(...args),
  publicPermissionMatcher287:(...args:Parameters<typeof import('../../../hooks/toolPermission/officialPermissionDescriptors287/runtime.js').selectPublicPermissionMatcher287>)=>(import.meta.require('../../../hooks/toolPermission/officialPermissionDescriptors287/runtime.js') as typeof import('../../../hooks/toolPermission/officialPermissionDescriptors287/runtime.js')).selectPublicPermissionMatcher287(...args),
  oauth401Recovery287:(...args:Parameters<ReturnType<typeof import('../../sharedOAuthRecovery.js').getSharedOAuthRecovery>['recover']>)=>(import.meta.require('../../sharedOAuthRecovery.js') as typeof import('../../sharedOAuthRecovery.js')).getSharedOAuthRecovery().recover(...args),
  oauthRefreshDirect287:(...args:Parameters<ReturnType<typeof import('../../sharedOAuthRecovery.js').getSharedOAuthRecovery>['direct']>)=>(import.meta.require('../../sharedOAuthRecovery.js') as typeof import('../../sharedOAuthRecovery.js')).getSharedOAuthRecovery().direct(...args),
  publicGracefulShutdown287:(...args:Parameters<typeof import('../../gracefulShutdown.js').gracefulShutdown>)=>(import.meta.require('../../gracefulShutdown.js') as typeof import('../../gracefulShutdown.js')).gracefulShutdown(...args),
  terminalOutput:()=>getExecutionSession287().host.launchOptions.printOutputFormat(),
  remoteAttachLaunchRepl287:(...args:Parameters<typeof import('../../../replLauncher.js').launchRemoteAttachRepl287>)=>(import.meta.require('../../../replLauncher.js') as typeof import('../../../replLauncher.js')).launchRemoteAttachRepl287(...args),
  remoteAttachDefaultAppState287:()=>(import.meta.require('../../../state/AppState.js') as typeof import('../../../state/AppState.js')).getDefaultAppState(),
  surfaceBridgeRuntimeReader287:()=>(import.meta.require('../../../services/context/surface287.js') as typeof import('../../../services/context/surface287.js')).getSurfaceBridgeRuntime287(),
  get surfaceBridgeRuntimeOwner287(){return (import.meta.require('../../../services/context/surface287.js') as typeof import('../../../services/context/surface287.js')).surfaceIdentity287.bridgeRuntimeOwner287},
  storedImagePathsReactReader287:<T>(selector:Parameters<typeof import('../../../hooks/useStoredImagePaths287.js').useStoredImagePaths287<T>>[0]):T=>(import.meta.require('../../../hooks/useStoredImagePaths287.js') as typeof import('../../../hooks/useStoredImagePaths287.js')).useStoredImagePaths287(selector),
  appStateOptionalSelectReactReader287:(...args:Parameters<typeof import('../../../state/AppState.js').useAppStateMaybeOutsideOfProvider>)=>(import.meta.require('../../../state/AppState.js') as typeof import('../../../state/AppState.js')).useAppStateMaybeOutsideOfProvider(...args),
  nativeInstallerDirectories287:()=>(import.meta.require('../../nativeInstaller/installer.js') as typeof import('../../nativeInstaller/installer.js')).nativeCleanupPorts287.directories(),
  nativeInstallerPlatform287:()=>(import.meta.require('../../nativeInstaller/installer.js') as typeof import('../../nativeInstaller/installer.js')).nativeCleanupPorts287.platform(),
  settingsStore:getSettingsCacheStore287,
  pluginPolicy:policy.policy,engineState:policy.engineState,
  invalidateHookedPromptContext:invalidateHookedPromptContext287,
  invalidatePromptContext:getOriginalPromptContextOwner287().Mxn,
  resolvePromptContext:getOriginalPromptContextOwner287().Ixn,
  invalidatePromptSections:()=> (import.meta.require('../../../constants/systemPromptSections.js') as typeof import('../../../constants/systemPromptSections.js')).invalidatePromptSections287(),
  systemPrompt287:(tools:Parameters<typeof import('../../../constants/prompts.js').getSystemPrompt>[0],model:string,options?:Parameters<typeof import('../../../constants/prompts.js').getSystemPrompt>[4])=>(import.meta.require('../../../constants/prompts.js') as typeof import('../../../constants/prompts.js')).getSystemPrompt(tools,model,undefined,undefined,options),
  commandList287:(cwd:string|null,options?:unknown)=>(import.meta.require('../../commandDiscovery287.js') as typeof import('../../commandDiscovery287.js')).getCommandDiscovery287().commands(cwd,options),
  publicCommandNamesModule287:()=>import.meta.require('../../../commands.js') as typeof import('../../../commands.js'),
  skillToolCommands287:(cwd:string,options?:unknown)=>(import.meta.require('../../commandDiscovery287.js') as typeof import('../../commandDiscovery287.js')).getCommandDiscovery287().skillTool(cwd,options),
  builtinCommandList287:(...args:Parameters<typeof import('../../commandCapability287.js').commandCapability287.builtins>)=>(import.meta.require('../../commandCapability287.js') as typeof import('../../commandCapability287.js')).commandCapability287.builtins(...args),
  toolDescription287:(...args:Parameters<ReturnType<typeof import('../../toolSchema287.js').getToolSchemaRuntime287>['toolSchema']>)=>(import.meta.require('../../toolSchema287.js') as typeof import('../../toolSchema287.js')).getToolSchemaRuntime287().toolSchema(...args),
  toolSearchEnabled287:(...args:Parameters<ReturnType<typeof import('../../toolSchema287.js').getToolSchemaRuntime287>['searchEnabled']>)=>(import.meta.require('../../toolSchema287.js') as typeof import('../../toolSchema287.js')).getToolSchemaRuntime287().searchEnabled(...args),
  runtimeMemo287:()=>(import.meta.require('../../../services/context/runtimeMemo287.js') as typeof import('../../../services/context/runtimeMemo287.js')).getRuntimeMemo287(),
  get bashTool287(){return (import.meta.require('../../../tools/BashTool/BashTool.js') as typeof import('../../../tools/BashTool/BashTool.js')).BashTool},
  get powerShellTool287(){return (import.meta.require('../../../tools/PowerShellTool/PowerShellTool.js') as typeof import('../../../tools/PowerShellTool/PowerShellTool.js')).PowerShellTool},
  get shellErrorConstructor287(){shellErrorConstructor287.prototype=(import.meta.require('../../errors.js') as typeof import('../../errors.js')).ShellError.prototype;return shellErrorConstructor287},
  sdkEventQueueListener287:(...args:Parameters<typeof import('../../sdkEventQueue.js').setSdkEventEnqueueListener287>)=>(import.meta.require('../../sdkEventQueue.js') as typeof import('../../sdkEventQueue.js')).setSdkEventEnqueueListener287(...args),
  sdkEventQueueEnqueue287:(...args:Parameters<typeof import('../../sdkEventQueue.js').enqueueSdkEvent>)=>(import.meta.require('../../sdkEventQueue.js') as typeof import('../../sdkEventQueue.js')).enqueueSdkEvent(...args),
  sdkEventQueueHas287:(...args:Parameters<typeof import('../../sdkEventQueue.js').hasQueuedSdkEvent287>)=>(import.meta.require('../../sdkEventQueue.js') as typeof import('../../sdkEventQueue.js')).hasQueuedSdkEvent287(...args),
  sdkEventQueueDrain287:()=>(import.meta.require('../../sdkEventQueue.js') as typeof import('../../sdkEventQueue.js')).drainSdkEvents(),
  get consoleOAuthFlowComponent287(){return (import.meta.require('../../../components/ConsoleOAuthFlow.js') as typeof import('../../../components/ConsoleOAuthFlow.js')).ConsoleOAuthFlow},
  get headlessStructuredIOConstructor287(){return (import.meta.require('../../../cli/structuredIO.js') as typeof import('../../../cli/structuredIO.js')).StructuredIO},
  get toolCatalog287(){return import.meta.require('../../../tools.js') as Pick<typeof import('../../../tools.js'),'getAllBaseTools'|'getTools'|'assembleToolPool'>},
  forkedAgent287:(...args:Parameters<typeof import('../../forkedAgent.js').runForkedAgent>)=>(import.meta.require('../../forkedAgent.js') as typeof import('../../forkedAgent.js')).runForkedAgent(...args),
  query287:(...args:Parameters<typeof import('../../../query.js').query>)=>(import.meta.require('../../../query.js') as typeof import('../../../query.js')).query(...args),
  get recapCommand287(){return (import.meta.require('../../../commands/recap/index.js') as typeof import('../../../commands/recap/index.js')).default},
  workflowCommands287:(...args:Parameters<typeof import('../../../tools/WorkflowTool/createWorkflowCommand.js').getWorkflowCommands>)=>(import.meta.require('../../../tools/WorkflowTool/createWorkflowCommand.js') as typeof import('../../../tools/WorkflowTool/createWorkflowCommand.js')).getWorkflowCommands(...args),
  sdkClient287:(...args:Parameters<typeof import('../../../services/api/client.js').getAnthropicClient>)=>(import.meta.require('../../../services/api/client.js') as typeof import('../../../services/api/client.js')).getAnthropicClient(...args),
  inkRender287:(node:Parameters<typeof import('../../../ink.js').render>[0],options?:Parameters<typeof import('../../../ink.js').render>[1],context?:{storageV5?:unknown})=>{if(context?.storageV5!==undefined)throw Error('Original yB StorageV5 host render port is not installed');return (import.meta.require('../../../ink.js') as typeof import('../../../ink.js')).render(node,options)},
  get subagentStatsRegistry287(){return (import.meta.require('../../../tools/AgentTool/subagentStats287.js') as typeof import('../../../tools/AgentTool/subagentStats287.js')).subagentStats287.registry},
  // This cell is read while config installs root cleanup. Its actual Tips
  // owner imports MCP, whose registry refers back to this canonical graph.
  // Delegate only V.of at use, after assembly, without a second host cell.
  devIntentOwner287:{of:(host:object)=>{
   const owner=(import.meta.require('../../../services/tips/tipsProduction287.js') as typeof import('../../../services/tips/tipsProduction287.js')).getNativeTipModule287('chunk-yc409gx5.js').Oae as {of(host:object):unknown}
   return owner.of(host)
  }},
  get inkRootAppContext287(){return (import.meta.require('../../../ink/components/AppContext.js') as typeof import('../../../ink/components/AppContext.js')).default},
  inkAppContext287:()=> (import.meta.require('../../../ink.js') as typeof import('../../../ink.js')).useApp(),
  mcpTurnClientsReader287:(...args:Parameters<typeof import('../../../services/mcp/resourceToolProjection.js').getMcpToolTurnClients287>)=>(import.meta.require('../../../services/mcp/resourceToolProjection.js') as typeof import('../../../services/mcp/resourceToolProjection.js')).getMcpToolTurnClients287(...args),
  get inkReconcilerOwner287(){return (import.meta.require('../../../ink/reconciler.js') as typeof import('../../../ink/reconciler.js')).default},
  get claimContextRegistry287(){return (import.meta.require('../../../services/context/claimContextRegistry287.js') as typeof import('../../../services/context/claimContextRegistry287.js')).claimContextRegistry287},
  buildUserContext287:(...args:Parameters<typeof import('../../../context.js').buildUserContext287>)=>(import.meta.require('../../../context.js') as typeof import('../../../context.js')).buildUserContext287(...args),
  get inkThemeContext287(){return (import.meta.require('../../../components/design-system/themeContext287.js') as typeof import('../../../components/design-system/themeContext287.js')).ThemeContext},
  get inkTerminalWriteContext287(){return (import.meta.require('../../../ink/useTerminalNotification.js') as typeof import('../../../ink/useTerminalNotification.js')).TerminalWriteContext},
  get inkTerminalSizeContext287(){return (import.meta.require('../../../ink/components/TerminalSizeContext.js') as typeof import('../../../ink/components/TerminalSizeContext.js')).TerminalSizeContext},
  get inkStdinContext287(){return (import.meta.require('../../../ink/components/StdinContext.js') as typeof import('../../../ink/components/StdinContext.js')).default},
  get inkTerminalFocusContext287(){return (import.meta.require('../../../ink/components/TerminalFocusContext.js') as typeof import('../../../ink/components/TerminalFocusContext.js')).default},
  get inkClockContext287(){return (import.meta.require('../../../ink/components/ClockContext.js') as typeof import('../../../ink/components/ClockContext.js')).ClockContext},
  get inkRecentInputContext287(){return (import.meta.require('../../../ink/components/RecentInputClockContext.js') as typeof import('../../../ink/components/RecentInputClockContext.js')).RecentInputClockContext},
  get inkScreenReaderContext287(){return (import.meta.require('../../../ink/components/ScreenReaderContext.js') as typeof import('../../../ink/components/ScreenReaderContext.js')).ScreenReaderContext},
  // Read the same themed component exports directly: the public Ink barrel
  // can still be initializing when config registers its root cleanup hook.
  get inkBox287(){return (import.meta.require('../../../components/design-system/ThemedBox.js') as typeof import('../../../components/design-system/ThemedBox.js')).default},
  get inkText287(){return (import.meta.require('../../../components/design-system/ThemedText.js') as typeof import('../../../components/design-system/ThemedText.js')).default},
  reactCompiler287:(...args:Parameters<typeof import('react/compiler-runtime').c>)=>(import.meta.require('react/compiler-runtime') as typeof import('react/compiler-runtime')).c(...args),
  promptComposer:()=>getOriginalPromptContextOwner287().Mtt(),
  promptComposeCore:(...args:Parameters<ReturnType<typeof getOriginalPromptContextOwner287>['Uwe']>)=>getOriginalPromptContextOwner287().Uwe(...args),
  attachment:(...args:unknown[])=>{const fn=hooks().createHookExecutionHostPorts287().ln;if(typeof fn!=='function')throw Error('Hook attachment port is not callable');return fn(...args)},
  executeHooks:(options:Parameters<ReturnType<typeof getOriginalHookEngine287>['PA']>[0])=>getOriginalHookEngine287(()=>hooks().createHookExecutionHostPorts287()).PA(options),
 }
}
const hooks=()=>import.meta.require('../../hooks.js') as typeof import('../../hooks.js')
function sourceEnginePorts(){const native=import.meta.require('./engineRuntime.js') as typeof import('./engineRuntime.js');return native.createOriginalHookEnginePorts287(hooks().createHookExecutionHostPorts287()) as Record<'p'|'m',(...args:unknown[])=>unknown>}
/** Complete original fIt/destructuring installation, same canonical Mods owner. */
export function getOriginalModsLifecycle287(){return lifecycle??=createHooksLifecycle287(createModsLifecycleProductionPorts287())}

/** A borrowed receiver for the complete original U4e/HOr control channel.
 * Interactive hosts supply their existing callbacks; absent callbacks follow
 * the original optional-dispatch conditions. No transcript/metric state lives here. */
export type OriginalToolQueryControlReceiver287=Pick<import('../../../Tool.js').ToolUseContext,'setResponseLength'|'addNotification'>&{
 onApiMetrics?:(event:import('../../officialRlt287.js').OfficialRltApiMetricEvent287)=>void
}
export function dispatchOriginalToolQueryControl287(event:import('../../../Tool.js').ToolQueryControlEvent287,context:OriginalToolQueryControlReceiver287):void {
 getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').U4e(event,{
  onResponseLength:context.setResponseLength===undefined?undefined:event=>context.setResponseLength(length=>event.op==='reset'?0:length+event.delta),
  onNotification:context.addNotification,
  onApiMetrics:context.onApiMetrics,
 })
}
