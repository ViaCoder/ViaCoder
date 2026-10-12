import type axios from 'axios'
import type {AuthEnvironment} from '../officialAuthEnvironment/runtime.js'
import type {CredentialStore} from '../officialSecureStorage/runtime.js'
import type {OAuthRefreshOutcome} from '../officialOAuthEngine/runtime.js'
import type { OAuthTokens } from '../../services/oauth/types.js'

export type HttpAuthHeaders = { headers: Record<string,string>; error?: string; reasonCode?: string }
export type OAuthRefreshLatch = { attempted: boolean }
export type HttpOAuthRetryOptions = {
  credentials?: CredentialStore
  also403Revoked?: boolean
  gateToSessionOAuthCredential?: boolean
  oauthRefreshLatch?: OAuthRefreshLatch
  onForcedRefreshOutcome?: (outcome: string | undefined) => void
}
export function createHttpAuth(ports: {
  Bn(): boolean; $Yr(name: string): boolean; Wc(): boolean; He(): string
  BS(options?: {skipRetrievingKeyFromApiKeyHelper?: boolean}): {key: string|null;source:string}
  Xn(): {apiKeyHelper?: string} | undefined | null
  a: NodeJS.ProcessEnv | AuthEnvironment
  R_(failedToken: string, credentials?: CredentialStore, storage?: unknown,
    options?: {onForcedRefreshOutcome?: (outcome: OAuthRefreshOutcome) => void}): Promise<boolean>
  kr(): boolean
  ge(source: string): {apiKeyHelper?: string} | null | undefined
  ht: typeof axios
  pn(): OAuthTokens | null
  t(message: string, options?: {level: 'error' | 'debug'}): void
}): {
  authEnabled(): boolean
  subscriber(): boolean
  headers(options?: {envBearerFallbackFor?:string}): HttpAuthHeaders
  resolveHeaders(options?: {envBearerFallbackFor?:string}): Promise<HttpAuthHeaders>
  with401<T>(request:()=>Promise<T>,options?:HttpOAuthRetryOptions): Promise<T>
  envBearer(): string | undefined
  envBearerEndpoint(endpoint:string): boolean
}
