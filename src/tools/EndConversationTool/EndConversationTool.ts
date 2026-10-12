import {z} from 'zod/v4'
import {buildTool,type ToolUseContext} from '../../Tool.js'
import {getSessionId} from '../../bootstrap/state.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {errorMessage} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../../services/analytics/index.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {endConversationHint287} from './deferredHint287.js'
import {createEndConversationTool287} from './official287/native.js'

const original=(file:string,name:string)=>getOriginalModsLifecycle287().clearLifecycleSource287(file,name)
const definition=createEndConversationTool287({
 yk:endConversationHint287.END_CONVERSATION_TOOL_NAME,
 f:lazySchema,Ve:z.strictObject,u:z.object,H:z.boolean,o:z.string,Wt:value=>value,
 Nyt:()=> (original('chunk-nankzm0s.js','Nyt') as ()=>string|undefined)(),
 dFn:endConversationHint287.isEndConversationToolEnabled,
 // Existing C telemetry leaf has no metadata collection or queue.
 i:name=>logEvent(name,{}),S:value=>value,
 z0r:(id,storage)=>(original('chunk-mphp7acd.js','z0r') as (id:string,storage:unknown)=>Promise<void>)(id,storage),
 q:getSessionId,t:logForDebugging,l:errorMessage,
 embeddedImport287:async path=>{
  const module=await getOriginalModsLifecycle287().importPublicSourceModule287(path)
  return {gracefulShutdown:module.gracefulShutdown as typeof import('../../utils/gracefulShutdown.js').gracefulShutdown}
 },
})

// Lower only the existing create/call ABI. Transcript, abort, store and session
// marker remain the current execution's owners, not a separate end-state cell.
const callAdapter={
 async call(input:{},context:ToolUseContext){
  return definition.create({
   isNonInteractiveSession:context.options.isNonInteractiveSession,
   agentId:context.agentId,storageV5:context.storageV5,
   messages:()=>context.messages,
   markEndedByModel:()=> (original('chunk-mphp7acd.js','lMt') as (ended:boolean,set:typeof context.setAppState)=>void)(true,context.setAppState),
  }).call(input,{abort:reason=>context.abortController.abort(reason)})
 },
}
const loweredDefinition=Object.defineProperties(callAdapter,Object.getOwnPropertyDescriptors(definition))
export const EndConversationTool=buildTool(loweredDefinition as typeof callAdapter & typeof definition)
