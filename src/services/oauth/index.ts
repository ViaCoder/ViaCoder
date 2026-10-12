// The complete fixed287 service owns the PKCE, authorization-code receipt,
// exchange/profile and cleanup lifecycle for CLI, TUI and SDK callers.
import {AuthCodeListener} from './auth-code-listener.js'
import {bindOAuthService287} from './officialStartup287/host.js'
export const OAuthService=bindOAuthService287(AuthCodeListener)
export type OAuthService=InstanceType<typeof OAuthService>
export type {OAuthStartOptions287} from './officialStartup287/runtime.js'
