import type { LocalSettingsGitTracking287 } from './runtime.js'
export interface OfficialPermissionTrustPorts287 {
 env: Record<string, string | boolean | undefined>;
 oe(): {trustAccepted?: boolean;localSettingsGitTracked?: {cwd:string;value:LocalSettingsGitTracking287};setTrustAccepted(value:boolean):void;setLocalSettingsGitTracked(value:{cwd:string;value:LocalSettingsGitTracking287}):void};
 currentTrustProject():string|null;persistedTrustForProject(project?:string):boolean;trustFromSession():boolean;
 readGlobalConfig(): {projects?:Record<string,{hasTrustDialogAccepted?:boolean}>};currentProjectKey():string;
 originalCwd():string;
 projectConfigRoot():string|null;
 executionSession():{host:object};pathStylePlatform():string;gitDiscoveryLog(level:string,event:string,fields:Record<string,unknown>):void;
 path:typeof import('node:path');pathResolve(path:string):string;settingsFilePathForSource(source:string):string|null;
 allowedSettingSources():readonly string[];permissionConfigState():{enabledSources?:{allowed:readonly string[];result:readonly string[]}};sourceOrder:readonly string[];
 fs():{realpathSync(path:string):string;lstatSync(path:string):{isSymbolicLink():boolean;uid:number};statSync(path:string):{uid:number}};realpathOrNull(path:string):string|null;debug(message:string,options:{level:'warn'|'error'}):void;homeDirectory():string;
 configDirectory():string;pathJoin(...parts:string[]):string;isNotFound(error:unknown):boolean;diskless():boolean;
 childProcess():{spawnSync(executable:string,args:readonly string[],options:{cwd:string;encoding:'utf8';timeout:number;windowsHide:boolean;env:Record<string,string|undefined>}):{error?:NodeJS.ErrnoException;signal:NodeJS.Signals|null;status:number|null;stderr?:string}};
 resolveGitExecutable():string|null
}
export interface OfficialPermissionTrust287 {Pm(project?:string):boolean;J0(options:{onIndeterminate:'tracked'|'untracked'}):boolean;bs(path:string):string|null;aI(path:string):string|null;ds():boolean;fi():boolean;T0():boolean;OE():LocalSettingsGitTracking287;A0():LocalSettingsGitTracking287;C0(root:string):LocalSettingsGitTracking287;rw():boolean;Rhn():{gateProject:boolean;gateLocal:boolean};xE(config:{projects?:Record<string,{hasTrustDialogAccepted?:boolean}>},cwd:string):string|null;Xo():readonly ('userSettings'|'projectSettings'|'localSettings'|'flagSettings'|'policySettings')[]}
export function createOfficialPermissionTrust287(ports:OfficialPermissionTrustPorts287):OfficialPermissionTrust287
