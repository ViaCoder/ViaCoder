import type {constants} from 'node:fs'
import type {lstat,open} from 'node:fs/promises'
import type {TaskState} from '../../tasks/types.js'
import type {TaskSession287,TaskResult287,OutputTail287,TaskRegistry287} from '../officialTaskRegistration287/native.js'
export interface NativeTaskSession287 extends TaskSession287 {
  rememberBashTaskSnapshot(id:string,result:TaskResult287,agentId?:string):void
  bashTaskGetCounts:Map<string,number>
  bashTaskGetsByResponse:Map<string,Map<string,{count:number;statusKey:string}>>
  remoteSessionLogs:Map<string,unknown>
  terminalEmitClaims:Set<string>
  agentStrandedMessages:{subscribe(listener:(id:string)=>void):()=>void;emit(id:string):void;clear():void}
  taskEvicted:{subscribe(listener:(id:string)=>void):()=>void;emit(id:string):void;clear():void}
  pendingOutputOps:Set<Promise<unknown>>
  diskOutputs:Map<string,{cancel():void}>
  reset():void
  drainDiskOutputs():Promise<void>
}
export interface SnapshotInput287 {
  taskId:string;outcome:'completed'|'failed'|'killed';exitCode?:number
  startTime:number;endTime:number;outputFile:string;output?:OutputTail287
  stopCause?:'memory_pressure'|'deadline'
}
export type MutableTask287=TaskState & {keepaliveReasons?:Set<string>}
export interface MutableRegistry287 extends TaskRegistry287 {
  update(id:string,updater:(task:MutableTask287)=>MutableTask287):void
}
export interface Notification287 {
  mode:string;taskId?:string;agentId?:string;taskDelivery?:TaskResult287
}
export interface NotificationQueue287 {
  getCommandQueue():Notification287[]
  consume(commands:Notification287[],options:{reason:'delivered_as_tool_result'}):void
  enqueuePendingNotification(command:Notification287):void
}
export interface SessionNativePorts287 {
  process:Pick<NodeJS.Process,'uptime'>
  backgroundPolicy():{backgroundTasksDisabled?:boolean}
  featureValue(name:string,fallback:boolean):unknown
  mainAgentId():string
  notificationQueue():NotificationQueue287
  lstat:typeof lstat;open:typeof open;fsConstants:typeof constants
  debug(message:string,options?:{level?:string}):void
  logError(error:Error):void
  outputPath(id:string):string
}
export interface SessionNative287 {
  Session:new()=>NativeTaskSession287
  SessionSlot:{of(host:object):NativeTaskSession287}
  backgroundAnnouncement(id:string,message:string,options?:{backgroundedByUser?:boolean;ending?:'final_response'|'session'}):string
  backgroundText(input:{backgroundTaskId:string;outputPath:string;readToolName:string;backgroundedByUser?:boolean;backgroundedToDeliverMessage?:boolean;backgroundedByTurnAbort?:boolean;timedOutAfterMs?:number;reapedAtFinalResponse?:boolean}):string
  snapshot(input:SnapshotInput287):TaskResult287
  readTail(id:string,maxBytes:number):Promise<OutputTail287>
  withdraw(id:string,agentId:string|undefined,registry:MutableRegistry287):(()=>void)|undefined
  claimShellNotification(id:string,registry:Pick<MutableRegistry287,'update'>,options?:{skipStampIfRunning?:boolean}):{claimed:boolean;task:MutableTask287|undefined}
}
export function createGetTaskSessionNative287(ports:SessionNativePorts287):SessionNative287
