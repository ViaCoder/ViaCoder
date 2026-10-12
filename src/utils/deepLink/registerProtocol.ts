/** Full platform-specific official 287 registration with the retained cclaude executable path. */
import type {StorageV5Backend} from '../secureStorage/storageV5.js'
import type {DeepLinkStorage287} from '../officialDeepLinkProtocol287/native.js'
import {deepLinkProtocol287} from './deepLinkProtocol287.js'
export const MACOS_BUNDLE_ID='com.anthropic.claude-code-url-handler'
export function registerProtocolHandler(binary?:string):Promise<void>{return deepLinkProtocol287.register(binary)}
export function isProtocolHandlerCurrent(binary:string):Promise<boolean>{return deepLinkProtocol287.current(binary)}
/** The optional host implements the original stat/write/delete client contract. */
export function ensureDeepLinkProtocolRegistered(storage?:StorageV5Backend):Promise<void>{
 return deepLinkProtocol287.ensure(storage as unknown as DeepLinkStorage287|undefined)
}
