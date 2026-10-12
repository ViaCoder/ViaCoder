import {createMcpPermissionOverride287,type McpPermissionOverrideHost287,type McpPermissionOverrideRequest287,type McpPermissionOverrideResponse287} from './mcpPermissionOverride287Native.js'
import {getPrintHostSource287} from './publicHostRuntime287.js'
import {logForDebugging} from '../../utils/debug.js'

/** Complete original Qt/dt, borrowing the actual qualification and sanitizing
 * readers. This adapter owns no permission state, feature client, or router. */
export function getMcpPermissionOverridePorts287(){
 return {
  Hr:getPrintHostSource287('chunk-c9me9cp7.js','Hr') as new(message:string)=>Error,
  kh:getPrintHostSource287('chunk-hrhfcbdv.js','kh') as (mode:string)=>string|undefined,
  Sse:getPrintHostSource287('chunk-hrhfcbdv.js','Sse') as string,
  Kt:getPrintHostSource287('chunk-hrhfcbdv.js','Kt') as (name:string)=>string,
  Jo:getPrintHostSource287('chunk-hrhfcbdv.js','Jo') as (values:Readonly<Record<string,'default'|'auto'>>,name:string)=>Record<string,'default'|'auto'>,
  hE:getPrintHostSource287('chunk-4zgx6txq.js','hE') as ()=>boolean,
  Z4:getPrintHostSource287('chunk-4zgx6txq.js','Z4') as ()=>string|null,
  NX:getPrintHostSource287('chunk-4zgx6txq.js','NX') as (reason:string)=>string|undefined,
  t:logForDebugging,
 }
}
export function createPrintMcpPermissionOverride287(host:McpPermissionOverrideHost287){
 const controller=createMcpPermissionOverride287(getMcpPermissionOverridePorts287())
 const W4t=getPrintHostSource287('chunk-n2zepamy.js','W4t') as (
  method:typeof controller.dt,request:McpPermissionOverrideRequest287,context:McpPermissionOverrideHost287,
 )=>McpPermissionOverrideResponse287
 return (request:McpPermissionOverrideRequest287)=>W4t(controller.dt,request,host)
}
