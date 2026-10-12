import { z } from 'zod'
import axios from 'axios'
import { getCatalogEntry } from '../../utils/model/catalog.js'
import { getModelPricingString } from '../../utils/modelCost.js'
import { stripModelContextSuffix } from '../../utils/model/modelIdentity.js'
import { getCanonicalName, getMarketingNameForModel } from '../../utils/model/model.js'
import {getAPIProvider} from '../../utils/model/providers.js'
import { getAnthropicApiKey, getClaudeAIOAuthTokens, isClaudeAISubscriber } from '../../utils/auth.js'
import { lazySchema } from '../../utils/lazySchema.js'
import { createOfficialBootstrapFetcher287, createOfficialBootstrapResponseSchema287 } from './officialBootstrap287/native.js'
import { createOfficialGatewayText287 } from './officialBootstrap287/text.js'
import {authEnvironment} from '../../utils/authEnvironment.js'
import {getMessageCustomHeaders} from './requestHeaders.js'
import {getOauthConfig, OAUTH_BETA_HEADER, CLAUDE_AI_PROFILE_SCOPE} from '../../constants/oauth.js'
import {isEssentialTrafficOnly} from '../../utils/privacyLevel.js'
import {getClaudeCodeUserAgent} from '../../utils/userAgent.js'
import {logForDebugging} from '../../utils/debug.js'
import {logError} from '../../utils/log.js'
import {logEvent} from '../analytics/index.js'
import {withOAuth401Retry} from '../../utils/http.js'
import {hasWorkloadIdentityConfiguration, resolveBootstrapWorkloadIdentity} from '../../utils/workloadIdentity.js'
import {createBootstrapNormalAuthPorts287, getBootstrapRequestContext287} from './officialBootstrap287/normalAuth.js'
import {getNativeGatewayAuth287, nativeGatewayRefresh287} from '../remoteManagedSettings/gatewayBindings287.js'

export type BootstrapResponse287 = {
  client_data?: Record<string, unknown> | null
  additional_model_options?: Array<{value: string; label: string; description: string; disabled?: boolean}> | null
  additional_model_costs?: Record<string, {inputTokens: number; outputTokens: number; promptCacheWriteTokens: number;
    promptCacheWrite1hTokens?: number; promptCacheReadTokens: number; webSearchRequests: number}> | null
  model_access?: Array<{apiName: string; entitled: boolean; maxEffortLevel?: string}> | null
  org_model_default?: {name: string; updated_at: string; data_source: string; override_user_selection: boolean;
    default_effort_level?: string | null; override_user_effort?: boolean | null} | null
  oauth_account?: {account_uuid?: string | null; account_email?: string | null; organization_uuid?: string | null;
    organization_name?: string | null; organization_type?: string | null; organization_rate_limit_tier?: string | null;
    user_rate_limit_tier?: string | null; seat_tier?: string | null; [key: string]: unknown} | null
  auto_compact_windows?: Record<string, unknown> | null
  narrowed?: boolean | null
}

const ports = {
  f: lazySchema,
  mt: z.object,
  // Official 2.1.287's wrapped record constructor accepts value-only and
  // key/value forms; this Zod 4 API requires the key schema explicitly.
  Cg: (...schemas: [any] | [any, any]) => schemas.length === 1
    ? z.record(z.string(), schemas[0]!)
    : z.record(schemas[0]!, schemas[1]!),
  Gc: z.unknown,
  Qn: z.array,
  ue: z.string,
  cn: z.number,
  Eo: z.boolean,
  $x: getCatalogEntry,
  Fn: stripModelContextSuffix,
  Wp: getMarketingNameForModel,
  wVo: getModelPricingString,
  ft: () => isClaudeAISubscriber(),
}

export const bootstrapResponseSchema287 = createOfficialBootstrapResponseSchema287(ports) as unknown as () => z.ZodType<BootstrapResponse287>

export const gatewayText287 = createOfficialGatewayText287()

// Whole original public key/profile predicates, same canonical credential reader.
const bootstrapNormalAuth287 = createBootstrapNormalAuthPorts287({
  nZ: () => getAnthropicApiKey(), fn: () => getClaudeAIOAuthTokens(), WK: CLAUDE_AI_PROFILE_SCOPE,
})

export const fetchBootstrapAPI287 = createOfficialBootstrapFetcher287({
  f: lazySchema, mt: z.object, Qn: z.array, ue: z.string,
  He: getAPIProvider, a: authEnvironment,
  t: (message: string) => logForDebugging(message),
  vj: () => nativeGatewayRefresh287.refreshGateway(),
  uo: getNativeGatewayAuth287,
  St: axios, Mo: getClaudeCodeUserAgent,
  QPe: (model: string) => getCatalogEntry(model)?.family === 'fable',
  fb: getCanonicalName,
  gA: gatewayText287.gA,
  bY: gatewayText287.bY,
  At: isEssentialTrafficOnly,
  et: getBootstrapRequestContext287,
  _ut: getMessageCustomHeaders,
  Q: bootstrapResponseSchema287,
  p: (event: string, data: Record<string, unknown>) => logEvent(event, data as never),
  Xb: bootstrapNormalAuth287.Xb,
  fd: hasWorkloadIdentityConfiguration,
  dn: getOauthConfig,
  cp: OAUTH_BETA_HEADER,
  fn: () => getClaudeAIOAuthTokens(),
  E_: withOAuth401Retry,
  zp: bootstrapNormalAuth287.zp,
  m: logError,
  resolveIdentity: () => {
    const tokens = getClaudeAIOAuthTokens()
    return resolveBootstrapWorkloadIdentity(Boolean(tokens?.accessToken && tokens.scopes?.includes('user:inference')))
  },
})
