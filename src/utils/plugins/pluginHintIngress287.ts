/** Full original hint protocol/ingress/recommendation; existing owners only. */
import * as React from 'react'
import type {ToolUseContext} from '../../Tool.js'
import type {ClaudeCodeHint} from '../claudeCodeHints.js'
import type {PluginHintRecommendation} from './hintRecommendation.js'
import type {PluginRecommendationStatePort} from '../../hooks/usePluginRecommendationBase.js'
import type {OfficialRltRecommendationRunner287} from '../officialRlt287.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import type {ExecutionSession287,ExecutionPendingHint287} from '../../services/context/officialExecutionOwners287/native.js'
import {useExecutionSession287} from '../../context/executionProject287.js'
import {ordinaryPluginSource287} from './ordinaryPlugin287.js'

/** Exact already-instantiated original De slot, not another hint store. */
export type PendingHintOwner287=ExecutionPendingHint287
export function getPendingHintOwner287(session:ExecutionSession287=getExecutionSession287()):PendingHintOwner287 {
 return session.pendingHint
}
export function extractOriginalClaudeCodeHints287(output:string,command:string):{hints:ClaudeCodeHint[];stripped:string} {
 const parse=ordinaryPluginSource287('chunk-mphp7acd.js').N7e as (output:string,command:string)=>{hints:ClaudeCodeHint[];stripped:string}
 return parse(output,command)
}
export function parseOriginalHintAttributes287(body:string):Record<string,string> {
 const parse=ordinaryPluginSource287('chunk-mphp7acd.js').ubn as (body:string)=>Record<string,string>
 return parse(body)
}
export function originalHintCommandToken287(command:string):string {
 const parse=ordinaryPluginSource287('chunk-mphp7acd.js').pbn as (command:string)=>string
 return parse(command)
}
export function consumeToolClaudeCodeHints287(output:string,command:string,context:ToolUseContext&{session?:ExecutionSession287},isMainThread:boolean,surface:'shell'|'file_read'='shell'):string {
 // Actual IJ/REPL and SDK contexts carry their real session. No ambient
 // substitute: both the De slot and ut registry must use this context owner.
 const session=context.session
 if(!session)throw Error('Hint tool context requires its actual execution session')
 const consume=ordinaryPluginSource287('chunk-mphp7acd.js').Ect as (output:string,ports:{command:string;pendingHint:PendingHintOwner287;isMainThread:boolean;surface:string})=>string
 return runWithExecutionSession287(session,()=>consume(output,{command,pendingHint:getPendingHintOwner287(session),isMainThread,surface}))
}
export function recordOriginalPluginHint287(hint:ClaudeCodeHint,owner:PendingHintOwner287=getPendingHintOwner287()):void {
 owner.submit(hint)
}
export function resolveOriginalPluginHint287(hint:ClaudeCodeHint,storageV5?:unknown):Promise<PluginHintRecommendation|null> {
 const resolve=ordinaryPluginSource287('chunk-f2cpzzp9.js').Fbe as (hint:ClaudeCodeHint,storageV5?:unknown)=>Promise<PluginHintRecommendation|null>
 return resolve(hint,storageV5)
}
export function markOriginalHintPluginShown287(id:string,storageV5?:unknown):void {
 const mark=ordinaryPluginSource287('chunk-f2cpzzp9.js').Bbe as (id:string,storageV5?:unknown)=>void
 mark(id,storageV5)
}
export function disableOriginalHintRecommendations287(storageV5?:unknown):void {
 const disable=ordinaryPluginSource287('chunk-f2cpzzp9.js').Hbe as (storageV5?:unknown)=>void
 disable(storageV5)
}
export function useOriginalPluginHintRecommendation287(state:PluginRecommendationStatePort<Omit<PluginHintRecommendation,'pluginId'>>,run:OfficialRltRecommendationRunner287):void {
 const session=useExecutionSession287()
 const ask=React.useCallback((_schema:unknown,payload:Omit<PluginHintRecommendation,'pluginId'>,_options:{place:'under'})=>state.setRecommendation(payload),[state.setRecommendation])
 const useHint=ordinaryPluginSource287('chunk-f2cpzzp9.js').UX as (request:typeof ask,runner:OfficialRltRecommendationRunner287)=>void
 runWithExecutionSession287(session,()=>useHint(ask,run))
}
