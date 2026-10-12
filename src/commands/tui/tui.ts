import type {LocalJSXCommandCall} from '../../types/command.js'
import {isFullscreenActive} from '../../utils/fullscreen.js'
import {getInitialSettings,updateSettingsForSource} from '../../utils/settings/settings.js'
import {isBgSession} from '../../utils/concurrentSessions.js'
import {isEnvTruthy} from '../../utils/envUtils.js'
import {screenReaderState} from '../../ink/screen-reader-state.js'
import {recordTranscript,flushSessionStorage} from '../../utils/sessionStorage.js'
import {buildTuiCarry,relaunchLocalTui,tuiRelaunchBlocker} from './relaunch.js'
import {createTuiCommand,createRestartTaskPredicate287,jP,pue} from './official.js'
import {publicCommandSourcePort287} from '../../utils/commandCompletionProducers287.js'
import {getAgentTaskRegistry287} from '../../tools/AgentTool/agentAdmission287.js'

export const call:LocalJSXCommandCall=async(onDone,context,args)=>{
 const publicContext=context as typeof context & {getProactivityLevel?:()=>unknown;taskRegistry?:ReturnType<typeof getAgentTaskRegistry287>};
 const command=createTuiCommand({
  Cl:isFullscreenActive,jO:()=>getInitialSettings().tui==='fullscreen'?'settings_on':'local_default',sIt:()=>false,
  me:()=>context.getAppState().toolPermissionContext,JZ:()=>buildTuiCarry(context),Ile:()=>undefined,QZ:()=>[],P3:()=>({}),
  dx:jP,ile:pue,kbe:createRestartTaskPredicate287(publicCommandSourcePort287),Et:isBgSession,
  cn:updateSettingsForSource,Po:()=>false,QSn:async()=>{},
  t_:()=>process.env.INK_SCREEN_READER!==undefined?isEnvTruthy(process.env.INK_SCREEN_READER):screenReaderState.isEnabled(),
  w4:()=>{const blocker=tuiRelaunchBlocker(context);return blocker?[blocker]:[]},XI:()=>false,
  x1:async()=>{await recordTranscript(context.messages);await flushSessionStorage()},Qe:getInitialSettings,
  $jt:(target:'default'|'fullscreen',flags:string[])=>relaunchLocalTui(target,flags,context),K2:()=>({}),

 })
 return await command(onDone,{...context,getProactivityLevel:publicContext.getProactivityLevel??(()=>undefined),taskRegistry:publicContext.taskRegistry??getAgentTaskRegistry287(context)},args) as null
}
