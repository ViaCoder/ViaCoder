import {getClearLifecycleBinding287,runWithCompactLifecycleContext287} from '../clear/lifecycle287.js'
import {runWithAttachmentAssemblerContext287,toAttachmentAssemblerContext287} from '../../utils/attachmentAssembler287.js'
import {buildEffectiveSystemPrompt,type SystemPrompt} from '../../utils/systemPrompt.js'
import {runPostCompactCleanup} from '../../services/compact/postCompactCleanup.js'
import {suppressCompactWarning} from '../../services/compact/compactWarningState.js'
import {setLastSummarizedMessageId} from '../../services/SessionMemory/sessionMemoryUtils.js'
import {getCompactPrecompute,withCompactPrecomputeLease} from '../../services/compact/precompute.js'
import {createManualCompact287,type ManualCompactPorts287,type ManualCompactOptions287} from './officialManual287/native.js'
import proof from './officialManual287/provenance.json' with {type:'json'}
import {finalizeReactiveCompact,finalizeCompactReplacement} from '../../services/compact/reactiveFinalizer.js'
import {summarizeAndFinalizeReactive287} from '../../services/compact/reactiveDispatcher287.js'
import type {ToolUseContext} from '../../Tool.js'
import type {LocalCommandCall} from '../../types/command.js'

/** Original wPt reads the existing main-chain prompt, or assembles it on a cache
 * miss. Legacy callers without that field use the same production composer,
 * including the frozen local prompt leaves. This is a lazy invocation value,
 * not another prompt cache; ended/empty requests never assemble it. */
export function toManualCompactContext287(context:ToolUseContext):ToolUseContext {
  const fields:PropertyDescriptorMap={}
  for(const key of Object.keys(context))fields[key]={enumerable:true,get:()=>Reflect.get(context,key)}
  let rendered:Promise<SystemPrompt>|undefined
  fields.renderedSystemPrompt={enumerable:true,get:()=>context.renderedSystemPrompt??(rendered??=(async()=>{
    const {getSystemPrompt}=await import('../../constants/prompts.js')
    const state=context.getAppState()
    const defaultSystemPrompt=await getSystemPrompt(context.options.tools,context.options.mainLoopModel,
      Array.from(state.toolPermissionContext.additionalWorkingDirectories.keys()),context.options.mcpClients)
    return buildEffectiveSystemPrompt({mainThreadAgentDefinition:undefined,toolUseContext:context,
      customSystemPrompt:context.options.customSystemPrompt,defaultSystemPrompt,
      appendSystemPrompt:context.options.appendSystemPrompt})
  })())}
  fields.getAdvisorSetting={enumerable:true,value:()=>{
    const original=Reflect.get(context,'getAdvisorSetting')
    return typeof original==='function'?original.call(context):context.getAppState().advisorModel
  }}
  fields.onQueryEvent={enumerable:true,value:(event:{type:string;op?:string;delta?:number;notification?:Parameters<NonNullable<ToolUseContext['addNotification']>>[0]})=>{
    const original=Reflect.get(context,'onQueryEvent')
    if(typeof original==='function')return original.call(context,event)
    if(event.type==='response_length')context.setResponseLength?.(length=>event.op==='reset'?0:length+(event.delta??0))
    else if(event.type==='notification'&&event.notification)context.addNotification?.(event.notification)
  }}
  fields.onCompactEvent={enumerable:true,value:context.onCompactEvent??((event:{type:string;[key:string]:unknown})=>{
    if(event.type==='stream_mode')context.setStreamMode?.(event.mode as Parameters<NonNullable<ToolUseContext['setStreamMode']>>[0])
    else if(event.type==='compact_progress')context.onCompactProgress?.(event.event as Parameters<NonNullable<ToolUseContext['onCompactProgress']>>[0])
    else if(event.type==='sdk_status')context.setSDKStatus?.(
      event.status as Parameters<NonNullable<ToolUseContext['setSDKStatus']>>[0],
      event.metadata as Parameters<NonNullable<ToolUseContext['setSDKStatus']>>[1])
  })}
  return toAttachmentAssemblerContext287(Object.defineProperties(Object.create(context),fields))
}

/** Complete official ce → b → D: PreCompact/cache sharing, Mods arbitration,
 * precompute reuse, finalization, retirement, errors and lifecycle events all
 * resolve the same canonical original namespace and existing execution owner. */
async function invokeManualCompact287(context:ToolUseContext,invokeNative:(native:ReturnType<typeof createManualCompact287>,view:ToolUseContext)=>ReturnType<LocalCommandCall>):ReturnType<LocalCommandCall>{
  const invoke=(caller:ToolUseContext)=>{
    const view=toManualCompactContext287(caller)
    return runWithAttachmentAssemblerContext287(view,()=>runWithCompactLifecycleContext287(view,()=>{
      const ports:Record<string,unknown>={}
      for(const[name,binding]of Object.entries(proof.bindings))ports[name]=getClearLifecycleBinding287(binding.file,binding.name)
      // Original bodies stay complete. Only finalizer ABI leaves use the
      // already accepted production wrappers, preserving nested-memory C.
      Object.assign(ports,{G6n:finalizeReactiveCompact,DIr:finalizeCompactReplacement,HIr:summarizeAndFinalizeReactive287})
      return invokeNative(createManualCompact287(ports as ManualCompactPorts287),view)
    }))
  }
  // Retain the local lifetime signal for an existing session store. It does
  // not create speculative work or replace original I's cache decisions.
  const store=getCompactPrecompute(context)
  const result=await(store?withCompactPrecomputeLease(context,store,caller=>invoke(caller)):invoke(context))
  if(result.type==='compact'){
    // Local history/nested-memory retention remains independent of original
    // Pce's session precompute/cache retirement; do not retire it a second time.
    context.loadedNestedMemoryPaths?.clear()
    runPostCompactCleanup()
    suppressCompactWarning()
    setLastSummarizedMessageId(undefined)
  }
  return result
}
export const call:LocalCommandCall=(args,context)=>invokeManualCompact287(context,(native,view)=>native.ce(args,view as Parameters<LocalCommandCall>[1]))
/** Same native b/ce owner and lease/C finalizers for the original hot requester. */
export function compactManually(context:ToolUseContext,options:ManualCompactOptions287):ReturnType<LocalCommandCall>{
  return invokeManualCompact287(context,(native,view)=>native.b(view,options))
}
