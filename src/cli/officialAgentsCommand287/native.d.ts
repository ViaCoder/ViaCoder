import type {StorageV5Backend} from '../../utils/secureStorage/storageV5.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
export interface AgentsCommandOptions287 {
  settingSources?:string;cwd?:string;addDir?:string|string[];pluginDir?:string|string[];pluginDirNoMcp?:string|string[];
  settings?:string;managedSettings?:string;mcpConfig?:string|string[];strictMcpConfig?:boolean;restricted?:boolean;
  permissionMode?:string;inheritPermissionMode?:string;dangerouslySkipPermissions?:boolean;
  allowDangerouslySkipPermissions?:boolean;model?:string;effort?:string;agent?:string;json?:boolean;all?:boolean;
}
export type AgentsCommandHandler287=(options:AgentsCommandOptions287,parent?:Record<string,unknown>,storage?:StorageV5Backend,credentials?:CredentialStore)=>Promise<void>
export interface AgentsCommandPorts287 {
 process:Pick<NodeJS.Process,'argv'|'stdout'>
 resolve:(...paths:string[])=>string
 sourceModule:(file:string)=>Readonly<Record<string,unknown>>
 importSource:(file:string)=>Promise<Readonly<Record<string,unknown>>>
}
export function createAgentsCommand287(ports:AgentsCommandPorts287):{agentsCommandHandler:AgentsCommandHandler287}
