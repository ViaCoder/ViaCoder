import {getPrintHostSource287} from './publicHostRuntime287.js'
import {getManualOAuthState287} from '../../services/mcp/manualOAuthOwner287.js'
import {createPrintManualOAuthCells287,createPrintManualOAuthDispatch287,createPrintManualOAuthHelpers287} from './manualOAuthNative287.js'
import proof from './manualOAuthProvenance287.json' with {type:'json'}
import type {ScopedMcpServerConfig} from '../../services/mcp/types.js'
import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
export interface PrintManualOAuthCaller287 {
 e:object;I:{storageV5?:unknown;credentials?:unknown};Qt:readonly {name:string;config:ScopedMcpServerConfig}[];
 Za:Set<string>;ii:Map<string,Promise<unknown>>;
 Ea():Pick<typeof import('../../services/mcp/auth.js'),'performMCPOAuthFlow'|'getOAuthCallbackSubmitter'|'setActiveOAuthPromise'|'getActiveOAuthPromise'>;
 is(name:string):ScopedMcpServerConfig|null|undefined;
 Ni(name:string,config:ScopedMcpServerConfig):void;
 os:import('./setCwdMcpRehomeNative287.js').SetCwdMcpRehomeNative287['os'];
 ji:import('./setCwdMcpRehomeNative287.js').SetCwdMcpRehomeNative287['ji'];
 We(frame:unknown,error:string):void;Ze(frame:unknown,response?:Record<string,unknown>):void;
 Hn(kind:string,message:string):void;nr(frame:unknown,subtype:string,error:unknown):void;
 i(event:string,data:Record<string,unknown>):void;t(message:string,options?:{level:string}):void;
}
/** All source dependencies use existing slots; no canonical append/native overwrite. */
export function createPrintManualOAuth287(caller:PrintManualOAuthCaller287){
 const bindings:Readonly<Record<string,{file:string;name:string}>>=proof.bindings
 const helperBindings:Readonly<Record<string,{file:string;name:string}>>=proof.helperBindings
 const helperPorts=new Proxy(caller,{has:(_,key)=>key==='qt'||typeof key==='string'&&(Object.hasOwn(caller,key)||Object.hasOwn(helperBindings,key)),get:(target,key,receiver)=>{
  if(key===Symbol.unscopables)return undefined
  if(key==='qt')return getManualOAuthState287
  if(Object.hasOwn(target,key))return Reflect.get(target,key,receiver)
  if(typeof key==='string'&&helperBindings[key])return getPrintHostSource287(helperBindings[key]!.file,helperBindings[key]!.name)
  throw Error('Original manual OAuth helper missing '+String(key))
 }})
 const helpers=createPrintManualOAuthHelpers287(helperPorts),cells=createPrintManualOAuthCells287(caller)
 const ports=new Proxy(caller,{has:(_,key)=>typeof key==='string'&&(Object.hasOwn(caller,key)||Object.hasOwn(cells,key)||Object.hasOwn(helpers,key)||Object.hasOwn(bindings,key)),get:(target,key,receiver)=>{
  if(key===Symbol.unscopables)return undefined
  if(Object.hasOwn(target,key))return Reflect.get(target,key,receiver)
  if(Object.hasOwn(cells,key))return Reflect.get(cells,key)
  if(Object.hasOwn(helpers,key))return Reflect.get(helpers,key)
  if(typeof key==='string'&&bindings[key])return getPrintHostSource287(bindings[key]!.file,bindings[key]!.name)
  throw Error('Original manual OAuth caller missing '+String(key))
 }})
 const dispatch=createPrintManualOAuthDispatch287(ports)
 return {tl:cells.tl,Rs:cells.Rs,dispatch:(frame:SDKControlRequest,Cr:(work:()=>unknown)=>void)=>dispatch(frame,Cr)}
}
