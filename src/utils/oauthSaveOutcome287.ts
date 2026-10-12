import { clearOAuthTokenCache } from './auth.js'
import { authEnvironment } from './authEnvironment.js'
import { getPlatform } from './platform.js'
import { filesCredentialSlots } from '../vendor/official-files-api/slots.js'
import { createOAuthSaveOutcome287 } from './officialOAuthSaveOutcome287/runtime.js'

// Delegate to the existing process/credential owners. Lazy ports also avoid
// reading the auth module during its import cycle.
export const oauthSaveOutcome287 = createOAuthSaveOutcome287({
  process,
  clearTokenCache: () => clearOAuthTokenCache(),
  fdToken: () => filesCredentialSlots.oauthTokenFromFd(),
  replaceFdToken: token => filesCredentialSlots.replaceOauthTokenFromFd(token),
  replaceBgSnapshot: value => filesCredentialSlots.replaceOauthTokenFromBgSnapshot(value),
  environment: {
    get CLAUDE_CODE_OAUTH_TOKEN() {
      return authEnvironment.CLAUDE_CODE_OAUTH_TOKEN
    },
  },
  platform: () => getPlatform(),
})
