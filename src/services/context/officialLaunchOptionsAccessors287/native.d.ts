import type {LaunchOptions287} from '../../../tools/AgentTool/officialAgentPromptState287/native.js'
export interface LaunchOptionsAccessorRuntime287 {
 getIsNonInteractiveSession():boolean
 getIsInteractive():boolean
 setIsInteractive(value:boolean):void
 getPermissionPromptToolName():string|undefined
 setPermissionPromptToolName(value:string|undefined):void
 getClientType():string
 setClientType(value:string):void
 getSdkAgentProgressSummariesEnabled():boolean
 setSdkAgentProgressSummariesEnabled(value:boolean):void
 getStrictToolResultPairing():boolean
 preferThirdPartyAuthentication():boolean
 setSessionBypassPermissionsMode(value:boolean):void
 getSessionBypassPermissionsMode():boolean
 setSessionPersistenceDisabled(value:boolean):void
 isSessionPersistenceDisabled():boolean
 setScheduledTasksEnabled(value:boolean):void
 getScheduledTasksEnabled():boolean
}
export interface LaunchOptionsAccessorPorts287 {executionContext():{host:{launchOptions:LaunchOptions287}}}
export function createLaunchOptionsAccessors287(ports:LaunchOptionsAccessorPorts287):LaunchOptionsAccessorRuntime287
