export type ManualCallback287=(url:string)=>boolean
export interface ManualOAuthState287 {oauthCallbackSubmitters:Map<string,ManualCallback287>;activeOAuthFlows:Map<string,Promise<unknown>>;oauthCallbackListeners:Map<number,AbortController>}
export function createOriginalManualOAuthRegistry287(p:{qt():ManualOAuthState287}):{getOAuthCallbackSubmitter(name:string):ManualCallback287|undefined;setActiveOAuthPromise(name:string,promise:Promise<unknown>):void;getActiveOAuthPromise(name:string):Promise<unknown>|undefined}
export interface ManualCallbackPorts287 {e:string;J:string;w:ManualOAuthState287;M:number;_e:ManualCallback287|null;d?:{onWaitingForCallback?:(submit:ManualCallback287,port:number,state:string)=>void};te(name:string,message:string):void;W():void;G(error:Error):void;ve(code:string):void}
export function installOriginalManualCallback287(ports:ManualCallbackPorts287):ManualCallback287
export function clearOriginalManualCallback287(ports:{w:ManualOAuthState287;e:string;M:number;N:AbortController;_e:ManualCallback287|null}):void
export function adoptOriginalManualListener287(ports:{w:ManualOAuthState287;M:number;R:boolean}):AbortController
