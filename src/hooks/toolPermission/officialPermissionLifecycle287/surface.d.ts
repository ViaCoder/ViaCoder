import type {ExecutionSession287} from '../../../services/context/officialExecutionOwners287/native.js'
import type {PermissionDecisionReason} from '../../../types/permissions.js'
import type {ToolPermissionContext} from '../../../Tool.js'
import type {PermissionUpdate} from '../../../utils/permissions/PermissionUpdateSchema.js'
export function createPermissionSurface287(ports:Record<string,unknown>):{
 f2t(session:ExecutionSession287,reason:PermissionDecisionReason|undefined,context:ToolPermissionContext):'host_dialog'|undefined;
 TWo(session:ExecutionSession287,updates:PermissionUpdate[]):void
}
