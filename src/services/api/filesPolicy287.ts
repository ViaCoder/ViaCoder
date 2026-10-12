import {createFilesPolicy287,type FilesPolicyPorts287} from './officialFilesPolicy287/native.js'
// Resolve the existing owner at use time: Files imports bootstrap/state during
// cold module evaluation, before the model picker registration is initialized.
const modelPolicyOwner=()=>require('../context/modelUsagePolicy287.js') as typeof import('../context/modelUsagePolicy287.js')
import {getSettingsCacheStore287,resetSettingsCache} from '../../utils/settings/settingsCache.js'
import {getSettingsForSource,getSettingsFilePathForSource} from '../../utils/settings/settings.js'
import {getResolvedWIFBaseUrlSnapshot} from '../../utils/httpWorkloadIdentity.js'
import {getExecutionSession287} from '../context/execution287.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {filesCredentialSlots} from '../../vendor/official-files-api/slots.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {hasPolicyComplianceTaint} from '../policyLimits/index.js'
import type {NativePolicySources286} from './officialProviderGuard286/contracts.js'

/** Read-only cut to the existing native policy selector, settings registry,
 * credential host and verified remote owner. No settings/cache owner is added.
 * Optional enterprise-helper input remains absent exactly as in that owner.
 */
export function getFilesPolicyPorts287():FilesPolicyPorts287 {
 const {getModelUsagePolicy287,getModelUsagePolicyContext287,createModelUsagePolicyReadPorts287}=modelPolicyOwner()
 const policy=getModelUsagePolicy287(),reads=createModelUsagePolicyReadPorts287()
 return {
  context:getModelUsagePolicyContext287,settingsStore:getSettingsCacheStore287,
  policyRecords:policy.readPolicyRecords287,helperComposition:policy.readPolicyHelperComposition287,
  adminLoadBlocked:policy.adminLoadBlocked,mdm:reads.mdm,hkcu:()=>reads.context().hkcu(),
  managedFile:reads.managedFile,parsePolicy:reads.parsePolicy,
  remoteOwner:reads.remoteOwner,remoteSettings:reads.remoteSettings,rawRemoteSettings:reads.rawRemoteSettings,
  remoteLoadStatus:reads.remoteLoadStatus,remoteSnapshotEnabled:reads.remoteSnapshotEnabled,
  platform:reads.platform,filesystem:reads.filesystem,
  executionContext:getExecutionSession287,provider:getNativeAPIProvider287,
  gatewayAuth:()=>filesCredentialSlots.gatewayAuth(),
  parentManaged:policy.parentManaged,environment:authEnvironment,
  settingsSource:source=>source==='policySettings'?policy.readSource(source,reads.context()):getSettingsForSource(source),
  settingsPath:source=>getSettingsFilePathForSource(source)??undefined,
  invalidateSettings:resetSettingsCache,complianceTaint:hasPolicyComplianceTaint,
 }
}
let native:ReturnType<typeof createFilesPolicy287>|undefined
function getNativeFilesPolicy287(){
 if(!native){native=createFilesPolicy287(getFilesPolicyPorts287());native.registerWif(getResolvedWIFBaseUrlSnapshot)}
 return native
}
export function assertFilesApiAvailable287(endpoint?:string):void {getNativeFilesPolicy287().assertFiles(endpoint)}
/** D7e inference dispatch uses this same native policy/cache owner. */
export function assertInferenceProviderAvailable287(provider:import('./officialProviderGuard286/contracts.js').Provider286,endpoint?:string):void {getNativeFilesPolicy287().assertProvider(provider,endpoint,'inference')}
/** NativePolicySources286 is the pre-existing public source contract, not an
 * alternate source registry. All functions below are whole 287 facades and
 * consume the same settings/model-policy/verified-remote owners as the caller.
 */
export const filesNativePolicySources287:NativePolicySources286={
 Mht:()=>getNativeFilesPolicy287().machine(),R7n:()=>getNativeFilesPolicy287().tiers(),k7n:()=>getNativeFilesPolicy287().remote(),
 H9:()=>modelPolicyOwner().getModelUsagePolicy287().adminLoadBlocked(),Go:resetSettingsCache,
 YS:()=>getNativeFilesPolicy287().verified(),
 c7e:()=>getNativeFilesPolicy287().loginPins(),ak:()=>getNativeFilesPolicy287().errors(),
}
