import {createHash,randomUUID} from 'node:crypto'
import {statSync} from 'node:fs'
import type {AppState} from '../../state/AppState.js'
import {modelSupportsThinking,shouldEnableThinkingByDefault,type ThinkingConfig} from '../../utils/thinking.js'
import {getMainLoopModel} from '../../utils/model/model.js'
import {getInitialSettings,getSettingsWithSources,getSettingsWithErrors,getSettingsFilePathForSource} from '../../utils/settings/settings.js'
import {transformOrdinarySettingsAsync287} from '../../utils/settings/fastStatusWriter287.js'
import {resetSettingsCache} from '../../utils/settings/settingsCache.js'
import {isSettingSourceEnabled} from '../../utils/settings/constants.js'
import {getSessionId} from '../../bootstrap/state.js'
import {sharedThinkingControlSchema,type SharedThinkingState,type SharedThinkingResult} from '../../server/sharedThinkingState.js'

/** Exact official set_max_thinking_tokens semantics; no model capability override. */
export function thinkingConfigFromMaxTokens(value:number|null):ThinkingConfig|undefined {
 return value===null?undefined:value===0?{type:'disabled'}:{type:'enabled',budgetTokens:value}
}
export function thinkingStartupOverride(argv:readonly string[],env:NodeJS.ProcessEnv):boolean {
 const end=argv.indexOf('--'),args=end<0?argv:argv.slice(0,end)
 return Boolean(env.MAX_THINKING_TOKENS)||args.some(arg=>/^--(?:thinking|thinking-display|max-thinking-tokens)(?:=|$)/.test(arg))
}
type Host={getAppState():AppState;setAppState(update:(state:AppState)=>AppState):void;
 getOption():ThinkingConfig|undefined;setOption(value:ThinkingConfig|undefined):void;explicitStartup:boolean}
type Undo={userValue:boolean|null;option:ThinkingConfig|undefined;enabled:boolean;sessionId:string}

/** One instance per canonical worker. Undo records never leave that owner. */
export function createSharedThinkingControl(host:Host){
 let epoch=0
 const undo=new Map<string,Undo>()
 function read():SharedThinkingState {
  resetSettingsCache()
  const sources=getSettingsWithSources().sources
  const user=sources.find(row=>row.source==='userSettings')?.settings.alwaysThinkingEnabled
  const winner=[...sources].reverse().find(row=>Object.hasOwn(row.settings,'alwaysThinkingEnabled'))
  const lockedReason=host.explicitStartup?'Thinking is set by explicit CLI options or MAX_THINKING_TOKENS':
   !isSettingSourceEnabled('userSettings')?'User settings are disabled for this session':
   getSettingsWithErrors().errors.length?'Settings validation errors must be resolved first':
   winner&&winner.source!=='userSettings'?`Thinking is managed by ${winner.source}`:undefined
  const option=host.getOption(),enabled=option?option.type!=='disabled':shouldEnableThinkingByDefault()
  const canEnable=modelSupportsThinking(getMainLoopModel())
  let stamp:unknown=null
  const path=getSettingsFilePathForSource('userSettings')
  if(path)try{const stat=statSync(path);stamp=[stat.mtimeMs,stat.ctimeMs,stat.size]}catch{}
  const revision=createHash('sha256').update(JSON.stringify({sessionId:getSessionId(),epoch,stamp,sources:sources.map(row=>[row.source,row.settings.alwaysThinkingEnabled]),
   option,enabled,appEnabled:host.getAppState().thinkingEnabled,model:getMainLoopModel(),lockedReason,canEnable})).digest('hex')
  return{enabled,userValue:typeof user==='boolean'?user:null,option:option??null,revision,canEnable,...(lockedReason?{lockedReason}:{})}
 }
 async function apply(value:Undo,expected:string){
  const {error}=await transformOrdinarySettingsAsync287('userSettings',()=>{
   if(read().revision!==expected)throw Error('Owner thinking changed elsewhere; refresh before updating or reverting')
   return {alwaysThinkingEnabled:value.userValue??undefined}
  })
  if(error)throw error
  host.setOption(value.option)
  host.setAppState(state=>({...state,thinkingEnabled:value.enabled,settings:getInitialSettings()}))
  epoch++
 }
 return {
  // Official controls/bridge writes also invalidate pending dialog rollback.
  changed(){epoch++},
  async handle(input:unknown):Promise<SharedThinkingResult> {
   const request=sharedThinkingControlSchema.parse(input),before=read()
   if(!request.update&&!request.restore)return{state:before}
   if(before.lockedReason)throw Error(before.lockedReason)
   const expected=request.update?.expected??request.restore!.expected
   if(expected!==before.revision)throw Error('Owner thinking changed elsewhere; refresh before updating or reverting')
   if(request.restore){
    const saved=undo.get(request.restore.token)
    if(!saved)throw Error('Thinking rollback is no longer available')
    if(saved.sessionId!==getSessionId())throw Error('Thinking rollback belongs to a previous session')
    if(saved.enabled&&!before.canEnable)throw Error('Current model does not support thinking')
    await apply(saved,expected);undo.delete(request.restore.token)
    return{state:read()}
   }
   const enabled=request.update!.enabled
   if(enabled&&!before.canEnable)throw Error('Current model does not support thinking')
   const previous:Undo={userValue:before.userValue,option:host.getOption(),enabled:before.enabled,sessionId:getSessionId()}
   // Match the original TUI writer: enable removes the false override. For the
   // live owner, null clears explicit options; zero disables them.
   await apply({userValue:enabled?null:false,option:thinkingConfigFromMaxTokens(enabled?null:0),enabled,sessionId:getSessionId()},expected)
   const token=randomUUID();undo.set(token,previous)
   if(undo.size>128)undo.delete(undo.keys().next().value!)
   return{state:read(),undoToken:token}
  },
 }
}
