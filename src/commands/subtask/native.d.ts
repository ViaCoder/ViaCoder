import type {LocalJSXCommandCall} from '../../types/command.js'
import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
export type SubtaskCommandPorts287={
 QRt:(prompt:string,context:Parameters<LocalJSXCommandCall>[1],canUseTool:CanUseToolFn)=>Promise<{agentId:string;name:string}|null>
 pT:string
 Ea:()=>boolean
 kf:CanUseToolFn
}
export function createSubtaskCommand287(ports:SubtaskCommandPorts287):{call:LocalJSXCommandCall}
