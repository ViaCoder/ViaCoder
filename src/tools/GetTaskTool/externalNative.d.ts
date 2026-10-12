import type {TaskState} from '../../tasks/types.js'
import type {QueuedCommand} from '../../types/textInputTypes.js'
import type {SdkEvent} from '../../utils/sdkEventQueue.js'
import type {AgentContext287} from '../officialTaskRegistration287/native.js'
import type {NativeTaskSession287} from './sessionNative.js'

export interface ExternalRegistry287 {
  all():Record<string,TaskState>
  get(id:string):TaskState|undefined
  update(id:string,updater:(task:TaskState)=>TaskState):void
}
export interface GetTaskExternalPorts287 {
  taskSession():NativeTaskSession287
  enabled():boolean
  enqueueHostEvent(event:Extract<SdkEvent,{subtype:'task_notification'}>):void
  appendOutput(id:string,content:string):void
  evictOutput(id:string):void
  outputPath(id:string):string
  debug(message:string):void
  logError(error:Error):void
  killTask(id:string,registry:ExternalRegistry287):void
  dequeueForAgent(predicate:(command:QueuedCommand)=>boolean):void
}
export interface GetTaskExternalNative287 {
  emitTerminal(id:string,status:'completed'|'failed'|'stopped',details?:{toolUseId?:string;summary?:string;ambient?:boolean;outputFile?:string}):void
  killShell(id:string,registry:Pick<ExternalRegistry287,'update'>):void
  killForAgent(agentId:string,registry:ExternalRegistry287):void
  synchronousAgent(context:AgentContext287|undefined):boolean
  closeShells(registry:ExternalRegistry287):void
  shouldCloseShells(context:{shuttingDown:boolean;remoteTransport:boolean}):boolean
}
export function createGetTaskExternalNative287(ports:GetTaskExternalPorts287):GetTaskExternalNative287
