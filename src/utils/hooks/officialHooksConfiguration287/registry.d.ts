import type {HookEvent} from '../../../entrypoints/agentSdkTypes.js'
import type {HookCallbackMatcher} from '../../../types/hooks.js'
import type {PluginHookMatcher,HooksSettings} from '../../settings/types.js'
export type RegisteredHookMatcher287=HookCallbackMatcher|PluginHookMatcher
export type RegisteredHooks287=Partial<Record<HookEvent,RegisteredHookMatcher287[]>>
export interface HookRegistryHolder287 {registeredHooks:RegisteredHooks287|null;sdkHostOutOfReachNoted?:unknown;pluginHookRunner?:{holds(id:string|undefined):boolean}}
export interface ExecutionHookRegistry287 {holder():HookRegistryHolder287;mainThreadAgentType():string|undefined;replaceMainThreadAgentType(value:string|undefined):void;mainThreadAgentHooks():HooksSettings|undefined;replaceMainThreadAgentHooks(value:HooksSettings|undefined):void;reset():void}
export interface LegacyHookRegistry287 {registeredHooks?:RegisteredHooks287|null;sdkHostOutOfReachNoted?:unknown;pluginHookRunner?:{holds(id:string|undefined):boolean};mainThreadAgentType?:string;mainThreadAgentHooks?:HooksSettings}
export interface HookRegistryAccessors287 {holder():HookRegistryHolder287;register(hooks:RegisteredHooks287):void;registered():RegisteredHooks287|null|undefined;clear():void;clearPlugins():void;agentType():string|undefined;setAgentType(value:string|undefined):void;agentHooks():HooksSettings|undefined;setAgentHooks(value:HooksSettings|undefined):void;notify():void;subscribe(listener:()=>void):()=>void}
export function createHookRegistryAccessors287(ports:{execution():{hookRegistry:ExecutionHookRegistry287};legacy():LegacyHookRegistry287|undefined;root:{readonly host:object}}):HookRegistryAccessors287
