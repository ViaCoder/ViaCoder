import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import type {WorkflowDefinition,ParsedWorkflow} from '../scripts.js'
import {createWorkflowRegistration287} from './native.js'

interface WorkflowLoader287 {
 iCe(cwd:string,storageV5?:unknown):Promise<WorkflowDefinition[]>
 VDn():void
 _(directory:string,name:string,source:string,manifest:unknown,seen:Set<string>):Promise<WorkflowDefinition[]>
 v(file:string,name:string,source:string,manifest:unknown,seen:Set<string>):Promise<WorkflowDefinition|null>
}
interface WorkflowParser287 {
 F_(script:string,options?:{validateBody?:boolean;maxBytes?:number}):ParsedWorkflow|{error:string}
}
export function getWorkflowLoader287():WorkflowLoader287 {
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-57ewcm63.js') as unknown as WorkflowLoader287
}
export function getWorkflowParser287():WorkflowParser287 {
 return getOriginalModsLifecycle287().clearSourceModule287('chunk-pzbak5zb.js') as unknown as WorkflowParser287
}
export function getWorkflowRegistry287():{bundledWorkflows:WorkflowDefinition[]} {
 return getOriginalModsLifecycle287().commandRegistry() as unknown as {bundledWorkflows:WorkflowDefinition[]}
}
export function registerWorkflow287(script:string,meta:ParsedWorkflow['meta'],options?:{disableModelInvocation?:()=>boolean}):void {
 createWorkflowRegistration287({ro:getWorkflowRegistry287})(script,meta,options)
}
export function readBundledWorkflows287():readonly WorkflowDefinition[] {
 const original=getOriginalModsLifecycle287().clearLifecycleSource287('chunk-agp00faq.js','Vkt') as ()=>WorkflowDefinition[]
 return original()
}
