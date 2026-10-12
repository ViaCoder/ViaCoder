import type {ReactNode,ElementType} from 'react'
import type {OriginalAssemblerAttachment287} from '../attachmentAssembler287.js'
export interface AttachmentRenderAddonPorts287 {memoCache(size:number):unknown[];jsx(type:ElementType,props:Record<string,unknown>):ReactNode;jsxs(type:ElementType,props:Record<string,unknown>):ReactNode;Box:typeof import('../../ink.js').Box;Text:typeof import('../../ink.js').Text;MessageResponse:typeof import('../../components/MessageResponse.js').MessageResponse}
export function createAttachmentRenderAddon287(ports:AttachmentRenderAddonPorts287):(props:{attachment:Extract<OriginalAssemblerAttachment287,{type:'at_mention_reference'|'selected_lines_in_diff'|'tool_hosts_notice'|'tool_hosts_correction'}>})=>ReactNode
