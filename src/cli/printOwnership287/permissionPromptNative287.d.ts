import type {CanUseToolFn} from '../../hooks/useCanUseTool.js'
import type {PermissionPromptTool} from '../../utils/queryHelpers.js'
import type {StructuredIO} from '../structuredIO.js'
import type {Tool} from '../../Tool.js'
export interface PrintPermissionPromptBinding287 {swept:boolean}
export interface PrintPermissionPromptNative287 {
 Ew(tool:PermissionPromptTool|null,isSwept?:()=>boolean):CanUseToolFn
 PI(name:string|undefined,io:StructuredIO,readTools:()=>Tool[],onPrompt?:Parameters<StructuredIO['createCanUseTool']>[0],binding?:{isPromptToolServerSwept():boolean},permissionPrompts?:'none'):CanUseToolFn
}
export function createPrintPermissionPromptNative287(ports:object):PrintPermissionPromptNative287
