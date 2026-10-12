import type {DeepLinkAction287} from '../officialDeepLinkParser287/native.js'
export interface DeepLinkTerminal287 {name:string;command:string}
export interface DeepLinkLaunchOptions287 {query?:string;cwd?:string;repo?:string;lastFetchMs?:number}
export interface DeepLinkLauncherPorts287 {
 process:Pick<NodeJS.Process,'execPath'|'env'>;env:NodeJS.ProcessEnv
 featureSuccess(name:string):unknown;featureFailure(name:string,code:string):unknown
 json(value:unknown):string;debug(message:string,options?:{level:'error'}):unknown;which(name:string):Promise<string|null|undefined>
 config():{deepLinkTerminal?:string};trackPid(pid:number|undefined):void
 exec(file:string,args:string[],options:{useCwd:false}):Promise<{code:number;stdout:string}>
 parse(uri:string):DeepLinkAction287;bundleId?:string
 knownPaths(repo:string):string[];existingPaths(paths:string[]):Promise<string[]>
 lastFetch(cwd:string):Promise<Date|undefined>;pluginPrompt(input:{plugin:string;marketplaceSource:string}):string
 realpath:typeof import('node:fs/promises').realpath;homedir():string
 spawn(file:string,args:string[],options:import('node:child_process').SpawnOptions):import('node:child_process').ChildProcess;basename:typeof import('node:path').basename
}
export interface DeepLinkLauncher287 {
 handle(uri:string):Promise<number>;detect():Promise<DeepLinkTerminal287|null>
 launch(binary:string,options:DeepLinkLaunchOptions287):Promise<boolean>
 shellArgs(options:DeepLinkLaunchOptions287):string[];shellCommand(binary:string,options:DeepLinkLaunchOptions287):string
 mac(terminal:DeepLinkTerminal287,binary:string,args:string[],options:DeepLinkLaunchOptions287):Promise<boolean>
 linux(terminal:DeepLinkTerminal287,binary:string,args:string[],options:DeepLinkLaunchOptions287):Promise<boolean>
 windows(terminal:DeepLinkTerminal287,binary:string,options:DeepLinkLaunchOptions287):Promise<boolean>
 spawnDetached(binary:string,args:string[],options?:{cwd?:string;windowsVerbatimArguments?:boolean}):Promise<boolean>
}
export function createDeepLinkLauncher287(ports:DeepLinkLauncherPorts287,platform?:string,arch?:string):DeepLinkLauncher287
