import type {StorageV5EnvPin} from '../../secureStorage/storageV5.js'
import type {SettingsJson} from '../../settings/types.js'
import type {PolicyReadError287} from '../../../services/context/officialModelUsagePolicy287/native.js'
export interface ChromeStandalone287 {
 initializeHelper(document:Record<string,unknown>|null,origin:string|null,errors:Record<string,unknown>[]):Promise<null|{message:string}>
 helperExec(options:{path?:string;script?:string;interpreter?:string;timeoutMs?:number},origin:string,fromPerOs:boolean,armedFromRemote:boolean):Promise<{error?:string;code?:string;output?:{managedSettings?:SettingsJson};warnings?:PolicyReadError287[]}>
 dynamicModules:Record<string,Record<string,unknown>>
 run(pin?:StorageV5EnvPin):Promise<void>
 initializeSettings(pin?:StorageV5EnvPin):Promise<string|null>
 initializeGateway():Promise<void>
 helperState:{state:unknown|null;armedFromUserWritableBase:boolean;reset():void}
 helperSettings():SettingsJson|null
 helperArmedFromRemote():boolean
 helperMergesOutput():boolean
 helperWarnings():PolicyReadError287[]
 helperArmedFromUserWritableBase():boolean
}
export function createChromeStandalone287(ports:Record<string,unknown>):ChromeStandalone287

/** Direct canonical source namespace; all members retain original declaration identities. */
export type ChromePolicyHelperModule287 = {
 C:ChromeStandalone287['helperState'];
 $n:ChromeStandalone287['initializeHelper'];
 Ji:ChromeStandalone287['helperExec'];
 or:ChromeStandalone287['helperSettings'];
 sr:ChromeStandalone287['helperArmedFromRemote'];
 ar:ChromeStandalone287['helperMergesOutput'];
 Rt:ChromeStandalone287['helperWarnings'];
 czt:ChromeStandalone287['helperArmedFromUserWritableBase'];
}
