import type {GlobalConfig} from '../config.js';
import type {CredentialStore,ModernSecureStorage,StorageCore} from '../officialSecureStorage/runtime.js';
import type {AxiosStatic} from 'axios';
export type OAuthCredentialClearOptions287={preserveInProcessTokens?:boolean;preserveNonAnthropicAuth?:boolean;credentials?:CredentialStore};
export function createOAuthCredentialClear287(ports:{storage():ModernSecureStorage;provider():string;revoke(token:string,clientId?:string):Promise<void>;debug(message:string,options?:{level:'error'|'warn'}):void;report(error:unknown):void;writeLock:StorageCore['withWriteLock'];alreadyLocked:StorageCore['alreadyLocked'];readFailed:symbol;environment:{unset(name:string):void};setFd(token:null):void;setGateway(value:null):void;stampAccount(value:null):void}):{clear(options?:OAuthCredentialClearOptions287):Promise<void>;revokeExisting(options?:OAuthCredentialClearOptions287):Promise<void>;clearInProcess(options?:OAuthCredentialClearOptions287):void;clearSlots():void};
export function createOAuthConfigClear287():(clearOnboarding?:boolean)=>(config:GlobalConfig)=>GlobalConfig;
export function createOAuthRevoker287(ports:{http:Pick<AxiosStatic,'post'|'isAxiosError'>;config():{TOKEN_URL:string;CLIENT_ID:string};ok(feature:string):void;debug(message:string):void;sad(feature:string,reason:string):void}):(token:string,clientId?:string)=>Promise<void>;
