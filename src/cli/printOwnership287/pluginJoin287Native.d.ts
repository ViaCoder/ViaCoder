export interface PrintPluginJoin287 {
 Eu():Promise<void>;
 fb():Promise<void>;
 yf():Promise<void>;
 Cu(owned:Set<string>):Promise<void>;
 afterFirstCommand():void;
 takeNewPluginsSessionStart():Promise<void>|undefined;
 wireTurn():void;
 loopTop():Promise<void>;
 readonly As:Promise<unknown>|null;
 readonly ei:Promise<void>|null;
 readonly ti:{needsRefresh:boolean}|null;
 readonly pending:number;
 readonly relayMarked:boolean;
 readonly mcpStartupDeadlineMs287:number|undefined;
 readonly startupOwner:{serversStartedSinceKick:Set<string>;noteServersStartedSinceKick(names:Iterable<string>):void;pluginsSyncNeedsRefresh:boolean;lateForwardedInstallNeedsRefresh:boolean;backgroundRefreshEnabled:boolean;noteLateForwardedInstall():void;connectedNonDynamicMcpServerNames():Set<string>};
}
export function createPrintPluginJoinNative287(ports:object):PrintPluginJoin287;
