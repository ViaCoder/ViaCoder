import * as React from 'react'
import {jsx,jsxs} from 'react/jsx-runtime'
import {Box,Text,Link} from '../../../ink.js'
import {getOriginalModsLifecycle287} from '../../../utils/hooks/modelSwitch287/lifecycleRuntime.js'
import {getInitialSettings} from '../../../utils/settings/settings.js'
import {getAPIProvider} from '../../../utils/model/providers.js'
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS,CLAUDE_AI_INFERENCE_SCOPE} from '../../../constants/oauth.js'
import {authEnvironment} from '../../../utils/authEnvironment.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../../analytics/index.js'
import {logError} from '../../../utils/log.js'
import {logForDebugging} from '../../../utils/debug.js'
import {errorMessage} from '../../../utils/errors.js'
import {oauthErrorMetadata} from '../../../utils/sharedOAuthPersistence.js'
import {installOAuthTokens} from '../../../cli/handlers/auth.js'
import {validateForceLoginOrg} from '../../../utils/auth.js'
import {getSSLErrorHint} from '../../api/errorUtils.js'
import {useTerminalSize} from '../../../hooks/useTerminalSize.js'
import {useTerminalNotification} from '../../../ink/useTerminalNotification.js'
import {sendNotification} from '../../notifier.js'
import {useKeybinding} from '../../../keybindings/useKeybinding.js'
import {OAuthService} from '../index.js'
import {oauthCallbackErrors287,oauthStrings287} from './host.js'
import {revokeOAuthToken287} from '../../../utils/oauthClearPhases287.js'
import {fetchAndStoreUserRoles} from '../client.js'
import {getOriginalOAuthLifecycle287} from '../../../utils/officialOAuthLifecycle287/productionBinding.js'
import {createOAuthBrowserGate287,createOAuthUi287,type OAuthUiProps287} from './runtime.js'
// All namespace accesses are lazy reads of the one already-installed canonical
// source owner. No second React context, auth settings or credentials cache.
function source(file:string,name:string){const fn=getOriginalModsLifecycle287().clearSourceModule287(file)[name];if(typeof fn!=='function')throw Error('OAuth startup source not connected: '+file+':'+name);return fn as (...args:unknown[])=>unknown}
const invoke=(file:string,name:string)=>(...args:unknown[])=>source(file,name)(...args)
const browserGate=createOAuthBrowserGate287({a:authEnvironment,p:invoke('chunk-dfef8g3c.js','p')})
const event=(name:string,data:Record<string,unknown>)=>logEvent(name,data as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|boolean|number|undefined>)
// Display leaf remains caller-provided to preserve the fixed third-party C.
// Console profile uses the original public client below; the display adapter
// leaves frozen third-party/gateway/AWS platform wizards unchanged.
export function bindOAuthUi287(Display:React.ComponentType<Record<string,unknown>>):React.ComponentType<OAuthUiProps287>{return createOAuthUi287({
 Xa:invoke('chunk-wmm2e4zt.js','Xa'),Te:invoke('chunk-038c023k.js','Te'),ts:invoke('chunk-t1n6x7q0.js','ts'),mB:2,tt:getInitialSettings,BQe:invoke('chunk-f1vb7bx7.js','BQe'),y8:invoke('chunk-nankzm0s.js','y8'),
 dP:useTerminalNotification,nn:invoke('chunk-jkt292h5.js','nn'),g:React.useState,A:React.useRef,R:React.useEffect,He:getAPIProvider,Abe:invoke('chunk-nankzm0s.js','Abe'),qQ:invoke('chunk-nankzm0s.js','qQ'),Dee:invoke('chunk-6y2061w5.js','Dee'),ve:useTerminalSize,
 sx:invoke('chunk-qravq5t1.js','sx'),HN:invoke('chunk-qravq5t1.js','HN'),i:event,y:(name:string)=>event('tengu_feature_ok',{feature_name:name}),m:(name:string,reason:string)=>event('tengu_feature_bad',{feature_name:name,error_code:reason}),p:(name:string,reason:string)=>event('tengu_feature_sad',{feature_name:name,error_code:reason}),J$:browserGate,kr:invoke('chunk-jkt292h5.js','kr'),We:useKeybinding,_C:invoke('chunk-jkt292h5.js','_C'),Ae:invoke('chunk-nankzm0s.js','Ae'),$bo:invoke('chunk-sa7hyx4y.js','$bo'),l:errorMessage,d:logError,ce:React.useCallback,
 O7e:function(message:string){return Reflect.construct(source('chunk-nankzm0s.js','O7e'),[message])},
 Bs:invoke('chunk-xep95vq1.js','Bs'),t:logForDebugging,fY:LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS,ZL:OAuthService,uK:getSSLErrorHint,pu:oauthErrorMetadata,YHe:installOAuthTokens,TF:validateForceLoginOrg,
 kD:sendNotification,...oauthCallbackErrors287,Dyt:invoke('chunk-nankzm0s.js','Dyt'),e:jsx,r:jsxs,s:Box,n:Text,Yz:invoke('chunk-6y2061w5.js','Yz'),Xz:invoke('chunk-6y2061w5.js','Xz'),It:Link,l1e:invoke('chunk-1y575bx8.js','l1e'),Dt:Display,I:oauthStrings287.I,
 fMn:invoke('chunk-kjjppes5.js','fMn'),bgo:invoke('chunk-kjjppes5.js','bgo'),wgo:invoke('chunk-kjjppes5.js','wgo'),Hot:'41077d10-94b8-4194-be48-d251e9eb21b4',Sgo:['user:profile',CLAUDE_AI_INFERENCE_SCOPE],wdr:(...args:Parameters<ReturnType<typeof getOriginalOAuthLifecycle287>['install']['wdr']>)=>getOriginalOAuthLifecycle287().install.wdr(...args),Edr:(...args:Parameters<ReturnType<typeof getOriginalOAuthLifecycle287>['install']['Edr']>)=>getOriginalOAuthLifecycle287().install.Edr(...args),Ego:invoke('chunk-kjjppes5.js','Ego'),vgo:invoke('chunk-kjjppes5.js','vgo'),qC:revokeOAuthToken287,zn:()=> (require('../../../utils/secureStorage/index.js') as typeof import('../../../utils/secureStorage/index.js')).getSecureStorage(),eWt:fetchAndStoreUserRoles,fA:CLAUDE_AI_INFERENCE_SCOPE,
 hCn:invoke('chunk-f1vb7bx7.js','hCn'),j8:invoke('chunk-f1vb7bx7.js','j8'),Fl:invoke('chunk-nankzm0s.js','Fl'),hp:'Unable to read managed policy settings, which may restrict the API providers this machine may use (allowedProviders). Contact your administrator.',
})}
