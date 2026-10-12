import type {McpServerStatus} from '../../../entrypoints/sdk/coreTypes.recovered.js'
import type {z} from 'zod/v4'
import type {ConnectedMcpServer,CachedMCPServer,ScopedMcpServerConfig} from '../types.js'
import type {Tool} from '../../../Tool.js'
export interface EnsureMcpOptions287 {signal?:AbortSignal;timeoutMs?:number;context?:string}
export type EnsureMcpClient287=(connection:ConnectedMcpServer|CachedMCPServer,options?:EnsureMcpOptions287)=>Promise<ConnectedMcpServer>
/** Constructor values of the actual original qo/Rt and Ft/st transports, after producer
 * prefix/cgroup/env/cwd selection. The port never receives authored config. */
export interface McpStdioServerParams287 {command:string;args?:string[];cwd?:string;env?:Record<string,string>;stderr?:'pipe'|'overlapped'|'inherit'|'ignore'|number|import('node:stream').Stream;maxBufferSize?:number}
export type PrepareMcpStdioSpawn287=(params:McpStdioServerParams287,signal?:AbortSignal)=>Promise<{params:McpStdioServerParams287;dispose():void}>|undefined
export interface OriginalMcpLegacyStdioTransport287 {
 start():Promise<void>;close():Promise<void>;
 readonly pid:number|null;readonly _serverParams:McpStdioServerParams287;
 readonly _process?:import('node:child_process').ChildProcess;
 onclose?:()=>void;onerror?:(error:Error)=>void;
}
export interface OriginalMcpStdioTransport287 extends OriginalMcpLegacyStdioTransport287 {_dispose():Promise<void>}
export type NativeModernConnection287=Omit<import('../types.js').ConnectedMCPServerV2,'generation'|'v2Client'|'isClosed'>&{client:import('../../../vendor/official-mcp-v2/index.mjs').McpV2Client};
export type NativeReconnectResult287={client:NativeModernConnection287|import('../types.js').NeedsAuthMCPServer|import('../types.js').FailedMCPServer;tools:Tool[];commands:import('../../../commands.js').Command[];resources?:import('../types.js').ServerResource[];resourceTemplates?:import('../types.js').ServerResourceTemplate[]};
/** C signal only closes the creator's bound stdio transport while the new
 * pre-spawn port is pending. Original cache/coalescing and wait errors remain. */
