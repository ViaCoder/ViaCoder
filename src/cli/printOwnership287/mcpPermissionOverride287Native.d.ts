import type {z} from 'zod/v4'
import type {Store} from '../../state/store.js'
import type {AppState} from '../../state/AppStateStore.js'

/** Wire mode accepts the original enum. Qt rejects non-tightening modes. */
export interface McpPermissionOverrideRequest287 {
 subtype:'set_mcp_permission_mode_override';serverName:string;
 mode:'default'|'acceptEdits'|'bypassPermissions'|'plan'|'dontAsk'|'auto'|null;
}
export interface McpPermissionOverrideHost287 {
 setEngineState:Store<AppState>['setState'];
 isKnownMcpServer(name:string):boolean;
 redactsPersistedLane():boolean;
}
export type McpPermissionOverrideResult287={warning:string}|undefined
export type McpPermissionOverrideResponse287=
 |{subtype:'success';response?:McpPermissionOverrideResult287}
 |{subtype:'error';error:string}
export interface McpPermissionOverrideController287 {
 Qt(request:McpPermissionOverrideRequest287):{serverName:string;override:'default'|'auto'|undefined};
 dt(request:McpPermissionOverrideRequest287,host:McpPermissionOverrideHost287):McpPermissionOverrideResult287;
}
export function createMcpPermissionOverride287(ports:{
 Hr:new(message:string)=>Error;kh(mode:string):string|undefined;Sse:string;
 t(message:string,options:{level:'warn'}):void;Kt(name:string):string;
 hE():boolean;Z4():string|null;NX(reason:string):string|undefined;
 Jo(values:Readonly<Record<string,'default'|'auto'>>,name:string):Record<string,'default'|'auto'>;
}):McpPermissionOverrideController287
export function createMcpPermissionOverrideSchema287(ports:{
 f:typeof import('../../utils/lazySchema.js').lazySchema;
 u:typeof z.object;x:typeof z.literal;o:typeof z.string;
 ue:()=>z.ZodType<Exclude<McpPermissionOverrideRequest287['mode'],null>>;
}):()=>z.ZodType<McpPermissionOverrideRequest287>
