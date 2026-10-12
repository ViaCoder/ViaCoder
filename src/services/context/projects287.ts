import {z} from 'zod/v4'
import {APIUserAbortError} from '@anthropic-ai/sdk'
import {getNativeFirstPartyRequest287} from '../api/usageProduction287.js'
import {refreshOAuthToken} from '../oauth/client.js'
import {getOauthConfig,OAUTH_BETA_HEADER} from '../../constants/oauth.js'
import {clearOAuthTokenCache,getClaudeAIOAuthTokens,getClaudeAIOAuthTokensAsync} from '../../utils/auth.js'
import {getSharedOAuthEngine} from '../../utils/sharedOAuthEngine.js'
import {sharedOAuthPersistence,oauthKnownDeadRefreshTokens} from '../../utils/sharedOAuthPersistence.js'
import {sharedOAuthLease} from '../../utils/sharedOAuthLease.js'
import {getSecureStorage} from '../../utils/secureStorage/index.js'
import {secureStorageCore} from '../../utils/secureStorage/officialRuntime.js'
import {getSecureStorageConfigHomeDir} from '../../utils/secureStorage/storageDirectory.js'
import {getFsImplementation} from '../../utils/fsOperations.js'
import {getSessionIngressAuthToken} from '../../utils/sessionIngressAuth.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {AbortError,errorMessage} from '../../utils/errors.js'
import {sleep} from '../../utils/sleep.js'
import {logError} from '../../utils/log.js'
import {logForDebugging} from '../../utils/debug.js'
import {lazySchema} from '../../utils/lazySchema.js'
import {getNativeAPIProvider287} from '../../utils/model/providerSelectionBindings287.js'
import {isEssentialTrafficOnly} from '../../utils/privacyLevel.js'
import {getExecutionSession287,executionSessionRegistryConstructor287} from './execution287.js'
import {createProjectErrorPredicates287,createProjectGatewaySelection287,createProjectHostAccessors287,createProjectQualification287,createProjectsApi287,createProjectsContext287,type ProjectsApi287,type ProjectsContext287} from './officialUserContext287/native.js'

// Raw source accessors select the existing execution host, never a shadow host.
const accessors=createProjectHostAccessors287({n:getExecutionSession287,a:authEnvironment})
const gateway=createProjectGatewaySelection287({Q3t:accessors.Q3t,process})
const errors=createProjectErrorPredicates287({Ye:AbortError,Dd:APIUserAbortError})
let api:ProjectsApi287|undefined
let context:ProjectsContext287|undefined
/** Complete public API bodies use the same ur HTTP/auth owner as official usage. */
export function getProjectsApi287():ProjectsApi287 {
 if(api)return api
 const qualification=getProjectQualification287()
 return api=createProjectsApi287({Q3t:accessors.Q3t,cp:OAUTH_BETA_HEADER,
  y(){},p(){},_:JSON.stringify,Y:JSON.parse,t:logForDebugging,
  lc:getSessionIngressAuthToken,MM:qualification.MM,
  Gt:getNativeFirstPartyRequest287().Gt,
  f:lazySchema,o:z.string,C:z.number,H:z.boolean,se:z.unknown,T:z.array,u:z.object,
 })
}
let qualification:ReturnType<typeof createProjectQualification287>|undefined
export function getProjectQualification287(){
 return qualification??=createProjectQualification287({
  yb:getSecureStorageConfigHomeDir,ae:getFsImplementation,Fqo:sharedOAuthLease.acquire,ee:sleep,
  Uk:clearOAuthTokenCache,zn:getSecureStorage,Ka:secureStorageCore.readFailed,tl:getClaudeAIOAuthTokensAsync,
  Ht:errors.Ht,t:logForDebugging,d:logError,a:authEnvironment,hi:oauthKnownDeadRefreshTokens,dn:getOauthConfig,
  UGt:gateway,lc:getSessionIngressAuthToken,
 })
}
export function getProjectsContext287():ProjectsContext287 {
 if(context)return context
 const api=getProjectsApi287(),qualification=getProjectQualification287()
 // Defer policy lookup until the original PBn/das reads it. Construction must
 // not start controller, refresh credentials or issue network operations.
 const policy=()=> (require('../policyLimits/publicBindings287.js') as typeof import('../policyLimits/publicBindings287.js')).getPolicyPublicClient287()
 return context=createProjectsContext287({
  ipe:refreshOAuthToken,ape:(error:unknown)=>getSharedOAuthEngine().classify.invalidGrant(error),
  WQn:sharedOAuthPersistence.reconcile,VQn:sharedOAuthPersistence.clearDead,V3:qualification.V3,
  fn:getClaudeAIOAuthTokens,FWt:qualification.FWt,w3r:qualification.w3r,
  $i:(options:Parameters<ReturnType<typeof getSharedOAuthEngine>['refresh']>[0])=>getSharedOAuthEngine().refresh(options),
  Tt:executionSessionRegistryConstructor287,at:errors.at,l:errorMessage,
  a:authEnvironment,_:JSON.stringify,t:logForDebugging,At:isEssentialTrafficOnly,
  y(){},p(){},Vn:()=>getNativeAPIProvider287()==='firstParty',lc:getSessionIngressAuthToken,
  xBe:(listener:()=>void)=>policy().xBe(listener),on:(name:string)=>policy().on(name),wh:(name:string)=>policy().wh(name),
  Gte:api.Gte,FAe:api.FAe,Gat:api.Gat,Ce:accessors.Ce,dA:accessors.dA,
  ITn:qualification.ITn,OTn:qualification.OTn,tet:qualification.tet,Bor:qualification.Bor,
 })
}
