import type {AggregatedHookResult} from '../../hooks.js'
import type {ToolUseContext} from '../../../Tool.js'
import type {Message} from '../../../types/message.js'
import type {HookEvent,HookInput} from '../../../entrypoints/agentSdkTypes.js'
import type {ModelSwitchDispatchOptions287,ModelSwitchSessionHooks287,ModelSwitchSession287} from './native.js'
export type HookExecutionInput287=HookInput|ModelSwitchDispatchOptions287['hookInput']
export type HookExecutionOptions287={session:ModelSwitchSession287;hookInput:HookExecutionInput287;toolUseID:string;extendedHookInput?:unknown;matchQuery?:string;signal?:AbortSignal;timeoutMs?:number;toolUseContext?:ToolUseContext;sessionHooks?:ModelSwitchSessionHooks287;messages?:Message[];forceSyncExecution?:boolean;suppressPerInvocationTelemetry?:boolean;managedHooksOnly?:boolean;managedHooksExcluded?:boolean;sessionFunctionHooksOnly?:boolean;skipSessionFunctionHooks?:boolean;classicChainMember?:boolean;agentContext?:unknown;storageV5?:unknown;credentials?:unknown;onMatched?:(plugins:string[],count:number)=>void}
export interface HookEngine287 {
 PA(options:HookExecutionOptions287):AsyncGenerator<AggregatedHookResult>
 V0o(options:HookExecutionOptions287):AsyncGenerator<AggregatedHookResult>
 J0o(options:unknown):Promise<unknown>;Q0o(options:unknown):Promise<unknown>;
 Dsn(generators:AsyncGenerator[],limit?:number):AsyncGenerator;Xjt(generator:AsyncGenerator,cleanup:()=>void):AsyncGenerator;
 'H$n'():{getState():unknown[];setState(update:(state:unknown[])=>unknown[]):void;subscribe(listener:()=>void):()=>void}
}
export function createHookEngineEngine287(ports:Record<string,unknown>):HookEngine287
export function createHookEngineString287(ports:Record<string,unknown>):{Ef(text:string):string;re(text:string,cap:number):string;see(text:string):string}
export function createHookEngineObservation287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineDisplay287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineMetadata287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineNormalization287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineRegistry287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineRegistrationGate287(ports:Record<string,unknown>):{Dr():boolean;Xoe():void;oS():Promise<never>;readonly Hi:{committed:boolean}}
export function createHookEngineHashMetadata287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEnginePersistence287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineClassicPresence287(ports:Record<string,unknown>):{Qrt(event:string):boolean}
export function createHookEngineRegistration287(ports:Record<string,unknown>):{R7(storageV5?:unknown,credentials?:unknown):Promise<void>;yy(reason?:string):void;B6n():void;Cwo(plugin:import('../../../types/plugin.js').LoadedPlugin):Record<HookEvent,import('../../settings/types.js').PluginHookMatcher[]>}
export interface PromptComposeFacts287 {model:string|undefined;promptModel:string|undefined;tools:string[];outputStyle:{name:string;isKeepingCodingInstructions:boolean}|null;traits:string[];surfaces?:string[]}
export interface OriginalPromptComposer287 {
 facts(tools:readonly {name:string}[],model:string|undefined,mode?:{excludeDynamicSections?:boolean;isDetached?:boolean;analysisOnly?:boolean;teammate?:boolean;hookOrigin?:unknown}):Promise<PromptComposeFacts287>
 detachedSections(facts:PromptComposeFacts287,requester?:{tools:readonly {name:string}[];model:string},origin?:unknown):Promise<import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[]>
}
export function createHookEnginePromptCompose287(ports:Record<string,unknown>):{kA(tools:readonly {name:string}[],model:string|undefined,mode?:{excludeDynamicSections?:boolean;isDetached?:boolean;analysisOnly?:boolean;teammate?:boolean;hookOrigin?:unknown}):Promise<string[]>;dxn(records:import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[],boundary:string|null):string[];mRt:OriginalPromptComposer287['facts'];gRt(facts:PromptComposeFacts287,tools:readonly {name:string}[],detached:boolean,origin?:unknown):Promise<import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[]>}
export function createHookEnginePromptInvalidation287(ports:Record<string,unknown>):{rKt(bindingAgentId?:string):void;yR(bindingAgentId?:string):void}
export function createHookEnginePromptComposeRecords287(ports:Record<string,unknown>):{kA(tools:readonly {name:string}[],model:string|undefined,mode?:{excludeDynamicSections?:boolean;isDetached?:boolean;analysisOnly?:boolean;teammate?:boolean;hookOrigin?:unknown}):Promise<import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[]>}

