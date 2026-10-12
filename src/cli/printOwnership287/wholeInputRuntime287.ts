import {randomUUID} from 'node:crypto'
import {createWholePrintInput287,type WholePrintInput287,type WholePrintTurnOptions287} from './consumptionNative.js'
import {createPrintLexicalPorts287,type PrintScopeState287} from './requesterBridgeRuntime287.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import type {QueryEngineConfig} from '../../QueryEngine.js'
import {getExecutionSession287,runWithExecutionSession287} from '../../services/context/execution287.js'
import {getToolState287} from '../../utils/toolState287.js'
import {assembleQueryPrefix287} from '../../utils/queryAssembly287.js'
import {query} from '../../query.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {ConversationResetBuffer} from '../../commands/clear/resetEvents.js'

export interface WholePrintInputOwner287 {
 readonly source:WholePrintInput287;
 update(config:QueryEngineConfig):void;
 submitMessage(input:Parameters<WholePrintInput287['submitMessage']>[0],options?:WholePrintTurnOptions287):ReturnType<WholePrintInput287['submitMessage']>;
 close():Promise<void>;
}

/** The public wrapper supplies C boundaries to the intact original TS. There
 * is no split arrival stage, prepared consumer or second SDK feed here. */
export function createWholePrintInputOwner287(initial:QueryEngineConfig):WholePrintInputOwner287 {
 let config=initial
 const scope:PrintScopeState287|undefined=initial.sharedHostContext287
 const session=getExecutionSession287()
 const shared=require('../../utils/hotSessionController287/runtime.js') as typeof import('../../utils/hotSessionController287/runtime.js')
 const resetEvents=new ConversationResetBuffer()
 let inputEnded:Promise<unknown>|undefined,returned:Promise<unknown>|undefined
 // Original TS's parent is the IO lifetime, not each command's controller.
 // Each submit passes the current command controller via the original De ABI.
 const e=new Proxy({}, {get(_target,key){
  switch(key){
   case 'refreshTools':return scope?.toolAssembly287?.tools??Reflect.get(config,key)
   case 'allowedAgentTypes':return scope?.toolAssembly287?.allowedAgentTypes??Reflect.get(config,key)
   case 'primitiveToolGrant':return scope?.toolAssembly287?.primitiveToolGrant??Reflect.get(config,key)
   case 'session':return session
   case 'abortController':return undefined
   case 'conversation':return scope?.conversation287
   case 'messageQueue':return scope?.messageQueue287??fallbackQueue
   case 'sessionEnvVars':return scope?.sessionEnvVars
   case 'isolationLatch':return scope?.isolationLatch
   case 'toolState':return scope?.toolState??getToolState287(session)
   case 'sessionHooks':return scope?.sessionHooksRegistry
   case 'memorySelector':return scope?.memorySelector
   case 'pendingNestedMemoryTriggers':return scope?.pendingNestedMemoryTriggers
   case 'sessionState':return scope?.sessionState287
   case 'requestDialog':return scope?.requestDialog287
   case 'onCommandLifecycle':return scope?.onCommandLifecycle287
   default:return Reflect.get(config,key)
  }
 }})
 const queue=require('../../utils/messageQueueManager.js') as typeof import('../../utils/messageQueueManager.js')
 const fallbackQueue={...queue,subscribe:queue.subscribeToCommandQueue,
  enqueuePollEvent:queue.enqueuePollEvent287,enqueuePollEventGroup:queue.enqueuePollEventGroup287,
  countRemainingWakePollEventsAfter:queue.countRemainingWakePollEventsAfter287,countPendingWakePollEvents:queue.countWakePollEvents287,
 }
 const modelContext=getPrintHostSource287('chunk-xapeakym.js','Ml') as (host:object,turn:object)=>import('../../Tool.js').ToolUseContext
 const caller={e,a:authEnvironment,HT:randomUUID,
  // Hot's engine_Pw/processInput roots are exact cuts to these same canonical
  // declarations. Reading their identity does not initialize unrelated hot UI
  // modules or fork a dispatcher/queue owner.
  Pw:getPrintHostSource287('chunk-0rn4hgq0.js','Pw'),
  Q6e(options:Parameters<typeof shared.createProductionSdkEngine287>[0]){
   const engine=shared.createProductionSdkEngine287(options,session)
   const stream=engine.streamInput.bind(engine),end=engine.return.bind(engine)
   engine.streamInput=input=>{inputEnded=stream(input);return inputEnded as ReturnType<typeof stream>}
   engine.return=(...args)=>{returned=end(...args);return returned as ReturnType<typeof end>}
   return engine
  },
  LI:query,
  Um(input:Parameters<typeof assembleQueryPrefix287>[0]){return assembleQueryPrefix287({...input,
   additionalWorkingDirectories:Array.from(config.getAppState().toolPermissionContext.additionalWorkingDirectories.keys()),
  })},
  Ctt(input:import('../../utils/hotSessionController287/native.js').HotUserInput287){
   const dispatch=getPrintHostSource287('chunk-tf63hv0k.js','Ctt') as typeof shared.processHotUserInput287
   return runWithExecutionSession287(session,()=>dispatch(input))
  },
  Ml(host:object,turn:object){
   const context=modelContext(host,turn)
   // Retain the existing C dialog/reset bridges; original Ml owns all caches,
   // session slots and permission layers and receives the original two ABIs.
   context.options.runQuery=query
   context.options.strictMcpConfig=config.strictMcpConfig
   context.handleElicitation=config.handleElicitation
   return Object.assign(context,{enqueueConversationReset:resetEvents.enqueue})
  },
 }
 const source=createWholePrintInput287(createPrintLexicalPorts287(caller))
 return {source,update(next){
  if(next.sharedHostContext287!==scope)throw Error('Whole TS owner cannot move to another IO scope')
  if(next.initialMessages!==source.getMessages())throw Error('Whole TS owner cannot adopt a second conversation')
  if(next.userSpecifiedModel!==config.userSpecifiedModel)source.setModel(next.userSpecifiedModel)
  config=next
 },async *submitMessage(input,options){
  for await(const frame of source.submitMessage(input,options)){
   for(const reset of resetEvents.drain(session.id))yield reset
   yield frame
  }
 },async close(){if(returned===undefined)source.dispose();await returned;await inputEnded}}
}