export type NativeDial287<T>=((name:string,config:ScopedMcpServerConfig,stats?:Record<string,number>,storage?:unknown,credentials?:unknown,options?:unknown,preSpawnSignal287?:AbortSignal)=>Promise<T|import('../types.js').NeedsAuthMCPServer|import('../types.js').FailedMCPServer>)&{cache:Pick<Map<string,Promise<T|import('../types.js').NeedsAuthMCPServer|import('../types.js').FailedMCPServer>>,'get'|'has'|'delete'|'clear'>};
export interface McpConnected287 {
 sourceModule(file:'chunk-amg94xhm.js'):Record<string,unknown>&{tf():void;ho(name:string,config:ScopedMcpServerConfig,storageV5?:unknown,credentials?:unknown):Promise<NativeReconnectResult287>;Rt:new(params:McpStdioServerParams287)=>OriginalMcpStdioTransport287};
 readResourceRawModern(client:import('../../../vendor/official-mcp-v2/index.mjs').McpV2Client,uri:string,options?:import('../../../vendor/official-mcp-v2/index.mjs').McpV2RequestOptions):ReturnType<import('../../../vendor/official-mcp-v2/index.mjs').McpV2Client['readResource']>;
 readResourceRawLegacy(client:import('@modelcontextprotocol/sdk/client/index.js').Client,uri:string,options?:Parameters<import('@modelcontextprotocol/sdk/client/index.js').Client['readResource']>[1]):ReturnType<import('@modelcontextprotocol/sdk/client/index.js').Client['readResource']>;
 cleanupConnectedMcpClients(clients:readonly (import('../types.js').MCPServerConnection|import('../types.js').ConnectedMCPServerV2)[]):Promise<void>;
 cleanupConnectedMcpClientsLegacy:McpConnected287['cleanupConnectedMcpClients'];
 /** Same selected mN namespace; no reinitialization or second owner. */
 sourceModule(file:'chunk-27kqvvhz.js'):Record<string,unknown>&{EAe:z.ZodType<import('../officialDirectory287/native.js').DirectoryPage287>};
 sourceModule(file:'chunk-nzxrj88k.js'):Record<string,unknown>&Pick<import('../officialDirectory287/native.js').ModernDirectoryPorts287,'Fs'|'_l'>;
 sourceModule(file:'chunk-764ypttr.js'):Record<string,unknown>&Pick<import('../officialDirectory287/native.js').LegacyDirectoryPorts287,'$s'|'ZLe'|'Ps'>;
 sourceModule(file:'chunk-gr2z631p.js'):Record<string,unknown>&Pick<import('../officialDirectory287/native.js').DirectorySharedPorts287,'Y1t'>;
 sourceModule(file:'chunk-sbndfme5.js'):Record<string,unknown>&Pick<import('../officialDirectory287/native.js').DirectorySharedPorts287,'Ja'>;
 sourceModule(file:'chunk-amhtwhch.js'):Record<string,unknown>&Pick<import('../officialDirectory287/native.js').DirectorySharedPorts287,'te'>;
 sourceModule(file:'chunk-3c9s3x4q.js'):Record<string,unknown>&Pick<import('../officialDirectory287/native.js').DirectorySharedPorts287,'Os'>;
 sourceModule(file:'chunk-fdjgzr8v.js'):Record<string,unknown>&{wd():void;st:new(params:McpStdioServerParams287,preSpawnSignal287?:AbortSignal)=>OriginalMcpLegacyStdioTransport287};
 sourceModule(file:string):Record<string,unknown>;
 chromeScopeKey():string
 isCcrGatewayUrl(url:string):boolean;isCliOwnedMcpConfig(config:unknown):boolean;
 attributionToolAllowlist(name:string):ReadonlySet<string>|undefined;
 /** Original Yse registers into the already restored module P Set. */
 registerCacheClear<T extends {clear():unknown}>(entry:T):T;
 attributionState():{firstPartyPlugins:Map<string,unknown>;loggableMcpServers:Set<string>;anthropicMetricAttribution:Map<string,unknown>;emittedUnredacted:boolean};
 waitForDial<T>(promise:Promise<T>,options:EnsureMcpOptions287&{serverName:string;context:string}):Promise<T>;
 projectionSequenceModern(connection:unknown):{seq:number;state:{applied:number}};projectionSequenceLegacy:McpConnected287['projectionSequenceModern'];
 dynamicModules:Record<string,Record<string,unknown>>&ChromeDynamicNamespaces287;
 trackChromeTab(id:number):void;isTrackedChromeTab(id:number):boolean;
 chromeState():ChromeState287;
 updateBrowserHints(hints:{preferredDeviceId?:string;localDeviceIds:string[];hostPlatform?:string}):void;
 chromePolicyPrepare(options?:{credentials?:unknown;storageV5?:unknown}):Promise<ChromePolicy287>;
 chromePolicyPreflight():ChromePolicy287|null;
 chromePolicyResolve(token:string,options?:{timeoutMs?:number}):Promise<ChromePolicy287>;
 chromeBearerGate(verified:{bearer:string}|null): (token:string)=>Promise<boolean>;
 dialModern:NativeDial287<NativeModernConnection287>;dialLegacy:NativeDial287<import('../types.js').ConnectedMCPServer>;
 projectToolsModern(connection:unknown,tools:Record<string,unknown>[],started:number,origin:'live'|'cache',sequence:{seq:number;state:{applied:number}}):Tool[];projectToolsLegacy:McpConnected287['projectToolsModern'];
 toolPermissions(context:unknown):import('../../../Tool.js').ToolPermissionContext;toolModel(context:unknown):string;toolEffort(context:unknown):unknown;toolThinkingConfig(context:unknown):unknown;
 remoteToolCall(...args:unknown[]):Promise<unknown>;recordQueuedGoalOrigin(...args:unknown[]):void;

