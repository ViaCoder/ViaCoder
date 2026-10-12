import {createPrintFileControlNative287,type PrintFileControlNative287,type PrintFileControlNativePorts287} from './printFileControlNative.js'
import {createPrintFileListCaller287} from './printFileCallerNative.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {realpath} from 'node:fs/promises'
import {dirname,join} from 'node:path'
import branchProof from './printFileControlProvenance.json' with {type:'json'}
import callerProof from './printFileCallerProof287.json' with {type:'json'}

export interface PrintFileStageBarrier287 {
 begin():(delay?:number)=>void;pending():number;
 whenSettled(input:{signal:AbortSignal;timeoutMs:number}):Promise<'settled'|'aborted'|'timed_out'>;
 resetBegun():void;aroundDownload(start:number):()=>Record<string,number>;
}
/** Actual hI session/caller cells. Accessors stay live, particularly Ne/Lt/v.
 * Main supplies its existing Cr/Xa/reply/config/MCP ports, not a second executor. */
export type PrintFileControlCallerPorts287 = {
 Cr?:(work:()=>unknown)=>void;Cy:number;Gn:object;Hn(kind:string,message:string):void;
 I:{storageV5?:unknown;credentials?:unknown;homeSeed?:{record:{noteStagedRow(row:unknown):void}}};
 Lt:{configs:Record<string,unknown>};Ne:boolean;No:unknown[];
 R(update:(state:any)=>any):void;v():any;
 We(message:unknown,error:string):void;Ze(message:unknown,response?:Record<string,unknown>):void;
 Xa():()=>void;e:object;_e:unknown;
 ea(names:Set<string>,reason:string):Promise<unknown>;jl(...args:unknown[]):Promise<unknown>;
 nr(message:unknown,subtype:string,error:unknown,options?:{expected?:boolean}):void;
 Nb:Record<string,string>;
 analytics(event:string,properties:Record<string,unknown>):void;
 Fd?:PrintFileStageBarrier287;mt?:(path:string)=>Promise<unknown>;
}
/** No cache Map or source-owner factory is allocated here. Fd and mt are original
 * caller slots, initialized only once if the current caller has not supplied them. */
export type PrintFileControlReceiver287=Omit<PrintFileControlNative287,'dispatch'>&{dispatch(message:Parameters<PrintFileControlNative287['dispatch']>[0],Cr?:(work:()=>unknown)=>void):Promise<boolean>}
export function createPrintFileControlRuntime287(caller:PrintFileControlCallerPorts287):PrintFileControlReceiver287 {
 const lifecycle=getOriginalModsLifecycle287()
 const loadCanonicalModule287=(file:string)=>lifecycle.importPublicSourceModule287('/$bunfs/root/'+file)
 const bindings:Readonly<Record<string,{file:string;name:string}>>={...branchProof.imports,...callerProof.imports}
 const moduleLocals=new Set(['Gk','Jk','Kk','Ry','cm','zk','op','sp','WA'])
 const normalizeFeature=getPrintHostSource287('chunk-n4qghq20.js','c') as (feature:string)=>string
 const normalizeErrorCode=getPrintHostSource287('chunk-c9me9cp7.js','tme') as (code:string)=>string
 // Preserve the accepted no-auto-telemetry C: only original branch call sites
 // enter the caller's existing analytics sink. No setup/send or new timer here.
 const adapters:Record<string,unknown>={loadCanonicalModule287,hw:realpath,Gl:dirname,RA:join,
 y:(feature:string,properties:Record<string,unknown>={})=>caller.analytics('tengu_feature_ok',{feature_name:normalizeFeature(feature),...properties}),
 m:(feature:string,errorCode:string,properties:Record<string,unknown>={})=>caller.analytics('tengu_feature_bad',{...properties,feature_name:normalizeFeature(feature),error_code:normalizeErrorCode(errorCode)}),
 p:(feature:string,errorCode:string,properties:Record<string,unknown>={})=>caller.analytics('tengu_feature_sad',{...properties,feature_name:normalizeFeature(feature),error_code:normalizeErrorCode(errorCode)}),
 }
 const ports=new Proxy(caller,{
 has(target,key){return typeof key==='string'&&(Object.hasOwn(target,key)||Object.hasOwn(adapters,key)||Object.hasOwn(bindings,key)||moduleLocals.has(key))},
 get(target,key,receiver){
  if(key===Symbol.unscopables)return undefined
  if(Object.hasOwn(target,key))return Reflect.get(target,key,receiver)
  if(typeof key==='string'&&Object.hasOwn(adapters,key))return adapters[key]
  if(typeof key==='string'&&moduleLocals.has(key))return getPrintHostSource287('chunk-xapeakym.js',key)
  if(typeof key==='string'&&Object.hasOwn(bindings,key)){const binding=bindings[key]!;return getPrintHostSource287(binding.file,binding.name)}
  throw Error('Original print file caller cell missing '+String(key))
 },
 set(target,key,value,receiver){if(!Object.hasOwn(target,key))throw Error('Original print file mutable cell missing '+String(key));return Reflect.set(target,key,value,receiver)},
 })
 if(!Object.hasOwn(caller,'Fd')){
  const My=getPrintHostSource287('chunk-xapeakym.js','My') as ()=>PrintFileStageBarrier287
  Object.defineProperty(caller,'Fd',{value:My(),enumerable:true})
 }
 if(!Object.hasOwn(caller,'mt'))Object.defineProperty(caller,'mt',{value:createPrintFileListCaller287(ports),enumerable:true})
 const native=createPrintFileControlNative287(ports as unknown as PrintFileControlNativePorts287)
 return {helpers:native.helpers,dispatch(message,Cr){
  if(!Cr)return native.dispatch(message)
  // Async detached branches retain this request's Cr; no shared reassignment.
  const requestPorts=new Proxy(ports,{has:(target,key)=>key==='Cr'||Reflect.has(target,key),get:(target,key,receiver)=>key==='Cr'?Cr:Reflect.get(target,key,receiver)})
  return createPrintFileControlNative287(requestPorts as unknown as PrintFileControlNativePorts287).dispatch(message)
 }}
}
