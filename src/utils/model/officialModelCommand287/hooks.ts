import type {LocalJSXCommandContext} from '../../../types/command.js'
import {sourceModelChange287} from '../../hooks/modelSwitch287/modelChange.js'
import {getModelSwitchCaller287,withModelSwitchCaller287} from '../../hooks/modelSwitch287/caller.js'
import type {ModelSwitchHookDecision287,ModelCommandSession287} from './native.js'
export type ModelCommandHookPorts287={
 FPr:(session:ModelCommandSession287,input:{fromModel:string;toModel:string;requestedModel:string|null;source:string},options:{signal?:AbortSignal})=>Promise<ModelSwitchHookDecision287>;
 postModelChange:(session:ModelCommandSession287,source:string,model:string|null)=>void;
}
// Binding a dispatcher is not an entitlement/cache. No default proceed exists.
let dispatch:ModelCommandHookPorts287|undefined
let caller:LocalJSXCommandContext|undefined
export function installOfficialModelCommandCaller287(context:LocalJSXCommandContext):()=>void{const previous=caller;caller=context;return()=>{if(caller===context)caller=previous}}
export function installOfficialModelCommandHookPorts287(ports:ModelCommandHookPorts287):()=>void {
 const previous=dispatch;dispatch=ports;return ()=>{if(dispatch===ports)dispatch=previous}
}
export async function dispatchOriginalPreModelSwitch287(...args:Parameters<ModelCommandHookPorts287['FPr']>){
 if(dispatch)return dispatch.FPr(...args)
 const {runOriginalPreModelSwitch287}=await import('../../hooks/modelSwitch287/runtime.js')
 const context=getModelSwitchCaller287()??caller
 return context?withModelSwitchCaller287(context,()=>runOriginalPreModelSwitch287(...args)):runOriginalPreModelSwitch287(...args)
}
export function dispatchOriginalModelChange287(...args:Parameters<ModelCommandHookPorts287['postModelChange']>){
 return dispatch?dispatch.postModelChange(...args):sourceModelChange287.l$o(...args)
}
