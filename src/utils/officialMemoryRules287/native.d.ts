import type * as path from 'node:path'
import type {FsOperations} from '../fsOperations.js'
import type {MemoryType} from '../memory/types.js'
import type {MemoryFileInfo} from '../claudemd.js'
import type {MemoryReadBackend287,MemoryReadState287} from '../officialMemoryRead287/native.js'
import type {MemoryReadFence287,MemoryReadStore287,MemoryExclusion287} from '../officialMemoryReadFence287/native.js'
import type {FilesystemResolve287} from '../officialFilesystemPaths287/native.js'
import type {logEvent} from '../../services/analytics/index.js'
export type MemoryRuleKey287={namespace:'userConfigDir';dir:'rules';relPath?:string[]}
export type MemoryRuleStat287={ok:true;value:{kind:string}}|{ok:false;error:{code:string;telemetryCode?:string;cause?:unknown}}
export interface MemoryRulesBackend287 extends MemoryReadBackend287 {
 scopeKind(key:MemoryRuleKey287):Promise<MemoryRuleStat287>
 hostFiles:{stat(key:{space:'home'|'workspace'|'system';path:string},options?:{follow:false}):Promise<MemoryRuleStat287>}
}
export interface MemoryRulesInput287 {
 rulesDir:string;type:MemoryType;processedPaths:Set<string>;includeExternal:boolean;conditionalRule:boolean;
 visitedDirs?:Set<string>;storageV5?:MemoryRulesBackend287;
 v5Descent?:{backend:MemoryRulesBackend287;relPath:string[]};discoveredDir?:string;linkedFrom?:string;excludeMatcher?:MemoryExclusion287;
}
export interface MemoryRulesPorts287 {
 path:typeof path;filesystem():FsOperations;resolve(fs:FsOperations,path:string):FilesystemResolve287;
 network(path:string):boolean;networkVolume(path:string):boolean;entrypoint():string;
 expand(path:string,base?:string):string;platform():string;windowsToPosix(path:string):string;
 userRules():string;storageEnabled():boolean;debug(message:string):void;originalCwd():string;
 env:NodeJS.ProcessEnv;additionalDirectories():string[];
 projectConfig():{hasClaudeMdExternalIncludesApproved?:boolean};
 excluded:MemoryReadFence287['excluded'];processFile:MemoryReadFence287['process'];
 event:typeof logEvent;configHome():string;readState():MemoryReadState287;
}
export interface MemoryRules287 {
 walk(input:MemoryRulesInput287):Promise<MemoryFileInfo[]>
 isLink(fs:FsOperations,path:string,type:MemoryType,backend?:MemoryRulesBackend287,descent?:{backend:MemoryRulesBackend287;relPath:string[]}):Promise<boolean>
 targetStat(fs:FsOperations,path:string,type:MemoryType,backend?:MemoryRulesBackend287):Promise<Pick<Awaited<ReturnType<FsOperations['stat']>>,'isDirectory'|'isFile'>>
}
export declare function createMemoryRules287(ports:MemoryRulesPorts287):MemoryRules287
