import * as path from 'node:path'
import {filesystemPathRuntime287} from '../../utils/filesystemPathRuntime287.js'
import {expandPath} from '../../utils/path.js'
import {getPlatform} from '../../utils/platform.js'
import {windowsPathToPosixPath287} from '../../utils/pathRuntime287.js'
import {createPrintClaimScreen287} from './native.js'
// Screen and mount/volume caches belong to the same canonical filesystem owner
// as permission and Memory paths. No second resolver/cache is constructed.
export const printClaimScreen287=createPrintClaimScreen287({
 O:getPlatform,SR:filesystemPathRuntime287.isNetworkVolumePath,Xe:expandPath,
 ca:filesystemPathRuntime287.isAutomountPath,hY:filesystemPathRuntime287.screen,
 jx:windowsPathToPosixPath287,qe:path.posix,tt:path,
})
