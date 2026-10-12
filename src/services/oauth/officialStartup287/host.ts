import {createServer} from 'node:http'
import {getOauthConfig} from '../../../constants/oauth.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../analytics/index.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../analytics/growthbook.js'
import {logError} from '../../../utils/log.js'
import {openBrowser} from '../../../utils/browser.js'
import * as client from '../client.js'
import * as crypto from '../crypto.js'
import {createOAuthStrings287,createOAuthCallbackErrors287,createOAuthListener287,createOAuthService287} from './runtime.js'
export const oauthStrings287=createOAuthStrings287()
export const oauthCallbackErrors287=createOAuthCallbackErrors287({dn:getOauthConfig})
const event=(name:string,data:Record<string,unknown>)=>logEvent(name,data as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|boolean|number|undefined>)
const success=(name:string)=>event('tengu_feature_ok',{feature_name:name})
const bad=(name:string,reason:string)=>event('tengu_feature_bad',{feature_name:name,error_code:reason})
export const OriginalAuthCodeListener287=createOAuthListener287({
 b:createServer,i:event,d:logError,y:success,m:bad,re:oauthStrings287.re,dn:getOauthConfig,uU:client.shouldUseClaudeAIAuth,
 mSt:()=>getFeatureValue_CACHED_MAY_BE_STALE<boolean>('tengu_lively_beaver',false)===true,...oauthCallbackErrors287,
})
// Service binds the PUBLIC listener constructor, so all entrypoints and caller
// instrumentation share the same listener slot instead of a second factory.
export function bindOAuthService287(Listener:typeof OriginalAuthCodeListener287){return createOAuthService287({
 u:Listener,_:crypto.generateCodeVerifier,A:crypto.generateCodeChallenge,S:crypto.generateState,UJn:client.buildAuthUrl,dqr:client.exchangeCodeForTokens,BJn:client.fetchProfileInfo,wbn:client.parseScopes,ls:openBrowser,i:event,y:success,m:bad,
 z_e:data=>event('tengu_auth_action',data),
})}
