import {createStartupAuthReset287} from './officialStartupAuthReset287/native.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'
// Each port resolves the existing owner at the moment of the original reset;
// these facades hold no fields/caches and never instantiate another cell.
const runtime=createStartupAuthReset287({
 U:()=>({host:getSecureStorageExecutionHost()}),
 Rpe:{of:host=>(require('./sharedOAuthPersistence.js') as typeof import('./sharedOAuthPersistence.js')).oauthCredentialState.state.of(host)},
 nns:{of:host=>(require('./auth.js') as typeof import('./auth.js')).getCanonicalApiKeyReadCell287(host)},
 HWt:{of:host=>(require('./sharedApiKeyHelper.js') as typeof import('./sharedApiKeyHelper.js')).sharedApiKeyHelper.state(host)},
 rJe:()=>(require('./conditionalAuthRefreshState287.js') as typeof import('./conditionalAuthRefreshState287.js')).clearAwsAuthRefreshThrottle287(),
 a_t:()=>(require('./conditionalAuthRefreshState287.js') as typeof import('./conditionalAuthRefreshState287.js')).clearGcpAuthRefreshState287(),
 Ej:()=>(require('./betas.js') as typeof import('./betas.js')).clearBetasCaches(),
 vpe:()=>(require('./officialOAuthLifecycle287/productionBinding.js') as typeof import('./officialOAuthLifecycle287/productionBinding.js')).getOriginalOAuthLifecycle287().resetPorts.vpe(),
 F:()=>(require('./secureStorage/storageV5.js') as typeof import('./secureStorage/storageV5.js')).isStorageV5PinnedOn(),
 bwe:()=>(require('./secureStorage/officialRuntime.js') as typeof import('./secureStorage/officialRuntime.js')).secureStorageCore.clearCopy(),
})
export const resetStartupAuthCaches287=runtime.reset
