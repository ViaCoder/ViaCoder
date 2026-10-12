export type OfficialBindingName287=string
export type PrintControlResponse287={subtype:'success';response?:Record<string,unknown>}|{subtype:'error';error:string}
import type {SDKControlRequest,SDKControlRequestInner} from '../../../entrypoints/sdk/controlTypes.js'
/** These two internal ingress branches have no public schema in the fixed package.
 * Keep their envelope opaque; the complete original handlers validate the payload. */
export type ControlFrame287=SDKControlRequest|(Omit<SDKControlRequest,'request'>&{request:{subtype:'poll_event'|'rewind_conversation';[key:string]:unknown}})
import type {Message} from '../../../types/message.js'
import type {QueuedCommand} from '../../../types/textInputTypes.js'
import type {PrintDrain287} from '../../../tools/GetTaskTool/printLifecycleNative.js'
export interface PrintControlQueue287 {
 getCommandQueue():QueuedCommand[];getCommandQueueSnapshot():readonly QueuedCommand[]
 getDrainableMainThreadQueueLength():number;pollEventAdmissionsPending():number
 beginPollEventAdmission():void;endPollEventAdmission():void
 enqueuePollEvent(event:unknown):Promise<unknown>;enqueuePollEventGroup(events:readonly unknown[]):Promise<unknown>
 enqueue(command:QueuedCommand):unknown
}
export interface PollEventUb287 {
 session:unknown;sessionHooks:unknown;engineState:()=>unknown;messageQueue:PrintControlQueue287
 ingressTail:{current:Promise<unknown>};stopped:AbortSignal;storageV5:unknown;credentials:unknown
 flushSessionStorage:()=>Promise<void>;redactsPersistedLane:()=>boolean
}
export interface TurnHandoffQe287 {
 admission:{admitted:boolean;reason:string;tools?:unknown[]};tools:()=>readonly unknown[];toolAliases:()=>unknown
 messages:()=>Message[];handledToolUseIds:Set<string>;recoveredToolUseIds:Set<string>
 messageQueue:PrintControlQueue287;drain:PrintDrain287;kick:()=>void
 redactsPersistedLane:()=>boolean;stopUnabortedWork:()=>void
}
export interface PrintControlFlow287 {
 pollEvent(request:Record<string,unknown>,host:PollEventUb287&{reply(response:PrintControlResponse287):void}):void
 rewindConversation(frame:ControlFrame287):Promise<void>
 turnHandoff(request:Extract<SDKControlRequestInner,{subtype:'turn_handoff'}>,host:TurnHandoffQe287,reply:(response:PrintControlResponse287)=>void):unknown
 sourceSha256:string
}
