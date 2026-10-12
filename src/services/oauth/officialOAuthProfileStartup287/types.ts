import type {OAuthProfileResponse, OAuthTokens} from '../types.js'
import type {OAuthAccountWrite287} from '../../../utils/officialOAuthPreparation287/runtime.js'
import type {GlobalConfig} from '../../../utils/config.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
import type {AuthEnvironment} from '../../../utils/officialAuthEnvironment/runtime.js'

export type OAuthProfileStartupPorts287 = {
  a: AuthEnvironment
  le: () => GlobalConfig
  $i: (context: {credentials?: CredentialStore; storageV5?: unknown}) => Promise<boolean>
  t: (message: string, metadata: {level: 'info'}) => void
  tWt: (account: OAuthAccountWrite287, storageV5?: unknown) => void
  ft: () => boolean
  zp: () => boolean
  fn: () => OAuthTokens | null | undefined
  KBe: (accessToken: string) => Promise<OAuthProfileResponse | undefined>
  xr: () => boolean
  n: () => {host: {credentialSlots: {
    oauthTokenFromFd(): string | null | undefined
    oauthTokenFromBgSnapshot(): boolean
  }}}
  FJn: (profile: OAuthProfileResponse) => string | null
}
