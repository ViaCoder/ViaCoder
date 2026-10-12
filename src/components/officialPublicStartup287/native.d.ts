import type React from 'react'
import type {PermissionMode} from '../../utils/permissions/PermissionMode.js'
import type {ChannelEntry} from '../../bootstrap/state.js'
export interface StartupApprovalWarning287 {key:string;text:string}
export interface PublicStartupResult287 {mcpApprovalSkipWarning:StartupApprovalWarning287|null}
export type StartupStage287=(done:(stop?:'stop')=>void)=>React.ReactNode|Promise<React.ReactNode>
export interface PublicStartupStages287 {approval:StartupStage287;externalIncludes:StartupStage287;apiKey:StartupStage287;bypass:StartupStage287;channels:StartupStage287;chromeIntro:StartupStage287}
export interface PublicStartupPorts287 {
 a:NodeJS.ProcessEnv;Aro(storageV5:unknown,warning:(warning:StartupApprovalWarning287)=>void):StartupStage287
 T?:unknown;P:PublicStartupResult287;o:ReturnType<typeof import('../../services/context/execution287.js').getExecutionSession287>;x?:import('../../utils/officialSecureStorage/runtime.js').CredentialStore
 OTo(session:PublicStartupPorts287['o'],storageV5?:unknown):Promise<boolean>
 vw(session:PublicStartupPorts287['o'],includeExternal:boolean,storageV5?:unknown,credentials?:PublicStartupPorts287['x']):Promise<import('../../utils/claudemd.js').MemoryFileInfo[]>
 rHt(files:import('../../utils/claudemd.js').MemoryFileInfo[]):import('../../utils/claudemd.js').ExternalClaudeMdInclude[]
 e:typeof import('react/jsx-runtime').jsx
 OWt():string|undefined;l:PermissionMode;h:boolean;Wj():boolean
 lh():ChannelEntry[];C?:ChannelEntry[];v_(gate:string):Promise<boolean>;JOe(channels:ChannelEntry[]):void;eno(value:boolean):void
 He():string;S?:boolean;le:typeof import('../../utils/config.js').getGlobalConfig
 importStartupModule287(file:string):Promise<Record<string,unknown>>
}
export function createPublicStartupStages287(ports:PublicStartupPorts287):PublicStartupStages287
