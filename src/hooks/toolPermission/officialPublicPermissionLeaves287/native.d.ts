import type {ReactNode} from 'react'
import type {StructuredPatchHunk} from 'diff'
import type {FileEdit} from '../../../tools/FileEditTool/types.js'
export interface PublicPermissionLeaves287 {
 She(props:{file_path:string;edits:FileEdit[];remoteOldContent?:string;skipLocalRead?:boolean}):ReactNode
 vhe(props:{notebook_path:string;cell_id?:string;new_source:string;cell_type?:'code'|'markdown';edit_mode?:'replace'|'insert'|'delete';verbose:boolean;width:number;oldCellSource?:string;remoteOldContent?:string;skipLocalRead?:boolean}):ReactNode
 _6e(path:string,edits:FileEdit[],remoteOldContent:string|undefined,skipLocalRead:boolean):Promise<{patch:StructuredPatchHunk[];firstLine:string|null;fileContent:string|undefined}>
}
export function createPublicPermissionLeaves287(ports:Record<string,unknown>):PublicPermissionLeaves287
