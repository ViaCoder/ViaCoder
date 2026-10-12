import type {PermissionDecision,PermissionAskDecision} from '../../../types/permissions.js'
import type {PermissionUpdate} from '../../../utils/permissions/PermissionUpdateSchema.js'
export function createPermissionHookRunner287(ports:Record<string,unknown>):(mode:string,suggestions:PermissionUpdate[]|undefined,suppress:boolean,ended:()=>boolean,updatedInput:Record<string,unknown>|undefined,time:number)=>Promise<PermissionDecision|{reprompted:PermissionAskDecision;finalInput:Record<string,unknown>}|null>
