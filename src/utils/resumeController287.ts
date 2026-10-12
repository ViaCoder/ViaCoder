import {createResumeController287,type ResumeLoaderOptions287} from './officialResumeController287/native.js'
import sourcePorts from './officialResumeController287/sourcePorts.json'
import * as fs from 'node:fs'
import * as promises from 'node:fs/promises'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import * as processModule from 'node:process'
import * as util from 'node:util'
import {AsyncLocalStorage} from 'node:async_hooks'
import {getOriginalModsLifecycle287} from './hooks/modelSwitch287/lifecycleRuntime.js'
import {getSessionRestoreBody287,createSessionRestoreProductionPorts287} from './sessionRestoreBody287.js'
import {getResumeHookMetadataOwner287,getCurrentSessionTitle,getLastSessionLog,loadMessageLogs,loadTranscriptFile,getTranscriptPathForSession,recordFileHistorySnapshot} from './sessionStorage.js'
import {getExecutionSession287,getLegacyExecutionContext287,getRootExecutionSession287,executionSessionRegistryConstructor287,runWithExecutionSession287} from '../services/context/execution287.js'
import {getSessionId} from '../bootstrap/state.js'
import {normalizeMessages,normalizeAttachmentForAPI} from './messages.js'
import {getClaudeConfigHomeDir} from './envUtils.js'
import {copyPlanForResume} from './plans.js'
import {asSessionId} from '../types/ids.js'
import type {LogOption} from '../types/logs.js'
import type {Message} from '../types/message.js'
import {resolveSessionFilePath} from './sessionStoragePortable.js'
import {getCwd} from './cwd.js'
import {logForDebugging} from './debug.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../services/analytics/growthbook.js'

const loaderInvocation287=new AsyncLocalStorage<{log?:LogOption;history?:Pick<LogOption,'contextCollapseCommits'|'contextCollapseSnapshot'>}>()
function rememberLog287(log:LogOption|null):LogOption|null {const invocation=loaderInvocation287.getStore();if(invocation&&log)invocation.log=log;return log}
async function readTranscript287(file:string,options?:{storageV5?:unknown;precedingRows?:unknown[]}){
 if(options?.storageV5!==undefined)throw Error('StorageV5 transcript backend is not installed')
 const parsed=await loadTranscriptFile(file,{precedingRows:options?.precedingRows})
 const invocation=loaderInvocation287.getStore();if(invocation)invocation.history=parsed
 return parsed
}

