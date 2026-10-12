import {createHandbackEndTurnNative287,type EndTurnContext287,type PostToolBatchCall287} from './handbackEndTurnNative287.js'
import type {ToolUseContext} from '../../Tool.js'
import type {HookEvent} from '../../entrypoints/agentSdkTypes.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getMainThreadAgentHooks287,getRegisteredHooks} from '../../bootstrap/state.js'
import {getHooksConfigFromSnapshot,shouldAllowManagedHooksOnly} from '../../utils/hooks/hooksConfigSnapshot.js'
import {getSessionHooks,getSessionFunctionHooks,getSessionHookCallback,addSessionHook,removeSessionHook} from '../../utils/hooks/sessionHooks.js'
import {getCwd} from '../../utils/cwd.js'
function hooks(){return require('../../utils/hooks.js') as typeof import('../../utils/hooks.js')}
export const handbackEndTurnNative287=createHandbackEndTurnNative287({
 V9:getHooksConfigFromSnapshot,Ty:shouldAllowManagedHooksOnly,LEe:getMainThreadAgentHooks287,S$:getRegisteredHooks,
 MQ:(event:HookEvent)=>hooks().hasClassicHookChain287(event),
 Xc:(_session:unknown,_cwd:string,mode:Parameters<ReturnType<typeof hooks>['createBaseHookInput']>[0],context:ToolUseContext)=>hooks().createBaseHookInput(mode,getExecutionSession287().id,context),
 oe:getCwd,PA:(options:Parameters<ReturnType<ReturnType<typeof hooks>['getHookExecutionEngine287']>['PA']>[0])=>hooks().getHookExecutionEngine287().PA(options),
})
export function adaptHandbackHookContext287(context:ToolUseContext){
 // Read-through ABI adapter to the SAME session-hook records/callbacks. No
 // registration/cache is copied or installed here.
 const definition=context.options.agentDefinitions?.activeAgents.find(agent=>agent.agentType===context.agentType)
 // Source consumers spread the context (Han/JR and the side-question caller).
 // Preserve the original enumerable ABI without copying mutable owner slots.
 const view=Object.create(context)
 for(const key of Object.keys(context))Object.defineProperty(view,key,{enumerable:true,configurable:true,get:()=>Reflect.get(context,key),set:value=>{Reflect.set(context,key,value)}})
 const source=context as ToolUseContext&Partial<EndTurnContext287>&{messageQueue?:unknown;getAdvisorSetting?:()=>string|undefined;taskRegistry?:unknown}
 const overlay={agentContext:(require('../../utils/agentContext.js') as typeof import('../../utils/agentContext.js')).getAgentContext()??context.dialogAgentContext287??{agentType:context.agentId?'subagent':'main',subagentName:context.agentType,isBuiltIn:definition?.source==='built-in'},messageQueue:source.messageQueue??require('../../utils/messageQueueManager.js'),getAdvisorSetting:source.getAdvisorSetting??(()=>context.getAppState().advisorModel),taskRegistry:source.taskRegistry??(require('../AgentTool/agentAdmission287.js') as typeof import('../AgentTool/agentAdmission287.js')).getAgentTaskRegistry287(context),session:source.session??getExecutionSession287(),sessionHooksRegistry:source.sessionHooksRegistry??{
 add:(scope:string,event:HookEvent,matcher:string,hook:Parameters<typeof addSessionHook>[4])=>addSessionHook(context.setAppState,scope,event,matcher,hook),
 remove:(scope:string,event:HookEvent,hook:Parameters<typeof removeSessionHook>[3])=>removeSessionHook(context.setAppState,scope,event,hook),
 has:(scope:string,event:HookEvent)=>getSessionHooks(context.getAppState(),scope,event).has(event)||getSessionFunctionHooks(context.getAppState(),scope,event).has(event),
 get:(scope:string,event:HookEvent)=>getSessionHooks(context.getAppState(),scope,event),
 getFunctionHooks:(scope:string,event:HookEvent)=>getSessionFunctionHooks(context.getAppState(),scope,event),
 getEntry:(scope:string,event:HookEvent,matcher:string,hook:Parameters<typeof getSessionHookCallback>[4])=>getSessionHookCallback(context.getAppState(),scope,event,matcher,hook),
 }}
 // Overlay definitions must not invoke the input read-through setters.
 for(const [key,value] of Object.entries(overlay))Object.defineProperty(view,key,{enumerable:true,configurable:true,writable:true,value})
 return view as EndTurnContext287
}
export function executeHandbackPostToolBatch287(calls:PostToolBatchCall287[],id:string,context:ToolUseContext){
 return handbackEndTurnNative287.postToolBatch(calls,id,adaptHandbackHookContext287(context),context.getAppState().toolPermissionContext.mode,context.abortController.signal)
}
