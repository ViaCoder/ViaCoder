import * as path from 'node:path'
import {getUserBinDir} from '../xdg.js'
/** Retained C: registration and trampoline share this source application's installed entry. */
export function getDeepLinkStableEntry287():string {
 return path.join(getUserBinDir(),process.platform==='win32'?'cclaude.exe':'cclaude')
}
