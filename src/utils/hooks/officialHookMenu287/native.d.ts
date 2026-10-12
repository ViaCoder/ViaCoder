import type {HookEvent} from '../../../entrypoints/agentSdkTypes.js'
import type {AppState} from '../../../state/AppState.js'
import type {IndividualHookConfig} from '../hooksSettings.js'
import type {HookEventMetadata} from '../hooksConfigManager.js'
export type HookMenuGroups287=Record<HookEvent,Record<string,IndividualHookConfig[]>>
export interface HookMenuPorts287 {re:{readonly reader:((name:string,fallback:boolean)=>unknown)|undefined};Ag:readonly HookEvent[];S$:typeof import('../../../bootstrap/state.js').getRegisteredHooks;qHo:typeof import('../hooksSettings.js').getAllHooks;KHo:typeof import('../hooksSettings.js').sortMatchersByPriority}
export function createOfficialHookMenu287(ports:HookMenuPorts287):{metadata(toolNames:string[]):Record<HookEvent,HookEventMetadata>;group(state:AppState,toolNames:string[]):HookMenuGroups287;sortedMatchers(groups:HookMenuGroups287,event:HookEvent):string[];forMatcher(groups:HookMenuGroups287,event:HookEvent,matcher:string|null):IndividualHookConfig[]}
