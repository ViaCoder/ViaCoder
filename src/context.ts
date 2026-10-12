import {createUserContext287,createUserContextMemoryPolicy287,createUserContextModes287} from './services/context/officialUserContext287/native.js'
import type {CredentialStore} from './utils/officialSecureStorage/runtime.js'
import {getProjectsApi287,getProjectsContext287} from './services/context/projects287.js'
import {resolveOriginalPromptContext287} from './utils/hooks/modelSwitch287/promptContext.js'
import {modelSwitchErrors287} from './utils/hooks/modelSwitch287/errors.js'
import {getOauthAccountInfo} from './utils/auth.js'
import {createSystemContext287} from './utils/officialQueryContext287/native.js'
import {authEnvironment} from './utils/authEnvironment.js'
import {createGitContext287,createGitEnvironment287} from './services/context/officialGitContext287/native.js'
import {errorMessage} from './utils/errors.js'
import {logForDebugging} from './utils/debug.js'
import {BASH_TOOL_NAME} from './tools/BashTool/toolName.js'
import {POWERSHELL_TOOL_NAME} from './tools/PowerShellTool/toolName.js'
import {getExecutionSession287,executionSessionRegistryConstructor287,runWithExecutionSession287} from './services/context/execution287.js'
import type {ExecutionSession287} from './services/context/officialExecutionOwners287/native.js'
import {createPrintClaimContext287} from './cli/printOwnership287/native.js'
import {claimContextRegistry287} from './services/context/claimContextRegistry287.js'
import {logEvent} from './services/analytics/index.js'
import {profileCheckpoint} from './utils/startupProfiler.js'
import {
  getAdditionalDirectoriesForClaudeMd,
  setCachedClaudeMdContent,
} from './bootstrap/state.js'
import { getSessionStartDateOwner287 } from './constants/common.js'
import {
  filterInjectedMemoryFiles,
  filterInstructionFiles287,
  getClaudeMds,
  getMemoryFilesForSession287,
} from './utils/claudemd.js'
import { logForDiagnosticsNoPII } from './utils/diagLogs.js'
import { isBareMode, isEnvTruthy } from './utils/envUtils.js'
import { execFileNoThrow } from './utils/execFileNoThrow.js'
import { getBranch, getDefaultBranch, getIsGit, gitExe } from './utils/git.js'
import { shouldIncludeGitInstructions } from './utils/gitSettings.js'
import { logError } from './utils/log.js'
import type { InstructionFile } from './services/context/official/attachments.js'

// Bind the files to the exact completed context build. Rereading a global
// cache here could mix a newer cwd/settings build into an older in-flight turn.
const instructionSnapshots = new WeakMap<Record<string, string>, InstructionFile[]>()
// Original Um/IJ spread the completed blocks. Symbols survive that clone but
// are excluded from Object.entries and JSON, so this exact build's files never
// become model fields or a lookup against a newer session-wide snapshot.
const instructionSnapshotKey287 = Symbol('completed-context-instructions')
export function getUserContextInstructionSnapshot(context: Record<string, string> & {
  [instructionSnapshotKey287]?: InstructionFile[]
}): InstructionFile[] | undefined {
  return instructionSnapshots.get(context) ?? context[instructionSnapshotKey287]
}

// System prompt injection for cache breaking (ant-only, ephemeral debugging state)
let systemPromptInjection: string | null = null

export function getSystemPromptInjection(): string | null {
  return systemPromptInjection
}

export function setSystemPromptInjection(value: string | null): void {
  systemPromptInjection = value
  // Clear context caches immediately when injection changes
  getUserContext.cache.clear?.()
  getSystemContext.cache.clear?.()
}

const gitEnvironment287=createGitEnvironment287({platform:process.platform,architecture:process.arch,process})
function usesBashForContext287(){return (require('./services/context/runtime.js') as typeof import('./services/context/runtime.js')).usesBashTools287()}
// Exact original V2n/Exr bodies. Existing FS branch/root optimizations stay in
// their actual owners; command environment and platform naming are source ports.
const sourceGitContext287=createGitContext287({
 ne:logForDiagnosticsNoPII,Kx:()=>getIsGit(),sd:()=>getBranch(),_T:()=>getDefaultBranch(),
 Ke:(...args)=>execFileNoThrow(...args),vt:()=>gitExe(),Qo:gitEnvironment287.environment,
 $a:usesBashForContext287,Ue:BASH_TOOL_NAME,wt:POWERSHELL_TOOL_NAME,
 p(){},y(){},t:logForDebugging,l:errorMessage,a:authEnvironment,oHt:shouldIncludeGitInstructions,
 $S:gitEnvironment287.ignoreSubmodules,
})
const buildGitStatus=sourceGitContext287.build

