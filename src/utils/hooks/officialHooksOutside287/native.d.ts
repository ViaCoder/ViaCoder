import type {HookInput,HookEvent,AsyncHookJSONOutput} from '../../../entrypoints/agentSdkTypes.js'
import type {AppState} from '../../../state/AppStateStore.js'
import type {ExecutionSession287} from '../../../services/context/officialExecutionOwners287/native.js'
import type {HookSessionRegistry287,HookMatchOptions287} from '../officialHooksConfiguration287/matcher.js'
import type {HookCommand,HttpHook} from '../../settings/types.js'
import type {HookOutsideReplResult} from '../../hooks.js'
import type {ShellCommand} from '../../ShellCommand.js'
/** Local C: mandatory pre-spawn confinement, separate from the original xe resource. */
export interface HookProcessBoundaryInput287 {
 command:string;exec?:readonly [string,readonly string[]];wrappedCommand?:string;
 cwd:string;shell:string;powerShellArgs:readonly string[];signal:AbortSignal;
}
export interface HookProcessBoundary287 extends Disposable {
 command:string;
 /** Retain the native sandbox resources across a config/response async return. */
 attach(result:ShellCommand['result']):void;
}
export type HookProcessBoundaryWrapper287=(input:HookProcessBoundaryInput287)=>Promise<HookProcessBoundary287|undefined>
export interface HookProcessWrapper287 extends Disposable {command:string}
export interface HookCommandResult287 {
 stdout:string;stderr:string;output:string;status:number;aborted?:boolean;backgrounded?:boolean;
 exitedNormally?:boolean;spawnFailed?:boolean;stdioIncomplete?:boolean;stdioClosedWithoutEnd?:boolean;
 runnerStarted?:boolean;runnerExited?:boolean;runnerConflict?:boolean;resultStdout?:string;
}
export type CommandRunner287=(hook:HookCommand&{type:'command'},event:HookEvent|'StatusLine'|'FileSuggestion',name:string,json:string,
 permissionContext:{sessionId:string;source?:string;effortLevel?:string},project:{originalCwd:string;projectRoot:string},cwd:string,
 signal:AbortSignal,hookId:string,index?:number,pluginRoot?:string,pluginId?:string,skillRoot?:string,forceSync?:boolean,
 extraEnv?:Record<string,string>,executionEnv?:unknown,storageV5?:unknown,credentials?:unknown,processWrapper?:(command:string)=>Promise<HookProcessWrapper287|undefined>)=>Promise<HookCommandResult287>
export interface OutsideOptions287 {
 session:ExecutionSession287;sessionHooks?:HookSessionRegistry287<unknown>;getAppState?:()=>AppState;
 hookInput:HookInput;matchQuery?:string;signal?:AbortSignal;timeoutMs?:number;storageV5?:unknown;credentials?:unknown;
 tier?:HookMatchOptions287<unknown>;agentId?:string;classicChainMember?:boolean;
}
export interface ClassicHookOptions287 {
 event:string;hookInput:HookInput;runClassicHooks:(input:HookInput,tier:Record<string,boolean>)=>AsyncGenerator<unknown>;
 managedRanAbove?:boolean;signal?:AbortSignal;origin?:unknown;
}
export interface HookTerminalWriter287 {register(writer:(text:string)=>void):void;unregister(writer:(text:string)=>void):void;reset():void;write(text:string):void}
export type HttpHookResult287={ok:boolean;body:string;statusCode?:number;aborted?:boolean;error?:string}
export interface HooksOutside287 {
 /** Existing factory declarations; no new original registries are constructed. */
 sourceModule(file:string):Record<string,unknown>

 hookPluginMetadata(pluginId:string,managedIds?:Set<string>|null):Record<string,unknown>;
 pluginAliasRegistry():{get(name:string,marketplace?:string):string|undefined};
 dispatch(options:Record<string,unknown>):Promise<unknown>;
 sites:Record<string,unknown>;defaultCore:Record<string,(input:any)=>unknown>;
 runAnswers(event:string,origin:unknown,options?:Record<string,unknown>):unknown[];
 runOutput(event:string,origin:unknown,options?:Record<string,unknown>):unknown[];runRefusal(run:unknown):unknown;
 composeMessages<T>(first:T|undefined,messages:T[],last?:T):T[];
 insertEngineAnswer<T>(messages:T[],answer:T):T[];
 /** Original qt(): same AP host actor, not a second discovery/cache owner. */
 mcpState():unknown;
 http(hook:HttpHook,event:string,json:string,signal?:AbortSignal,timeoutMs?:number,executionEnv?:NodeJS.ProcessEnv):Promise<HttpHookResult287>;
 pluginUsed(pluginId:string):void;officialPlugin(pluginId:string):boolean;clearPluginActivity():void;
 outside(options:OutsideOptions287):Promise<HookOutsideReplResult[]>;
 command:CommandRunner287;classic(options:ClassicHookOptions287):AsyncGenerator<unknown>;
 hasClassic(event:string):boolean;terminal():HookTerminalWriter287;
 invokeLegacy(client:unknown,request:unknown,options:unknown):Promise<unknown>;
 invokeModern(client:unknown,request:unknown,options:unknown):Promise<unknown>;
}
export function createHooksOutside287(ports:Record<string,unknown>):HooksOutside287
