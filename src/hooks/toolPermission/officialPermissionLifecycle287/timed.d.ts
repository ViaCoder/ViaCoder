import type {OfficialRltUiEvents287} from '../../../state/officialRltUiEvents287.js'
import type {PermissionAskDecision,PermissionDenyDecision,PermissionDecisionReason} from '../../../types/permissions.js'
import type {Tool,ToolUseContext,ToolPermissionContext} from '../../../Tool.js'
export interface PermissionTiming287 {
 sRo<T extends object>(value:T,deadlineEpochMs:number):T&{deadlineEpochMs:number}
 Zko<T extends object>(value:T,deadlineEpochMs:number):T&{deadlineEpochMs:number}
 iRo(value:NonNullable<PermissionAskDecision['denialLimitFallback']>):NonNullable<PermissionAskDecision['denialLimitFallback']>
 Ext():number;Qko():number;r4e():void;Lin(context:ToolUseContext):void
 AKt(disclosure:Extract<PermissionDecisionReason,{type:'classifier'}>,timeout?:{autoDenyAfterMs:number;resolution:PermissionDenyDecision}):NonNullable<PermissionAskDecision['denialLimitFallback']>
 eKt(timeout:{autoDenyAfterMs:number;resolution:PermissionDenyDecision}):NonNullable<PermissionAskDecision['autoDenyWindow']>
 x5e(kind:string):boolean;ZVn(listener:()=>void):()=>void
 sD(tool:Tool,context:ToolPermissionContext):string;Ta(mode:string,skipPlan?:boolean):boolean
 Oo:OfficialRltUiEvents287['autoDenyPresence']
}
export function createPermissionTiming287(ports:{ta:OfficialRltUiEvents287;Ce:()=>boolean;mf:()=>boolean}):PermissionTiming287
