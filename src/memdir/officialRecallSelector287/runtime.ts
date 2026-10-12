import {relative} from 'node:path'
import {lstat} from 'node:fs/promises'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getRecallIndexNamespace287} from '../officialRecallStartup287/runtime.js'
import {sideQuery} from '../../utils/sideQuery.js'
import {getDefaultSonnetModel} from '../../utils/model/model.js'
import {logForDebugging} from '../../utils/debug.js'
import {errorMessage,isAbortError} from '../../utils/errors.js'
import {logError} from '../../utils/log.js'
import {logEvent} from '../../services/analytics/index.js'
import {createChildAbortController} from '../../utils/abortController.js'
import {getUserMessageText} from '../../utils/messages.js'
import {readFileInRange} from '../../utils/readFileInRange.js'
import {memoryHeader} from '../../utils/attachments.js'
import {findRelevantMemories} from '../findRelevantMemories.js'
import {FILE_READ_TOOL_NAME} from '../../tools/FileReadTool/prompt.js'
import type {MemoryHeader} from '../memoryScan.js'
import type {ToolUseContext,ToolPermissionContext} from '../../Tool.js'
import type {Message} from '../../types/message.js'
import type {QuerySource} from '../../constants/querySource.js'
import type {ExecutionSession287} from '../../services/context/officialExecutionOwners287/native.js'
import {SELECT_MEMORIES_SYSTEM_PROMPT} from './frozenPrompt.js'
import {createRecallSelector287,type RecallSelector287,type RecallSelectorPorts287,type RecallContext287,type RecallSelectorState287} from './native.js'

function namespace<T extends object>(file:string):Record<string,unknown>&T {
 return getOriginalModsLifecycle287().clearSourceModule287(file) as Record<string,unknown>&T
}
/** Imported callables are read when the original caller actually uses them.
 * In particular a disabled WHr gate must not initialize semantic-only imports. */
