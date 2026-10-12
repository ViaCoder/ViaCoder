import * as z from 'zod/v4'
import '../../tools/GetTaskTool/ownerMethods287.js'
import type {ToolUseContext} from '../../Tool.js'
import type {SetAppState} from '../../Task.js'
import type {ShellCommand} from '../ShellCommand.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {LocalShellTaskState} from '../../tasks/LocalShellTask/guards.js'
import {isLocalShellTask} from '../../tasks/LocalShellTask/guards.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {getToolState287} from '../toolState287.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {agentPromptState287} from '../../services/context/agentPromptState287.js'
import {authEnvironment} from '../authEnvironment.js'
import {getAgentContext} from '../agentContext.js'
import {getTaskAgentContext287} from '../../tools/GetTaskTool/agentContext287.js'
import {getCommandQueue,enqueuePendingNotification,removeByFilter} from '../messageQueueManager.js'
import {getTaskOutputTail287} from './diskOutput.js'
import {updateTaskState} from './framework.js'
import {createSessionNativeHost287,getTaskDebug287,taskFileNative287} from '../../tools/GetTaskTool/nativeHost.js'
import type {MutableRegistry287,Notification287,NotificationQueue287} from '../../tools/GetTaskTool/sessionNative.js'
import {createTaskRegistration287,type TaskRegistration287,type TaskRegistrationPorts287,type ToolContext287,type TaskResult287,type ToolState287} from '../../tools/officialTaskRegistration287/native.js'

export const getTaskProcess287:TaskRegistrationPorts287['process'] & Pick<NodeJS.Process,'uptime'>={
  get argv(){return process.argv},uptime:()=>process.uptime(),
  env:{
    get CLAUDE_CODE_SIMPLE(){return process.env.CLAUDE_CODE_SIMPLE},
    get BASH_DEFAULT_TIMEOUT_MS(){return process.env.BASH_DEFAULT_TIMEOUT_MS},
    get BASH_MAX_TIMEOUT_MS(){return process.env.BASH_MAX_TIMEOUT_MS},
  },
}

function mainAgent(execution:ExecutionSession287):string {
  return execution.identity.mainAgentId(execution.id)
}

interface Delivery {command:QueuedCommand;taskId:string;agentId?:string;snapshot:TaskResult287;mainAgentId:string}
const owners=new WeakMap<ExecutionSession287['host'],GetTaskOwner287>()
const featureOwners=new WeakMap<ExecutionSession287,{pinnedFeatureValues?:Map<string,unknown>}>()
export function getGetTaskFeatureState287(execution=getExecutionSession287()) {
 let state=featureOwners.get(execution);if(!state){state={};featureOwners.set(execution,state)}return state
}
export interface GetTaskOwner287 {
  readonly host:ExecutionSession287['host']
  readonly session:InstanceType<ReturnType<typeof createSessionNativeHost287>['Session']>
  readonly native:ReturnType<typeof createSessionNativeHost287>
  readonly registration:TaskRegistration287
  readonly toolState:ToolState287
  readonly deliveries:WeakMap<QueuedCommand,Delivery>
}
/** Original rr() uses zO.of(U().host): zh is host-owned, not session-owned. */
export function getGetTaskOwner287(execution=getExecutionSession287()):GetTaskOwner287 {
  const existing=owners.get(execution.host);if(existing)return existing
  const deliveries=new WeakMap<QueuedCommand,Delivery>()
  const commands=new WeakMap<Notification287,QueuedCommand>()
  const queue:NotificationQueue287={
    getCommandQueue(){return getCommandQueue().flatMap(command=>{
      const delivery=deliveries.get(command);if(!delivery)return []
      const view:Notification287={mode:command.mode,taskId:delivery.taskId,
        agentId:delivery.agentId??delivery.mainAgentId,taskDelivery:delivery.snapshot}
      commands.set(view,command);return [view]
    })},
    consume(views){const selected=new Set(views.map(view=>commands.get(view)));removeByFilter(command=>selected.has(command))},
    enqueuePendingNotification(view){
      const command=commands.get(view);if(!command)throw Error('Unknown GetTask notification identity')
      const delivery=deliveries.get(command);if(!delivery)throw Error('Missing GetTask delivery owner')
      enqueueOwnedNotification(delivery)
    },
  }
  function enqueueOwnedNotification(delivery:Delivery):void {
    enqueuePendingNotification(delivery.command)
    // The production queue copies its input. Bind the actual inserted object,
    // not the caller's object and not a task-id substring of arbitrary text.
    const inserted=getCommandQueue().at(-1)
    if(!inserted)throw Error('GetTask notification was not inserted')
    deliveries.set(inserted,{...delivery,command:inserted})
  }
  const native=createSessionNativeHost287({mainAgentId:()=>mainAgent(getExecutionSession287()),notificationQueue:()=>queue})
  const session=taskFileNative287.SessionSlot.of(execution.host)
  const toolState:ToolState287=getToolState287(execution)
  const registration=createTaskRegistration287({
    registerTool:definition=>definition,
    stringSchema:z.string,objectSchema:z.object,strictObjectSchema:z.strictObject,
    discriminatedUnionSchema:z.discriminatedUnion,arraySchema:z.array,literalSchema:z.literal,
    booleanSchema:z.boolean,numberSchema:z.number,
    taskSession:()=>session,featureState:()=>getGetTaskFeatureState287(),
    featureValue:(name,fallback)=>{
      const {getFeatureValue_CACHED_MAY_BE_STALE}=require('../../services/analytics/growthbook.js') as typeof import('../../services/analytics/growthbook.js')
      return getFeatureValue_CACHED_MAY_BE_STALE(name,fallback)
    },
    backgroundPolicy:()=>agentPromptState287.backgroundPolicy(),environment:authEnvironment,process:getTaskProcess287,
    executionContext:()=>({host:{launchOptions:execution.host.launchOptions}}),
    agentContext:getAgentContext,
    async persistedLookup(id,agentId,state){
      if(!state.get(registration.knownTasks).find(id,agentId))return undefined
      throw Error('GetTask attached-machine Ggo transport/producer is not connected')
    },
    readOutputTail:getTaskOutputTail287,debug:getTaskDebug287,
    // The existing telemetry cancellation boundary is unchanged.
    telemetry(){},
  })
  const owner:GetTaskOwner287={host:execution.host,session,native,registration,toolState,deliveries}
  owners.set(execution.host,owner);return owner
}

