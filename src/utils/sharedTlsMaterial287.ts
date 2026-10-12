import * as crypto from 'node:crypto'
import * as https from 'node:https'
import {createRequire} from 'node:module'
import {logEvent,type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS} from '../services/analytics/index.js'
import {authEnvironment} from './authEnvironment.js'
import {logForDebugging} from './debug.js'
import {getFsImplementation} from './fsOperations.js'
import {createTlsMaterial287} from './officialTlsMaterial287/native.js'
import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'

const event=(name:string,metadata:Record<string,unknown>)=>logEvent(name,metadata as Record<string,AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS|boolean|number|undefined>)
export const tlsMaterialReporters287={
 m:(feature:string,reason:string,metadata?:Record<string,unknown>)=>event('tengu_feature_bad',{...metadata,feature_name:feature,error_code:reason}),
 p:(feature:string,reason:string,metadata?:Record<string,unknown>)=>event('tengu_feature_fallback',{...metadata,feature_name:feature,error_code:reason}),
 y:(feature:string,metadata?:Record<string,unknown>)=>event('tengu_feature_ok',{...metadata,feature_name:feature}),
}

export const sharedTlsMaterial287=createTlsMaterial287({
 execution:()=>({host:getSecureStorageExecutionHost()}),environment:authEnvironment,
 filesystem:()=>getFsImplementation(),require:createRequire(import.meta.url),debug:logForDebugging,
 failure:tlsMaterialReporters287.m,fallback:tlsMaterialReporters287.p,success:tlsMaterialReporters287.y,
 builtins:{crypto,https},
})