function installedFunction<F extends (...args:never[])=>unknown>(file:string,name:string):F {
 const value=namespace(file)[name]
 if(typeof value!=='function')throw Error('Original public Recall dependency is not installed: '+file+':'+name)
 return value as F
}
export function getRecallSelectorPorts287():RecallSelectorPorts287 {
 const gates=namespace<{
  Xs:()=>string;VH:()=>{warmCanonicalWcRoot():Promise<void>};qd:()=>boolean;E8:()=>boolean;bJe:()=>boolean;RKr:()=>((path:string)=>boolean)|undefined
  wpe:(model:string)=>[number|false|undefined,number]
 }>('chunk-nankzm0s.js')
 const stores=namespace<{
  _$e:(directory:string,signal:AbortSignal,storageV5?:unknown,options?:{regularFilesOnly:boolean})=>Promise<MemoryHeader[]>
  aNt:(headers:MemoryHeader[])=>string;y$e:(directory:string)=>Set<string>|null;Hut:(path:string,mounts:Set<string>|null)=>boolean
  iNt:()=>{excluded:Set<string>;excludedPrefixes:string[]}|null
 }>('chunk-09m4fzsj.js')
 const fence=namespace<{
  Ljr:(deadline:number,signal:AbortSignal)=>Promise<void>;Xmt:number;YYe:()=>boolean;$jr:()=>boolean;Ujr:(signal:AbortSignal)=>Promise<void>
  C2o:(agent:string,scope:'user'|'project'|'local')=>Promise<{dir:string;regularFilesOnly:boolean;containedIn?:string}|null>
  vxe:()=>boolean;a3:()=>boolean;Pxe:(path:string,context:ToolPermissionContext)=>boolean;A2o:(path:string,directory:string)=>Promise<boolean>;whn:readonly string[]
 }>('chunk-6xrs6gmd.js')
 const memoryText=namespace<{jQ:(text:string)=>string;Wjt:(text:string)=>string;BQ:number;wbe:number}>('chunk-x02yxv10.js')
 const failures=namespace<{PQe:(error:unknown)=>boolean;xQe:(error:unknown)=>boolean}>('chunk-wgt53hn2.js')
 const source=namespace<{$7t:(text:string)=>string[]}>('chunk-mphp7acd.js')
 const reads=namespace<{oht:(messages:ReadonlyArray<Message>,model:string,unused:undefined,session:ExecutionSession287)=>boolean}>('chunk-1b21she7.js')
 const permission=namespace<{pe:(context:ToolUseContext)=>ToolPermissionContext}>('chunk-m4akk3an.js')
 const primitives=namespace<{Y:typeof JSON.parse}>('chunk-q80zaav8.js')
 const jsonText=namespace<{eW:(text:string)=>string}>('chunk-1cedw4af.js')
 const identity=<T>(value:T)=>value
 // Only function transportation lives here. All directory, trust, mount,
 // selector history and zt index storage stay with their existing owners.
 const ports:RecallSelectorPorts287={
  Xs:gates.Xs,VH:gates.VH,qd:gates.qd,E8:gates.E8,bJe:gates.bJe,RKr:gates.RKr,wpe:gates.wpe,
  _$e:(...args:Parameters<typeof stores._$e>)=>installedFunction<typeof stores._$e>('chunk-09m4fzsj.js','_$e')(...args),
  aNt:(...args:Parameters<typeof stores.aNt>)=>installedFunction<typeof stores.aNt>('chunk-09m4fzsj.js','aNt')(...args),y$e:stores.y$e,Hut:stores.Hut,iNt:stores.iNt,
  Ljr:(...args:Parameters<typeof fence.Ljr>)=>installedFunction<typeof fence.Ljr>('chunk-6xrs6gmd.js','Ljr')(...args),
  Xmt:fence.Xmt,YYe:fence.YYe,
  $jr:()=>installedFunction<typeof fence.$jr>('chunk-6xrs6gmd.js','$jr')(),
  Ujr:(...args:Parameters<typeof fence.Ujr>)=>installedFunction<typeof fence.Ujr>('chunk-6xrs6gmd.js','Ujr')(...args),
  C2o:(...args:Parameters<typeof fence.C2o>)=>installedFunction<typeof fence.C2o>('chunk-6xrs6gmd.js','C2o')(...args),
  vxe:fence.vxe,a3:fence.a3,Pxe:fence.Pxe,
  A2o:(...args:Parameters<typeof fence.A2o>)=>installedFunction<typeof fence.A2o>('chunk-6xrs6gmd.js','A2o')(...args),whn:fence.whn,
  Aor:relative,oht:reads.oht,pe:permission.pe,$7t:source.$7t,
  t2:sideQuery,Mor:SELECT_MEMORIES_SYSTEM_PROMPT,
  findRelevantMemories287:findRelevantMemories,
  // Frozen C from the replaced caller: one configured Sonnet request, no
  // selector-refusal rotation/injected retry prompt or parallel model task.
  async requestSelectorOnce287(run,signal){signal.throwIfAborted();return {result:await run(getDefaultSonnetModel()),refusals:0}},
  PQe:failures.PQe,xQe:failures.xQe,Y:primitives.Y,eW:jsonText.eW,
  t:logForDebugging,l:errorMessage,d:logError,at:isAbortError,c:identity,
  p:(feature:string,code:string,fields?:Parameters<typeof logEvent>[1])=>logEvent('tengu_feature_sad',{...fields,feature_name:feature as never,error_code:code as never}),
  y:(feature:string,fields?:Parameters<typeof logEvent>[1])=>logEvent('tengu_feature_ok',{...fields,feature_name:feature as never}),i:logEvent,
  yh:getUserMessageText,th:createChildAbortController,Ake:readFileInRange,Uor:lstat,
  wbe:200,BQ:memoryText.BQ,jQ:memoryText.jQ,Wjt:memoryText.Wjt,x3:memoryHeader,dt:FILE_READ_TOOL_NAME,
  importRecallIndex287:async()=>({searchMemoryFilesWithIndex:getRecallIndexNamespace287().Jo}),
 }
 for(const name of ['Xs','VH','qd','E8','bJe','RKr','wpe','_$e','aNt','y$e','Hut','iNt','Ljr','YYe','$jr','Ujr','C2o','vxe','a3','Pxe','A2o','Aor','oht','pe','$7t','t2','requestSelectorOnce287','PQe','xQe','Y','eW','jQ','Wjt']){
  if(typeof ports[name]!=='function')throw Error('Original public Recall dependency is not installed: '+name)
 }
 return ports
}
var runtime:RecallSelector287|undefined
export function getRecallSelector287():RecallSelector287 {return runtime??=createRecallSelector287(getRecallSelectorPorts287())}
function hasRecallContext(context:ToolUseContext):context is RecallContext287 {
 const state:unknown=Reflect.get(context,'memorySelector')
 if(!state)return false
 if(typeof state!=='object'||typeof Reflect.get(state,'stateByDir')!=='object'||Reflect.get(state,'stateByDir')===null)throw Error('Actual Memory selector owner has an invalid state ABI')
 const session:unknown=Reflect.get(context,'session')
 if(!session||typeof session!=='object'||!Reflect.get(session,'host')||!Reflect.get(session,'root'))throw Error('Actual Memory selector caller lacks its execution session')
 return true
}
export function startRecallMemoryPrefetch287(messages:ReadonlyArray<Message>,context:ToolUseContext,querySource:QuerySource){
 if(!hasRecallContext(context))return undefined
 return getRecallSelector287().prefetch(messages,context,querySource,context.storageV5)
}
export type {RecallSelectorState287}
