import type { CanUseToolFn } from '../../../hooks/useCanUseTool.js'
import type { Tool, ToolPermissionContext } from '../../../Tool.js'
import type { PermissionDecision } from '../../../utils/permissions/PermissionResult.js'
import type { ParseForSecurityResult } from '../../../utils/bash/ast.js'
export interface DreamReadPermissionPorts287 {
 O8n(tool:Tool,input:Record<string,unknown>,context:ToolPermissionContext):{message:string}|null;
 BC(tool:Tool,input:Record<string,unknown>,context:ToolPermissionContext):PermissionDecision;
 No(path:string):string[]; VUt():boolean;
}
export interface DreamPolicyPorts287 extends DreamReadPermissionPorts287 {
 o0(path:string):boolean;Na(path:string):string;Gr:string;kl(path:string):boolean;
 CG(command:string):Promise<ParseForSecurityResult>;N_t():string;oz():boolean;
 C(tool:Tool,reason:string):PermissionDecision;
 JQe:string;ic:string;dt:string;Jr:string;co:string;dI:string;Ue:string;wt:string;Ot:string;Sn:string;$a():boolean;Ce:string;
}
export interface DreamPolicySource287 {
 PHn(root:string,items?:unknown,options?:{fork?:string;onWriteAllowed?:(path:string,toolUseID:string)=>void}):CanUseToolFn;
 Ze(command:string,root:string):Promise<string[]|undefined>;
 Qe(command:string,root:string):string[]|undefined;
 Grt(path:string,root:string):boolean;nK(path:string,root?:string):boolean;xHn:string;
}
export declare function createDreamPolicySource287(ports:DreamPolicyPorts287):DreamPolicySource287;
export declare function settleDreamWrites287(writes:Map<string,string>,failed:Set<string>,successful:boolean):{dreamWrote:Set<string>;mayHaveWritten:Set<string>};
