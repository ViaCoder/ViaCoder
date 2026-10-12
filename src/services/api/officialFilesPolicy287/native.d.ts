import type {ModelUsagePolicyReadPorts287,ModelUsagePolicyNative287,PolicyDocument287} from '../../context/officialModelUsagePolicy287/native.js'
import type {NativePolicySources286,SettingSource286,Provider286,Dispatch286} from '../officialProviderGuard286/contracts.js'
export interface FilesPolicyPorts287 extends Pick<ModelUsagePolicyReadPorts287,
 'context'|'settingsStore'|'mdm'|'managedFile'|'parsePolicy'|'remoteOwner'|'remoteSettings'|'rawRemoteSettings'|'remoteLoadStatus'|'remoteSnapshotEnabled'|'platform'|'filesystem'> {
 policyRecords:ModelUsagePolicyNative287['readPolicyRecords287']
 helperComposition:ModelUsagePolicyNative287['readPolicyHelperComposition287']
 adminLoadBlocked:ModelUsagePolicyNative287['adminLoadBlocked']
 hkcu:ModelUsagePolicyReadPorts287['mdm']
 executionContext:typeof import('../../context/execution287.js').getExecutionSession287
 provider:typeof import('../../../utils/model/providerSelectionBindings287.js').getNativeAPIProvider287
 gatewayAuth():{url:string;unpinned?:boolean}|null
 parentManaged():PolicyDocument287|null|undefined
 environment:typeof import('../../../utils/authEnvironment.js').authEnvironment
 settingsSource(source:SettingSource286):PolicyDocument287|null
 settingsPath(source:SettingSource286):string|undefined
 invalidateSettings():void
 complianceTaint(regime:string):boolean
}
export interface FilesPolicy287 {
 machine:NativePolicySources286['Mht'];tiers:NativePolicySources286['R7n'];remote:NativePolicySources286['k7n']
 errors:NativePolicySources286['ak'];loginPins:NativePolicySources286['c7e'];verified:NativePolicySources286['YS']
 assertProvider(provider:Provider286,endpoint:string|undefined,dispatch?:Dispatch286):void
 assertFiles(endpoint?:string):void
 registerWif(reader:()=>string|null|undefined):void
}
export function createFilesPolicy287(ports:FilesPolicyPorts287):FilesPolicy287
