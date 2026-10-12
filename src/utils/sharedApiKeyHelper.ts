import chalk from 'chalk'
import {execa} from 'execa'
import * as auth from './auth.js'
import {AwsAuthStatusManager} from './awsAuthStatusManager.js'
import {checkHasTrustDialogAccepted} from './config.js'
import {logAntError,logForDebugging} from './debug.js'
import type {ExecutionHost287} from '../services/context/officialExecutionOwners287/native.js'
import {getAPIProvider} from './model/providers.js'
import {getSettingsForSource} from './settings/settings.js'
import {jsonParse} from './slowOperations.js'
import {logEvent} from '../services/analytics/index.js'
import {createApiKeyHelper} from './officialApiKeyHelper/runtime.js'
import {authEnvironment} from './authEnvironment.js'

import {getSecureStorageExecutionHost} from './secureStorage/macOsKeychainHelpers.js'

export const sharedApiKeyHelper=createApiKeyHelper({
  BS:options=>auth.getAnthropicApiKeyWithSource(options),
  Bn:()=>getAPIProvider()==='firstParty',
  Io:()=>(getSecureStorageExecutionHost() as ExecutionHost287).launchOptions.projectConfigRoot(),
  J:jsonParse,QS:()=>false,
  a:authEnvironment,
  fe:chalk,ge:source=>getSettingsForSource(source as Parameters<typeof getSettingsForSource>[0]),
  i:logEvent,ih:()=>auth.getConfiguredApiKeyHelper(),j:()=>({host:getSecureStorageExecutionHost()}),ns:checkHasTrustDialogAccepted,
  s8:logAntError,t:logForDebugging,
  xC:(command,{useToolMemoryCgroup:_,...options})=>execa(command,{...options,shell:true}),
  y2:AwsAuthStatusManager,
})

/** Exact existing helper cell, not a copy or a second WeakMap. */
export const getApiKeyHelperState287=()=>sharedApiKeyHelper.state(getSecureStorageExecutionHost())
