import type {SDKControlRequest} from '../../entrypoints/sdk/controlTypes.js'
import type {CredentialStore} from '../../utils/officialSecureStorage/runtime.js'
import type {PrintBridgeJournal287,BridgeLoginIdentity287} from './requesterBridgeNative.js'
export interface ClaudeMcpStores287 {
 getAppState():any;setAppState(update:(state:any)=>any):void;
 getDynamicMcpState():any;setDynamicMcpState(state:any):void;
}
export interface ClaudeWorkSecretOwner287 {
 loginChanged(identity:BridgeLoginIdentity287|undefined):void;
 apply(secret:string,bridge:import('../../bridge/replBridge.js').ReplBridgeHandle):void;
 undo():Promise<void>;noteModeChoice(mode:string):void;
 projectsReplyMount():any;resyncProjectsReplyMount():void;
 takeFirstTurnJoins():{replyMount:Promise<unknown>|null;grants:Promise<unknown>|null};
}
export interface ClaudeWorkSecretInputs287 {
 stores:ClaudeMcpStores287;storageV5?:unknown;credentials?:CredentialStore;
 getAppendSystemPrompt():string|undefined;setAppendSystemPrompt(value:string|undefined):void;
 sdkHostConfigs():Record<string,unknown>;awaitHostApplyQuiescence():Promise<unknown>;
 permission:{get():unknown;set(value:any):void};applyModelPick(value:string):unknown;applyEffortSeed(value:string):{ok:boolean};
}
export interface ClaudeOAuthCaller287 {
 I:{storageV5?:unknown;credentials?:CredentialStore};e:object;
 v():any;R(update:(state:any)=>any):void;fn:ClaudeMcpStores287;ss():Record<string,unknown>;
 sn:Pick<PrintBridgeJournal287,'identityChanged'>;readonly Ir:ClaudeWorkSecretOwner287|undefined;
 Ze(frame:SDKControlRequest,response?:Record<string,unknown>):void;We(frame:SDKControlRequest,message:string):void;
 nr(frame:SDKControlRequest,subtype:string,error:unknown):void;Hn(subtype:string,error:string):void;
}
export interface ClaudeOAuthController287 {dispatch(frame:SDKControlRequest,detached:(work:()=>unknown)=>void):Promise<boolean>}
export function createClaudeOAuthControlsNative287(ports:object):ClaudeOAuthController287
export function createClaudeOAuthHelpersNative287(ports:object):{cIe(value:boolean):{valid:boolean;message?:string};H7e(provider:string):string|undefined;fI(...args:any[]):boolean}
export function createClaudeIdentityRefreshNative287(ports:object):(input:ClaudeMcpStores287&{storageV5?:unknown;credentials?:CredentialStore;getHostOwnedConfigs?:()=>Record<string,unknown>;force?:boolean;spareUnchangedFrom?:Set<unknown>})=>Promise<unknown>|undefined
export function createClaudeIdentityResetNative287(ports:object):()=>void
export function createClaudeMcpIdentityCheckNative287(ports:object,modern:boolean):()=>boolean
export function createClaudeWorkSecretNative287(ports:object):(input:ClaudeWorkSecretInputs287)=>ClaudeWorkSecretOwner287

export function createClaudeOAuthHostConfigsNative287(ports:object):()=>Record<string,unknown>
