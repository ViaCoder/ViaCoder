import type {DebugFilter} from '../../debugFilter.js'
export interface DebugLaunchIdentity287 {minLevel:'verbose'|'debug'|'info'|'warn'|'error';filter:DebugFilter|null;toStderr:boolean;filePath:string|null;debugFromLaunch:boolean;isAnt:boolean;isTestEnvironment:boolean}
export interface DebugInstance287 {
 deps:{isAnt:boolean;isTestEnvironment:boolean};
 minLevel:DebugLaunchIdentity287['minLevel'];filter:DebugFilter|null;toStderr:boolean;filePath:string|null;
 hasFormattedOutput:boolean;runtimeDebugEnabled:boolean;pendingWrite:Promise<void>;unflushedChunks:unknown[];
 successor:DebugInstance287|null;storageV5:unknown;
 launchIdentity():DebugLaunchIdentity287;isDebugMode():boolean;enableDebugLogging():boolean;
 drainsSyncAtExit():boolean;logPath():string;defaultLogPath(sessionId?:string):string;isArmed():boolean;
 log(message:string,options?:{level:DebugLaunchIdentity287['minLevel']}):void;write(content:string):void;
 flush():Promise<void>;dispose(redirect?:(content:string)=>void):void;succeed(previous:DebugInstance287):void;handleExit():void;
}
export interface DebugOwner287 {instance:DebugInstance287|undefined;init:{storageV5?:unknown;configHome?:string;syncExitDrain?:boolean};defaultFile:boolean;setInstance(value:DebugInstance287):void;setInit(value:DebugOwner287['init']):void;disableDefaultFile():void}
export interface ExecFileOptions287 {
 abortSignal?:AbortSignal;timeout?:number;preserveOutputOnError?:boolean;cwd?:string;env?:NodeJS.ProcessEnv;extendEnv?:boolean;
 maxBuffer?:number;shell?:boolean|string;stdin?:'pipe'|'ignore'|'inherit';input?:string|Uint8Array;
 stdout?:'pipe'|'ignore'|'inherit';stderr?:'pipe'|'ignore'|'inherit';stripFinalNewline?:boolean;encoding?:string;
 allowRepoGitHooks?:boolean;allowGitTerminalPrompt?:boolean;useToolMemoryCgroup?:boolean;toolCgroupClass?:string;
 waitForExitAfterKill?:boolean;withoutControllingTerminal?:boolean;
}
export interface ExecFileResult287 {stdout:string;stderr:string;code:number;error?:string;exitCode?:number;maxBufferExceeded?:boolean;timedOut?:boolean;noChildLeft?:boolean}
export interface ChromeClientCuts287 {
 initializeDebug(options:{storageV5?:unknown;syncExitDrain?:boolean}):void;
 debugState():DebugOwner287;debugInstance():DebugInstance287;debugLog(message:string,options?:{level:DebugLaunchIdentity287['minLevel']}):void;debugRefresh():void;
 debugConstructor:new(options:Record<string,unknown>)=>DebugInstance287;
 initializeIds(storageV5?:unknown):Promise<void>;userId(storageV5?:unknown):string;machineId(storageV5?:unknown):string;
 execFile(file:string,args:string[],options?:ExecFileOptions287):Promise<ExecFileResult287>;
 spawnPrimitive(file:string,args:string[],options?:Record<string,unknown>):import('node:child_process').ChildProcess&Promise<{stdout:string|Uint8Array;stderr:string|Uint8Array;failed:boolean;timedOut:boolean;exitCode?:number;isCanceled:boolean;killed:boolean}>;
}
export function createChromeClientCuts287(ports:Record<string,unknown>):ChromeClientCuts287
