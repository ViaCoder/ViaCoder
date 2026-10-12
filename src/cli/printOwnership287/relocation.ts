import {dirname,parse,join} from 'node:path'
import {readFile} from 'node:fs/promises'
import {getSurfaceReplHandle287} from '../../services/context/surface287.js'
import {getExecutionSession287,unlatchExecutionStickyBetas287} from '../../services/context/execution287.js'
import {getCwd} from '../../utils/cwd.js'
import {setCwd} from '../../utils/Shell.js'
import {getOriginalCwd,setOriginalCwd,setProjectRoot,setCachedClaudeMdContent} from '../../bootstrap/state.js'
import {relocateSessionTranscript} from '../../utils/sessionStorage.js'
import {getProjectPathForConfig,checkHasTrustDialogAccepted} from '../../utils/config.js'
import {getSettingsForSource} from '../../utils/settings/settings.js'
import {resetSettingsCache} from '../../utils/settings/settingsCache.js'
import {updateHooksConfigSnapshot} from '../../utils/hooks/hooksConfigSnapshot.js'
import {settingsChangeDetector} from '../../utils/settings/changeDetector.js'
import {skillChangeDetector} from '../../utils/skills/skillChangeDetector.js'
import {discoverSkillDirsForPaths,addSkillDirectories} from '../../skills/loadSkillsDir.js'
import {getPlansDirectory} from '../../utils/plans.js'
import {getSessionStartDateOwner287} from '../../constants/common.js'
import {resetGitFileWatcher,clearResolveGitDirCache} from '../../utils/git/gitFilesystem.js'
import {findGitRoot,findCanonicalGitRoot,getIsGit} from '../../utils/git.js'
import {getSystemContext,getGitStatus,getClaimContextOwner287} from '../../context.js'
import {getMemorySessionCache287,resetGetMemoryFilesCache,getMemoryFiles,getClaudeMds} from '../../utils/claudemd.js'
import {getSystemComposerMemoryDirectoryOwner287} from '../../constants/systemComposerMemory287.js'
import {SandboxManager} from '../../utils/sandbox/sandbox-adapter.js'
import {expandPath,sanitizePath} from '../../utils/path.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../../services/analytics/index.js'
import {atomicRenameWrite,parseRenameJob} from '../../utils/sessionRename/jobs.js'
import {createPrintRelocation287} from './native.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'

export interface ClaimRelocationHost287 {
 invalidateRender():void;
 resetModelSteerLatch():void;
}
// The fresh public local branch uses the existing root, cwd, transcript,
// watchers, settings store, context/Memory cache and directory owner. No /cd
// command executor, registry, backend or second copy of those states.
export function createClaimRelocation287(host:ClaimRelocationHost287) {
 return createPrintRelocation287(createClaimRelocationPorts287(host))
}
export function createClaimRelocationPorts287(host:ClaimRelocationHost287) {
 const owner=()=>getClaimContextOwner287()
 return {
  A:dirname,G:parse,L:<T>(items:T[])=>[...new Set(items)],
  oe:getCwd,Ee:getOriginalCwd,Xe:expandPath,zf:(directory:string)=>{process.chdir(directory);try{process.cwd()}catch{}},
  Rf:setCwd,vT:setOriginalCwd,jfe:setProjectRoot,I4e:relocateSessionTranscript,
  TFt:async(directory:string)=>{const job=authEnvironment.CLAUDE_JOB_DIR;if(!job||authEnvironment.CLAUDE_CODE_SESSION_KIND!=='bg')return;
   const file=join(job,'state.json'),state=parseRenameJob(JSON.parse(await readFile(file,'utf8')));if(!state)return;
   const origin=state.worktreePath?state.originCwd:directory;if(state.cwd===directory&&state.originCwd===origin)return;
   await atomicRenameWrite(file,JSON.stringify({...state,cwd:directory,originCwd:state.worktreePath?state.originCwd:directory,updatedAt:new Date().toISOString()}))},
  CIe:()=>getProjectPathForConfig.cache.clear?.(),Ki:settingsChangeDetector,AX:skillChangeDetector,
  MG:()=>{resetSettingsCache();updateHooksConfigSnapshot()},
  jle:(_subdir:string,directory:string)=>discoverSkillDirsForPaths([directory],directory),WMt:addSkillDirectories,
  tY:resetGitFileWatcher,Dbt:()=>{getIsGit.cache.clear?.();getGitStatus.cache.clear()},sc:getSurfaceReplHandle287,
  je:SandboxManager,mun:host.invalidateRender,i:logEvent,c:(value:string)=>value,t:logForDebugging,
  zV:(reason?:string)=>{const session=getExecutionSession287();session.promptAssembly.forgetAllSections();session.promptAssembly.noteInvalidation(reason);unlatchExecutionStickyBetas287();host.resetModelSteerLatch();getSystemContext.cache.clear()},
  eHt:(_session:ExecutionSession287,reason:'session_start')=>resetGetMemoryFilesCache(reason),
  PTo:()=>{getMemorySessionCache287().hasLoggedInitialLoad=false},MTo:(session:ExecutionSession287)=>owner().resetPluginMetrics(session),
  LBt:{of:getSessionStartDateOwner287},
  Msn:(session:ExecutionSession287)=>owner().reset(session),F3t:setCachedClaudeMdContent,
  UVt:()=>{findGitRoot.cache.clear();findCanonicalGitRoot.cache.clear();getIsGit.cache.clear?.()},QVt:clearResolveGitDirCache,
  Kl:getPlansDirectory,X_:async()=>{getPlansDirectory()},VH:getSystemComposerMemoryDirectoryOwner287,
  aTe:(session:ExecutionSession287)=>owner().prefetchGit(session),kC:(session:ExecutionSession287,storage?:unknown,credentials?:unknown)=>owner().prefetch(session,storage,credentials),
  a:authEnvironment,ge:getSettingsForSource,vw:getMemoryFiles,ap:(value:string)=>expandPath(value),
  Elt:(directory:string)=>{const main=findCanonicalGitRoot(directory),worktree=findGitRoot(directory);return main&&worktree&&main!==worktree?{mainRepoRoot:main,worktreeRoot:worktree}:null},
  vlt:(directory:string,roots:{mainRepoRoot:string;worktreeRoot:string}|null)=>!!roots&&directory.startsWith(roots.mainRepoRoot)&&!directory.startsWith(roots.worktreeRoot),
  z2n:async(directory:string,_cwd:string,seen:Set<string>,opts:{skipProject:boolean})=>(await getMemoryFiles()).filter(file=>dirname(file.path)===directory&&!seen.has(file.path)&&(!opts.skipProject||file.type!=='Project')),
  ITo:getClaudeMds,Yh:sanitizePath,cl:(value:string)=>`<system-reminder>\n${value}\n</system-reminder>`,
  ET:()=>getOriginalCwd()===process.env.HOME,Pm:checkHasTrustDialogAccepted,
  zUt:()=>{const project=getSettingsForSource('projectSettings'),local=getSettingsForSource('localSettings');return !!(project?.permissions||local?.permissions)&&!checkHasTrustDialogAccepted()},
 }
}
