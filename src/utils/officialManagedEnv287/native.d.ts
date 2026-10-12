import type {authEnvironment} from '../authEnvironment.js'
export interface ProviderStripContext287 {managedByHost:boolean;managedByHostFlag:boolean;desktopHost:boolean;hostOrchestrated:boolean;storedLoginPinned:boolean}
export interface ManagedEnvironment287 {
 providerStripContext:ProviderStripContext287
 projectScopeDropWarned:Set<string>;hostManagedDropWarned:Set<string>;invalidEnvKeyWarned:Set<string>
 otelDominanceDropWarned:Set<string>;materializedProcessWrapper:string|undefined
 reset():void
 hostSpawnEnvDropWarned:Set<string>
 hostSpawnEnvKeys:Set<string>|null|undefined;settingsColorEnv:Record<string,string>
 preSettingsEnvSnapshot:Readonly<Record<string,string|undefined>>|undefined
 userTierNames:Set<string>;launchNamesBeforeClaim:Set<string>|undefined;userTierNamesInSnapshot:Set<string>
 appliedGlobalConfigEnv:Readonly<Record<string,string>>|undefined
 settingsOfferedEnvValues:Map<string,Set<string>>;servedFolderEnvWithheld:boolean
 getPreSettingsEnvSnapshot():Readonly<Record<string,string|undefined>>
 latchPreSettingsEnvSnapshot(env:Record<string,string|undefined>):Readonly<Record<string,string|undefined>>
 peekPreSettingsEnvSnapshot():Readonly<Record<string,string|undefined>>|undefined
 getAppliedGlobalConfigEnv():Readonly<Record<string,string>>|undefined
 dropPreSettingsEnvSnapshot(names?:Iterable<string>):void
 envAboveProjectSettings():Record<string,string|undefined>
 filterSettingsEnv(env:Record<string,string>|undefined,source:string):Record<string,string>
 isSettingsSourcedEnvValue(name:string,value:string):boolean
 filterPolicyPredicateEnv(env:Record<string,string>|undefined,source:string,options:{forPolicyMatch:boolean}):Record<string,string>
 withholdsEnvFrom(source:string):boolean
 asFromAFolderNobodyTrusted(env:Record<string,string>|undefined,source:string,write:boolean):Record<string,string>|undefined
 servedFolderEnvWasWithheld():boolean
 applySafeConfigEnvironmentVariables():void
 applyConfigEnvironmentVariables():void
 processWrapperKeyFrom(source:string):string|undefined
 enforceManagedOtelFamilyDominance():void
}
export function createManagedEnv287(ports:{
 allowedSources():readonly string[]
 settingsStore():import('../settings/officialSettingsStore287/native.js').SettingsStore287
 environment:typeof authEnvironment
 settingsSource(source:string):{env?:Record<string,string>}|null
 policyOrigin():string|null
 mdm():import('../settings/officialPolicyParser287/native.js').MdmPolicyRead287&{userWritable?:boolean}
 helperArmed():boolean|undefined
 remoteSettings():Record<string,unknown>|null
 remoteVerified():boolean
 debug:typeof import('../debug.js').logForDebugging
 globalConfig():{env?:Record<string,string>}
 logError(error:unknown):void
 resetSettingsCache():void
 sourceEnabled(source:string):boolean
 settingsPath(source:string):string|undefined
 publishColors(colors:Record<string,string>):void
 remoteEligible():boolean
 clearCACerts():void;clearMTLS():void
 loadExtraCACerts():Promise<boolean>
 loadMTLS():Promise<{changed:boolean;readFailed:boolean;mismatched?:boolean}>
 loadedMTLSPaths():{certPath?:string;keyPath?:string}
 clearProxy():void;configureAgents():void
}):{Owner:new()=>ManagedEnvironment287;providerContext():ProviderStripContext287;enabledSources():import('../settings/constants.js').SettingSource[];safeBeforeTrust(key:string,value:string):boolean}
export function createLoadedMTLSPaths287(ports:{k:typeof import('../sharedTlsMaterial287.js').sharedTlsMaterial287.mtlsState}):()=>{certPath?:string;keyPath?:string}
