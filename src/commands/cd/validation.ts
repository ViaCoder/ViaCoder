import {stat,realpath} from 'node:fs/promises'
import {dirname} from 'node:path'
import {homedir} from 'node:os'
import {getOriginalCwd} from '../../bootstrap/state.js'
import type {ToolPermissionContext} from '../../Tool.js'
import {getCwd} from '../../utils/cwd.js'
import {getPathsForPermissionCheck} from '../../utils/fsOperations.js'
import {getErrnoCode,isFsInaccessible} from '../../utils/errors.js'
import {logError} from '../../utils/log.js'
import {expandPath} from '../../utils/path.js'
import {getAllowRules,getDenyRules} from '../../utils/permissions/permissions.js'
import {relativePath} from '../../utils/permissions/filesystem.js'
import {getSettingsRootPathForSource} from '../../utils/settings/settings.js'
import {getPlatform} from '../../utils/platform.js'
import {createCdValidation} from './official.js'
const validate=createCdValidation({Xe:expandPath,G:stat,j:dirname,Ct:isFsInaccessible,d:logError,E:getErrnoCode,x:realpath,xn:(s:string)=>s.normalize('NFC'),oe:getCwd,we:getOriginalCwd,
 Ao:getPathsForPermissionCheck,VDt:(s:string)=>process.platform==='darwin'?s.replace(/^\/private\/(var|tmp|etc)(?=\/|$)/,'/$1'):s,
 jd:getDenyRules,lL:getAllowRules,ike:relativePath,H:getPlatform,At:homedir,Upt:getSettingsRootPathForSource})
export function validateCd(path:string,context:ToolPermissionContext){return validate(path,context)}
