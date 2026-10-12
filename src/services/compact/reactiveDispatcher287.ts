/** Original287 caller orchestration; all stateful bindings live in the existing
 * clear/Mods/execution namespaces and the production summary/finalizer. */
import type {ToolUseContext} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import type {CacheSafeParams} from '../../utils/forkedAgent.js'
import {createCompactDispatcher287,type CompactDispatcherPorts287,type CompactDispatchInput287} from './officialDispatcher287/native.js'
import proof from './officialDispatcher287/provenance.json' with {type:'json'}
import {getClearSourceModule287,runWithCompactLifecycleContext287} from '../../commands/clear/lifecycle287.js'
import {toAttachmentAssemblerContext287,runWithAttachmentAssemblerContext287} from '../../utils/attachmentAssembler287.js'
import {finalizeReactiveCompact,finalizeCompactReplacement} from './reactiveFinalizer.js'

export function createReactiveDispatcher287() {
 const source=getClearSourceModule287('chunk-mphp7acd.js')
 const ports:Record<string,unknown>={}
 for(const name of proof.bindings){if(!Object.hasOwn(source,name))throw Error('Original287 compact dispatcher binding missing: '+name);ports[name]=source[name]}
 // These wrappers preserve local nested-memory dedup and bind the same source
 // G6n/DIr to the actual attachment/session context; no duplicate finalizer.
 ports.G6n=finalizeReactiveCompact;ports.DIr=finalizeCompactReplacement
 return createCompactDispatcher287(ports as CompactDispatcherPorts287)
}
export function emitCompactEvent287(context:ToolUseContext,event:{type:string;[key:string]:unknown}):void {
 if(context.onCompactEvent){context.onCompactEvent(event);return}
 if(event.type==='stream_mode')context.setStreamMode?.(event.mode as Parameters<NonNullable<ToolUseContext['setStreamMode']>>[0])
 if(event.type==='sdk_status')context.setSDKStatus?.(event.status as Parameters<NonNullable<ToolUseContext['setSDKStatus']>>[0],event.metadata as Parameters<NonNullable<ToolUseContext['setSDKStatus']>>[1])
 if(event.type==='compact_progress')context.onCompactProgress?.(event.event as Parameters<NonNullable<ToolUseContext['onCompactProgress']>>[0])
}
function callerContext(context:ToolUseContext):ToolUseContext {
 return toAttachmentAssemblerContext287({...context,onCompactEvent:context.onCompactEvent??(event=>emitCompactEvent287(context,event))})
}
export function withReactiveDispatcherContext287<T>(context:ToolUseContext,work:(context:ToolUseContext)=>T):T {
 const view=callerContext(context)
 return runWithAttachmentAssemblerContext287(view,()=>runWithCompactLifecycleContext287(view,()=>work(view)))
}
export function dispatchReactiveCompact287(input:CompactDispatchInput287) {
 return withReactiveDispatcherContext287(input.cacheSafeParams.toolUseContext,context=>createReactiveDispatcher287().W6n({...input,cacheSafeParams:{...input.cacheSafeParams,toolUseContext:context}}))
}
export function summarizeAndFinalizeReactive287(messages:Message[],params:CacheSafeParams,options:Record<string,unknown>) {
 return withReactiveDispatcherContext287(params.toolUseContext,context=>createReactiveDispatcher287().HIr(messages,{...params,toolUseContext:context},options))
}
/** NIr owns threshold/prefix/rapid-refill/failure decisions and RHt emits every
 * progress/notification record. Drain it with the same canonical caller. */
export function dispatchAutomaticCompact287(messages:Message[],context:ToolUseContext,facts:unknown,params:CacheSafeParams,source:string|undefined,tracking:unknown,snipTokensFreed:number|undefined,consume:(input:unknown)=>Promise<unknown>) {
 return withReactiveDispatcherContext287(context,async view=>{
  const generator=createReactiveDispatcher287().NIr(messages,view,facts,{...params,toolUseContext:view},source,tracking,snipTokensFreed,consume)
  while(true){const next=await generator.next();if(next.done===true)return next.value
   const event=next.value
   if(event.type==='response_length')context.setResponseLength?.(length=>event.op==='reset'?0:length+(typeof event.delta==='number'?event.delta:0))
   else if(event.type==='notification'){
    // Existing public notification owner (when provided); never drop it into a
    // second business queue. The unified stream still receives the full event.
    if(context.addNotification)context.addNotification(event.notification as Parameters<NonNullable<ToolUseContext['addNotification']>>[0])
    else context.onCompactEvent?.(event)
   }else view.onCompactEvent?.(event)
  }
 })
}
