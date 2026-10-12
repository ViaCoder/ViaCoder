import axios from 'axios'
import * as http from 'node:http'
import * as https from 'node:https'
import {Readable} from 'node:stream'
import {createHash} from 'node:crypto'
import {getOauthConfig, OAUTH_BETA_HEADER} from '../../../constants/oauth.js'
import {getGlobalConfig, saveGlobalConfig} from '../../../utils/config.js'
import {getClaudeAIOAuthTokens, getClaudeAIOAuthTokensAsync, handleOAuth401Error} from '../../../utils/auth.js'
import {sharedHttpAuth} from '../../../utils/sharedHttpAuth.js'
import {getSharedOAuthEngine} from '../../../utils/sharedOAuthEngine.js'
import {oauthKnownDeadRefreshTokens} from '../../../utils/sharedOAuthPersistence.js'
import {getSecureStorage} from '../../../utils/secureStorage/index.js'
import {authEnvironment} from '../../../utils/authEnvironment.js'
import {getUserAgent} from '../../../utils/http.js'
import {isEssentialTrafficOnly} from '../../../utils/privacyLevel.js'
import {getAPIProvider} from '../../../utils/model/providers.js'
import {getSessionIngressAuthToken} from '../../../utils/sessionIngressAuth.js'
import {getMTLSConfig} from '../../../utils/mtls.js'
import {getCACertificates} from '../../../utils/caCerts.js'
import {getOrganizationUUID, shouldUseClaudeAIAuth} from '../../oauth/client.js'
import {filesCredentialSlots} from '../../../vendor/official-files-api/slots.js'
import {logError} from '../../../utils/log.js'
import {logForDebugging} from '../../../utils/debug.js'
import {logEvent} from '../../analytics/index.js'
import type {FirstTokenDateApplicationPorts286} from './productionBinding.js'

/** Concrete production services. Header parsing deliberately calls original QD() with no r. */
export function firstTokenDateApplicationPorts286():FirstTokenDateApplicationPorts286 {
  const record = (name:string,metadata:Record<string,unknown>) =>
    logEvent(name,metadata as Parameters<typeof logEvent>[1])
  return {
    http:{
      ht:axios, i2e:axios.AxiosError,
      lc:http, Fv:https, RF:http.Agent, be:https.Agent,
      JN:Readable, OF:Readable, TF:createHash, S:JSON.stringify,
      AC:getMTLSConfig, CO:getCACertificates,
      QD:()=>sharedHttpAuth.resolveHeaders(), dxe:()=>sharedHttpAuth.headers(),
      Hi:options=>getSharedOAuthEngine().refresh(options),
      R_:(token,credentials,storageV5)=>handleOAuth401Error(token,credentials,storageV5),
      Fa:credentials=>getClaudeAIOAuthTokensAsync(credentials), zn:getSecureStorage,
      pn:getClaudeAIOAuthTokens, bi:oauthKnownDeadRefreshTokens,
      a:authEnvironment, kn:authEnvironment,
      Spe:()=>filesCredentialSlots.sdkOAuthTokenRefreshCallback(),
      Bn:()=>getAPIProvider()==='firstParty', He:getAPIProvider,
      xt:isEssentialTrafficOnly,
      h1:shouldUseClaudeAIAuth,
      h2:getOrganizationUUID, Vl:getSessionIngressAuthToken,
      QI:getUserAgent,
      // This owner publishes only the original h/default-api request contract.
      // Other host dispatch owners supply their own Wv to the standalone lr factory.
      Wv:()=>getOauthConfig().BASE_API_URL,
      t:logForDebugging, d:logError,
      Uu:OAUTH_BETA_HEADER,
    },
    readConfig:getGlobalConfig,
    saveConfig:saveGlobalConfig,
    error:logError, debug:logForDebugging,
    success:feature=>record('tengu_feature_ok',{feature_name:feature}),
    failure:(feature,reason)=>record('tengu_feature_bad',{feature_name:feature,error_code:reason}),
  }
}