 listToolsModern:((connection:ConnectedMcpServer|import('../types.js').MCPServerConnection,storage?:unknown)=>Promise<Tool[]>)&{cache:McpListCacheView287<Tool[]>};listToolsLegacy:McpConnected287['listToolsModern'];
 listCommandsModern:((connection:ConnectedMcpServer|import('../types.js').MCPServerConnection)=>Promise<import('../../../commands.js').Command[]>)&{cache:McpListCacheView287<import('../../../commands.js').Command[]>};listCommandsLegacy:McpConnected287['listCommandsModern'];
 listResourcesModern:((connection:ConnectedMcpServer|import('../types.js').MCPServerConnection)=>Promise<import('../types.js').ServerResource[]>)&{cache:McpListCacheView287<import('../types.js').ServerResource[]>};listResourcesLegacy:McpConnected287['listResourcesModern'];
 discoveryFreshTtlMs():number;discoveryMaxStaleMs():number;
 /** Complete original FB/Wt; sole original session remote registry. */
 resourceDirectoryTool:Tool&{create(context:{session?:unknown;turnMcpClients:readonly unknown[];agentId?:string}):{call(input:{server:string;uri:string},options:{signal:AbortSignal}):Promise<{data:{resources:unknown[];error?:string}}>}};
 remoteToolRegistry:{peek(session:unknown):Map<string,unknown>|undefined;of(session:unknown):Map<string,unknown>;drop(session:unknown):void};
 serializeStatus(input:{connections:readonly unknown[];tools:readonly Tool[]}):McpServerStatus[];
 statusSchema():z.ZodType<McpServerStatus>;
 cachedConsumer(options:CachedConsumerOptions287):{onCachedAdopt(name:string,config:ScopedMcpServerConfig):void;onCachedDialFailed(failure:unknown,ownStrike:boolean):void;subscribe():()=>void;catchUp():void};
 settleResult(options:CachedConsumerOptions287,name:string,result:CachedSettlement287):'applied'|'refused'|'superseded'|'dropped';
 templatesModern(connection:unknown):Promise<import('../types.js').ServerResourceTemplate[]>;templatesLegacy(connection:unknown):Promise<unknown[]>;
 peekModern(name:string,config:ScopedMcpServerConfig):Promise<import('../types.js').ConnectedMcpServer|import('../types.js').NeedsAuthMCPServer|undefined>;peekLegacy:McpConnected287['peekModern'];
 unsettledModern(name:string,config:ScopedMcpServerConfig):Promise<boolean>;unsettledLegacy:McpConnected287['unsettledModern'];
 listToolsError(result:unknown):unknown;discoveryFetchError(result:unknown):unknown;
 persistRefreshedModern(connection:ConnectedMcpServer,tools:Tool[],options:{identityEpoch:number;grantLeg?:string}):Promise<void>;persistRefreshedLegacy:McpConnected287['persistRefreshedModern'];
 persistModern(connection:unknown,input:Record<string,unknown>):Promise<void>;persistLegacy:McpConnected287['persistModern'];
 dropDiscovery(name:string,config:ScopedMcpServerConfig):Promise<void>;dropLegacy:McpConnected287['dropDiscovery'];
 detachModern(connection:unknown):Promise<void>;detachLegacy:McpConnected287['detachModern'];
 configsEqual(a:ScopedMcpServerConfig,b:ScopedMcpServerConfig):boolean;
 enterpriseMcpPresent():boolean;
 imageLimits(model?:string):{maxWidth:number;maxHeight:number;maxBase64Size:number;targetRawSize:number};
 discoverModern(callback:(result:CachedSettlement287)=>void,configs?:Record<string,ScopedMcpServerConfig>,storage?:unknown,credentials?:unknown,cachedTools?:Record<string,Record<string,unknown>[]>):Promise<void>;
 discoverLegacy:McpConnected287['discoverModern'];
 hydrateCommandsModern(connection:unknown,raw:unknown[]):import('../../../commands.js').Command[];hydrateCommandsLegacy:McpConnected287['hydrateCommandsModern'];
 registerModern():void;registerLegacy():void;initializeModern():void;initializeLegacy():void;
 ensureModern:EnsureMcpClient287;ensureLegacy:EnsureMcpClient287;
 blocked(name:string,config:ScopedMcpServerConfig):boolean;
 disabled(name:string):boolean;discoveryEnabled():boolean;identityEpoch():number;
 recordTools(result:unknown[],raw:unknown[]):void;recordCommands(result:unknown[],raw:unknown[]):void;recordResources(result:unknown[],raw:unknown[]):void;
 readDiscovery(name:string,config:ScopedMcpServerConfig,now?:number):Promise<DiscoveryOutcome287>;discoveryGrant(name:string,config:ScopedMcpServerConfig):Promise<string|undefined>;
 writeDiscovery(name:string,config:ScopedMcpServerConfig,entry:Record<string,unknown>,options:{identityEpoch:number;grantLeg?:string;now?:number}):Promise<string>;
 classifyDiscoveryModern(outcome:DiscoveryOutcome287):DiscoveryOutcome287;
 schemasModern():Record<string,unknown>;schemasLegacy():Record<string,unknown>;
 listCacheClass:new(options:{max:number})=>Pick<Map<string,unknown>,'get'|'set'|'has'|'delete'|'clear'|'keys'>&{peek(key:string):unknown;size:number;max:number};
 cache():McpConnectionCache287;
 cacheKey(name:string,config:ScopedMcpServerConfig):string;
 memoizeDial<T extends (...args:any[])=>any>(dial:T,key:(...args:Parameters<T>)=>string,cache:()=>Map<string,unknown>):T&{cache:Pick<Map<string,ReturnType<T>>,'get'|'set'|'has'|'delete'|'clear'>};
 memoizeList<T extends (...args:any[])=>any>(fetch:T,key:(...args:Parameters<T>)=>string,cache:()=>unknown):T&{cache:Pick<Map<string,ReturnType<T>>,'get'|'has'|'delete'|'clear'>&{set(key:string,value:ReturnType<T>):void;size():number}};
 identityScoped(config:ScopedMcpServerConfig):boolean;identityShouldBump(rows:readonly {config:ScopedMcpServerConfig}[]):boolean;
 evictModern(keepKeys?:Set<string>,markChanged?:boolean):void;evictLegacy(keepKeys?:Set<string>,markChanged?:boolean):void;
 isSuperseded(promise:Promise<unknown>):boolean;
 adoptModern(connection:unknown,dial:Promise<unknown>,epoch:number):void;
 adoptLegacy(connection:unknown,dial:Promise<unknown>,epoch:number):void;
 refuseModern(name:string,config:ScopedMcpServerConfig,reason:'policy'|'disabled'):void;
 refuseLegacy(name:string,config:ScopedMcpServerConfig,reason:'policy'|'disabled'):void;
 cachedAdopt: {subscribe(fn:(name:string,config:ScopedMcpServerConfig)=>void):()=>void};
 takeFailureModern(name:string,config:ScopedMcpServerConfig):{failure:unknown;ownStrike:boolean}|undefined;takeFailureLegacy(name:string,config:ScopedMcpServerConfig):{failure:unknown;ownStrike:boolean}|undefined;
 cachedDialFailed: {subscribe(fn:(failure:unknown,ownStrike:boolean)=>void):()=>void};
 produceCachedModern(input:CachedDiscoveryInput287):Promise<{client:CachedMCPServer;tools:Tool[]}>;
 produceCachedLegacy(input:CachedDiscoveryInput287):Promise<{client:CachedMCPServer;tools:Tool[]}>;
 hasLiveModern(name:string,config:ScopedMcpServerConfig):Promise<boolean>;
 hasLiveLegacy(name:string,config:ScopedMcpServerConfig):Promise<boolean>;
 clearModern(key:string):void;clearLegacy(key:string):void;
 clearServerModern(name:string,config:ScopedMcpServerConfig):Promise<void>;clearServerLegacy(name:string,config:ScopedMcpServerConfig):Promise<void>;
 discardModern(name:string,config:ScopedMcpServerConfig,promise?:Promise<unknown>):void;discardLegacy(name:string,config:ScopedMcpServerConfig,promise?:Promise<unknown>):void;
 bindIdentityHandler(handler:()=>void):()=>void;
 bindAccountResolver(resolver:()=>{accountUuid?:string;organizationUuid?:string;credentialInstalled:boolean}|undefined):void;
}
export interface CachedDiscoveryInput287 {name:string;config:ScopedMcpServerConfig;capabilities:Record<string,unknown>;serverInfo?:{name:string;version:string};savedAt:number;tools:Record<string,unknown>[]}
export interface McpConnectionCache287 {
 connections:Map<string,Promise<unknown>>;
 refusedCachedRows:Set<string>;
 settledCachedDialFailures:Map<string,{failure:unknown;ownStrike:boolean}>;
 toolLists:Map<string,unknown>;resourceLists:Map<string,unknown>;resourceTemplateLists:Map<string,unknown>;commandLists:Map<string,unknown>;
}
export function createMcpConnected287(ports:Record<string,unknown>):McpConnected287

