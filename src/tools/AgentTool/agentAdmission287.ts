import type {AppState} from '../../state/AppState.js'
import type {ToolUseContext} from '../../Tool.js'
import {getTotalCostUSD} from '../../bootstrap/state.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {AbortError,TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../utils/errors.js'
import {subagentStats287} from './subagentStats287.js'
import {createAgentAdmissionNative287,createTaskRegistryNative287,type AgentTaskRegistry287,type AgentAdmissionContext287} from './agentAdmissionNative287.js'
import type {AgentTranscript287} from './agentAdmissionNative287.js'
import type {Message} from '../../types/message.js'
type Setter=(updater:(state:AppState)=>AppState)=>void
/** Read/write ports of the hot caller's existing YJ/timing owner. No transcript
 * is retained here; update owns invoking the original updater exactly once. */
export interface MainAgentTranscriptOwner287 {
 id():string
 read():AgentTranscript287|undefined
 update(updater:(transcript:AgentTranscript287)=>AgentTranscript287):void
 /** Atomic main-ID writer inside an actual AppState updater. It returns IDs
  * in that same next state; never calls a nested AppState setter. */
 project?(state:AppState,transcript:AgentTranscript287):AppState
}
export interface AgentTaskRegistryWithMainTranscript287 extends AgentTaskRegistry287 {
 bindMainTranscriptOwner287(owner:MainAgentTranscriptOwner287):()=>void
 /** Operation-local ABI view for original qPe/SKn store writers. The virtual
  * transcripts property is never committed to the actual AppState. */
 projectAppStateTranscriptUpdate287(previous:AppState,updater:(state:AgentTranscriptAppStateView287)=>AppState&{transcripts?:Record<string,AgentTranscript287>}):AppState
}
export type AgentTranscriptAppStateView287=AppState&{transcripts:Record<string,AgentTranscript287>}
type TranscriptTask287=Extract<AppState['tasks'][string],{type:'local_agent'|'in_process_teammate'}>&Pick<AgentTranscript287,'turnStartTime'|'totalPausedMs'>
function readTaskTranscript287(task:TranscriptTask287):AgentTranscript287 {
 return {messages:task.messages??[],inProgressToolUseIDs:task.inProgressToolUseIDs??new Set<string>(),turnStartTime:task.turnStartTime,totalPausedMs:task.totalPausedMs,progress:task.progress}
}
function writeTaskTranscript287<T extends TranscriptTask287>(task:T,next:AgentTranscript287):T {
 return {...task,messages:next.messages as Message[],inProgressToolUseIDs:next.inProgressToolUseIDs,turnStartTime:next.turnStartTime,totalPausedMs:next.totalPausedMs,progress:next.progress}
}
// Registry handles own no task map/count: every method uses the same root store.
const registries=new WeakMap<Setter,AgentTaskRegistryWithMainTranscript287>()
/** C keeps Agent history on the task itself, not a second transcripts map.
 * Install this projection on the same original Gm handle before publication.
 * The main-thread transcript is supplied by the hot caller's actual YJ owner. */
