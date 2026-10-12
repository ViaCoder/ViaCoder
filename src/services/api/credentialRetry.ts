import {proxyRetry286} from '../../utils/proxyAuth.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getConfiguredApiKeyHelper} from '../../utils/auth.js'
import {isBareMode} from '../../utils/envUtils.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import {sharedHttpAuth} from '../../utils/sharedHttpAuth.js'
import {createOfficialCredentialRetry286} from './officialByteWatchdog286/credential.runtime.js'

// Public OAuth/WIF/key-helper/proxy paths, bound to their actual application
// owners. Private host callback recovery is not claimed by this binding.
export const publicCredentialRetry286 = createOfficialCredentialRetry286({
 a:authEnvironment, Bn:()=>getAPIProvider()==='firstParty',
 gE:()=>sharedHttpAuth.envBearer(), hre:()=>!isBareMode()&&Boolean(getConfiguredApiKeyHelper()),
 // Keep the existing proxyRetry286 owner, but defer both live-binding reads
 // until DLt actually evaluates the proxy challenge branch. This breaks the
 // config -> client -> withRetry -> credentialRetry -> proxyAuth cycle.
 UOe:(error)=>proxyRetry286.UOe(error), BPe:()=>proxyRetry286.BPe(),
 // Deliberately excluded unused AWS/Google upstream branches.
 WOe:()=>false, SF:()=>false,
})
