import type {Option} from '@commander-js/extra-typings'
import type * as fs from 'node:fs/promises'
import type {LaunchOptions287} from '../../tools/AgentTool/officialAgentPromptState287/native.js'
export interface ProjectConfigRootPorts287 {
 n():{host:{launchOptions:Pick<LaunchOptions287,'projectConfigRoot'|'replaceProjectConfigRoot'>}}
 Ln(path:string):boolean;ca(path:string):boolean;SR(path:string):boolean;jS(path:string):boolean
 Jr(path:string):boolean;Kr:typeof fs.realpath;qr:typeof fs.opendir
 Zo:typeof Option;fe:{red(message:string):string};Yt?:(message:string)=>never
 f:typeof import('node:fs').writeFileSync;c:typeof import('node:path').join
 rzt(path:string):string|null;aI(path:string):string|null;eP():string|null
 lr(path:string):string|null;bs(path:string):string|null;ap(path:string):string
 ET:typeof import('node:path').join;owe:typeof import('node:path').resolve
 BRn:typeof import('node:os').homedir;URn:typeof import('node:path').dirname;HRn:string
 yX:typeof fs.stat
 t(message:string,options?:{level:'error'}):void
}
export interface ProjectConfigRoot287 {
 get():string|null;set(root:string|null):void
 inaccessible(error:unknown):boolean;errno(error:unknown):string|undefined
 validate(command:{getOptionValue(name:string):unknown}):Promise<void>
 option():Option<'--project-config-root <dir>',undefined,string>
 networkPath(path:string):boolean;stopBoundary(path:string):string|null
 projectDirs(subdir:string,cwd:string|null):Promise<string[]>
 addWorktreeFallback(dirs:string[],subdir:string,cwd:string|null):void
}
export declare function createProjectConfigRoot287(ports:ProjectConfigRootPorts287):ProjectConfigRoot287
export interface ProjectMcpReadPorts287 {
 Co():string|null;Ee():string;yPn:typeof import('node:path').parse
 hPn:typeof import('node:path').dirname;hG:typeof import('node:path').join
 TLt:typeof import('../../services/mcp/config.js').parseMcpConfigFromFilePath
 t(message:string,options:{level:'error'}):void
 _(value:unknown):string
}
export declare function createProjectMcpRead287(ports:ProjectMcpReadPorts287):(expandVars?:boolean)=>{
 servers:Record<string,import('../../services/mcp/types.js').ScopedMcpServerConfig>
 errors:import('../settings/validation.js').ValidationError[]
}
