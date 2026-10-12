import type {FastModeOwner287} from '../officialFastRejection287/native.js'
import type {CredentialStore} from '../officialSecureStorage/runtime.js'
export interface FastStatusLifecyclePorts287 {
 a:typeof import('../authEnvironment.js').authEnvironment;He:()=>string;At:()=>boolean;lc:()=>string|null;Y:(text:string)=>unknown;nZ:()=>string|null;Xl:FastModeOwner287;
 le:()=>{penguinModeOrgEnabled?:boolean};ox:(auth:{accessToken:string}|{apiKey:string})=>Promise<{enabled:boolean;disabled_reason:string|null}>;fn:()=>{accessToken:string;scopes?:string[]}|null;
 nS:(token:string,credentials?:CredentialStore,storageV5?:unknown)=>Promise<boolean>;hn:(source:'userSettings',settings:{fastMode?:undefined},options?:undefined,storageV5?:unknown)=>Promise<{error:Error|null}>;
 Ae:(updater:(config:Record<string,unknown>)=>Record<string,unknown>,storageV5?:unknown)=>Promise<void>;St:Pick<typeof import('axios').default,'isAxiosError'>;t:typeof import('../debug.js').logForDebugging;i:(name:string,data:Record<string,never>)=>void;
}
export declare function createFastStatusLifecycle287(ports:FastStatusLifecyclePorts287):{prefetch(storageV5?:unknown,credentials?:CredentialStore):Promise<void>;resolve():void;oauthAdmitted():boolean;sessionWorker():boolean;remoteCowork():boolean};
