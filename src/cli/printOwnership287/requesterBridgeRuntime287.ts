import {getPrintHostSource287} from './publicHostRuntime287.js'
import {createPrintRequester287,createPrintToolSelection287,createPrintRepositoryToolKey287,createPrintSingletonToolFilter287,readPrintCoordinatorSubscriptionFilter287,createPrintBridgeLifecycle287,createPrintScopeState287,createPrintBridgeHostCallbacks287,createPrintSessionProducers287 as createNativeSessionProducers287,createPrintRequestDialog287 as createNativeRequestDialog287,type PrintRequesterOwner287} from './requesterBridgeNative.js'
import proof from './requesterBridgeProvenance.json' with {type:'json'}
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {ToolState287} from '../../utils/officialToolState287/native.js'
export interface PrintScopeState287 {
 /** Read-only calls into the existing requester Zs/Na/qa lexical owner. */
 toolAssembly287?:import("./requesterBridgeNative.js").PrintToolAssembly287;
 /** Original Cie permission session state, owned by this same print IO. */
 sessionState287?:import('../structuredIO.js').StructuredIO['sessionState'];
 onCommandLifecycle287?:import('../structuredIO.js').StructuredIO['onCommandLifecycle'];
 requestDialog287?:import('../../Tool.js').ToolUseContext['requestDialog'];
 queryStream287?:import('./streamInputRuntime287.js').PrintQueryStream287;
 wholeInput287?:import('./wholeInputRuntime287.js').WholePrintInputOwner287;
 arrivalStage287?:import('./arrivalStageNative.js').ArrivalStage287;
 messageQueue287?:Pick<typeof import('../../utils/messageQueueManager.js'),'getCommandQueue'|'peek'>&{subscribe:typeof import('../../utils/messageQueueManager.js').subscribeToCommandQueue};
 conversation287?:import('./arrivalStageNative.js').ArrivalConversation287;
 bindArrivalEngine287?:(engine:import('./arrivalStageNative.js').ArrivalEngine287)=>()=>void;
 /** Points to the existing active QueryEngine cache; never copies it. */
 readFileCache?:import("../../utils/fileStateCache.js").FileStateCache;
 sessionEnvVars:Map<string,string>;toolState:ToolState287;sessionHooksRegistry:object;
 memorySelector:{stateByDir:Record<string,unknown>;lastUsage:unknown};
 isolationLatch:{current:string|null;onLatch?:(side:string)=>void};pendingNestedMemoryTriggers:unknown[];
}
/** Each identifier reads the same caller property / selected source instance.
 * A missing source is an error, not an implicit undefined qualification. */
export function createPrintLexicalPorts287(caller:object):object {
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 return new Proxy(caller,{
  has(target,name){return typeof name==='string'&&(Object.hasOwn(target,name)||Object.hasOwn(bindings,name))},
  get(target,name,receiver){
   if(name===Symbol.unscopables)return undefined
   if(Object.hasOwn(target,name))return Reflect.get(target,name,receiver)
   if(typeof name!=='string'||!Object.hasOwn(bindings,name))throw Error('Original print lexical caller missing '+String(name))
   const binding=bindings[name]!
   return getPrintHostSource287(binding.file,binding.name)
  },
  set(target,name,value,receiver){
   if(!Object.hasOwn(target,name))throw Error('Original print mutable caller cell missing '+String(name))
   return Reflect.set(target,name,value,receiver)
  },
 })
}
/** Separate original-module lexical imports; stateless selectors borrow the
 * canonical tool/permission/coordinator functions, never a new pool owner. */
export function createPrintToolSelectionPorts287(caller:object):object {
 const lifecycle=getOriginalModsLifecycle287()
 const N2o=createPrintSingletonToolFilter287(Object.fromEntries(['OSe','ZN','Su','k8n','Tr'].map(name=>[name,lifecycle.clearLifecycleSource287('chunk-6xrs6gmd.js',name)])))
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.toolSelectionBindings
 // This module-local lexical view has no state properties of its own.
 // An empty target avoids Proxy invariants on hI's frozen scalar bindings;
 // all ordinary reads still borrow the same live caller, never a snapshot.
 return new Proxy(Object.create(null),{
  has(_target,name){return typeof name==='string'&&(Object.hasOwn(caller,name)||Object.hasOwn(bindings,name)||name==='l')},
  get(_target,name){
   if(name===Symbol.unscopables)return undefined
   // The selector module's namespace import must not resolve to hI's
   // later-added scalar l error formatter on the shared caller.
   if(name==='l')return Object.fromEntries(Object.entries(proof.toolCoordinatorBindings).map(([alias,binding])=>[alias,getPrintHostSource287(binding.file,binding.name)]))
   if(Object.hasOwn(caller,name))return Reflect.get(caller,name,caller)
   if(name==='N2o')return N2o
   if(name==='A1o')return readPrintCoordinatorSubscriptionFilter287
   if(typeof name!=='string'||!Object.hasOwn(bindings,name))throw Error('Original tool selection import missing '+String(name))
   const binding=bindings[name]!
   return getPrintHostSource287(binding.file,binding.name)
  },
 })
}
export function bindPrintRequester287(caller:object):PrintRequesterOwner287&{release():void}{
 const selection=createPrintToolSelection287(createPrintToolSelectionPorts287(caller))
 const lifecycle=getOriginalModsLifecycle287()
 const jVt=createPrintRepositoryToolKey287(Object.fromEntries(['Cu','oe','oo'].map(name=>[name,lifecycle.clearLifecycleSource287('chunk-9hktajv8.js',name)])))
 const ports=Object.defineProperties(caller,Object.getOwnPropertyDescriptors({...selection,jVt}))
 const scope=createPrintRequester287(createPrintLexicalPorts287(ports)),owner=getOriginalModsLifecycle287().requester
 owner.bind(scope.requester)
 return Object.assign(scope,{release:()=>owner.release(scope.requester)})
}
export const createPrintBridgeProducer287=(caller:object)=>createPrintBridgeLifecycle287(createPrintLexicalPorts287(caller))
export const createPrintRemoteHostCallbacks287=(caller:object)=>createPrintBridgeHostCallbacks287(createPrintLexicalPorts287(caller))

export const createPrintSharedScopeState287=(caller:object)=>createPrintScopeState287(createPrintLexicalPorts287(caller))
export const createPrintSessionProducers287=(caller:object)=>createNativeSessionProducers287(createPrintLexicalPorts287(caller))
/** Stateless original y_ view; IO/queue and the source gate/spec own state. */
export function createPrintRequestDialog287(io:import('../structuredIO.js').StructuredIO,queue:Pick<typeof import('../../utils/messageQueueManager.js'),'peek'>){
 const sourceKind=getPrintHostSource287('chunk-n2zepamy.js','k4t') as (kind:string,surface:string)=>boolean
 // Explicit existing six-platform C: an actual computer-use approval caller
 // uses the public SDK dialog transport. Other kinds keep the original gate;
 // y_ still owns queue cancellation, schema validation and unanswered default.
 return createNativeRequestDialog287(createPrintLexicalPorts287({r:io,Q:queue,
  k4t:(kind:string,surface:string)=>sourceKind(kind,surface)||(kind==='computer_use_approval'&&surface==='sdk_host'),
 }))
}
