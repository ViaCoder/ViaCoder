import {getExecutionSession287} from '../../services/context/execution287.js'
import {getSessionId,getAdditionalDirectoriesForClaudeMd,setAdditionalDirectoriesForClaudeMd,setHasExitedPlanMode,setNeedsPlanModeExitAttachment,setNeedsAutoModeExitAttachment,setSessionBypassPermissionsMode} from '../../bootstrap/state.js'
import {SDKControlClaimSessionRequestSchema} from '../../entrypoints/sdk/controlSchemas.js'
import {applyPermissionUpdate} from '../../utils/permissions/PermissionUpdate.js'
import {getEnabledSettingSources,type SettingSource} from '../../utils/settings/constants.js'
import {parseSettingsFile} from '../../utils/settings/settings.js'
import {expandPath} from '../../utils/path.js'
import {isEnvTruthy} from '../../utils/envUtils.js'
import {isENOENT} from '../../utils/errors.js'
import {logForDebugging} from '../../utils/debug.js'
import {logEvent} from '../../services/analytics/index.js'
import {profileCheckpoint} from '../../utils/startupProfiler.js'
import {headlessProfilerCheckpoint} from '../../utils/headlessProfiler.js'
import {resetStartupAuthCaches287} from '../../utils/startupAuthReset287.js'
import {oauthCredentialState} from '../../utils/sharedOAuthPersistence.js'
import {getSecureStorageExecutionHost} from '../../utils/secureStorage/macOsKeychainHelpers.js'
import {sanitizeMcpText} from '../control/officialDisplay.js'
import {createPrintClaim287,type ClaimHost287} from './native.js'
import {printClaimScreen287} from './screen.js'
import {createClaimRelocation287,type ClaimRelocationHost287} from './relocation.js'
export function createClaimCaller287(host:ClaimHost287&ClaimRelocationHost287&{register():Promise<boolean>}) {
 const relocation=createClaimRelocation287(host)
 const runtime=createPrintClaim287({
  executionContext:getExecutionSession287,REn:SDKControlClaimSessionRequestSchema,
  CB:printClaimScreen287.screen,HD:printClaimScreen287.unsafe,ZHn:relocation.isInvisible,
  Xe:expandPath,Ht:isENOENT,Kt:sanitizeMcpText,Pd:()=>isEnvTruthy(process.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB),
  tr:(source:string)=>getEnabledSettingSources().includes(source as SettingSource),wK:parseSettingsFile,
  // Canonical settings config-root lookup; no separate project/config cache.
  iD:(directory:string)=>getProjectPathForConfigForDirectory287(directory),nw:parseSettingsFile,
  not:relocation.relocate,q:getSessionId,CW:setAdditionalDirectoriesForClaudeMd,xu:getAdditionalDirectoriesForClaudeMd,
  ed:applyPermissionUpdate,vW:setNeedsPlanModeExitAttachment,wD:setHasExitedPlanMode,bO:setNeedsAutoModeExitAttachment,q3t:setSessionBypassPermissionsMode,
  NWt:resetStartupAuthCaches287,
  Tbe:()=>oauthCredentialState.configurationChanged.of(getSecureStorageExecutionHost()).emit(),
  U_n:()=>profileCheckpoint('warm_spare_claimed'),Yr:profileCheckpoint,Gf:headlessProfilerCheckpoint,
  bI:(fields:Record<string,number>)=>logForDebugging(`spare claim timings: ${JSON.stringify(fields)}`),i:logEvent,t:logForDebugging,
  m6t:()=>host.register(),
 })
 return {runtime,host,relocation,claim:(request:unknown)=>runtime.handleClaimSessionRequest(request,host)}
}
function getProjectPathForConfigForDirectory287(directory:string):string {
 // Current local settings root resolver uses canonical explicit config-root
 // override where present; default local file is relative to the claim cwd.
 const root=(getExecutionSession287().host.launchOptions as unknown as {projectConfigRoot():string|null}).projectConfigRoot()
 return root??directory
}
