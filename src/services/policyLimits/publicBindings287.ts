import * as fs from 'node:fs'
import { open, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { Bt } from '../../utils/officialHostFilesystem287/native.js'
import { createHash } from 'node:crypto'
import { z } from 'zod/v4'
import { CLAUDE_AI_INFERENCE_SCOPE } from '../../constants/oauth.js'
import { getAnthropicApiKeyWithSource, getClaudeAIOAuthTokens, isClaudeAISubscriber } from '../../utils/auth.js'
import { authEnvironment } from '../../utils/authEnvironment.js'
import { getClaudeConfigHomeDir } from '../../utils/envUtils.js'
import { getAPIProvider, isFirstPartyRequestEndpoint } from '../../utils/model/providers.js'
import { hasWorkloadIdentityConfiguration } from '../../utils/workloadIdentity.js'
import { isStorageV5PinnedOn } from '../../utils/secureStorage/storageV5.js'
import { isEssentialTrafficOnly } from '../../utils/privacyLevel.js'
import { logForDebugging } from '../../utils/debug.js'
import { errorMessage, isENOENT } from '../../utils/errors.js'
import { safeParseJSON } from '../../utils/json.js'
import { lazySchema } from '../../utils/lazySchema.js'
import { $4n as latchedComplianceTaints, fRe as currentComplianceTaints } from '../../vendor/official-files-api/taints.js'
import { getOfficialPolicyPrincipal286 } from './officialIdentityBindings286.js'
import { policyResponseKernel } from './response.js'
import { getExecutionSession287 } from '../context/execution287.js'
import { preferThirdPartyAuthentication } from '../../bootstrap/state.js'
import { createPolicyPublicClient287 } from './officialPublic287/native.js'
import { createPolicyReasonText287 } from './officialPublic287/reasonText.js'
import { createPolicyKnownTaints287 } from './officialPublic287/knownTaints.js'
import { uniq } from '../../utils/array.js'

// Ordinary published-client-data bools, read from the existing served-value
// owner. No private verdict, shadow permission state or fallback success.
function served(name: string): boolean {
  return require('./booleanSource287.js').policyBooleanSource287.servedTrue(name)
}
let client: ReturnType<typeof createPolicyPublicClient287> | undefined
export function bindPolicyPublicPorts287(): Record<string, unknown> {
  const principal = getOfficialPolicyPrincipal286()
  return {
    ...createPolicyReasonText287(createPolicyKnownTaints287({L:uniq})),
    p: principal.p, R3: principal.xq, goe: principal.Kne, hoe: principal.Yne, RM: principal.jD, pzr: principal.registry,
    ijt: policyResponseKernel.parse, Uht: policyResponseKernel.rawResponse, GXn: policyResponseKernel.lossyCount,
    mb: getAnthropicApiKeyWithSource, fd: hasWorkloadIdentityConfiguration,
    fn: getClaudeAIOAuthTokens, ft: isClaudeAISubscriber, fA: CLAUDE_AI_INFERENCE_SCOPE,
    a: authEnvironment, a5o: require('./officialIdentity286/socketAuth.js').officialPolicySocketAuth286,
    He: getAPIProvider, Js: isFirstPartyRequestEndpoint,
    Ge: fs.openSync, pe: fs.constants, Wl: fs.constants.O_NOFOLLOW | (fs.constants.O_NONBLOCK ?? 0),
    Ye: fs.fstatSync, Xe: fs.readSync, je: fs.closeSync, Je: open,
    Pn: fs.readFileSync, gt: safeParseJSON, W: isENOENT,
    E: (error: unknown) => (error as NodeJS.ErrnoException)?.code,
    l: errorMessage, t: logForDebugging, f: lazySchema,
    u: z.object, x: z.literal, o: z.string, B: z.enum, C: z.number, T: z.array, H: z.boolean,
    At: isEssentialTrafficOnly,
    T8: () => authEnvironment.CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL,
    utr: latchedComplianceTaints, ase: currentComplianceTaints,
    g3o: () => served('tengu_validated_clover'), _3o: () => served('tengu_hashed_lark'),
    y3o: () => served('tengu_steady_sunbeam'), h3o: () => served('tengu_tranquil_crescent'),
    e6t: () => served('tengu_copper_kite'), Mwn: () => served('tengu_twinkling_globe'),
    KE: () => preferThirdPartyAuthentication() ? undefined : authEnvironment.ANTHROPIC_AUTH_TOKEN,
    An: join, we: getClaudeConfigHomeDir, Ut: () => getExecutionSession287().host.launchOptions.diskless(),
    ue: createHash, F: isStorageV5PinnedOn, Dwe: policyResponseKernel.checksum,
    Gk: () => Object.keys(require('../../utils/customHeaders.js').getCustomHeaders()).some(n => n.toLowerCase() === 'x-api-key'),
    bKo: () => Object.keys(require('../../utils/customHeaders.js').getCustomHeaders()).some(n => n.toLowerCase() === 'authorization'),
    tg: isFirstPartyRequestEndpoint, vh: () => require('../../utils/auth.js').getConfiguredApiKeyHelper(),
    vl: () => require('../../utils/auth.js').isAnthropicAuthEnabled(), $k: () => require('./officialIdentityBindings286.js').principalPorts287.$k(),
    xr: () => require('../../utils/envUtils.js').isBareMode(), Gp: (options: unknown) => {try {return getAnthropicApiKeyWithSource(options as never)} catch {return {key: null, source: 'none'}}},
    Xb: () => Boolean(getAnthropicApiKeyWithSource().key),
    k5o: require('../../vendor/official-files-api/taints.js').SNo, Ej: () => require('../../utils/betas.js').clearBetasCaches(),
    tn: require('./officialIdentity286/organizationUuid.js').validatePolicyOrganizationUuid286, Qm: () => require('../../utils/auth.js').getOauthAccountInfo(),
    Ze: unlink, Tn: (path:string,text:string,mode?:number)=>Bt().atomicWrite(path,text,mode), _: JSON.stringify,
    H6e: (status: number) => status >= 400 && status < 500 && status !== 408 && status !== 409 && status !== 429,
  }
}
export function getPolicyPublicClient287() {
  return client ??= createPolicyPublicClient287(bindPolicyPublicPorts287())
}
