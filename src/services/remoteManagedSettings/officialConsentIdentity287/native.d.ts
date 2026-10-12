import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {ConsentIdentity} from '../consentState.js'
import type {GatewayCredential287} from '../officialGatewayRefresh287/native.js'
import type {ConsentStorageV5287} from '../officialConsentRecords287/native.js'
import type {SettingsJson} from '../../../utils/settings/types.js'
export interface ConsentIdentityPorts287 {
 gatewayAuth():GatewayCredential287|null|undefined
 gatewayPin(gateway:GatewayCredential287,credentials?:CredentialStore):Promise<string|undefined>
 gatewayIdentity(gateway:GatewayCredential287,pin?:string):ConsentIdentity|undefined
 profileEligible():boolean
 profileIdentity():ConsentIdentity|undefined
 oauthIdentity(credentials?:CredentialStore):Promise<{consentIdentity?:ConsentIdentity}>
 storedAccount():{organizationUuid?:string;accountUuid?:string}|undefined
 writeRecord(identity:ConsentIdentity,settings:SettingsJson,storageV5?:ConsentStorageV5287):Promise<void>
 selectApiKey(options:{skipRetrievingKeyFromApiKeyHelper:true}):{key:string|null;source:string}
 debug(message:string):void
}
export interface ConsentIdentity287 {
 liveIdentity(credentials?:CredentialStore):Promise<ConsentIdentity|undefined>
 record(identity:ConsentIdentity|undefined,settings:SettingsJson,storageV5?:ConsentStorageV5287,credentials?:CredentialStore):Promise<void>
}
export function createConsentIdentity287(ports:ConsentIdentityPorts287):ConsentIdentity287
