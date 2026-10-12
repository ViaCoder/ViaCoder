import * as path from 'node:path'
import {z} from 'zod/v4'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getGlobalConfig} from '../../utils/config.js'
import {getClaudeAIOAuthTokens} from '../../utils/auth.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {logForDebugging} from '../../utils/debug.js'
import {getExecutionSession287,getRootExecutionSession287} from '../../services/context/execution287.js'
import {getOriginalSettingsReader287} from '../../utils/settings/settingsReader287.js'
import {getOfficialModelMenuPolicy287} from '../../utils/model/officialModelPicker287.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {getPolicyPublicClient287} from '../../services/policyLimits/publicBindings287.js'
import {getOfficialPolicyPrincipal286} from '../../services/policyLimits/officialIdentityBindings286.js'
import {createStartupNotice287,type StartupNotice287,type StartupNoticePorts287} from './officialStartupNotice287/native.js'

export function createStartupNoticeProductionPorts287():StartupNoticePorts287 {
 return {
  environment:authEnvironment,builtins:{path},
  modelDeprecation:model=>{const ko=getOfficialModelMenuPolicy287().Ko;if(typeof ko!=='function')throw Error('Original Ko model metadata missing');return ko(model)},
  globalConfig:getGlobalConfig,oauthTokens:getClaudeAIOAuthTokens,feature:getFeatureValue_CACHED_MAY_BE_STALE,debug:logForDebugging,
  provider:getNativeAPIProvider287,execution:getExecutionSession287,rootExecution:getRootExecutionSession287(),
  remote:()=>getExecutionSession287().surfaceCapabilities.caps().workspace==='remote',
  publishedPolicy:()=>getPolicyPublicClient287().Z_(),policyState:()=>getOfficialPolicyPrincipal286().p(),
  policyEligible:()=>getPolicyPublicClient287().y_(),hostManaged:()=>getOfficialPolicyPrincipal286().jD(),complianceTaint:()=>getPolicyPublicClient287().rU(),
  settingsForSource:source=>{const reader=getOriginalSettingsReader287();return reader.source(source,reader.heldContext())},
  settingsPath:source=>{const reader=getOriginalSettingsReader287();return reader.path(source,reader.heldContext())},
  // Same canonical held settings; exact raw remoteControlAtStartup schema, not truthiness.
  legacyFields:()=>({field:key=>key==='remoteControlAtStartup'?getStartupNotice287().legacyField(z.boolean):undefined}),
  nativeRequire:specifier=>{
   if(specifier!=='/$bunfs/root/chunk-139mqjgn.js')throw Error('Unexpected startup settings namespace '+specifier)
   return {projectSettingsAliasesUserSettings:()=>getStartupNotice287().aliases(),
    getSettingsForSource:source=>{const reader=getOriginalSettingsReader287();return reader.source(source,reader.heldContext())},
    getSecuritySensitiveSettingWithSources:key=>getStartupNotice287().sensitive(key)}
  },
 }
}
let runtime:StartupNotice287|undefined
export function getStartupNotice287(){return runtime??=createStartupNotice287(createStartupNoticeProductionPorts287())}
/** Producer used by actual interactive startup, distinct from the source default state. */
export function buildStartupSetupIssues287(rawModel:string|null|undefined,resolvedModel:string,restrictedModel?:string|null){
 return getStartupNotice287().setupIssues(rawModel,resolvedModel,restrictedModel)
}
