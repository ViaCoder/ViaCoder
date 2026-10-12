// biome-ignore-all assist/source/organizeImports: ANT-ONLY import markers must not be reordered
import { getInitialMainLoopModel } from '../../bootstrap/state.js'
import {
  isClaudeAISubscriber,
  isMaxSubscriber,
  isTeamPremiumSubscriber,
} from '../auth.js'
import { getModelStrings } from './modelStrings.js'
import {
  COST_TIER_3_15,
  COST_HAIKU_35,
  COST_HAIKU_45,
  formatModelPricing,
} from '../modelCost.js'
import { getSettings_DEPRECATED } from '../settings/settings.js'
import { checkOpus1mAccess, checkSonnet1mAccess } from './check1mAccess.js'
import { getAPIProvider } from './providers.js'
import { isModelAllowed } from './modelAllowlist.js'
import {
  getCanonicalName,
  getClaudeAiUserDefaultModelDescription,
  getDefaultSonnetModel,
  getDefaultOpusModel,
  getDefaultHaikuModel,
  getDefaultFableModel,
  getDefaultMainLoopModelSetting,
  getMarketingNameForModel,
  getUserSpecifiedModelSetting,
  isOpus1mMergeEnabled,
  getOpus46PricingSuffix,
  renderDefaultModelSetting,
  type ModelSetting,
} from './model.js'
import { has1mContext } from '../context.js'
import { getGlobalConfig } from '../config.js'
import { getAntModels } from './antModels.js'
import {getOfficialModelFamilyOption287, getOfficialFableOption287, getOfficialLatestModelFamily287, isOfficialLatestModelFamily287, createOfficialE8ChooserAdapter287, createOfficialModelMenuAdapter287} from './officialModelPicker287.js'

// @[MODEL LAUNCH]: Update all the available and default model option strings below.

export type ModelOption = {
  value: ModelSetting
  label: string
  description: string
  descriptionForModel?: string
  disabled?: boolean
  /** Original f8 session-specific custom row metadata. */
  sessionTail?: boolean
}

function displayNameForModel(model: string, fallback: string): string {
  return getMarketingNameForModel(model) ?? fallback
}

export function getDefaultOptionForUser(fastMode = false): ModelOption {
  if (process.env.USER_TYPE === 'ant') {
    const currentModel = renderDefaultModelSetting(
      getDefaultMainLoopModelSetting(),
    )
    return {
      value: null,
      label: 'Default (recommended)',
      description: `Use the default model for Ants (currently ${currentModel})`,
      descriptionForModel: `Default model (currently ${currentModel})`,
    }
  }

  // Subscribers
  if (isClaudeAISubscriber()) {
    return {
      value: null,
      label: 'Default (recommended)',
      description: getClaudeAiUserDefaultModelDescription(fastMode),
    }
  }

  // PAYG
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: null,
    label: 'Default (recommended)',
    description: `Use the default model (currently ${renderDefaultModelSetting(getDefaultMainLoopModelSetting())})${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
  }
}

function getCustomSonnetOption(): ModelOption | undefined {
  const is3P = getAPIProvider() !== 'firstParty'
  const customSonnetModel = process.env.ANTHROPIC_DEFAULT_SONNET_MODEL
  // When a 3P user has a custom sonnet model string, show it directly
  if (is3P && customSonnetModel) {
    const is1m = has1mContext(customSonnetModel)
    return {
      value: 'sonnet',
      label:
        process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_NAME ?? customSonnetModel,
      description:
        process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION ??
        `Custom Sonnet model${is1m ? ' (1M context)' : ''}`,
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION ?? `Custom Sonnet model${is1m ? ' with 1M context' : ''}`} (${customSonnetModel})`,
    }
  }
}

// @[MODEL LAUNCH]: Update or add model option functions (getSonnetXXOption, getOpusXXOption, etc.)
// with the new model's label and description. These appear in the /model picker.
function getSonnet46Option(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(
    is3P ? getModelStrings().sonnet46 : getDefaultSonnetModel(),
    is3P ? 'Sonnet 4.6' : 'Sonnet',
  )
  return {
    value: is3P ? getModelStrings().sonnet46 : 'sonnet',
    label: 'Sonnet',
    description: `${modelName} · Efficient for routine tasks${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
    descriptionForModel:
      `${modelName} - efficient for routine tasks. Generally recommended for most coding tasks`,
  }
}

function getCustomOpusOption(): ModelOption | undefined {
  const is3P = getAPIProvider() !== 'firstParty'
  const customOpusModel = process.env.ANTHROPIC_DEFAULT_OPUS_MODEL
  // When a 3P user has a custom opus model string, show it directly
  if (is3P && customOpusModel) {
    const is1m = has1mContext(customOpusModel)
    return {
      value: 'opus',
      label: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME ?? customOpusModel,
      description:
        process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION ??
        `Custom Opus model${is1m ? ' (1M context)' : ''}`,
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION ?? `Custom Opus model${is1m ? ' with 1M context' : ''}`} (${customOpusModel})`,
    }
  }
}

