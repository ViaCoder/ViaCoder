import {createConfigWriterComplete287,createConfigCallComplete287,createBriefComplete287,createGoalRegistrationComplete287,createGoalCallComplete287,createWebRegistrationComplete287,createConfigPresentationComplete287,createGoalUiComplete287} from './officialPublicCommandDiscovery287/completions.js'
import proof from './officialPublicCommandDiscovery287/completions.provenance.json' with {type:'json'}
import {Dm} from './noticeText287.js'
import {withCommandFlagEvents287} from './commandFlagEvents287.js'
import {publicCommandSourcePort287} from './commandCompletionProducers287.js'
import type {LocalJSXCommandContext} from '../types/command.js'
type Group287='configWriter'|'configCall'|'brief'|'goalRegistration'|'goalCall'|'webRegistration'|'goalUi'|'configUi'
// Source imports are live references to the single existing namespace. Neither
// this facade nor any factory below owns auth/settings/plugin options caches.
export function commandCallbackPorts287(group:Group287):Record<string,unknown>{
 return Object.defineProperties({},Object.fromEntries(proof.groups[group].ports.map(p=>[p.name,{enumerable:true,get:()=>{
  if(p.module==='chunk-69cpcmpv.js'&&p.imported==='Dm')return Dm
  if(group==='goalUi'&&p.module==='chunk-t1n6x7q0.js'&&p.imported==='z')return (require('../state/AppState.js') as typeof import('../state/AppState.js')).useAppState
  if(p.module==='chunk-b5kmgz2n.js'&&p.imported==='on')return (require('../services/policyLimits/index.js') as typeof import('../services/policyLimits/index.js')).isPolicyAllowed
  if(group==='configCall'&&p.module==='chunk-z1f7z2ra.js'){
   const controller=getConfigWriterController287()
   return ({Hst:controller.apply,Fxt:controller.parse,Dst:controller.format,$xt:controller.list} as Record<string,unknown>)[p.imported]
  }
  return publicCommandSourcePort287(p.module,p.imported)
 }}])))
}
let config:ReturnType<typeof createConfigWriterComplete287>|undefined
export function getConfigWriterController287(){
 return config??=createConfigWriterComplete287(Object.assign(commandCallbackPorts287('configWriter'),{
  requireCommandModule287:(module:string)=>{
   if(module==='/$bunfs/root/chunk-tnwx1mmk.js')return {isBriefEntitled:publicCommandSourcePort287('chunk-q1yatwsf.js','wen')}
   throw Error('Unknown config writer source module '+module)
  },
 }))
}
let configCall:ReturnType<typeof createConfigCallComplete287>|undefined
export const configNonInteractiveCall287:import('../types/command.js').LocalCommandCall=(args,context)=>(configCall??=createConfigCallComplete287(commandCallbackPorts287('configCall'))).call(args,context)
export function getConfigPanelRows287(context:LocalJSXCommandContext,bindings:Record<string,unknown>,pluginPresentation?:{shown:Map<string,unknown>;onShown(key:string,value:unknown):void}){
 const controller=getConfigWriterController287()
 const inputs={...controller.inputs(context),...bindings}
 const rows=controller.descriptors(inputs)
 const settings=pluginPresentation ? [...rows.settings,...controller.pluginRows(context.getAppState().plugins?.enabled??[],{storageV5:context.storageV5,...pluginPresentation})] : controller.joinPluginRows(rows.settings,context)
 return {...rows,settings:settings.map(row=>controller.decorate(row))}
}
export const getConfigDescriptionKey287=createConfigPresentationComplete287({}).key
export function getConfigDescriptionRevision287(){return publicCommandSourcePort287('chunk-mphp7acd.js','zin') as {get():number;subscribe(listener:()=>void):()=>void;bump():void}}
let briefCommand:import('../types/command.js').Command|undefined
let brief:ReturnType<typeof createBriefComplete287>|undefined,goal:ReturnType<typeof createGoalRegistrationComplete287>|undefined,goalCall:ReturnType<typeof createGoalCallComplete287>|undefined,web:ReturnType<typeof createWebRegistrationComplete287>|undefined
export function getBriefCommand287(){
 if(briefCommand)return briefCommand
 const original=(brief??=createBriefComplete287(commandCallbackPorts287('brief'))).command
 if(original.type!=='local-jsx')throw Error('Original brief command type')
 briefCommand={...original,load:async()=>{const module=await original.load();return {call:(onDone,context,args)=>module.call(onDone,withCommandFlagEvents287(context),args)}}}
 return briefCommand
}
export function getGoalNonInteractiveCommand287(){return (goal??=createGoalRegistrationComplete287(Object.assign(commandCallbackPorts287('goalRegistration'),{
 importCommandModule287:(module:string)=>{
  if(module==='/$bunfs/root/chunk-6cnz4kq2.js')return import('../commands/goal/goal-noninteractive287.js')
  return Promise.reject(Error('Unknown goal source module '+module))
 },
}))).command}
export function getGoalInteractiveRegistration287(){getGoalNonInteractiveCommand287();return goal!.interactive}
export const goalNonInteractiveCall287:import('../types/command.js').LocalCommandCall=(args,context)=>(goalCall??=createGoalCallComplete287(commandCallbackPorts287('goalCall'))).call(args,context)
export function getWebSetupRegistration287(){return (web??=createWebRegistrationComplete287(commandCallbackPorts287('webRegistration'))).command}

let goalUi:ReturnType<typeof createGoalUiComplete287>|undefined
/** The complete published interactive handler and status dialog, using the
 * same TXe/kXe session registry and message actor as the headless command. */
export const goalInteractiveCall287:import('../types/command.js').LocalJSXCommandCall=(onDone,context,args)=>(goalUi??=createGoalUiComplete287(commandCallbackPorts287('goalUi'))).call(onDone,context,args)
