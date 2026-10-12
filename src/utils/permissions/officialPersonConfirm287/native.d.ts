import type {ToolUseContext} from '../../../Tool.js'
import type {PermissionMode,ToolPermissionContext} from '../../../types/permissions.js'
import type {CanUseToolFn} from '../../../hooks/useCanUseTool.js'
import type {NativeRootContextCell286} from '../../officialFetchRequestState286/runtime.js'
export type ConfirmationLayer287 =
 | {kind:'allowed_tools';allowedTools:readonly string[]}
 | {kind:'disallowed_tools';disallowedTools:readonly string[]}
 | {kind:'bash_command_clamp';rules:unknown}
 | {kind:'avoid_prompts'|'sandbox_auto_allow_suspended'}
 | {kind:'permission_mode';mode:PermissionMode}
 | {kind:'working_directory';directory:string}
 | {kind:'effort'|'model'|'max_thinking_tokens'|'flag_settings';[key:string]:unknown}
export type PermissionSnapshot287={readonly mode:PermissionMode;readonly autoClassifierActive:boolean;toJSON():undefined}
export type ConfirmationContext287 = ToolUseContext & {
 session?: {root:object}
 permissionLayers?: readonly ConfirmationLayer287[]
 permissionModeAtRequest?: PermissionSnapshot287
 forRemoteExecution?: boolean
 forPromptShellCommand?: boolean
}
export type ConfirmationOutcome287<T> =
 | {kind:'chose';value:T}
 | {kind:'declined';typedAnswer?:string}
 | {kind:'aborted'}
 | {kind:'unanswered';reason:'no_one_to_ask'|'no_selection'|'error'}
export type ConfirmationOptions287<T>={
 canUseTool:CanUseToolFn
 toolUseContext:ConfirmationContext287
 source:string;header:string;question:string
 choices:readonly {label:string;value:T;description?:string}[]
 personOnly?:boolean
}
export type ConfirmationRuntime287={
 confirm<T>(options:ConfirmationOptions287<T>):Promise<ConfirmationOutcome287<T>>
 canAsk(context:ConfirmationContext287):boolean
 unanswered(answer:unknown,forcedDecision:unknown):boolean
}
export function createConfirmation287(ports:Record<'Hje'|'h0e'|'y0e'|'lnr'|'c'|'P'|'l'|'y'|'m'|'p'|'t'|'d'|'f'|'Jre'|'pe'|'o5'|'y7'|'Jc'|'_tn'|'an'|'o'|'H'|'se'|'u'|'de',unknown>):ConfirmationRuntime287
export function createConfirmationContext287(ports:Record<'Ta'|'BE'|'So'|'HG'|'L',unknown>):{
 read(context:ConfirmationContext287):ToolPermissionContext
 capture(mode:PermissionMode):PermissionSnapshot287
 isCapturedNonAuto(value:unknown):boolean
}
export function createConfirmationEligibility287(ports:{Ce():boolean;EI():string|undefined;lh():readonly unknown[]}):()=>boolean
export function createConfirmationCleanup287(ports:{Tt:typeof NativeRootContextCell286}):{
 finish(session:{root:object}|undefined,id:string):void
 calls:NativeRootContextCell286<{calls:Map<string,unknown>;hostAttests:boolean}>
 callbacks:NativeRootContextCell286<{byToolUse:Map<string,(()=>void)[]>}>
}
export function createConfirmationUtilities287(ports:{er():unknown;mf():boolean;bn<T>(value:T):T;e:typeof import('node:crypto').createHash}):{
 autoActive(mode:PermissionMode,skipClassifier?:boolean):boolean
 bypassDisabled():boolean;hash(source:string):string;unforwarded(reason:string):boolean
 constants:Record<'Hje'|'h0e'|'y0e'|'lnr',string>
}
