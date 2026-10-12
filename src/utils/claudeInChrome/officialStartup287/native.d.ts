import type React from 'react'
import type {ScopedMcpServerConfig} from '../../../services/mcp/types.js'
import type {Command} from '../../../commands.js'
export type Config287=Record<string,ScopedMcpServerConfig>
export type StartupFrame287={dynamicMcpConfig:Config287;appendSystemPrompt:string|undefined;allowedTools:string[];chrome?:boolean;nonInteractive:boolean;restricted?:boolean;storageV5?:unknown}
export type StartupResult287={dynamicMcpConfig:Config287;appendSystemPrompt:string|undefined;enableClaudeInChrome:boolean;offerClaudeInChrome:boolean;skippedChromeForAdminPolicy:boolean;chromeDeniedByPolicy:boolean;adopted:boolean}
export type OfferResult287={claudeInChromeAccepted?:boolean}
export type AcceptedFrame287={accepted?:boolean;dynamicMcpConfig:Config287;appendSystemPrompt:string|undefined;commands:Command[];storageV5?:unknown;cwd:string}
export type OfferFrame287={offer:boolean;result:OfferResult287;permissionMode:string}
export type SuppressOffer287={isSSHPending:boolean;isRemoteMode:boolean;hasTeleport:boolean;isSafeMode:boolean;permissionMode:string;isBypassPermissionsModeAvailable:boolean;teammateAgentId?:string}
export function createChromeStartup287(ports:Record<string,unknown>):{blocked():boolean;allowsDynamic(configs:Config287):boolean;suppressOffer(frame:SuppressOffer287):boolean;startup(frame:StartupFrame287):StartupResult287;accepted(frame:AcceptedFrame287):Promise<{dynamicMcpConfig:Config287;appendSystemPrompt:string|undefined;commands:Command[]}>;offer(frame:OfferFrame287):(done:()=>void)=>Promise<React.ReactNode|null>}
export function createChromeOfferDialog287(ports:{get(file:string,name:string):unknown}):{ChromeAutoEnableDialog:React.ComponentType<{onDone(accepted:boolean):void;isDontAskMode:boolean;isAutoMode:boolean}>}