function getOpus41Option(): ModelOption {
  return {
    value: 'opus',
    label: 'Opus 4.1',
    description: `Opus 4.1 · Legacy`,
    descriptionForModel: 'Opus 4.1 - legacy version',
  }
}

function getOpus46Option(fastMode = false): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(
    is3P ? getModelStrings().opus46 : getDefaultOpusModel(),
    is3P ? 'Opus 4.6' : 'Opus',
  )
  return {
    value: is3P ? getModelStrings().opus46 : 'opus',
    label: 'Opus',
    description: `${modelName} · Best for everyday, complex tasks${getOpus46PricingSuffix(fastMode)}`,
    descriptionForModel: `${modelName} - best for everyday, complex tasks`,
  }
}

export function getSonnet46_1MOption(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(
    is3P ? getModelStrings().sonnet46 : getDefaultSonnetModel(),
    is3P ? 'Sonnet 4.6' : 'Sonnet',
  )
  return {
    value: is3P ? getModelStrings().sonnet46 + '[1m]' : 'sonnet[1m]',
    label: 'Sonnet (1M context)',
    description: `${modelName} for long sessions${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
    descriptionForModel:
      `${modelName} with 1M context window - for long sessions with large codebases`,
  }
}

export function getOpus46_1MOption(fastMode = false): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(
    is3P ? getModelStrings().opus46 : getDefaultOpusModel(),
    is3P ? 'Opus 4.6' : 'Opus',
  )
  return {
    value: is3P ? getModelStrings().opus46 + '[1m]' : 'opus[1m]',
    label: 'Opus (1M context)',
    description: `${modelName} for long sessions${getOpus46PricingSuffix(fastMode)}`,
    descriptionForModel:
      `${modelName} with 1M context window - for long sessions with large codebases`,
  }
}

function getCustomHaikuOption(): ModelOption | undefined {
  const is3P = getAPIProvider() !== 'firstParty'
  const customHaikuModel = process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL
  // When a 3P user has a custom haiku model string, show it directly
  if (is3P && customHaikuModel) {
    return {
      value: 'haiku',
      label: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME ?? customHaikuModel,
      description:
        process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION ??
        'Custom Haiku model',
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION ?? 'Custom Haiku model'} (${customHaikuModel})`,
    }
  }
}

function getHaiku45Option(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(getDefaultHaikuModel(), 'Haiku 4.5')
  return {
    value: 'haiku',
    label: 'Haiku',
    description: `${modelName} · Fastest for quick answers${is3P ? '' : ` · ${formatModelPricing(COST_HAIKU_45)}`}`,
    descriptionForModel:
      `${modelName} - fastest for quick answers. Lower cost but less capable than ${displayNameForModel(getDefaultSonnetModel(), 'Sonnet')}.`,
  }
}

function getFableOption(): ModelOption {
  if (getAPIProvider() === 'firstParty') {
    return getOfficialFableOption287() as ModelOption
  }
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(
    is3P ? getModelStrings().fable5 : getDefaultFableModel(),
    is3P ? 'Fable 5' : 'Fable',
  )
  return {
    value: 'fable',
    label: 'Fable',
    description: `${modelName} · Most capable for your hardest and longest-running tasks`,
    descriptionForModel: `${modelName} (${getDefaultFableModel()})`,
  }
}

function getHaiku35Option(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  return {
    value: 'haiku',
    label: 'Haiku',
    description: `Haiku 3.5 for simple tasks${is3P ? '' : ` · ${formatModelPricing(COST_HAIKU_35)}`}`,
    descriptionForModel:
      'Haiku 3.5 - faster and lower cost, but less capable than Sonnet. Use for simple tasks.',
  }
}

function getHaikuOption(): ModelOption {
  // Return correct Haiku option based on provider
  const haikuModel = getDefaultHaikuModel()
  return haikuModel === getModelStrings().haiku45
    ? getHaiku45Option()
    : getHaiku35Option()
}

