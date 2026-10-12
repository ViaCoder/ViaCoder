import type {StorageV5Backend} from '../secureStorage/storageV5.js'
export type DesktopTarget287 = {kind:'new-session';folder:string}|{kind:'resume';sessionId:string}
export type DesktopOpenResult287 = {success:true;deepLinkUrl:string}|{success:false;reason:string;error:string;deepLinkUrl?:string}
export type DesktopInstallStatus287 = {status:'not-installed'}|{status:'version-too-old';version:string}|{status:'ready';version:string;scheme:string;macApp?:{appPath:string;openByPath:boolean}}
export interface DesktopCommand287 {
 options:readonly {attributeName():string;negate:boolean;long?:string;flags:string}[]
 getOptionValue(name:string):unknown;getOptionValueSource(name:string):string|undefined
 parent:DesktopCommand287|null;name():string
}
export interface DesktopLaunchOptions287 {
 continue:boolean;resume?:string|true;nonInteractive:boolean
 suppliedOptions:{flag:string;key:string;value:unknown}[];prompt?:string;pipedStdin:boolean
 pendingConnect:boolean;pendingSsh:boolean;storageV5?:StorageV5Backend
}
export interface DesktopHostPorts287 {
 process:Pick<NodeJS.Process,'argv'|'execPath'|'stdout'|'stdin'>
 builtins:{path:typeof import('node:path');'fs/promises':typeof import('node:fs/promises')}
 subscriber():boolean;desktopPlatform():boolean;cwd():string
 exec:typeof import('../desktopExecPort287.js').desktopExec287.exec
 exists(path:string):Promise<boolean>;semver:Pick<typeof import('semver'),'coerce'>
 gte(a:string,b:string):boolean;debug(message:string,options?:{level?:string}):void;error(message:string):void
 featureSuccess(...args:unknown[]):void;featureFailure(...args:unknown[]):void;telemetry(...args:unknown[]):void
 openDesktop(target:DesktopTarget287):Promise<DesktopOpenResult287>
 [source:`source:${string}`]:unknown
}
export interface DesktopCli287 {
 launch(options:DesktopLaunchOptions287):Promise<number>
 open(target:DesktopTarget287):Promise<DesktopOpenResult287>
 installStatus():Promise<DesktopInstallStatus287>
 suppliedOptions(command:DesktopCommand287):DesktopLaunchOptions287['suppliedOptions']
}
export function createDesktopCli287(ports:DesktopHostPorts287):DesktopCli287