export interface StoredDiscoveryEntry287 {v:number;serverName:string;cacheKey:string;savedAt:number;toolsSavedAt?:number;consecutiveRefreshFailures:number;serverInfo?:{name:string;version:string};negotiatedEra?:string;capabilities:Record<string,unknown>;tools:Record<string,unknown>[];commands:Record<string,unknown>[];resources:Record<string,unknown>[];templates?:Record<string,unknown>[]}
export type DiscoveryOutcome287={kind:'miss';reason:string}|{kind:'fresh'|'stale';entry:StoredDiscoveryEntry287;ageMs:number}

export interface CachedSettlement287 {client:NativeModernConnection287|import('../types.js').ConnectedMcpServer|Exclude<import('../types.js').MCPServerConnection,{type:'v2-connected'}>;tools:Tool[];commands:import('../../../commands.js').Command[];resources?:import('../types.js').ServerResource[];resourceTemplates?:import('../types.js').ServerResourceTemplate[];attemptEpoch:number}
export interface CachedConsumerOptions287 {getAppState:()=>import('../../../state/AppState.js').AppState|unknown;setAppState:(update:(state:any)=>any)=>void;getDynamicMcpState:()=>{clients:readonly unknown[];tools:readonly Tool[]};setDynamicMcpState:(state:any)=>void;storageV5?:unknown;credentials?:unknown;isControlReconnectInFlight:(name:string)=>boolean;ownsCachedRow?:(name:string)=>boolean;isRunEnding?:()=>boolean;reuseServedSchemas?:boolean;onRetryRejected?:(name:string,error:unknown)=>void;sleep?:(ms:number)=>Promise<void>}

