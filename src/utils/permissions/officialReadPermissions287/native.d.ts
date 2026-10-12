import type {Tool} from '../../../Tool.js'
import type {PermissionDecision,PermissionAskDecision} from '../../../types/permissions.js'
import type {ReadPermissionContext287} from '../read.js'
/** Original ps actor obtained by TG() for the active execution host. */
export interface ReadPermissionCache287 {
 claudeTempDir:string|undefined
 childProcessTmpDir:string|undefined
 bundledSkillsRoot:string|undefined
 scratchpadDirBySessionId:Map<string,string|null>
 resolvedWorkingDirPaths:Map<string,string[]>
 compiledPatternsByRules:WeakMap<object,unknown>
 physicalTwinsByPattern:Map<string,unknown>
 trustedSymlinkEquivalences:unknown
 userSkillsBaseSpellingsFolded:unknown
 resolvedSandboxConfigPaths:Map<string,unknown>
 canonicalHomedirByHome:Map<string,string>
 foldedSegmentsBySpelling:Map<string,unknown>
 reset():void
}
export interface SubprocessPolicy287 {
 scrubEnabledLatched:boolean|undefined
 scrubSandboxAvailableLatched:boolean|undefined
 scrubPathsLatched:unknown
 scriptCallCounts:Map<string,number>
 scriptCapsLatched:unknown
 setScrubEnabledLatched(value:boolean):void
 setScrubSandboxAvailableLatched(value:boolean):void
 setScrubPathsLatched(value:unknown):void
 setScriptCapsLatched(value:unknown):void
 reset():void
}
export interface ReadPermissions287 {
 CL(fs:ReturnType<typeof import('../../fsOperations.js').getFsImplementation>,path:string,options?:{failClosed?:boolean}):{resolvedPath:string;isSymlink:false;isCanonical:false;linksResolvedPath?:string}
 ZWe(fs:ReturnType<typeof import('../../fsOperations.js').getFsImplementation>,path:string,options?:{failClosed?:boolean}):Promise<ReturnType<ReadPermissions287['CL']>>

 backgroundMemoryRuleMatches287(context:import('../../../Tool.js').ToolPermissionContext,tool:Pick<Tool,'name'>&{aliasSkillToolNames?:string[];packagingAliasSkillToolNames?:string[]},rule:import('../../../types/permissions.js').PermissionRule):boolean;
 // Original zs/Zu receive permission context first and a tool (not a path).
 readDenyRule(context:import('../../../Tool.js').ToolPermissionContext,tool:Pick<Tool,'name'|'mcpInfo'>&{aliasSkillToolNames?:string[];packagingAliasSkillToolNames?:string[]},rules?:readonly import('../../../types/permissions.js').PermissionRule[]):import('../../../types/permissions.js').PermissionRule|null;
 readAllowRule:ReadPermissions287['readDenyRule'];
 checkFilesystemPermission(path:string,context:ReadPermissionContext287,action:'read'|'write'|'create',ancestry?:unknown,extraSpellings?:readonly string[]):{allowed:boolean;decisionReason?:import('../../../types/permissions.js').PermissionDecisionReason};
 pathInAllowedWorkingPath(path:string,context:import('../../../Tool.js').ToolPermissionContext,spellings?:readonly string[]):boolean
 directoryForPath(path:string):string
 matchPathPermission(path:string,context:import('../../../Tool.js').ToolPermissionContext,action:'read'|'edit',behavior:'allow'|'deny'|'ask',options?:Record<string,unknown>):import('../../../types/permissions.js').PermissionRule|null

 SandboxPolicyRefusalError:new(message:string,reason:string)=>Error&{reason:string}
 sandboxFilesystemMode():'strict'|'relaxed'
 usesChildProcessTmpDir():boolean
 sandboxGbConfigSource():{filesystemPolicy?:'strict'|'relaxed'|'relaxedIfForced'}
 SubprocessPolicy:new()=>SubprocessPolicy287
 isSubprocessScrubEnabled():boolean
 tempDirBackstop():string
 logicalTempRoot():string
 tempRoot():string
 O8n(tool:Tool,input:Record<string,unknown>,context:ReadPermissionContext287,spellings?:string[]):PermissionAskDecision|null
 BC(tool:Tool,input:Record<string,unknown>,context:ReadPermissionContext287):PermissionDecision
 bundledSkillsRoot():string
 /** Original GSe: realpath and trailing separator, sharing TG.childProcessTmpDir. */
 getChildProcessTempDir():string
 /** Original nEe: verified logical short temp root for sandbox child-process env. */
 getChildProcessTempDirForShell():string
 getClaudeTempDir():string
 getProjectTempDir():string
 getTempDirForProject(originalCwd:string):string
 hookToolGrantBlocked(toolName:string):boolean
 isScratchpadEnabled():boolean
 getScratchpadDir(sessionId?:string):string|null
 permissionCache():ReadPermissionCache287
 resolvedWorkingDirPaths(path:string):string[]
 isMemoryPath(path:string,root?:string):boolean
 sourceModule(file:string):Record<string,unknown>
}
export function createReadPermissions287(ports:Record<string,unknown>):ReadPermissions287
