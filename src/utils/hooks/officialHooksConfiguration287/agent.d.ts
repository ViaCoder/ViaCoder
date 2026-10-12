import type {AgentDefinition} from '../../../tools/AgentTool/loadAgentsDir.js'
import type {ExecutionSession287,LegacyExecutionContext287} from '../../../services/context/officialExecutionOwners287/native.js'
import type {HooksSettings} from '../../settings/types.js'
import type {SettingSource} from '../../settings/constants.js'
import type {GlobalConfig} from '../../config.js'
export type MainThreadAgentHookDefinition287=Pick<AgentDefinition,'agentType'|'source'|'baseDir'|'hooks'> & {fromAdditionalDirectory?:boolean}
export interface MainThreadAgentHookPorts287 {
 setAgentHooks(hooks:HooksSettings|undefined):void
 settingsForSource(source:SettingSource):{strictPluginOnlyCustomization?:boolean|readonly string[]}|null|undefined
 execution():ExecutionSession287
 legacy():LegacyExecutionContext287|undefined
 originalCwd():string
 canonicalGitRoot(dir:string):string|null
 platform():string
 config():GlobalConfig
 configFile():string
 stringify(value:unknown):string
 debug(message:string,options?:{level:'error'|'warn'|'verbose'}):void
 analytics(name:string,metadata:Record<string,string>):void
 analyticsIdentity(value:string):string
 path:typeof import('node:path')
}
export interface MainThreadAgentHookSelection287 {
 select(agent:MainThreadAgentHookDefinition287|undefined):void
 hasHooks(hooks:HooksSettings|undefined):boolean
 trusted(agent:MainThreadAgentHookDefinition287):boolean
 skip(agent:MainThreadAgentHookDefinition287,surface:string,kind?:'hooks'|'mcpServers'):void
}
export function createMainThreadAgentHookSelection287(ports:MainThreadAgentHookPorts287):MainThreadAgentHookSelection287