function installAgentTranscriptProjection287(registry:AgentTaskRegistryWithMainTranscript287):void {
 let mainOwner:MainAgentTranscriptOwner287|undefined
 registry.bindMainTranscriptOwner287=owner=>{
  mainOwner=owner
  return ()=>{if(mainOwner===owner)mainOwner=undefined}
 }
 registry.projectAppStateTranscriptUpdate287=(previous,updater)=>{
  // A single original updater sees its own immutable operation snapshot. This
  // temporary source ABI record owns no history/cache and is never persisted.
  const transcripts:Record<string,AgentTranscript287>={}
  for(const [id,task]of Object.entries(previous.tasks)){
   if(task.type==='local_agent'||task.type==='in_process_teammate')transcripts[id]=readTaskTranscript287(task)
  }
  if(mainOwner){const main=mainOwner.read();if(main)transcripts[mainOwner.id()]=main}
  const view:AgentTranscriptAppStateView287={...previous,transcripts},updated=updater(view)
  if(updated===view)return previous
  const {transcripts:written,...sourceNext}=updated
  let next:AppState=sourceNext
  // A real C root replacement carries no source transcript operation.
  if(written===undefined)return next
  let tasks=next.tasks
  for(const [id,transcript]of Object.entries(written)){
   if(transcript===transcripts[id])continue
   if(mainOwner?.id()===id){
    if(!mainOwner.project)throw Error('Main transcript AppState writer requires its actual atomic project port')
    next=mainOwner.project({...next,tasks},transcript);tasks=next.tasks;continue
   }
   const task=tasks[id]
   if(!task||(task.type!=='local_agent'&&task.type!=='in_process_teammate'))throw Error('Task transcript has no actual Agent owner: '+id)
   tasks={...tasks,[id]:writeTaskTranscript287(task,transcript)}
  }
  return {...next,tasks}
 }
 registry.getTranscript=id=>{
  if(mainOwner?.id()===id)return mainOwner.read()
  const task=registry.get(id)
  if(!task||(task.type!=='local_agent'&&task.type!=='in_process_teammate'))return undefined
  return readTaskTranscript287(task)
 }
 registry.updateTranscript=(id,updater)=>{
  if(mainOwner?.id()===id){mainOwner.update(updater);return}
  const task=registry.get(id)
  if(!task||(task.type!=='local_agent'&&task.type!=='in_process_teammate'))
   throw Error('Task transcript has no actual Agent owner: '+id)
  registry.update<typeof task>(id,current=>{
   const previous=readTaskTranscript287(current)
   const next=updater(previous)
   if(next===previous)return current
   return writeTaskTranscript287(current,next)
  })
 }
}
export function getAgentTaskRegistry287(context:Pick<ToolUseContext,'getAppState'|'setAppState'|'setAppStateForTasks'>):AgentTaskRegistryWithMainTranscript287 {
 const setter=context.setAppStateForTasks??context.setAppState
 let registry=registries.get(setter)
 if(!registry){const {registerTask,updateTaskState,evictTerminalTask,applyTaskOffsetsAndEvictions}=require('../../utils/task/framework.js') as typeof import('../../utils/task/framework.js');const host=getExecutionSession287().host;registry=createTaskRegistryNative287({getState:context.getAppState,setState:(updater)=>setter(previous=>{if(!registry)throw Error('Original Gm writer used before publication');return registry.projectAppStateTranscriptUpdate287(previous,updater)}),en:registerTask,Jt:updateTaskState,tn:evictTerminalTask,nn:applyTaskOffsetsAndEvictions,rr:()=>{const {taskFileNative287}=require('../GetTaskTool/nativeHost.js') as typeof import('../GetTaskTool/nativeHost.js');return taskFileNative287.SessionSlot.of(host)}}) as AgentTaskRegistryWithMainTranscript287;installAgentTranscriptProjection287(registry);registries.set(setter,registry)}
 return registry
}
export const agentAdmission287=createAgentAdmissionNative287({a:authEnvironment,zle:getTotalCostUSD,k:getFeatureValue_CACHED_MAY_BE_STALE,
 jC:(enabled,model)=>{if(enabled!==true)return false;const {createActualModelSelectorPorts287}=require('../../utils/model/officialModelPicker287/selector.js') as typeof import('../../utils/model/officialModelPicker287/selector.js');return (createActualModelSelectorPorts287().jC as (e:boolean,m:string)=>boolean)(enabled,model)},
 IMe:{of:session=>subagentStats287.registry.of(session)},m(){},Ye:AbortError,j:TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS})
export function captureAgentAdmission287(context:ToolUseContext):AgentAdmissionContext287 {
 return {abortController:context.abortController,options:context.options,session:getExecutionSession287(),taskRegistry:getAgentTaskRegistry287(context),getAppState:context.getAppState,rootToolSurface:{mainLoopModel:context.options.mainLoopModel}}
}
