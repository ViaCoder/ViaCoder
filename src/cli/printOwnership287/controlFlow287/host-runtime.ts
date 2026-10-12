/** Candidate host projections for the pinned official 2.1.287 control handlers.
 * Call once in the existing print() IO scope; no dispatcher, queue, or executor is created here.
 */
import {flushSessionStorage} from '../../../utils/sessionStorage.js'
import type {Message} from '../../../types/message.js'
import type {QueuedCommand} from '../../../types/textInputTypes.js'
import type {PrintDrain287} from '../../../tools/GetTaskTool/printLifecycleNative.js'

export interface OfficialControlQueue287 {
  getCommandQueue():QueuedCommand[]
  getCommandQueueSnapshot():readonly QueuedCommand[]
  getDrainableMainThreadQueueLength():number
  pollEventAdmissionsPending():number
  beginPollEventAdmission():void
  endPollEventAdmission():void
  enqueuePollEvent(event:unknown):Promise<unknown>
  enqueuePollEventGroup(events:readonly unknown[]):Promise<unknown>
  enqueue(command:QueuedCommand):unknown
}
export interface OfficialPollHost287 {
  session:unknown; sessionHooks:unknown; engineState:()=>unknown
  messageQueue:OfficialControlQueue287; ingressTail:{current:Promise<unknown>}
  stopped:AbortSignal; storageV5:unknown; credentials:unknown
  flushSessionStorage:()=>Promise<void>; redactsPersistedLane:()=>boolean
}
export interface OfficialHandoffHost287 {
  admission:{admitted:boolean;reason:string;tools?:unknown[]}
  tools:()=>readonly unknown[]; toolAliases:()=>unknown; messages:()=>Message[]
  handledToolUseIds:Set<string>; recoveredToolUseIds:Set<string>
  messageQueue:OfficialControlQueue287; drain:PrintDrain287
  kick:()=>void; redactsPersistedLane:()=>boolean; stopUnabortedWork:()=>void
}
export interface OfficialRewindLexical287 {
  Ct:Message[]; Q:OfficialControlQueue287; qe:PrintDrain287; e:unknown
  r:{sessionState:{getState():string};flushInternalEvents():Promise<void>}
  I:{storageV5:unknown;credentials:unknown;toolAliases:unknown}
  v:()=>unknown; R:(update:(state:unknown)=>unknown)=>void
  Gm:(get:()=>unknown,set:(update:(state:unknown)=>unknown)=>void)=>unknown
  Gn:unknown; Sn:unknown; de:unknown; Yt:unknown
  Ei:unknown; Gr:()=>void; qr:(messages:Message[])=>unknown
  Qs:()=>{taskRegistry:unknown;setAppState:(update:(state:unknown)=>unknown)=>void;storageV5?:unknown}
  Ws:{arm():void;disarm(cause:string):void}
  KS:{of(session:unknown):{stopRunning():void}}
  [key:string]:unknown
}

/** Exact hI-owned cells. Fb and pollStopped287 each have one declaration per
 * print host; Fb is the original ingress promise tail, not a message queue.
 */
export function createOfficialPrintControlHosts287(input:{
  session:unknown; sessionHooks:unknown; getAppState:()=>unknown
  messageQueue:OfficialControlQueue287; options:{storageV5?:unknown;credentials?:unknown;toolAliases?:unknown;turnHandoffAdmission?:{admitted:boolean;reason:string;tools:unknown[]}}
  redactsPersistedLane:()=>boolean; tools:()=>readonly unknown[]; messages:()=>Message[]
  handledToolUseIds:Set<string>; recoveredToolUseIds:Set<string>
  drain:PrintDrain287; kick:()=>void; stopUnabortedWork:()=>void
}) {
  const Fb:{current:Promise<unknown>}={current:Promise.resolve()}
  const pollStopped287=new AbortController().signal
  const Ub:OfficialPollHost287={
    session:input.session,sessionHooks:input.sessionHooks,engineState:input.getAppState,
    messageQueue:input.messageQueue,ingressTail:Fb,stopped:pollStopped287,
    storageV5:input.options.storageV5,credentials:input.options.credentials,
    flushSessionStorage,redactsPersistedLane:input.redactsPersistedLane,
  }
  const Qe:OfficialHandoffHost287={
    admission:input.options.turnHandoffAdmission??{admitted:false,reason:'not_managed_cloud_worker'},
    tools:input.tools,toolAliases:()=>input.options.toolAliases,messages:input.messages,
    handledToolUseIds:input.handledToolUseIds,recoveredToolUseIds:input.recoveredToolUseIds,
    messageQueue:input.messageQueue,drain:input.drain,kick:input.kick,
    redactsPersistedLane:input.redactsPersistedLane,stopUnabortedWork:input.stopUnabortedWork,
  }
  return {Fb,Ub,Qe}
}
