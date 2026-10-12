import type {authEnvironment} from '../../../utils/authEnvironment.js'
import type {OAuthTokens} from '../../../services/oauth/types.js'

export type ProfilePrecedence287 = 'profile-explicit' | 'profile-implicit' | 'env-quad' | null
export type ProfileAuthType287 = 'user_oauth' | 'oidc_federation' | null
export type ProfileEnvironment287 = Partial<Pick<typeof authEnvironment,
  'ANTHROPIC_UNIX_SOCKET' | 'ANTHROPIC_AUTH_TOKEN' | 'CLAUDE_CODE_OAUTH_TOKEN' | 'CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST'>>
export interface ProfileSelectorState287 {
  implicitProfileSkippedLogged: boolean
  profileAuthSelectedLogged: boolean
}
export interface ApiKeySelectionOptions287 {skipRetrievingKeyFromApiKeyHelper?: boolean}
export interface ApiKeySelectionResult287 {key: string | null; source: string}
export interface ProfileEligibilityPorts287 {
  /** n5o import: chunk-8ptzhr8g.js. Bind existing I6o, after owner equivalence verification. */
  configuredProfile(): boolean
  /** a import: chunk-mbfze585.js. Read lazily per original property access, never at factory construction. */
  environment(): ProfileEnvironment287
  /** f8 same-module declaration: chunk-nankzm0s.js. */
  apiKeyOnlyMode(): boolean
  /** pr same-module declaration: a.CLAUDE_CODE_REMOTE || yd(). */
  remoteOrGatewayAuth(): boolean | string | undefined
  /** sO import: chunk-mnp9k227.js; existing token descriptor accessor. */
  descriptor(): string | null | undefined
  /** vh same-module declaration: helper configuration lookup, not helper execution. */
  apiKeyHelper(): string | null | undefined
  /** Vn import: chunk-wz6xag6e.js. */
  anthropicEndpointEnabled(): boolean
  /** Jts same-module declaration: use the existing host-keyed state registry, never create another owner. */
  selectorState: {of(host: object): ProfileSelectorState287}
  /** U import: chunk-bn3p37gv.js. */
  execution(): {host: object}
  /** ew import: chunk-8ptzhr8g.js; existing attribution kb seam. */
  profilePrecedence(): ProfilePrecedence287
  /** fn same-module declaration: existing OAuth token owner. BWt/uU/HTn/fA are emitted verbatim. */
  tokens(): Pick<OAuthTokens, 'accessToken' | 'scopes'> | null
  /** MGt import: chunk-8ptzhr8g.js; ew()==='profile-implicit' && yQe()==='user_oauth' (existing q2t). */
  implicitProfileUserOAuth(): boolean
  /** yQe import: chunk-8ptzhr8g.js; existing WIF-owner FXe seam. */
  profileAuthType(): ProfileAuthType287
  /** t import: chunk-q80zaav8.js. Main binds the existing C debug facade. */
  debug: typeof import('../../../utils/debug.js').logForDebugging
  /** i import: chunk-6hnyhakg.js. Main binds the existing C analytics facade. */
  analytics: typeof import('../../../services/analytics/index.js').logEvent
  /** mb same-module declaration, allowed to throw. Original Gp catch is emitted verbatim. Main proves/resolves the key owner. */
  selectApiKey(options?: ApiKeySelectionOptions287): ApiKeySelectionResult287
}
export interface OfficialProfileEligibility287 {
  profileEligible(options?: {skipApiKeyHelper?: boolean}): boolean
  remoteProfileEligible(): boolean
}
export function createOfficialProfileEligibility287(ports: ProfileEligibilityPorts287): OfficialProfileEligibility287