export function createResumeControllerPorts287(){
 const shared=getOriginalModsLifecycle287(),restoration=createSessionRestoreProductionPorts287()
 const canonical=Object.fromEntries(sourcePorts.map(({port,file,name})=>[port,shared.clearLifecycleSource287(file,name)]))
 return {...canonical,builtins:{'fs':fs,'fs/promises':promises,path,crypto,process:processModule,util},
  readWorktree:async(id:string)=>{const resolved=await resolveSessionFilePath(id,getCwd());return rememberLog287(resolved?await getLastSessionLog(id as import('node:crypto').UUID,resolved.filePath):null)},
  readAnyProject:async(id:string)=>{const resolved=await resolveSessionFilePath(id);return rememberLog287(resolved?await getLastSessionLog(id as import('node:crypto').UUID,resolved.filePath):null)},
  readNewest:async()=>{const rows=await loadMessageLogs();return rememberLog287(rows[0]??null)},
  readTranscript:readTranscript287,
  readFileState:async(id:string,file?:string,storageV5?:unknown,precedingRows?:unknown[])=>{
   const sessionFile=file??getTranscriptPathForSession(id)
   return {...await readTranscript287(sessionFile,{storageV5,precedingRows}),sessionFile}
  },
  recordFileHistorySnapshot,configHome:getClaudeConfigHomeDir,
  copyPlan:(log:LogOption,target?:string)=>copyPlanForResume(log,target?asSessionId(target):undefined),
  // Frozen refusal/fallback C keeps the complete inspectable transcript.
  preserveFallbackC:(messages:Message[])=>messages,
  normalizeMessages,normalizeAttachment:normalizeAttachmentForAPI,metadataOwner:getResumeHookMetadataOwner287,
  session:getExecutionSession287,legacyExecution:getLegacyExecutionContext287,rootExecution:getRootExecutionSession287(),sessionRegistry:executionSessionRegistryConstructor287,sessionId:getSessionId,title:getCurrentSessionTitle,
  sessionStart:restoration.H5,hookCarrier:getSessionRestoreBody287().hookCarrier,
  takeHookTitle:getSessionRestoreBody287().takeHookTitle,
  hookTitle:getSessionRestoreBody287().commitHookTitle,
  analytics:restoration.i,
  status:(...args:unknown[])=>logForDebugging(`[resume] ${args.join(' ')}`),statusResult:(...args:unknown[])=>logForDebugging(`[resume] ${args.join(' ')}`),statusFailure:(...args:unknown[])=>logForDebugging(`[resume] ${args.join(' ')}`),
  featureFlag:(key:string,fallback:unknown)=>getFeatureValue_CACHED_MAY_BE_STALE(key,fallback),
  diagnosticDuration:restoration.wr,
  nativeRequire:(specifier:string)=>{
   if(specifier==='/$bunfs/root/chunk-cd74mtad.js')return restoration.nativeRequire(specifier)
   if(specifier==='/$bunfs/root/chunk-4hcet7cn.js')return require('../tools/BriefTool/prompt.js') as typeof import('../tools/BriefTool/prompt.js')
   if(specifier==='/$bunfs/root/chunk-z0hwwxy0.js')return require('../tools/SendUserFileTool/prompt.js') as typeof import('../tools/SendUserFileTool/prompt.js')
   throw Error('Resume public namespace missing '+specifier)
  },
 }
}
let controller:ReturnType<typeof createResumeController287>|undefined
export function getResumeController287(){return controller??=createResumeController287(createResumeControllerPorts287())}
export function loadOriginalResume287(source:string|LogOption|undefined,file:string|undefined,options:ResumeLoaderOptions287){
 const invocation:{log?:LogOption;history?:Pick<LogOption,'contextCollapseCommits'|'contextCollapseSnapshot'>}={log:typeof source==='object'?source:undefined}
 return runWithExecutionSession287(options.session??getExecutionSession287(),()=>loaderInvocation287.run(invocation,async()=>{
  const carrier=await getResumeController287().load(source,file,options)
  return carrier?{...carrier,contextCollapseCommits:invocation.history?.contextCollapseCommits??invocation.log?.contextCollapseCommits,contextCollapseSnapshot:invocation.history?.contextCollapseSnapshot??invocation.log?.contextCollapseSnapshot}:null
 }))
}

/** Whole Aye/les/Cye selection with invocation-local C collapse carry, not a
 * second parser/cache. Public /resume and picker use this same loader. */
export async function readOriginalResumeLog287(source:LogOption):Promise<LogOption>
export async function readOriginalResumeLog287(source:string,file?:string):Promise<LogOption|null>
export async function readOriginalResumeLog287(source:string|LogOption,file?:string):Promise<LogOption|null> {
 const invocation:{log?:LogOption;history?:Pick<LogOption,'contextCollapseCommits'|'contextCollapseSnapshot'>}={log:typeof source==='object'?source:undefined}
 return loaderInvocation287.run(invocation,async()=>{
  const log=typeof source==='string'?await getResumeController287().readById(source,file):await getResumeController287().readFull(source)
  if(!log)return null
  const id=log.sessionId??log.messages.at(-1)?.sessionId
  const history=invocation.history??invocation.log
  return {...log,contextCollapseCommits:history?.contextCollapseCommits?.filter(row=>row.sessionId===id),contextCollapseSnapshot:history?.contextCollapseSnapshot?.sessionId===id?history.contextCollapseSnapshot:undefined}
 })
}
