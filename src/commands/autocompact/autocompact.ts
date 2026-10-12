import type { LocalCommandCall, LocalJSXCommandContext } from '../../types/command.js'
import {createAutoCompactCommand287} from '../../state/officialAutoCompactState287/native.js'
import {getOriginalModsLifecycle287} from '../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import { localAutoCompactHost } from './host.js'
export type CompactWindow = { window:number; configured:number; source:'auto'|'experiment'|'clientdata'|'env'|'unknown-model'|'model-default'|'settings' }
export type AutoCompactHost = {
  resolve(model:string, override:number|undefined): CompactWindow
  readSetting(): number | undefined
  saveSetting(value:number|undefined): Promise<{error?:Error|null}>
  isEnabled(): boolean
  apply(value:number|null): void
}
export type AutoCompactCommandContext = LocalJSXCommandContext & {commandRuntime?:{autoCompact?:AutoCompactHost}; options:LocalJSXCommandContext['options'] & {autoCompactWindow?:number}}
/** Complete 287 w/vRt/Oss; only the documented host boundary and telemetry C are adapted. */
export function getAutoCompactCommandPorts287(context:AutoCompactCommandContext) {
  const host=context.commandRuntime?.autoCompact ?? localAutoCompactHost(context)
  const compact=(name:string)=>(...args:unknown[])=>(getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js')[name] as (...values:unknown[])=>any)(...args)
  return {
    fr:(value:number)=>(getOriginalModsLifecycle287().clearSourceModule287('chunk-m59srz4k.js').fr as (n:number)=>string)(value),
    tt:()=>({autoCompactWindow:host.readSetting()}),
    hn:(_source:string,patch:{autoCompactWindow?:number})=>host.saveSetting(patch.autoCompactWindow),
    // Production consumes complete original Vu/wE. A custom command host's
    // scalar-model boundary is an explicit injected host, never eligibility.
    Vu:context.commandRuntime?.autoCompact ? (model:string)=>model : compact('Vu'),
    wE:context.commandRuntime?.autoCompact ? (model:string,override:number|undefined)=>host.resolve(model,override) : compact('wE'),
    bm:()=>host.isEnabled(),
    xHt:(value:string)=>(getOriginalModsLifecycle287().clearSourceModule287('chunk-mphp7acd.js').xHt as (s:string)=>number|'auto'|undefined)(value),
    i:()=>{},S:(value:unknown)=>value, // Frozen telemetry cancellation.
  }
}
function commandSource(context:AutoCompactCommandContext){return createAutoCompactCommand287(getAutoCompactCommandPorts287(context))}
function eventContext(context:AutoCompactCommandContext){
  const host=context.commandRuntime?.autoCompact ?? localAutoCompactHost(context)
  // Original Ml/IJ builds this option from the owning AppState snapshot. The
  // legacy local command context lacks that projection; do not infer settings.
  return {...context,options:{...context.options,autoCompactWindow:context.getAppState().autoCompactWindow},onQueryEvent:(event:{type:'apply_flag_settings';settings:{autoCompactWindow:number|null}})=>host.apply(event.settings.autoCompactWindow)}
}
export async function applyAutoCompactWindow(args:string,context:AutoCompactCommandContext):Promise<string>{
  return commandSource(context).vRt(args,eventContext(context))
}
export const call:LocalCommandCall=async(args,context)=>{
  const ctx=context as AutoCompactCommandContext
  return commandSource(ctx).Oss(args,eventContext(ctx))
}
