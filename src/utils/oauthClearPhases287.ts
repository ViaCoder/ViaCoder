import axios from 'axios'
import {getOauthConfig} from '../constants/oauth.js'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../services/analytics/index.js'
import {filesCredentialSlots} from '../vendor/official-files-api/slots.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {logError} from './log.js'
import {getAPIProvider} from './model/providers.js'
import {createOAuthCredentialClear287,createOAuthConfigClear287,createOAuthRevoker287} from './officialOAuthClear287/runtime.js'
import {getSecureStorage} from './secureStorage/index.js'
import {secureStorageCore} from './secureStorage/officialRuntime.js'

// All accesses remain lazy and share the existing backend and write-lock ALS.
// A second lock/cache/storage instance would break mutate's reentrant contract.
export const revokeOAuthToken287=createOAuthRevoker287({
 http:axios,config:getOauthConfig,debug:logForDebugging,
 ok:feature=>logEvent('tengu_feature_ok',{feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
 sad:(feature,reason)=>logEvent('tengu_feature_sad',{feature_name:feature as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,error_code:reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS}),
})
export const oauthCredentialClear287=createOAuthCredentialClear287({
 storage:()=>getSecureStorage(),provider:()=>getAPIProvider(),revoke:revokeOAuthToken287,
 debug:logForDebugging,report:logError,
 writeLock:operation=>secureStorageCore.withWriteLock(operation),
 alreadyLocked:operation=>secureStorageCore.alreadyLocked(operation),
 readFailed:secureStorageCore.readFailed,environment:authEnvironment,
 setFd:token=>filesCredentialSlots.replaceOauthTokenFromFd(token),
 setGateway:value=>filesCredentialSlots.replaceGatewayAuth(value),
 stampAccount:value=>filesCredentialSlots.stampAuthenticatedAccount(value),
})
export const oauthConfigClear287=createOAuthConfigClear287()
