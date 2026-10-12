import type {PermissionDecision,PermissionDecisionReason} from '../../../types/permissions.js'
import type {ReactNode} from 'react'
export interface PermissionNoticeProps287 {permissionResult:PermissionDecision;toolType:'tool'|'command'|'edit'|'read'}
export function createFilePermissionNoticeCaller287(e:unknown,s:unknown,Tb:unknown):(payload:Pick<PermissionNoticeProps287,'permissionResult'>)=>ReactNode;
export function createPermissionNotice287(ports:Record<string,unknown>):{
 qs(props:{multiline?:boolean;children?:ReactNode}):ReactNode;
 Tb(props:PermissionNoticeProps287):ReactNode;
 Pt(props:Pick<PermissionNoticeProps287,'permissionResult'>):ReactNode;
 Me(reason:PermissionDecisionReason|undefined,toolType:PermissionNoticeProps287['toolType'],mode:string):{reasonString:string;configString?:string;themeColor?:string}|null;
 Ot(reason:PermissionDecisionReason|undefined):unknown;
}
