import type {McpServerConfigForProcessTransport} from '../../entrypoints/agentSdkTypes.js'
import type {SDKControlMcpSetServersResponse,SDKControlInitializeResponse,SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
export interface PrintPluginRefresh287 {
 readonly pendingCommandRescan:Promise<void>|undefined;
 rescanCommands():void;
 rescanCommandsImmediate287():Promise<void>;
 readonly flagSettingsForwarding287:{Ep:{applied(settings:Record<string,unknown>):void};Ap(reason:string):void};
 readonly sdkFrame287:{Wo:{readonly size:number;add(clients:readonly unknown[]):void;closeFor(name:string):Promise<void>};Xi():{reassertOwnership():void}[];Dn():void};
 Ga(options?:{applyStagedInstalls?:boolean}):Promise<void>;
 ea(ownedBeforeSync?:Set<string>,caller?:string):Promise<void>;
 jp(servers:Record<string,McpServerConfigForProcessTransport>,options:{authoritative:boolean;caller?:string;deferConnect?:boolean}):Promise<{response:SDKControlMcpSetServersResponse;sdkServersChanged:boolean}>;
 /** Called only by the correspondingly discriminated actual control ingress. */
 mcpSetServers(message:SDKControlRequest):Promise<void>;
 reloadPlugins(message:SDKControlRequest):Promise<void>;
 appliedForwardedSettings(settings:Record<string,unknown>):void;
 notePublishedCommands(commands:SDKControlInitializeResponse['commands']):void;
 beginTurn():void;
 commandPublication():void;
 afterCommandPublication():void;
 readonly pendingRefresh:boolean;
 readonly latestRefreshCompleted:number;
}
export function createPrintPluginRefreshNative287(ports:object):PrintPluginRefresh287;
