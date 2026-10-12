import axios from 'axios'
import {createOfficialTitleWriter,createOfficialTitleTransport,type TitleWriteOptions,type TitleWriteResult} from '../vendor/official-title-writer/runtime.mjs'
import {errorMessage} from '../utils/errors.js'
import {logForDebugging} from '../utils/debug.js'
import {getClaudeCodeClientPlatform,getClaudeCodeUserAgent} from '../utils/userAgent.js'
import {extractErrorDetail} from './debugUtils.js'
import {toCompatSessionId,toInfraSessionId} from './sessionIdCompat.js'

export type {TitleWriteOptions} from '../vendor/official-title-writer/runtime.mjs'
const transport=createOfficialTitleTransport({http:axios,errorMessage,debug:logForDebugging,
  errorDetail:extractErrorDetail,toCompatSessionId,toInfraSessionId,
  userAgent:getClaudeCodeUserAgent,clientPlatform:getClaudeCodeClientPlatform})

/** Public local-credential arm of F/C3e. Hosted credential stores are not
 * substituted with an unrelated login; they require their own injected host. */
async function requestContext(options?:TitleWriteOptions) {
  const [{getClaudeAIOAuthTokens},{getOauthConfig},{getFeatureValue_CACHED_MAY_BE_STALE}]=await Promise.all([
    import('../utils/auth.js'),import('../constants/oauth.js'),import('../services/analytics/growthbook.js'),
  ])
  const token=options?.getAccessToken?.()??getClaudeAIOAuthTokens()?.accessToken
  if(!token)return null
  // Official FF defaults to the v1 compat endpoint, not a global version switch.
  const useV2=getFeatureValue_CACHED_MAY_BE_STALE('tengu_ccr_v2_session_crud_cli',false)
  const org=useV2?undefined:await (await import('../services/oauth/client.js')).getOrganizationUUID()
  if(!useV2&&!org)return null
  return {baseUrl:options?.baseUrl??getOauthConfig().BASE_API_URL,token,useV2,orgUUID:org??undefined}
}

export async function writeBridgeTitle(sessionId:string,title:string,options?:TitleWriteOptions):Promise<TitleWriteResult> {
  const context=await requestContext(options)
  if(!context)return 'failed'
  // Ownership can change while credentials/config are being obtained.
  if(options?.shouldSend&&!options.shouldSend())return 'rejected'
  const status=await transport.update(context.baseUrl,context.token,sessionId,{title},10000,context)
  return status==='invalid'?'rejected':status===200?'landed':'failed'
}
async function readBridgeTitle(sessionId:string,options?:TitleWriteOptions) {
  const {getAPIProvider}=await import('../utils/model/providers.js')
  if(getAPIProvider()!=='firstParty')return null
  const context=await requestContext(options)
  if(!context)return null
  const result=await transport.get(context.baseUrl,context.token,sessionId,10000,context)
  return typeof result==='object'?result:null
}

/** The original writer coalesces updates, retains manual writes, and checks
 * remote ownership before one retry. Diagnostics stay in the local debug log. */
export const bridgeTitleWriter=createOfficialTitleWriter({errorMessage,debug:logForDebugging,
  diagnostic:(event,reason)=>logForDebugging(`[${event}] ${reason}`),
  read:readBridgeTitle,write:writeBridgeTitle})
