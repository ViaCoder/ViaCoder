import type * as path from 'node:path'
import type {ExecutionSession287,ExecutionSessionRegistry287,ExecutionSessionRegistryConstructor287} from '../../services/context/officialExecutionOwners287/native.js'
import type {MemoryFileInfo} from '../claudemd.js'
import type {InstructionsLoadReason} from '../hooks.js'
import type {MemoryRulesBackend287} from '../officialMemoryRules287/native.js'
export interface MemorySessionCache287 {
 files:Map<boolean,Promise<MemoryFileInfo[]>>;nextEagerLoadReason:InstructionsLoadReason;
 shouldFireHook:boolean;walkEpoch:number;hasLoggedInitialLoad:boolean
}
export type MemoryInjection287='none'|'body'|'surfaced'|'listed'
export interface MemoryCitedStatus287 {resolved:boolean;read:boolean;written:boolean;injection:MemoryInjection287}
export interface MemorySessionTracking287 {
 recordContextBuild(input:{memoryDir:string|null;injectedBodyPaths:string[];indexContents:string[]}):void;
 recordSurfaced(paths:string[]):void;recordAccess(path:string,kind:'read'|'written'):void;
 priorAccess(path:string):'none'|'read'|'written'|'read_written';injection(path:string):MemoryInjection287|'unknown';
 citedStatus(path:string):MemoryCitedStatus287;reset():void
}
export interface MemorySessionPorts287 {
 path:typeof path;sessionRegistry:ExecutionSessionRegistryConstructor287;session():ExecutionSession287;
 load(session:ExecutionSession287,state:MemorySessionCache287,tracking:MemorySessionTracking287,force:boolean,storageV5?:MemoryRulesBackend287,credentials?:unknown):Promise<MemoryFileInfo[]>;
 feature(name:string,fallback:boolean):boolean;hasMemoryStores():boolean;memoryDirectory():string|null;
 requiredMemoryDirectory():string;readFenceEnabled():boolean;readPathCandidates(path:string):string[];
 truncateIndex(content:string):{content:string};indexPath():string
}
export interface MemorySession287 {
 get(session:ExecutionSession287,force?:boolean,storageV5?:MemoryRulesBackend287,credentials?:unknown):Promise<MemoryFileInfo[]>;
 cache(session:ExecutionSession287):MemorySessionCache287;clear(session:ExecutionSession287):void;clearCurrent():void;
 reset(session:ExecutionSession287,reason?:InstructionsLoadReason):void;resetCurrent(reason?:InstructionsLoadReason):void;
 resetMetrics(session:ExecutionSession287):void;consumeHook(state:MemorySessionCache287):InstructionsLoadReason|undefined;
 trackingRegistry:ExecutionSessionRegistry287<MemorySessionTracking287>;
 additionalRegistry:ExecutionSessionRegistry287<{read?:()=>Promise<MemoryFileInfo[]>}>;
 track(tracking:MemorySessionTracking287,files:MemoryFileInfo[]):void;readAllowed(path:string):boolean;
 indexOverride(content:string):MemoryFileInfo;indexEnv():string|undefined
}
export declare function createMemorySession287(ports:MemorySessionPorts287):MemorySession287
