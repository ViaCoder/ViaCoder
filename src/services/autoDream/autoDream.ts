// Complete 287 Muo/Luo; imports are ports into the same host, Task and Memory
// owners. The local permission-denial/write-feedback bridge is fork-local.
import {readdir} from 'node:fs/promises'
import {basename,dirname,join} from 'node:path'
import {getExecutionSession287} from '../context/execution287.js'
import {getRuntimeMemo287} from '../context/runtimeMemo287.js'
import {getOriginalCwd,getSessionId} from '../../bootstrap/state.js'
import {getAgentTaskRegistry287} from '../../tools/AgentTool/agentAdmission287.js'
import {getDreamTaskHelpers287,isDreamTask,settleDreamTaskWrites287} from '../../tasks/DreamTask/DreamTask.js'
import {createCacheSafeParams,runForkedAgent} from '../../utils/forkedAgent.js'
import {createUserMessage,createMemorySavedMessage,createSystemMessage} from '../../utils/messages.js'
import {publishBackgroundMemoryUpdate287} from '../../utils/memoryUpdates287.js'
import {getProjectDir,getProjectsDir} from '../../utils/sessionStorage.js'
import {logForDebugging} from '../../utils/debug.js'
import {errorMessage,isENOENT} from '../../utils/errors.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../analytics/growthbook.js'
import {isAutoMemoryEnabled,getAutoMemPath} from '../../memdir/paths.js'
import {isTeamMemoryEnabled} from '../../memdir/teamMemPaths.js'
import {createAutoDreamReadFence287} from '../../constants/systemComposerMemory287.js'
import {oc as hasComplianceTaint} from '../../vendor/official-files-api/taints.js'
import {createDreamToolDenialFeedback287} from './dreamToolDenialFeedback.js'
import {settleDreamWrites287} from './officialDreamFeedback287/native.js'
import {createAutoDreamCanUseTool,isDreamMemoryMarkdownPath} from './autoDreamToolPolicy.js'
import {readLastConsolidatedAt,listSessionsTouchedSince,tryAcquireConsolidationLock,rollbackConsolidationLock,isDreamStorageProjectKey287} from './consolidationLock.js'
import {buildConsolidationPrompt} from './consolidationPrompt.js'
import {isAutoDreamEnabled} from './config.js'
import {createDreamRunner287,type DreamRunner287,type DreamRunnerPorts287,type DreamRunnerContext287} from './officialDreamRunner287/native.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {REPLHookContext} from '../../utils/hooks/postSamplingHooks.js'
import type {ToolUseContext} from '../../Tool.js'

let runner:DreamRunner287|undefined
let readFence:(()=>boolean)|undefined
// Correlation is owned by each fork's permission callback, not another task,
// authorization or session cache. The original Muo still keeps its N/F/K/X/j.
const permittedWrites=new WeakMap<CanUseToolFn,Map<string,string>>()
async function runDreamFork287(args:Parameters<typeof runForkedAgent>[0]) {
 const ctx=args.cacheSafeParams.toolUseContext,registry=getAgentTaskRegistry287(ctx)
 const controller=args.overrides?.abortController
 const task=Object.values(registry.all()).find(value=>isDreamTask(value)&&value.abortController===controller)
 const writes=permittedWrites.get(args.canUseTool)??new Map<string,string>()
 const denied=createDreamToolDenialFeedback287(),failed=new Set<string>()
 let completed=false,apiError=false
 try {
  const result=await runForkedAgent({...args,
   canUseTool:async(...params)=>{const decision=await args.canUseTool(...params);denied.recordDecision(params[4],decision);return decision},
   onMessage:message=>{const prepared=denied.prepareMessage(message);getDreamRunner287().collectFailures(prepared,failed);if(prepared.type==='assistant')apiError=prepared.isApiErrorMessage===true;args.onMessage?.(prepared)},
  })
  completed=true
  return result
 } finally {
  if(task&&isDreamTask(task))settleDreamTaskWrites287(task.id,settleDreamWrites287(writes,failed,completed&&!controller?.signal.aborted&&!apiError),ctx.setAppStateForTasks??ctx.setAppState)
  permittedWrites.delete(args.canUseTool)
 }
}
export function createDreamRunnerProductionPorts287():DreamRunnerPorts287 {
 const tasks=getDreamTaskHelpers287()
 return {
  k:getFeatureValue_CACHED_MAY_BE_STALE,pr:()=>getExecutionSession287().surfaceCapabilities.caps().remote,
  qd:isAutoMemoryEnabled,a3:()=>{readFence??=createAutoDreamReadFence287();return readFence()},$ze:isAutoDreamEnabled,
  Wze:readLastConsolidatedAt,dpo:listSessionsTouchedSince,cpo:tryAcquireConsolidationLock,Rrt:rollbackConsolidationLock,
  l:errorMessage,t:logForDebugging,q:getSessionId,Xs:getAutoMemPath,Nt:createSystemMessage,
  // Automatic product telemetry is an intentional frozen local exclusion.
  i(){},S:value=>value,c:value=>value,OL:error=>error.name,z1:isTeamMemoryEnabled,
  te:tasks.register,oe:tasks.complete,se:tasks.fail,Y:tasks.isDreamTask,re:tasks.addTurn,
  qh:getProjectDir,Ee:getOriginalCwd,ee:buildConsolidationPrompt,vhn:()=>getRuntimeMemo287().sharedMemoryServedViaTools??false,
  IC:runDreamFork287,Re:createUserMessage,aq:createCacheSafeParams,
  PHn(root,_kept,options){
   const writes=new Map<string,string>()
   const policy=createAutoDreamCanUseTool(root,undefined,(file,id)=>{options.onWriteAllowed(file,id);writes.set(id,file)})
   permittedWrites.set(policy,writes);return policy
  },
  Ot:'Edit',Sn:'Write',J_:['Bash','PowerShell'],Grt:isDreamMemoryMarkdownPath,
  Aln:createMemorySavedMessage,OXt:publishBackgroundMemoryUpdate287,
  he:readdir,ge:join,G:(values,predicate)=>values.filter(predicate).length,Ht:isENOENT,ae:basename,W:dirname,Bd:getProjectsDir,Xn:isDreamStorageProjectKey287,
  a:authEnvironment,He:getAPIProvider,ol:hasComplianceTaint,
 }
}
export function getDreamRunner287():DreamRunner287 {return runner??=createDreamRunner287(createDreamRunnerProductionPorts287())}
export function initAutoDream(host:object=getExecutionSession287().host):void {getDreamRunner287().init(host)}
export function toDreamRunnerContext287(context:REPLHookContext):DreamRunnerContext287 {
 // Fork/tool consumers spread this view. Keep context fields enumerable while
 // retaining the same state setters, file cache, abort controller and owners.
 const toolUseContext={...context.toolUseContext,session:getExecutionSession287(),taskRegistry:getAgentTaskRegistry287(context.toolUseContext)}
 return {...context,toolUseContext}
}
export async function executeAutoDream(context:REPLHookContext,appendSystemMessage?:NonNullable<ToolUseContext['appendSystemMessage']>):Promise<void> {
 await getDreamRunner287().execute(toDreamRunnerContext287(context),appendSystemMessage)
}
