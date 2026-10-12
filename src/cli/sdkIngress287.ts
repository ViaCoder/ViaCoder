import {getPrintHostSource287} from './printOwnership287/publicHostRuntime287.js'
import type {Message} from '../types/message.js'

/** Values supplied by this invocation; never a prompt/default policy owner. */
export interface SdkPromptIngress287 {
  planModeInstructions?:string
  systemPromptSnapshot?:boolean
  appendSubagentSystemPrompt?:string
  excludeDynamicSections?:boolean
}
export interface SdkPrintIngress287 extends SdkPromptIngress287 {
  permissionPrompts?:'none'
  resumeDropsTurn?:string
  sessionMirror?:boolean
}
type InitializeLaunch287={kind:'absent'}|{kind:'violation';message:string}|{
  kind:'applied';pluginDirs:string[];pluginDirsNoMcp:string[]
}
function source<T>(file:string,name:string):T {
  return getPrintHostSource287(file,name) as T
}
const launchFile='chunk-dgp2yyqt.js'
export function startSdkInitializeIngress287(command:{getOptionValue(name:string):unknown},isRoot:boolean):void {
  if(isRoot&&command.getOptionValue('awaitInitialize')===true&&
    command.getOptionValue('inputFormat')==='stream-json'&&
    command.getOptionValue('sdkUrl')===undefined&&!process.stdin.isTTY) {
    source<(read:()=>AsyncGenerator<string>)=>void>(launchFile,'Jro')(
      source<()=>AsyncGenerator<string>>(launchFile,'Lar'))
  }
}
export function awaitSdkInitializeIngress287():Promise<InitializeLaunch287|undefined> {
  return source<()=>Promise<InitializeLaunch287|undefined>>(launchFile,'Qro')()
}
export function sdkStreamInput287():AsyncIterable<string> {
  return source<()=>AsyncGenerator<string>|undefined>(launchFile,'as')()??
    source<()=>AsyncGenerator<string>>(launchFile,'Lar')()
}
export async function resolveSubagentPromptIngress287(options:{
  appendSubagentSystemPrompt?:string;appendSubagentSystemPromptFile?:string
}):Promise<{ok:true;prompt:string|undefined}|{ok:false;error:string}> {
  const result=await source<(input:typeof options)=>Promise<{ok:true;prompt:string|undefined}|{ok:false;error:string}>>(launchFile,'Ps')(options)
  if(result.ok)source<(prompt:string|undefined)=>void>(launchFile,'As')(result.prompt)
  return result
}
export function permissionPromptsIngress287(value:string|undefined):'none'|undefined {
  const none=source<'none'>('chunk-mphp7acd.js','Vsn')
  return source<(value:string|undefined)=>boolean>('chunk-mphp7acd.js','qhe')(value)?none:undefined
}
export function verifyDiscardedTurn287(rows:Message[],turnId:string):{ok:true}|{ok:false;reason:string} {
  return source<(rows:Message[],turnId:string)=>{ok:true}|{ok:false;reason:string}>('chunk-xapeakym.js','yg')(rows,turnId)
}
export function installTranscriptMirrorIngress287(write:(frame:import('../entrypoints/sdk/controlTypes.js').SDKTranscriptMirrorMessage287)=>Promise<void>):void {
  source<(callback:(filePath:string,entries:unknown[])=>void)=>void>('chunk-mphp7acd.js','x0r')(
    (filePath,entries)=>{void write({type:'transcript_mirror',filePath,entries})})
}

export function publishDynamicSectionsIngress287(state:import('../cli/structuredIO.js').StructuredIO['sessionState'],value:boolean):void {
  source<(owner:typeof state,value:boolean)=>void>('chunk-xapeakym.js','zA')(state,value)
}
export function restoreDynamicSectionsIngress287(metadata:Awaited<import('./structuredIO.js').StructuredIO['restoredWorkerState']>,options:SdkPromptIngress287):Promise<void> {
  return source<(input:typeof metadata,values:SdkPromptIngress287)=>Promise<void>>('chunk-xapeakym.js','JA')(metadata,options)
}
