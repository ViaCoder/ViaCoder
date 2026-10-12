import type {StructuredIO} from '../../cli/structuredIO.js'
import type {StdoutMessage} from '../../entrypoints/sdk/controlTypes.js'
import {authEnvironment} from '../authEnvironment.js'
import {getPrintHostSource287} from '../../cli/printOwnership287/publicHostRuntime287.js'
import {getWorkflowLaunchAdmission287} from './runtime.js'
import {createWorkflowLaunchCallerNative287} from './callerNative.js'

// Original ingress admits the frame intact; the original Css owns validation.
// No account/environment/launch success is inferred from this local type.
export interface WorkflowLaunchEvent287 {
 type:'workflow_launch'
 uuid?:string
 [key:string]:unknown
}
export interface WorkflowLaunchCaller287 {
 readonly pending:number
 setup():Promise<unknown>
 resume():Promise<void>
 dispatch(event:WorkflowLaunchEvent287):Promise<void>
}
export interface WorkflowLaunchCallerPorts287 {
 r:StructuredIO
 e:{host:object}
 ht:{enqueue(event:StdoutMessage):void}
 q:()=>string
 qe:{readonly running:boolean}
 jd:{start():void}
}
export function createWorkflowLaunchCaller287(ports:WorkflowLaunchCallerPorts287):WorkflowLaunchCaller287 {
 return createWorkflowLaunchCallerNative287({...ports,a:authEnvironment,
  wx:getPrintHostSource287('chunk-2z1m9v0n.js','wx'),
  Le:getPrintHostSource287('chunk-4s38z9x2.js','Le'),
  t:getPrintHostSource287('chunk-q80zaav8.js','t'),
  Z:getPrintHostSource287('chunk-c9me9cp7.js','Z'),
  async importWorkflowCallerModule287(file:string){
   if(file==='chunk-grxq50ev.js'){
    const source=getWorkflowLaunchAdmission287()
    return {WORKFLOW_LAUNCH_DIGEST_ENV:source.wss,createWorkflowLaunchState:source.Ess,
     readWorkflowLaunchRecord:source.vss,handleWorkflowLaunchEvent:source.Css,
     resumeWorkflowLaunch:source.Ass,workflowLaunchHandoffs:source.LDn}
   }
   if(file==='chunk-0yrgwat2.js')return {fetchFilestoreBytes:getPrintHostSource287('chunk-x6qp8skz.js','cJo')}
   throw Error('Unexpected original workflow caller import: '+file)
  },
 })
}
