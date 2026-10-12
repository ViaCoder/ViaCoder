import * as fs from 'node:fs'
import * as fsPromises from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import * as crypto from 'node:crypto'
import {spawnSync} from 'node:child_process'
import {createRestoreWorktree287} from './officialSessionRestore287/worktree.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'
import {getClearLifecycleBinding287} from '../commands/clear/lifecycle287.js'
import {getCurrentWorktreeSession,restoreWorktreeSession} from './worktree.js'
import {saveWorktreeState} from './sessionStorage.js'
import {getCwd} from './cwd.js'
import {getPlansDirectory} from './plans.js'
import {setCwd} from './Shell.js'
import {setOriginalCwd,isSessionPersistenceDisabled} from '../bootstrap/state.js'
import {clearMemoryFileCaches} from './claudemd.js'
import {clearSystemPromptSections} from '../constants/systemPromptSections.js'
import {filesystemPathRuntime287} from './filesystemPathRuntime287.js'
import {getFsImplementation} from './fsOperations.js'
import {getSurfaceReplHandle287} from '../services/context/surface287.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {logEvent} from '../services/analytics/index.js'
function sharedCall(file:string,name:string,...args:unknown[]):unknown {
 const value=getOriginalModsLifecycle287().clearSourceModule287(file)[name]
 if(typeof value!=='function')throw Error('Resume canonical source export missing: '+file+':'+name)
 return value(...args)
}
/** Read-only host adapter. De decides whether a pin is valid; the adapter never
 * supplies a successful validator or a worktree it did not actually enter. */
export function createRestoreWorktreePorts287(){return {
 automountRoot:filesystemPathRuntime287.automountRoot,networkBrowsePath:filesystemPathRuntime287.isNetworkBrowsePath,
 builtins:{fs,'fs/promises':fsPromises,path,os,crypto,process},productMetadata:MACRO,
 currentWorktree:getCurrentWorktreeSession,saveWorktree:saveWorktreeState,
 analytics:(event:string,fields:Record<string,unknown>)=>logEvent(event,fields as Parameters<typeof logEvent>[1]),identity:<T>(value:T)=>value,
 debug:logForDebugging,logError,cwd:getCwd,filesystem:getFsImplementation(),execution:getExecutionSession287,
 setCwd,setOriginalCwd,clearMemory:clearMemoryFileCaches,invalidatePrompt:clearSystemPromptSections,
 plansDirectory:getPlansDirectory,
 isPersistent:()=>sharedCall('chunk-bn3p37gv.js','Ce'),isReplBridge:()=>sharedCall('chunk-bn3p37gv.js','Yfe'),
 planListingOwner:()=>sharedCall('chunk-epk29mef.js','u_'),
 storagePlanListing:async()=>{throw Error('StorageV5 plan-listing backend is not installed')},
 gitOwner:()=>sharedCall('chunk-2ynta9xc.js','O'),
 invalidateGitOwner:(session:unknown)=>{const invalidate=getClearLifecycleBinding287('chunk-2ynta9xc.js','Dbt');if(typeof invalidate!=='function')throw Error('Canonical git invalidation missing');invalidate(session)},
 replHandle:getSurfaceReplHandle287,
 spawnSync:(command:string,args:string[],options:import('node:child_process').SpawnSyncOptionsWithStringEncoding)=>{
  const result=spawnSync(command,args,{...options,encoding:'utf8'});return {...result,exitCode:result.status,stdout:result.stdout,stderr:result.stderr,timedOut:result.error?.name==='ETIMEDOUT'}
 },
 restoreWorktree:restoreWorktreeSession,noPersistence:isSessionPersistenceDisabled,
}}
let runtime:ReturnType<typeof createRestoreWorktree287>|undefined
export function getRestoreWorktree287(){return runtime??=createRestoreWorktree287(createRestoreWorktreePorts287())}
