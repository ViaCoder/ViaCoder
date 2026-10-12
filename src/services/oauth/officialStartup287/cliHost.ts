import {createInterface} from 'node:readline'
import {getInitialSettings} from '../../../utils/settings/settings.js'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getOriginalOAuthLifecycle287} from '../../../utils/officialOAuthLifecycle287/productionBinding.js'
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS} from '../../../constants/oauth.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../analytics/index.js'
import {logError} from '../../../utils/log.js'
import {logForDebugging} from '../../../utils/debug.js'
import {errorMessage} from '../../../utils/errors.js'
import {getSSLErrorHint} from '../../api/errorUtils.js'
import {validateForceLoginOrg} from '../../../utils/auth.js'
import {refreshOAuthToken,shouldUseClaudeAIAuth} from '../client.js'
import {OAuthService} from '../index.js'
import {oauthCallbackErrors287} from './host.js'
import {createOAuthCliLogin287,type OAuthCliLoginInput287} from './runtime.js'
import type {CredentialStore} from '../../../utils/officialSecureStorage/runtime.js'
function invoke(file:string,name:string){return(...args:unknown[])=>{const fn=getOriginalModsLifecycle287().clearSourceModule287(file)[name];if(typeof fn!=='function')throw Error('OAuth CLI source not connected: '+file+':'+name);return Reflect.apply(fn,undefined,args)}}
const event=(name:string,data:Record<string,unknown>)=>logEvent(name,data as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|boolean|number|undefined>)
// Factory contains no new auth/profile state; every account/config/token read
// delegates to the existing canonical owner at the original call site.
export function createOAuthCliLoginPorts287(){return {
 process,tt:getInitialSettings,y8:invoke('chunk-nankzm0s.js','y8'),j8:invoke('chunk-f1vb7bx7.js','j8'),Fl:invoke('chunk-nankzm0s.js','Fl'),hp:'Unable to read managed policy settings, which may restrict the API providers this machine may use (allowedProviders). Contact your administrator.',pp:invoke('chunk-nankzm0s.js','pp'),qQ:invoke('chunk-nankzm0s.js','qQ'),Xt:(name:string,reason:string,extra:Record<string,unknown>={})=>event('tengu_feature_sad',{feature_name:name,error_code:reason,...extra}),c:(value:string)=>value,
 // T3 is solely the disabled telemetry shutdown C, not authentication. Keep
 // this collector off; WF still drains the real canonical config writer.
 T3:async()=>{},i:event,ipe:refreshOAuthToken,fY:LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS,
 YHe:(...args:Parameters<ReturnType<typeof getOriginalOAuthLifecycle287>['install']['YHe']>)=>getOriginalOAuthLifecycle287().install.YHe(...args),TF:validateForceLoginOrg,Ae:invoke('chunk-nankzm0s.js','Ae'),uU:shouldUseClaudeAIAuth,
 y:(name:string)=>event('tengu_feature_ok',{feature_name:name}),m:(name:string,reason:string)=>event('tengu_feature_bad',{feature_name:name,error_code:reason}),Pu:invoke('chunk-c9me9cp7.js','Pu'),Dyt:invoke('chunk-nankzm0s.js','Dyt'),t:logForDebugging,l:errorMessage,d:logError,uK:getSSLErrorHint,WF:invoke('chunk-f1vb7bx7.js','WF'),ZL:OAuthService,L:createInterface,GS:invoke('chunk-ps06tmd5.js','GS'),...oauthCallbackErrors287,
 pHe:invoke('chunk-4gbrna1q.js','pHe'),
}}
export function runOAuthCliLogin287(input:OAuthCliLoginInput287,storageV5?:unknown,credentials?:CredentialStore):Promise<void>{return createOAuthCliLogin287(createOAuthCliLoginPorts287())(input,storageV5,credentials)}
