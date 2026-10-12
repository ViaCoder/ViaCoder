import {randomUUID} from 'node:crypto'
import {z} from 'zod/v4'
import {buildTool,type Tool,type ToolUseContext} from '../../Tool.js'
import {asAgentId} from '../../types/ids.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {jsonStringify} from '../../utils/slowOperations.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import {getAgentTaskRegistry287} from '../AgentTool/agentAdmission287.js'
import {agentDelivery287} from './agentDelivery287.js'
import {enqueueReportingAdmission} from '../../utils/messageQueueManager.js'
import {getToolResultsDir} from '../../utils/toolResultStorage.js'
import type {HandbackContract287} from './agentDeliveryNative287.js'

function actualContext(context:ToolUseContext){return {
 get session(){return getExecutionSession287()},get storageV5(){return context.storageV5},
 get agentId(){return context.agentId},get taskRegistry(){return getAgentTaskRegistry287(context)},
 agentLifecycle:{nameOf:(id:string)=>{for(const [name,value]of context.getAppState().agentNameRegistry??[])if(value===id)return name}},
 messageQueue:{enqueueReportingAdmission},
}}
// Wt's runtime instance is adapted to the existing Tool ABI; C/z/P and the
// complete tool body remain original, reading canonical owners at call time.
type NativeDefinition={create(context:ReturnType<typeof actualContext>):Pick<Tool,'call'|'validateInput'>}&Omit<Tool,'call'|'validateInput'>
let nativeTool:Tool|undefined
function getNativeTool():Tool {return nativeTool??=agentDelivery287.createHandback({
 Wt:(definition:NativeDefinition)=>{const {create,...surface}=definition;return buildTool({...surface,
  validateInput:(input,context)=>create(actualContext(context)).validateInput!(input,context),
  call:(input,context,canUseTool,parent,onProgress)=>create(actualContext(context)).call(input,context,canUseTool,parent,onProgress),
 })},f:lazySchema,u:z.object,o:z.string,H:z.boolean,yo:asAgentId,E:randomUUID,_:jsonStringify,

 // Full original Z6 and B1r from the already-restored canonical output
 // workspace. No second r/backend or simplified result persistence algorithm.
 P_:getToolResultsDir,
 Z6:(...args:unknown[])=>canonicalPersistence287('Z6')(...args),B1r:(...args:unknown[])=>canonicalPersistence287('B1r')(...args),

})}
export const SubagentHandbackTool287=new Proxy({} as Tool,{get:(_target,key)=>Reflect.get(getNativeTool(),key)})

export function installAgentHandbackContract287(context:ToolUseContext,id:string,enabled:boolean,optIn:boolean){
 const registry=getAgentTaskRegistry287(context),session=getExecutionSession287(),main=session.identity.mainAgentId(session.id)
 agentDelivery287.OUo(id,enabled)
 const task=registry.get(id)
 if(optIn&&(agentDelivery287.yYe()||agentDelivery287.UUo(task)!==undefined))registry.update(id,task=>({...task,...agentDelivery287.BUo({contract:enabled,
  registered:{recipient:(task as typeof task&HandbackContract287).handbackRecipient},
  callerInbox:('parentAgentId'in task&&typeof task.parentAgentId==='string'?task.parentAgentId:main),
  resumerInbox:context.agentId??main,inboxReadable:recipient=>agentDelivery287.ban(recipient,registry),
 })}))
}

export function canonicalPersistence287(name:'Z6'|'B1r'){
 const hooks=require('../../utils/hooks.js') as typeof import('../../utils/hooks.js')
 const runtime=require('../../utils/hooks/modelSwitch287/engineRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/engineRuntime.js')
 const callable=runtime.createOriginalHookEnginePorts287(hooks.createHookExecutionHostPorts287())[name]
 if(typeof callable!=='function')throw Error('Original output workspace port absent: '+name)
 return callable as (...args:unknown[])=>unknown
}
