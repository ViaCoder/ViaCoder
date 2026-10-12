import type {ToolPermissionContext} from '../../Tool.js'
import {homedir} from 'node:os'
import {realpath,stat} from 'node:fs/promises'
import {isAbsolute,normalize,parse} from 'node:path'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {getOriginalCwd} from '../../bootstrap/state.js'
import {getGlobalConfig,getProjectPathForConfig,trySaveGlobalConfig287} from '../../utils/config.js'
import {findCanonicalGitRoot} from '../../utils/git.js'
import {getPlatform} from '../../utils/platform.js'
import {settingsChangeDetector} from '../../utils/settings/changeDetector.js'
import {resetSettingsCache} from '../../utils/settings/settingsCache.js'
import {updateHooksConfigSnapshot} from '../../utils/hooks/hooksConfigSnapshot.js'
import {errorMessage} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../../services/analytics/index.js'
import {expandPath} from '../../utils/path.js'
import {printClaimScreen287} from './screen.js'
import {createPrintClaimWorkspaceTrust287,type WorkspaceTrustContext287} from './native.js'
type TrustSession287=ExecutionSession287&{sessionFlags:ExecutionSession287['sessionFlags']&{
 sessionTrustAccepted():boolean;replaceSessionTrustAccepted(value:boolean):void;
 homeTrustDialogAccepted():boolean;replaceHomeTrustDialogAccepted(value:boolean):void;
}}
// All writes use the existing canonical ConfigState writer or the original
// execution sessionFlags instance. The only module-boundary transform replaces
// fp's dynamic module import with that same recovered module's public members.
export function getWorkspaceTrustPorts287() {
 return {
  B:homedir,CB:printClaimScreen287.screen,HD:printClaimScreen287.unsafe,
  CIe:()=>getProjectPathForConfig.cache.clear(),Ee:getOriginalCwd,
  GE:isAbsolute,KE:realpath,VE:stat,x:realpath,Xe:expandPath,u:normalize,ue:normalize,me:parse,O:getPlatform,
  Ki:settingsChangeDetector,MG:()=>{resetSettingsCache();updateHooksConfigSnapshot()},
  Nc:trySaveGlobalConfig287,le:getGlobalConfig,n:()=>getExecutionSession287() as TrustSession287,nw:findCanonicalGitRoot,
  c:(value:string)=>value,i:(name:string,metadata:Record<string,string>)=>logEvent(name,metadata as unknown as Parameters<typeof logEvent>[1]),l:errorMessage,t:logForDebugging,
 }
}
const runtime=createPrintClaimWorkspaceTrust287(getWorkspaceTrustPorts287())
export const applyWorkspaceTrust287=(trust:unknown,context:WorkspaceTrustContext287)=>runtime.apply(trust,context)
export const workspaceTrustRuntime287=runtime

// Optional public map belongs to the existing permission context; absence stays
// undefined. This reader does not construct/seed a network-trust map.
export function getWorkspaceTrustDirectories287(context:ToolPermissionContext):ReadonlyMap<string,readonly string[]>|undefined {
 return (context as ToolPermissionContext & {trustedNetworkDirectories?:ReadonlyMap<string,readonly string[]>}).trustedNetworkDirectories
}
