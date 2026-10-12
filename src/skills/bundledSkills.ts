import {wireBuiltinSkillFiles287,builtinSkillExtractDir287} from '../plugins/bundled/builtinInit287.js'
import {getCommandDiscoveryRegistry287} from '../utils/commandDiscovery287.js'
import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/index.mjs'
import type { ToolUseContext } from '../Tool.js'
import type { Command } from '../types/command.js'
import type { HooksSettings } from '../utils/settings/types.js'

/**
 * Definition for a bundled skill that ships with the CLI.
 * These are registered programmatically at startup.
 */
export type BundledSkillDefinition = {
  name: string
  description: string
  menuDescription?: string
  getArgumentCompletions?: (args: string[], prefix: string) => Promise<Array<{value: string; displayValue: string}>>
  aliases?: string[]
  whenToUse?: string
  argumentHint?: string
  allowedTools?: string[]
  model?: string
  disableModelInvocation?: boolean
  userInvocable?: boolean
  isEnabled?: () => boolean
  hooks?: HooksSettings
  context?: 'inline' | 'fork'
  agent?: string
  /**
   * Additional reference files to extract to disk on first invocation.
   * Keys are relative paths (forward slashes, no `..`), values are content.
   * When set, the skill prompt is prefixed with a "Base directory for this
   * skill: <dir>" line so the model can Read/Grep these files on demand —
   * same contract as disk-based skills.
   */
  files?: Record<string, string> | ((context: ToolUseContext) => Promise<Record<string, string>>)
  getPromptForCommand: (
    args: string,
    context: ToolUseContext,
    extractedDir?: string | null,
  ) => Promise<ContentBlockParam[]>
}

// Internal registry for bundled skills
const bundledSkills287=()=>getCommandDiscoveryRegistry287().bundledSkills

/**
 * Register a bundled skill that will be available to the model.
 * Call this at module initialization or in an init function.
 *
 * Bundled skills are compiled into the CLI binary and available to all users.
 * They follow the same pattern as registerPostSamplingHook() for internal features.
 */
export function registerBundledSkill(definition: BundledSkillDefinition): void {
  const {skillRoot,getPromptForCommand}=wireBuiltinSkillFiles287(definition)

  const command: Command = {
    type: 'prompt',
    name: definition.name,
    description: definition.description,
    menuDescription: definition.menuDescription,
    getArgumentCompletions: definition.getArgumentCompletions,
    aliases: definition.aliases,
    hasUserSpecifiedDescription: true,
    allowedTools: definition.allowedTools ?? [],
    argumentHint: definition.argumentHint,
    whenToUse: definition.whenToUse,
    model: definition.model,
    disableModelInvocation: definition.disableModelInvocation ?? false,
    userInvocable: definition.userInvocable ?? true,
    contentLength: 0, // Not applicable for bundled skills
    source: 'bundled',
    loadedFrom: 'bundled',
    hooks: definition.hooks,
    skillRoot,
    context: definition.context,
    agent: definition.agent,
    isEnabled: definition.isEnabled,
    isHidden: !(definition.userInvocable ?? true),
    progressMessage: 'running',
    getPromptForCommand,
  }
  bundledSkills287().push(command)
}

/**
 * Get all registered bundled skills.
 * Returns a copy to prevent external mutation.
 */
export function getBundledSkills(): Command[] {
  return [...bundledSkills287()]
}

/**
 * Clear bundled skills registry (for testing).
 */
export function clearBundledSkills(): void {
  bundledSkills287().length = 0
}

/**
 * Deterministic extraction directory for a bundled skill's reference files.
 */
export function getBundledSkillExtractDir(skillName: string): string {
  return builtinSkillExtractDir287(skillName)
}