export interface McpListCacheView287<T=unknown> {get(key:string):Promise<T>|undefined;set(key:string,value:Promise<T>):void;has(key:string):boolean;delete(key:string):boolean;clear():void;size():number}

export interface ChromeContextOptions287 {availabilityFunnel?:boolean;storageV5?:unknown;credentials?:unknown;bearerGate:(token:string)=>Promise<boolean>}
export interface ChromeContext287 extends Record<string,unknown> {
 serverName:string;logger:{silly(...args:unknown[]):void;debug(...args:unknown[]):void;info(...args:unknown[]):void;warn(...args:unknown[]):void;error(...args:unknown[]):void};
 socketPath:string;getSocketPaths():string[]|Promise<string[]>;clientTypeId:string;
 onAuthenticationError():void;onExtensionPaired(deviceId:string,name:string):void;
 getPersistedDeviceId():string|undefined;getLocalDeviceIds():Promise<Map<string,'live'>|undefined>;getHostPlatform():string|undefined;
 bridgeConfig?:{url:string;getUserId():Promise<string|undefined>;getOAuthToken():Promise<string>;getWsOptions():unknown;devUserId?:string};
}
export interface ChromeSocketClient287 {
 ensureConnected():Promise<boolean>;
 callTool(name:string,input:Record<string,unknown>,options?:Record<string,unknown>):Promise<{result?:{content:unknown[]};error?:unknown}>;
 disconnect():void;
 getSelectedDeviceId?():string|undefined;
}
export interface ChromeServer287 {connect(transport:unknown):Promise<void>;close():Promise<void>;onclose?:()=>void;onerror?:(error:Error)=>void}
export type ChromePolicy287={denied:true;cause:string}|{denied:false;unverified:string|null;verified:{bearer:string}|null};
export interface ChromeDynamicNamespaces287 {
 'chunk-19f3z1s7.js':{isClaudeInChromeAllowed():boolean};
 'chunk-7eyrbz6k.js':{createChromeContext(env:Record<string,string>|undefined,options:ChromeContextOptions287):ChromeContext287};
 'chunk-z87hm33f.js':{createChromeSocketClient(context:ChromeContext287):ChromeSocketClient287;createClaudeForChromeMcpServer(context:ChromeContext287,client?:ChromeSocketClient287):ChromeServer287;BROWSER_TOOLS:readonly {name:string;inputSchema:Record<string,unknown>}[];clearBrowserResolution(client:ChromeSocketClient287):void};
 'chunk-y05pa6gs.js':{setChromeBinding(context:ChromeContext287,client:ChromeSocketClient287):void;getClaudeInChromePermissionOverrides(name:string):Pick<Tool,'checkPermissions'|'call'>};
 'chunk-kd5efewf.js':{registerChromeTabGroupCleanup():void;closeSessionTabGroup(sessionId?:string):Promise<void>};
 'chunk-xnfg6na3.js':{passThroughChromeFileUploadInput(name:string,input:Record<string,unknown>,context:import('../../../Tool.js').ToolPermissionContext):Promise<Record<string,unknown>>;prepareChromeFileUploadInput:ChromeDynamicNamespaces287['chunk-xnfg6na3.js']['passThroughChromeFileUploadInput'];verifyHandleBinding(...args:unknown[]):unknown};
}
export interface ChromeState287 {lastExecutedTabUrlByScope:Map<string,string>;bridgeBinding?:{context:ChromeContext287;socketClient:ChromeSocketClient287};browserHints?:{preferredDeviceId?:string;localDeviceIds:string[];hostPlatform?:string};trackedTabIds:Set<number>;reset():void}
