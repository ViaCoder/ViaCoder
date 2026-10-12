import {deepLinkLauncher287} from './launcherRuntime287.js'
import {MACOS_BUNDLE_ID} from './registerProtocol.js'
export const handleDeepLinkUri=deepLinkLauncher287.handle
/** The unpublished Apple Event host remains an explicit capability boundary. */
export async function handleUrlSchemeLaunch():Promise<number|null> {
 if(process.env.__CFBundleIdentifier!==MACOS_BUNDLE_ID)return null
 throw new Error('macOS app-bundle URL event receiver is unavailable in this host')
}
