import type {Tool} from '../../../Tool.js'
import type {McpListChangedPorts287,ListChangedClientModule287} from './native.js'
export function readMcpListChangeBindings287():Omit<McpListChangedPorts287,'Ql'|'t'|'GS'|'mbe'>
export function readMcpListChangeClient287():Pick<ListChangedClientModule287,'onMcpToolListChanged'|'onMcpPromptListChanged'|'onMcpResourceListChanged'|'fetchResourceTemplatesForClient'>
/** Original complete Vlr, preserving exact input Tool references. */
export function filterStaticMcpTools287(tools:readonly Tool[],serverNames:string[]):Tool[]
