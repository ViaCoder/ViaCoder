import {createPrintStreamInput287,type PrintStreamInput287} from './streamInputNative.js'
import {query,type QueryParams} from '../../query.js'
import type {PrintScopeState287} from './requesterBridgeRuntime287.js'
import {getFastModeState} from '../../utils/fastMode.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {logError} from '../../utils/log.js'
import {createPreparedPrintConsumer287,type PreparedPrintConsumption287} from './consumptionRuntime287.js'
import type {SDKMessage} from '../../entrypoints/agentSdkTypes.js'
type QueryEvent=Extract<Awaited<ReturnType<ReturnType<typeof query>['next']>>,IteratorYieldResult<unknown>>['value']

export interface PrintQueryStream287 {
 readonly source:PrintStreamInput287;
 run(params:QueryParams,input:Parameters<PrintStreamInput287['prepare']>[1],options?:Parameters<PrintStreamInput287['prepare']>[2]):AsyncGenerator<QueryEvent,void,unknown>;
 consume(prepared:PreparedPrintConsumption287,input:Parameters<PrintStreamInput287['prepare']>[1],options?:Parameters<PrintStreamInput287['prepare']>[2]&{uuid?:string;isMeta?:boolean}):AsyncGenerator<SDKMessage,void,unknown>;
 close():Promise<IteratorResult<Record<string,unknown>,void>>;
}
/** One original Q6e and TS input queue per print IO, never per ask()/turn. */
export function createPrintQueryStream287(lifecycle?:Pick<import('./arrivalStageNative.js').ArrivalStage287,'interrupt'|'disposeController'>,host?:PrintScopeState287):PrintQueryStream287 {
 // Runtime only: hot controller imports the same query execution boundary.
 const shared=require('../../utils/hotSessionController287/runtime.js') as typeof import('../../utils/hotSessionController287/runtime.js')
 let active:QueryParams|undefined
 let arriving:QueryEvent|undefined
 async function* runQuery(params:QueryParams):ReturnType<typeof query>{
  const iterator=query(params)
  try{while(true){const next=await iterator.next();if(next.done===true)return next.value;arriving=next.value;yield next.value}}
  finally{arriving=undefined;await Reflect.apply(iterator.return,iterator,[undefined])}
 }
 const ports={
  Pw:shared.getHotEngineQueueConstructor287(),Q6e:shared.createProductionSdkEngine287,LI:runQuery,
  get z(){return active&&{model:active.toolUseContext.options.mainLoopModel,enabled:active.toolUseContext.getAppState().fastMode}},
  F3:getFastModeState,
  SF:getPrintHostSource287('chunk-nankzm0s.js','SF'),N3:getPrintHostSource287('chunk-nankzm0s.js','N3'),
  e:{get onCommandLifecycle(){return host?.onCommandLifecycle287}},d:logError,
  t:getPrintHostSource287('chunk-q80zaav8.js','t'),
  get he(){return active?.toolUseContext.abortController},
  Se(){if(!active)throw Error('No prepared print controller');if(lifecycle){lifecycle.interrupt();return}const reason=getPrintHostSource287('chunk-k35krsdc.js','fl') as (reason:'remote-cancel')=>unknown;active.toolUseContext.abortController.abort(reason('remote-cancel'))},
 }
 const source=createPrintStreamInput287(ports)
 return {source,close:()=>{lifecycle?.disposeController();return source.close()},async *consume(prepared,input,options){
  if(active)throw Error('headless session: a query is already in flight')
  const params=prepared.params
  active=params
  try{
   // The canonical full _y owns wire lowering, including real partial/thinking
   // metadata, subagent progress and source result; no SDK twin renderer.
   const normalize=getPrintHostSource287('chunk-xapeakym.js','_y') as import('./consumptionRuntime287.js').PrintWireLowering287<SDKMessage>
   const consumer=createPreparedPrintConsumer287<SDKMessage>(prepared,source.engine,source.takeTurnThrow,source.drain,normalize)
   source.prepare(params,input,options)
   prepared.onConsumeStarted()
   for await(const frame of consumer.consume(input,options,params.toolUseContext.abortController)){
    yield frame as SDKMessage
   }
  }finally{active=undefined;arriving=undefined}
 },async *run(params,input,options){
  if(active)throw Error('headless session: a query is already in flight')
  active=params
  source.prepare(params,input,options)
  let completed=false
  try{
   while(true){
    const frame=await source.next()
    if(frame.type==='result'){
     completed=true
     const thrown=source.takeTurnThrow()
     if(thrown!==undefined)throw thrown.error
     return undefined
    }
    // Compatibility internal-event view over this same Q6e (not the formal
    // print wire path). consume() above owns that path through original _y;
    // forwarding SDK twins as internal events here would duplicate them.
    const message=arriving
    if(message&&frame.type===message.type&&(
     ('uuid'in message&&frame.uuid===message.uuid)||
     (message.type==='stream_event'&&frame.event===message.event)||
     (message.type==='active_goal'&&frame.value===message.value)||
     (message.type==='tombstone'&&frame.message===message.message)
    )){
     arriving=undefined
     yield message
    }
   }
  }finally{
   try{if(!completed)await source.drain(params.toolUseContext.abortController)}
   finally{active=undefined;arriving=undefined}
  }
 }}
}
export function getPrintQueryStream287(scope:PrintScopeState287|undefined,lifecycle:Pick<import('./arrivalStageNative.js').ArrivalStage287,'interrupt'|'disposeController'>):PrintQueryStream287 {
 const stream=scope?.queryStream287??createPrintQueryStream287(lifecycle,scope)
 if(scope)scope.queryStream287=stream
 return stream
}