function getMaxOpusOption(fastMode = false): ModelOption {
  return getOfficialModelFamilyOption287('opus', fastMode) as ModelOption
}

export function getMaxSonnet46_1MOption(): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const billingInfo = isClaudeAISubscriber() ? ' · Billed as extra usage' : ''
  const modelName = displayNameForModel(
    is3P ? getModelStrings().sonnet46 : getDefaultSonnetModel(),
    is3P ? 'Sonnet 4.6' : 'Sonnet',
  )
  return {
    value: 'sonnet[1m]',
    label: 'Sonnet (1M context)',
    description: `${modelName} with 1M context${billingInfo}${is3P ? '' : ` · ${formatModelPricing(COST_TIER_3_15)}`}`,
  }
}

export function getMaxOpus46_1MOption(fastMode = false): ModelOption {
  const billingInfo = isClaudeAISubscriber() ? ' · Billed as extra usage' : ''
  const modelName = displayNameForModel(getDefaultOpusModel(), 'Opus')
  return {
    value: 'opus[1m]',
    label: 'Opus (1M context)',
    description: `${modelName} with 1M context${billingInfo}${getOpus46PricingSuffix(fastMode)}`,
  }
}

function getMergedOpus1MOption(fastMode = false): ModelOption {
  const is3P = getAPIProvider() !== 'firstParty'
  const modelName = displayNameForModel(
    is3P ? getModelStrings().opus46 : getDefaultOpusModel(),
    is3P ? 'Opus 4.6' : 'Opus',
  )
  return {
    value: is3P ? getModelStrings().opus46 + '[1m]' : 'opus[1m]',
    label: 'Opus (1M context)',
    description: `${modelName} with 1M context · Best for everyday, complex tasks${!is3P && fastMode ? getOpus46PricingSuffix(fastMode) : ''}`,
    descriptionForModel:
      `${modelName} with 1M context - best for everyday, complex tasks`,
  }
}

function getMaxSonnetOption(): ModelOption {
  return getOfficialModelFamilyOption287('sonnet') as ModelOption
}

function getMaxHaikuOption(): ModelOption {
  return {
    value: 'haiku',
    label: 'Haiku',
    description: `${displayNameForModel(getDefaultHaikuModel(), 'Haiku 4.5')} · Fastest for quick answers`,
  }
}

function getOpusPlanOption(): ModelOption {
  const opusName = displayNameForModel(getDefaultOpusModel(), 'Opus')
  const sonnetName = displayNameForModel(getDefaultSonnetModel(), 'Sonnet')
  return {
    value: 'opusplan',
    label: 'Opus Plan Mode',
    description: `Use ${opusName} in plan mode, ${sonnetName} otherwise`,
  }
}

// @[MODEL LAUNCH]: Update the model picker lists below to include/reorder options for the new model.
// Each user tier (ant, Max/Team Premium, Pro/Team Standard/Enterprise, PAYG 1P, PAYG 3P) has its own list.
export function getModelOptionsBase(fastMode = false): ModelOption[] {
  if (process.env.USER_TYPE === 'ant') {
    // Build options from antModels config
    const antModelOptions: ModelOption[] = getAntModels().map(m => ({
      value: m.alias,
      label: m.label,
      description: m.description ?? `[ANT-ONLY] ${m.label} (${m.model})`,
    }))

    return [
      getDefaultOptionForUser(),
      ...antModelOptions,
      getMergedOpus1MOption(fastMode),
      getSonnet46Option(),
      getSonnet46_1MOption(),
      getHaiku45Option(),
    ]
  }

  // Ant-only config remains a local specialization. All public model chooser
  // branches now come from the complete 2.1.287 e8 source closure.
  return getPublicModelOptionsBase287(fastMode)
}

// Branch-port injection is shared by the real entry above and isolated raw
// differential tests; normal callers always use the live application owners.
export function getPublicModelOptionsBase287(
  fastMode = false,
  branchPorts: Record<string, unknown> = {},
): ModelOption[] {
  return createOfficialE8ChooserAdapter287(branchPorts)(fastMode) as ModelOption[]
}

// Complete original f8/s_e assembly and policy filtering. The real Ink picker
// and command consumers continue calling this public entry point.
export function getModelOptions(fastMode = false): ModelOption[] {
  return createOfficialModelMenuAdapter287({e8: getModelOptionsBase})(fastMode) as ModelOption[]
}
