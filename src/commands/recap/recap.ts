import type { LocalCommandCall } from '../../types/command.js'
import type { ToolUseContext } from '../../Tool.js'
import { getLastCacheSafeParams, runForkedAgent } from '../../utils/forkedAgent.js'
import { createUserMessage } from '../../utils/messages.js'
import { isModelContextExcluded } from '../../services/api/refusalFallback.js'
import { getFeatureValue_CACHED_MAY_BE_STALE } from '../../services/analytics/growthbook.js'
import { logEvent } from '../../services/analytics/index.js'
import { getMainLoopModel, getRuntimeMainLoopModel } from '../../utils/model/model.js'
import { fetchSystemPromptParts,type FetchSystemPromptPartsInput287 } from '../../utils/queryContext.js'
import { asSystemPrompt } from '../../utils/systemPromptType.js'
import { logForDebugging } from '../../utils/debug.js'
import { createOfficialRecap287 } from './officialRecap287.generated.js'
import {adaptQueryPrefixContext287} from '../../utils/queryPrefixContext287.js'
import {readConfirmationPermissionContext} from '../../utils/permissions/confirmWithUser.js'

const eventName = (name: string) => name as never

/** Explicit bridges from Bun chunk imports in official b() to existing local owners. */
function createPorts(context: ToolUseContext, getFactory: () => ReturnType<typeof createOfficialRecap287>) {
  const imports: Record<string, unknown> = {
    'chunk-d0v1kby0.js': {
      fetchSystemPromptParts: async (input: FetchSystemPromptPartsInput287) => fetchSystemPromptParts({
        ...input,
        additionalWorkingDirectories: [...context.getAppState().toolPermissionContext.additionalWorkingDirectories.keys()],
        mcpClients: context.options.mcpClients,
      }),
    },
    'chunk-15fvv0rv.js': {
      getToolPermissionContext: readConfirmationPermissionContext,
    },
    'chunk-74f1y458.js': {getMainLoopModel, getRuntimeMainLoopModel},
    'chunk-azftzjrk.js': {asSystemPrompt},
  }
  const telemetry = (type: string, feature: string, code?: string, metadata?: Record<string, unknown>) => {
    logEvent(type, {...metadata, feature_name: eventName(feature), ...(code ? {error_code: eventName(code)} : {})} as never)
  }
  return {
    // Preserve the accepted local C refusal/context exclusion independently
    // from the generated, exact upstream 2.1.287 eM/Gce/KM predicates.
    cRefusalExcluded: isModelContextExcluded,
    k: getFeatureValue_CACHED_MAY_BE_STALE,
    p: (feature: string, code: string, metadata: Record<string, unknown>) => telemetry('tengu_feature_sad', feature, code, metadata),
    y: (feature: string, metadata: Record<string, unknown>) => telemetry('tengu_feature_ok', feature, undefined, metadata),
    m: (feature: string, code: string, metadata: Record<string, unknown>) => telemetry('tengu_feature_bad', feature, code, metadata),
    debug: logForDebugging,
    getLastCacheSafeParams,
    runForkedAgent,
    createUserMessage,
    importOfficialModule: async (module: string) => {
      if (module === 'chunk-d7ga10av.js') return {splitSystemPromptAtBoundary: getFactory().splitSystemPromptAtBoundary}
      if (!(module in imports)) throw new Error(`Unsupported pinned recap source import: ${module}`)
      return imports[module]
    },
  }
}

export const call: LocalCommandCall = async (args, context) => {
  let factory!: ReturnType<typeof createOfficialRecap287>
  factory = createOfficialRecap287(createPorts(context, () => factory))
  return await factory.call(args, adaptQueryPrefixContext287(context)) as Awaited<ReturnType<LocalCommandCall>>
}
