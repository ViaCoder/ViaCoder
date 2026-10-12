import {realpathSync,appendFileSync} from 'node:fs'
import {homedir,getPriority,setPriority} from 'node:os'
import type {StorageV5EnvPin} from '../../utils/secureStorage/storageV5.js'

// Lazy, named ABI adapters. No registry, credential cache, settings store or
// background engine is allocated here. Canonical construction can import this
// leaf before config becomes readable; owners are resolved only at invocation.
function context(){return import.meta.require('../../services/context/execution287.js') as typeof import('../../services/context/execution287.js')}
function initContext(){return import.meta.require('../../entrypoints/officialInitContext287/index.js') as typeof import('../../entrypoints/officialInitContext287/index.js')}
function chromeCuts(){return (import.meta.require('../../utils/claudeInChrome/clientCutsRuntime287.js') as typeof import('../../utils/claudeInChrome/clientCutsRuntime287.js')).getChromeClientCuts287()}
function config(){return import.meta.require('../../utils/config.js') as typeof import('../../utils/config.js')}
function analytics(){return import.meta.require('../../services/analytics/index.js') as typeof import('../../services/analytics/index.js')}
export function getRootBackgroundHostPorts287(){return {
 rootBackgroundSpareApply287:(...args:unknown[])=>{const runtime=(import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js')).getOriginalModsLifecycle287();return (runtime.clearSourceModule287('chunk-y191025q.js') as {PKt:(...args:unknown[])=>unknown}).PKt(...args)},
 rootBackgroundAppendFileSync287:appendFileSync,rootBackgroundGetPriority287:getPriority,rootBackgroundSetPriority287:setPriority,
 rootBackgroundConfigEnable287:(storage?:unknown)=>config().enableConfigs(storage),
 rootBackgroundConfigHandoff287:(storage?:unknown)=>config().handoffGlobalConfigStorage(storage),
 rootBackgroundPinStorage287:(pin?:StorageV5EnvPin)=>initContext().officialInitStorageContext287.adopt(pin),
 rootBackgroundMdmReady287:()=> (import.meta.require('../../utils/settings/mdm/settings.js') as typeof import('../../utils/settings/mdm/settings.js')).ensureMdmSettingsLoaded(),
 rootBackgroundKeychainReady287:()=> (import.meta.require('../../utils/secureStorage/keychainPrefetch.js') as typeof import('../../utils/secureStorage/keychainPrefetch.js')).ensureKeychainPrefetchCompleted(),
 rootBackgroundDebugInit287:(options:{storageV5?:unknown;syncExitDrain?:boolean})=>chromeCuts().initializeDebug(options),
 rootBackgroundIdentitySeed287:(storage?:unknown)=>chromeCuts().initializeIds(storage),
 // Frozen C telemetry cancellation, through the same existing canceled leaf.
 rootBackgroundTelemetryInit287:()=>analytics().logEvent('background_telemetry_cancelled',{}),
 rootBackgroundTelemetryShutdown287:()=>analytics().logEventAsync('background_telemetry_cancelled',{}),
 rootBackgroundLogEventAsync287:(name:string)=>analytics().logEventAsync(name,{}),
}}
export function bindRootBackgroundWorkspace287():void {
 const execution=context(),state=import.meta.require('../../bootstrap/state.js') as typeof import('../../bootstrap/state.js')
 const cwd=realpathSync.native(process.cwd()),bound=execution.getExecutionWorkspaceConfinement287()
 if(bound){bound.preflightCwd(cwd);return}
 const {getClaudeConfigHomeDir}=import.meta.require('../../utils/envUtils.js') as typeof import('../../utils/envUtils.js')
 execution.initializeExecutionWorkspaceConfinement287({workspaceRoot:state.getProjectRoot(),userHome:homedir(),credentialRoots:[getClaudeConfigHomeDir()],entry:'cli',windowsTokenCapability:process.platform==='win32'?(import.meta.require('../../utils/confinement287/windowsTokenCapability287.js') as typeof import('../../utils/confinement287/windowsTokenCapability287.js')).createWindowsTokenCapability287():undefined})
}
export function rootBackgroundSpawnCwd287():string {
 const policy=context().requireExecutionWorkspaceConfinement287();policy.assertRootIdentity();return policy.root.canonicalPath
}
export async function assertRootBackgroundSpawn287(cwd:string):Promise<void>{
 const {assertExecutionProcess287}=await import('../../utils/confinement287/startupPrivilege287.js')
 assertExecutionProcess287('worker')
 const policy=context().requireExecutionWorkspaceConfinement287();policy.assertRootIdentity();policy.preflightCwd(realpathSync.native(cwd))
}
export async function prepareRootBackgroundExec287(argv:string[],exec:boolean):Promise<string[]>{
 await assertRootBackgroundSpawn287(process.cwd())
 // Ordinary source CLI children perform the same entry gate and tool sandbox.
 // The original exec mode bypasses that CLI, so wrap its real command here.
 const {isInBundledMode}=await import('../../utils/bundledMode.js')
 const sourcePrefix=[...process.execArgv,process.argv[1]]
 const ownCli=argv[0]===process.execPath&&(isInBundledMode()||sourcePrefix.every((arg,i)=>arg!==undefined&&argv[i+1]===arg))
 if(!exec&&ownCli)return argv
 const {quote}=await import('shell-quote'),{SandboxManager}=await import('../../utils/sandbox/sandbox-adapter.js')
 await SandboxManager.initialize();await assertRootBackgroundSpawn287(process.cwd())
 const command=await SandboxManager.wrapWithSandbox(quote(argv),'/bin/sh')
 await assertRootBackgroundSpawn287(process.cwd())
 return ['/bin/sh','-c',command]
}
export function readRootBackgroundModule287(specifier:string):Readonly<Record<string,unknown>>|undefined {
 const file=specifier.replace('/$bunfs/root/','')
 switch(file){
  case 'chunk-q1842b1c.js':return {main:(import.meta.require('../../main.js') as typeof import('../../main.js')).main}
  case 'chunk-3hsx8w8s.js':return {loadSettingsFromFlag:(value:string)=>(import.meta.require('../../main.js') as typeof import('../../main.js')).loadRootBackgroundSettings287(value),loadManagedSettingsFromFlag:(value:string)=>(import.meta.require('../printOwnership287/parentPolicy287.js') as typeof import('../printOwnership287/parentPolicy287.js')).loadParentManagedSettings287(value)}
  case 'chunk-dy2m4vah.js':return {configureGlobalAgents:(import.meta.require('../../utils/proxy.js') as typeof import('../../utils/proxy.js')).configureGlobalAgents}
  case 'chunk-vg1zhjr3.js':return {pinStorageV5:initContext().officialInitStorageContext287.adopt}
  case 'chunk-nsq22pc0.js':return {initDefaultDebugLog:(options:{storageV5?:unknown;syncExitDrain?:boolean})=>chromeCuts().initializeDebug(options)}
  case 'chunk-5d0c5s4c.js':return {seedInstallIDs:(storage?:unknown)=>chromeCuts().initializeIds(storage),watchGlobalConfigThroughStorage:(storage?:unknown)=>config().handoffGlobalConfigStorage(storage),checkHasTrustDialogAccepted:config().checkHasTrustDialogAccepted}
  case 'chunk-aatcqh6b.js':return {createRoot:(import.meta.require('../../ink.js') as typeof import('../../ink.js')).createRoot}
  case 'chunk-31xz0e80.js':return {getBaseRenderOptions:(import.meta.require('../../utils/renderOptions.js') as typeof import('../../utils/renderOptions.js')).getBaseRenderOptions}
  case 'chunk-2yv45jed.js':return {initializeAnalyticsSink:(import.meta.require('../../utils/sinks.js') as typeof import('../../utils/sinks.js')).initSinks}
  case 'chunk-q3h89ake.js':return {initialize1PEventLogging:getRootBackgroundHostPorts287().rootBackgroundTelemetryInit287,shutdown1PEventLogging:getRootBackgroundHostPorts287().rootBackgroundTelemetryShutdown287}
  case 'chunk-wht9dj9x.js':return {shutdownDatadog:getRootBackgroundHostPorts287().rootBackgroundTelemetryShutdown287}
  case 'chunk-4j8pxnz6.js':return {logEvent:analytics().logEvent}
  case 'chunk-nc6ah7j4.js':return {sleep:(import.meta.require('node:timers/promises') as typeof import('node:timers/promises')).setTimeout}
  case 'chunk-xp1v6nj2.js':return {initializeErrorLogSink:(import.meta.require('../../utils/errorLogSink.js') as typeof import('../../utils/errorLogSink.js')).initializeErrorLogSink}
  case 'chunk-4fdra957.js':return {exitWithError:(message:string)=>{process.stderr.write(message+'\n');process.exit(1)}}
  default:return undefined
 }
}
