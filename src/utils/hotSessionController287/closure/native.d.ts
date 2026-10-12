import type {AppState} from '../../../state/AppStateStore.js'
import type {Message} from '../../../types/message.js'
import type {ToolUseContext} from '../../../Tool.js'

/** Original Xoo snapshot. size is bytes, not a message count or UTF-16 offset. */
export interface HeadlessTranscriptAnchor287 {path:string;size:number}
export interface HeadlessArtifactResumeInput287 {
 initialMessages:Message[]
 hostInitialized:Promise<unknown>
 getAppState():AppState
 /** Original private storage service is passed through, never constructed here. */
 storageV5?:unknown
 transcriptAnchor?:HeadlessTranscriptAnchor287
 buildContext():ToolUseContext
 /** Internal messages; the print caller applies its existing qs SDK projection. */
 emit(messages:Message[]):void
 deps?:{
  publishContext?:string
  hostOwned?:()=>boolean
  warmFlags?:()=>Promise<unknown>
  egressAllowed?:(tools:ToolUseContext['options']['tools'],permissionContext:AppState['toolPermissionContext'])=>Promise<boolean>
  reprobeHeldAfterMs?:number
  commentsGateOpen?:()=>boolean
  rereadRecords?:(baseline:Map<string,unknown>)=>Promise<Map<string,unknown>|null>
  orchestration?:Readonly<Record<string,unknown>>
 }
}
export interface HeadlessArtifactSourceModule287 extends Readonly<Record<string,unknown>> {
 Joo(input:HeadlessArtifactResumeInput287):void
 Xoo(sessionId:string):Promise<HeadlessTranscriptAnchor287|undefined>
}
export interface HotSessionClosure287 extends Record<string,unknown> {
 sourceModule(file:'chunk-n2zepamy.js'):Readonly<HeadlessArtifactSourceModule287>
 sourceModule(file:string):Readonly<Record<string,unknown>>|undefined
}
export function createHotSessionClosure287(ports:Record<string,unknown>):HotSessionClosure287
