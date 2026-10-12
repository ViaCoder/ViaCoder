import type {WorkflowDefinition,WorkflowMeta} from '../scripts.js'
export function createWorkflowRegistration287(ports:{ro():{bundledWorkflows:WorkflowDefinition[]}}):(script:string,meta:WorkflowMeta,options?:{disableModelInvocation?:()=>boolean})=>void
