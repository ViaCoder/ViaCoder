import type {AppState} from '../../../state/AppStateStore.js'
import type {HookBaseInputSource287} from '../officialHooksConfiguration287/context.js'
import type {HookSessionRegistry287} from '../officialHooksConfiguration287/matcher.js'
import type {AggregatedHookResult} from '../../hooks.js'
export type ModelSwitchSession287={id:string}
export type ModelSwitchRequest287={fromModel:string;toModel:string;requestedModel:string|null;source:string}
export type ModelSwitchDecision287={decision:'proceed'|'block'|'ask';skipConfirm?:boolean;reason?:string;messages:string[]}
export type ModelSwitchOptions287={signal?:AbortSignal;timeoutMs?:number}
export type ModelSwitchPreHookInput287=HookBaseInputSource287 & {
 hook_event_name:'PreModelSwitch';from_model:string;to_model:string;requested_model:string|null;source:string;
 context_tokens:number;prompt_cache_warm:boolean;cache_ttl:'5m'|'1h';estimated_cache_write_usd:number;pricing:'configured'|'catalog'|'default'
}
export type ModelSwitchPostHookInput287=HookBaseInputSource287 & {
 hook_event_name:'PostModelSwitch';from_model:string;to_model:string;requested_model:string|null;source:string
}
export type ModelSwitchHookInput287=ModelSwitchPreHookInput287|ModelSwitchPostHookInput287
export type ModelSwitchPostBatch287={sessionId:string;toModel:string;contexts:string[];messages:import('../../../types/message.js').Message[]}
export type ModelSwitchPostState287={pending:ModelSwitchPostBatch287[];landedOn:{sessionId:string;toModel:string}|null;inFlight:Set<Promise<void>>}
export type ModelSwitchSessionHooks287=HookSessionRegistry287<unknown> & {has(id:string,event:string):boolean;getAppState():AppState;getEntry(id:string,event:string,matcher:string,hook:Parameters<typeof import('../sessionHooks.js').getSessionHookCallback>[4]):ReturnType<typeof import('../sessionHooks.js').getSessionHookCallback>}
export type ModelSwitchDispatchOptions287={session:ModelSwitchSession287;hookInput:ModelSwitchHookInput287;toolUseID:string;matchQuery?:string;sessionHooks?:ModelSwitchSessionHooks287;signal?:AbortSignal;timeoutMs:number}
export interface ModelSwitchExecutionBridge287 {
 executeModelSwitchHooks287(options:ModelSwitchDispatchOptions287):AsyncGenerator<AggregatedHookResult>
 retryModelSwitchHookRegistration287(storageV5?:unknown,credentials?:unknown):Promise<void>
 clearModelSwitchPluginCache287(reason:string):void
}
export interface ModelSwitchFlow287 {
 $Pr(session:ModelSwitchSession287,input:ModelSwitchRequest287,options?:Pick<ModelSwitchOptions287,'timeoutMs'>):Promise<void>
 RRo(session:ModelSwitchSession287,timeoutMs?:number):Promise<ModelSwitchPostBatch287[]>
 yWt:{of(session:ModelSwitchSession287):ModelSwitchPostState287}

 FPr(session:ModelSwitchSession287,input:ModelSwitchRequest287,options?:ModelSwitchOptions287):Promise<ModelSwitchDecision287>
 LDt():Promise<unknown>|undefined;MDt(retry:boolean):Promise<string|undefined>;ZV(session:ModelSwitchSession287):boolean;
 QR(event:string,registry:{has(id:string,event:string):boolean}|undefined,ids:string|string[]):boolean;
 l$o(session:ModelSwitchSession287,source:string,model:string|null):void;
 B_(session:ModelSwitchSession287,state:AppState,model:string|null,source:string):void;
 gWt:{of(session:ModelSwitchSession287):{next?:{source:string;requestedModel:string|null}}};kRo(session:ModelSwitchSession287):{source:string;requestedModel:string|null}
}
export function createModelSwitchChange287(ports:Record<string,unknown>):Pick<ModelSwitchFlow287,'l$o'|'gWt'|'kRo'>
export function createModelSwitchFlow287(ports:Record<string,unknown>):ModelSwitchFlow287
export function createModelSwitchPipeline287(ports:Record<string,unknown>):{PA(options:ModelSwitchDispatchOptions287):AsyncGenerator<AggregatedHookResult>}
export function createModelSwitchMatcher287(ports:Record<string,unknown>):{FQ(value:unknown,key:string,target:unknown):boolean}
export function createModelSwitchModules287(ports:Record<string,unknown>):{dd(event:string,matcher?:Record<string,unknown>):boolean}
export function createModelSwitchFeatures287(ports:Record<string,unknown>):{Gr(feature:string,options?:{explicitlyRequested?:boolean}):boolean}
export function createModelSwitchSimple287(ports:Record<string,unknown>):{yr():boolean;xr():boolean}
export function createModelSwitchDisabled287(ports:Record<string,unknown>):{Wb():boolean}
export function createModelSwitchGate287(ports:Record<string,unknown>):{'w$r'():boolean}
export function createModelSwitchErrors287(ports:Record<string,unknown>):{Hl:new(message?:string)=>Error;P:new(message:string,telemetryMessage?:string,errorClass?:unknown)=>Error}
export function createModelSwitchCatalog287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelSwitchLookup287(ports:Record<string,unknown>):{ra<T>(record:Record<string,T>,key:string):T|undefined}
export function createModelSwitchLexical287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelSwitchIdentity287(ports:Record<string,unknown>):{t2e(model:string):string;Zyt(model:string):boolean;NPe(model:string):boolean}
export function createModelSwitchPricing287(ports:Record<string,unknown>):{ZJn(model:string,usage:unknown):{usd:number;pricing:'configured'|'catalog'|'default'};yx(model:string):unknown}
export function createModelSwitchUsage287(ports:Record<string,unknown>):Record<string,unknown>
export function createModelSwitchAttachment287(ports:{Dfe:()=>string;OMt:(attachment:import('../../attachments.js').Attachment)=>unknown}):{ln(attachment:import('../../attachments.js').Attachment,clock?:{now:()=>string;uuid:()=>string}):import('../../../types/message.js').AttachmentMessage}
