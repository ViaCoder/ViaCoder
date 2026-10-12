import type {OAuthProfileStartupPorts287} from './types.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
export declare function createOfficialOAuthProfileStartup287(ports: OAuthProfileStartupPorts287):
  (credentials?: CredentialStore, storageV5?: unknown) => Promise<boolean>
