import type {ConfigScope,McpServerConfig,ScopedMcpServerConfig,MCPServerConnection} from '../../services/mcp/types.js'
import type {Tool} from '../../Tool.js'
import type {Command} from '../../commands.js'
export interface ProjectMcpView287 {clients:MCPServerConnection[];tools:Tool[];commands:Command[];resources:Record<string,unknown>;resourceTemplates?:Record<string,unknown>}
export function createProjectMcpNative287(ports:{An(name:string):string}):{
 prune<T extends ProjectMcpView287>(state:T,predicate:(client:MCPServerConnection)=>boolean):Pick<T,'clients'|'tools'|'commands'|'resources'|'resourceTemplates'>&{stale:MCPServerConnection[]}
 departed(config:ScopedMcpServerConfig,cwd:string):boolean
 addScope(servers:Record<string,McpServerConfig>|undefined,scope:ConfigScope,declaredIn?:string):Record<string,ScopedMcpServerConfig>
 deferred(name:string,config:ScopedMcpServerConfig):boolean
 parseTool(name:string):{serverName:string;toolName:string|undefined}|null
 promptServerDeparted(name:string,source:{listedServer?:string;parsedServer?:string}):boolean
}
