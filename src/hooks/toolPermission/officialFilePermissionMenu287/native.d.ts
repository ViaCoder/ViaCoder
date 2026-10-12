import type {ReactNode} from 'react'
import type {OfficialPermissionDescriptor287} from '../officialPermissionDescriptors287/native.js'
import type {OfficialRltPermissionAnswer287} from '../../../utils/officialRlt287.js'
export interface FilePermissionMenuProps287 {payload:OfficialPermissionDescriptor287;answer(value:OfficialRltPermissionAnswer287):boolean}
export interface FilePermissionOption287 {type:string;row?:unknown}
export interface FilePermissionChoice287 {value:string;label:ReactNode;option:FilePermissionOption287;type?:'input';onChange?:(text:string)=>void}
export interface FilePermissionMenu287 {
 be(props:Record<string,unknown>):import('react').ReactNode;
 readonly Ci:unknown;
 r4e(props:FilePermissionMenuProps287):ReactNode
 I6e(input:Record<string,unknown>):FilePermissionChoice287[]
 _ro(option:FilePermissionOption287,payload:OfficialPermissionDescriptor287,feedback?:string):OfficialRltPermissionAnswer287
 _me(input:Record<string,unknown>):Record<string,unknown>
 Svt(value:string):'accept'|'reject'|undefined
 j(props:{chord:string;action:string}):ReactNode
 ba(props:{children?:ReactNode;paddingX?:number;marginTop?:number;marginBottom?:number}):ReactNode
}
export function createOfficialFilePermissionMenu287(ports:Record<string,unknown>):FilePermissionMenu287