/** Exact original Za policy closure, backed by its feature/environment ports. */
export function isBackgroundTasksDisabled287(execution=getExecutionSession287()):boolean {
 return getGetTaskOwner287(execution).registration.isBackgroundTasksDisabled()
}

export function getTaskContext287(context:Pick<ToolUseContext,'agentId'|'getAppState'|'setAppState'|'setAppStateForTasks'>,owner=getGetTaskOwner287()):ToolContext287 & {taskRegistry:MutableRegistry287} {
  const setter=context.setAppStateForTasks??context.setAppState
  const taskRegistry:MutableRegistry287={
    get(id){const task=context.getAppState().tasks[id];return isLocalShellTask(task)?task:undefined},
    update(id,updater){updateTaskState(id,setter,updater)},
  }
  return {agentId:context.agentId,agentContext:getTaskAgentContext287(),
    taskRegistry,toolState:owner.toolState}
}

/** Captured by the producer before any await so an unrelated execution scope
 * cannot claim a finishing command. Notification claim/gate matches xqe. */
export interface GetTaskProducer287 {owner:GetTaskOwner287;execution:ExecutionSession287}
export function captureGetTaskProducer287():GetTaskProducer287 {const execution=getExecutionSession287();return {execution,owner:getGetTaskOwner287(execution)}}
const shellProducers=new WeakMap<ShellCommand,GetTaskProducer287>()
/** Preserve the origin even if a foreground command is backgrounded or killed
 * from a later execution scope. No parallel task registry or hand counters. */
export function getTaskShellProducer287(shell:ShellCommand):GetTaskProducer287 {
  let producer=shellProducers.get(shell)
  if(!producer){producer=captureGetTaskProducer287();shellProducers.set(shell,producer)}
  return producer
}
export interface ShellDelivery287 {claimed:boolean;snapshot?:TaskResult287}
export function rememberShellCompletion287(task:LocalShellTaskState,producer:GetTaskProducer287,setAppState:SetAppState):Promise<ShellDelivery287> {
 return runWithExecutionSession287(producer.execution,async()=>{
  const {owner}=producer
  const claim=owner.native.claimShellNotification(task.id,{update(id,updater){updateTaskState(id,setAppState,updater)}})
  if(!claim.claimed)return {claimed:false}
  if(!isLocalShellTask(claim.task))throw Error('Claimed GetTask completion is not a local shell task')
  task=claim.task
  if(task.kind==='monitor'||!owner.registration.enabled())return {claimed:true}
  if(task.status!=='completed'&&task.status!=='failed'&&task.status!=='killed')return {claimed:true}
  let output
  if(task.status!=='killed')try{output=await getTaskOutputTail287(task.id,48000)}catch(error){getTaskDebug287(`GetTask: failed to read output for task ${task.id}: ${String(error)}`)}
  const snapshot=owner.native.snapshot({taskId:task.id,outcome:task.status,exitCode:task.result?.code,
    startTime:task.startTime,endTime:task.endTime??task.startTime,outputFile:task.outputFile,output})
  owner.session.rememberBashTaskSnapshot(task.id,snapshot,task.agentId)
  owner.session.withdrawShellNotification??=(id,agentId,registry)=>{
    if(!('update' in registry)||typeof registry.update!=='function')throw Error('GetTask mutable registry missing')
    // Original Cmr only calls update for agent delivery. A precise shape check
    // bridges the original read-only public declaration to the real registry.
    return owner.native.withdraw(id,agentId,registry as MutableRegistry287)
  }
  return {claimed:true,snapshot}
 })
}
export function enqueueGetTaskShellNotification287(command:QueuedCommand,taskId:string,snapshot:TaskResult287|undefined,producer:GetTaskProducer287):void {
  const {owner}=producer
  enqueuePendingNotification(command)
  if(snapshot){const inserted=getCommandQueue().at(-1);if(!inserted)throw Error('Missing inserted shell notification')
    owner.deliveries.set(inserted,{command:inserted,taskId,agentId:command.agentId,snapshot,mainAgentId:mainAgent(producer.execution)})}
}
export function rememberShellKill287(task:LocalShellTaskState,producer:GetTaskProducer287,endTime:number):void {
 const {owner}=producer
 runWithExecutionSession287(producer.execution,()=>{
  if(task.status!=='running'||task.notified||task.kind==='monitor'||!owner.registration.enabled())return
  owner.session.rememberBashTaskSnapshot(task.id,owner.native.snapshot({taskId:task.id,outcome:'killed',
    startTime:task.startTime,endTime,outputFile:task.outputFile}),task.agentId)
 })
}
/** Lifecycle integration is explicit; /clear must not silently instantiate a
 * second registry while background processes still belong to this root. */
export function resetGetTaskSession287(execution=getExecutionSession287()):void {
  owners.get(execution.host)?.session.reset()
}
