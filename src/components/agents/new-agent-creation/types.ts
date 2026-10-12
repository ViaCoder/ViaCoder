import type { generateAgent } from '../generateAgent.js'
import type { CustomAgentDefinition } from '../../../tools/AgentTool/loadAgentsDir.js'
import type { AgentMemoryScope } from '../../../tools/AgentTool/agentMemory.js'
import type { SettingSource } from '../../../utils/settings/constants.js'

// The wizard starts with {} and fills fields one step at a time. The finished
// agent uses the actual CustomAgentDefinition contract, rather than a second shape.
export type AgentWizardData = {
  location?: SettingSource
  method?: 'generate' | 'manual'
  agentType?: string
  whenToUse?: string
  systemPrompt?: string
  generationPrompt?: string
  generatedAgent?: Awaited<ReturnType<typeof generateAgent>>
  isGenerating?: boolean
  wasGenerated?: boolean
  selectedTools?: string[]
  selectedModel?: string
  selectedColor?: string
  selectedMemory?: AgentMemoryScope
  finalAgent?: CustomAgentDefinition
}