// QB/U0n preserve the original per-session/per-phrase cache and Perforce body.
// Git context is supplied by the existing context-routing announcement owner.
const sourceSystemContext287=createSystemContext287({
 LF:session=>getClaimContextOwner287().entry(session),a:authEnvironment,
 ne:logForDiagnosticsNoPII,Le:isEnvTruthy,
 $a:usesBashForContext287,Ue:BASH_TOOL_NAME,wt:POWERSHELL_TOOL_NAME,
})

const userContextModes287=createUserContextModes287({Le:isEnvTruthy,process})
const userContextPolicy287=createUserContextMemoryPolicy287({
 Ut:()=>getExecutionSession287().host.launchOptions.diskless(),
 xu:getAdditionalDirectoriesForClaudeMd,xr:isBareMode,
 yr:userContextModes287.isSafe,a:authEnvironment,
})
let userContextSource287:ReturnType<typeof createUserContext287>|undefined
function getUserContextSource287(){return userContextSource287??=createUserContext287({
 qN:userContextPolicy287.disabled,ne:logForDiagnosticsNoPII,AJ:[],
 RJ:filterInjectedMemoryFiles,vw:getMemoryFilesForSession287,xJ:filterInstructionFiles287,CPe:getClaudeMds,
 m(){},y(){},a:authEnvironment,In:getOauthAccountInfo,
 F0n:(credentials?:CredentialStore)=>getProjectsContext287().uas(credentials),
 $0n:(session:ExecutionSession287,refresh:()=>void)=>getProjectsContext287().das(session,refresh),
 ZT:(session:ExecutionSession287,reason:string)=>getClaimContextOwner287().invalidate(session,reason),
 GWr:(session:ExecutionSession287)=>getSessionStartDateOwner287(session).get(),
 Ixn:resolveOriginalPromptContext287,Oe:modelSwitchErrors287.Oe,
})}
// Original H0n owns filtering, Projects/email, Mods reconciliation and metrics.
// A completed build retains its own snapshot, not a later module-global cache.
async function buildUserContext(session:ExecutionSession287,storageV5?:unknown,credentials?:CredentialStore) {
 return runWithExecutionSession287(session,async()=>{
  const result=await getUserContextSource287().build(session,storageV5,credentials)
  if(result.instructionFiles!==undefined){
   const snapshot=result.instructionFiles.map(({path,type,content})=>({path,type:type as InstructionFile['type'],content}))
   instructionSnapshots.set(result.blocks,snapshot)
   Object.defineProperty(result.blocks,instructionSnapshotKey287,{value:snapshot,enumerable:true})
  }
  return result
 })
}
export {buildUserContext as buildUserContext287}

// Canonical original LF/qI replaces the three old module-global memoize caches.
// Actual construction above and its C bare/explicit-add-dir behavior are retained.
let contextOwner287:ReturnType<typeof createPrintClaimContext287>|undefined
export function getClaimContextOwner287() {
 return contextOwner287??=createPrintClaimContext287({
  registry:claimContextRegistry287,
  AJ:[] as never[],Tt:executionSessionRegistryConstructor287,
  Exr:sourceGitContext287.include,
  F3t:setCachedClaudeMdContent,L6o:()=>profileCheckpoint('user_context_build'),
  Mat:()=>getProjectsApi287().pas(),
  V2n:buildGitStatus,d:logError,i:logEvent,
  H0n:(session,storage,credentials)=>buildUserContext(session,storage,credentials as CredentialStore|undefined),
  B0n:()=>getProjectsContext287().IBn(),
 })
}
export const getGitStatus=Object.assign(()=>{const entry=getClaimContextOwner287().entry(getExecutionSession287());return entry.gitStatusPrefetch??=buildGitStatus()},
 {cache:{clear(){getClaimContextOwner287().entry(getExecutionSession287()).gitStatusPrefetch=undefined}}})
export const getSystemContext=Object.assign((session=getExecutionSession287(),cacheBreakerPhrase?:string)=>sourceSystemContext287.getSystemContext(session,cacheBreakerPhrase),
 {cache:{clear(){getClaimContextOwner287().entry(getExecutionSession287()).systemContextByPhrase.clear()}}})
export const getUserContext=Object.assign((session=getExecutionSession287(),storageV5?:unknown,credentials?:unknown)=>runWithExecutionSession287(session,()=>getClaimContextOwner287().prefetch(session,storageV5,credentials)),
 {cache:{clear(){getClaimContextOwner287().reset(getExecutionSession287())}}})
