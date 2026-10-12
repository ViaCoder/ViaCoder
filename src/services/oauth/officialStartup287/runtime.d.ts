import type {Server,ServerResponse,IncomingMessage,createServer} from 'node:http'
import type {ComponentType,ReactNode} from 'react'
import type {OAuthClient,OAuthTokens,OAuthTokenExchangeResponse,OAuthProfileResponse,SubscriptionType,RateLimitTier} from '../types.js'
export interface OAuthCallbackError287 extends Error {error:string;errorDescription?:string;errorUri?:string;displayMessage:string}
export interface OAuthCallbackErrors287 {
 mQe:string;qIe(value:unknown):string;dK:new(error:string,description?:string,uri?:string)=>OAuthCallbackError287;
 Evn(error:unknown):boolean;wvn(uri:string):string;
}
export function createOAuthBrowserGate287(ports:{a:typeof import('../../../utils/authEnvironment.js')['authEnvironment'];p():unknown}):()=>boolean
export function createOAuthStrings287():{I(count:number,singular:string,plural?:string):string;re(text:string,length:number):string}
export function createOAuthCallbackErrors287(ports:{dn():{CLAUDE_AI_ORIGIN:string}}):OAuthCallbackErrors287
export interface OAuthListener287 {
 localServer:Server;start(port?:number):Promise<number>;getPort():number;hasPendingResponse():boolean;
 waitForAuthorization(state:string,onReady:()=>Promise<void>):Promise<string>;
 handleSuccessRedirect(scopes:string[],handler?:(res:ServerResponse,scopes:string[])=>void):void;
 handleErrorRedirect():void;handleRedirect(req:IncomingMessage,res:ServerResponse):void;close():void;
 handleError(error:Error):void;[Symbol.dispose]():void;
}
export function createOAuthListener287(ports:{b:typeof createServer;i(name:string,data:Record<string,unknown>):void;d(error:unknown):void;y(name:string):void;m(name:string,reason:string):void;re(text:string,length:number):string;dn():{CLAUDEAI_SUCCESS_URL:string;CONSOLE_SUCCESS_URL:string};uU(scopes:string[]|undefined):boolean;mSt():boolean;mQe:string;qIe(value:unknown):string;dK:OAuthCallbackErrors287['dK']}):new(path?:string)=>OAuthListener287
export interface OAuthStartOptions287 {
 loginWithClaudeAi?:boolean;inferenceOnly?:boolean;expiresIn?:number;orgUUID?:string;loginHint?:string;loginMethod?:string;
 skipBrowserOpen?:boolean;oauthClient?:OAuthClient;skipProfileFetch?:boolean;successRedirectUrl?:string;
}
export interface OAuthService287 {
 readonly port?:number;
 startOAuthFlow(onURL:(url:string,automatic?:string)=>Promise<void>,options?:OAuthStartOptions287):Promise<OAuthTokens>;
 handleManualAuthCodeInput(input:{authorizationCode:string;state:string}):void;
 hasReceivedAuthorizationCode():boolean;cleanup():void;
 formatTokens(response:OAuthTokenExchangeResponse,context:{subscriptionType:SubscriptionType|null;rateLimitTier:RateLimitTier|null;profile?:OAuthProfileResponse;clientId?:string}):OAuthTokens;
}
export function createOAuthService287(ports:{u:new()=>OAuthListener287;_():string;A(code:string):string;S():string;UJn:typeof import('../client.js').buildAuthUrl;dqr:typeof import('../client.js').exchangeCodeForTokens;BJn:typeof import('../client.js').fetchProfileInfo;wbn:typeof import('../client.js').parseScopes;ls(url:string):Promise<boolean>;i(name:string,data:Record<string,unknown>):void;y(name:string):void;m(name:string,reason:string):void;z_e(data:Record<string,unknown>):void}):new()=>OAuthService287
export interface OAuthUiProps287 {
 onDone():void;onAuthSuccess?():void;onFreshPickerChange?(fresh:boolean):void;onAccountOnHold?():void;
 startingMessage?:string;mode?:'login'|'setup-token';expiresIn?:number;forceLoginMethod?:'claudeai'|'console';urlOutdent?:number;
}
export function createOAuthUi287(ports:Record<string,unknown>):ComponentType<OAuthUiProps287>
export type OAuthCliLoginInput287={email?:string;sso?:boolean;console?:boolean;claudeai?:boolean}
export function createOAuthCliLogin287(ports:Record<string,unknown>):(input:OAuthCliLoginInput287,storageV5?:unknown,credentials?:import('../../../utils/officialSecureStorage/runtime.js').CredentialStore)=>Promise<void>
