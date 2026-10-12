import type * as path from 'node:path'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import type {MemorySession287,MemorySessionCache287,MemorySessionTracking287} from '../officialMemorySession287/native.js'
import type {MemoryFileInfo} from '../claudemd.js'
import type {MemoryReadFence287} from '../officialMemoryReadFence287/native.js'
import type {MemoryReadResult287} from '../officialMemoryRead287/native.js'
import type {MemoryRules287,MemoryRulesBackend287} from '../officialMemoryRules287/native.js'
import type {FsOperations} from '../fsOperations.js'
import type {SettingSource} from '../settings/constants.js'
import type {InstructionsMemoryType,InstructionsLoadReason} from '../hooks.js'
import type {MemoryDirectoryRuntime287} from '../officialMemoryDirectory287/native.js'
import type {FilesystemResolve287} from '../officialFilesystemPaths287/native.js'
import type {TypedEnvironment287} from '../officialTypedEnvironment287/native.js'
export interface MemoryWorkspaceRestriction287 {sparesInstructionFiles?:boolean}
export interface MemoryLoaderPorts287 {
 path:typeof path;remoteWorkspace():boolean;track:MemorySession287['track'];
 diagnostic:typeof import('../diagLogs.js').logForDiagnosticsNoPII;
 projectConfig():{hasClaudeMdExternalIncludesApproved?:boolean};excludeMatcher:MemoryReadFence287['exclusion'];
 managedHome():string;memoryPath(type:'Managed'|'User'):string;managedRules():string;
 settingEnabled(source:SettingSource):boolean;configHome():string;userRules():string;
 restriction():MemoryWorkspaceRestriction287|null;allowedSources():readonly SettingSource[];
 originalCwd():string;gitRoot(path:string):string|null;canonicalGitRoot(path:string):string|null;
 normalize(path:string):string;filesystem():FsOperations;resolve(fs:FsOperations,path:string):FilesystemResolve287;
 ancestry:import('../officialFilesystemPaths287/native.js').FilesystemPathRuntime287['ancestry'];
 skipped:MemoryReadFence287['skipped'];processFile:MemoryReadFence287['process'];helperInstructions():string|null;
 settingsForSource:typeof import('../settings/settings.js').getSettingsForSource;
 rules:MemoryRules287['walk'];network(path:string):boolean;networkVolume(path:string):boolean;
 additionalRegistry:MemorySession287['additionalRegistry'];
 env:Pick<TypedEnvironment287,'CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD'|'CLAUDE_CODE_REMOTE'>;
 additionalDirectories():string[];memoryEnabled():boolean;memoryBlocked():boolean;
 directoryOwner():{warmCanonicalWcRoot():Promise<void>};indexPath():string;requiredDirectory():string;
 readAllowed:MemorySession287['readAllowed'];read(path:string,type:'AutoMem'):Promise<MemoryReadResult287>;
 indexOverride:MemorySession287['indexOverride'];hasMemoryStores():boolean;backfill:MemoryDirectoryRuntime287['backfill'];
 feature<T>(name:string,fallback:T):T;event:typeof import('../../services/analytics/index.js').logEvent;
 consumeHook:MemorySession287['consumeHook'];hasInstructionsHook():boolean;
 instructionsHook(session:ExecutionSession287,path:string,type:InstructionsMemoryType,reason:InstructionsLoadReason,options:{globs?:string[];parentFilePath?:string;storageV5?:MemoryRulesBackend287;credentials?:unknown}):Promise<void>;
 expand(path:string,base?:string):string;platform():string;windowsToPosix(path:string):string;
}
export interface MemoryLoader287 {
 load(session:ExecutionSession287,state:MemorySessionCache287,tracking:MemorySessionTracking287,force:boolean,storageV5?:MemoryRulesBackend287,credentials?:unknown):Promise<MemoryFileInfo[]>;
 instructionsEnabled(source:SettingSource):boolean;indexSuppressed():boolean
}
export declare function createMemoryLoader287(ports:MemoryLoaderPorts287):MemoryLoader287
