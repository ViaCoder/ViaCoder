import {z} from 'zod/v4'
import figures from 'figures'
import {lazySchema} from './lazySchema.js'
import {logForDebugging} from './debug.js'
import {authEnvironment} from './authEnvironment.js'
import {getExecutionSession287} from '../services/context/execution287.js'
import {getAgentContext} from './agentContext.js'
import {getAgentTaskRegistry287} from '../tools/AgentTool/agentAdmission287.js'
import {createSessionSettings287,type SessionSettingsPorts287,type SessionSettingsContext287,type SessionSettings287} from './officialSessionSettings287/native.js'
import type {ToolUseContext} from '../Tool.js'
import type {Message} from '../types/message.js'
let source:SessionSettings287|undefined
export function createSessionSettingsProductionPorts287():SessionSettingsPorts287{return {
 environment:authEnvironment,execution:getExecutionSession287,lazySchema,object:z.object,string:z.string,figures,debug:logForDebugging,
 settings:()=> (require('./settings/settings.js') as typeof import('./settings/settings.js')).getSettings_DEPRECATED(),
 outputStyle:()=> (require('../constants/outputStyles.js') as typeof import('../constants/outputStyles.js')).getOutputStyleConfig(),
 createUserMessage:(...args)=> (require('./messages.js') as typeof import('./messages.js')).createUserMessage(...args),
 wrapMessages:(...args)=> (require('./messages.js') as typeof import('./messages.js')).wrapMessagesInSystemReminder(...args),
}}
/** Original immutable catalog/schema/functions; caches remain in the existing settings/style/history owners. */
export function getOriginalSessionSettings287():SessionSettings287{return source??=createSessionSettings287(createSessionSettingsProductionPorts287())}
export function toSessionSettingsContext287(ctx:ToolUseContext):SessionSettingsContext287 {
 // The legacy ABI omits an actor only for ordinary root calls. An identified
 // subagent without provenance never gains isMainSession qualification.
 const agentContext=ctx.dialogAgentContext287??getAgentContext()??{agentType:ctx.agentId===undefined?'main' as const:'subagent' as const}
 return {options:ctx.options,agentId:ctx.agentId,agentContext,taskRegistry:getAgentTaskRegistry287(ctx)}
}
export const getSessionSettingsAttachments287=(ctx:ToolUseContext,messages?:Message[])=>getOriginalSessionSettings287().sessionSettings(toSessionSettingsContext287(ctx),messages)
export const getStyleReminderAttachment287=(ctx:ToolUseContext)=>getOriginalSessionSettings287().styleReminder(toSessionSettingsContext287(ctx))
export const restoreSessionSettingsAttachments287=(before:Message[],after:Message[])=>getOriginalSessionSettings287().restore(before,after)