export interface OriginalPromptContextValue287 {blocks:unknown;instructionFiles?:unknown}
export interface OriginalPromptContextOwner287 {
 gw:{setPromptContextResolver:OriginalPromptContextOwner287['Dxn'];resolvePromptContext:OriginalPromptContextOwner287['Ixn'];setPromptContextInvalidator:OriginalPromptContextOwner287['Oxn'];invalidatePromptContext:OriginalPromptContextOwner287['Mxn'];invalidateHookedPromptContext:OriginalPromptContextOwner287['Pxn']}
 Ixn(core:()=>OriginalPromptContextValue287):Promise<OriginalPromptContextValue287>|undefined
 Mxn():void;Pxn(hooked:boolean):void
 Oxn(invalidate:()=>void):void
 Dxn(resolve:(core:()=>OriginalPromptContextValue287)=>Promise<OriginalPromptContextValue287>|undefined):void
 Nxn(core:()=>OriginalPromptContextValue287):Promise<OriginalPromptContextValue287>|undefined
 Lxn():void
 fa(event:string,options:Record<string,unknown>):(input:unknown)=>Promise<unknown>
 wX(first:unknown,messages:unknown[],last:unknown):unknown[]
 w1t(messages:unknown[],answer:unknown):unknown[]
 yxn(facts:()=>Promise<PromptComposeFacts287>,core:(facts?:PromptComposeFacts287)=>Promise<import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[]>):Promise<import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[]>
 Mtt():OriginalPromptComposer287|undefined;kxn(composer:OriginalPromptComposer287|undefined):void
 bxn:OriginalPromptContextOwner287['yxn']
 Fxn(name:string,text:string|null,origin?:unknown):Promise<string|null>
 Uwe(facts:PromptComposeFacts287,origin?:unknown):Promise<{sections:import('../../../constants/officialSystemComposer287/native.js').SystemPromptRecord287[]}>
 r7():string[]
}
export function createHookEnginePromptContext287(ports:Record<string,unknown>):OriginalPromptContextOwner287
export function createHookEnginePromptCells287(ports:Record<string,unknown>):{Yb():{get():unknown;set(value:unknown):void}}
export function createHookEngineCaps287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineGuards287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineStatus287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineStringCast287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineStatusCode287(ports:Record<string,unknown>):Record<string,unknown>

export function createHookEngineAgentIdentity287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEnginePermissionUpdates287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEnginePermissionPattern287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineErrorContext287(ports:Record<string,unknown>):Record<string,unknown>

export function createHookEngineWorkspace287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineDirectories287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineUtf8287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineByteLabel287(ports:Record<string,unknown>):Record<string,unknown>
export function createHookEngineStorageError287(ports:Record<string,unknown>):Record<string,unknown>

export function createHookEnginePluginCache287(ports:Record<string,unknown>):{xi(storageV5?:unknown,credentials?:unknown):Promise<import('../../../types/plugin.js').PluginLoadResult>;Lb(storageV5?:unknown,credentials?:unknown):Promise<import('../../../types/plugin.js').PluginLoadResult>}
export interface HookFailureNotice287 {text:string;toolUseID?:string;[key:string]:unknown}
export interface HookFailureNoticeOwner287 {current():HookFailureNotice287|null;subscribe(listener:(value:HookFailureNotice287|null)=>void):()=>void;emit(value:HookFailureNotice287|string|null,channel?:string):void;noteHookFailure(id:string,text:string):void;clearHookFailure(id:string):void;openAsk(value:HookFailureNotice287&{toolUseID:string},options:{order:string|number;onTop?:boolean}):void;showAsk(order:string|number):void;closeAsk(id:string):void}
export function createHookEngineNotice287(ports:Record<string,unknown>):{EE:HookFailureNoticeOwner287}
export function createHookEngineSignal287(ports:Record<string,unknown>):{Me():unknown}
export function createHookEngineTruncate287(ports:Record<string,unknown>):{cd(value:string,max:number):string;Vm:number}
export function createHookEngineRegistrySwap287(ports:Record<string,unknown>):{iir(value:import('../officialHooksConfiguration287/registry.js').RegisteredHooks287):void}

export function createHookEnginePluginTiming287(ports:Record<string,unknown>):{M6o():void;s():{pluginFullLoads:number}}

export function createHookEngineActivity287(ports:Record<string,unknown>):{t0(pluginId:string,trigger:string,feature:{kind:string;name:string}):void}

export function createHookEnginePluginIdentity287(ports:Record<string,unknown>):Record<string,unknown>

export function createHookEnginePluginSpelling287(ports:Record<string,unknown>):Record<string,unknown>

export function createHookEngineRegistrationRegistry287(ports:Record<string,unknown>):{Net():unknown}

export function createHookEngineModsError287(ports:Record<string,unknown>):{Oe:new(message?:string)=>Error&{name:string;telemetryMessage:string;thrownName?:string}}

export function createHookEngineSubscription287(ports:Record<string,unknown>):{ir():import('../../../services/oauth/types.js').SubscriptionType|null}
export function createHookEngineSubscriptionSlots287(ports:Record<string,unknown>):{EW():unknown;Uz():unknown}
export function createHookEngineBackgroundSubscription287(ports:Record<string,unknown>):{Y5r():{subscriptionType?:string;rateLimitTier?:string}}

export function createHookEngineEndHint287(ports:Record<string,unknown>):{dis(model:string):string|null;dFn(model:string):boolean}
export function createHookEngineEndHintNames287(ports:Record<string,unknown>):{yk:string;V2r:string}
export function createHookEngineEndHintModels287(ports:Record<string,unknown>):{uYn(model:string,versions:[string,number[]][]):boolean}
export function createHookEngineEndHintGuard287(ports:Record<string,unknown>):{Emn():boolean}
