import {randomUUID} from 'node:crypto'
import {createPrintConsumption287,type PrintConsumption287} from './consumptionNative.js'
import proof from './consumptionProvenance.json' with {type:'json'}
import {getPrintHostSource287} from './publicHostRuntime287.js'
import type {QueryParams} from '../../query.js'
import type {Message} from '../../types/message.js'
import type {ArrivalStage287,ArrivalConversation287,ArrivalWriter287,ArrivalTurnSpan287} from './arrivalStageNative.js'
import {getExecutionSession287} from '../../services/context/execution287.js'
import type {PrintScopeState287} from './requesterBridgeRuntime287.js'
import type {QueryEngineConfig} from '../../QueryEngine.js'
export interface PreparedPrintConsumption287 {
 params:QueryParams;config:QueryEngineConfig;stage:ArrivalStage287;
 conversation:ArrivalConversation287;rows:Message[];writer:ArrivalWriter287;
 started:number;span:ArrivalTurnSpan287;turnId:string|undefined;
 scope:PrintScopeState287|undefined;persist:boolean;
 permissionDenials:import('../../entrypoints/agentSdkTypes.js').SDKPermissionDenial[];
 onConsumeStarted():void;
}
export type PrintWireLowering287<T>=(frame:Record<string,unknown>,throttle:unknown,tools:()=>unknown,options:{replayUserMessages:boolean;includePartialMessages:boolean})=>Iterable<T>;
/** Getter-only view on the selected source namespace and real caller cells. */
function lexical(caller:object):object {
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 return new Proxy(caller,{
  has:(target,key)=>typeof key==='string'&&(Object.hasOwn(target,key)||Object.hasOwn(bindings,key)),
  get(target,key,receiver){if(key===Symbol.unscopables)return undefined;if(Object.hasOwn(target,key))return Reflect.get(target,key,receiver);if(typeof key!=='string'||!Object.hasOwn(bindings,key))throw Error('Original consumption caller missing '+String(key));const binding=bindings[key]!;return getPrintHostSource287(binding.file,binding.name)},
  set(target,key,value,receiver){if(!Object.hasOwn(target,key))throw Error('Original consumption mutable cell missing '+String(key));return Reflect.set(target,key,value,receiver)},
 })
}
export function createPrintInitConsumer287(config:QueryEngineConfig,conversation:ArrivalConversation287):PrintConsumption287<never>{
 return createPrintConsumption287(lexical({e:config,r:config.getAppState,get s(){return conversation.rows()}}))
}
/** The accepted C input/prefix remain upstream. Original prepared consumption
 * owns record/retraction/refusal/usage/close and canonical _y wire lowering. */
export function createPreparedPrintConsumer287<T>(input:PreparedPrintConsumption287,engine:AsyncIterator<Record<string,unknown>>,takeThrow:()=>{error:unknown}|undefined,drain:(controller:AbortController,denials?:unknown[])=>Promise<void>,project:PrintWireLowering287<T>):PrintConsumption287<T>{
 const {params,config,stage,conversation,writer}=input,context=params.toolUseContext,session=getExecutionSession287()
 const e={...config,session,sessionHooks:input.scope?.sessionHooksRegistry}
 const Oae=getPrintHostSource287('chunk-yc409gx5.js','Oae') as {of(host:typeof session.host):{absorb(rows:Message[]):void}}
 const aso=getPrintHostSource287('chunk-n2zepamy.js','aso') as (input:{toolUseContext:typeof context;sessionState:unknown})=>unknown
 const caller={
  e,r:config.getAppState,n:config.setAppState,get s(){return input.rows},g:conversation,
  qr:params.messages,Fr:input.persist,Rr:writer,_r:context.options.tools,Vs:context.options.tools,
  ho:config.jsonSchema,Ci:config.includePartialMessages??false,un:false,Ks:[],br:input.started,Zo:Date.now(),No:input.span,ua:input.turnId,
  bt:stage.turnEvents,Xt:{delete:(span:ArrivalTurnSpan287)=>stage.retireTurnSpan(span)},
  // Original consumer owns this turn's Fbr; outer C wire does not repeat it.
  lr:getPrintHostSource287('chunk-w77dxxmg.js','lp'),ro:input.permissionDenials,
  zn:context.options.mainLoopModel,oo:context.getAppState(),la:undefined,_o:undefined,
  En:Boolean(process.env.CLAUDE_CODE_EAGER_FLUSH)||Boolean(process.env.CLAUDE_CODE_IS_COWORK),
  h:Oae.of(session.host),H:input.scope?.sessionHooksRegistry,jo:aso({toolUseContext:context,sessionState:input.scope?.sessionState287}),
  _e:engine,HT:randomUUID,Ft:stage.release,Oo:stage.finalizeView,Te:takeThrow,Wn:drain,
  qe:stage.optionalPhase,Sr:stage.flushTurnNotes,ps:stage.duration,_y:project,
  set Or(_rows:Message[]){stage.hold()},
 }
 return createPrintConsumption287<T>(lexical(caller))
}
