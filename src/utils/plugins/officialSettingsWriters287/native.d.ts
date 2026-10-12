import type {CredentialStore} from '../../officialSecureStorage/runtime.js'
import type {UserConfigSchema} from '../mcpbHandler.js'
export interface PluginSettingsWriters287 {saveOptions(id:string,values:Record<string,unknown>,schema:UserConfigSchema,storageV5?:unknown,credentials?:CredentialStore):Promise<void>;saveMcp(id:string,server:string,values:Record<string,unknown>,schema:UserConfigSchema,storageV5?:unknown,credentials?:CredentialStore):Promise<void>;deleteOptions(id:string,storageV5?:unknown,credentials?:CredentialStore,failures?:string[]):Promise<boolean>;saveMarketplace(name:string,entry:Record<string,unknown>,source?:'userSettings'|'projectSettings'|'localSettings',storageV5?:unknown):Promise<{error:Error|null}>}
export function createPluginSettingsWriters287(ports:Record<string,unknown>):PluginSettingsWriters287
export function createPluginOptionsInvalidator287(ut:()=>{optionValues:{clear():void}}):()=>void
